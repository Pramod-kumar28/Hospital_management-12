import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'

const MedicationManagement = () => {
  const [loading, setLoading] = useState(true)
  const [medications, setMedications] = useState([])

  useEffect(() => {
    loadMedications()
  }, [])

  const loadMedications = async () => {
    setLoading(true)
    setTimeout(() => {
      setMedications([
        { id: 1, patient: 'Ravi Kumar', medicine: 'Paracetamol', dosage: '500mg', frequency: 'Every 6 hours', route: 'Oral', time: '10:00 AM', status: 'Pending' },
        { id: 2, patient: 'Suresh Patel', medicine: 'Insulin', dosage: '10 units', frequency: 'Twice daily', route: 'Injection', time: '09:30 AM', status: 'Administered' },
        { id: 3, patient: 'Anita Sharma', medicine: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily', route: 'Oral', time: '11:00 AM', status: 'Pending' },
        { id: 4, patient: 'Ravi Kumar', medicine: 'Ibuprofen', dosage: '400mg', frequency: 'Every 8 hours', route: 'Oral', time: '02:00 PM', status: 'Scheduled' }
      ])
      setLoading(false)
    }, 1000)
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Medication Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
          <i className="fas fa-plus mr-2"></i> Add Medication
        </button>
      </div>

      {/* Medication Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-blue-600">{medications.length}</div>
          <div className="text-sm text-gray-500">Total Medications</div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-yellow-600">{medications.filter(m => m.status === 'Pending').length}</div>
          <div className="text-sm text-gray-500">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-green-600">{medications.filter(m => m.status === 'Administered').length}</div>
          <div className="text-sm text-gray-500">Administered</div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-purple-600">{medications.filter(m => m.status === 'Scheduled').length}</div>
          <div className="text-sm text-gray-500">Scheduled</div>
        </div>
      </div>

      <DataTable
        columns={[
          { key: 'patient', title: 'Patient', sortable: true },
          { key: 'medicine', title: 'Medicine', sortable: true },
          { key: 'dosage', title: 'Dosage', sortable: true },
          { key: 'frequency', title: 'Frequency', sortable: true },
          { key: 'route', title: 'Route', sortable: true },
          { key: 'time', title: 'Time', sortable: true },
          { 
            key: 'status', 
            title: 'Status', 
            sortable: true,
            render: (value) => (
              <span className={`px-2 py-1 rounded-full text-xs ${
                value === 'Administered' ? 'status-completed' : 
                value === 'Pending' ? 'status-pending' : 'status-confirmed'
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
                {row.status === 'Pending' && (
                  <button className="text-green-600 hover:text-green-800" title="Administer">
                    <i className="fas fa-check"></i>
                  </button>
                )}
                <button className="text-blue-600 hover:text-blue-800" title="Edit">
                  <i className="fas fa-edit"></i>
                </button>
                <button className="text-red-600 hover:text-red-800" title="Cancel">
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )
          }
        ]}
        data={medications}
      />

      {/* Upcoming Medications */}
      <div className="bg-white p-4 border rounded card-shadow mt-6">
        <h3 className="text-lg font-semibold mb-3">Upcoming Medications (Next 2 Hours)</h3>
        <div className="space-y-3">
          {medications
            .filter(m => m.status === 'Pending' || m.status === 'Scheduled')
            .slice(0, 3)
            .map(med => (
              <div key={med.id} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-pills text-blue-600"></i>
                  </div>
                  <div>
                    <p className="font-medium">{med.patient}</p>
                    <p className="text-sm text-gray-500">{med.medicine} - {med.dosage}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{med.time}</p>
                  <p className="text-sm text-gray-500">{med.route}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default MedicationManagement