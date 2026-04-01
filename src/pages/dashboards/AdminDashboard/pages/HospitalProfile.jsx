import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const HospitalProfile = () => {
  const [loading, setLoading] = useState(true)
  const [hospital, setHospital] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const [activeQuickAction, setActiveQuickAction] = useState(null)
  
  // Modal States for Quick Actions
  const [showInsuranceModal, setShowInsuranceModal] = useState(false)
  const [showHoursModal, setShowHoursModal] = useState(false)
  
  // Form states for modals
  const [newInsurance, setNewInsurance] = useState('')
  const [newHours, setNewHours] = useState('')

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
        insurancePartners: ["HealthGuard", "MediCare Plus", "SecureLife", "Wellness First"],
        // Current Plan Information
        currentPlan: {
          name: "Premium",
          type: "PREMIUM",
          price: "₹2,250",
          frequency: "/month",
          yearlyPrice: "₹27,000/year",
          features: [
            "Up to 5 doctors",
            "Up to 11 patients",
            "30 appointments / month"
          ],
          status: "Active",
          renewalDate: "2026-04-30"
        },
        // Payment History
        paymentHistory: [
          {
            id: "TXN001",
            date: "2026-03-30",
            description: "Monthly Plan - Premium",
            amount: "₹2,250",
            status: "Paid",
            method: "Credit Card",
            invoiceId: "INV-2026-003"
          },
          {
            id: "TXN002",
            date: "2026-02-28",
            description: "Monthly Plan - Premium",
            amount: "₹2,250",
            status: "Paid",
            method: "Bank Transfer",
            invoiceId: "INV-2026-002"
          },
          {
            id: "TXN003",
            date: "2026-01-30",
            description: "Monthly Plan - Premium",
            amount: "₹2,250",
            status: "Paid",
            method: "Credit Card",
            invoiceId: "INV-2026-001"
          },
          {
            id: "TXN004",
            date: "2025-12-30",
            description: "Monthly Plan - Premium",
            amount: "₹2,250",
            status: "Paid",
            method: "UPI",
            invoiceId: "INV-2025-012"
          },
          {
            id: "TXN005",
            date: "2025-11-30",
            description: "Monthly Plan - Premium",
            amount: "₹2,250",
            status: "Paid",
            method: "Credit Card",
            invoiceId: "INV-2025-011"
          }
        ]
      }
      setHospital(hospitalData)
      setFormData(hospitalData)
      setNewHours(hospitalData.openingHours)
      setLoading(false)
    }, 1000)
  }

  const handleEditProfile = () => {
    setIsEditing(true)
  }

  const handleSaveProfile = () => {
    setHospital(formData)
    setIsEditing(false)
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

  // Modal Handlers for Quick Actions
  const handleAddDepartment = () => {
    // Navigate to Department Management
    window.dispatchEvent(
      new CustomEvent('dashboard-navigation', {
        detail: { page: 'departments' }
      })
    )
  }

  const handleManageInsurance = () => {
    if (newInsurance.trim()) {
      const updatedInsurance = [...hospital.insurancePartners, newInsurance.trim()]
      setHospital(prev => ({ ...prev, insurancePartners: updatedInsurance }))
      setFormData(prev => ({ ...prev, insurancePartners: updatedInsurance }))
      setNewInsurance('')
      setShowInsuranceModal(false)
    }
  }

  const handleUpdateHours = () => {
    if (newHours && newHours.trim()) {
      setHospital(prev => ({ ...prev, openingHours: newHours }))
      setFormData(prev => ({ ...prev, openingHours: newHours }))
      setShowHoursModal(false)
    }
  }

  const handleViewAnalytics = () => {
    // Navigate to Reports/Analytics
    window.dispatchEvent(
      new CustomEvent('dashboard-navigation', {
        detail: { page: 'reports' }
      })
    )
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

  const triggerQuickAction = (actionKey, action) => {
    setActiveQuickAction(actionKey)
    action()
    setTimeout(() => {
      setActiveQuickAction(current => (current === actionKey ? null : current))
    }, 700)
  }

  if (loading) return <LoadingSpinner />

  const quickActions = [
    {
      key: 'department',
      title: 'Add Department',
      description: 'Launch setup for a new specialty unit',
      meta: `${hospital.departments?.length || 0} active departments`,
      icon: 'fas fa-plus',
      iconBg: 'from-cyan-400 to-blue-500',
      iconGlow: 'shadow-cyan-500/30',
      badge: 'Setup',
      onClick: handleAddDepartment
    },
    {
      key: 'insurance',
      title: 'Manage Insurance',
      description: 'Expand supported partners and coverage',
      meta: `${hospital.insurancePartners?.length || 0} insurance partners`,
      icon: 'fas fa-shield-alt',
      iconBg: 'from-emerald-400 to-green-500',
      iconGlow: 'shadow-emerald-500/30',
      badge: 'Coverage',
      onClick: () => setShowInsuranceModal(true)
    },
    {
      key: 'hours',
      title: 'Update Hours',
      description: 'Refresh OPD, emergency, and visit timings',
      meta: 'Keep patient-facing info current',
      icon: 'fas fa-clock',
      iconBg: 'from-violet-400 to-fuchsia-500',
      iconGlow: 'shadow-fuchsia-500/30',
      badge: 'Schedule',
      onClick: () => setShowHoursModal(true)
    },
    {
      key: 'analytics',
      title: 'View Analytics',
      description: 'Open performance insights and trends',
      meta: `${hospital.paymentHistory?.length || 0} recent transactions`,
      icon: 'fas fa-chart-line',
      iconBg: 'from-amber-400 to-orange-500',
      iconGlow: 'shadow-orange-500/30',
      badge: 'Insights',
      onClick: handleViewAnalytics
    }
  ]

  return (
    <div className="animate-fade-in space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Hospital Profile
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Hospital Information */}
        <div className="md:col-span-2 lg:col-span-2 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden">
          {/* Header Section with Gradient */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                <img 
                  src={hospital.logo} 
                  className="w-full h-full rounded-xl object-cover shadow-lg ring-4 ring-white" 
                  alt="Hospital Logo" 
                />
                {isEditing && (
                  <button
                    onClick={handleUpdateLogo}
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 sm:p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                    title="Update Logo"
                  >
                    <i className="fas fa-camera text-xs sm:text-sm"></i>
                  </button>
                )}
              </div>
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-2xl sm:text-3xl font-bold text-blue-700 border-b-2 border-blue-500 focus:outline-none w-full bg-transparent break-words"
                  />
                ) : (
                  <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 break-words">{hospital.name}</h3>
                )}
                <p className="text-gray-600 mt-1 flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Leading Healthcare Provider
                </p>
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Left Column */}
              <div className="space-y-5">
                <div className="bg-gray-50 rounded-xl p-4 hover:bg-blue-50 transition-colors border border-gray-300">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <i className="fas fa-map-marker-alt text-blue-600 mr-2"></i>Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  ) : (
                    <p className="text-gray-900 text-sm">{hospital.address}</p>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-4 hover:bg-green-50 transition-colors  border border-gray-300">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <i className="fas fa-phone text-green-600 mr-2"></i>Contact
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.contact}
                      onChange={(e) => handleInputChange('contact', e.target.value)}
                      className="w-full p-3 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 focus:bg-white transition-colors"
                    />
                  ) : (
                    <p className="text-gray-900 text-sm">{hospital.contact}</p>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-4 hover:bg-purple-50 transition-colors  border border-gray-300">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <i className="fas fa-envelope text-purple-600 mr-2"></i>Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white transition-colors"
                    />
                  ) : (
                    <p className="text-gray-900 text-sm">{hospital.email}</p>
                  )}
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-5 ">
                <div className="bg-gray-50 rounded-xl p-4 hover:bg-orange-50 transition-colors  border border-gray-300">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <i className="fas fa-clock text-orange-600 mr-2"></i>Opening Hours
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.openingHours}
                      onChange={(e) => handleInputChange('openingHours', e.target.value)}
                      className="w-full p-3 border-2 border-orange-300 rounded-lg focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                    />
                  ) : (
                    <p className="text-gray-900 text-sm">{hospital.openingHours}</p>
                  )}
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <i className="fas fa-building text-blue-600 mr-2"></i>Departments ({hospital.departments.length})
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {hospital.departments.map((dept, idx) => (
                      <span 
                        key={idx} 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-sm hover:shadow-md transition-shadow"
                      >
                        {dept}
                        {isEditing && (
                          <button
                            onClick={() => removeDepartment(dept)}
                            className="ml-2 hover:bg-red-500 rounded-full p-1 transition-colors"
                          >
                            <i className="fas fa-times text-xs"></i>
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <i className="fas fa-shield-alt text-green-600 mr-2"></i>Insurance Partners ({hospital.insurancePartners.length})
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {hospital.insurancePartners.map((insurance, idx) => (
                      <span 
                        key={idx} 
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-sm hover:shadow-md transition-shadow"
                      >
                        {insurance}
                        {isEditing && (
                          <button
                            onClick={() => removeInsurance(insurance)}
                            className="ml-2 hover:bg-red-500 rounded-full p-1 transition-colors"
                          >
                            <i className="fas fa-times text-xs"></i>
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-3">
              {isEditing ? (
                <>
                  <button 
                    onClick={handleSaveProfile}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:from-green-600 hover:to-green-700 font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <i className="fas fa-save"></i>Save Changes
                  </button>
                  <button 
                    onClick={handleCancelEdit}
                    className="flex-1 bg-gray-300 text-gray-800 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-gray-400 font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <i className="fas fa-times"></i>Cancel
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleEditProfile}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <i className="fas fa-edit"></i>Edit Profile
                  </button>
                  <button 
                    onClick={handleUpdateLogo}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:from-green-600 hover:to-green-700 font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <i className="fas fa-image"></i>Update Logo
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Quick Actions Panel */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-500 via-blue-600 to-gray-600 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_38%),radial-gradient(circle_at_bottom_left,_rgba(56,189,248,0.22),_transparent_32%)]"></div>
          <div className="absolute -right-10 top-10 h-28 w-28 rounded-full bg-cyan-300/20 blur-3xl"></div>
          <div className="absolute -left-6 bottom-16 h-24 w-24 rounded-full bg-indigo-300/20 blur-3xl"></div>

          <div className="relative p-4 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]"></span>
                  Live Shortcuts
                </div>
                <h3 className="mt-4 flex items-center text-lg font-bold sm:text-xl">
                  <i className="fas fa-bolt mr-3 text-amber-300"></i>
                  Quick Actions
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-blue-100/85">
                  High-traffic tasks are grouped here so admins can update settings faster.
                </p>
              </div>

              {/* <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-3 text-right backdrop-blur-md">
                <p className="text-[11px] uppercase tracking-[0.24em] text-blue-100/70">Ready</p>
                <p className="mt-2 text-2xl font-bold">{quickActions.length}</p>
                <p className="text-xs text-blue-100/75">smart actions</p>
              </div> */}
            </div>

            <div className="mt-5 grid gap-3">
              {quickActions.map((action, index) => {
                const isActive = activeQuickAction === action.key

                return (
                  <button
                    key={action.key}
                    onClick={() => triggerQuickAction(action.key, action.onClick)}
                    className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                      isActive
                        ? 'border-blue-200/80 bg-white/22 shadow-xl shadow-blue-950/30'
                        : 'border-white/15 bg-white/10 hover:-translate-y-1 hover:border-white/30 hover:bg-white/16 hover:shadow-xl hover:shadow-slate-950/20'
                    } backdrop-blur-xl`}
                  >
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.14),transparent)]"></div>
                    <div className="relative flex items-start justify-between gap-3">
                      <div className="flex min-w-0 gap-3">
                        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${action.iconBg} shadow-lg ${action.iconGlow}`}>
                          <i className={`${action.icon} text-sm text-white`}></i>
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-base font-semibold text-white">{action.title}</span>
                            <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-100/80">
                              {action.badge}
                            </span>
                          </div>

                          {/* <p className="mt-1 text-sm leading-5 text-blue-100/80">
                            {action.description}
                          </p> */}

                         
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-4">
                        {/* <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-100/60">
                          0{index + 1}
                        </span> */}
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 transition-all duration-300 ${
                          isActive ? 'translate-x-1 bg-white/20' : 'group-hover:translate-x-1 group-hover:bg-white/20'
                        }`}>
                          <i className="fas fa-arrow-right text-xs text-white"></i>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            
          </div>
        </div>

        {/* Current Plan Card */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-crown text-white font-bold text-sm sm:text-base"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg sm:text-xl text-gray-800">Current Plan</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Your subscription</p>
                </div>
              </div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                {hospital.currentPlan?.status || 'Active'}
              </span>
            </div>
          </div>

          {/* Plan Details */}
          <div className="p-4 sm:p-6 space-y-5">
            {/* Plan Name and Price */}
            <div className="text-center pb-4 border-b border-gray-200">
              <h4 className="text-sm sm:text-base font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                {hospital.currentPlan?.type || 'Premium'}
              </h4>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl sm:text-4xl font-bold text-blue-600">
                  {hospital.currentPlan?.price || '₹2,250'}
                </span>
                <span className="text-gray-600 text-sm">{hospital.currentPlan?.frequency || '/month'}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {hospital.currentPlan?.yearlyPrice || '₹27,000/year'}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Includes:</p>
              {hospital.currentPlan?.features?.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="fas fa-check text-green-600 text-xs"></i>
                  </div>
                  <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>

            {/* Renewal Info */}
            <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-200">
              <p className="text-xs text-gray-600 mb-1">Renewal Date</p>
              <p className="text-sm sm:text-base font-semibold text-blue-600">
                {new Date(hospital.currentPlan?.renewalDate).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 sm:py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-700 font-semibold transition-all shadow-md hover:shadow-lg text-sm sm:text-base">
                <i className="fas fa-arrow-up-right mr-2"></i>Upgrade
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 sm:py-2.5 rounded-lg hover:bg-gray-200 font-semibold transition-all text-sm sm:text-base">
                <i className="fas fa-info-circle mr-2"></i>Details
              </button>
            </div>
          </div>
        </div>

        {/* Payment History Section */}
        <div className="md:col-span-2 lg:col-span-2 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden">
          {/* Header */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-receipt text-white font-bold text-sm sm:text-base"></i>
              </div>
              <div>
                <h3 className="font-bold text-lg sm:text-xl text-gray-800">Payment History</h3>
                <p className="text-xs sm:text-sm text-gray-600">Recent transactions</p>
              </div>
            </div>
            <button className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors">
              <i className="fas fa-download mr-1"></i>Export
            </button>
          </div>
        </div>

        {/* Table Container with Responsive Scroll */}
        <div className="overflow-x-auto ">
          <table className="w-full">
            {/* Desktop Table Header */}
            <thead className="bg-gray-50 border-b border-gray-200 hidden sm:table-header-group">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Date</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Description</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Amount</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Method</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Status</th>
                <th className="px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody className="divide-y divide-gray-200 ">
              {hospital.paymentHistory?.map((payment, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors sm:table-row flex flex-col gap-3 p-4 sm:p-0">
                  {/* Mobile: Each row as card */}
                  <td className="sm:px-4 sm:py-4">
                    <span className="sm:hidden text-xs font-semibold text-gray-600 block mb-1">Date</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {new Date(payment.date).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </td>
                  <td className="sm:px-4 sm:py-4">
                    <span className="sm:hidden text-xs font-semibold text-gray-600 block mb-1">Description</span>
                    <span className="text-sm text-gray-700">{payment.description}</span>
                  </td>
                  <td className="sm:px-4 sm:py-4">
                    <span className="sm:hidden text-xs font-semibold text-gray-600 block mb-1">Amount</span>
                    <span className="text-sm font-bold text-green-600">{payment.amount}</span>
                  </td>
                  <td className="sm:px-4 sm:py-4">
                    <span className="sm:hidden text-xs font-semibold text-gray-600 block mb-1">Method</span>
                    <span className="text-sm text-gray-700 inline-flex items-center gap-1">
                      {payment.method === 'Credit Card' && <i className="fas fa-credit-card text-blue-500"></i>}
                      {payment.method === 'Bank Transfer' && <i className="fas fa-university text-purple-500"></i>}
                      {payment.method === 'UPI' && <i className="fas fa-mobile text-orange-500"></i>}
                      {payment.method}
                    </span>
                  </td>
                  <td className="sm:px-4 sm:py-4">
                    <span className="sm:hidden text-xs font-semibold text-gray-600 block mb-1">Status</span>
                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      <i className="fas fa-check-circle mr-1"></i>{payment.status}
                    </span>
                  </td>
                  <td className="sm:px-4 sm:py-4 sm:text-center">
                    <button className="w-full sm:w-auto text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors hover:underline">
                      <i className="fas fa-file-pdf mr-1"></i>Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 sm:px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-xs sm:text-sm text-gray-600">
            Showing {hospital.paymentHistory?.length || 0} transactions
          </p>
          <button className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-semibold transition-colors">
            View All <i className="fas fa-arrow-right ml-1"></i>
          </button>
        </div>
      </div>
      </div>

      {/* MODALS */}

      {/* Add Department Modal */}
      {/* Manage Insurance Modal */}
      {showInsuranceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40 flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-scale max-h-96 sm:max-h-none overflow-y-auto">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 flex items-center gap-3">
              <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
                <i className="fas fa-shield-alt text-white text-lg"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Add Insurance Partner</h3>
                <p className="text-green-100 text-sm">Expand coverage options</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Insurance Partner Name</label>
                <input 
                  type="text"
                  value={newInsurance}
                  onChange={(e) => setNewInsurance(e.target.value)}
                  placeholder="e.g., MediCare Plus"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 font-medium"
                />
              </div>
            </div>
            <div className="bg-gray-50 p-6 flex gap-3 border-t">
              <button 
                onClick={() => {
                  setShowInsuranceModal(false)
                  setNewInsurance('')
                }}
                className="flex-1 px-4 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleManageInsurance}
                className="flex-1 px-4 py-3 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <i className="fas fa-check mr-2"></i>Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Hours Modal */}
      {showHoursModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-scale">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center">
                <i className="fas fa-clock text-white text-lg"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Update Operating Hours</h3>
                <p className="text-purple-100 text-sm">Set your business hours</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Operating Hours</label>
                <input 
                  type="text"
                  value={newHours}
                  onChange={(e) => setNewHours(e.target.value)}
                  placeholder="e.g., 24/7 Emergency, OPD: 8AM-8PM"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>
            </div>
            <div className="bg-gray-50 p-6 flex gap-3 border-t">
              <button 
                onClick={() => setShowHoursModal(false)}
                className="flex-1 px-4 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateHours}
                className="flex-1 px-4 py-3 text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg hover:from-purple-600 hover:to-purple-700 font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <i className="fas fa-check mr-2"></i>Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HospitalProfile
