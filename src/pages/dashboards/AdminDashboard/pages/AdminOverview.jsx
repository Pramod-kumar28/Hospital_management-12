// import React, { useState, useEffect } from 'react'
// import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

// const AdminOverview = ({ setActivePage }) => {
//   const [loading, setLoading] = useState(true)
//   const [dashboardData, setDashboardData] = useState({})

//   useEffect(() => {
//     loadDashboardData()
//   }, [])

//   const loadDashboardData = async () => {
//     setLoading(true)
//     setTimeout(() => {
//       setDashboardData({
//         metrics: {
//           totalPatientsToday: 42,
//           totalPatientsMonth: 1250,
//           activeDoctors: 28,
//           appointmentsScheduled: 156,
//           revenue: 125000,
//           bedOccupancy: 78,
//           availableBeds: 22,
//           pendingBills: 85000,
//           avgWaitTime: 24,
//           emergencyCases: 8
//         },
//         criticalAlerts: [
//           { id: 1, type: 'bed', severity: 'high', message: 'ICU beds at 95% capacity', time: '2 hours ago' },
//           { id: 2, type: 'staff', severity: 'medium', message: '3 nurses on leave tomorrow', time: '4 hours ago' },
//           { id: 3, type: 'equipment', severity: 'low', message: 'MRI maintenance due in 3 days', time: '1 day ago' }
//         ],
//         appointments: [
//           { id: 'APT-3001', patient: 'Patient 1', doctor: 'Dr. Meena Rao', dateTime: '2023-10-15 10:30 AM', status: 'Confirmed', reason: 'Routine Checkup' },
//           { id: 'APT-3002', patient: 'Patient 2', doctor: 'Dr. Sharma', dateTime: '2023-10-15 11:00 AM', status: 'Pending', reason: 'Fever' }
//         ],
//         departments: [
//           { id: 'DEPT-001', icon: "fas fa-heartbeat", name: 'Cardiology', head: 'Dr. Meena Rao', doctors: 5, staff: 12, occupancy: 92 },
//           { id: 'DEPT-002', icon: "fas fa-bone", name: 'Orthopedics', head: 'Dr. Vivek Sharma', doctors: 4, staff: 8, occupancy: 65 },
          
//         ],
//         financialSummary: {
//           revenueToday: 125000,
//           expensesToday: 85000,
//           pendingClaims: 120000,
//           collectedToday: 75000
//         },
//         staffStatus: {
//           onDuty: 145,
//           onLeave: 12,
//           availableShifts: 8,
//           pendingRequests: 5
//         }
//       })
//       setLoading(false)
//     }, 1000)
//   }

//   const handlePageChange = (page) => {
//     setActivePage(page)
//   }

//   const handleAlertClick = (alertType) => {
//     switch (alertType) {
//       case 'bed':
//         setActivePage('inpatient')
//         break
//       case 'staff':
//         setActivePage('staff')
//         break
//       case 'equipment':
//         setActivePage('settings')
//         break
//       default:
//         setActivePage('dashboard')
//     }
//   }

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="space-y-6 animate-fade-in">
//       {/* Header with Quick Actions */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-700">
//             📊 Dashboard Overview
//           </h2>
//           <p className="text-gray-500 text-sm mt-1">
//             Good morning, Administrator • {new Date().toLocaleDateString('en-IN', { 
//               weekday: 'long', 
//               year: 'numeric', 
//               month: 'long', 
//               day: 'numeric' 
//             })}
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={() => handlePageChange('inpatient')}
//             className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
//           >
//             <i className="fas fa-ambulance mr-2"></i>Emergency Protocol
//           </button>
//           <button
//             onClick={() => handlePageChange('reports')}
//             className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
//           >
//             <i className="fas fa-chart-bar mr-2"></i>Generate Reports
//           </button>
//         </div>
//       </div>

//       {/* Critical Alerts Banner */}
//       {dashboardData.criticalAlerts && dashboardData.criticalAlerts.length > 0 && (
//         <div className="bg-red-50 border border-red-200 rounded-xl p-4 cursor-pointer hover:bg-red-100 transition-colors"
//              onClick={() => handleAlertClick(dashboardData.criticalAlerts[0].type)}>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <i className="fas fa-exclamation-triangle text-red-500 text-xl mr-3"></i>
//               <div>
//                 <h3 className="font-semibold text-red-700">Critical Alerts</h3>
//                 <p className="text-red-600 text-sm">
//                   {dashboardData.criticalAlerts[0].message} • {dashboardData.criticalAlerts[0].time}
//                 </p>
//               </div>
//             </div>
//             <button 
//               onClick={(e) => {
//                 e.stopPropagation()
//                 handlePageChange('reports')
//               }}
//               className="text-red-600 hover:text-red-800 text-sm font-medium"
//             >
//               View all ({dashboardData.criticalAlerts.length})
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Metrics Grid - Enhanced */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {/* Emergency Cases - Clickable */}
//         <div className="bg-white p-6 rounded-xl card-shadow border border-l-4 border-l-red-500 cursor-pointer hover:shadow-md transition-shadow"
//              onClick={() => handlePageChange('inpatient')}>
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-sm text-gray-500">Emergency Cases Today</div>
//               <div className="text-3xl font-bold text-red-600 mt-1">
//                 {dashboardData.metrics.emergencyCases}
//               </div>
//               <div className="text-xs text-red-500 mt-1 flex items-center">
//                 <i className="fas fa-arrow-up mr-1"></i>+2 from yesterday
//               </div>
//             </div>
//             <div className="bg-red-100 p-3 rounded-lg">
//               <i className="fas fa-ambulance text-red-500 text-xl"></i>
//             </div>
//           </div>
//         </div>

//         {/* Available Beds - Clickable */}
//         <div className="bg-white p-6 rounded-xl card-shadow border border-l-4 border-l-blue-500 cursor-pointer hover:shadow-md transition-shadow"
//              onClick={() => handlePageChange('inpatient')}>
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-sm text-gray-500">Available Beds</div>
//               <div className="text-3xl font-bold text-blue-600 mt-1">
//                 {dashboardData.metrics.availableBeds}
//               </div>
//               <div className="text-xs text-gray-500 mt-1">Total capacity: 100 beds</div>
//             </div>
//             <div className="bg-blue-100 p-3 rounded-lg">
//               <i className="fas fa-procedures text-blue-500 text-xl"></i>
//             </div>
//           </div>
//         </div>

//         {/* Avg. Wait Time */}
//         <div className="bg-white p-6 rounded-xl card-shadow border border-l-4 border-l-yellow-500">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-sm text-gray-500">Avg. Wait Time</div>
//               <div className="text-3xl font-bold text-yellow-600 mt-1">
//                 {dashboardData.metrics.avgWaitTime} min
//               </div>
//               <div className="text-xs text-green-500 mt-1">-5 min from last week</div>
//             </div>
//             <div className="bg-yellow-100 p-3 rounded-lg">
//               <i className="fas fa-clock text-yellow-500 text-xl"></i>
//             </div>
//           </div>
//         </div>

//         {/* Pending Bills - Clickable */}
//         <div className="bg-white p-6 rounded-xl card-shadow border border-l-4 border-l-purple-500 cursor-pointer hover:shadow-md transition-shadow"
//              onClick={() => handlePageChange('billing')}>
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-sm text-gray-500">Pending Bills</div>
//               <div className="text-3xl font-bold text-purple-600 mt-1">
//                 ₹{(dashboardData.metrics.pendingBills/1000).toFixed(1)}K
//               </div>
//               <div className="text-xs text-red-500 mt-1">Requires follow-up</div>
//             </div>
//             <div className="bg-purple-100 p-3 rounded-lg">
//               <i className="fas fa-file-invoice-dollar text-purple-500 text-xl"></i>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Second Row - Original Metrics */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* Total Patients Today - Clickable */}
//         <div className="bg-white p-6 rounded-xl card-shadow border cursor-pointer hover:shadow-md transition-shadow"
//              onClick={() => handlePageChange('inpatient')}>
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-sm text-gray-500">Total Patients (Today)</div>
//               <div className="text-3xl font-bold text-blue-600 mt-1">{dashboardData.metrics.totalPatientsToday}</div>
//               <div className="text-xs text-green-500 mt-1">+5 from yesterday</div>
//             </div>
//             <div className="bg-blue-100 p-3 rounded-lg">
//               <i className="fas fa-user-injured text-blue-500 text-xl"></i> 
//             </div>
//           </div>
//         </div>
        
//         {/* Active Doctors - Clickable */}
//         <div className="bg-white p-6 rounded-xl card-shadow border cursor-pointer hover:shadow-md transition-shadow"
//              onClick={() => handlePageChange('doctors')}>
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-sm text-gray-500">Active Doctors</div>
//               <div className="text-3xl font-bold text-green-600 mt-1">{dashboardData.metrics.activeDoctors}</div>
//               <div className="text-xs text-green-500 mt-1">All doctors present</div>
//             </div>
//             <div className="bg-green-100 p-3 rounded-lg">
//               <i className="fas fa-user-md text-green-500 text-xl"></i>
//             </div>
//           </div>
//         </div>
        
//         {/* Appointments Scheduled - Clickable */}
//         <div className="bg-white p-6 rounded-xl card-shadow border cursor-pointer hover:shadow-md transition-shadow"
//              onClick={() => handlePageChange('appointments')}>
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-sm text-gray-500">Appointments Scheduled</div>
//               <div className="text-3xl font-bold text-indigo-600 mt-1">{dashboardData.metrics.appointmentsScheduled}</div>
//               <div className="text-xs text-green-500 mt-1">+12% from last week</div>
//             </div>
//             <div className="bg-indigo-100 p-3 rounded-lg">
//               <i className="fas fa-calendar-check text-indigo-500 text-xl"></i>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Three Column Layout for Detailed Views */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
//         {/* Financial Quick View */}
//         <div className="bg-white rounded-xl card-shadow border p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-semibold text-lg flex items-center">
//               <i className="fas fa-rupee-sign text-green-500 mr-2"></i>
//               Financial Snapshot
//             </h3>
//             <button 
//               onClick={() => handlePageChange('billing')}
//               className="text-blue-600 text-sm hover:underline hover:text-blue-800"
//             >
//               Details →
//             </button>
//           </div>
//           <div className="space-y-4">
//             <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
//                  onClick={() => handlePageChange('billing')}>
//               <div>
//                 <div className="text-sm text-gray-600">Revenue Today</div>
//                 <div className="font-bold text-green-700">
//                   ₹{(dashboardData.financialSummary?.revenueToday/1000).toFixed(1)}K
//                 </div>
//               </div>
//               <i className="fas fa-arrow-up text-green-500"></i>
//             </div>
//             <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors"
//                  onClick={() => handlePageChange('billing')}>
//               <div>
//                 <div className="text-sm text-gray-600">Expenses Today</div>
//                 <div className="font-bold text-red-700">
//                   ₹{(dashboardData.financialSummary?.expensesToday/1000).toFixed(1)}K
//                 </div>
//               </div>
//               <i className="fas fa-arrow-down text-red-500"></i>
//             </div>
//             <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors"
//                  onClick={() => handlePageChange('billing')}>
//               <div>
//                 <div className="text-sm text-gray-600">Pending Insurance Claims</div>
//                 <div className="font-bold text-yellow-700">
//                   ₹{(dashboardData.financialSummary?.pendingClaims/1000).toFixed(1)}K
//                 </div>
//               </div>
//               <i className="fas fa-clock text-yellow-500"></i>
//             </div>
//           </div>
//         </div>

//         {/* Staff Status */}
//         <div className="bg-white rounded-xl card-shadow border p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-semibold text-lg flex items-center">
//               <i className="fas fa-users text-blue-500 mr-2"></i>
//               Staff Status
//             </h3>
//             <button 
//               onClick={() => handlePageChange('staff')}
//               className="text-blue-600 text-sm hover:underline hover:text-blue-800"
//             >
//               Manage →
//             </button>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="text-center p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
//                  onClick={() => handlePageChange('staff')}>
//               <div className="text-2xl font-bold text-blue-700">{dashboardData.staffStatus?.onDuty}</div>
//               <div className="text-sm text-gray-600">On Duty</div>
//             </div>
//             <div className="text-center p-4 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors"
//                  onClick={() => handlePageChange('staff')}>
//               <div className="text-2xl font-bold text-yellow-700">{dashboardData.staffStatus?.onLeave}</div>
//               <div className="text-sm text-gray-600">On Leave</div>
//             </div>
//             <div className="text-center p-4 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
//                  onClick={() => handlePageChange('staff')}>
//               <div className="text-2xl font-bold text-green-700">{dashboardData.staffStatus?.availableShifts}</div>
//               <div className="text-sm text-gray-600">Shifts Available</div>
//             </div>
//             <div className="text-center p-4 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors"
//                  onClick={() => handlePageChange('staff')}>
//               <div className="text-2xl font-bold text-red-700">{dashboardData.staffStatus?.pendingRequests}</div>
//               <div className="text-sm text-gray-600">Pending Requests</div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions Panel */}
//         <div className="bg-white rounded-xl card-shadow border p-6">
//           <h3 className="font-semibold text-lg mb-4 flex items-center">
//             <i className="fas fa-bolt text-purple-500 mr-2"></i>
//             Quick Actions
//           </h3>
//           <div className="space-y-3">
//             <button
//               onClick={() => handlePageChange('inpatient')}
//               className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors text-left"
//             >
//               <div className="flex items-center">
//                 <div className="bg-blue-100 p-2 rounded-lg mr-3">
//                   <i className="fas fa-bed text-blue-500"></i>
//                 </div>
//                 <span>Bed Allocation</span>
//               </div>
//               <i className="fas fa-chevron-right text-gray-400"></i>
//             </button>
//             <button
//               onClick={() => handlePageChange('staff')}
//               className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors text-left"
//             >
//               <div className="flex items-center">
//                 <div className="bg-green-100 p-2 rounded-lg mr-3">
//                   <i className="fas fa-calendar-alt text-green-500"></i>
//                 </div>
//                 <span>Schedule Roster</span>
//               </div>
//               <i className="fas fa-chevron-right text-gray-400"></i>
//             </button>
//             <button
//               onClick={() => handlePageChange('pharmacy')}
//               className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors text-left"
//             >
//               <div className="flex items-center">
//                 <div className="bg-yellow-100 p-2 rounded-lg mr-3">
//                   <i className="fas fa-boxes text-yellow-500"></i>
//                 </div>
//                 <span>Medical Inventory</span>
//               </div>
//               <i className="fas fa-chevron-right text-gray-400"></i>
//             </button>
//             <button
//               onClick={() => handlePageChange('settings')}
//               className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors text-left"
//             >
//               <div className="flex items-center">
//                 <div className="bg-purple-100 p-2 rounded-lg mr-3">
//                   <i className="fas fa-check-circle text-purple-500"></i>
//                 </div>
//                 <span>Pending Approvals</span>
//               </div>
//               <i className="fas fa-chevron-right text-gray-400"></i>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Appointments Section */}
//       <div className="bg-white rounded-xl card-shadow border p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h3 className="font-semibold text-lg flex items-center">
//               <i className="fas fa-calendar-check text-blue-500 mr-2"></i>
//               Today's Appointments
//             </h3>
//             <p className="text-gray-500 text-sm">Upcoming appointments for today</p>
//           </div>
//           <button 
//             onClick={() => handlePageChange('appointments')}
//             className="text-blue-600 text-sm hover:underline hover:text-blue-800"
//           >
//             View All →
//           </button>
//         </div>
//         <div className="space-y-3">
//           {dashboardData.appointments.map(apt => (
//             <div key={apt.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
//                  onClick={() => handlePageChange('appointments')}>
//               <div className="flex items-center">
//                 <div className={`p-3 rounded-lg mr-4 ${
//                   apt.status === 'Confirmed' ? 'bg-green-100' : 'bg-yellow-100'
//                 }`}>
//                   <i className={`fas ${
//                     apt.status === 'Confirmed' ? 'fa-check-circle text-green-500' : 'fa-clock text-yellow-500'
//                   }`}></i>
//                 </div>
//                 <div>
//                   <div className="font-medium">{apt.patient}</div>
//                   <div className="text-sm text-gray-500">Dr. {apt.doctor.split('Dr. ')[1]}</div>
//                   <div className="text-xs text-gray-400 mt-1">{apt.reason}</div>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <div className="font-medium text-gray-700">{apt.dateTime}</div>
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   apt.status === 'Confirmed' 
//                     ? 'bg-green-100 text-green-800' 
//                     : 'bg-yellow-100 text-yellow-800'
//                 }`}>
//                   {apt.status}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Departments with Occupancy */}
//       <div className="bg-white rounded-xl card-shadow border p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h3 className="font-semibold text-lg flex items-center">
//               <i className="fas fa-building text-blue-500 mr-2"></i>
//               Department Status
//             </h3>
//             <p className="text-gray-500 text-sm">Real-time bed occupancy by department</p>
//           </div>
//           <button 
//             onClick={() => handlePageChange('departments')}
//             className="text-blue-600 text-sm hover:underline hover:text-blue-800"
//           >
//             View All →
//           </button>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {dashboardData.departments.map(dept => (
//             <div key={dept.id} 
//                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
//                  onClick={() => handlePageChange('departments')}>
//               <div className="flex items-center justify-between mb-3">
//                 <div className="bg-blue-100 p-2 rounded-lg">
//                   <i className={`${dept.icon} text-blue-500`}></i>
//                 </div>
//                 <div className={`px-2 py-1 rounded text-xs font-medium ${
//                   dept.occupancy > 90 ? 'bg-red-100 text-red-700' :
//                   dept.occupancy > 75 ? 'bg-yellow-100 text-yellow-700' :
//                   'bg-green-100 text-green-700'
//                 }`}>
//                   {dept.occupancy}% occupied
//                 </div>
//               </div>
//               <div className="font-medium">{dept.name}</div>
//               <div className="text-xs text-gray-500 mt-1">Head: {dept.head}</div>
//               <div className="mt-3">
//                 <div className="flex justify-between text-xs text-gray-500 mb-1">
//                   <span>Occupancy</span>
//                   <span>{dept.occupancy}%</span>
//                 </div>
//                 <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                   <div 
//                     className={`h-full ${
//                       dept.occupancy > 90 ? 'bg-red-500' :
//                       dept.occupancy > 75 ? 'bg-yellow-500' :
//                       'bg-green-500'
//                     }`}
//                     style={{ width: `${dept.occupancy}%` }}
//                   ></div>
//                 </div>
//               </div>
//               <div className="flex justify-between mt-3 text-xs text-gray-600">
//                 <span>
//                   <i className="fas fa-user-md mr-1"></i>
//                   {dept.doctors} doctors
//                 </span>
//                 <span>
//                   <i className="fas fa-users mr-1"></i>
//                   {dept.staff} staff
//                 </span>
//               </div>
//             </div>
//           ))}
//           {/* Additional department cards */}
//           <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
//                onClick={() => handlePageChange('departments')}>
//             <div className="flex items-center justify-between mb-3">
//               <div className="bg-green-100 p-2 rounded-lg">
//                 <i className="fas fa-brain text-green-500"></i>
//               </div>
//               <div className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
//                 72% occupied
//               </div>
//             </div>
//             <div className="font-medium">Neurology</div>
//             <div className="text-xs text-gray-500 mt-1">Head: Dr. Priya Singh</div>
//             <div className="mt-3">
//               <div className="flex justify-between text-xs text-gray-500 mb-1">
//                 <span>Occupancy</span>
//                 <span>72%</span>
//               </div>
//               <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                 <div className="h-full bg-green-500" style={{ width: '72%' }}></div>
//               </div>
//             </div>
//           </div>
//           <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
//                onClick={() => handlePageChange('departments')}>
//             <div className="flex items-center justify-between mb-3">
//               <div className="bg-purple-100 p-2 rounded-lg">
//                 <i className="fas fa-baby text-purple-500"></i>
//               </div>
//               <div className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
//                 84% occupied
//               </div>
//             </div>
//             <div className="font-medium">Pediatrics</div>
//             <div className="text-xs text-gray-500 mt-1">Head: Dr. Anil Kumar</div>
//             <div className="mt-3">
//               <div className="flex justify-between text-xs text-gray-500 mb-1">
//                 <span>Occupancy</span>
//                 <span>84%</span>
//               </div>
//               <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                 <div className="h-full bg-yellow-500" style={{ width: '84%' }}></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminOverview


























import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const AdminOverview = ({ setActivePage }) => {
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
          bedOccupancy: 78,
          availableBeds: 22,
          pendingBills: 85000,
          avgWaitTime: 24,
          emergencyCases: 8
        },
        criticalAlerts: [
          { id: 1, type: 'bed', severity: 'high', message: 'ICU beds at 95% capacity', time: '2 hours ago' },
          { id: 2, type: 'staff', severity: 'medium', message: '3 nurses on leave tomorrow', time: '4 hours ago' },
          { id: 3, type: 'equipment', severity: 'low', message: 'MRI maintenance due in 3 days', time: '1 day ago' }
        ],
        appointments: [
          { id: 'APT-3001', patient: 'Patient 1', doctor: 'Dr. Meena Rao', dateTime: '2023-10-15 10:30 AM', status: 'Confirmed', reason: 'Routine Checkup' },
          { id: 'APT-3002', patient: 'Patient 2', doctor: 'Dr. Sharma', dateTime: '2023-10-15 11:00 AM', status: 'Pending', reason: 'Fever' }
        ],
        departments: [
          { id: 'DEPT-001', icon: "fas fa-heartbeat", name: 'Cardiology', head: 'Dr. Meena Rao', doctors: 5, staff: 12, occupancy: 92 },
          { id: 'DEPT-002', icon: "fas fa-bone", name: 'Orthopedics', head: 'Dr. Vivek Sharma', doctors: 4, staff: 8, occupancy: 65 },
          
        ],
        financialSummary: {
          revenueToday: 125000,
          expensesToday: 85000,
          pendingClaims: 120000,
          collectedToday: 75000
        },
        staffStatus: {
          onDuty: 145,
          onLeave: 12,
          availableShifts: 8,
          pendingRequests: 5
        }
      })
      setLoading(false)
    }, 1000)
  }

  const handlePageChange = (page) => {
    setActivePage(page)
  }

  const handleAlertClick = (alertType) => {
    switch (alertType) {
      case 'bed':
        setActivePage('inpatient')
        break
      case 'staff':
        setActivePage('staff')
        break
      case 'equipment':
        setActivePage('settings')
        break
      default:
        setActivePage('dashboard')
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">
            📊 Dashboard Overview
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Good morning, Administrator • {new Date().toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange('inpatient')}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
          >
            <i className="fas fa-ambulance mr-2"></i>Emergency Protocol
          </button>
          <button
            onClick={() => handlePageChange('reports')}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
          >
            <i className="fas fa-chart-bar mr-2"></i>Generate Reports
          </button>
        </div>
      </div>

      {/* Critical Alerts Banner */}
      {dashboardData.criticalAlerts && dashboardData.criticalAlerts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 cursor-pointer hover:bg-red-100 transition-colors"
             onClick={() => handleAlertClick(dashboardData.criticalAlerts[0].type)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i className="fas fa-exclamation-triangle text-red-500 text-xl mr-3"></i>
              <div>
                <h3 className="font-semibold text-red-700">Critical Alerts</h3>
                <p className="text-red-600 text-sm">
                  {dashboardData.criticalAlerts[0].message} • {dashboardData.criticalAlerts[0].time}
                </p>
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation()
                handlePageChange('reports')
              }}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              View all ({dashboardData.criticalAlerts.length})
            </button>
          </div>
        </div>
      )}

      {/* Metrics Grid with New Card Styling */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Emergency Cases */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => handlePageChange('inpatient')}>
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent pointer-events-none" />
          
          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            +2
          </span>
          
          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 mb-3">
                <i className="fas fa-ambulance text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Emergency Cases</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.metrics.emergencyCases}</p>
              <p className="text-xs text-gray-400 mt-1">from yesterday</p>
            </div>
            
            {/* mini line chart */}
            <svg width="70" height="40" viewBox="0 0 70 40">
              <polyline
                points="0,30 12,25 24,28 36,22 48,24 60,20"
                fill="none"
                stroke="#f87171"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* Available Beds */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => handlePageChange('inpatient')}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent pointer-events-none" />
          
          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 mb-3">
                <i className="fas fa-procedures text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Available Beds</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.metrics.availableBeds}</p>
              <p className="text-xs text-gray-400 mt-1">of 100 beds</p>
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

        {/* Avg Wait Time */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent pointer-events-none" />
          
          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            -5 min
          </span>
          
          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 mb-3">
                <i className="fas fa-clock text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Avg Wait Time</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.metrics.avgWaitTime} min</p>
              <p className="text-xs text-gray-400 mt-1">from last week</p>
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
             onClick={() => handlePageChange('billing')}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent pointer-events-none" />
          
          <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            Action
          </span>
          
          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-500 mb-3">
                <i className="fas fa-file-invoice-dollar text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Pending Bills</p>
              <p className="text-2xl font-bold text-gray-900">₹{(dashboardData.metrics.pendingBills/1000).toFixed(1)}K</p>
              <p className="text-xs text-gray-400 mt-1">requires follow-up</p>
            </div>
            
            {/* mini bars */}
            <div className="flex items-end gap-1 h-14">
              <div className="w-1.5 h-10 bg-purple-400 rounded"></div>
              <div className="w-1.5 h-8 bg-purple-300 rounded"></div>
              <div className="w-1.5 h-12 bg-purple-500 rounded"></div>
              <div className="w-1.5 h-6 bg-purple-400 rounded"></div>
              <div className="w-1.5 h-11 bg-purple-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row Metrics with New Styling */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Patients Today */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => handlePageChange('inpatient')}>
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-transparent pointer-events-none" />
          
          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            +5
          </span>
          
          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-500 mb-3">
                <i className="fas fa-user-injured text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Patients (Today)</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.metrics.totalPatientsToday}</p>
              <p className="text-xs text-gray-400 mt-1">from yesterday</p>
            </div>
            
            {/* mini bars */}
            <div className="flex items-end gap-1 h-14">
              <div className="w-1.5 h-9 bg-sky-400 rounded"></div>
              <div className="w-1.5 h-6 bg-sky-300 rounded"></div>
              <div className="w-1.5 h-11 bg-sky-500 rounded"></div>
              <div className="w-1.5 h-7 bg-sky-400 rounded"></div>
              <div className="w-1.5 h-10 bg-sky-300 rounded"></div>
            </div>
          </div>
        </div>
        
        {/* Active Doctors */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => handlePageChange('doctors')}>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent pointer-events-none" />
          
          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            All present
          </span>
          
          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-500 mb-3">
                <i className="fas fa-user-md text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Active Doctors</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.metrics.activeDoctors}</p>
              <p className="text-xs text-gray-400 mt-1">currently on duty</p>
            </div>
            
            {/* mini line chart */}
            <svg width="70" height="40" viewBox="0 0 70 40">
              <polyline
                points="0,25 12,22 24,26 36,20 48,23 60,20"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
        
        {/* Appointments Scheduled */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => handlePageChange('appointments')}>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent pointer-events-none" />
          
          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            +12%
          </span>
          
          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-500 mb-3">
                <i className="fas fa-calendar-check text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.metrics.appointmentsScheduled}</p>
              <p className="text-xs text-gray-400 mt-1">from last week</p>
            </div>
            
            {/* mini bars */}
            <div className="flex items-end gap-1 h-14">
              <div className="w-1.5 h-7 bg-indigo-400 rounded"></div>
              <div className="w-1.5 h-10 bg-indigo-300 rounded"></div>
              <div className="w-1.5 h-8 bg-indigo-500 rounded"></div>
              <div className="w-1.5 h-12 bg-indigo-400 rounded"></div>
              <div className="w-1.5 h-9 bg-indigo-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Three Column Layout with New Card Styling */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Financial Snapshot */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent pointer-events-none" />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 mr-3">
                  <i className="fas fa-rupee-sign text-white"></i>
                </div>
                <h3 className="font-semibold text-lg">Financial Snapshot</h3>
              </div>
              <button 
                onClick={() => handlePageChange('billing')}
                className="text-blue-600 text-sm hover:underline hover:text-blue-800"
              >
                Details →
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Revenue */}
              <div className="relative bg-white rounded-lg p-4 border border-gray-200 cursor-pointer hover:border-green-300 hover:shadow-sm transition-all"
                   onClick={() => handlePageChange('billing')}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600">Revenue Today</div>
                    <div className="font-bold text-gray-800 text-lg">
                      ₹{(dashboardData.financialSummary?.revenueToday/1000).toFixed(1)}K
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                    <i className="fas fa-arrow-up text-green-600"></i>
                  </div>
                </div>
                {/* mini progress bar */}
                <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              {/* Expenses */}
              <div className="relative bg-white rounded-lg p-4 border border-gray-200 cursor-pointer hover:border-red-300 hover:shadow-sm transition-all"
                   onClick={() => handlePageChange('billing')}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600">Expenses Today</div>
                    <div className="font-bold text-gray-800 text-lg">
                      ₹{(dashboardData.financialSummary?.expensesToday/1000).toFixed(1)}K
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                    <i className="fas fa-arrow-down text-red-600"></i>
                  </div>
                </div>
                {/* mini progress bar */}
                <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: '68%' }}></div>
                </div>
              </div>
              
              {/* Pending Claims */}
              <div className="relative bg-white rounded-lg p-4 border border-gray-200 cursor-pointer hover:border-yellow-300 hover:shadow-sm transition-all"
                   onClick={() => handlePageChange('billing')}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600">Pending Claims</div>
                    <div className="font-bold text-gray-800 text-lg">
                      ₹{(dashboardData.financialSummary?.pendingClaims/1000).toFixed(1)}K
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center">
                    <i className="fas fa-clock text-yellow-600"></i>
                  </div>
                </div>
                {/* mini progress bar */}
                <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: '55%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Status */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent pointer-events-none" />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 mr-3">
                  <i className="fas fa-users text-white"></i>
                </div>
                <h3 className="font-semibold text-lg">Staff Status</h3>
              </div>
              <button 
                onClick={() => handlePageChange('staff')}
                className="text-blue-600 text-sm hover:underline hover:text-blue-800"
              >
                Manage →
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* On Duty */}
              <div className="relative bg-white rounded-lg p-4 border border-gray-200 cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all"
                   onClick={() => handlePageChange('staff')}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{dashboardData.staffStatus?.onDuty}</div>
                  <div className="text-sm text-gray-600 mt-1">On Duty</div>
                </div>
                {/* mini progress bar */}
                <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              {/* On Leave */}
              <div className="relative bg-white rounded-lg p-4 border border-gray-200 cursor-pointer hover:border-yellow-300 hover:shadow-sm transition-all"
                   onClick={() => handlePageChange('staff')}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{dashboardData.staffStatus?.onLeave}</div>
                  <div className="text-sm text-gray-600 mt-1">On Leave</div>
                </div>
                {/* mini progress bar */}
                <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: '8%' }}></div>
                </div>
              </div>
              
              {/* Available Shifts */}
              <div className="relative bg-white rounded-lg p-4 border border-gray-200 cursor-pointer hover:border-green-300 hover:shadow-sm transition-all"
                   onClick={() => handlePageChange('staff')}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{dashboardData.staffStatus?.availableShifts}</div>
                  <div className="text-sm text-gray-600 mt-1">Shifts Available</div>
                </div>
                {/* mini progress bar */}
                <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '42%' }}></div>
                </div>
              </div>
              
              {/* Pending Requests */}
              <div className="relative bg-white rounded-lg p-4 border border-gray-200 cursor-pointer hover:border-red-300 hover:shadow-sm transition-all"
                   onClick={() => handlePageChange('staff')}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{dashboardData.staffStatus?.pendingRequests}</div>
                  <div className="text-sm text-gray-600 mt-1">Pending Requests</div>
                </div>
                {/* mini progress bar */}
                <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: '12%' }}></div>
                </div>
              </div>
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
                onClick={() => handlePageChange('inpatient')}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all text-left"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-bed text-blue-600"></i>
                  </div>
                  <span>Bed Allocation</span>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </button>
              
              <button
                onClick={() => handlePageChange('staff')}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all text-left"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-calendar-alt text-green-600"></i>
                  </div>
                  <span>Schedule Roster</span>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </button>
              
              <button
                onClick={() => handlePageChange('pharmacy')}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all text-left"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-boxes text-yellow-600"></i>
                  </div>
                  <span>Medical Inventory</span>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </button>
              
              <button
                onClick={() => handlePageChange('settings')}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all text-left"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-check-circle text-purple-600"></i>
                  </div>
                  <span>Pending Approvals</span>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments Section */}
      <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-transparent pointer-events-none" />
        
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-500 mr-3">
                <i className="fas fa-calendar-check text-white"></i>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Today's Appointments</h3>
                <p className="text-gray-500 text-sm">Upcoming appointments for today</p>
              </div>
            </div>
            <button 
              onClick={() => handlePageChange('appointments')}
              className="text-blue-600 text-sm hover:underline hover:text-blue-800"
            >
              View All →
            </button>
          </div>
          
          <div className="space-y-3">
            {dashboardData.appointments.map(apt => (
              <div key={apt.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all cursor-pointer"
                   onClick={() => handlePageChange('appointments')}>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                    apt.status === 'Confirmed' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    <i className={`fas ${
                      apt.status === 'Confirmed' ? 'fa-check-circle text-green-600' : 'fa-clock text-yellow-600'
                    }`}></i>
                  </div>
                  <div>
                    <div className="font-medium">{apt.patient}</div>
                    <div className="text-sm text-gray-500">Dr. {apt.doctor.split('Dr. ')[1]}</div>
                    <div className="text-xs text-gray-400 mt-1">{apt.reason}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-700">{apt.dateTime}</div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                    apt.status === 'Confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Departments Section */}
      <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent pointer-events-none" />
        
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 mr-3">
                <i className="fas fa-building text-white"></i>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Department Status</h3>
                <p className="text-gray-500 text-sm">Real-time bed occupancy by department</p>
              </div>
            </div>
            <button 
              onClick={() => handlePageChange('departments')}
              className="text-blue-600 text-sm hover:underline hover:text-blue-800"
            >
              View All →
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dashboardData.departments.map(dept => (
              <div key={dept.id} 
                   className="relative bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                   onClick={() => handlePageChange('departments')}>
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <i className={`${dept.icon} text-blue-600`}></i>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    dept.occupancy > 90 ? 'bg-red-100 text-red-700' :
                    dept.occupancy > 75 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {dept.occupancy}% occupied
                  </div>
                </div>
                <div className="font-medium">{dept.name}</div>
                <div className="text-xs text-gray-500 mt-1">Head: {dept.head}</div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Occupancy</span>
                    <span>{dept.occupancy}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        dept.occupancy > 90 ? 'bg-red-500' :
                        dept.occupancy > 75 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${dept.occupancy}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between mt-3 text-xs text-gray-600">
                  <span>
                    <i className="fas fa-user-md mr-1"></i>
                    {dept.doctors} doctors
                  </span>
                  <span>
                    <i className="fas fa-users mr-1"></i>
                    {dept.staff} staff
                  </span>
                </div>
              </div>
            ))}
            
            {/* Additional departments */}
            <div className="relative bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                 onClick={() => handlePageChange('departments')}>
              <div className="flex items-center justify-between mb-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <i className="fas fa-brain text-green-600"></i>
                </div>
                <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                  72% occupied
                </div>
              </div>
              <div className="font-medium">Neurology</div>
              <div className="text-xs text-gray-500 mt-1">Head: Dr. Priya Singh</div>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Occupancy</span>
                  <span>72%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '72%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="relative bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                 onClick={() => handlePageChange('departments')}>
              <div className="flex items-center justify-between mb-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <i className="fas fa-baby text-purple-600"></i>
                </div>
                <div className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                  84% occupied
                </div>
              </div>
              <div className="font-medium">Pediatrics</div>
              <div className="text-xs text-gray-500 mt-1">Head: Dr. Anil Kumar</div>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Occupancy</span>
                  <span>84%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: '84%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOverview