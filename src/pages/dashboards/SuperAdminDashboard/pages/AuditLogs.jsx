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
      role: ['Admin', 'Doctor', 'Staff', 'Patient'][i % 4],
      email: u.email,
      status: i % 8 === 0 ? 'Inactive' : 'Active',
      lastLogin: new Date(Date.now() - i * 3600000).toLocaleString(),
      avatar: `https://i.pravatar.cc/60?img=${i + 1}`
    }))

    const logs = posts.map((p, i) => ({
      id: `LOG-${5000 + i}`,
      user: users[i % users.length].name,
      action: ['Login', 'Update', 'Create', 'Delete'][i % 4],
      resource: ['Hospital', 'User', 'Subscription', 'Settings'][i % 4],
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
      <h2 className="text-2xl font-semibold text-gray-700">
        <i className="fas fa-clipboard-list text-blue-500 mr-2"></i>Audit Logs
      </h2>

      {/* Audit Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-blue-600">{auditLogs.length}</div>
          <div className="text-sm text-gray-500">Total Logs</div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-green-600">{auditLogs.filter(log => log.action === 'Login').length}</div>
          <div className="text-sm text-gray-500">User Logins</div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-purple-600">{auditLogs.filter(log => log.action === 'Update').length}</div>
          <div className="text-sm text-gray-500">Updates</div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-orange-600">{auditLogs.filter(log => log.action === 'Create').length}</div>
          <div className="text-sm text-gray-500">Creations</div>
        </div>
      </div>

      {/* Audit Logs Table */}
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