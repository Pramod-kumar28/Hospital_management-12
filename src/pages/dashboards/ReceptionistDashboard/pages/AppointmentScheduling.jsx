// import React, { useState, useEffect } from 'react'
// import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
// import DataTable from '../../../../components/ui/Tables/DataTable'
// import Modal from '../../../../components/common/Modal/Modal' // Import your Modal component

// const AppointmentScheduling = () => {
//   const [loading, setLoading] = useState(true)
//   const [appointments, setAppointments] = useState([])
//   const [showForm, setShowForm] = useState(false)
//   const [formData, setFormData] = useState({
//     patientId: '',
//     doctorId: '',
//     date: '',
//     time: '',
//     reason: '',
//     type: 'Regular'
//   })

//   useEffect(() => {
//     loadAppointments()
//   }, [])

//   const loadAppointments = async () => {
//     setLoading(true)
//     setTimeout(() => {
//       setAppointments([
//         { id: 'APT-3001', patient: 'Ravi Kumar', doctor: 'Dr. Meena Rao', date: '2023-10-15', time: '10:30 AM', reason: 'Fever', type: 'Regular', status: 'Confirmed' },
//         { id: 'APT-3002', patient: 'Anita Sharma', doctor: 'Dr. Sharma', date: '2023-10-15', time: '11:00 AM', reason: 'Back Pain', type: 'New', status: 'Pending' },
//         { id: 'APT-3003', patient: 'Suresh Patel', doctor: 'Dr. Menon', date: '2023-10-15', time: '11:30 AM', reason: 'Routine Checkup', type: 'Regular', status: 'Confirmed' }
//       ])
//       setLoading(false)
//     }, 1000)
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // In real app, this would submit to backend
//     console.log('New appointment:', formData)
//     alert('Appointment scheduled successfully!')
//     setShowForm(false)
//     setFormData({
//       patientId: '',
//       doctorId: '',
//       date: '',
//       time: '',
//       reason: '',
//       type: 'Regular'
//     })
//   }

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="space-y-6 animate-fade-in">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
//         <h2 className="text-xl md:text-2xl lg:text-2xl font-semibold text-gray-700 text-responsive">📅 Appointment Scheduling</h2>
//         <button 
//           onClick={() => setShowForm(true)}
//           className="btn btn-primary btn-mobile-full sm:w-auto flex items-center justify-center"
//         >
//           <i className="fas fa-plus mr-2"></i> Schedule Appointment
//         </button>
//       </div>

//       {/* Use your Modal component instead of inline modal */}
//       <Modal
//         isOpen={showForm}
//         onClose={() => setShowForm(false)}
//         title="Schedule New Appointment"
//         size="lg"
//       >
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="form-group">
//               <label className="form-label">Patient *</label>
//               <select
//                 name="patientId"
//                 value={formData.patientId}
//                 onChange={(e) => setFormData({...formData, patientId: e.target.value})}
//                 className="form-input"
//                 required
//               >
//                 <option value="">Select Patient</option>
//                 <option value="1">Ravi Kumar</option>
//                 <option value="2">Anita Sharma</option>
//                 <option value="3">Suresh Patel</option>
//                 <option value="4">New Patient</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label className="form-label">Doctor *</label>
//               <select
//                 name="doctorId"
//                 value={formData.doctorId}
//                 onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
//                 className="form-input"
//                 required
//               >
//                 <option value="">Select Doctor</option>
//                 <option value="1">Dr. Meena Rao - Cardiology</option>
//                 <option value="2">Dr. Sharma - Orthopedics</option>
//                 <option value="3">Dr. Menon - Neurology</option>
//               </select>
//             </div>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="form-group">
//               <label className="form-label">Date *</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={(e) => setFormData({...formData, date: e.target.value})}
//                 className="form-input"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label className="form-label">Time *</label>
//               <input
//                 type="time"
//                 name="time"
//                 value={formData.time}
//                 onChange={(e) => setFormData({...formData, time: e.target.value})}
//                 className="form-input"
//                 required
//               />
//             </div>
//           </div>
          
//           <div className="form-group">
//             <label className="form-label">Appointment Type</label>
//             <select
//               name="type"
//               value={formData.type}
//               onChange={(e) => setFormData({...formData, type: e.target.value})}
//               className="form-input"
//             >
//               <option value="Regular">Regular</option>
//               <option value="New">New Patient</option>
//               <option value="Follow-up">Follow-up</option>
//               <option value="Urgent">Urgent</option>
//             </select>
//           </div>
          
//           <div className="form-group">
//             <label className="form-label">Reason for Visit *</label>
//             <input
//               type="text"
//               name="reason"
//               value={formData.reason}
//               onChange={(e) => setFormData({...formData, reason: e.target.value})}
//               className="form-input"
//               placeholder="Brief reason for the appointment"
//               required
//             />
//           </div>
          
//           <div className="flex justify-end gap-3 pt-4">
//             <button
//               type="button"
//               onClick={() => setShowForm(false)}
//               className="btn btn-secondary"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="btn btn-primary"
//             >
//               Schedule Appointment
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* Data Table with proper responsive wrapper */}
//       <div className="table-responsive">
//         <DataTable
//           columns={[
//             { key: 'id', title: 'Appointment ID', sortable: true },
//             { key: 'patient', title: 'Patient', sortable: true },
//             { key: 'doctor', title: 'Doctor', sortable: true },
//             { key: 'date', title: 'Date', sortable: true },
//             { key: 'time', title: 'Time', sortable: true },
//             { key: 'reason', title: 'Reason', sortable: true },
//             { 
//               key: 'type', 
//               title: 'Type',
//               render: (value) => (
//                 <span className={`status-badge ${
//                   value === 'Urgent' ? 'status-urgent' : 'status-pending'
//                 }`}>
//                   {value}
//                 </span>
//               )
//             },
//             { 
//               key: 'status', 
//               title: 'Status', 
//               sortable: true,
//               render: (value) => (
//                 <span className={`status-badge ${
//                   value === 'Confirmed' ? 'status-confirmed' : 'status-pending'
//                 }`}>
//                   {value}
//                 </span>
//               )
//             },
//             {
//               key: 'actions',
//               title: 'Actions',
//               render: (_, row) => (
//                 <div className="table-actions">
//                   <button className="text-blue-600 hover:text-blue-800 p-1 modal-touch-target" title="Edit">
//                     <i className="fas fa-edit text-sm"></i>
//                   </button>
//                   <button className="text-green-600 hover:text-green-800 p-1 modal-touch-target" title="Confirm">
//                     <i className="fas fa-check text-sm"></i>
//                   </button>
//                   <button className="text-red-600 hover:text-red-800 p-1 modal-touch-target" title="Cancel">
//                     <i className="fas fa-times text-sm"></i>
//                   </button>
//                 </div>
//               )
//             }
//           ]}
//           data={appointments}
//         />
//       </div>

//       {/* Appointment Statistics */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="card card-responsive card-shadow text-center">
//           <div className="text-xl md:text-2xl font-bold text-blue-600">{appointments.filter(a => a.status === 'Confirmed').length}</div>
//           <div className="text-sm text-gray-500">Confirmed</div>
//         </div>
//         <div className="card card-responsive card-shadow text-center">
//           <div className="text-xl md:text-2xl font-bold text-yellow-600">{appointments.filter(a => a.status === 'Pending').length}</div>
//           <div className="text-sm text-gray-500">Pending</div>
//         </div>
//         <div className="card card-responsive card-shadow text-center">
//           <div className="text-xl md:text-2xl font-bold text-green-600">8</div>
//           <div className="text-sm text-gray-500">Completed</div>
//         </div>
//         <div className="card card-responsive card-shadow text-center">
//           <div className="text-xl md:text-2xl font-bold text-red-600">0</div>
//           <div className="text-sm text-gray-500">Cancelled</div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AppointmentScheduling


















import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'
import Modal from '../../../../components/common/Modal/Modal'

const AppointmentScheduling = () => {
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
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
        { 
          id: 'APT-3001', 
          patientId: '1',
          patient: 'Ravi Kumar', 
          doctorId: '1',
          doctor: 'Dr. Meena Rao', 
          date: '2023-10-15', 
          time: '10:30 AM', 
          reason: 'Fever', 
          type: 'Regular', 
          status: 'Confirmed' 
        },
        { 
          id: 'APT-3002', 
          patientId: '2',
          patient: 'Anita Sharma', 
          doctorId: '2',
          doctor: 'Dr. Sharma', 
          date: '2023-10-15', 
          time: '11:00 AM', 
          reason: 'Back Pain', 
          type: 'New', 
          status: 'Pending' 
        },
        { 
          id: 'APT-3003', 
          patientId: '3',
          patient: 'Suresh Patel', 
          doctorId: '3',
          doctor: 'Dr. Menon', 
          date: '2023-10-15', 
          time: '11:30 AM', 
          reason: 'Routine Checkup', 
          type: 'Regular', 
          status: 'Confirmed' 
        }
      ])
      setLoading(false)
    }, 1000)
  }

  const generateAppointmentId = () => {
    const lastId = appointments.length > 0 
      ? parseInt(appointments[appointments.length - 1].id.split('-')[1])
      : 3000
    return `APT-${lastId + 1}`
  }

  const getPatientName = (patientId) => {
    const patients = [
      { id: '1', name: 'Ravi Kumar' },
      { id: '2', name: 'Anita Sharma' },
      { id: '3', name: 'Suresh Patel' },
      { id: '4', name: 'New Patient' }
    ]
    return patients.find(p => p.id === patientId)?.name || 'Unknown Patient'
  }

  const getDoctorName = (doctorId) => {
    const doctors = [
      { id: '1', name: 'Dr. Meena Rao', specialty: 'Cardiology' },
      { id: '2', name: 'Dr. Sharma', specialty: 'Orthopedics' },
      { id: '3', name: 'Dr. Menon', specialty: 'Neurology' }
    ]
    return doctors.find(d => d.id === doctorId)?.name || 'Unknown Doctor'
  }

  const formatTime = (timeString) => {
    if (!timeString) return ''
    // If time is in 24-hour format (HH:MM), convert to 12-hour format
    if (timeString.includes(':')) {
      const [hours, minutes] = timeString.split(':')
      const hour = parseInt(hours)
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const hour12 = hour % 12 || 12
      return `${hour12}:${minutes} ${ampm}`
    }
    return timeString
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newAppointment = {
      id: generateAppointmentId(),
      patientId: formData.patientId,
      patient: getPatientName(formData.patientId),
      doctorId: formData.doctorId,
      doctor: getDoctorName(formData.doctorId),
      date: formData.date,
      time: formatTime(formData.time),
      reason: formData.reason,
      type: formData.type,
      status: 'Pending' // New appointments should start as Pending
    }
    
    // Add the new appointment to the array
    setAppointments(prev => [...prev, newAppointment])
    
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

  // Handle view appointment
  const handleViewAppointment = (appointment) => {
    setShowForm(false) // Close form modal if open
    setSelectedAppointment(appointment) // Open details modal
  }

  // Handle reschedule - only open form modal
  const handleReschedule = (appointment) => {
    setSelectedAppointment(null) // Close details modal
    setFormData({
      patientId: appointment.patientId || '',
      doctorId: appointment.doctorId || '',
      date: appointment.date,
      time: appointment.time.includes('AM') || appointment.time.includes('PM') 
        ? convertTo24Hour(appointment.time) 
        : appointment.time,
      reason: appointment.reason,
      type: appointment.type
    })
    setShowForm(true) // Open form modal
  }

  const convertTo24Hour = (time12h) => {
    if (!time12h) return ''
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

  // Handle new appointment
  const handleNewAppointment = () => {
    setSelectedAppointment(null) // Close details modal
    setFormData({
      patientId: '',
      doctorId: '',
      date: new Date().toISOString().split('T')[0], // Today's date
      time: '',
      reason: '',
      type: 'Regular'
    })
    setShowForm(true) // Open form modal
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

  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: newStatus }
        : apt
    ))
  }

  if (loading) return <LoadingSpinner />

  return (
    <>
      {/* ---------- MAIN PAGE WRAPPER ---------- */}
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h2 className="text-xl md:text-2xl lg:text-2xl font-semibold text-gray-700"> Appointment Scheduling</h2>
          <button 
            onClick={handleNewAppointment}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center"
          >
            <i className="fas fa-plus mr-2"></i> Schedule Appointment
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg border overflow-hidden">
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
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    value === 'Urgent' ? 'bg-red-100 text-red-800' : 
                    value === 'New' ? 'bg-green-100 text-green-800' :
                    value === 'Follow-up' ? 'bg-purple-100 text-purple-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {value}
                  </span>
                )
              },
              { 
                key: 'status', 
                title: 'Status', 
                sortable: true,
                render: (value, row) => (
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      value === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                      value === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      value === 'Completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {value}
                    </span>
                    {value === 'Pending' && (
                      <button
                        onClick={() => handleStatusChange(row.id, 'Confirmed')}
                        className="text-xs text-green-600 hover:text-green-800"
                        title="Confirm"
                      >
                        <i className="fas fa-check"></i>
                      </button>
                    )}
                  </div>
                )
              },
              {
                key: 'actions',
                title: 'Actions',
                render: (_, row) => (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleViewAppointment(row)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                      title="View Details"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    {row.status !== 'Cancelled' && row.status !== 'Completed' && (
                      <>
                        <button 
                          onClick={() => handleReschedule(row)}
                          className="p-1 text-green-600 hover:text-green-800"
                          title="Reschedule"
                        >
                          <i className="fas fa-clock"></i>
                        </button>
                        <button 
                          onClick={() => handleCancelAppointment(row.id)}
                          className="p-1 text-red-600 hover:text-red-800"
                          title="Cancel"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </>
                    )}
                  </div>
                )
              }
            ]}
            data={appointments}
          />
        </div>

        {/* Appointment Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-xl md:text-2xl font-bold text-blue-600">{appointments.filter(a => a.status === 'Confirmed').length}</div>
            <div className="text-sm text-gray-500">Confirmed</div>
          </div>
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-xl md:text-2xl font-bold text-yellow-600">{appointments.filter(a => a.status === 'Pending').length}</div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-xl md:text-2xl font-bold text-green-600">
              {appointments.filter(a => a.status === 'Completed').length}
            </div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-xl md:text-2xl font-bold text-red-600">
              {appointments.filter(a => a.status === 'Cancelled').length}
            </div>
            <div className="text-sm text-gray-500">Cancelled</div>
          </div>
        </div>
      </div>

      {/* ---------- MODALS ---------- */}
      {/* Form Modal - for NEW and RESCHEDULE */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Schedule Appointment"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient *</label>
              <select
                name="patientId"
                value={formData.patientId}
                onChange={(e) => setFormData({...formData, patientId: e.target.value})}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Patient</option>
                <option value="1">Ravi Kumar</option>
                <option value="2">Anita Sharma</option>
                <option value="3">Suresh Patel</option>
                <option value="4">New Patient</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor *</label>
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
                className="w-full p-2 border rounded"
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full p-2 border rounded"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="Regular">Regular</option>
              <option value="New">New Patient</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit *</label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="Brief reason for the appointment"
              required
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Schedule Appointment
            </button>
          </div>
        </form>
      </Modal>

      {/* Details Modal - for VIEW only */}
      <Modal
        isOpen={!!selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        title="Appointment Details"
        size="md"
      >
        {selectedAppointment && (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Appointment ID</p>
                  <p className="font-medium">{selectedAppointment.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selectedAppointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                    selectedAppointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    selectedAppointment.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedAppointment.status}
                  </span>
                </div>
              </div>

              <div className="border-t pt-3">
                <p className="text-sm text-gray-500">Patient Information</p>
                <p className="font-medium">{selectedAppointment.patient}</p>
              </div>

              <div className="border-t pt-3">
                <p className="text-sm text-gray-500">Doctor Information</p>
                <p className="font-medium">{selectedAppointment.doctor}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t pt-3">
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-medium">{selectedAppointment.date} at {selectedAppointment.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium">{selectedAppointment.type}</p>
                </div>
              </div>

              <div className="border-t pt-3">
                <p className="text-sm text-gray-500">Reason</p>
                <p className="font-medium">{selectedAppointment.reason}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              {selectedAppointment.status !== 'Cancelled' && selectedAppointment.status !== 'Completed' && (
                <>
                  <button
                    onClick={() => {
                      handleReschedule(selectedAppointment)
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => {
                      handleCancelAppointment(selectedAppointment.id)
                      setSelectedAppointment(null)
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Cancel Appointment
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

export default AppointmentScheduling