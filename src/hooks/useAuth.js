import { useDispatch, useSelector } from 'react-redux'
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice'

const USERS = [
  { email: "admin@dcm.demo", password: "admin123", role: "ADMIN", name: "Admin" },
  { email: "doctor@dcm.demo", password: "doc123", role: "DOCTOR", name: "Dr. Aparna" },
  { email: "nurse@dcm.demo", password: "nurse123", role: "NURSE", name: "Nurse" },
  { email: "reception@dcm.demo", password: "reception123", role: "RECEPTIONIST", name: "Front Desk" },
  { email: "super@dcm.demo", password: "sup123", role: "SUPER_ADMIN", name: "Super Admin" }
]

export const useAuth = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, user, loading, error } = useSelector(state => state.auth)

  const login = async (email, password) => {
    dispatch(loginStart())
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const user = USERS.find(u => u.email === email && u.password === password)
      
      if (user) {
        const userData = {
          user: {
            id: 1,
            name: user.name,
            email: user.email,
            role: user.role
          },
          token: 'demo-token-' + Date.now()
        }
        dispatch(loginSuccess(userData))
        return { success: true }
      } else {
        dispatch(loginFailure('Invalid email or password'))
        return { success: false, error: 'Invalid email or password' }
      }
    } catch (error) {
      dispatch(loginFailure('Login failed'))
      return { success: false, error: 'Login failed' }
    }
  }

  const logout = () => {
    dispatch(logout())
  }

  return {
    login,
    logout,
    isAuthenticated,
    user,
    loading,
    error
  }
}