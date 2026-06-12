import { normalizeEmail, parseJsonBody, requireConfig, response, siteUrl } from './_shared.js'

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return response(405, { error: 'Method not allowed' })

  try {
    requireConfig(['SUPABASE_URL', 'SUPABASE_PUBLISHABLE_KEY'])
    const { email: rawEmail } = parseJsonBody(event)
    const email = normalizeEmail(rawEmail)

    if (!isValidEmail(email)) return response(400, { error: 'Enter a valid email address.' })

    const supabaseUrl = process.env.SUPABASE_URL.replace(/\/$/, '')
    const redirectTo = `${siteUrl()}/login`

    const supabaseResponse = await fetch(`${supabaseUrl}/auth/v1/otp?redirect_to=${encodeURIComponent(redirectTo)}`, {
      method: 'POST',
      headers: {
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY,
        authorization: `Bearer ${process.env.SUPABASE_PUBLISHABLE_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, create_user: true }),
    })

    if (!supabaseResponse.ok) {
      return response(502, { error: await supabaseResponse.text() })
    }

    return response(200, { ok: true })
  } catch (error) {
    return response(500, { error: error.message })
  }
}
