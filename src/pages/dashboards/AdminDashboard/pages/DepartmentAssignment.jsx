import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import Modal from '../../../../components/common/Modal/Modal'
import LinkIcon from '@mui/icons-material/Link'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import ApartmentIcon from '@mui/icons-material/Apartment'
import BlockIcon from '@mui/icons-material/Block'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import InfoIcon from '@mui/icons-material/Info'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PersonIcon from '@mui/icons-material/Person'
import DownloadIcon from '@mui/icons-material/Download'
import FilterListIcon from '@mui/icons-material/FilterList'


const AssignDepartment = () => {
  const [loading, setLoading] = useState(true)
  const [assignments, setAssignments] = useState([])
  const [staff, setStaff] = useState([])
  const [departments, setDepartments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [modalState, setModalState] = useState({ assign: false, unassign: false, edit: false })
  const [currentAssignment, setCurrentAssignment] = useState(null)
  const [formData, setFormData] = useState({
    staffId: '',
    staffName: '',
    departmentName: ''
  })
  const [editFormData, setEditFormData] = useState({
    staffId: '',
    staffName: '',
    departmentName: '',
    status: 'active',
    assignedDate: ''
  })
  const [activeFilter, setActiveFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [sortBy, setSortBy] = useState('assignedDate')
  const [editingAssignment, setEditingAssignment] = useState(null)

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    setLoading(true)
    
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
      { id: 'ASSIGN-001', staffId: 'STAFF-001', staffName: 'Dr. Rajesh Kumar', staffRole: 'Doctor', departmentName: 'Cardiology', assignedDate: '2024-01-15', status: 'active' },
      { id: 'ASSIGN-002', staffId: 'STAFF-002', staffName: 'Dr. Priya Singh', staffRole: 'Doctor', departmentName: 'Neurology', assignedDate: '2024-01-20', status: 'active' },
      { id: 'ASSIGN-003', staffId: 'STAFF-003', staffName: 'Nurse Anjali', staffRole: 'Nurse', departmentName: 'Cardiology', assignedDate: '2024-02-01', status: 'active' },
      { id: 'ASSIGN-004', staffId: 'STAFF-004', staffName: 'Technician Amit', staffRole: 'Technician', departmentName: 'Orthopedics', assignedDate: '2024-02-05', status: 'active' },
      { id: 'ASSIGN-005', staffId: 'STAFF-006', staffName: 'Nurse Divya', staffRole: 'Nurse', departmentName: 'Pediatrics', assignedDate: '2024-02-10', status: 'active' }
    ]
    
    setStaff(mockStaff)
    setDepartments(mockDepartments)
    setAssignments(mockAssignments)
    setLoading(false)
  }

  const openModal = (type, assignment = null) => {
    setModalState(prev => ({ ...prev, [type]: true }))
    if (type === 'unassign' && assignment) {
      setCurrentAssignment(assignment)
    }
    if (type === 'edit' && assignment) {
      setCurrentAssignment(assignment)
      setEditFormData({
        staffId: assignment.staffId,
        staffName: assignment.staffName,
        departmentName: assignment.departmentName,
        status: assignment.status,
        assignedDate: assignment.assignedDate
      })
    }
  }

  const closeModal = (type) => {
    setModalState(prev => ({ ...prev, [type]: false }))
    if (type === 'assign') resetForm()
    if (type === 'unassign') setCurrentAssignment(null)
    if (type === 'edit') {
      setCurrentAssignment(null)
      setEditFormData({ staffId: '', staffName: '', departmentName: '', status: 'active', assignedDate: '' })
    }
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
    toast.success('Staff member unassigned successfully')
    closeModal('unassign')
  }

  const handleEditAssignment = () => {
    if (!editFormData.staffId || !editFormData.departmentName) {
      alert('Please select both staff member and department')
      return
    }

    setAssignments(prev =>
      prev.map(a =>
        a.id === currentAssignment.id
          ? {
              ...a,
              staffId: editFormData.staffId,
              staffName: editFormData.staffName,
              departmentName: editFormData.departmentName,
              status: editFormData.status,
              assignedDate: editFormData.assignedDate
            }
          : a
      )
    )
    toast.success('Assignment updated successfully')
    closeModal('edit')
  }

  const resetForm = () => {
    setFormData({ staffId: '', staffName: '', departmentName: '' })
  }

  // Filter assignments
  const filteredAssignments = assignments
    .filter(assign => {
      const matchesSearch = !searchTerm ||
        assign.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assign.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = activeFilter === 'all' || assign.status === activeFilter
      const matchesRole = roleFilter === 'all' || assign.staffRole === roleFilter
      
      return matchesSearch && matchesStatus && matchesRole
    })
    .sort((a, b) => {
      if (sortBy === 'assignedDate') {
        return new Date(b.assignedDate) - new Date(a.assignedDate)
      } else if (sortBy === 'staffName') {
        return a.staffName.localeCompare(b.staffName)
      } else if (sortBy === 'department') {
        return a.departmentName.localeCompare(b.departmentName)
      }
      return 0
    })

  // Statistics
  const stats = [
    {
      label: 'Total Assignments',
      value: assignments.length,
      color: 'blue',
      icon: LinkIcon,
      change: '+3 this month'
    },
    {
      label: 'Staff Assigned',
      value: new Set(assignments.map(a => a.staffId)).size,
      color: 'green',
      icon: VerifiedUserIcon,
      change: 'Active'
    },
    {
      label: 'Departments Covered',
      value: new Set(assignments.map(a => a.departmentName)).size,
      color: 'purple',
      icon: ApartmentIcon,
      change: `of ${departments.length}`
    },
    {
      label: 'Unassigned Staff',
      value: staff.length - new Set(assignments.map(a => a.staffId)).size,
      color: 'orange',
      icon: BlockIcon,
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
            <AddCircleIcon sx={{ fontSize: 20 }} />
            <span>New Assignment</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map(({ label, value, color, icon: Icon, change }) => {
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
              className={`${config.bg} p-4 rounded-2xl shadow-sm border border-gray-300 hover:shadow-md transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${config.iconBg} p-3 rounded-xl`}>
                  <Icon sx={{ fontSize: 24 }} className={config.iconColor} />
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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <SearchIcon sx={{ fontSize: 20, position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search by staff name or department..."
              className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              // Export to CSV functionality
              const csv = [
                ['Staff Name', 'Role', 'Department', 'Status', 'Assigned Date'],
                ...filteredAssignments.map(a => [a.staffName, a.staffRole, a.departmentName, a.status, a.assignedDate])
              ].map(row => row.join(',')).join('\n')
              const blob = new Blob([csv], { type: 'text/csv' })
              const url = window.URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `staff_assignments_${new Date().toISOString().split('T')[0]}.csv`
              a.click()
              toast.success('Assignments exported successfully')
            }}
            className="bg-green-50 text-green-600 px-6 py-3 rounded-xl hover:bg-green-100 transition-all duration-200 font-medium border border-green-200 flex items-center gap-2"
          >
            <DownloadIcon sx={{ fontSize: 20 }} />
            <span>Export</span>
          </button>
        </div>

        {/* Filter Row */}
        <div className="flex flex-col md:flex-row gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <FilterListIcon sx={{ fontSize: 20, color: '#6b7280' }} />
            <span className="text-sm font-medium text-gray-600">Filters:</span>
          </div>
          
          <div className="flex gap-2">
            {['all', 'active'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${activeFilter === filter
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter === 'all' ? 'All Status' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-gray-700 bg-white cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="Doctor">Doctors</option>
            <option value="Nurse">Nurses</option>
            <option value="Technician">Technicians</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-gray-700 bg-white cursor-pointer"
          >
            <option value="assignedDate">Sort by Date</option>
            <option value="staffName">Sort by Name</option>
            <option value="department">Sort by Department</option>
          </select>
        </div>
      </div>

      {/* Assignments Title */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Assigned Staff ({filteredAssignments.length})</h3>
        <div className="flex items-center gap-2 text-gray-500">
          <InfoIcon sx={{ fontSize: 18 }} />
          <span className="text-sm">Click unassign to remove staff from department</span>
        </div>
      </div>

      {/* Assignments Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Staff Member</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Role</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Department</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Assigned Date</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAssignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-blue-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <PersonIcon sx={{ fontSize: 20, color: '#3b82f6' }} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{assignment.staffName}</div>
                        <div className="text-xs text-gray-500">{assignment.staffId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                        {assignment.staffRole}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ApartmentIcon sx={{ fontSize: 18, color: '#8b5cf6' }} />
                      <span className="font-medium text-gray-900">{assignment.departmentName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      assignment.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${assignment.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                      {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <CalendarTodayIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                      <span className="text-sm font-medium">{new Date(assignment.assignedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openModal('edit', assignment)}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                        title="Edit Assignment"
                      >
                        <EditIcon sx={{ fontSize: 18 }} />
                      </button>
                      <button
                        onClick={() => openModal('unassign', assignment)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Unassign Staff"
                      >
                        <DeleteIcon sx={{ fontSize: 18 }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAssignments.length === 0 && (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <LinkIcon sx={{ fontSize: 32, color: '#9ca3af' }} />
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

      <EditAssignmentModal
        isOpen={modalState.edit}
        onClose={() => closeModal('edit')}
        onSubmit={handleEditAssignment}
        formData={editFormData}
        setFormData={setEditFormData}
        staff={staff}
        departments={departments}
        currentAssignment={currentAssignment}
      />
    </div>
  )
}

// Assignment Form Modal
const AssignmentFormModal = ({ isOpen, onClose, onSubmit, formData, setFormData, staff, departments }) => {
  const selectedStaff = staff.find(s => s.id === formData.staffId)
  const selectedDept = departments.find(d => d.name === formData.departmentName)
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Assign Staff to Department" size="lg">
      <div className="space-y-8">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between px-2">
          <div className="flex flex-col items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all ${
              formData.staffId ? 'bg-green-500 shadow-lg' : 'bg-blue-500'
            }`}>
              1
            </div>
            <p className="text-xs font-medium text-gray-600 mt-2">Select Staff</p>
          </div>
          <div className={`flex-1 h-1 mx-4 rounded-full transition-all ${
            formData.staffId && formData.departmentName ? 'bg-green-500' : formData.staffId ? 'bg-blue-300' : 'bg-gray-200'
          }`}></div>
          <div className="flex flex-col items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all ${
              formData.departmentName ? 'bg-green-500 shadow-lg' : 'bg-gray-300'
            }`}>
              2
            </div>
            <p className="text-xs font-medium text-gray-600 mt-2">Select Department</p>
          </div>
        </div>

        {/* Staff Selection */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <PersonIcon sx={{ fontSize: 22, color: '#3b82f6' }} />
            <label className="block text-lg font-bold text-gray-800">Select Staff Member</label>
            <span className="text-red-500 font-bold">*</span>
          </div>
          <div className="space-y-2 max-h-72 overflow-y-auto border border-gray-200 rounded-2xl p-3 bg-gray-50">
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
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  formData.staffId === staffMember.id
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-blue-400 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all ${
                      formData.staffId === staffMember.id ? 'bg-blue-500' : 'bg-gray-300'
                    }`}>
                      {staffMember.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{staffMember.name}</p>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                          staffMember.role === 'Doctor' ? 'bg-purple-100 text-purple-800' :
                          staffMember.role === 'Nurse' ? 'bg-pink-100 text-pink-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {staffMember.role}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          staffMember.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {staffMember.status === 'active' ? '● Active' : '● Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    formData.staffId === staffMember.id
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {formData.staffId === staffMember.id && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Department Selection */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ApartmentIcon sx={{ fontSize: 22, color: '#8b5cf6' }} />
            <label className="block text-lg font-bold text-gray-800">Select Department</label>
            <span className="text-red-500 font-bold">*</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {departments.map(dept => (
              <button
                key={dept.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, departmentName: dept.name }))}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                  formData.departmentName === dept.name
                    ? 'border-purple-500 bg-purple-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-purple-400 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    formData.departmentName === dept.name ? 'bg-purple-500' : 'bg-gray-200'
                  }`}>
                    <ApartmentIcon sx={{ fontSize: 18, color: formData.departmentName === dept.name ? '#fff' : '#6b7280' }} />
                  </div>
                </div>
                <p className="font-bold text-gray-900 text-sm">{dept.name}</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">{dept.id}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Summary Section */}
        {formData.staffId && formData.departmentName && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-2"><span className="font-bold text-green-700">✓ Summary:</span></p>
            <p className="text-sm font-semibold text-gray-800">
              Assigning <span className="text-blue-600">{selectedStaff?.name}</span> to <span className="text-purple-600">{formData.departmentName}</span> department
            </p>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-bold hover:border-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={!formData.staffId || !formData.departmentName}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-xl hover:from-blue-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-bold shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <AddCircleIcon sx={{ fontSize: 18 }} />
            Assign Staff
          </button>
        </div>
      </div>
    </Modal>
  )
}

// Unassign Confirmation Modal
const UnassignConfirmationModal = ({ isOpen, onClose, onConfirm, assignment }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="" size="md">
    <div className="text-center p-6">
      {/* Icon Container */}
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center shadow-lg">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
          <DeleteIcon sx={{ fontSize: 32, color: '#ef4444' }} />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Unassign Staff Member?</h3>
      <p className="text-gray-600 mb-4">This action will remove the staff member from the department</p>

      {/* Confirmation Details */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4 mb-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3 justify-center">
            <PersonIcon sx={{ fontSize: 20, color: '#3b82f6' }} />
            <div>
              <p className="text-xs text-gray-600">Staff Member</p>
              <p className="font-bold text-gray-900">{assignment?.staffName}</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-8 h-0.5 bg-red-300 mx-2"></div>
            <DeleteIcon sx={{ fontSize: 18, color: '#ef4444' }} />
            <div className="w-8 h-0.5 bg-red-300 mx-2"></div>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <ApartmentIcon sx={{ fontSize: 20, color: '#8b5cf6' }} />
            <div>
              <p className="text-xs text-gray-600">Department</p>
              <p className="font-bold text-gray-900">{assignment?.departmentName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Message */}
      <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-6 font-medium">
        ⚠️ The staff member will lose access to this department's operations and data.
      </p>

      {/* Action Buttons */}
      <div className="flex justify-center gap-3">
        <button
          onClick={onClose}
          className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-bold hover:border-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-bold shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <DeleteIcon sx={{ fontSize: 18 }} />
          Unassign
        </button>
      </div>
    </div>
  </Modal>
)

// Edit Assignment Modal
const EditAssignmentModal = ({ isOpen, onClose, onSubmit, formData, setFormData, staff, departments, currentAssignment }) => {
  const selectedStaff = staff.find(s => s.id === formData.staffId)
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Staff Assignment" size="lg">
      <div className="space-y-8">
        {/* Progress Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
              ✎
            </div>
            <div>
              <p className="text-sm font-bold text-blue-900">Editing Assignment</p>
              <p className="text-xs text-blue-700 mt-0.5">Update staff member, department, status, or date</p>
            </div>
          </div>
        </div>

        {/* Staff Selection */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <PersonIcon sx={{ fontSize: 22, color: '#3b82f6' }} />
            <label className="block text-lg font-bold text-gray-800">Staff Member</label>
          </div>
          <div className="space-y-2 max-h-72 overflow-y-auto border border-gray-200 rounded-2xl p-3 bg-gray-50">
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
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  formData.staffId === staffMember.id
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-blue-400 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all ${
                      formData.staffId === staffMember.id ? 'bg-blue-500' : 'bg-gray-300'
                    }`}>
                      {staffMember.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{staffMember.name}</p>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                          staffMember.role === 'Doctor' ? 'bg-purple-100 text-purple-800' :
                          staffMember.role === 'Nurse' ? 'bg-pink-100 text-pink-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {staffMember.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    formData.staffId === staffMember.id
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {formData.staffId === staffMember.id && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Department Selection */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ApartmentIcon sx={{ fontSize: 22, color: '#8b5cf6' }} />
            <label className="block text-lg font-bold text-gray-800">Department</label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {departments.map(dept => (
              <button
                key={dept.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, departmentName: dept.name }))}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                  formData.departmentName === dept.name
                    ? 'border-purple-500 bg-purple-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-purple-400 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    formData.departmentName === dept.name ? 'bg-purple-500' : 'bg-gray-200'
                  }`}>
                    <ApartmentIcon sx={{ fontSize: 18, color: formData.departmentName === dept.name ? '#fff' : '#6b7280' }} />
                  </div>
                </div>
                <p className="font-bold text-gray-900 text-sm">{dept.name}</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">{dept.id}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Status and Date Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Status */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 font-bold bg-white cursor-pointer"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Assigned Date */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <CalendarTodayIcon sx={{ fontSize: 16 }} />
              Assigned Date
            </label>
            <input
              type="date"
              value={formData.assignedDate}
              onChange={(e) => setFormData(prev => ({ ...prev, assignedDate: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 font-bold"
            />
          </div>
        </div>

        {/* Summary Section */}
        {formData.staffId && formData.departmentName && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-2"><span className="font-bold text-green-700">✓ Updated Details:</span></p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-800"><span className="font-semibold">Staff:</span> <span className="text-blue-600">{selectedStaff?.name}</span></p>
              <p className="text-gray-800"><span className="font-semibold">Department:</span> <span className="text-purple-600">{formData.departmentName}</span></p>
              <p className="text-gray-800"><span className="font-semibold">Status:</span> <span className={`font-bold ${formData.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>{formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}</span></p>
              <p className="text-gray-800"><span className="font-semibold">Date:</span> <span className="text-orange-600">{new Date(formData.assignedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span></p>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-bold hover:border-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={!formData.staffId || !formData.departmentName}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-bold shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <EditIcon sx={{ fontSize: 18 }} />
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default AssignDepartment
