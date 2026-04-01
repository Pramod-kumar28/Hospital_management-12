import React, { useState } from 'react'

const Settings = () => {
  const [hospitalProfile, setHospitalProfile] = useState({
    name: 'Sanctuary General Hospital',
    registrationNumber: 'SGH-TX-99201-B',
    address: '1022 Ethereal Plaza, Suite 400, Clinical District, Metropolitan City, MC 88201',
    contactEmail: 'admin@sanctuary-hospital.com',
    emergencyHotline: '+1 (555) 000-9111'
  })

  const [branches, setBranches] = useState([
    {
      id: 1,
      name: 'City Center (Main)',
      description: 'Central Healthcare Hub',
      lat: 40.7128,
      lng: -74.0060,
      address: '1022 Ethereal Plaza, Suite 400'
    },
   
  ])

  const [operatingHours, setOperatingHours] = useState({
    timeZone: 'Eastern Standard Time (EST)',
    schedule: {
      'Mon - Fri': '00:00 - 24:00',
      'Saturday': '08:00 - 20:00',
      'Sunday': 'EMERGENCY ONLY'
    }
  })

  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: 'OPD Unit',
      description: 'Outpatient consultations and preliminary checkups.',
      icon: 'fas fa-briefcase-medical',
      iconBg: 'bg-blue-500',
      status: 'ACTIVE',
    
    },
    {
      id: 2,
      name: 'IPD Unit',
      description: 'Inpatient care with 24/7 monitoring and bed management.',
      icon: 'fas fa-bed',
      iconBg: 'bg-cyan-500',
      status: 'ACTIVE',
      statusColor: 'text-green-600',
     
    },
    {
      id: 3,
      name: 'ICU Unit',
      description: 'Critical care requiring specialized life-support equipment.',
      icon: 'fas fa-heartbeat',
      iconBg: 'bg-red-500',
      status: 'HIGH PRIORITY',
      statusColor: 'text-orange-600',
     
    },
    {
      id: 4,
      name: 'Diagnostics Lab',
      description: 'Pathology, radiology, and advanced diagnostics.',
      icon: 'fas fa-flask',
      iconBg: 'bg-teal-500',
      status: 'ACTIVE',
      statusColor: 'text-green-600',
    
    }
  ])


  const [isEditing, setIsEditing] = useState(false)
  const [editFormData, setEditFormData] = useState(hospitalProfile)
  const [hasChanges, setHasChanges] = useState(false)
  const [isEditingPhoto, setIsEditingPhoto] = useState(false)
  const [photoPreview, setPhotoPreview] = useState('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=100&h=100&fit=crop')
  const [tempPhotoPreview, setTempPhotoPreview] = useState(photoPreview)

  const [isEditingSchedule, setIsEditingSchedule] = useState(false)
  const [editScheduleData, setEditScheduleData] = useState(operatingHours.schedule)

  const handleInputChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setHasChanges(true)
  }

  const handleSaveChanges = () => {
    setHospitalProfile(editFormData)
    setIsEditing(false)
    setHasChanges(false)
    alert('Hospital profile updated successfully!')
  }

  const handleDiscardChanges = () => {
    setEditFormData(hospitalProfile)
    setIsEditing(false)
    setHasChanges(false)
  }

  const handlePhotoEdit = () => {
    setIsEditingPhoto(true)
    setTempPhotoPreview(photoPreview)
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setTempPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSavePhoto = () => {
    setPhotoPreview(tempPhotoPreview)
    setIsEditingPhoto(false)
    alert('Hospital photo updated successfully!')
  }

  const handleCancelPhotoEdit = () => {
    setTempPhotoPreview(photoPreview)
    setIsEditingPhoto(false)
  }

  const handleScheduleChange = (day, value) => {
    setEditScheduleData(prev => ({
      ...prev,
      [day]: value
    }))
  }

  const handleSaveSchedule = () => {
    setOperatingHours(prev => ({
      ...prev,
      schedule: editScheduleData
    }))
    setIsEditingSchedule(false)
    alert('Operating schedule updated successfully!')
  }

  const handleCancelScheduleEdit = () => {
    setEditScheduleData(operatingHours.schedule)
    setIsEditingSchedule(false)
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hospital Settings</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Manage hospital profile and location details
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hospital Profile Section */}
        <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl border border-blue-100 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          {/* Premium Header with Photo */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 px-8 py-4 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
            <div className="relative z-10 flex items-end gap-6">
              {/* Photo Container */}
              <div className="relative group">
                <img 
                  src={photoPreview} 
                  className="w-28 h-28 rounded-2xl object-cover shadow-lg border-4 border-white" 
                  alt="Hospital Logo" 
                />
                <button
                  onClick={handlePhotoEdit}
                  className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="text-center">
                    <i className="fas fa-camera text-white text-2xl mb-1 block"></i>
                    <span className="text-white text-xs font-bold">EDIT PHOTO</span>
                  </div>
                </button>
              </div>

              {/* Header Info */}
              <div className="flex-1 pb-2">
                <h2 className="font-bold text-3xl text-white mb-2">{hospitalProfile.name}</h2>
                <div className="flex items-center gap-2 text-blue-100">
                  <i className="fas fa-check-circle text-green-300 text-lg"></i>
                  <span className="font-semibold text-base">Leading Healthcare Provider</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Fields */}
          <div className="p-8 space-y-5">
            {!isEditing ? (
              <>
                {/* View Mode */}
                {/* Address */}
                <div className="p-5 bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-md transition-all duration-300 cursor-default">
                  <label className="block text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <i className="fas fa-map-marker-alt text-lg"></i> Address
                  </label>
                  <p className="text-gray-800 font-medium text-base leading-relaxed">{hospitalProfile.address}</p>
                </div>

                {/* Contact */}
                <div className="p-5 bg-gradient-to-br from-green-50 to-white rounded-xl border-2 border-green-200 hover:border-green-400 hover:shadow-md transition-all duration-300 cursor-default">
                  <label className="block text-xs font-bold text-green-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <i className="fas fa-phone text-lg"></i> Contact
                  </label>
                  <p className="text-gray-800 font-medium text-base">{hospitalProfile.emergencyHotline}</p>
                </div>

                {/* Email */}
                <div className="p-5 bg-gradient-to-br from-purple-50 to-white rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-md transition-all duration-300 cursor-default">
                  <label className="block text-xs font-bold text-purple-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <i className="fas fa-envelope text-lg"></i> Email
                  </label>
                  <p className="text-gray-800 font-medium text-base">{hospitalProfile.contactEmail}</p>
                </div>
              </>
            ) : (
              <>
                {/* Edit Mode */}
                {/* Hospital Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
                    Hospital Name
                  </label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 focus:shadow-lg bg-white text-gray-900 font-medium transition-all"
                  />
                </div>

                {/* Registration Number */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    value={editFormData.registrationNumber}
                    onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 focus:shadow-lg bg-white text-gray-900 font-medium transition-all"
                  />
                </div>

                {/* Corporate Address */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
                    Corporate Address
                  </label>
                  <textarea
                    value={editFormData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 focus:shadow-lg bg-white text-gray-900 font-medium resize-none transition-all"
                    rows="3"
                  />
                </div>

                {/* Contact Email */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <i className="fas fa-envelope text-blue-600"></i> Contact Email
                  </label>
                  <input
                    type="email"
                    value={editFormData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 focus:shadow-lg bg-white text-gray-900 transition-all"
                  />
                </div>

                {/* Emergency Hotline */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <i className="fas fa-phone text-blue-600"></i> Emergency Hotline
                  </label>
                  <input
                    type="tel"
                    value={editFormData.emergencyHotline}
                    onChange={(e) => handleInputChange('emergencyHotline', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 focus:shadow-lg bg-white text-gray-900 transition-all"
                  />
                </div>
              </>
            )}

            {/* Edit/Save/Cancel Buttons */}
            <div className="pt-4 flex gap-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-base rounded-xl hover:from-blue-700 hover:to-blue-800 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-3 group border border-blue-500"
                >
                  <i className="fas fa-edit text-lg group-hover:rotate-12 transition-transform duration-300"></i>
                  <span>Edit Profile</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleDiscardChanges}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 hover:shadow-lg transition-all duration-300 shadow-md"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Branches Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-map-marked-alt text-white"></i>
              </div>
              <div>
                <h2 className="font-bold text-xl text-gray-800">Location</h2>
               
              </div>
            </div>
           
          </div>

          {/* Branches Map */}
          <div className="flex-1 p-6">
            <div className="w-full h-96 rounded-xl overflow-hidden border-2 border-gray-200 shadow-md bg-gradient-to-br from-blue-50 to-cyan-50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1215445686907!2d-74.00601!3d40.71282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb7ae2b%3A0x55d53f90981689d2!2s1022%20Ethereal%20Plaza%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1609459200000"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Branch List */}
            <div className="mt-4 space-y-3">
              {branches.map((branch) => (
                <div key={branch.id} className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800">{branch.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{branch.description}</p>
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                        <i className="fas fa-map-marker-alt text-blue-600"></i>
                        {branch.address}
                      </p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                      <i className="fas fa-map-pin text-lg"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Operating Hours & Departments Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Operating Hours */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-100 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          {/* Premium Header */}
          <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 px-6 py-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-1">
                <div className="bg-white bg-opacity-30 p-1 rounded-xl backdrop-blur-sm">
                  <i className="fas fa-clock text-2xl"></i>
                </div>
                <h2 className="font-bold text-2xl">Operating Hours</h2>
              </div>
          
            </div>
          </div>

          {/* Card Content */}
          <div className="p-7 space-y-8">
         

            {/* Schedule Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide text-gray-600">Weekly Schedule</h3>
              {Object.entries(operatingHours.schedule).map(([day, time], index) => (
                <div 
                  key={day} 
                  className="group bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {time === 'EMERGENCY ONLY' ? (
                        <div className="bg-red-100 p-2.5 rounded-lg">
                        
                        </div>
                      ) : (
                        <div className="bg-blue-100 p-2.5 rounded-lg">
                          <i className="fas fa-calendar-alt text-blue-600"></i>
                        </div>
                      )}
                      <span className="text-gray-800 font-bold text-base">{day}</span>
                    </div>
                    <span className={`font-bold text-base px-4 py-2 rounded-lg transition-all ${
                      time === 'EMERGENCY ONLY' 
                        ? 'bg-red-100 text-red-700 font-black tracking-wide' 
                        : 'bg-blue-100 text-blue-700 font-bold'
                    }`}>
                      {time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Edit Schedule Button with Premium Styling */}
            <button
              onClick={() => {
                setEditScheduleData(operatingHours.schedule)
                setIsEditingSchedule(true)
              }}
              className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-blue-500 via-blue-550 to-blue-600 text-white font-bold text-lg rounded-xl hover:from-blue-600 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 transform flex items-center justify-center gap-3 group border border-blue-400 hover:border-blue-500"
            >
              <i className="fas fa-edit text-xl group-hover:rotate-12 transition-transform duration-300"></i>
              <span>Edit Schedule</span>
              <i className="fas fa-arrow-right text-sm ml-1 group-hover:translate-x-1 transition-transform duration-300"></i>
            </button>

         
          </div>
        </div>

        {/* Departments & Units */}
        
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Header */}
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-bold text-2xl text-gray-900 flex items-center gap-3">
              <i className="fas fa-network-wired text-blue-600 text-3xl"></i>
              Departments & Units
            </h2>
            
          </div>

          {/* Department Cards Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {departments.map((dept) => (
                <div key={dept.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all">
                  {/* Header with Icon and Status */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 ${dept.iconBg} rounded-xl flex items-center justify-center shadow-md`}>
                      <i className={`${dept.icon} text-white text-xl`}></i>
                      
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 ">{dept.name}</h3>
                  </div>

                  {/* Manage Button */}
                  <button className="w-full text-blue-600 hover:text-blue-800 font-bold uppercase tracking-wide text-sm transition-colors flex items-center justify-center gap-2">
                    Manage <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
        
      </div>

      {/* Edit Schedule Modal */}
      {isEditingSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="fas fa-clock text-2xl"></i>
                <h3 className="text-2xl font-bold">Edit Operating Hours</h3>
              </div>
              <button
                onClick={handleCancelScheduleEdit}
                className="text-white hover:text-orange-100 transition-colors"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Time Zone Display */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                  Time Zone (UTC-5)
                </label>
                <p className="text-gray-700 font-medium">{operatingHours.timeZone}</p>
              </div>

              {/* Schedule Inputs */}
              <div className="space-y-4">
                {Object.entries(editScheduleData).map(([day, time]) => (
                  <div key={day} className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">
                      {day}
                    </label>
                    {day === 'Sunday' ? (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <input
                          type="checkbox"
                          checked={time === 'EMERGENCY ONLY'}
                          onChange={(e) => {
                            handleScheduleChange(day, e.target.checked ? 'EMERGENCY ONLY' : '24:00 hours')
                          }}
                          className="w-4 h-4 text-orange-500 rounded focus:ring-2 focus:ring-orange-500 cursor-pointer"
                        />
                        <label className="text-gray-700 font-medium cursor-pointer">Emergency Only</label>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={time}
                        onChange={(e) => handleScheduleChange(day, e.target.value)}
                        placeholder="HH:MM - HH:MM"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors font-medium"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleCancelScheduleEdit}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSchedule}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Edit Modal */}
      {isEditingPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="fas fa-camera text-2xl"></i>
                <h3 className="text-2xl font-bold">Edit Hospital Photo</h3>
              </div>
              <button
                onClick={handleCancelPhotoEdit}
                className="text-white hover:text-blue-100 transition-colors text-xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Photo Preview */}
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img 
                    src={tempPhotoPreview} 
                    className="w-40 h-40 rounded-2xl object-cover shadow-lg border-4 border-blue-100" 
                    alt="Preview" 
                  />
                </div>
                <p className="text-gray-700 text-sm font-medium text-center text-gray-600">
                  Current hospital photo
                </p>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                  Choose New Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="w-full px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
                <p className="text-xs text-gray-600 mt-2">
                  Supported formats: JPG, PNG. Maximum size: 5MB
                </p>
              </div>

              {/* Info Note */}
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded p-3">
                <p className="text-blue-800 text-sm font-medium">
                  <i className="fas fa-info-circle text-blue-600 mr-2"></i>
                  Photo will be updated across all hospital dashboards
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleCancelPhotoEdit}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-semibold transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePhoto}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 font-semibold transition-all shadow-md hover:shadow-lg"
              >
                Save Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings