import React, { useState, useEffect } from 'react'

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

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        <i className="fas fa-tachometer-alt text-blue-500 mr-2"></i>Dashboard Overview
      </h2>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Total Hospitals</div>
              <div className="text-3xl font-bold text-blue-600 mt-1">{totalHospitals}</div>
              <div className="text-xs text-green-500 mt-1">+2 this month</div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <i className="fas fa-hospital text-blue-500 text-xl"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Total Users</div>
              <div className="text-3xl font-bold text-green-600 mt-1">{totalUsers}</div>
              <div className="text-xs text-green-500 mt-1">+12 this week</div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <i className="fas fa-users text-green-500 text-xl"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Active Subscriptions</div>
              <div className="text-3xl font-bold text-indigo-600 mt-1">{activeSubscriptions}</div>
              <div className="text-xs text-green-500 mt-1">94% active rate</div>
            </div>
            <div className="bg-indigo-100 p-3 rounded-lg">
              <i className="fas fa-credit-card text-indigo-500 text-xl"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Monthly Revenue</div>
              <div className="text-3xl font-bold text-rose-600 mt-1">₹{(monthlyRevenue/1000).toFixed(1)}K</div>
              <div className="text-xs text-green-500 mt-1">+8.2% growth</div>
            </div>
            <div className="bg-rose-100 p-3 rounded-lg">
              <i className="fas fa-rupee-sign text-rose-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-xl card-shadow border p-6">
          <h3 className="font-semibold mb-4 text-lg">Recent Hospitals</h3>
          <div className="space-y-4">
            {state.hospitals.slice(0, 4).map(hospital => (
              <div key={hospital.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <img src={hospital.logo} className="w-10 h-10 rounded-lg" alt="hospital" />
                  <div>
                    <div className="font-medium">{hospital.name}</div>
                    <div className="text-xs text-gray-500">{hospital.subscriptionPlan} Plan</div>
                  </div>
                </div>
                <span className={`status-${hospital.status.toLowerCase()} px-2 py-1 rounded text-xs`}>
                  {hospital.status}
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
    </div>
  )
}

export default SuperAdminOverview