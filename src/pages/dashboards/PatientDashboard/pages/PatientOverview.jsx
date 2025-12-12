import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const PatientOverview = ({ setActivePage }) => {
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({})

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    setTimeout(() => {
      setDashboardData({
        patientInfo: {
          name: 'Ravi Kumar',
          age: 45,
          bloodGroup: 'B+',
          doctor: 'Dr. Meena Rao',
          lastVisit: '2023-10-10',
          nextAppointment: '2023-10-25'
        },
        healthMetrics: {
          bloodPressure: '120/80',
          bloodSugar: '98 mg/dL',
          weight: '75 kg',
          height: '175 cm',
          bmi: '24.5',
          cholesterol: '180 mg/dL'
        },
        upcomingAppointments: [
          { id: 'APT-3001', doctor: 'Dr. Meena Rao', date: '2023-10-25', time: '10:30 AM', reason: 'Follow-up', status: 'Confirmed' },
          { id: 'APT-3002', doctor: 'Dr. Sharma', date: '2023-10-28', time: '2:00 PM', reason: 'X-Ray Review', status: 'Scheduled' }
        ],
        recentTestResults: [
          { id: 'LAB-1001', test: 'Complete Blood Count', date: '2023-10-10', status: 'Normal', doctor: 'Dr. Meena Rao' },
          { id: 'LAB-1002', test: 'Blood Sugar Fasting', date: '2023-10-10', status: 'Normal', doctor: 'Dr. Meena Rao' },
          { id: 'LAB-1003', test: 'Lipid Profile', date: '2023-10-10', status: 'Borderline', doctor: 'Dr. Meena Rao' }
        ],
        currentPrescriptions: [
          { id: 'RX-5001', medicine: 'Metformin', dosage: '500mg', frequency: 'Twice daily', refills: 2, expiry: '2023-12-31' },
          { id: 'RX-5002', medicine: 'Aspirin', dosage: '81mg', frequency: 'Once daily', refills: 1, expiry: '2023-11-30' }
        ],
        bills: {
          pending: 8500,
          paid: 12500,
          nextDue: '2023-10-30',
          insuranceCoverage: 70
        },
        reminders: [
          { id: 1, type: 'medication', message: 'Take Metformin after breakfast', time: '8:30 AM' },
          { id: 2, type: 'appointment', message: 'Follow-up with Dr. Meena Rao', time: 'Tomorrow, 10:30 AM' },
          { id: 3, type: 'test', message: 'Fasting required for blood test', time: 'Before next visit' }
        ]
      })
      setLoading(false)
    }, 1000)
  }

  const handlePageChange = (page) => {
    setActivePage(page)
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Patient Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">
            👋 Welcome back, {dashboardData.patientInfo.name}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Patient ID: PAT-001 • Last visit: {dashboardData.patientInfo.lastVisit} • Age: {dashboardData.patientInfo.age}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange('appointments')}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
          >
            <i className="fas fa-calendar-plus mr-2"></i>Book Appointment
          </button>
          <button
            onClick={() => handlePageChange('messages')}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
          >
            <i className="fas fa-comment-medical mr-2"></i>Message Doctor
          </button>
        </div>
      </div>

      {/* Health Summary Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-blue-800 text-lg flex items-center">
              <i className="fas fa-heartbeat mr-2"></i>
              Health Summary
            </h3>
            <p className="text-blue-600 text-sm mt-1">
              Primary Care Physician: {dashboardData.patientInfo.doctor}
            </p>
          </div>
          <button 
            onClick={() => handlePageChange('records')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <i className="fas fa-file-medical-alt mr-2"></i>View Complete History
          </button>
        </div>
        
        {/* Health Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
          <div className="bg-white p-3 rounded-lg border text-center">
            <div className="text-xs text-gray-500">Blood Pressure</div>
            <div className="text-lg font-bold text-blue-700 mt-1">{dashboardData.healthMetrics.bloodPressure}</div>
            <div className="text-xs text-green-500 mt-1">Normal</div>
          </div>
          <div className="bg-white p-3 rounded-lg border text-center">
            <div className="text-xs text-gray-500">Blood Sugar</div>
            <div className="text-lg font-bold text-blue-700 mt-1">{dashboardData.healthMetrics.bloodSugar}</div>
            <div className="text-xs text-green-500 mt-1">Normal</div>
          </div>
          <div className="bg-white p-3 rounded-lg border text-center">
            <div className="text-xs text-gray-500">Weight</div>
            <div className="text-lg font-bold text-blue-700 mt-1">{dashboardData.healthMetrics.weight}</div>
            <div className="text-xs text-yellow-500 mt-1">+1kg from last month</div>
          </div>
          <div className="bg-white p-3 rounded-lg border text-center">
            <div className="text-xs text-gray-500">BMI</div>
            <div className="text-lg font-bold text-blue-700 mt-1">{dashboardData.healthMetrics.bmi}</div>
            <div className="text-xs text-green-500 mt-1">Healthy</div>
          </div>
          <div className="bg-white p-3 rounded-lg border text-center">
            <div className="text-xs text-gray-500">Cholesterol</div>
            <div className="text-lg font-bold text-blue-700 mt-1">{dashboardData.healthMetrics.cholesterol}</div>
            <div className="text-xs text-yellow-500 mt-1">Borderline</div>
          </div>
          <div className="bg-white p-3 rounded-lg border text-center">
            <div className="text-xs text-gray-500">Blood Group</div>
            <div className="text-lg font-bold text-blue-700 mt-1">{dashboardData.patientInfo.bloodGroup}</div>
            <div className="text-xs text-gray-500 mt-1">Universal Donor</div>
          </div>
        </div>
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl card-shadow border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg flex items-center">
              <i className="fas fa-calendar-check text-blue-500 mr-2"></i>
              Upcoming Appointments
            </h3>
            <button 
              onClick={() => handlePageChange('appointments')}
              className="text-blue-600 text-sm hover:underline hover:text-blue-800"
            >
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {dashboardData.upcomingAppointments.map(appointment => (
              <div key={appointment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                   onClick={() => handlePageChange('appointments')}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{appointment.doctor}</div>
                    <div className="text-sm text-gray-500 mt-1">{appointment.reason}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'Confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="flex items-center mt-3 text-sm text-gray-600">
                  <i className="far fa-calendar mr-2"></i>
                  <span>{appointment.date} at {appointment.time}</span>
                </div>
              </div>
            ))}
            <button 
              onClick={() => handlePageChange('appointments')}
              className="w-full text-center py-3 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>Book New Appointment
            </button>
          </div>
        </div>

        {/* Recent Test Results */}
        <div className="bg-white rounded-xl card-shadow border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg flex items-center">
              <i className="fas fa-flask text-purple-500 mr-2"></i>
              Recent Test Results
            </h3>
            <button 
              onClick={() => handlePageChange('tests')}
              className="text-blue-600 text-sm hover:underline hover:text-blue-800"
            >
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {dashboardData.recentTestResults.map(test => (
              <div key={test.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                   onClick={() => handlePageChange('tests')}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{test.test}</div>
                    <div className="text-sm text-gray-500 mt-1">Date: {test.date}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    test.status === 'Normal' 
                      ? 'bg-green-100 text-green-800' :
                      test.status === 'Borderline'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {test.status}
                  </span>
                </div>
                <div className="flex items-center mt-3 text-sm text-gray-600">
                  <i className="fas fa-user-md mr-2"></i>
                  <span>Reviewed by: {test.doctor}</span>
                </div>
              </div>
            ))}
            <button 
              onClick={() => handlePageChange('tests')}
              className="w-full text-center py-3 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <i className="fas fa-download mr-2"></i>Download All Reports
            </button>
          </div>
        </div>

        {/* Current Prescriptions */}
        <div className="bg-white rounded-xl card-shadow border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg flex items-center">
              <i className="fas fa-prescription-bottle-alt text-green-500 mr-2"></i>
              Current Medications
            </h3>
            <button 
              onClick={() => handlePageChange('prescriptions')}
              className="text-blue-600 text-sm hover:underline hover:text-blue-800"
            >
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {dashboardData.currentPrescriptions.map(prescription => (
              <div key={prescription.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                   onClick={() => handlePageChange('prescriptions')}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{prescription.medicine}</div>
                    <div className="text-sm text-gray-500 mt-1">{prescription.dosage} • {prescription.frequency}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    prescription.refills > 1 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {prescription.refills} refill{prescription.refills !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
                  <span>
                    <i className="far fa-calendar mr-1"></i>
                    Expires: {prescription.expiry}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePageChange('prescriptions')
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Request Refill
                  </button>
                </div>
              </div>
            ))}
            <button 
              onClick={() => handlePageChange('prescriptions')}
              className="w-full text-center py-3 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <i className="fas fa-history mr-2"></i>View Prescription History
            </button>
          </div>
        </div>
      </div>

      {/* Second Row - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Billing Summary */}
        <div className="bg-white rounded-xl card-shadow border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg flex items-center">
              <i className="fas fa-credit-card text-orange-500 mr-2"></i>
              Billing Summary
            </h3>
            <button 
              onClick={() => handlePageChange('billing')}
              className="text-blue-600 text-sm hover:underline hover:text-blue-800"
            >
              View Details →
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Pending Amount</div>
              <div className="text-2xl font-bold text-red-600">₹{dashboardData.bills.pending}</div>
              <div className="text-xs text-gray-500 mt-1">Due: {dashboardData.bills.nextDue}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Paid Amount</div>
              <div className="text-2xl font-bold text-green-600">₹{dashboardData.bills.paid}</div>
              <div className="text-xs text-gray-500 mt-1">This month</div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Insurance Coverage</span>
              <span className="font-medium text-blue-600">{dashboardData.bills.insuranceCoverage}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${dashboardData.bills.insuranceCoverage}%` }}></div>
            </div>
            <button 
              onClick={() => handlePageChange('billing')}
              className="w-full mt-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
            >
              <i className="fas fa-file-invoice-dollar mr-2"></i>View Bill Details
            </button>
          </div>
        </div>

        {/* Health Reminders */}
        <div className="bg-white rounded-xl card-shadow border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg flex items-center">
              <i className="fas fa-bell text-yellow-500 mr-2"></i>
              Health Reminders
            </h3>
            <button 
              onClick={() => handlePageChange('settings')}
              className="text-blue-600 text-sm hover:underline hover:text-blue-800"
            >
              Manage →
            </button>
          </div>
          <div className="space-y-3">
            {dashboardData.reminders.map(reminder => (
              <div key={reminder.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${
                    reminder.type === 'medication' ? 'bg-blue-100' :
                    reminder.type === 'appointment' ? 'bg-green-100' :
                    'bg-yellow-100'
                  }`}>
                    <i className={`fas ${
                      reminder.type === 'medication' ? 'fa-pills text-blue-500' :
                      reminder.type === 'appointment' ? 'fa-calendar-check text-green-500' :
                      'fa-vial text-yellow-500'
                    }`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{reminder.message}</div>
                    <div className="text-xs text-gray-500 mt-1">{reminder.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => handlePageChange('records')}
            className="w-full mt-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            <i className="fas fa-plus-circle mr-2"></i>Add Health Record
          </button>
        </div>
      </div>
    </div>
  )
}

export default PatientOverview