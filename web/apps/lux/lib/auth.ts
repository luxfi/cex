/**
 * OAuth2/OIDC Auth helpers for Lux IAM (lux.id)
 *
 * Casdoor-compatible OAuth2 implicit flow.
 * Access token stored in sessionStorage (not localStorage).
 */

const IAM_BASE = process.env.NEXT_PUBLIC_IAM_URL || 'https://lux.id'
const CLIENT_ID = process.env.NEXT_PUBLIC_IAM_CLIENT_ID || 'lux-exchange'
const REDIRECT_URI =
  typeof window !== 'undefined'
    ? `${window.location.origin}/auth/callback`
    : ''

export function getLoginUrl(redirect?: string): string {
  const state = redirect || '/trade'
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'token',
    redirect_uri: REDIRECT_URI,
    scope: 'openid profile email',
    state,
  })
  return `${IAM_BASE}/oauth/authorize?${params.toString()}`
}

export function getSignupUrl(redirect?: string): string {
  // Casdoor signup page with same OAuth params
  const state = redirect || '/trade'
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'token',
    redirect_uri: REDIRECT_URI,
    scope: 'openid profile email',
    state,
  })
  return `${IAM_BASE}/signup?${params.toString()}`
}

export function handleCallback(): { token: string; state: string } | null {
  if (typeof window === 'undefined') return null

  // Casdoor may return access_token in query string OR hash fragment
  let token = ''
  let state = ''

  // Check query string first (Casdoor default)
  const searchParams = new URLSearchParams(window.location.search)
  token = searchParams.get('access_token') || ''
  state = searchParams.get('state') || ''

  // Fallback to hash fragment
  if (!token && window.location.hash) {
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    token = hashParams.get('access_token') || ''
    state = hashParams.get('state') || ''
  }

  if (!token) return null

  sessionStorage.setItem('access_token', token)
  return { token, state }
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem('access_token')
}

export function isAuthenticated(): boolean {
  return !!getToken()
}

export function logout() {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem('access_token')
  sessionStorage.removeItem('user_info')
}

export interface UserInfo {
  sub: string
  name: string
  preferred_username: string
  email: string
  avatar?: string
}

export async function getUserInfo(): Promise<UserInfo | null> {
  const token = getToken()
  if (!token) return null

  // Check cache
  const cached = sessionStorage.getItem('user_info')
  if (cached) {
    try {
      return JSON.parse(cached) as UserInfo
    } catch {
      // fall through
    }
  }

  try {
    const res = await fetch(`${IAM_BASE}/api/userinfo`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
      if (res.status === 401) {
        logout()
      }
      return null
    }
    const info = (await res.json()) as UserInfo
    sessionStorage.setItem('user_info', JSON.stringify(info))
    return info
  } catch {
    return null
  }
}
