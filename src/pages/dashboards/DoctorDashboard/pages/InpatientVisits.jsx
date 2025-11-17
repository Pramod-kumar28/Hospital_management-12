// import React, { useState, useEffect } from 'react'
// import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
// import DataTable from '../../../../components/ui/Tables/DataTable'

// const InpatientVisits = () => {
//   const [loading, setLoading] = useState(true)
//   const [inpatients, setInpatients] = useState([])

//   useEffect(() => {
//     loadInpatients()
//   }, [])

//   const loadInpatients = async () => {
//     setLoading(true)
//     setTimeout(() => {
//       setInpatients([
//         { id: 1, name: "Ravi Kumar", ward: "General", bed: "101", admissionDate: "2023-10-12", condition: "Pneumonia", status: "Stable" },
//         { id: 2, name: "Suresh Patel", ward: "ICU", bed: "205", admissionDate: "2023-10-10", condition: "Cardiac Monitoring", status: "Critical" }
//       ])
//       setLoading(false)
//     }, 1000)
//   }

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="animate-fade-in">
//       <h2 className="text-2xl font-semibold text-gray-700 mb-6">Inpatient Visits</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         {inpatients.map(patient => (
//           <div key={patient.id} className="bg-white p-4 border rounded card-shadow fade-in">
//             <div className="flex justify-between items-start mb-3">
//               <div>
//                 <h3 className="font-semibold text-blue-700 text-lg">{patient.name}</h3>
//                 <p className="text-sm text-gray-600">{patient.ward} - Bed {patient.bed}</p>
//               </div>
//               <span className={`px-2 py-1 rounded-full text-xs ${
//                 patient.status === 'Stable' ? 'status-confirmed' : 'status-urgent'
//               }`}>
//                 {patient.status}
//               </span>
//             </div>
            
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <p className="text-sm text-gray-500">Admission Date</p>
//                 <p className="font-medium">{patient.admissionDate}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Condition</p>
//                 <p className="font-medium">{patient.condition}</p>
//               </div>
//             </div>
            
//             <div className="mb-4">
//               <p className="text-sm text-gray-500 mb-1">Treatment Plan</p>
//               <p className="text-sm">
//                 {patient.condition === 'Pneumonia' 
//                   ? 'Antibiotics, Oxygen therapy, Regular monitoring' 
//                   : 'Cardiac monitoring, Medication, Restricted activity'}
//               </p>
//             </div>
            
//             <div className="flex gap-2">
//               <button className="bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-600 flex items-center">
//                 <i className="fas fa-notes-medical mr-1"></i> Update Notes
//               </button>
//               <button className="bg-green-500 text-white px-3 py-1 text-xs rounded hover:bg-green-600 flex items-center">
//                 <i className="fas fa-chart-line mr-1"></i> Vitals
//               </button>
//               <button className="bg-purple-500 text-white px-3 py-1 text-xs rounded hover:bg-purple-600 flex items-center">
//                 <i className="fas fa-pills mr-1"></i> Medications
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Ward Rounds Schedule */}
//       <div className="bg-white p-4 border rounded card-shadow">
//         <h3 className="text-lg font-semibold mb-3">Ward Rounds Schedule</h3>
//         <DataTable
//           columns={[
//             { key: 'time', title: 'Time', sortable: true },
//             { key: 'ward', title: 'Ward', sortable: true },
//             { key: 'patients', title: 'Patients', sortable: true },
//             { 
//               key: 'status', 
//               title: 'Status', 
//               sortable: true,
//               render: (value) => (
//                 <span className={`px-2 py-1 rounded-full text-xs ${
//                   value === 'Completed' ? 'status-completed' : 'status-pending'
//                 }`}>
//                   {value}
//                 </span>
//               )
//             }
//           ]}
//           data={[
//             { time: '9:00 AM', ward: 'General Ward', patients: '5 patients', status: 'Completed' },
//             { time: '11:00 AM', ward: 'ICU', patients: '2 patients', status: 'Pending' },
//             { time: '2:00 PM', ward: 'Pediatrics', patients: '3 patients', status: 'Pending' }
//           ]}
//         />
//       </div>
//     </div>
//   )
// }

// export default InpatientVisits

















import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'

const InpatientVisits = () => {
  const [loading, setLoading] = useState(true)
  const [inpatients, setInpatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [showVitalsModal, setShowVitalsModal] = useState(false)
  const [showMedicationsModal, setShowMedicationsModal] = useState(false)
  const [notes, setNotes] = useState('')
  const [vitals, setVitals] = useState({
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    oxygenSaturation: ''
  })

  useEffect(() => {
    loadInpatients()
  }, [])

  const loadInpatients = async () => {
    setLoading(true)
    setTimeout(() => {
      setInpatients([
        { 
          id: 1, 
          name: "Ravi Kumar", 
          ward: "General", 
          bed: "101", 
          admissionDate: "2023-10-12", 
          condition: "Pneumonia", 
          status: "Stable",
          treatmentPlan: "Antibiotics, Oxygen therapy, Regular monitoring",
          medications: ["Amoxicillin 500mg", "Paracetamol 500mg"],
          notes: "Patient responding well to treatment."
        },
        { 
          id: 2, 
          name: "Suresh Patel", 
          ward: "ICU", 
          bed: "205", 
          admissionDate: "2023-10-10", 
          condition: "Cardiac Monitoring", 
          status: "Critical",
          treatmentPlan: "Cardiac monitoring, Medication, Restricted activity",
          medications: ["Aspirin 75mg", "Atorvastatin 20mg"],
          notes: "Requires close monitoring."
        }
      ])
      setLoading(false)
    }, 1000)
  }

  const handleUpdateNotes = (patient) => {
    setSelectedPatient(patient)
    setNotes(patient.notes || '')
    setShowNotesModal(true)
  }

  const handleSaveNotes = () => {
    if (selectedPatient) {
      setInpatients(prev => prev.map(patient => 
        patient.id === selectedPatient.id 
          ? { ...patient, notes }
          : patient
      ))
    }
    setShowNotesModal(false)
    setSelectedPatient(null)
    setNotes('')
  }

  const handleVitals = (patient) => {
    setSelectedPatient(patient)
    setVitals({
      bloodPressure: '120/80',
      heartRate: '72',
      temperature: '98.6',
      oxygenSaturation: '98%'
    })
    setShowVitalsModal(true)
  }

  const handleSaveVitals = () => {
    // In a real application, you would save vitals to the backend
    console.log('Saving vitals for:', selectedPatient.name, vitals)
    setShowVitalsModal(false)
    setSelectedPatient(null)
  }

  const handleMedications = (patient) => {
    setSelectedPatient(patient)
    setShowMedicationsModal(true)
  }

  const handleAddMedication = (patientId, medication) => {
    setInpatients(prev => prev.map(patient => 
      patient.id === patientId 
        ? { 
            ...patient, 
            medications: [...patient.medications, medication] 
          }
        : patient
    ))
  }

  const handleRemoveMedication = (patientId, medicationIndex) => {
    setInpatients(prev => prev.map(patient => 
      patient.id === patientId 
        ? { 
            ...patient, 
            medications: patient.medications.filter((_, index) => index !== medicationIndex)
          }
        : patient
    ))
  }

  const handleStatusSort = (a, b) => {
    const statusOrder = { 'Critical': 0, 'Stable': 1, 'Discharged': 2 }
    return statusOrder[a.status] - statusOrder[b.status]
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">🛌 Inpatient Visits</h2>
      
      {/* Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {inpatients.map(patient => (
          <div key={patient.id} className="bg-white p-4 border rounded card-shadow fade-in">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-blue-700 text-lg">{patient.name}</h3>
                <p className="text-sm text-gray-600">{patient.ward} - Bed {patient.bed}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                patient.status === 'Stable' 
                  ? 'bg-green-100 text-green-800' 
                  : patient.status === 'Critical'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
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
              <p className="text-sm">{patient.treatmentPlan}</p>
            </div>

            {patient.notes && (
              <div className="mb-4 p-3 bg-blue-50 rounded">
                <p className="text-sm text-gray-500 mb-1">Latest Notes</p>
                <p className="text-sm">{patient.notes}</p>
              </div>
            )}
            
            <div className="flex gap-2 flex-wrap">
              <button 
                onClick={() => handleUpdateNotes(patient)}
                className="bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-600 flex items-center transition-colors"
              >
                <i className="fas fa-notes-medical mr-1"></i> Update Notes
              </button>
              <button 
                onClick={() => handleVitals(patient)}
                className="bg-green-500 text-white px-3 py-1 text-xs rounded hover:bg-green-600 flex items-center transition-colors"
              >
                <i className="fas fa-chart-line mr-1"></i> Vitals
              </button>
              <button 
                onClick={() => handleMedications(patient)}
                className="bg-purple-500 text-white px-3 py-1 text-xs rounded hover:bg-purple-600 flex items-center transition-colors"
              >
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
                  value === 'Completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
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

      {/* Update Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Update Notes for {selectedPatient?.name}
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded mb-4 resize-none"
              placeholder="Enter patient notes..."
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowNotesModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vitals Modal */}
      {showVitalsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Record Vitals for {selectedPatient?.name}
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Blood Pressure</label>
                <input
                  type="text"
                  value={vitals.bloodPressure}
                  onChange={(e) => setVitals(prev => ({...prev, bloodPressure: e.target.value}))}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="120/80"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Heart Rate</label>
                <input
                  type="text"
                  value={vitals.heartRate}
                  onChange={(e) => setVitals(prev => ({...prev, heartRate: e.target.value}))}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="72 bpm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Temperature</label>
                <input
                  type="text"
                  value={vitals.temperature}
                  onChange={(e) => setVitals(prev => ({...prev, temperature: e.target.value}))}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="98.6°F"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Oxygen Sat.</label>
                <input
                  type="text"
                  value={vitals.oxygenSaturation}
                  onChange={(e) => setVitals(prev => ({...prev, oxygenSaturation: e.target.value}))}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="98%"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowVitalsModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveVitals}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save Vitals
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Medications Modal */}
      {showMedicationsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Medications for {selectedPatient?.name}
            </h3>
            <div className="mb-4">
              <h4 className="font-medium mb-2">Current Medications:</h4>
              <div className="space-y-2">
                {selectedPatient?.medications?.map((medication, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>{medication}</span>
                    <button
                      onClick={() => handleRemoveMedication(selectedPatient.id, index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add new medication..."
                className="flex-1 p-2 border border-gray-300 rounded"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    handleAddMedication(selectedPatient.id, e.target.value.trim())
                    e.target.value = ''
                  }
                }}
              />
              <button
                onClick={(e) => {
                  const input = e.target.previousElementSibling
                  if (input.value.trim()) {
                    handleAddMedication(selectedPatient.id, input.value.trim())
                    input.value = ''
                  }
                }}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Add
              </button>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowMedicationsModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InpatientVisits