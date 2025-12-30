// import React, { useState, useEffect } from 'react'
// import DataTable from '../../../../components/ui/Tables/DataTable'
// import SearchBar from '../../../../components/common/SearchBar/SearchBar'
// import Button from '../../../../components/common/Button/Button'
// import Modal from '../../../../components/common/Modal/Modal'
// import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

// const EquipmentTracking = () => {
//   const [loading, setLoading] = useState(true)
//   const [equipment, setEquipment] = useState([])
//   const [maintenanceLogs, setMaintenanceLogs] = useState([])
//   const [searchTerm, setSearchTerm] = useState('')
//   const [showAddModal, setShowAddModal] = useState(false)
//   const [showMaintenanceModal, setShowMaintenanceModal] = useState(false)
//   const [showCalibrationModal, setShowCalibrationModal] = useState(false)
//   const [selectedEquipment, setSelectedEquipment] = useState(null)
//   const [newEquipment, setNewEquipment] = useState({
//     id: '',
//     name: '',
//     type: '',
//     brand: '',
//     model: '',
//     serialNumber: '',
//     location: '',
//     status: 'operational',
//     lastMaintenance: '',
//     nextMaintenance: '',
//     calibrationDue: ''
//   })

//   useEffect(() => {
//     loadEquipmentData()
//   }, [])

//   const loadEquipmentData = async () => {
//     setLoading(true)
//     setTimeout(() => {
//       const equipmentData = [
//         {
//           id: 'EQP-001',
//           name: 'Hematology Analyzer',
//           type: 'Analyzer',
//           brand: 'Sysmex',
//           model: 'XN-1000',
//           serialNumber: 'SX-2023-001',
//           location: 'Hematology Lab',
//           status: 'operational',
//           lastMaintenance: '2024-01-10',
//           nextMaintenance: '2024-02-10',
//           calibrationDue: '2024-01-25',
//           qrCode: 'QR001'
//         },
//         {
//           id: 'EQP-002',
//           name: 'Chemistry Analyzer',
//           type: 'Analyzer',
//           brand: 'Roche',
//           model: 'Cobas 6000',
//           serialNumber: 'RC-2023-002',
//           location: 'Chemistry Lab',
//           status: 'maintenance',
//           lastMaintenance: '2024-01-05',
//           nextMaintenance: '2024-02-05',
//           calibrationDue: '2024-01-20',
//           qrCode: 'QR002'
//         },
//         {
//           id: 'EQP-003',
//           name: 'Microscope',
//           type: 'Microscopy',
//           brand: 'Olympus',
//           model: 'CX23',
//           serialNumber: 'OL-2023-003',
//           location: 'Microbiology Lab',
//           status: 'operational',
//           lastMaintenance: '2024-01-12',
//           nextMaintenance: '2024-02-12',
//           calibrationDue: '2024-01-30',
//           qrCode: 'QR003'
//         },
//         {
//           id: 'EQP-004',
//           name: 'Centrifuge',
//           type: 'Centrifuge',
//           brand: 'Eppendorf',
//           model: '5424 R',
//           serialNumber: 'EP-2023-004',
//           location: 'Sample Processing',
//           status: 'calibration_due',
//           lastMaintenance: '2024-01-08',
//           nextMaintenance: '2024-02-08',
//           calibrationDue: '2024-01-18',
//           qrCode: 'QR004'
//         },
//         {
//           id: 'EQP-005',
//           name: 'Autoclave',
//           type: 'Sterilizer',
//           brand: 'Tuttnauer',
//           model: '3870EA',
//           serialNumber: 'TT-2023-005',
//           location: 'Sterilization Room',
//           status: 'operational',
//           lastMaintenance: '2024-01-15',
//           nextMaintenance: '2024-02-15',
//           calibrationDue: '2024-01-28',
//           qrCode: 'QR005'
//         }
//       ]

//       const maintenanceData = [
//         {
//           id: 'MNT-001',
//           equipmentId: 'EQP-002',
//           equipmentName: 'Chemistry Analyzer',
//           type: 'Preventive Maintenance',
//           date: '2024-01-05',
//           performedBy: 'John Technician',
//           cost: 15000,
//           description: 'Routine maintenance and calibration',
//           status: 'completed'
//         },
//         {
//           id: 'MNT-002',
//           equipmentId: 'EQP-004',
//           equipmentName: 'Centrifuge',
//           type: 'Calibration',
//           date: '2024-01-08',
//           performedBy: 'Sarah Engineer',
//           cost: 5000,
//           description: 'Speed calibration and balancing',
//           status: 'completed'
//         },
//         {
//           id: 'MNT-003',
//           equipmentId: 'EQP-001',
//           equipmentName: 'Hematology Analyzer',
//           type: 'Repair',
//           date: '2024-01-10',
//           performedBy: 'Mike Specialist',
//           cost: 25000,
//           description: 'Replacement of fluidic system',
//           status: 'completed'
//         }
//       ]

//       setEquipment(equipmentData)
//       setMaintenanceLogs(maintenanceData)
//       setLoading(false)
//     }, 1000)
//   }

//   const handleSearch = (term) => {
//     setSearchTerm(term)
//   }

//   const handleAddEquipment = () => {
//     // Generate equipment ID
//     const eqpId = `EQP-${(equipment.length + 1).toString().padStart(3, '0')}`
//     const qrCode = `QR${(equipment.length + 1).toString().padStart(3, '0')}`
    
//     const newEquipmentEntry = {
//       ...newEquipment,
//       id: eqpId,
//       qrCode: qrCode
//     }
    
//     setEquipment([...equipment, newEquipmentEntry])
//     setShowAddModal(false)
//     setNewEquipment({
//       id: '',
//       name: '',
//       type: '',
//       brand: '',
//       model: '',
//       serialNumber: '',
//       location: '',
//       status: 'operational',
//       lastMaintenance: '',
//       nextMaintenance: '',
//       calibrationDue: ''
//     })
    
//     alert(`Equipment "${newEquipment.name}" added successfully!\nQR Code: ${qrCode}`)
//   }

//   const handleScheduleMaintenance = (eqp) => {
//     setSelectedEquipment(eqp)
//     setShowMaintenanceModal(true)
//   }

//   const handleScheduleCalibration = (eqp) => {
//     setSelectedEquipment(eqp)
//     setShowCalibrationModal(true)
//   }

//   const handleLogMaintenance = () => {
//     const maintenanceId = `MNT-${Date.now().toString().slice(-6)}`
//     const newMaintenance = {
//       id: maintenanceId,
//       equipmentId: selectedEquipment.id,
//       equipmentName: selectedEquipment.name,
//       type: 'Preventive Maintenance',
//       date: new Date().toISOString().split('T')[0],
//       performedBy: 'Current User',
//       cost: 0,
//       description: 'Routine maintenance as scheduled',
//       status: 'scheduled'
//     }
    
//     setMaintenanceLogs([newMaintenance, ...maintenanceLogs])
    
//     // Update equipment maintenance date
//     setEquipment(equipment.map(eq => 
//       eq.id === selectedEquipment.id 
//         ? { 
//             ...eq, 
//             lastMaintenance: new Date().toISOString().split('T')[0],
//             nextMaintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//             status: 'maintenance'
//           }
//         : eq
//     ))
    
//     setShowMaintenanceModal(false)
//     alert(`Maintenance scheduled for ${selectedEquipment.name}`)
//   }

//   const handleLogCalibration = () => {
//     // Update equipment calibration date
//     setEquipment(equipment.map(eq => 
//       eq.id === selectedEquipment.id 
//         ? { 
//             ...eq, 
//             calibrationDue: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//             status: 'operational'
//           }
//         : eq
//     ))
    
//     setShowCalibrationModal(false)
//     alert(`Calibration logged for ${selectedEquipment.name}`)
//   }

//   const handleStatusUpdate = (equipmentId, newStatus) => {
//     setEquipment(equipment.map(eq => 
//       eq.id === equipmentId ? { ...eq, status: newStatus } : eq
//     ))
//     alert(`Equipment status updated to: ${newStatus}`)
//   }

//   const handleGenerateQR = (equipmentId) => {
//     const eqp = equipment.find(e => e.id === equipmentId)
//     if (eqp) {
//       alert(`QR Code for ${eqp.name}:\nID: ${eqp.id}\nQR: ${eqp.qrCode}`)
//       // In real app, show QR code modal or download
//     }
//   }

//   const filteredEquipment = equipment.filter(eqp =>
//     eqp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     eqp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     eqp.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   const equipmentTypes = ['Analyzer', 'Centrifuge', 'Microscope', 'Incubator', 'Autoclave', 'Refrigerator', 'Freezer', 'Pipette', 'Balance', 'Water Bath', 'Other']
//   const equipmentStatus = {
//     'operational': { color: 'bg-green-100 text-green-800', label: 'Operational' },
//     'maintenance': { color: 'bg-yellow-100 text-yellow-800', label: 'Under Maintenance' },
//     'calibration_due': { color: 'bg-orange-100 text-orange-800', label: 'Calibration Due' },
//     'out_of_service': { color: 'bg-red-100 text-red-800', label: 'Out of Service' },
//     'retired': { color: 'bg-gray-100 text-gray-800', label: 'Retired' }
//   }

//   if (loading) return <LoadingSpinner />

//   return (
//     <>
//         <div className="space-y-6 animate-fade-in">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-700">🔧 Equipment Tracking</h2>
//           <p className="text-gray-500">Track laboratory equipment, maintenance, and calibration schedules</p>
//         </div>
//         <div className="flex gap-3">
//           <Button
//             variant="primary"
//             icon="fas fa-plus"
//             onClick={() => setShowAddModal(true)}
//           >
//             Add Equipment
//           </Button>
//         </div>
//       </div>

//       {/* Equipment Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white p-4 rounded border card-shadow">
//           <div className="flex items-center">
//             <div className="p-3 bg-blue-100 rounded-lg mr-4">
//               <i className="fas fa-microscope text-blue-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Total Equipment</p>
//               <p className="text-2xl font-bold text-blue-600 mt-1">{equipment.length}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded border card-shadow">
//           <div className="flex items-center">
//             <div className="p-3 bg-green-100 rounded-lg mr-4">
//               <i className="fas fa-check-circle text-green-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Operational</p>
//               <p className="text-2xl font-bold text-green-600 mt-1">{equipment.filter(e => e.status === 'operational').length}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded border card-shadow">
//           <div className="flex items-center">
//             <div className="p-3 bg-yellow-100 rounded-lg mr-4">
//               <i className="fas fa-tools text-yellow-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Under Maintenance</p>
//               <p className="text-2xl font-bold text-yellow-600 mt-1">{equipment.filter(e => e.status === 'maintenance').length}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded border card-shadow">
//           <div className="flex items-center">
//             <div className="p-3 bg-red-100 rounded-lg mr-4">
//               <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Calibration Due</p>
//               <p className="text-2xl font-bold text-red-600 mt-1">{equipment.filter(e => e.status === 'calibration_due').length}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="bg-white p-4 rounded border card-shadow">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <SearchBar
//               placeholder="Search equipment by name, ID, or serial number..."
//               onSearch={handleSearch}
//               className="w-full"
//             />
//           </div>
//           <div className="flex gap-2">
//             <select className="px-4 py-2 border rounded-lg">
//               <option value="">All Status</option>
//               <option value="operational">Operational</option>
//               <option value="maintenance">Under Maintenance</option>
//               <option value="calibration_due">Calibration Due</option>
//               <option value="out_of_service">Out of Service</option>
//             </select>
//             <select className="px-4 py-2 border rounded-lg">
//               <option value="">All Types</option>
//               {equipmentTypes.map(type => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Equipment Table */}
//       <div className="bg-white rounded border card-shadow overflow-hidden">
//         <DataTable
//           columns={[
//             { key: 'id', title: 'Equipment ID', sortable: true },
//             { key: 'name', title: 'Equipment Name', sortable: true },
//             { key: 'type', title: 'Type', sortable: true },
//             { key: 'brand', title: 'Brand', sortable: true },
//             { key: 'model', title: 'Model', sortable: true },
//             { key: 'serialNumber', title: 'Serial No.', sortable: true },
//             { key: 'location', title: 'Location', sortable: true },
//             { 
//               key: 'status', 
//               title: 'Status', 
//               sortable: true,
//               render: (value) => (
//                 <span className={`px-2 py-1 rounded-full text-xs ${equipmentStatus[value]?.color || 'bg-gray-100'}`}>
//                   {equipmentStatus[value]?.label || value}
//                 </span>
//               )
//             },
//             { key: 'nextMaintenance', title: 'Next Maintenance', sortable: true },
//             { key: 'calibrationDue', title: 'Calibration Due', sortable: true },
//             {
//               key: 'actions',
//               title: 'Actions',
//               render: (_, row) => (
//                 <div className="flex gap-2">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       handleGenerateQR(row.id)
//                     }}
//                     className="px-3 py-1 text-xs bg-purple-100 text-purple-800 rounded hover:bg-purple-200"
//                     title="Generate QR Code"
//                   >
//                     <i className="fas fa-qrcode"></i>
//                   </button>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       handleScheduleMaintenance(row)
//                     }}
//                     className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
//                     title="Schedule Maintenance"
//                   >
//                     <i className="fas fa-tools"></i>
//                   </button>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       handleScheduleCalibration(row)
//                     }}
//                     className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200"
//                     title="Schedule Calibration"
//                   >
//                     <i className="fas fa-ruler"></i>
//                   </button>
//                 </div>
//               )
//             }
//           ]}
//           data={filteredEquipment}
//           onRowClick={(eqp) => setSelectedEquipment(eqp)}
//           emptyMessage="No equipment found. Add equipment to start tracking."
//         />
//       </div>

//       {/* Selected Equipment Details */}
//       {selectedEquipment && (
//         <div className="bg-white p-6 rounded border card-shadow">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <h3 className="text-xl font-semibold">{selectedEquipment.name}</h3>
//               <p className="text-gray-600">{selectedEquipment.brand} {selectedEquipment.model} • {selectedEquipment.id}</p>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => handleStatusUpdate(selectedEquipment.id, 'operational')}
//                 className="px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200"
//               >
//                 Mark Operational
//               </button>
//               <button
//                 onClick={() => handleStatusUpdate(selectedEquipment.id, 'maintenance')}
//                 className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
//               >
//                 Mark Under Maintenance
//               </button>
//             </div>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="p-4 bg-blue-50 rounded-lg">
//               <p className="text-sm text-gray-500">Serial Number</p>
//               <p className="font-mono font-medium">{selectedEquipment.serialNumber}</p>
//             </div>
//             <div className="p-4 bg-green-50 rounded-lg">
//               <p className="text-sm text-gray-500">Location</p>
//               <p className="font-medium">{selectedEquipment.location}</p>
//             </div>
//             <div className="p-4 bg-yellow-50 rounded-lg">
//               <p className="text-sm text-gray-500">Last Maintenance</p>
//               <p className="font-medium">{selectedEquipment.lastMaintenance}</p>
//             </div>
//             <div className="p-4 bg-red-50 rounded-lg">
//               <p className="text-sm text-gray-500">Calibration Due</p>
//               <p className="font-medium">{selectedEquipment.calibrationDue}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Maintenance Logs */}
//       <div className="bg-white rounded border card-shadow overflow-hidden">
//         <div className="p-4 border-b">
//           <h3 className="text-lg font-semibold">Maintenance Logs</h3>
//           <p className="text-sm text-gray-500">Recent maintenance and calibration activities</p>
//         </div>
//         <DataTable
//           columns={[
//             { key: 'equipmentName', title: 'Equipment', sortable: true },
//             { key: 'type', title: 'Type', sortable: true },
//             { key: 'date', title: 'Date', sortable: true },
//             { key: 'performedBy', title: 'Performed By', sortable: true },
//             { key: 'cost', title: 'Cost (₹)', sortable: true },
//             { key: 'description', title: 'Description', sortable: true },
//             { 
//               key: 'status', 
//               title: 'Status', 
//               sortable: true,
//               render: (value) => (
//                 <span className={`px-2 py-1 rounded-full text-xs ${
//                   value === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
//                 }`}>
//                   {value.charAt(0).toUpperCase() + value.slice(1)}
//                 </span>
//               )
//             }
//           ]}
//           data={maintenanceLogs}
//           emptyMessage="No maintenance logs available."
//         />
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white p-4 rounded border card-shadow">
//         <h3 className="text-lg font-semibold mb-3">Quick Equipment Actions</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <button 
//             className="p-4 border rounded-lg hover:bg-blue-50 transition-colors text-center group"
//             onClick={() => alert('Generate QR codes for all equipment')}
//           >
//             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200">
//               <i className="fas fa-qrcode text-blue-600 text-xl"></i>
//             </div>
//             <p className="font-medium">Bulk QR Codes</p>
//           </button>
          
//           <button 
//             className="p-4 border rounded-lg hover:bg-green-50 transition-colors text-center group"
//             onClick={() => alert('Generate maintenance schedule report')}
//           >
//             <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200">
//               <i className="fas fa-calendar-alt text-green-600 text-xl"></i>
//             </div>
//             <p className="font-medium">Maintenance Schedule</p>
//           </button>
          
//           <button 
//             className="p-4 border rounded-lg hover:bg-yellow-50 transition-colors text-center group"
//             onClick={() => alert('Generate calibration due report')}
//           >
//             <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-yellow-200">
//               <i className="fas fa-clipboard-check text-yellow-600 text-xl"></i>
//             </div>
//             <p className="font-medium">Calibration Report</p>
//           </button>
          
//           <button 
//             className="p-4 border rounded-lg hover:bg-purple-50 transition-colors text-center group"
//             onClick={() => alert('Export equipment inventory')}
//           >
//             <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200">
//               <i className="fas fa-file-export text-purple-600 text-xl"></i>
//             </div>
//             <p className="font-medium">Export Inventory</p>
//           </button>
//         </div>
//       </div>
//     </div>
          
//                 {/* Add Equipment Modal */}
//       <Modal
//         isOpen={showAddModal}
//         onClose={() => setShowAddModal(false)}
//         title="Add New Equipment"
//         size="lg"
//       >
//         <div className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Equipment Name *
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-3 py-2 border rounded-lg"
//                 placeholder="e.g., Hematology Analyzer"
//                 value={newEquipment.name}
//                 onChange={(e) => setNewEquipment({...newEquipment, name: e.target.value})}
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Equipment Type *
//               </label>
//               <select
//                 className="w-full px-3 py-2 border rounded-lg"
//                 value={newEquipment.type}
//                 onChange={(e) => setNewEquipment({...newEquipment, type: e.target.value})}
//                 required
//               >
//                 <option value="">Select type</option>
//                 {equipmentTypes.map(type => (
//                   <option key={type} value={type}>{type}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Brand *
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-3 py-2 border rounded-lg"
//                 placeholder="e.g., Sysmex, Roche, etc."
//                 value={newEquipment.brand}
//                 onChange={(e) => setNewEquipment({...newEquipment, brand: e.target.value})}
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Model *
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-3 py-2 border rounded-lg"
//                 placeholder="e.g., XN-1000, Cobas 6000"
//                 value={newEquipment.model}
//                 onChange={(e) => setNewEquipment({...newEquipment, model: e.target.value})}
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Serial Number *
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-3 py-2 border rounded-lg"
//                 placeholder="Unique serial number"
//                 value={newEquipment.serialNumber}
//                 onChange={(e) => setNewEquipment({...newEquipment, serialNumber: e.target.value})}
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Location *
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-3 py-2 border rounded-lg"
//                 placeholder="e.g., Hematology Lab, Room 101"
//                 value={newEquipment.location}
//                 onChange={(e) => setNewEquipment({...newEquipment, location: e.target.value})}
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Initial Status
//               </label>
//               <select
//                 className="w-full px-3 py-2 border rounded-lg"
//                 value={newEquipment.status}
//                 onChange={(e) => setNewEquipment({...newEquipment, status: e.target.value})}
//               >
//                 <option value="operational">Operational</option>
//                 <option value="maintenance">Under Maintenance</option>
//                 <option value="calibration_due">Calibration Due</option>
//                 <option value="out_of_service">Out of Service</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Next Maintenance Date
//               </label>
//               <input
//                 type="date"
//                 className="w-full px-3 py-2 border rounded-lg"
//                 value={newEquipment.nextMaintenance}
//                 onChange={(e) => setNewEquipment({...newEquipment, nextMaintenance: e.target.value})}
//               />
//             </div>
//           </div>

//           <div className="flex justify-end gap-3 pt-4 border-t">
//             <Button
//               variant="outline"
//               onClick={() => setShowAddModal(false)}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="primary"
//               onClick={handleAddEquipment}
//               disabled={!newEquipment.name || !newEquipment.type || !newEquipment.brand || !newEquipment.model || !newEquipment.serialNumber || !newEquipment.location}
//             >
//               Add Equipment
//             </Button>
//           </div>
//         </div>
//       </Modal>

//       {/* Schedule Maintenance Modal */}
//       <Modal
//         isOpen={showMaintenanceModal}
//         onClose={() => setShowMaintenanceModal(false)}
//         title="Schedule Maintenance"
//       >
//         {selectedEquipment && (
//           <div className="space-y-4">
//             <div className="bg-blue-50 p-3 rounded">
//               <p className="text-sm text-blue-800">
//                 <i className="fas fa-tools mr-2"></i>
//                 Schedule maintenance for: {selectedEquipment.name}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Maintenance Type
//                 </label>
//                 <select className="w-full px-3 py-2 border rounded-lg">
//                   <option value="preventive">Preventive Maintenance</option>
//                   <option value="corrective">Corrective Maintenance</option>
//                   <option value="calibration">Calibration</option>
//                   <option value="repair">Repair</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Scheduled Date
//                 </label>
//                 <input
//                   type="date"
//                   className="w-full px-3 py-2 border rounded-lg"
//                   defaultValue={new Date().toISOString().split('T')[0]}
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Assigned Technician
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-3 py-2 border rounded-lg"
//                 placeholder="Enter technician name"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Description
//               </label>
//               <textarea
//                 className="w-full px-3 py-2 border rounded-lg"
//                 rows="3"
//                 placeholder="Describe the maintenance required..."
//               />
//             </div>

//             <div className="flex justify-end gap-3 pt-4 border-t">
//               <Button
//                 variant="outline"
//                 onClick={() => setShowMaintenanceModal(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 variant="primary"
//                 onClick={handleLogMaintenance}
//               >
//                 Schedule Maintenance
//               </Button>
//             </div>
//           </div>
//         )}
//       </Modal>

//       {/* Schedule Calibration Modal */}
//       <Modal
//         isOpen={showCalibrationModal}
//         onClose={() => setShowCalibrationModal(false)}
//         title="Schedule Calibration"
//       >
//         {selectedEquipment && (
//           <div className="space-y-4">
//             <div className="bg-yellow-50 p-3 rounded">
//               <p className="text-sm text-yellow-800">
//                 <i className="fas fa-ruler mr-2"></i>
//                 Schedule calibration for: {selectedEquipment.name}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Calibration Type
//                 </label>
//                 <select className="w-full px-3 py-2 border rounded-lg">
//                   <option value="routine">Routine Calibration</option>
//                   <option value="annual">Annual Calibration</option>
//                   <option value="after_repair">Post-Repair Calibration</option>
//                   <option value="special">Special Calibration</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Calibration Due Date
//                 </label>
//                 <input
//                   type="date"
//                   className="w-full px-3 py-2 border rounded-lg"
//                   defaultValue={selectedEquipment.calibrationDue}
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Calibration Standard
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-3 py-2 border rounded-lg"
//                 placeholder="e.g., NIST Traceable, ISO Standard"
//               />
//             </div>

//             <div className="flex justify-end gap-3 pt-4 border-t">
//               <Button
//                 variant="outline"
//                 onClick={() => setShowCalibrationModal(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 variant="primary"
//                 onClick={handleLogCalibration}
//               >
//                 Schedule Calibration
//               </Button>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </>
//   )
// }

// export default EquipmentTracking




































import React, { useState, useEffect } from 'react'
import DataTable from '../../../../components/ui/Tables/DataTable'
import SearchBar from '../../../../components/common/SearchBar/SearchBar'
import Button from '../../../../components/common/Button/Button'
import Modal from '../../../../components/common/Modal/Modal'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const EquipmentTracking = () => {
  const [loading, setLoading] = useState(true)
  const [equipment, setEquipment] = useState([])
  const [maintenanceLogs, setMaintenanceLogs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false)
  const [showCalibrationModal, setShowCalibrationModal] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState(null)
  const [newEquipment, setNewEquipment] = useState({
    id: '',
    name: '',
    type: '',
    brand: '',
    model: '',
    serialNumber: '',
    location: '',
    status: 'operational',
    lastMaintenance: '',
    nextMaintenance: '',
    calibrationDue: ''
  })

  useEffect(() => {
    loadEquipmentData()
  }, [])

  const loadEquipmentData = async () => {
    setLoading(true)
    setTimeout(() => {
      const equipmentData = [
        {
          id: 'EQP-001',
          name: 'Hematology Analyzer',
          type: 'Analyzer',
          brand: 'Sysmex',
          model: 'XN-1000',
          serialNumber: 'SX-2023-001',
          location: 'Hematology Lab',
          status: 'operational',
          lastMaintenance: '2024-01-10',
          nextMaintenance: '2024-02-10',
          calibrationDue: '2024-01-25',
          qrCode: 'QR001'
        },
        {
          id: 'EQP-002',
          name: 'Chemistry Analyzer',
          type: 'Analyzer',
          brand: 'Roche',
          model: 'Cobas 6000',
          serialNumber: 'RC-2023-002',
          location: 'Chemistry Lab',
          status: 'maintenance',
          lastMaintenance: '2024-01-05',
          nextMaintenance: '2024-02-05',
          calibrationDue: '2024-01-20',
          qrCode: 'QR002'
        },
        {
          id: 'EQP-003',
          name: 'Microscope',
          type: 'Microscopy',
          brand: 'Olympus',
          model: 'CX23',
          serialNumber: 'OL-2023-003',
          location: 'Microbiology Lab',
          status: 'operational',
          lastMaintenance: '2024-01-12',
          nextMaintenance: '2024-02-12',
          calibrationDue: '2024-01-30',
          qrCode: 'QR003'
        },
        {
          id: 'EQP-004',
          name: 'Centrifuge',
          type: 'Centrifuge',
          brand: 'Eppendorf',
          model: '5424 R',
          serialNumber: 'EP-2023-004',
          location: 'Sample Processing',
          status: 'calibration_due',
          lastMaintenance: '2024-01-08',
          nextMaintenance: '2024-02-08',
          calibrationDue: '2024-01-18',
          qrCode: 'QR004'
        },
        {
          id: 'EQP-005',
          name: 'Autoclave',
          type: 'Sterilizer',
          brand: 'Tuttnauer',
          model: '3870EA',
          serialNumber: 'TT-2023-005',
          location: 'Sterilization Room',
          status: 'operational',
          lastMaintenance: '2024-01-15',
          nextMaintenance: '2024-02-15',
          calibrationDue: '2024-01-28',
          qrCode: 'QR005'
        }
      ]

      const maintenanceData = [
        {
          id: 'MNT-001',
          equipmentId: 'EQP-002',
          equipmentName: 'Chemistry Analyzer',
          type: 'Preventive Maintenance',
          date: '2024-01-05',
          performedBy: 'John Technician',
          cost: 15000,
          description: 'Routine maintenance and calibration',
          status: 'completed'
        },
        {
          id: 'MNT-002',
          equipmentId: 'EQP-004',
          equipmentName: 'Centrifuge',
          type: 'Calibration',
          date: '2024-01-08',
          performedBy: 'Sarah Engineer',
          cost: 5000,
          description: 'Speed calibration and balancing',
          status: 'completed'
        },
        {
          id: 'MNT-003',
          equipmentId: 'EQP-001',
          equipmentName: 'Hematology Analyzer',
          type: 'Repair',
          date: '2024-01-10',
          performedBy: 'Mike Specialist',
          cost: 25000,
          description: 'Replacement of fluidic system',
          status: 'completed'
        }
      ]

      setEquipment(equipmentData)
      setMaintenanceLogs(maintenanceData)
      setLoading(false)
    }, 1000)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleAddEquipment = () => {
    // Generate equipment ID
    const eqpId = `EQP-${(equipment.length + 1).toString().padStart(3, '0')}`
    const qrCode = `QR${(equipment.length + 1).toString().padStart(3, '0')}`
    
    const newEquipmentEntry = {
      ...newEquipment,
      id: eqpId,
      qrCode: qrCode
    }
    
    setEquipment([...equipment, newEquipmentEntry])
    setShowAddModal(false)
    setNewEquipment({
      id: '',
      name: '',
      type: '',
      brand: '',
      model: '',
      serialNumber: '',
      location: '',
      status: 'operational',
      lastMaintenance: '',
      nextMaintenance: '',
      calibrationDue: ''
    })
    
    alert(`Equipment "${newEquipment.name}" added successfully!\nQR Code: ${qrCode}`)
  }

  const handleScheduleMaintenance = (eqp) => {
    setSelectedEquipment(eqp)
    setShowMaintenanceModal(true)
  }

  const handleScheduleCalibration = (eqp) => {
    setSelectedEquipment(eqp)
    setShowCalibrationModal(true)
  }

  const handleLogMaintenance = () => {
    const maintenanceId = `MNT-${Date.now().toString().slice(-6)}`
    const newMaintenance = {
      id: maintenanceId,
      equipmentId: selectedEquipment.id,
      equipmentName: selectedEquipment.name,
      type: 'Preventive Maintenance',
      date: new Date().toISOString().split('T')[0],
      performedBy: 'Current User',
      cost: 0,
      description: 'Routine maintenance as scheduled',
      status: 'scheduled'
    }
    
    setMaintenanceLogs([newMaintenance, ...maintenanceLogs])
    
    // Update equipment maintenance date
    setEquipment(equipment.map(eq => 
      eq.id === selectedEquipment.id 
        ? { 
            ...eq, 
            lastMaintenance: new Date().toISOString().split('T')[0],
            nextMaintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: 'maintenance'
          }
        : eq
    ))
    
    setShowMaintenanceModal(false)
    alert(`Maintenance scheduled for ${selectedEquipment.name}`)
  }

  const handleLogCalibration = () => {
    // Update equipment calibration date
    setEquipment(equipment.map(eq => 
      eq.id === selectedEquipment.id 
        ? { 
            ...eq, 
            calibrationDue: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: 'operational'
          }
        : eq
    ))
    
    setShowCalibrationModal(false)
    alert(`Calibration logged for ${selectedEquipment.name}`)
  }

  const handleStatusUpdate = (equipmentId, newStatus) => {
    setEquipment(equipment.map(eq => 
      eq.id === equipmentId ? { ...eq, status: newStatus } : eq
    ))
    alert(`Equipment status updated to: ${newStatus}`)
  }

  const handleGenerateQR = (equipmentId) => {
    const eqp = equipment.find(e => e.id === equipmentId)
    if (eqp) {
      alert(`QR Code for ${eqp.name}:\nID: ${eqp.id}\nQR: ${eqp.qrCode}`)
      // In real app, show QR code modal or download
    }
  }

  const filteredEquipment = equipment.filter(eqp =>
    eqp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eqp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eqp.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const equipmentTypes = ['Analyzer', 'Centrifuge', 'Microscope', 'Incubator', 'Autoclave', 'Refrigerator', 'Freezer', 'Pipette', 'Balance', 'Water Bath', 'Other']
  const equipmentStatus = {
    'operational': { color: 'bg-green-100 text-green-800', label: 'Operational' },
    'maintenance': { color: 'bg-yellow-100 text-yellow-800', label: 'Under Maintenance' },
    'calibration_due': { color: 'bg-orange-100 text-orange-800', label: 'Calibration Due' },
    'out_of_service': { color: 'bg-red-100 text-red-800', label: 'Out of Service' },
    'retired': { color: 'bg-gray-100 text-gray-800', label: 'Retired' }
  }

  if (loading) return <LoadingSpinner />

  return (
    <>
      <div className="space-y-4 md:space-y-6 animate-fade-in p-3 md:p-0">
        {/* Header - Improved responsive layout */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-3 md:gap-4">
          <div className="w-full md:w-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 flex items-center gap-2">
              <i className="fas fa-microscope"></i>
              Equipment Tracking
            </h2>
            <p className="text-sm md:text-base text-gray-500 mt-1">Track laboratory equipment, maintenance, and calibration schedules</p>
          </div>
          <div className="w-full md:w-auto mt-3 md:mt-0">
            <Button
              variant="primary"
              icon="fas fa-plus"
              onClick={() => setShowAddModal(true)}
              className="w-full md:w-auto justify-center"
            >
              <span className="hidden sm:inline">Add Equipment</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>

        {/* Equipment Stats - Improved responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-white p-3 md:p-4 rounded-lg border card-shadow">
            <div className="flex items-center">
              <div className="p-2 md:p-3 bg-blue-100 rounded-lg mr-3 md:mr-4">
                <i className="fas fa-microscope text-blue-600 text-lg md:text-xl"></i>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-500">Total Equipment</p>
                <p className="text-lg md:text-2xl font-bold text-blue-600 mt-0.5">{equipment.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-3 md:p-4 rounded-lg border card-shadow">
            <div className="flex items-center">
              <div className="p-2 md:p-3 bg-green-100 rounded-lg mr-3 md:mr-4">
                <i className="fas fa-check-circle text-green-600 text-lg md:text-xl"></i>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-500">Operational</p>
                <p className="text-lg md:text-2xl font-bold text-green-600 mt-0.5">{equipment.filter(e => e.status === 'operational').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-3 md:p-4 rounded-lg border card-shadow">
            <div className="flex items-center">
              <div className="p-2 md:p-3 bg-yellow-100 rounded-lg mr-3 md:mr-4">
                <i className="fas fa-tools text-yellow-600 text-lg md:text-xl"></i>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-500">Maintenance</p>
                <p className="text-lg md:text-2xl font-bold text-yellow-600 mt-0.5">{equipment.filter(e => e.status === 'maintenance').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-3 md:p-4 rounded-lg border card-shadow">
            <div className="flex items-center">
              <div className="p-2 md:p-3 bg-red-100 rounded-lg mr-3 md:mr-4">
                <i className="fas fa-exclamation-triangle text-red-600 text-lg md:text-xl"></i>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-500">Calibration Due</p>
                <p className="text-lg md:text-2xl font-bold text-red-600 mt-0.5">{equipment.filter(e => e.status === 'calibration_due').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters - Improved responsive layout */}
        <div className="bg-white p-3 md:p-4 rounded-lg border card-shadow">
          <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            <div className="flex-1">
              <SearchBar
                placeholder="Search equipment..."
                onSearch={handleSearch}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2 border rounded-lg text-sm md:text-base w-1/2 md:w-auto">
                <option value="">All Status</option>
                <option value="operational">Operational</option>
                <option value="maintenance">Maintenance</option>
                <option value="calibration_due">Calibration Due</option>
                <option value="out_of_service">Out of Service</option>
              </select>
              <select className="px-3 py-2 border rounded-lg text-sm md:text-base w-1/2 md:w-auto">
                <option value="">All Types</option>
                {equipmentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Equipment Table - Made more responsive */}
        <div className="bg-white rounded-lg border card-shadow overflow-hidden">
          <div className="p-3 md:p-4">
            <h3 className="text-lg font-semibold mb-2">Equipment List</h3>
          </div>
          <div className="overflow-x-auto">
            <DataTable
              columns={[
                { 
                  key: 'id', 
                  title: 'Equipment ID', 
                  sortable: true,
                  className: 'min-w-[100px]'
                },
                { 
                  key: 'name', 
                  title: 'Name', 
                  sortable: true,
                  className: 'min-w-[150px]'
                },
                { 
                  key: 'type', 
                  title: 'Type', 
                  sortable: true,
                  className: 'hidden sm:table-cell'
                },
                { 
                  key: 'brand', 
                  title: 'Brand', 
                  sortable: true,
                  className: 'hidden md:table-cell'
                },
                { 
                  key: 'model', 
                  title: 'Model', 
                  sortable: true,
                  className: 'hidden lg:table-cell'
                },
                { 
                  key: 'serialNumber', 
                  title: 'Serial No.', 
                  sortable: true,
                  className: 'hidden lg:table-cell'
                },
                { 
                  key: 'location', 
                  title: 'Location', 
                  sortable: true,
                  className: 'hidden md:table-cell'
                },
                { 
                  key: 'status', 
                  title: 'Status', 
                  sortable: true,
                  className: 'min-w-[100px]',
                  render: (value) => (
                    <span className={`px-2 py-1 rounded-full text-xs ${equipmentStatus[value]?.color || 'bg-gray-100'}`}>
                      {equipmentStatus[value]?.label || value}
                    </span>
                  )
                },
                {
                  key: 'actions',
                  title: 'Actions',
                  className: 'min-w-[120px]',
                  render: (_, row) => (
                    <div className="flex gap-1 flex-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleGenerateQR(row.id)
                        }}
                        className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded hover:bg-purple-200"
                        title="Generate QR Code"
                      >
                        <i className="fas fa-qrcode"></i>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleScheduleMaintenance(row)
                        }}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                        title="Schedule Maintenance"
                      >
                        <i className="fas fa-tools"></i>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleScheduleCalibration(row)
                        }}
                        className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200"
                        title="Schedule Calibration"
                      >
                        <i className="fas fa-ruler"></i>
                      </button>
                    </div>
                  )
                }
              ]}
              data={filteredEquipment}
              onRowClick={(eqp) => setSelectedEquipment(eqp)}
              emptyMessage="No equipment found. Add equipment to start tracking."
              responsive={true}
            />
          </div>
        </div>

        {/* Selected Equipment Details - Improved responsive layout */}
        {selectedEquipment && (
          <div className="bg-white p-4 md:p-6 rounded-lg border card-shadow">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold">{selectedEquipment.name}</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {selectedEquipment.brand} {selectedEquipment.model} • {selectedEquipment.id}
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => handleStatusUpdate(selectedEquipment.id, 'operational')}
                  className="px-3 py-1.5 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200"
                >
                  Operational
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedEquipment.id, 'maintenance')}
                  className="px-3 py-1.5 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                >
                  Maintenance
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs md:text-sm text-gray-500">Serial Number</p>
                <p className="font-mono font-medium text-sm md:text-base truncate">{selectedEquipment.serialNumber}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-xs md:text-sm text-gray-500">Location</p>
                <p className="font-medium text-sm md:text-base">{selectedEquipment.location}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-xs md:text-sm text-gray-500">Last Maintenance</p>
                <p className="font-medium text-sm md:text-base">{selectedEquipment.lastMaintenance}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-xs md:text-sm text-gray-500">Calibration Due</p>
                <p className="font-medium text-sm md:text-base">{selectedEquipment.calibrationDue}</p>
              </div>
            </div>
          </div>
        )}

        {/* Maintenance Logs - Made more responsive */}
        <div className="bg-white rounded-lg border card-shadow overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Maintenance Logs</h3>
            <p className="text-sm text-gray-500">Recent maintenance and calibration activities</p>
          </div>
          <div className="overflow-x-auto">
            <DataTable
              columns={[
                { 
                  key: 'equipmentName', 
                  title: 'Equipment', 
                  sortable: true,
                  className: 'min-w-[120px]'
                },
                { 
                  key: 'type', 
                  title: 'Type', 
                  sortable: true,
                  className: 'hidden sm:table-cell'
                },
                { 
                  key: 'date', 
                  title: 'Date', 
                  sortable: true,
                  className: 'min-w-[90px]'
                },
                { 
                  key: 'performedBy', 
                  title: 'Performed By', 
                  sortable: true,
                  className: 'hidden md:table-cell'
                },
                { 
                  key: 'cost', 
                  title: 'Cost (₹)', 
                  sortable: true,
                  className: 'hidden sm:table-cell'
                },
                { 
                  key: 'description', 
                  title: 'Description', 
                  sortable: true,
                  className: 'hidden lg:table-cell'
                },
                { 
                  key: 'status', 
                  title: 'Status', 
                  sortable: true,
                  className: 'min-w-[90px]',
                  render: (value) => (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      value === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </span>
                  )
                }
              ]}
              data={maintenanceLogs}
              emptyMessage="No maintenance logs available."
              responsive={true}
            />
          </div>
        </div>

        {/* Quick Actions - Improved responsive grid */}
        <div className="bg-white p-4 rounded-lg border card-shadow">
          <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <button 
              className="p-3 md:p-4 border rounded-lg hover:bg-blue-50 transition-colors text-center group"
              onClick={() => alert('Generate QR codes for all equipment')}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:bg-blue-200">
                <i className="fas fa-qrcode text-blue-600 text-lg md:text-xl"></i>
              </div>
              <p className="font-medium text-sm md:text-base">Bulk QR Codes</p>
            </button>
            
            <button 
              className="p-3 md:p-4 border rounded-lg hover:bg-green-50 transition-colors text-center group"
              onClick={() => alert('Generate maintenance schedule report')}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:bg-green-200">
                <i className="fas fa-calendar-alt text-green-600 text-lg md:text-xl"></i>
              </div>
              <p className="font-medium text-sm md:text-base">Maintenance Schedule</p>
            </button>
            
            <button 
              className="p-3 md:p-4 border rounded-lg hover:bg-yellow-50 transition-colors text-center group"
              onClick={() => alert('Generate calibration due report')}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:bg-yellow-200">
                <i className="fas fa-clipboard-check text-yellow-600 text-lg md:text-xl"></i>
              </div>
              <p className="font-medium text-sm md:text-base">Calibration Report</p>
            </button>
            
            <button 
              className="p-3 md:p-4 border rounded-lg hover:bg-purple-50 transition-colors text-center group"
              onClick={() => alert('Export equipment inventory')}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:bg-purple-200">
                <i className="fas fa-file-export text-purple-600 text-lg md:text-xl"></i>
              </div>
              <p className="font-medium text-sm md:text-base">Export Inventory</p>
            </button>
          </div>
        </div>
      </div>

      {/* Add Equipment Modal - Responsive form */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Equipment"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Equipment Name *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg text-sm md:text-base"
                placeholder="e.g., Hematology Analyzer"
                value={newEquipment.name}
                onChange={(e) => setNewEquipment({...newEquipment, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Equipment Type *
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg text-sm md:text-base"
                value={newEquipment.type}
                onChange={(e) => setNewEquipment({...newEquipment, type: e.target.value})}
                required
              >
                <option value="">Select type</option>
                {equipmentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg text-sm md:text-base"
                placeholder="e.g., Sysmex, Roche, etc."
                value={newEquipment.brand}
                onChange={(e) => setNewEquipment({...newEquipment, brand: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg text-sm md:text-base"
                placeholder="e.g., XN-1000, Cobas 6000"
                value={newEquipment.model}
                onChange={(e) => setNewEquipment({...newEquipment, model: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Serial Number *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg text-sm md:text-base"
                placeholder="Unique serial number"
                value={newEquipment.serialNumber}
                onChange={(e) => setNewEquipment({...newEquipment, serialNumber: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg text-sm md:text-base"
                placeholder="e.g., Hematology Lab, Room 101"
                value={newEquipment.location}
                onChange={(e) => setNewEquipment({...newEquipment, location: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Initial Status
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg text-sm md:text-base"
                value={newEquipment.status}
                onChange={(e) => setNewEquipment({...newEquipment, status: e.target.value})}
              >
                <option value="operational">Operational</option>
                <option value="maintenance">Under Maintenance</option>
                <option value="calibration_due">Calibration Due</option>
                <option value="out_of_service">Out of Service</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Next Maintenance Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-lg text-sm md:text-base"
                value={newEquipment.nextMaintenance}
                onChange={(e) => setNewEquipment({...newEquipment, nextMaintenance: e.target.value})}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowAddModal(false)}
              className="w-full sm:w-auto justify-center"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAddEquipment}
              disabled={!newEquipment.name || !newEquipment.type || !newEquipment.brand || !newEquipment.model || !newEquipment.serialNumber || !newEquipment.location}
              className="w-full sm:w-auto justify-center"
            >
              Add Equipment
            </Button>
          </div>
        </div>
      </Modal>

      {/* Schedule Maintenance Modal - Responsive */}
      <Modal
        isOpen={showMaintenanceModal}
        onClose={() => setShowMaintenanceModal(false)}
        title="Schedule Maintenance"
      >
        {selectedEquipment && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-blue-800">
                <i className="fas fa-tools mr-2"></i>
                Schedule maintenance for: {selectedEquipment.name}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maintenance Type
                </label>
                <select className="w-full px-3 py-2 border rounded-lg text-sm md:text-base">
                  <option value="preventive">Preventive Maintenance</option>
                  <option value="corrective">Corrective Maintenance</option>
                  <option value="calibration">Calibration</option>
                  <option value="repair">Repair</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Scheduled Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg text-sm md:text-base"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assigned Technician
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg text-sm md:text-base"
                placeholder="Enter technician name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg text-sm md:text-base"
                rows="3"
                placeholder="Describe the maintenance required..."
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setShowMaintenanceModal(false)}
                className="w-full sm:w-auto justify-center"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleLogMaintenance}
                className="w-full sm:w-auto justify-center"
              >
                Schedule Maintenance
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Schedule Calibration Modal - Responsive */}
      <Modal
        isOpen={showCalibrationModal}
        onClose={() => setShowCalibrationModal(false)}
        title="Schedule Calibration"
      >
        {selectedEquipment && (
          <div className="space-y-4">
            <div className="bg-yellow-50 p-3 rounded">
              <p className="text-sm text-yellow-800">
                <i className="fas fa-ruler mr-2"></i>
                Schedule calibration for: {selectedEquipment.name}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calibration Type
                </label>
                <select className="w-full px-3 py-2 border rounded-lg text-sm md:text-base">
                  <option value="routine">Routine Calibration</option>
                  <option value="annual">Annual Calibration</option>
                  <option value="after_repair">Post-Repair Calibration</option>
                  <option value="special">Special Calibration</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calibration Due Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg text-sm md:text-base"
                  defaultValue={selectedEquipment.calibrationDue}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Calibration Standard
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg text-sm md:text-base"
                placeholder="e.g., NIST Traceable, ISO Standard"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setShowCalibrationModal(false)}
                className="w-full sm:w-auto justify-center"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleLogCalibration}
                className="w-full sm:w-auto justify-center"
              >
                Schedule Calibration
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

export default EquipmentTracking