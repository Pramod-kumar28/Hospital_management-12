import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'
import { apiFetch } from '../../../../services/apiClient'
import { RECEPTIONIST_DASHBOARD_OVERVIEW } from '../../../../config/api'

const ReceptionOverview = ({ setActivePage }) => {
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalPatients: 0,
      todayAppointments: 0,
      pendingBills: 0,
      newRegistrations: 0,
      waitingPatients: 0,
      completedAppointments: 0,
      revenueToday: 0,
      avgWaitTime: 0
    },
    appointments: [],
    registrations: [],
    waitingPatients: []
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const res = await apiFetch(RECEPTIONIST_DASHBOARD_OVERVIEW)
      const data = await res.json()

      if (res.ok) {
        setDashboardData({
          stats: {
            totalPatients: data.stats?.totalPatients || data.stats?.total_patients || 0,
            todayAppointments: data.stats?.todayAppointments || data.stats?.today_appointments || 0,
            pendingBills: data.stats?.pendingBills || data.stats?.pending_bills || 0,
            newRegistrations: data.stats?.newRegistrations || data.stats?.new_registrations || 0,
            waitingPatients: data.stats?.waitingPatients || data.stats?.waiting_patients || 0,
            completedAppointments: data.stats?.completedAppointments || data.stats?.completed_appointments || 0,
            revenueToday: data.stats?.revenueToday || data.stats?.revenue_today || 0,
            avgWaitTime: data.stats?.avgWaitTime || data.stats?.avg_wait_time || 0
          },
          appointments: data.appointments || [],
          registrations: data.registrations || [],
          waitingPatients: data.waitingPatients || data.waiting_patients || []
        })
      } else {
        console.error('Failed to load dashboard data:', data.message || 'Unknown error')
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleQuickAction = (action) => {
    console.log(`Navigating to: ${action}`)
    // Directly call setActivePage prop
    if (setActivePage) {
      setActivePage(action)
    }
  }

  const handleAppointmentClick = (appointment) => {
    console.log('Appointment clicked:', appointment)
    handleQuickAction('appointments')
  }

  const handleRegistrationClick = (registration) => {
    console.log('Registration clicked:', registration)
    handleQuickAction('registration')
  }

  const handlePatientClick = (patient) => {
    console.log('Patient clicked:', patient)
    handleQuickAction('records')
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-700"> Reception Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* TOTAL PATIENTS */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent pointer-events-none" />

          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 mb-3">
                <i className="fas fa-users text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardData.stats.totalPatients}
              </p>
              <p className="text-xs text-gray-400 mt-1">Overall registered</p>
            </div>

            {/* mini bars */}
            <div className="flex items-end gap-1 h-14">
              <div className="w-1.5 h-5 bg-blue-300 rounded"></div>
              <div className="w-1.5 h-8 bg-blue-400 rounded"></div>
              <div className="w-1.5 h-11 bg-blue-500 rounded"></div>
              <div className="w-1.5 h-7 bg-blue-400 rounded"></div>
              <div className="w-1.5 h-12 bg-blue-600 rounded"></div>
            </div>
          </div>
        </div>

        {/* TODAY'S APPOINTMENTS */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent pointer-events-none" />

          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 mb-3">
                <i className="fas fa-calendar-check text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Today's Appointments</p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardData.stats.todayAppointments}
              </p>
              <p className="text-xs text-gray-400 mt-1">Today</p>
            </div>

            {/* mini line */}
            <svg width="70" height="40" viewBox="0 0 70 40">
              <polyline
                points="0,30 12,24 24,26 36,18 48,20 60,14"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* PENDING BILLS */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent pointer-events-none" />

          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 mb-3">
                <i className="fas fa-file-invoice text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Pending Bills</p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardData.stats.pendingBills}
              </p>
              <p className="text-xs text-gray-400 mt-1">Awaiting payment</p>
            </div>

            {/* mini bars */}
            <div className="flex items-end gap-1 h-14">
              <div className="w-1.5 h-10 bg-yellow-300 rounded"></div>
              <div className="w-1.5 h-6 bg-yellow-200 rounded"></div>
              <div className="w-1.5 h-12 bg-yellow-400 rounded"></div>
              <div className="w-1.5 h-8 bg-yellow-300 rounded"></div>
              <div className="w-1.5 h-9 bg-yellow-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* NEW REGISTRATIONS */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent pointer-events-none" />

          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 mb-3">
                <i className="fas fa-user-plus text-white"></i>
              </div>
              <p className="text-sm text-gray-500">New Registrations</p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardData.stats.newRegistrations}
              </p>
              <p className="text-xs text-gray-400 mt-1">Recently added</p>
            </div>

            {/* mini line */}
            <svg width="70" height="40" viewBox="0 0 70 40">
              <polyline
                points="0,28 12,26 24,22 36,24 48,18 60,12"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

      </div>


      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Today's Appointments Table */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 to-transparent pointer-events-none" />

          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 mr-3">
                  <i className="fas fa-calendar-day text-white"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Today's Appointments</h3>
                  <p className="text-gray-500 text-sm">Upcoming appointments for today</p>
                </div>
              </div>
              <button
                onClick={() => handleQuickAction('appointments')}
                className="text-blue-600 text-sm hover:underline hover:text-blue-800"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {dashboardData.appointments.map(apt => (
                <div key={apt.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => handleAppointmentClick(apt)}>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${apt.status === 'Confirmed' ? 'bg-green-100' :
                        apt.status === 'Pending' ? 'bg-yellow-100' : 'bg-blue-100'
                      }`}>
                      <i className={`fas ${apt.status === 'Confirmed' ? 'fa-check-circle text-green-600' :
                          apt.status === 'Pending' ? 'fa-clock text-yellow-600' : 'fa-spinner text-blue-600'
                        }`}></i>
                    </div>
                    <div>
                      <div className="font-medium">{apt.patient}</div>
                      <div className="text-sm text-gray-500">{apt.doctor}</div>
                      <div className="text-xs text-gray-400 mt-1">{apt.reason}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-700">{apt.time}</div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${apt.status === 'Confirmed'
                        ? 'bg-green-100 text-green-800'
                        : apt.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Registrations */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0  to-transparent pointer-events-none" />

          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 mr-3">
                  <i className="fas fa-user-plus text-white"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Recent Registrations</h3>
                  <p className="text-gray-500 text-sm">New patient registrations today</p>
                </div>
              </div>
              <button
                onClick={() => handleQuickAction('registration')}
                className="text-blue-600 text-sm hover:underline hover:text-blue-800"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {dashboardData.registrations.map(reg => (
                <div key={reg.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => handleRegistrationClick(reg)}>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${reg.type === 'New' ? 'bg-blue-100' : 'bg-green-100'
                      }`}>
                      <i className={`fas ${reg.type === 'New' ? 'fa-user-plus text-blue-600' : 'fa-user-check text-green-600'
                        }`}></i>
                    </div>
                    <div>
                      <div className="font-medium">{reg.name}</div>
                      <div className="text-sm text-gray-500">Registration ID: {reg.id}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded text-xs ${reg.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                          {reg.priority}
                        </span>
                        {/* <span className="text-xs text-gray-500">{reg.type}</span> */}
                      </div>
                    </div>
                  </div>
                  <div className="text-right min-w-[88px] whitespace-nowrap">
                    <div className="font-medium text-gray-700">{reg.time}</div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${reg.type === 'New'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                        }`}
                    >
                      {reg.type}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0  to-transparent pointer-events-none" />

          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-500 mr-3">
                <i className="fas fa-bolt text-white"></i>
              </div>
              <h3 className="font-semibold text-lg">Quick Actions</h3>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleQuickAction('registration')}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all text-left"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-user-plus text-blue-600"></i>
                  </div>
                  <span>Register New Patient</span>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </button>

              <button
                onClick={() => handleQuickAction('appointments')}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all text-left"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-calendar-plus text-green-600"></i>
                  </div>
                  <span>Schedule Appointment</span>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </button>

              <button
                onClick={() => handleQuickAction('billing')}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all text-left"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-file-invoice text-yellow-600"></i>
                  </div>
                  <span>Generate Bill</span>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </button>

              <button
                onClick={() => handleQuickAction('records')}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all text-left"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-search text-purple-600"></i>
                  </div>
                  <span>Find Patient Record</span>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </button>

              {/* Additional Menu Items */}
              <button
                onClick={() => handleQuickAction('opd')}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all text-left"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-stethoscope text-orange-600"></i>
                  </div>
                  <span>OPD Management</span>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </button>

              <button
                onClick={() => handleQuickAction('ipd')}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all text-left"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-procedures text-teal-600"></i>
                  </div>
                  <span>IPD Management</span>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </button>

              <button
                onClick={() => handleQuickAction('documents')}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all text-left"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-file-medical text-indigo-600"></i>
                  </div>
                  <span>Document Management</span>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </button>
            </div>

            {/* Additional Actions */}
            {/* <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Additional Tools</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleQuickAction('discharge')}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-xs text-gray-700 flex items-center justify-center"
                >
                  <i className="fas fa-file-signature mr-1"></i>
                  Discharge
                </button>
                <button
                  onClick={() => handleQuickAction('profile')}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-xs text-gray-700 flex items-center justify-center"
                >
                  <i className="fas fa-user-circle mr-1"></i>
                  Profile
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Waiting Area */}
      <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
        <div className="relative">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 mr-3 shrink-0">
                <i className="fas fa-clock text-white"></i>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Waiting Area</h3>
                <p className="text-gray-500 text-sm">
                  Patients currently waiting for consultation
                </p>
              </div>
            </div>

            <button
              onClick={() => handleQuickAction('records')}
              className="text-blue-600 text-sm hover:underline hover:text-blue-800 self-start sm:self-auto"
            >
              View All →
            </button>
          </div>

          {/* PATIENT LIST */}
          <div className="space-y-3">
            {dashboardData.waitingPatients?.map(patient => (
              <div
                key={patient.id}
                onClick={() => handlePatientClick(patient)}
                className="
            flex flex-col lg:flex-row 
            lg:items-center lg:justify-between
            gap-4 p-4 border border-gray-200 rounded-lg
            hover:bg-gray-50 hover:shadow-sm transition-all cursor-pointer
          "
              >
                {/* LEFT SECTION */}
                <div className="flex items-start sm:items-center">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 shrink-0 ${patient.priority === 'Urgent' ? 'bg-red-100' : 'bg-gray-100'
                      }`}
                  >
                    <i
                      className={`fas ${patient.priority === 'Urgent'
                          ? 'fa-exclamation-triangle text-red-600'
                          : 'fa-user-clock text-gray-600'
                        }`}
                    ></i>
                  </div>

                  <div>
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-sm text-gray-500">{patient.department}</div>

                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span
                        className={`px-2 py-0.5 rounded text-xs ${patient.priority === 'Urgent'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-700'
                          }`}
                      >
                        {patient.priority}
                      </span>

                      <span className="text-xs text-gray-500 flex items-center">
                        <i className="far fa-clock mr-1"></i>
                        Waiting since {patient.waitingSince}
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="flex lg:flex-col items-start lg:items-end gap-2">
                  <div className="text-sm font-medium text-gray-700 flex items-center">
                    <i className="fas fa-door-open text-gray-400 mr-2"></i>
                    Ready for
                  </div>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${patient.department === 'Emergency'
                        ? 'bg-red-100 text-red-800'
                        : patient.department === 'Cardiology'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                  >
                    {patient.department}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Emergency Contact Banner */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 mr-4">
              <i className="fas fa-ambulance text-xl"></i>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Emergency Contact</h3>
              <p className="text-sm opacity-90">Immediate assistance required</p>
            </div>
          </div>
          <button
            onClick={() => handleQuickAction('ipd')}
            className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            <i className="fas fa-phone-alt mr-2"></i>
            Call Emergency
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReceptionOverview