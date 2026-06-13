import { cashfreeBaseUrl, cashfreeHeaders, insertOrder, json, normalizeEmail, requireConfig, siteUrl } from '../_shared.js'

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const cleanPhone = (phone) => String(phone || '').replace(/\D/g, '').slice(-10)

export async function onRequestPost({ request, env }) {
  try {
    requireConfig(env, ['CASHFREE_APP_ID', 'CASHFREE_SECRET_KEY', 'SUPABASE_URL', 'SUPABASE_SECRET_KEY'])

    const body = await request.json().catch(() => ({}))
    const email = normalizeEmail(body.email)
    const name = String(body.name || '').trim()
    const phone = cleanPhone(body.phone)
    const amount = Number(env.PRODUCT_PRICE || 199)

    if (!name) return json({ error: 'Enter your full name.' }, 400)
    if (!isValidEmail(email)) return json({ error: 'Enter a valid email address.' }, 400)
    if (phone.length !== 10) return json({ error: 'Enter a valid 10 digit phone number.' }, 400)

    const orderId = `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

    await insertOrder(env, {
      order_id: orderId,
      email,
      amount,
      status: 'created',
    })

    const cashfreeResponse = await fetch(`${cashfreeBaseUrl(env)}/orders`, {
      method: 'POST',
      headers: cashfreeHeaders(env),
      body: JSON.stringify({
        order_id: orderId,
        order_amount: amount,
        order_currency: 'INR',
        customer_details: {
          customer_id: email.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 40),
          customer_name: name,
          customer_email: email,
          customer_phone: phone,
        },
        order_meta: {
          return_url: `${siteUrl(env)}/login?payment=return&order_id={order_id}`,
          notify_url: `${siteUrl(env)}/api/cashfree-webhook`,
        },
        order_note: '21k AI Developer Resource Pack lifetime access',
      }),
    })

    const cashfreeData = await cashfreeResponse.json().catch(() => ({}))
    if (!cashfreeResponse.ok) {
      return json({ error: cashfreeData.message || 'Cashfree order creation failed.', details: cashfreeData }, 502)
    }

    return json({
      order_id: cashfreeData.order_id || orderId,
      payment_session_id: cashfreeData.payment_session_id,
      cashfree_mode: env.CASHFREE_ENV === 'sandbox' ? 'sandbox' : 'production',
    })
  } catch (error) {
    return json({ error: error.message }, 500)
  }
}

export const onRequestGet = () => json({ error: 'Method not allowed' }, 405)
