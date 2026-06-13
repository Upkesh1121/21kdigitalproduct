import { json, requireConfig, supabaseClientKey, supabaseProjectUrl } from '../_shared.js'

const getBearerToken = (request) => {
  const header = request.headers.get('authorization') || ''
  return header.startsWith('Bearer ') ? header.slice('Bearer '.length).trim() : ''
}

export async function onRequestPost({ request, env }) {
  try {
    requireConfig(env, ['SUPABASE_URL', 'SUPABASE_PUBLISHABLE_KEY'])

    const token = getBearerToken(request)
    const body = await request.json().catch(() => ({}))
    const password = String(body.password || '')

    if (!token) return json({ error: 'Reset session is missing. Open the latest reset email again.' }, 401)
    if (password.length < 8) return json({ error: 'Password must be at least 8 characters.' }, 400)

    const clientKey = supabaseClientKey(env)
    const response = await fetch(`${supabaseProjectUrl(env)}/auth/v1/user`, {
      method: 'PUT',
      headers: {
        apikey: clientKey,
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ password }),
    })

    const data = await response.json().catch(async () => ({ message: await response.text() }))
    if (!response.ok) {
      return json({ error: data.error_description || data.msg || data.message || 'Could not update password.' }, 502)
    }

    return json({ ok: true })
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Could not update password.' }, 500)
  }
}

export const onRequestGet = () => json({ error: 'Method not allowed' }, 405)
