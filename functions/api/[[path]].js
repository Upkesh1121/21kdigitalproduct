import * as createCashfreeOrder from './create-cashfree-order.js'
import { onRequestPost as createCashfreeOrderPost } from './create-cashfree-order.js'
import { onRequestPost as cashfreeWebhookPost } from './cashfree-webhook.js'
import { onRequestGet as checkAccessGet } from './check-access.js'
import { onRequestPost as sendMagicLinkPost } from './send-magic-link.js'
import { json } from '../_shared.js'

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
if (path === 'create-cashfree-order') {
  if (context.request.method === 'POST') {
    return createCashfreeOrder.onRequestPost(context)
  }
  return createCashfreeOrder.onRequestGet(context)
}
  if (
    ['create-cashfree-order', 'cashfree-webhook', 'check-access', 'send-magic-link'].includes(path)
  ) {
    return json({ error: 'Method not allowed' }, 405)
  }

  return json({ error: 'API route not found' }, 404)
}
