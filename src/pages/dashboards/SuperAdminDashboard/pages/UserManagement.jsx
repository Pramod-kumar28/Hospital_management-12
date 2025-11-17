import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'

const UserManagement = () => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [showUserForm, setShowUserForm] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    setTimeout(() => {
      setUsers([
        { 
          id: 'USR-001', 
          name: 'Dr. Meena Rao', 
          email: 'meena.rao@medicloud.com', 
          role: 'DOCTOR', 
          department: 'Cardiology',
          status: 'Active',
          lastLogin: '2024-01-15 09:30 AM',
          createdAt: '2023-03-15'
        },
        { 
          id: 'USR-002', 
          name: 'Admin User', 
          email: 'admin@medicloud.com', 
          role: 'ADMIN', 
          department: 'Administration',
          status: 'Active',
          lastLogin: '2024-01-15 08:45 AM',
          createdAt: '2023-01-10'
        },
        { 
          id: 'USR-003', 
          name: 'Nurse Kavya Patel', 
          email: 'kavya.patel@medicloud.com', 
          role: 'NURSE', 
          department: 'Emergency',
          status: 'Active',
          lastLogin: '2024-01-15 07:15 AM',
          createdAt: '2023-06-20'
        },
        { 
          id: 'USR-004', 
          name: 'Arjun Kumar', 
          email: 'arjun.kumar@medicloud.com', 
          role: 'RECEPTIONIST', 
          department: 'Front Desk',
          status: 'Inactive',
          lastLogin: '2024-01-10 05:20 PM',
          createdAt: '2023-08-05'
        }
      ])
      setLoading(false)
    }, 1000)
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setShowUserForm(true)
  }

  const handleAddUser = () => {
    setSelectedUser(null)
    setShowUserForm(true)
  }

  const handleSaveUser = (userData) => {
    // In real app, this would save to backend
    if (selectedUser) {
      console.log('Updating user:', userData)
      alert('User updated successfully!')
    } else {
      console.log('Creating user:', userData)
      alert('User created successfully!')
    }
    setShowUserForm(false)
    setSelectedUser(null)
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">User Management</h2>
        <button 
          onClick={handleAddUser}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
        >
          <i className="fas fa-plus mr-2"></i> Add User
        </button>
      </div>

      {/* User Form Modal */}
      {showUserForm && (
        <UserForm 
          user={selectedUser}
          onSave={handleSaveUser}
          onClose={() => {
            setShowUserForm(false)
            setSelectedUser(null)
          }}
        />
      )}

      <DataTable
        columns={[
          { key: 'id', title: 'User ID', sortable: true },
          { key: 'name', title: 'Name', sortable: true },
          { key: 'email', title: 'Email', sortable: true },
          { 
            key: 'role', 
            title: 'Role', 
            sortable: true,
            render: (value) => (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs capitalize">
                {value.toLowerCase()}
              </span>
            )
          },
          { key: 'department', title: 'Department', sortable: true },
          { 
            key: 'status', 
            title: 'Status', 
            sortable: true,
            render: (value) => (
              <span className={`px-2 py-1 rounded-full text-xs ${
                value === 'Active' ? 'status-confirmed' : 'status-pending'
              }`}>
                {value}
              </span>
            )
          },
          { key: 'lastLogin', title: 'Last Login', sortable: true },
          {
            key: 'actions',
            title: 'Actions',
            render: (_, row) => (
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEditUser(row)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  className="text-green-600 hover:text-green-800"
                  title="Reset Password"
                >
                  <i className="fas fa-key"></i>
                </button>
                <button 
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            )
          }
        ]}
        data={users}
      />

      {/* User Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-blue-600">{users.length}</div>
          <div className="text-sm text-gray-500">Total Users</div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'Active').length}</div>
          <div className="text-sm text-gray-500">Active Users</div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-purple-600">{users.filter(u => u.role === 'DOCTOR').length}</div>
          <div className="text-sm text-gray-500">Doctors</div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-orange-600">{users.filter(u => u.role === 'NURSE').length}</div>
          <div className="text-sm text-gray-500">Nurses</div>
        </div>
      </div>
    </div>
  )
}

// User Form Component
const UserForm = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'DOCTOR',
    department: user?.department || '',
    status: user?.status || 'Active'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {user ? 'Edit User' : 'Add New User'}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full border rounded p-2"
                required
              >
                <option value="DOCTOR">Doctor</option>
                <option value="NURSE">Nurse</option>
                <option value="ADMIN">Admin</option>
                <option value="RECEPTIONIST">Receptionist</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full border rounded p-2"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full border rounded p-2"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
          
          {!user && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password</label>
              <input
                type="password"
                placeholder="Generate temporary password"
                className="w-full border rounded p-2"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                User will be required to change password on first login
              </p>
            </div>
          )}
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {user ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserManagement