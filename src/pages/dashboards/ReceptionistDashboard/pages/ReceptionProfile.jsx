import React, { useState } from 'react'
import { useAuth } from '../../../../hooks/useAuth'

const ReceptionProfile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Arjun Kumar",
    position: "Senior Receptionist",
    email: "arjun.kumar@medicloud.com",
    phone: "+91 98765 43215",
    shift: "Morning (9AM-5PM)",
    department: "Front Desk",
    employeeId: "EMP-RC001",
    joinDate: "2022-03-15"
  })

  const handleSave = () => {
    // In real app, this would save to backend
    setIsEditing(false)
    console.log('Profile saved:', profile)
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">My Profile</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 border rounded card-shadow">
          <div className="flex flex-col items-center mb-4">
            <img 
              src="https://i.pravatar.cc/100?img=6" 
              className="w-24 h-24 rounded-full mb-3" 
              alt="Receptionist" 
            />
            <h3 className="text-xl font-semibold">{profile.name}</h3>
            <p className="text-gray-600">{profile.position}</p>
            <p className="text-sm text-gray-500">{profile.employeeId}</p>
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
              <i className="fas fa-building text-gray-500 w-5 mr-3"></i>
              <span>Department: {profile.department}</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-calendar text-gray-500 w-5 mr-3"></i>
              <span>Joined: {profile.joinDate}</span>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    value={profile.position}
                    onChange={(e) => setProfile({...profile, position: e.target.value})}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
                  <select
                    value={profile.shift}
                    onChange={(e) => setProfile({...profile, shift: e.target.value})}
                    className="w-full border rounded p-2"
                  >
                    <option value="Morning (9AM-5PM)">Morning (9AM-5PM)</option>
                    <option value="Evening (2PM-10PM)">Evening (2PM-10PM)</option>
                    <option value="Night (10PM-6AM)">Night (10PM-6AM)</option>
                  </select>
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
                  <p className="text-sm text-gray-500">Employee ID</p>
                  <p className="font-medium">{profile.employeeId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Join Date</p>
                  <p className="font-medium">{profile.joinDate}</p>
                </div>
              </div>
              
              <h4 className="font-medium mb-2">Responsibilities</h4>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Patient registration and check-in</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Appointment scheduling and management</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Billing and payment processing</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Patient record maintenance</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Front desk operations</span>
                </div>
              </div>
              
              <h4 className="font-medium mb-2">Performance Metrics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">156</div>
                  <div className="text-xs text-gray-500">Patients Registered</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600">24</div>
                  <div className="text-xs text-gray-500">Appointments Today</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="text-xl font-bold text-yellow-600">98%</div>
                  <div className="text-xs text-gray-500">Satisfaction Rate</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-xl font-bold text-purple-600">12</div>
                  <div className="text-xs text-gray-500">Days Present</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReceptionProfile