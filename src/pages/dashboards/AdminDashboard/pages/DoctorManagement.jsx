import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import Modal from '../../../../components/common/Modal/Modal'

const DoctorManagement = () => {
  const [loading, setLoading] = useState(true)
  const [doctors, setDoctors] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentDoctor, setCurrentDoctor] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    department: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    consultationFee: '',
    availability: '9AM-5PM',
    bio: ''
  })

  useEffect(() => {
    loadDoctors()
  }, [])

  const loadDoctors = async () => {
    setLoading(true)
    setTimeout(() => {
      setDoctors([
        { 
          id: 'DOC-1001', 
          name: 'Dr. Meena Rao', 
          specialization: 'Cardiology', 
          department: 'Cardiology', 
          availability: '9AM-5PM', 
          fee: 800, 
          contact: '+91 98765 43210', 
          status: 'Active', 
          image: 'https://i.pravatar.cc/100?img=1',
          email: 'meena.rao@hospital.com',
          qualification: 'MBBS, MD Cardiology',
          experience: '12',
          bio: 'Senior Cardiologist with 12 years of experience'
        },
        { 
          id: 'DOC-1002', 
          name: 'Dr. Vivek Sharma', 
          specialization: 'Orthopedics', 
          department: 'Orthopedics', 
          availability: '10AM-6PM', 
          fee: 750, 
          contact: '+91 98765 43211', 
          status: 'Active', 
          image: 'https://i.pravatar.cc/100?img=2',
          email: 'vivek.sharma@hospital.com',
          qualification: 'MBBS, MS Orthopedics',
          experience: '8',
          bio: 'Orthopedic surgeon specializing in joint replacements'
        },
        { 
          id: 'DOC-1003', 
          name: 'Dr. Rajesh Menon', 
          specialization: 'Neurology', 
          department: 'Neurology', 
          availability: '8AM-4PM', 
          fee: 900, 
          contact: '+91 98765 43212', 
          status: 'Active', 
          image: 'https://i.pravatar.cc/100?img=3',
          email: 'rajesh.menon@hospital.com',
          qualification: 'MBBS, DM Neurology',
          experience: '15',
          bio: 'Neurologist with expertise in stroke management'
        },
        { 
          id: 'DOC-1004', 
          name: 'Dr. Anjali Desai', 
          specialization: 'Pediatrics', 
          department: 'Pediatrics', 
          availability: '24/7 On-call', 
          fee: 600, 
          contact: '+91 98765 43213', 
          status: 'Active', 
          image: 'https://i.pravatar.cc/100?img=4',
          email: 'anjali.desai@hospital.com',
          qualification: 'MBBS, DCH',
          experience: '10',
          bio: 'Pediatrician with special interest in child development'
        }
      ])
      setLoading(false)
    }, 1000)
  }

  // Add new doctor
  const handleAddDoctor = () => {
    if (!validateForm()) return

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
      qualification: formData.qualification,
      experience: formData.experience,
      bio: formData.bio
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
              qualification: formData.qualification,
              experience: formData.experience,
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
    setCurrentDoctor(doctor)
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      department: doctor.department,
      email: doctor.email,
      phone: doctor.contact,
      qualification: doctor.qualification,
      experience: doctor.experience,
      consultationFee: doctor.fee.toString(),
      availability: doctor.availability,
      bio: doctor.bio || ''
    })
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
      phone: '',
      qualification: '',
      experience: '',
      consultationFee: '',
      availability: '9AM-5PM',
      bio: ''
    })
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
    
    return matchesSearch && matchesDepartment && matchesStatus
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
            Full Name *
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
            Email Address *
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
            Phone Number *
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
            Qualification *
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

      {/* Professional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department *
          </label>
          <select
            required
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specialization *
          </label>
          <select
            required
            value={formData.specialization}
            onChange={(e) => handleInputChange('specialization', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Specialization</option>
            {specializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Years of Experience *
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
            Consultation Fee (₹) *
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
      </div>

      {/* Availability */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Availability *
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

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Professional Bio
        </label>
        <textarea
          rows="3"
          value={formData.bio}
          onChange={(e) => handleInputChange('bio', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Brief description about the doctor's expertise and experience..."
        />
      </div>
    </div>
  )

  if (loading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <i className="fas fa-user-md text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Doctor Management</h1>
                <p className="text-gray-600 text-xs sm:text-sm">Manage your medical team efficiently</p>
              </div>
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="w-full sm:w-auto group relative bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
            >
              <i className="fas fa-plus"></i>
              <span>Add Doctor</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Premium Search & Filter Bar */}
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-5 sm:p-6 shadow-lg mb-8 hover:shadow-xl transition-all">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search Input - Full Width on Mobile */}
            <div className="sm:col-span-2 lg:col-span-2">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <i className="fas fa-search text-blue-500"></i>
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
                <i className="fas fa-hospital text-green-500"></i>
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
                <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none text-sm"></i>
              </div>
            </div>
            {/* Status Filter */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <i className="fas fa-circle-notch text-orange-500"></i>
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
                <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none text-sm"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredDoctors.map((doctor, idx) => {
              return (
              <div 
                key={doctor.id} 
                className="group h-full backdrop-blur-3xl bg-gradient-to-br from-white/30 to-white/10 border border-white/50 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden relative cursor-pointer"
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
                      }`}>
                        <i className={`fas ${doctor.status === 'Active' ? 'fa-check' : 'fa-times'} mr-1.5`}></i>
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
              <i className="fas fa-user-md text-gray-600/80 text-6xl"></i>
            </div>
            <h3 className="text-4xl font-bold text-gray-800/95 mb-4">No Doctors Found</h3>
            <p className="text-gray-700/80 mb-10 text-lg font-medium">Try adjusting your filters or add a new doctor</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 backdrop-blur-md bg-white/15 hover:bg-white/28 border border-white/45 hover:border-white/65 text-gray-800/95 px-10 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg"
            >
              <i className="fas fa-plus"></i>
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
            <i className="fas fa-plus"></i>
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
            <i className="fas fa-save"></i>
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
            <i className="fas fa-exclamation-triangle text-red-600 text-3xl"></i>
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
              <i className="fas fa-trash"></i>
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
        }} 
        title="Doctor Details"
        size="lg"
      >
        {currentDoctor && (
          <div>
            {/* Premium Header Section */}
            <div className="relative bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-md border-b border-blue-200/50 rounded-t-3xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
              {/* Status Badge - Top Right */}
              <span className={`absolute top-3 right-3 sm:top-6 sm:right-6 inline-block px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold backdrop-blur-md border ${
                currentDoctor.status === 'Active' 
                  ? 'bg-emerald-500/20 text-emerald-700/90 border-emerald-400/50' 
                  : 'bg-slate-500/20 text-slate-700/90 border-slate-400/50'
              }`}>
                <i className={`fas ${currentDoctor.status === 'Active' ? 'fa-check-circle' : 'fa-times-circle'} mr-2`}></i>
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
                    <i className="fas fa-id-badge text-blublacke-500/70"></i>
                    {currentDoctor.id}
                  </p>
                  <p className="text-lg font-bold text-blue-600/90 flex items-center gap-2">
                    <i className="fas fa-stethoscope text-black-500/70"></i>
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
                    <i className="fas fa-hospital text-blue-700 text-lg"></i>
                  </div>
                  <label className="text-xs font-bold text-blue-700/90 uppercase tracking-wide">Department</label>
                </div>
                <p className="text-lg font-bold text-black-900 ml-13">{currentDoctor.department}</p>
              </div>

              {/* Experience */}
              <div className="backdrop-blur-md bg-white border-2 border-blue-300/50 rounded-2xl p-5 hover:from-blue-500/25 hover:to-blue-500/15 hover:border-blue-400/75 transition-all shadow-md hover:shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-500/30 rounded-lg flex items-center justify-center">
                    <i className="fas fa-award text-purple-700 text-lg"></i>
                  </div>
                  <label className="text-xs font-bold text-purple-700/90 uppercase tracking-wide">Experience</label>
                </div>
                <p className="text-lg font-bold text-black-900 ml-13">{currentDoctor.experience} Years</p>
              </div>

              {/* Email */}
              <div className="backdrop-blur-md bg-white border-2 border-blue-300/50 rounded-2xl p-5 hover:from-blue-500/25 hover:to-blue-500/15 hover:border-blue-400/75 transition-all shadow-md hover:shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500/30 rounded-lg flex items-center justify-center">
                    <i className="fas fa-envelope text-green-700 text-lg"></i>
                  </div>
                  <label className="text-xs font-bold text-green-700/90 uppercase tracking-wide">Email</label>
                </div>
                <p className="text-sm font-semibold text-black-900 break-all ml-13">{currentDoctor.email}</p>
              </div>

              {/* Contact */}
              <div className="backdrop-blur-md bg-white border-2 border-blue-300/50 rounded-2xl p-5 hover:from-blue-500/25 hover:to-blue-500/15 hover:border-blue-400/75 transition-all shadow-md hover:shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-500/30 rounded-lg flex items-center justify-center">
                    <i className="fas fa-phone text-orange-700 text-lg"></i>
                  </div>
                  <label className="text-xs font-bold text-orange-700/90 uppercase tracking-wide">Contact</label>
                </div>
                <p className="text-lg font-bold text-black-900 ml-13">{currentDoctor.contact}</p>
              </div>

              {/* Availability */}
              <div className="backdrop-blur-md bg-white border-2 border-blue-300/50 rounded-2xl p-5 hover:from-blue-500/25 hover:to-blue-500/15 hover:border-blue-400/75 transition-all shadow-md hover:shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-teal-500/30 rounded-lg flex items-center justify-center">
                    <i className="fas fa-calendar text-teal-700 text-lg"></i>
                  </div>
                  <label className="text-xs font-bold text-teal-700/90 uppercase tracking-wide">Availability</label>
                </div>
                <p className="text-lg font-bold text-black-900 ml-13">{currentDoctor.availability}</p>
              </div>

              {/* Consultation Fee */}
              <div className="backdrop-blur-md bg-white border-2 border-blue-300/50 rounded-2xl p-5 hover:from-blue-500/25 hover:to-blue-500/15 hover:border-blue-400/75 transition-all shadow-md hover:shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-yellow-500/30 rounded-lg flex items-center justify-center">
                    <i className="fas fa-rupee-sign text-yellow-700 text-lg"></i>
                  </div>
                  <label className="text-xs font-bold text-yellow-700/90 uppercase tracking-wide">Consultation Fee</label>
                </div>
                <p className="text-xl font-bold text-black-900 ml-13">₹{currentDoctor.fee}</p>
              </div>
            </div>

            {/* Qualification and Bio Section */}
            <div className="space-y-3 sm:space-y-5 mb-6 sm:mb-8 px-4 sm:px-6 md:px-8">
              <div className="backdrop-blur-md bg-white border-2 border-blue-300/50 rounded-2xl p-5 hover:from-blue-500/25 hover:to-blue-500/15 hover:border-blue-400/75 transition-all shadow-md hover:shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-500/30 rounded-lg flex items-center justify-center">
                    <i className="fas fa-graduation-cap text-indigo-700 text-lg"></i>
                  </div>
                  <label className="text-xs font-bold text-indigo-700/90 uppercase tracking-wide">Qualification</label>
                </div>
                <p className="text-black-900 font-semibold ml-13">{currentDoctor.qualification}</p>
              </div>
              {currentDoctor.bio && (
                <div className="backdrop-blur-md bg-white border-2 border-blue-300/50 rounded-2xl p-5 hover:from-blue-500/25 hover:to-blue-500/15 hover:border-blue-400/75 transition-all shadow-md hover:shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-cyan-500/30 rounded-lg flex items-center justify-center">
                      <i className="fas fa-book text-cyan-700 text-lg"></i>
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
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base backdrop-blur-md bg-white/40 border-2 border-white/60 rounded-xl text-gray-700 font-semibold hover:bg-white/50 hover:border-white/80 transition-all duration-200 active:scale-95"
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
                <i className={`fas ${currentDoctor.status === 'Active' ? 'fa-pause' : 'fa-play'}`}></i>
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
                <i className="fas fa-edit"></i>
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
