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
    setIsEditing(false)
    console.log('Profile saved:', profile)
  }

  const scheduleData = [
    { day: 'Monday', morning: '9AM - 12PM', afternoon: '2PM - 5PM', evening: '-' },
    { day: 'Tuesday', morning: '9AM - 12PM', afternoon: '2PM - 5PM', evening: '-' },
    { day: 'Wednesday', morning: '9AM - 12PM', afternoon: '2PM - 5PM', evening: '-' },
    { day: 'Thursday', morning: '9AM - 12PM', afternoon: '2PM - 5PM', evening: '-' },
    { day: 'Friday', morning: '9AM - 12PM', afternoon: '2PM - 5PM', evening: '-' },
    { day: 'Saturday', morning: '10AM - 1PM', afternoon: '-', evening: '-' },
    { day: 'Sunday', morning: 'Emergency Only', afternoon: '-', evening: '-' }
  ]

  return (
    <div className="animate-fade-in p-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        <i className='fas fa-user-md text-blue-500 mr-3'></i> My Profile
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="bg-white p-4 border rounded-lg shadow-sm h-fit">
          <div className="flex flex-col items-center mb-4">
            <img 
              src="https://i.pravatar.cc/100?img=5" 
              className="w-24 h-24 rounded-full mb-3 border-2 border-blue-100" 
              alt="Doctor" 
            />
            <h3 className="text-xl font-semibold text-center">{profile.name}</h3>
            <p className="text-gray-600 text-center">{profile.specialization}</p>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-start">
              <i className="fas fa-envelope text-gray-500 w-5 mr-3 mt-1 flex-shrink-0"></i>
              <span className="text-gray-700 text-sm break-words">{profile.email}</span>
            </div>
            <div className="flex items-start">
              <i className="fas fa-phone text-gray-500 w-5 mr-3 mt-1 flex-shrink-0"></i>
              <span className="text-gray-700 text-sm">{profile.phone}</span>
            </div>
            <div className="flex items-start">
              <i className="fas fa-money-bill text-gray-500 w-5 mr-3 mt-1 flex-shrink-0"></i>
              <span className="text-gray-700 text-sm">Fee: {profile.consultationFee}</span>
            </div>
            <div className="flex items-start">
              <i className="fas fa-clock text-gray-500 w-5 mr-3 mt-1 flex-shrink-0"></i>
              <span className="text-gray-700 text-sm">{profile.schedule}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
          >
            <i className="fas fa-edit mr-2"></i> 
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
        </div>
        
        {/* Right Column - Professional Info */}
        <div className="bg-white p-4 border rounded-lg shadow-sm lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Professional Information</h3>
          
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                  <input
                    type="text"
                    value={profile.specialization}
                    onChange={(e) => setProfile({...profile, specialization: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <button 
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <i className="fas fa-save mr-2"></i> Save Changes
              </button>
            </div>
          ) : (
            <>
              {/* Professional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Experience</p>
                  <p className="font-medium text-gray-800">{profile.experience}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Education</p>
                  <p className="font-medium text-gray-800">{profile.education}</p>
                </div>
              </div>
              
              {/* Specializations */}
              <h4 className="font-medium mb-3">Specializations</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Internal Medicine</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">General Practice</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Preventive Care</span>
              </div>
              
              {/* Availability Table - Fully Responsive */}
              <h4 className="font-medium mb-3">Weekly Availability</h4>
              
              <div className="overflow-x-auto -mx-2">
                <div className="inline-block min-w-full align-middle px-2">
                  <table className="min-w-full text-sm">
                    <thead className="bg-blue-50 text-gray-700">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Day</th>
                        <th className="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">Morning</th>
                        <th className="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">Afternoon</th>
                        <th className="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">Evening</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {scheduleData.map((schedule, index) => (
                        <tr 
                          key={index} 
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-3 py-2 whitespace-nowrap font-medium text-gray-900">
                            {schedule.day}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-center">
                            <span className={`inline-block px-2 py-1 text-xs rounded ${schedule.morning !== '-' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                              {schedule.morning}
                            </span>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-center">
                            <span className={`inline-block px-2 py-1 text-xs rounded ${schedule.afternoon !== '-' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-500'}`}>
                              {schedule.afternoon}
                            </span>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-center">
                            <span className={`inline-block px-2 py-1 text-xs rounded ${schedule.evening !== '-' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-500'}`}>
                              {schedule.evening}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile-optimized compact table (alternative) */}
              <div className="mt-4 text-xs text-gray-500 text-center md:hidden">
                <p>← Scroll horizontally to view full table →</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile