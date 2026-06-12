import server from '../dist/server/server.js'
import { onRequest as apiRequest } from './api/[[path]].js'

export async function onRequest(context) {
  const url = new URL(context.request.url)

  if (url.pathname === '/api' || url.pathname.startsWith('/api/')) {
    const apiPath = url.pathname.replace(/^\/api\/?/, '')
    return apiRequest({
      ...context,
      params: {
        ...context.params,
        path: apiPath,
      },
    })
  }

  return server.fetch(context.request, context.env, context)
}
