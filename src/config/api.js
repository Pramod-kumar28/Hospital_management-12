/**
 * Backend API base URL.
 * In dev: empty so requests go to same origin and Vite proxies /api to localhost:8060 (avoids CORS).
 * In production: set VITE_API_BASE_URL in .env (e.g. http://localhost:8060 or your API host).
 */
export const API_BASE_URL = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8060');

/** When using ngrok, skip browser warning so API returns JSON instead of HTML interstitial. Empty object when not ngrok = no impact. */
export const API_HEADERS = (API_BASE_URL && API_BASE_URL.includes('ngrok')) ? { 'ngrok-skip-browser-warning': 'true' } : {};

/** Super Admin: POST create hospital (only method at this path on your backend) */
export const SUPER_ADMIN_HOSPITALS_CREATE = '/api/v1/auth/super-admin/hospitals';

/** Super Admin: GET list, GET one, PUT, PATCH status, DELETE (separate router on backend) */
export const SUPER_ADMIN_HOSPITALS = '/api/v1/super-admin/hospitals';

/** Super Admin: subscription plan management */
export const SUPER_ADMIN_SUBSCRIPTION_PLANS = '/api/v1/super-admin/plans';

/** Super Admin: hospital subscription management */
export const SUPER_ADMIN_HOSPITAL_SUBSCRIPTION = (hospitalName) => `/api/v1/super-admin/hospitals/${encodeURIComponent(hospitalName)}/subscription`;
export const SUPER_ADMIN_HOSPITAL_ASSIGN_PLAN = (hospitalName) => `/api/v1/super-admin/hospitals/${encodeURIComponent(hospitalName)}/assign-plan`;
