import { json, normalizeEmail, requireConfig, siteUrl } from '../_shared.js'

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export async function onRequestPost({ request, env }) {
  try {
    requireConfig(env, ['SUPABASE_URL', 'SUPABASE_PUBLISHABLE_KEY'])
    const body = await request.json().catch(() => ({}))
    const email = normalizeEmail(body.email)
    if (!isValidEmail(email)) return json({ error: 'Enter a valid email address.' }, 400)

    const supabaseUrl = env.SUPABASE_URL.replace(/\/$/, '')
    const redirectTo = `${siteUrl(env)}/login`
    const supabaseResponse = await fetch(`${supabaseUrl}/auth/v1/otp?redirect_to=${encodeURIComponent(redirectTo)}`, {
      method: 'POST',
      headers: {
        apikey: env.SUPABASE_PUBLISHABLE_KEY,
        authorization: `Bearer ${env.SUPABASE_PUBLISHABLE_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, create_user: true }),
    })

    if (!supabaseResponse.ok) return json({ error: await supabaseResponse.text() }, 502)
    return json({ ok: true })
  } catch (error) {
    return json({ error: error.message }, 500)
  }
}

export const onRequestGet = () => json({ error: 'Method not allowed' }, 405)
