// src/pages/dashboards/LabDashboard/pages/CriticalResults.jsx
import React, { useState, useEffect } from 'react'
import DataTable from '../../../../components/ui/Tables/DataTable'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const CriticalResults = () => {
  const [loading, setLoading] = useState(true)
  const [criticalResults, setCriticalResults] = useState([])
  const [stats, setStats] = useState({
    pending: 0,
    notified: 0,
    total: 0
  })

  useEffect(() => {
    // Simulate API fetch
    const loadData = () => {
      setLoading(true)
      setTimeout(() => {
        const data = [
          { id: 'TEST-2024-012', patient: 'Ravi Kumar', test: 'Creatinine', value: '4.2 mg/dL', alert: 'Critical High', time: '09:45 AM', notified: 'Yes', physician: 'Dr. Sharma', department: 'Nephrology' },
          { id: 'TEST-2024-013', patient: 'Sunita Rao', test: 'Potassium', value: '6.5 mEq/L', alert: 'Critical High', time: '10:15 AM', notified: 'Pending', physician: 'Dr. Verma', department: 'Cardiology' },
          { id: 'TEST-2024-014', patient: 'Mohan Singh', test: 'Glucose', value: '40 mg/dL', alert: 'Critical Low', time: '10:30 AM', notified: 'Yes', physician: 'Dr. Gupta', department: 'Endocrinology' },
          { id: 'TEST-2024-020', patient: 'Anjali Devi', test: 'Hemoglobin', value: '6.2 g/dL', alert: 'Critical Low', time: '11:15 AM', notified: 'Pending', physician: 'Dr. Reddy', department: 'Hematology' },
          { id: 'TEST-2024-021', patient: 'Vijay Kumar', test: 'Troponin I', value: '1.5 ng/mL', alert: 'Critical High', time: '12:00 PM', notified: 'Yes', physician: 'Dr. Khan', department: 'Emergency' },
        ]
        setCriticalResults(data)
        setStats({
          pending: data.filter(r => r.notified === 'Pending').length,
          notified: data.filter(r => r.notified === 'Yes').length,
          total: data.length
        })
        setLoading(false)
      }, 800)
    }
    loadData()
  }, [])

  const handleNotify = (id) => {
    const updated = criticalResults.map(r => 
      r.id === id ? { ...r, notified: 'Yes' } : r
    )
    setCriticalResults(updated)
    setStats({
      pending: updated.filter(r => r.notified === 'Pending').length,
      notified: updated.filter(r => r.notified === 'Yes').length,
      total: updated.length
    })
    alert(`Physician notified for test ${id}`)
  }

  const columns = [
    { key: 'id', title: 'Test ID', sortable: true },
    { key: 'patient', title: 'Patient Name', sortable: true },
    { key: 'test', title: 'Test Name', sortable: true },
    { 
      key: 'value', 
      title: 'Result Value', 
      sortable: true,
      render: (value) => (
        <span className="font-bold text-red-600">{value}</span>
      )
    },
    { 
      key: 'alert', 
      title: 'Alert Level', 
      sortable: true,
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
          value === 'Critical High' 
            ? 'bg-red-50 text-red-700 border-red-200' 
            : 'bg-orange-50 text-orange-700 border-orange-200'
        }`}>
          <i className="fas fa-exclamation-triangle mr-1"></i>
          {value.toUpperCase()}
        </span>
      )
    },
    { key: 'physician', title: 'Requested By', sortable: true },
    { key: 'time', title: 'Result Time', sortable: true },
    { 
      key: 'notified', 
      title: 'Physician Notified', 
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            value === 'Yes' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-yellow-100 text-yellow-700'
          }`}>
            {value === 'Yes' ? (
              <><i className="fas fa-check-circle mr-1"></i>Notified</>
            ) : (
              <><i className="fas fa-clock mr-1"></i>Pending</>
            )}
          </span>
          {value === 'Pending' && (
            <button 
              onClick={(e) => {
                e.stopPropagation()
                handleNotify(row.id)
              }}
              className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
              title="Notify Physician Now"
            >
              <i className="fas fa-paper-plane text-xs"></i>
            </button>
          )}
        </div>
      )
    }
  ]

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
              <i className="fas fa-exclamation-circle text-red-600"></i>
            </div>
            Critical Results Management
          </h2>
          <p className="text-sm text-gray-500 mt-1">Monitor and manage high-priority laboratory alerts that require immediate clinical action.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition shadow-sm font-medium text-sm">
            <i className="fas fa-print mr-2 text-gray-400"></i>Print Log
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md font-medium text-sm">
            <i className="fas fa-download mr-2"></i>Export Data
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform duration-500">
             <i className="fas fa-bell text-7xl text-red-600"></i>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Pending Notifications</p>
          <h3 className="text-3xl font-bold text-red-600">{stats.pending}</h3>
          <div className="mt-4 flex items-center text-xs text-red-600 bg-red-50 w-fit px-2 py-1 rounded-full">
            <i className="fas fa-bolt mr-1"></i>Requires Immediate Action
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform duration-500">
             <i className="fas fa-check-double text-7xl text-green-600"></i>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Successfully Notified</p>
          <h3 className="text-3xl font-bold text-green-600">{stats.notified}</h3>
          <div className="mt-4 flex items-center text-xs text-green-600 bg-green-50 w-fit px-2 py-1 rounded-full">
            <i className="fas fa-check mr-1"></i>Compliance Targets Met
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform duration-500">
             <i className="fas fa-chart-pie text-7xl text-blue-600"></i>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Total Critical Alerts (24h)</p>
          <h3 className="text-3xl font-bold text-gray-800">{stats.total}</h3>
          <div className="mt-4 flex items-center text-xs text-blue-600 bg-blue-50 w-fit px-2 py-1 rounded-full">
            <i className="fas fa-history mr-1"></i>Updated Just Now
          </div>
        </div>
      </div>

      {/* Critical Alert Banner */}
      {stats.pending > 0 && (
        <div className="bg-gradient-to-r from-red-600 to-rose-700 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
          <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center animate-pulse">
                <i className="fas fa-phone-alt text-xl"></i>
              </div>
              <div>
                <h4 className="text-lg font-bold">Urgent Action Required</h4>
                <p className="opacity-90">There are {stats.pending} critical results that have not been acknowledged by physicians. Please initiate call-back protocols.</p>
              </div>
            </div>
            <button className="hidden md:block px-6 py-3 bg-white text-red-700 rounded-xl font-bold hover:bg-gray-50 transition shadow-white/20 shadow-lg">
              Start Notification Protocol
            </button>
          </div>
        </div>
      )}

      {/* Main Content Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Critical Alert Log</h3>
            <p className="text-xs text-gray-500">Detailed list of all critical laboratory findings</p>
          </div>
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input 
              type="text" 
              placeholder="Filter by patient or test..." 
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm w-64 focus:ring-2 focus:ring-blue-100 outline-none transition"
            />
          </div>
        </div>
        <div className="p-4">
          <DataTable
            columns={columns}
            data={criticalResults}
            onRowClick={(row) => console.log('Details for:', row)}
            emptyMessage="No critical results found for the selected period."
          />
        </div>
      </div>

      {/* Compliance Information */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
          <i className="fas fa-shield-alt text-2xl text-blue-600"></i>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="font-bold text-blue-900 mb-1 text-lg">Hospital Compliance Advisory</h4>
          <p className="text-blue-700 text-sm leading-relaxed">
            All critical values must be reported and documented within 30 minutes of result verification per Hospital Policy & NABL requirements. 
            Automated notifications are sent to the requesting physician's portal and mobile app immediately.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-white text-blue-700 border border-blue-200 rounded-xl font-semibold text-sm hover:bg-blue-50 transition shrink-0">
          View Protocol Policy
        </button>
      </div>
    </div>
  )
}

export default CriticalResults
