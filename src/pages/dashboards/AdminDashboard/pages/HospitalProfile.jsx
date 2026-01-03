import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const HospitalProfile = () => {
  const [loading, setLoading] = useState(true)
  const [hospital, setHospital] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    loadHospitalData()
  }, [])

  const loadHospitalData = async () => {
    setLoading(true)
    setTimeout(() => {
      const hospitalData = {
        name: "City General Hospital",
        logo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=100&h=100&fit=crop",
        address: "123 Medical Center Drive, Healthcare City",
        contact: "+1 (555) 123-4567",
        email: "info@citygeneral.com",
        openingHours: "24/7 Emergency, OPD: 8AM-8PM",
        departments: ["Cardiology", "Orthopedics", "Neurology", "Pediatrics", "ENT"],
        insurancePartners: ["HealthGuard", "MediCare Plus", "SecureLife", "Wellness First"]
      }
      setHospital(hospitalData)
      setFormData(hospitalData)
      setLoading(false)
    }, 1000)
  }

  const handleEditProfile = () => {
    setIsEditing(true)
  }

  const handleSaveProfile = () => {
    setHospital(formData)
    setIsEditing(false)
    // Here you would typically make an API call to save the data
    console.log('Saving hospital data:', formData)
  }

  const handleCancelEdit = () => {
    setFormData(hospital)
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleUpdateLogo = () => {
    // Simulate file input for logo update
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          setHospital(prev => ({
            ...prev,
            logo: event.target.result
          }))
          setFormData(prev => ({
            ...prev,
            logo: event.target.result
          }))
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const handleAddDepartment = () => {
    const newDept = prompt('Enter new department name:')
    if (newDept && newDept.trim()) {
      const updatedDepartments = [...hospital.departments, newDept.trim()]
      setHospital(prev => ({ ...prev, departments: updatedDepartments }))
      setFormData(prev => ({ ...prev, departments: updatedDepartments }))
    }
  }

  const handleManageInsurance = () => {
    const newInsurance = prompt('Add new insurance partner:')
    if (newInsurance && newInsurance.trim()) {
      const updatedInsurance = [...hospital.insurancePartners, newInsurance.trim()]
      setHospital(prev => ({ ...prev, insurancePartners: updatedInsurance }))
      setFormData(prev => ({ ...prev, insurancePartners: updatedInsurance }))
    }
  }

  const handleUpdateHours = () => {
    const newHours = prompt('Enter new operating hours:', hospital.openingHours)
    if (newHours && newHours.trim()) {
      setHospital(prev => ({ ...prev, openingHours: newHours }))
      setFormData(prev => ({ ...prev, openingHours: newHours }))
    }
  }

  const handleViewAnalytics = () => {
    alert('Redirecting to hospital analytics dashboard...')
    // Here you would typically navigate to analytics page
    // navigate('/analytics')
  }

  const removeDepartment = (deptToRemove) => {
    const updatedDepartments = hospital.departments.filter(dept => dept !== deptToRemove)
    setHospital(prev => ({ ...prev, departments: updatedDepartments }))
    setFormData(prev => ({ ...prev, departments: updatedDepartments }))
  }

  const removeInsurance = (insuranceToRemove) => {
    const updatedInsurance = hospital.insurancePartners.filter(insurance => insurance !== insuranceToRemove)
    setHospital(prev => ({ ...prev, insurancePartners: updatedInsurance }))
    setFormData(prev => ({ ...prev, insurancePartners: updatedInsurance }))
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
       Hospital Profile
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hospital Information */}
        <div className="bg-white rounded-xl card-shadow border p-6 lg:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <img src={hospital.logo} className="w-20 h-20 rounded-lg object-cover" alt="Hospital Logo" />
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="text-2xl font-bold text-blue-700 border-b-2 border-blue-500 focus:outline-none"
                />
              ) : (
                <h3 className="text-2xl font-bold text-blue-700">{hospital.name}</h3>
              )}
              <p className="text-gray-600">Leading Healthcare Provider</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{hospital.address}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{hospital.contact}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{hospital.email}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Opening Hours</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.openingHours}
                    onChange={(e) => handleInputChange('openingHours', e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{hospital.openingHours}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departments</label>
                <div className="flex flex-wrap gap-1">
                  {hospital.departments.map(dept => (
                    <span key={dept} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center">
                      {dept}
                      {isEditing && (
                        <button
                          onClick={() => removeDepartment(dept)}
                          className="ml-1 text-red-500 hover:text-red-700"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Partners</label>
                <div className="flex flex-wrap gap-1">
                  {hospital.insurancePartners.map(insurance => (
                    <span key={insurance} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex items-center">
                      {insurance}
                      {isEditing && (
                        <button
                          onClick={() => removeInsurance(insurance)}
                          className="ml-1 text-red-500 hover:text-red-700"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            {isEditing ? (
              <>
                <button 
                  onClick={handleSaveProfile}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  <i className="fas fa-save mr-2"></i>Save Changes
                </button>
                <button 
                  onClick={handleCancelEdit}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                  <i className="fas fa-times mr-2"></i>Cancel
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={handleEditProfile}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <i className="fas fa-edit mr-2"></i>Edit Profile
                </button>
                <button 
                  onClick={handleUpdateLogo}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  <i className="fas fa-image mr-2"></i>Update Logo
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-xl card-shadow border p-6">
          <h3 className="font-semibold mb-4 text-lg">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={handleAddDepartment}
              className="w-full text-left p-3 border rounded-lg hover:bg-blue-50 transition-colors"
            >
              <i className="fas fa-plus text-blue-500 mr-2"></i> Add New Department
            </button>
            <button 
              onClick={handleManageInsurance}
              className="w-full text-left p-3 border rounded-lg hover:bg-green-50 transition-colors"
            >
              <i className="fas fa-shield-alt text-green-500 mr-2"></i> Manage Insurance Partners
            </button>
            <button 
              onClick={handleUpdateHours}
              className="w-full text-left p-3 border rounded-lg hover:bg-purple-50 transition-colors"
            >
              <i className="fas fa-clock text-purple-500 mr-2"></i> Update Operating Hours
            </button>
            <button 
              onClick={handleViewAnalytics}
              className="w-full text-left p-3 border rounded-lg hover:bg-orange-50 transition-colors"
            >
              <i className="fas fa-chart-bar text-orange-500 mr-2"></i> View Hospital Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HospitalProfile