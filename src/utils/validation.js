/** Backend pydantic: ^\+?[\d\s\-\(\)]{10,20}$ */
export const PHONE_REGEX = /^\+?[\d\s\-()]{10,20}$/
export const PASSWORD_MIN_LENGTH = 8

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim())
}
