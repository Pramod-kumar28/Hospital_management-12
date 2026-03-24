import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginSuccess, logout } from '../../redux/slices/authSlice'
import { markHospitalAdminInitialPasswordDone } from '../../utils/authFlow'
import { buildUserPayloadFromApiUser } from '../../utils/authLoginPayload'
import { API_BASE_URL, API_HEADERS, AUTH_HOSPITAL_ADMIN_CHANGE_PASSWORD, AUTH_HOSPITAL_ADMIN_LOGIN } from '../../config/api'
import { apiFetch } from '../../services/apiClient'
import { PASSWORD_MIN_LENGTH } from '../../utils/validation'
import { Eye, EyeOff, Lock, KeyRound } from 'lucide-react'

const HospitalAdminChangePassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [show, setShow] = useState({ current: false, next: false, confirm: false })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggle = (key) => setShow((s) => ({ ...s, [key]: !s[key] }))

  /**
   * Establish dashboard session ONLY via POST /auth/hospital-admin/login with the new password.
   * Ignores any tokens from the change-password response so access tokens always match the new password.
   * On success, loginSuccess overwrites previous (temp-password) tokens in storage.
   */
  const signInWithNewPasswordOnly = async (newPassPlain, email, userId) => {
    const loginRes = await fetch(`${API_BASE_URL}${AUTH_HOSPITAL_ADMIN_LOGIN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...API_HEADERS },
      body: JSON.stringify({ email, password: newPassPlain }),
    })
    const loginJson = await loginRes.json().catch(() => ({}))
    const msg = loginJson.message || loginJson?.detail?.message || `Sign-in failed (${loginRes.status})`

    if (!loginRes.ok) {
      markHospitalAdminInitialPasswordDone({ email, id: userId })
      dispatch(logout())
      toast.warning(
        `Password was updated on the server. Please sign in using your new password only. (${msg})`
      )
      navigate('/login', { replace: true })
      return
    }

    const loginData = loginJson.data ?? loginJson
    const accessToken = loginData.access_token ?? loginData.token ?? loginData.accessToken
    const refreshToken = loginData.refresh_token ?? loginData.refreshToken ?? null
    const apiUser = loginData.user ?? {}

    if (!accessToken || !apiUser || typeof apiUser !== 'object') {
      markHospitalAdminInitialPasswordDone({ email, id: userId })
      dispatch(logout())
      toast.warning('Password was updated. Please sign in with your new password only.')
      navigate('/login', { replace: true })
      return
    }

    const userPayload = buildUserPayloadFromApiUser(apiUser)
    if (!userPayload) {
      dispatch(logout())
      navigate('/login', { replace: true })
      return
    }

    dispatch(
      loginSuccess({
        user: userPayload,
        token: accessToken,
        refreshToken,
        requiresPasswordChange: false,
      })
    )
    markHospitalAdminInitialPasswordDone(userPayload)
    toast.success(loginJson.message || 'Signed in with your new password. Use this password from now on.')
    navigate('/admin', { replace: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!currentPassword) {
      setError('Enter your current (temporary) password.')
      return
    }
    if (!newPassword || newPassword.length < PASSWORD_MIN_LENGTH) {
      setError(`New password must be at least ${PASSWORD_MIN_LENGTH} characters.`)
      return
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.')
      return
    }
    if (newPassword === currentPassword) {
      setError('New password must be different from your current password.')
      return
    }

    setLoading(true)
    try {
      const res = await apiFetch(AUTH_HOSPITAL_ADMIN_CHANGE_PASSWORD, {
        method: 'POST',
        body: {
          current_password: currentPassword,
          new_password: newPassword,
        },
      })
      const data = await res.json().catch(() => ({}))
      const msg = data.message || data?.detail?.message || `Request failed (${res.status})`

      if (!res.ok) {
        setError(msg)
        toast.error(msg)
        return
      }

      const email = String(user?.email || '').trim()
      const userId = user?.id
      if (!email) {
        toast.error('Missing account email. Please sign in again.')
        dispatch(logout())
        navigate('/login', { replace: true })
        return
      }

      await signInWithNewPasswordOnly(newPassword, email, userId)
    } catch (err) {
      const fallback = err?.message || 'Network error. Please try again.'
      setError(fallback)
      toast.error(fallback)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20 pb-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Set a new password</h1>
          </div>
          <p className="text-gray-600 text-sm mb-6">
            Use the <strong>temporary password</strong> from your Super Admin as &quot;Current password&quot;, then choose a strong new password. Your session is then created{' '}
            <strong>only</strong> by signing in with the <strong>new password</strong> — not the temporary one.
            {user?.email ? (
              <>
                {' '}
                Account: <span className="font-medium text-gray-800">{user.email}</span>.
              </>
            ) : null}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={show.current ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Temporary password from Super Admin"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => toggle('current')}
                >
                  {show.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={show.next ? 'text' : 'password'}
                  autoComplete="new-password"
                  minLength={PASSWORD_MIN_LENGTH}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder={`At least ${PASSWORD_MIN_LENGTH} characters`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => toggle('next')}
                >
                  {show.next ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm new password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={show.confirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => toggle('confirm')}
                >
                  {show.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Updating…' : 'Save password and continue'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            <button
              type="button"
              onClick={() => {
                dispatch(logout())
                navigate('/login', { replace: true })
              }}
              className="text-blue-600 hover:underline"
            >
              Sign out and use a different account
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default HospitalAdminChangePassword
