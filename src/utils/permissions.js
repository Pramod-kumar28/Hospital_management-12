import { PERMISSIONS } from './constants'

export const hasPermission = (user, permission) => {
  if (!user || !user.permissions) return false
  return user.permissions.includes(permission)
}

export const hasAnyPermission = (user, permissions) => {
  if (!user || !user.permissions) return false
  return permissions.some(permission => user.permissions.includes(permission))
}

export const hasAllPermissions = (user, permissions) => {
  if (!user || !user.permissions) return false
  return permissions.every(permission => user.permissions.includes(permission))
}

export const getRolePermissions = (role) => {
  return PERMISSIONS[role] || []
}