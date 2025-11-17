import React, { useState } from 'react'

const Settings = () => {
  const [emailSettings, setEmailSettings] = useState({
    appointment: true,
    billing: true,
    lab: false,
    emergency: true
  })

  const handleEmailSettingChange = (setting) => {
    setEmailSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        <i className="fas fa-cogs mr-2"></i>Settings
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Roles & Permissions */}
        <div className="bg-white rounded-xl card-shadow border p-6">
          <h3 className="font-semibold text-lg mb-4">Roles & Permissions</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <div className="font-medium">Admin</div>
                <div className="text-xs text-gray-500">Full system access</div>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                <i className="fas fa-edit"></i>
              </button>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <div className="font-medium">Doctor</div>
                <div className="text-xs text-gray-500">Patient management & prescriptions</div>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                <i className="fas fa-edit"></i>
              </button>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <div className="font-medium">Staff</div>
                <div className="text-xs text-gray-500">Limited access based on role</div>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                <i className="fas fa-edit"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Email Notifications */}
        <div className="bg-white rounded-xl card-shadow border p-6">
          <h3 className="font-semibold text-lg mb-4">Email Notifications</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <div className="font-medium">Appointment Reminders</div>
                <div className="text-xs text-gray-500">Send reminders to patients</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={emailSettings.appointment}
                  onChange={() => handleEmailSettingChange('appointment')}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <div className="font-medium">Billing Notifications</div>
                <div className="text-xs text-gray-500">Send invoice and payment alerts</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={emailSettings.billing}
                  onChange={() => handleEmailSettingChange('billing')}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <div className="font-medium">Lab Results</div>
                <div className="text-xs text-gray-500">Notify when results are ready</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={emailSettings.lab}
                  onChange={() => handleEmailSettingChange('lab')}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <div className="font-medium">Emergency Alerts</div>
                <div className="text-xs text-gray-500">Critical system notifications</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={emailSettings.emergency}
                  onChange={() => handleEmailSettingChange('emergency')}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Branding & Theme */}
        <div className="bg-white rounded-xl card-shadow border p-6 lg:col-span-2">
          <h3 className="font-semibold text-lg mb-4">Branding & Theme</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Logo</label>
              <div className="flex items-center gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=100&h=100&fit=crop" 
                  className="w-16 h-16 rounded-lg" 
                  alt="Hospital Logo" 
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <i className="fas fa-upload mr-2"></i>Upload New Logo
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme Color</label>
              <div className="flex gap-2">
                <button className="w-8 h-8 bg-blue-600 rounded-full border-2 border-blue-700"></button>
                <button className="w-8 h-8 bg-green-600 rounded-full"></button>
                <button className="w-8 h-8 bg-purple-600 rounded-full"></button>
                <button className="w-8 h-8 bg-indigo-600 rounded-full"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings