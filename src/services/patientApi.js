import { apiFetch } from './apiClient'

/**
 * Helper for protected patient APIs. Adds Authorization: Bearer <access_token>.
 * Uses the shared refresh-retry behavior from apiFetch on 401 responses.
 */
export async function patientApiFetch(path, options = {}) {
  return apiFetch(path, options)
}

