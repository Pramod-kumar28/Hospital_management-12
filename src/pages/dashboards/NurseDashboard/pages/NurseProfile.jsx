import React, { useState } from 'react'
import { useAuth } from '../../../../hooks/useAuth'

const NurseProfile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Nurse Kavya Patel",
    department: "Emergency Ward",
    email: "kavya.patel@medicloud.com",
    phone: "+91 98765 43214",
    shift: "Morning (7AM-3PM)",
    experience: "8 years",
    qualifications: "B.Sc Nursing, RN",
    specialization: "Emergency Care"
  })

  const handleSave = () => {
    // In real app, this would save to backend
    setIsEditing(false)
    console.log('Profile saved:', profile)
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">👩‍⚕️ My Profile</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 border rounded card-shadow">
          <div className="flex flex-col items-center mb-4">
            <img 
              src="https://i.pravatar.cc/100?img=5" 
              className="w-24 h-24 rounded-full mb-3" 
              alt="Nurse" 
            />
            <h3 className="text-xl font-semibold">{profile.name}</h3>
            <p className="text-gray-600">{profile.department}</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <i className="fas fa-envelope text-gray-500 w-5 mr-3"></i>
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-phone text-gray-500 w-5 mr-3"></i>
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-clock text-gray-500 w-5 mr-3"></i>
              <span>Shift: {profile.shift}</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-briefcase text-gray-500 w-5 mr-3"></i>
              <span>Experience: {profile.experience}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            <i className="fas fa-edit mr-1"></i> {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
        </div>
        
        <div className="bg-white p-4 border rounded card-shadow lg:col-span-2">
          <h3 className="text-lg font-semibold mb-3">Professional Information</h3>
          
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={profile.department}
                    onChange={(e) => setProfile({...profile, department: e.target.value})}
                    className="w-full border rounded p-2"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="w-full border rounded p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
                <input
                  type="text"
                  value={profile.qualifications}
                  onChange={(e) => setProfile({...profile, qualifications: e.target.value})}
                  className="w-full border rounded p-2"
                />
              </div>
              
              <button 
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-medium">{profile.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Qualifications</p>
                  <p className="font-medium">{profile.qualifications}</p>
                </div>
              </div>
              
              <h4 className="font-medium mb-2">Specializations</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Emergency Care</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Critical Care</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Patient Education</span>
              </div>
              
              <h4 className="font-medium mb-2">Current Responsibilities</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Patient vital signs monitoring</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Medication administration</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Emergency response team</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Patient education and counseling</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default NurseProfile