import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'
import Modal from '../../../../components/common/Modal/Modal'

const AppointmentManagement = () => {
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modalState, setModalState] = useState({ add: false, edit: false, delete: false, view: false })
  const [currentAppointment, setCurrentAppointment] = useState(null)
  const [formData, setFormData] = useState({
    patient: '', doctor: '', date: '', time: '', reason: '', 
    type: 'Consultation', priority: 'Normal', notes: ''
  })

  // Data constants
  const PATIENTS = ['Ravi Kumar', 'Anita Sharma', 'Suresh Patel', 'Priya Singh', 'Rajesh Kumar', 'Meena Gupta', 'Arun Verma', 'Kavita Joshi']
  const DOCTORS = ['Dr. Meena Rao - Cardiology', 'Dr. Vivek Sharma - Orthopedics', 'Dr. Rajesh Menon - Neurology', 'Dr. Anjali Desai - Pediatrics', 'Dr. Kavita Iyer - ENT', 'Dr. Sanjay Kumar - Dermatology']
  const APPOINTMENT_TYPES = ['Consultation', 'Follow-up', 'Emergency', 'Routine Checkup', 'Surgery', 'Lab Test']
  const PRIORITIES = ['Normal', 'Urgent', 'Emergency']
  const TIME_SLOTS = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM']

  useEffect(() => { loadAppointments() }, [])

  const loadAppointments = async () => {
    setLoading(true)
    setTimeout(() => {
      setAppointments([
        { id: 'APT-3001', patient: 'Ravi Kumar', doctor: 'Dr. Meena Rao', dateTime: '2023-10-15 10:30 AM', status: 'Confirmed', reason: 'Fever', type: 'Consultation', priority: 'Normal', notes: '' },
        { id: 'APT-3002', patient: 'Anita Sharma', doctor: 'Dr. Sharma', dateTime: '2023-10-15 11:00 AM', status: 'Pending', reason: 'Back Pain', type: 'Consultation', priority: 'Normal', notes: '' },
        { id: 'APT-3003', patient: 'Suresh Patel', doctor: 'Dr. Menon', dateTime: '2023-10-15 11:30 AM', status: 'Confirmed', reason: 'Routine Checkup', type: 'Routine Checkup', priority: 'Normal', notes: '' },
        { id: 'APT-3004', patient: 'Priya Singh', doctor: 'Dr. Desai', dateTime: '2023-10-15 12:00 PM', status: 'Confirmed', reason: 'Migraine', type: 'Consultation', priority: 'Urgent', notes: 'Severe headache' },
        { id: 'APT-3005', patient: 'Rajesh Kumar', doctor: 'Dr. Iyer', dateTime: '2023-10-15 02:00 PM', status: 'Pending', reason: 'Diabetes Review', type: 'Follow-up', priority: 'Normal', notes: '' }
      ])
      setLoading(false)
    }, 1000)
  }

  // Modal handlers
  const openModal = (type, appointment = null) => {
    setModalState(prev => ({ ...prev, [type]: true }))
    if ((type === 'edit' || type === 'view') && appointment) {
      setCurrentAppointment(appointment)
      const [date, time] = appointment.dateTime.split(' ')
      setFormData({
        patient: appointment.patient,
        doctor: appointment.doctor,
        date: date,
        time: time + ' ' + appointment.dateTime.split(' ')[2],
        reason: appointment.reason,
        type: appointment.type,
        priority: appointment.priority,
        notes: appointment.notes || ''
      })
    } else if (type === 'delete' && appointment) {
      setCurrentAppointment(appointment)
    }
  }

  const closeModal = (type) => {
    setModalState(prev => ({ ...prev, [type]: false }))
    if (type !== 'delete' && type !== 'view') resetForm()
    if (type === 'delete' || type === 'view') setCurrentAppointment(null)
  }

  // Core functions
  const handleScheduleAppointment = () => {
    if (!validateForm()) return
    const appointment = {
      id: `APT-${Math.floor(3000 + Math.random() * 9000)}`,
      ...formData,
      dateTime: `${formData.date} ${formData.time}`,
      status: 'Pending'
    }
    setAppointments(prev => [appointment, ...prev])
    closeModal('add')
  }

  const handleUpdateAppointment = () => {
    if (!validateForm()) return
    setAppointments(prev => prev.map(apt => 
      apt.id === currentAppointment.id ? { 
        ...apt, 
        ...formData,
        dateTime: `${formData.date} ${formData.time}`
      } : apt
    ))
    closeModal('edit')
  }

  const handleDeleteAppointment = () => {
    setAppointments(prev => prev.filter(apt => apt.id !== currentAppointment.id))
    closeModal('delete')
  }

  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ))
  }

  const resetForm = () => {
    setFormData({
      patient: '', doctor: '', date: '', time: '', reason: '', 
      type: 'Consultation', priority: 'Normal', notes: ''
    })
    setCurrentAppointment(null)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    const required = ['patient', 'doctor', 'date', 'time', 'reason']
    const missing = required.find(field => !formData[field])
    if (missing) {
      alert(`Please fill in the ${missing} field`)
      return false
    }
    return true
  }

  // Filter appointments
  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = !searchTerm || 
      [apt.patient, apt.doctor, apt.reason].some(field => 
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    const matchesStatus = !statusFilter || apt.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Statistics
  const stats = [
    { label: 'Confirmed', value: appointments.filter(a => a.status === 'Confirmed').length, color: 'blue' },
    { label: 'Pending', value: appointments.filter(a => a.status === 'Pending').length, color: 'yellow' },
    { label: 'Completed', value: appointments.filter(a => a.status === 'Completed').length, color: 'green' },
    { label: 'Cancelled', value: appointments.filter(a => a.status === 'Cancelled').length, color: 'red' }
  ]

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">
          📋 Appointment Management
        </h2>
        <button 
          onClick={() => openModal('add')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i className="fas fa-plus mr-2"></i>Schedule Appointment
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg card-shadow border mb-6">
        <div className="flex flex-wrap gap-4">
          <input 
            type="text" 
            placeholder="Search appointments..." 
            className="p-2 border rounded flex-1 focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="p-2 border rounded focus:outline-none focus:border-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map(({ label, value, color }) => (
          <div key={label} className="bg-white p-4 rounded-lg card-shadow border text-center">
            <div className={`text-2xl font-bold text-${color}-600`}>{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl card-shadow border overflow-hidden">
        <DataTable
          columns={[
            { key: 'id', title: 'Appointment ID', sortable: true },
            { key: 'patient', title: 'Patient', sortable: true },
            { key: 'doctor', title: 'Doctor', sortable: true },
            { key: 'dateTime', title: 'Date & Time', sortable: true },
            { 
              key: 'status', 
              title: 'Status', 
              sortable: true,
              render: (value) => (
                <span className={`px-2 py-1 rounded text-xs ${
                  value === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                  value === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  value === 'Completed' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {value}
                </span>
              )
            },
            {
              key: 'actions',
              title: 'Actions',
              render: (_, row) => (
                <div className="flex gap-1">
                  <ActionButton icon="eye" color="blue" onClick={() => openModal('view', row)} title="View Details" />
                  <ActionButton icon="edit" color="green" onClick={() => openModal('edit', row)} title="Edit Appointment" />
                  <ActionButton icon="times" color="red" onClick={() => openModal('delete', row)} title="Cancel Appointment" />
                </div>
              )
            }
          ]}
          data={filteredAppointments}
        />
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <i className="fas fa-calendar-times text-blue-500 text-3xl mb-2"></i>
          <p>No appointments found matching your criteria</p>
        </div>
      )}

      {/* Modals */}
      <AppointmentFormModal
        isOpen={modalState.add}
        onClose={() => closeModal('add')}
        title="Schedule New Appointment"
        onSubmit={handleScheduleAppointment}
        formData={formData}
        onInputChange={handleInputChange}
        submitText="Schedule Appointment"
        submitIcon="calendar-plus"
      />

      <AppointmentFormModal
        isOpen={modalState.edit}
        onClose={() => closeModal('edit')}
        title="Edit Appointment"
        onSubmit={handleUpdateAppointment}
        formData={formData}
        onInputChange={handleInputChange}
        submitText="Update Appointment"
        submitIcon="save"
      />

      <ViewAppointmentModal
        isOpen={modalState.view}
        onClose={() => closeModal('view')}
        appointment={currentAppointment}
        onStatusChange={handleStatusChange}
      />

      <DeleteConfirmationModal
        isOpen={modalState.delete}
        onClose={() => closeModal('delete')}
        onConfirm={handleDeleteAppointment}
        name={`Appointment ${currentAppointment?.id}`}
        type="Appointment"
      />
    </div>
  )
}

// Sub-components
const ActionButton = ({ icon, color, onClick, title }) => (
  <button 
    onClick={onClick}
    className={`text-${color}-600 hover:text-${color}-800 p-1 rounded hover:bg-${color}-50 transition-colors`}
    title={title}
  >
    <i className={`fas fa-${icon}`}></i>
  </button>
)

const AppointmentFormModal = ({ isOpen, onClose, title, onSubmit, formData, onInputChange, submitText, submitIcon }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
    <AppointmentForm 
      formData={formData} 
      onInputChange={onInputChange}
      onCancel={onClose}
      onSubmit={onSubmit}
      submitText={submitText}
      submitIcon={submitIcon}
    />
  </Modal>
)

const AppointmentForm = ({ formData, onInputChange, onCancel, onSubmit, submitText, submitIcon }) => {
  const PATIENTS = ['Ravi Kumar', 'Anita Sharma', 'Suresh Patel', 'Priya Singh', 'Rajesh Kumar', 'Meena Gupta', 'Arun Verma', 'Kavita Joshi']
  const DOCTORS = ['Dr. Meena Rao - Cardiology', 'Dr. Vivek Sharma - Orthopedics', 'Dr. Rajesh Menon - Neurology', 'Dr. Anjali Desai - Pediatrics', 'Dr. Kavita Iyer - ENT', 'Dr. Sanjay Kumar - Dermatology']
  const APPOINTMENT_TYPES = ['Consultation', 'Follow-up', 'Emergency', 'Routine Checkup', 'Surgery', 'Lab Test']
  const PRIORITIES = ['Normal', 'Urgent', 'Emergency']
  const TIME_SLOTS = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM']

  const formSections = [
    {
      title: 'Patient and Doctor Selection',
      fields: [
        { type: 'select', name: 'patient', label: 'Select Patient *', options: PATIENTS },
        { type: 'select', name: 'doctor', label: 'Select Doctor *', options: DOCTORS }
      ]
    },
    {
      title: 'Date and Time',
      fields: [
        { type: 'date', name: 'date', label: 'Appointment Date *', min: new Date().toISOString().split('T')[0] },
        { type: 'select', name: 'time', label: 'Appointment Time *', options: TIME_SLOTS }
      ]
    },
    {
      title: 'Appointment Details',
      fields: [
        { type: 'select', name: 'type', label: 'Appointment Type *', options: APPOINTMENT_TYPES },
        { type: 'select', name: 'priority', label: 'Priority Level *', options: PRIORITIES }
      ]
    }
  ]

  return (
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
                    required
                    value={formData[field.name]}
                    onChange={(e) => onInputChange(field.name, e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select {field.label.replace(' *', '')}</option>
                    {field.options.map(option => <option key={option} value={option}>{option}</option>)}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    required
                    min={field.min}
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit *</label>
        <input
          type="text"
          required
          value={formData.reason}
          onChange={(e) => onInputChange('reason', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Brief description of the medical issue"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
        <textarea
          rows="3"
          value={formData.notes}
          onChange={(e) => onInputChange('notes', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Any additional information or special requirements..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!formData.patient || !formData.doctor || !formData.date || !formData.time || !formData.reason}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <i className={`fas fa-${submitIcon} mr-2`}></i>
          {submitText}
        </button>
      </div>
    </div>
  )
}

const ViewAppointmentModal = ({ isOpen, onClose, appointment, onStatusChange }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Appointment Details" size="md">
    {appointment && (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <DetailItem label="Appointment ID" value={appointment.id} />
          <DetailItem label="Status" value={appointment.status} />
          <DetailItem label="Patient" value={appointment.patient} />
          <DetailItem label="Doctor" value={appointment.doctor} />
          <DetailItem label="Date & Time" value={appointment.dateTime} />
          <DetailItem label="Type" value={appointment.type} />
          <DetailItem label="Priority" value={appointment.priority} />
          <DetailItem label="Reason" value={appointment.reason} />
        </div>
        
        {appointment.notes && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{appointment.notes}</p>
          </div>
        )}

        <div className="flex justify-between gap-2 pt-4 border-t">
          <select 
            value={appointment.status}
            onChange={(e) => onStatusChange(appointment.id, e.target.value)}
            className="flex-1 p-2 border rounded focus:outline-none focus:border-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Close
          </button>
        </div>
      </div>
    )}
  </Modal>
)

const DetailItem = ({ label, value }) => (
  <div>
    <span className="font-medium text-gray-700">{label}:</span>
    <p className="text-gray-900">{value}</p>
  </div>
)

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, name, type }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={`Cancel ${type}`} size="md">
    <div className="text-center p-6">
      <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
        <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirm Cancellation</h3>
      <p className="text-gray-600 mb-6">
        Are you sure you want to cancel <span className="font-semibold">{name}</span>? 
        This action cannot be undone.
      </p>
      <div className="flex justify-center gap-3">
        <button onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          Keep Appointment
        </button>
        <button onClick={onConfirm} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          <i className="fas fa-times mr-2"></i>Cancel {type}
        </button>
      </div>
    </div>
  </Modal>
)

export default AppointmentManagement
