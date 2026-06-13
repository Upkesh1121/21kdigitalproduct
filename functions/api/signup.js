import { json, normalizeEmail, requireConfig, supabaseProjectUrl, upsertBuyer } from '../_shared.js'

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const cleanText = (value) => String(value || '').trim()

const supabaseAuthUrl = (env, path) => `${supabaseProjectUrl(env)}/auth/v1/${path}`

async function createSupabaseUser(env, { email, password, fullName, phone }) {
  const response = await fetch(supabaseAuthUrl(env, 'admin/users'), {
    method: 'POST',
    headers: {
      apikey: env.SUPABASE_SECRET_KEY,
      authorization: `Bearer ${env.SUPABASE_SECRET_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        phone,
      },
    }),
  })

  const data = await response.json().catch(async () => ({ message: await response.text() }))
  if (!response.ok) {
    const message = data?.msg || data?.message || data?.error_description || 'Could not create account.'
    throw new Error(message.includes('already') ? 'An account already exists for this email. Please login.' : message)
  }

  return data
}

export async function onRequestPost({ request, env }) {
  try {
    requireConfig(env, ['SUPABASE_URL', 'SUPABASE_SECRET_KEY'])

    const body = await request.json().catch(() => ({}))
    const fullName = cleanText(body.full_name)
    const phone = cleanText(body.phone)
    const email = normalizeEmail(body.email)
    const password = String(body.password || '')

    if (!fullName) return json({ error: 'Enter your full name.' }, 400)
    if (!phone || phone.replace(/\D/g, '').length < 10) return json({ error: 'Enter a valid mobile number.' }, 400)
    if (!isValidEmail(email)) return json({ error: 'Enter a valid email address.' }, 400)
    if (password.length < 8) return json({ error: 'Password must be at least 8 characters.' }, 400)

    await createSupabaseUser(env, { email, password, fullName, phone })
    await upsertBuyer(env, email, 'buyer', false, { full_name: fullName, phone })

    return json({ ok: true, email })
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Could not create account.' }, 500)
  }
}

export const onRequestGet = () => json({ error: 'Method not allowed' }, 405)
