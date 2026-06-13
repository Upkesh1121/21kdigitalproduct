import { json, markLatestOrderPaidByEmail, normalizeEmail, requireConfig, supabaseClientKey, supabaseProjectUrl, updateOrder, upsertBuyer } from '../_shared.js'

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const getAdminEmails = (env) => {
  const configured = `${env.ADMIN_EMAIL || ''},${env.ADMIN_EMAILS || ''}`
  return configured
    .split(',')
    .map(email => email.trim().toLowerCase())
    .filter(Boolean)
}

const getAdminKey = (request) => {
  const header = request.headers.get('x-admin-key') || ''
  return header.trim()
}

const getBearerToken = (request) => {
  const auth = request.headers.get('authorization') || ''
  return auth.startsWith('Bearer ') ? auth.slice('Bearer '.length).trim() : ''
}

const getUser = async (env, token) => {
  if (!token) return null

  const response = await fetch(`${supabaseProjectUrl(env)}/auth/v1/user`, {
    headers: {
      apikey: supabaseClientKey(env),
      authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) return null
  return response.json()
}

const isAuthorizedAdmin = async (request, env) => {
  const configuredKey = String(env.ADMIN_ACCESS_KEY || '').trim()
  const providedKey = getAdminKey(request)
  if (configuredKey && providedKey && providedKey === configuredKey) return true

  const user = await getUser(env, getBearerToken(request))
  const email = user?.email?.toLowerCase()
  return Boolean(email && getAdminEmails(env).includes(email))
}

export async function onRequestPost({ request, env }) {
  try {
    requireConfig(env, ['SUPABASE_URL', 'SUPABASE_SECRET_KEY'])

    if (!(await isAuthorizedAdmin(request, env))) {
      return json({ error: 'Admin access required. Login with an ADMIN_EMAILS account or enter ADMIN_ACCESS_KEY.' }, 401)
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
