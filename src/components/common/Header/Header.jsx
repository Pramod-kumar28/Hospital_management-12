import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { getInitials } from '../../../utils/helpers'
import { useNavigate } from 'react-router-dom'

const Header = ({ onMenuToggle = () => {}, onSidebarToggle = () => {}, isSidebarOpen = true }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const notifRef = useRef(null)
  const profileRef = useRef(null)

  const notifications = [
    { id: 1, message: 'New lab results available', time: '2 mins ago', unread: true },
    { id: 2, message: 'Appointment reminder at 11:30 AM', time: '1 hour ago', unread: true },
    { id: 3, message: 'New message from Nurse Kavya', time: '3 hours ago', unread: false }
  ]
  const unreadCount = notifications.filter(n => n.unread).length

  // Logout
  const handleLogout = () => {
    logout()
    navigate('/login')
    setShowProfileMenu(false)
  }

  // Go to role profile
  const handleProfile = () => {
    switch (user?.role) {
      case 'DOCTOR': navigate('/doctor/profile'); break
      case 'ADMIN': navigate('/admin/profile'); break
      case 'NURSE': navigate('/nurse/profile'); break
      case 'RECEPTIONIST': navigate('/receptionist/profile'); break
      case 'SUPER_ADMIN': navigate('/super-admin/profile'); break
      default: navigate('/profile')
    }
    setShowProfileMenu(false)
  }

  // Smooth sidebar toggle with animation
  const handleSidebarToggle = (e) => {
    e.stopPropagation()
    setIsAnimating(true)
    onSidebarToggle?.()
    
    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }

  // Smooth mobile menu toggle
  const handleMobileMenuToggle = (e) => {
    e.stopPropagation()
    setIsAnimating(true)
    onMenuToggle?.()
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }

  // Close dropdowns on outside click or ESC
  useEffect(() => {
    const onDocClick = (e) => {
      const inNotif = notifRef.current?.contains(e.target)
      const inProfile = profileRef.current?.contains(e.target)
      if (!inNotif && !inProfile) {
        setShowNotifications(false)
        setShowProfileMenu(false)
      }
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setShowNotifications(false)
        setShowProfileMenu(false)
      }
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <header className="bg-white border-b shadow-sm fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between px-4 h-full">
        {/* Left: hamburger + logo/title */}
        <div className="flex items-center gap-3 flex-1">
          {/* Mobile hamburger - Always show on mobile with smooth animation */}
          <button
            onClick={handleMobileMenuToggle}
            className={`lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 ease-in-out touch-target ${
              isAnimating ? 'transform scale-95' : ''
            }`}
            aria-label="Toggle menu"
          >
            <i className="fas fa-bars text-gray-600 text-lg transition-transform duration-300 ease-in-out"></i>
          </button>

          {/* Desktop sidebar toggle - Smooth slide-in animation */}
          <div className={`hidden md:block transition-all duration-500 ease-in-out overflow-hidden ${
            isSidebarOpen ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}>
            <button
              onClick={handleSidebarToggle}
              className={`p-2 rounded-lg hover:bg-gray-100 transition-all duration-500 ease-in-out touch-target ${
                isAnimating ? 'transform scale-95' : 'hover:scale-105'
              }`}
              aria-label="Open sidebar"
            >
              <i className="fas fa-bars text-gray-600 text-lg transition-all duration-300 ease-in-out"></i>
            </button>
          </div>

          {/* Logo and title with smooth transition */}
          <div className="flex items-center gap-2 transition-all duration-300 ease-in-out">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold transition-all duration-300 hover:scale-105 cursor-pointer">
              🏥 
            </div>
            <h1 className="text-lg font-semibold text-blue-600 transition-all duration-300">
              {user?.role === 'DOCTOR' ? 'Doctor Portal' :
               user?.role === 'ADMIN' ? 'Hospital Admin' :
               user?.role === 'NURSE' ? 'Nurse Dashboard' :
               user?.role === 'RECEPTIONIST' ? 'Reception Desk' :
               user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Dashboard'}
            </h1>
          </div>
        </div>

        {/* Right: notifications + profile */}
        <div className="flex items-center gap-2">
          {/* Notifications with smooth dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowNotifications((s) => !s)
                setShowProfileMenu(false)
              }}
              className={`text-gray-600 hover:text-blue-600 relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 ease-in-out touch-target ${
                showNotifications ? 'bg-blue-50 text-blue-600' : ''
              } ${isAnimating ? 'transform scale-95' : 'hover:scale-105'}`}
              aria-label="Notifications"
              aria-expanded={showNotifications}
              aria-haspopup="menu"
            >
              <i className={`fas fa-bell text-yellow-500 text-lg transition-transform duration-300 ${
                showNotifications ? 'animate-bounce' : ''
              }`}></i>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse transition-all duration-300">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown with smooth animation */}
            <div
              className={`absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out transform origin-top-right ${
                showNotifications 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}
              role="menu"
              aria-label="Notifications"
            >
              <div className="p-3 border-b bg-gray-50 rounded-t-lg">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-3 border-b hover:bg-gray-50 cursor-pointer transition-all duration-200 ${
                      notification.unread ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                    onClick={() => setShowNotifications(false)}
                    role="menuitem"
                  >
                    <p className="text-sm text-gray-800">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1 transition-all duration-200">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-2 text-center border-t bg-gray-50 rounded-b-lg">
                <button className="text-blue-600 text-sm hover:text-blue-700 transition-colors duration-200 font-medium">
                  View All Notifications
                </button>
              </div>
            </div>
          </div>

          {/* Profile with smooth dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowProfileMenu((s) => !s)
                setShowNotifications(false)
              }}
              className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 ease-in-out touch-target ${
                showProfileMenu ? 'bg-blue-50' : ''
              } ${isAnimating ? 'transform scale-95' : 'hover:scale-105'}`}
              aria-label="User menu"
              aria-expanded={showProfileMenu}
              aria-haspopup="menu"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold transition-all duration-300 hover:scale-110">
                {getInitials(user?.name || 'U')}
              </div>
              <span className="text-sm text-gray-700 hidden md:block transition-all duration-300">
                {user?.name}
              </span>
              <i className={`fas fa-chevron-down text-gray-500 text-xs hidden sm:block transition-transform duration-300 ${
                showProfileMenu ? 'rotate-180' : ''
              }`}></i>
            </button>

            {/* Profile dropdown with smooth animation */}
            <div
              className={`absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out transform origin-top-right ${
                showProfileMenu 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}
              role="menu"
              aria-label="Profile menu"
            >
              <div className="p-3 border-b bg-gray-50 rounded-t-lg">
                <p className="font-medium text-sm text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize transition-all duration-200">
                  {user?.role?.toLowerCase().replace('_', ' ')}
                </p>
              </div>
              <div className="p-1">
                <button
                  onClick={handleProfile}
                  className="w-full text-left px-3 py-3 text-sm text-gray-700 hover:bg-blue-50 rounded flex items-center touch-target transition-all duration-200 hover:translate-x-1 hover:text-blue-600"
                  role="menuitem"
                >
                  <i className="fas fa-user mr-2 text-gray-400 transition-colors duration-200"></i>
                  My Profile
                </button>
                <button
                  onClick={() => navigate('/settings')}
                  className="w-full text-left px-3 py-3 text-sm text-gray-700 hover:bg-blue-50 rounded flex items-center touch-target transition-all duration-200 hover:translate-x-1 hover:text-blue-600"
                  role="menuitem"
                >
                  <i className="fas fa-cog mr-2 text-gray-400 transition-colors duration-200"></i>
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-3 text-sm text-red-600 hover:bg-red-50 rounded flex items-center touch-target transition-all duration-200 hover:translate-x-1 hover:text-red-700"
                  role="menuitem"
                >
                  <i className="fas fa-sign-out-alt mr-2 transition-colors duration-200"></i>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header