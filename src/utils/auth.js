import { DEMO_USERS } from './constants'

export const loginWithCredentials = async (email, password) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const user = DEMO_USERS.find(u => 
    u.email.toLowerCase() === email.toLowerCase() && 
    u.password === password
  )
  
  if (!user) {
    throw new Error('Invalid email or password')
  }
  
  // Remove password from user object
  const { password: _, ...userWithoutPassword } = user
  
  return {
    user: userWithoutPassword,
    token: `demo-token-${Date.now()}`
  }
}

export const getStoredAuth = () => {
  try {
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')
    
    if (token && userStr) {
      return {
        token,
        user: JSON.parse(userStr)
      }
    }
    return null
  } catch (error) {
    console.error('Error reading auth data:', error)
    return null
  }
}

export const storeAuth = (user, token) => {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

export const clearAuth = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const isTokenValid = () => {
  // In a real app, you'd validate the token with your backend
  return !!localStorage.getItem('token')
}