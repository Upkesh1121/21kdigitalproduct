import { loginRedirectUrl, requireConfig, safeNextPath, supabaseProjectUrl } from '../_shared.js'

export async function onRequestGet({ request, env }) {
  try {
    requireConfig(env, ['SITE_URL', 'SUPABASE_URL', 'SUPABASE_PUBLISHABLE_KEY'])

    const url = new URL(request.url)
    const next = safeNextPath(url.searchParams.get('next'))
    const redirectTo = `${loginRedirectUrl(env)}?next=${encodeURIComponent(next)}`

    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/i.test(redirectTo)) {
      return Response.json({ error: 'SITE_URL is set to localhost. Set SITE_URL=https://21k.in in Cloudflare.' }, { status: 500 })
    }

    const supabaseUrl = supabaseProjectUrl(env)
    const authUrl = new URL(`${supabaseUrl}/auth/v1/authorize`)
    authUrl.searchParams.set('provider', 'google')
    authUrl.searchParams.set('redirect_to', redirectTo)

    return Response.redirect(authUrl.toString(), 302)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export const onRequestPost = () => Response.json({ error: 'Method not allowed' }, { status: 405 })
