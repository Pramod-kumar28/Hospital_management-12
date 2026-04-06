/** Map backend role strings to the role key used by routes and ProtectedRoute. */
const API_ROLE_TO_APP = {
  LAB_TECH: 'LAB',
  PHARMACIST: 'PHARMACY',
  HOSPITAL_ADMIN: 'ADMIN',
  HOSPITALADMIN: 'ADMIN',
}

function normalizeToken(r) {
  return String(r || '').toUpperCase().replace(/\s+/g, '_')
}

function toAppRole(token) {
  const u = normalizeToken(token)
  return API_ROLE_TO_APP[u] || u
}

const ROUTE_PRIORITY = [
  'SUPER_ADMIN',
  'ADMIN',
  'DOCTOR',
  'PHARMACY',
  'LAB',
  'NURSE',
  'RECEPTIONIST',
  'PATIENT',
  'TELEMEDICINE',
]

/**
 * Map API `user.roles` / role strings to app route role used by ProtectedRoute and dashboards.
 */
export function normalizeRoleForRoute(user) {
  const raw = []
  if (Array.isArray(user?.roles)) {
    for (const r of user.roles) raw.push(normalizeToken(r))
  }
  if (user?.role) {
    const r = normalizeToken(user.role)
    if (!raw.includes(r)) raw.unshift(r)
  }
  const appRoles = []
  const seen = new Set()
  for (const r of raw) {
    const a = toAppRole(r)
    if (!seen.has(a)) {
      seen.add(a)
      appRoles.push(a)
    }
  }
  if (appRoles.includes('SUPER_ADMIN')) return 'SUPER_ADMIN'
  if (appRoles.some((r) => ['ADMIN', 'HOSPITAL_ADMIN', 'HOSPITALADMIN'].includes(r))) return 'ADMIN'
  for (const p of ROUTE_PRIORITY) {
    if (appRoles.includes(p)) return p
  }
  return appRoles[0] || 'USER'
}
