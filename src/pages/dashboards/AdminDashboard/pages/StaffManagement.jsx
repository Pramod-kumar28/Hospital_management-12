import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import Modal from '../../../../components/common/Modal/Modal'

const StaffManagement = () => {
  const [loading, setLoading] = useState(true)
  const [staff, setStaff] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modalState, setModalState] = useState({ 
    add: false, 
    edit: false, 
    delete: false 
  })
  const [currentStaff, setCurrentStaff] = useState(null)
  const [formData, setFormData] = useState({
    name: '', role: '', email: '', phone: '', department: '', 
    shift: 'Morning (7AM-3PM)', address: '', emergencyContact: '', joiningDate: ''
  })

  // Data constants
  const STAFF_ROLES = ['Nurse', 'Receptionist', 'Lab Technician', 'Pharmacist', 'Ward Boy', 'Housekeeping', 'Security Guard', 'Accountant', 'IT Support', 'HR Manager']
  const DEPARTMENTS = ['Emergency', 'OPD', 'Lab', 'Pharmacy', 'ICU', 'Ward', 'Administration', 'HR', 'IT', 'Housekeeping']
  const SHIFT_OPTIONS = ['Morning (7AM-3PM)', 'Evening (3PM-11PM)', 'Night (11PM-7AM)', 'Flexible', 'Part-time']

  useEffect(() => { loadStaff() }, [])

  const loadStaff = async () => {
    setLoading(true)
    setTimeout(() => {
      setStaff([
        { id: 'STAFF-2001', name: 'Kavya Patel', role: 'Nurse', contact: '+91 98765 43214', shift: 'Morning (7AM-3PM)', department: 'Emergency', status: 'Active', image: 'https://i.pravatar.cc/100?img=5', email: 'kavya.patel@hospital.com', address: '123 Main St, Mumbai', emergencyContact: '+91 98765 43200', joiningDate: '2023-01-15' },
        { id: 'STAFF-2002', name: 'Arjun Kumar', role: 'Receptionist', contact: '+91 98765 43215', shift: 'Evening (3PM-11PM)', department: 'OPD', status: 'Active', image: 'https://i.pravatar.cc/100?img=6', email: 'arjun.kumar@hospital.com', address: '456 Park Ave, Delhi', emergencyContact: '+91 98765 43201', joiningDate: '2023-03-20' },
        { id: 'STAFF-2003', name: 'Priya Sharma', role: 'Lab Technician', contact: '+91 98765 43216', shift: 'Morning (7AM-3PM)', department: 'Lab', status: 'Active', image: 'https://i.pravatar.cc/100?img=7', email: 'priya.sharma@hospital.com', address: '789 MG Road, Bangalore', emergencyContact: '+91 98765 43202', joiningDate: '2023-02-10' },
        { id: 'STAFF-2004', name: 'Rahul Verma', role: 'Pharmacist', contact: '+91 98765 43217', shift: 'Night (11PM-7AM)', department: 'Pharmacy', status: 'Active', image: 'https://i.pravatar.cc/100?img=8', email: 'rahul.verma@hospital.com', address: '321 Central Ave, Chennai', emergencyContact: '+91 98765 43203', joiningDate: '2023-04-05' }
      ])
      setLoading(false)
    }, 1000)
  }

  // Modal handlers
  const openModal = (type, staffMember = null) => {
    setModalState(prev => ({ ...prev, [type]: true }))
    if (type === 'edit' && staffMember) {
      setCurrentStaff(staffMember)
      setFormData({
        name: staffMember.name, role: staffMember.role, email: staffMember.email,
        phone: staffMember.contact, department: staffMember.department, shift: staffMember.shift,
        address: staffMember.address, emergencyContact: staffMember.emergencyContact, 
        joiningDate: staffMember.joiningDate
      })
    } else if (type === 'delete' && staffMember) {
      setCurrentStaff(staffMember)
    }
  }

  const closeModal = (type) => {
    setModalState(prev => ({ ...prev, [type]: false }))
    if (type !== 'delete') resetForm()
    if (type === 'delete') setCurrentStaff(null)
  }

  // Core functions
  const handleAddStaff = () => {
    if (!validateForm()) return
    const staffMember = { 
      id: `STAFF-${Math.floor(2000 + Math.random() * 9000)}`,
      ...formData, contact: formData.phone, status: 'Active',
      image: `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70) + 1}`
    }
    setStaff(prev => [staffMember, ...prev])
    closeModal('add')
  }

  const handleEditStaff = () => {
    if (!validateForm()) return
    setStaff(prev => prev.map(s => 
      s.id === currentStaff.id ? { ...s, ...formData, contact: formData.phone } : s
    ))
    closeModal('edit')
  }

  const handleToggleStatus = (staffId) => {
    setStaff(prev => prev.map(s => 
      s.id === staffId ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s
    ))
  }

  const handleDeleteStaff = () => {
    setStaff(prev => prev.filter(s => s.id !== currentStaff.id))
    closeModal('delete')
  }

  const resetForm = () => {
    setFormData({
      name: '', role: '', email: '', phone: '', department: '', 
      shift: 'Morning (7AM-3PM)', address: '', emergencyContact: '', joiningDate: ''
    })
    setCurrentStaff(null)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    const required = ['name', 'email', 'phone', 'role', 'department', 'shift', 'emergencyContact', 'joiningDate', 'address']
    const missing = required.find(field => !formData[field])
    if (missing) {
      alert(`Please fill in the ${missing} field`)
      return false
    }
    return true
  }

  // Filter staff
  const filteredStaff = staff.filter(staffMember => {
    const matchesSearch = !searchTerm || 
      [staffMember.name, staffMember.role, staffMember.department].some(field => 
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    const matchesDepartment = !departmentFilter || staffMember.department === departmentFilter
    const matchesStatus = !statusFilter || staffMember.status === statusFilter
    return matchesSearch && matchesDepartment && matchesStatus
  })

  // Statistics
  const stats = [
    { label: 'Nurses', count: staff.filter(s => s.role === 'Nurse').length, color: 'blue' },
    { label: 'Receptionists', count: staff.filter(s => s.role === 'Receptionist').length, color: 'green' },
    { label: 'Lab Technicians', count: staff.filter(s => s.role === 'Lab Technician').length, color: 'purple' },
    { label: 'Pharmacists', count: staff.filter(s => s.role === 'Pharmacist').length, color: 'orange' }
  ]

  if (loading) return <LoadingSpinner/>

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">
          <i className="fas fa-users text-blue-500 mr-2"></i>Staff Management
        </h2>
        <button 
          onClick={() => openModal('add')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i className="fas fa-plus mr-2"></i>Add Staff
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg card-shadow border mb-6">
        <div className="flex flex-wrap gap-4">
          <input 
            type="text" 
            placeholder="Search staff..." 
            className="p-2 border rounded flex-1 focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="p-2 border rounded focus:outline-none focus:border-blue-500"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
          </select>
          <select 
            className="p-2 border rounded focus:outline-none focus:border-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map(({ label, count, color }) => (
          <div key={label} className="bg-white p-4 rounded-lg card-shadow border text-center">
            <div className={`text-2xl font-bold text-${color}-600`}>{count}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map(staffMember => (
          <StaffCard 
            key={staffMember.id} 
            staffMember={staffMember} 
            onEdit={() => openModal('edit', staffMember)}
            onToggleStatus={() => handleToggleStatus(staffMember.id)}
            onDelete={() => openModal('delete', staffMember)}
          />
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <i className="fas fa-users text-blue-500 text-3xl mb-2"></i>
          <p>No staff members found matching your criteria</p>
        </div>
      )}

      {/* Modals */}
      <StaffFormModal
        isOpen={modalState.add}
        onClose={() => closeModal('add')}
        title="Add New Staff Member"
        onSubmit={handleAddStaff}
        formData={formData}
        onInputChange={handleInputChange}
        submitText="Add Staff"
        submitIcon="plus"
      />

      <StaffFormModal
        isOpen={modalState.edit}
        onClose={() => closeModal('edit')}
        title="Edit Staff Member"
        onSubmit={handleEditStaff}
        formData={formData}
        onInputChange={handleInputChange}
        submitText="Update Staff"
        submitIcon="save"
      />

      <DeleteConfirmationModal
        isOpen={modalState.delete}
        onClose={() => closeModal('delete')}
        onConfirm={handleDeleteStaff}
        name={currentStaff?.name}
        type="Staff"
      />
    </div>
  )
}

// Sub-components
const StaffCard = ({ staffMember, onEdit, onToggleStatus, onDelete }) => (
  <div className="bg-white rounded-xl card-shadow border p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <img src={staffMember.image} className="w-12 h-12 rounded-full" alt="Staff" />
        <div>
          <h3 className="font-semibold text-blue-700">{staffMember.name}</h3>
          <p className="text-xs text-gray-500">{staffMember.id}</p>
        </div>
      </div>
      <span className={`px-2 py-1 rounded text-xs ${
        staffMember.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {staffMember.status}
      </span>
    </div>
    
    <div className="space-y-2 text-sm text-gray-600 mb-4">
      {[
        { label: 'Role:', value: staffMember.role, className: 'font-medium' },
        { label: 'Department:', value: staffMember.department, className: 'font-medium' },
        { label: 'Shift:', value: staffMember.shift, className: 'text-gray-500' },
        { label: 'Contact:', value: staffMember.contact, className: 'text-gray-500' }
      ].map(({ label, value, className }) => (
        <div key={label} className="flex justify-between">
          <span>{label}</span>
          <span className={className}>{value}</span>
        </div>
      ))}
    </div>
    
    <div className="flex justify-between items-center pt-4 border-t">
      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
        {staffMember.role}
      </span>
      <div className="flex gap-2">
        <ActionButton icon="edit" color="blue" onClick={onEdit} title="Edit Staff" />
        <ActionButton 
          icon={staffMember.status === 'Active' ? 'pause' : 'play'} 
          color={staffMember.status === 'Active' ? 'yellow' : 'green'} 
          onClick={onToggleStatus}
          title={staffMember.status === 'Active' ? 'Deactivate' : 'Activate'}
        />
        <ActionButton icon="trash" color="red" onClick={onDelete} title="Delete Staff" />
      </div>
    </div>
  </div>
)

const ActionButton = ({ icon, color, onClick, title }) => (
  <button 
    onClick={onClick}
    className={`text-${color}-600 hover:text-${color}-800 transition-colors`}
    title={title}
  >
    <i className={`fas fa-${icon}`}></i>
  </button>
)

const StaffFormModal = ({ isOpen, onClose, title, onSubmit, formData, onInputChange, submitText, submitIcon }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
    <StaffForm 
      formData={formData} 
      onInputChange={onInputChange}
      onCancel={onClose}
      onSubmit={onSubmit}
      submitText={submitText}
      submitIcon={submitIcon}
    />
  </Modal>
)

const StaffForm = ({ formData, onInputChange, onCancel, onSubmit, submitText, submitIcon }) => {
  const STAFF_ROLES = ['Nurse', 'Receptionist', 'Lab Technician', 'Pharmacist', 'Ward Boy', 'Housekeeping', 'Security Guard', 'Accountant', 'IT Support', 'HR Manager']
  const DEPARTMENTS = ['Emergency', 'OPD', 'Lab', 'Pharmacy', 'ICU', 'Ward', 'Administration', 'HR', 'IT', 'Housekeeping']
  const SHIFT_OPTIONS = ['Morning (7AM-3PM)', 'Evening (3PM-11PM)', 'Night (11PM-7AM)', 'Flexible', 'Part-time']

  const formFields = [
    { type: 'text', name: 'name', label: 'Full Name *', placeholder: 'Enter full name' },
    { type: 'email', name: 'email', label: 'Email Address *', placeholder: 'staff@hospital.com' },
    { type: 'tel', name: 'phone', label: 'Phone Number *', placeholder: '+91 98765 43210' },
    { type: 'tel', name: 'emergencyContact', label: 'Emergency Contact *', placeholder: '+91 98765 43210' },
  ]

  const selectFields = [
    { name: 'role', label: 'Role *', options: STAFF_ROLES },
    { name: 'department', label: 'Department *', options: DEPARTMENTS },
    { name: 'shift', label: 'Shift Timing *', options: SHIFT_OPTIONS },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formFields.map(field => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            <input
              type={field.type}
              required
              value={formData[field.name]}
              onChange={(e) => onInputChange(field.name, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectFields.map(field => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            <select
              required
              value={formData[field.name]}
              onChange={(e) => onInputChange(field.name, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select {field.label.replace(' *', '')}</option>
              {field.options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date *</label>
          <input
            type="date"
            required
            value={formData.joiningDate}
            onChange={(e) => onInputChange('joiningDate', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
        <textarea
          rows="3"
          required
          value={formData.address}
          onChange={(e) => onInputChange('address', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter complete address"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!formData.name || !formData.email || !formData.role || !formData.department}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <i className={`fas fa-${submitIcon} mr-2`}></i>
          {submitText}
        </button>
      </div>
    </div>
  )
}

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, name, type }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={`Delete ${type}`} size="md">
    <div className="text-center p-6">
      <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
        <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirm Deletion</h3>
      <p className="text-gray-600 mb-6">
        Are you sure you want to delete <span className="font-semibold">{name}</span>? 
        This action cannot be undone.
      </p>
      <div className="flex justify-center gap-3">
        <button onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          <i className="fas fa-trash mr-2"></i>Delete {type}
        </button>
      </div>
    </div>
  </Modal>
)

export default StaffManagement