import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'
import Modal from '../../../../components/common/Modal/Modal'

const Appointments = () => {
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState([])
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [newAppointment, setNewAppointment] = useState({
    patient: '',
    date: '',
    time: '',
    reason: '',
    type: 'Regular',
    notes: ''
  })

  useEffect(() => {
    loadAppointments()
  }, [])

  const loadAppointments = async () => {
    setLoading(true)
    setTimeout(() => {
      setAppointments([
        { id: 1, patient: "Ravi Kumar", time: "10:30 AM", reason: "Fever", status: "Confirmed", type: "Follow-up" },
        { id: 2, patient: "Anita Sharma", time: "11:00 AM", reason: "Back Pain", status: "Pending", type: "New" },
        { id: 3, patient: "Suresh Patel", time: "11:30 AM", reason: "Routine Checkup", status: "Confirmed", type: "Regular" },
        { id: 4, patient: "Priya Singh", time: "12:00 PM", reason: "Migraine", status: "Confirmed", type: "Urgent" },
        { id: 5, patient: "Rajesh Kumar", time: "02:00 PM", reason: "Diabetes Review", status: "Pending", type: "Follow-up" }
      ])
      setLoading(false)
    }, 1000)
  }

  const handleScheduleAppointment = () => {
    const appointment = {
      id: appointments.length + 1,
      patient: newAppointment.patient,
      time: newAppointment.time,
      reason: newAppointment.reason,
      status: 'Pending',
      type: newAppointment.type
    }
    setAppointments(prev => [appointment, ...prev])
    setIsScheduleModalOpen(false)
    resetNewAppointmentForm()
    alert('Appointment scheduled successfully!')
  }

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment)
    setIsEditModalOpen(true)
  }

  const handleUpdateAppointment = () => {
    setAppointments(prev => prev.map(apt =>
      apt.id === selectedAppointment.id ? selectedAppointment : apt
    ))
    setIsEditModalOpen(false)
    setSelectedAppointment(null)
    alert('Appointment updated successfully!')
  }

  const handleCompleteAppointment = (appointmentId) => {
    setAppointments(prev => prev.map(apt =>
      apt.id === appointmentId ? { ...apt, status: 'Completed' } : apt
    ))
    alert('Appointment marked as completed!')
  }

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(prev => prev.map(apt =>
        apt.id === appointmentId ? { ...apt, status: 'Cancelled' } : apt
      ))
      alert('Appointment cancelled!')
    }
  }

  const resetNewAppointmentForm = () => {
    setNewAppointment({
      patient: '',
      date: '',
      time: '',
      reason: '',
      type: 'Regular',
      notes: ''
    })
  }

  const handleInputChange = (field, value) => {
    setNewAppointment(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEditInputChange = (field, value) => {
    setSelectedAppointment(prev => ({
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

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ]

  const appointmentTypes = [
    'Regular',
    'Follow-up',
    'New',
    'Urgent',
    'Emergency'
  ]

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 text-responsive">
          📅 Appointments
        </h2>
        <button
          onClick={() => setIsScheduleModalOpen(true)}
          className="btn btn-primary btn-mobile-full sm:w-auto flex items-center justify-center"
        >
          <i className="fas fa-plus mr-2"></i> Schedule Appointment
        </button>
      </div>

      <DataTable
        columns={[
          { key: 'patient', title: 'Patient', sortable: true },
          { key: 'time', title: 'Time', sortable: true },
          { key: 'reason', title: 'Reason', sortable: true },
          { 
            key: 'status', 
            title: 'Status', 
            sortable: true,
            render: (value) => (
              <span className={`px-2 py-1 rounded-full text-xs ${
                value === 'Confirmed' ? 'status-confirmed' : 
                value === 'Completed' ? 'status-completed' :
                value === 'Cancelled' ? 'status-cancelled' : 'status-pending'
              }`}>
                {value}
              </span>
            )
          },
          { 
            key: 'type', 
            title: 'Type',
            render: (value) => (
              <span className={`px-2 py-1 rounded-full text-xs ${
                value === 'Urgent' ? 'status-urgent' : 
                value === 'Emergency' ? 'status-urgent' : 'status-pending'
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
                <button 
                  onClick={() => handleEditAppointment(row)}
                  className="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-blue-50"
                  title="Edit"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  onClick={() => handleCompleteAppointment(row.id)}
                  className="text-green-500 hover:text-green-700 p-1 rounded hover:bg-green-50"
                  title="Complete"
                >
                  <i className="fas fa-check"></i>
                </button>
                <button 
                  onClick={() => handleCancelAppointment(row.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                  title="Cancel"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )
          }
        ]}
        data={appointments}
        onRowClick={(row) => console.log('Appointment clicked:', row)}
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl card-shadow border">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Appointment Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
              <span className="text-gray-700 font-medium">Confirmed</span>
              <span className="font-bold text-lg text-blue-600 bg-white px-3 py-1 rounded-full border">
                {appointments.filter(a => a.status === 'Confirmed').length}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-100">
              <span className="text-gray-700 font-medium">Pending</span>
              <span className="font-bold text-lg text-yellow-600 bg-white px-3 py-1 rounded-full border">
                {appointments.filter(a => a.status === 'Pending').length}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-100">
              <span className="text-gray-700 font-medium">Cancelled</span>
              <span className="font-bold text-lg text-red-600 bg-white px-3 py-1 rounded-full border">
                {appointments.filter(a => a.status === 'Cancelled').length}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
              <span className="text-gray-700 font-medium">Completed</span>
              <span className="font-bold text-lg text-green-600 bg-white px-3 py-1 rounded-full border">
                {appointments.filter(a => a.status === 'Completed').length}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl card-shadow border md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Upcoming Schedule</h3>
          <div className="space-y-4">
            {appointments
              .filter(apt => apt.status === 'Pending' || apt.status === 'Confirmed')
              .slice(0, 3)
              .map(apt => (
                <div
                  key={apt.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 gap-3"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-user text-blue-600 text-sm sm:text-lg"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {apt.patient}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 truncate">
                        {apt.time} • {apt.reason}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 flex-wrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      apt.status === 'Confirmed' ? 'status-confirmed' : 'status-pending'
                    }`}>
                      {apt.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      apt.type === 'Urgent' || apt.type === 'Emergency' ? 'status-urgent' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {apt.type}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Schedule Appointment Modal */}
      <Modal
        isOpen={isScheduleModalOpen}
        onClose={() => {
          setIsScheduleModalOpen(false)
          resetNewAppointmentForm()
        }}
        title="Schedule New Appointment"
        size="lg"
      >
        <div className="space-y-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">Patient *</label>
            <select
              required
              value={newAppointment.patient}
              onChange={(e) => handleInputChange('patient', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Patient</option>
              {patients.map(patient => (
                <option key={patient} value={patient}>{patient}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
              <input
                type="date"
                required
                value={newAppointment.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
              <select
                required
                value={newAppointment.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Time</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit *</label>
            <input
              type="text"
              required
              value={newAppointment.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Routine checkup, Fever, etc."
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type *</label>
            <select
              required
              value={newAppointment.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {appointmentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
            <textarea
              rows="3"
              value={newAppointment.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Any additional notes or special requirements..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsScheduleModalOpen(false)
                resetNewAppointmentForm()
              }}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleScheduleAppointment}
              disabled={!newAppointment.patient || !newAppointment.date || !newAppointment.time || !newAppointment.reason}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Schedule Appointment
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Appointment Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedAppointment(null)
        }}
        title="Edit Appointment"
        size="md"
      >
        {selectedAppointment && (
          <div className="space-y-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Patient</label>
              <input
                type="text"
                value={selectedAppointment.patient}
                onChange={(e) => handleEditInputChange('patient', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <select
                  value={selectedAppointment.time}
                  onChange={(e) => handleEditInputChange('time', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={selectedAppointment.status}
                  onChange={(e) => handleEditInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
              <input
                type="text"
                value={selectedAppointment.reason}
                onChange={(e) => handleEditInputChange('reason', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={selectedAppointment.type}
                onChange={(e) => handleEditInputChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {appointmentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false)
                  setSelectedAppointment(null)
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdateAppointment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Update Appointment
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Appointments