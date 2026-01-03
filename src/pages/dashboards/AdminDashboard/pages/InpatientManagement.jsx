import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'
import Modal from '../../../../components/common/Modal/Modal'

const InpatientManagement = () => {
  const [loading, setLoading] = useState(true)
  const [inpatients, setInpatients] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modalState, setModalState] = useState({ add: false, view: false, discharge: false, transfer: false })
  const [currentPatient, setCurrentPatient] = useState(null)
  const [formData, setFormData] = useState({
    patient: '', doctor: '', roomNo: '', bedNo: '', admissionDate: '', 
    condition: 'Stable', diagnosis: '', treatmentPlan: '', emergencyContact: '', insurance: ''
  })

  // Data constants
  const PATIENTS = ['Ravi Kumar', 'Anita Sharma', 'Suresh Patel', 'Priya Singh', 'Rajesh Kumar', 'Meena Gupta', 'Arun Verma', 'Kavita Joshi']
  const DOCTORS = ['Dr. Meena Rao - Cardiology', 'Dr. Vivek Sharma - Orthopedics', 'Dr. Rajesh Menon - Neurology', 'Dr. Anjali Desai - Pediatrics', 'Dr. Kavita Iyer - ENT', 'Dr. Sanjay Kumar - Dermatology']
  const CONDITIONS = ['Stable', 'Critical', 'Serious', 'Improving', 'Observation']
  const INSURANCE_PROVIDERS = ['HealthGuard', 'MediCare Plus', 'SecureLife', 'Wellness First', 'Star Health', 'Apollo Munich']

  useEffect(() => { loadInpatients() }, [])

  const loadInpatients = async () => {
    setLoading(true)
    setTimeout(() => {
      setInpatients([
        { id: 'INP-5001', roomNo: 'R-101', bedNo: 'B-1', admissionDate: '2023-10-12', dischargeDate: null, doctor: 'Dr. Meena Rao', patient: 'Ravi Kumar', condition: 'Stable', diagnosis: 'Pneumonia', treatmentPlan: 'Antibiotics and rest', emergencyContact: '+91 98765 43210', insurance: 'HealthGuard' },
        { id: 'INP-5002', roomNo: 'R-205', bedNo: 'B-1', admissionDate: '2023-10-10', dischargeDate: null, doctor: 'Dr. Sharma', patient: 'Suresh Patel', condition: 'Critical', diagnosis: 'Heart Attack', treatmentPlan: 'ICU monitoring', emergencyContact: '+91 98765 43211', insurance: 'MediCare Plus' },
        { id: 'INP-5003', roomNo: 'R-102', bedNo: 'B-2', admissionDate: '2023-10-08', dischargeDate: '2023-10-15', doctor: 'Dr. Desai', patient: 'Anita Sharma', condition: 'Discharged', diagnosis: 'Appendicitis', treatmentPlan: 'Surgery completed', emergencyContact: '+91 98765 43212', insurance: 'SecureLife' }
      ])
      setLoading(false)
    }, 1000)
  }

  // Modal handlers
  const openModal = (type, patient = null) => {
    setModalState(prev => ({ ...prev, [type]: true }))
    if (patient) {
      setCurrentPatient(patient)
      if (type === 'view') {
        setFormData({
          patient: patient.patient, doctor: patient.doctor, roomNo: patient.roomNo, 
          bedNo: patient.bedNo, admissionDate: patient.admissionDate, condition: patient.condition,
          diagnosis: patient.diagnosis, treatmentPlan: patient.treatmentPlan, 
          emergencyContact: patient.emergencyContact, insurance: patient.insurance
        })
      }
    }
  }

  const closeModal = (type) => {
    setModalState(prev => ({ ...prev, [type]: false }))
    if (type !== 'view') resetForm()
    if (type === 'view' || type === 'discharge' || type === 'transfer') setCurrentPatient(null)
  }

  // Core functions
  const handleAdmitPatient = () => {
    if (!validateForm()) return
    const inpatient = {
      id: `INP-${Math.floor(5000 + Math.random() * 9000)}`,
      ...formData,
      dischargeDate: null
    }
    setInpatients(prev => [inpatient, ...prev])
    closeModal('add')
  }

  const handleDischargePatient = () => {
    setInpatients(prev => prev.map(ip => 
      ip.id === currentPatient.id ? { ...ip, dischargeDate: new Date().toISOString().split('T')[0] } : ip
    ))
    closeModal('discharge')
  }

  const handleTransferPatient = () => {
    setInpatients(prev => prev.map(ip => 
      ip.id === currentPatient.id ? { ...ip, roomNo: formData.roomNo, bedNo: formData.bedNo } : ip
    ))
    closeModal('transfer')
  }

  const handleUpdateCondition = (patientId, newCondition) => {
    setInpatients(prev => prev.map(ip => 
      ip.id === patientId ? { ...ip, condition: newCondition } : ip
    ))
  }

  const resetForm = () => {
    setFormData({
      patient: '', doctor: '', roomNo: '', bedNo: '', admissionDate: '', 
      condition: 'Stable', diagnosis: '', treatmentPlan: '', emergencyContact: '', insurance: ''
    })
    setCurrentPatient(null)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    const required = ['patient', 'doctor', 'roomNo', 'bedNo', 'admissionDate', 'diagnosis', 'treatmentPlan', 'emergencyContact']
    const missing = required.find(field => !formData[field])
    if (missing) {
      alert(`Please fill in the ${missing} field`)
      return false
    }
    return true
  }

  // Generate room and bed options
  const generateRoomOptions = () => {
    const rooms = []
    for (let floor = 1; floor <= 3; floor++) {
      for (let room = 1; room <= 20; room++) {
        rooms.push(`R-${floor}${room.toString().padStart(2, '0')}`)
      }
    }
    return rooms
  }

  const generateBedOptions = (roomNo) => {
    const bedsPerRoom = roomNo.includes('P') ? 1 : 2
    const beds = []
    for (let i = 1; i <= bedsPerRoom; i++) {
      beds.push(`B-${i}`)
    }
    return beds
  }

  // Filter inpatients
  const filteredInpatients = inpatients.filter(ip => {
    const matchesSearch = !searchTerm || 
      [ip.patient, ip.id, ip.diagnosis].some(field => 
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    const matchesStatus = !statusFilter || ip.condition === statusFilter
    const isActive = !ip.dischargeDate
    return matchesSearch && matchesStatus && isActive
  })

  // Statistics
  const occupiedBeds = inpatients.filter(ip => !ip.dischargeDate).length
  const totalBeds = 50

  const stats = [
    { label: 'Occupied Beds', value: occupiedBeds, color: 'blue' },
    { label: 'Available Beds', value: totalBeds - occupiedBeds, color: 'green' },
    { label: 'Occupancy Rate', value: `${Math.round((occupiedBeds / totalBeds) * 100)}%`, color: 'purple' }
  ]

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">
          Inpatient Management
        </h2>
        <button 
          onClick={() => openModal('add')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i className="fas fa-plus mr-2"></i>Admit Patient
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg card-shadow border mb-6">
        <div className="flex flex-wrap gap-4">
          <input 
            type="text" 
            placeholder="Search inpatients..." 
            className="p-2 border rounded flex-1 focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="p-2 border rounded focus:outline-none focus:border-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Conditions</option>
            {CONDITIONS.map(condition => (
              <option key={condition} value={condition}>{condition}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bed Occupancy */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map(({ label, value, color }) => (
          <div key={label} className="bg-white p-6 rounded-xl card-shadow border text-center">
            <div className={`text-2xl font-bold text-${color}-600`}>{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        ))}
      </div> */}

      {/* Statistics - Compact 3 Column Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
  {stats.map(({ label, value, color }) => {
    const colorConfigs = {
      blue: { 
        bg: 'bg-blue-500/5',
        text: 'text-blue-600',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-500',
        icon: 'fas fa-chart-line'
      },
      green: { 
        bg: 'bg-green-500/5',
        text: 'text-green-600',
        iconBg: 'bg-green-100',
        iconColor: 'text-green-500',
        icon: 'fas fa-check-circle'
      },
      purple: { 
        bg: 'bg-purple-500/5',
        text: 'text-purple-600',
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-500',
        icon: 'fas fa-chart-pie'
      }
    }
    
    const config = colorConfigs[color] || colorConfigs.blue

    return (
      <div 
        key={label} 
        className={`${config.bg} border border-gray-200 p-5 rounded-xl hover:shadow-md transition-all duration-300`}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 mb-1">{label}</div>
            <div className={`text-2xl font-bold ${config.text}`}>{value}</div>
          </div>
          <div className={`${config.iconBg} p-3 rounded-lg`}>
            <i className={`${config.icon} ${config.iconColor} text-lg`}></i>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500">
            <i className="fas fa-history mr-1"></i>
            <span>Updated just now</span>
          </div>
        </div>
      </div>
    )
  })}
</div>

      {/* Inpatients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInpatients.map(patient => (
          <InpatientCard 
            key={patient.id} 
            patient={patient} 
            onView={() => openModal('view', patient)}
            onDischarge={() => openModal('discharge', patient)}
            onTransfer={() => openModal('transfer', patient)}
            onUpdateCondition={handleUpdateCondition}
          />
        ))}
      </div>

      {filteredInpatients.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <i className="fas fa-procedures text-blue-500 text-3xl mb-2"></i>
          <p>No inpatients found matching your criteria</p>
        </div>
      )}

      {/* Recent Discharges */}
      <div className="bg-white p-4 border rounded card-shadow mt-6">
        <h3 className="text-lg font-semibold mb-3">Recent Discharges</h3>
        <DataTable
          columns={[
            { key: 'patient', title: 'Patient', sortable: true },
            { key: 'roomNo', title: 'Room', sortable: true },
            { key: 'admissionDate', title: 'Admission Date', sortable: true },
            { key: 'dischargeDate', title: 'Discharge Date', sortable: true },
            { key: 'doctor', title: 'Doctor', sortable: true }
          ]}
          data={inpatients.filter(ip => ip.dischargeDate)}
        />
      </div>

      {/* Modals */}
      <AdmitPatientModal
        isOpen={modalState.add}
        onClose={() => closeModal('add')}
        onSubmit={handleAdmitPatient}
        formData={formData}
        onInputChange={handleInputChange}
      />

      <ViewPatientModal
        isOpen={modalState.view}
        onClose={() => closeModal('view')}
        patient={currentPatient}
        onUpdateCondition={handleUpdateCondition}
      />

      <DischargeModal
        isOpen={modalState.discharge}
        onClose={() => closeModal('discharge')}
        onConfirm={handleDischargePatient}
        patient={currentPatient}
      />

      <TransferModal
        isOpen={modalState.transfer}
        onClose={() => closeModal('transfer')}
        onConfirm={handleTransferPatient}
        formData={formData}
        onInputChange={handleInputChange}
        patient={currentPatient}
      />
    </div>
  )
}

// Sub-components
const InpatientCard = ({ patient, onView, onDischarge, onTransfer, onUpdateCondition }) => (
  <div className="bg-white rounded-xl card-shadow border p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="font-semibold text-blue-700">{patient.patient}</h3>
        <p className="text-xs text-gray-500">{patient.id}</p>
      </div>
      <select 
        value={patient.condition}
        onChange={(e) => onUpdateCondition(patient.id, e.target.value)}
        className={`text-xs px-2 py-1 rounded border ${
          patient.condition === 'Critical' ? 'bg-red-100 text-red-800 border-red-200' :
          patient.condition === 'Serious' ? 'bg-orange-100 text-orange-800 border-orange-200' :
          patient.condition === 'Stable' ? 'bg-green-100 text-green-800 border-green-200' :
          'bg-blue-100 text-blue-800 border-blue-200'
        }`}
      >
        <option value="Stable">Stable</option>
        <option value="Serious">Serious</option>
        <option value="Critical">Critical</option>
        <option value="Improving">Improving</option>
        <option value="Observation">Observation</option>
      </select>
    </div>
    
    <div className="space-y-2 text-sm text-gray-600 mb-4">
      {[
        { label: 'Room:', value: patient.roomNo, className: 'font-medium' },
        { label: 'Bed:', value: patient.bedNo, className: 'font-medium' },
        { label: 'Admission Date:', value: patient.admissionDate, className: 'text-gray-500' },
        { label: 'Doctor:', value: patient.doctor, className: 'font-medium' },
        ...(patient.diagnosis ? [{ label: 'Diagnosis:', value: patient.diagnosis, className: 'text-xs text-gray-500 mt-1' }] : [])
      ].map(({ label, value, className }) => (
        <div key={label} className="flex justify-between">
          <span>{label}</span>
          <span className={className}>{value}</span>
        </div>
      ))}
    </div>
    
    <div className="flex justify-between items-center pt-4 border-t">
      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
        Inpatient
      </span>
      <div className="flex gap-1">
        <ActionButton icon="chart-line" color="blue" onClick={onView} title="View Details" />
        <ActionButton icon="sign-out-alt" color="green" onClick={onDischarge} title="Discharge Patient" />
        <ActionButton icon="exchange-alt" color="red" onClick={onTransfer} title="Transfer Patient" />
      </div>
    </div>
  </div>
)

const ActionButton = ({ icon, color, onClick, title }) => (
  <button 
    onClick={onClick}
    className={`text-${color}-600 hover:text-${color}-800 p-1 rounded hover:bg-${color}-50 transition-colors`}
    title={title}
  >
    <i className={`fas fa-${icon}`}></i>
  </button>
)

const AdmitPatientModal = ({ isOpen, onClose, onSubmit, formData, onInputChange }) => {
  const generateRoomOptions = () => {
    const rooms = []
    for (let floor = 1; floor <= 3; floor++) {
      for (let room = 1; room <= 20; room++) {
        rooms.push(`R-${floor}${room.toString().padStart(2, '0')}`)
      }
    }
    return rooms
  }

  const generateBedOptions = (roomNo) => {
    const bedsPerRoom = roomNo.includes('P') ? 1 : 2
    const beds = []
    for (let i = 1; i <= bedsPerRoom; i++) {
      beds.push(`B-${i}`)
    }
    return beds
  }

  const formSections = [
    {
      title: 'Patient and Doctor Selection',
      fields: [
        { type: 'select', name: 'patient', label: 'Select Patient *', options: ['Ravi Kumar', 'Anita Sharma', 'Suresh Patel', 'Priya Singh', 'Rajesh Kumar', 'Meena Gupta'] },
        { type: 'select', name: 'doctor', label: 'Attending Doctor *', options: ['Dr. Meena Rao - Cardiology', 'Dr. Vivek Sharma - Orthopedics', 'Dr. Rajesh Menon - Neurology', 'Dr. Anjali Desai - Pediatrics', 'Dr. Kavita Iyer - ENT', 'Dr. Sanjay Kumar - Dermatology'] }
      ]
    },
    {
      title: 'Room and Bed Assignment',
      fields: [
        { type: 'select', name: 'roomNo', label: 'Room Number *', options: generateRoomOptions() },
        { type: 'select', name: 'bedNo', label: 'Bed Number *', options: formData.roomNo ? generateBedOptions(formData.roomNo) : [], disabled: !formData.roomNo }
      ]
    },
    {
      title: 'Admission Details',
      fields: [
        { type: 'date', name: 'admissionDate', label: 'Admission Date *' },
        { type: 'select', name: 'condition', label: 'Patient Condition *', options: ['Stable', 'Critical', 'Serious', 'Improving', 'Observation'] }
      ]
    }
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Admit New Patient" size="lg">
      <div className="space-y-6">
        {formSections.map((section, index) => (
          <div key={index}>
            {index > 0 && <div className="border-t my-4"></div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      required={field.label.includes('*')}
                      value={formData[field.name]}
                      onChange={(e) => {
                        onInputChange(field.name, e.target.value)
                        if (field.name === 'roomNo') onInputChange('bedNo', '')
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      disabled={field.disabled}
                    >
                      <option value="">Select {field.label.replace(' *', '')}</option>
                      {field.options.map(option => <option key={option} value={option}>{option}</option>)}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      required={field.label.includes('*')}
                      value={formData[field.name]}
                      onChange={(e) => onInputChange(field.name, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis *</label>
          <input
            type="text"
            required
            value={formData.diagnosis}
            onChange={(e) => onInputChange('diagnosis', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter primary diagnosis"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Plan *</label>
          <textarea
            rows="3"
            required
            value={formData.treatmentPlan}
            onChange={(e) => onInputChange('treatmentPlan', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Describe the treatment plan and medications..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact *</label>
            <input
              type="tel"
              required
              value={formData.emergencyContact}
              onChange={(e) => onInputChange('emergencyContact', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Provider</label>
            <select
              value={formData.insurance}
              onChange={(e) => onInputChange('insurance', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Insurance</option>
              {['HealthGuard', 'MediCare Plus', 'SecureLife', 'Wellness First', 'Star Health', 'Apollo Munich'].map(insurance => (
                <option key={insurance} value={insurance}>{insurance}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={!formData.patient || !formData.doctor || !formData.roomNo || !formData.bedNo || !formData.diagnosis}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <i className="fas fa-procedures mr-2"></i>Admit Patient
          </button>
        </div>
      </div>
    </Modal>
  )
}

const ViewPatientModal = ({ isOpen, onClose, patient, onUpdateCondition }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Patient Details" size="lg">
    {patient && (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <DetailItem label="Patient ID" value={patient.id} />
          <DetailItem label="Condition" value={patient.condition} />
          <DetailItem label="Patient Name" value={patient.patient} />
          <DetailItem label="Room" value={patient.roomNo} />
          <DetailItem label="Bed" value={patient.bedNo} />
          <DetailItem label="Admission Date" value={patient.admissionDate} />
          <DetailItem label="Doctor" value={patient.doctor} />
          <DetailItem label="Insurance" value={patient.insurance} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{patient.diagnosis}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Plan</label>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{patient.treatmentPlan}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
          <p className="text-sm text-gray-600">{patient.emergencyContact}</p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    )}
  </Modal>
)

const DischargeModal = ({ isOpen, onClose, onConfirm, patient }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Discharge Patient" size="md">
    {patient && (
      <div className="text-center p-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <i className="fas fa-sign-out-alt text-green-600 text-xl"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirm Discharge</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to discharge <span className="font-semibold">{patient.patient}</span> from {patient.roomNo}-{patient.bedNo}?
        </p>
        <div className="flex justify-center gap-3">
          <button onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <i className="fas fa-check mr-2"></i>Confirm Discharge
          </button>
        </div>
      </div>
    )}
  </Modal>
)

const TransferModal = ({ isOpen, onClose, onConfirm, formData, onInputChange, patient }) => {
  const generateRoomOptions = () => {
    const rooms = []
    for (let floor = 1; floor <= 3; floor++) {
      for (let room = 1; room <= 20; room++) {
        rooms.push(`R-${floor}${room.toString().padStart(2, '0')}`)
      }
    }
    return rooms
  }

  const generateBedOptions = (roomNo) => {
    const bedsPerRoom = roomNo.includes('P') ? 1 : 2
    const beds = []
    for (let i = 1; i <= bedsPerRoom; i++) {
      beds.push(`B-${i}`)
    }
    return beds
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Transfer Patient" size="md">
      {patient && (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
              <i className="fas fa-exchange-alt text-blue-600"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Transfer Patient</h3>
            <p className="text-gray-600">Transfer {patient.patient} to a different room/bed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Room *</label>
              <select
                required
                value={formData.roomNo}
                onChange={(e) => {
                  onInputChange('roomNo', e.target.value)
                  onInputChange('bedNo', '')
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Room</option>
                {generateRoomOptions().map(room => (
                  <option key={room} value={room}>{room}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Bed *</label>
              <select
                required
                value={formData.bedNo}
                onChange={(e) => onInputChange('bedNo', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                disabled={!formData.roomNo}
              >
                <option value="">Select Bed</option>
                {formData.roomNo && generateBedOptions(formData.roomNo).map(bed => (
                  <option key={bed} value={bed}>{bed}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={!formData.roomNo || !formData.bedNo}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <i className="fas fa-exchange-alt mr-2"></i>Transfer
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}

const DetailItem = ({ label, value }) => (
  <div>
    <span className="font-medium text-gray-700">{label}:</span>
    <p className="text-gray-900">{value}</p>
  </div>
)

export default InpatientManagement