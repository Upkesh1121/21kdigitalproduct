import { json } from './_shared.js'

const apiHandlers = {
  'admin-grant-access': () => import('./api/admin-grant-access.js'),
  'cashfree-webhook': () => import('./api/cashfree-webhook.js'),
  'check-access': () => import('./api/check-access.js'),
  'create-cashfree-order': () => import('./api/create-cashfree-order.js'),
  'google-login': () => import('./api/google-login.js'),
  health: () => import('./api/health.js'),
  login: () => import('./api/login.js'),
  'send-magic-link': () => import('./api/send-magic-link.js'),
  signup: () => import('./api/signup.js'),
  'verify-cashfree-order': () => import('./api/verify-cashfree-order.js'),
  'verify-magic-link': () => import('./api/verify-magic-link.js'),
}

const methodExportName = (method) => {
  const normalized = method.toLowerCase()
  return `onRequest${normalized.charAt(0).toUpperCase()}${normalized.slice(1)}`
}

async function handleApiRequest(context, path) {
  const loader = apiHandlers[path]
  if (!loader) return json({ error: 'API route not found' }, 404)

  try {
    const module = await loader()
    const methodHandler = module[methodExportName(context.request.method)]
    const handler = methodHandler || module.onRequest

    if (!handler) return json({ error: 'Method not allowed' }, 405)
    return handler(context)
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'API route failed.' }, 500)
  }
}

export async function onRequest(context) {
  const url = new URL(context.request.url)
  const canonicalHost = new URL(context.env.SITE_URL || 'https://21k.in').hostname

  if (
    context.request.method.toUpperCase() === 'GET' &&
    url.hostname !== canonicalHost &&
    !url.pathname.startsWith('/api/')
  ) {
    const canonicalUrl = new URL(url.pathname + url.search, context.env.SITE_URL || 'https://21k.in')
    return Response.redirect(canonicalUrl.toString(), 301)
  }

  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname === '/favicon.ico' ||
    url.pathname.startsWith('/placeholder')
  ) {
    return context.next()
  }

  if (url.pathname === '/api' || url.pathname.startsWith('/api/')) {
    const apiPath = url.pathname.replace(/^\/api\/?/, '').replace(/^\/+|\/+$/g, '')
    return handleApiRequest(context, apiPath)
  }

  try {
    const { default: server } = await import('../dist/server/server.js')
    return server.fetch(context.request, context.env, context)
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Website route failed.' }, 500)
  }
}
