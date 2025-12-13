import React, { useState, useEffect } from 'react'
import Button from '../../../../components/common/Button/Button'
import Modal from '../../../../components/common/Modal/Modal'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const LabProfile = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [labData, setLabData] = useState({})
  const [editForm, setEditForm] = useState({})
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [settings, setSettings] = useState({})

  useEffect(() => {
    loadLabData()
  }, [])

  const loadLabData = async () => {
    setLoading(true)
    setTimeout(() => {
      const mockData = {
        labInfo: {
          id: 'LAB-001',
          name: 'Advanced Diagnostic Laboratory',
          type: 'Multi-Specialty Diagnostic Lab',
          registrationNumber: 'LAB/2024/001',
          establishedDate: '2015-06-15',
          accreditation: 'NABL Accredited',
          accreditationNumber: 'NABL-12345',
          accreditationValidUntil: '2025-12-31'
        },
        contactInfo: {
          address: '123 Medical Street, Healthcare City',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
          country: 'India',
          phone: '+91 22 1234 5678',
          emergencyPhone: '+91 98 7654 3210',
          email: 'info@advancedlab.com',
          website: 'www.advancedlab.com'
        },
        operationalInfo: {
          workingHours: '24/7',
          weekdays: 'Mon-Sat: 6:00 AM - 10:00 PM',
          sunday: 'Sun: 7:00 AM - 8:00 PM',
          emergencyServices: 'Available 24/7',
          homeCollection: 'Available',
          reportDelivery: 'Email, SMS, Portal, Physical'
        },
        personnel: {
          director: 'Dr. Rajesh Mehta',
          labManager: 'Ms. Priya Sharma',
          qualityManager: 'Mr. Anil Kumar',
          totalTechnicians: 25,
          totalStaff: 45
        },
        facilities: {
          totalArea: '5000 sq.ft.',
          departments: ['Hematology', 'Biochemistry', 'Microbiology', 'Histopathology', 'Molecular Biology'],
          specialties: ['Clinical Pathology', 'Immunology', 'Endocrinology', 'Toxicology'],
          equipmentCount: 78,
          rooms: ['Sample Collection (5)', 'Testing Labs (8)', 'Sterilization Room', 'Storage Room', 'Staff Room']
        },
        services: {
          totalTests: 350,
          sampleTypes: ['Blood', 'Urine', 'Stool', 'CSF', 'Tissue', 'Swabs'],
          turnAroundTime: {
            routine: '24-48 hours',
            urgent: '4-6 hours',
            stat: '2 hours'
          },
          branches: 3
        },
        userProfile: {
          name: 'Dr. Rajesh Mehta',
          email: 'lab@dcm.demo',
          role: 'Lab Director',
          department: 'Laboratory Management',
          phone: '+91 98 7654 3211',
          joinedDate: '2020-01-15',
          lastLogin: '2024-01-15 10:30 AM',
          status: 'Active'
        },
        settings: {
          autoPrintReports: true,
          emailNotifications: true,
          smsNotifications: true,
          criticalResultAlert: true,
          qcAlertThreshold: '2SD',
          reportTemplate: 'Standard',
          language: 'English',
          timezone: 'IST (UTC+5:30)'
        }
      }
      
      setLabData(mockData)
      setEditForm(mockData.labInfo)
      setSettings(mockData.settings)
      setLoading(false)
    }, 1000)
  }

  const handleSaveProfile = () => {
    setSaving(true)
    setTimeout(() => {
      setLabData({
        ...labData,
        labInfo: editForm
      })
      setSaving(false)
      setShowEditModal(false)
      alert('Lab profile updated successfully!')
    }, 1500)
  }

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!')
      return
    }
    
    if (passwordForm.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!')
      return
    }
    
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setShowPasswordModal(false)
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      alert('Password changed successfully!')
    }, 1500)
  }

  const handleSaveSettings = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setShowSettingsModal(false)
      alert('Settings updated successfully!')
    }, 1500)
  }

  const handleExportData = (type) => {
    alert(`Exporting ${type} data...`)
    // In real app, trigger download
  }

  const handlePrintProfile = () => {
    alert('Printing lab profile...')
    window.print()
  }

  if (loading) return <LoadingSpinner fullScreen text="Loading lab profile..." />

  return (
    <>
        <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">🏢 Lab Profile</h2>
          <p className="text-gray-500">Manage laboratory information, settings, and user profile</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            icon="fas fa-print"
            onClick={handlePrintProfile}
          >
            Print Profile
          </Button>
          <Button
            variant="primary"
            icon="fas fa-edit"
            onClick={() => setShowEditModal(true)}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Lab Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded border card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <i className="fas fa-flask text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Tests</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{labData.services?.totalTests}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded border card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <i className="fas fa-users text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Staff</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{labData.personnel?.totalStaff}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded border card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg mr-4">
              <i className="fas fa-microscope text-yellow-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Equipment</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{labData.facilities?.equipmentCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded border card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <i className="fas fa-building text-purple-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Branches</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{labData.services?.branches}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Profile Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Lab Information & User Profile */}
        <div className="space-y-6">
          {/* Lab Basic Information */}
          <div className="bg-white rounded border card-shadow">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold flex items-center">
                <i className="fas fa-info-circle text-blue-600 mr-2"></i>
                Lab Information
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Lab ID:</span>
                <span className="font-medium">{labData.labInfo?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Name:</span>
                <span className="font-medium">{labData.labInfo?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Type:</span>
                <span className="font-medium">{labData.labInfo?.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Registration:</span>
                <span className="font-medium">{labData.labInfo?.registrationNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Established:</span>
                <span className="font-medium">{labData.labInfo?.establishedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Accreditation:</span>
                <span className="font-medium">{labData.labInfo?.accreditation}</span>
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="bg-white rounded border card-shadow">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold flex items-center">
                <i className="fas fa-user-md text-green-600 mr-2"></i>
                User Profile
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-user-md text-blue-600 text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">{labData.userProfile?.name}</h4>
                  <p className="text-gray-600">{labData.userProfile?.role}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span className="font-medium">{labData.userProfile?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <span className="font-medium">{labData.userProfile?.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Department:</span>
                  <span className="font-medium">{labData.userProfile?.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Joined:</span>
                  <span className="font-medium">{labData.userProfile?.joinedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Login:</span>
                  <span className="font-medium">{labData.userProfile?.lastLogin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {labData.userProfile?.status}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  icon="fas fa-key"
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full"
                >
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Contact & Operational Info */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded border card-shadow">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold flex items-center">
                <i className="fas fa-address-book text-purple-600 mr-2"></i>
                Contact Information
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Address:</span>
                <span className="font-medium text-right">{labData.contactInfo?.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">City:</span>
                <span className="font-medium">{labData.contactInfo?.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">State:</span>
                <span className="font-medium">{labData.contactInfo?.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Pincode:</span>
                <span className="font-medium">{labData.contactInfo?.pincode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone:</span>
                <span className="font-medium">{labData.contactInfo?.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Emergency:</span>
                <span className="font-medium">{labData.contactInfo?.emergencyPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email:</span>
                <span className="font-medium">{labData.contactInfo?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Website:</span>
                <span className="font-medium">{labData.contactInfo?.website}</span>
              </div>
            </div>
          </div>

          {/* Operational Information */}
          <div className="bg-white rounded border card-shadow">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold flex items-center">
                <i className="fas fa-clock text-orange-600 mr-2"></i>
                Operational Hours
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Working Hours:</span>
                <span className="font-medium">{labData.operationalInfo?.workingHours}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Weekdays:</span>
                <span className="font-medium">{labData.operationalInfo?.weekdays}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sunday:</span>
                <span className="font-medium">{labData.operationalInfo?.sunday}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Emergency:</span>
                <span className="font-medium">{labData.operationalInfo?.emergencyServices}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Home Collection:</span>
                <span className="font-medium">{labData.operationalInfo?.homeCollection}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Report Delivery:</span>
                <span className="font-medium">{labData.operationalInfo?.reportDelivery}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Facilities & Services */}
        <div className="space-y-6">
          {/* Facilities */}
          <div className="bg-white rounded border card-shadow">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold flex items-center">
                <i className="fas fa-building text-teal-600 mr-2"></i>
                Facilities
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Area:</span>
                <span className="font-medium">{labData.facilities?.totalArea}</span>
              </div>
              <div>
                <span className="text-gray-500 block mb-2">Departments:</span>
                <div className="flex flex-wrap gap-2">
                  {labData.facilities?.departments?.map((dept, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-gray-500 block mb-2">Specialties:</span>
                <div className="flex flex-wrap gap-2">
                  {labData.facilities?.specialties?.map((spec, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-gray-500 block mb-2">Rooms:</span>
                <div className="flex flex-wrap gap-2">
                  {labData.facilities?.rooms?.map((room, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      {room}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="bg-white rounded border card-shadow">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold flex items-center">
                <i className="fas fa-concierge-bell text-red-600 mr-2"></i>
                Services
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <span className="text-gray-500 block mb-2">Sample Types:</span>
                <div className="flex flex-wrap gap-2">
                  {labData.services?.sampleTypes?.map((type, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-gray-500 block mb-2">Turn Around Time:</span>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Routine:</span>
                    <span className="font-medium">{labData.services?.turnAroundTime?.routine}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Urgent:</span>
                    <span className="font-medium">{labData.services?.turnAroundTime?.urgent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">STAT:</span>
                    <span className="font-medium">{labData.services?.turnAroundTime?.stat}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Card */}
      <div className="bg-white rounded border card-shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold flex items-center">
            <i className="fas fa-cog text-gray-600 mr-2"></i>
            Lab Settings
          </h3>
          <Button
            variant="outline"
            size="sm"
            icon="fas fa-sliders-h"
            onClick={() => setShowSettingsModal(true)}
          >
            Configure Settings
          </Button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Auto Print Reports</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                labData.settings?.autoPrintReports 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {labData.settings?.autoPrintReports ? 'ON' : 'OFF'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Email Notifications</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                labData.settings?.emailNotifications 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {labData.settings?.emailNotifications ? 'ON' : 'OFF'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">SMS Notifications</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                labData.settings?.smsNotifications 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {labData.settings?.smsNotifications ? 'ON' : 'OFF'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Report Template</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {labData.settings?.reportTemplate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          variant="outline"
          icon="fas fa-file-export"
          onClick={() => handleExportData('profile')}
        >
          Export Profile
        </Button>
        <Button
          variant="outline"
          icon="fas fa-file-pdf"
          onClick={() => handleExportData('certificates')}
        >
          Download Certificates
        </Button>
        <Button
          variant="outline"
          icon="fas fa-history"
          onClick={() => alert('Viewing audit log...')}
        >
          View Audit Log
        </Button>
        <Button
          variant="outline"
          icon="fas fa-question-circle"
          onClick={() => alert('Opening help...')}
        >
          Help & Support
        </Button>
      </div>
    </div>
              
        {/* Edit Profile Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Lab Profile"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lab Name *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={editForm.name || ''}
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lab Type *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={editForm.type || ''}
                onChange={(e) => setEditForm({...editForm, type: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Number *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={editForm.registrationNumber || ''}
                onChange={(e) => setEditForm({...editForm, registrationNumber: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Established Date *
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-lg"
                value={editForm.establishedDate || ''}
                onChange={(e) => setEditForm({...editForm, establishedDate: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Accreditation
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={editForm.accreditation || ''}
                onChange={(e) => setEditForm({...editForm, accreditation: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Accreditation Number
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={editForm.accreditationNumber || ''}
                onChange={(e) => setEditForm({...editForm, accreditationNumber: e.target.value})}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveProfile}
              disabled={saving}
            >
              {saving ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Change Password"
      >
        <div className="space-y-4">
          <div className="bg-yellow-50 p-3 rounded">
            <p className="text-sm text-yellow-800">
              <i className="fas fa-info-circle mr-2"></i>
              Password must be at least 6 characters long
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password *
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password *
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password *
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowPasswordModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleChangePassword}
              disabled={saving}
            >
              {saving ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Changing...
                </>
              ) : (
                'Change Password'
              )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        title="Lab Settings"
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Notification Settings</h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                />
                <span className="ml-2 text-gray-700">Email Notifications</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={settings.smsNotifications}
                  onChange={(e) => setSettings({...settings, smsNotifications: e.target.checked})}
                />
                <span className="ml-2 text-gray-700">SMS Notifications</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={settings.criticalResultAlert}
                  onChange={(e) => setSettings({...settings, criticalResultAlert: e.target.checked})}
                />
                <span className="ml-2 text-gray-700">Critical Result Alerts</span>
              </label>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Report Settings</h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={settings.autoPrintReports}
                  onChange={(e) => setSettings({...settings, autoPrintReports: e.target.checked})}
                />
                <span className="ml-2 text-gray-700">Auto Print Reports</span>
              </label>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Template
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg"
                  value={settings.reportTemplate}
                  onChange={(e) => setSettings({...settings, reportTemplate: e.target.value})}
                >
                  <option value="Standard">Standard</option>
                  <option value="Comprehensive">Comprehensive</option>
                  <option value="Doctor Summary">Doctor Summary</option>
                  <option value="Patient Friendly">Patient Friendly</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-3">QC Settings</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                QC Alert Threshold
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={settings.qcAlertThreshold}
                onChange={(e) => setSettings({...settings, qcAlertThreshold: e.target.value})}
              >
                <option value="1SD">1 Standard Deviation</option>
                <option value="2SD">2 Standard Deviations</option>
                <option value="3SD">3 Standard Deviations</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowSettingsModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveSettings}
              disabled={saving}
            >
              {saving ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Saving...
                </>
              ) : (
                'Save Settings'
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default LabProfile