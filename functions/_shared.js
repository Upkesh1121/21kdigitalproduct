export const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  },
})

export const getEnv = (env, name, fallback = '') => env[name] || fallback

export const siteUrl = (env) => getEnv(env, 'SITE_URL', 'https://21k.in').replace(/\/$/, '')

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
  const missing = names.filter((name) => !env[name])
  if (missing.length) throw new Error(`Missing environment variables: ${missing.join(', ')}`)
}

export const normalizeEmail = (email) => String(email || '').trim().toLowerCase()

export const supabaseRestUrl = (env, table) => `${getEnv(env, 'SUPABASE_URL').replace(/\/$/, '')}/rest/v1/${table}`

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

export const upsertBuyer = async (env, email, role = 'buyer') => {
  const response = await fetch(`${supabaseRestUrl(env, 'buyers')}?on_conflict=email`, {
    method: 'POST',
    headers: supabaseHeaders(env, 'resolution=merge-duplicates'),
    body: JSON.stringify({ email: normalizeEmail(email), has_access: true, role }),
  })
  if (!response.ok) throw new Error(`Could not upsert buyer: ${await response.text()}`)
}
