export const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  },
})

export const getEnv = (env, name, fallback = '') => env[name] || fallback

export const siteUrl = (env) => getEnv(env, 'SITE_URL', 'https://21k.in').replace(/\/$/, '')

export const loginRedirectUrl = (env) => `${siteUrl(env)}/login`

export const supabaseProjectUrl = (env) => getEnv(env, 'SUPABASE_URL', 'https://ifycttfwpbtvrlsnzpee.supabase.co').replace(/\/$/, '')

export const safeNextPath = (value, fallback = '/resources') => {
  const next = String(value || '').trim()
  if (!next || !next.startsWith('/') || next.startsWith('//')) return fallback
  return next
}

export const cashfreeBaseUrl = (env) => {
  return getEnv(env, 'CASHFREE_ENV', 'production') === 'sandbox'
    ? 'https://sandbox.cashfree.com/pg'
    : 'https://api.cashfree.com/pg'
}

export const cashfreeHeaders = (env) => ({
  'content-type': 'application/json',
  'x-client-id': getEnv(env, 'CASHFREE_APP_ID'),
  'x-client-secret': getEnv(env, 'CASHFREE_SECRET_KEY'),
  'x-api-version': getEnv(env, 'CASHFREE_API_VERSION', '2023-08-01'),
})

export const requireConfig = (env, names) => {
  const missing = names.filter((name) => !env[name] && name !== 'SUPABASE_URL' && name !== 'SITE_URL')
  if (missing.length) throw new Error(`Missing environment variables: ${missing.join(', ')}`)
}

export const normalizeEmail = (email) => String(email || '').trim().toLowerCase()

export const supabaseRestUrl = (env, table) => `${supabaseProjectUrl(env)}/rest/v1/${table}`

export const supabaseHeaders = (env, prefer) => {
  const headers = {
    apikey: getEnv(env, 'SUPABASE_SECRET_KEY'),
    authorization: `Bearer ${getEnv(env, 'SUPABASE_SECRET_KEY')}`,
    'content-type': 'application/json',
  }
  if (prefer) headers.prefer = prefer
  return headers
}

export const insertOrder = async (env, order) => {
  const response = await fetch(supabaseRestUrl(env, 'orders'), {
    method: 'POST',
    headers: supabaseHeaders(env),
    body: JSON.stringify(order),
  })
  if (!response.ok) throw new Error(`Could not insert order: ${await response.text()}`)
}

export const getOrder = async (env, orderId) => {
  const response = await fetch(`${supabaseRestUrl(env, 'orders')}?order_id=eq.${encodeURIComponent(orderId)}&select=*`, {
    headers: supabaseHeaders(env),
  })
  if (!response.ok) throw new Error(`Could not fetch order: ${await response.text()}`)
  const rows = await response.json()
  return rows[0] || null
}

export const updateOrder = async (env, orderId, patch) => {
  const response = await fetch(`${supabaseRestUrl(env, 'orders')}?order_id=eq.${encodeURIComponent(orderId)}`, {
    method: 'PATCH',
    headers: supabaseHeaders(env),
    body: JSON.stringify(patch),
  })
  if (!response.ok) throw new Error(`Could not update order: ${await response.text()}`)
}

export const markLatestOrderPaidByEmail = async (env, email, cfPaymentId = null) => {
  const normalizedEmail = normalizeEmail(email)
  const response = await fetch(
    `${supabaseRestUrl(env, 'orders')}?email=eq.${encodeURIComponent(normalizedEmail)}&order=created_at.desc&limit=1`,
    { headers: supabaseHeaders(env) },
  )
  if (!response.ok) throw new Error(`Could not fetch latest order: ${await response.text()}`)

  const rows = await response.json()
  const latestOrder = rows[0]
  if (!latestOrder?.order_id) return null

  await updateOrder(env, latestOrder.order_id, {
    status: 'paid',
    cf_payment_id: cfPaymentId ? String(cfPaymentId) : latestOrder.cf_payment_id || null,
  })

  return latestOrder.order_id
}

export const upsertBuyer = async (env, email, role = 'buyer', hasAccess = true, profile = {}) => {
  const payload = {
    email: normalizeEmail(email),
    has_access: hasAccess,
    role,
  }

  if (profile.full_name) payload.full_name = String(profile.full_name).trim()
  if (profile.phone) payload.phone = String(profile.phone).trim()

  const response = await fetch(`${supabaseRestUrl(env, 'buyers')}?on_conflict=email`, {
    method: 'POST',
    headers: supabaseHeaders(env, 'resolution=merge-duplicates'),
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error(`Could not upsert buyer: ${await response.text()}`)
}
