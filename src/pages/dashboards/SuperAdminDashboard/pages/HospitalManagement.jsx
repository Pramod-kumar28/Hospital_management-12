import React, { useState, useEffect } from 'react';
import Modal from '../../../../components/common/Modal/Modal';

const HospitalManagement = () => {
  const [hospitals, setHospitals] = useState([]);
  const [filters, setFilters] = useState({ status: '', plan: '', search: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentHospital, setCurrentHospital] = useState({
    id: '',
    name: '',
    address: '',
    email: '',
    contact: '',
    subscriptionPlan: 'Basic',
    status: 'Active'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    setLoading(true);
    setTimeout(async () => {
      // Indian hospital names
      const indianHospitalNames = [
        'Apollo Hospitals',
        'Fortis Healthcare',
        'Max Super Speciality Hospital',
        'Medanta - The Medicity',
        'AIIMS Delhi',
        'Kokilaben Dhirubhai Ambani Hospital',
        'Manipal Hospitals',
        'Narayana Health',
        'Artemis Hospital',
        'Columbia Asia Hospital'
      ];

      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();

      const hospitalsData = data.slice(0, 5).map((h, i) => ({
        id: `HSP-${1000 + i}`,
        name: indianHospitalNames[i % indianHospitalNames.length],
        address: `${h.address.street}, ${h.address.city}`,
        email: h.email,
        contact: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        subscriptionPlan: ['Basic', 'Professional', 'Enterprise'][i % 3],
        status: i % 5 === 0 ? 'Suspended' : 'Active',
        createdDate: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
        logo: `https://picsum.photos/seed/hospital${i}/80/80`,
        users: Math.floor(Math.random() * 50) + 10,
        revenue: `₹${(Math.random() * 50000 + 10000).toFixed(0)}`
      }));

      setHospitals(hospitalsData);
      setLoading(false);
    }, 800);
  };

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesStatus = !filters.status || hospital.status === filters.status;
    const matchesPlan = !filters.plan || hospital.subscriptionPlan === filters.plan;
    const matchesSearch = !filters.search ||
      hospital.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      hospital.email.toLowerCase().includes(filters.search.toLowerCase());
    return matchesStatus && matchesPlan && matchesSearch;
  });

  const openAddModal = () => {
    setModalMode('add');
    setCurrentHospital({
      id: '',
      name: '',
      address: '',
      email: '',
      contact: '',
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
    setCurrentHospital(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalMode === 'add') {
      const newHospital = {
        ...currentHospital,
        id: `HSP-${1000 + hospitals.length}`,
        logo: `https://picsum.photos/seed/hospital${hospitals.length}/80/80`,
        users: Math.floor(Math.random() * 50) + 10,
        revenue: `₹${(Math.random() * 50000 + 10000).toFixed(0)}`,
        createdDate: new Date().toISOString().split('T')[0]
      };

      setHospitals(prev => [newHospital, ...prev]);
    } else {
      setHospitals(prev => prev.map(h =>
        h.id === currentHospital.id ? { ...h, ...currentHospital } : h
      ));
    }

    closeModal();
  };

  const toggleStatus = (hospitalId) => {
    setHospitals(prev => prev.map(h => {
      if (h.id === hospitalId) {
        return { ...h, status: h.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return h;
    }));
  };

  const deleteHospital = (hospitalId) => {
    if (window.confirm('Are you sure you want to delete this hospital?')) {
      setHospitals(prev => prev.filter(h => h.id !== hospitalId));
    }
  };

  const stats = {
    total: hospitals.length,
    active: hospitals.filter(h => h.status === 'Active').length,
    professional: hospitals.filter(h => h.subscriptionPlan === 'Professional').length,
    revenue: hospitals.reduce((sum, h) => sum + parseInt(h.revenue.replace('₹', '').replace(',', '')), 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg">
            <i className="fas fa-hospital text-white text-xl"></i>
          </div>
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
            </select>

            <select
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={filters.plan}
              onChange={(e) => setFilters(prev => ({ ...prev, plan: e.target.value }))}
            >
              <option value="">All Plans</option>
              <option value="Basic">Basic</option>
              <option value="Professional" className="text-purple-600">Professional</option>
              <option value="Enterprise" className="text-blue-600">Enterprise</option>
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
                          onClick={() => toggleStatus(hospital.id)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Hospital Name *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-hospital text-gray-400 group-focus-within:text-blue-500"></i>
                </div>
                <input
                  type="text"
                  name="name"
                  value={currentHospital.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter hospital name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400 group-focus-within:text-blue-500"></i>
                </div>
                <input
                  type="email"
                  name="email"
                  value={currentHospital.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="hospital@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Phone *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-phone text-gray-400 group-focus-within:text-blue-500"></i>
                </div>
                <input
                  type="tel"
                  name="contact"
                  value={currentHospital.contact}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
            </div>

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

            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Address *
              </label>
              <div className="relative group">
                <div className="absolute top-3 left-3">
                  <i className="fas fa-map-marker-alt text-gray-400 group-focus-within:text-blue-500"></i>
                </div>
                <textarea
                  name="address"
                  value={currentHospital.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all"
                  placeholder="Enter full address"
                  required
                />
              </div>
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
              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 font-medium flex items-center gap-2"
            >
              <i className={modalMode === 'add' ? 'fas fa-plus-circle' : 'fas fa-save'}></i>
              {modalMode === 'add' ? 'Add Hospital' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default HospitalManagement;