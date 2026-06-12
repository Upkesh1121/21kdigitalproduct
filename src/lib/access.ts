import { readApiJson } from './api'

export const ACCESS_TOKEN_KEY = '21k-supabase-access-token'

export function saveSupabaseHashSession() {
  if (typeof window === 'undefined' || !window.location.hash) return null

  const params = new URLSearchParams(window.location.hash.slice(1))
  const token = params.get('access_token')

  if (!token) return null

  window.localStorage.setItem(ACCESS_TOKEN_KEY, token)
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
  return token
}

export function getAccessToken() {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function clearAccessToken() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY)
  }
}

export async function checkBuyerAccess(token = getAccessToken()) {
  if (!token) return { has_access: false, email: null, role: null }

  const response = await fetch('/api/check-access', {
    headers: { authorization: `Bearer ${token}` },
  })

  if (!response.ok) return { has_access: false, email: null, role: null }
  return readApiJson<{ has_access: boolean; email: string | null; role: string | null }>(response, '/api/check-access')
}
