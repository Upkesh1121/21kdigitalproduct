import crypto from 'node:crypto'
import { cashfreeBaseUrl, cashfreeHeaders, getOrder, readBody, requireConfig, response, updateOrder, upsertBuyer } from './_shared.js'

const pick = (...values) => values.find((value) => value !== undefined && value !== null && value !== '')

const verifySignature = (event, rawBody) => {
  const timestamp = event.headers['x-webhook-timestamp'] || event.headers['X-Webhook-Timestamp']
  const signature = event.headers['x-webhook-signature'] || event.headers['X-Webhook-Signature']

  if (!timestamp || !signature) return false

  const expected = crypto
    .createHmac('sha256', process.env.CASHFREE_SECRET_KEY)
    .update(`${timestamp}${rawBody}`)
    .digest('base64')

  const expectedBuffer = Buffer.from(expected)
  const signatureBuffer = Buffer.from(signature)
  if (expectedBuffer.length !== signatureBuffer.length) return false
  return crypto.timingSafeEqual(expectedBuffer, signatureBuffer)
}

const getPaymentStatus = (payload) => pick(
  payload?.data?.payment?.payment_status,
  payload?.payment?.payment_status,
  payload?.payment_status,
)

const getOrderId = (payload) => pick(
  payload?.data?.order?.order_id,
  payload?.order?.order_id,
  payload?.order_id,
)

const getPaymentId = (payload) => pick(
  payload?.data?.payment?.cf_payment_id,
  payload?.payment?.cf_payment_id,
  payload?.cf_payment_id,
)

const fetchCashfreeOrder = async (orderId) => {
  const response = await fetch(`${cashfreeBaseUrl()}/orders/${encodeURIComponent(orderId)}`, {
    headers: cashfreeHeaders(),
  })

  if (!response.ok) return null
  return response.json()
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return response(405, { error: 'Method not allowed' })

  try {
    requireConfig(['CASHFREE_APP_ID', 'CASHFREE_SECRET_KEY', 'SUPABASE_URL', 'SUPABASE_SECRET_KEY'])

    const rawBody = readBody(event)
    if (!verifySignature(event, rawBody)) return response(401, { error: 'Invalid webhook signature' })

    const payload = JSON.parse(rawBody)
    const orderId = getOrderId(payload)
    const paymentStatus = getPaymentStatus(payload)
    const cfPaymentId = getPaymentId(payload)

    if (!orderId) return response(400, { error: 'Missing order_id' })

    if (paymentStatus !== 'SUCCESS') {
      await updateOrder(orderId, { status: String(paymentStatus || 'webhook_received').toLowerCase() }).catch(() => null)
      return response(200, { received: true, unlocked: false })
    }

    const localOrder = await getOrder(orderId)
    if (!localOrder) return response(404, { error: 'Order not found' })

    if (localOrder.status === 'paid') {
      return response(200, { received: true, unlocked: true, duplicate: true })
    }

    const cashfreeOrder = await fetchCashfreeOrder(orderId)
    if (cashfreeOrder && cashfreeOrder.order_status !== 'PAID') {
      await updateOrder(orderId, { status: String(cashfreeOrder.order_status || 'pending').toLowerCase() })
      return response(200, { received: true, unlocked: false })
    }

    await updateOrder(orderId, {
      status: 'paid',
      cf_payment_id: cfPaymentId ? String(cfPaymentId) : null,
    })
    await upsertBuyer(localOrder.email, 'buyer')

    return response(200, { received: true, unlocked: true })
  } catch (error) {
    return response(500, { error: error.message })
  }
}
