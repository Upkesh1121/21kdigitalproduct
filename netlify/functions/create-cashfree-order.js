import { cashfreeBaseUrl, cashfreeHeaders, insertOrder, normalizeEmail, parseJsonBody, requireConfig, response, siteUrl } from './_shared.js'

const PRODUCT_AMOUNT = Number(process.env.PRODUCT_PRICE || 199)

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const cleanPhone = (phone) => String(phone || '').replace(/\D/g, '').slice(-10)

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return response(405, { error: 'Method not allowed' })

  try {
    requireConfig(['CASHFREE_APP_ID', 'CASHFREE_SECRET_KEY', 'SUPABASE_URL', 'SUPABASE_SECRET_KEY'])

    const body = parseJsonBody(event)
    const email = normalizeEmail(body.email)
    const name = String(body.name || '').trim()
    const phone = cleanPhone(body.phone)

    if (!name) return response(400, { error: 'Enter your full name.' })
    if (!isValidEmail(email)) return response(400, { error: 'Enter a valid email address.' })
    if (phone.length !== 10) return response(400, { error: 'Enter a valid 10 digit phone number.' })

    const orderId = `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

    await insertOrder({
      order_id: orderId,
      email,
      amount: PRODUCT_AMOUNT,
      status: 'created',
    })

    const orderPayload = {
      order_id: orderId,
      order_amount: PRODUCT_AMOUNT,
      order_currency: 'INR',
      customer_details: {
        customer_id: email.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 40),
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
      },
      order_meta: {
        return_url: `${siteUrl()}/login?payment=return&order_id={order_id}`,
        notify_url: `${siteUrl()}/api/cashfree-webhook`,
      },
      order_note: '21k AI Developer Resource Pack lifetime access',
    }

    const cashfreeResponse = await fetch(`${cashfreeBaseUrl()}/orders`, {
      method: 'POST',
      headers: cashfreeHeaders(),
      body: JSON.stringify(orderPayload),
    })

    const cashfreeData = await cashfreeResponse.json().catch(() => ({}))

    if (!cashfreeResponse.ok) {
      return response(502, {
        error: cashfreeData.message || 'Cashfree order creation failed.',
        details: cashfreeData,
      })
    }

    return response(200, {
      order_id: cashfreeData.order_id || orderId,
      payment_session_id: cashfreeData.payment_session_id,
    })
  } catch (error) {
    return response(500, { error: error.message })
  }
}
