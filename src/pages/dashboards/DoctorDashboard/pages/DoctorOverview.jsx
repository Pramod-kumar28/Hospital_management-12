import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import AppointmentChart from '../../../../components/ui/Charts/AppointmentChart'

const DoctorOverview = ({ onPageChange }) => {
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
          todaysAppointments: 12,
          pendingReports: 4,
          upcomingSchedule: 5,
          messages: 7,
          performance: {
            appointmentsCompleted: 45,
            patientSatisfaction: 4.7,
            avgConsultationTime: "18 min"
          }
        },
        appointments: [
          { id: 1, patient: "Ravi Kumar", time: "10:30 AM", reason: "Fever", status: "Confirmed", type: "Follow-up" },
          { id: 2, patient: "Anita Sharma", time: "11:00 AM", reason: "Back Pain", status: "Pending", type: "New" },
          { id: 3, patient: "Suresh Patel", time: "11:30 AM", reason: "Routine Checkup", status: "Confirmed", type: "Regular" },
          { id: 4, patient: "Priya Singh", time: "12:00 PM", reason: "Migraine", status: "Confirmed", type: "Urgent" }
        ],
        labs: [
          { id: 1, patient: "Ravi Kumar", test: "Blood Test", result: "Normal", date: "2023-10-10", status: "Reviewed" },
          { id: 2, patient: "Anita Sharma", test: "X-Ray", result: "Mild Infection", date: "2023-10-05", status: "Pending Review" },
          { id: 3, patient: "Suresh Patel", test: "CT Scan", result: "Normal", date: "2023-10-08", status: "Reviewed" },
          { id: 4, patient: "Rajesh Kumar", test: "Blood Sugar", result: "Elevated", date: "2023-10-12", status: "Pending Review" }
        ],
        chartData: [
          { label: 'Mon', value: 12 },
          { label: 'Tue', value: 15 },
          { label: 'Wed', value: 10 },
          { label: 'Thu', value: 14 },
          { label: 'Fri', value: 16 },
          { label: 'Sat', value: 8 }
        ]
      })
      setLoading(false)
    }, 1000)
  }

  const handleViewAllAppointments = () => {
    onPageChange('appointments')
  }

  const handleViewAllLabResults = () => {
    onPageChange('labs')
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-700 mb-3">
        📊 Doctor Dashboard
      </h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded border card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <i className="fas fa-calendar-check text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Today's Appointments</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{dashboardData.stats.todaysAppointments}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded border card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg mr-4">
              <i className="fas fa-file-medical text-yellow-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pending Reports</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{dashboardData.stats.pendingReports}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded border card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-lg mr-4">
              <i className="fas fa-clock text-indigo-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Upcoming Schedule</p>
              <p className="text-2xl font-bold text-indigo-600 mt-1">{dashboardData.stats.upcomingSchedule}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded border card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <i className="fas fa-comments text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Messages</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{dashboardData.stats.messages}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Today's Appointments */}
        <div className="bg-white p-4 rounded border card-shadow">
          <h3 className="text-lg font-semibold mb-3">Today's Appointments</h3>
          <div className="space-y-3">
            {dashboardData.appointments.map(apt => (
              <div key={apt.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    apt.status === 'Confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <p className="font-medium">{apt.patient}</p>
                    <p className="text-xs text-gray-500">{apt.time} - {apt.reason}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  apt.status === 'Confirmed' ? 'status-confirmed' : 'status-pending'
                }`}>
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
          <button 
            className="w-full mt-3 text-blue-600 text-sm flex items-center justify-center hover:text-blue-800 transition-colors"
            onClick={handleViewAllAppointments}
          >
            <i className="fas fa-arrow-right mr-1"></i> View All Appointments
          </button>
        </div>
        
        {/* Recent Lab Results */}
        <div className="bg-white p-4 rounded border card-shadow">
          <h3 className="text-lg font-semibold mb-3">Recent Lab Results</h3>
          <div className="space-y-3">
            {dashboardData.labs.slice(0, 4).map(lab => (
              <div key={lab.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{lab.patient}</p>
                  <p className="text-xs text-gray-500">{lab.test} - {lab.date}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  lab.status === 'Reviewed' ? 'status-completed' : 'status-pending'
                }`}>
                  {lab.status}
                </span>
              </div>
            ))}
          </div>
          <button 
            className="w-full mt-3 text-blue-600 text-sm flex items-center justify-center hover:text-blue-800 transition-colors"
            onClick={handleViewAllLabResults}
          >
            <i className="fas fa-arrow-right mr-1"></i> View All Results
          </button>
        </div>
        
        {/* Performance Metrics */}
        <div className="bg-white p-4 rounded border card-shadow">
          <h3 className="text-lg font-semibold mb-3">Performance Metrics</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Appointments Completed</p>
              <p className="text-2xl font-bold text-blue-600">{dashboardData.stats.performance.appointmentsCompleted}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Patient Satisfaction</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-green-600 mr-2">{dashboardData.stats.performance.patientSatisfaction}</p>
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Consultation Time</p>
              <p className="text-2xl font-bold text-purple-600">{dashboardData.stats.performance.avgConsultationTime}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Appointment Trends Chart */}
      <div className="bg-white p-3 rounded border card-shadow">
        <h3 className="text-lg font-semibold mb-3">Appointment Trends</h3>
        <div className="h-64 w-full">
          <AppointmentChart data={dashboardData.chartData} />
        </div>
      </div>
    </div>
  )
}

export default DoctorOverview