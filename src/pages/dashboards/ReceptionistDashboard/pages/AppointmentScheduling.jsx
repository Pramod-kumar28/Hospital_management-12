import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'
import Modal from '../../../../components/common/Modal/Modal' // Import your Modal component

const AppointmentScheduling = () => {
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    reason: '',
    type: 'Regular'
  })

  useEffect(() => {
    loadAppointments()
  }, [])

  const loadAppointments = async () => {
    setLoading(true)
    setTimeout(() => {
      setAppointments([
        { id: 'APT-3001', patient: 'Ravi Kumar', doctor: 'Dr. Meena Rao', date: '2023-10-15', time: '10:30 AM', reason: 'Fever', type: 'Regular', status: 'Confirmed' },
        { id: 'APT-3002', patient: 'Anita Sharma', doctor: 'Dr. Sharma', date: '2023-10-15', time: '11:00 AM', reason: 'Back Pain', type: 'New', status: 'Pending' },
        { id: 'APT-3003', patient: 'Suresh Patel', doctor: 'Dr. Menon', date: '2023-10-15', time: '11:30 AM', reason: 'Routine Checkup', type: 'Regular', status: 'Confirmed' }
      ])
      setLoading(false)
    }, 1000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In real app, this would submit to backend
    console.log('New appointment:', formData)
    alert('Appointment scheduled successfully!')
    setShowForm(false)
    setFormData({
      patientId: '',
      doctorId: '',
      date: '',
      time: '',
      reason: '',
      type: 'Regular'
    })
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 text-responsive">📅 Appointment Scheduling</h2>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary btn-mobile-full sm:w-auto flex items-center justify-center"
        >
          <i className="fas fa-plus mr-2"></i> Schedule Appointment
        </button>
      </div>

      {/* Use your Modal component instead of inline modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Schedule New Appointment"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Patient *</label>
              <select
                name="patientId"
                value={formData.patientId}
                onChange={(e) => setFormData({...formData, patientId: e.target.value})}
                className="form-input"
                required
              >
                <option value="">Select Patient</option>
                <option value="1">Ravi Kumar</option>
                <option value="2">Anita Sharma</option>
                <option value="3">Suresh Patel</option>
                <option value="4">New Patient</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Doctor *</label>
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
                className="form-input"
                required
              >
                <option value="">Select Doctor</option>
                <option value="1">Dr. Meena Rao - Cardiology</option>
                <option value="2">Dr. Sharma - Orthopedics</option>
                <option value="3">Dr. Menon - Neurology</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Time *</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="form-input"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Appointment Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="form-input"
            >
              <option value="Regular">Regular</option>
              <option value="New">New Patient</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Reason for Visit *</label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              className="form-input"
              placeholder="Brief reason for the appointment"
              required
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Schedule Appointment
            </button>
          </div>
        </form>
      </Modal>

      {/* Data Table with proper responsive wrapper */}
      <div className="table-responsive">
        <DataTable
          columns={[
            { key: 'id', title: 'Appointment ID', sortable: true },
            { key: 'patient', title: 'Patient', sortable: true },
            { key: 'doctor', title: 'Doctor', sortable: true },
            { key: 'date', title: 'Date', sortable: true },
            { key: 'time', title: 'Time', sortable: true },
            { key: 'reason', title: 'Reason', sortable: true },
            { 
              key: 'type', 
              title: 'Type',
              render: (value) => (
                <span className={`status-badge ${
                  value === 'Urgent' ? 'status-urgent' : 'status-pending'
                }`}>
                  {value}
                </span>
              )
            },
            { 
              key: 'status', 
              title: 'Status', 
              sortable: true,
              render: (value) => (
                <span className={`status-badge ${
                  value === 'Confirmed' ? 'status-confirmed' : 'status-pending'
                }`}>
                  {value}
                </span>
              )
            },
            {
              key: 'actions',
              title: 'Actions',
              render: (_, row) => (
                <div className="table-actions">
                  <button className="text-blue-600 hover:text-blue-800 p-1 modal-touch-target" title="Edit">
                    <i className="fas fa-edit text-sm"></i>
                  </button>
                  <button className="text-green-600 hover:text-green-800 p-1 modal-touch-target" title="Confirm">
                    <i className="fas fa-check text-sm"></i>
                  </button>
                  <button className="text-red-600 hover:text-red-800 p-1 modal-touch-target" title="Cancel">
                    <i className="fas fa-times text-sm"></i>
                  </button>
                </div>
              )
            }
          ]}
          data={appointments}
        />
      </div>

      {/* Appointment Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card card-responsive card-shadow text-center">
          <div className="text-xl md:text-2xl font-bold text-blue-600">{appointments.filter(a => a.status === 'Confirmed').length}</div>
          <div className="text-sm text-gray-500">Confirmed</div>
        </div>
        <div className="card card-responsive card-shadow text-center">
          <div className="text-xl md:text-2xl font-bold text-yellow-600">{appointments.filter(a => a.status === 'Pending').length}</div>
          <div className="text-sm text-gray-500">Pending</div>
        </div>
        <div className="card card-responsive card-shadow text-center">
          <div className="text-xl md:text-2xl font-bold text-green-600">8</div>
          <div className="text-sm text-gray-500">Completed</div>
        </div>
        <div className="card card-responsive card-shadow text-center">
          <div className="text-xl md:text-2xl font-bold text-red-600">0</div>
          <div className="text-sm text-gray-500">Cancelled</div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentScheduling