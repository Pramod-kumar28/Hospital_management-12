import React, { useState, useEffect } from 'react'

const SubscriptionsBilling = () => {
  const [subscriptions, setSubscriptions] = useState([])
  const [filters, setFilters] = useState({
    status: '',
    planType: '',
    search: ''
  })

  const fetchSubscriptions = async () => {
    const hospitalsRes = await fetch("https://jsonplaceholder.typicode.com/users")
    const hospitalsData = await hospitalsRes.json()
    
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

    const subscriptionsData = hospitals.map((h, i) => ({
      id: `SUB-${2000 + i}`,
      hospitalName: h.name,
      planType: ['Monthly', 'Yearly'][i % 2],
      amount: [499, 999, 1999][i % 3],
      renewalDate: new Date(Date.now() + (i + 1) * 86400000 * 30).toISOString().split('T')[0],
      status: i % 4 === 0 ? 'Pending' : 'Paid',
      invoiceId: `INV-${3000 + i}`
    }))

    setSubscriptions(subscriptionsData)
  }

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesStatus = !filters.status || sub.status === filters.status
    const matchesPlan = !filters.planType || sub.planType === filters.planType
    const matchesSearch = !filters.search || sub.hospitalName.toLowerCase().includes(filters.search.toLowerCase())
    return matchesStatus && matchesPlan && matchesSearch
  })

  const totalRevenue = filteredSubscriptions
    .filter(s => s.status === 'Paid')
    .reduce((sum, sub) => sum + sub.amount, 0)

  const pendingPayments = filteredSubscriptions
    .filter(s => s.status === 'Pending')
    .reduce((sum, sub) => sum + sub.amount, 0)

  const renewalsThisMonth = filteredSubscriptions.filter(s => {
    const renewalDate = new Date(s.renewalDate)
    const now = new Date()
    return renewalDate.getMonth() === now.getMonth() && renewalDate.getFullYear() === now.getFullYear()
  }).length

  const viewInvoice = (invoiceId) => {
    alert(`📄 Viewing invoice: ${invoiceId}`)
  }

  const markAsPaid = (subscriptionId) => {
    const updatedSubscriptions = subscriptions.map(s => 
      s.id === subscriptionId ? { ...s, status: 'Paid' } : s
    )
    setSubscriptions(updatedSubscriptions)
    const subscription = subscriptions.find(s => s.id === subscriptionId)
    alert(`✅ Marked subscription as paid for: ${subscription.hospitalName}`)
  }

  const sendReminder = (subscriptionId) => {
    const subscription = subscriptions.find(s => s.id === subscriptionId)
    alert(`🔔 Sent payment reminder to: ${subscription.hospitalName}`)
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
          <i className="fas fa-credit-card text-blue-500 mr-2"></i>Subscriptions & Billing
        </h2>
        
        {/* Mobile Search */}
        <div className="sm:hidden">
          <input 
            type="text" 
            placeholder="Search hospitals..." 
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          />
        </div>
      </div>

      {/* Summary Cards - Mobile Optimized */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs sm:text-sm text-gray-500">Total Revenue</div>
              <div className="text-xl sm:text-2xl font-bold text-green-600 mt-1">
                ₹{totalRevenue}
              </div>
            </div>
            <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
              <i className="fas fa-rupee-sign text-green-500 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs sm:text-sm text-gray-500">Pending Payments</div>
              <div className="text-xl sm:text-2xl font-bold text-yellow-600 mt-1">
                ₹{pendingPayments}
              </div>
            </div>
            <div className="bg-yellow-100 p-2 sm:p-3 rounded-lg">
              <i className="fas fa-clock text-yellow-500 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs sm:text-sm text-gray-500">Renewals This Month</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">
                {renewalsThisMonth}
              </div>
            </div>
            <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
              <i className="fas fa-calendar-alt text-blue-500 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Filters - Mobile Optimized */}
      <div className="bg-white p-3 sm:p-4 rounded-lg card-shadow border">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <select 
            className="p-2 border border-gray-300 rounded-lg text-sm"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
          <select 
            className="p-2 border border-gray-300 rounded-lg text-sm"
            value={filters.planType}
            onChange={(e) => setFilters(prev => ({ ...prev, planType: e.target.value }))}
          >
            <option value="">All Plans</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
          <div className="hidden sm:block flex-1">
            <input 
              type="text" 
              placeholder="Search hospitals..." 
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
        </div>
      </div>

      {/* Table - Mobile Optimized */}
      <div className="bg-white rounded-xl card-shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="text-left px-3 py-3 text-xs font-medium whitespace-nowrap">Hospital</th>
                <th className="text-left px-3 py-3 text-xs font-medium whitespace-nowrap">Plan</th>
                <th className="text-left px-3 py-3 text-xs font-medium whitespace-nowrap">Amount</th>
                <th className="text-left px-3 py-3 text-xs font-medium whitespace-nowrap">Renewal</th>
                <th className="text-left px-3 py-3 text-xs font-medium whitespace-nowrap">Status</th>
                <th className="text-left px-3 py-3 text-xs font-medium whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.map(sub => (
                <tr key={sub.id} className="border-t hover:bg-gray-50">
                  {/* Hospital Name - Truncated on mobile */}
                  <td className="px-3 py-3 font-medium text-gray-900 max-w-[120px]">
                    <div className="truncate" title={sub.hospitalName}>
                      {sub.hospitalName}
                    </div>
                    <div className="text-xs text-gray-500 md:hidden">
                      {sub.invoiceId}
                    </div>
                  </td>
                  
                  {/* Plan Type */}
                  <td className="px-3 py-3">
                    <span className={`plan-${sub.planType.toLowerCase()} px-2 py-1 rounded text-xs whitespace-nowrap`}>
                      {sub.planType}
                    </span>
                  </td>
                  
                  {/* Amount */}
                  <td className="px-3 py-3 font-semibold whitespace-nowrap">
                    ₹{sub.amount}
                  </td>
                  
                  {/* Renewal Date - Compact on mobile */}
                  <td className="px-3 py-3 text-gray-700 whitespace-nowrap">
                    <span className="hidden sm:inline">{sub.renewalDate}</span>
                    <span className="sm:hidden text-xs">
                      {new Date(sub.renewalDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </td>
                  
                  {/* Status */}
                  <td className="px-3 py-3">
                    <span className={`status-${sub.status.toLowerCase()} px-2 py-1 rounded text-xs whitespace-nowrap`}>
                      {sub.status}
                    </span>
                  </td>
                  
                  {/* Actions - Compact on mobile */}
                  <td className="px-3 py-3">
                    <div className="flex gap-1 sm:gap-2">
                      <button 
                        className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                        onClick={() => viewInvoice(sub.invoiceId)}
                        title="View Invoice"
                      >
                        <i className="fas fa-file-invoice text-sm sm:text-base"></i>
                      </button>
                      <button 
                        className="text-green-600 hover:text-green-800 transition-colors p-1"
                        onClick={() => markAsPaid(sub.id)}
                        title="Mark as Paid"
                      >
                        <i className="fas fa-check text-sm sm:text-base"></i>
                      </button>
                      <button 
                        className="text-purple-600 hover:text-purple-800 transition-colors p-1"
                        onClick={() => sendReminder(sub.id)}
                        title="Send Reminder"
                      >
                        <i className="fas fa-bell text-sm sm:text-base"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredSubscriptions.length === 0 && (
          <div className="p-8 text-center">
            <i className="fas fa-receipt text-4xl text-gray-300 mb-3"></i>
            <h3 className="text-lg font-medium text-gray-700 mb-1">No subscriptions found</h3>
            <p className="text-gray-500 text-sm">
              {subscriptions.length === 0 
                ? "No subscriptions available yet." 
                : "Try adjusting your filters to see more results."
              }
            </p>
          </div>
        )}
      </div>

      {/* Mobile Table Info */}
      <div className="sm:hidden bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-center gap-2 text-blue-700 text-sm">
          <i className="fas fa-info-circle"></i>
          <span>Scroll horizontally to view all table columns</span>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionsBilling