import React, { useEffect, useState, useRef } from 'react'
import { API_BASE_URL, API_HEADERS, SUPER_ADMIN_ANALYTICS_OVERVIEW, SUPER_ADMIN_FINANCIAL_ANALYTICS, SUPER_ADMIN_SUBSCRIPTION_ANALYTICS, SUPER_ADMIN_PERFORMANCE_ANALYTICS, ANALYTICS_AUDIT_LOGS } from '../../../../config/api'
 
const AnalyticsMonitoring = () => {
  const [analytics, setAnalytics] = useState(null)
  const [financial, setFinancial] = useState(null)
  const [subscriptionStats, setSubscriptionStats] = useState(null)
  const [performanceStats, setPerformanceStats] = useState(null)
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    date_from: null,
    date_to: null,
    hospital_id: null
  })
  const fetchCalled = useRef(false)
 
  useEffect(() => {
    if (!fetchCalled.current) {
      fetchData()
      fetchCalled.current = true
    }
  }, [])
 
  const fetchData = async (overrideFilters = null) => {
    setLoading(true)
    setError('')
 
    try {
      const token = localStorage.getItem('token')
      const authToken = localStorage.getItem('authToken') // Try real JWT token first
 
      // Use real JWT token if available, otherwise use demo token
      const finalToken = authToken || token
     
      console.log('Token being used:', finalToken ? '✓ Token present' : '✗ No token found')
 
      if (!finalToken) {
        setError('Authentication required. Please log in again.')
        setAnalytics(null)
        setFinancial(null)
        setSubscriptionStats(null)
        setPerformanceStats(null)
        setLogs([])
        setLoading(false)
        return
      }
 
      const headers = {
        ...API_HEADERS,
        'Authorization': `Bearer ${finalToken}`,
        'Content-Type': 'application/json'
      }
 
      const activeFilters = overrideFilters?.date_from !== undefined ? overrideFilters : filters;

      // Fetch analytics overview, financial analytics, subscription analytics, performance analytics, and audit logs
      const [aRes, lRes, fRes, sRes, pRes] = await Promise.all([
        fetch(`${API_BASE_URL}${SUPER_ADMIN_ANALYTICS_OVERVIEW}`, { headers }),
        fetch(`${API_BASE_URL}${ANALYTICS_AUDIT_LOGS()}`, { headers }),
        fetch(`${API_BASE_URL}${SUPER_ADMIN_FINANCIAL_ANALYTICS}`, {
          method: 'POST',
          headers,
          body: JSON.stringify(activeFilters)
        }),
        fetch(`${API_BASE_URL}${SUPER_ADMIN_SUBSCRIPTION_ANALYTICS}`, {
          method: 'POST',
          headers,
          body: JSON.stringify(activeFilters)
        }),
        fetch(`${API_BASE_URL}${SUPER_ADMIN_PERFORMANCE_ANALYTICS}`, { headers })
      ])
 
      const aData = await aRes.json().catch(() => ({}))
      const lData = await lRes.json().catch(() => ({}))
      const fData = await fRes.json().catch(() => ({}))
      const sData = await sRes.json().catch(() => ({}))
      const pData = await pRes.json().catch(() => ({}))
 
      if (aRes.status === 401) {
        setError('⚠️ Unauthorized - Your token is invalid or expired. Please log in again with valid credentials from your backend.')
        console.error('401 Unauthorized - Make sure you logged in with valid backend credentials, not demo accounts.')
        setAnalytics(null)
      } else if (!aRes.ok) {
        const errorMsg = aData?.message || aData?.error || `Error: ${aRes.status}`;
        setError(`Failed to load analytics: ${errorMsg}`)
        setAnalytics(null)
      } else {
        setAnalytics(aData)
      }

      if (fRes.ok && fData.data) {
        setFinancial(fData.data)
      } else {
        setFinancial(null)
      }

      if (sRes.ok && sData.data) {
        setSubscriptionStats(sData.data)
      } else {
        setSubscriptionStats(null)
      }

      if (pRes.ok && pData.success) {
        setPerformanceStats(pData.data)
      } else {
        setPerformanceStats(null)
      }
 
      if (lRes.status === 401) {
        setError('⚠️ Unauthorized - Your token is invalid or expired. Please log in again with valid credentials from your backend.')
        console.error('401 Unauthorized - Make sure you logged in with valid backend credentials, not demo accounts.')
      } else if (!lRes.ok) {
        const errorMsg = lData?.message || lData?.error || `Error: ${lRes.status}`;
        setError(prev => prev ? `${prev}` : `Failed to load logs: ${errorMsg}`)
      } else {
        const logsData = Array.isArray(lData) ? lData : lData?.logs || lData?.data || []
        setLogs(logsData)
      }
 
    } catch (err) {
      console.error('Fetch error:', err)
      setError('Network error. Please check your connection.')
      setAnalytics(null)
      setFinancial(null)
      setSubscriptionStats(null)
      setPerformanceStats(null)
      setLogs([])
    } finally {
      setLoading(false)
    }
  }
 
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
 
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
          Analytics & Monitoring
        </h2>
        <p className="text-gray-500 mt-1">System insights and audit logs</p>
      </div>
      
      {/* Analytics Filters UI */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">From Date</label>
          <input 
            type="date"
            value={filters.date_from || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, date_from: e.target.value || null }))}
            className="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">To Date</label>
          <input 
            type="date"
            value={filters.date_to || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, date_to: e.target.value || null }))}
            className="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
          />
        </div>
        <div className="flex-1 min-w-[250px]">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Hospital UUID (Optional)</label>
          <input 
            type="text"
            placeholder="e.g. 123e4567-e89b-12d3..."
            value={filters.hospital_id || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, hospital_id: e.target.value || null }))}
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
          />
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => fetchData()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-colors font-semibold shadow-sm flex items-center"
          >
            <i className="fas fa-filter mr-2"></i> Apply Filters
          </button>
          <button 
            onClick={() => {
              const cleared = { date_from: null, date_to: null, hospital_id: null }
              setFilters(cleared)
              fetchData(cleared)
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg transition-colors font-semibold border border-gray-200"
          >
            Clear
          </button>
        </div>
      </div>
 
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
          {error}
        </div>
      )}
 
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <>
 
          {/* CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              title="Total Doctors"
              value={analytics?.overview?.total_doctors ?? 0}
              icon="fa-user-md"
              color="blue"
            />
            <Card
              title="Active Subscriptions"
              value={analytics?.subscriptions?.active_count ?? 0}
              icon="fa-credit-card"
              color="emerald"
            />
            <Card
              title="Total Revenue"
              value={`₹ ${analytics?.revenue?.total ?? 0}`}
              icon="fa-rupee-sign"
              color="purple"
            />
            <Card
              title="Total Appointments"
              value={analytics?.overview?.total_appointments ?? 0}
              icon="fa-calendar-check"
              color="amber"
            />
          </div>
 
          {/* System Info */}
          {analytics?.overview && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Platform Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total System Beds</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics?.overview?.total_beds ?? 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Billing Processed</p>
                  <p className="text-2xl font-bold text-blue-600">₹ {analytics?.overview?.total_billing ?? 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Premium Subscriptions</p>
                  <p className="text-2xl font-bold text-green-600">{analytics?.subscriptions?.by_plan?.PREMIUM ?? 0}</p>
                </div>
              </div>
            </div>
          )}

          {/* Financial Breakdown */}
          {financial && financial.summary && financial.summary.financial && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden mb-6 mt-6">
              <div className="px-6 py-4 border-b bg-gradient-to-r from-emerald-50 to-teal-50 font-semibold text-emerald-800 flex items-center">
                <i className="fas fa-chart-line mr-2"></i> Core Financial Analytics
              </div>
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-gray-50">
                <div>
                  <p className="text-xs uppercase font-bold text-gray-500 mb-1">MRR</p>
                  <p className="text-xl font-black text-gray-800">₹ {(financial.summary.financial.monthlyRecurringRevenue || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-gray-500 mb-1">ARR</p>
                  <p className="text-xl font-black text-emerald-600">₹ {(financial.summary.financial.annualRecurringRevenue || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-gray-500 mb-1">ARPU</p>
                  <p className="text-xl font-black text-blue-600">₹ {(financial.summary.financial.averageRevenuePerUser || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-gray-500 mb-1">Profit Margin</p>
                  <p className="text-xl font-black text-purple-600">{(financial.summary.financial.profitMargin || 0)}%</p>
                </div>
              </div>
              
              {/* Detailed Invoicing Row */}
              <div className="p-6 grid grid-cols-2 md:grid-cols-5 gap-4 bg-gray-50/50">
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Total Revenue</p>
                  <p className="text-lg font-bold text-gray-900">₹ {(financial.summary.financial.totalRevenue || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Outstanding</p>
                  <p className="text-lg font-bold text-red-500">₹ {(financial.summary.financial.outstandingAmount || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Collection Rate</p>
                  <p className="text-lg font-bold text-indigo-600">{(financial.summary.financial.collectionRate || 0)}%</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Paid / Pending</p>
                  <p className="text-lg font-bold text-gray-700">
                    <span className="text-emerald-600">{financial.summary.financial.paidInvoices || 0}</span> / <span className="text-amber-500">{financial.summary.financial.pendingInvoices || 0}</span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Overdue Invoices</p>
                  <p className="text-lg font-bold text-red-600">{financial.summary.financial.overdueInvoices || 0}</p>
                </div>
              </div>
            </div>
          )}

          {/* Subscription Analytics Breakdown */}
          {subscriptionStats && subscriptionStats.summary && subscriptionStats.summary.subscription && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden mb-6 mt-6">
              <div className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 font-semibold text-blue-800 flex items-center">
                <i className="fas fa-sync-alt mr-2"></i> Subscription Health
              </div>
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-gray-50">
                <div>
                  <p className="text-xs uppercase font-bold text-gray-500 mb-1">Total Franchised</p>
                  <p className="text-xl font-black text-gray-800">{subscriptionStats.summary.subscription.totalHospitals || 0} <span className="font-semibold text-xs text-gray-400">hospitals</span></p>
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-gray-500 mb-1">Active Accounts</p>
                  <p className="text-xl font-black text-emerald-600">{subscriptionStats.summary.subscription.activeSubscriptions || 0}</p>
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-gray-500 mb-1">Expired / Churned</p>
                  <p className="text-xl font-black text-red-500">{subscriptionStats.summary.subscription.expiredSubscriptions || 0}</p>
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-gray-500 mb-1">Retention Rate</p>
                  <p className="text-xl font-black text-indigo-600">{subscriptionStats.summary.subscription.retentionRate || 0}%</p>
                </div>
              </div>

              {/* Subscriptions Table */}
              {subscriptionStats.subscriptions && subscriptionStats.subscriptions.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
                      <tr>
                        <th className="px-6 py-3 text-left">Hospital Name</th>
                        <th className="px-6 py-3 text-left">Plan</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-left">Auto Renewal</th>
                        <th className="px-6 py-3 text-left">Expiration Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {subscriptionStats.subscriptions.map((sub, i) => (
                        <tr key={i} className="hover:bg-blue-50/30 transition">
                          <td className="px-6 py-3 font-semibold text-gray-800">{sub.hospitalName || '--'}</td>
                          <td className="px-6 py-3 text-gray-600">
                            <span className="bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded font-medium text-xs">{sub.planType?.toUpperCase() || '--'}</span>
                          </td>
                          <td className="px-6 py-3">
                            <span className={`px-2.5 py-1 text-[10px] uppercase font-bold rounded ${
                              sub.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {sub.status || '--'}
                            </span>
                          </td>
                          <td className="px-6 py-3">
                             {sub.autoRenewal ? (
                               <i className="fas fa-check-circle text-emerald-500 text-sm" title="Enabled"></i>
                             ) : (
                               <i className="fas fa-times-circle text-red-400 text-sm" title="Disabled"></i>
                             )}
                          </td>
                          <td className="px-6 py-3 text-gray-500 font-medium">{sub.subscriptionEndDate || '--'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Performance Analytics Breakdown */}
          {performanceStats && performanceStats.summary && performanceStats.summary.performance && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden mb-6 mt-6">
              <div className="px-6 py-4 border-b bg-gradient-to-r from-amber-50 to-orange-50 font-semibold text-amber-800 flex items-center">
                <i className="fas fa-server mr-2"></i> System Performance
              </div>
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-gray-50">
                <div>
                  <p className="text-xs uppercase font-bold text-gray-500 mb-1">Platform Uptime</p>
                  <p className="text-xl font-black text-emerald-600">{performanceStats.summary.performance.platformUptime || "99.99%"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-gray-500 mb-1">Response Time (Avg / Peak)</p>
                  <p className="text-xl font-black text-gray-800">{performanceStats.summary.performance.apiResponseTime || "0"}ms <span className="text-sm font-normal text-gray-400">/</span> <span className="text-amber-600">{performanceStats.summary.performance.peakResponseTime || "0"}ms</span></p>
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-gray-500 mb-1">Success / Error Rate</p>
                  <p className="text-xl font-black text-emerald-600">{performanceStats.summary.performance.successRate || 0}% <span className="text-sm font-normal text-gray-400">/</span> <span className="text-red-500">{performanceStats.summary.performance.errorRate || 0}%</span></p>
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-gray-500 mb-1">Active Sessions</p>
                  <p className="text-xl font-black text-blue-600">{performanceStats.summary.performance.activeSessions || 0}</p>
                </div>
              </div>
              
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50/50">
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Total Requests / Failed</p>
                  <p className="text-lg font-bold text-gray-900">
                    <span className="text-blue-600">{(performanceStats.summary.performance.totalRequests || 0).toLocaleString()}</span> / <span className="text-red-500">{(performanceStats.summary.performance.failedRequests || 0).toLocaleString()}</span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Server Load</p>
                  <p className="text-lg font-bold text-amber-600">{performanceStats.summary.performance.serverLoad || "0%"}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">CPU Usage</p>
                  <p className="text-lg font-bold text-indigo-600">{performanceStats.summary.performance.cpuUsage || "0%"}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Memory Usage</p>
                  <p className="text-lg font-bold text-purple-600">{performanceStats.summary.performance.memoryUsage || "0%"}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden mt-6">
            <div className="px-6 py-4 border-b bg-gray-50 font-semibold text-gray-700">
              Audit Logs
            </div>
 
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left">User</th>
                    <th className="px-6 py-3 text-left">Action</th>
                    <th className="px-6 py-3 text-left">Resource</th>
                    <th className="px-6 py-3 text-left">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-10 text-gray-400">
                        No logs available
                      </td>
                    </tr>
                  ) : (
                    logs.map((log, i) => (
                      <tr key={i} className="border-t hover:bg-blue-50 transition">
                        <td className="px-6 py-4 font-medium text-gray-800">{log.user_id || '--'}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                            {log.action || '--'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{log.resource_type || '--'}</td>
                        <td className="px-6 py-4 text-gray-500">
                          {log.created_at
                            ? new Date(log.created_at).toLocaleString()
                            : '--'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
 
        </>
      )}
 
    </div>
  )
}
 
/* ✅ UPDATED CARD (HospitalManagement style) */
const Card = ({ title, value, icon, color }) => {
  const colorMap = {
    blue: {
      bg: "from-blue-50",
      iconBg: "bg-blue-600",
      badge: "bg-green-500"
    },
    emerald: {
      bg: "from-green-50",
      iconBg: "bg-green-500",
      badge: "bg-green-500"
    },
    purple: {
      bg: "from-purple-50",
      iconBg: "bg-purple-600",
      badge: "bg-purple-500"
    },
    amber: {
      bg: "from-amber-50",
      iconBg: "bg-amber-500",
      badge: "bg-green-500"
    }
  }
 
  const styles = colorMap[color] || colorMap.blue
 
  return (
    <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
     
      {/* background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${styles.bg} to-transparent pointer-events-none`} />
 
      {/* badge */}
      <span className={`absolute top-4 right-4 ${styles.badge} text-white text-xs font-semibold px-2 py-0.5 rounded`}>
        +12%
      </span>
 
      <div className="relative flex justify-between items-end">
       
        {/* LEFT */}
        <div>
          <div className={`w-10 h-10 flex items-center justify-center rounded-full ${styles.iconBg} mb-3`}>
            <i className={`fas ${icon} text-white`}></i>
          </div>
 
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value ?? 0}</p>
          <p className="text-xs text-gray-400 mt-1">Updated stats</p>
        </div>
 
        {/* RIGHT mini bars */}
        <div className="flex items-end gap-1 h-14">
          <div className="w-1.5 h-6 bg-gray-300 rounded"></div>
          <div className="w-1.5 h-10 bg-gray-400 rounded"></div>
          <div className="w-1.5 h-7 bg-gray-300 rounded"></div>
          <div className="w-1.5 h-12 bg-gray-500 rounded"></div>
          <div className="w-1.5 h-8 bg-gray-400 rounded"></div>
        </div>
 
      </div>
    </div>
  )
}
 
export default AnalyticsMonitoring
 
 