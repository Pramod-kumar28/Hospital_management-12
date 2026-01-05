// import React, { useState, useEffect } from 'react'
// import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
// import DataTable from '../../../../components/ui/Tables/DataTable'

// const LabOverview = () => {
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
//           totalTests: 156,
//           pendingTests: 24,
//           completedTests: 120,
//           criticalResults: 3,
//           equipmentOperational: 15,
//           equipmentMaintenance: 2,
//           qcPassed: 45,
//           qcFailed: 1
//         },
//         pendingTests: [
//           { id: 'TEST-2024-015', patient: 'Rajesh Kumar', test: 'CBC', received: '10:30 AM', priority: 'urgent', status: 'Sample Processing' },
//           { id: 'TEST-2024-016', patient: 'Priya Sharma', test: 'Lipid Profile', received: '11:00 AM', priority: 'routine', status: 'Sample Collection' },
//           { id: 'TEST-2024-017', patient: 'Suresh Patel', test: 'Urine Culture', received: '11:30 AM', priority: 'routine', status: 'Culture In Progress' },
//           { id: 'TEST-2024-018', patient: 'Anita Mehta', test: 'Liver Function', received: '12:00 PM', priority: 'urgent', status: 'Testing' }
//         ],
//         criticalResults: [
//           { id: 'TEST-2024-012', patient: 'Ravi Kumar', test: 'Creatinine', value: '4.2 mg/dL', alert: 'Critical High', time: '09:45 AM', notified: 'Yes' },
//           { id: 'TEST-2024-013', patient: 'Sunita Rao', test: 'Potassium', value: '6.5 mEq/L', alert: 'Critical High', time: '10:15 AM', notified: 'Pending' },
//           { id: 'TEST-2024-014', patient: 'Mohan Singh', test: 'Glucose', value: '40 mg/dL', alert: 'Critical Low', time: '10:30 AM', notified: 'Yes' }
//         ],
//         equipmentStatus: [
//           { id: 'EQP-001', name: 'Hematology Analyzer', status: 'Operational', nextMaintenance: '2024-02-10', location: 'Hematology Lab' },
//           { id: 'EQP-002', name: 'Chemistry Analyzer', status: 'Maintenance', nextMaintenance: '2024-02-05', location: 'Chemistry Lab' },
//           { id: 'EQP-003', name: 'Centrifuge', status: 'Calibration Due', nextMaintenance: '2024-01-18', location: 'Sample Processing' }
//         ],
//         qcStatus: [
//           { test: 'CBC', status: 'Passed', value: '12.5', target: '12.0±0.5', time: '09:00 AM' },
//           { test: 'Glucose', status: 'Warning', value: '105', target: '100±5', time: '09:30 AM' },
//           { test: 'Creatinine', status: 'Failed', value: '2.5', target: '1.8±0.2', time: '10:00 AM' }
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

//   // Handle test row click
//   const handleTestClick = (test) => {
//     console.log('Test clicked:', test)
//     alert(`Viewing test: ${test.id} - ${test.test}`)
//   }

//   // Handle critical result click
//   const handleCriticalResultClick = (result) => {
//     console.log('Critical result clicked:', result)
//     alert(`Critical Result: ${result.test} for ${result.patient}\nValue: ${result.value}`)
//   }

//   // Handle equipment click
//   const handleEquipmentClick = (equipment) => {
//     console.log('Equipment clicked:', equipment)
//     alert(`Equipment: ${equipment.name}\nStatus: ${equipment.status}`)
//   }

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="space-y-6 animate-fade-in">
//       <h2 className="text-2xl font-semibold text-gray-700">🏥 Laboratory Dashboard</h2>
      
//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white p-4 rounded border card-shadow hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleQuickAction('test-registration')}>
//           <div className="flex items-center">
//             <div className="p-3 bg-blue-100 rounded-lg mr-4">
//               <i className="fas fa-vial text-blue-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Total Tests Today</p>
//               <p className="text-2xl font-bold text-blue-600 mt-1">{dashboardData.stats.totalTests}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded border card-shadow hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleQuickAction('test-registration')}>
//           <div className="flex items-center">
//             <div className="p-3 bg-yellow-100 rounded-lg mr-4">
//               <i className="fas fa-clock text-yellow-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Pending Tests</p>
//               <p className="text-2xl font-bold text-yellow-600 mt-1">{dashboardData.stats.pendingTests}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded border card-shadow hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleQuickAction('quality-control')}>
//           <div className="flex items-center">
//             <div className="p-3 bg-green-100 rounded-lg mr-4">
//               <i className="fas fa-check-circle text-green-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">QC Passed Today</p>
//               <p className="text-2xl font-bold text-green-600 mt-1">{dashboardData.stats.qcPassed}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded border card-shadow hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleQuickAction('equipment-tracking')}>
//           <div className="flex items-center">
//             <div className="p-3 bg-red-100 rounded-lg mr-4">
//               <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Critical Results</p>
//               <p className="text-2xl font-bold text-red-600 mt-1">{dashboardData.stats.criticalResults}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Pending Tests & Critical Results */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white p-4 rounded border card-shadow">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg font-semibold">Pending Tests</h3>
//             <button 
//               onClick={() => handleQuickAction('test-registration')}
//               className="text-sm text-blue-600 hover:text-blue-800"
//             >
//               View All →
//             </button>
//           </div>
//           <DataTable
//             columns={[
//               { key: 'id', title: 'Test ID', sortable: true },
//               { key: 'patient', title: 'Patient', sortable: true },
//               { key: 'test', title: 'Test', sortable: true },
//               { key: 'received', title: 'Received', sortable: true },
//               { 
//                 key: 'priority', 
//                 title: 'Priority', 
//                 sortable: true,
//                 render: (value) => (
//                   <span className={`px-2 py-1 rounded-full text-xs ${
//                     value === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
//                   }`}>
//                     {value}
//                   </span>
//                 )
//               },
//               { key: 'status', title: 'Status', sortable: true }
//             ]}
//             data={dashboardData.pendingTests}
//             onRowClick={handleTestClick}
//           />
//         </div>
        
//         <div className="bg-white p-4 rounded border card-shadow">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg font-semibold">Critical Results</h3>
//             <button 
//               onClick={() => alert('View all critical results')}
//               className="text-sm text-red-600 hover:text-red-800"
//             >
//               View All →
//             </button>
//           </div>
//           <DataTable
//             columns={[
//               { key: 'id', title: 'Test ID', sortable: true },
//               { key: 'patient', title: 'Patient', sortable: true },
//               { key: 'test', title: 'Test', sortable: true },
//               { key: 'value', title: 'Value', sortable: true },
//               { 
//                 key: 'alert', 
//                 title: 'Alert', 
//                 sortable: true,
//                 render: (value) => (
//                   <span className={`px-2 py-1 rounded-full text-xs ${
//                     value.includes('Critical') ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
//                   }`}>
//                     {value}
//                   </span>
//                 )
//               },
//               { key: 'notified', title: 'Notified', sortable: true }
//             ]}
//             data={dashboardData.criticalResults}
//             onRowClick={handleCriticalResultClick}
//           />
//         </div>
//       </div>

//       {/* Equipment & QC Status */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white p-4 rounded border card-shadow">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg font-semibold">Equipment Status</h3>
//             <button 
//               onClick={() => handleQuickAction('equipment-tracking')}
//               className="text-sm text-blue-600 hover:text-blue-800"
//             >
//               Manage →
//             </button>
//           </div>
//           <DataTable
//             columns={[
//               { key: 'id', title: 'Equipment ID', sortable: true },
//               { key: 'name', title: 'Equipment', sortable: true },
//               { 
//                 key: 'status', 
//                 title: 'Status', 
//                 sortable: true,
//                 render: (value) => (
//                   <span className={`px-2 py-1 rounded-full text-xs ${
//                     value === 'Operational' ? 'bg-green-100 text-green-800' :
//                     value === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
//                     'bg-red-100 text-red-800'
//                   }`}>
//                     {value}
//                   </span>
//                 )
//               },
//               { key: 'nextMaintenance', title: 'Next Maintenance', sortable: true },
//               { key: 'location', title: 'Location', sortable: true }
//             ]}
//             data={dashboardData.equipmentStatus}
//             onRowClick={handleEquipmentClick}
//           />
//         </div>
        
//         <div className="bg-white p-4 rounded border card-shadow">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg font-semibold">QC Status Today</h3>
//             <button 
//               onClick={() => handleQuickAction('quality-control')}
//               className="text-sm text-green-600 hover:text-green-800"
//             >
//               View All →
//             </button>
//           </div>
//           <DataTable
//             columns={[
//               { key: 'test', title: 'Test', sortable: true },
//               { 
//                 key: 'status', 
//                 title: 'Status', 
//                 sortable: true,
//                 render: (value) => (
//                   <span className={`px-2 py-1 rounded-full text-xs ${
//                     value === 'Passed' ? 'bg-green-100 text-green-800' :
//                     value === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
//                     'bg-red-100 text-red-800'
//                   }`}>
//                     {value}
//                   </span>
//                 )
//               },
//               { key: 'value', title: 'Value', sortable: true },
//               { key: 'target', title: 'Target', sortable: true },
//               { key: 'time', title: 'Time', sortable: true }
//             ]}
//             data={dashboardData.qcStatus}
//             emptyMessage="No QC data available"
//           />
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white p-4 rounded border card-shadow">
//         <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <button 
//             className="p-4 border rounded-lg hover:bg-blue-50 transition-colors text-center group"
//             onClick={() => handleQuickAction('test-registration')}
//           >
//             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200">
//               <i className="fas fa-vial text-blue-600 text-xl"></i>
//             </div>
//             <p className="font-medium text-gray-800">Register Test</p>
//             <p className="text-xs text-gray-500 mt-1">New test registration</p>
//           </button>
          
//           <button 
//             className="p-4 border rounded-lg hover:bg-green-50 transition-colors text-center group"
//             onClick={() => handleQuickAction('sample-tracking')}
//           >
//             <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200">
//               <i className="fas fa-qrcode text-green-600 text-xl"></i>
//             </div>
//             <p className="font-medium text-gray-800">Track Sample</p>
//             <p className="text-xs text-gray-500 mt-1">Scan & track samples</p>
//           </button>
          
//           <button 
//             className="p-4 border rounded-lg hover:bg-yellow-50 transition-colors text-center group"
//             onClick={() => handleQuickAction('report-generation')}
//           >
//             <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-yellow-200">
//               <i className="fas fa-file-medical text-yellow-600 text-xl"></i>
//             </div>
//             <p className="font-medium text-gray-800">Generate Report</p>
//             <p className="text-xs text-gray-500 mt-1">Create lab reports</p>
//           </button>
          
//           <button 
//             className="p-4 border rounded-lg hover:bg-purple-50 transition-colors text-center group"
//             onClick={() => handleQuickAction('quality-control')}
//           >
//             <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200">
//               <i className="fas fa-chart-line text-purple-600 text-xl"></i>
//             </div>
//             <p className="font-medium text-gray-800">QC Entry</p>
//             <p className="text-xs text-gray-500 mt-1">Record QC results</p>
//           </button>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
//           <button 
//             className="p-3 border rounded-lg hover:bg-blue-50 transition-colors text-center group"
//             onClick={() => handleQuickAction('test-catalogue')}
//           >
//             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-200">
//               <i className="fas fa-book-medical text-blue-600"></i>
//             </div>
//             <p className="font-medium text-sm text-gray-800">Test Catalogue</p>
//           </button>
          
//           <button 
//             className="p-3 border rounded-lg hover:bg-green-50 transition-colors text-center group"
//             onClick={() => handleQuickAction('equipment-tracking')}
//           >
//             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-green-200">
//               <i className="fas fa-microscope text-green-600"></i>
//             </div>
//             <p className="font-medium text-sm text-gray-800">Equipment</p>
//           </button>
          
//           <button 
//             className="p-3 border rounded-lg hover:bg-purple-50 transition-colors text-center group"
//             onClick={() => handleQuickAction('result-access')}
//           >
//             <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-purple-200">
//               <i className="fas fa-shield-alt text-purple-600"></i>
//             </div>
//             <p className="font-medium text-sm text-gray-800">Result Access</p>
//           </button>
//         </div>
//       </div>

//       {/* Lab Alerts */}
//       <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//         <div className="flex items-center">
//           <div className="p-2 bg-yellow-100 rounded-lg mr-3">
//             <i className="fas fa-exclamation-triangle text-yellow-600"></i>
//           </div>
//           <div>
//             <h4 className="font-semibold text-yellow-800">Lab Alerts</h4>
//             <p className="text-sm text-yellow-700">
//               • Chemistry Analyzer requires calibration (Due: Jan 18) • 
//               • QC failed for Creatinine test • 
//               • 3 critical results pending physician notification
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LabOverview



















// import React, { useState, useEffect, useMemo } from 'react'
// import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
// import DataTable from '../../../../components/ui/Tables/DataTable'
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip as ReTooltip,
//   Legend,
//   LineChart,
//   Line,
//   CartesianGrid,
// } from 'recharts'

// const LabOverview = () => {
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
//           totalTests: 156,
//           pendingTests: 24,
//           completedTests: 120,
//           criticalResults: 3,
//           equipmentOperational: 15,
//           equipmentMaintenance: 2,
//           qcPassed: 45,
//           qcFailed: 1
//         },
//         pendingTests: [
//           { id: 'TEST-2024-015', patient: 'Rajesh Kumar', test: 'CBC', received: '10:30 AM', priority: 'urgent', status: 'Sample Processing' },
//           { id: 'TEST-2024-016', patient: 'Priya Sharma', test: 'Lipid Profile', received: '11:00 AM', priority: 'routine', status: 'Sample Collection' },
//           { id: 'TEST-2024-017', patient: 'Suresh Patel', test: 'Urine Culture', received: '11:30 AM', priority: 'routine', status: 'Culture In Progress' },
//           { id: 'TEST-2024-018', patient: 'Anita Mehta', test: 'Liver Function', received: '12:00 PM', priority: 'urgent', status: 'Testing' }
//         ],
//         criticalResults: [
//           { id: 'TEST-2024-012', patient: 'Ravi Kumar', test: 'Creatinine', value: '4.2 mg/dL', alert: 'Critical High', time: '09:45 AM', notified: 'Yes' },
//           { id: 'TEST-2024-013', patient: 'Sunita Rao', test: 'Potassium', value: '6.5 mEq/L', alert: 'Critical High', time: '10:15 AM', notified: 'Pending' },
//           { id: 'TEST-2024-014', patient: 'Mohan Singh', test: 'Glucose', value: '40 mg/dL', alert: 'Critical Low', time: '10:30 AM', notified: 'Yes' }
//         ],
//         equipmentStatus: [
//           { id: 'EQP-001', name: 'Hematology Analyzer', status: 'Operational', nextMaintenance: '2024-02-10', location: 'Hematology Lab' },
//           { id: 'EQP-002', name: 'Chemistry Analyzer', status: 'Maintenance', nextMaintenance: '2024-02-05', location: 'Chemistry Lab' },
//           { id: 'EQP-003', name: 'Centrifuge', status: 'Calibration Due', nextMaintenance: '2024-01-18', location: 'Sample Processing' }
//         ],
//         qcStatus: [
//           { test: 'CBC', status: 'Passed', value: 12.5, target: '12.0±0.5', time: '09:00 AM' },
//           { test: 'Glucose', status: 'Warning', value: 105, target: '100±5', time: '09:30 AM' },
//           { test: 'Creatinine', status: 'Failed', value: 2.5, target: '1.8±0.2', time: '10:00 AM' }
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

//   // Handle test row click
//   const handleTestClick = (test) => {
//     console.log('Test clicked:', test)
//     alert(`Viewing test: ${test.id} - ${test.test}`)
//   }

//   // Handle critical result click
//   const handleCriticalResultClick = (result) => {
//     console.log('Critical result clicked:', result)
//     alert(`Critical Result: ${result.test} for ${result.patient}\nValue: ${result.value}`)
//   }

//   // Handle equipment click
//   const handleEquipmentClick = (equipment) => {
//     console.log('Equipment clicked:', equipment)
//     alert(`Equipment: ${equipment.name}\nStatus: ${equipment.status}`)
//   }

//   // --- CHART DATA PREPARATION (derived from your existing dashboardData) ---
//   // Tests by status (counts)
//   const testsByStatus = useMemo(() => {
//     const map = {}
//     const pending = dashboardData.pendingTests || []
//     const critical = dashboardData.criticalResults || []

//     // Use statuses from pendingTests and critical results
//     pending.forEach((t) => {
//       const k = t.status || 'Other'
//       map[k] = (map[k] || 0) + 1
//     })
//     critical.forEach((c) => {
//       const k = 'Critical'
//       map[k] = (map[k] || 0) + 1
//     })

//     // Convert to array for recharts; ensure some consistent order
//     return Object.keys(map).map((k) => ({ name: k, count: map[k] }))
//   }, [dashboardData.pendingTests, dashboardData.criticalResults])

//   // QC trend: simple series from qcStatus (sorted by time if provided)
//   const qcTrend = useMemo(() => {
//     const arr = (dashboardData.qcStatus || []).map((q, idx) => {
//       // If numeric value, use it; else try to parse number from string
//       const numeric = typeof q.value === 'number' ? q.value : parseFloat(String(q.value)) || 0
//       return { name: q.test || `QC ${idx+1}`, value: numeric }
//     })
//     return arr
//   }, [dashboardData.qcStatus])

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="space-y-6 animate-fade-in">
//       <h2 className="text-2xl font-semibold text-gray-700">🏥 Laboratory Dashboard</h2>
      
//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white p-4 rounded border card-shadow hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleQuickAction('test-registration')}>
//           <div className="flex items-center">
//             <div className="p-3 bg-blue-100 rounded-lg mr-4">
//               <i className="fas fa-vial text-blue-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Total Tests Today</p>
//               <p className="text-2xl font-bold text-blue-600 mt-1">{dashboardData.stats.totalTests}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded border card-shadow hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleQuickAction('test-registration')}>
//           <div className="flex items-center">
//             <div className="p-3 bg-yellow-100 rounded-lg mr-4">
//               <i className="fas fa-clock text-yellow-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Pending Tests</p>
//               <p className="text-2xl font-bold text-yellow-600 mt-1">{dashboardData.stats.pendingTests}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded border card-shadow hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleQuickAction('quality-control')}>
//           <div className="flex items-center">
//             <div className="p-3 bg-green-100 rounded-lg mr-4">
//               <i className="fas fa-check-circle text-green-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">QC Passed Today</p>
//               <p className="text-2xl font-bold text-green-600 mt-1">{dashboardData.stats.qcPassed}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded border card-shadow hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleQuickAction('equipment-tracking')}>
//           <div className="flex items-center">
//             <div className="p-3 bg-red-100 rounded-lg mr-4">
//               <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Critical Results</p>
//               <p className="text-2xl font-bold text-red-600 mt-1">{dashboardData.stats.criticalResults}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Charts row */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Tests by status bar chart */}
//         <div className="bg-white p-4 rounded border card-shadow">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg font-semibold">Tests by Status</h3>
//             <p className="text-sm text-gray-500">{(dashboardData.pendingTests || []).length + (dashboardData.criticalResults || []).length} items</p>
//           </div>
//           <div style={{ width: '100%', height: 200 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={testsByStatus}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis allowDecimals={false} />
//                 <ReTooltip />
//                 <Legend />
//                 <Bar dataKey="count" name="Count" barSize={20} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* QC trend line chart */}
//         <div className="bg-white p-4 rounded border card-shadow">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg font-semibold">QC Trend (Sample)</h3>
//             <p className="text-sm text-gray-500">Latest QC checks</p>
//           </div>
//           <div style={{ width: '100%', height: 200 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={qcTrend}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <ReTooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="value" name="QC Value" stroke="#8884d8" strokeWidth={2} dot={{ r: 3 }} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Small stats / equipment mini-card */}
//         <div className="bg-white p-4 rounded border card-shadow">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg font-semibold">Equipment Snapshot</h3>
//             <button onClick={() => handleQuickAction('equipment-tracking')} className="text-sm text-blue-600 hover:text-blue-800">Manage →</button>
//           </div>
//           <div className="space-y-3">
//             {(dashboardData.equipmentStatus || []).map(eq => (
//               <div key={eq.id} className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium">{eq.name}</p>
//                   <p className="text-xs text-gray-500">{eq.location} • Next: {eq.nextMaintenance}</p>
//                 </div>
//                 <div>
//                   <span className={`px-2 py-1 rounded-full text-xs ${
//                     eq.status === 'Operational' ? 'bg-green-100 text-green-800' :
//                     eq.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
//                     'bg-red-100 text-red-800'
//                   }`}>{eq.status}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Pending Tests & Critical Results */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white p-4 rounded border card-shadow">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg font-semibold">Pending Tests</h3>
//             <button 
//               onClick={() => handleQuickAction('test-registration')}
//               className="text-sm text-blue-600 hover:text-blue-800"
//             >
//               View All →
//             </button>
//           </div>
//           <DataTable
//             columns={[
//               { key: 'id', title: 'Test ID', sortable: true },
//               { key: 'patient', title: 'Patient', sortable: true },
//               { key: 'test', title: 'Test', sortable: true },
//               { key: 'received', title: 'Received', sortable: true },
//               { 
//                 key: 'priority', 
//                 title: 'Priority', 
//                 sortable: true,
//                 render: (value) => (
//                   <span className={`px-2 py-1 rounded-full text-xs ${
//                     value === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
//                   }`}>
//                     {value}
//                   </span>
//                 )
//               },
//               { key: 'status', title: 'Status', sortable: true }
//             ]}
//             data={dashboardData.pendingTests}
//             onRowClick={handleTestClick}
//           />
//         </div>
        
//         <div className="bg-white p-4 rounded border card-shadow">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg font-semibold">Critical Results</h3>
//             <button 
//               onClick={() => alert('View all critical results')}
//               className="text-sm text-red-600 hover:text-red-800"
//             >
//               View All →
//             </button>
//           </div>
//           <DataTable
//             columns={[
//               { key: 'id', title: 'Test ID', sortable: true },
//               { key: 'patient', title: 'Patient', sortable: true },
//               { key: 'test', title: 'Test', sortable: true },
//               { key: 'value', title: 'Value', sortable: true },
//               { 
//                 key: 'alert', 
//                 title: 'Alert', 
//                 sortable: true,
//                 render: (value) => (
//                   <span className={`px-2 py-1 rounded-full text-xs ${
//                     value.includes('Critical') ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
//                   }`}>{value}</span>
//                 )
//               },
//               { key: 'notified', title: 'Notified', sortable: true }
//             ]}
//             data={dashboardData.criticalResults}
//             onRowClick={handleCriticalResultClick}
//           />
//         </div>
//       </div>

//       {/* Equipment & QC Status */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white p-4 rounded border card-shadow">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg font-semibold">Equipment Status</h3>
//             <button 
//               onClick={() => handleQuickAction('equipment-tracking')}
//               className="text-sm text-blue-600 hover:text-blue-800"
//             >
//               Manage →
//             </button>
//           </div>
//           <DataTable
//             columns={[
//               { key: 'id', title: 'Equipment ID', sortable: true },
//               { key: 'name', title: 'Equipment', sortable: true },
//               { 
//                 key: 'status', 
//                 title: 'Status', 
//                 sortable: true,
//                 render: (value) => (
//                   <span className={`px-2 py-1 rounded-full text-xs ${
//                     value === 'Operational' ? 'bg-green-100 text-green-800' :
//                     value === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
//                     'bg-red-100 text-red-800'
//                   }`}>
//                     {value}
//                   </span>
//                 )
//               },
//               { key: 'nextMaintenance', title: 'Next Maintenance', sortable: true },
//               { key: 'location', title: 'Location', sortable: true }
//             ]}
//             data={dashboardData.equipmentStatus}
//             onRowClick={handleEquipmentClick}
//           />
//         </div>
        
//         <div className="bg-white p-4 rounded border card-shadow">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg font-semibold">QC Status Today</h3>
//             <button 
//               onClick={() => handleQuickAction('quality-control')}
//               className="text-sm text-green-600 hover:text-green-800"
//             >
//               View All →
//             </button>
//           </div>
//           <DataTable
//             columns={[
//               { key: 'test', title: 'Test', sortable: true },
//               { 
//                 key: 'status', 
//                 title: 'Status', 
//                 sortable: true,
//                 render: (value) => (
//                   <span className={`px-2 py-1 rounded-full text-xs ${
//                     value === 'Passed' ? 'bg-green-100 text-green-800' :
//                     value === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
//                     'bg-red-100 text-red-800'
//                   }`}>{value}</span>
//                 )
//               },
//               { key: 'value', title: 'Value', sortable: true },
//               { key: 'target', title: 'Target', sortable: true },
//               { key: 'time', title: 'Time', sortable: true }
//             ]}
//             data={dashboardData.qcStatus}
//             emptyMessage="No QC data available"
//           />
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white p-4 rounded border card-shadow">
//         <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <button 
//             className="p-4 border rounded-lg hover:bg-blue-50 transition-colors text-center group"
//             onClick={() => handleQuickAction('test-registration')}
//           >
//             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200">
//               <i className="fas fa-vial text-blue-600 text-xl"></i>
//             </div>
//             <p className="font-medium text-gray-800">Register Test</p>
//             <p className="text-xs text-gray-500 mt-1">New test registration</p>
//           </button>
          
//           <button 
//             className="p-4 border rounded-lg hover:bg-green-50 transition-colors text-center group"
//             onClick={() => handleQuickAction('sample-tracking')}
//           >
//             <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200">
//               <i className="fas fa-qrcode text-green-600 text-xl"></i>
//             </div>
//             <p className="font-medium text-gray-800">Track Sample</p>
//             <p className="text-xs text-gray-500 mt-1">Scan & track samples</p>
//           </button>
          
//           <button 
//             className="p-4 border rounded-lg hover:bg-yellow-50 transition-colors text-center group"
//             onClick={() => handleQuickAction('report-generation')}
//           >
//             <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-yellow-200">
//               <i className="fas fa-file-medical text-yellow-600 text-xl"></i>
//             </div>
//             <p className="font-medium text-gray-800">Generate Report</p>
//             <p className="text-xs text-gray-500 mt-1">Create lab reports</p>
//           </button>
          
//           <button 
//             className="p-4 border rounded-lg hover:bg-purple-50 transition-colors text-center group"
//             onClick={() => handleQuickAction('quality-control')}
//           >
//             <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200">
//               <i className="fas fa-chart-line text-purple-600 text-xl"></i>
//             </div>
//             <p className="font-medium text-gray-800">QC Entry</p>
//             <p className="text-xs text-gray-500 mt-1">Record QC results</p>
//           </button>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
//           <button 
//             className="p-3 border rounded-lg hover:bg-blue-50 transition-colors text-center group"
//             onClick={() => handleQuickAction('test-catalogue')}
//           >
//             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-200">
//               <i className="fas fa-book-medical text-blue-600"></i>
//             </div>
//             <p className="font-medium text-sm text-gray-800">Test Catalogue</p>
//           </button>
          
//           <button 
//             className="p-3 border rounded-lg hover:bg-green-50 transition-colors text-center group"
//             onClick={() => handleQuickAction('equipment-tracking')}
//           >
//             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-green-200">
//               <i className="fas fa-microscope text-green-600"></i>
//             </div>
//             <p className="font-medium text-sm text-gray-800">Equipment</p>
//           </button>
          
//           <button 
//             className="p-3 border rounded-lg hover:bg-purple-50 transition-colors text-center group"
//             onClick={() => handleQuickAction('result-access')}
//           >
//             <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-purple-200">
//               <i className="fas fa-shield-alt text-purple-600"></i>
//             </div>
//             <p className="font-medium text-sm text-gray-800">Result Access</p>
//           </button>
//         </div>
//       </div>

//       {/* Lab Alerts */}
//       <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//         <div className="flex items-center">
//           <div className="p-2 bg-yellow-100 rounded-lg mr-3">
//             <i className="fas fa-exclamation-triangle text-yellow-600"></i>
//           </div>
//           <div>
//             <h4 className="font-semibold text-yellow-800">Lab Alerts</h4>
//             <p className="text-sm text-yellow-700">
//               • Chemistry Analyzer requires calibration (Due: Jan 18) • 
//               • QC failed for Creatinine test • 
//               • 3 critical results pending physician notification
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LabOverview


























import React, { useState, useEffect, useMemo } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts'

const LabOverview = () => {
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
          totalTests: 156,
          pendingTests: 24,
          completedTests: 132,
          criticalResults: 3,
          equipmentOperational: 15,
          equipmentMaintenance: 2,
          qcPassed: 45,
          qcFailed: 1,
          turnaroundTime: 45,
          samplesCollected: 78
        },
        pendingTests: [
          { id: 'TEST-2024-015', patient: 'Rajesh Kumar', test: 'CBC', received: '10:30 AM', priority: 'urgent', status: 'Sample Processing' },
          { id: 'TEST-2024-016', patient: 'Priya Sharma', test: 'Lipid Profile', received: '11:00 AM', priority: 'routine', status: 'Sample Collection' },
          { id: 'TEST-2024-017', patient: 'Suresh Patel', test: 'Urine Culture', received: '11:30 AM', priority: 'routine', status: 'Culture In Progress' },
          { id: 'TEST-2024-018', patient: 'Anita Mehta', test: 'Liver Function', received: '12:00 PM', priority: 'urgent', status: 'Testing' }
        ],
        criticalResults: [
          { id: 'TEST-2024-012', patient: 'Ravi Kumar', test: 'Creatinine', value: '4.2 mg/dL', alert: 'Critical High', time: '09:45 AM', notified: 'Yes' },
          { id: 'TEST-2024-013', patient: 'Sunita Rao', test: 'Potassium', value: '6.5 mEq/L', alert: 'Critical High', time: '10:15 AM', notified: 'Pending' },
          { id: 'TEST-2024-014', patient: 'Mohan Singh', test: 'Glucose', value: '40 mg/dL', alert: 'Critical Low', time: '10:30 AM', notified: 'Yes' }
        ],
        equipmentStatus: [
          { id: 'EQP-001', name: 'Hematology Analyzer', status: 'Operational', nextMaintenance: '2024-02-10', location: 'Hematology Lab' },
          { id: 'EQP-002', name: 'Chemistry Analyzer', status: 'Maintenance', nextMaintenance: '2024-02-05', location: 'Chemistry Lab' },
          { id: 'EQP-003', name: 'Centrifuge', status: 'Calibration Due', nextMaintenance: '2024-01-18', location: 'Sample Processing' }
        ],
        qcStatus: [
          { test: 'CBC', status: 'Passed', value: 12.5, target: '12.0±0.5', time: '09:00 AM' },
          { test: 'Glucose', status: 'Warning', value: 105, target: '100±5', time: '09:30 AM' },
          { test: 'Creatinine', status: 'Failed', value: 2.5, target: '1.8±0.2', time: '10:00 AM' }
        ]
      })
      setLoading(false)
    }, 1000)
  }

  // Handle quick action button clicks
  const handleQuickAction = (action) => {
    const event = new CustomEvent('dashboard-navigation', {
      detail: { page: action }
    })
    window.dispatchEvent(event)
    console.log(`Navigating to: ${action}`)
  }

  // Handle test row click
  const handleTestClick = (test) => {
    console.log('Test clicked:', test)
    alert(`Viewing test: ${test.id} - ${test.test}`)
  }

  // Handle critical result click
  const handleCriticalResultClick = (result) => {
    console.log('Critical result clicked:', result)
    alert(`Critical Result: ${result.test} for ${result.patient}\nValue: ${result.value}`)
  }

  // Handle equipment click
  const handleEquipmentClick = (equipment) => {
    console.log('Equipment clicked:', equipment)
    alert(`Equipment: ${equipment.name}\nStatus: ${equipment.status}`)
  }

  // --- CHART DATA PREPARATION ---
  const testsByStatus = useMemo(() => {
    const map = {}
    const pending = dashboardData.pendingTests || []
    const critical = dashboardData.criticalResults || []

    pending.forEach((t) => {
      const k = t.status || 'Other'
      map[k] = (map[k] || 0) + 1
    })
    critical.forEach((c) => {
      const k = 'Critical'
      map[k] = (map[k] || 0) + 1
    })

    return Object.keys(map).map((k) => ({ name: k, count: map[k] }))
  }, [dashboardData.pendingTests, dashboardData.criticalResults])

  const qcTrend = useMemo(() => {
    const arr = (dashboardData.qcStatus || []).map((q, idx) => {
      const numeric = typeof q.value === 'number' ? q.value : parseFloat(String(q.value)) || 0
      return { name: q.test || `QC ${idx+1}`, value: numeric }
    })
    return arr
  }, [dashboardData.qcStatus])

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">
           Laboratory Dashboard
          </h2>
          
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleQuickAction('critical-results')}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
          >
            <i className="fas fa-flask mr-2"></i>Critical Results
          </button>
          <button
            onClick={() => handleQuickAction('report-generation')}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
          >
            <i className="fas fa-file-medical-alt mr-2"></i>Lab Reports
          </button>
        </div>
      </div>

      {/* Lab Alerts Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <i className="fas fa-exclamation-triangle text-yellow-500 text-xl mr-3"></i>
            <div>
              <h3 className="font-semibold text-yellow-800">Lab Alerts</h3>
              <p className="text-yellow-700 text-sm">
                Chemistry Analyzer requires calibration • QC failed for Creatinine test • 3 critical results pending physician notification
              </p>
            </div>
          </div>
          <button 
            onClick={() => handleQuickAction('equipment-tracking')}
            className="text-yellow-600 hover:text-yellow-800 text-sm font-medium"
          >
            View all →
          </button>
        </div>
      </div>

      {/* Stats Cards with Proper Lab Visualizations */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Tests - Test Tube Visualization */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => handleQuickAction('test-registration')}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent pointer-events-none" />
          
          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            +12%
          </span>
          
          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 mb-3">
                <i className="fas fa-flask text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Total Tests</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.totalTests}</p>
              <p className="text-xs text-gray-400 mt-1">tests processed today</p>
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

        {/* Pending Tests - Clock/Hourglass Visualization */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => handleQuickAction('test-registration')}>
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent pointer-events-none" />
          
          <span className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            {dashboardData.stats.pendingTests}
          </span>
          
          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 mb-3">
                <i className="fas fa-hourglass-half text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Pending Tests</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.pendingTests}</p>
              <p className="text-xs text-gray-400 mt-1">awaiting processing</p>
            </div>
            
            {/* Hourglass visualization */}
            <div className="relative h-14 w-12">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 border-2 border-yellow-400 rounded-full">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-300 rounded-full"></div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 border-2 border-yellow-400 rounded-full">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-yellow-300"></div>
            </div>
          </div>
        </div>

        {/* Completed Tests - Checkmark Progress */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => handleQuickAction('report-generation')}>
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent pointer-events-none" />
          
          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            {dashboardData.stats.completedTests}
          </span>
          
          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 mb-3">
                <i className="fas fa-check-circle text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Completed Tests</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.completedTests}</p>
              <p className="text-xs text-gray-400 mt-1">reports generated</p>
            </div>
            
            {/* Progress circle with checkmark */}
            <div className="relative h-14 w-14">
              <div className="absolute inset-0 border-4 border-green-200 rounded-full"></div>
              <div 
                className="absolute inset-2 border-4 border-green-500 rounded-full"
                style={{ clipPath: `inset(0 ${100 - (dashboardData.stats.completedTests / dashboardData.stats.totalTests * 100)}% 0 0)` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-green-500 font-bold text-xs">
                  {Math.round((dashboardData.stats.completedTests / dashboardData.stats.totalTests) * 100)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Results - Warning Symbol */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => handleQuickAction('critical-results')}>
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent pointer-events-none" />
          
          <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            Action
          </span>
          
          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 mb-3">
                <i className="fas fa-exclamation-circle text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Critical Results</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.criticalResults}</p>
              <p className="text-xs text-gray-400 mt-1">needs immediate review</p>
            </div>
            
            {/* Warning triangle visualization */}
            <div className="relative h-12 w-12">
              <svg width="48" height="48" viewBox="0 0 48 48">
                <polygon 
                  points="24,4 44,44 4,44" 
                  fill="#fee2e2" 
                  stroke="#ef4444" 
                  strokeWidth="2"
                />
                <text 
                  x="24" 
                  y="32" 
                  textAnchor="middle" 
                  fill="#ef4444" 
                  fontSize="14" 
                  fontWeight="bold"
                >
                  !
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tests by status bar chart */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent pointer-events-none" />
          
          <div className="relative">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-2">
                  <i className="fas fa-chart-bar text-purple-600"></i>
                </div>
                <h3 className="text-lg font-semibold">Tests by Status</h3>
              </div>
              <p className="text-sm text-gray-500">{(dashboardData.pendingTests || []).length + (dashboardData.criticalResults || []).length} items</p>
            </div>
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={testsByStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <ReTooltip />
                  <Legend />
                  <Bar dataKey="count" name="Test Count" barSize={20} fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* QC trend line chart */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent pointer-events-none" />
          
          <div className="relative">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center mr-2">
                  <i className="fas fa-chart-line text-cyan-600"></i>
                </div>
                <h3 className="text-lg font-semibold">QC Trend Analysis</h3>
              </div>
              <p className="text-sm text-gray-500">Latest QC checks</p>
            </div>
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={qcTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ReTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" name="QC Value" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Equipment Snapshot */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent pointer-events-none" />
          
          <div className="relative">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-2">
                  <i className="fas fa-cogs text-orange-600"></i>
                </div>
                <h3 className="text-lg font-semibold">Equipment Snapshot</h3>
              </div>
              <button onClick={() => handleQuickAction('equipment-tracking')} className="text-sm text-blue-600 hover:text-blue-800">Manage →</button>
            </div>
            <div className="space-y-4">
              {(dashboardData.equipmentStatus || []).map(eq => (
                <div key={eq.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all">
                  <div>
                    <p className="text-sm font-medium">{eq.name}</p>
                    <p className="text-xs text-gray-500">{eq.location} • Next: {eq.nextMaintenance}</p>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      eq.status === 'Operational' ? 'bg-green-100 text-green-800' :
                      eq.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>{eq.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pending Tests & Critical Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Tests */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" />
          
          <div className="relative">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                  <i className="fas fa-hourglass-half text-blue-600"></i>
                </div>
                <h3 className="text-lg font-semibold">Pending Tests</h3>
              </div>
              <button 
                onClick={() => handleQuickAction('test-registration')}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View All →
              </button>
            </div>
            <DataTable
              columns={[
                { key: 'id', title: 'Test ID', sortable: true },
                { key: 'patient', title: 'Patient', sortable: true },
                { key: 'test', title: 'Test', sortable: true },
                { key: 'received', title: 'Received', sortable: true },
                { 
                  key: 'priority', 
                  title: 'Priority', 
                  sortable: true,
                  render: (value) => (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      value === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {value}
                    </span>
                  )
                },
                { key: 'status', title: 'Status', sortable: true }
              ]}
              data={dashboardData.pendingTests}
              onRowClick={handleTestClick}
            />
          </div>
        </div>
        
        {/* Critical Results */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" />
          
          <div className="relative">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-2">
                  <i className="fas fa-exclamation-circle text-red-600"></i>
                </div>
                <h3 className="text-lg font-semibold">Critical Results</h3>
              </div>
              <button 
                onClick={() => handleQuickAction('critical-results')}
                className="text-sm text-red-600 hover:text-red-800"
              >
                View All →
              </button>
            </div>
            <DataTable
              columns={[
                { key: 'id', title: 'Test ID', sortable: true },
                { key: 'patient', title: 'Patient', sortable: true },
                { key: 'test', title: 'Test', sortable: true },
                { key: 'value', title: 'Value', sortable: true },
                { 
                  key: 'alert', 
                  title: 'Alert', 
                  sortable: true,
                  render: (value) => (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      value.includes('Critical') ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>{value}</span>
                  )
                },
                { key: 'notified', title: 'Notified', sortable: true }
              ]}
              data={dashboardData.criticalResults}
              onRowClick={handleCriticalResultClick}
            />
          </div>
        </div>
      </div>

      {/* Equipment & QC Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equipment Status */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" />
          
          <div className="relative">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-2">
                  <i className="fas fa-microscope text-green-600"></i>
                </div>
                <h3 className="text-lg font-semibold">Equipment Status</h3>
              </div>
              <button 
                onClick={() => handleQuickAction('equipment-tracking')}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Manage →
              </button>
            </div>
            <DataTable
              columns={[
                { key: 'id', title: 'Equipment ID', sortable: true },
                { key: 'name', title: 'Equipment', sortable: true },
                { 
                  key: 'status', 
                  title: 'Status', 
                  sortable: true,
                  render: (value) => (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      value === 'Operational' ? 'bg-green-100 text-green-800' :
                      value === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {value}
                    </span>
                  )
                },
                { key: 'nextMaintenance', title: 'Next Maintenance', sortable: true },
                { key: 'location', title: 'Location', sortable: true }
              ]}
              data={dashboardData.equipmentStatus}
              onRowClick={handleEquipmentClick}
            />
          </div>
        </div>
        
        {/* QC Status */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" />
          
          <div className="relative">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-2">
                  <i className="fas fa-clipboard-check text-yellow-600"></i>
                </div>
                <h3 className="text-lg font-semibold">QC Status Today</h3>
              </div>
              <button 
                onClick={() => handleQuickAction('quality-control')}
                className="text-sm text-green-600 hover:text-green-800"
              >
                View All →
              </button>
            </div>
            <DataTable
              columns={[
                { key: 'test', title: 'Test', sortable: true },
                { 
                  key: 'status', 
                  title: 'Status', 
                  sortable: true,
                  render: (value) => (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      value === 'Passed' ? 'bg-green-100 text-green-800' :
                      value === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>{value}</span>
                  )
                },
                { key: 'value', title: 'Value', sortable: true },
                { key: 'target', title: 'Target', sortable: true },
                { key: 'time', title: 'Time', sortable: true }
              ]}
              data={dashboardData.qcStatus}
              emptyMessage="No QC data available"
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent pointer-events-none" />
        
        <div className="relative">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:shadow-sm transition-all text-center group"
              onClick={() => handleQuickAction('test-registration')}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                <i className="fas fa-vial text-blue-600 text-xl"></i>
              </div>
              <p className="font-medium text-gray-800">Register Test</p>
              <p className="text-xs text-gray-500 mt-1">New test registration</p>
            </button>
            
            <button 
              className="p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 hover:shadow-sm transition-all text-center group"
              onClick={() => handleQuickAction('sample-tracking')}
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                <i className="fas fa-qrcode text-green-600 text-xl"></i>
              </div>
              <p className="font-medium text-gray-800">Track Sample</p>
              <p className="text-xs text-gray-500 mt-1">Scan & track samples</p>
            </button>
            
            <button 
              className="p-4 border border-gray-200 rounded-lg hover:bg-yellow-50 hover:border-yellow-300 hover:shadow-sm transition-all text-center group"
              onClick={() => handleQuickAction('report-generation')}
            >
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-yellow-200 transition-colors">
                <i className="fas fa-file-medical text-yellow-600 text-xl"></i>
              </div>
              <p className="font-medium text-gray-800">Generate Report</p>
              <p className="text-xs text-gray-500 mt-1">Create lab reports</p>
            </button>
            
            <button 
              className="p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 hover:shadow-sm transition-all text-center group"
              onClick={() => handleQuickAction('quality-control')}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
                <i className="fas fa-chart-line text-purple-600 text-xl"></i>
              </div>
              <p className="font-medium text-gray-800">QC Entry</p>
              <p className="text-xs text-gray-500 mt-1">Record QC results</p>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <button 
              className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:shadow-sm transition-all text-center group"
              onClick={() => handleQuickAction('test-catalogue')}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-200 transition-colors">
                <i className="fas fa-book-medical text-blue-600"></i>
              </div>
              <p className="font-medium text-sm text-gray-800">Test Catalogue</p>
            </button>
            
            <button 
              className="p-3 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 hover:shadow-sm transition-all text-center group"
              onClick={() => handleQuickAction('equipment-tracking')}
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-green-200 transition-colors">
                <i className="fas fa-microscope text-green-600"></i>
              </div>
              <p className="font-medium text-sm text-gray-800">Equipment</p>
            </button>
            
            <button 
              className="p-3 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 hover:shadow-sm transition-all text-center group"
              onClick={() => handleQuickAction('result-access')}
            >
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-purple-200 transition-colors">
                <i className="fas fa-shield-alt text-purple-600"></i>
              </div>
              <p className="font-medium text-sm text-gray-800">Result Access</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LabOverview