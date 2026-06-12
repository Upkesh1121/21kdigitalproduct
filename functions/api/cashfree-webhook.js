import { cashfreeBaseUrl, cashfreeHeaders, getOrder, json, requireConfig, updateOrder, upsertBuyer } from '../_shared.js'

const pick = (...values) => values.find((value) => value !== undefined && value !== null && value !== '')

const toBase64 = (buffer) => {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}

const verifySignature = async (env, request, rawBody) => {
  const timestamp = request.headers.get('x-webhook-timestamp')
  const signature = request.headers.get('x-webhook-signature')
  if (!timestamp || !signature) return false

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(env.CASHFREE_SECRET_KEY),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const digest = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${timestamp}${rawBody}`))
  return toBase64(digest) === signature
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

const fetchCashfreeOrder = async (env, orderId) => {
  const response = await fetch(`${cashfreeBaseUrl(env)}/orders/${encodeURIComponent(orderId)}`, {
    headers: cashfreeHeaders(env),
  })
  if (!response.ok) return null
  return response.json()
}

export async function onRequestPost({ request, env }) {
  try {
    requireConfig(env, ['CASHFREE_APP_ID', 'CASHFREE_SECRET_KEY', 'SUPABASE_URL', 'SUPABASE_SECRET_KEY'])

    const rawBody = await request.text()
    if (!(await verifySignature(env, request, rawBody))) return json({ error: 'Invalid webhook signature' }, 401)

    const payload = JSON.parse(rawBody)
    const orderId = getOrderId(payload)
    const paymentStatus = getPaymentStatus(payload)
    const cfPaymentId = getPaymentId(payload)

    if (!orderId) return json({ error: 'Missing order_id' }, 400)

    if (paymentStatus !== 'SUCCESS') {
      await updateOrder(env, orderId, { status: String(paymentStatus || 'webhook_received').toLowerCase() }).catch(() => null)
      return json({ received: true, unlocked: false })
    }

    const localOrder = await getOrder(env, orderId)
    if (!localOrder) return json({ error: 'Order not found' }, 404)

    if (localOrder.status === 'paid') return json({ received: true, unlocked: true, duplicate: true })

    const cashfreeOrder = await fetchCashfreeOrder(env, orderId)
    if (cashfreeOrder && cashfreeOrder.order_status !== 'PAID') {
      await updateOrder(env, orderId, { status: String(cashfreeOrder.order_status || 'pending').toLowerCase() })
      return json({ received: true, unlocked: false })
    }

    await updateOrder(env, orderId, {
      status: 'paid',
      cf_payment_id: cfPaymentId ? String(cfPaymentId) : null,
    })
    await upsertBuyer(env, localOrder.email, 'buyer')

    return json({ received: true, unlocked: true })
  } catch (error) {
    return json({ error: error.message }, 500)
  }
}

export const onRequestGet = () => json({ error: 'Method not allowed' }, 405)
