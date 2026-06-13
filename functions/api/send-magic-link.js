import { json, normalizeEmail, requireConfig, safeNextPath, siteUrl, supabaseProjectUrl } from '../_shared.js'

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

async function handlePost({ request, env }) {
  try {
    requireConfig(env, ['SITE_URL', 'SUPABASE_URL', 'SUPABASE_PUBLISHABLE_KEY'])

    const body = await request.json().catch(() => ({}))
    const email = normalizeEmail(body.email)
    if (!isValidEmail(email)) return json({ error: 'Enter a valid email address.' }, 400)

    const next = safeNextPath(body.next)
    const supabaseUrl = supabaseProjectUrl(env)
    const redirectTo = `${siteUrl(env)}/login?next=${encodeURIComponent(next)}`

    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/i.test(redirectTo)) {
      return json({ error: 'SITE_URL is set to localhost. Set SITE_URL=https://21k.in in Cloudflare.' }, 500)
    }

    const supabaseResponse = await fetch(`${supabaseUrl}/auth/v1/otp?redirect_to=${encodeURIComponent(redirectTo)}`, {
      method: 'POST',
      headers: {
        apikey: env.SUPABASE_PUBLISHABLE_KEY,
        authorization: `Bearer ${env.SUPABASE_PUBLISHABLE_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, create_user: false }),
    })

    const responseText = await supabaseResponse.text()
    if (!supabaseResponse.ok) {
      return json({ error: responseText || 'Supabase could not send the login link.' }, 502)
    }

    return json({ ok: true, redirect_to: redirectTo })
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Could not send login link.' }, 500)
  }
}

export async function onRequest(context) {
  if (context.request.method.toUpperCase() !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  return handlePost(context)
}

export const onRequestPost = handlePost

export const onRequestGet = () => json({ error: 'Method not allowed' }, 405)
