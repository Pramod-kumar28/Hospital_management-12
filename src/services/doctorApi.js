import { apiFetch } from './apiClient'

const DOCTOR_APPOINTMENT_BASE_CANDIDATES = [
  '/api/v1/doctor-management',
  '/api/v1/doctor-dashboard',
  '/api/v1/doctor',
  '/api/v1/doctors',
  '/api/v1/doctor-appointments',
]

function normalizeApiData(payload) {
  return payload?.data ?? payload ?? {}
}

function withQuery(path, queryObj = {}) {
  const query = new URLSearchParams()
  Object.entries(queryObj).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      query.set(key, String(value))
    }
  })
  const queryString = query.toString()
  return queryString ? `${path}?${queryString}` : path
}

async function doctorApiFetchWithFallback(paths, options = {}) {
  let lastResponse = null
  let lastPath = ''

  for (const path of paths) {
    const response = await apiFetch(path, options)
    lastResponse = response
    lastPath = path
    if (response.status !== 404) return response
  }

  if (lastResponse) {
    lastResponse._attemptedPath = lastPath
  }
  return lastResponse
}

function buildAppointmentPaths({ appointmentRef, action = 'list', query = {} } = {}) {
  return DOCTOR_APPOINTMENT_BASE_CANDIDATES.map((base) => {
    if (action === 'list') return withQuery(`${base}/appointments`, query)
    if (action === 'details') return `${base}/appointments/${encodeURIComponent(appointmentRef)}`
    if (action === 'update') return `${base}/appointments/${encodeURIComponent(appointmentRef)}`
    if (action === 'complete') return `${base}/appointments/${encodeURIComponent(appointmentRef)}/complete`
    if (action === 'cancel') return `${base}/appointments/${encodeURIComponent(appointmentRef)}/cancel`
    return ''
  }).filter(Boolean)
}

export function doctorAppointmentErrorMessage(payload) {
  const detail = payload?.detail
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail)) return detail.map((item) => item?.msg || JSON.stringify(item)).join('; ')
  if (detail && typeof detail === 'object' && detail.message) return detail.message
  return payload?.message || 'Request failed'
}

export function normalizeDoctorAppointmentList(payload) {
  const data = normalizeApiData(payload)
  const rawAppointments = Array.isArray(data)
    ? data
    : Array.isArray(data?.appointments)
      ? data.appointments
      : Array.isArray(data?.items)
        ? data.items
        : []

  return rawAppointments.map((item) => ({
    appointment_ref: item?.appointment_ref || item?.reference || String(item?.id || ''),
    patient_name: item?.patient_name || item?.patient || 'Unknown',
    appointment_date: item?.appointment_date || item?.date || '',
    appointment_time: item?.appointment_time || item?.time || '',
    status: item?.status || 'PENDING',
    appointment_type: item?.appointment_type || item?.type || 'Regular',
    reason: item?.chief_complaint || item?.reason || '-',
    duration_minutes: item?.duration_minutes ?? item?.duration ?? null,
    notes: item?.notes || '',
    consultation_fee: item?.consultation_fee ?? null,
  }))
}

export function normalizeDoctorAppointmentDetails(payload) {
  const data = normalizeApiData(payload)
  return {
    appointment_ref: data?.appointment_ref || data?.reference || '',
    patient_name: data?.patient_name || data?.patient || 'Unknown',
    patient_phone: data?.patient_phone || data?.phone || '',
    appointment_date: data?.appointment_date || data?.date || '',
    appointment_time: data?.appointment_time || data?.time || '',
    status: data?.status || 'PENDING',
    appointment_type: data?.appointment_type || data?.type || 'Regular',
    reason: data?.chief_complaint || data?.reason || '',
    duration_minutes: data?.duration_minutes ?? data?.duration ?? '',
    notes: data?.notes || '',
    consultation_fee: data?.consultation_fee ?? '',
  }
}

export function getDoctorAppointments(filters = {}) {
  const query = {
    date_from: filters.date_from,
    date_to: filters.date_to,
    status: filters.status,
    limit: filters.limit ?? 50,
  }
  return doctorApiFetchWithFallback(buildAppointmentPaths({ action: 'list', query }))
}

export function getDoctorAppointmentDetails(appointmentRef) {
  return doctorApiFetchWithFallback(buildAppointmentPaths({ action: 'details', appointmentRef }))
}

export function updateDoctorAppointment(appointmentRef, body) {
  return doctorApiFetchWithFallback(buildAppointmentPaths({ action: 'update', appointmentRef }), {
    method: 'PUT',
    body,
  })
}

export function completeDoctorAppointment(appointmentRef) {
  return doctorApiFetchWithFallback(buildAppointmentPaths({ action: 'complete', appointmentRef }), {
    method: 'POST',
  })
}

export function cancelDoctorAppointment(appointmentRef, cancellationReason) {
  return doctorApiFetchWithFallback(buildAppointmentPaths({ action: 'cancel', appointmentRef }), {
    method: 'POST',
    body: { cancellation_reason: cancellationReason },
  })
}
