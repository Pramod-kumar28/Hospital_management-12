import React, { useState, useEffect } from 'react'
import DataTable from '../../../../components/ui/Tables/DataTable'
import SearchBar from '../../../../components/common/SearchBar/SearchBar'
import Button from '../../../../components/common/Button/Button'
import Modal from '../../../../components/common/Modal/Modal'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const ResultAccess = () => {
  const [loading, setLoading] = useState(true)
  const [accessLogs, setAccessLogs] = useState([])
  const [patients, setPatients] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showAccessModal, setShowAccessModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [accessRequest, setAccessRequest] = useState({
    patientId: '',
    doctorEmail: '',
    accessType: 'view',
    expiryDate: '',
    accessCode: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setTimeout(() => {
      const patientData = [
        {
          id: 'PAT-001',
          name: 'Rajesh Kumar',
          email: 'rajesh@email.com',
          phone: '+91 9876543210',
          lastAccess: '2024-01-15 10:30',
          accessCount: 3,
          status: 'active'
        },
        {
          id: 'PAT-002',
          name: 'Priya Sharma',
          email: 'priya@email.com',
          phone: '+91 9876543211',
          lastAccess: '2024-01-15 09:15',
          accessCount: 5,
          status: 'active'
        },
        {
          id: 'PAT-003',
          name: 'Suresh Patel',
          email: 'suresh@email.com',
          phone: '+91 9876543212',
          lastAccess: '2024-01-14 16:45',
          accessCount: 2,
          status: 'active'
        },
        {
          id: 'PAT-004',
          name: 'Anita Mehta',
          email: 'anita@email.com',
          phone: '+91 9876543213',
          lastAccess: '2024-01-14 14:20',
          accessCount: 4,
          status: 'active'
        }
      ]

      const logData = [
        {
          id: 'LOG-001',
          patientName: 'Rajesh Kumar',
          accessedBy: 'patient@email.com',
          accessTime: '2024-01-15 10:30',
          action: 'View Report',
          ipAddress: '192.168.1.100',
          device: 'Mobile - Chrome'
        },
        {
          id: 'LOG-002',
          patientName: 'Priya Sharma',
          accessedBy: 'dr.sharma@hospital.com',
          accessTime: '2024-01-15 09:15',
          action: 'Download Report',
          ipAddress: '203.0.113.50',
          device: 'Desktop - Firefox'
        },
        {
          id: 'LOG-003',
          patientName: 'Suresh Patel',
          accessedBy: 'patient@email.com',
          accessTime: '2024-01-14 16:45',
          action: 'View Report',
          ipAddress: '192.168.1.150',
          device: 'Tablet - Safari'
        }
      ]

      setPatients(patientData)
      setAccessLogs(logData)
      setLoading(false)
    }, 1000)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleGrantAccess = (patient) => {
    setSelectedPatient(patient)
    setAccessRequest({
      ...accessRequest,
      patientId: patient.id,
      accessCode: `ACCESS${Math.floor(Math.random() * 10000)}`
    })
    setShowAccessModal(true)
  }

  const handleShareReport = (patient) => {
    setSelectedPatient(patient)
    setShowShareModal(true)
  }

  const handleRevokeAccess = (patientId) => {
    // In real app, this would call API to revoke access
    alert(`Access revoked for patient: ${patientId}`)
    // Update patient status or remove from list
  }

  const handleGrantAccessSubmit = () => {
    // In real app, this would call API to grant access
    alert(`Access granted to ${accessRequest.doctorEmail}\nAccess Code: ${accessRequest.accessCode}`)
    
    // Log the access grant
    const newLog = {
      id: `LOG-${Date.now()}`,
      patientName: selectedPatient.name,
      accessedBy: accessRequest.doctorEmail,
      accessTime: new Date().toISOString(),
      action: 'Access Granted',
      ipAddress: 'System',
      device: 'Admin Panel'
    }
    
    setAccessLogs([newLog, ...accessLogs])
    setShowAccessModal(false)
    setAccessRequest({
      patientId: '',
      doctorEmail: '',
      accessType: 'view',
      expiryDate: '',
      accessCode: ''
    })
  }

  const handleShareSubmit = () => {
    alert(`Report shared successfully\nPatient: ${selectedPatient.name}`)
    setShowShareModal(false)
  }

  const generateAccessLink = (patientId, accessCode) => {
    return `https://lab.example.com/results/${patientId}?code=${accessCode}`
  }

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link)
    alert('Link copied to clipboard!')
  }

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <LoadingSpinner />

  return (
    <>
        <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Secure Result Access</h2>
          <p className="text-gray-500">Manage secure online result access for patients and referring physicians</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="primary"
            icon="fas fa-shield-alt"
            onClick={() => setShowAccessModal(true)}
          >
            Grant Access
          </Button>
        </div>
      </div>

{/* User Statistics Cards - Glass Morphism Design */}
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Active Access Card */}
  <div className="relative bg-gradient-to-br from-white to-blue-50 p-5 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
    <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>

    <div className="relative flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Active Access</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{patients.length}</p>
      </div>
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
        <i className="fas fa-user-shield text-white text-lg"></i>
      </div>
    </div>
    <div className="relative mt-4 pt-3 border-t border-blue-100">
      <p className="text-xs text-blue-700 font-medium">Current active patients</p>
    </div>
  </div>

  {/* Doctor Access Card */}
  <div className="relative bg-gradient-to-br from-white to-emerald-50 p-5 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
    <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
    <div className="absolute bottom-0 left-0 w-16 h-16 bg-emerald-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>

    <div className="relative flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Doctor Access</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
      </div>
      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
        <i className="fas fa-user-md text-white text-lg"></i>
      </div>
    </div>
    <div className="relative mt-4 pt-3 border-t border-emerald-100">
      <p className="text-xs text-emerald-700 font-medium">Authorized doctors</p>
    </div>
  </div>

  {/* Today's Accesses Card */}
  <div className="relative bg-gradient-to-br from-white to-yellow-50 p-5 rounded-2xl border border-yellow-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
    <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
    <div className="absolute bottom-0 left-0 w-16 h-16 bg-yellow-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>

    <div className="relative flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-yellow-600 uppercase tracking-wider">Today's Accesses</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{accessLogs.filter(log => log.accessTime.includes('2024-01-15')).length}</p>
      </div>
      <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-md">
        <i className="fas fa-history text-white text-lg"></i>
      </div>
    </div>
    <div className="relative mt-4 pt-3 border-t border-yellow-100">
      <p className="text-xs text-yellow-700 font-medium">Access logs today</p>
    </div>
  </div>

  {/* Mobile Accesses Card */}
  <div className="relative bg-gradient-to-br from-white to-purple-50 p-5 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
    <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
    <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>

    <div className="relative flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Mobile Accesses</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
      </div>
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
        <i className="fas fa-mobile-alt text-white text-lg"></i>
      </div>
    </div>
    <div className="relative mt-4 pt-3 border-t border-purple-100">
      <p className="text-xs text-purple-700 font-medium">Via mobile app</p>
    </div>
  </div>
</div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded border card-shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search patients by name, ID, or email..."
              onSearch={handleSearch}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border rounded-lg">
              <option value="">All Access Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="revoked">Revoked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patients with Access */}
      <div className="bg-white rounded border card-shadow overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Patients with Result Access</h3>
        </div>
        <DataTable
          columns={[
            { key: 'id', title: 'Patient ID', sortable: true },
            { key: 'name', title: 'Patient Name', sortable: true },
            { key: 'email', title: 'Email', sortable: true },
            { key: 'phone', title: 'Phone', sortable: true },
            { key: 'lastAccess', title: 'Last Access', sortable: true },
            { key: 'accessCount', title: 'Access Count', sortable: true },
            { 
              key: 'status', 
              title: 'Status', 
              sortable: true,
              render: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              )
            },
            {
              key: 'actions',
              title: 'Actions',
              render: (_, row) => (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleGrantAccess(row)
                    }}
                    className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                    title="Grant Access"
                  >
                    <i className="fas fa-key"></i>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleShareReport(row)
                    }}
                    className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200"
                    title="Share Report"
                  >
                    <i className="fas fa-share"></i>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRevokeAccess(row.id)
                    }}
                    className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200"
                    title="Revoke Access"
                  >
                    <i className="fas fa-ban"></i>
                  </button>
                </div>
              )
            }
          ]}
          data={filteredPatients}
          onRowClick={(patient) => setSelectedPatient(patient)}
          emptyMessage="No patients with access found."
        />
      </div>

      {/* Access Logs */}
      <div className="bg-white rounded border card-shadow overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Access Logs</h3>
          <p className="text-sm text-gray-500">Recent result access activities</p>
        </div>
        <DataTable
          columns={[
            { key: 'patientName', title: 'Patient', sortable: true },
            { key: 'accessedBy', title: 'Accessed By', sortable: true },
            { key: 'accessTime', title: 'Access Time', sortable: true },
            { key: 'action', title: 'Action', sortable: true },
            { key: 'ipAddress', title: 'IP Address', sortable: true },
            { key: 'device', title: 'Device/Browser', sortable: true }
          ]}
          data={accessLogs}
          emptyMessage="No access logs available."
        />
      </div>

      {/* Security Features */}
      <div className="bg-white p-6 rounded border card-shadow">
        <h3 className="text-lg font-semibold mb-4">Security Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <i className="fas fa-shield-alt text-blue-600"></i>
              </div>
              <h4 className="font-semibold">Encrypted Links</h4>
            </div>
            <p className="text-sm text-gray-600">All shared links are encrypted and time-limited</p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <i className="fas fa-eye-slash text-green-600"></i>
              </div>
              <h4 className="font-semibold">Access Control</h4>
            </div>
            <p className="text-sm text-gray-600">Granular permissions for viewing, downloading, or sharing</p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <i className="fas fa-history text-purple-600"></i>
              </div>
              <h4 className="font-semibold">Audit Trail</h4>
            </div>
            <p className="text-sm text-gray-600">Complete logs of all access and sharing activities</p>
          </div>
        </div>
      </div>
    </div>

                {/* Access Grant Modal */}
      <Modal
        isOpen={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        title="Grant Access to Results"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 p-3 rounded">
            <p className="text-sm text-blue-800">
              <i className="fas fa-info-circle mr-2"></i>
              Grant secure access to patients or referring physicians
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient
            </label>
            <select
              className="w-full px-3 py-2 border rounded-lg"
              value={accessRequest.patientId}
              onChange={(e) => setAccessRequest({...accessRequest, patientId: e.target.value})}
              required
            >
              <option value="">Select patient</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>{patient.name} ({patient.id})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email to Grant Access
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="doctor@hospital.com or patient@email.com"
              value={accessRequest.doctorEmail}
              onChange={(e) => setAccessRequest({...accessRequest, doctorEmail: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Access Type
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={accessRequest.accessType}
                onChange={(e) => setAccessRequest({...accessRequest, accessType: e.target.value})}
              >
                <option value="view">View Only</option>
                <option value="download">View & Download</option>
                <option value="full">Full Access</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-lg"
                value={accessRequest.expiryDate}
                onChange={(e) => setAccessRequest({...accessRequest, expiryDate: e.target.value})}
              />
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-600">
              <strong>Access Code:</strong> {accessRequest.accessCode}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Share this code with the recipient for secure access
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowAccessModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleGrantAccessSubmit}
              disabled={!accessRequest.patientId || !accessRequest.doctorEmail}
            >
              Grant Access
            </Button>
          </div>
        </div>
      </Modal>

      {/* Share Report Modal */}
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Share Report"
      >
        {selectedPatient && (
          <div className="space-y-4">
            <div className="bg-green-50 p-3 rounded">
              <p className="text-sm text-green-800">
                <i className="fas fa-share-alt mr-2"></i>
                Share report for: {selectedPatient.name}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Share Via
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 border rounded-lg text-center hover:bg-blue-50">
                  <i className="fas fa-envelope text-blue-600 text-xl mb-2"></i>
                  <p className="text-sm font-medium">Email</p>
                </button>
                <button className="p-3 border rounded-lg text-center hover:bg-green-50">
                  <i className="fab fa-whatsapp text-green-600 text-xl mb-2"></i>
                  <p className="text-sm font-medium">WhatsApp</p>
                </button>
                <button className="p-3 border rounded-lg text-center hover:bg-purple-50">
                  <i className="fas fa-sms text-purple-600 text-xl mb-2"></i>
                  <p className="text-sm font-medium">SMS</p>
                </button>
                <button className="p-3 border rounded-lg text-center hover:bg-gray-50">
                  <i className="fas fa-link text-gray-600 text-xl mb-2"></i>
                  <p className="text-sm font-medium">Link</p>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Share Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border rounded-lg"
                  value={generateAccessLink(selectedPatient.id, `ACCESS${Math.floor(Math.random() * 10000)}`)}
                  readOnly
                />
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => handleCopyLink(generateAccessLink(selectedPatient.id, 'ACCESS123'))}
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setShowShareModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleShareSubmit}
              >
                Share Now
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

export default ResultAccess