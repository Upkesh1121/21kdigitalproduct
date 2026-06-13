import { json } from '../_shared.js'

export const onRequestGet = () => json({
  ok: true,
  service: '21k-api',
  time: new Date().toISOString(),
})
