import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const Appointments = () => {
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [formData, setFormData] = useState({
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
        { 
          id: 'APT-3001', 
          doctor: 'Dr. Meena Rao', 
          department: 'Cardiology',
          date: '2023-10-25', 
          time: '10:30 AM', 
          reason: 'Follow-up Consultation', 
          type: 'Follow-up', 
          status: 'Confirmed',
          notes: 'Bring previous reports'
        },
        { 
          id: 'APT-3002', 
          doctor: 'Dr. Sharma', 
          department: 'Orthopedics',
          date: '2023-10-28', 
          time: '2:00 PM', 
          reason: 'X-Ray Review', 
          type: 'Regular', 
          status: 'Scheduled',
          notes: 'Fasting not required'
        },
        { 
          id: 'APT-3003', 
          doctor: 'Dr. Menon', 
          department: 'Neurology',
          date: '2023-10-30', 
          time: '11:00 AM', 
          reason: 'Routine Checkup', 
          type: 'Regular', 
          status: 'Pending',
          notes: 'Bring MRI CD'
        },
        { 
          id: 'APT-3004', 
          doctor: 'Dr. Gupta', 
          department: 'General Medicine',
          date: '2023-10-20', 
          time: '9:30 AM', 
          reason: 'Fever & Cold', 
          type: 'Urgent', 
          status: 'Completed',
          notes: 'Prescription given'
        }
      ])
      setLoading(false)
    }, 1000)
  }

  const handleNewAppointment = () => {
    setSelectedAppointment(null)
    setFormData({
      doctorId: '',
      date: new Date().toISOString().split('T')[0],
      time: '',
      reason: '',
      type: 'Regular'
    })
    setShowForm(true)
  }

  const handleReschedule = (appointment) => {
    setSelectedAppointment(null)
    setFormData({
      doctorId: '',
      date: appointment.date,
      time: appointment.time.includes('AM') || appointment.time.includes('PM') 
        ? convertTo24Hour(appointment.time) 
        : appointment.time,
      reason: appointment.reason,
      type: appointment.type
    })
    setShowForm(true)
  }

  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(' ')
    let [hours, minutes] = time.split(':')
    
    if (hours === '12') {
      hours = '00'
    }
    
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12
    }
    
    return `${hours}:${minutes}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newAppointment = {
      id: `APT-${Date.now().toString().slice(-4)}`,
      doctor: 'Dr. ' + formData.doctorId.split('-')[0],
      department: formData.doctorId.split('-')[1],
      date: formData.date,
      time: formatTime(formData.time),
      reason: formData.reason,
      type: formData.type,
      status: 'Pending',
      notes: ''
    }
    
    setAppointments(prev => [newAppointment, ...prev])
    alert('Appointment scheduled successfully!')
    setShowForm(false)
  }

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(prev => prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'Cancelled' }
          : apt
      ))
    }
  }

  const handleViewDetails = (appointment) => {
    setShowForm(false)
    setSelectedAppointment(appointment)
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700"> My Appointments</h2>
          <p className="text-gray-500 text-sm mt-1">Manage and schedule your medical appointments</p>
        </div>
        <button 
          onClick={handleNewAppointment}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
        >
          <i className="fas fa-plus mr-2"></i> Schedule Appointment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

  {/* Confirmed */}
  <div className="relative bg-gradient-to-br from-white to-blue-50 p-5 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
    <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>

    <div className="relative flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Confirmed</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          {appointments.filter(a => a.status === 'Confirmed').length}
        </p>
      </div>
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
        <i className="fas fa-calendar-check text-white text-lg"></i>
      </div>
    </div>

    <div className="relative mt-4 pt-3 border-t border-blue-100">
      <p className="text-xs text-blue-700 font-medium">Scheduled & approved</p>
    </div>
  </div>

  {/* Pending */}
  <div className="relative bg-gradient-to-br from-white to-amber-50 p-5 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
    <div className="absolute top-0 right-0 w-20 h-20 bg-amber-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
    <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>

    <div className="relative flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Pending</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          {appointments.filter(a => a.status === 'Pending').length}
        </p>
      </div>
      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
        <i className="fas fa-hourglass-half text-white text-lg"></i>
      </div>
    </div>

    <div className="relative mt-4 pt-3 border-t border-amber-100">
      <p className="text-xs text-amber-700 font-medium">Awaiting confirmation</p>
    </div>
  </div>

  {/* Completed */}
  <div className="relative bg-gradient-to-br from-white to-emerald-50 p-5 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
    <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
    <div className="absolute bottom-0 left-0 w-16 h-16 bg-emerald-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>

    <div className="relative flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Completed</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          {appointments.filter(a => a.status === 'Completed').length}
        </p>
      </div>
      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
        <i className="fas fa-check-circle text-white text-lg"></i>
      </div>
    </div>

    <div className="relative mt-4 pt-3 border-t border-emerald-100">
      <p className="text-xs text-emerald-700 font-medium">Successfully handled</p>
    </div>
  </div>

  {/* Cancelled */}
  <div className="relative bg-gradient-to-br from-white to-rose-50 p-5 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
    <div className="absolute top-0 right-0 w-20 h-20 bg-rose-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
    <div className="absolute bottom-0 left-0 w-16 h-16 bg-rose-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>

    <div className="relative flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-rose-600 uppercase tracking-wider">Cancelled</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          {appointments.filter(a => a.status === 'Cancelled').length}
        </p>
      </div>
      <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center shadow-md">
        <i className="fas fa-times-circle text-white text-lg"></i>
      </div>
    </div>

    <div className="relative mt-4 pt-3 border-t border-rose-100">
      <p className="text-xs text-rose-700 font-medium">Patient unavailable</p>
    </div>
  </div>

</div>


      {/* Appointments List */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h3 className="font-semibold text-gray-800">All Appointments</h3>
            <div className="flex items-center gap-2">
              <select className="border rounded-lg px-3 py-2 text-sm">
                <option>All Status</option>
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase">Doctor</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase">Date & Time</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase">Reason</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.map(appointment => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{appointment.doctor}</p>
                      <p className="text-sm text-gray-600">{appointment.department}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{appointment.date}</p>
                      <p className="text-sm text-gray-600">{appointment.time}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-700">{appointment.reason}</p>
                    {appointment.notes && (
                      <p className="text-xs text-gray-500 mt-1">{appointment.notes}</p>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                      appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewDetails(appointment)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      {appointment.status !== 'Cancelled' && appointment.status !== 'Completed' && (
                        <>
                          <button 
                            onClick={() => handleReschedule(appointment)}
                            className="p-1 text-green-600 hover:text-green-800"
                            title="Reschedule"
                          >
                            <i className="fas fa-clock"></i>
                          </button>
                          <button 
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="p-1 text-red-600 hover:text-red-800"
                            title="Cancel"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Appointment Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Schedule Appointment</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor *</label>
                  <select
                    value={formData.doctorId}
                    onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Choose a doctor</option>
                    <option value="Meena-Cardiology">Dr. Meena Rao - Cardiology</option>
                    <option value="Sharma-Orthopedics">Dr. Sharma - Orthopedics</option>
                    <option value="Menon-Neurology">Dr. Menon - Neurology</option>
                    <option value="Gupta-General">Dr. Gupta - General Medicine</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Regular">Regular</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Urgent">Urgent</option>
                    <option value="New">New Patient</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit *</label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    placeholder="Describe your symptoms or reason for appointment"
                    required
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Schedule Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Appointment Details</h3>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Appointment ID</p>
                    <p className="font-medium">{selectedAppointment.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedAppointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      selectedAppointment.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                      selectedAppointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedAppointment.status}
                    </span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">Doctor Information</p>
                  <p className="font-medium">{selectedAppointment.doctor}</p>
                  <p className="text-sm text-gray-600">{selectedAppointment.department}</p>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-medium">{selectedAppointment.date} at {selectedAppointment.time}</p>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">Appointment Type</p>
                  <p className="font-medium">{selectedAppointment.type}</p>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">Reason</p>
                  <p className="font-medium">{selectedAppointment.reason}</p>
                  {selectedAppointment.notes && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Notes</p>
                      <p className="text-sm text-gray-700">{selectedAppointment.notes}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end gap-3 pt-6 border-t">
                  {selectedAppointment.status !== 'Cancelled' && selectedAppointment.status !== 'Completed' && (
                    <>
                      <button
                        onClick={() => {
                          handleReschedule(selectedAppointment)
                          setSelectedAppointment(null)
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => {
                          handleCancelAppointment(selectedAppointment.id)
                          setSelectedAppointment(null)
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Cancel Appointment
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Appointments