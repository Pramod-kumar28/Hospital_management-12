import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'

const InpatientVisits = () => {
  const [loading, setLoading] = useState(true)
  const [inpatients, setInpatients] = useState([])

  useEffect(() => {
    loadInpatients()
  }, [])

  const loadInpatients = async () => {
    setLoading(true)
    setTimeout(() => {
      setInpatients([
        { id: 1, name: "Ravi Kumar", ward: "General", bed: "101", admissionDate: "2023-10-12", condition: "Pneumonia", status: "Stable" },
        { id: 2, name: "Suresh Patel", ward: "ICU", bed: "205", admissionDate: "2023-10-10", condition: "Cardiac Monitoring", status: "Critical" }
      ])
      setLoading(false)
    }, 1000)
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Inpatient Visits</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {inpatients.map(patient => (
          <div key={patient.id} className="bg-white p-4 border rounded card-shadow fade-in">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-blue-700 text-lg">{patient.name}</h3>
                <p className="text-sm text-gray-600">{patient.ward} - Bed {patient.bed}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                patient.status === 'Stable' ? 'status-confirmed' : 'status-urgent'
              }`}>
                {patient.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Admission Date</p>
                <p className="font-medium">{patient.admissionDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Condition</p>
                <p className="font-medium">{patient.condition}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Treatment Plan</p>
              <p className="text-sm">
                {patient.condition === 'Pneumonia' 
                  ? 'Antibiotics, Oxygen therapy, Regular monitoring' 
                  : 'Cardiac monitoring, Medication, Restricted activity'}
              </p>
            </div>
            
            <div className="flex gap-2">
              <button className="bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-600 flex items-center">
                <i className="fas fa-notes-medical mr-1"></i> Update Notes
              </button>
              <button className="bg-green-500 text-white px-3 py-1 text-xs rounded hover:bg-green-600 flex items-center">
                <i className="fas fa-chart-line mr-1"></i> Vitals
              </button>
              <button className="bg-purple-500 text-white px-3 py-1 text-xs rounded hover:bg-purple-600 flex items-center">
                <i className="fas fa-pills mr-1"></i> Medications
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ward Rounds Schedule */}
      <div className="bg-white p-4 border rounded card-shadow">
        <h3 className="text-lg font-semibold mb-3">Ward Rounds Schedule</h3>
        <DataTable
          columns={[
            { key: 'time', title: 'Time', sortable: true },
            { key: 'ward', title: 'Ward', sortable: true },
            { key: 'patients', title: 'Patients', sortable: true },
            { 
              key: 'status', 
              title: 'Status', 
              sortable: true,
              render: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  value === 'Completed' ? 'status-completed' : 'status-pending'
                }`}>
                  {value}
                </span>
              )
            }
          ]}
          data={[
            { time: '9:00 AM', ward: 'General Ward', patients: '5 patients', status: 'Completed' },
            { time: '11:00 AM', ward: 'ICU', patients: '2 patients', status: 'Pending' },
            { time: '2:00 PM', ward: 'Pediatrics', patients: '3 patients', status: 'Pending' }
          ]}
        />
      </div>
    </div>
  )
}

export default InpatientVisits