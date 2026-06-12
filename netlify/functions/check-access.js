import { requireConfig, response, supabaseHeaders, supabaseRestUrl } from './_shared.js'

const getBearerToken = (event) => {
  const header = event.headers.authorization || event.headers.Authorization || ''
  return header.startsWith('Bearer ') ? header.slice('Bearer '.length).trim() : ''
}

const getUser = async (token) => {
  const supabaseUrl = process.env.SUPABASE_URL.replace(/\/$/, '')
  const authResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: process.env.SUPABASE_PUBLISHABLE_KEY,
      authorization: `Bearer ${token}`,
    },
  })

  if (!authResponse.ok) return null
  return authResponse.json()
}

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') return response(405, { error: 'Method not allowed' })

  try {
    requireConfig(['SUPABASE_URL', 'SUPABASE_PUBLISHABLE_KEY', 'SUPABASE_SECRET_KEY'])
    const token = getBearerToken(event)
    if (!token) return response(401, { has_access: false })

    const user = await getUser(token)
    const email = user?.email?.toLowerCase()
    if (!email) return response(401, { has_access: false })

    const buyersResponse = await fetch(
      `${supabaseRestUrl('buyers')}?email=eq.${encodeURIComponent(email)}&select=email,has_access,role`,
      { headers: supabaseHeaders() },
    )

    if (!buyersResponse.ok) return response(500, { error: await buyersResponse.text() })

    const rows = await buyersResponse.json()
    const buyer = rows[0]

    return response(200, {
      email,
      has_access: buyer?.has_access === true,
      role: buyer?.role || null,
    })
  } catch (error) {
    return response(500, { error: error.message })
  }
}
