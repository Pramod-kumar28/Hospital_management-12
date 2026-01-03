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
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">
           Doctor Management
        </h2>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i className="fas fa-plus mr-2"></i>Add Doctor
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg card-shadow border mb-6">
        <div className="flex flex-wrap gap-4">
          <input 
            type="text" 
            placeholder="Search doctors..." 
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
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
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

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="bg-white rounded-xl card-shadow border p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={doctor.image} className="w-12 h-12 rounded-full" alt="Doctor" />
                <div>
                  <h3 className="font-semibold text-blue-700">{doctor.name}</h3>
                  <p className="text-xs text-gray-500">{doctor.id}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                doctor.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {doctor.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex justify-between">
                <span>Specialization:</span>
                <span className="font-medium">{doctor.specialization}</span>
              </div>
              <div className="flex justify-between">
                <span>Department:</span>
                <span className="font-medium">{doctor.department}</span>
              </div>
              <div className="flex justify-between">
                <span>Availability:</span>
                <span className="text-gray-500">{doctor.availability}</span>
              </div>
              <div className="flex justify-between">
                <span>Consultation Fee:</span>
                <span className="font-medium">₹{doctor.fee}</span>
              </div>
              <div className="flex justify-between">
                <span>Contact:</span>
                <span className="text-gray-500">{doctor.contact}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                {doctor.specialization}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => openEditModal(doctor)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  title="Edit Doctor"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  onClick={() => handleToggleStatus(doctor.id)}
                  className={`transition-colors ${
                    doctor.status === 'Active' 
                      ? 'text-yellow-600 hover:text-yellow-800' 
                      : 'text-green-600 hover:text-green-800'
                  }`}
                  title={doctor.status === 'Active' ? 'Deactivate' : 'Activate'}
                >
                  <i className={`fas ${doctor.status === 'Active' ? 'fa-pause' : 'fa-play'}`}></i>
                </button>
                <button 
                  onClick={() => openDeleteModal(doctor)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                  title="Delete Doctor"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <i className="fas fa-user-md text-blue-500 text-3xl mb-2"></i>
          <p>No doctors found matching your criteria</p>
        </div>
      )}

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
        {renderFormFields()}
        <div className="flex justify-end gap-3 pt-4 border-t mt-6">
          <button
            type="button"
            onClick={() => {
              setIsAddModalOpen(false)
              resetForm()
            }}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddDoctor}
            disabled={!formData.name || !formData.email || !formData.department || !formData.specialization}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
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
        {renderFormFields()}
        <div className="flex justify-end gap-3 pt-4 border-t mt-6">
          <button
            type="button"
            onClick={() => {
              setIsEditModalOpen(false)
              resetForm()
            }}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleEditDoctor}
            disabled={!formData.name || !formData.email || !formData.department || !formData.specialization}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <i className="fas fa-save mr-2"></i>
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
        <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Confirm Deletion
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete <span className="font-semibold">{currentDoctor?.name}</span>? 
            This action cannot be undone.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false)
                setCurrentDoctor(null)
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteDoctor}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <i className="fas fa-trash mr-2"></i>
              Delete Doctor
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DoctorManagement