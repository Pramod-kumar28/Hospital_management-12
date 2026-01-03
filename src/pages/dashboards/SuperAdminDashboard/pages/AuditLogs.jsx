import React, { useState, useEffect } from 'react'

const AuditLogs = () => {
  const [auditLogs, setAuditLogs] = useState([])

  const fetchAuditLogs = async () => {
    const postsRes = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
    const usersRes = await fetch("https://jsonplaceholder.typicode.com/users")

    const posts = await postsRes.json()
    const usersData = await usersRes.json()

    const users = usersData.slice(0, 12).map((u, i) => ({
      id: `USR-${4000 + i}`,
      name: u.name,
      role: ['Admin', 'Manager', 'User', 'Super Admin'][i % 4],
      email: u.email
    }))

    const logs = posts.map((p, i) => ({
      id: `LOG-${5000 + i}`,
      user: users[i % users.length].name,
      action: ['Login', 'Update', 'Create', 'Delete'][i % 4],
      resource: ['User', 'Settings', 'Subscription', 'System'][i % 4],
      timestamp: new Date(Date.now() - i * 600000).toLocaleString(),
      ip: `192.168.1.${i + 1}`
    }))

    setAuditLogs(logs)
  }

  useEffect(() => {
    fetchAuditLogs()
  }, [])

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <h2 className="text-2xl font-semibold text-gray-700 flex items-center gap-2">
        <i className="fas fa-clipboard-list text-blue-600"></i>
        Audit Logs
      </h2>

      {/* AUDIT SUMMARY – GLASS MORPHISM */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {/* TOTAL LOGS */}
        <div className="relative bg-gradient-to-br from-white to-blue-50 p-5 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Total Logs
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {auditLogs.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <i className="fas fa-list-alt text-white text-lg"></i>
            </div>
          </div>

          <div className="relative mt-4 pt-3 border-t border-blue-100">
            <p className="text-xs text-blue-700 font-medium">
              All system activities
            </p>
          </div>
        </div>

        {/* LOGINS */}
        <div className="relative bg-gradient-to-br from-white to-emerald-50 p-5 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-emerald-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                User Logins
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {auditLogs.filter(log => log.action === 'Login').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <i className="fas fa-sign-in-alt text-white text-lg"></i>
            </div>
          </div>

          <div className="relative mt-4 pt-3 border-t border-emerald-100">
            <p className="text-xs text-emerald-700 font-medium">
              Successful access events
            </p>
          </div>
        </div>

        {/* UPDATES */}
        <div className="relative bg-gradient-to-br from-white to-purple-50 p-5 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
                Updates
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {auditLogs.filter(log => log.action === 'Update').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <i className="fas fa-edit text-white text-lg"></i>
            </div>
          </div>

          <div className="relative mt-4 pt-3 border-t border-purple-100">
            <p className="text-xs text-purple-700 font-medium">
              Data modifications
            </p>
          </div>
        </div>

        {/* CREATIONS */}
        <div className="relative bg-gradient-to-br from-white to-amber-50 p-5 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                Creations
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {auditLogs.filter(log => log.action === 'Create').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
              <i className="fas fa-plus-circle text-white text-lg"></i>
            </div>
          </div>

          <div className="relative mt-4 pt-3 border-t border-amber-100">
            <p className="text-xs text-amber-700 font-medium">
              New records added
            </p>
          </div>
        </div>

      </div>

      {/* AUDIT LOG TABLE */}
      <div className="bg-white rounded-xl card-shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="text-left px-6 py-3">User</th>
                <th className="text-left px-6 py-3">Action</th>
                <th className="text-left px-6 py-3">Resource</th>
                <th className="text-left px-6 py-3">Timestamp</th>
                <th className="text-left px-6 py-3">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map(log => (
                <tr key={log.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{log.user}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4">{log.resource}</td>
                  <td className="px-6 py-4">{log.timestamp}</td>
                  <td className="px-6 py-4 text-gray-500">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default AuditLogs
