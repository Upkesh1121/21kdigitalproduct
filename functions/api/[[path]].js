import { onRequestPost as createCashfreeOrderPost } from './create-cashfree-order.js'
import { onRequestPost as cashfreeWebhookPost } from './cashfree-webhook.js'
import { onRequestGet as checkAccessGet } from './check-access.js'
import { onRequestPost as sendMagicLinkPost } from './send-magic-link.js'
import { onRequestPost as adminGrantAccessPost } from './admin-grant-access.js'
import { onRequestGet as verifyCashfreeOrderGet } from './verify-cashfree-order.js'
import { onRequestPost as verifyMagicLinkPost } from './verify-magic-link.js'
import { onRequestGet as googleLoginGet } from './google-login.js'
import { onRequestGet as healthGet } from './health.js'
import { onRequestPost as loginPost } from './login.js'
import { onRequestPost as signupPost } from './signup.js'
import { json } from '../_shared.js'

const ROUTES = ['create-cashfree-order', 'cashfree-webhook', 'check-access', 'send-magic-link', 'admin-grant-access', 'verify-cashfree-order', 'verify-magic-link', 'google-login', 'health', 'login', 'signup']

const normalizePath = (path) => {
  if (Array.isArray(path)) return path.join('/')
  return String(path || '').replace(/^\/+|\/+$/g, '')
}

export async function onRequest(context) {
  const path = normalizePath(context.params.path)
  const method = context.request.method.toUpperCase()

  if (path === 'create-cashfree-order' && method === 'POST') return createCashfreeOrderPost(context)
  if (path === 'cashfree-webhook' && method === 'POST') return cashfreeWebhookPost(context)
  if (path === 'check-access' && method === 'GET') return checkAccessGet(context)
  if (path === 'send-magic-link' && method === 'POST') return sendMagicLinkPost(context)
  if (path === 'admin-grant-access' && method === 'POST') return adminGrantAccessPost(context)
  if (path === 'verify-cashfree-order' && method === 'GET') return verifyCashfreeOrderGet(context)
  if (path === 'verify-magic-link' && method === 'POST') return verifyMagicLinkPost(context)
  if (path === 'google-login' && method === 'GET') return googleLoginGet(context)
  if (path === 'health' && method === 'GET') return healthGet(context)
  if (path === 'login' && method === 'POST') return loginPost(context)
  if (path === 'signup' && method === 'POST') return signupPost(context)

  if (ROUTES.includes(path)) return json({ error: 'Method not allowed' }, 405)

  return json({ error: 'API route not found' }, 404)
}
