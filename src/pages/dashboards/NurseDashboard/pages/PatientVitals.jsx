import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'

const PatientVitals = () => {
  const [loading, setLoading] = useState(true)
  const [patients, setPatients] = useState([])

  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = async () => {
    setLoading(true)
    setTimeout(() => {
      setPatients([
        { 
          id: 1, 
          name: 'Ravi Kumar', 
          room: 'R-101', 
          bed: 'B-1',
          temperature: '98.6°F', 
          bp: '120/80', 
          pulse: '72 bpm', 
          spo2: '98%',
          lastChecked: '2 hours ago',
          condition: 'Stable'
        },
        { 
          id: 2, 
          name: 'Suresh Patel', 
          room: 'R-205', 
          bed: 'B-1',
          temperature: '101.2°F', 
          bp: '140/90', 
          pulse: '95 bpm', 
          spo2: '92%',
          lastChecked: '30 mins ago',
          condition: 'Critical'
        },
        { 
          id: 3, 
          name: 'Anita Sharma', 
          room: 'R-102', 
          bed: 'B-2',
          temperature: '98.4°F', 
          bp: '118/78', 
          pulse: '68 bpm', 
          spo2: '99%',
          lastChecked: '1 hour ago',
          condition: 'Stable'
        }
      ])
      setLoading(false)
    }, 1000)
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Patient Vitals</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
          <i className="fas fa-plus mr-2"></i> Record Vitals
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map(patient => (
          <div key={patient.id} className="bg-white rounded-xl card-shadow border p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-blue-700 text-lg">{patient.name}</h3>
                <p className="text-sm text-gray-600">{patient.room} - Bed {patient.bed}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                patient.condition === 'Critical' ? 'status-urgent' : 'status-confirmed'
              }`}>
                {patient.condition}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{patient.temperature}</div>
                <div className="text-xs text-gray-500">Temperature</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{patient.bp}</div>
                <div className="text-xs text-gray-500">Blood Pressure</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{patient.pulse}</div>
                <div className="text-xs text-gray-500">Pulse</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{patient.spo2}</div>
                <div className="text-xs text-gray-500">SpO2</div>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
              <span>Last checked: {patient.lastChecked}</span>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-blue-500 text-white px-3 py-2 text-sm rounded hover:bg-blue-600 flex items-center justify-center">
                <i className="fas fa-heartbeat mr-2"></i> Update
              </button>
              <button className="flex-1 bg-green-500 text-white px-3 py-2 text-sm rounded hover:bg-green-600 flex items-center justify-center">
                <i className="fas fa-chart-line mr-2"></i> Trends
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Critical Patients Alert */}
      {patients.filter(p => p.condition === 'Critical').length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
          <div className="flex items-center">
            <i className="fas fa-exclamation-triangle text-red-600 text-xl mr-3"></i>
            <div>
              <h4 className="font-semibold text-red-800">Critical Patients Alert</h4>
              <p className="text-red-700 text-sm">
                {patients.filter(p => p.condition === 'Critical').length} patient(s) require immediate attention.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PatientVitals