import { API_BASE_URL, API_HEADERS, AUTH_REFRESH } from '../config/api'
import { store } from '../redux/store'
import { logout, setTokens } from '../redux/slices/authSlice'

let refreshInFlight = null

async function tryRefreshToken() {
  const refreshToken = localStorage.getItem('refresh_token')
  if (!refreshToken) return false

  if (refreshInFlight) return refreshInFlight

  refreshInFlight = (async () => {
    try {
      const res = await fetch(`${API_BASE_URL}${AUTH_REFRESH}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...API_HEADERS },
        body: JSON.stringify({ refresh_token: refreshToken }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) return false
      const d = data.data ?? data
      const access = d.access_token ?? d.accessToken
      const nextRefresh = d.refresh_token ?? d.refreshToken ?? refreshToken
      if (!access) return false
      localStorage.setItem('access_token', access)
      localStorage.setItem('token', access)
      localStorage.setItem('refresh_token', nextRefresh)
      store.dispatch(setTokens({ token: access, refreshToken: nextRefresh }))
      return true
    } catch {
      return false
    } finally {
      refreshInFlight = null
    }
  })()

  return refreshInFlight
}

function clearSessionAndRedirectLogin() {
  store.dispatch(logout())
  if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
    window.location.href = '/login'
  }
}

/**
 * JSON API fetch with Bearer access token. On 401, tries refresh once then retries.
 * Use for protected routes; login endpoints should pass { skipAuth: true }.
 */
export async function apiFetch(path, options = {}) {
  const { skipAuth = false, _retry = false, ...rest } = options
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`

  const headers = { ...API_HEADERS, ...rest.headers }
  if (rest.body && typeof rest.body === 'object' && !(rest.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  if (!skipAuth) {
    const token = localStorage.getItem('access_token') || localStorage.getItem('token')
    if (token) headers['Authorization'] = `Bearer ${token}`
  }

  const body =
    rest.body && typeof rest.body === 'object' && !(rest.body instanceof FormData)
      ? JSON.stringify(rest.body)
      : rest.body

  const res = await fetch(url, { ...rest, headers, body })

  if (res.status === 401 && !skipAuth && !_retry) {
    const refreshed = await tryRefreshToken()
    if (refreshed) return apiFetch(path, { ...options, _retry: true })
    clearSessionAndRedirectLogin()
  }

  return res
}
