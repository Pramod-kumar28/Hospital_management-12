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
        { id: 1, patient: 'Ravi Kumar', time: '10:30 AM', reason: 'Fever', status: 'Confirmed', type: 'Follow-up' },
        { id: 2, patient: 'Anita Sharma', time: '11:00 AM', reason: 'Back Pain', status: 'Pending', type: 'New' },
        { id: 3, patient: 'Suresh Patel', time: '11:30 AM', reason: 'Routine Checkup', status: 'Confirmed', type: 'Regular' },
        { id: 4, patient: 'Priya Singh', time: '12:00 PM', reason: 'Migraine', status: 'Confirmed', type: 'Urgent' },
        { id: 5, patient: 'Rajesh Kumar', time: '02:00 PM', reason: 'Diabetes Review', status: 'Pending', type: 'Follow-up' },
      ])
      setLoading(false)
    }, 800)
  }

  const handleScheduleAppointment = () => {
    setAppointments(prev => [
      {
        id: prev.length + 1,
        patient: newAppointment.patient,
        time: newAppointment.time,
        reason: newAppointment.reason,
        status: 'Pending',
        type: newAppointment.type,
      },
      ...prev,
    ])
    setIsScheduleModalOpen(false)
    resetNewAppointmentForm()
  }

  const handleEditAppointment = (apt) => {
    setSelectedAppointment(apt)
    setIsEditModalOpen(true)
  }

  const handleUpdateAppointment = () => {
    setAppointments(prev =>
      prev.map(a => (a.id === selectedAppointment.id ? selectedAppointment : a))
    )
    setIsEditModalOpen(false)
    setSelectedAppointment(null)
  }

  const handleCompleteAppointment = (id) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'Completed' } : a))
    )
  }

  const handleCancelAppointment = (id) => {
    if (window.confirm('Cancel this appointment?')) {
      setAppointments(prev =>
        prev.map(a => (a.id === id ? { ...a, status: 'Cancelled' } : a))
      )
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
    setNewAppointment(prev => ({ ...prev, [field]: value }))
  }

  const handleEditInputChange = (field, value) => {
    setSelectedAppointment(prev => ({ ...prev, [field]: value }))
  }

  const patients = ['Ravi Kumar', 'Anita Sharma', 'Suresh Patel', 'Priya Singh', 'Rajesh Kumar']
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM'
  ]
  const appointmentTypes = ['Regular', 'Follow-up', 'New', 'Urgent', 'Emergency']

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-8 animate-fade-in">

      {/* =================HEADER================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center">Appointments</h2>
            <p className="text-sm text-gray-500">
              Manage and track patient appointments
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsScheduleModalOpen(true)}
          className="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
        >
          <i className="fas fa-plus mr-2"></i>
          Schedule Appointment
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Confirmed */}
        <div className="group rounded-xl p-6 text-white
  bg-gradient-to-br from-blue-500 to-blue-700
  hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Confirmed</p>
              <p className="text-3xl font-bold mt-1">
                {appointments.filter(a => a.status === 'Confirmed').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center
      group-hover:scale-110 transition">
              <i className="fas fa-check-circle text-2xl"></i>
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="group rounded-xl p-6 text-white
  bg-gradient-to-br from-yellow-400 to-yellow-600
  hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Pending</p>
              <p className="text-3xl font-bold mt-1">
                {appointments.filter(a => a.status === 'Pending').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center
      group-hover:scale-110 transition">
              <i className="fas fa-clock text-2xl"></i>
            </div>
          </div>
        </div>

        {/* Cancelled */}
        <div className="group rounded-xl p-6 text-white
  bg-gradient-to-br from-red-500 to-red-700
  hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Cancelled</p>
              <p className="text-3xl font-bold mt-1">
                {appointments.filter(a => a.status === 'Cancelled').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center
      group-hover:scale-110 transition">
              <i className="fas fa-times-circle text-2xl"></i>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="group rounded-xl p-6 text-white
  bg-gradient-to-br from-green-500 to-emerald-600
  hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Completed</p>
              <p className="text-3xl font-bold mt-1">
                {appointments.filter(a => a.status === 'Completed').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center
      group-hover:scale-110 transition">
              <i className="fas fa-check-double text-2xl"></i>
            </div>
          </div>
        </div>

      </div>



      {/* ================= TABLE ================= */}
      <div className="bg-blue rounded-xl border card-shadow">
        <div className="px-5 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Appointment List</h3>
        </div>

        <div className="p-4">
          <DataTable
            columns={[
              { key: 'patient', title: 'Patient', sortable: true },
              { key: 'time', title: 'Time', sortable: true },
              { key: 'reason', title: 'Reason', sortable: true },
              {
                key: 'status',
                title: 'Status',
                render: (v) => (
                  <span className={`px-2 py-1 rounded-full text-xs ${v === 'Confirmed' ? 'status-confirmed' :
                      v === 'Completed' ? 'status-completed' :
                        v === 'Cancelled' ? 'status-cancelled' :
                          'status-pending'
                    }`}>
                    {v}
                  </span>
                )
              },
              {
                key: 'type',
                title: 'Type',
                render: (v) => (
                  <span className={`px-2 py-1 rounded-full text-xs ${v === 'Urgent' || v === 'Emergency'
                      ? 'status-urgent'
                      : 'bg-gray-100 text-gray-700'
                    }`}>
                    {v}
                  </span>
                )
              },
              {
                key: 'actions',
                title: 'Actions',
                render: (_, row) => (
                  <div className="flex gap-2">
                    <button onClick={() => handleEditAppointment(row)} className="icon-btn text-blue-600">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => handleCompleteAppointment(row.id)} className="icon-btn text-green-600">
                      <i className="fas fa-check"></i>
                    </button>
                    <button onClick={() => handleCancelAppointment(row.id)} className="icon-btn text-red-600">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                )
              }
            ]}
            data={appointments}
          />
        </div>
      </div>

      {/* ================= MODALS ================= */}
      {/* Schedule Modal */}
      <Modal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title="Schedule Appointment"
        size="lg"
      >
        <div className="space-y-4">
          <select className="form-input" value={newAppointment.patient}
            onChange={(e) => handleInputChange('patient', e.target.value)}>
            <option value="">Select Patient</option>
            {patients.map(p => <option key={p}>{p}</option>)}
          </select>

          <select className="form-input" value={newAppointment.time}
            onChange={(e) => handleInputChange('time', e.target.value)}>
            <option value="">Select Time</option>
            {timeSlots.map(t => <option key={t}>{t}</option>)}
          </select>

          <input className="form-input" placeholder="Reason"
            value={newAppointment.reason}
            onChange={(e) => handleInputChange('reason', e.target.value)} />

          <select className="form-input" value={newAppointment.type}
            onChange={(e) => handleInputChange('type', e.target.value)}>
            {appointmentTypes.map(t => <option key={t}>{t}</option>)}
          </select>

          <div className="flex justify-end gap-3 pt-4">
            <button className="btn-secondary" onClick={() => setIsScheduleModalOpen(false)}>
              Cancel
            </button>
            <button className="btn-primary" onClick={handleScheduleAppointment}>
              Schedule
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Appointment"
      >
        {selectedAppointment && (
          <div className="space-y-4">
            <input className="form-input"
              value={selectedAppointment.patient}
              onChange={(e) => handleEditInputChange('patient', e.target.value)} />

            <select className="form-input"
              value={selectedAppointment.status}
              onChange={(e) => handleEditInputChange('status', e.target.value)}>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>

            <div className="flex justify-end gap-3">
              <button className="btn-secondary" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleUpdateAppointment}>
                Update
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Appointments
