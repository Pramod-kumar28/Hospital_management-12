import React, { useState, useEffect, useMemo } from 'react'
import { API_BASE_URL, API_HEADERS, HOSPITAL_ADMIN_AUDIT_LOGS } from '../../../../config/api'
import {
  History,
  List,
  Login,
  Edit,
  AddCircle,
  Delete,
  Search,
  Error,
  Refresh,
  Inbox,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material'
import { CircularProgress } from '@mui/material'

const AuditLogs = () => {
  const [auditLogs, setAuditLogs] = useState([])
  const [totalLogs, setTotalLogs] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterAction, setFilterAction] = useState('all')
  const [filterUser, setFilterUser] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const fetchAuditLogs = async (skip = 0, limit = 50) => {
    try {
      setLoading(true)
      setError(null)
      
      const token = localStorage.getItem('access_token') || localStorage.getItem('token')
      const headers = {
        'Content-Type': 'application/json',
        ...API_HEADERS,
        ...(token && { 'Authorization': `Bearer ${token}` })
      }

      const url = `${API_BASE_URL}${HOSPITAL_ADMIN_AUDIT_LOGS}?skip=${skip}&limit=${limit}`
      const response = await fetch(url, {
        method: 'GET',
        headers
      })
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      
      // Map backend response to logs
      // Backend returns { summary: {...}, items: [...] }
      const logsArray = data?.items || []
      const total = data?.summary?.total_logs || logsArray.length
      
      setAuditLogs(logsArray)
      setTotalLogs(total)
      
      // Store summary for stats
      if (data?.summary) {
        window.__auditSummary = data.summary
      }
    } catch (err) {
      console.error('Error fetching audit logs:', err)
      setError(err.message || 'Failed to fetch audit logs. Please try again.')
      setAuditLogs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAuditLogs(0, 50)
  }, [])

  // Get unique users for filter
  const uniqueUsers = useMemo(() => {
    return [...new Set(auditLogs.map(log => log.user_name).filter(Boolean))]
  }, [auditLogs])

  // Get unique actions for filter
  const uniqueActions = useMemo(() => {
    return [...new Set(auditLogs.map(log => log.action).filter(Boolean))]
  }, [auditLogs])

  // Filter and search logic
  const filteredLogs = useMemo(() => {
    let result = auditLogs

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      result = result.filter(log => {
        return (
          (log.user_name || '').toLowerCase().includes(searchLower) ||
          (log.action || '').toLowerCase().includes(searchLower) ||
          (log.resource || '').toLowerCase().includes(searchLower) ||
          (log.description || '').toLowerCase().includes(searchLower) ||
          (log.ip_address || '').includes(searchTerm)
        )
      })
    }

    // Action filter
    if (filterAction !== 'all') {
      result = result.filter(log => log.action === filterAction)
    }

    // User filter
    if (filterUser !== 'all') {
      result = result.filter(log => log.user_name === filterUser)
    }

    return result
  }, [auditLogs, searchTerm, filterAction, filterUser])

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredLogs.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredLogs, currentPage])

  // Action color mapping
  const getActionColor = (action) => {
    const colorMap = {
      'view': 'blue',
      'create': 'amber',
      'update': 'purple',
      'delete': 'red',
      'login': 'emerald',
      'logout': 'gray',
      'edit': 'purple',
      'read': 'blue',
    }
    const key = (action || '').toLowerCase()
    return colorMap[key] || 'blue'
  }

  // Calculate stats from summary
  const stats = useMemo(() => {
    const summary = window.__auditSummary || {}
    return {
      total: summary.total_logs || totalLogs,
      userLogins: summary.user_logins || 0,
      updates: summary.updates || 0,
      creations: summary.creations || 0,
      deletions: summary.deletions || 0
    }
  }, [totalLogs])

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            
            Audit Logs
          </h2>
          <p className="text-gray-500 text-sm mt-2">Real-time tracking and monitoring of all system activities</p>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-3">
          <Error sx={{ fontSize: 24 }} />
          <div>
            <p className="font-semibold">Error Loading Audit Logs</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Logs */}
        <div className="bg-blue-50 border border-blue-300 text-blue-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold opacity-80 uppercase tracking-wider">Total Logs</p>
              <p className="text-3xl font-bold mt-2">{loading ? '...' : stats.total}</p>
            </div>
            <div className="bg-blue-600 bg-opacity-20 p-3 rounded-lg">
              <List sx={{ fontSize: 28 }} />
            </div>
          </div>
        </div>

        {/* User Logins */}
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold opacity-80 uppercase tracking-wider">User Logins</p>
              <p className="text-3xl font-bold mt-2">{loading ? '...' : stats.userLogins}</p>
            </div>
            <div className="bg-emerald-600 bg-opacity-20 p-3 rounded-lg">
              <Login sx={{ fontSize: 28 }} />
            </div>
          </div>
        </div>

        {/* Updates */}
        <div className="bg-purple-50 border border-purple-300 text-purple-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold opacity-80 uppercase tracking-wider">Updates</p>
              <p className="text-3xl font-bold mt-2">{loading ? '...' : stats.updates}</p>
            </div>
            <div className="bg-purple-600 bg-opacity-20 p-3 rounded-lg">
              <Edit sx={{ fontSize: 28 }} />
            </div>
          </div>
        </div>

        {/* Creations */}
        <div className="bg-amber-50 border border-amber-300 text-amber-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold opacity-80 uppercase tracking-wider">Creations</p>
              <p className="text-3xl font-bold mt-2">{loading ? '...' : stats.creations}</p>
            </div>
            <div className="bg-amber-600 bg-opacity-20 p-3 rounded-lg">
              <AddCircle sx={{ fontSize: 28 }} />
            </div>
          </div>
        </div>

        {/* Deletions */}
        <div className="bg-red-50 border border-red-300 text-red-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold opacity-80 uppercase tracking-wider">Deletions</p>
              <p className="text-3xl font-bold mt-2">{loading ? '...' : stats.deletions}</p>
            </div>
            <div className="bg-red-600 bg-opacity-20 p-3 rounded-lg">
              <Delete sx={{ fontSize: 28 }} />
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="bg-white p-6 rounded-2xl border border-gray-300 shadow-md">
        {/* Search Bar */}
        <div className="mb-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by user, action, resource, or IP address..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all"
            />
            <Search sx={{ position: 'absolute', left: '16px', top: '14px', fontSize: 20, color: '#9CA3AF' }} />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Action Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Action Type</label>
            <select
              value={filterAction}
              onChange={(e) => {
                setFilterAction(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white hover:border-gray-400 transition-colors"
            >
              <option value="all">All Actions</option>
              {uniqueActions.map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
          </div>

          {/* User Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">User</label>
            <select
              value={filterUser}
              onChange={(e) => {
                setFilterUser(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white hover:border-gray-400 transition-colors"
            >
              <option value="all">All Users</option>
              {uniqueUsers.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>

          {/* Reload Data */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Actions</label>
            <button
              onClick={() => fetchAuditLogs(0, 50)}
              disabled={loading}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 transition-all font-medium text-sm shadow-sm hover:shadow-md"
            >
              {loading ? (
                <>
                  <CircularProgress size={16} className="mr-2" style={{ display: 'inline-block' }} />Loading...
                </>
              ) : (
                <>
                  <Refresh sx={{ fontSize: 18, marginRight: '8px', display: 'inline-block' }} />Reload
                </>
              )}
            </button>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('')
                setFilterAction('all')
                setFilterUser('all')
                setCurrentPage(1)
              }}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm border border-gray-300"
            >
              <Refresh sx={{ fontSize: 18, marginRight: '8px', display: 'inline-block' }} />Reset
            </button>
          </div>
        </div>

        {/* Results Info */}
        <div className="mt-4 text-sm text-gray-600">
          {loading ? (
            'Loading audit logs...'
          ) : (
            `Showing ${paginatedLogs.length} of ${filteredLogs.length} results (${stats.total} total)`
          )}
        </div>
      </div>

      {/* AUDIT LOG TABLE */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-200 to-gray-200 border-b border-gray-300">
              <tr>
                <th className="text-left px-6 py-4 font-semibold ">User Name</th>
                <th className="text-left px-6 py-4 font-semibold ">Action</th>
                <th className="text-left px-6 py-4 font-semibold ">Resource</th>
                <th className="text-left px-6 py-4 font-semibold">IP Address</th>
                <th className="text-left px-6 py-4 font-semibold ">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    <CircularProgress size={32} sx={{ margin: '0 auto 8px', display: 'block', opacity: 0.5 }} />
                    Loading audit logs...
                  </td>
                </tr>
              ) : paginatedLogs.length > 0 ? (
                paginatedLogs.map((log, index) => {
                  const actionColor = getActionColor(log.action)
                  const timestamp = new Date(log.timestamp).toLocaleString()

                  return (
                    <tr key={log.id || index} className="hover:bg-blue-50 transition-colors   ">
                      <td className="px-6 py-4 font-medium text-gray-900">{log.user_name || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <span className={`bg-${actionColor}-100 text-${actionColor}-800 px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1 shadow-sm`}>
                          {log.action || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-medium">{log.resource || 'N/A'}</td>
                      <td className="px-6 py-4 text-gray-600 font-mono text-xs bg-gray-50 rounded px-2 py-1 inline-block">{log.ip_address || 'N/A'}</td>
                      <td className="px-6 py-4 text-gray-600 text-xs">{timestamp}</td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    <Inbox sx={{ fontSize: 40, display: 'block', margin: '0 auto 12px', opacity: 0.4 }} />
                    <p className="font-medium">No audit logs found matching your filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && !loading && (
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages} • Total: {filteredLogs.length} logs
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft sx={{ fontSize: 20 }} />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded transition-colors ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight sx={{ fontSize: 20 }} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuditLogs
