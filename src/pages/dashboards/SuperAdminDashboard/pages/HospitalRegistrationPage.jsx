import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { SUPER_ADMIN_HOSPITALS_CREATE } from '../../../../config/api'
import { apiFetch } from '../../../../services/apiClient'
import { PHONE_REGEX, isValidEmail } from '../../../../utils/validation'

const emptyForm = {
  name: '',
  registration_number: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  country: '',
  pincode: '',
}

const HospitalRegistrationPage = () => {
  const token = useSelector((state) => state.auth?.token)
  const [form, setForm] = useState(emptyForm)
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitLoading, setSubmitLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    const n = form.name.trim()
    const r = form.registration_number.trim()
    const em = form.email.trim()
    const ph = form.phone.trim()
    const a = form.address.trim()
    const c = form.city.trim()
    const s = form.state.trim()
    const co = form.country.trim()
    const p = form.pincode.trim()

    if (n.length < 2 || n.length > 255) e.name = 'Name must be 2–255 characters'
    if (r.length < 2 || r.length > 100) e.registration_number = 'Registration number must be 2–100 characters'
    if (!em) e.email = 'Email is required'
    else if (!isValidEmail(em)) e.email = 'Enter a valid email'
    if (!PHONE_REGEX.test(ph)) e.phone = 'Phone must match 10–20 digit/format pattern'
    if (a.length < 5) e.address = 'Address must be at least 5 characters'
    if (c.length < 2 || c.length > 100) e.city = 'City must be 2–100 characters'
    if (s.length < 2 || s.length > 100) e.state = 'State must be 2–100 characters'
    if (co.length < 2 || co.length > 100) e.country = 'Country must be 2–100 characters'
    if (p.length < 3 || p.length > 10) e.pincode = 'Pincode must be 3–10 characters'

    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setFieldErrors({})
    if (!token) {
      toast.error('You must be signed in as Super Admin.')
      return
    }
    const errors = validate()
    if (Object.keys(errors).length) {
      setFieldErrors(errors)
      toast.error('Please fix the highlighted fields.')
      return
    }

    setSubmitLoading(true)
    try {
      const res = await apiFetch(SUPER_ADMIN_HOSPITALS_CREATE, {
        method: 'POST',
        body: {
          name: form.name.trim(),
          registration_number: form.registration_number.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          state: form.state.trim(),
          country: form.country.trim(),
          pincode: form.pincode.trim(),
        },
      })
      const data = await res.json().catch(() => ({}))
      const msg = data.message || (res.ok ? 'Hospital registered' : 'Request failed')

      if (!res.ok) {
        const detail = data?.detail
        let errMsg = msg
        if (!errMsg && Array.isArray(detail) && detail[0]?.msg) errMsg = detail[0].msg
        toast.error(errMsg || `Failed (${res.status})`)
        return
      }

      toast.success(msg)
      setForm(emptyForm)
    } catch (err) {
      toast.error(err?.message || 'Network error')
    } finally {
      setSubmitLoading(false)
    }
  }

  const inputCls = (name) =>
    `w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none ${
      fieldErrors[name] ? 'border-red-400 bg-red-50/30' : 'border-gray-200 bg-gray-50 focus:bg-white'
    }`

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Register hospital</h1>
        <p className="text-gray-600 mt-2">
          Super Admin only — <code className="text-sm bg-gray-100 px-1 rounded">POST /api/v1/auth/super-admin/hospitals</code>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow border border-gray-100 p-6 md:p-8 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Hospital name *</label>
            <input name="name" value={form.name} onChange={handleChange} className={inputCls('name')} />
            {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Registration number *</label>
            <input
              name="registration_number"
              value={form.registration_number}
              onChange={handleChange}
              className={inputCls('registration_number')}
            />
            {fieldErrors.registration_number && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.registration_number}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className={inputCls('email')} />
            {fieldErrors.email && <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone *</label>
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} className={inputCls('phone')} placeholder="+91 9876543210" />
            {fieldErrors.phone && <p className="text-sm text-red-600 mt-1">{fieldErrors.phone}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Address *</label>
            <textarea name="address" value={form.address} onChange={handleChange} rows={2} className={inputCls('address')} />
            {fieldErrors.address && <p className="text-sm text-red-600 mt-1">{fieldErrors.address}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">City *</label>
            <input name="city" value={form.city} onChange={handleChange} className={inputCls('city')} />
            {fieldErrors.city && <p className="text-sm text-red-600 mt-1">{fieldErrors.city}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">State *</label>
            <input name="state" value={form.state} onChange={handleChange} className={inputCls('state')} />
            {fieldErrors.state && <p className="text-sm text-red-600 mt-1">{fieldErrors.state}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Country *</label>
            <input name="country" value={form.country} onChange={handleChange} className={inputCls('country')} />
            {fieldErrors.country && <p className="text-sm text-red-600 mt-1">{fieldErrors.country}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Pincode *</label>
            <input name="pincode" value={form.pincode} onChange={handleChange} className={inputCls('pincode')} />
            {fieldErrors.pincode && <p className="text-sm text-red-600 mt-1">{fieldErrors.pincode}</p>}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={submitLoading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:shadow-lg disabled:opacity-50"
          >
            {submitLoading ? 'Submitting…' : 'Register hospital'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default HospitalRegistrationPage
