import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { API_BASE_URL, API_HEADERS, SUPER_ADMIN_HOSPITALS, SUPER_ADMIN_SUBSCRIPTION_PLANS, SUPER_ADMIN_DASHBOARD_OVERVIEW_CARDS } from '../../../../config/api'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import GroupIcon from '@mui/icons-material/Group'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import HotelIcon from '@mui/icons-material/Hotel'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee'
import RefreshIcon from '@mui/icons-material/Refresh'
import MailIcon from '@mui/icons-material/Mail'
import LayersIcon from '@mui/icons-material/Layers'
import ListIcon from '@mui/icons-material/List'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PaymentsIcon from '@mui/icons-material/Payments'
import SettingsIcon from '@mui/icons-material/Settings'

const API_ENDPOINT = '/api/v1/analytics/overview'

// Utility function to safely convert to array
const ensureArray = (value) => {
  if (Array.isArray(value)) return value
  if (value && typeof value === 'object') return Object.values(value)
  return []
}

const SuperAdminOverview = ({ onPageChange }) => {
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
    totalAppointments: 0,
    occupiedBeds: 0,
    activeSubscriptionsCount: 0,
    hospitalGrowth: 0,
    patientGrowth: 0,
    appointmentGrowth: 0,
    revenueGrowth: 0,
    systemHealth: {},
    planStats: {
      totalPlans: 0,
      monthlyRevenuePotential: 0,
      yearlyRevenuePotential: 0
    },
    dashboardCards: {
      totalHospitals: 0,
      totalHospitalsGrowth: 0,
      activePlans: 0,
      activePlansGrowth: 0,
      platformRevenue: 0,
      platformRevenueGrowth: 0
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
      return null
    }

    try {
      const url = `${API_BASE_URL}${API_ENDPOINT}`
      const headers = {
        ...API_HEADERS,
        'Authorization': `Bearer ${finalToken}`,
        'Content-Type': 'application/json'
      }

      const res = await fetch(url, { headers })
      const data = await res.json().catch(() => ({}))

      // Handle 401 Unauthorized
      if (res.status === 401) {
        const errorMsg = ' Unauthorized - Your token is invalid or expired. Please log in again with valid credentials.'
        setError(errorMsg)
        return null
      }

      // Handle other errors
      if (!res.ok) {
        const errorMsg = data?.message || data?.detail?.message || data?.error?.message || `Failed to fetch analytics (${res.status})`
        setError(`Failed to load analytics: ${errorMsg}`)
        return null
      }

      setError('')
      return data
    } catch (err) {
      const errorMsg = err?.message || 'Network error: Unable to fetch analytics data'
      setError(` ${errorMsg}`)
      return null
    }
  }

  // Fetch dashboard overview cards with growth metrics
  const fetchDashboardOverviewCards = async () => {
    const authToken = localStorage.getItem('authToken')
    const demoToken = localStorage.getItem('token')
    const reduxToken = authState?.token

    const finalToken = authToken || reduxToken || demoToken

    if (!finalToken) {
      return
    }

    try {
      const url = `${API_BASE_URL}${SUPER_ADMIN_DASHBOARD_OVERVIEW_CARDS()}`
      const headers = {
        ...API_HEADERS,
        'Authorization': `Bearer ${finalToken}`,
        'Content-Type': 'application/json'
      }

      const res = await fetch(url, { headers })
      const data = await res.json().catch(() => ({}))

      console.log('Dashboard Overview Cards Response:', data)

      if (res.status === 401) {
        return
      }

      if (!res.ok) {
        console.error('Failed to fetch dashboard cards:', res.status, data)
        return
      }

      // Extract dashboard cards data - support multiple response formats
      let cards = data?.data?.cards || data?.cards || data?.data || {}
      
      console.log('Extracted cards:', cards)
      
      setState(prev => ({
        ...prev,
        dashboardCards: {
          totalHospitals: cards?.total_hospitals?.value || cards?.totalHospitals || 0,
          totalHospitalsGrowth: cards?.total_hospitals?.growth_percent || cards?.totalHospitalsGrowth || 0,
          activePlans: cards?.active_plans?.value || cards?.activePlans || 0,
          activePlansGrowth: cards?.active_plans?.growth_percent || cards?.activePlansGrowth || 0,
          platformRevenue: cards?.platform_revenue?.value || cards?.platformRevenue || 0,
          platformRevenueGrowth: cards?.platform_revenue?.growth_percent || cards?.platformRevenueGrowth || 0
        }
      }))
    } catch (err) {
      console.error('Error fetching dashboard overview cards:', err)
    }
  }

  // Fetch subscription plans stats from Platform Settings API
  const fetchPlanStats = async () => {
    const authToken = localStorage.getItem('authToken')
    const demoToken = localStorage.getItem('token')
    const reduxToken = authState?.token

    const finalToken = authToken || reduxToken || demoToken

    if (!finalToken) {
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

      const res = await fetch(url, { headers })
      const data = await res.json().catch(() => ({}))

      if (res.status === 401) {
        setPlanStatsLoading(false)
        return
      }

      if (!res.ok) {
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

      // Calculate stats
      const totalPlans = plans.length
      const monthlyRevenuePotential = plans.reduce((sum, plan) => sum + Number(plan?.monthly_price || 0), 0)
      const yearlyRevenuePotential = plans.reduce((sum, plan) => sum + Number(plan?.yearly_price || 0), 0)

      setState(prev => ({
        ...prev,
        planStats: {
          totalPlans,
          monthlyRevenuePotential,
          yearlyRevenuePotential
        }
      }))
    } catch (err) {
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
      return
    }

    setHospitalsLoading(true)
    try {
      const url = `${API_BASE_URL}${SUPER_ADMIN_HOSPITALS}`
      const headers = {
        ...API_HEADERS,
        'Authorization': `Bearer ${finalToken}`,
        'Content-Type': 'application/json'
      }

      const res = await fetch(url, { headers })
      const data = await res.json().catch(() => ({}))

      // Handle 401 Unauthorized
      if (res.status === 401) {
        setHospitalsLoading(false)
        return
      }

      // Handle other errors
      if (!res.ok) {
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
      const appointmentsThisMonth = data?.patients?.appointments_this_month ?? 0
      const totalRevenue = data?.revenue?.total ?? 0
      const occupiedBeds = data?.occupancy?.occupied_beds ?? 0
      const activeSubscriptionsCount = data?.subscriptions?.active_count ?? 0

      setState(prev => ({
        ...prev,
        hospitals: data.hospitals || { total: hospitalCount, active: activeHospitals },
        subscriptions: data.subscriptions || [],
        users: data.users || [],
        auditLogs: data.auditLogs || [],
        reports: data.reports || [],
        totalAppointments: appointmentsThisMonth,
        occupiedBeds: occupiedBeds,
        activeSubscriptionsCount: activeSubscriptionsCount,
        revenue: totalRevenue,
        systemHealth: data.systemHealth || {}
      }))
    }

    // Fetch recent hospitals, plan stats, and dashboard overview cards separately from real API
    await Promise.all([fetchRecentHospitals(), fetchPlanStats(), fetchDashboardOverviewCards()])
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

  const totalHospitals = (state.dashboardCards?.totalHospitals || state.hospitals?.total) ?? ensureArray(state.hospitals).length ?? 0
  const totalHospitalsGrowth = state.dashboardCards?.totalHospitalsGrowth || 0
  const activeHospitalCount = state.hospitals?.active ?? 0
  const activeSubscriptions = (state.dashboardCards?.activePlans || state.activeSubscriptionsCount) ?? 0
  const activePlansGrowth = state.dashboardCards?.activePlansGrowth || 0
  const totalUsers = ensureArray(state.users).length
  const monthlyRevenue = state.dashboardCards?.platformRevenue || state.revenue || ensureArray(state.subscriptions)
    .filter(s => s.status === 'Paid')
    .reduce((sum, sub) => sum + (sub.amount || 0), 0)
  const platformRevenueGrowth = state.dashboardCards?.platformRevenueGrowth || 0

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
      {/* Premium Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold ">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-2">Real-time analytics and hospital management metrics</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Total Hospitals */}
        <div onClick={()=>navigate('users')}
         className="group relative bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-cyan-500/10 backdrop-blur-xl rounded-2xl p-4 border border-blue-400/20 shadow-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-blue-400/40 min-h-[200px]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-transparent to-cyan-600/0 pointer-events-none group-hover:from-blue-600/5" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Growth Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-blue-500/20 border border-blue-400/30 rounded-lg px-2.5 py-1">
            <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8L5.586 19.414M19 7l-14 14" />
            </svg>
            <span className={`text-xs font-bold ${totalHospitalsGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalHospitalsGrowth >= 0 ? '+' : ''}{totalHospitalsGrowth?.toFixed(1)}%
            </span>
          </div>

          <div className="relative flex flex-col justify-between h-full">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 mb-2 shadow-lg group-hover:shadow-xl transition-shadow">
                <LocalHospitalIcon className="text-white" sx={{ fontSize: 20 }} />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Total Hospitals</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalHospitals}</p>
              <p className="text-xs text-gray-500 mt-2">Currently operational</p>
            </div>
            <div className="absolute bottom-4 right-4 flex items-end gap-1 h-10">
              <div className="w-1.5 h-4 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full"></div>
              <div className="w-1.5 h-6 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full "></div>
              <div className="w-1.5 h-10 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full"></div>
              <div className="w-1.5 h-7 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full "></div>
              <div className="w-1.5 h-11 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full "></div>
            </div>
          </div>
        </div>

        {/* Active Subscriptions */}
        <div className="group relative bg-gradient-to-br from-purple-500/10 via-violet-400/5 to-indigo-500/10 backdrop-blur-xl rounded-2xl p-4 border border-purple-400/20 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-purple-400/40 min-h-[200px]">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-transparent to-indigo-600/0 pointer-events-none group-hover:from-purple-600/5" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Growth Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-purple-500/20 border border-purple-400/30 rounded-lg px-2.5 py-1">
            <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8L5.586 19.414M19 7l-14 14" />
            </svg>
            <span className={`text-xs font-bold ${activePlansGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {activePlansGrowth >= 0 ? '+' : ''}{activePlansGrowth?.toFixed(1)}%
            </span>
          </div>

          <div className="relative flex flex-col justify-between h-full">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 mb-2 shadow-lg group-hover:shadow-xl transition-shadow">
                <CreditCardIcon className="text-white" sx={{ fontSize: 20 }} />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Active Plans</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{activeSubscriptions}</p>
              <p className="text-xs text-gray-500 mt-2">Paid subscriptions</p>
            </div>
            <div className="absolute bottom-4 right-4 flex items-end gap-1.5 h-10">
              <div className="w-1.5 h-7 bg-gradient-to-t from-purple-600 to-purple-400 rounded-full "></div>
              <div className="w-1.5 h-5 bg-gradient-to-t from-purple-500 to-violet-400 rounded-full "></div>
              <div className="w-1.5 h-9 bg-gradient-to-t from-purple-600 to-purple-400 rounded-full"></div>
              <div className="w-1.5 h-6 bg-gradient-to-t from-purple-500 to-violet-400 rounded-full "></div>
              <div className="w-1.5 h-8 bg-gradient-to-t from-purple-600 to-purple-400 rounded-full "></div>
            </div>
          </div>
        </div>

    

        {/* Platform Revenue */}
        <div className="group relative bg-gradient-to-br from-emerald-500/10 via-green-400/5 to-teal-500/10 backdrop-blur-xl rounded-2xl p-4 border border-emerald-400/20 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-emerald-400/40 min-h-[200px]">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/0 via-transparent to-teal-600/0 pointer-events-none group-hover:from-emerald-600/5" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Growth Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-500/20 border border-emerald-400/30 rounded-lg px-2.5 py-1">
            <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8L5.586 19.414M19 7l-14 14" />
            </svg>
            <span className={`text-xs font-bold ${platformRevenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {platformRevenueGrowth >= 0 ? '+' : ''}{platformRevenueGrowth?.toFixed(1)}%
            </span>
          </div>

          <div className="relative flex flex-col justify-between h-full">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 mb-2 shadow-lg group-hover:shadow-xl transition-shadow">
                <CurrencyRupeeIcon className="text-white" sx={{ fontSize: 20 }} />
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Platform Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">₹{(monthlyRevenue || 0).toLocaleString('en-IN')}</p>
              <p className="text-xs text-gray-500 mt-2">All hospitals combined</p>
            </div>
            <div className="absolute bottom-4 right-4 flex items-end gap-1.5 h-10">
              <svg width="100" height="32" viewBox="0 0 100 40" className="opacity-60">
                <defs>
                  <linearGradient id="lineGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 0.3}} />
                    <stop offset="100%" style={{stopColor: '#059669', stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                <polyline
                  points="0,28 15,26 30,20 45,22 60,16 75,10 90,14"
                  fill="none"
                  stroke="url(#lineGradient3)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="relative bg-white/50 backdrop-blur-xl rounded-2xl border border-gray-300 shadow-xl p-6 overflow-hidden hover:shadow-2xl transition-shadow">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
          <div className="relative flex items-center justify-between mb-6 pb-4 border-b border-white/20">
            <div>
              <h3 className="font-bold text-xl text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg">
                  <LocalHospitalIcon className="text-white" sx={{ fontSize: 20 }} />
                </div>
                All Hospitals
              </h3>
              <p className="text-xs text-gray-400 mt-2">
                {state.recentHospitals?.length || 0} hospitals in system
              </p>
            </div>
            <button
              onClick={fetchRecentHospitals}
              disabled={hospitalsLoading}
              className="p-2.5 hover:bg-white/20 rounded-xl transition disabled:opacity-50"
              title="Refresh hospitals list"
            >
              <RefreshIcon className={`${hospitalsLoading ? 'animate-spin' : ''} text-gray-600`} sx={{ fontSize: 20 }} />
            </button>
          </div>

            <div className="relative max-h-[350px] overflow-y-auto scroll-smooth space-y-2">
            {hospitalsLoading ? (
              <div className="py-8 text-center">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                <p className="text-sm text-gray-500 mt-3">Loading hospitals...</p>
              </div>
            ) : ensureArray(state.recentHospitals).length > 0 ? (
              ensureArray(state.recentHospitals).map((h, idx) => (
                <div
                  key={h.id}
                  className="relative flex items-center justify-between py-4 px-4 hover:bg-white/40 transition-all duration-200 cursor-pointer group border border-gray-300 rounded-xl mb-3 bg-white/30"
                  onClick={() => navigate('/super-admin/hospital-management')}
                  title={`Click to manage ${h.name}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-transparent to-cyan-500/0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
                  <div className="relative flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative">
                      <img
                        src={h.logo}
                        className="w-11 h-11 rounded-xl border border-white/30 object-cover flex-shrink-0 shadow-md"
                        alt={h.name}
                        onError={(e) => {
                          e.target.src = `https://picsum.photos/seed/${h.id}/80/80`
                        }}
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition">
                        {h.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {h.email}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`relative flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 ml-2 whitespace-nowrap backdrop-blur-sm transition-all
              ${h.status === 'ACTIVE' || h.status === 'Active'
                        ? 'bg-emerald-500/20 border border-emerald-400/30 text-emerald-700'
                        : h.status === 'SUSPENDED' || h.status === 'Suspended'
                          ? 'bg-yellow-500/20 border border-yellow-400/30 text-yellow-700'
                          : 'bg-gray-500/20 border border-gray-400/30 text-gray-700'}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full
                ${h.status === 'ACTIVE' || h.status === 'Active'
                        ? 'bg-emerald-500'
                        : h.status === 'SUSPENDED' || h.status === 'Suspended'
                          ? 'bg-yellow-500'
                          : 'bg-gray-500'}`}
                    />
                    {h.status === 'ACTIVE' ? 'Active' : h.status === 'SUSPENDED' ? 'Suspended' : h.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-gray-400">
                <LocalHospitalIcon sx={{ fontSize: 32, opacity: 0.3 }} className="mb-3" />
                <p className="text-sm">No hospitals available</p>
              </div>
            )}
          </div>
        </div>

  <div className="relative bg-white/50 backdrop-blur-xl rounded-2xl border border-gray-300 shadow-xl p-6 overflow-hidden hover:shadow-2xl transition-shadow">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
          <div className="relative flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div>
              <h3 className="font-bold text-xl text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg">
                  <LayersIcon className="text-white" sx={{ fontSize: 20 }} />
                </div>
                Subscription Plans
              </h3>
              <p className="text-xs text-gray-400 mt-2">Platform pricing configuration metrics</p>
            </div>
            <button
              onClick={fetchPlanStats}
              disabled={planStatsLoading}
              className="p-2.5 hover:bg-white/20 rounded-xl transition disabled:opacity-50"
              title="Refresh plans stats"
            >
              <RefreshIcon className={`${planStatsLoading ? 'animate-spin' : ''} text-gray-600`} sx={{ fontSize: 20 }} />
            </button>
          </div>

            <div className="relative divide-y divide-white/20">
            {planStatsLoading ? (
              <div className="py-8 text-center">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-purple-500 border-t-transparent"></div>
                <p className="text-sm text-gray-500 mt-3">Loading plan stats...</p>
              </div>
            ) : (
              <>
                {/* Total Plans */}
                <div className="relative flex items-center justify-between py-4 px-4 hover:bg-white/40 transition-all duration-200 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-transparent to-indigo-500/0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
                  <div className="relative flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-400/20 shadow-md">
                      <ListIcon className="text-purple-600" sx={{ fontSize: 20 }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900">Total Plans</p>
                      <p className="text-xs text-gray-400">Available subscription plans</p>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">{state.planStats?.totalPlans || 0}</p>
                  </div>
                </div>

                {/* Monthly Revenue */}
                <div className="relative py-4 px-4 hover:bg-white/40 transition-all duration-200 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-transparent to-cyan-500/0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
                  <div className="relative flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-400/20 shadow-md">
                        <TrendingUpIcon className="text-blue-600" sx={{ fontSize: 20 }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900">Monthly Revenue</p>
                        <p className="text-xs text-gray-400">Potential recurring income</p>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">₹{(state.planStats?.monthlyRevenuePotential || 0).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200/40 rounded-full h-2.5 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300" style={{width: `${Math.min(((state.planStats?.monthlyRevenuePotential || 0) / 100000) * 100, 100)}%`}}></div>
                  </div>
                </div>

                {/* Yearly Revenue */}
                <div className="relative py-4 px-4 hover:bg-white/40 transition-all duration-200 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-transparent to-teal-500/0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
                  <div className="relative flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-400/20 shadow-md">
                        <PaymentsIcon className="text-emerald-600" sx={{ fontSize: 20 }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900">Yearly Revenue</p>
                        <p className="text-xs text-gray-400">Annual revenue potential</p>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">₹{(state.planStats?.yearlyRevenuePotential || 0).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200/40 rounded-full h-2.5 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300" style={{width: `${Math.min(((state.planStats?.yearlyRevenuePotential || 0) / 500000) * 100, 100)}%`}}></div>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => onPageChange?.('settings')}
            className="relative w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <SettingsIcon sx={{ fontSize: 18 }} className="relative" />
            <span className="relative">Manage Plans</span>
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default SuperAdminOverview