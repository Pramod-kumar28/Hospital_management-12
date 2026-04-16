import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'
import Modal from '../../../../components/common/Modal/Modal'
import {
  cancelDoctorAppointment,
  completeDoctorAppointment,
  doctorAppointmentErrorMessage,
  getDoctorAppointmentDetails,
  getDoctorAppointments,
  normalizeDoctorAppointmentDetails,
  normalizeDoctorAppointmentList,
  updateDoctorAppointment,
} from '../../../../services/doctorApi'

const STATUS_OPTIONS = [
  { value: '', label: 'All status' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'REQUESTED', label: 'Requested' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
]

function formatClockTime(timeStr) {
  if (!timeStr) return '-'
  const part = String(timeStr).slice(0, 5)
  const [hRaw, mRaw] = part.split(':')
  const h = parseInt(hRaw, 10)
  const m = mRaw ?? '00'
  if (Number.isNaN(h)) return String(timeStr)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return `${h12}:${m} ${ampm}`
}

function normalizedStatus(status) {
  return String(status || '').toUpperCase()
}

function normalizeStatusLabel(status) {
  const s = normalizedStatus(status)
  if (s === 'REQUESTED' || s === 'PENDING') return 'Pending'
  if (s === 'CONFIRMED') return 'Confirmed'
  if (s === 'COMPLETED') return 'Completed'
  if (s === 'CANCELLED') return 'Cancelled'
  return String(status || 'Unknown').replace(/_/g, ' ')
}

function statusBucket(status) {
  const s = normalizedStatus(status)
  if (s === 'REQUESTED' || s === 'PENDING') return 'Pending'
  if (s === 'CONFIRMED') return 'Confirmed'
  if (s === 'COMPLETED') return 'Completed'
  if (s === 'CANCELLED') return 'Cancelled'
  return null
}

function canEditOrTransition(status) {
  const s = normalizedStatus(status)
  return s !== 'COMPLETED' && s !== 'CANCELLED'
}

const Appointments = () => {
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [actionLoadingRef, setActionLoadingRef] = useState('')
  const [cancelState, setCancelState] = useState({
    isOpen: false,
    appointmentRef: '',
    reason: '',
  })
  const [filters, setFilters] = useState({
    date_from: '',
    date_to: '',
    status: '',
    limit: 50,
  })
  const [editForm, setEditForm] = useState({
    appointment_date: '',
    appointment_time: '',
    duration_minutes: '',
    appointment_type: '',
    notes: '',
    consultation_fee: '',
  })

  const loadAppointments = useCallback(async (showLoader = true) => {
    if (showLoader) setLoading(true)
    setRefreshing(true)
    try {
      const response = await getDoctorAppointments(filters)
      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        toast.error(doctorAppointmentErrorMessage(payload))
        setAppointments([])
        return
      }
      setAppointments(normalizeDoctorAppointmentList(payload))
    } catch {
      toast.error('Could not load appointments. Please check your connection.')
      setAppointments([])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [filters])

  useEffect(() => {
    loadAppointments(true)
  }, [loadAppointments])

  const statConfirmed = useMemo(
    () => appointments.filter((appointment) => statusBucket(appointment.status) === 'Confirmed').length,
    [appointments]
  )
  const statPending = useMemo(
    () => appointments.filter((appointment) => statusBucket(appointment.status) === 'Pending').length,
    [appointments]
  )
  const statCancelled = useMemo(
    () => appointments.filter((appointment) => statusBucket(appointment.status) === 'Cancelled').length,
    [appointments]
  )
  const statCompleted = useMemo(
    () => appointments.filter((appointment) => statusBucket(appointment.status) === 'Completed').length,
    [appointments]
  )

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleViewDetails = async (row) => {
    if (!row?.appointment_ref) return
    setDetailLoading(true)
    try {
      const response = await getDoctorAppointmentDetails(row.appointment_ref)
      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        toast.error(doctorAppointmentErrorMessage(payload))
        return
      }
      setSelectedAppointment(normalizeDoctorAppointmentDetails(payload))
    } catch {
      toast.error('Could not fetch appointment details.')
    } finally {
      setDetailLoading(false)
    }
  }

  const handleEditAppointment = async (row) => {
    if (!row?.appointment_ref) return
    setDetailLoading(true)
    try {
      const response = await getDoctorAppointmentDetails(row.appointment_ref)
      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        toast.error(doctorAppointmentErrorMessage(payload))
        return
      }
      const details = normalizeDoctorAppointmentDetails(payload)
      setSelectedAppointment(details)
      setEditForm({
        appointment_date: details.appointment_date || '',
        appointment_time: String(details.appointment_time || '').slice(0, 5),
        duration_minutes: details.duration_minutes === '' ? '' : String(details.duration_minutes ?? ''),
        appointment_type: details.appointment_type || '',
        notes: details.notes || '',
        consultation_fee: details.consultation_fee === '' ? '' : String(details.consultation_fee ?? ''),
      })
      setIsEditModalOpen(true)
    } catch {
      toast.error('Could not fetch appointment details for editing.')
    } finally {
      setDetailLoading(false)
    }
  }

  const handleUpdateAppointment = async () => {
    if (!selectedAppointment?.appointment_ref) return
    const payload = {
      appointment_date: editForm.appointment_date || null,
      appointment_time: editForm.appointment_time || null,
      duration_minutes: editForm.duration_minutes === '' ? null : Number(editForm.duration_minutes),
      appointment_type: editForm.appointment_type || null,
      notes: String(editForm.notes || '').trim() || null,
      consultation_fee: editForm.consultation_fee === '' ? null : Number(editForm.consultation_fee),
    }

    setSubmitLoading(true)
    try {
      const response = await updateDoctorAppointment(selectedAppointment.appointment_ref, payload)
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        toast.error(doctorAppointmentErrorMessage(data))
        return
      }
      toast.success(data?.message || 'Appointment updated successfully.')
      setIsEditModalOpen(false)
      setSelectedAppointment(null)
      await loadAppointments(false)
    } catch {
      toast.error('Could not update appointment.')
    } finally {
      setSubmitLoading(false)
    }
  }

  const handleCompleteAppointment = async (row) => {
    if (!row?.appointment_ref) return
    if (!window.confirm('Mark this appointment as completed?')) return
    setActionLoadingRef(row.appointment_ref)
    try {
      const response = await completeDoctorAppointment(row.appointment_ref)
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        toast.error(doctorAppointmentErrorMessage(data))
        return
      }
      toast.success(data?.message || 'Appointment completed successfully.')
      await loadAppointments(false)
    } catch {
      toast.error('Could not complete appointment.')
    } finally {
      setActionLoadingRef('')
    }
  }

  const handleCancelAppointment = async () => {
    if (!cancelState.appointmentRef) return
    setActionLoadingRef(cancelState.appointmentRef)
    try {
      const response = await cancelDoctorAppointment(
        cancelState.appointmentRef,
        String(cancelState.reason || '').trim() || 'Cancelled by doctor'
      )
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        toast.error(doctorAppointmentErrorMessage(data))
        return
      }
      toast.success(data?.message || 'Appointment cancelled successfully.')
      setCancelState({ isOpen: false, appointmentRef: '', reason: '' })
      setSelectedAppointment(null)
      await loadAppointments(false)
    } catch {
      toast.error('Could not cancel appointment.')
    } finally {
      setActionLoadingRef('')
    }
  }

  if (loading && appointments.length === 0) return <LoadingSpinner />

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center">Appointments</h2>
            <p className="text-sm text-gray-500">Manage and track your patient appointments</p>
          </div>
        </div>
        {refreshing && <p className="text-sm text-gray-500">Refreshing...</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group rounded-xl p-6 text-white bg-gradient-to-br from-blue-500 to-blue-700 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Confirmed</p>
              <p className="text-3xl font-bold mt-1">{statConfirmed}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition">
              <i className="fas fa-check-circle text-2xl"></i>
            </div>
          </div>
        </div>

        <div className="group rounded-xl p-6 text-white bg-gradient-to-br from-yellow-400 to-yellow-600 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Pending</p>
              <p className="text-3xl font-bold mt-1">{statPending}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition">
              <i className="fas fa-clock text-2xl"></i>
            </div>
          </div>
        </div>

        <div className="group rounded-xl p-6 text-white bg-gradient-to-br from-red-500 to-red-700 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Cancelled</p>
              <p className="text-3xl font-bold mt-1">{statCancelled}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition">
              <i className="fas fa-times-circle text-2xl"></i>
            </div>
          </div>
        </div>

        <div className="group rounded-xl p-6 text-white bg-gradient-to-br from-green-500 to-emerald-600 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Completed</p>
              <p className="text-3xl font-bold mt-1">{statCompleted}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition">
              <i className="fas fa-check-double text-2xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue rounded-xl border card-shadow">
        <div className="px-5 py-4 border-b">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <h3 className="text-lg font-semibold text-gray-800">Appointment List</h3>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="date"
                value={filters.date_from}
                onChange={(e) => handleFilterChange('date_from', e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="date"
                value={filters.date_to}
                onChange={(e) => handleFilterChange('date_to', e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm"
              />
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm min-w-[150px]"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value || 'all'} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                value={filters.limit}
                onChange={(e) => handleFilterChange('limit', Number(e.target.value))}
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <option value={20}>20 rows</option>
                <option value={50}>50 rows</option>
                <option value={100}>100 rows</option>
              </select>
              <button
                type="button"
                onClick={() => loadAppointments(false)}
                className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-50"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <DataTable
            columns={[
              { key: 'appointment_ref', title: 'Reference', sortable: true },
              { key: 'patient_name', title: 'Patient', sortable: true },
              {
                key: 'appointment_time',
                title: 'Date & Time',
                sortable: false,
                render: (_, row) => (
                  <div>
                    <p className="font-medium text-gray-900">{row.appointment_date || '-'}</p>
                    <p className="text-gray-600">{formatClockTime(row.appointment_time)}</p>
                  </div>
                ),
              },
              { key: 'reason', title: 'Reason', sortable: true },
              {
                key: 'status',
                title: 'Status',
                render: (v) => (
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      normalizedStatus(v) === 'CONFIRMED'
                        ? 'status-confirmed'
                        : normalizedStatus(v) === 'COMPLETED'
                          ? 'status-completed'
                          : normalizedStatus(v) === 'CANCELLED'
                            ? 'status-cancelled'
                            : 'status-pending'
                    }`}
                  >
                    {normalizeStatusLabel(v)}
                  </span>
                ),
              },
              {
                key: 'appointment_type',
                title: 'Type',
                render: (v) => (
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      v === 'Urgent' || v === 'Emergency' ? 'status-urgent' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {v}
                  </span>
                ),
              },
              {
                key: 'actions',
                title: 'Actions',
                render: (_, row) => (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewDetails(row)
                      }}
                      className="icon-btn text-gray-600"
                      title="View details"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditAppointment(row)
                      }}
                      className="icon-btn text-blue-600 disabled:opacity-50"
                      title="Edit"
                      disabled={!canEditOrTransition(row.status)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCompleteAppointment(row)
                      }}
                      className="icon-btn text-green-600 disabled:opacity-50"
                      title="Mark completed"
                      disabled={!canEditOrTransition(row.status) || actionLoadingRef === row.appointment_ref}
                    >
                      <i className="fas fa-check"></i>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setCancelState({
                          isOpen: true,
                          appointmentRef: row.appointment_ref,
                          reason: '',
                        })
                      }}
                      className="icon-btn text-red-600 disabled:opacity-50"
                      title="Cancel"
                      disabled={!canEditOrTransition(row.status) || actionLoadingRef === row.appointment_ref}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ),
              },
            ]}
            data={appointments}
          />
        </div>
      </div>

      {detailLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg px-6 py-4 shadow-lg text-gray-700">Loading details...</div>
        </div>
      )}

      <Modal
        isOpen={Boolean(selectedAppointment) && !isEditModalOpen}
        onClose={() => setSelectedAppointment(null)}
        title="Appointment Details"
        size="lg"
      >
        {selectedAppointment && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Reference</p>
                <p className="font-mono text-sm">{selectedAppointment.appointment_ref || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{normalizeStatusLabel(selectedAppointment.status)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Patient</p>
                <p className="font-medium">{selectedAppointment.patient_name || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{selectedAppointment.patient_phone || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{selectedAppointment.appointment_date || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{formatClockTime(selectedAppointment.appointment_time)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{selectedAppointment.appointment_type || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">
                  {selectedAppointment.duration_minutes ? `${selectedAppointment.duration_minutes} mins` : '-'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Consultation Fee</p>
                <p className="font-medium">
                  {selectedAppointment.consultation_fee !== '' && selectedAppointment.consultation_fee != null
                    ? `Rs ${selectedAppointment.consultation_fee}`
                    : '-'}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Reason</p>
              <p className="font-medium">{selectedAppointment.reason || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Notes</p>
              <p className="font-medium whitespace-pre-wrap">{selectedAppointment.notes || '-'}</p>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button type="button" className="btn-secondary" onClick={() => setSelectedAppointment(null)}>
                Close
              </button>
              {canEditOrTransition(selectedAppointment.status) && (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => handleEditAppointment(selectedAppointment)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedAppointment(null)
        }}
        title="Edit Appointment"
        size="lg"
      >
        {selectedAppointment && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Date</label>
                <input
                  className="form-input"
                  type="date"
                  value={editForm.appointment_date}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, appointment_date: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Time</label>
                <input
                  className="form-input"
                  type="time"
                  value={editForm.appointment_time}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, appointment_time: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Duration (mins)</label>
                <input
                  className="form-input"
                  type="number"
                  min="1"
                  value={editForm.duration_minutes}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, duration_minutes: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Type</label>
                <input
                  className="form-input"
                  value={editForm.appointment_type}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, appointment_type: e.target.value }))}
                  placeholder="Regular / Follow-up / Urgent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Consultation Fee</label>
                <input
                  className="form-input"
                  type="number"
                  min="0"
                  value={editForm.consultation_fee}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, consultation_fee: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Notes</label>
              <textarea
                className="form-input"
                rows={3}
                value={editForm.notes}
                onChange={(e) => setEditForm((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Add doctor notes"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                className="btn-secondary"
                onClick={() => {
                  setIsEditModalOpen(false)
                  setSelectedAppointment(null)
                }}
              >
                Cancel
              </button>
              <button className="btn-primary" onClick={handleUpdateAppointment} disabled={submitLoading}>
                {submitLoading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={cancelState.isOpen}
        onClose={() => setCancelState({ isOpen: false, appointmentRef: '', reason: '' })}
        title="Cancel Appointment"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Reference: <span className="font-mono">{cancelState.appointmentRef || '-'}</span>
          </p>
          <textarea
            rows={3}
            className="form-input"
            value={cancelState.reason}
            onChange={(e) => setCancelState((prev) => ({ ...prev, reason: e.target.value }))}
            placeholder="Reason for cancellation (optional)"
          />
          <div className="flex justify-end gap-3">
            <button
              className="btn-secondary"
              onClick={() => setCancelState({ isOpen: false, appointmentRef: '', reason: '' })}
            >
              Back
            </button>
            <button
              className="btn-primary bg-red-600 hover:bg-red-700"
              onClick={handleCancelAppointment}
              disabled={actionLoadingRef === cancelState.appointmentRef}
            >
              {actionLoadingRef === cancelState.appointmentRef ? 'Cancelling...' : 'Confirm Cancel'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Appointments
