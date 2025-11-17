import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'
import Modal from '../../../../components/common/Modal/Modal'

const Prescriptions = () => {
  const [loading, setLoading] = useState(true)
  const [prescriptions, setPrescriptions] = useState([])
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedPrescription, setSelectedPrescription] = useState(null)
  const [newPrescription, setNewPrescription] = useState({
    patient: '',
    medicine: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
    date: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    loadPrescriptions()
  }, [])

  const loadPrescriptions = async () => {
    setLoading(true)
    setTimeout(() => {
      setPrescriptions([
        { 
          id: 1, 
          patient: "Ravi Kumar", 
          medicine: "Paracetamol", 
          dosage: "500mg", 
          frequency: "Twice daily",
          duration: "5 days", 
          instructions: "After meals",
          date: "2023-10-15" 
        },
        { 
          id: 2, 
          patient: "Anita Sharma", 
          medicine: "Ibuprofen", 
          dosage: "400mg", 
          frequency: "Three times daily",
          duration: "3 days", 
          instructions: "With plenty of water",
          date: "2023-10-10" 
        },
        { 
          id: 3, 
          patient: "Suresh Patel", 
          medicine: "Metformin", 
          dosage: "500mg", 
          frequency: "Once daily",
          duration: "30 days", 
          instructions: "With breakfast",
          date: "2023-10-05" 
        },
        { 
          id: 4, 
          patient: "Priya Singh", 
          medicine: "Sumatriptan", 
          dosage: "50mg", 
          frequency: "As needed",
          duration: "As needed", 
          instructions: "At onset of migraine",
          date: "2023-09-28" 
        }
      ])
      setLoading(false)
    }, 1000)
  }

  const handleCreatePrescription = () => {
    const prescription = {
      id: prescriptions.length + 1,
      ...newPrescription
    }
    setPrescriptions(prev => [prescription, ...prev])
    setIsNewModalOpen(false)
    resetNewPrescriptionForm()
    alert('Prescription created successfully!')
  }

  const handleEditPrescription = (prescription) => {
    setSelectedPrescription(prescription)
    setIsEditModalOpen(true)
  }

  const handleUpdatePrescription = () => {
    setPrescriptions(prev => prev.map(pres =>
      pres.id === selectedPrescription.id ? selectedPrescription : pres
    ))
    setIsEditModalOpen(false)
    setSelectedPrescription(null)
    alert('Prescription updated successfully!')
  }

  const handleDeletePrescription = (prescriptionId) => {
    if (window.confirm('Are you sure you want to delete this prescription?')) {
      setPrescriptions(prev => prev.filter(pres => pres.id !== prescriptionId))
      alert('Prescription deleted successfully!')
    }
  }

  const handlePrintPrescription = (prescription) => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>Prescription - ${prescription.patient}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .patient-info { margin-bottom: 20px; }
            .medicine-details { margin: 20px 0; }
            .instructions { margin-top: 20px; }
            .footer { margin-top: 40px; text-align: right; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Medical Prescription</h1>
          </div>
          <div class="patient-info">
            <p><strong>Patient:</strong> ${prescription.patient}</p>
            <p><strong>Date:</strong> ${prescription.date}</p>
          </div>
          <div class="medicine-details">
            <h3>Prescribed Medicine:</h3>
            <p><strong>Medicine:</strong> ${prescription.medicine}</p>
            <p><strong>Dosage:</strong> ${prescription.dosage}</p>
            <p><strong>Frequency:</strong> ${prescription.frequency}</p>
            <p><strong>Duration:</strong> ${prescription.duration}</p>
          </div>
          <div class="instructions">
            <h3>Instructions:</h3>
            <p>${prescription.instructions}</p>
          </div>
          <div class="footer">
            <p>Doctor's Signature</p>
            <p>___________________</p>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  const resetNewPrescriptionForm = () => {
    setNewPrescription({
      patient: '',
      medicine: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: '',
      date: new Date().toISOString().split('T')[0]
    })
  }

  const handleInputChange = (field, value) => {
    setNewPrescription(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEditInputChange = (field, value) => {
    setSelectedPrescription(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const patients = [
    'Ravi Kumar',
    'Anita Sharma',
    'Suresh Patel',
    'Priya Singh',
    'Rajesh Kumar',
    'New Patient'
  ]

  const commonMedicines = [
    'Paracetamol',
    'Ibuprofen',
    'Amoxicillin',
    'Cetirizine',
    'Metformin',
    'Atorvastatin',
    'Aspirin',
    'Omeprazole',
    'Sumatriptan',
    'Losartan'
  ]

  const dosageOptions = [
    '250mg', '500mg', '750mg', '1000mg',
    '5mg', '10mg', '20mg', '40mg',
    '50mg', '100mg', '150mg', '200mg'
  ]

  const frequencyOptions = [
    'Once daily',
    'Twice daily',
    'Three times daily',
    'Four times daily',
    'As needed',
    'Before meals',
    'After meals',
    'At bedtime'
  ]

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 text-responsive">Prescriptions</h2>
        <button
          onClick={() => setIsNewModalOpen(true)}
          className="btn btn-primary btn-mobile-full sm:w-auto flex items-center justify-center"
        >
          <i className="fas fa-plus mr-2"></i> New Prescription
        </button>
      </div>
      
      {/* Data Table */}
      <DataTable
        columns={[
          { key: 'patient', title: 'Patient', sortable: true },
          { key: 'medicine', title: 'Medicine', sortable: true },
          { key: 'dosage', title: 'Dosage', sortable: true },
          { key: 'frequency', title: 'Frequency', sortable: true },
          { key: 'duration', title: 'Duration', sortable: true },
          { key: 'date', title: 'Date', sortable: true },
          {
            key: 'actions',
            title: 'Actions',
            render: (_, row) => (
              <div className="flex gap-2 justify-start">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEditPrescription(row)
                  }}
                  className="text-blue-500 hover:text-blue-700 p-2 rounded hover:bg-blue-50 modal-touch-target"
                  title="Edit Prescription"
                >
                  <i className="fas fa-edit text-sm"></i>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrintPrescription(row)
                  }}
                  className="text-green-500 hover:text-green-700 p-2 rounded hover:bg-green-50 modal-touch-target"
                  title="Print Prescription"
                >
                  <i className="fas fa-print text-sm"></i>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeletePrescription(row.id)
                  }}
                  className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50 modal-touch-target"
                  title="Delete Prescription"
                >
                  <i className="fas fa-trash text-sm"></i>
                </button>
              </div>
            )
          }
        ]}
        data={prescriptions}
        onRowClick={(row) => console.log('Prescription clicked:', row)}
        selectable={false}
      />

      {/* Commonly Prescribed Medicines */}
      <div className="card card-responsive card-shadow card-mobile">
        <h3 className="text-lg font-semibold mb-4 text-responsive">Commonly Prescribed Medicines</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { name: 'Paracetamol', use: 'Pain Relief', color: 'blue' },
            { name: 'Ibuprofen', use: 'Anti-inflammatory', color: 'green' },
            { name: 'Amoxicillin', use: 'Antibiotic', color: 'purple' },
            { name: 'Cetirizine', use: 'Antihistamine', color: 'yellow' }
          ].map((med, index) => (
            <div 
              key={index} 
              className="border rounded p-3 text-center hover:bg-gray-50 cursor-pointer card-hover transition-all duration-200"
              onClick={() => {
                setNewPrescription(prev => ({
                  ...prev,
                  medicine: med.name
                }))
                setIsNewModalOpen(true)
              }}
            >
              <i className={`fas fa-pills text-${med.color}-500 text-xl mb-2`}></i>
              <p className="font-medium text-sm md:text-base">{med.name}</p>
              <p className="text-xs text-gray-500">{med.use}</p>
            </div>
          ))}
        </div>
      </div>

      {/* New Prescription Modal */}
      <Modal
        isOpen={isNewModalOpen}
        onClose={() => {
          setIsNewModalOpen(false)
          resetNewPrescriptionForm()
        }}
        title="Create New Prescription"
        size="lg"
      >
        <div className="modal-form">
          <div className="modal-grid mobile-form-grid">
            <div className="form-group form-group-mobile">
              <label className="modal-label">Patient *</label>
              <select
                required
                value={newPrescription.patient}
                onChange={(e) => handleInputChange('patient', e.target.value)}
                className="modal-select form-input-mobile"
              >
                <option value="">Select Patient</option>
                {patients.map(patient => (
                  <option key={patient} value={patient}>{patient}</option>
                ))}
              </select>
            </div>

            <div className="form-group form-group-mobile">
              <label className="modal-label">Date *</label>
              <input
                type="date"
                required
                value={newPrescription.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="modal-input form-input-mobile"
              />
            </div>
          </div>

          <div className="modal-grid mobile-form-grid">
            <div className="form-group form-group-mobile">
              <label className="modal-label">Medicine *</label>
              <select
                required
                value={newPrescription.medicine}
                onChange={(e) => handleInputChange('medicine', e.target.value)}
                className="modal-select form-input-mobile"
              >
                <option value="">Select Medicine</option>
                {commonMedicines.map(medicine => (
                  <option key={medicine} value={medicine}>{medicine}</option>
                ))}
              </select>
            </div>

            <div className="form-group form-group-mobile">
              <label className="modal-label">Dosage *</label>
              <select
                required
                value={newPrescription.dosage}
                onChange={(e) => handleInputChange('dosage', e.target.value)}
                className="modal-select form-input-mobile"
              >
                <option value="">Select Dosage</option>
                {dosageOptions.map(dosage => (
                  <option key={dosage} value={dosage}>{dosage}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-grid mobile-form-grid">
            <div className="form-group form-group-mobile">
              <label className="modal-label">Frequency *</label>
              <select
                required
                value={newPrescription.frequency}
                onChange={(e) => handleInputChange('frequency', e.target.value)}
                className="modal-select form-input-mobile"
              >
                <option value="">Select Frequency</option>
                {frequencyOptions.map(frequency => (
                  <option key={frequency} value={frequency}>{frequency}</option>
                ))}
              </select>
            </div>

            <div className="form-group form-group-mobile">
              <label className="modal-label">Duration *</label>
              <input
                type="text"
                required
                value={newPrescription.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="modal-input form-input-mobile"
                placeholder="e.g., 5 days, 2 weeks, As needed"
              />
            </div>
          </div>

          <div className="form-group form-group-mobile">
            <label className="modal-label">Instructions</label>
            <textarea
              rows="3"
              value={newPrescription.instructions}
              onChange={(e) => handleInputChange('instructions', e.target.value)}
              className="modal-textarea form-input-mobile"
              placeholder="Special instructions for the patient..."
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={() => {
                setIsNewModalOpen(false)
                resetNewPrescriptionForm()
              }}
              className="modal-btn modal-btn-secondary btn-mobile"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreatePrescription}
              disabled={!newPrescription.patient || !newPrescription.medicine || !newPrescription.dosage || !newPrescription.frequency || !newPrescription.duration}
              className="modal-btn modal-btn-primary btn-mobile"
            >
              Create Prescription
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Prescription Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedPrescription(null)
        }}
        title="Edit Prescription"
        size="lg"
      >
        {selectedPrescription && (
          <div className="modal-form">
            <div className="modal-grid mobile-form-grid">
              <div className="form-group form-group-mobile">
                <label className="modal-label">Patient</label>
                <select
                  value={selectedPrescription.patient}
                  onChange={(e) => handleEditInputChange('patient', e.target.value)}
                  className="modal-select form-input-mobile"
                >
                  {patients.map(patient => (
                    <option key={patient} value={patient}>{patient}</option>
                  ))}
                </select>
              </div>

              <div className="form-group form-group-mobile">
                <label className="modal-label">Date</label>
                <input
                  type="date"
                  value={selectedPrescription.date}
                  onChange={(e) => handleEditInputChange('date', e.target.value)}
                  className="modal-input form-input-mobile"
                />
              </div>
            </div>

            <div className="modal-grid mobile-form-grid">
              <div className="form-group form-group-mobile">
                <label className="modal-label">Medicine</label>
                <select
                  value={selectedPrescription.medicine}
                  onChange={(e) => handleEditInputChange('medicine', e.target.value)}
                  className="modal-select form-input-mobile"
                >
                  {commonMedicines.map(medicine => (
                    <option key={medicine} value={medicine}>{medicine}</option>
                  ))}
                </select>
              </div>

              <div className="form-group form-group-mobile">
                <label className="modal-label">Dosage</label>
                <select
                  value={selectedPrescription.dosage}
                  onChange={(e) => handleEditInputChange('dosage', e.target.value)}
                  className="modal-select form-input-mobile"
                >
                  {dosageOptions.map(dosage => (
                    <option key={dosage} value={dosage}>{dosage}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="modal-grid mobile-form-grid">
              <div className="form-group form-group-mobile">
                <label className="modal-label">Frequency</label>
                <select
                  value={selectedPrescription.frequency}
                  onChange={(e) => handleEditInputChange('frequency', e.target.value)}
                  className="modal-select form-input-mobile"
                >
                  {frequencyOptions.map(frequency => (
                    <option key={frequency} value={frequency}>{frequency}</option>
                  ))}
                </select>
              </div>

              <div className="form-group form-group-mobile">
                <label className="modal-label">Duration</label>
                <input
                  type="text"
                  value={selectedPrescription.duration}
                  onChange={(e) => handleEditInputChange('duration', e.target.value)}
                  className="modal-input form-input-mobile"
                />
              </div>
            </div>

            <div className="form-group form-group-mobile">
              <label className="modal-label">Instructions</label>
              <textarea
                rows="3"
                value={selectedPrescription.instructions}
                onChange={(e) => handleEditInputChange('instructions', e.target.value)}
                className="modal-textarea form-input-mobile"
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false)
                  setSelectedPrescription(null)
                }}
                className="modal-btn modal-btn-secondary btn-mobile"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdatePrescription}
                className="modal-btn modal-btn-primary btn-mobile"
              >
                Update Prescription
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Prescriptions