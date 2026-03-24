import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, requiresPasswordChange } = useSelector((state) => state.auth)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const isHospitalAdminChangePassword = location.pathname === '/admin/change-password'

  if (requiredRole === 'ADMIN' && user?.role === 'ADMIN') {
    if (requiresPasswordChange && !isHospitalAdminChangePassword) {
      return <Navigate to="/admin/change-password" replace />
    }
    if (!requiresPasswordChange && isHospitalAdminChangePassword) {
      return <Navigate to="/admin" replace />
    }
  }

  if (requiredRole && user?.role !== requiredRole) {
    switch (user?.role) {
      case 'DOCTOR': return <Navigate to="/doctor" replace />
      case 'ADMIN': return <Navigate to="/admin" replace />
      case 'NURSE': return <Navigate to="/nurse" replace />
      case 'RECEPTIONIST': return <Navigate to="/receptionist" replace />
      case 'SUPER_ADMIN': return <Navigate to="/super-admin" replace />
      case 'PATIENT': return <Navigate to="/patient" replace />
      case 'LAB': return <Navigate to="/lab" replace />
      case 'PHARMACY': return <Navigate to="/pharmacy" replace />
      case 'TELEMEDICINE': return <Navigate to="/telemedicine" replace />
      case 'USER':
      default: return <Navigate to="/login" replace />
    }
  }

  return children
}

export default ProtectedRoute