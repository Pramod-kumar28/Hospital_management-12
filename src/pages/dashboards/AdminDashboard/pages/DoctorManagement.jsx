import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import Modal from '../../../../components/common/Modal/Modal'
import { HOSPITAL_ADMIN_STAFF } from '../../../../config/api'
import { apiFetch } from '../../../../services/apiClient'
import {
  Lock,
  LocalHospital,
  Add,
  Search,
  ExpandMore,
  FiberManualRecord,
  Badge,
  EmojiEvents,
  MailOutline,
  Phone,
  CalendarMonth,
  CurrencyRupee,
  VideoCall,
  School,
  WarningAmber,
  DeleteOutline,
  SaveOutlined,
  CheckCircle,
  Close,
  Visibility,
  VisibilityOff,
  MenuBook,
  MarkEmailRead,
  Edit,
  PlayArrow,
  Pause
} from '@mui/icons-material'

const DoctorManagement = () => {
  const [loading, setLoading] = useState(true)
  const [doctors, setDoctors] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [consultationTypeFilter, setConsultationTypeFilter] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentDoctor, setCurrentDoctor] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isAddMode, setIsAddMode] = useState(true)
  const [departmentDropdownOpen, setDepartmentDropdownOpen] = useState(false)
  const [specializationDropdownOpen, setSpecializationDropdownOpen] = useState(false)
  const [departmentSearchTerm, setDepartmentSearchTerm] = useState('')
  const [specializationSearchTerm, setSpecializationSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    department: '',
    email: '',
    personalEmail: '',
    phone: '',
    password: '',
    confirmPassword: '',
    qualification: '',
    experience: '',
    consultationFee: '',
    consultationType: '',
    availability: '9AM-5PM',
   
  })

  useEffect(() => {
    loadDoctors()
  }, [])

  // Map staff data to doctor format
  const mapDoctorData = (staffItem) => {
    const firstNameOrFull = staffItem?.first_name || staffItem?.firstName || ''
    const lastNameOrFull = staffItem?.last_name || staffItem?.lastName || ''
    const fullName = `Dr. ${firstNameOrFull}${lastNameOrFull ? ' ' + lastNameOrFull : ''}`.trim()
    
    return {
      id: staffItem?.id || staffItem?.staff_id || staffItem?.user_id || '',
      name: fullName || 'Unnamed Doctor',
      email: staffItem?.email || '',
      personalEmail: staffItem?.personal_email || '',
      phone: staffItem?.phone || '',
      qualification: staffItem?.qualification || '',
      experience: staffItem?.experience || '0',
      fee: parseInt(staffItem?.consultation_fee || 0),
      specialization: staffItem?.doctor_specialization || 'General Physician',
      department: staffItem?.department || 'General',
      consultationType: staffItem?.consultation_type || 'In-Person',
      availability: staffItem?.availability || '9AM-5PM',
      status: staffItem?.is_active === false ? 'Inactive' : 'Active',
      image: `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70) + 1}`,
      contact: staffItem?.phone || '',
      is_active: staffItem?.is_active !== false
    }
  }

  const loadDoctors = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('page', '1')
      params.set('limit', '100')
      params.set('role', 'DOCTOR')
      
      const res = await apiFetch(`${HOSPITAL_ADMIN_STAFF}?${params.toString()}`)
      const data = await res.json().catch(() => ({}))
      
      if (!res.ok) {
        console.error('Failed to load doctors:', data?.message || data?.detail?.message)
        setDoctors([])
        return
      }
      
      // Extract items from response
      const raw = data?.data ?? data
      const items = Array.isArray(raw?.items) ? raw.items : 
                   Array.isArray(raw?.staff) ? raw.staff : 
                   Array.isArray(raw) ? raw : []
      
      const mappedDoctors = items.map(mapDoctorData)
      setDoctors(mappedDoctors)
    } catch (error) {
      console.error('Error loading doctors:', error)
      setDoctors([])
    } finally {
      setLoading(false)
    }
  }

  // Add new doctor
  const handleAddDoctor = () => {
    if (!validateForm()) return
    
    // Password validation for add mode
    if (isAddMode) {
      if (!formData.password || !formData.confirmPassword) {
        alert('Please enter both password and confirm password')
        return
      }
      
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match. Please check and try again.')
        return
      }
      
      if (formData.password.length < 8) {
        alert('Password must be at least 8 characters long')
        return
      }
    }

    const doctor = {
      id: `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name,
      specialization: formData.specialization,
      department: formData.department,
      availability: formData.availability,
      fee: parseInt(formData.consultationFee),
      contact: formData.phone,
      status: 'Active',
      image: `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70) + 1}`,
      email: formData.email,
      personalEmail: formData.personalEmail,
      password: formData.password,
      qualification: formData.qualification,
      experience: formData.experience,
      consultationType: formData.consultationType,
     
    }
    
    setDoctors(prev => [doctor, ...prev])
    setIsAddModalOpen(false)
    resetForm()
  }

  // Edit doctor
  const handleEditDoctor = () => {
    if (!validateForm()) return

    setDoctors(prev => 
      prev.map(doctor => 
        doctor.id === currentDoctor.id 
          ? { 
              ...doctor,
              name: formData.name,
              specialization: formData.specialization,
              department: formData.department,
              availability: formData.availability,
              fee: parseInt(formData.consultationFee),
              contact: formData.phone,
              email: formData.email,
              personalEmail: formData.personalEmail,
              qualification: formData.qualification,
              experience: formData.experience,
              consultationType: formData.consultationType,
              bio: formData.bio
            }
          : doctor
      )
    )
    setIsEditModalOpen(false)
    resetForm()
  }

  // Toggle doctor status (Active/Inactive)
  const handleToggleStatus = (doctorId) => {
    setDoctors(prev => 
      prev.map(doctor => 
        doctor.id === doctorId 
          ? { ...doctor, status: doctor.status === 'Active' ? 'Inactive' : 'Active' }
          : doctor
      )
    )
  }

  // Delete doctor
  const handleDeleteDoctor = () => {
    setDoctors(prev => prev.filter(doctor => doctor.id !== currentDoctor.id))
    setIsDeleteModalOpen(false)
    setCurrentDoctor(null)
  }

  // Open view details modal
  const openViewModal = (doctor) => {
    setCurrentDoctor(doctor)
    setIsViewModalOpen(true)
  }

  // Open edit modal with doctor data
  const openEditModal = (doctor) => {
    setIsAddMode(false)
    setCurrentDoctor(doctor)
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      department: doctor.department,
      email: doctor.email,
      personalEmail: doctor.personalEmail || '',
      phone: doctor.contact,
      password: '',
      qualification: doctor.qualification,
      experience: doctor.experience,
      consultationFee: doctor.fee.toString(),
      consultationType: doctor.consultationType || '',
      availability: doctor.availability,
      bio: doctor.bio || ''
    })
    setDepartmentSearchTerm('')
    setSpecializationSearchTerm('')
    setDepartmentDropdownOpen(false)
    setSpecializationDropdownOpen(false)
    setIsEditModalOpen(true)
  }

  // Open delete confirmation modal
  const openDeleteModal = (doctor) => {
    setCurrentDoctor(doctor)
    setIsDeleteModalOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      specialization: '',
      department: '',
      email: '',
      personalEmail: '',
      phone: '',
      password: '',
      confirmPassword: '',
      qualification: '',
      experience: '',
      consultationFee: '',
      consultationType: '',
      availability: '9AM-5PM',
     
    })
    setDepartmentSearchTerm('')
    setSpecializationSearchTerm('')
    setDepartmentDropdownOpen(false)
    setSpecializationDropdownOpen(false)
    setCurrentDoctor(null)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Form validation
  const validateForm = () => {
    const requiredFields = ['name', 'email', 'phone', 'qualification', 'department', 'specialization', 'experience', 'consultationFee']
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the ${field} field`)
        return false
      }
    }
    return true
  }

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = !searchTerm || 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = !departmentFilter || doctor.department === departmentFilter
    const matchesStatus = !statusFilter || doctor.status === statusFilter
    const matchesConsultationType = !consultationTypeFilter || doctor.consultationType === consultationTypeFilter
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesConsultationType
  })

  // Departments and specializations data
  const departments = [
    'Cardiology',
    'Orthopedics',
    'Neurology',
    'Pediatrics',
    'ENT',
    'Dermatology',
    'Ophthalmology',
    'Dentistry',
    'Psychiatry',
    'General Medicine'
  ]

  const specializations = [
    'Cardiologist',
    'Orthopedic Surgeon',
    'Neurologist',
    'Pediatrician',
    'ENT Specialist',
    'Dermatologist',
    'Ophthalmologist',
    'Dentist',
    'Psychiatrist',
    'General Physician'
  ]

  const availabilityOptions = [
    '9AM-5PM',
    '10AM-6PM',
    '8AM-4PM',
    '24/7 On-call',
    'Flexible Hours',
    'Weekends Only'
  ]

  // Common form fields for both Add and Edit modals
  const renderFormFields = () => (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Dr. John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Official Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="doctor@hospital.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Personal Email
          </label>
          <input
            type="email"
            value={formData.personalEmail}
            onChange={(e) => handleInputChange('personalEmail', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="personal@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="+91 98765 43210"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Qualification <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.qualification}
            onChange={(e) => handleInputChange('qualification', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="MBBS, MD, etc."
          />
        </div>
      </div>

      {/* Password Setup Section - Only in Add Mode */}
      {isAddMode && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Lock className="text-blue-500" style={{fontSize: '20px'}} />
            Login Credentials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required={isAddMode}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Enter a strong password"
              />
              <p className="text-xs text-gray-500 mt-1">Use at least 8 characters, numbers, and symbols</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required={isAddMode}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Confirm password"
              />
              {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Professional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={departmentSearchTerm || formData.department}
            onChange={(e) => {
              setDepartmentSearchTerm(e.target.value)
              setDepartmentDropdownOpen(true)
              handleInputChange('department', e.target.value)
            }}
            onFocus={() => setDepartmentDropdownOpen(true)}
            onBlur={() => setTimeout(() => setDepartmentDropdownOpen(false), 150)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Type or select department"
          />
          {departmentDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
              {departments
                .filter(dept => 
                  !departmentSearchTerm || dept.toLowerCase().includes(departmentSearchTerm.toLowerCase())
                )
                .map(dept => (
                  <div
                    key={dept}
                    onClick={() => {
                      handleInputChange('department', dept)
                      setDepartmentSearchTerm('')
                      setDepartmentDropdownOpen(false)
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    {dept}
                  </div>
                ))}
              {departments.filter(dept => 
                !departmentSearchTerm || dept.toLowerCase().includes(departmentSearchTerm.toLowerCase())
              ).length === 0 && (
                <div className="px-4 py-2.5 text-gray-500 text-sm">No departments found</div>
              )}
            </div>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specialization <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={specializationSearchTerm || formData.specialization}
            onChange={(e) => {
              setSpecializationSearchTerm(e.target.value)
              setSpecializationDropdownOpen(true)
              handleInputChange('specialization', e.target.value)
            }}
            onFocus={() => setSpecializationDropdownOpen(true)}
            onBlur={() => setTimeout(() => setSpecializationDropdownOpen(false), 150)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Type or select specialization"
          />
          {specializationDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
              {specializations
                .filter(spec => 
                  !specializationSearchTerm || spec.toLowerCase().includes(specializationSearchTerm.toLowerCase())
                )
                .map(spec => (
                  <div
                    key={spec}
                    onClick={() => {
                      handleInputChange('specialization', spec)
                      setSpecializationSearchTerm('')
                      setSpecializationDropdownOpen(false)
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    {spec}
                  </div>
                ))}
              {specializations.filter(spec => 
                !specializationSearchTerm || spec.toLowerCase().includes(specializationSearchTerm.toLowerCase())
              ).length === 0 && (
                <div className="px-4 py-2.5 text-gray-500 text-sm">No specializations found</div>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Years of Experience <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            required
            min="0"
            max="50"
            value={formData.experience}
            onChange={(e) => handleInputChange('experience', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Consultation Fee (₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            required
            min="0"
            value={formData.consultationFee}
            onChange={(e) => handleInputChange('consultationFee', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Consultation Type
          </label>
          <select
            value={formData.consultationType}
            onChange={(e) => handleInputChange('consultationType', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Consultation Type</option>
            <option value="In-Person">In-Person</option>
            <option value="Telemedicine">Telemedicine</option>
            <option value=" In-Person and Telemedicine">Both In-Person and Telemedicine</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Availability <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={formData.availability}
            onChange={(e) => handleInputChange('availability', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            {availabilityOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

    </div>
  )

  if (loading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <LocalHospital className="text-white" style={{fontSize: '24px'}} />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Doctor Management</h1>
                <p className="text-gray-600 text-xs sm:text-sm">Manage your medical team efficiently</p>
              </div>
            </div>
            <button 
              onClick={() => {
                setIsAddMode(true)
                setIsAddModalOpen(true)
              }}
              className="w-full sm:w-auto group relative bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
            >
              <Add style={{fontSize: '20px'}} />
              <span>Add Doctor</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Premium Search & Filter Bar */}
        <div className="backdrop-blur-xl bg-white/60 border border-gray-300 rounded-2xl p-5 sm:p-6 shadow-lg mb-8 hover:shadow-xl transition-all">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search Input - Full Width on Mobile */}
            <div className="sm:col-span-2 lg:col-span-2">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Search className="text-blue-500" style={{fontSize: '20px'}} />
                Search
              </label>
              <input 
                type="text" 
                placeholder="Doctor name or specialization..." 
                className="w-full px-4 py-2.5 bg-white/80 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder-gray-500 transition-all duration-200 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Department Filter */}
            <div className="lg:col-span-1">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <LocalHospital className="text-green-500" style={{fontSize: '20px'}} />
                Dept
              </label>
              <div className="relative">
                <select 
                  className="w-full px-3 py-2.5 pr-8 bg-white/80 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 text-gray-900 transition-all duration-200 text-sm appearance-none cursor-pointer"
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  <option value="">All</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <ExpandMore className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none" style={{fontSize: '20px'}} />
              </div>
            </div>
            {/* Status Filter */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiberManualRecord className="text-orange-500" style={{fontSize: '20px'}} />
                Status
              </label>
              <div className="relative">
                <select 
                  className="w-full px-3 py-2.5 pr-8 bg-white/80 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-gray-900 transition-all duration-200 text-sm appearance-none cursor-pointer"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <ExpandMore className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none" style={{fontSize: '20px'}} />
              </div>
            </div>
            {/* Consultation Type Filter */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <LocalHospital className="text-purple-500" style={{fontSize: '20px'}} />
                Consultation Type
              </label>
              <div className="relative">
                <select 
                  className="w-full px-3 py-2.5 pr-8 bg-white/80 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-gray-900 transition-all duration-200 text-sm appearance-none cursor-pointer"
                  value={consultationTypeFilter}
                  onChange={(e) => setConsultationTypeFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="In-Person">In-Person</option>
                  <option value="Telemedicine">Telemedicine</option>
                  <option value=" In-Person and Telemedicine">Both</option>
                </select>
                <ExpandMore className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none" style={{fontSize: '20px'}} />
              </div>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
            {filteredDoctors.map((doctor, idx) => {
              return (
              <div 
                key={doctor.id} 
                className="group h-full backdrop-blur-3xl bg-gradient-to-br from-white/30 to-white/10 border border-gray-300 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden relative cursor-pointer"
                style={{animationDelay: `${idx * 50}ms`}}
              >
                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-4xl"></div>

                {/* Main Card Content - Click to open modal */}
                <div 
                  onClick={() => openViewModal(doctor)}
                  className="relative p-6 sm:p-7"
                >
                  {/* Collapsed View - Always Show */}
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="relative flex-shrink-0">
                          <img 
                            src={doctor.image} 
                            className="w-16 h-16 rounded-3xl border border-white/60 shadow-lg group-hover:scale-110 transition-transform duration-500 object-cover backdrop-blur-sm" 
                            alt={doctor.name}
                          />
                          <div className={`absolute -bottom-2 -right-2 w-5 h-5 border-2 border-white/80 rounded-full animate-pulse shadow-lg backdrop-blur-sm ${
                            doctor.status === 'Active' 
                              ? 'bg-emerald-400/70' 
                              : 'bg-slate-400/70'
                          }`}></div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-gray-800/95 text-base sm:text-lg group-hover:text-gray-900 transition-all duration-300 truncate">{doctor.name}</h3>
                          <p className="text-xs text-gray-700/60 font-semibold mt-1">{doctor.id}</p>
                          <p className="text-xs text-blue-600/80 font-medium mt-1.5">{doctor.specialization}</p>
                        </div>
                      </div>
                      <span className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ml-2 backdrop-blur-md border border-white/60 transition-all duration-300 ${
                        doctor.status === 'Active' 
                          ? 'bg-emerald-500/15 text-emerald-700/90 border-emerald-400/40' 
                          : 'bg-slate-500/15 text-slate-700/90 border-slate-400/40'
                      } flex items-center gap-1`}>
                        {doctor.status === 'Active' ? (
                          <CheckCircle style={{fontSize: '16px'}} />
                        ) : (
                          <Close style={{fontSize: '16px'}} />
                        )}
                        {doctor.status}
                      </span>
                    </div>
                    <div className="text-center mt-4 text-xs text-gray-600/70 font-medium">Click to view details</div>
                  </div>
                </div>
              </div>
            )
            })}
          </div>
        ) : (
          <div className="text-center py-24 backdrop-blur-3xl bg-gradient-to-br from-white/30 to-white/10 border border-white/50 rounded-4xl shadow-2xl">
            <div className="mb-8 inline-flex items-center justify-center w-28 h-28 rounded-full backdrop-blur-md bg-white/15 border border-white/40">
              <LocalHospital className="text-gray-600/80" style={{fontSize: '72px'}} />
            </div>
            <h3 className="text-4xl font-bold text-gray-800/95 mb-4">No Doctors Found</h3>
            <p className="text-gray-700/80 mb-10 text-lg font-medium">Try adjusting your filters or add a new doctor</p>
            <button
              onClick={() => {
                setIsAddMode(true)
                setIsAddModalOpen(true)
              }}
              className="inline-flex items-center gap-2 backdrop-blur-md bg-white/15 hover:bg-white/28 border border-white/45 hover:border-white/65 text-gray-800/95 px-10 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg"
            >
              <Add style={{fontSize: '20px'}} />
              Add First Doctor
            </button>
          </div>
        )}
      </div>

      {/* Add Doctor Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => {
          setIsAddModalOpen(false)
          resetForm()
        }} 
        title="Add New Doctor"
        size="lg"
      >
        <div className="bg-gradient-to-b from-blue-50/50 to-white/50 rounded-lg p-2">
          {renderFormFields()}
        </div>
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200/50 mt-6">
          <button
            type="button"
            onClick={() => {
              setIsAddModalOpen(false)
              resetForm()
            }}
            className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 active:scale-95"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddDoctor}
            disabled={!formData.name || !formData.email || !formData.department || !formData.specialization}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Add style={{fontSize: '20px'}} />
            Add Doctor
          </button>
        </div>
      </Modal>

      {/* Edit Doctor Modal */}
      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false)
          resetForm()
        }} 
        title="Edit Doctor"
        size="lg"
      >
        <div className="bg-gradient-to-b from-indigo-50/50 to-white/50 rounded-lg p-2">
          {renderFormFields()}
        </div>
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200/50 mt-6">
          <button
            type="button"
            onClick={() => {
              setIsEditModalOpen(false)
              resetForm()
            }}
            className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 active:scale-95"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleEditDoctor}
            disabled={!formData.name || !formData.email || !formData.department || !formData.specialization}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <SaveOutlined style={{fontSize: '20px'}} />
            Update Doctor
          </button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => {
          setIsDeleteModalOpen(false)
          setCurrentDoctor(null)
        }} 
        title="Delete Doctor"
        size="md"
      >
        <div className="text-center p-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center shadow-lg">
            <WarningAmber className="text-red-600" style={{fontSize: '36px'}} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Confirm Deletion</h3>
          <p className="text-gray-600 mb-2">Are you sure you want to delete <span className="font-bold text-red-600">{currentDoctor?.name}</span>?</p>
          <p className="text-gray-500 text-sm mb-8">This action cannot be undone.</p>
          <div className="flex flex-col-reverse sm:flex-row justify-center gap-3">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false)
                setCurrentDoctor(null)
              }}
              className="px-8 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteDoctor}
              className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <DeleteOutline style={{fontSize: '20px'}} />
              Delete Doctor
            </button>
          </div>
        </div>
      </Modal>

      {/* View Doctor Details Modal */}
      <Modal 
        isOpen={isViewModalOpen} 
        onClose={() => {
          setIsViewModalOpen(false)
          setCurrentDoctor(null)
          setShowPassword(false)
        }} 
        title="Doctor Details"
        size="lg"
      >
        {currentDoctor && (
          <div>
            {/* Premium Header Section */}
            <div className="relative bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-md border-b border-blue-200/50 rounded-t-3xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
              {/* Status Badge - Top Right */}
              <span className={`absolute top-3 right-3 sm:top-6 sm:right-6 inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold backdrop-blur-md border ${
                currentDoctor.status === 'Active' 
                  ? 'bg-emerald-500/20 text-emerald-700/90 border-emerald-400/50' 
                  : 'bg-slate-500/20 text-slate-700/90 border-slate-400/50'
              }`}>
                {currentDoctor.status === 'Active' ? (
                  <CheckCircle style={{fontSize: '18px'}} />
                ) : (
                  <Close style={{fontSize: '18px'}} />
                )}
                {currentDoctor.status}
              </span>

              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6">
                <div className="relative">
                  <img 
                    src={currentDoctor.image} 
                    className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl border-4 border-white/80 shadow-xl object-cover" 
                    alt={currentDoctor.name}
                  />
                  <div className={`absolute -bottom-2 -right-2 w-5 sm:w-6 h-5 sm:h-6 border-3 border-white rounded-full animate-pulse ${
                    currentDoctor.status === 'Active' 
                      ? 'bg-emerald-400' 
                      : 'bg-slate-400'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">{currentDoctor.name}</h2>
                  <p className="text-gray-700 text-sm font-semibold mb-2 flex items-center gap-2">
                    <Badge className="text-blue-500/70" style={{fontSize: '20px'}} />
                    {currentDoctor.id}
                  </p>
                  <p className="text-lg font-bold text-blue-600/90 flex items-center gap-2">
                    <LocalHospital className="text-blue-600/70" style={{fontSize: '20px'}} />
                    {currentDoctor.specialization}
                  </p>
                </div>
              </div>
            </div>

            {/* Info Grid - Premium Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 mb-6 sm:mb-8 px-4 sm:px-6 md:px-8">
              {/* Department */}
              <div className="backdrop-blur-md bg-white border-2 border-blue-300/50 rounded-2xl p-5 hover:from-blue-500/25 hover:to-blue-500/15 hover:border-blue-400/75 transition-all shadow-md hover:shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center">
                    <LocalHospital className="text-blue-700" style={{fontSize: '20px'}} />
                  </div>
                  <label className="text-xs font-bold text-blue-700/90 uppercase tracking-wide">Department</label>
                </div>
                <p className="text-lg font-bold text-black-900 ml-13">{currentDoctor.department}</p>
              </div>

              {/* Experience */}
              <div className="backdrop-blur-md bg-white border-2 border-blue-300/50 rounded-2xl p-5 hover:from-blue-500/25 hover:to-blue-500/15 hover:border-blue-400/75 transition-all shadow-md hover:shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-500/30 rounded-lg flex items-center justify-center">
                    <EmojiEvents className="text-purple-700" style={{fontSize: '20px'}} />
                  </div>
                  <label className="text-xs font-bold text-purple-700/90 uppercase tracking-wide">Experience</label>
                </div>
                <p className="text-lg font-bold text-black-900 ml-13">{currentDoctor.experience} Years</p>
              </div>

              {/* Email */}
              <div className="backdrop-blur-md bg-white border-2 border-blue-300/50 rounded-2xl p-5 hover:from-blue-500/25 hover:to-blue-500/15 hover:border-blue-400/75 transition-all shadow-md hover:shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500/30 rounded-lg flex items-center justify-center">
                    <MailOutline className="text-green-700" style={{fontSize: '20px'}} />
                  </div>
                  <label className="text-xs font-bold text-green-700/90 uppercase tracking-wide">Email</label>
                </div>
                <p className="text-sm font-semibold text-black-900 break-all ml-13">{currentDoctor.email}</p>
              </div>

              {/* Personal Email */}
              {currentDoctor.personalEmail && (
                <div className="backdrop-blur-md bg-white border-2 border-blue-300/50 rounded-2xl p-5 hover:from-blue-500/25 hover:to-blue-500/15 hover:border-blue-400/75 transition-all shadow-md hover:shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-rose-500/30 rounded-lg flex items-center justify-center">
                      <MarkEmailRead className="text-rose-700" style={{fontSize: '20px'}} />
                    </div>
                    <label className="text-xs font-bold text-rose-700/90 uppercase tracking-wide">Personal Email</label>
                  </div>
                  <p className="text-sm font-semibold text-black-900 break-all ml-13">{currentDoctor.personalEmail}</p>
                </div>
              )}

              {/* Contact */}
              <div className="backdrop-blur-md bg-white border-2 border-blue-300/50 rounded-2xl p-5 hover:from-blue-500/25 hover:to-blue-500/15 hover:border-blue-400/75 transition-all shadow-md hover:shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-500/30 rounded-lg flex items-center justify-center">
                    <Phone className="text-orange-700" style={{fontSize: '20px'}} />
                  </div>
                  <label className="text-xs font-bold text-orange-700/90 uppercase tracking-wide">Contact</label>
                </div>
                <p className="text-lg font-bold text-black-900 ml-13">{currentDoctor.contact}</p>
              </div>

              {/* Availability */}
              <div className="backdrop-blur-md bg-white border-2 border-blue-300/50 rounded-2xl p-5 hover:from-blue-500/25 hover:to-blue-500/15 hover:border-blue-400/75 transition-all shadow-md hover:shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-teal-500/30 rounded-lg flex items-center justify-center">
                    <CalendarMonth className="text-teal-700" style={{fontSize: '20px'}} />
                  </div>
                  <label className="text-xs font-bold text-teal-700/90 uppercase tracking-wide">Availability</label>
                </div>
                <p className="text-lg font-bold text-black-900 ml-13">{currentDoctor.availability}</p>
              </div>

              {/* Consultation Fee */}
              <div className="backdrop-blur-md bg-white border-2 border-blue-300/50 rounded-2xl p-5 hover:from-blue-500/25 hover:to-blue-500/15 hover:border-blue-400/75 transition-all shadow-md hover:shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-yellow-500/30 rounded-lg flex items-center justify-center">
                    <CurrencyRupee className="text-yellow-700" style={{fontSize: '20px'}} />
                  </div>
                  <label className="text-xs font-bold text-yellow-700/90 uppercase tracking-wide">Consultation Fee</label>
                </div>
                <p className="text-xl font-bold text-black-900 ml-13">₹{currentDoctor.fee}</p>
              </div>

              {/* Consultation Type */}
              {currentDoctor.consultationType && (
                <div className="backdrop-blur-md bg-white border-2 border-blue-300/50 rounded-2xl p-5 hover:from-blue-500/25 hover:to-blue-500/15 hover:border-blue-400/75 transition-all shadow-md hover:shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-pink-500/30 rounded-lg flex items-center justify-center">
                      <VideoCall className="text-pink-700" style={{fontSize: '20px'}} />
                    </div>
                    <label className="text-xs font-bold text-pink-700/90 uppercase tracking-wide">Consultation Type</label>
                  </div>
                  <p className="text-lg font-bold text-black-900 ml-13">{currentDoctor.consultationType}</p>
                </div>
              )}

              {/* Qualification */}
              <div className="backdrop-blur-md bg-white border-2 border-blue-300/50 rounded-2xl p-5 hover:from-blue-500/25 hover:to-blue-500/15 hover:border-blue-400/75 transition-all shadow-md hover:shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-500/30 rounded-lg flex items-center justify-center">
                    <School className="text-indigo-700" style={{fontSize: '20px'}} />
                  </div>
                  <label className="text-xs font-bold text-indigo-700/90 uppercase tracking-wide">Qualification</label>
                </div>
                <p className="text-black-900 font-semibold ml-13">{currentDoctor.qualification}</p>
              </div>

              {/* Password */}
              {currentDoctor.password && (
                <div className="backdrop-blur-md bg-white border-2 border-blue-300/50 rounded-2xl p-5 hover:from-blue-500/25 hover:to-blue-500/15 hover:border-blue-400/75 transition-all shadow-md hover:shadow-lg">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500/30 rounded-lg flex items-center justify-center">
                        <Lock className="text-red-700" style={{fontSize: '20px'}} />
                      </div>
                      <label className="text-xs font-bold text-red-700/90 uppercase tracking-wide">Password</label>
                    </div>
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-2 rounded-lg hover:bg-red-500/10 transition-all text-red-700 cursor-pointer"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <VisibilityOff style={{fontSize: '20px'}} /> : <Visibility style={{fontSize: '20px'}} />}
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-black-900 font-mono tracking-widest ml-13 select-none break-all">
                    {showPassword ? currentDoctor.password : '•'.repeat(Math.min(currentDoctor.password.length, 12))}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">{showPassword ? 'Password visible' : 'Masked for security'}</p>
                </div>
              )}
            </div>

            {/* Bio Section */}
            <div className="space-y-3 sm:space-y-5 mb-6 sm:mb-8 px-4 sm:px-6 md:px-8">
              {currentDoctor.bio && (
                <div className="backdrop-blur-md bg-white border-2 border-blue-300/50 rounded-2xl p-5 hover:from-blue-500/25 hover:to-blue-500/15 hover:border-blue-400/75 transition-all shadow-md hover:shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-cyan-500/30 rounded-lg flex items-center justify-center">
                      <MenuBook className="text-cyan-700" style={{fontSize: '20px'}} />
                    </div>
                    <label className="text-xs font-bold text-cyan-700/90 uppercase tracking-wide">Bio</label>
                  </div>
                  <p className="text-black-900 font-medium ml-13 leading-relaxed">{currentDoctor.bio}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4 sm:pt-6 px-4 sm:px-6 md:px-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setIsViewModalOpen(false)
                  setCurrentDoctor(null)
                }}
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base  bg-gray-200 border-2 border-white/60 rounded-xl text-gray-700 font-semibold hover:bg-gray-300 hover:border-white/80 transition-all duration-200 active:scale-95"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleToggleStatus(currentDoctor.id)
                  setCurrentDoctor({...currentDoctor, status: currentDoctor.status === 'Active' ? 'Inactive' : 'Active'})
                }}
                className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-xl transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 backdrop-blur-md border ${
                  currentDoctor.status === 'Active' 
                    ? 'bg-gradient-to-r from-orange-500/80 to-red-600/80 hover:from-orange-600 hover:to-red-700 text-white border-orange-400/50' 
                    : 'bg-gradient-to-r from-green-500/80 to-emerald-600/80 hover:from-green-600 hover:to-emerald-700 text-white border-green-400/50'
                }`}
              >
                {currentDoctor.status === 'Active' ? (
                  <Pause style={{fontSize: '20px'}} />
                ) : (
                  <PlayArrow style={{fontSize: '20px'}} />
                )}
                <span className="hidden sm:inline">{currentDoctor.status === 'Active' ? 'Deactivate' : 'Activate'}</span>
                <span className="sm:hidden">{currentDoctor.status === 'Active' ? 'Deactivate' : 'Activate'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsViewModalOpen(false)
                  openEditModal(currentDoctor)
                }}
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl backdrop-blur-md border border-blue-400/50 flex items-center justify-center gap-2"
              >
                <Edit style={{fontSize: '20px'}} />
                <span className="hidden sm:inline">Edit Doctor</span>
                <span className="sm:hidden">Edit</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default DoctorManagement
