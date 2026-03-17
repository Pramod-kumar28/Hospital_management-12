import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../../../components/common/Modal/Modal';
import { API_BASE_URL, SUPER_ADMIN_HOSPITALS, SUPER_ADMIN_HOSPITALS_CREATE } from '../../../../config/api';

// Map backend status (ACTIVE/SUSPENDED/INACTIVE) to display label
const statusToDisplay = (s) => (s === 'ACTIVE' ? 'Active' : s === 'SUSPENDED' ? 'Suspended' : s === 'INACTIVE' ? 'Inactive' : s || '');
const displayToStatus = (s) => (s === 'Active' ? 'ACTIVE' : s === 'Suspended' ? 'SUSPENDED' : s === 'Inactive' ? 'INACTIVE' : s);

// Map API hospital item to table row shape
const mapHospitalFromApi = (h, index = 0) => ({
  id: h?.id ?? h?.hospital_id ?? '',
  name: h?.name ?? '',
  email: h?.email ?? '',
  contact: h?.phone ?? h?.contact ?? '',
  address: h?.address ?? '',
  city: h?.city ?? '',
  state: h?.state ?? '',
  country: h?.country ?? '',
  pincode: h?.pincode ?? '',
  registration_number: h?.registration_number ?? '',
  status: statusToDisplay(h?.status),
  statusRaw: h?.status,
  subscriptionPlan: h?.subscription_plan ?? h?.subscriptionPlan ?? '—',
  logo: h?.logo_url ?? `https://picsum.photos/seed/hospital${index}/80/80`,
  users: h?.user_count ?? h?.users ?? 0,
  revenue: h?.revenue != null ? `₹${Number(h.revenue)}` : '₹0',
  createdDate: h?.created_at ? new Date(h.created_at).toISOString().split('T')[0] : ''
});

const HospitalManagement = () => {
  const token = useSelector((state) => state.auth?.token);
  const [hospitals, setHospitals] = useState([]);
  const [filters, setFilters] = useState({ status: '', plan: '', search: '', city: '', state: '' });
  const [pagination, setPagination] = useState({ page: 1, limit: 50, total: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [currentHospital, setCurrentHospital] = useState({
    id: '',
    name: '',
    registration_number: '',
    email: '',
    contact: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    subscriptionPlan: 'Basic',
    status: 'Active'
  });
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState('');

  const fetchHospitals = async (page = pagination.page, limit = pagination.limit) => {
    setLoading(true);
    setListError('');
    try {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', String(limit));
      if (filters.status) params.set('status', displayToStatus(filters.status) || filters.status);
      if (filters.plan) params.set('subscription', filters.plan);
      if (filters.city) params.set('city', filters.city);
      if (filters.state) params.set('state', filters.state);
      const url = `${API_BASE_URL}${SUPER_ADMIN_HOSPITALS}?${params.toString()}`;
      const res = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setListError(data?.message || data?.detail?.message || `Failed to load hospitals (${res.status})`);
        setHospitals([]);
        setLoading(false);
        return;
      }
      const raw = data?.data ?? data;
      const items = Array.isArray(raw?.items) ? raw.items : Array.isArray(raw) ? raw : raw?.hospitals ?? [];
      const total = raw?.total ?? items.length;
      setHospitals(items.map((h, i) => mapHospitalFromApi(h, i)));
      setPagination(prev => ({ ...prev, page, limit, total }));
    } catch (err) {
      setListError(err?.message || 'Network error');
      setHospitals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals(1, pagination.limit);
  }, [filters.status, filters.plan, filters.city, filters.state]);

  const onApplyFilters = () => {
    fetchHospitals(1, pagination.limit);
  };

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = !filters.search ||
      [hospital.name, hospital.email, hospital.contact].some(
        v => String(v || '').toLowerCase().includes(filters.search.toLowerCase())
      );
    return matchesSearch;
  });

  const openAddModal = () => {
    setModalMode('add');
    setSubmitError('');
    setFieldErrors({});
    setCurrentHospital({
      id: '',
      name: '',
      registration_number: '',
      email: '',
      contact: '',
      address: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
      subscriptionPlan: 'Basic',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (hospital) => {
    setModalMode('edit');
    setCurrentHospital({ ...hospital });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentHospital(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Backend schema: all required; name 2-255, registration_number 2-100, email, phone ^\+?[\d\s\-\(\)]{10,20}, address >=5, city/state/country 2-100, pincode 3-10
  const PHONE_REGEX = /^\+?[\d\s\-\(\)]{10,20}$/;
  const validateCreateForm = () => {
    const e = {};
    const n = (currentHospital.name || '').trim();
    const r = (currentHospital.registration_number || '').trim();
    const em = (currentHospital.email || '').trim();
    const ph = (currentHospital.contact || '').trim();
    const a = (currentHospital.address || '').trim();
    const c = (currentHospital.city || '').trim();
    const s = (currentHospital.state || '').trim();
    const co = (currentHospital.country || '').trim();
    const p = (currentHospital.pincode || '').trim();
    if (n.length < 2 || n.length > 255) e.name = 'Name must be 2–255 characters';
    if (r.length < 2 || r.length > 100) e.registration_number = 'Registration number must be 2–100 characters';
    if (!em) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) e.email = 'Enter a valid email';
    if (ph.length < 10 || ph.length > 20 || !PHONE_REGEX.test(ph)) e.contact = 'Phone: 10–20 characters, e.g. +91 9876543210';
    if (a.length < 5) e.address = 'Address must be at least 5 characters';
    if (c.length < 2 || c.length > 100) e.city = 'City must be 2–100 characters';
    if (s.length < 2 || s.length > 100) e.state = 'State must be 2–100 characters';
    if (co.length < 2 || co.length > 100) e.country = 'Country must be 2–100 characters';
    if (p.length < 3 || p.length > 10) e.pincode = 'Pincode must be 3–10 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setFieldErrors({});

    if (modalMode === 'add') {
      if (!token) {
        setSubmitError('You must be logged in to create a hospital.');
        return;
      }
      const errors = validateCreateForm();
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        setSubmitError('Please fix the errors below.');
        return;
      }
      setSubmitLoading(true);
      try {
        const url = `${API_BASE_URL}${SUPER_ADMIN_HOSPITALS_CREATE}`;
        const payload = {
          name: (currentHospital.name || '').trim(),
          registration_number: (currentHospital.registration_number || '').trim(),
          email: (currentHospital.email || '').trim(),
          phone: (currentHospital.contact || '').trim(),
          address: (currentHospital.address || '').trim(),
          city: (currentHospital.city || '').trim(),
          state: (currentHospital.state || '').trim(),
          country: (currentHospital.country || '').trim(),
          pincode: (currentHospital.pincode || '').trim()
        };
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (res.status === 422) {
            console.warn('[Create Hospital] 422 response:', JSON.stringify(data, null, 2));
          }
          const detail = data?.detail;
          let msg = data?.message || (typeof detail === 'string' ? detail : null);
          if (!msg && Array.isArray(detail) && detail.length > 0) {
            const first = detail[0];
            const loc = first.loc ? first.loc.join(' → ') : '';
            msg = first.msg ? (loc ? `${first.msg} (${loc})` : first.msg) : JSON.stringify(first);
          }
          setSubmitError(msg || `Request failed (${res.status})`);
          return;
        }
        const created = data?.data ?? data;
        const newHospital = {
          id: created?.id ?? `HSP-${1000 + hospitals.length}`,
          name: created?.name ?? currentHospital.name,
          address: created?.address ?? currentHospital.address,
          email: created?.email ?? currentHospital.email,
          contact: created?.phone ?? currentHospital.contact,
          subscriptionPlan: 'Basic',
          status: 'Active',
          logo: `https://picsum.photos/seed/hospital${hospitals.length}/80/80`,
          users: 0,
          revenue: '₹0',
          createdDate: new Date().toISOString().split('T')[0]
        };
        setHospitals(prev => [mapHospitalFromApi(created, prev.length), ...prev]);
        closeModal();
        fetchHospitals(pagination.page, pagination.limit);
      } catch (err) {
        setSubmitError(err?.message || 'Network error. Please try again.');
      } finally {
        setSubmitLoading(false);
      }
    } else {
      if (!token || !currentHospital.id) {
        setSubmitError('Cannot update: missing token or hospital id.');
        return;
      }
      setSubmitLoading(true);
      try {
        const url = `${API_BASE_URL}${SUPER_ADMIN_HOSPITALS}/${currentHospital.id}`;
        const payload = {
          name: (currentHospital.name || '').trim() || undefined,
          registration_number: (currentHospital.registration_number || '').trim() || undefined,
          email: (currentHospital.email || '').trim() || undefined,
          phone: (currentHospital.contact || '').trim() || undefined,
          address: (currentHospital.address || '').trim() || undefined,
          city: (currentHospital.city || '').trim() || undefined,
          state: (currentHospital.state || '').trim() || undefined,
          country: (currentHospital.country || '').trim() || undefined,
          pincode: (currentHospital.pincode || '').trim() || undefined
        };
        const body = Object.fromEntries(Object.entries(payload).filter(([, v]) => v != null && v !== ''));
        const res = await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(body)
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          const msg = data?.message || data?.detail?.message || (Array.isArray(data?.detail) && data.detail[0]?.msg) || `Update failed (${res.status})`;
          setSubmitError(msg);
          setSubmitLoading(false);
          return;
        }
        const updated = data?.data ?? data;
        setHospitals(prev => prev.map(h => h.id === currentHospital.id ? { ...h, ...mapHospitalFromApi(updated), ...currentHospital } : h));
        closeModal();
        fetchHospitals(pagination.page, pagination.limit);
      } catch (err) {
        setSubmitError(err?.message || 'Network error.');
      } finally {
        setSubmitLoading(false);
      }
    }
  };

  const toggleStatus = async (hospital) => {
    const nextStatus = hospital.status === 'Active' ? 'SUSPENDED' : 'ACTIVE';
    if (!token || !hospital.id) return;
    try {
      const url = `${API_BASE_URL}${SUPER_ADMIN_HOSPITALS}/${hospital.id}/status`;
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: nextStatus })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data?.message || data?.detail?.message || `Status update failed (${res.status})`);
        return;
      }
      setHospitals(prev => prev.map(h => h.id === hospital.id ? { ...h, status: statusToDisplay(nextStatus), statusRaw: nextStatus } : h));
      fetchHospitals(pagination.page, pagination.limit);
    } catch (err) {
      alert(err?.message || 'Network error');
    }
  };

  const deleteHospital = async (hospitalId) => {
    if (!window.confirm('Are you sure you want to delete this hospital? This will soft-delete (set inactive) and block all users.')) return;
    if (!token) return;
    try {
      const url = `${API_BASE_URL}${SUPER_ADMIN_HOSPITALS}/${hospitalId}?confirm=true`;
      const res = await fetch(url, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data?.message || data?.detail?.message || `Delete failed (${res.status})`);
        return;
      }
      setHospitals(prev => prev.filter(h => h.id !== hospitalId));
      fetchHospitals(pagination.page, pagination.limit);
    } catch (err) {
      alert(err?.message || 'Network error');
    }
  };

  const stats = {
    total: pagination.total || hospitals.length,
    active: hospitals.filter(h => h.status === 'Active' || h.statusRaw === 'ACTIVE').length,
    professional: hospitals.filter(h => h.subscriptionPlan === 'STANDARD' || h.subscriptionPlan === 'PREMIUM').length,
    revenue: hospitals.reduce((sum, h) => sum + parseInt(String(h.revenue || '0').replace(/₹|,/g, ''), 10), 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
            Hospital Management
          </h1>
        </div>
        <p className="text-gray-600">Manage your healthcare partners efficiently</p>
      </div>

      {/* Stats Cards - Original Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* TOTAL HOSPITALS */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          {/* light background shape */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent pointer-events-none" />

          {/* badge */}
          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            +{((stats.total / (stats.total || 1)) * 100).toFixed(0)}%
          </span>

          <div className="relative flex justify-between items-end">
            {/* left */}
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 mb-3">
                <i className="fas fa-hospital text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Total Hospitals</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-400 mt-1">Registered hospitals</p>
            </div>

            {/* mini bars */}
            <div className="flex items-end gap-1 h-14">
              <div className="w-1.5 h-4 bg-blue-300 rounded"></div>
              <div className="w-1.5 h-7 bg-blue-400 rounded"></div>
              <div className="w-1.5 h-10 bg-blue-500 rounded"></div>
              <div className="w-1.5 h-6 bg-blue-400 rounded"></div>
              <div className="w-1.5 h-12 bg-blue-600 rounded"></div>
            </div>
          </div>
        </div>

        {/* ACTIVE HOSPITALS */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent pointer-events-none" />

          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            +{((stats.active / (stats.total || 1)) * 100).toFixed(0)}%
          </span>

          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 mb-3">
                <i className="fas fa-check-circle text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Active Hospitals</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              <p className="text-xs text-gray-400 mt-1">Currently operational</p>
            </div>

            {/* mini line */}
            <svg width="70" height="40" viewBox="0 0 70 40">
              <polyline
                points="0,30 12,22 24,26 36,18 48,20 60,12"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* PROFESSIONAL PLAN */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent pointer-events-none" />

          <span className="absolute top-4 right-4 bg-purple-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            Premium
          </span>

          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 mb-3">
                <i className="fas fa-crown text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Professional Plan</p>
              <p className="text-2xl font-bold text-gray-900">{stats.professional}</p>
              <p className="text-xs text-gray-400 mt-1">High-value customers</p>
            </div>

            {/* mini bars */}
            <div className="flex items-end gap-1 h-14">
              <div className="w-1.5 h-10 bg-purple-400 rounded"></div>
              <div className="w-1.5 h-6 bg-purple-300 rounded"></div>
              <div className="w-1.5 h-12 bg-purple-500 rounded"></div>
              <div className="w-1.5 h-8 bg-purple-400 rounded"></div>
              <div className="w-1.5 h-9 bg-purple-300 rounded"></div>
            </div>
          </div>
        </div>

        {/* REVENUE */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent pointer-events-none" />

          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            +12.5%
          </span>

          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-500 mb-3">
                <i className="fas fa-rupee-sign text-white"></i>
              </div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{(stats.revenue / 1000).toFixed(1)}K</p>
              <p className="text-xs text-gray-400 mt-1">in last 7 Days</p>
            </div>

            {/* mini line */}
            <svg width="70" height="40" viewBox="0 0 70 40">
              <polyline
                points="0,28 12,26 24,20 36,22 48,16 60,10"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Search and Actions Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400 group-focus-within:text-blue-500 transition-colors"></i>
              </div>
              <input
                type="text"
                placeholder="Search hospitals by name or email..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="">All Status</option>
              <option value="Active" className="text-green-600">● Active</option>
              <option value="Suspended" className="text-amber-600">● Suspended</option>
              <option value="Inactive" className="text-gray-600">● Inactive</option>
            </select>

            <select
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={filters.plan}
              onChange={(e) => setFilters(prev => ({ ...prev, plan: e.target.value }))}
            >
              <option value="">All Plans</option>
              <option value="FREE">FREE</option>
              <option value="STANDARD" className="text-purple-600">STANDARD</option>
              <option value="PREMIUM" className="text-blue-600">PREMIUM</option>
            </select>

            <button
              onClick={openAddModal}
              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 font-medium flex items-center gap-2 add-hospital-btn"
            >
              <i className="fas fa-plus-circle"></i>
              Add Hospital
            </button>
          </div>
        </div>
      </div>

      {listError && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center justify-between gap-4">
          <span className="flex items-center gap-2"><i className="fas fa-exclamation-circle"></i>{listError}</span>
          <button type="button" onClick={() => fetchHospitals(1, pagination.limit)} className="px-3 py-1.5 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-medium">Retry</button>
        </div>
      )}

      {/* Hospitals Table - Simplified */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600">Loading hospitals...</p>
          </div>
        ) : filteredHospitals.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <i className="fas fa-hospital text-gray-400 text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No hospitals found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search filters</p>
            <button
              onClick={openAddModal}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all"
            >
              Add First Hospital
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Hospital</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Contact</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Plan</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredHospitals.map((hospital, index) => (
                  <tr
                    key={hospital.id}
                    className="border-b border-gray-100 hover:bg-blue-50/30 transition-all duration-300"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={hospital.logo}
                          alt={hospital.name}
                          className="w-10 h-10 rounded-lg"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{hospital.name}</p>
                          <p className="text-sm text-gray-500">{hospital.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900">{hospital.contact}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${hospital.subscriptionPlan === 'Basic'
                          ? 'bg-gray-100 text-gray-800'
                          : hospital.subscriptionPlan === 'Professional'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                        {hospital.subscriptionPlan}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${hospital.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {hospital.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(hospital)}
                          className="w-8 h-8 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors"
                          title="Edit"
                        >
                          <i className="fas fa-edit text-sm"></i>
                        </button>
                        <button
                          onClick={() => toggleStatus(hospital)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${hospital.status === 'Active'
                              ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                              : 'bg-green-100 text-green-600 hover:bg-green-200'
                            }`}
                          title={hospital.status === 'Active' ? 'Suspend' : 'Activate'}
                        >
                          <i className="fas fa-power-off text-sm"></i>
                        </button>
                        <button
                          onClick={() => deleteHospital(hospital.id)}
                          className="w-8 h-8 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg flex items-center justify-center transition-colors"
                          title="Delete"
                        >
                          <i className="fas fa-trash text-sm"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${modalMode === 'add'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                : 'bg-gradient-to-r from-purple-500 to-purple-600'
              }`}>
              <i className={`fas ${modalMode === 'add' ? 'fa-plus' : 'fa-edit'} text-white`}></i>
            </div>
            <span className="text-xl font-bold text-gray-900">
              {modalMode === 'add' ? 'Add New Hospital' : 'Edit Hospital'}
            </span>
          </div>
        }
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {submitError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <i className="fas fa-exclamation-circle flex-shrink-0"></i>
              {submitError}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Hospital Name *</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-hospital text-gray-400 group-focus-within:text-blue-500"></i>
                </div>
                <input
                  type="text"
                  name="name"
                  value={currentHospital.name}
                  onChange={handleInputChange}
                  minLength={2}
                  maxLength={255}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${fieldErrors.name ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="2–255 characters"
                />
              </div>
              {fieldErrors.name && <p className="text-sm text-red-600">{fieldErrors.name}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Registration Number *</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-id-card text-gray-400 group-focus-within:text-blue-500"></i>
                </div>
                <input
                  type="text"
                  name="registration_number"
                  value={currentHospital.registration_number}
                  onChange={handleInputChange}
                  minLength={2}
                  maxLength={100}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${fieldErrors.registration_number ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="2–100 characters"
                />
              </div>
              {fieldErrors.registration_number && <p className="text-sm text-red-600">{fieldErrors.registration_number}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Email *</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400 group-focus-within:text-blue-500"></i>
                </div>
                <input
                  type="email"
                  name="email"
                  value={currentHospital.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${fieldErrors.email ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="hospital@example.com"
                />
              </div>
              {fieldErrors.email && <p className="text-sm text-red-600">{fieldErrors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Phone *</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-phone text-gray-400 group-focus-within:text-blue-500"></i>
                </div>
                <input
                  type="tel"
                  name="contact"
                  value={currentHospital.contact}
                  onChange={handleInputChange}
                  minLength={10}
                  maxLength={20}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${fieldErrors.contact ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="+91 9876543210 (10–20 chars)"
                />
              </div>
              {fieldErrors.contact && <p className="text-sm text-red-600">{fieldErrors.contact}</p>}
            </div>

            {modalMode === 'edit' && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Subscription Plan *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-crown text-gray-400 group-focus-within:text-blue-500"></i>
                </div>
                <select
                  name="subscriptionPlan"
                  value={currentHospital.subscriptionPlan}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all"
                  required
                >
                  <option value="Basic">Basic Plan</option>
                  <option value="Professional">Professional Plan</option>
                  <option value="Enterprise">Enterprise Plan</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <i className="fas fa-chevron-down text-gray-400"></i>
                </div>
              </div>
            </div>
            )}

            {modalMode === 'edit' && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Status *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-circle text-gray-400 group-focus-within:text-blue-500"></i>
                </div>
                <select
                  name="status"
                  value={currentHospital.status}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all"
                  required
                >
                  <option value="Active" className="text-green-600">Active</option>
                  <option value="Suspended" className="text-amber-600">Suspended</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <i className="fas fa-chevron-down text-gray-400"></i>
                </div>
              </div>
            </div>
            )}

            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Address *</label>
              <div className="relative group">
                <div className="absolute top-3 left-3">
                  <i className="fas fa-map-marker-alt text-gray-400 group-focus-within:text-blue-500"></i>
                </div>
                <textarea
                  name="address"
                  value={currentHospital.address}
                  onChange={handleInputChange}
                  rows="2"
                  minLength={5}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all ${fieldErrors.address ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="At least 5 characters"
                />
              </div>
              {fieldErrors.address && <p className="text-sm text-red-600">{fieldErrors.address}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">City *</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-city text-gray-400 group-focus-within:text-blue-500"></i>
                </div>
                <input
                  type="text"
                  name="city"
                  value={currentHospital.city}
                  onChange={handleInputChange}
                  minLength={2}
                  maxLength={100}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${fieldErrors.city ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="2–100 characters"
                />
              </div>
              {fieldErrors.city && <p className="text-sm text-red-600">{fieldErrors.city}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">State *</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-map text-gray-400 group-focus-within:text-blue-500"></i>
                </div>
                <input
                  type="text"
                  name="state"
                  value={currentHospital.state}
                  onChange={handleInputChange}
                  minLength={2}
                  maxLength={100}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${fieldErrors.state ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="2–100 characters"
                />
              </div>
              {fieldErrors.state && <p className="text-sm text-red-600">{fieldErrors.state}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Country *</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-globe text-gray-400 group-focus-within:text-blue-500"></i>
                </div>
                <input
                  type="text"
                  name="country"
                  value={currentHospital.country}
                  onChange={handleInputChange}
                  minLength={2}
                  maxLength={100}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${fieldErrors.country ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="e.g. India (2–100 chars)"
                />
              </div>
              {fieldErrors.country && <p className="text-sm text-red-600">{fieldErrors.country}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Pincode *</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-mail-bulk text-gray-400 group-focus-within:text-blue-500"></i>
                </div>
                <input
                  type="text"
                  name="pincode"
                  value={currentHospital.pincode}
                  onChange={handleInputChange}
                  minLength={3}
                  maxLength={10}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${fieldErrors.pincode ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="3–10 characters"
                />
              </div>
              {fieldErrors.pincode && <p className="text-sm text-red-600">{fieldErrors.pincode}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={closeModal}
              className="px-5 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitLoading}
              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 font-medium flex items-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
            >
              {submitLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Creating...
                </>
              ) : (
                <>
                  <i className={modalMode === 'add' ? 'fas fa-plus-circle' : 'fas fa-save'}></i>
                  {modalMode === 'add' ? 'Create Hospital' : 'Save Changes'}
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default HospitalManagement;