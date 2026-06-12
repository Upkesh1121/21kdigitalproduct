export async function readApiJson<T>(response: Response, endpoint: string): Promise<T> {
  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return response.json() as Promise<T>
  }

  const text = await response.text()
  const preview = text.replace(/\s+/g, ' ').slice(0, 120)
  const htmlHint = preview.toLowerCase().includes('<!doctype') || preview.toLowerCase().includes('<html')
    ? ' It returned website HTML instead of API JSON.'
    : ''

  throw new Error(`${endpoint} returned ${response.status || 'a'} non-JSON response.${htmlHint}`)
}
