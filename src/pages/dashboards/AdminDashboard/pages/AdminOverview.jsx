import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const AdminOverview = () => {
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({})

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    setTimeout(() => {
      setDashboardData({
        metrics: {
          totalPatientsToday: 42,
          totalPatientsMonth: 1250,
          activeDoctors: 28,
          appointmentsScheduled: 156,
          revenue: 125000,
          bedOccupancy: 78
        },
        appointments: [
          { id: 'APT-3001', patient: 'Patient 1', doctor: 'Dr. Meena Rao', dateTime: '2023-10-15 10:30 AM', status: 'Confirmed', reason: 'Routine Checkup' },
          { id: 'APT-3002', patient: 'Patient 2', doctor: 'Dr. Sharma', dateTime: '2023-10-15 11:00 AM', status: 'Pending', reason: 'Fever' }
        ],
        departments: [
          { id: 'DEPT-001', icon: "fas fa-heartbeat", name: 'Cardiology', head: 'Dr. Meena Rao', doctors: 5, staff: 12 },
          { id: 'DEPT-002', icon: "fas fa-bone", name: 'Orthopedics', head: 'Dr. Vivek Sharma', doctors: 4, staff: 8 }
        ]
      })
      setLoading(false)
    }, 1000)
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        <i className="fas fa-tachometer-alt text-blue-500 mr-2"></i>Admin Dashboard Overview
      </h2>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Patients Today */}
        <div className="bg-white p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Total Patients (Today)</div>
              <div className="text-3xl font-bold text-blue-600 mt-1">{dashboardData.metrics.totalPatientsToday}</div>
              <div className="text-xs text-green-500 mt-1">+5 from yesterday</div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <i className="fas fa-user-injured text-blue-500 text-xl"></i>
            </div>
          </div>
        </div>
        
        {/* Active Doctors */}
        <div className="bg-white p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Active Doctors</div>
              <div className="text-3xl font-bold text-green-600 mt-1">{dashboardData.metrics.activeDoctors}</div>
              <div className="text-xs text-green-500 mt-1">All doctors present</div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <i className="fas fa-user-md text-green-500 text-xl"></i>
            </div>
          </div>
        </div>
        
        {/* Appointments Scheduled */}
        <div className="bg-white p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Appointments Scheduled</div>
              <div className="text-3xl font-bold text-indigo-600 mt-1">{dashboardData.metrics.appointmentsScheduled}</div>
              <div className="text-xs text-green-500 mt-1">+12% from last week</div>
            </div>
            <div className="bg-indigo-100 p-3 rounded-lg">
              <i className="fas fa-calendar-check text-indigo-500 text-xl"></i>
            </div>
          </div>
        </div>
        
        {/* Monthly Revenue */}
        <div className="bg-white p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Monthly Revenue</div>
              <div className="text-3xl font-bold text-rose-600 mt-1">₹{(dashboardData.metrics.revenue/1000).toFixed(1)}K</div>
              <div className="text-xs text-green-500 mt-1">+8.2% growth</div>
            </div>
            <div className="bg-rose-100 p-3 rounded-lg">
              <i className="fas fa-rupee-sign text-rose-500 text-xl"></i>
            </div>
          </div>
        </div>
        
        {/* Bed Occupancy */}
        <div className="bg-white p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Bed Occupancy</div>
              <div className="text-3xl font-bold text-purple-600 mt-1">{dashboardData.metrics.bedOccupancy}%</div>
              <div className="text-xs text-green-500 mt-1">Optimal capacity</div>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <i className="fas fa-bed text-purple-500 text-xl"></i>
            </div>
          </div>
        </div>
        
        {/* Total Patients Month */}
        <div className="bg-white p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Total Patients (Month)</div>
              <div className="text-3xl font-bold text-orange-600 mt-1">{dashboardData.metrics.totalPatientsMonth}</div>
              <div className="text-xs text-green-500 mt-1">+24 this week</div>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <i className="fas fa-chart-line text-orange-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Recent Appointments */}
        <div className="bg-white rounded-xl card-shadow border p-6">
          <div className="flex items-center mb-4">
            <i className="fas fa-clock text-blue-500 mr-2"></i>
            <h3 className="font-semibold text-lg">Recent Appointments</h3>
          </div>
          <div className="space-y-3">
            {dashboardData.appointments.map(apt => (
              <div key={apt.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <i className="fas fa-calendar-day text-blue-500"></i>
                  </div>
                  <div>
                    <div className="font-medium">{apt.patient}</div>
                    <div className="text-sm text-gray-500">with {apt.doctor}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">{apt.dateTime}</div>
                  <span className={`status-${apt.status.toLowerCase()} px-2 py-1 rounded text-xs`}>
                    {apt.status === 'Confirmed' ? (
                      <i className="fas fa-check-circle mr-1"></i>
                    ) : (
                      <i className="fas fa-clock mr-1"></i>
                    )}
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Hospital Departments */}
        <div className="bg-white rounded-xl card-shadow border p-6">
          <div className="flex items-center mb-4">
            <i className="fas fa-building text-green-500 mr-2"></i>
            <h3 className="font-semibold text-lg">Hospital Departments</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {dashboardData.departments.map(dept => (
              <div key={dept.id} className="border rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className={`${dept.icon} text-blue-500 text-lg`}></i>
                </div>
                <div className="font-medium">{dept.name}</div>
                <div className="text-xs text-gray-500 mt-1">{dept.head}</div>
                <div className="flex justify-center space-x-3 mt-2 text-xs text-gray-500">
                  <span>
                    <i className="fas fa-user-md mr-1"></i>
                    {dept.doctors}
                  </span>
                  <span>
                    <i className="fas fa-users mr-1"></i>
                    {dept.staff}
                  </span>
                </div>
              </div>
            ))}
            {/* Add more department cards */}
            <div className="border rounded-lg p-4 text-center hover:shadow-md transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-brain text-green-500 text-lg"></i>
              </div>
              <div className="font-medium">Neurology</div>
              <div className="text-xs text-gray-500 mt-1">Dr. Priya Singh</div>
              <div className="flex justify-center space-x-3 mt-2 text-xs text-gray-500">
                <span>
                  <i className="fas fa-user-md mr-1"></i>6
                </span>
                <span>
                  <i className="fas fa-users mr-1"></i>10
                </span>
              </div>
            </div>
            <div className="border rounded-lg p-4 text-center hover:shadow-md transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-baby text-purple-500 text-lg"></i>
              </div>
              <div className="font-medium">Pediatrics</div>
              <div className="text-xs text-gray-500 mt-1">Dr. Anil Kumar</div>
              <div className="flex justify-center space-x-3 mt-2 text-xs text-gray-500">
                <span>
                  <i className="fas fa-user-md mr-1"></i>4
                </span>
                <span>
                  <i className="fas fa-users mr-1"></i>8
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOverview