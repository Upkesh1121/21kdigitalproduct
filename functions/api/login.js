import { json, normalizeEmail, requireConfig, supabaseClientKey, supabaseProjectUrl } from '../_shared.js'

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export async function onRequestPost({ request, env }) {
  try {
    requireConfig(env, ['SUPABASE_URL', 'SUPABASE_PUBLISHABLE_KEY'])

    const body = await request.json().catch(() => ({}))
    const email = normalizeEmail(body.email)
    const password = String(body.password || '')

    if (!isValidEmail(email)) return json({ error: 'Enter a valid email address.' }, 400)
    if (!password) return json({ error: 'Enter your password.' }, 400)

    const clientKey = supabaseClientKey(env)
    const response = await fetch(`${supabaseProjectUrl(env)}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        apikey: clientKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json().catch(async () => ({ error_description: await response.text() }))
    if (!response.ok) {
      return json({ error: data?.error_description || data?.msg || 'Invalid email or password.' }, 401)
    }

    return json({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      email: data.user?.email || email,
    })
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Could not login.' }, 500)
  }
}

export const onRequestGet = () => json({ error: 'Method not allowed' }, 405)
