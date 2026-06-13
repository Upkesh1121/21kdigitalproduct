import { json, requireConfig, supabaseClientKey, supabaseHeaders, supabaseProjectUrl, supabaseRestUrl } from '../_shared.js'

const getAdminEmails = (env) => {
  const configured = `${env.ADMIN_EMAIL || ''},${env.ADMIN_EMAILS || ''}`
  return configured
    .split(',')
    .map(email => email.trim().toLowerCase())
    .filter(Boolean)
}

const getBearerToken = (request) => {
  const header = request.headers.get('authorization') || ''
  return header.startsWith('Bearer ') ? header.slice('Bearer '.length).trim() : ''
}

const getUser = async (env, token) => {
  const supabaseUrl = supabaseProjectUrl(env)
  const clientKey = supabaseClientKey(env)
  const authResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: clientKey,
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

    if (getAdminEmails(env).includes(email)) {
      return json({
        email,
        has_access: true,
        role: 'admin',
      })
    }

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
