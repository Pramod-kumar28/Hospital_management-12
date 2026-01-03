// import React, { useState, useEffect } from 'react'
// import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
// import Modal from '../../../../components/common/Modal/Modal' // Your existing modal component

// const DepartmentManagement = () => {
//   const [loading, setLoading] = useState(true)
//   const [departments, setDepartments] = useState([])
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false)
//   const [newDepartment, setNewDepartment] = useState({
//     name: '',
//     head: '',
//     description: '',
//     doctors: '',
//     staff: '',
//     icon: 'fas fa-stethoscope',
//     contact: '',
//     email: '',
//     location: ''
//   })

//   useEffect(() => {
//     loadDepartments()
//   }, [])

//   const loadDepartments = async () => {
//     setLoading(true)
//     setTimeout(() => {
//       setDepartments([
//         { id: "DEPT-001", icon:"fas fa-heartbeat", name: "Cardiology", head: "Dr. Meena Rao", description: "Heart and cardiovascular care", doctors: 5, staff: 12, contact: "+91 98765 43210", email: "cardiology@hospital.com", location: "Floor 2, Wing A" },
//         { id: "DEPT-002", icon:"fas fa-bone", name: "Orthopedics", head: "Dr. Vivek Sharma", description: "Bone and joint treatment", doctors: 4, staff: 8, contact: "+91 98765 43211", email: "orthopedics@hospital.com", location: "Floor 1, Wing B" },
//         { id: "DEPT-003", icon:"fas fa-brain", name: "Neurology", head: "Dr. Rajesh Menon", description: "Brain and nervous system care", doctors: 3, staff: 6, contact: "+91 98765 43212", email: "neurology@hospital.com", location: "Floor 3, Wing A" },
//         { id: "DEPT-004", icon:"fas fa-baby", name: "Pediatrics", head: "Dr. Anjali Desai", description: "Child healthcare", doctors: 4, staff: 10, contact: "+91 98765 43213", email: "pediatrics@hospital.com", location: "Floor 1, Wing C" },
//         { id: "DEPT-005", icon:"fa solid fa-ear-listen", name: "ENT", head: "Dr. Kavita Iyer", description: "Ear, nose and throat treatment", doctors: 2, staff: 5, contact: "+91 98765 43214", email: "ent@hospital.com", location: "Floor 2, Wing B" }
//       ])
//       setLoading(false)
//     }, 1000)
//   }

//   const handleAddDepartment = () => {
//     const department = {
//       id: `DEPT-${String(departments.length + 1).padStart(3, '0')}`,
//       icon: newDepartment.icon,
//       name: newDepartment.name,
//       head: newDepartment.head,
//       description: newDepartment.description,
//       doctors: parseInt(newDepartment.doctors),
//       staff: parseInt(newDepartment.staff),
//       contact: newDepartment.contact,
//       email: newDepartment.email,
//       location: newDepartment.location
//     }
    
//     setDepartments(prev => [department, ...prev])
//     setIsAddModalOpen(false)
//     resetForm()
//   }

//   const resetForm = () => {
//     setNewDepartment({
//       name: '',
//       head: '',
//       description: '',
//       doctors: '',
//       staff: '',
//       icon: 'fas fa-stethoscope',
//       contact: '',
//       email: '',
//       location: ''
//     })
//   }

//   const handleInputChange = (field, value) => {
//     setNewDepartment(prev => ({
//       ...prev,
//       [field]: value
//     }))
//   }

//   // Department icons data
//   const departmentIcons = [
//     { value: 'fas fa-heartbeat', label: 'Cardiology', color: 'text-red-500' },
//     { value: 'fas fa-bone', label: 'Orthopedics', color: 'text-blue-500' },
//     { value: 'fas fa-brain', label: 'Neurology', color: 'text-purple-500' },
//     { value: 'fas fa-baby', label: 'Pediatrics', color: 'text-pink-500' },
//     { value: 'fa solid fa-ear-listen', label: 'ENT', color: 'text-green-500' },
//     { value: 'fas fa-eye', label: 'Ophthalmology', color: 'text-indigo-500' },
//     { value: 'fas fa-tooth', label: 'Dentistry', color: 'text-teal-500' },
//     { value: 'fas fa-lungs', label: 'Pulmonology', color: 'text-orange-500' },
//     { value: 'fas fa-stethoscope', label: 'General', color: 'text-gray-500' },
//     { value: 'fas fa-x-ray', label: 'Radiology', color: 'text-yellow-500' },
//     { value: 'fas fa-flask', label: 'Lab', color: 'text-cyan-500' },
//     { value: 'fas fa-pills', label: 'Pharmacy', color: 'text-lime-500' }
//   ]

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="animate-fade-in">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold text-gray-700">
//           <i className="fas fa-sitemap text-blue-500 mr-2"></i>Department Management
//         </h2>
//         <button 
//           onClick={() => setIsAddModalOpen(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           <i className="fas fa-plus mr-2"></i>Add Department
//         </button>
//       </div>

//       {/* Departments Statistics */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white p-4 rounded-lg card-shadow border text-center">
//           <div className="text-2xl font-bold text-blue-600">{departments.length}</div>
//           <div className="text-sm text-gray-500">Total Departments</div>
//         </div>
//         <div className="bg-white p-4 rounded-lg card-shadow border text-center">
//           <div className="text-2xl font-bold text-green-600">
//             {departments.reduce((sum, dept) => sum + dept.doctors, 0)}
//           </div>
//           <div className="text-sm text-gray-500">Total Doctors</div>
//         </div>
//         <div className="bg-white p-4 rounded-lg card-shadow border text-center">
//           <div className="text-2xl font-bold text-purple-600">
//             {departments.reduce((sum, dept) => sum + dept.staff, 0)}
//           </div>
//           <div className="text-sm text-gray-500">Total Staff</div>
//         </div>
//         <div className="bg-white p-4 rounded-lg card-shadow border text-center">
//           <div className="text-2xl font-bold text-orange-600">
//             {Math.round(departments.reduce((sum, dept) => sum + dept.doctors, 0) / departments.length)}
//           </div>
//           <div className="text-sm text-gray-500">Avg. Doctors/Dept</div>
//         </div>
//       </div>

//       {/* Departments Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {departments.map(dept => (
//           <div key={dept.id} className="bg-white rounded-xl card-shadow border p-6 hover:shadow-lg transition-shadow">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="bg-blue-100 p-3 rounded-lg">
//                 <i className={`${dept.icon} text-blue-500 text-xl`}></i>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-blue-700">{dept.name}</h3>
//                 <p className="text-xs text-gray-500">{dept.id}</p>
//               </div>
//             </div>
            
//             <div className="space-y-2 text-sm text-gray-600 mb-4">
//               <div>
//                 <span className="font-medium">Head of Department:</span>
//                 <p className="text-gray-900">{dept.head}</p>
//               </div>
//               <div>
//                 <span className="font-medium">Description:</span>
//                 <p className="text-gray-900">{dept.description}</p>
//               </div>
//               <div className="flex justify-between">
//                 <span className="font-medium">Doctors:</span>
//                 <span className="text-blue-600 font-semibold">{dept.doctors}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="font-medium">Staff:</span>
//                 <span className="text-green-600 font-semibold">{dept.staff}</span>
//               </div>
//               {dept.location && (
//                 <div>
//                   <span className="font-medium">Location:</span>
//                   <p className="text-gray-900">{dept.location}</p>
//                 </div>
//               )}
//             </div>
            
//             <div className="flex justify-between items-center pt-4 border-t">
//               <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
//                 Active
//               </span>
//               <div className="flex gap-2">
//                 <button className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50">
//                   <i className="fas fa-edit"></i>
//                 </button>
//                 <button className="text-purple-600 hover:text-purple-800 p-2 rounded-full hover:bg-purple-50">
//                   <i className="fas fa-eye"></i>
//                 </button>
//                 <button className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50">
//                   <i className="fas fa-trash"></i>
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Add Department Modal - Defined in the same file */}
//       <Modal 
//         isOpen={isAddModalOpen} 
//         onClose={() => {
//           setIsAddModalOpen(false)
//           resetForm()
//         }} 
//         title="Add New Department"
//         size="lg"
//       >
//         <div className="space-y-6">
//           {/* Basic Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Department Name *
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={newDepartment.name}
//                 onChange={(e) => handleInputChange('name', e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                 placeholder="e.g., Cardiology"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Head of Department *
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={newDepartment.head}
//                 onChange={(e) => handleInputChange('head', e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                 placeholder="e.g., Dr. Meena Rao"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Number of Doctors *
//               </label>
//               <input
//                 type="number"
//                 required
//                 min="0"
//                 value={newDepartment.doctors}
//                 onChange={(e) => handleInputChange('doctors', e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                 placeholder="5"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Number of Staff *
//               </label>
//               <input
//                 type="number"
//                 required
//                 min="0"
//                 value={newDepartment.staff}
//                 onChange={(e) => handleInputChange('staff', e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                 placeholder="12"
//               />
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Contact Number
//               </label>
//               <input
//                 type="tel"
//                 value={newDepartment.contact}
//                 onChange={(e) => handleInputChange('contact', e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                 placeholder="+91 98765 43210"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 value={newDepartment.email}
//                 onChange={(e) => handleInputChange('email', e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                 placeholder="department@hospital.com"
//               />
//             </div>
//           </div>

//           {/* Icon Selection */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-3">
//               Department Icon *
//             </label>
//             <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
//               {departmentIcons.map(icon => (
//                 <button
//                   key={icon.value}
//                   type="button"
//                   onClick={() => handleInputChange('icon', icon.value)}
//                   className={`p-3 border rounded-lg text-center transition-all ${
//                     newDepartment.icon === icon.value 
//                       ? 'border-blue-500 bg-blue-50' 
//                       : 'border-gray-300 hover:border-blue-300'
//                   }`}
//                 >
//                   <i className={`${icon.value} ${icon.color} text-xl mb-1`}></i>
//                   <div className="text-xs text-gray-600 truncate">{icon.label}</div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Description and Location */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description *
//             </label>
//             <textarea
//               rows="3"
//               required
//               value={newDepartment.description}
//               onChange={(e) => handleInputChange('description', e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//               placeholder="Brief description of the department's services..."
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Location
//             </label>
//             <input
//               type="text"
//               value={newDepartment.location}
//               onChange={(e) => handleInputChange('location', e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//               placeholder="e.g., Floor 2, Wing A"
//             />
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-end gap-3 pt-4 border-t">
//             <button
//               type="button"
//               onClick={() => {
//                 setIsAddModalOpen(false)
//                 resetForm()
//               }}
//               className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={handleAddDepartment}
//               disabled={!newDepartment.name || !newDepartment.head || !newDepartment.description}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               <i className="fas fa-plus mr-2"></i>
//               Add Department
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   )
// }

// export default DepartmentManagement















// import React, { useState, useEffect } from 'react'
// import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
// import Modal from '../../../../components/common/Modal/Modal'

// const DepartmentManagement = () => {
//   const [loading, setLoading] = useState(true)
//   const [departments, setDepartments] = useState([])
//   const [searchTerm, setSearchTerm] = useState('')
//   const [modalState, setModalState] = useState({ add: false, edit: false, delete: false })
//   const [currentDepartment, setCurrentDepartment] = useState(null)
//   const [formData, setFormData] = useState({
//     name: '', head: '', description: '', doctors: '', staff: '', 
//     icon: 'fas fa-stethoscope', contact: '', email: '', location: ''
//   })

//   // Data constants
//   const DEPARTMENT_ICONS = [
//     { value: 'fas fa-heartbeat', label: 'Cardiology', color: 'text-red-500' },
//     { value: 'fas fa-bone', label: 'Orthopedics', color: 'text-blue-500' },
//     { value: 'fas fa-brain', label: 'Neurology', color: 'text-purple-500' },
//     { value: 'fas fa-baby', label: 'Pediatrics', color: 'text-pink-500' },
//     { value: 'fa solid fa-ear-listen', label: 'ENT', color: 'text-green-500' },
//     { value: 'fas fa-eye', label: 'Ophthalmology', color: 'text-indigo-500' },
//     { value: 'fas fa-tooth', label: 'Dentistry', color: 'text-teal-500' },
//     { value: 'fas fa-lungs', label: 'Pulmonology', color: 'text-orange-500' },
//     { value: 'fas fa-stethoscope', label: 'General', color: 'text-gray-500' },
//     { value: 'fas fa-x-ray', label: 'Radiology', color: 'text-yellow-500' },
//     { value: 'fas fa-flask', label: 'Lab', color: 'text-cyan-500' },
//     { value: 'fas fa-pills', label: 'Pharmacy', color: 'text-lime-500' }
//   ]

//   useEffect(() => { loadDepartments() }, [])

//   const loadDepartments = async () => {
//     setLoading(true)
//     setTimeout(() => {
//       setDepartments([
//         { id: "DEPT-001", icon:"fas fa-heartbeat", name: "Cardiology", head: "Dr. Meena Rao", description: "Heart and cardiovascular care", doctors: 5, staff: 12, contact: "+91 98765 43210", email: "cardiology@hospital.com", location: "Floor 2, Wing A" },
//         { id: "DEPT-002", icon:"fas fa-bone", name: "Orthopedics", head: "Dr. Vivek Sharma", description: "Bone and joint treatment", doctors: 4, staff: 8, contact: "+91 98765 43211", email: "orthopedics@hospital.com", location: "Floor 1, Wing B" },
//         { id: "DEPT-003", icon:"fas fa-brain", name: "Neurology", head: "Dr. Rajesh Menon", description: "Brain and nervous system care", doctors: 3, staff: 6, contact: "+91 98765 43212", email: "neurology@hospital.com", location: "Floor 3, Wing A" },
//         { id: "DEPT-004", icon:"fas fa-baby", name: "Pediatrics", head: "Dr. Anjali Desai", description: "Child healthcare", doctors: 4, staff: 10, contact: "+91 98765 43213", email: "pediatrics@hospital.com", location: "Floor 1, Wing C" },
//         { id: "DEPT-005", icon:"fa solid fa-ear-listen", name: "ENT", head: "Dr. Kavita Iyer", description: "Ear, nose and throat treatment", doctors: 2, staff: 5, contact: "+91 98765 43214", email: "ent@hospital.com", location: "Floor 2, Wing B" }
//       ])
//       setLoading(false)
//     }, 1000)
//   }

//   // Modal handlers
//   const openModal = (type, department = null) => {
//     setModalState(prev => ({ ...prev, [type]: true }))
//     if (type === 'edit' && department) {
//       setCurrentDepartment(department)
//       setFormData({
//         name: department.name, head: department.head, description: department.description,
//         doctors: department.doctors.toString(), staff: department.staff.toString(),
//         icon: department.icon, contact: department.contact, email: department.email,
//         location: department.location
//       })
//     } else if (type === 'delete' && department) {
//       setCurrentDepartment(department)
//     }
//   }

//   const closeModal = (type) => {
//     setModalState(prev => ({ ...prev, [type]: false }))
//     if (type !== 'delete') resetForm()
//     if (type === 'delete') setCurrentDepartment(null)
//   }

//   // Core functions
//   const handleAddDepartment = () => {
//     if (!validateForm()) return
//     const department = {
//       id: `DEPT-${String(departments.length + 1).padStart(3, '0')}`,
//       ...formData, 
//       doctors: parseInt(formData.doctors),
//       staff: parseInt(formData.staff)
//     }
//     setDepartments(prev => [department, ...prev])
//     closeModal('add')
//   }

//   const handleEditDepartment = () => {
//     if (!validateForm()) return
//     setDepartments(prev => prev.map(dept => 
//       dept.id === currentDepartment.id ? { 
//         ...dept, 
//         ...formData,
//         doctors: parseInt(formData.doctors),
//         staff: parseInt(formData.staff)
//       } : dept
//     ))
//     closeModal('edit')
//   }

//   const handleDeleteDepartment = () => {
//     setDepartments(prev => prev.filter(dept => dept.id !== currentDepartment.id))
//     closeModal('delete')
//   }

//   const resetForm = () => {
//     setFormData({
//       name: '', head: '', description: '', doctors: '', staff: '', 
//       icon: 'fas fa-stethoscope', contact: '', email: '', location: ''
//     })
//     setCurrentDepartment(null)
//   }

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }))
//   }

//   const validateForm = () => {
//     const required = ['name', 'head', 'description', 'doctors', 'staff']
//     const missing = required.find(field => !formData[field])
//     if (missing) {
//       alert(`Please fill in the ${missing} field`)
//       return false
//     }
//     return true
//   }

//   // Filter departments
//   const filteredDepartments = departments.filter(dept => 
//     !searchTerm || dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     dept.head.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   // Statistics
//   const stats = [
//     { label: 'Total Departments', value: departments.length, color: 'blue' },
//     { label: 'Total Doctors', value: departments.reduce((sum, dept) => sum + dept.doctors, 0), color: 'green' },
//     { label: 'Total Staff', value: departments.reduce((sum, dept) => sum + dept.staff, 0), color: 'purple' },
//     { label: 'Avg. Doctors/Dept', value: Math.round(departments.reduce((sum, dept) => sum + dept.doctors, 0) / departments.length), color: 'orange' }
//   ]

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="animate-fade-in">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold text-gray-700">
//           🏬 Department Management
//         </h2>
//         <button 
//           onClick={() => openModal('add')}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           <i className="fas fa-plus mr-2"></i>Add Department
//         </button>
//       </div>

//       {/* Search */}
//       <div className="bg-white p-4 rounded-lg card-shadow border mb-6">
//         <input 
//           type="text" 
//           placeholder="Search departments..." 
//           className="p-2 border rounded w-full focus:outline-none focus:border-blue-500"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Statistics */}
//       {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         {stats.map(({ label, value, color }) => (
//           <div key={label} className="bg-white p-4 rounded-lg card-shadow border text-center">
//             <div className={`text-2xl font-bold text-${color}-600`}>{value}</div>
//             <div className="text-sm text-gray-500">{label}</div>
//           </div>
//         ))}
//       </div> */}

//       {/* Statistics */}
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//   {stats.map(({ label, value, color }) => {
//     // Map color to Tailwind classes (including orange)
//     const colorMapping = {
//       'blue': {
//         border: 'border-l-blue-500',
//         bg: 'bg-blue-100',
//         iconColor: 'text-blue-500',
//         textColor: 'text-blue-600',
//         icon: 'fas fa-building'
//       },
//       'green': {
//         border: 'border-l-green-500',
//         bg: 'bg-green-100',
//         iconColor: 'text-green-500',
//         textColor: 'text-green-600',
//         icon: 'fas fa-user-md'
//       },
//       'purple': {
//         border: 'border-l-purple-500',
//         bg: 'bg-purple-100',
//         iconColor: 'text-purple-500',
//         textColor: 'text-purple-600',
//         icon: 'fas fa-users'
//       },
//       'orange': {
//         border: 'border-l-orange-500',
//         bg: 'bg-orange-100',
//         iconColor: 'text-orange-500',
//         textColor: 'text-orange-600',
//         icon: 'fas fa-chart-pie'
//       }
//     };

//     const config = colorMapping[color] || colorMapping.blue;

//     return (
//       <div 
//         key={label} 
//         className={`bg-white p-6 rounded-xl card-shadow border border-l-4 ${config.border}`}
//       >
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-sm text-gray-500">{label}</div>
//             <div className={`text-3xl font-bold ${config.textColor} mt-1`}>
//               {value}
//             </div>
//           </div>
//           <div className={`${config.bg} p-3 rounded-lg`}>
//             <i className={`${config.icon} ${config.iconColor} text-xl`}></i>
//           </div>
//         </div>
//       </div>
//     );
//   })}
// </div>

//       {/* Departments Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredDepartments.map(dept => (
//           <DepartmentCard 
//             key={dept.id} 
//             department={dept} 
//             onEdit={() => openModal('edit', dept)}
//             onView={() => alert(`View details for ${dept.name}`)}
//             onDelete={() => openModal('delete', dept)}
//           />
//         ))}
//       </div>

//       {filteredDepartments.length === 0 && (
//         <div className="text-center py-8 text-gray-500">
//           <i className="fas fa-sitemap text-blue-500 text-3xl mb-2"></i>
//           <p>No departments found matching your criteria</p>
//         </div>
//       )}

//       {/* Modals */}
//       <DepartmentFormModal
//         isOpen={modalState.add}
//         onClose={() => closeModal('add')}
//         title="Add New Department"
//         onSubmit={handleAddDepartment}
//         formData={formData}
//         onInputChange={handleInputChange}
//         submitText="Add Department"
//         submitIcon="plus"
//       />

//       <DepartmentFormModal
//         isOpen={modalState.edit}
//         onClose={() => closeModal('edit')}
//         title="Edit Department"
//         onSubmit={handleEditDepartment}
//         formData={formData}
//         onInputChange={handleInputChange}
//         submitText="Update Department"
//         submitIcon="save"
//       />

//       <DeleteConfirmationModal
//         isOpen={modalState.delete}
//         onClose={() => closeModal('delete')}
//         onConfirm={handleDeleteDepartment}
//         name={currentDepartment?.name}
//         type="Department"
//       />
//     </div>
//   )
// }

// // Sub-components
// const DepartmentCard = ({ department, onEdit, onView, onDelete }) => (
//   <div className="bg-white rounded-xl card-shadow border p-6 hover:shadow-lg transition-shadow">
//     <div className="flex items-center gap-3 mb-4">
//       <div className="bg-blue-100 p-3 rounded-lg">
//         <i className={`${department.icon} text-blue-500 text-xl`}></i>
//       </div>
//       <div>
//         <h3 className="font-semibold text-blue-700">{department.name}</h3>
//         <p className="text-xs text-gray-500">{department.id}</p>
//       </div>
//     </div>
    
//     <div className="space-y-2 text-sm text-gray-600 mb-4">
//       {[
//         { label: 'Head of Department:', value: department.head },
//         { label: 'Description:', value: department.description },
//         { label: 'Doctors:', value: department.doctors, className: 'text-blue-600 font-semibold' },
//         { label: 'Staff:', value: department.staff, className: 'text-green-600 font-semibold' },
//         ...(department.location ? [{ label: 'Location:', value: department.location }] : [])
//       ].map(({ label, value, className = 'text-gray-900' }) => (
//         <div key={label}>
//           <span className="font-medium">{label}</span>
//           <p className={className}>{value}</p>
//         </div>
//       ))}
//     </div>
    
//     <div className="flex justify-between items-center pt-4 border-t">
//       <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
//         Active
//       </span>
//       <div className="flex gap-1">
//         <ActionButton icon="edit" color="blue" onClick={onEdit} title="Edit Department" />
//         <ActionButton icon="eye" color="purple" onClick={onView} title="View Details" />
//         <ActionButton icon="trash" color="red" onClick={onDelete} title="Delete Department" />
//       </div>
//     </div>
//   </div>
// )

// const ActionButton = ({ icon, color, onClick, title }) => (
//   <button 
//     onClick={onClick}
//     className={`text-${color}-600 hover:text-${color}-800 p-2 rounded-full hover:bg-${color}-50 transition-colors`}
//     title={title}
//   >
//     <i className={`fas fa-${icon}`}></i>
//   </button>
// )

// const DepartmentFormModal = ({ isOpen, onClose, title, onSubmit, formData, onInputChange, submitText, submitIcon }) => (
//   <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
//     <DepartmentForm 
//       formData={formData} 
//       onInputChange={onInputChange}
//       onCancel={onClose}
//       onSubmit={onSubmit}
//       submitText={submitText}
//       submitIcon={submitIcon}
//     />
//   </Modal>
// )

// const DepartmentForm = ({ formData, onInputChange, onCancel, onSubmit, submitText, submitIcon }) => {
//   const DEPARTMENT_ICONS = [
//     { value: 'fas fa-heartbeat', label: 'Cardiology', color: 'text-red-500' },
//     { value: 'fas fa-bone', label: 'Orthopedics', color: 'text-blue-500' },
//     { value: 'fas fa-brain', label: 'Neurology', color: 'text-purple-500' },
//     { value: 'fas fa-baby', label: 'Pediatrics', color: 'text-pink-500' },
//     { value: 'fa solid fa-ear-listen', label: 'ENT', color: 'text-green-500' },
//     { value: 'fas fa-eye', label: 'Ophthalmology', color: 'text-indigo-500' },
//     { value: 'fas fa-tooth', label: 'Dentistry', color: 'text-teal-500' },
//     { value: 'fas fa-lungs', label: 'Pulmonology', color: 'text-orange-500' },
//     { value: 'fas fa-stethoscope', label: 'General', color: 'text-gray-500' },
//     { value: 'fas fa-x-ray', label: 'Radiology', color: 'text-yellow-500' },
//     { value: 'fas fa-flask', label: 'Lab', color: 'text-cyan-500' },
//     { value: 'fas fa-pills', label: 'Pharmacy', color: 'text-lime-500' }
//   ]

//   const formFields = [
//     { type: 'text', name: 'name', label: 'Department Name *', placeholder: 'e.g., Cardiology' },
//     { type: 'text', name: 'head', label: 'Head of Department *', placeholder: 'e.g., Dr. Meena Rao' },
//     { type: 'number', name: 'doctors', label: 'Number of Doctors *', placeholder: '5' },
//     { type: 'number', name: 'staff', label: 'Number of Staff *', placeholder: '12' },
//     { type: 'tel', name: 'contact', label: 'Contact Number', placeholder: '+91 98765 43210' },
//     { type: 'email', name: 'email', label: 'Email Address', placeholder: 'department@hospital.com' },
//   ]

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {formFields.map(field => (
//           <div key={field.name}>
//             <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
//             <input
//               type={field.type}
//               required={field.label.includes('*')}
//               min={field.type === 'number' ? '0' : undefined}
//               value={formData[field.name]}
//               onChange={(e) => onInputChange(field.name, e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//               placeholder={field.placeholder}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Icon Selection */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-3">Department Icon *</label>
//         <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
//           {DEPARTMENT_ICONS.map(icon => (
//             <button
//               key={icon.value}
//               type="button"
//               onClick={() => onInputChange('icon', icon.value)}
//               className={`p-3 border rounded-lg text-center transition-all ${
//                 formData.icon === icon.value 
//                   ? 'border-blue-500 bg-blue-50' 
//                   : 'border-gray-300 hover:border-blue-300'
//               }`}
//             >
//               <i className={`${icon.value} ${icon.color} text-xl mb-1`}></i>
//               <div className="text-xs text-gray-600 truncate">{icon.label}</div>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Description and Location */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
//         <textarea
//           rows="3"
//           required
//           value={formData.description}
//           onChange={(e) => onInputChange('description', e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//           placeholder="Brief description of the department's services..."
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//         <input
//           type="text"
//           value={formData.location}
//           onChange={(e) => onInputChange('location', e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//           placeholder="e.g., Floor 2, Wing A"
//         />
//       </div>

//       <div className="flex justify-end gap-3 pt-4 border-t">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//         >
//           Cancel
//         </button>
//         <button
//           type="button"
//           onClick={onSubmit}
//           disabled={!formData.name || !formData.head || !formData.description}
//           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         >
//           <i className={`fas fa-${submitIcon} mr-2`}></i>
//           {submitText}
//         </button>
//       </div>
//     </div>
//   )
// }

// const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, name, type }) => (
//   <Modal isOpen={isOpen} onClose={onClose} title={`Delete ${type}`} size="md">
//     <div className="text-center p-6">
//       <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
//         <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
//       </div>
//       <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirm Deletion</h3>
//       <p className="text-gray-600 mb-6">
//         Are you sure you want to delete <span className="font-semibold">{name}</span>? 
//         This action cannot be undone.
//       </p>
//       <div className="flex justify-center gap-3">
//         <button onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
//           Cancel
//         </button>
//         <button onClick={onConfirm} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
//           <i className="fas fa-trash mr-2"></i>Delete {type}
//         </button>
//       </div>
//     </div>
//   </Modal>
// )

// export default DepartmentManagement































// import React, { useState, useEffect } from 'react'
// import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
// import Modal from '../../../../components/common/Modal/Modal'

// const DepartmentManagement = () => {
//   const [loading, setLoading] = useState(true)
//   const [departments, setDepartments] = useState([])
//   const [searchTerm, setSearchTerm] = useState('')
//   const [modalState, setModalState] = useState({ add: false, edit: false, delete: false })
//   const [currentDepartment, setCurrentDepartment] = useState(null)
//   const [formData, setFormData] = useState({
//     name: '', head: '', description: '', doctors: '', staff: '', 
//     icon: 'fas fa-stethoscope', contact: '', email: '', location: ''
//   })
//   const [activeFilter, setActiveFilter] = useState('all')

//   // Data constants
//   const DEPARTMENT_ICONS = [
//     { value: 'fas fa-heartbeat', label: 'Cardiology', color: 'text-red-500', bgColor: 'bg-red-50' },
//     { value: 'fas fa-bone', label: 'Orthopedics', color: 'text-blue-500', bgColor: 'bg-blue-50' },
//     { value: 'fas fa-brain', label: 'Neurology', color: 'text-purple-500', bgColor: 'bg-purple-50' },
//     { value: 'fas fa-baby', label: 'Pediatrics', color: 'text-pink-500', bgColor: 'bg-pink-50' },
//     { value: 'fa solid fa-ear-listen', label: 'ENT', color: 'text-green-500', bgColor: 'bg-green-50' },
//     { value: 'fas fa-eye', label: 'Ophthalmology', color: 'text-indigo-500', bgColor: 'bg-indigo-50' },
//     { value: 'fas fa-tooth', label: 'Dentistry', color: 'text-teal-500', bgColor: 'bg-teal-50' },
//     { value: 'fas fa-lungs', label: 'Pulmonology', color: 'text-orange-500', bgColor: 'bg-orange-50' },
//     { value: 'fas fa-stethoscope', label: 'General', color: 'text-gray-500', bgColor: 'bg-gray-50' },
//     { value: 'fas fa-x-ray', label: 'Radiology', color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
//     { value: 'fas fa-flask', label: 'Lab', color: 'text-cyan-500', bgColor: 'bg-cyan-50' },
//     { value: 'fas fa-pills', label: 'Pharmacy', color: 'text-lime-500', bgColor: 'bg-lime-50' }
//   ]

//   useEffect(() => { loadDepartments() }, [])

//   const loadDepartments = async () => {
//     setLoading(true)
//     setTimeout(() => {
//       setDepartments([
//         { id: "DEPT-001", icon:"fas fa-heartbeat", name: "Cardiology", head: "Dr. Meena Rao", description: "Heart and cardiovascular care", doctors: 5, staff: 12, contact: "+91 98765 43210", email: "cardiology@hospital.com", location: "Floor 2, Wing A", status: "active" },
//         { id: "DEPT-002", icon:"fas fa-bone", name: "Orthopedics", head: "Dr. Vivek Sharma", description: "Bone and joint treatment", doctors: 4, staff: 8, contact: "+91 98765 43211", email: "orthopedics@hospital.com", location: "Floor 1, Wing B", status: "active" },
//         { id: "DEPT-003", icon:"fas fa-brain", name: "Neurology", head: "Dr. Rajesh Menon", description: "Brain and nervous system care", doctors: 3, staff: 6, contact: "+91 98765 43212", email: "neurology@hospital.com", location: "Floor 3, Wing A", status: "maintenance" },
//         { id: "DEPT-004", icon:"fas fa-baby", name: "Pediatrics", head: "Dr. Anjali Desai", description: "Child healthcare", doctors: 4, staff: 10, contact: "+91 98765 43213", email: "pediatrics@hospital.com", location: "Floor 1, Wing C", status: "active" },
//         { id: "DEPT-005", icon:"fa solid fa-ear-listen", name: "ENT", head: "Dr. Kavita Iyer", description: "Ear, nose and throat treatment", doctors: 2, staff: 5, contact: "+91 98765 43214", email: "ent@hospital.com", location: "Floor 2, Wing B", status: "active" },
//         { id: "DEPT-006", icon:"fas fa-tooth", name: "Dentistry", head: "Dr. Arjun Mehta", description: "Dental care and oral surgery", doctors: 3, staff: 7, contact: "+91 98765 43215", email: "dentistry@hospital.com", location: "Floor 3, Wing C", status: "active" }
//       ])
//       setLoading(false)
//     }, 1000)
//   }

//   // Modal handlers
//   const openModal = (type, department = null) => {
//     setModalState(prev => ({ ...prev, [type]: true }))
//     if (type === 'edit' && department) {
//       setCurrentDepartment(department)
//       setFormData({
//         name: department.name, head: department.head, description: department.description,
//         doctors: department.doctors.toString(), staff: department.staff.toString(),
//         icon: department.icon, contact: department.contact, email: department.email,
//         location: department.location
//       })
//     } else if (type === 'delete' && department) {
//       setCurrentDepartment(department)
//     }
//   }

//   const closeModal = (type) => {
//     setModalState(prev => ({ ...prev, [type]: false }))
//     if (type !== 'delete') resetForm()
//     if (type === 'delete') setCurrentDepartment(null)
//   }

//   // Core functions
//   const handleAddDepartment = () => {
//     if (!validateForm()) return
//     const department = {
//       id: `DEPT-${String(departments.length + 1).padStart(3, '0')}`,
//       ...formData, 
//       doctors: parseInt(formData.doctors),
//       staff: parseInt(formData.staff),
//       status: 'active'
//     }
//     setDepartments(prev => [department, ...prev])
//     closeModal('add')
//   }

//   const handleEditDepartment = () => {
//     if (!validateForm()) return
//     setDepartments(prev => prev.map(dept => 
//       dept.id === currentDepartment.id ? { 
//         ...dept, 
//         ...formData,
//         doctors: parseInt(formData.doctors),
//         staff: parseInt(formData.staff)
//       } : dept
//     ))
//     closeModal('edit')
//   }

//   const handleDeleteDepartment = () => {
//     setDepartments(prev => prev.filter(dept => dept.id !== currentDepartment.id))
//     closeModal('delete')
//   }

//   const resetForm = () => {
//     setFormData({
//       name: '', head: '', description: '', doctors: '', staff: '', 
//       icon: 'fas fa-stethoscope', contact: '', email: '', location: ''
//     })
//     setCurrentDepartment(null)
//   }

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }))
//   }

//   const validateForm = () => {
//     const required = ['name', 'head', 'description', 'doctors', 'staff']
//     const missing = required.find(field => !formData[field])
//     if (missing) {
//       alert(`Please fill in the ${missing} field`)
//       return false
//     }
//     return true
//   }

//   // Filter departments
//   const filteredDepartments = departments.filter(dept => {
//     const matchesSearch = !searchTerm || 
//       dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       dept.head.toLowerCase().includes(searchTerm.toLowerCase())
    
//     const matchesFilter = activeFilter === 'all' || dept.status === activeFilter
    
//     return matchesSearch && matchesFilter
//   })

//   // Statistics
//   const stats = [
//     { 
//       label: 'Total Departments', 
//       value: departments.length, 
//       color: 'blue',
//       icon: 'fas fa-building',
//       change: '+2 this month'
//     },
//     { 
//       label: 'Total Doctors', 
//       value: departments.reduce((sum, dept) => sum + dept.doctors, 0), 
//       color: 'green',
//       icon: 'fas fa-user-md',
//       change: '+5 this month'
//     },
//     { 
//       label: 'Total Staff', 
//       value: departments.reduce((sum, dept) => sum + dept.staff, 0), 
//       color: 'purple',
//       icon: 'fas fa-users',
//       change: '+8 this month'
//     },
//     { 
//       label: 'Avg. Doctors/Dept', 
//       value: Math.round(departments.reduce((sum, dept) => sum + dept.doctors, 0) / departments.length), 
//       color: 'orange',
//       icon: 'fas fa-chart-pie',
//       change: 'Stable'
//     }
//   ]

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="animate-fade-in">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
//           <div>
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
//               🏬 Department Management
//             </h2>
//             <p className="text-gray-500 mt-1">Manage and organize all hospital departments</p>
//           </div>
//           <button 
//             onClick={() => openModal('add')}
//             className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-medium"
//           >
//             <i className="fas fa-plus-circle text-lg"></i>
//             <span>Add New Department</span>
//           </button>
//         </div>
//       </div>

//       {/* Search and Filter Bar */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1 relative">
//             <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
//             <input 
//               type="text" 
//               placeholder="Search departments by name or head..." 
//               className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="flex gap-2">
//             {['all', 'active', 'maintenance'].map((filter) => (
//               <button
//                 key={filter}
//                 onClick={() => setActiveFilter(filter)}
//                 className={`px-4 py-3 rounded-xl font-medium transition-all ${activeFilter === filter 
//                   ? 'bg-blue-600 text-white shadow-md' 
//                   : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                 }`}
//               >
//                 {filter.charAt(0).toUpperCase() + filter.slice(1)}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Statistics */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         {stats.map(({ label, value, color, icon, change }) => {
//           const colorConfigs = {
//             blue: { bg: 'bg-blue-50', text: 'text-blue-700', iconBg: 'bg-blue-100', iconColor: 'text-blue-500' },
//             green: { bg: 'bg-green-50', text: 'text-green-700', iconBg: 'bg-green-100', iconColor: 'text-green-500' },
//             purple: { bg: 'bg-purple-50', text: 'text-purple-700', iconBg: 'bg-purple-100', iconColor: 'text-purple-500' },
//             orange: { bg: 'bg-orange-50', text: 'text-orange-700', iconBg: 'bg-orange-100', iconColor: 'text-orange-500' },
//           }
          
//           const config = colorConfigs[color] || colorConfigs.blue

//           return (
//             <div 
//               key={label} 
//               className={`${config.bg} p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300`}
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className={`${config.iconBg} p-3 rounded-xl`}>
//                   <i className={`${icon} ${config.iconColor} text-xl`}></i>
//                 </div>
//                 <span className="text-sm font-medium px-3 py-1 bg-white rounded-full border border-gray-200">
//                   {change}
//                 </span>
//               </div>
//               <div className={`text-4xl font-bold ${config.text} mb-2`}>{value}</div>
//               <div className="text-gray-600">{label}</div>
//               <div className="mt-4 h-1 w-full bg-white rounded-full overflow-hidden">
//                 <div className={`h-full ${config.iconBg} rounded-full`} style={{ width: '75%' }}></div>
//               </div>
//             </div>
//           )
//         })}
//       </div>

//       {/* Departments Grid */}
//       <div className="mb-6 flex items-center justify-between">
//         <h3 className="text-xl font-semibold text-gray-800">All Departments ({filteredDepartments.length})</h3>
//         <div className="flex items-center gap-2 text-gray-500">
//           <i className="fas fa-info-circle"></i>
//           <span className="text-sm">Click on any department to view details</span>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredDepartments.map(dept => (
//           <DepartmentCard 
//             key={dept.id} 
//             department={dept} 
//             onEdit={() => openModal('edit', dept)}
//             onView={() => alert(`View details for ${dept.name}`)}
//             onDelete={() => openModal('delete', dept)}
//           />
//         ))}
//       </div>

//       {filteredDepartments.length === 0 && (
//         <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-200">
//           <div className="w-20 h-20 mx-auto mb-6 bg-blue-50 rounded-full flex items-center justify-center">
//             <i className="fas fa-sitemap text-blue-500 text-3xl"></i>
//           </div>
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">No departments found</h3>
//           <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
//           <button 
//             onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
//             className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-2 mx-auto"
//           >
//             <i className="fas fa-redo"></i>
//             Reset filters
//           </button>
//         </div>
//       )}

//       {/* Modals */}
//       <DepartmentFormModal
//         isOpen={modalState.add}
//         onClose={() => closeModal('add')}
//         title="Add New Department"
//         onSubmit={handleAddDepartment}
//         formData={formData}
//         onInputChange={handleInputChange}
//         submitText="Create Department"
//         submitIcon="plus-circle"
//       />

//       <DepartmentFormModal
//         isOpen={modalState.edit}
//         onClose={() => closeModal('edit')}
//         title="Edit Department"
//         onSubmit={handleEditDepartment}
//         formData={formData}
//         onInputChange={handleInputChange}
//         submitText="Save Changes"
//         submitIcon="save"
//       />

//       <DeleteConfirmationModal
//         isOpen={modalState.delete}
//         onClose={() => closeModal('delete')}
//         onConfirm={handleDeleteDepartment}
//         name={currentDepartment?.name}
//         type="Department"
//       />
//     </div>
//   )
// }

// // Enhanced Sub-components
// const DepartmentCard = ({ department, onEdit, onView, onDelete }) => {
//   const statusConfig = {
//     active: { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: 'fas fa-check-circle' },
//     maintenance: { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', icon: 'fas fa-tools' },
//     inactive: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: 'fas fa-pause-circle' }
//   }
  
//   const status = statusConfig[department.status] || statusConfig.active
  
//   return (
//     <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
//       {/* Header with Icon and Status */}
//       <div className="flex items-center justify-between mb-5">
//         <div className="flex items-center gap-4">
//           <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl group-hover:scale-105 transition-transform">
//             <i className={`${department.icon} text-blue-600 text-2xl`}></i>
//           </div>
//           <div>
//             <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-700 transition-colors">
//               {department.name}
//             </h3>
//             <p className="text-sm text-gray-500">{department.id}</p>
//           </div>
//         </div>
//         <div className={`px-3 py-1.5 rounded-full text-xs font-medium border ${status.bg} ${status.color} ${status.border}`}>
//           <i className={`${status.icon} mr-1.5`}></i>
//           {department.status}
//         </div>
//       </div>
      
//       {/* Department Details */}
//       <div className="space-y-4 mb-6">
//         <div className="flex items-center gap-3 text-gray-600">
//           <div className="w-8">
//             <i className="fas fa-user-md text-blue-500"></i>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Head of Department</p>
//             <p className="font-medium">{department.head}</p>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-3 text-gray-600">
//           <div className="w-8">
//             <i className="fas fa-file-alt text-blue-500"></i>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Description</p>
//             <p className="font-medium line-clamp-1">{department.description}</p>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
//           <div className="text-center">
//             <div className="text-2xl font-bold text-blue-600">{department.doctors}</div>
//             <div className="text-xs text-gray-500">Doctors</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-green-600">{department.staff}</div>
//             <div className="text-xs text-gray-500">Staff</div>
//           </div>
//         </div>

//         {department.location && (
//           <div className="flex items-center gap-3 text-gray-600">
//             <div className="w-8">
//               <i className="fas fa-map-marker-alt text-blue-500"></i>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Location</p>
//               <p className="font-medium">{department.location}</p>
//             </div>
//           </div>
//         )}
//       </div>
      
//       {/* Action Buttons */}
//       <div className="flex justify-between items-center pt-5 border-t border-gray-100">
//         <button
//           onClick={onView}
//           className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-2 px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors"
//         >
//           <i className="fas fa-external-link-alt"></i>
//           View Details
//         </button>
//         <div className="flex gap-1">
//           <ActionButton 
//             icon="edit" 
//             color="blue" 
//             onClick={onEdit} 
//             title="Edit" 
//             variant="outline"
//           />
//           <ActionButton 
//             icon="trash" 
//             color="red" 
//             onClick={onDelete} 
//             title="Delete" 
//             variant="outline"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// const ActionButton = ({ icon, color, onClick, title, variant = 'solid' }) => {
//   const baseClasses = `p-2.5 rounded-lg transition-all duration-200 flex items-center justify-center ${
//     variant === 'outline' 
//       ? `border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-${color}-300 hover:text-${color}-600`
//       : `bg-${color}-100 text-${color}-600 hover:bg-${color}-200`
//   }`
  
//   return (
//     <button 
//       onClick={onClick}
//       className={baseClasses}
//       title={title}
//     >
//       <i className={`fas fa-${icon}`}></i>
//     </button>
//   )
// }

// const DepartmentFormModal = ({ isOpen, onClose, title, onSubmit, formData, onInputChange, submitText, submitIcon }) => (
//   <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
//     <DepartmentForm 
//       formData={formData} 
//       onInputChange={onInputChange}
//       onCancel={onClose}
//       onSubmit={onSubmit}
//       submitText={submitText}
//       submitIcon={submitIcon}
//     />
//   </Modal>
// )

// const DepartmentForm = ({ formData, onInputChange, onCancel, onSubmit, submitText, submitIcon }) => {
//   const DEPARTMENT_ICONS = [
//     { value: 'fas fa-heartbeat', label: 'Cardiology', color: 'text-red-500', bgColor: 'bg-red-50' },
//     { value: 'fas fa-bone', label: 'Orthopedics', color: 'text-blue-500', bgColor: 'bg-blue-50' },
//     { value: 'fas fa-brain', label: 'Neurology', color: 'text-purple-500', bgColor: 'bg-purple-50' },
//     { value: 'fas fa-baby', label: 'Pediatrics', color: 'text-pink-500', bgColor: 'bg-pink-50' },
//     { value: 'fa solid fa-ear-listen', label: 'ENT', color: 'text-green-500', bgColor: 'bg-green-50' },
//     { value: 'fas fa-eye', label: 'Ophthalmology', color: 'text-indigo-500', bgColor: 'bg-indigo-50' },
//     { value: 'fas fa-tooth', label: 'Dentistry', color: 'text-teal-500', bgColor: 'bg-teal-50' },
//     { value: 'fas fa-lungs', label: 'Pulmonology', color: 'text-orange-500', bgColor: 'bg-orange-50' },
//     { value: 'fas fa-stethoscope', label: 'General', color: 'text-gray-500', bgColor: 'bg-gray-50' },
//     { value: 'fas fa-x-ray', label: 'Radiology', color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
//     { value: 'fas fa-flask', label: 'Lab', color: 'text-cyan-500', bgColor: 'bg-cyan-50' },
//     { value: 'fas fa-pills', label: 'Pharmacy', color: 'text-lime-500', bgColor: 'bg-lime-50' }
//   ]

//   const formFields = [
//     { type: 'text', name: 'name', label: 'Department Name *', placeholder: 'e.g., Cardiology', icon: 'fas fa-building' },
//     { type: 'text', name: 'head', label: 'Head of Department *', placeholder: 'e.g., Dr. Meena Rao', icon: 'fas fa-user-md' },
//     { type: 'number', name: 'doctors', label: 'Number of Doctors *', placeholder: '5', icon: 'fas fa-users' },
//     { type: 'number', name: 'staff', label: 'Number of Staff *', placeholder: '12', icon: 'fas fa-user-nurse' },
//     { type: 'tel', name: 'contact', label: 'Contact Number', placeholder: '+91 98765 43210', icon: 'fas fa-phone' },
//     { type: 'email', name: 'email', label: 'Email Address', placeholder: 'department@hospital.com', icon: 'fas fa-envelope' },
//   ]

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//         {formFields.map(field => (
//           <div key={field.name} className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
//             <div className="relative">
//               <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                 <i className={field.icon}></i>
//               </div>
//               <input
//                 type={field.type}
//                 required={field.label.includes('*')}
//                 min={field.type === 'number' ? '0' : undefined}
//                 value={formData[field.name]}
//                 onChange={(e) => onInputChange(field.name, e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 placeholder={field.placeholder}
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Icon Selection */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-3">Department Icon *</label>
//         <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
//           {DEPARTMENT_ICONS.map(icon => (
//             <button
//               key={icon.value}
//               type="button"
//               onClick={() => onInputChange('icon', icon.value)}
//               className={`flex flex-col items-center p-3 border rounded-xl transition-all duration-200 ${
//                 formData.icon === icon.value 
//                   ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200 ring-opacity-50' 
//                   : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
//               }`}
//             >
//               <div className={`${icon.bgColor} p-2 rounded-lg mb-2`}>
//                 <i className={`${icon.value} ${icon.color} text-lg`}></i>
//               </div>
//               <div className="text-xs text-gray-600 truncate w-full text-center">{icon.label}</div>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Description and Location */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
//         <div className="relative">
//           <div className="absolute left-3 top-3 text-gray-400">
//             <i className="fas fa-file-alt"></i>
//           </div>
//           <textarea
//             rows="3"
//             required
//             value={formData.description}
//             onChange={(e) => onInputChange('description', e.target.value)}
//             className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="Brief description of the department's services..."
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
//         <div className="relative">
//           <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//             <i className="fas fa-map-marker-alt"></i>
//           </div>
//           <input
//             type="text"
//             value={formData.location}
//             onChange={(e) => onInputChange('location', e.target.value)}
//             className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="e.g., Floor 2, Wing A"
//           />
//         </div>
//       </div>

//       <div className="flex justify-end gap-3 pt-6 border-t">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
//         >
//           Cancel
//         </button>
//         <button
//           type="button"
//           onClick={onSubmit}
//           disabled={!formData.name || !formData.head || !formData.description}
//           className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg"
//         >
//           <i className={`fas fa-${submitIcon} mr-2`}></i>
//           {submitText}
//         </button>
//       </div>
//     </div>
//   )
// }

// const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, name, type }) => (
//   <Modal isOpen={isOpen} onClose={onClose} title={`Delete ${type}`} size="md">
//     <div className="text-center p-8">
//       <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-full flex items-center justify-center">
//         <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
//       </div>
//       <h3 className="text-xl font-bold text-gray-800 mb-3">Are you sure?</h3>
//       <p className="text-gray-600 mb-2">
//         You are about to delete <span className="font-semibold text-gray-800">{name}</span>
//       </p>
//       <p className="text-sm text-gray-500 mb-8">
//         This action will permanently remove the department and all associated data.
//       </p>
//       <div className="flex justify-center gap-4">
//         <button 
//           onClick={onClose}
//           className="px-8 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
//         >
//           Cancel
//         </button>
//         <button 
//           onClick={onConfirm}
//           className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
//         >
//           <i className="fas fa-trash mr-2"></i>
//           Delete Permanently
//         </button>
//       </div>
//     </div>
//   </Modal>
// )

// export default DepartmentManagement




















import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import Modal from '../../../../components/common/Modal/Modal'

const DepartmentManagement = () => {
  const [loading, setLoading] = useState(true)
  const [departments, setDepartments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [modalState, setModalState] = useState({ add: false, edit: false, delete: false })
  const [currentDepartment, setCurrentDepartment] = useState(null)
  const [formData, setFormData] = useState({
    name: '', head: '', description: '', doctors: '', staff: '', 
    icon: 'fas fa-stethoscope', contact: '', email: '', location: ''
  })
  const [activeFilter, setActiveFilter] = useState('all')

  // Data constants
  const DEPARTMENT_ICONS = [
    { value: 'fas fa-heartbeat', label: 'Cardiology', color: 'text-red-500', bgColor: 'bg-red-50' },
    { value: 'fas fa-bone', label: 'Orthopedics', color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { value: 'fas fa-brain', label: 'Neurology', color: 'text-purple-500', bgColor: 'bg-purple-50' },
    { value: 'fas fa-baby', label: 'Pediatrics', color: 'text-pink-500', bgColor: 'bg-pink-50' },
    { value: 'fa solid fa-ear-listen', label: 'ENT', color: 'text-green-500', bgColor: 'bg-green-50' },
    { value: 'fas fa-eye', label: 'Ophthalmology', color: 'text-indigo-500', bgColor: 'bg-indigo-50' },
    { value: 'fas fa-tooth', label: 'Dentistry', color: 'text-teal-500', bgColor: 'bg-teal-50' },
    { value: 'fas fa-lungs', label: 'Pulmonology', color: 'text-orange-500', bgColor: 'bg-orange-50' },
    { value: 'fas fa-stethoscope', label: 'General', color: 'text-gray-500', bgColor: 'bg-gray-50' },
    { value: 'fas fa-x-ray', label: 'Radiology', color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
    { value: 'fas fa-flask', label: 'Lab', color: 'text-cyan-500', bgColor: 'bg-cyan-50' },
    { value: 'fas fa-pills', label: 'Pharmacy', color: 'text-lime-500', bgColor: 'bg-lime-50' }
  ]

  useEffect(() => { loadDepartments() }, [])

  const loadDepartments = async () => {
    setLoading(true)
    setTimeout(() => {
      setDepartments([
        { id: "DEPT-001", icon:"fas fa-heartbeat", name: "Cardiology", head: "Dr. Meena Rao", description: "Heart and cardiovascular care including surgeries and treatments", doctors: 5, staff: 12, contact: "+91 98765 43210", email: "cardiology@hospital.com", location: "Floor 2, Wing A", status: "active" },
        { id: "DEPT-002", icon:"fas fa-bone", name: "Orthopedics", head: "Dr. Vivek Sharma", description: "Bone and joint treatment with modern facilities", doctors: 4, staff: 8, contact: "+91 98765 43211", email: "orthopedics@hospital.com", location: "Floor 1, Wing B", status: "active" },
        { id: "DEPT-003", icon:"fas fa-brain", name: "Neurology", head: "Dr. Rajesh Menon", description: "Advanced brain and nervous system care", doctors: 3, staff: 6, contact: "+91 98765 43212", email: "neurology@hospital.com", location: "Floor 3, Wing A", status: "maintenance" },
        { id: "DEPT-004", icon:"fas fa-baby", name: "Pediatrics", head: "Dr. Anjali Desai", description: "Comprehensive child healthcare services", doctors: 4, staff: 10, contact: "+91 98765 43213", email: "pediatrics@hospital.com", location: "Floor 1, Wing C", status: "active" },
        { id: "DEPT-005", icon:"fa solid fa-ear-listen", name: "ENT", head: "Dr. Kavita Iyer", description: "Ear, nose and throat specialist treatment", doctors: 2, staff: 5, contact: "+91 98765 43214", email: "ent@hospital.com", location: "Floor 2, Wing B", status: "active" },
        { id: "DEPT-006", icon:"fas fa-tooth", name: "Dentistry", head: "Dr. Arjun Mehta", description: "Dental care and oral surgery specialists", doctors: 3, staff: 7, contact: "+91 98765 43215", email: "dentistry@hospital.com", location: "Floor 3, Wing C", status: "active" }
      ])
      setLoading(false)
    }, 1000)
  }

  // Modal handlers
  const openModal = (type, department = null) => {
    setModalState(prev => ({ ...prev, [type]: true }))
    if (type === 'edit' && department) {
      setCurrentDepartment(department)
      setFormData({
        name: department.name, head: department.head, description: department.description,
        doctors: department.doctors.toString(), staff: department.staff.toString(),
        icon: department.icon, contact: department.contact, email: department.email,
        location: department.location
      })
    } else if (type === 'delete' && department) {
      setCurrentDepartment(department)
    }
  }

  const closeModal = (type) => {
    setModalState(prev => ({ ...prev, [type]: false }))
    if (type !== 'delete') resetForm()
    if (type === 'delete') setCurrentDepartment(null)
  }

  // Core functions
  const handleAddDepartment = () => {
    if (!validateForm()) return
    const department = {
      id: `DEPT-${String(departments.length + 1).padStart(3, '0')}`,
      ...formData, 
      doctors: parseInt(formData.doctors),
      staff: parseInt(formData.staff),
      status: 'active'
    }
    setDepartments(prev => [department, ...prev])
    closeModal('add')
  }

  const handleEditDepartment = () => {
    if (!validateForm()) return
    setDepartments(prev => prev.map(dept => 
      dept.id === currentDepartment.id ? { 
        ...dept, 
        ...formData,
        doctors: parseInt(formData.doctors),
        staff: parseInt(formData.staff)
      } : dept
    ))
    closeModal('edit')
  }

  const handleDeleteDepartment = () => {
    setDepartments(prev => prev.filter(dept => dept.id !== currentDepartment.id))
    closeModal('delete')
  }

  const resetForm = () => {
    setFormData({
      name: '', head: '', description: '', doctors: '', staff: '', 
      icon: 'fas fa-stethoscope', contact: '', email: '', location: ''
    })
    setCurrentDepartment(null)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    const required = ['name', 'head', 'description', 'doctors', 'staff']
    const missing = required.find(field => !formData[field])
    if (missing) {
      alert(`Please fill in the ${missing} field`)
      return false
    }
    return true
  }

  // Filter departments
  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = !searchTerm || 
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = activeFilter === 'all' || dept.status === activeFilter
    
    return matchesSearch && matchesFilter
  })

  // Statistics
  const stats = [
    { 
      label: 'Total Departments', 
      value: departments.length, 
      color: 'blue',
      icon: 'fas fa-building',
      change: '+2 this month'
    },
    { 
      label: 'Total Doctors', 
      value: departments.reduce((sum, dept) => sum + dept.doctors, 0), 
      color: 'green',
      icon: 'fas fa-user-md',
      change: '+5 this month'
    },
    { 
      label: 'Total Staff', 
      value: departments.reduce((sum, dept) => sum + dept.staff, 0), 
      color: 'purple',
      icon: 'fas fa-users',
      change: '+8 this month'
    },
    { 
      label: 'Avg. Doctors/Dept', 
      value: Math.round(departments.reduce((sum, dept) => sum + dept.doctors, 0) / departments.length), 
      color: 'orange',
      icon: 'fas fa-chart-pie',
      change: 'Stable'
    }
  ]

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              🏬 Department Management
            </h2>
            <p className="text-gray-500 mt-1">Manage and organize all hospital departments</p>
          </div>
          <button 
            onClick={() => openModal('add')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-medium"
          >
            <i className="fas fa-plus-circle text-lg"></i>
            <span>Add New Department</span>
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              placeholder="Search departments by name or head..." 
              className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'maintenance'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${activeFilter === filter 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics - KEEPING THE BEAUTIFUL REDESIGNED CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map(({ label, value, color, icon, change }) => {
          const colorConfigs = {
            blue: { bg: 'bg-blue-50', text: 'text-blue-700', iconBg: 'bg-blue-100', iconColor: 'text-blue-500' },
            green: { bg: 'bg-green-50', text: 'text-green-700', iconBg: 'bg-green-100', iconColor: 'text-green-500' },
            purple: { bg: 'bg-purple-50', text: 'text-purple-700', iconBg: 'bg-purple-100', iconColor: 'text-purple-500' },
            orange: { bg: 'bg-orange-50', text: 'text-orange-700', iconBg: 'bg-orange-100', iconColor: 'text-orange-500' },
          }
          
          const config = colorConfigs[color] || colorConfigs.blue

          return (
            <div 
              key={label} 
              className={`${config.bg} p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${config.iconBg} p-3 rounded-xl`}>
                  <i className={`${icon} ${config.iconColor} text-xl`}></i>
                </div>
                <span className="text-sm font-medium px-3 py-1 bg-white rounded-full border border-gray-200">
                  {change}
                </span>
              </div>
              <div className={`text-4xl font-bold ${config.text} mb-2`}>{value}</div>
              <div className="text-gray-600">{label}</div>
              <div className="mt-4 h-1 w-full bg-white rounded-full overflow-hidden">
                <div className={`h-full ${config.iconBg} rounded-full`} style={{ width: '75%' }}></div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Department Cards Title */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">All Departments ({filteredDepartments.length})</h3>
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fas fa-info-circle"></i>
          <span className="text-sm">Click on any department to view details</span>
        </div>
      </div>

      {/* Departments Grid - REVERTED TO CLEANER, COMPACT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map(dept => (
          <DepartmentCard 
            key={dept.id} 
            department={dept} 
            onEdit={() => openModal('edit', dept)}
            onView={() => alert(`View details for ${dept.name}`)}
            onDelete={() => openModal('delete', dept)}
          />
        ))}
      </div>

      {filteredDepartments.length === 0 && (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-200">
          <div className="w-20 h-20 mx-auto mb-6 bg-blue-50 rounded-full flex items-center justify-center">
            <i className="fas fa-sitemap text-blue-500 text-3xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No departments found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
          <button 
            onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-2 mx-auto"
          >
            <i className="fas fa-redo"></i>
            Reset filters
          </button>
        </div>
      )}

      {/* Modals */}
      <DepartmentFormModal
        isOpen={modalState.add}
        onClose={() => closeModal('add')}
        title="Add New Department"
        onSubmit={handleAddDepartment}
        formData={formData}
        onInputChange={handleInputChange}
        submitText="Create Department"
        submitIcon="plus-circle"
        onCancel={() => closeModal('add')}
      />

      <DepartmentFormModal
        isOpen={modalState.edit}
        onClose={() => closeModal('edit')}
        title="Edit Department"
        onSubmit={handleEditDepartment}
        formData={formData}
        onInputChange={handleInputChange}
        submitText="Save Changes"
        submitIcon="save"
        onCancel={() => closeModal('edit')}
      />

      <DeleteConfirmationModal
        isOpen={modalState.delete}
        onClose={() => closeModal('delete')}
        onConfirm={handleDeleteDepartment}
        name={currentDepartment?.name}
        type="Department"
      />
    </div>
  )
}

// CLEAN, COMPACT Department Card Component (Like Original)
const DepartmentCard = ({ department, onEdit, onView, onDelete }) => {
  const statusConfig = {
    active: { color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-200', icon: 'fas fa-check-circle' },
    maintenance: { color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-200', icon: 'fas fa-tools' },
    inactive: { color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200', icon: 'fas fa-pause-circle' }
  }
  
  const status = statusConfig[department.status] || statusConfig.active
  
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-100 p-3 rounded-lg">
          <i className={`${department.icon} text-blue-500 text-xl`}></i>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-blue-700">{department.name}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${status.bg} ${status.color}`}>
              {department.status}
            </span>
          </div>
          <p className="text-xs text-gray-500">{department.id}</p>
        </div>
      </div>
      
      <div className="space-y-3 text-sm text-gray-600 mb-4">
        <div>
          <span className="font-medium text-gray-700">Head:</span>
          <p className="text-gray-900">{department.head}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Description:</span>
          <p className="text-gray-900 line-clamp-2">{department.description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-blue-50 p-2 rounded-lg text-center">
          <div className="text-lg font-bold text-blue-600">{department.doctors}</div>
          <div className="text-xs text-gray-500">Doctors</div>
        </div>
        <div className="bg-green-50 p-2 rounded-lg text-center">
          <div className="text-lg font-bold text-green-600">{department.staff}</div>
          <div className="text-xs text-gray-500">Staff</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <i className="fas fa-map-marker-alt text-blue-500"></i>
          <span>{department.location}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors"
            title="Edit Department"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            onClick={onView}
            className="text-purple-600 hover:text-purple-800 p-2 rounded-full hover:bg-purple-50 transition-colors"
            title="View Details"
          >
            <i className="fas fa-eye"></i>
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
            title="Delete Department"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

// DepartmentFormModal component
const DepartmentFormModal = ({ 
  isOpen, 
  onClose, 
  title, 
  onSubmit, 
  formData, 
  onInputChange, 
  submitText, 
  submitIcon,
  onCancel
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
    <DepartmentForm 
      formData={formData} 
      onInputChange={onInputChange}
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitText={submitText}
      submitIcon={submitIcon}
    />
  </Modal>
)

// DepartmentForm component
const DepartmentForm = ({ formData, onInputChange, onCancel, onSubmit, submitText, submitIcon }) => {
  const DEPARTMENT_ICONS = [
    { value: 'fas fa-heartbeat', label: 'Cardiology', color: 'text-red-500', bgColor: 'bg-red-50' },
    { value: 'fas fa-bone', label: 'Orthopedics', color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { value: 'fas fa-brain', label: 'Neurology', color: 'text-purple-500', bgColor: 'bg-purple-50' },
    { value: 'fas fa-baby', label: 'Pediatrics', color: 'text-pink-500', bgColor: 'bg-pink-50' },
    { value: 'fa solid fa-ear-listen', label: 'ENT', color: 'text-green-500', bgColor: 'bg-green-50' },
    { value: 'fas fa-eye', label: 'Ophthalmology', color: 'text-indigo-500', bgColor: 'bg-indigo-50' },
    { value: 'fas fa-tooth', label: 'Dentistry', color: 'text-teal-500', bgColor: 'bg-teal-50' },
    { value: 'fas fa-lungs', label: 'Pulmonology', color: 'text-orange-500', bgColor: 'bg-orange-50' },
    { value: 'fas fa-stethoscope', label: 'General', color: 'text-gray-500', bgColor: 'bg-gray-50' },
    { value: 'fas fa-x-ray', label: 'Radiology', color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
    { value: 'fas fa-flask', label: 'Lab', color: 'text-cyan-500', bgColor: 'bg-cyan-50' },
    { value: 'fas fa-pills', label: 'Pharmacy', color: 'text-lime-500', bgColor: 'bg-lime-50' }
  ]

  const formFields = [
    { type: 'text', name: 'name', label: 'Department Name *', placeholder: 'e.g., Cardiology', icon: 'fas fa-building' },
    { type: 'text', name: 'head', label: 'Head of Department *', placeholder: 'e.g., Dr. Meena Rao', icon: 'fas fa-user-md' },
    { type: 'number', name: 'doctors', label: 'Number of Doctors *', placeholder: '5', icon: 'fas fa-users' },
    { type: 'number', name: 'staff', label: 'Number of Staff *', placeholder: '12', icon: 'fas fa-user-nurse' },
    { type: 'tel', name: 'contact', label: 'Contact Number', placeholder: '+91 98765 43210', icon: 'fas fa-phone' },
    { type: 'email', name: 'email', label: 'Email Address', placeholder: 'department@hospital.com', icon: 'fas fa-envelope' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {formFields.map(field => (
          <div key={field.name} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i className={field.icon}></i>
              </div>
              <input
                type={field.type}
                required={field.label.includes('*')}
                min={field.type === 'number' ? '0' : undefined}
                value={formData[field.name]}
                onChange={(e) => onInputChange(field.name, e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={field.placeholder}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Icon Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Department Icon *</label>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
          {DEPARTMENT_ICONS.map(icon => (
            <button
              key={icon.value}
              type="button"
              onClick={() => onInputChange('icon', icon.value)}
              className={`flex flex-col items-center p-3 border rounded-xl transition-all duration-200 ${
                formData.icon === icon.value 
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200 ring-opacity-50' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className={`${icon.bgColor} p-2 rounded-lg mb-2`}>
                <i className={`${icon.value} ${icon.color} text-lg`}></i>
              </div>
              <div className="text-xs text-gray-600 truncate w-full text-center">{icon.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Description and Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
        <div className="relative">
          <div className="absolute left-3 top-3 text-gray-400">
            <i className="fas fa-file-alt"></i>
          </div>
          <textarea
            rows="3"
            required
            value={formData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief description of the department's services..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => onInputChange('location', e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Floor 2, Wing A"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!formData.name || !formData.head || !formData.description}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          <i className={`fas fa-${submitIcon} mr-2`}></i>
          {submitText}
        </button>
      </div>
    </div>
  )
}

// DeleteConfirmationModal component
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, name, type }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={`Delete ${type}`} size="md">
    <div className="text-center p-8">
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-full flex items-center justify-center">
        <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">Are you sure?</h3>
      <p className="text-gray-600 mb-2">
        You are about to delete <span className="font-semibold text-gray-800">{name}</span>
      </p>
      <p className="text-sm text-gray-500 mb-8">
        This action will permanently remove the department and all associated data.
      </p>
      <div className="flex justify-center gap-4">
        <button 
          onClick={onClose}
          className="px-8 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
        >
          Cancel
        </button>
        <button 
          onClick={onConfirm}
          className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          <i className="fas fa-trash mr-2"></i>
          Delete Permanently
        </button>
      </div>
    </div>
  </Modal>
)

export default DepartmentManagement