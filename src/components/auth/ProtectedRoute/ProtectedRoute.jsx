// import React from 'react'
// import { Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// const ProtectedRoute = ({ children, requiredRole }) => {
//   const { isAuthenticated, user } = useSelector(state => state.auth)

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />
//   }

//   if (requiredRole && user?.role !== requiredRole) {
//     // Redirect to their role-specific dashboard
//     switch (user?.role) {
//       case 'DOCTOR': return <Navigate to="/doctor" replace />
//       case 'ADMIN': return <Navigate to="/admin" replace />
//       case 'NURSE': return <Navigate to="/nurse" replace />
//       case 'RECEPTIONIST': return <Navigate to="/receptionist" replace />
//       case 'SUPER_ADMIN': return <Navigate to="/super-admin" replace />
//       default: return <Navigate to="/dashboard" replace />
//     }
//   }

//   return children
// }

// export default ProtectedRoute






















// import React from 'react'
// import { Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// const ProtectedRoute = ({ children, requiredRole }) => {
//   const { isAuthenticated, user } = useSelector(state => state.auth)

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />
//   }

//   if (requiredRole && user?.role !== requiredRole) {
//     // Redirect to their role-specific dashboard
//     switch (user?.role) {
//       case 'DOCTOR': return <Navigate to="/doctor" replace />
//       case 'ADMIN': return <Navigate to="/admin" replace />
//       case 'NURSE': return <Navigate to="/nurse" replace />
//       case 'RECEPTIONIST': return <Navigate to="/receptionist" replace />
//       case 'SUPER_ADMIN': return <Navigate to="/super-admin" replace />
//       case 'PATIENT': return <Navigate to="/patient" replace />
//       default: return <Navigate to="/dashboard" replace />
//     }
//   }

//   return children
// }

// export default ProtectedRoute

















import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to their role-specific dashboard
    switch (user?.role) {
      case 'DOCTOR': return <Navigate to="/doctor" replace />
      case 'ADMIN': return <Navigate to="/admin" replace />
      case 'NURSE': return <Navigate to="/nurse" replace />
      case 'RECEPTIONIST': return <Navigate to="/receptionist" replace />
      case 'SUPER_ADMIN': return <Navigate to="/super-admin" replace />
       case 'PATIENT': return <Navigate to="/patient" replace />
      case 'LAB': return <Navigate to="/lab" replace />
       case 'PHARMACY': return <Navigate to="/pharmacy" replace />
      case 'TELEMEDICINE': return <Navigate to="/telemedicine" replace />  // NEW
      default: return <Navigate to="/login" replace />
    }
  }

  return children
}

export default ProtectedRoute