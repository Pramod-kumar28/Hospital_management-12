import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'
import PatientRegistration from './PatientRegistration'
import { Navigate } from 'react-router'

const ReceptionOverview = () => {
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({})

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    setTimeout(() => {
      setDashboardData({
        stats: {
          totalPatients: 156,
          todayAppointments: 24,
          pendingBills: 8,
          newRegistrations: 12
        },
        appointments: [
          { id: 'APT-3001', patient: 'Ravi Kumar', doctor: 'Dr. Meena Rao', time: '10:30 AM', status: 'Confirmed' },
          { id: 'APT-3002', patient: 'Anita Sharma', doctor: 'Dr. Sharma', time: '11:00 AM', status: 'Pending' },
          { id: 'APT-3003', patient: 'Suresh Patel', doctor: 'Dr. Menon', time: '11:30 AM', status: 'Confirmed' }
        ],
        registrations: [
          { id: 'REG-001', name: 'Rajesh Kumar', time: '09:15 AM', type: 'New' },
          { id: 'REG-002', name: 'Priya Singh', time: '09:30 AM', type: 'Follow-up' }
        ]
      })
      setLoading(false)
    }, 1000)
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-700">Reception Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded border card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <i className="fas fa-users text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Patients</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{dashboardData.stats.totalPatients}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded border card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <i className="fas fa-calendar-check text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Today's Appointments</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{dashboardData.stats.todayAppointments}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded border card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg mr-4">
              <i className="fas fa-file-invoice text-yellow-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pending Bills</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{dashboardData.stats.pendingBills}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded border card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <i className="fas fa-user-plus text-purple-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">New Registrations</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{dashboardData.stats.newRegistrations}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded border card-shadow">
          <h3 className="text-lg font-semibold mb-3">Today's Appointments</h3>
          <DataTable
            columns={[
              { key: 'patient', title: 'Patient', sortable: true },
              { key: 'doctor', title: 'Doctor', sortable: true },
              { key: 'time', title: 'Time', sortable: true },
              { 
                key: 'status', 
                title: 'Status', 
                sortable: true,
                render: (value) => (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    value === 'Confirmed' ? 'status-confirmed' : 'status-pending'
                  }`}>
                    {value}
                  </span>
                )
              }
            ]}
            data={dashboardData.appointments}
          />
        </div>
        
        <div className="bg-white p-4 rounded border card-shadow">
          <h3 className="text-lg font-semibold mb-3">Recent Registrations</h3>
          <DataTable
            columns={[
              { key: 'name', title: 'Patient', sortable: true },
              { key: 'time', title: 'Time', sortable: true },
              { 
                key: 'type', 
                title: 'Type', 
                sortable: true,
                render: (value) => (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    value === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {value}
                  </span>
                )
              }
            ]}
            data={dashboardData.registrations}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-4 rounded border card-shadow">
        <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border rounded-lg hover:bg-blue-50 transition-colors text-center" onClick={()=> Navigate(<PatientRegistration/>)}>
            <i className="fas fa-user-plus text-blue-600 text-xl mb-2"></i>
            <p className="font-medium">New Registration</p>
          </button>
          <button className="p-4 border rounded-lg hover:bg-green-50 transition-colors text-center">
            <i className="fas fa-calendar-plus text-green-600 text-xl mb-2"></i>
            <p className="font-medium">Schedule Appointment</p>
          </button>
          <button className="p-4 border rounded-lg hover:bg-yellow-50 transition-colors text-center">
            <i className="fas fa-receipt text-yellow-600 text-xl mb-2"></i>
            <p className="font-medium">Generate Bill</p>
          </button>
          <button className="p-4 border rounded-lg hover:bg-purple-50 transition-colors text-center">
            <i className="fas fa-search text-purple-600 text-xl mb-2"></i>
            <p className="font-medium">Find Patient</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReceptionOverview