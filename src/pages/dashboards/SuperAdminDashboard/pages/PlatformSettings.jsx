import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Modal from '../../../../components/common/Modal/Modal'
import { API_BASE_URL, API_HEADERS, SUPER_ADMIN_SUBSCRIPTION_PLANS } from '../../../../config/api'

const PLAN_OPTIONS = ['FREE', 'STANDARD', 'PREMIUM']

// Default monthly prices for each plan type
const DEFAULT_PRICES = {
  FREE: 0,
  STANDARD: 1000,    // Middle of 500-1500
  PREMIUM: 2250      // Middle of 1500-3000
}

const EMPTY_FORM = {
  id: '',
  name: 'FREE',
  display_name: '',
  description: '',
  monthly_price: 0,
  yearly_price: 0,
  max_doctors: 0,
  max_patients: 0,
  max_appointments_per_month: 0,
  max_storage_gb: 1
}

const extractApiErrorMessage = (data, fallbackMessage) => {
  const detail = data?.detail

  if (data?.message) return data.message
  if (typeof detail === 'string') return detail
  if (detail?.message) return detail.message
  if (Array.isArray(detail) && detail[0]?.msg) return detail[0].msg
  
  if (data?.errors && Array.isArray(data.errors)) {
    return data.errors.map(err => err.msg || err).join(', ')
  }

  return fallbackMessage
}

const mapPlanFromApi = (plan) => ({
  id: plan?.id ?? plan?.plan_id ?? '',
  name: plan?.name ?? 'FREE',
  display_name: plan?.display_name ?? plan?.plan_name ?? '',
  description: plan?.description ?? '',
  monthly_price: Number(plan?.monthly_price ?? 0),
  yearly_price: Number(plan?.yearly_price ?? 0),
  max_doctors: Number(plan?.max_doctors ?? 0),
  max_patients: Number(plan?.max_patients ?? 0),
  max_appointments_per_month: Number(plan?.max_appointments_per_month ?? 0),
  max_storage_gb: Number(plan?.max_storage_gb ?? 1),
  features: typeof plan?.features === 'object' && plan?.features !== null ? plan.features : {}
})

const getPlanItems = (data) => {
  const raw = data?.data ?? data
  if (Array.isArray(data?.plans)) return data.plans
  if (Array.isArray(raw?.plans)) return raw.plans
  if (Array.isArray(raw?.items)) return raw.items
  if (Array.isArray(raw)) return raw
  return []
}

const formatCurrency = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`
const formatLabel = (value) => String(value || '')
  .replace(/_/g, ' ')
  .replace(/\b\w/g, (char) => char.toUpperCase())

const buildPlanHighlights = (plan) => {
  if (!plan) return []

  const featureEntries = Object.entries(plan.features || {})
    .slice(0, 3)
    .map(([key, value]) => {
      const featureValue = typeof value === 'boolean' ? (value ? 'Enabled' : 'Disabled') : String(value)
      return `${formatLabel(key)}: ${featureValue}`
    })

  return [
    `Up to ${plan.max_doctors} doctors`,
    `Up to ${plan.max_patients} patients`,
    `${plan.max_appointments_per_month} appointments / month`,
    ...featureEntries
  ].filter(Boolean)
}

const PlatformSettings = () => {
  const token = useSelector((state) => state.auth?.token)

  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [listError, setListError] = useState('')
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [currentPlan, setCurrentPlan] = useState(EMPTY_FORM)
  const [deleteLoadingId, setDeleteLoadingId] = useState('')
  const [selectedPlanId, setSelectedPlanId] = useState('')

  const filteredPlans = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return plans

    return plans.filter((plan) =>
      [
        plan.name,
        plan.display_name,
        plan.description,
        Object.keys(plan.features || {}).join(' ')
      ].some((value) => String(value || '').toLowerCase().includes(query))
    )
  }, [plans, search])

  const stats = useMemo(() => ({
    totalPlans: plans.length,
    monthlyRevenuePotential: plans.reduce((sum, plan) => sum + Number(plan.monthly_price || 0), 0),
    yearlyRevenuePotential: plans.reduce((sum, plan) => sum + Number(plan.yearly_price || 0), 0),
    totalStorage: plans.reduce((sum, plan) => sum + Number(plan.max_storage_gb || 0), 0)
  }), [plans])

  const selectedPlan = filteredPlans.find((plan) => plan.id === selectedPlanId)
    || plans.find((plan) => plan.id === selectedPlanId)
    || filteredPlans[0]
    || plans[0]

  useEffect(() => {
    if (!plans.length) {
      setSelectedPlanId('')
      return
    }

    const exists = plans.some((plan) => plan.id === selectedPlanId)
    if (!exists) {
      setSelectedPlanId(plans[0]?.id || '')
    }
  }, [plans, selectedPlanId])

  const fetchPlans = async () => {
    setLoading(true)
    setListError('')

    try {
      const res = await fetch(`${API_BASE_URL}${SUPER_ADMIN_SUBSCRIPTION_PLANS}`, {
        headers: {
          ...API_HEADERS,
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setPlans([])
        setListError(extractApiErrorMessage(data, `Failed to load subscription plans (${res.status})`))
        return
      }

      const mappedPlans = getPlanItems(data).map(mapPlanFromApi)
      setPlans(mappedPlans)
    } catch (error) {
      setPlans([])
      setListError(error?.message || 'Unable to load subscription plans.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [token])

  const openAddModal = () => {
    setModalMode('add')
    setSubmitError('')
    setFieldErrors({})
    setCurrentPlan({
      id: '',
      name: 'FREE',
      display_name: '',
      description: '',
      monthly_price: 0,
      yearly_price: 0,
      max_doctors: 0,
      max_patients: 0,
      max_appointments_per_month: 0,
      max_storage_gb: 1
    })
    setIsModalOpen(true)
  }

  const openEditModal = (plan) => {
    setModalMode('edit')
    setSubmitError('')
    setFieldErrors({})
    setCurrentPlan({
      id: plan.id || '',
      name: plan.name || 'FREE',
      display_name: plan.display_name || '',
      description: plan.description || '',
      monthly_price: plan.monthly_price || 0,
      yearly_price: plan.yearly_price || 0,
      max_doctors: plan.max_doctors || 0,
      max_patients: plan.max_patients || 0,
      max_appointments_per_month: plan.max_appointments_per_month || 0,
      max_storage_gb: plan.max_storage_gb || 1
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSubmitError('')
    setFieldErrors({})
    setCurrentPlan(EMPTY_FORM)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    const numericFields = [
      'monthly_price',
      'yearly_price',
      'max_doctors',
      'max_patients',
      'max_appointments_per_month',
      'max_storage_gb'
    ]

    let newValue = numericFields.includes(name) ? Number(value) : value

    setCurrentPlan((prev) => {
      let updated = { ...prev, [name]: newValue }

      // Auto-set default prices when plan type changes in add mode only
      if (name === 'name' && modalMode === 'add') {
        let defaultMonthly = DEFAULT_PRICES[newValue] || 0
        updated.monthly_price = defaultMonthly
        updated.yearly_price = defaultMonthly * 12
      }

      // Auto-calculate yearly price when monthly price changes
      if (name === 'monthly_price') {
        updated.yearly_price = newValue * 12
      }

      return updated
    })

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validatePlanForm = () => {
    const errors = {}

    if (!PLAN_OPTIONS.includes(currentPlan.name)) {
      errors.name = `Valid options: ${PLAN_OPTIONS.join(', ')}`
    }
    if (!String(currentPlan.display_name || '').trim()) {
      errors.display_name = 'Display name is required.'
    }
    if (currentPlan.display_name?.length > 500) {
      errors.display_name = 'Display name cannot exceed 500 characters.'
    }
    if (!String(currentPlan.description || '').trim()) {
      errors.description = 'Description is required.'
    }
    if (currentPlan.description?.length > 500) {
      errors.description = 'Description cannot exceed 500 characters.'
    }
    if (Number(currentPlan.monthly_price) < 0) {
      errors.monthly_price = 'Monthly price cannot be negative.'
    }
    if (Number(currentPlan.yearly_price) < 0) {
      errors.yearly_price = 'Yearly price cannot be negative.'
    }
    if (Number(currentPlan.max_storage_gb) < 1) {
      errors.max_storage_gb = 'Storage must be at least 1 GB.'
    }
    ;['max_doctors', 'max_patients', 'max_appointments_per_month'].forEach((field) => {
      if (Number(currentPlan[field]) < 0) {
        errors[field] = 'Value cannot be negative.'
      }
    })

    // Range checks for monthly_price based on plan type
    const planType = currentPlan.name
    const monthly = Number(currentPlan.monthly_price)

    if (planType === 'FREE' && monthly !== 0) {
      errors.monthly_price = 'FREE plan must have monthly price 0.'
    } else if (planType === 'STANDARD') {
      if (monthly < 500 || monthly > 1500) {
        errors.monthly_price = 'STANDARD monthly price must be between ₹500 and ₹1500.'
      }
    } else if (planType === 'PREMIUM') {
      if (monthly < 1500 || monthly > 3000) {
        errors.monthly_price = 'PREMIUM monthly price must be between ₹1500 and ₹3000.'
      }
    }

    return errors
  }

  const buildPayload = () => {
    const payload = {
      name: currentPlan.name,
      display_name: String(currentPlan.display_name || '').trim(),
      description: String(currentPlan.description || '').trim(),
      monthly_price: Number(currentPlan.monthly_price || 0),
      yearly_price: Number(currentPlan.yearly_price || 0),
      max_doctors: Number(currentPlan.max_doctors || 0),
      max_patients: Number(currentPlan.max_patients || 0),
      max_appointments_per_month: Number(currentPlan.max_appointments_per_month || 0),
      max_storage_gb: Number(currentPlan.max_storage_gb || 1)
    }
    
    return payload
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!token) {
      setSubmitError('You must be logged in to manage subscription plans.')
      return
    }

    const errors = validatePlanForm()
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setSubmitError('Please correct the highlighted fields.')
      return
    }

    setSubmitLoading(true)
    setSubmitError('')

    try {
      const isEdit = modalMode === 'edit'
      const url = isEdit
        ? `${API_BASE_URL}${SUPER_ADMIN_SUBSCRIPTION_PLANS}/${currentPlan.id}`
        : `${API_BASE_URL}${SUPER_ADMIN_SUBSCRIPTION_PLANS}`

      const payload = buildPayload()

      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          ...API_HEADERS,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })
      
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        const errorMessage = extractApiErrorMessage(data, `Failed to ${isEdit ? 'update' : 'create'} plan (${res.status})`)
        setSubmitError(errorMessage)
        
        if (data.errors) {
          setFieldErrors(data.errors)
        }
        return
      }

      closeModal()
      fetchPlans()
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitError(error?.message || 'Unable to save subscription plan.')
    } finally {
      setSubmitLoading(false)
    }
  }

  const handleDeletePlan = async (plan) => {
    if (!token || !plan?.id) return
    if (!window.confirm(`Delete subscription plan ${plan.display_name || plan.name}?`)) return

    setDeleteLoadingId(plan.id)
    try {
      const res = await fetch(`${API_BASE_URL}${SUPER_ADMIN_SUBSCRIPTION_PLANS}/${plan.id}`, {
        method: 'DELETE',
        headers: {
          ...API_HEADERS,
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        window.alert(extractApiErrorMessage(data, `Failed to delete plan (${res.status})`))
        return
      }

      setPlans((prev) => prev.filter((item) => item.id !== plan.id))
    } catch (error) {
      window.alert(error?.message || 'Unable to delete subscription plan.')
    } finally {
      setDeleteLoadingId('')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
            Subscription Plan Management
          </h1>
          <p className="text-gray-600 mt-2">
            Create, update, list, and delete subscription plans for hospital onboarding and billing.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 font-medium flex items-center justify-center gap-2"
        >
          <i className="fas fa-plus-circle"></i>
          Add Subscription Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <p className="text-sm text-gray-500">Total Plans</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalPlans}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <p className="text-sm text-gray-500">Monthly Revenue</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">{formatCurrency(stats.monthlyRevenuePotential)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <p className="text-sm text-gray-500">Yearly Revenue</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{formatCurrency(stats.yearlyRevenuePotential)}</p>
        </div>
        {/* <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <p className="text-sm text-gray-500">Storage Capacity</p>
          <p className="text-2xl font-bold text-purple-700 mt-1">{stats.totalStorage} GB</p>
        </div> */}
      </div>

      {listError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center justify-between gap-4">
          <span className="flex items-center gap-2"><i className="fas fa-exclamation-circle"></i>{listError}</span>
          <button
            type="button"
            onClick={fetchPlans}
            className="px-3 py-1.5 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-medium"
          >
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.95fr] gap-6">
        <div className="bg-white rounded-xl card-shadow border p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h3 className="font-semibold text-lg">Pricing Plans</h3>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="relative min-w-[240px]">
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search plans..."
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <button
                type="button"
                onClick={fetchPlans}
                className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Refresh
              </button>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Loading subscription plans...</p>
            </div>
          ) : filteredPlans.length === 0 ? (
            <div className="p-12 text-center border rounded-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
                <i className="fas fa-layer-group text-blue-500 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No subscription plans found</h3>
              <p className="text-gray-500 mb-6">
                {plans.length === 0 ? 'Create the first subscription plan.' : 'Try adjusting your search.'}
              </p>
              <button
                type="button"
                onClick={openAddModal}
                className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all font-medium"
              >
                Add Subscription Plan
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPlans.map((plan) => {
                const highlights = buildPlanHighlights(plan)
                const isSelected = (plan.id || plan.name) === (selectedPlan?.id || selectedPlan?.name)

                return (
                  <div
                    key={plan.id || plan.name}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedPlanId(plan.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        setSelectedPlanId(plan.id)
                      }
                    }}
                    className={`border rounded-lg p-4 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-300 ring-2 ring-blue-100 shadow-md'
                        : 'hover:shadow-md border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{plan.display_name || formatLabel(plan.name)}</h4>
                        <p className="text-xs text-gray-500 mt-1">{plan.name}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">{formatCurrency(plan.monthly_price)}/month</div>
                        <div className="text-xs text-gray-500">{formatCurrency(plan.yearly_price)}/year</div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{plan.description || 'No description provided.'}</p>

                    <ul className="text-sm text-gray-600 space-y-1 mb-3">
                      {highlights.slice(0, 5).map((item, index) => (
                        <li key={`${plan.id || plan.name}-highlight-${index}`} className="flex items-start gap-2">
                          <i className="fas fa-check text-green-500 mt-1 text-xs"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
                        onClick={(event) => {
                          event.stopPropagation()
                          openEditModal(plan)
                        }}
                      >
                        Edit Plan
                      </button>
                      <button
                        type="button"
                        className="flex-1 bg-gray-600 text-white py-2 px-3 rounded text-sm hover:bg-gray-700 transition-colors disabled:opacity-60"
                        disabled={deleteLoadingId === plan.id}
                        onClick={(event) => {
                          event.stopPropagation()
                          handleDeletePlan(plan)
                        }}
                      >
                        {deleteLoadingId === plan.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                )
              })}

              <button
                type="button"
                className="w-full border-2 border-dashed border-gray-300 rounded-lg py-4 text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
                onClick={openAddModal}
              >
                <i className="fas fa-plus mr-2"></i>Add New Plan
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl card-shadow border p-6">
          <h3 className="font-semibold text-lg mb-4">Plan Details</h3>

          {selectedPlan ? (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-white">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{selectedPlan.display_name || formatLabel(selectedPlan.name)}</h4>
                    <p className="text-xs text-gray-500 mt-1">{selectedPlan.name}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {stats.totalPlans} Plans
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-3">{selectedPlan.description || 'No description provided.'}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Monthly Price</div>
                    <div className="text-xs text-gray-500">Recurring monthly billing amount</div>
                  </div>
                  <span className="text-blue-600 font-semibold">{formatCurrency(selectedPlan.monthly_price)}</span>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Yearly Price</div>
                    <div className="text-xs text-gray-500">Recurring annual billing amount</div>
                  </div>
                  <span className="text-emerald-600 font-semibold">{formatCurrency(selectedPlan.yearly_price)}</span>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Max Doctors</div>
                    <div className="text-xs text-gray-500">Allowed doctors under this plan</div>
                  </div>
                  <span className="text-gray-800 font-semibold">{selectedPlan.max_doctors}</span>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Max Patients</div>
                    <div className="text-xs text-gray-500">Allowed patient count</div>
                  </div>
                  <span className="text-gray-800 font-semibold">{selectedPlan.max_patients}</span>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Appointments / Month</div>
                    <div className="text-xs text-gray-500">Monthly appointment cap</div>
                  </div>
                  <span className="text-gray-800 font-semibold">{selectedPlan.max_appointments_per_month}</span>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Storage</div>
                    <div className="text-xs text-gray-500">Maximum storage capacity</div>
                  </div>
                  <span className="text-gray-800 font-semibold">{selectedPlan.max_storage_gb} GB</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-base mb-3">Features</h4>
                {Object.keys(selectedPlan.features || {}).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(selectedPlan.features).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{formatLabel(key)}</div>
                          <div className="text-xs text-gray-500">Feature configuration</div>
                        </div>
                        <span className="text-sm font-semibold text-blue-700">
                          {typeof value === 'boolean' ? (value ? 'Enabled' : 'Disabled') : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 border rounded-lg text-sm text-gray-500">
                    No feature metadata available for this plan.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 border rounded-lg text-center text-gray-500">
              Select a subscription plan to view its details.
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalMode === 'add' ? 'Add Subscription Plan' : 'Edit Subscription Plan'}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {submitError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <i className="fas fa-exclamation-circle flex-shrink-0"></i>
              {submitError}
            </div>
          )}

          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-sm">
            Valid backend plan names: <span className="font-semibold">{PLAN_OPTIONS.join(', ')}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Plan Type *</label>
              <select
                name="name"
                value={currentPlan.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${fieldErrors.name ? 'border-red-400' : 'border-gray-200'}`}
              >
                {PLAN_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {fieldErrors.name && <p className="text-sm text-red-600">{fieldErrors.name}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Display Name *</label>
              <input
                type="text"
                name="display_name"
                value={currentPlan.display_name || ''}
                onChange={handleInputChange}
                maxLength={500}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${fieldErrors.display_name ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="e.g. Standard Growth Plan (max 500 characters)"
              />
              <div className="text-right text-xs text-gray-500">
                {currentPlan.display_name?.length || 0} / 500 characters
              </div>
              {fieldErrors.display_name && <p className="text-sm text-red-600">{fieldErrors.display_name}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">Description *</label>
              <textarea
                name="description"
                value={currentPlan.description}
                onChange={handleInputChange}
                rows="3"
                maxLength={500}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none ${fieldErrors.description ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="Describe the plan benefits and intended customer type (max 500 characters)"
              />
              <div className="text-right text-xs text-gray-500">
                {currentPlan.description?.length || 0} / 500 characters
              </div>
              {fieldErrors.description && <p className="text-sm text-red-600">{fieldErrors.description}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Monthly Price *</label>
              <input
                type="number"
                name="monthly_price"
                value={currentPlan.monthly_price}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                  }
                }}
                min="0"
                step="1"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${fieldErrors.monthly_price ? 'border-red-400' : 'border-gray-200'}`}
              />
              {fieldErrors.monthly_price && <p className="text-sm text-red-600">{fieldErrors.monthly_price}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Yearly Price *</label>
              <input
                type="number"
                name="yearly_price"
                value={currentPlan.yearly_price}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                  }
                }}
                min="0"
                step="1"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${fieldErrors.yearly_price ? 'border-red-400' : 'border-gray-200'}`}
              />
              {fieldErrors.yearly_price && <p className="text-sm text-red-600">{fieldErrors.yearly_price}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Max Doctors *</label>
              <input
                type="number"
                name="max_doctors"
                value={currentPlan.max_doctors}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                  }
                }}
                min="0"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${fieldErrors.max_doctors ? 'border-red-400' : 'border-gray-200'}`}
              />
              {fieldErrors.max_doctors && <p className="text-sm text-red-600">{fieldErrors.max_doctors}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Max Patients *</label>
              <input
                type="number"
                name="max_patients"
                value={currentPlan.max_patients}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                  }
                }}
                min="0"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${fieldErrors.max_patients ? 'border-red-400' : 'border-gray-200'}`}
              />
              {fieldErrors.max_patients && <p className="text-sm text-red-600">{fieldErrors.max_patients}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Max Appointments Per Month *</label>
              <input
                type="number"
                name="max_appointments_per_month"
                value={currentPlan.max_appointments_per_month}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                  }
                }}
                min="0"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${fieldErrors.max_appointments_per_month ? 'border-red-400' : 'border-gray-200'}`}
              />
              {fieldErrors.max_appointments_per_month && <p className="text-sm text-red-600">{fieldErrors.max_appointments_per_month}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Max Storage (GB) *</label>
              <input
                type="number"
                name="max_storage_gb"
                value={currentPlan.max_storage_gb}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                  }
                }}
                min="1"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${fieldErrors.max_storage_gb ? 'border-red-400' : 'border-gray-200'}`}
              />
              {fieldErrors.max_storage_gb && <p className="text-sm text-red-600">{fieldErrors.max_storage_gb}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={closeModal}
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
                  Saving...
                </>
              ) : (
                <>
                  <i className={modalMode === 'add' ? 'fas fa-plus-circle' : 'fas fa-save'}></i>
                  {modalMode === 'add' ? 'Create Plan' : 'Update Plan'}
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default PlatformSettings