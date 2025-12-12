import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const Profile = () => {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState({})
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    setLoading(true)
    setTimeout(() => {
      const patientProfile = {
        basicInfo: {
          patientId: 'PAT-001',
          name: 'Ravi Kumar',
          age: 45,
          gender: 'Male',
          dob: '1978-03-15',
          bloodGroup: 'B+',
          maritalStatus: 'Married'
        },
        contactInfo: {
          phone: '+91 9876543210',
          email: 'ravi.kumar@email.com',
          address: '123 Main Street, Bangalore, Karnataka - 560001',
          emergencyContact: {
            name: 'Priya Kumar',
            relationship: 'Wife',
            phone: '+91 9876543211'
          }
        },
        medicalInfo: {
          height: '175 cm',
          weight: '75 kg',
          bmi: '24.5',
          allergies: ['Penicillin', 'Dust'],
          chronicConditions: ['Hypertension', 'Type 2 Diabetes'],
          surgeries: ['Appendectomy - 2005'],
          medications: ['Metformin', 'Aspirin']
        },
        insuranceInfo: {
          provider: 'Star Health Insurance',
          policyNumber: 'STAR-2023-12345',
          validity: '2023-12-31',
          coverage: 'Family Floater',
          sumInsured: '₹5,00,000'
        },
        familyHistory: {
          father: 'Hypertension',
          mother: 'Diabetes',
          siblings: 'None significant'
        }
      }
      
      setProfile(patientProfile)
      setFormData(patientProfile)
      setLoading(false)
    }, 1000)
  }

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleEmergencyContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        emergencyContact: {
          ...prev.contactInfo.emergencyContact,
          [field]: value
        }
      }
    }))
  }

  const handleSave = () => {
    setProfile(formData)
    setEditMode(false)
    alert('Profile updated successfully!')
  }

  const handleCancel = () => {
    setFormData(profile)
    setEditMode(false)
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">👤 My Profile</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your personal and medical information</p>
        </div>
        <div className="flex gap-2">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <i className="fas fa-edit mr-2"></i> Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
              {profile.basicInfo.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{profile.basicInfo.name}</h3>
              <div className="flex flex-wrap gap-3 mt-2">
                <span className="px-3 py-1 bg-white border border-blue-200 text-blue-700 rounded-full text-sm">
                  Patient ID: {profile.basicInfo.patientId}
                </span>
                <span className="px-3 py-1 bg-white border border-blue-200 text-blue-700 rounded-full text-sm">
                  Age: {profile.basicInfo.age} years
                </span>
                <span className="px-3 py-1 bg-white border border-blue-200 text-blue-700 rounded-full text-sm">
                  Blood Group: {profile.basicInfo.bloodGroup}
                </span>
              </div>
            </div>
          </div>
          <button className="px-4 py-2 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
            <i className="fas fa-qrcode mr-2"></i> View Digital Health Card
          </button>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl card-shadow border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg flex items-center">
              <i className="fas fa-user text-blue-500 mr-2"></i>
              Basic Information
            </h3>
            {editMode && (
              <span className="text-xs text-blue-600 font-medium">Editing</span>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                {editMode ? (
                  <input
                    type="text"
                    value={formData.basicInfo.name}
                    onChange={(e) => handleInputChange('basicInfo', 'name', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="font-medium text-gray-800">{profile.basicInfo.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date of Birth</label>
                {editMode ? (
                  <input
                    type="date"
                    value={formData.basicInfo.dob}
                    onChange={(e) => handleInputChange('basicInfo', 'dob', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="font-medium text-gray-800">{profile.basicInfo.dob}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Gender</label>
                {editMode ? (
                  <select
                    value={formData.basicInfo.gender}
                    onChange={(e) => handleInputChange('basicInfo', 'gender', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="font-medium text-gray-800">{profile.basicInfo.gender}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Marital Status</label>
                {editMode ? (
                  <select
                    value={formData.basicInfo.maritalStatus}
                    onChange={(e) => handleInputChange('basicInfo', 'maritalStatus', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                ) : (
                  <p className="font-medium text-gray-800">{profile.basicInfo.maritalStatus}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Blood Group</label>
              {editMode ? (
                <select
                  value={formData.basicInfo.bloodGroup}
                  onChange={(e) => handleInputChange('basicInfo', 'bloodGroup', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              ) : (
                <div className="flex items-center">
                  <p className="font-medium text-gray-800">{profile.basicInfo.bloodGroup}</p>
                  <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                    Universal Donor
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl card-shadow border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg flex items-center">
              <i className="fas fa-address-book text-green-500 mr-2"></i>
              Contact Information
            </h3>
            {editMode && (
              <span className="text-xs text-blue-600 font-medium">Editing</span>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                {editMode ? (
                  <input
                    type="tel"
                    value={formData.contactInfo.phone}
                    onChange={(e) => handleInputChange('contactInfo', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="font-medium text-gray-800">{profile.contactInfo.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                {editMode ? (
                  <input
                    type="email"
                    value={formData.contactInfo.email}
                    onChange={(e) => handleInputChange('contactInfo', 'email', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="font-medium text-gray-800">{profile.contactInfo.email}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Address</label>
              {editMode ? (
                <textarea
                  value={formData.contactInfo.address}
                  onChange={(e) => handleInputChange('contactInfo', 'address', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  rows="2"
                />
              ) : (
                <p className="font-medium text-gray-800">{profile.contactInfo.address}</p>
              )}
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-700 mb-3">Emergency Contact</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.contactInfo.emergencyContact.name}
                      onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="font-medium text-gray-800">{profile.contactInfo.emergencyContact.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Relationship</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.contactInfo.emergencyContact.relationship}
                      onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="font-medium text-gray-800">{profile.contactInfo.emergencyContact.relationship}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                  {editMode ? (
                    <input
                      type="tel"
                      value={formData.contactInfo.emergencyContact.phone}
                      onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="font-medium text-gray-800">{profile.contactInfo.emergencyContact.phone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="bg-white rounded-xl card-shadow border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg flex items-center">
              <i className="fas fa-heartbeat text-red-500 mr-2"></i>
              Medical Information
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Height</label>
                <p className="font-medium text-gray-800">{profile.medicalInfo.height}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Weight</label>
                <p className="font-medium text-gray-800">{profile.medicalInfo.weight}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">BMI</label>
                <div className="flex items-center">
                  <p className="font-medium text-gray-800">{profile.medicalInfo.bmi}</p>
                  <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                    parseFloat(profile.medicalInfo.bmi) < 18.5 ? 'bg-blue-100 text-blue-800' :
                    parseFloat(profile.medicalInfo.bmi) < 25 ? 'bg-green-100 text-green-800' :
                    parseFloat(profile.medicalInfo.bmi) < 30 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {parseFloat(profile.medicalInfo.bmi) < 18.5 ? 'Underweight' :
                     parseFloat(profile.medicalInfo.bmi) < 25 ? 'Normal' :
                     parseFloat(profile.medicalInfo.bmi) < 30 ? 'Overweight' : 'Obese'}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Allergies</label>
              <div className="flex flex-wrap gap-2">
                {profile.medicalInfo.allergies.map((allergy, index) => (
                  <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Chronic Conditions</label>
              <div className="flex flex-wrap gap-2">
                {profile.medicalInfo.chronicConditions.map((condition, index) => (
                  <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                    {condition}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Previous Surgeries</label>
              <ul className="list-disc pl-5 text-gray-700">
                {profile.medicalInfo.surgeries.map((surgery, index) => (
                  <li key={index}>{surgery}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Insurance Information */}
        <div className="bg-white rounded-xl card-shadow border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg flex items-center">
              <i className="fas fa-shield-alt text-purple-500 mr-2"></i>
              Insurance Information
            </h3>
            {editMode && (
              <span className="text-xs text-blue-600 font-medium">Editing</span>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Insurance Provider</label>
                {editMode ? (
                  <input
                    type="text"
                    value={formData.insuranceInfo.provider}
                    onChange={(e) => handleInputChange('insuranceInfo', 'provider', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="font-medium text-gray-800">{profile.insuranceInfo.provider}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Policy Number</label>
                {editMode ? (
                  <input
                    type="text"
                    value={formData.insuranceInfo.policyNumber}
                    onChange={(e) => handleInputChange('insuranceInfo', 'policyNumber', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="font-medium text-gray-800">{profile.insuranceInfo.policyNumber}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Validity</label>
                {editMode ? (
                  <input
                    type="date"
                    value={formData.insuranceInfo.validity}
                    onChange={(e) => handleInputChange('insuranceInfo', 'validity', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="font-medium text-gray-800">{profile.insuranceInfo.validity}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Coverage Type</label>
                {editMode ? (
                  <select
                    value={formData.insuranceInfo.coverage}
                    onChange={(e) => handleInputChange('insuranceInfo', 'coverage', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Individual">Individual</option>
                    <option value="Family Floater">Family Floater</option>
                    <option value="Senior Citizen">Senior Citizen</option>
                  </select>
                ) : (
                  <p className="font-medium text-gray-800">{profile.insuranceInfo.coverage}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Sum Insured</label>
              {editMode ? (
                <input
                  type="text"
                  value={formData.insuranceInfo.sumInsured}
                  onChange={(e) => handleInputChange('insuranceInfo', 'sumInsured', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="font-bold text-blue-700 text-lg">{profile.insuranceInfo.sumInsured}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Family History */}
      <div className="bg-white rounded-xl card-shadow border p-6">
        <h3 className="font-semibold text-lg mb-4 flex items-center">
          <i className="fas fa-users text-orange-500 mr-2"></i>
          Family Medical History
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <i className="fas fa-male text-blue-500 mr-2"></i>
              Father
            </h4>
            <p className="text-gray-600">{profile.familyHistory.father}</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <i className="fas fa-female text-pink-500 mr-2"></i>
              Mother
            </h4>
            <p className="text-gray-600">{profile.familyHistory.mother}</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <i className="fas fa-user-friends text-green-500 mr-2"></i>
              Siblings
            </h4>
            <p className="text-gray-600">{profile.familyHistory.siblings}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-4">
        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          <i className="fas fa-print mr-2"></i>Print Health Summary
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          <i className="fas fa-sync-alt mr-2"></i>Update Health Records
        </button>
      </div>
    </div>
  )
}

export default Profile