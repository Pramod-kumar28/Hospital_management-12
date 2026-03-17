/**
 * Backend API base URL.
 * In dev: empty so requests go to same origin and Vite proxies /api to localhost:8060 (avoids CORS).
 * In production: set VITE_API_BASE_URL in .env (e.g. http://localhost:8060 or your API host).
 */
export const API_BASE_URL = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8060');

/** Super Admin: POST create hospital (only method at this path on your backend) */
export const SUPER_ADMIN_HOSPITALS_CREATE = '/api/v1/auth/super-admin/hospitals';

/** Super Admin: GET list, GET one, PUT, PATCH status, DELETE (separate router on backend) */
export const SUPER_ADMIN_HOSPITALS = '/api/v1/super-admin/hospitals';
