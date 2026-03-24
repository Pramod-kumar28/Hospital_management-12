import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Modal from '../../../../components/common/Modal/Modal'
import {
  API_BASE_URL,
  API_HEADERS,
  SUPER_ADMIN_HOSPITALS,
  SUPER_ADMIN_HOSPITAL_ASSIGN_PLAN,
  SUPER_ADMIN_HOSPITAL_SUBSCRIPTION,
  SUPER_ADMIN_SUBSCRIPTION_PLANS
} from '../../../../config/api'

const EMPTY_FORM = {
  hospital_name: '',
  plan_name: '',
  start_date: '',
  end_date: '',
  is_trial: false,
  auto_renew: true
}

const formatDate = (value) => {
  if (!value) return 'N/A'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toISOString().split('T')[0]
}

const formatCurrency = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`

const extractApiErrorMessage = (data, fallbackMessage) => {
  const detail = data?.detail
  if (data?.message) return data.message
  if (typeof detail === 'string') return detail
  if (detail?.message) return detail.message
  if (Array.isArray(detail) && detail[0]?.msg) return detail[0].msg
  return fallbackMessage
}

const getHospitalItems = (data) => {
  const raw = data?.data ?? data
  if (Array.isArray(raw?.items)) return raw.items
  if (Array.isArray(raw?.hospitals)) return raw.hospitals
  if (Array.isArray(raw)) return raw
  return []
}

const getPlanItems = (data) => {
  const raw = data?.data ?? data
  if (Array.isArray(data?.plans)) return data.plans
  if (Array.isArray(raw?.plans)) return raw.plans
  if (Array.isArray(raw?.items)) return raw.items
  if (Array.isArray(raw)) return raw
  return []
}

const mapPlan = (plan) => ({
  id: plan?.id ?? plan?.plan_id ?? '',
  name: plan?.name ?? '',
  display_name: plan?.display_name ?? plan?.displayName ?? plan?.name ?? '',
  monthly_price: Number(plan?.monthly_price ?? 0),
  yearly_price: Number(plan?.yearly_price ?? 0)
})

/**
 * Calculate status based solely on end date
 * @param {string} endDate - ISO date string or YYYY-MM-DD
 * @returns {string} 'Active', 'Inactive', or 'Unassigned'
 */
const calculateStatusFromEndDate = (endDate) => {
  if (!endDate) return 'Unassigned'

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const end = new Date(endDate)
  end.setHours(0, 0, 0, 0)

  if (end < today) return 'Inactive'
  return 'Active'
}

const mapSubscriptionFromApi = (hospital, data, plansMap) => {
  const raw = data?.data ?? data
  const planName =
    raw?.plan_name ??
    raw?.subscription?.plan_name ??
    raw?.subscription?.plan?.name ??
    raw?.plan?.name ??
    raw?.name ??
    'Unassigned'

  const planMeta = plansMap.get(planName) || plansMap.get(String(planName || '').toUpperCase())
  const endDate = raw?.end_date ?? raw?.subscription?.end_date ?? ''
  const autoRenew = Boolean(raw?.auto_renew ?? raw?.subscription?.auto_renew ?? false)

  // Force status based on end date (ignore any status from API)
  const status = calculateStatusFromEndDate(endDate)

  return {
    id: hospital.id,
    hospitalName: hospital.name,
    hospitalEmail: hospital.email,
    hospitalContact: hospital.phone || hospital.contact || '',
    subscriptionPlan: planMeta?.display_name || planName,
    planNameRaw: planMeta?.name || planName,
    amount: raw?.amount ?? raw?.monthly_price ?? raw?.subscription?.monthly_price ?? planMeta?.monthly_price ?? 0,
    yearlyAmount: raw?.yearly_price ?? raw?.subscription?.yearly_price ?? planMeta?.yearly_price ?? 0,
    renewalDate: endDate,
    startDate: raw?.start_date ?? raw?.subscription?.start_date ?? '',
    status: status,
    isTrial: Boolean(raw?.is_trial ?? raw?.subscription?.is_trial ?? false),
    autoRenew: autoRenew
  }
}

const SubscriptionsBilling = () => {
  const token = useSelector((state) => state.auth?.token)

  const [subscriptions, setSubscriptions] = useState([])
  const [plans, setPlans] = useState([])
  const [filters, setFilters] = useState({
    status: '',
    subscriptionPlan: '',
    search: ''
  })
  const [loading, setLoading] = useState(true)
  const [listError, setListError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [formData, setFormData] = useState(EMPTY_FORM)

  const plansMap = useMemo(() => {
    return new Map(plans.flatMap((plan) => [
      [plan.name, plan],
      [String(plan.name || '').toUpperCase(), plan]
    ]))
  }, [plans])

  const fetchSubscriptions = async () => {
    setLoading(true)
    setListError('')

    try {
      const [hospitalsRes, plansRes] = await Promise.all([
        fetch(`${API_BASE_URL}${SUPER_ADMIN_HOSPITALS}?page=1&limit=100`, {
          headers: { ...API_HEADERS, ...(token ? { Authorization: `Bearer ${token}` } : {}) }
        }),
        fetch(`${API_BASE_URL}${SUPER_ADMIN_SUBSCRIPTION_PLANS}`, {
          headers: { ...API_HEADERS, ...(token ? { Authorization: `Bearer ${token}` } : {}) }
        })
      ])

      const hospitalsData = await hospitalsRes.json().catch(() => ({}))
      const plansData = await plansRes.json().catch(() => ({}))

      if (!hospitalsRes.ok) {
        setSubscriptions([])
        setListError(extractApiErrorMessage(hospitalsData, `Failed to load hospitals (${hospitalsRes.status})`))
        setLoading(false)
        return
      }

      if (!plansRes.ok) {
        setPlans([])
        setListError(extractApiErrorMessage(plansData, `Failed to load plans (${plansRes.status})`))
        setLoading(false)
        return
      }

      const planItems = getPlanItems(plansData).map(mapPlan)
      setPlans(planItems)
      const planLookup = new Map(planItems.flatMap((plan) => [
        [plan.name, plan],
        [String(plan.name || '').toUpperCase(), plan]
      ]))

      const hospitals = getHospitalItems(hospitalsData)
      const subscriptionResults = await Promise.all(
        hospitals.map(async (hospital) => {
          const hospitalName = hospital?.name ?? hospital?.hospital_name ?? ''
          try {
            const res = await fetch(`${API_BASE_URL}${SUPER_ADMIN_HOSPITAL_SUBSCRIPTION(hospitalName)}`, {
              headers: { ...API_HEADERS, ...(token ? { Authorization: `Bearer ${token}` } : {}) }
            })
            const data = await res.json().catch(() => ({}))
            if (!res.ok) {
              return {
                id: hospital?.id ?? hospital?.hospital_id ?? hospitalName,
                hospitalName,
                hospitalEmail: hospital?.email ?? '',
                hospitalContact: hospital?.phone ?? hospital?.contact ?? '',
                subscriptionPlan: 'Unassigned',
                planNameRaw: '',
                amount: 0,
                yearlyAmount: 0,
                renewalDate: '',
                startDate: '',
                status: 'Unassigned',
                isTrial: false,
                autoRenew: false,
                error: extractApiErrorMessage(data, `Failed to load subscription (${res.status})`)
              }
            }

            return mapSubscriptionFromApi({
              id: hospital?.id ?? hospital?.hospital_id ?? hospitalName,
              name: hospitalName,
              email: hospital?.email ?? '',
              phone: hospital?.phone ?? hospital?.contact ?? ''
            }, data, planLookup)
          } catch (error) {
            return {
              id: hospital?.id ?? hospital?.hospital_id ?? hospitalName,
              hospitalName,
              hospitalEmail: hospital?.email ?? '',
              hospitalContact: hospital?.phone ?? hospital?.contact ?? '',
              subscriptionPlan: 'Unassigned',
              planNameRaw: '',
              amount: 0,
              yearlyAmount: 0,
              renewalDate: '',
              startDate: '',
              status: 'Unassigned',
              isTrial: false,
              autoRenew: false,
              error: error?.message || 'Unable to load subscription.'
            }
          }
        })
      )

      setSubscriptions(subscriptionResults)
    } catch (error) {
      setSubscriptions([])
      setListError(error?.message || 'Unable to load subscriptions.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscriptions()
  }, [token])

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesStatus = !filters.status || sub.status === filters.status
    const matchesPlan = !filters.subscriptionPlan || sub.subscriptionPlan === filters.subscriptionPlan || sub.planNameRaw === filters.subscriptionPlan
    const query = filters.search.toLowerCase()
    const matchesSearch = !filters.search || sub.hospitalName.toLowerCase().includes(query)
    return matchesStatus && matchesPlan && matchesSearch
  })

  const totalRevenue = filteredSubscriptions.reduce((sum, sub) => sum + Number(sub.amount || 0), 0)
  const trialHospitals = filteredSubscriptions.filter((sub) => sub.isTrial).length
  const activeSubscriptions = filteredSubscriptions.filter((sub) => sub.status === 'Active').length
  const inactiveSubscriptions = filteredSubscriptions.filter((sub) => sub.status === 'Inactive').length
  const renewalsThisMonth = filteredSubscriptions.filter((sub) => {
    if (!sub.renewalDate) return false
    const renewalDate = new Date(sub.renewalDate)
    const now = new Date()
    return renewalDate.getMonth() === now.getMonth() && renewalDate.getFullYear() === now.getFullYear()
  }).length

  const openAssignModal = (subscription = null) => {
    setSubmitError('')
    setFieldErrors({})
    setFormData({
      hospital_name: subscription?.hospitalName || '',
      plan_name: subscription?.planNameRaw || plans[0]?.name || '',
      start_date: subscription?.startDate ? formatDate(subscription.startDate) : '',
      end_date: subscription?.renewalDate ? formatDate(subscription.renewalDate) : '',
      is_trial: Boolean(subscription?.isTrial),
      auto_renew: subscription?.autoRenew ?? true
    })
    setIsModalOpen(true)
  }

  const closeAssignModal = () => {
    setIsModalOpen(false)
    setSubmitError('')
    setFieldErrors({})
    setFormData(EMPTY_FORM)
  }

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prev) => {
      let updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }

      if (name === 'start_date' && updated.end_date) {
        if (new Date(updated.end_date) < new Date(value)) {
          updated.end_date = ''
        }
      }

      return updated
    })
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!String(formData.hospital_name || '').trim()) errors.hospital_name = 'Hospital name is required.'
    if (!String(formData.plan_name || '').trim()) errors.plan_name = 'Plan name is required.'
    if (!String(formData.start_date || '').trim()) errors.start_date = 'Start date is required.'
    if (!String(formData.end_date || '').trim()) errors.end_date = 'End date is required.'

    // No past date restriction for start date
    if (formData.start_date && formData.end_date && new Date(formData.end_date) < new Date(formData.start_date)) {
      errors.end_date = 'End date must be after start date.'
    }

    return errors
  }

  const handleAssignPlan = async (event) => {
    event.preventDefault()

    if (!token) {
      setSubmitError('You must be logged in to assign a subscription plan.')
      return
    }

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setSubmitError('Please correct the highlighted fields....')
      return
    }

    setSubmitLoading(true)
    setSubmitError('')

    try {
      const payload = {
        plan_name: formData.plan_name,
        start_date: formData.start_date,
        end_date: formData.end_date,
        is_trial: Boolean(formData.is_trial),
        auto_renew: Boolean(formData.auto_renew)
      }

      const res = await fetch(`${API_BASE_URL}${SUPER_ADMIN_HOSPITAL_ASSIGN_PLAN(formData.hospital_name)}`, {
        method: 'POST',
        headers: {
          ...API_HEADERS,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setSubmitError(extractApiErrorMessage(data, `Failed to assign plan (${res.status})`))
        return
      }

      closeAssignModal()
      fetchSubscriptions()
    } catch (error) {
      setSubmitError(error?.message || 'Unable to assign subscription plan.')
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
            Hospital Subscription Management
          </h2>
          <p className="text-sm text-gray-500 mt-1">Assign plans and view subscription details by hospital name.</p>
        </div>
        <button
          type="button"
          onClick={() => openAssignModal()}
          className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 font-medium flex items-center gap-2"
        >
          <i className="fas fa-plus-circle"></i>
          Assign Plan
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:gap-6">
        <div className="relative bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="relative flex items-center justify-between">
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Monthly Revenue</div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{formatCurrency(totalRevenue)}</div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center shadow-sm">
              <i className="fas fa-rupee-sign text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="relative bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="relative flex items-center justify-between">
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Active Subscriptions</div>
              <div className="text-2xl sm:text-3xl font-bold text-green-700 mt-2">{activeSubscriptions}</div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center shadow-sm">
              <i className="fas fa-check-circle text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="relative bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="relative flex items-center justify-between">
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Inactive Subscriptions</div>
              <div className="text-2xl sm:text-3xl font-bold text-red-700 mt-2">{inactiveSubscriptions}</div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center shadow-sm">
              <i className="fas fa-times-circle text-red-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="relative bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="relative flex items-center justify-between">
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Renewals This Month</div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{renewalsThisMonth}</div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center shadow-sm">
              <i className="fas fa-calendar-alt text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-3 sm:p-4 rounded-lg card-shadow border">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <select
            className="p-2 border border-gray-300 rounded-lg text-sm"
            value={filters.status}
            onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Unassigned">Unassigned</option>
          </select>
          <select
            className="p-2 border border-gray-300 rounded-lg text-sm"
            value={filters.subscriptionPlan}
            onChange={(e) => setFilters((prev) => ({ ...prev, subscriptionPlan: e.target.value }))}
          >
            <option value="">All Plans</option>
            {plans.map((plan) => (
              <option key={plan.id || plan.name} value={plan.name}>
                {plan.display_name || plan.name}
              </option>
            ))}
          </select>
          <div className="hidden sm:block flex-1">
            <input
              type="text"
              placeholder="Search hospitals..."
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            />
          </div>
        </div>
      </div>

      {listError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center justify-between gap-4">
          <span className="flex items-center gap-2"><i className="fas fa-exclamation-circle"></i>{listError}</span>
          <button
            type="button"
            onClick={fetchSubscriptions}
            className="px-3 py-1.5 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-medium"
          >
            Retry
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl card-shadow border overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600">Loading subscriptions...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="text-left px-3 py-3 text-xs font-medium whitespace-nowrap">Hospital</th>
                  <th className="text-left px-3 py-3 text-xs font-medium whitespace-nowrap">Plan</th>
                  <th className="text-left px-3 py-3 text-xs font-medium whitespace-nowrap">Amount</th>
                  <th className="text-left px-3 py-3 text-xs font-medium whitespace-nowrap">Start Date</th>
                  <th className="text-left px-3 py-3 text-xs font-medium whitespace-nowrap">End Date</th>
                  <th className="text-left px-3 py-3 text-xs font-medium whitespace-nowrap">Trial</th>
                  <th className="text-left px-3 py-3 text-xs font-medium whitespace-nowrap">Auto Renew</th>
                  <th className="text-left px-3 py-3 text-xs font-medium whitespace-nowrap">Status</th>
                  <th className="text-left px-3 py-3 text-xs font-medium whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscriptions.map((sub) => (
                  <tr key={sub.id} className="border-t hover:bg-gray-50">
                    <td className="px-3 py-3 font-medium text-gray-900">
                      <div>{sub.hospitalName}</div>
                      <div className="text-xs text-gray-500">{sub.hospitalEmail}</div>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-1 rounded text-xs whitespace-nowrap ${
                        sub.subscriptionPlan === 'Unassigned'
                          ? 'bg-gray-100 text-gray-700'
                          : sub.subscriptionPlan === 'FREE'
                            ? 'bg-gray-100 text-gray-800'
                            : sub.subscriptionPlan === 'STANDARD'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                      }`}>
                        {sub.subscriptionPlan}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-semibold whitespace-nowrap">{formatCurrency(sub.amount)}</td>
                    <td className="px-3 py-3 text-gray-700 whitespace-nowrap">{formatDate(sub.startDate)}</td>
                    <td className="px-3 py-3 text-gray-700 whitespace-nowrap">{formatDate(sub.renewalDate)}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-1 rounded text-xs whitespace-nowrap ${sub.isTrial ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'}`}>
                        {sub.isTrial ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-1 rounded text-xs whitespace-nowrap ${sub.autoRenew ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'}`}>
                        {sub.autoRenew ? 'Enabled' : 'Disabled'}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-1 rounded text-xs whitespace-nowrap ${
                        sub.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : sub.status === 'Inactive'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <button
                        className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                        onClick={() => openAssignModal(sub)}
                        title="Assign or Update Plan"
                      >
                        <i className="fas fa-edit text-sm sm:text-base"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filteredSubscriptions.length === 0 && (
          <div className="p-8 text-center">
            <i className="fas fa-receipt text-4xl text-gray-300 mb-3"></i>
            <h3 className="text-lg font-medium text-gray-700 mb-1">No subscriptions found</h3>
            <p className="text-gray-500 text-sm">
              {subscriptions.length === 0 ? 'No subscriptions available yet.' : 'Try adjusting your filters to see more results.'}
            </p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeAssignModal}
        title="Assign Hospital Subscription Plan"
        size="lg"
      >
        <form onSubmit={handleAssignPlan} className="space-y-6">
          {submitError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <i className="fas fa-exclamation-circle flex-shrink-0"></i>
              {submitError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">Hospital Name *</label>
              <input
                type="text"
                name="hospital_name"
                value={formData.hospital_name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${fieldErrors.hospital_name ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="Enter hospital name exactly"
              />
              {fieldErrors.hospital_name && <p className="text-sm text-red-600">{fieldErrors.hospital_name}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">Plan Name *</label>
              <select
                name="plan_name"
                value={formData.plan_name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${fieldErrors.plan_name ? 'border-red-400' : 'border-gray-200'}`}
              >
                <option value="">Select plan</option>
                {plans.map((plan) => (
                  <option key={plan.id || plan.name} value={plan.name}>
                    {plan.display_name || plan.name}
                  </option>
                ))}
              </select>
              {fieldErrors.plan_name && <p className="text-sm text-red-600">{fieldErrors.plan_name}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Start Date *</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                // No min restriction – any date allowed
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${fieldErrors.start_date ? 'border-red-400' : 'border-gray-200'}`}
              />
              {fieldErrors.start_date && <p className="text-sm text-red-600">{fieldErrors.start_date}</p>}
              <p className="text-xs text-gray-500">Select any date (past, today, or future)</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">End Date *</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
                min={formData.start_date || ''} // Ensure end date >= start date
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${fieldErrors.end_date ? 'border-red-400' : 'border-gray-200'}`}
              />
              {fieldErrors.end_date && <p className="text-sm text-red-600">{fieldErrors.end_date}</p>}
              <p className="text-xs text-gray-500">Must be on or after start date</p>
            </div>

            <label className="flex items-center gap-3 p-3 border rounded-xl bg-gray-50">
              <input
                type="checkbox"
                name="is_trial"
                checked={formData.is_trial}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-gray-700">Is Trial</span>
            </label>

            <label className="flex items-center gap-3 p-3 border rounded-xl bg-gray-50">
              <input
                type="checkbox"
                name="auto_renew"
                checked={formData.auto_renew}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-gray-700">Auto Renew</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={closeAssignModal}
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
                  Assigning...
                </>
              ) : (
                <>
                  <i className="fas fa-save"></i>
                  Assign Plan
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default SubscriptionsBilling