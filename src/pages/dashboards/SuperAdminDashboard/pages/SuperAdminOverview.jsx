import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { API_BASE_URL, API_HEADERS } from '../../../../config/api'

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
    subscriptions: [],
    users: [],
    auditLogs: [],
    reports: [],
    totalPatients: 0,
    totalAppointments: 0,
    hospitalGrowth: 0,
    patientGrowth: 0,
    appointmentGrowth: 0,
    revenueGrowth: 0,
    systemHealth: {}
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchAnalyticsData = async () => {
    // Validate authentication
    if (!token) {
      const errorMsg = 'Authentication required. Please log in again.'
      setError(errorMsg)
      console.warn(errorMsg)
      return null
    }

    try {
      const url = `${API_BASE_URL}${API_ENDPOINT}`
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...API_HEADERS
      }

      console.log('Fetching analytics from:', url)

      const res = await fetch(url, { headers })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        const errorMsg = data?.message || data?.detail?.message || data?.error?.message || `Failed to fetch analytics (${res.status})`
        setError(errorMsg)
        console.error('Analytics API error:', errorMsg, data)
        return null
      }

      console.log('Analytics data fetched successfully')
      setError('')
      return data
    } catch (err) {
      const errorMsg = err?.message || 'Network error: Unable to fetch analytics data'
      setError(errorMsg)
      console.error('Failed to fetch analytics data:', err)
      return null
    }
  }

  const initializeData = async () => {
    const data = await fetchAnalyticsData()
    
    if (data) {
      setState(prev => ({
        ...prev,
        hospitals: data.hospitals || [],
        subscriptions: data.subscriptions || [],
        users: data.users || [],
        auditLogs: data.auditLogs || [],
        reports: data.reports || [],
        totalPatients: data.totalPatients || 0,
        totalAppointments: data.totalAppointments || 0,
        hospitalGrowth: data.hospitalGrowth || 0,
        patientGrowth: data.patientGrowth || 0,
        appointmentGrowth: data.appointmentGrowth || 0,
        revenueGrowth: data.revenueGrowth || 0,
        systemHealth: data.systemHealth || {}
      }))
    }

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

  const totalHospitals = ensureArray(state.hospitals).length
  const activeSubscriptions = ensureArray(state.subscriptions).filter(s => s.status === 'Paid').length
  const totalUsers = ensureArray(state.users).length
  const monthlyRevenue = ensureArray(state.subscriptions)
    .filter(s => s.status === 'Paid')
    .reduce((sum, sub) => sum + (sub.amount || 0), 0)

  // Debug logging
  console.log('Component State:', { loading, error, token: token ? 'Present' : 'Missing', hospitalCount: ensureArray(state.hospitals).length })

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Active Hospitals */}
        
        <div onClick={()=>navigate('users')}
         className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent pointer-events-none" />

          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            +{state.hospitalGrowth || 0}%
          </span>

          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 mb-3">
                <i className="fas fa-hospital text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Active Hospitals</p>
              <p className="text-2xl font-bold text-gray-900">{state.hospitals?.length || 0}</p>
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
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 mb-3">
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
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 mb-3">
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

        {/* Platform Revenue */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent pointer-events-none" />

          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            +{state.revenueGrowth}%
          </span>

          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 mb-3">
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
            <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
              <i className="fas fa-hospital text-blue-500"></i>
              Recent Hospitals
            </h3>
            <span className="text-xs text-gray-400">Last 7 days</span>
          </div>

          <div className="divide-y">
            {ensureArray(state.hospitals).slice(0, 4).map(h => (
              <div
                key={h.id}
                className="flex items-center justify-between py-3 hover:bg-gray-50 px-2 rounded-lg transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={h.logo}
                    className="w-11 h-11 rounded-lg border"
                    alt="hospital"
                  />
                  <div>
                    <p className="font-medium text-gray-800 leading-tight">
                      {h.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {h.subscriptionPlan} Plan
                    </p>
                  </div>
                </div>

                <span
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full flex-shrink-0 ml-2
          ${h.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full
            ${h.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}
                  />
                  {h.status}
                </span>
              </div>
            ))}
            {ensureArray(state.hospitals).length === 0 && (
              <div className="py-8 text-center text-gray-500">
                <p className="text-sm">No hospitals available</p>
              </div>
            )}
          </div>
        </div>


        <div className="bg-white rounded-xl card-shadow border p-6">
          <h3 className="font-semibold mb-4 text-lg">System Health</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <i className="fas fa-server text-blue-500"></i>
                <span>Server Uptime</span>
              </div>
              <span className="text-green-600 font-semibold">99.9%</span>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <i className="fas fa-database text-green-500"></i>
                <span>Database Performance</span>
              </div>
              <span className="text-green-600 font-semibold">Excellent</span>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <i className="fas fa-network-wired text-purple-500"></i>
                <span>API Response Time</span>
              </div>
              <span className="text-green-600 font-semibold">128ms</span>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <i className="fas fa-shield-alt text-orange-500"></i>
                <span>Security Status</span>
              </div>
              <span className="text-green-600 font-semibold">Protected</span>
            </div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl card-shadow border p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">
              <i className="fas fa-user-md mr-2 text-indigo-500"></i>
              Recent Users
            </h3>
            <span className="text-sm text-blue-600 cursor-pointer hover:underline">Manage Users</span>
          </div>
          <div className="space-y-3">
            {ensureArray(state.users).slice(0, 3).map(user => (
              <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <img src={user.avatar} className="w-8 h-8 rounded-full" alt="user" />
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.role}</div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${user.status === 'Active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
                  }`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl card-shadow border p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">
              <i className="fas fa-credit-card mr-2 text-green-500"></i>
              Pending Renewals
            </h3>
            <span className="text-sm text-blue-600 cursor-pointer hover:underline">View All</span>
          </div>
          <div className="space-y-3">
            {ensureArray(state.subscriptions)
              .filter(sub => sub.status === 'Pending')
              .slice(0, 3)
              .map(sub => (
                <div key={sub.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <div className="font-medium">{sub.hospitalName}</div>
                    <div className="text-xs text-gray-500">Renews on {sub.renewalDate}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">₹{sub.amount}</div>
                    <div className="text-xs text-gray-500">{sub.planType}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminOverview