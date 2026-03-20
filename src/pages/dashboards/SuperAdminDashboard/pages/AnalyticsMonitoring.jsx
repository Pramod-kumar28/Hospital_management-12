import React, { useEffect, useState } from 'react'
import { API_BASE_URL, API_HEADERS } from '../../../../config/api'

const AnalyticsMonitoring = () => {
  const [analytics, setAnalytics] = useState({})
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const API_BASE = `${API_BASE_URL}/super-admin`

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('token')

      const headers = {
        ...API_HEADERS,
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }

      const [aRes, lRes] = await Promise.all([
        fetch(`${API_BASE}/analytics/overview`, { headers }),
        fetch(`${API_BASE}/audit-logs?skip=0&limit=50`, { headers })
      ])

      const aData = await aRes.json().catch(() => ({}))
      const lData = await lRes.json().catch(() => ({}))

      if (!aRes.ok || !lRes.ok) {
        setError(aData?.message || lData?.message || 'Failed to load data')
        setAnalytics({})
        setLogs([])
        return
      }

      setAnalytics(aData?.data ?? aData ?? {})

      const logsData = Array.isArray(lData)
        ? lData
        : lData?.data ?? []

      setLogs(logsData)

    } catch (err) {
      setError('Network error')
      setAnalytics({})
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
            <Card title="Hospitals" value={analytics?.total_hospitals} icon="fa-hospital" color="blue" />
            <Card title="Subscriptions" value={analytics?.active_subscriptions} icon="fa-credit-card" color="emerald" />
            <Card title="Revenue" value={`₹ ${analytics?.total_revenue ?? 0}`} icon="fa-rupee-sign" color="purple" />
            <Card title="Patients" value={analytics?.total_patients} icon="fa-user-injured" color="amber" />
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
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