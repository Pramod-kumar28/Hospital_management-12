import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'

const PatientRecords = () => {
  const [loading, setLoading] = useState(true)
  const [patients, setPatients] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = async () => {
    setLoading(true)
    setTimeout(() => {
      setPatients([
        { 
          id: 'PAT-001', 
          name: 'Ravi Kumar', 
          age: 32, 
          gender: 'Male', 
          phone: '+91 98765 43210', 
          lastVisit: '2023-10-15',
          status: 'Active'
        },
        { 
          id: 'PAT-002', 
          name: 'Anita Sharma', 
          age: 28, 
          gender: 'Female', 
          phone: '+91 98765 43211', 
          lastVisit: '2023-10-10',
          status: 'Active'
        },
        { 
          id: 'PAT-003', 
          name: 'Suresh Patel', 
          age: 45, 
          gender: 'Male', 
          phone: '+91 98765 43212', 
          lastVisit: '2023-10-05',
          status: 'Active'
        },
        { 
          id: 'PAT-004', 
          name: 'Priya Singh', 
          age: 35, 
          gender: 'Female', 
          phone: '+91 98765 43213', 
          lastVisit: '2023-09-28',
          status: 'Inactive'
        }
      ])
      setLoading(false)
    }, 1000)
  }

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  )

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">📋 Patient Records</h2>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-64"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
            <i className="fas fa-download mr-2"></i> Export
          </button>
        </div>
      </div>

      <DataTable
        columns={[
          { key: 'id', title: 'Patient ID', sortable: true },
          { key: 'name', title: 'Name', sortable: true },
          { key: 'age', title: 'Age', sortable: true },
          { key: 'gender', title: 'Gender', sortable: true },
          { key: 'phone', title: 'Phone', sortable: true },
          { key: 'lastVisit', title: 'Last Visit', sortable: true },
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
          {
            key: 'actions',
            title: 'Actions',
            render: (_, row) => (
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-800" title="View">
                  <i className="fas fa-eye"></i>
                </button>
                <button className="text-green-600 hover:text-green-800" title="Edit">
                  <i className="fas fa-edit"></i>
                </button>
                <button className="text-purple-600 hover:text-purple-800" title="History">
                  <i className="fas fa-history"></i>
                </button>
              </div>
            )
          }
        ]}
        data={filteredPatients}
      />

      {/* Patient Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-blue-600">{patients.length}</div>
          <div className="text-sm text-gray-500">Total Patients</div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-green-600">{patients.filter(p => p.status === 'Active').length}</div>
          <div className="text-sm text-gray-500">Active Patients</div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-purple-600">{patients.filter(p => new Date(p.lastVisit) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}</div>
          <div className="text-sm text-gray-500">Visited Last 30 Days</div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-orange-600">{patients.filter(p => p.gender === 'Female').length}</div>
          <div className="text-sm text-gray-500">Female Patients</div>
        </div>
      </div>
    </div>
  )
}

export default PatientRecords