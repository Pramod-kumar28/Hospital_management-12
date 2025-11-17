// import React from 'react'
// import { useAuth } from '../../../hooks/useAuth'

// const Sidebar = ({ activePage, onPageChange, isOpen = false, onClose }) => {
//   const { user } = useAuth()

//   const doctorMenu = [
//     { id: 'dashboard', label: 'Dashboard Overview', icon: '📊' },
//     { id: 'appointments', label: 'Appointments', icon: '📅' },
//     { id: 'patients', label: 'Patient Records', icon: '👨‍⚕️' },
//     { id: 'prescriptions', label: 'Prescriptions', icon: '💊' },
//     { id: 'labs', label: 'Lab Results', icon: '🧪' },
//     { id: 'inpatient', label: 'Inpatient Visits', icon: '🏥' },
//     { id: 'messages', label: 'Messaging', icon: '💬' },
//     { id: 'profile', label: 'My Profile', icon: '👨‍💼' }
//   ]

//   const adminMenu = [
//     { id: 'dashboard', label: 'Dashboard Overview', icon: '📊' },
//     { id: 'profile', label: 'Hospital Profile', icon: '🏢' },
//     { id: 'doctors', label: 'Doctor Management', icon: '👨‍⚕️' },
//     { id: 'staff', label: 'Staff Management', icon: '👥' },
//     { id: 'departments', label: 'Department Management', icon: '🏗️' },
//     { id: 'appointments', label: 'Appointment Management', icon: '📋' },
//     { id: 'billing', label: 'Billing & Finance', icon: '💰' },
//     { id: 'inpatient', label: 'Inpatient Management', icon: '🛏️' },
//     { id: 'pharmacy', label: 'Pharmacy Management', icon: '💊' },
//     { id: 'lab', label: 'Lab Management', icon: '🔬' },
//     { id: 'reports', label: 'Reports', icon: '📈' },
//     { id: 'settings', label: 'Settings', icon: '⚙️' }
//   ]

//  const nurseMenu = [
//   { id: 'dashboard', label: 'Dashboard', icon: '📊' },
//   { id: 'patients', label: 'Assigned Patients', icon: '👥' },
//   { id: 'vitals', label: 'Vitals Monitoring', icon: '❤️' },
//   { id: 'medications', label: 'Medication Schedule', icon: '💊' },
//   { id: 'wards', label: 'Bed Management', icon: '🛏️' },
//   { id: 'labs', label: 'Lab Tests & Upload', icon: '🧪' },
//   { id: 'notes', label: 'Nursing Notes', icon: '📝' },
//   { id: 'discharge', label: 'Discharge Summary', icon: '📄' },
//   { id: 'profile', label: 'My Profile', icon: '👩‍⚕️' }
// ]
//   const receptionistMenu = [
//     { id: 'dashboard', label: 'Dashboard Overview', icon: '📊' },
//     { id: 'registration', label: 'Patient Registration', icon: '👤' },
//     { id: 'appointments', label: 'Appointment Scheduling', icon: '📅' },
//     { id: 'billing', label: 'Billing', icon: '💰' },
//     { id: 'records', label: 'Patient Records', icon: '📁' },
//     { id: 'profile', label: 'My Profile', icon: '💁' }
//   ]

//   const superAdminMenu = [
//     { id: 'dashboard', label: 'Dashboard Overview', icon: '📊' },
//     { id: 'hospitals', label: 'Hospital Management', icon: '🏥' },
//     { id: 'subscriptions', label: 'Subscriptions & Billing', icon: '💳' },
//     { id: 'users', label: 'User Accounts', icon: '👥' },
//     { id: 'settings', label: 'Platform Settings', icon: '⚙️' },
//     { id: 'reports', label: 'Reports & Analytics', icon: '📈' },
//     { id: 'audit', label: 'Audit Logs', icon: '📋' },
   
//     // { id: 'profile', label: 'Super Admin Profile', icon: '👨‍💼' }
// ]

//   const getMenuItems = () => {
//     switch (user?.role) {
//       case 'ADMIN': return adminMenu
//       case 'NURSE': return nurseMenu
//       case 'RECEPTIONIST': return receptionistMenu
//       case 'SUPER_ADMIN': return superAdminMenu
//       default: return doctorMenu
//     }
//   }

//   const menuItems = getMenuItems()

//   return (
//     <>
//       {/* Mobile drawer */}
//       <aside
//         className={`sidebar-mobile transform transition-transform duration-200 ease-in-out ${isOpen ? 'open' : ''}`}
//         role="dialog"
//         aria-modal="true"
//       >
//         <div className="p-4">
//           <div>
//           <h2 className="text-gray-700 font-semibold mb-2">Navigation</h2>
//           <span><i className='fas fa-close'>X</i></span>
//           </div>
//           <nav className="space-y-1">
//             {menuItems.map(item => (
//               <button
//                 key={item.id}
//                 onClick={() => { onPageChange(item.id); onClose?.(); }}
//                 className={`w-full text-left p-2 rounded flex items-center transition-all duration-200 ${
//                   activePage === item.id
//                     ? 'bg-blue-100 text-blue-700 font-semibold'
//                     : 'hover:bg-blue-50 text-gray-700'
//                 }`}
//               >
//                 <span className="text-lg mr-2 w-6 text-center">{item.icon}</span>
//                 {item.label}
//               </button>
//             ))}
//           </nav>
//         </div>
//       </aside>

//       {/* Desktop rail */}
//       <aside className="sidebar-desktop hidden md:block">
//         <div className="p-4">
//           <h2 className="text-gray-700 font-semibold mb-2">Navigation</h2>
//           <nav className="space-y-1">
//             {menuItems.map(item => (
//               <button
//                 key={item.id}
//                 onClick={() => onPageChange(item.id)}
//                 className={`w-full text-left p-2 rounded flex items-center transition-all duration-200 ${
//                   activePage === item.id
//                     ? 'bg-blue-100 text-blue-700 font-semibold'
//                     : 'hover:bg-blue-50 text-gray-700'
//                 }`}
//               >
//                 <span className="text-lg mr-2 w-6 text-center">{item.icon}</span>
//                 {item.label}
//               </button>
//             ))}
//           </nav>
//         </div>
//       </aside>

//       {/* Mobile overlay */}
//       {isOpen && (
//         <div className="sidebar-overlay md:hidden" onClick={onClose} />
//       )}
//     </>
//   )
// }

// export default Sidebar



















import React from 'react'
import { useAuth } from '../../../hooks/useAuth'

const Sidebar = ({ activePage, onPageChange, isOpen = false, onClose }) => {
  const { user } = useAuth()

  const doctorMenu = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: '📊' },
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'patients', label: 'Patient Records', icon: '👨‍⚕️' },
    { id: 'prescriptions', label: 'Prescriptions', icon: '💊' },
    { id: 'labs', label: 'Lab Results', icon: '🧪' },
    { id: 'inpatient', label: 'Inpatient Visits', icon: '🏥' },
    { id: 'messages', label: 'Messaging', icon: '💬' },
    { id: 'profile', label: 'My Profile', icon: '👨‍💼' }
  ]

  const adminMenu = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: '📊' },
    { id: 'profile', label: 'Hospital Profile', icon: '🏢' },
    { id: 'doctors', label: 'Doctor Management', icon: '👨‍⚕️' },
    { id: 'staff', label: 'Staff Management', icon: '👥' },
    { id: 'departments', label: 'Department Management', icon: '🏬' },
    { id: 'appointments', label: 'Appointment Management', icon: '📋' },
    { id: 'billing', label: 'Billing & Finance', icon: '💰' },
    { id: 'inpatient', label: 'Inpatient Management', icon: '🛏️' },
    { id: 'pharmacy', label: 'Pharmacy Management', icon: '💊' },
    { id: 'lab', label: 'Lab Management', icon: '🔬' },
    { id: 'reports', label: 'Reports', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ]

  const nurseMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'patients', label: 'Assigned Patients', icon: '👥' },
    { id: 'vitals', label: 'Vitals Monitoring', icon: '❤️' },
    { id: 'medications', label: 'Medication Schedule', icon: '💊' },
    { id: 'wards', label: 'Bed Management', icon: '🛏️' },
    { id: 'labs', label: 'Lab Tests & Upload', icon: '🧪' },
    { id: 'notes', label: 'Nursing Notes', icon: '📝' },
    { id: 'discharge', label: 'Discharge Summary', icon: '📄' },
    { id: 'profile', label: 'My Profile', icon: '👩‍⚕️' }
  ]

  const receptionistMenu = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: '📊' },
    { id: 'registration', label: 'Patient Registration', icon: '👤' },
    { id: 'appointments', label: 'Appointment Scheduling', icon: '📅' },
    { id: 'billing', label: 'Billing', icon: '💰' },
    { id: 'records', label: 'Patient Records', icon: '📁' },
    { id: 'profile', label: 'My Profile', icon: '💁' }
  ]

  const superAdminMenu = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: '📊' },
    { id: 'hospitals', label: 'Hospital Management', icon: '🏥' },
    { id: 'subscriptions', label: 'Subscriptions & Billing', icon: '💳' },
    { id: 'users', label: 'User Accounts', icon: '👥' },
    { id: 'settings', label: 'Platform Settings', icon: '⚙️' },
    { id: 'reports', label: 'Reports & Analytics', icon: '📈' },
    { id: 'audit', label: 'Audit Logs', icon: '📋' },
  ]

  const getMenuItems = () => {
    switch (user?.role) {
      case 'ADMIN': return adminMenu
      case 'NURSE': return nurseMenu
      case 'RECEPTIONIST': return receptionistMenu
      case 'SUPER_ADMIN': return superAdminMenu
      default: return doctorMenu
    }
  }

  const menuItems = getMenuItems()

  const handleItemClick = (itemId) => {
    onPageChange(itemId)
    onClose?.()
  }

  return (
    <>
      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r transform transition-transform duration-300 z-40 md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex-shrink-0 p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-gray-700 font-semibold text-lg">Navigation</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <i className="fas fa-times text-gray-600 text-lg"></i>
              </button>
            </div>
          </div>
          
          {/* Scrollable Navigation */}
          <nav className="flex-1 overflow-y-auto py-2">
            <div className="space-y-1 px-2">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full text-left p-3 rounded-lg flex items-center transition-all duration-200 ${
                    activePage === item.id
                      ? 'bg-blue-100 text-blue-700 font-semibold border-l-4 border-l-blue-500'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="text-lg mr-3 w-6 text-center">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-white border-r h-[calc(100vh-4rem)] sticky top-16">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex-shrink-0 p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-gray-700 font-semibold text-lg">Navigation</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close sidebar"
              >
                <i className="fas fa-times text-gray-600 text-lg"></i>
              </button>
            </div>
          </div>
          
          {/* Scrollable Navigation */}
          <nav className="flex-1 overflow-y-auto py-2">
            <div className="space-y-1 px-2">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`w-full text-left p-3 rounded-lg flex items-center transition-all duration-200 ${
                    activePage === item.id
                      ? 'bg-blue-100 text-blue-700 font-semibold border-l-4 border-l-blue-500'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="text-lg mr-3 w-6 text-center">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" 
          onClick={onClose} 
        />
      )}
    </>
  )
}

export default Sidebar