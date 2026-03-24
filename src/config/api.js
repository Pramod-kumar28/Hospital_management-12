/**
 * Backend API base URL (`BASE_URL` + paths = e.g. http://localhost:8060/api/v1/...).
 * In dev: empty string so requests use the Vite dev server origin and `/api` is proxied to the backend (avoids CORS).
 * In production: set `VITE_API_BASE_URL` (e.g. http://localhost:8060).
 */
export const API_BASE_URL = import.meta.env.DEV
  ? ''
  : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8060');

/** When using ngrok, skip browser warning so API returns JSON instead of HTML interstitial. Empty object when not ngrok = no impact. */
export const API_HEADERS = (API_BASE_URL && API_BASE_URL.includes('ngrok')) ? { 'ngrok-skip-browser-warning': 'true' } : {};

/** Auth: super-admin login */
export const AUTH_SUPER_ADMIN_LOGIN = '/api/v1/auth/super-admin/login';

/** Auth: hospital-admin login */
export const AUTH_HOSPITAL_ADMIN_LOGIN = '/api/v1/auth/hospital-admin/login';

/** Auth: hospital-admin change password (e.g. after first login with temp password) */
export const AUTH_HOSPITAL_ADMIN_CHANGE_PASSWORD = '/api/v1/auth/hospital-admin/change-password';

/** Auth: refresh access token (optional; wire to your backend path if different). */
export const AUTH_REFRESH = '/api/v1/auth/refresh';

/** Super Admin: POST create hospital */
export const SUPER_ADMIN_HOSPITALS_CREATE = '/api/v1/auth/super-admin/hospitals';

/** Super Admin: POST create hospital admin for a hospital */
export const SUPER_ADMIN_HOSPITAL_ADMINS_CREATE = (hospitalId) =>
  `/api/v1/auth/super-admin/hospitals/${encodeURIComponent(hospitalId)}/admins`;

/** Super Admin: GET list, GET one, PUT, PATCH status, DELETE (separate router on backend) */
export const SUPER_ADMIN_HOSPITALS = '/api/v1/super-admin/hospitals';

/** Super Admin: subscription plan management */
export const SUPER_ADMIN_SUBSCRIPTION_PLANS = '/api/v1/super-admin/plans';

/** Super Admin: hospital subscription management */
export const SUPER_ADMIN_HOSPITAL_SUBSCRIPTION = (hospitalName) => `/api/v1/super-admin/hospitals/${encodeURIComponent(hospitalName)}/subscription`;
export const SUPER_ADMIN_HOSPITAL_ASSIGN_PLAN = (hospitalName) => `/api/v1/super-admin/hospitals/${encodeURIComponent(hospitalName)}/assign-plan`;
