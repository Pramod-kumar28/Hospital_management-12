import { createSlice } from '@reduxjs/toolkit'

const USER_KEY = 'user'

function readStoredAuth() {
  const token = localStorage.getItem('token')
  let user = null
  try {
    const raw = localStorage.getItem(USER_KEY)
    if (raw) user = JSON.parse(raw)
  } catch {
    user = null
  }
  // Token without user breaks role checks after refresh — treat as logged out
  const valid = !!(token && user && typeof user === 'object')
  if (token && !user) {
    localStorage.removeItem('token')
  }
  return {
    user: valid ? user : null,
    token: valid ? token : null,
    isAuthenticated: valid,
  }
}

const initialState = {
  ...readStoredAuth(),
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem(USER_KEY, JSON.stringify(action.payload.user))
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.isAuthenticated = false
      state.user = null
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem(USER_KEY)
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem(USER_KEY)
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions
export default authSlice.reducer