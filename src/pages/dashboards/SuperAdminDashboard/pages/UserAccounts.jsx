import React, { useState, useEffect } from 'react'
import Modal from '../../../../components/common/Modal/Modal';

const UserAccounts = () => {
  const [users, setUsers] = useState([])
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    search: ''
  })
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [newUser, setNewUser] = useState({
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
      avatar: `https://i.pravatar.cc/60?img=${i + 1}`
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

  // Open Add User Modal
  const showAddUserModal = () => {
    setIsAddUserModalOpen(true)
  }

  // Close Add User Modal
  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false)
    setNewUser({
      name: '',
      email: '',
      role: 'Doctor',
      status: 'Active',
      phone: '',
      department: ''
    })
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleAddUser = (e) => {
    e.preventDefault()
    
    // Validate form
    if (!newUser.name || !newUser.email) {
      alert('Please fill in all required fields')
      return
    }

    // Generate new user data
    const user = {
      id: `USR-${4000 + users.length}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      phone: newUser.phone,
      department: newUser.department,
      lastLogin: new Date().toLocaleString(),
      avatar: `https://i.pravatar.cc/60?img=${users.length + 20}`
    }

    // Add to users array
    setUsers(prev => [user, ...prev])
    
    // Show success message
    alert(`✅ User "${user.name}" added successfully!`)
    
    // Close modal and reset form
    closeAddUserModal()
  }

  // Edit user function
  const editUser = (userId) => {
    const user = users.find(u => u.id === userId)
    alert(`✏️ Editing user: ${user.name}`)
  }

  // Toggle user status
  const toggleUserStatus = (userId) => {
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u
    )
    setUsers(updatedUsers)
    const user = users.find(u => u.id === userId)
    alert(`🔄 ${user.name} status changed to: ${user.status === 'Active' ? 'Inactive' : 'Active'}`)
  }

  // Delete user function
  const deleteUser = (userId) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      const updatedUsers = users.filter(u => u.id !== userId)
      setUsers(updatedUsers)
      alert('🗑️ User deleted successfully')
    }
  }

  // User statistics
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
      {/* Header - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex flex-col">
          {/* <h1 className="text-2xl font-bold text-gray-900">Admin</h1> */}
          <div className="flex items-center gap-2 mt-1">
            <h2 className="text-2xl font-semibold text-gray-700">
              <i className="fas fa-users text-blue-500 mr-2"></i>User Accounts
            </h2>
          </div>
        </div>
        
        {/* Add User Button - Mobile Optimized */}
        <button 
          className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
          onClick={showAddUserModal}
        >
          <i className="fas fa-plus"></i>
          <span>Add User</span>
        </button>
      </div>

      {/* User Statistics - Mobile Optimized */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-3 sm:p-4 rounded-lg card-shadow border text-center">
          <div className="text-xl sm:text-2xl font-bold text-blue-600">{userStats.admins}</div>
          <div className="text-xs sm:text-sm text-gray-500">Admins</div>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-lg card-shadow border text-center">
          <div className="text-xl sm:text-2xl font-bold text-green-600">{userStats.doctors}</div>
          <div className="text-xs sm:text-sm text-gray-500">Doctors</div>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-lg card-shadow border text-center">
          <div className="text-xl sm:text-2xl font-bold text-purple-600">{userStats.staff}</div>
          <div className="text-xs sm:text-sm text-gray-500">Staff</div>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-lg card-shadow border text-center">
          <div className="text-xl sm:text-2xl font-bold text-orange-600">{userStats.patients}</div>
          <div className="text-xs sm:text-sm text-gray-500">Patients</div>
        </div>
      </div>

      {/* Filters - Mobile Optimized */}
      <div className="bg-white p-3 sm:p-4 rounded-lg card-shadow border">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <select 
            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
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
            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <input 
            type="text" 
            placeholder="Search users..." 
            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm flex-1" 
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          />
        </div>
      </div>

      {/* Users Grid - Mobile Optimized */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredUsers.map(user => (
          <div key={user.id} className="bg-white rounded-xl card-shadow border p-4 sm:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={user.avatar} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" alt={user.name} />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">{user.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
              <span className={`status-${user.status.toLowerCase()} px-2 py-1 rounded text-xs whitespace-nowrap`}>
                {user.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex justify-between">
                <span className="text-xs sm:text-sm">Role:</span>
                <span className="font-medium text-gray-900 text-xs sm:text-sm">{user.role}</span>
              </div>
              {user.department && (
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm">Department:</span>
                  <span className="text-gray-500 text-xs sm:text-sm">{user.department}</span>
                </div>
              )}
              {user.phone && (
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm">Phone:</span>
                  <span className="text-gray-500 text-xs sm:text-sm">{user.phone}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-xs sm:text-sm">Last Login:</span>
                <span className="text-gray-500 text-xs sm:text-sm">{user.lastLogin}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {user.role}
              </span>
              <div className="flex gap-2">
                <button 
                  className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                  onClick={() => editUser(user.id)}
                  title="Edit User"
                >
                  <i className="fas fa-edit text-sm"></i>
                </button>
                <button 
                  className="text-green-600 hover:text-green-800 transition-colors p-1"
                  onClick={() => toggleUserStatus(user.id)}
                  title={`Mark as ${user.status === 'Active' ? 'Inactive' : 'Active'}`}
                >
                  <i className="fas fa-power-off text-sm"></i>
                </button>
                <button 
                  className="text-red-600 hover:text-red-800 transition-colors p-1"
                  onClick={() => deleteUser(user.id)}
                  title="Delete User"
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
        <div className="bg-white rounded-xl card-shadow border p-6 sm:p-8 text-center">
          <i className="fas fa-users text-3xl sm:text-4xl text-gray-300 mb-3"></i>
          <h3 className="text-lg font-medium text-gray-700 mb-1">No users found</h3>
          <p className="text-gray-500 text-sm">
            {users.length === 0 
              ? "No users available yet. Add your first user to get started." 
              : "Try adjusting your filters to see more results."
            }
          </p>
        </div>
      )}

      {/* Add User Modal */}
      <Modal
        isOpen={isAddUserModalOpen}
        onClose={closeAddUserModal}
        title="Add New User"
        size="md"
      >
        <form onSubmit={handleAddUser} className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role *
                </label>
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Admin">Admin</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Staff">Staff</option>
                  <option value="Patient">Patient</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  name="status"
                  value={newUser.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={newUser.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                name="department"
                value={newUser.department}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Department</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Emergency">Emergency</option>
                <option value="Surgery">Surgery</option>
                <option value="Radiology">Radiology</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={closeAddUserModal}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <i className="fas fa-user-plus mr-2"></i>
              Add User
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default UserAccounts