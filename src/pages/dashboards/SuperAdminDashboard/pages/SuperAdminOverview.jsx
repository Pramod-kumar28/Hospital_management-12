import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { API_BASE_URL, API_HEADERS, SUPER_ADMIN_HOSPITALS, SUPER_ADMIN_SUBSCRIPTION_PLANS } from '../../../../config/api'

const API_ENDPOINT = '/api/v1/analytics/overview'

// Utility function to safely convert to array
const ensureArray = (value) => {
  if (Array.isArray(value)) return value
  if (value && typeof value === 'object') return Object.values(value)
  return []
}

const SuperAdminOverview = () => {
  const navigate = useNavigate()
  const authState = useSelector((state) => state?.auth) || {}
  const token = authState?.token || localStorage.getItem('token')

  const [state, setState] = useState({
    hospitals: [],
    recentHospitals: [],
    subscriptions: [],
    users: [],
    auditLogs: [],
    reports: [],
    totalPatients: 0,
    totalAppointments: 0,
    totalBeds: 0,
    occupiedBeds: 0,
    hospitalGrowth: 0,
    patientGrowth: 0,
    appointmentGrowth: 0,
    revenueGrowth: 0,
    systemHealth: {},
    planStats: {
      totalPlans: 0,
      monthlyRevenuePotential: 0,
      yearlyRevenuePotential: 0
    }
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [hospitalsLoading, setHospitalsLoading] = useState(false)
  const [planStatsLoading, setPlanStatsLoading] = useState(false)

  const fetchAnalyticsData = async () => {
    // Get token - prefer authToken (real JWT) over demo token
    const authToken = localStorage.getItem('authToken') // Real JWT token first
    const demoToken = localStorage.getItem('token') // Fallback to demo token
    const reduxToken = authState?.token

    const finalToken = authToken || reduxToken || demoToken

    if (!finalToken) {
      const errorMsg = ' Authentication required. Please log in again.'
      setError(errorMsg)
      console.warn(errorMsg)
      return null
    }

    console.log(' Token being used:', finalToken ? '✓ Token present' : '✗ No token found')

    try {
      const url = `${API_BASE_URL}${API_ENDPOINT}`
      const headers = {
        ...API_HEADERS,
        'Authorization': `Bearer ${finalToken}`,
        'Content-Type': 'application/json'
      }

      console.log(' Fetching analytics from:', url)

      const res = await fetch(url, { headers })
      const data = await res.json().catch(() => ({}))

      // Handle 401 Unauthorized
      if (res.status === 401) {
        const errorMsg = ' Unauthorized - Your token is invalid or expired. Please log in again with valid credentials.'
        setError(errorMsg)
        console.error(' 401 Unauthorized - Token may be invalid or expired')
        return null
      }

      // Handle other errors
      if (!res.ok) {
        const errorMsg = data?.message || data?.detail?.message || data?.error?.message || `Failed to fetch analytics (${res.status})`
        setError(`Failed to load analytics: ${errorMsg}`)
        console.error(' Analytics API error:', errorMsg, data)
        return null
      }

      console.log(' Analytics data fetched successfully')
      setError('')
      return data
    } catch (err) {
      const errorMsg = err?.message || 'Network error: Unable to fetch analytics data'
      setError(` ${errorMsg}`)
      console.error(' Failed to fetch analytics data:', err)
      return null
    }
  }

  // Fetch subscription plans stats from Platform Settings API
  const fetchPlanStats = async () => {
    const authToken = localStorage.getItem('authToken')
    const demoToken = localStorage.getItem('token')
    const reduxToken = authState?.token

    const finalToken = authToken || reduxToken || demoToken

    if (!finalToken) {
      console.warn(' No token available for plan stats fetch')
      return
    }

    setPlanStatsLoading(true)
    try {
      const url = `${API_BASE_URL}${SUPER_ADMIN_SUBSCRIPTION_PLANS}`
      const headers = {
        ...API_HEADERS,
        'Authorization': `Bearer ${finalToken}`,
        'Content-Type': 'application/json'
      }

      console.log(' Fetching subscription plans from:', url)

      const res = await fetch(url, { headers })
      const data = await res.json().catch(() => ({}))

      console.log('  API Response Status:', res.status)
      console.log('  API Response Data:', data)

      if (res.status === 401) {
        console.error(' 401 Unauthorized - Plan token may be invalid')
        setPlanStatsLoading(false)
        return
      }

      if (!res.ok) {
        console.error(' Failed to fetch plans:', res.status, data?.message || data?.error)
        setPlanStatsLoading(false)
        return
      }

      // Extract plans from response (multiple formats supported)
      const plans = Array.isArray(data?.data?.plans)
        ? data.data.plans
        : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.plans)
            ? data.plans
            : Array.isArray(data)
              ? data
              : []

      console.log('  Extracted Plans Array:', { length: plans.length, plans })

      // Calculate stats
      const totalPlans = plans.length
      const monthlyRevenuePotential = plans.reduce((sum, plan) => sum + Number(plan?.monthly_price || 0), 0)
      const yearlyRevenuePotential = plans.reduce((sum, plan) => sum + Number(plan?.yearly_price || 0), 0)

      console.log('  Plan Stats Calculated:', {
        totalPlans,
        monthlyRevenuePotential,
        yearlyRevenuePotential
      })

      setState(prev => ({
        ...prev,
        planStats: {
          totalPlans,
          monthlyRevenuePotential,
          yearlyRevenuePotential
        }
      }))
    } catch (err) {
      console.error(' Error fetching plan stats:', err?.message || err)
    } finally {
      setPlanStatsLoading(false)
    }
  }

  // Fetch recent hospitals from Hospital Management API
  const fetchRecentHospitals = async () => {
    // Get token - prefer authToken (real JWT) over demo token
    const authToken = localStorage.getItem('authToken')
    const demoToken = localStorage.getItem('token')
    const reduxToken = authState?.token

    const finalToken = authToken || reduxToken || demoToken

    if (!finalToken) {
      console.warn(' No token available for hospitals fetch')
      return
    }

    setHospitalsLoading(true)
    try {
      const url = `${API_BASE_URL}${SUPER_ADMIN_HOSPITALS}?page=1&limit=10`
      const headers = {
        ...API_HEADERS,
        'Authorization': `Bearer ${finalToken}`,
        'Content-Type': 'application/json'
      }

      console.log(' Fetching recent hospitals from:', url)

      const res = await fetch(url, { headers })
      const data = await res.json().catch(() => ({}))

      // Handle 401 Unauthorized
      if (res.status === 401) {
        console.error(' 401 Unauthorized - Hospital token may be invalid')
        setHospitalsLoading(false)
        return
      }

      // Handle other errors
      if (!res.ok) {
        console.error(' Failed to fetch hospitals:', res.status, data?.message || data?.error)
        setHospitalsLoading(false)
        return
      }

      // Extract hospitals from response (multiple formats supported)
      const hospitals = Array.isArray(data?.data?.items)
        ? data.data.items
        : Array.isArray(data?.data?.hospitals)
          ? data.data.hospitals
          : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data?.items)
              ? data.items
              : Array.isArray(data?.hospitals)
                ? data.hospitals
                : Array.isArray(data)
                  ? data
                  : []

      console.log(' Recent hospitals fetched:', hospitals.length)

      // Map hospitals data
      const mappedHospitals = hospitals.map((h) => ({
        id: h?.id ?? h?.hospital_id ?? '',
        name: h?.name ?? h?.hospital_name ?? 'Unknown',
        email: h?.email ?? 'N/A',
        phone: h?.phone ?? h?.contact ?? 'N/A',
        city: h?.city ?? 'N/A',
        status: h?.status ?? 'Active',
        logo: h?.logo_url ?? `https://picsum.photos/seed/hospital${h?.id || Math.random()}/80/80`,
        subscriptionPlan: h?.subscription_plan ?? h?.plan_name ?? 'Free'
      }))

      setState((prev) => ({
        ...prev,
        recentHospitals: mappedHospitals
      }))
    } catch (err) {
      console.error(' Error fetching recent hospitals:', err?.message || err)
    } finally {
      setHospitalsLoading(false)
    }
  }

  const initializeData = async () => {
    const data = await fetchAnalyticsData()
    
    if (data) {
      // Extract hospital count from analytics data
      const hospitalCount = data?.hospitals?.total ?? data?.hospitals?.count ?? 0
      const activeHospitals = data?.hospitals?.active ?? 0
      const totalPatients = data?.patients?.total ?? 0
      const appointmentsThisMonth = data?.patients?.appointments_this_month ?? 0
      const totalRevenue = data?.revenue?.total ?? 0
      const occupiedBeds = data?.occupancy?.occupied_beds ?? 0
      const totalBeds = data?.occupancy?.total_beds ?? 0

      console.log(' Analytics Data Extracted:', {
        hospitalCount,
        activeHospitals,
        totalPatients,
        appointmentsThisMonth,
        totalRevenue,
        occupiedBeds,
        totalBeds
      })

      setState(prev => ({
        ...prev,
        hospitals: data.hospitals || { total: hospitalCount, active: activeHospitals },
        subscriptions: data.subscriptions || [],
        users: data.users || [],
        auditLogs: data.auditLogs || [],
        reports: data.reports || [],
        totalPatients: totalPatients,
        totalAppointments: appointmentsThisMonth,
        totalBeds: totalBeds,
        occupiedBeds: occupiedBeds,
        hospitalGrowth: data.hospitalGrowth || 12,
        patientGrowth: data.patientGrowth || 8,
        appointmentGrowth: data.appointmentGrowth || 15,
        revenueGrowth: data.revenueGrowth || 20,
        systemHealth: data.systemHealth || {}
      }))
    }

    // Fetch recent hospitals and plan stats separately from real API
    await Promise.all([fetchRecentHospitals(), fetchPlanStats()])
    setLoading(false)
  }

  const handleRetry = () => {
    initializeData()
  }

  useEffect(() => {
    setLoading(true)
    setError('')
    
    if (token) {
      initializeData()
    } else {
      setError('Authentication required. Please log in to access the dashboard.')
      setLoading(false)
    }
  }, [token])

  const totalHospitals = state.hospitals?.total ?? ensureArray(state.hospitals).length ?? 0
  const activeHospitalCount = state.hospitals?.active ?? 0
  const activeSubscriptions = ensureArray(state.subscriptions).filter(s => s.status === 'Paid').length
  const totalUsers = ensureArray(state.users).length
  const monthlyRevenue = state.revenue ?? ensureArray(state.subscriptions)
    .filter(s => s.status === 'Paid')
    .reduce((sum, sub) => sum + (sub.amount || 0), 0)

  // Debug logging
  console.log(' Component State:', {
    loading,
    error: error ? 'Present' : 'None',
    token: token ? 'Present' : 'Missing',
    hospitalCount: totalHospitals,
    activeHospitals: activeHospitalCount,
    totalPatients: state.totalPatients,
    totalAppointments: state.totalAppointments
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics data...</p>
          <p className="text-xs text-gray-400 mt-4">Token: {token ? 'Present' : 'Missing'}</p>
        </div>
      </div>
    )
  }

  

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Dashboard Overview
      </h2>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

        {/* Total Hospitals */}
        
        <div onClick={()=>navigate('users')}
         className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent pointer-events-none" />

          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            +{state.hospitalGrowth || 0}%
          </span>

          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-8 flex items-center justify-center rounded-full bg-indigo-600 mb-3">
                <i className="fas fa-hospital text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Total Hospitals</p>
              <p className="text-2xl font-bold text-gray-900">{totalHospitals}</p>
              <p className="text-xs text-gray-400 mt-1">Currently operational</p>
            </div>

            <div className="flex items-end gap-1 h-14">
              <div className="w-1.5 h-5 bg-indigo-300 rounded"></div>
              <div className="w-1.5 h-8 bg-indigo-400 rounded"></div>
              <div className="w-1.5 h-11 bg-indigo-500 rounded"></div>
              <div className="w-1.5 h-7 bg-indigo-400 rounded"></div>
              <div className="w-1.5 h-13 bg-indigo-600 rounded"></div>
            </div>
          </div>
        </div>

        {/* Total Patients (All Hospitals) */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent pointer-events-none" />

          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            +{state.patientGrowth}%
          </span>

          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-8 flex items-center justify-center rounded-full bg-red-500 mb-3">
                <i className="fas fa-users text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">{(state.totalPatients || 0).toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">Across all hospitals</p>
            </div>

            <svg width="70" height="40" viewBox="0 0 70 40">
              <polyline
                points="0,30 12,22 24,26 36,18 48,20 60,12"
                fill="none"
                stroke="#fb7185"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* Total Appointments */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent pointer-events-none" />

          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            +{state.appointmentGrowth}%
          </span>

          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-8 flex items-center justify-center rounded-full bg-blue-500 mb-3">
                <i className="fas fa-calendar-check text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{(state.totalAppointments || 0).toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">Last 30 days</p>
            </div>

            <div className="flex items-end gap-1 h-14">
              <div className="w-1.5 h-9 bg-sky-400 rounded"></div>
              <div className="w-1.5 h-6 bg-sky-300 rounded"></div>
              <div className="w-1.5 h-12 bg-sky-500 rounded"></div>
              <div className="w-1.5 h-8 bg-sky-400 rounded"></div>
              <div className="w-1.5 h-10 bg-sky-300 rounded"></div>
            </div>
          </div>
        </div>

          {/* Total Beds */}
          <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent pointer-events-none" />

          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            +{state.revenueGrowth}%
          </span>

          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-8 flex items-center justify-center rounded-full bg-orange-500 mb-3">
                <i className="fas fa-bed text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Total Beds</p>
              <p className="text-2xl font-bold text-gray-900">{(state.totalBeds || 0).toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">Across all hospitals</p>
            </div>

            <svg width="70" height="40" viewBox="0 0 70 40">
              <polyline
                points="0,28 12,26 24,20 36,22 48,16 60,10"
                fill="none"
                stroke="#c59a22"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* Platform Revenue */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent pointer-events-none" />

          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            +{state.revenueGrowth}%
          </span>

          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-8 flex items-center justify-center rounded-full bg-green-500 mb-3">
                <i className="fas fa-indian-rupee-sign text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Platform Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{(monthlyRevenue / 10000000).toFixed(1)} Cr</p>
              <p className="text-xs text-gray-400 mt-1">All hospitals combined</p>
            </div>

            <svg width="70" height="40" viewBox="0 0 70 40">
              <polyline
                points="0,28 12,26 24,20 36,22 48,16 60,10"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

      </div>



      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                <i className="fas fa-hospital text-blue-500"></i>
                Recent Hospitals
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {state.recentHospitals?.length || 0} hospitals in system
              </p>
            </div>
            <button
              onClick={fetchRecentHospitals}
              disabled={hospitalsLoading}
              className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
              title="Refresh hospitals list"
            >
              <i className={`fas fa-sync-alt ${hospitalsLoading ? 'animate-spin' : ''} text-gray-600`}></i>
            </button>
          </div>

          <div className="divide-y">
            {hospitalsLoading ? (
              <div className="py-6 text-center">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                <p className="text-sm text-gray-500 mt-2">Loading hospitals...</p>
              </div>
            ) : ensureArray(state.recentHospitals).length > 0 ? (
              ensureArray(state.recentHospitals).map((h) => (
                <div
                  key={h.id}
                  className="flex items-center justify-between py-3 hover:bg-gray-50 px-2 rounded-lg transition cursor-pointer"
                  onClick={() => navigate('/super-admin/hospital-management')}
                  title={`Click to manage ${h.name}`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img
                      src={h.logo}
                      className="w-11 h-11 rounded-lg border border-gray-200 object-cover flex-shrink-0"
                      alt={h.name}
                      onError={(e) => {
                        e.target.src = `https://picsum.photos/seed/${h.id}/80/80`
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 truncate">
                        {h.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {h.email}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ml-2 whitespace-nowrap
              ${h.status === 'ACTIVE' || h.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : h.status === 'SUSPENDED' || h.status === 'Suspended'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full
                ${h.status === 'ACTIVE' || h.status === 'Active'
                        ? 'bg-green-500'
                        : h.status === 'SUSPENDED' || h.status === 'Suspended'
                          ? 'bg-yellow-500'
                          : 'bg-gray-500'}`}
                    />
                    {h.status === 'ACTIVE' ? 'Active' : h.status === 'SUSPENDED' ? 'Suspended' : h.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-gray-500">
                <i className="fas fa-inbox text-2xl mb-2 opacity-30"></i>
                <p className="text-sm">No hospitals available</p>
              </div>
            )}
          </div>
        </div>

  <div className="bg-white rounded-xl card-shadow border p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <i className="fas fa-layer-group text-purple-500"></i>
                Subscription Plans Overview
              </h3>
              <p className="text-xs text-gray-500 mt-1">Platform pricing configuration metrics</p>
            </div>
            <button
              onClick={fetchPlanStats}
              disabled={planStatsLoading}
              className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
              title="Refresh plans stats"
            >
              <i className={`fas fa-sync-alt ${planStatsLoading ? 'animate-spin' : ''} text-gray-600`}></i>
            </button>
          </div>

          <div className="divide-y">
            {planStatsLoading ? (
              <div className="py-6 text-center">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-purple-500 border-t-transparent"></div>
                <p className="text-sm text-gray-500 mt-2">Loading plan stats...</p>
              </div>
            ) : (
              <>
                {/* Total Plans */}
                <div className="flex items-center justify-between py-4 px-2 hover:bg-gray-50 rounded-lg transition">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-100">
                      <i className="fas fa-list text-purple-600"></i>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900">Total Plans</p>
                      <p className="text-xs text-gray-500">Available subscription plans</p>
                    </div>
                  </div>
                  <div className="text-right ml-2">
                    <p className="text-2xl font-bold text-gray-900">{state.planStats?.totalPlans || 0}</p>
                  </div>
                </div>

                {/* Monthly Revenue */}
                <div className="flex items-center justify-between py-4 px-2 hover:bg-gray-50 rounded-lg transition">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100">
                      <i className="fas fa-chart-line text-blue-600"></i>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900">Monthly Revenue</p>
                      <p className="text-xs text-gray-500">Potential recurring income</p>
                    </div>
                  </div>
                  <div className="text-right ml-2">
                    <p className="text-2xl font-bold text-blue-600">₹{(state.planStats?.monthlyRevenuePotential || 0).toLocaleString('en-IN')}</p>
                  </div>
                </div>

                {/* Yearly Revenue */}
                <div className="flex items-center justify-between py-4 px-2 hover:bg-gray-50 rounded-lg transition">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100">
                      <i className="fas fa-coins text-green-600"></i>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900">Yearly Revenue</p>
                      <p className="text-xs text-gray-500">Annual revenue potential</p>
                    </div>
                  </div>
                  <div className="text-right ml-2">
                    <p className="text-2xl font-bold text-green-600">₹{(state.planStats?.yearlyRevenuePotential || 0).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => navigate('/Platform Settings')}
            className="w-full mt-4 px-4 py-2.5 bg-gradient-to-r from-purple-50 to-transparent border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-50 transition font-medium text-sm flex items-center justify-center gap-2"
          >
            <i className="fas fa-cog"></i>
            Manage Plans
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default SuperAdminOverview