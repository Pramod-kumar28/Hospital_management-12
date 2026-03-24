/** localStorage: first-time password change completed for this admin (same browser). */
export const HA_INITIAL_PW_KEY_PREFIX = 'ha_initial_pw_done_'

export function markHospitalAdminInitialPasswordDone(user) {
  const id = user?.id ?? user?.user_id
  const email = String(user?.email || '')
    .toLowerCase()
    .trim()
  if (id != null && id !== '') {
    try {
      localStorage.setItem(`${HA_INITIAL_PW_KEY_PREFIX}${id}`, '1')
    } catch {
      /* ignore */
    }
  }
  if (email) {
    try {
      localStorage.setItem(`${HA_INITIAL_PW_KEY_PREFIX}${email}`, '1')
    } catch {
      /* ignore */
    }
  }
}

function hasCompletedInitialPasswordInBrowser(apiUser) {
  const u = apiUser && typeof apiUser === 'object' ? apiUser : {}
  const id = u.id ?? u.user_id
  const email = String(u.email || '')
    .toLowerCase()
    .trim()
  if (id != null && id !== '') {
    try {
      if (localStorage.getItem(`${HA_INITIAL_PW_KEY_PREFIX}${id}`) === '1') return true
    } catch {
      /* ignore */
    }
  }
  if (email) {
    try {
      if (localStorage.getItem(`${HA_INITIAL_PW_KEY_PREFIX}${email}`) === '1') return true
    } catch {
      /* ignore */
    }
  }
  return false
}

/**
 * Hospital admin: must change super-admin-issued temp password before dashboard (first time).
 * - Backend can set `must_change_password` / `first_login` on user or `data`.
 * - If backend says no change needed, skip.
 * - If this browser already recorded a successful change-password, skip (until backend sends flags on new devices).
 * - Otherwise default to **true** so first login always goes to change-password.
 */
export function shouldRequireHospitalAdminPasswordChange(apiUser, response) {
  if (import.meta.env.VITE_FORCE_HOSPITAL_ADMIN_PASSWORD_CHANGE === 'true') {
    return true
  }
  const u = apiUser && typeof apiUser === 'object' ? apiUser : {}
  const data = response?.data ?? response

  // Backend: account already using a real password (not temp-only)
  if (data?.must_change_password === false) return false
  if (u.must_change_password === false) return false
  if (u.is_temporary_password === false) return false
  if (u.first_login === false && (u.password_changed === true || u.has_changed_password === true)) return false

  // Backend: must change temp / first login
  if (data?.must_change_password === true) return true
  if (response?.must_change_password === true) return true
  if (
    u.must_change_password === true ||
    u.require_password_change ||
    u.requires_password_change ||
    u.first_login === true ||
    u.password_change_required
  ) {
    return true
  }

  // This browser: user already finished first change-password step
  if (hasCompletedInitialPasswordInBrowser(u)) return false

  // Default: first credentials from super admin → change password before dashboard
  return true
}

/** @deprecated use shouldRequireHospitalAdminPasswordChange */
export function deriveRequiresHospitalAdminPasswordChange(apiUser, response) {
  return shouldRequireHospitalAdminPasswordChange(apiUser, response)
}
