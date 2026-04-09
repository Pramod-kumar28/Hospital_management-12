import React, { useState, useEffect, useRef } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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
    referralId: '',
    department: '',
    doctorId: '',
    date: '',
    time: '',
    reason: '',
    type: ''
  })

  // Searchable Dropdown State
  const [patientSearchTerm, setPatientSearchTerm] = useState('')
  const [isPatientDropdownOpen, setIsPatientDropdownOpen] = useState(false)
  const patientDropdownRef = useRef(null)

  // Searchable Dropdown State for Department and Doctor
  const [deptSearchTerm, setDeptSearchTerm] = useState('')
  const [isDeptDropdownOpen, setIsDeptDropdownOpen] = useState(false)
  const deptDropdownRef = useRef(null)

  const [docSearchTerm, setDocSearchTerm] = useState('')
  const [isDocDropdownOpen, setIsDocDropdownOpen] = useState(false)
  const docDropdownRef = useRef(null)

  // Mock patient data with Referral IDs
  const PATIENTS = [
    { id: '1', name: 'Ravi Kumar', referralId: 'REF-2023-001' },
    { id: '2', name: 'Anita Sharma', referralId: 'REF-2023-002' },
    { id: '3', name: 'Suresh Patel', referralId: 'REF-2023-003' },
    { id: '4', name: 'John Doe', referralId: 'REF-2023-004' }
  ]

  // Centralized Doctor and Department data
  const DOCTORS = [
    { id: '1', name: 'Dr. Meena Rao', department: 'Cardiology' },
    { id: '2', name: 'Dr. Sharma', department: 'Orthopedics' },
    { id: '3', name: 'Dr. Menon', department: 'Neurology' },
    { id: '4', name: 'Dr. Patel', department: 'Cardiology' },
    { id: '5', name: 'Dr. Joshi', department: 'Neurology' }
  ]

  const DEPARTMENTS = [...new Set(DOCTORS.map(d => d.department))]

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

  const getPatientName = (patientName) => {
    return PATIENTS.find(p => p.name === patientName)?.name || patientName || 'Unknown Patient'
  }

  const handlePatientChange = (e) => {
    const selectedName = e.target.value
    const patient = PATIENTS.find(p => p.name === selectedName)
    
    setFormData({ 
      ...formData, 
      patientId: selectedName, 
      referralId: patient?.referralId || '' 
    })
    setPatientSearchTerm(selectedName)
  }

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Patient Filter
      if (patientDropdownRef.current && !patientDropdownRef.current.contains(event.target)) {
        setIsPatientDropdownOpen(false)
      }
      // Department Filter
      if (deptDropdownRef.current && !deptDropdownRef.current.contains(event.target)) {
        setIsDeptDropdownOpen(false)
      }
      // Doctor Filter
      if (docDropdownRef.current && !docDropdownRef.current.contains(event.target)) {
        setIsDocDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelectPatient = (patient) => {
    setFormData({
      ...formData,
      patientId: patient.name,
      referralId: patient.referralId || ''
    })
    setPatientSearchTerm(patient.name)
    setIsPatientDropdownOpen(false)
  }

  const handleSelectDept = (dept) => {
    setFormData({
      ...formData,
      department: dept,
      doctorId: ''
    })
    setDeptSearchTerm(dept)
    setDocSearchTerm('') // Clear doctor search when department changes
    setIsDeptDropdownOpen(false)
  }

  const handleSelectDoc = (doc) => {
    setFormData({
      ...formData,
      doctorId: doc.id
    })
    setDocSearchTerm(doc.name)
    setIsDocDropdownOpen(false)
  }

  const filteredPatients = PATIENTS.filter(p =>
    p.name.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
    p.referralId.toLowerCase().includes(patientSearchTerm.toLowerCase())
  )

  const filteredDepartments = DEPARTMENTS.filter(dept =>
    dept.toLowerCase().includes(deptSearchTerm.toLowerCase())
  )

  const filteredDoctors = DOCTORS.filter(d =>
    d.department === formData.department &&
    d.name.toLowerCase().includes(docSearchTerm.toLowerCase())
  )

  const getDoctorName = (doctorId) => {
    return DOCTORS.find(d => d.id === doctorId)?.name || 'Unknown Doctor'
  }

  const handleDepartmentChange = (e) => {
    setFormData({ 
      ...formData, 
      department: e.target.value,
      doctorId: '' // Reset doctor when department changes
    })
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
      referralId: '',
      department: '',
      doctorId: '',
      date: '',
      time: '',
      reason: '',
      type: 'Regular'
    })
    setPatientSearchTerm('')
    setDeptSearchTerm('')
    setDocSearchTerm('')
  }

  // Handle view appointment
  const handleViewAppointment = (appointment) => {
    setShowForm(false) // Close form modal if open
    setSelectedAppointment(appointment) // Open details modal
  }

  // Handle reschedule - only open form modal
  const handleReschedule = (appointment) => {
    setSelectedAppointment(null) // Close details modal
    const doctorObj = DOCTORS.find(d => d.id === appointment.doctorId)
    setFormData({
      patientId: appointment.patient || '', // Use name since we switched to names
      referralId: appointment.referralId || PATIENTS.find(p => p.name === appointment.patient)?.referralId || '',
      department: doctorObj?.department || '',
      doctorId: appointment.doctorId || '',
      date: appointment.date,
      time: appointment.time.includes('AM') || appointment.time.includes('PM')
        ? convertTo24Hour(appointment.time)
        : appointment.time,
      reason: appointment.reason,
      type: appointment.type
    })
    setPatientSearchTerm(appointment.patient || '')
    setDeptSearchTerm(doctorObj?.department || '')
    setDocSearchTerm(doctorObj?.name || '')
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
      referralId: '',
      department: '',
      doctorId: '',
      date: new Date().toISOString().split('T')[0], // Today's date
      time: '',
      reason: '',
      type: 'Regular'
    })
    setPatientSearchTerm('')
    setDeptSearchTerm('')
    setDocSearchTerm('')
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
          <h2 className="text-xl md:text-2xl lg:text-2xl font-semibold text-gray-700">Appointment Scheduling</h2>
          <button
            onClick={handleNewAppointment}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center transition-colors"
          >
            <AddIcon className="mr-1" style={{ fontSize: '1.25rem' }} /> Schedule Appointment
          </button>
        </div>

        {/* Appointment Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {/* Confirmed */}
          <div className="relative bg-gradient-to-br from-white to-blue-50 p-5 rounded-2xl border border-blue-200 
                  hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>

            <div className="text-3xl font-bold text-blue-600">
              {appointments.filter(a => a.status === 'Confirmed').length}
            </div>
            <div className="text-sm font-medium text-gray-600 mt-1">
              Confirmed
            </div>
            <div className="text-xs text-blue-500 mt-1">
              Active appointments
            </div>
          </div>

          {/* Pending */}
          <div className="relative bg-gradient-to-br from-white to-yellow-50 p-5 rounded-2xl border border-yellow-200 
                  hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500"></div>

            <div className="text-3xl font-bold text-yellow-600">
              {appointments.filter(a => a.status === 'Pending').length}
            </div>
            <div className="text-sm font-medium text-gray-600 mt-1">
              Pending
            </div>
            <div className="text-xs text-yellow-500 mt-1">
              Awaiting confirmation
            </div>
          </div>

          {/* Completed */}
          <div className="relative bg-gradient-to-br from-white to-green-50 p-5 rounded-2xl border border-green-200 
                  hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>

            <div className="text-3xl font-bold text-green-600">
              {appointments.filter(a => a.status === 'Completed').length}
            </div>
            <div className="text-sm font-medium text-gray-600 mt-1">
              Completed
            </div>
            <div className="text-xs text-green-500 mt-1">
              Successfully served
            </div>
          </div>

          {/* Cancelled */}
          <div className="relative bg-gradient-to-br from-white to-red-50 p-5 rounded-2xl border border-red-200 
                  hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>

            <div className="text-3xl font-bold text-red-600">
              {appointments.filter(a => a.status === 'Cancelled').length}
            </div>
            <div className="text-sm font-medium text-gray-600 mt-1">
              Cancelled
            </div>
            <div className="text-xs text-red-500 mt-1">
              Not attended
            </div>
          </div>

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
                  <span className={`px-2 py-1 rounded-full text-xs ${value === 'Urgent' ? 'bg-red-100 text-red-800' :
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
                    <span className={`px-2 py-1 rounded-full text-xs ${value === 'Confirmed' ? 'bg-green-100 text-green-800' :
                        value === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          value === 'Completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                      }`}>
                      {value}
                    </span>
                    {value === 'Pending' && (
                      <button
                        onClick={() => handleStatusChange(row.id, 'Confirmed')}
                        className="text-xs text-green-600 hover:text-green-800 transition-colors"
                        title="Confirm"
                      >
                        <CheckIcon style={{ fontSize: '1rem' }} />
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
                      className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                      title="View Details"
                    >
                      <VisibilityIcon style={{ fontSize: '1.1rem' }} />
                    </button>
                    {row.status !== 'Cancelled' && row.status !== 'Completed' && (
                      <>
                        <button
                          onClick={() => handleReschedule(row)}
                          className="p-1 text-green-600 hover:text-green-800 transition-colors"
                          title="Reschedule"
                        >
                          <EditIcon style={{ fontSize: '1.1rem' }} />
                        </button>
                        <button
                          onClick={() => handleCancelAppointment(row.id)}
                          className="p-1 text-red-600 hover:text-red-800 transition-colors"
                          title="Cancel"
                        >
                          <CloseIcon style={{ fontSize: '1.1rem' }} />
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
            <div className="relative" ref={patientDropdownRef}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Patient Name or ID..."
                  value={patientSearchTerm}
                  onChange={(e) => {
                    setPatientSearchTerm(e.target.value)
                    setIsPatientDropdownOpen(true)
                  }}
                  onFocus={() => setIsPatientDropdownOpen(true)}
                  className="w-full p-2 pr-10 border rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  required
                />
                <div 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors"
                  onClick={() => setIsPatientDropdownOpen(!isPatientDropdownOpen)}
                >
                  <KeyboardArrowDownIcon />
                </div>
              </div>

              {/* Patient Dropdown List */}
              {isPatientDropdownOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map(p => (
                      <div
                        key={p.id}
                        onClick={() => handleSelectPatient(p)}
                        className="p-3 hover:bg-blue-50 cursor-pointer border-b last:border-0 border-gray-100 transition-colors"
                      >
                        <div className="font-medium text-gray-800">{p.name}</div>
                        <div className="text-xs text-gray-500">{p.referralId || 'New Patient'}</div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 italic">
                      No patients found matching "{patientSearchTerm}"
                    </div>
                  )}
                  {/* Option to create new if not in list */}
                  {!PATIENTS.some(p => p.name === patientSearchTerm) && patientSearchTerm && (
                    <div
                      onClick={() => handleSelectPatient({ id: 'new', name: patientSearchTerm, referralId: '' })}
                      className="p-3 bg-gray-50 hover:bg-blue-50 text-blue-600 cursor-pointer sticky bottom-0 border-t border-gray-200 font-medium flex items-center transition-colors"
                    >
                      <AddCircleOutlineIcon className="mr-2" style={{ fontSize: '1.2rem' }} />
                      Use "{patientSearchTerm}" as New Patient
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Referral ID <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="referralId"
                value={formData.referralId}
                readOnly={formData.patientId !== 'New Patient'}
                onChange={(e) => setFormData({ ...formData, referralId: e.target.value })}
                className={`w-full p-2 border rounded outline-none transition-all ${formData.patientId !== 'New Patient' ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
                placeholder="ID Example: REF-1001"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative" ref={deptDropdownRef}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Department..."
                  value={deptSearchTerm}
                  onChange={(e) => {
                    setDeptSearchTerm(e.target.value)
                    setIsDeptDropdownOpen(true)
                  }}
                  onFocus={() => setIsDeptDropdownOpen(true)}
                  className="w-full p-2 pr-10 border rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  required
                />
                <div 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors"
                  onClick={() => setIsDeptDropdownOpen(!isDeptDropdownOpen)}
                >
                  <KeyboardArrowDownIcon />
                </div>
              </div>

              {/* Department Dropdown List */}
              {isDeptDropdownOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                  {filteredDepartments.length > 0 ? (
                    filteredDepartments.map(dept => (
                      <div
                        key={dept}
                        onClick={() => handleSelectDept(dept)}
                        className="p-3 hover:bg-blue-50 cursor-pointer border-b last:border-0 border-gray-100 transition-colors"
                      >
                        <div className="font-medium text-gray-800">{dept}</div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 italic">
                      No departments found matching "{deptSearchTerm}"
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="relative" ref={docDropdownRef}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={formData.department ? "Search Doctor..." : "Select Department First"}
                  value={docSearchTerm}
                  disabled={!formData.department}
                  onChange={(e) => {
                    setDocSearchTerm(e.target.value)
                    setIsDocDropdownOpen(true)
                  }}
                  onFocus={() => formData.department && setIsDocDropdownOpen(true)}
                  className={`w-full p-2 pr-10 border rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all ${!formData.department ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-white'}`}
                  required
                />
                <div 
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 ${formData.department ? 'cursor-pointer hover:text-blue-500' : 'cursor-not-allowed'} transition-colors`}
                  onClick={() => formData.department && setIsDocDropdownOpen(!isDocDropdownOpen)}
                >
                  <KeyboardArrowDownIcon />
                </div>
              </div>

              {/* Doctor Dropdown List */}
              {isDocDropdownOpen && formData.department && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                  {filteredDoctors.length > 0 ? (
                    filteredDoctors.map(doc => (
                      <div
                        key={doc.id}
                        onClick={() => handleSelectDoc(doc)}
                        className="p-3 hover:bg-blue-50 cursor-pointer border-b last:border-0 border-gray-100 transition-colors"
                      >
                        <div className="font-medium text-gray-800">{doc.name}</div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 italic">
                      No doctors found in {formData.department} matching "{docSearchTerm}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="Regular">Regular</option>
                <option value="New">New Patient</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Brief reason for the appointment"
            />
          </div>
          </div>
          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time <span className="text-red-500">*</span></label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
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
                  <span className={`px-2 py-1 rounded-full text-xs ${selectedAppointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
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