import React, { useState } from 'react'
import { useAuth } from '../../../../hooks/useAuth'

const SuperAdminProfile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Super Admin",
    email: "super@medicloud.com",
    phone: "+91 98765 43219",
    department: "System Administration",
    employeeId: "EMP-SA001",
    joinDate: "2023-01-01",
    accessLevel: "Full System Access"
  })

  const handleSave = () => {
    // In real app, this would save to backend
    setIsEditing(false)
    console.log('Profile saved:', profile)
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Super Admin Profile</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 border rounded card-shadow">
          <div className="flex flex-col items-center mb-4">
            <img 
              src="https://i.pravatar.cc/100?img=12" 
              className="w-24 h-24 rounded-full mb-3" 
              alt="Super Admin" 
            />
            <h3 className="text-xl font-semibold">{profile.name}</h3>
            <p className="text-gray-600">{profile.department}</p>
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
              <i className="fas fa-building text-gray-500 w-5 mr-3"></i>
              <span>Department: {profile.department}</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-calendar text-gray-500 w-5 mr-3"></i>
              <span>Joined: {profile.joinDate}</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-shield-alt text-gray-500 w-5 mr-3"></i>
              <span>Access: {profile.accessLevel}</span>
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
          <h3 className="text-lg font-semibold mb-3">System Administrator Information</h3>
          
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full border rounded p-2"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
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
              
              <h4 className="font-medium mb-2">Administrative Privileges</h4>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Full system configuration access</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>User management and role assignment</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Database administration and backup</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Security and audit log access</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>System monitoring and performance tuning</span>
                </div>
              </div>
              
              <h4 className="font-medium mb-2">System Access Log</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 border rounded">
                  <span>Last Login</span>
                  <span className="text-gray-600">Today, 09:15 AM</span>
                </div>
                <div className="flex justify-between p-2 border rounded">
                  <span>IP Address</span>
                  <span className="text-gray-600">192.168.1.100</span>
                </div>
                <div className="flex justify-between p-2 border rounded">
                  <span>Session Duration</span>
                  <span className="text-gray-600">2 hours, 45 minutes</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SuperAdminProfile