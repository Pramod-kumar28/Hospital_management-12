import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginStart, loginSuccess, loginFailure } from '../../redux/slices/authSlice'
import { API_BASE_URL, API_HEADERS, AUTH_SUPER_ADMIN_LOGIN, AUTH_HOSPITAL_ADMIN_LOGIN } from '../../config/api'
import { shouldRequireHospitalAdminPasswordChange } from '../../utils/authFlow'
import { buildUserPayloadFromApiUser } from '../../utils/authLoginPayload'
import { PASSWORD_MIN_LENGTH, isValidEmail } from '../../utils/validation'
import { Eye, EyeOff, Mail, Lock, Zap, Shield, Building2 } from 'lucide-react'

const DEMO_USERS = [
  { email: 'admin@dcm.demo', password: 'admin123', role: 'ADMIN', name: 'Admin User' },
  { email: 'doctor@dcm.demo', password: 'doc123', role: 'DOCTOR', name: 'Dr. Aparna' },
  { email: 'nurse@dcm.demo', password: 'nurse123', role: 'NURSE', name: 'Nurse Staff' },
  { email: 'reception@dcm.demo', password: 'reception123', role: 'RECEPTIONIST', name: 'Receptionist' },
  { email: 'super@dcm.demo', password: 'sup123', role: 'SUPER_ADMIN', name: 'Super Admin' },
  { email: 'lab@dcm.demo', password: 'lab123', role: 'LAB', name: 'Lab Technician' },
  { email: 'patient@dcm.demo', password: 'patient123', role: 'PATIENT', name: 'Patient User' },
  { email: 'pharmacy@dcm.demo', password: 'pharma123', role: 'PHARMACY', name: 'Pharmacy Staff' },
  { email: 'telemedicine@dcm.demo', password: 'tele123', role: 'TELEMEDICINE', name: 'Telemedicine Staff' },
]

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [adminRole, setAdminRole] = useState('super_admin')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (error) setError('')
  }

  const navigateByAppRole = (appRole, requiresPasswordChange) => {
    if (appRole === 'SUPER_ADMIN') navigate('/super-admin', { replace: true })
    else if (appRole === 'ADMIN') {
      if (requiresPasswordChange) navigate('/admin/change-password', { replace: true })
      else navigate('/admin', { replace: true })
    } else if (appRole === 'DOCTOR') navigate('/doctor', { replace: true })
    else if (appRole === 'NURSE') navigate('/nurse', { replace: true })
    else if (appRole === 'RECEPTIONIST') navigate('/receptionist', { replace: true })
    else if (appRole === 'LAB') navigate('/lab', { replace: true })
    else if (appRole === 'PATIENT') navigate('/patient', { replace: true })
    else if (appRole === 'PHARMACY') navigate('/pharmacy', { replace: true })
    else if (appRole === 'TELEMEDICINE') navigate('/telemedicine', { replace: true })
    else if (appRole === 'USER') navigate('/login', { replace: true })
    else if (!appRole) navigate('/login', { replace: true })
    else if (appRole && appRole.includes('ADMIN')) {
      navigate('/admin', { replace: true })
    } else {
      setError('Your account role is not supported on this sign-in page.')
      dispatch(loginFailure('Unsupported role'))
    }
  }

  const tryDemoLogin = (email, password) => {
    const demo = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!demo) return false

    dispatch(
      loginSuccess({
        user: {
          id: `demo-${demo.role.toLowerCase()}`,
          name: demo.name,
          email: demo.email,
          role: demo.role,
          roles: [demo.role],
        },
        token: `demo-token-${Date.now()}`,
        refreshToken: `demo-refresh-${Date.now()}`,
        requiresPasswordChange: false,
      })
    )
    toast.success(`Demo login successful (${demo.role})`)
    navigateByAppRole(demo.role, false)
    return true
  }

  const fillDemoCredentials = (demoUser) => {
    setFormData((prev) => ({
      ...prev,
      email: demoUser.email,
      password: demoUser.password,
      rememberMe: true,
    }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    dispatch(loginStart())

    const email = formData.email.trim()
    const password = formData.password

    if (!isValidEmail(email)) {
      setError('Enter a valid email address.')
      dispatch(loginFailure('Invalid email'))
      setLoading(false)
      return
    }
    if (!password || password.length < PASSWORD_MIN_LENGTH) {
      setError(`Password must be at least ${PASSWORD_MIN_LENGTH} characters.`)
      dispatch(loginFailure('Invalid password'))
      setLoading(false)
      return
    }

    const loginPath = adminRole === 'super_admin' ? AUTH_SUPER_ADMIN_LOGIN : AUTH_HOSPITAL_ADMIN_LOGIN
    const loginUrl = `${API_BASE_URL}${loginPath}`

    try {
      const res = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...API_HEADERS },
        body: JSON.stringify({ email, password }),
      })

      const response = await res.json().catch(() => ({}))
      const msg = response.message || response?.detail?.message || `Request failed (${res.status})`

      if (!res.ok) {
        if (tryDemoLogin(email, password)) {
          setLoading(false)
          return
        }
        setError(msg)
        dispatch(loginFailure(msg))
        toast.error(msg)
        setLoading(false)
        return
      }

      const data = response.data ?? response
      const accessToken = data.access_token ?? data.token ?? data.accessToken
      const refreshToken = data.refresh_token ?? data.refreshToken ?? null
      const user = data.user ?? {}

      if (!accessToken || !user || typeof user !== 'object') {
        const err = 'Invalid response: missing token or user.'
        setError(err)
        dispatch(loginFailure(err))
        toast.error(err)
        setLoading(false)
        return
      }

      const userPayload = buildUserPayloadFromApiUser(user)
      if (!userPayload) {
        const err = 'Invalid response: user could not be parsed.'
        setError(err)
        dispatch(loginFailure(err))
        toast.error(err)
        setLoading(false)
        return
      }

      const requiresPasswordChange =
        userPayload.role === 'ADMIN' &&
        adminRole === 'hospital_admin' &&
        shouldRequireHospitalAdminPasswordChange(user, response)

      dispatch(
        loginSuccess({
          user: userPayload,
          token: accessToken,
          refreshToken,
          requiresPasswordChange,
        })
      )

      if (requiresPasswordChange) {
        toast.info('Set a new password to continue — use the temporary password from your hospital as the current password.')
      } else {
        toast.success(response.message || 'Signed in successfully')
      }
      navigateByAppRole(userPayload.role, requiresPasswordChange)
    } catch (err) {
      console.error('Login failed:', err)
      if (tryDemoLogin(email, password)) {
        setLoading(false)
        return
      }
      const fallback = err?.message || 'Network error. Is the API running at the configured base URL?'
      setError(fallback)
      dispatch(loginFailure(fallback))
      toast.error(fallback)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="py-12 bg-gradient-to-br from-blue-50 to-cyan-50 border-b border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 text-center">
            Admin sign in
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Sign in as <strong className="font-semibold text-gray-800">Super Admin</strong> (platform) or{' '}
            <strong className="font-semibold text-gray-800">Hospital Admin</strong> (your hospital). Use the email and password
            provided for your account.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>
                  <p className="text-gray-600">Select your role, then enter your email and password.</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setAdminRole('super_admin')}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                      adminRole === 'super_admin'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <Shield className="w-5 h-5" />
                    Super Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdminRole('hospital_admin')}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                      adminRole === 'hospital_admin'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                    Hospital Admin
                  </button>
                </div>

                {adminRole === 'hospital_admin' && (
                  <p className="text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-6">
                    First visit: sign in with the <strong>temporary password</strong> from your Super Admin, then you&apos;ll set a new password. After that, use your{' '}
                    <strong>new password only</strong> — the temporary one will not be used for the dashboard session.
                  </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="admin@hospital.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        minLength={PASSWORD_MIN_LENGTH}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder={`At least ${PASSWORD_MIN_LENGTH} characters`}
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
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
                        name="rememberMe"
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                    >
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
                    API login works for admin roles. Demo logins for Doctor/Lab/Patient/etc are available below.
                  </p>

                  <div className="mt-6 pt-5 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 text-center mb-3">Demo Accounts (click to fill)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {DEMO_USERS.map((user) => (
                        <button
                          key={`${user.role}-${user.email}`}
                          type="button"
                          onClick={() => fillDemoCredentials(user)}
                          className="text-left p-2.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                        >
                          <p className="text-xs font-semibold text-gray-900 truncate">{user.name}</p>
                          <p className="text-[11px] text-gray-600 truncate">{user.email}</p>
                          <p className="text-[11px] text-blue-700 font-medium">{user.role}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </form>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Who signs in here?</h3>
                <p className="text-blue-100 text-lg mb-6">
                  <strong className="text-white">Super Admin</strong> manages the whole platform (hospitals, plans, etc.).{' '}
                  <strong className="text-white">Hospital Admin</strong> runs day-to-day operations for one hospital.
                </p>
                <ul className="space-y-3 text-blue-100 text-sm">
                  <li>• New hospital admins may be asked to set a new password on first sign-in.</li>
                  <li>• Use the temporary password you were given until you change it.</li>
                  <li>• Forgot your password? Use your hospital’s reset process or contact support.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LoginPage
