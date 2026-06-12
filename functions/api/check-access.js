import { json, requireConfig, supabaseHeaders, supabaseRestUrl } from '../_shared.js'

const getBearerToken = (request) => {
  const header = request.headers.get('authorization') || ''
  return header.startsWith('Bearer ') ? header.slice('Bearer '.length).trim() : ''
}

const getUser = async (env, token) => {
  const supabaseUrl = env.SUPABASE_URL.replace(/\/$/, '')
  const authResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: env.SUPABASE_PUBLISHABLE_KEY,
      authorization: `Bearer ${token}`,
    },
  })
  if (!authResponse.ok) return null
  return authResponse.json()
}

export async function onRequestGet({ request, env }) {
  try {
    requireConfig(env, ['SUPABASE_URL', 'SUPABASE_PUBLISHABLE_KEY', 'SUPABASE_SECRET_KEY'])
    const token = getBearerToken(request)
    if (!token) return json({ has_access: false }, 401)

    const user = await getUser(env, token)
    const email = user?.email?.toLowerCase()
    if (!email) return json({ has_access: false }, 401)

    const buyersResponse = await fetch(
      `${supabaseRestUrl(env, 'buyers')}?email=eq.${encodeURIComponent(email)}&select=email,has_access,role`,
      { headers: supabaseHeaders(env) },
    )
    if (!buyersResponse.ok) return json({ error: await buyersResponse.text() }, 500)

    const rows = await buyersResponse.json()
    const buyer = rows[0]
    return json({
      email,
      has_access: buyer?.has_access === true,
      role: buyer?.role || null,
    })
  } catch (error) {
    return json({ error: error.message }, 500)
  }
}

export const onRequestPost = () => json({ error: 'Method not allowed' }, 405)
