import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Modal from '../../../../components/common/Modal/Modal'
import { SUPER_ADMIN_HOSPITALS, SUPER_ADMIN_HOSPITAL_ADMINS_CREATE } from '../../../../config/api'
import { apiFetch } from '../../../../services/apiClient'
import { PHONE_REGEX, PASSWORD_MIN_LENGTH } from '../../../../utils/validation'

const HOSPITAL_ADMIN_ENDPOINTS = {
  list: (hospitalId) => `/api/v1/super-admin/hospitals/${hospitalId}/admins`,
  create: (hospitalId) => SUPER_ADMIN_HOSPITAL_ADMINS_CREATE(hospitalId),
  updateStatus: (adminId) => `/api/v1/super-admin/hospital-admins/${adminId}/status`,
  resetPassword: (adminId) => `/api/v1/super-admin/hospital-admins/${adminId}/reset-password`
}

const STATUS_STYLES = {
  ACTIVE: 'bg-emerald-100 text-emerald-700',
  BLOCKED: 'bg-red-100 text-red-700',
  PENDING: 'bg-amber-100 text-amber-700'
}

const EMPTY_FORM = {
  email: '',
  phone: '',
  first_name: '',
  last_name: '',
  password: '',
  hospital_id: ''
}

const getHospitalItems = (data) => {
  const raw = data?.data ?? data
  if (Array.isArray(raw?.items)) return raw.items
  if (Array.isArray(raw?.hospitals)) return raw.hospitals
  if (Array.isArray(raw)) return raw
  return []
}

const getAdminItems = (data) => {
  const raw = data?.data ?? data
  if (Array.isArray(data?.admins)) return data.admins
  if (Array.isArray(raw?.items)) return raw.items
  if (Array.isArray(raw?.admins)) return raw.admins
  if (Array.isArray(raw)) return raw
  return []
}

const normalizeStatus = (status) => {
  const value = String(status || '').toUpperCase()
  return value === 'ACTIVE' || value === 'BLOCKED' || value === 'PENDING' ? value : 'PENDING'
}

const mapHospital = (hospital) => ({
  id: hospital?.id ?? hospital?.hospital_id ?? '',
  name: hospital?.name ?? hospital?.hospital_name ?? 'Unnamed Hospital'
})

const mapAdmin = (admin) => ({
  id: admin?.id ?? admin?.admin_id ?? admin?.user_id ?? '',
  email: admin?.email ?? '',
  phone: admin?.phone ?? admin?.mobile ?? '',
  first_name: admin?.first_name ?? admin?.firstName ?? '',
  last_name: admin?.last_name ?? admin?.lastName ?? '',
  status: normalizeStatus(admin?.status),
  last_login: admin?.last_login ?? admin?.lastLogin ?? '',
  created_at: admin?.created_at ?? admin?.createdAt ?? '',
  hospital_id: admin?.hospital_id ?? admin?.hospital?.id ?? '',
  hospital_name: admin?.hospital_name ?? admin?.hospital?.name ?? ''
})

const formatDateTime = (value) => {
  if (!value) return 'Never'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString()
}

const formatStatus = (status) => {
  const value = normalizeStatus(status)
  return value.charAt(0) + value.slice(1).toLowerCase()
}

const extractApiErrorMessage = (data, fallbackMessage) => {
  const detail = data?.detail

  if (data?.message) return data.message
  if (typeof detail === 'string') return detail
  if (detail?.message) return detail.message
  if (detail?.detail?.message) return detail.detail.message

  if (Array.isArray(detail) && detail[0]?.msg) {
    return detail[0].msg
  }

  return fallbackMessage
}

const HospitalAdministratorManagement = () => {
  const token = useSelector((state) => state.auth?.token)

  const [hospitals, setHospitals] = useState([])
  const [selectedHospitalId, setSelectedHospitalId] = useState('')
  const [admins, setAdmins] = useState([])
  const [filters, setFilters] = useState({ status: '', search: '' })
  const [loadingHospitals, setLoadingHospitals] = useState(true)
  const [loadingAdmins, setLoadingAdmins] = useState(false)
  const [listError, setListError] = useState('')
  const [hospitalError, setHospitalError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [actionLoading, setActionLoading] = useState({})
  const [passwordResetResult, setPasswordResetResult] = useState(null)

  const selectedHospital = hospitals.find((hospital) => hospital.id === selectedHospitalId)

  const filteredAdmins = useMemo(() => {
    return admins.filter((admin) => {
      const matchesStatus = !filters.status || admin.status === filters.status
      const query = filters.search.trim().toLowerCase()
      const matchesSearch = !query || [
        admin.first_name,
        admin.last_name,
        `${admin.first_name} ${admin.last_name}`.trim(),
        admin.email,
        admin.phone
      ].some((value) => String(value || '').toLowerCase().includes(query))

      return matchesStatus && matchesSearch
    })
  }, [admins, filters.search, filters.status])

  const stats = useMemo(() => ({
    total: admins.length,
    active: admins.filter((admin) => admin.status === 'ACTIVE').length,
    blocked: admins.filter((admin) => admin.status === 'BLOCKED').length,
    pending: admins.filter((admin) => admin.status === 'PENDING').length
  }), [admins])

  const fetchHospitals = async () => {
    setLoadingHospitals(true)
    setHospitalError('')

    try {
      const res = await apiFetch(`${SUPER_ADMIN_HOSPITALS}?page=1&limit=100`)
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setHospitals([])
        setHospitalError(extractApiErrorMessage(data, `Failed to load hospitals (${res.status})`))
        return
      }

      const mappedHospitals = getHospitalItems(data).map(mapHospital).filter((hospital) => hospital.id)
      setHospitals(mappedHospitals)
      setSelectedHospitalId((current) => {
        if (current && mappedHospitals.some((hospital) => hospital.id === current)) return current
        return mappedHospitals[0]?.id || ''
      })
    } catch (error) {
      setHospitals([])
      setHospitalError(error?.message || 'Unable to load hospitals.')
    } finally {
      setLoadingHospitals(false)
    }
  }

  const fetchAdmins = async (hospitalId) => {
    if (!hospitalId) {
      setAdmins([])
      return
    }

    setLoadingAdmins(true)
    setListError('')

    try {
      const res = await apiFetch(HOSPITAL_ADMIN_ENDPOINTS.list(hospitalId))
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setAdmins([])
        setListError(extractApiErrorMessage(data, `Failed to load hospital administrators (${res.status})`))
        return
      }

      setAdmins(getAdminItems(data).map(mapAdmin))
    } catch (error) {
      setAdmins([])
      setListError(error?.message || 'Unable to load hospital administrators.')
    } finally {
      setLoadingAdmins(false)
    }
  }

  useEffect(() => {
    fetchHospitals()
  }, [token])

  useEffect(() => {
    fetchAdmins(selectedHospitalId)
  }, [selectedHospitalId, token])

  const openCreateModal = () => {
    if (!selectedHospitalId) return

    setSubmitError('')
    setFieldErrors({})
    setFormData({
      ...EMPTY_FORM,
      hospital_id: selectedHospitalId
    })
    setIsModalOpen(true)
  }

  const closeCreateModal = () => {
    setIsModalOpen(false)
    setSubmitError('')
    setFieldErrors({})
    setFormData(EMPTY_FORM)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    if (fieldErrors[name]) {
      setFieldErrors((current) => ({ ...current, [name]: '' }))
    }
  }

  const validateForm = () => {
    const errors = {}
    const email = formData.email.trim()
    const phone = formData.phone.trim()
    const firstName = formData.first_name.trim()
    const lastName = formData.last_name.trim()
    const password = formData.password

    if (!firstName || firstName.length < 2) errors.first_name = 'First name must be at least 2 characters.'
    if (!lastName || lastName.length < 2) errors.last_name = 'Last name must be at least 2 characters.'
    if (!email) errors.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.'
    if (!phone) errors.phone = 'Phone number is required.'
    else if (!PHONE_REGEX.test(phone)) errors.phone = 'Phone must match 10–20 characters (digits, spaces, -, parentheses).'
    if (!password || password.length < PASSWORD_MIN_LENGTH) {
      errors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`
    }
    if (!formData.hospital_id) errors.hospital_id = 'Please select a hospital.'

    return errors
  }

  const handleCreateAdmin = async (event) => {
    event.preventDefault()

    if (!token) {
      setSubmitError('You must be logged in to create a hospital administrator.')
      return
    }

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setSubmitError('Please correct the highlighted fields.')
      return
    }

    setSubmitLoading(true)
    setSubmitError('')

    try {
      const hospitalId = formData.hospital_id || selectedHospitalId
      const payload = {
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        password: formData.password
      }

      const res = await apiFetch(HOSPITAL_ADMIN_ENDPOINTS.create(hospitalId), {
        method: 'POST',
        body: payload
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setSubmitError(extractApiErrorMessage(data, `Failed to create administrator (${res.status})`))
        return
      }

      toast.success(data?.message || 'Hospital administrator created')
      closeCreateModal()
      setPasswordResetResult(null)
      fetchAdmins(hospitalId)
    } catch (error) {
      setSubmitError(error?.message || 'Unable to create hospital administrator.')
    } finally {
      setSubmitLoading(false)
    }
  }

  const runAdminAction = async (adminId, actionKey, requestConfig, onSuccess) => {
    if (!token || !adminId) return

    const loadingKey = `${actionKey}-${adminId}`
    setActionLoading((current) => ({ ...current, [loadingKey]: true }))

    try {
      const res = await apiFetch(requestConfig.path, {
        method: requestConfig.method || 'POST',
        ...(requestConfig.body ? { body: requestConfig.body } : {})
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        window.alert(extractApiErrorMessage(data, `Action failed (${res.status})`))
        return
      }

      onSuccess?.(data)
    } catch (error) {
      window.alert(error?.message || 'Network error. Please try again.')
    } finally {
      setActionLoading((current) => ({ ...current, [loadingKey]: false }))
    }
  }

  const updateAdminStatus = (adminId, status) => {
    runAdminAction(
      adminId,
      'status',
      {
        path: HOSPITAL_ADMIN_ENDPOINTS.updateStatus(adminId),
        method: 'PATCH',
        body: { status }
      },
      () => {
        setAdmins((current) => current.map((admin) => (
          admin.id === adminId ? { ...admin, status } : admin
        )))
      }
    )
  }

  const resetPassword = (admin) => {
    const confirmed = window.confirm(`Reset password for ${admin.first_name} ${admin.last_name}?`)
    if (!confirmed) return

    runAdminAction(
      admin.id,
      'reset',
      {
        path: HOSPITAL_ADMIN_ENDPOINTS.resetPassword(admin.id),
        method: 'POST'
      },
      (data) => {
        const temporaryPassword =
          data?.temporary_password ||
          data?.password ||
          data?.data?.temporary_password ||
          data?.data?.password ||
          ''

        setPasswordResetResult({
          adminName: `${admin.first_name} ${admin.last_name}`.trim(),
          password: temporaryPassword
        })

        if (temporaryPassword) {
          window.alert(`Temporary password for ${admin.first_name} ${admin.last_name}: ${temporaryPassword}`)
        } else {
          window.alert(`Password reset completed for ${admin.first_name} ${admin.last_name}.`)
        }
      }
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
            Hospital Administrator Management
          </h1>
          <p className="text-gray-600 mt-2">Create and manage hospital administrator accounts by hospital.</p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          disabled={!selectedHospitalId}
          className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 font-medium flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
        >
          <i className="fas fa-user-plus"></i>
          Add Hospital Administrator
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Admins</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-slate-100 text-blue-600 flex items-center justify-center">
              <i className="fas fa-users-cog"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold text-emerald-700">{stats.active}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-slate-100 text-emerald-600 flex items-center justify-center">
              <i className="fas fa-user-check"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Blocked</p>
              <p className="text-2xl font-bold text-red-700">{stats.blocked}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-100 to-slate-100 text-red-600 flex items-center justify-center">
              <i className="fas fa-user-lock"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-amber-700">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-slate-100 text-amber-600 flex items-center justify-center">
              <i className="fas fa-user-clock"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="flex-1 min-w-0">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Hospital</label>
            <select
              value={selectedHospitalId}
              onChange={(event) => setSelectedHospitalId(event.target.value)}
              disabled={loadingHospitals}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-60"
            >
              <option value="">{loadingHospitals ? 'Loading hospitals...' : 'Select hospital'}</option>
              {hospitals.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.name}
                </option>
              ))}
            </select>
            {selectedHospital && (
              <p className="mt-2 text-sm text-gray-500">
                Selected hospital ID: <span className="font-medium text-gray-700">{selectedHospital.id}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:w-auto">
            <div className="h-5"></div> {/* Spacer to align with label */}
           
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-4">
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={filters.search}
              onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <select
            value={filters.status}
            onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          >
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="BLOCKED">Blocked</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>

        {hospitalError && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center justify-between gap-4">
            <span className="flex items-center gap-2"><i className="fas fa-exclamation-circle"></i>{hospitalError}</span>
            <button
              type="button"
              onClick={fetchHospitals}
              className="px-3 py-1.5 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-medium"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      {listError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center justify-between gap-4">
          <span className="flex items-center gap-2"><i className="fas fa-exclamation-circle"></i>{listError}</span>
          <button
            type="button"
            onClick={() => fetchAdmins(selectedHospitalId)}
            className="px-3 py-1.5 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-medium"
          >
            Retry
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {loadingAdmins ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600">Loading hospital administrators...</p>
          </div>
        ) : !selectedHospitalId ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <i className="fas fa-hospital text-gray-400 text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Select a hospital to continue</h3>
            <p className="text-gray-500">Choose a hospital above to load its administrator accounts.</p>
          </div>
        ) : filteredAdmins.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
              <i className="fas fa-user-shield text-blue-500 text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No hospital administrators found</h3>
            <p className="text-gray-500 mb-6">
              {admins.length === 0
                ? 'Create the first hospital administrator for this hospital.'
                : 'Try adjusting your search or status filter.'}
            </p>
            <button
              type="button"
              onClick={openCreateModal}
              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all font-medium"
            >
              Add Hospital Administrator
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px]">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Administrator</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Contact</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Created</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Last Login</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmins.map((admin) => {
                  const statusLoading = actionLoading[`status-${admin.id}`]
                  const resetLoading = actionLoading[`reset-${admin.id}`]

                  return (
                    <tr
                      key={admin.id}
                      className="border-b border-gray-100 hover:bg-blue-50/30 transition-all duration-300"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                            <i className="fas fa-user-shield"></i>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {[admin.first_name, admin.last_name].filter(Boolean).join(' ') || 'Unnamed Administrator'}
                            </p>
                            <p className="text-sm text-gray-500">{admin.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-medium text-gray-900">{admin.phone || 'N/A'}</p>
                        <p className="text-sm text-gray-500">{selectedHospital?.name || admin.hospital_name || 'Selected hospital'}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_STYLES[admin.status] || STATUS_STYLES.PENDING}`}>
                          {formatStatus(admin.status)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-700">{formatDateTime(admin.created_at)}</td>
                      <td className="py-4 px-6 text-sm text-gray-700">{formatDateTime(admin.last_login)}</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-2">
                          {admin.status !== 'ACTIVE' && (
                            <button
                              type="button"
                              onClick={() => updateAdminStatus(admin.id, 'ACTIVE')}
                              disabled={statusLoading}
                              className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors text-sm font-medium disabled:opacity-60"
                            >
                              Activate
                            </button>
                          )}

                          {admin.status !== 'BLOCKED' && (
                            <button
                              type="button"
                              onClick={() => updateAdminStatus(admin.id, 'BLOCKED')}
                              disabled={statusLoading}
                              className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors text-sm font-medium disabled:opacity-60"
                            >
                              Block
                            </button>
                          )}

                          {admin.status !== 'PENDING' && (
                            <button
                              type="button"
                              onClick={() => updateAdminStatus(admin.id, 'PENDING')}
                              disabled={statusLoading}
                              className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors text-sm font-medium disabled:opacity-60"
                            >
                              Set Pending
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => resetPassword(admin)}
                            disabled={resetLoading}
                            className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors text-sm font-medium disabled:opacity-60"
                          >
                            {resetLoading ? 'Resetting...' : 'Reset Password'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeCreateModal}
        title={
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
              <i className="fas fa-user-plus text-white"></i>
            </div>
            <span className="text-xl font-bold text-gray-900">Add Hospital Administrator</span>
          </div>
        }
        size="lg"
      >
        <form onSubmit={handleCreateAdmin} className="space-y-6">
          {submitError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <i className="fas fa-exclamation-circle flex-shrink-0"></i>
              {submitError}
            </div>
          )}

          {selectedHospital && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm flex items-start gap-2">
              <i className="fas fa-info-circle mt-0.5 flex-shrink-0"></i>
              <span>
                The administrator email must match one of the approved email domains configured for
                {' '}
                <span className="font-semibold">{selectedHospital.name}</span>.
                If creation fails with an approved-domain error, configure the hospital domains first in the backend.
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">Hospital <span className="text-red-500">*</span></label>
              <select
                name="hospital_id"
                value={formData.hospital_id}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${fieldErrors.hospital_id ? 'border-red-400' : 'border-gray-200'}`}
              >
                <option value="">Select hospital</option>
                {hospitals.map((hospital) => (
                  <option key={hospital.id} value={hospital.id}>
                    {hospital.name}
                  </option>
                ))}
              </select>
              {fieldErrors.hospital_id && <p className="text-sm text-red-600">{fieldErrors.hospital_id}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${fieldErrors.first_name ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="Enter first name"
              />
              {fieldErrors.first_name && <p className="text-sm text-red-600">{fieldErrors.first_name}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${fieldErrors.last_name ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="Enter last name"
              />
              {fieldErrors.last_name && <p className="text-sm text-red-600">{fieldErrors.last_name}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${fieldErrors.email ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="user@example.com"
              />
              {fieldErrors.email && <p className="text-sm text-red-600">{fieldErrors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Phone <span className="text-red-500">*</span></label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${fieldErrors.phone ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="+91 9876543210"
              />
              {fieldErrors.phone && <p className="text-sm text-red-600">{fieldErrors.phone}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">Password <span className="text-red-500">*</span></label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${fieldErrors.password ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="Enter secure password"
              />
              {fieldErrors.password && <p className="text-sm text-red-600">{fieldErrors.password}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={closeCreateModal}
              className="px-5 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitLoading}
              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 font-medium flex items-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
            >
              {submitLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Creating...
                </>
              ) : (
                <>
                  <i className="fas fa-user-plus"></i>
                  Create Administrator
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default HospitalAdministratorManagement
