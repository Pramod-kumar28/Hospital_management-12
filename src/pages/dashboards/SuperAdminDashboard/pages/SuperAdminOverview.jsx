import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SuperAdminOverview = () => {
  const [state, setState] = useState({
    hospitals: [],
    subscriptions: [],
    users: [],
    auditLogs: [],
    reports: []
  })

  const fetchHospitals = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    return await res.json()
  }

  const fetchPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
    return await res.json()
  }

  const initializeData = async () => {
    const hospitalsData = await fetchHospitals()
    const posts = await fetchPosts()

    const hospitals = hospitalsData.slice(0, 8).map((h, i) => ({
      id: `HSP-${1000 + i}`,
      name: h.company.name,
      address: `${h.address.street}, ${h.address.city}`,
      email: h.email,
      contact: h.phone,
      subscriptionPlan: ['Basic', 'Professional', 'Enterprise'][i % 3],
      status: i % 5 === 0 ? 'Suspended' : 'Active',
      createdDate: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
      logo: `https://picsum.photos/seed/hospital${i}/80/80`
    }))

    const subscriptions = hospitals.map((h, i) => ({
      id: `SUB-${2000 + i}`,
      hospitalName: h.name,
      planType: ['Monthly', 'Yearly'][i % 2],
      amount: [499, 999, 1999][i % 3],
      renewalDate: new Date(Date.now() + (i + 1) * 86400000 * 30).toISOString().split('T')[0],
      status: i % 4 === 0 ? 'Pending' : 'Paid',
      invoiceId: `INV-${3000 + i}`
    }))

    const users = hospitalsData.slice(0, 12).map((u, i) => ({
      id: `USR-${4000 + i}`,
      name: u.name,
      role: ['Admin', 'Doctor', 'Staff', 'Patient'][i % 4],
      email: u.email,
      status: i % 8 === 0 ? 'Inactive' : 'Active',
      lastLogin: new Date(Date.now() - i * 3600000).toLocaleString(),
      avatar: `https://i.pravatar.cc/60?img=${i + 1}`
    }))

    const auditLogs = posts.map((p, i) => ({
      id: `LOG-${5000 + i}`,
      user: users[i % users.length].name,
      action: ['Login', 'Update', 'Create', 'Delete'][i % 4],
      resource: ['Hospital', 'User', 'Subscription', 'Settings'][i % 4],
      timestamp: new Date(Date.now() - i * 600000).toLocaleString(),
      ip: `192.168.1.${i + 1}`
    }))

    const reports = posts.map((p, i) => ({
      id: `REP-${6000 + i}`,
      title: p.title,
      type: ['Revenue', 'Usage', 'Growth', 'Performance'][i % 4],
      generatedDate: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
      status: ['Completed', 'Processing', 'Failed'][i % 3]
    }))

    setState(prev => ({
      ...prev,
      hospitals,
      subscriptions,
      users,
      auditLogs,
      reports
    }))
  }

  useEffect(() => {
    initializeData()
  }, [])

  const totalHospitals = state.hospitals.length
  const activeSubscriptions = state.subscriptions.filter(s => s.status === 'Paid').length
  const totalUsers = state.users.length
  const monthlyRevenue = state.subscriptions
    .filter(s => s.status === 'Paid')
    .reduce((sum, sub) => sum + sub.amount, 0)

    const navigate = useNavigate()

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
            +12%
          </span>

          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 mb-3">
                <i className="fas fa-hospital text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Active Hospitals</p>
              <p className="text-2xl font-bold text-gray-900">38</p>
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
            +18%
          </span>

          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 mb-3">
                <i className="fas fa-users text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">1,42,780</p>
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
            +9%
          </span>

          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 mb-3">
                <i className="fas fa-calendar-check text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Appointments</p>
              <p className="text-2xl font-bold text-gray-900">3,85,420</p>
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
            +27%
          </span>

          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 mb-3">
                <i className="fas fa-indian-rupee-sign text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Platform Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹8.4 Cr</p>
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
            {state.hospitals.slice(0, 4).map(h => (
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
                  className={`flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full
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
            {state.users.slice(0, 3).map(user => (
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
            {state.subscriptions
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