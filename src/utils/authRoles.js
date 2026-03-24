/**
 * Map API `user.roles` / role strings to app route role used by ProtectedRoute and dashboards.
 */
export function normalizeRoleForRoute(user) {
  const roles = Array.isArray(user?.roles)
    ? user.roles.map((r) => String(r).toUpperCase().replace(/\s+/g, '_'))
    : []
  if (user?.role) {
    const r = String(user.role).toUpperCase().replace(/\s+/g, '_')
    if (!roles.includes(r)) roles.unshift(r)
  }
  if (roles.includes('SUPER_ADMIN')) return 'SUPER_ADMIN'
  if (roles.some((r) => ['HOSPITAL_ADMIN', 'ADMIN', 'HOSPITALADMIN'].includes(r))) return 'ADMIN'
  return roles[0] || 'USER'
}
