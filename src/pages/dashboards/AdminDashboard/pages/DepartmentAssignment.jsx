import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import Modal from '../../../../components/common/Modal/Modal'

const AssignDepartment = () => {
  const [loading, setLoading] = useState(true)
  const [assignments, setAssignments] = useState([])
  const [staff, setStaff] = useState([])
  const [departments, setDepartments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [modalState, setModalState] = useState({ assign: false, unassign: false })
  const [currentAssignment, setCurrentAssignment] = useState(null)
  const [formData, setFormData] = useState({
    staffId: '',
    staffName: '',
    departmentName: ''
  })
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    setLoading(true)
    setTimeout(() => {
      // Mock staff data
      const mockStaff = [
        { id: 'STAFF-001', name: 'Dr. Rajesh Kumar', role: 'Doctor', status: 'active' },
        { id: 'STAFF-002', name: 'Dr. Priya Singh', role: 'Doctor', status: 'active' },
        { id: 'STAFF-003', name: 'Nurse Anjali', role: 'Nurse', status: 'active' },
        { id: 'STAFF-004', name: 'Technician Amit', role: 'Technician', status: 'active' },
        { id: 'STAFF-005', name: 'Dr. Vikram Patel', role: 'Doctor', status: 'inactive' },
        { id: 'STAFF-006', name: 'Nurse Divya', role: 'Nurse', status: 'active' }
      ]
      
      // Mock departments data
      const mockDepartments = [
        { id: 'DEPT-001', name: 'Cardiology' },
        { id: 'DEPT-002', name: 'Orthopedics' },
        { id: 'DEPT-003', name: 'Neurology' },
        { id: 'DEPT-004', name: 'Pediatrics' },
        { id: 'DEPT-005', name: 'ENT' },
        { id: 'DEPT-006', name: 'Dentistry' }
      ]

      // Mock assignments data
      const mockAssignments = [
        {  staffName: 'Dr. Rajesh Kumar',  departmentName: 'Cardiology' },
        { staffName: 'Dr. Priya Singh',  departmentName: 'Neurology' },
        {  staffName: 'Nurse Anjali',  departmentName: 'Cardiology' },
        { staffName: 'Technician Amit',  departmentName: 'Orthopedics' },
        {  staffName: 'Nurse Divya',  departmentName: 'Pediatrics' }
      ]

      setStaff(mockStaff)
      setDepartments(mockDepartments)
      setAssignments(mockAssignments)
      setLoading(false)
    }, 1000)
  }

  const openModal = (type, assignment = null) => {
    setModalState(prev => ({ ...prev, [type]: true }))
    if (type === 'unassign' && assignment) {
      setCurrentAssignment(assignment)
    }
  }

  const closeModal = (type) => {
    setModalState(prev => ({ ...prev, [type]: false }))
    if (type === 'assign') resetForm()
    if (type === 'unassign') setCurrentAssignment(null)
  }

  const handleAssignStaff = () => {
    if (!formData.staffId || !formData.departmentName) {
      alert('Please select both staff member and department')
      return
    }

    // Check if already assigned to this department
    const exists = assignments.some(
      a => a.staffId === formData.staffId && a.departmentName === formData.departmentName
    )
    if (exists) {
      alert('This staff member is already assigned to this department')
      return
    }

    const selectedStaff = staff.find(s => s.id === formData.staffId)
    const assignment = {
      id: `ASSIGN-${String(assignments.length + 1).padStart(3, '0')}`,
      staffId: formData.staffId,
      staffName: selectedStaff.name,
      staffRole: selectedStaff.role,
      departmentName: formData.departmentName,
      assignedDate: new Date().toISOString().split('T')[0],
      status: 'active'
    }
    
    setAssignments(prev => [assignment, ...prev])
    closeModal('assign')
  }

  const handleUnassignStaff = () => {
    setAssignments(prev => prev.filter(a => a.id !== currentAssignment.id))
    closeModal('unassign')
  }

  const resetForm = () => {
    setFormData({ staffId: '', staffName: '', departmentName: '' })
  }

  // Filter assignments
  const filteredAssignments = assignments.filter(assign => {
    const matchesSearch = !searchTerm ||
      assign.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assign.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = activeFilter === 'all' || assign.status === activeFilter
    
    return matchesSearch && matchesFilter
  })

  // Statistics
  const stats = [
    {
      label: 'Total Assignments',
      value: assignments.length,
      color: 'blue',
      icon: 'fas fa-link',
      change: '+3 this month'
    },
    {
      label: 'Staff Assigned',
      value: new Set(assignments.map(a => a.staffId)).size,
      color: 'green',
      icon: 'fas fa-user-check',
      change: 'Active'
    },
    {
      label: 'Departments Covered',
      value: new Set(assignments.map(a => a.departmentName)).size,
      color: 'purple',
      icon: 'fas fa-building',
      change: `of ${departments.length}`
    },
    {
      label: 'Unassigned Staff',
      value: staff.length - new Set(assignments.map(a => a.staffId)).size,
      color: 'orange',
      icon: 'fas fa-user-slash',
      change: 'Available'
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
              Assign Staff to Departments
            </h2>
            <p className="text-gray-500 mt-1">Manage staff department assignments and permissions</p>
          </div>
          <button
            onClick={() => openModal('assign')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-medium"
          >
            <i className="fas fa-plus-circle text-lg"></i>
            <span>New Assignment</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
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
            </div>
          )
        })}
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search by staff name or department..."
              className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active'].map((filter) => (
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

      {/* Assignments Title */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Assigned Staff ({filteredAssignments.length})</h3>
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fas fa-info-circle"></i>
          <span className="text-sm">Click unassign to remove staff from department</span>
        </div>
      </div>

      {/* Assignments Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Staff Member</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Department</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAssignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{assignment.staffName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-gray-900">{assignment.departmentName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => openModal('unassign', assignment)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
                      title="Unassign Staff"
                    >
                      <i className="fas fa-times-circle"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAssignments.length === 0 && (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <i className="fas fa-link text-gray-400 text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">No assignments found</h3>
            <p className="text-gray-500">Try adjusting your search or create a new assignment</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <AssignmentFormModal
        isOpen={modalState.assign}
        onClose={() => closeModal('assign')}
        onSubmit={handleAssignStaff}
        formData={formData}
        setFormData={setFormData}
        staff={staff}
        departments={departments}
      />

      <UnassignConfirmationModal
        isOpen={modalState.unassign}
        onClose={() => closeModal('unassign')}
        onConfirm={handleUnassignStaff}
        assignment={currentAssignment}
      />
    </div>
  )
}

// Assignment Form Modal
const AssignmentFormModal = ({ isOpen, onClose, onSubmit, formData, setFormData, staff, departments }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Assign Staff to Department" size="lg">
    <div className="space-y-6">
      {/* Staff Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Select Staff Member *</label>
        <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-200 rounded-xl p-4 bg-gray-50">
          {staff.map(staffMember => (
            <button
              key={staffMember.id}
              type="button"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  staffId: staffMember.id,
                  staffName: staffMember.name
                }))
              }}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                formData.staffId === staffMember.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{staffMember.name}</p>
                  <p className="text-sm text-gray-500">{staffMember.role}</p>
                </div>
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  formData.staffId === staffMember.id
                    ? 'border-blue-600 bg-blue-600'
                    : 'border-gray-300'
                }`}>
                  {formData.staffId === staffMember.id && (
                    <i className="fas fa-check text-white text-xs"></i>
                  )}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Department Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Select Department *</label>
        <div className="grid grid-cols-2 gap-3">
          {departments.map(dept => (
            <button
              key={dept.id}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, departmentName: dept.name }))}
              className={`p-4 rounded-lg border-2 transition-all text-center ${
                formData.departmentName === dept.name
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <p className="font-medium text-gray-900">{dept.name}</p>
              <p className="text-xs text-gray-500 mt-1">{dept.id}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!formData.staffId || !formData.departmentName}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          <i className="fas fa-plus mr-2"></i>
          Assign Staff
        </button>
      </div>
    </div>
  </Modal>
)

// Unassign Confirmation Modal
const UnassignConfirmationModal = ({ isOpen, onClose, onConfirm, assignment }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Unassign Staff" size="md">
    <div className="text-center p-8">
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-full flex items-center justify-center">
        <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">Are you sure?</h3>
      <p className="text-gray-600 mb-2">
        You are about to unassign <span className="font-semibold text-gray-800">{assignment?.staffName}</span> from <span className="font-semibold text-gray-800">{assignment?.departmentName}</span>
      </p>
      <p className="text-sm text-gray-500 mb-8">
        The staff member will lose access to this department's operations.
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
          <i className="fas fa-times mr-2"></i>
          Unassign
        </button>
      </div>
    </div>
    
  </Modal>
)

export default AssignDepartment
