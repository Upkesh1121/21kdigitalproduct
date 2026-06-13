import { json, requireConfig, supabaseProjectUrl } from '../_shared.js'

export async function onRequestPost({ request, env }) {
  try {
    requireConfig(env, ['SUPABASE_URL', 'SUPABASE_PUBLISHABLE_KEY'])

    const body = await request.json().catch(() => ({}))
    const tokenHash = String(body.token_hash || '').trim()
    const type = body.type === 'signup' ? 'signup' : 'email'

    if (!tokenHash) return json({ error: 'Missing login token.' }, 400)

    const supabaseUrl = supabaseProjectUrl(env)
    const supabaseResponse = await fetch(`${supabaseUrl}/auth/v1/verify`, {
      method: 'POST',
      headers: {
        apikey: env.SUPABASE_PUBLISHABLE_KEY,
        authorization: `Bearer ${env.SUPABASE_PUBLISHABLE_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ token_hash: tokenHash, type }),
    })

    const data = await supabaseResponse.json().catch(() => ({}))
    if (!supabaseResponse.ok) {
      return json({ error: data.error_description || data.msg || data.message || 'Login link could not be verified.' }, 401)
    }

    return json({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
      token_type: data.token_type,
    })
  } catch (error) {
    return json({ error: error.message }, 500)
  }
}

export const onRequestGet = () => json({ error: 'Method not allowed' }, 405)
