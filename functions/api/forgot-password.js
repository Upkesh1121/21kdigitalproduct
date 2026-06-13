import { json, normalizeEmail, requireConfig, siteUrl, supabaseClientKey, supabaseProjectUrl } from '../_shared.js'

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export async function onRequestPost({ request, env }) {
  try {
    requireConfig(env, ['SITE_URL', 'SUPABASE_URL', 'SUPABASE_PUBLISHABLE_KEY'])

    const body = await request.json().catch(() => ({}))
    const email = normalizeEmail(body.email)
    if (!isValidEmail(email)) return json({ error: 'Enter a valid email address.' }, 400)

    const redirectTo = `${siteUrl(env)}/reset-password`
    const clientKey = supabaseClientKey(env)
    const response = await fetch(`${supabaseProjectUrl(env)}/auth/v1/recover?redirect_to=${encodeURIComponent(redirectTo)}`, {
      method: 'POST',
      headers: {
        apikey: clientKey,
        authorization: `Bearer ${clientKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json().catch(async () => ({ message: await response.text() }))
    if (!response.ok) {
      return json({ error: data.error_description || data.msg || data.message || 'Could not send reset email.' }, 502)
    }

    return json({ ok: true })
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Could not send reset email.' }, 500)
  }
}

export const onRequestGet = () => json({ error: 'Method not allowed' }, 405)
