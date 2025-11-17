import React, { useState } from 'react'
import { useAuth } from '../../../../hooks/useAuth'

const DoctorProfile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Dr. Meena Rao",
    specialization: "Internal Medicine",
    email: "meena.rao@medicloud.com",
    phone: "+91 98765 43210",
    consultationFee: "₹800",
    schedule: "Mon-Fri, 9AM-5PM",
    experience: "12 years",
    education: "MBBS, MD - Internal Medicine"
  })

  const handleSave = () => {
    // In real app, this would save to backend
    setIsEditing(false)
    console.log('Profile saved:', profile)
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">👤 My Profile</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 border rounded card-shadow">
          <div className="flex flex-col items-center mb-4">
            <img 
              src="https://i.pravatar.cc/100?img=5" 
              className="w-24 h-24 rounded-full mb-3" 
              alt="Doctor" 
            />
            <h3 className="text-xl font-semibold">{profile.name}</h3>
            <p className="text-gray-600">{profile.specialization}</p>
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
              <i className="fas fa-money-bill text-gray-500 w-5 mr-3"></i>
              <span>Consultation Fee: {profile.consultationFee}</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-clock text-gray-500 w-5 mr-3"></i>
              <span>Schedule: {profile.schedule}</span>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                  <input
                    type="text"
                    value={profile.specialization}
                    onChange={(e) => setProfile({...profile, specialization: e.target.value})}
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
                  <p className="text-sm text-gray-500">Education</p>
                  <p className="font-medium">{profile.education}</p>
                </div>
              </div>
              
              <h4 className="font-medium mb-2">Specializations</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Internal Medicine</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">General Practice</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Preventive Care</span>
              </div>
              
              <h4 className="font-medium mb-2">Availability</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 text-gray-600">
                    <tr>
                      <th className="px-4 py-2 text-left">Day</th>
                      <th>Morning</th>
                      <th>Afternoon</th>
                      <th>Evening</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { day: 'Monday', morning: '9AM - 12PM', afternoon: '2PM - 5PM', evening: '-' },
                      { day: 'Tuesday', morning: '9AM - 12PM', afternoon: '2PM - 5PM', evening: '-' },
                      { day: 'Wednesday', morning: '9AM - 12PM', afternoon: '2PM - 5PM', evening: '-' },
                      { day: 'Thursday', morning: '9AM - 12PM', afternoon: '2PM - 5PM', evening: '-' },
                      { day: 'Friday', morning: '9AM - 12PM', afternoon: '2PM - 5PM', evening: '-' },
                      { day: 'Saturday', morning: '10AM - 1PM', afternoon: '-', evening: '-' }
                    ].map((schedule, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{schedule.day}</td>
                        <td>{schedule.morning}</td>
                        <td>{schedule.afternoon}</td>
                        <td>{schedule.evening}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile