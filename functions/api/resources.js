import { DOWNLOAD_FILES, RESOURCE_SECTIONS, resourceSectionSlug } from '../_resource-catalog.js'
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
  const response = await fetch(`${supabaseProjectUrl(env)}/auth/v1/user`, {
    headers: {
      apikey: supabaseClientKey(env),
      authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) return null
  return response.json()
}

const getBuyerAccess = async (env, email) => {
  if (getAdminEmails(env).includes(email)) return { hasAccess: true, role: 'admin' }

  const buyersResponse = await fetch(
    `${supabaseRestUrl(env, 'buyers')}?email=eq.${encodeURIComponent(email)}&select=has_access,role`,
    { headers: supabaseHeaders(env) },
  )
  if (!buyersResponse.ok) throw new Error(await buyersResponse.text())

  const rows = await buyersResponse.json()
  const buyer = rows[0]
  return { hasAccess: buyer?.has_access === true, role: buyer?.role || null }
}

export async function onRequestGet({ request, env }) {
  try {
    requireConfig(env, ['SUPABASE_URL', 'SUPABASE_PUBLISHABLE_KEY', 'SUPABASE_SECRET_KEY'])

    const token = getBearerToken(request)
    if (!token) return json({ error: 'Login required.' }, 401)

    const user = await getUser(env, token)
    const email = user?.email?.toLowerCase()
    if (!email) return json({ error: 'Login required.' }, 401)

    const access = await getBuyerAccess(env, email)
    if (!access.hasAccess) return json({ error: 'Buyer access required.' }, 403)

    const url = new URL(request.url)
    const sectionSlug = url.searchParams.get('section')
    if (sectionSlug) {
      const section = RESOURCE_SECTIONS.find(item => resourceSectionSlug(item.title) === sectionSlug)
      if (!section) return json({ error: 'Resource section not found.' }, 404)
      return json({ email, role: access.role, section })
    }

    return json({
      email,
      role: access.role,
      sections: RESOURCE_SECTIONS,
      downloads: DOWNLOAD_FILES,
    })
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Could not load resources.' }, 500)
  }
}

export const onRequestPost = () => json({ error: 'Method not allowed' }, 405)
