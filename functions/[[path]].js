import server from '../dist/server/server.js'

export async function onRequest(context) {
  return server.fetch(context.request, context.env, context)
}
