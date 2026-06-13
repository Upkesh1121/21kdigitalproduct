import { json, markLatestOrderPaidByEmail, normalizeEmail, requireConfig, updateOrder, upsertBuyer } from '../_shared.js'

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const getAdminKey = (request) => {
  const header = request.headers.get('x-admin-key') || ''
  if (header) return header.trim()

  const auth = request.headers.get('authorization') || ''
  return auth.startsWith('Bearer ') ? auth.slice('Bearer '.length).trim() : ''
}

export async function onRequestPost({ request, env }) {
  try {
    requireConfig(env, ['ADMIN_ACCESS_KEY', 'SUPABASE_URL', 'SUPABASE_SECRET_KEY'])

    if (getAdminKey(request) !== env.ADMIN_ACCESS_KEY) {
      return json({ error: 'Invalid admin key.' }, 401)
    }

    const body = await request.json().catch(() => ({}))
    const email = normalizeEmail(body.email)
    const role = body.role === 'admin' ? 'admin' : 'buyer'
    const orderId = String(body.order_id || '').trim()
    const cfPaymentId = String(body.cf_payment_id || '').trim()
    const markPaid = body.mark_paid !== false

    if (!isValidEmail(email)) return json({ error: 'Enter a valid buyer email.' }, 400)

    let paidOrderId = null
    if (markPaid && orderId) {
      await updateOrder(env, orderId, {
        status: 'paid',
        cf_payment_id: cfPaymentId || null,
      })
      paidOrderId = orderId
    } else if (markPaid) {
      paidOrderId = await markLatestOrderPaidByEmail(env, email, cfPaymentId || null)
    }

    await upsertBuyer(env, email, role, true)
    return json({ ok: true, email, has_access: true, role, paid_order_id: paidOrderId })
  } catch (error) {
    return json({ error: error.message }, 500)
  }
}

export const onRequestGet = () => json({ error: 'Method not allowed' }, 405)
