/** Roles that have a dedicated dashboard route after sign-in. */
export const DASHBOARD_ROLES = new Set([
  'DOCTOR',
  'ADMIN',
  'NURSE',
  'RECEPTIONIST',
  'SUPER_ADMIN',
  'PATIENT',
  'LAB',
  'PHARMACY',
  'TELEMEDICINE',
])

/**
 * Only redirect away from /login when Redux has a session that maps to a real app area.
 * Avoids Navigate ↔ /login loops when localStorage has a token but `user.role` is missing or stale.
 */
export function shouldRedirectFromLoginPage(isAuthenticated, user, requiresPasswordChange) {
  if (!isAuthenticated || !user) return false
  const role = String(user.role || '').toUpperCase()
  if (role === 'ADMIN' && requiresPasswordChange) return true
  return DASHBOARD_ROLES.has(role)
}

/**
 * Post-login / app entry path. Used by Navigate targets and the catch-all route.
 * Unknown authenticated roles resolve to `/` (stay on marketing home — avoids Navigate-to-self loops).
 */
export function resolveDefaultRoute({ isAuthenticated, user, requiresPasswordChange }) {
  if (!isAuthenticated) return '/'
  const roleUpper = String(user?.role || '').toUpperCase()
  if (roleUpper === 'ADMIN' && requiresPasswordChange) return '/admin/change-password'

  switch (roleUpper) {
    case 'DOCTOR':
      return '/doctor'
    case 'ADMIN':
      return '/admin'
    case 'NURSE':
      return '/nurse'
    case 'RECEPTIONIST':
      return '/receptionist'
    case 'SUPER_ADMIN':
      return '/super-admin'
    case 'PATIENT':
      return '/patient'
    case 'LAB':
      return '/lab'
    case 'PHARMACY':
      return '/pharmacy'
    case 'TELEMEDICINE':
      return '/telemedicine'
    case 'USER':
      return '/login'
    default:
      return '/'
  }
}
