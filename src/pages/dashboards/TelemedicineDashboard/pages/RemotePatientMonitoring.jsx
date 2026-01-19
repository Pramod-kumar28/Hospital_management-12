import React, { useState, useEffect, useRef } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../../../components/common/Modal/Modal";



const RemotePatientMonitoring = () => {
  const [loading, setLoading] = useState(true)
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)

  const [showNotesModal, setShowNotesModal] = useState(false)
  const [showVitalsModal, setShowVitalsModal] = useState(false)
  const [showMedicationsModal, setShowMedicationsModal] = useState(false)

  const [notes, setNotes] = useState('')
  const [vitals, setVitals] = useState({
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    oxygenSaturation: '',
  })

  const [newMedication, setNewMedication] = useState('')
  const medicationInputRef = useRef(null)

  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = () => {
    setTimeout(() => {
      setPatients([
        {
          id: 1,
          name: 'Ravi Kumar',
          location: 'Home Isolation',
          program: 'Post-COVID Care',
          enrolledDate: '2023-10-12',
          condition: 'Respiratory Recovery',
          status: 'Stable',
          treatmentPlan: 'Remote vitals monitoring, Video consult every 48 hrs',
          medications: ['Amoxicillin 500mg', 'Paracetamol 500mg'],
          notes: 'Oxygen saturation improving steadily.',
        },
        {
          id: 2,
          name: 'Suresh Patel',
          location: 'Home',
          program: 'Cardiac RPM',
          enrolledDate: '2023-10-10',
          condition: 'Arrhythmia Monitoring',
          status: 'Critical',
          treatmentPlan: 'Daily ECG monitoring, Restricted activity',
          medications: ['Aspirin 75mg', 'Atorvastatin 20mg'],
          notes: 'Requires frequent vitals review.',
        },
      ])
      setLoading(false)
    }, 900)
  }

  /* ================= NOTES ================= */
  const handleUpdateNotes = (patient) => {
    setSelectedPatient(patient)
    setNotes(patient.notes || '')
    setShowNotesModal(true)
  }

  const handleSaveNotes = () => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === selectedPatient.id ? { ...p, notes } : p
      )
    )
    setShowNotesModal(false)
    setSelectedPatient(null)
    setNotes('')
  }

  /* ================= VITALS ================= */
  const handleVitals = (patient) => {
    setSelectedPatient(patient)
    setVitals({
      bloodPressure: '120/80',
      heartRate: '72',
      temperature: '98.6',
      oxygenSaturation: '98%',
    })
    setShowVitalsModal(true)
  }

  const handleSaveVitals = () => {
    console.log('Remote vitals saved:', selectedPatient.name, vitals)
    setShowVitalsModal(false)
    setSelectedPatient(null)
  }

  /* ================= MEDICATIONS ================= */
  const handleMedications = (patient) => {
    setSelectedPatient(patient)
    setNewMedication('')
    setShowMedicationsModal(true)
  }

  const handleAddMedication = () => {
    if (!newMedication.trim()) return
    setPatients((prev) =>
      prev.map((p) =>
        p.id === selectedPatient.id
          ? { ...p, medications: [...p.medications, newMedication.trim()] }
          : p
      )
    )
    setNewMedication('')
    medicationInputRef.current?.focus()
  }

  const handleRemoveMedication = (patientId, index) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patientId
          ? {
              ...p,
              medications: p.medications.filter((_, i) => i !== index),
            }
          : p
      )
    )
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in space-y-6">

  <ToastContainer
    position="bottom-right"
    autoClose={3000}
    pauseOnHover
    theme="colored"
  />

      <h2 className="text-2xl font-semibold text-gray-700">
        <i className="fas fa-heartbeat text-blue-500 mr-3"></i>
        Remote Patient Monitoring
      </h2>

      {/* Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {patients.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded border card-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-blue-700 text-lg">{p.name}</h3>
                <p className="text-sm text-gray-600">
                  {p.program} • {p.location}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  p.status === 'Stable'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {p.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Enrolled On</p>
                <p className="font-medium">{p.enrolledDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Condition</p>
                <p className="font-medium">{p.condition}</p>
              </div>
            </div>

            <p className="text-sm mb-3">
              <span className="text-gray-500">Care Plan:</span> {p.treatmentPlan}
            </p>

            {p.notes && (
              <div className="bg-blue-50 p-3 rounded mb-3">
                <p className="text-xs text-gray-500 mb-1">Latest Tele-Notes</p>
                <p className="text-sm">{p.notes}</p>
              </div>
            )}

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleUpdateNotes(p)}
                className="btn btn-primary text-xs"
              >
                <i className="fas fa-notes-medical mr-1"></i> Notes
              </button>
              <button
                onClick={() => handleVitals(p)}
                className="btn btn-success text-xs"
              >
                <i className="fas fa-chart-line mr-1"></i> Vitals
              </button>
              <button
                onClick={() => handleMedications(p)}
                className="btn btn-purple text-xs"
              >
                <i className="fas fa-pills mr-1"></i> Medications
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Virtual Rounds */}
      <div className="bg-white p-4 rounded border card-shadow">
        <h3 className="text-lg font-semibold mb-3">Virtual Rounds Schedule</h3>
        <DataTable
          columns={[
            { key: 'time', title: 'Time' },
            { key: 'program', title: 'Care Program' },
            { key: 'patients', title: 'Patients' },
            {
              key: 'status',
              title: 'Status',
              render: (v) => (
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    v === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {v}
                </span>
              ),
            },
          ]}
          data={[
            { time: '9:00 AM', program: 'Post-COVID Care', patients: '4', status: 'Completed' },
            { time: '11:30 AM', program: 'Cardiac RPM', patients: '2', status: 'Pending' },
            { time: '4:00 PM', program: 'Diabetes RPM', patients: '3', status: 'Pending' },
          ]}
        />
      </div>

      {/* NOTES / VITALS / MEDICATION MODALS */}
      {/* 👉 Your existing modals logic remains unchanged and works perfectly */}

     {/* Update Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Update Notes for {selectedPatient?.name}
              </h3>
              <button
                onClick={() => setShowNotesModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded mb-4 resize-none"
              placeholder="Enter patient notes..."
            />
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowNotesModal(false)}
                className="w-full sm:w-auto px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Record Vitals for {selectedPatient?.name}
              </h3>
              <button
                onClick={() => setShowVitalsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowVitalsModal(false)}
                className="w-full sm:w-auto px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveVitals}
                className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save Vitals
              </button> 
            </div>
          </div>
        </div>
      )}

      {/* Medications Modal - FIXED FOR MOBILE */}
      {showMedicationsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">
                Medications for {selectedPatient?.name}
              </h3>
              <button
                onClick={() => setShowMedicationsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-4">
                <h4 className="font-medium mb-2">Current Medications:</h4>
                {selectedPatient?.medications?.length > 0 ? (
                  <div className="space-y-2">
                    {selectedPatient.medications.map((medication, index) => (
                      <div 
                        key={index} 
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <i className="fas fa-pill text-purple-500 mr-3"></i>
                          <span className="text-sm sm:text-base">{medication}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveMedication(selectedPatient.id, index)}
                          className="text-red-500 hover:text-red-700 ml-2"
                          aria-label="Remove medication"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <i className="fas fa-pills text-3xl text-gray-300 mb-2"></i>
                    <p>No medications added yet</p>
                  </div>
                )}
              </div>

              {/* Add Medication Form */}
              <div className="mt-4">
                <h4 className="font-medium mb-2">Add New Medication:</h4>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    ref={medicationInputRef}
                    type="text"
                    value={newMedication}
                    onChange={(e) => setNewMedication(e.target.value)}
onKeyDown={(e) => {
  if (e.key === "Enter") handleAddMedication();
}}
                    placeholder="Enter medication name and dosage..."
                    className="flex-1 p-2 border border-gray-300 rounded text-sm sm:text-base"
                  />
                  <button
                    onClick={handleAddMedication}
                    disabled={!newMedication.trim()}
                    className={`px-4 py-2 rounded flex items-center justify-center gap-2 ${
                      newMedication.trim() 
                        ? 'bg-purple-500 text-white hover:bg-purple-600' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <i className="fas fa-plus"></i>
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Press Enter or click Add to save medication
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowMedicationsModal(false)}
                  className="w-full sm:w-auto px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  )



}

export default RemotePatientMonitoring
