import { normalizeRoleForRoute } from './authRoles'

/** Normalize API `user` for Redux + localStorage (same shape as LoginPage). */
export function buildUserPayloadFromApiUser(user) {
  if (!user || typeof user !== 'object') return null
  const name =
    [user.first_name, user.last_name].filter(Boolean).join(' ') ||
    user.name ||
    user.username ||
    user.email
  const appRole = normalizeRoleForRoute(user)
  return {
    id: user.id,
    name,
    email: user.email,
    role: appRole,
    roles: Array.isArray(user.roles) ? user.roles : user.role ? [user.role] : [],
    hospital_id: user.hospital_id ?? user.hospitalId,
  }
}
