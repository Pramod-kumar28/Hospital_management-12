import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Zap, Shield, Eye, EyeOff } from 'lucide-react'
import { toast } from 'react-toastify'
import { loginFailure, loginStart, loginSuccess } from '../../redux/slices/authSlice'
import { API_BASE_URL, API_HEADERS, AUTH_PATIENT_LOGIN } from '../../config/api'
import { PASSWORD_MIN_LENGTH, isValidEmail } from '../../utils/validation'

const INVALID_CREDENTIALS = 'Invalid credentials'
const EMAIL_NOT_VERIFIED = 'Email not verified'
const SERVER_ERROR = 'Server error. Please try again.'

const PatientLoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const emailRef = useRef(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const focusEmail = () => {
    if (!emailRef.current) return
    emailRef.current.focus()
    emailRef.current.select()
  }

  const mapApiError = (message, status) => {
    const m = String(message || '').toLowerCase()
    if (status === 401 || m.includes('invalid credential') || m.includes('invalid email') || m.includes('invalid password')) {
      return INVALID_CREDENTIALS
    }
    if (status === 403 || m.includes('not verified') || m.includes('verify')) {
      return EMAIL_NOT_VERIFIED
    }
    return SERVER_ERROR
  }

  const getUserPayload = (user = {}, emailValue) => {
    const roles = Array.isArray(user.roles) ? user.roles : []
    return {
      id: user.id ?? user._id ?? user.patient_id ?? `patient-${emailValue}`,
      name: user.name ?? user.full_name ?? user.fullName ?? 'Patient User',
      email: user.email ?? emailValue,
      role: 'PATIENT',
      roles: roles.length ? roles : ['PATIENT'],
      ...user,
      roleName: user.roleName ?? 'PATIENT',
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    dispatch(loginStart())

    const emailValue = email.trim()
    const passwordValue = password

    if (!isValidEmail(emailValue)) {
      const msg = 'Enter a valid email address.'
      setError(msg)
      dispatch(loginFailure(msg))
      setLoading(false)
      focusEmail()
      return
    }

    if (!passwordValue || passwordValue.length < PASSWORD_MIN_LENGTH) {
      const msg = `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`
      setError(msg)
      dispatch(loginFailure(msg))
      setLoading(false)
      focusEmail()
      return
    }

    try {
      const res = await fetch(`${API_BASE_URL}${AUTH_PATIENT_LOGIN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...API_HEADERS },
        body: JSON.stringify({ email: emailValue, password: passwordValue }),
      })

      const response = await res.json().catch(() => ({}))
      const data = response?.data ?? response ?? {}

      if (!res.ok) {
        const mappedError = mapApiError(response?.message || response?.detail?.message, res.status)
        setError(mappedError)
        dispatch(loginFailure(mappedError))
        toast.error(mappedError)
        focusEmail()
        setLoading(false)
        return
      }

      const accessToken = data.access_token ?? data.accessToken ?? data.token
      const refreshToken = data.refresh_token ?? data.refreshToken ?? null
      const user = getUserPayload(data.user ?? {}, emailValue)

      if (!accessToken) {
        const msg = SERVER_ERROR
        setError(msg)
        dispatch(loginFailure(msg))
        toast.error(msg)
        focusEmail()
        setLoading(false)
        return
      }

      dispatch(
        loginSuccess({
          user,
          token: accessToken,
          refreshToken,
          requiresPasswordChange: false,
          rememberMe,
        })
      )

      toast.success(response?.message || 'Patient login successful')
      navigate('/patient', { replace: true })
    } catch (err) {
      const mappedError = mapApiError(err?.message, 500)
      setError(mappedError)
      dispatch(loginFailure(mappedError))
      toast.error(mappedError)
      focusEmail()
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="py-12 bg-gradient-to-br from-blue-50 to-cyan-50 border-b border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 text-center">Patient Login</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Sign in with your patient account to view appointments, medical records, and prescriptions.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>
                  <p className="text-gray-600">Enter your email and password to continue.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="patient-email">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        ref={emailRef}
                        id="patient-email"
                        type="email"
                        autoComplete="email"
                        required
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="patient@hospital.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (error) setError('')
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="patient-password">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="patient-password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        minLength={PASSWORD_MIN_LENGTH}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder={`At least ${PASSWORD_MIN_LENGTH} characters`}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          if (error) setError('')
                        }}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="rememberMe"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                        Keep me signed in
                      </label>
                    </div>
                    <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
                      Forgot password?
                    </Link>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <p className="ml-3 text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in
                        <Zap className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-500">
                    New patient? Register first, then verify OTP and sign in.
                  </p>
                </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PatientLoginPage

