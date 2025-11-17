import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    // Redirect to role-specific dashboard
    switch (user?.role) {
      case 'DOCTOR':
        navigate('/doctor')
        break
      case 'ADMIN':
        navigate('/admin')
        break
      case 'NURSE':
        navigate('/nurse')
        break
      case 'RECEPTIONIST':
        navigate('/receptionist')
        break
      case 'SUPER_ADMIN':
        navigate('/super-admin')
        break
      default:
        navigate('/login')
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  )
}

export default Dashboard