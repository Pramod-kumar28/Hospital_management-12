// import React, { useState, useEffect } from 'react'
// import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
// import DataTable from '../../../../components/ui/Tables/DataTable'
// import PatientRegistration from './PatientRegistration'
// import { Navigate } from 'react-router'

// const ReceptionOverview = () => {
//   const [loading, setLoading] = useState(true)
//   const [dashboardData, setDashboardData] = useState({})

//   useEffect(() => {
//     loadDashboardData()
//   }, [])

//   const loadDashboardData = async () => {
//     setLoading(true)
//     setTimeout(() => {
//       setDashboardData({
//         stats: {
//           totalPatients: 156,
//           todayAppointments: 24,
//           pendingBills: 8,
//           newRegistrations: 12
//         },
//         appointments: [
//           { id: 'APT-3001', patient: 'Ravi Kumar', doctor: 'Dr. Meena Rao', time: '10:30 AM', status: 'Confirmed' },
//           { id: 'APT-3002', patient: 'Anita Sharma', doctor: 'Dr. Sharma', time: '11:00 AM', status: 'Pending' },
//           { id: 'APT-3003', patient: 'Suresh Patel', doctor: 'Dr. Menon', time: '11:30 AM', status: 'Confirmed' }
//         ],
//         registrations: [
//           { id: 'REG-001', name: 'Rajesh Kumar', time: '09:15 AM', type: 'New' },
//           { id: 'REG-002', name: 'Priya Singh', time: '09:30 AM', type: 'Follow-up' }
//         ]
//       })
//       setLoading(false)
//     }, 1000)
//   }

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="space-y-6 animate-fade-in">
//       <h2 className="text-2xl font-semibold text-gray-700">📊 Reception Dashboard</h2>
      
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white p-4 rounded border card-shadow">
//           <div className="flex items-center">
//             <div className="p-3 bg-blue-100 rounded-lg mr-4">
//               <i className="fas fa-users text-blue-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Total Patients</p>
//               <p className="text-2xl font-bold text-blue-600 mt-1">{dashboardData.stats.totalPatients}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded border card-shadow">
//           <div className="flex items-center">
//             <div className="p-3 bg-green-100 rounded-lg mr-4">
//               <i className="fas fa-calendar-check text-green-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Today's Appointments</p>
//               <p className="text-2xl font-bold text-green-600 mt-1">{dashboardData.stats.todayAppointments}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded border card-shadow">
//           <div className="flex items-center">
//             <div className="p-3 bg-yellow-100 rounded-lg mr-4">
//               <i className="fas fa-file-invoice text-yellow-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Pending Bills</p>
//               <p className="text-2xl font-bold text-yellow-600 mt-1">{dashboardData.stats.pendingBills}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded border card-shadow">
//           <div className="flex items-center">
//             <div className="p-3 bg-purple-100 rounded-lg mr-4">
//               <i className="fas fa-user-plus text-purple-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">New Registrations</p>
//               <p className="text-2xl font-bold text-purple-600 mt-1">{dashboardData.stats.newRegistrations}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Data */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white p-4 rounded border card-shadow">
//           <h3 className="text-lg font-semibold mb-3">Today's Appointments</h3>
//           <DataTable
//             columns={[
//               { key: 'patient', title: 'Patient', sortable: true },
//               { key: 'doctor', title: 'Doctor', sortable: true },
//               { key: 'time', title: 'Time', sortable: true },
//               { 
//                 key: 'status', 
//                 title: 'Status', 
//                 sortable: true,
//                 render: (value) => (
//                   <span className={`px-2 py-1 rounded-full text-xs ${
//                     value === 'Confirmed' ? 'status-confirmed' : 'status-pending'
//                   }`}>
//                     {value}
//                   </span>
//                 )
//               }
//             ]}
//             data={dashboardData.appointments}
//           />
//         </div>
        
//         <div className="bg-white p-4 rounded border card-shadow">
//           <h3 className="text-lg font-semibold mb-3">Recent Registrations</h3>
//           <DataTable
//             columns={[
//               { key: 'name', title: 'Patient', sortable: true },
//               { key: 'time', title: 'Time', sortable: true },
//               { 
//                 key: 'type', 
//                 title: 'Type', 
//                 sortable: true,
//                 render: (value) => (
//                   <span className={`px-2 py-1 rounded-full text-xs ${
//                     value === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
//                   }`}>
//                     {value}
//                   </span>
//                 )
//               }
//             ]}
//             data={dashboardData.registrations}
//           />
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white p-4 rounded border card-shadow">
//         <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <button className="p-4 border rounded-lg hover:bg-blue-50 transition-colors text-center" onClick={()=> Navigate(<PatientRegistration/>)}>
//             <i className="fas fa-user-plus text-blue-600 text-xl mb-2"></i>
//             <p className="font-medium">New Registration</p>
//           </button>
//           <button className="p-4 border rounded-lg hover:bg-green-50 transition-colors text-center">
//             <i className="fas fa-calendar-plus text-green-600 text-xl mb-2"></i>
//             <p className="font-medium">Schedule Appointment</p>
//           </button>
//           <button className="p-4 border rounded-lg hover:bg-yellow-50 transition-colors text-center">
//             <i className="fas fa-receipt text-yellow-600 text-xl mb-2"></i>
//             <p className="font-medium">Generate Bill</p>
//           </button>
//           <button className="p-4 border rounded-lg hover:bg-purple-50 transition-colors text-center">
//             <i className="fas fa-search text-purple-600 text-xl mb-2"></i>
//             <p className="font-medium">Find Patient</p>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ReceptionOverview



























// import React, { useState, useEffect } from 'react'
// import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
// import DataTable from '../../../../components/ui/Tables/DataTable'

// const ReceptionOverview = () => {
//   const [loading, setLoading] = useState(true)
//   const [dashboardData, setDashboardData] = useState({})

//   useEffect(() => {
//     loadDashboardData()
//   }, [])

//   const loadDashboardData = async () => {
//     setLoading(true)
//     setTimeout(() => {
//       setDashboardData({
//         stats: {
//           totalPatients: 156,
//           todayAppointments: 24,
//           pendingBills: 8,
//           newRegistrations: 12
//         },
//         appointments: [
//           { id: 'APT-3001', patient: 'Ravi Kumar', doctor: 'Dr. Meena Rao', time: '10:30 AM', status: 'Confirmed' },
//           { id: 'APT-3002', patient: 'Anita Sharma', doctor: 'Dr. Sharma', time: '11:00 AM', status: 'Pending' },
//           { id: 'APT-3003', patient: 'Suresh Patel', doctor: 'Dr. Menon', time: '11:30 AM', status: 'Confirmed' }
//         ],
//         registrations: [
//           { id: 'REG-001', name: 'Rajesh Kumar', time: '09:15 AM', type: 'New' },
//           { id: 'REG-002', name: 'Priya Singh', time: '09:30 AM', type: 'Follow-up' }
//         ]
//       })
//       setLoading(false)
//     }, 1000)
//   }

//   // Handle quick action button clicks
//   const handleQuickAction = (action) => {
//     // Dispatch custom event to notify parent component about navigation
//     const event = new CustomEvent('dashboard-navigation', {
//       detail: { page: action }
//     })
//     window.dispatchEvent(event)
    
//     // Log for debugging
//     console.log(`Navigating to: ${action}`)
//   }

//   // Handle appointment row click
//   const handleAppointmentClick = (appointment) => {
//     console.log('Appointment clicked:', appointment)
//     // You can navigate to appointment details or trigger modal
//     alert(`Viewing appointment ${appointment.id} for ${appointment.patient}`)
//   }

//   // Handle registration row click
//   const handleRegistrationClick = (registration) => {
//     console.log('Registration clicked:', registration)
//     alert(`Viewing registration ${registration.id} for ${registration.name}`)
//   }

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="space-y-6 animate-fade-in">
//       <h2 className="text-2xl font-semibold text-gray-700">📊 Reception Dashboard</h2>
      
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white p-4 rounded border card-shadow hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleQuickAction('records')}>
//           <div className="flex items-center">
//             <div className="p-3 bg-blue-100 rounded-lg mr-4">
//               <i className="fas fa-users text-blue-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Total Patients</p>
//               <p className="text-2xl font-bold text-blue-600 mt-1">{dashboardData.stats.totalPatients}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded border card-shadow hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleQuickAction('appointments')}>
//           <div className="flex items-center">
//             <div className="p-3 bg-green-100 rounded-lg mr-4">
//               <i className="fas fa-calendar-check text-green-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Today's Appointments</p>
//               <p className="text-2xl font-bold text-green-600 mt-1">{dashboardData.stats.todayAppointments}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded border card-shadow hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleQuickAction('billing')}>
//           <div className="flex items-center">
//             <div className="p-3 bg-yellow-100 rounded-lg mr-4">
//               <i className="fas fa-file-invoice text-yellow-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Pending Bills</p>
//               <p className="text-2xl font-bold text-yellow-600 mt-1">{dashboardData.stats.pendingBills}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded border card-shadow hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleQuickAction('registration')}>
//           <div className="flex items-center">
//             <div className="p-3 bg-purple-100 rounded-lg mr-4">
//               <i className="fas fa-user-plus text-purple-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">New Registrations</p>
//               <p className="text-2xl font-bold text-purple-600 mt-1">{dashboardData.stats.newRegistrations}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Data */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white p-4 rounded border card-shadow">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg font-semibold">Today's Appointments</h3>
//             <button 
//               onClick={() => handleQuickAction('appointments')}
//               className="text-sm text-blue-600 hover:text-blue-800"
//             >
//               View All →
//             </button>
//           </div>
//           <DataTable
//             columns={[
//               { key: 'patient', title: 'Patient', sortable: true },
//               { key: 'doctor', title: 'Doctor', sortable: true },
//               { key: 'time', title: 'Time', sortable: true },
//               { 
//                 key: 'status', 
//                 title: 'Status', 
//                 sortable: true,
//                 render: (value) => (
//                   <span className={`px-2 py-1 rounded-full text-xs ${
//                     value === 'Confirmed' ? 'status-confirmed' : 'status-pending'
//                   }`}>
//                     {value}
//                   </span>
//                 )
//               }
//             ]}
//             data={dashboardData.appointments}
//             onRowClick={handleAppointmentClick}
//           />
//         </div>
        
//         <div className="bg-white p-4 rounded border card-shadow">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg font-semibold">Recent Registrations</h3>
//             <button 
//               onClick={() => handleQuickAction('registration')}
//               className="text-sm text-blue-600 hover:text-blue-800"
//             >
//               View All →
//             </button>
//           </div>
//           <DataTable
//             columns={[
//               { key: 'name', title: 'Patient', sortable: true },
//               { key: 'time', title: 'Time', sortable: true },
//               { 
//                 key: 'type', 
//                 title: 'Type', 
//                 sortable: true,
//                 render: (value) => (
//                   <span className={`px-2 py-1 rounded-full text-xs ${
//                     value === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
//                   }`}>
//                     {value}
//                   </span>
//                 )
//               }
//             ]}
//             data={dashboardData.registrations}
//             onRowClick={handleRegistrationClick}
//           />
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white p-4 rounded border card-shadow">
//         <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <button 
//             className="p-4 border rounded-lg hover:bg-blue-50 transition-colors text-center group"
//             onClick={() => handleQuickAction('registration')}
//           >
//             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
//               <i className="fas fa-user-plus text-blue-600 text-xl"></i>
//             </div>
//             <p className="font-medium text-gray-800">New Registration</p>
//             <p className="text-xs text-gray-500 mt-1">Register new patient</p>
//           </button>
          
//           <button 
//             className="p-4 border rounded-lg hover:bg-green-50 transition-colors text-center group"
//             onClick={() => handleQuickAction('appointments')}
//           >
//             <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
//               <i className="fas fa-calendar-plus text-green-600 text-xl"></i>
//             </div>
//             <p className="font-medium text-gray-800">Schedule Appointment</p>
//             <p className="text-xs text-gray-500 mt-1">Book appointment</p>
//           </button>
          
//           <button 
//             className="p-4 border rounded-lg hover:bg-yellow-50 transition-colors text-center group"
//             onClick={() => handleQuickAction('billing')}
//           >
//             <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-yellow-200 transition-colors">
//               <i className="fas fa-receipt text-yellow-600 text-xl"></i>
//             </div>
//             <p className="font-medium text-gray-800">Generate Bill</p>
//             <p className="text-xs text-gray-500 mt-1">Create invoice/bill</p>
//           </button>
          
//           <button 
//             className="p-4 border rounded-lg hover:bg-purple-50 transition-colors text-center group"
//             onClick={() => handleQuickAction('records')}
//           >
//             <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
//               <i className="fas fa-search text-purple-600 text-xl"></i>
//             </div>
//             <p className="font-medium text-gray-800">Find Patient</p>
//             <p className="text-xs text-gray-500 mt-1">Search patient records</p>
//           </button>
//         </div>

//         {/* Additional Quick Actions */}
//         {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
//           <button 
//             className="p-3 border rounded-lg hover:bg-blue-50 transition-colors text-center group"
//             onClick={() => handleQuickAction('opd')}
//           >
//             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-200">
//               <i className="fas fa-stethoscope text-blue-600"></i>
//             </div>
//             <p className="font-medium text-sm text-gray-800">OPD Management</p>
//           </button>
          
//           <button 
//             className="p-3 border rounded-lg hover:bg-green-50 transition-colors text-center group"
//             onClick={() => handleQuickAction('ipd')}
//           >
//             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-green-200">
//               <i className="fas fa-procedures text-green-600"></i>
//             </div>
//             <p className="font-medium text-sm text-gray-800">IPD Management</p>
//           </button>
          
//           <button 
//             className="p-3 border rounded-lg hover:bg-purple-50 transition-colors text-center group"
//             onClick={() => handleQuickAction('documents')}
//           >
//             <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-purple-200">
//               <i className="fas fa-file-medical text-purple-600"></i>
//             </div>
//             <p className="font-medium text-sm text-gray-800">Document Management</p>
//           </button>
//         </div> */}
//       </div>
//     </div>
//   )
// }

// export default ReceptionOverview















































import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'

const ReceptionOverview = ({ setActivePage }) => {
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
          newRegistrations: 12,
          waitingPatients: 14,
          completedAppointments: 18,
          revenueToday: 125000,
          avgWaitTime: 24
        },
        appointments: [
          { id: 'APT-3001', patient: 'Ravi Kumar', doctor: 'Dr. Meena Rao', time: '10:30 AM', status: 'Confirmed', reason: 'General Checkup' },
          { id: 'APT-3002', patient: 'Anita Sharma', doctor: 'Dr. Sharma', time: '11:00 AM', status: 'Pending', reason: 'Fever Consultation' },
          { id: 'APT-3003', patient: 'Suresh Patel', doctor: 'Dr. Menon', time: '11:30 AM', status: 'Confirmed', reason: 'Follow-up Visit' },
          { id: 'APT-3004', patient: 'Priya Singh', doctor: 'Dr. Verma', time: '12:00 PM', status: 'In Progress', reason: 'Lab Test' }
        ],
        registrations: [
          { id: 'REG-001', name: 'Rajesh Kumar', time: '09:15 AM', type: 'New', priority: 'Normal' },
          { id: 'REG-002', name: 'Priya Singh', time: '09:30 AM', type: 'Follow-up', priority: 'Normal' },
          { id: 'REG-003', name: 'Amit Patel', time: '10:00 AM', type: 'New', priority: 'Urgent' }
        ],
        waitingPatients: [
          { id: 'P-1001', name: 'Rajesh Kumar', waitingSince: '09:15 AM', department: 'Cardiology', priority: 'Normal' },
          { id: 'P-1002', name: 'Anjali Mehta', waitingSince: '09:45 AM', department: 'Orthopedics', priority: 'Normal' },
          { id: 'P-1003', name: 'Vikram Singh', waitingSince: '10:00 AM', department: 'General', priority: 'Urgent' }
        ]
      })
      setLoading(false)
    }, 1000)
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
      {/* Header with Greeting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">
           Reception Dashboard
          </h2>
          
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleQuickAction('appointments')}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
          >
            <i className="fas fa-calendar-plus mr-2"></i>New Appointment
          </button>
          <button
            onClick={() => handleQuickAction('registration')}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
          >
            <i className="fas fa-user-plus mr-2"></i>Register Patient
          </button>
        </div>
      </div>

      {/* Reception Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Today's Appointments */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => handleQuickAction('appointments')}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent pointer-events-none" />
          
          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            +{dashboardData.stats.todayAppointments - dashboardData.stats.completedAppointments}
          </span>
          
          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 mb-3">
                <i className="fas fa-calendar-check text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Today's Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.todayAppointments}</p>
              <p className="text-xs text-gray-400 mt-1">
                {dashboardData.stats.completedAppointments} completed • {dashboardData.stats.todayAppointments - dashboardData.stats.completedAppointments} remaining
              </p>
            </div>
            
            {/* mini bars */}
            <div className="flex items-end gap-1 h-14">
              <div className="w-1.5 h-8 bg-blue-300 rounded"></div>
              <div className="w-1.5 h-10 bg-blue-400 rounded"></div>
              <div className="w-1.5 h-6 bg-blue-300 rounded"></div>
              <div className="w-1.5 h-12 bg-blue-500 rounded"></div>
              <div className="w-1.5 h-9 bg-blue-400 rounded"></div>
            </div>
          </div>
        </div>

        {/* Waiting Patients */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => handleQuickAction('records')}>
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent pointer-events-none" />
          
          <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            {dashboardData.stats.waitingPatients}
          </span>
          
          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 mb-3">
                <i className="fas fa-users text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Patients Waiting</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.waitingPatients}</p>
              <p className="text-xs text-gray-400 mt-1">Avg wait: {dashboardData.stats.avgWaitTime} min</p>
            </div>
            
            {/* mini line chart */}
            <svg width="70" height="40" viewBox="0 0 70 40">
              <polyline
                points="0,28 12,30 24,26 36,24 48,20 60,18"
                fill="none"
                stroke="#eab308"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* Pending Bills */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => handleQuickAction('billing')}>
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent pointer-events-none" />
          
          <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            Action
          </span>
          
          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 mb-3">
                <i className="fas fa-file-invoice-dollar text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Pending Bills</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.pendingBills}</p>
              <p className="text-xs text-gray-400 mt-1">₹{(dashboardData.stats.revenueToday/1000).toFixed(1)}K revenue</p>
            </div>
            
            {/* mini bars */}
            <div className="flex items-end gap-1 h-14">
              <div className="w-1.5 h-10 bg-red-400 rounded"></div>
              <div className="w-1.5 h-8 bg-red-300 rounded"></div>
              <div className="w-1.5 h-12 bg-red-500 rounded"></div>
              <div className="w-1.5 h-6 bg-red-400 rounded"></div>
              <div className="w-1.5 h-11 bg-red-300 rounded"></div>
            </div>
          </div>
        </div>

        {/* New Registrations */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => handleQuickAction('registration')}>
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent pointer-events-none" />
          
          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            +{dashboardData.stats.newRegistrations}
          </span>
          
          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 mb-3">
                <i className="fas fa-user-plus text-white"></i>
              </div>
              <p className="text-sm text-gray-500">New Registrations</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.newRegistrations}</p>
              <p className="text-xs text-gray-400 mt-1">Total patients: {dashboardData.stats.totalPatients}</p>
            </div>
            
            {/* mini line chart */}
            <svg width="70" height="40" viewBox="0 0 70 40">
              <polyline
                points="0,30 12,28 24,32 36,26 48,28 60,25"
                fill="none"
                stroke="#10b981"
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent pointer-events-none" />
          
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
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                      apt.status === 'Confirmed' ? 'bg-green-100' : 
                      apt.status === 'Pending' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      <i className={`fas ${
                        apt.status === 'Confirmed' ? 'fa-check-circle text-green-600' : 
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
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                      apt.status === 'Confirmed' 
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
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent pointer-events-none" />
          
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
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                      reg.type === 'New' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      <i className={`fas ${
                        reg.type === 'New' ? 'fa-user-plus text-blue-600' : 'fa-user-check text-green-600'
                      }`}></i>
                    </div>
                    <div>
                      <div className="font-medium">{reg.name}</div>
                      <div className="text-sm text-gray-500">Registration ID: {reg.id}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          reg.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {reg.priority}
                        </span>
                        <span className="text-xs text-gray-500">{reg.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-700">{reg.time}</div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                      reg.type === 'New' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
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
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent pointer-events-none" />
          
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
            <div className="mt-6 pt-4 border-t border-gray-200">
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
            </div>
          </div>
        </div>
      </div>

      {/* Waiting Area */}
      <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent pointer-events-none" />
        
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 mr-3">
                <i className="fas fa-clock text-white"></i>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Waiting Area</h3>
                <p className="text-gray-500 text-sm">Patients currently waiting for consultation</p>
              </div>
            </div>
            <button 
              onClick={() => handleQuickAction('records')}
              className="text-blue-600 text-sm hover:underline hover:text-blue-800"
            >
              Manage Queue →
            </button>
          </div>
          
          <div className="space-y-3">
            {dashboardData.waitingPatients?.map(patient => (
              <div key={patient.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all cursor-pointer"
                   onClick={() => handlePatientClick(patient)}>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                    patient.priority === 'Urgent' ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    <i className={`fas ${
                      patient.priority === 'Urgent' ? 'fa-exclamation-triangle text-red-600' : 'fa-user-clock text-gray-600'
                    }`}></i>
                  </div>
                  <div>
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-sm text-gray-500">{patient.department}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        patient.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {patient.priority}
                      </span>
                      <span className="text-xs text-gray-500">
                        <i className="far fa-clock mr-1"></i>
                        Waiting since {patient.waitingSince}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-700">
                    <i className="fas fa-door-open text-gray-400 mr-2"></i>
                    Ready for
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                    patient.department === 'Emergency' 
                      ? 'bg-red-100 text-red-800' 
                      : patient.department === 'Cardiology'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
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