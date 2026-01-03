import React, { useState, useEffect } from 'react'
import Modal from '../../../../components/common/Modal/Modal';

const UserAccounts = () => {
  const [users, setUsers] = useState([])
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    search: ''
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const [currentUser, setCurrentUser] = useState({
    id: '',
    name: '',
    email: '',
    role: 'Doctor',
    status: 'Active',
    phone: '',
    department: ''
  })

  const fetchUsers = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await res.json()

    const usersData = data.slice(0, 12).map((u, i) => ({
      id: `USR-${4000 + i}`,
      name: u.name,
      role: ['Admin', 'Doctor', 'Staff', 'Patient'][i % 4],
      email: u.email,
      phone: u.phone,
      department: ['Cardiology', 'Neurology', 'Pediatrics', 'Emergency'][i % 4],
      status: i % 8 === 0 ? 'Inactive' : 'Active',
      lastLogin: new Date(Date.now() - i * 3600000).toLocaleString(),
      avatar: `https://i.pravatar.cc/60?img=${i + 1}`,
      joinDate: new Date(2024, 0, i + 1).toLocaleDateString()
    }))

    setUsers(usersData)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const filteredUsers = users.filter(user => {
    const matchesRole = !filters.role || user.role === filters.role
    const matchesStatus = !filters.status || user.status === filters.status
    const matchesSearch = !filters.search ||
      user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.search.toLowerCase())
    return matchesRole && matchesStatus && matchesSearch
  })

  const openAddModal = () => {
    setModalMode('add')
    setCurrentUser({
      id: '',
      name: '',
      email: '',
      role: 'Doctor',
      status: 'Active',
      phone: '',
      department: ''
    })
    setIsModalOpen(true)
  }

  const openEditModal = (user) => {
    setModalMode('edit')
    setCurrentUser({ ...user })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (modalMode === 'add') {
      const user = {
        ...currentUser,
        id: `USR-${4000 + users.length}`,
        lastLogin: new Date().toLocaleString(),
        avatar: `https://i.pravatar.cc/60?img=${users.length + 20}`,
        joinDate: new Date().toLocaleDateString()
      }
      setUsers(prev => [user, ...prev])
    } else {
      setUsers(prev => prev.map(u =>
        u.id === currentUser.id ? { ...u, ...currentUser } : u
      ))
    }

    closeModal()
  }

  const toggleUserStatus = (userId) => {
    setUsers(prev => prev.map(u =>
      u.id === userId ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u
    ))
  }

  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(prev => prev.filter(u => u.id !== userId))
    }
  }

  const userStats = {
    total: users.length,
    admins: users.filter(u => u.role === 'Admin').length,
    doctors: users.filter(u => u.role === 'Doctor').length,
    staff: users.filter(u => u.role === 'Staff').length,
    patients: users.filter(u => u.role === 'Patient').length,
    active: users.filter(u => u.status === 'Active').length,
    inactive: users.filter(u => u.status === 'Inactive').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg">
              <i className="fas fa-users text-white text-lg"></i>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              User Accounts
            </h2>
          </div>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>

        {/* Add User Button */}
        <button
          className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 font-medium flex items-center justify-center gap-2"
          onClick={openAddModal}
        >
          <i className="fas fa-plus-circle"></i>
          <span>Add User</span>
        </button>
      </div>

      {/* User Statistics Cards - Modern Design */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Admins Card - Glass Morphism */}
        <div className="relative bg-gradient-to-br from-white to-blue-50 p-5 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Admins</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{userStats.admins}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <i className="fas fa-user-shield text-white text-lg"></i>
            </div>
          </div>
          <div className="relative mt-4 pt-3 border-t border-blue-100">
            <p className="text-xs text-blue-700 font-medium">Full system access</p>
          </div>
        </div>

        {/* Doctors Card - Glass Morphism */}
        <div className="relative bg-gradient-to-br from-white to-emerald-50 p-5 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-emerald-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Doctors</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{userStats.doctors}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <i className="fas fa-user-md text-white text-lg"></i>
            </div>
          </div>
          <div className="relative mt-4 pt-3 border-t border-emerald-100">
            <p className="text-xs text-emerald-700 font-medium">Medical professionals</p>
          </div>
        </div>

        {/* Staff Card - Glass Morphism */}
        <div className="relative bg-gradient-to-br from-white to-purple-50 p-5 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Staff</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{userStats.staff}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <i className="fas fa-user-nurse text-white text-lg"></i>
            </div>
          </div>
          <div className="relative mt-4 pt-3 border-t border-purple-100">
            <p className="text-xs text-purple-700 font-medium">Support team</p>
          </div>
        </div>

        {/* Patients Card - Glass Morphism */}
        <div className="relative bg-gradient-to-br from-white to-amber-50 p-5 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Patients</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{userStats.patients}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
              <i className="fas fa-user-injured text-white text-lg"></i>
            </div>
          </div>
          <div className="relative mt-4 pt-3 border-t border-amber-100">
            <p className="text-xs text-amber-700 font-medium">Registered patients</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
          <div className="flex-1 w-full">
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                placeholder="Search users by name or email..."
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <select
              className="px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              value={filters.role}
              onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
            >
              <option value="">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Doctor">Doctor</option>
              <option value="Staff">Staff</option>
              <option value="Patient">Patient</option>
            </select>

            <select
              className="px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Grid - Modern Card Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredUsers.map(user => (
          <div key={user.id} className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500 overflow-hidden">
            {/* Background pattern - removed top accent bar */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/0 group-hover:to-blue-50/30 transition-all duration-500"></div>

            <div className="p-5">
              {/* User Header with Avatar */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <img
                      src={user.avatar}
                      className="relative w-12 h-12 rounded-full border-3 border-white shadow-lg"
                      alt={user.name}
                    />
                    <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-400'
                      }`}></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors text-sm">{user.name}</h3>
                    <p className="text-xs text-gray-500 truncate max-w-[150px]">{user.email}</p>
                  </div>
                </div>

                {/* Role badge */}
                <div className={`px-2 py-1 rounded-full text-xs font-bold ${user.role === 'Admin' ? 'bg-blue-100 text-blue-700' :
                    user.role === 'Doctor' ? 'bg-emerald-100 text-emerald-700' :
                      user.role === 'Staff' ? 'bg-purple-100 text-purple-700' :
                        'bg-amber-100 text-amber-700'
                  }`}>
                  {user.role}
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-3 mb-4">
                {/* Status and Department */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'
                      }`}></div>
                    <span className="text-xs font-medium text-gray-700">{user.status}</span>
                  </div>
                  {user.department && (
                    <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">
                      {user.department}
                    </div>
                  )}
                </div>

                {/* Contact Info - Compact */}
                <div className="bg-gray-50 rounded-lg p-2 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center rounded-md bg-blue-100 text-blue-600">
                      <i className="fas fa-phone text-xs"></i>
                    </div>
                    <span className="text-xs font-medium text-gray-900 truncate">{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center rounded-md bg-green-100 text-green-600">
                      <i className="fas fa-calendar-alt text-xs"></i>
                    </div>
                    <div className="text-xs">
                      <span className="text-gray-500">Joined:</span>
                      <span className="font-medium text-gray-900 ml-1">{user.joinDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center rounded-md bg-amber-100 text-amber-600">
                      <i className="fas fa-clock text-xs"></i>
                    </div>
                    <div className="text-xs text-gray-600 truncate">
                      Last: <span className="font-medium">{user.lastLogin}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Icons - Replaced buttons with icons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  onClick={() => openEditModal(user)}
                  className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-200"
                  title="Edit user"
                >
                  <i className="fas fa-edit text-sm"></i>
                </button>
                <button
                  onClick={() => toggleUserStatus(user.id)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200 ${user.status === 'Active'
                      ? 'text-amber-600 hover:bg-amber-50 hover:text-amber-700'
                      : 'text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700'
                    }`}
                  title={user.status === 'Active' ? 'Deactivate user' : 'Activate user'}
                >
                  <i className="fas fa-power-off text-sm"></i>
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors duration-200"
                  title="Delete user"
                >
                  <i className="fas fa-trash text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-100 p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-4">
            <i className="fas fa-users text-blue-600 text-3xl"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No users found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {users.length === 0
              ? "Start building your team by adding the first user account."
              : "Try adjusting your search filters to find what you're looking for."
            }
          </p>
          <button
            onClick={openAddModal}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 font-medium flex items-center justify-center gap-2 mx-auto"
          >
            <i className="fas fa-user-plus"></i>
            <span>Add First User</span>
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${modalMode === 'add'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                : 'bg-gradient-to-r from-purple-500 to-purple-600'
              }`}>
              <i className={`fas ${modalMode === 'add' ? 'fa-user-plus' : 'fa-edit'} text-white`}></i>
            </div>
            <span className="text-xl font-bold text-gray-900">
              {modalMode === 'add' ? 'Add New User' : 'Edit User'}
            </span>
          </div>
        }
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Full Name *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user text-gray-400 group-focus-within:text-blue-500"></i>
                </div>
                <input
                  type="text"
                  name="name"
                  value={currentUser.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter full name"
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
                  value={currentUser.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="user@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Role *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user-tag text-gray-400 group-focus-within:text-blue-500"></i>
                </div>
                <select
                  name="role"
                  value={currentUser.role}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all"
                  required
                >
                  <option value="Admin">Admin</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Staff">Staff</option>
                  <option value="Patient">Patient</option>
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
                  value={currentUser.status}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <i className="fas fa-chevron-down text-gray-400"></i>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Phone Number
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-phone text-gray-400 group-focus-within:text-blue-500"></i>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={currentUser.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Department
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-building text-gray-400 group-focus-within:text-blue-500"></i>
                </div>
                <select
                  name="department"
                  value={currentUser.department}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all"
                >
                  <option value="">Select Department</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Surgery">Surgery</option>
                  <option value="Radiology">Radiology</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <i className="fas fa-chevron-down text-gray-400"></i>
                </div>
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
              <i className={modalMode === 'add' ? 'fas fa-user-plus' : 'fas fa-save'}></i>
              {modalMode === 'add' ? 'Add User' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default UserAccounts