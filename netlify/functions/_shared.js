const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  },
  body: JSON.stringify(body),
})

export const getEnv = (name, fallback = '') => process.env[name] || fallback

export const siteUrl = () => getEnv('SITE_URL', 'https://21k.in').replace(/\/$/, '')

export const cashfreeBaseUrl = () => {
  return getEnv('CASHFREE_ENV', 'production') === 'sandbox'
    ? 'https://sandbox.cashfree.com/pg'
    : 'https://api.cashfree.com/pg'
}

export const cashfreeHeaders = () => ({
  'content-type': 'application/json',
  'x-client-id': getEnv('CASHFREE_APP_ID'),
  'x-client-secret': getEnv('CASHFREE_SECRET_KEY'),
  'x-api-version': getEnv('CASHFREE_API_VERSION', '2023-08-01'),
})

export const requireConfig = (names) => {
  const missing = names.filter((name) => !process.env[name])
  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`)
  }
}

export const readBody = (event) => {
  if (!event.body) return ''
  return event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body
}

export const parseJsonBody = (event) => {
  const rawBody = readBody(event)
  if (!rawBody) return {}
  return JSON.parse(rawBody)
}

export const normalizeEmail = (email) => String(email || '').trim().toLowerCase()

export const supabaseHeaders = (prefer) => {
  const headers = {
    apikey: getEnv('SUPABASE_SECRET_KEY'),
    authorization: `Bearer ${getEnv('SUPABASE_SECRET_KEY')}`,
    'content-type': 'application/json',
  }

  if (prefer) headers.prefer = prefer
  return headers
}

export const supabaseRestUrl = (table) => `${getEnv('SUPABASE_URL').replace(/\/$/, '')}/rest/v1/${table}`

export const upsertBuyer = async (email, role = 'buyer') => {
  const response = await fetch(`${supabaseRestUrl('buyers')}?on_conflict=email`, {
    method: 'POST',
    headers: supabaseHeaders('resolution=merge-duplicates'),
    body: JSON.stringify({ email: normalizeEmail(email), has_access: true, role }),
  })

  if (!response.ok) {
    throw new Error(`Could not upsert buyer: ${await response.text()}`)
  }
}

export const updateOrder = async (orderId, patch) => {
  const response = await fetch(`${supabaseRestUrl('orders')}?order_id=eq.${encodeURIComponent(orderId)}`, {
    method: 'PATCH',
    headers: supabaseHeaders(),
    body: JSON.stringify(patch),
  })

  if (!response.ok) {
    throw new Error(`Could not update order: ${await response.text()}`)
  }
}

export const insertOrder = async (order) => {
  const response = await fetch(supabaseRestUrl('orders'), {
    method: 'POST',
    headers: supabaseHeaders(),
    body: JSON.stringify(order),
  })

  if (!response.ok) {
    throw new Error(`Could not insert order: ${await response.text()}`)
  }
}

export const getOrder = async (orderId) => {
  const response = await fetch(`${supabaseRestUrl('orders')}?order_id=eq.${encodeURIComponent(orderId)}&select=*`, {
    headers: supabaseHeaders(),
  })

  if (!response.ok) {
    throw new Error(`Could not fetch order: ${await response.text()}`)
  }

  const rows = await response.json()
  return rows[0] || null
}

export const response = json
