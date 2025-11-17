import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'

const WardManagement = () => {
  const [loading, setLoading] = useState(true)
  const [wards, setWards] = useState([])

  useEffect(() => {
    loadWards()
  }, [])

  const loadWards = async () => {
    setLoading(true)
    setTimeout(() => {
      setWards([
        { id: 1, name: 'General Ward', totalBeds: 20, occupied: 15, available: 5, nurse: 'Kavya Patel' },
        { id: 2, name: 'ICU', totalBeds: 10, occupied: 8, available: 2, nurse: 'Priya Sharma' },
        { id: 3, name: 'Pediatrics', totalBeds: 15, occupied: 10, available: 5, nurse: 'Anjali Desai' },
        { id: 4, name: 'Maternity', totalBeds: 12, occupied: 8, available: 4, nurse: 'Sneha Reddy' }
      ])
      setLoading(false)
    }, 1000)
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Ward Management</h2>

      {/* Ward Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {wards.map(ward => (
          <div key={ward.id} className="bg-white p-4 rounded-lg card-shadow border text-center">
            <div className="text-2xl font-bold text-blue-600">{ward.occupied}/{ward.totalBeds}</div>
            <div className="text-sm text-gray-500">{ward.name}</div>
            <div className={`text-xs mt-1 ${
              ward.available > 3 ? 'text-green-600' : 
              ward.available > 0 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {ward.available} beds available
            </div>
          </div>
        ))}
      </div>

      {/* Wards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wards.map(ward => (
          <div key={ward.id} className="bg-white rounded-xl card-shadow border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-blue-700 text-lg">{ward.name}</h3>
                <p className="text-sm text-gray-600">In-charge: {ward.nurse}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                ward.available > 3 ? 'status-confirmed' : 
                ward.available > 0 ? 'status-pending' : 'status-urgent'
              }`}>
                {ward.available > 3 ? 'Good' : ward.available > 0 ? 'Limited' : 'Full'}
              </span>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Bed Occupancy</span>
                <span>{Math.round((ward.occupied / ward.totalBeds) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    (ward.occupied / ward.totalBeds) > 0.8 ? 'bg-red-600' :
                    (ward.occupied / ward.totalBeds) > 0.6 ? 'bg-yellow-600' : 'bg-green-600'
                  }`}
                  style={{ width: `${(ward.occupied / ward.totalBeds) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center mb-4">
              <div>
                <div className="text-2xl font-bold text-blue-600">{ward.totalBeds}</div>
                <div className="text-xs text-gray-500">Total Beds</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{ward.available}</div>
                <div className="text-xs text-gray-500">Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{ward.occupied}</div>
                <div className="text-xs text-gray-500">Occupied</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-blue-500 text-white px-3 py-2 text-sm rounded hover:bg-blue-600">
                View Patients
              </button>
              <button className="flex-1 bg-green-500 text-white px-3 py-2 text-sm rounded hover:bg-green-600">
                Assign Bed
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bed Assignment Requests */}
      <div className="bg-white p-4 border rounded card-shadow mt-6">
        <h3 className="text-lg font-semibold mb-3">Recent Bed Assignments</h3>
        <DataTable
          columns={[
            { key: 'patient', title: 'Patient', sortable: true },
            { key: 'ward', title: 'Ward', sortable: true },
            { key: 'bed', title: 'Bed', sortable: true },
            { key: 'assignedBy', title: 'Assigned By', sortable: true },
            { key: 'date', title: 'Date', sortable: true },
            { 
              key: 'status', 
              title: 'Status', 
              sortable: true,
              render: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  value === 'Active' ? 'status-confirmed' : 'status-completed'
                }`}>
                  {value}
                </span>
              )
            }
          ]}
          data={[
            { patient: 'Ravi Kumar', ward: 'General Ward', bed: 'B-1', assignedBy: 'Dr. Meena Rao', date: '2023-10-12', status: 'Active' },
            { patient: 'Suresh Patel', ward: 'ICU', bed: 'B-1', assignedBy: 'Dr. Sharma', date: '2023-10-10', status: 'Active' },
            { patient: 'Anita Sharma', ward: 'General Ward', bed: 'B-2', assignedBy: 'Dr. Desai', date: '2023-10-08', status: 'Discharged' }
          ]}
        />
      </div>
    </div>
  )
}

export default WardManagement