// DoctorOverview.jsx
import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Tooltip,
} from 'recharts'

/**
 * Inline AppointmentChart component
 * - Placed inside this file so no separate chart file is required.
 * - Accepts `data` prop in two shapes:
 *    1) [{ label: '00:00', newPatients: 30, oldPatients: 18 }, ...]  (preferred)
 *    2) [{ label: 'Mon', value: 12 }, ...] -> will synthesize two series deterministically
 */
const AppointmentChart = ({ data = [] }) => {
  const normalized = React.useMemo(() => {
    if (!data || !data.length) return []

    const hasNew = data[0].hasOwnProperty('newPatients')
    const hasOld = data[0].hasOwnProperty('oldPatients')

    if (hasNew && hasOld) {
      return data.map((d) => ({
        label: d.label,
        newPatients: Number(d.newPatients) || 0,
        oldPatients: Number(d.oldPatients) || 0,
      }))
    }

    // Synthesize two series deterministically from single "value"
    return data.map((d, i) => {
      const base = Number(d.value ?? 0)
      const offsetA = Math.round(8 + 5 * Math.sin(i * 0.9))
      const offsetB = Math.round(3 + 4 * Math.cos(i * 0.6))
      const newPatients = Math.max(0, base + offsetA)
      const oldPatients = Math.max(0, base - offsetB)
      return {
        label: d.label,
        newPatients,
        oldPatients,
      }
    })
  }, [data])

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null
    return (
      <div className="bg-white shadow rounded p-2 text-sm border">
        <div className="font-medium mb-1">{label}</div>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                style={{
                  width: 10,
                  height: 10,
                  background: p.color,
                  display: 'inline-block',
                  borderRadius: 3,
                }}
              />
              <span className="text-xs">{p.name}</span>
            </div>
            <div className="text-xs font-semibold">{p.value}</div>
          </div>
        ))}
      </div>
    )
  }

  const renderLegend = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', gap: 18, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: '#6b7280' }}>
          <span style={{ width: 10, height: 10, background: '#7C3AED', borderRadius: 6, display: 'inline-block' }} />
          <span style={{ fontSize: 13 }}>New Patients</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: '#6b7280' }}>
          <span style={{ width: 10, height: 10, background: '#10B981', borderRadius: 6, display: 'inline-block' }} />
          <span style={{ fontSize: 13 }}>Old Patients</span>
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={normalized} margin={{ top: 36, right: 18, left: 10, bottom: 8 }}>
          <defs>
            <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.08} />
            </linearGradient>
            <linearGradient id="colorOld" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.08} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="label" axisLine={false} tickLine={false} padding={{ left: 8, right: 8 }} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} domain={[0, 'dataMax + 20']} tickCount={6} />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e6e7ea', strokeWidth: 1 }} />
          <Legend content={renderLegend} verticalAlign="top" />

          {/* Draw green first, purple on top to mimic provided image */}
          <Area type="monotone" dataKey="oldPatients" name="Old Patients" stroke="#059669" strokeWidth={2} fill="url(#colorOld)" fillOpacity={1} activeDot={{ r: 3 }} dot={false} />
          <Area type="monotone" dataKey="newPatients" name="New Patients" stroke="#5B21B6" strokeWidth={2} fill="url(#colorNew)" fillOpacity={1} activeDot={{ r: 3 }} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

/* ===========================
   DoctorOverview component
   (keeps all sections unchanged apart from using the inline AppointmentChart)
   =========================== */
const DoctorOverview = ({ onPageChange }) => {
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({})

  useEffect(() => {
    loadDashboardData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    setTimeout(() => {
      setDashboardData({
        stats: {
          todaysAppointments: 12,
          pendingReports: 4,
          upcomingSchedule: 5,
          messages: 7,
          performance: {
            appointmentsCompleted: 45,
            patientSatisfaction: 4.8,
            avgConsultationTime: '18 min',
          },
        },
        appointments: [
          { id: 1, patient: 'Ravi Kumar', time: '10:30 AM', reason: 'Fever', status: 'Confirmed', type: 'Follow-up' },
          { id: 2, patient: 'Anita Sharma', time: '11:00 AM', reason: 'Back Pain', status: 'Pending', type: 'New' },
          { id: 3, patient: 'Suresh Patel', time: '11:30 AM', reason: 'Routine Checkup', status: 'Confirmed', type: 'Regular' },
          { id: 4, patient: 'Priya Singh', time: '12:00 PM', reason: 'Migraine', status: 'Confirmed', type: 'Urgent' },
        ],
        labs: [
          { id: 1, patient: 'Ravi Kumar', test: 'Blood Test', result: 'Normal', date: '2023-10-10', status: 'Reviewed' },
          { id: 2, patient: 'Anita Sharma', test: 'X-Ray', result: 'Mild Infection', date: '2023-10-05', status: 'Pending Review' },
          { id: 3, patient: 'Suresh Patel', test: 'CT Scan', result: 'Normal', date: '2023-10-08', status: 'Reviewed' },
          { id: 4, patient: 'Rajesh Kumar', test: 'Blood Sugar', result: 'Elevated', date: '2023-10-12', status: 'Pending Review' },
        ],
        chartData: [
          // you can replace these with real time slots or keep as Mon..Sat
          { label: '00:00', value: 30 },
          { label: '01:00', value: 35 },
          { label: '02:00', value: 28 },
          { label: '03:00', value: 50 },
          { label: '04:00', value: 42 },
          { label: '05:00', value: 85 },
          { label: '06:00', value: 78 },
        ],
        emergencies: [
          { id: 1, name: 'John Doe', tag: 'Cardiac Arrest', timeAgo: '10 min ago', tagColor: 'bg-red-100 text-red-700' },
          { id: 2, name: 'Sarah Smith', tag: 'Severe Trauma', timeAgo: '25 min ago', tagColor: 'bg-amber-100 text-amber-700' },
          { id: 3, name: 'Mike Johnson', tag: 'Stroke', timeAgo: '45 min ago', tagColor: 'bg-pink-100 text-pink-700' },
          { id: 4, name: 'Emily Davis', tag: 'Severe Burns', timeAgo: '1 hr ago', tagColor: 'bg-amber-100 text-amber-700' },
        ],
        todos: [
          { id: 1, title: 'Prepare for medical meeting', priority: 'High', done: false },
          { id: 2, title: 'Answer patient queries', priority: 'Normal', done: false },
          { id: 3, title: 'Attend medical staff meeting', priority: 'High', done: false },
          { id: 4, title: 'Update medical records', priority: 'High', done: true },
          { id: 5, title: 'Plan continuing medical education', priority: 'Low', done: false },
        ],
        doctors: [
          { id: 1, name: 'Dr. Jay Soni', degree: 'MBBS,MD', status: 'Available', avatar: null },
          { id: 2, name: 'Dr. Sarah Sn', degree: 'BDS,MDS', status: 'Absent', avatar: null },
          { id: 3, name: 'Dr. Megha T', degree: 'BHMS', status: 'Available', avatar: null },
          { id: 4, name: 'Dr. John Deo', degree: 'MBBS,MS', status: 'Available', avatar: null },
          { id: 5, name: 'Dr. Jacob R', degree: 'MBBS,MD', status: 'Absent', avatar: null },
          { id: 6, name: 'Dr. Jay Soni', degree: 'MBBS', status: 'Available', avatar: null },
        ],
        patientsByGender: [
          { day: 'Mon', Male: 42, Female: 75 },
          { day: 'Tue', Male: 52, Female: 82 },
          { day: 'Wed', Male: 55, Female: 100 },
          { day: 'Thu', Male: 58, Female: 98 },
          { day: 'Fri', Male: 60, Female: 85 },
          { day: 'Sat', Male: 56, Female: 104 },
        ],


        topPatients: [
          {
            id: 1,
            name: 'Jesus Adams',
            totalPaid: 6589,
            appointments: 80,
            avatar: 'https://i.pravatar.cc/100?img=11',
          },
          {
            id: 2,
            name: 'Ezra Belcher',
            totalPaid: 5632,
            appointments: 60,
            avatar: 'https://i.pravatar.cc/100?img=12',
          },
          {
            id: 3,
            name: 'Glen Lentz',
            totalPaid: 4125,
            appointments: 40,
            avatar: 'https://i.pravatar.cc/100?img=13',
          },
          {
            id: 4,
            name: 'Bernard Griffith',
            totalPaid: 3140,
            appointments: 25,
            avatar: 'https://i.pravatar.cc/100?img=14',
          },
          {
            id: 5,
            name: 'John Elsass',
            totalPaid: 2654,
            appointments: 25,
            avatar: 'https://i.pravatar.cc/100?img=15',
          },
        ],

        transactions: [
          {
            id: 1,
            title: 'General Check-up',
            invoice: '#INV5889',
            amount: 234,
            platform: 'stripe',
          },
          {
            id: 2,
            title: 'Online Consultation',
            invoice: '#INV7874',
            amount: 234,
            platform: 'paypal',
          },
          {
            id: 3,
            title: 'Purchase Product',
            invoice: '#INV4458',
            amount: -69,
            platform: 'stripe',
          },
          {
            id: 4,
            title: 'Online Consultation',
            invoice: '#INV5456',
            amount: 234,
            platform: 'paypal',
          },
          {
            id: 5,
            title: 'Online Consultation',
            invoice: '#INV4557',
            amount: 234,
            platform: 'stripe',
          },
        ],

        feedback: {
          rating: 4.8,
          breakdown: [
            { name: 'Excellent', value: 68, color: '#10B981' },
            { name: 'Good', value: 24, color: '#F59E0B' },
            { name: 'Poor', value: 8, color: '#EF4444' },
          ],
        },
      })
      setLoading(false)
    }, 900)
  }

  const handleViewAllAppointments = () => {
    onPageChange && onPageChange('appointments')
  }

  const handleViewAllLabResults = () => {
    onPageChange && onPageChange('labs')
  }

  if (loading) return <LoadingSpinner />

  const totalFeedback = dashboardData.feedback.breakdown.reduce((s, b) => s + b.value, 0)

  const CustomPieTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null
    const p = payload[0]
    const percent = ((p.value / totalFeedback) * 100).toFixed(1)
    return (
      <div className="bg-white shadow rounded p-2 text-sm border">
        <div className="font-medium">{p.name}</div>
        <div className="text-gray-600">{p.value}% • {percent}% of total</div>
      </div>
    )
  }

  const pieLabel = ({ percent }) => {
    if (!percent) return null
    return `${(percent * 100).toFixed(0)}%`
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center">
        
        Doctor Dashboard
      </h2>

      {/*Stats Cards with Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        {/* Today's Appointments */}
        <div className="group p-4 rounded-xl text-white
  bg-gradient-to-br from-blue-500 to-blue-600
  hover:from-blue-600 hover:to-blue-700
  shadow-md hover:shadow-xl transition-all">

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-white/20 rounded-lg mr-4
        group-hover:scale-110 transition">
                <i className="fas fa-calendar-check text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-white/80">Today's Appointments</p>
                <p className="text-2xl font-bold mt-1">
                  {dashboardData.stats.todaysAppointments}
                </p>
              </div>
            </div>

            {/* mini bars */}
            <div className="flex items-end gap-1 h-10">
              {[4, 7, 5, 9, 6].map((h, i) => (
                <div key={i}
                  className="w-1 bg-white/40 rounded transition-all
            hover:bg-white"
                  style={{ height: `${h * 4}px` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pending Reports */}
        <div className="group p-4 rounded-xl text-white
  bg-gradient-to-br from-yellow-400 to-yellow-500
  hover:from-yellow-500 hover:to-yellow-600
  shadow-md hover:shadow-xl transition-all">

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-white/20 rounded-lg mr-4
        group-hover:scale-110 transition">
                <i className="fas fa-file-medical text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-white/80">Pending Reports</p>
                <p className="text-2xl font-bold mt-1">
                  {dashboardData.stats.pendingReports}
                </p>
              </div>
            </div>

            {/* mini line */}
            <svg width="60" height="36" className="group-hover:scale-105 transition">
              <polyline
                points="0,26 12,20 24,24 36,16 48,18 60,12"
                fill="none"
                stroke="white"
                strokeWidth="2"
                className="opacity-80 group-hover:opacity-100"
              />
            </svg>
          </div>
        </div>

        {/* Upcoming Schedule */}
        <div className="group p-4 rounded-xl text-white
  bg-gradient-to-br from-indigo-500 to-indigo-600
  hover:from-indigo-600 hover:to-indigo-700
  shadow-md hover:shadow-xl transition-all">

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-white/20 rounded-lg mr-4
        group-hover:scale-110 transition">
                <i className="fas fa-clock text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-white/80">Upcoming Schedule</p>
                <p className="text-2xl font-bold mt-1">
                  {dashboardData.stats.upcomingSchedule}
                </p>
              </div>
            </div>

            {/* mini bars */}
            <div className="flex items-end gap-1 h-10">
              {[6, 4, 8, 5, 9].map((h, i) => (
                <div key={i}
                  className="w-1 bg-white/40 rounded transition-all
            hover:bg-white"
                  style={{ height: `${h * 3}px` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="group p-4 rounded-xl text-white
  bg-gradient-to-br from-green-500 to-emerald-500
  hover:from-green-600 hover:to-emerald-600
  shadow-md hover:shadow-xl transition-all">

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-white/20 rounded-lg mr-4
        group-hover:scale-110 transition">
                <i className="fas fa-comments text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-white/80">Messages</p>
                <p className="text-2xl font-bold mt-1">
                  {dashboardData.stats.messages}
                </p>
              </div>
            </div>

            {/* mini line */}
            <svg width="60" height="36" className="group-hover:scale-105 transition">
              <polyline
                points="0,24 12,22 24,18 36,20 48,14 60,10"
                fill="none"
                stroke="white"
                strokeWidth="2"
                className="opacity-80 group-hover:opacity-100"
              />
            </svg>
          </div>
        </div>

      </div>



      {/* FIRST ROW: Today's Appointments | Recent Lab Results | Emergency Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 items-stretch">
        {/* Today's Appointments */}
        <div className="bg-white p-4 rounded border card-shadow flex flex-col">
          <h3 className="text-lg font-semibold mb-3">Today's Appointments</h3>

          <div className="flex-1 overflow-y-auto pr-1 divide-y divide-gray-200">
            {dashboardData.appointments.map((apt) => (
              <div
                key={apt.id}
                className="flex items-center justify-between py-3 px-2 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-3 ${apt.status === 'Confirmed' ? 'bg-green-900' : 'bg-yellow-500'
                      }`}
                  ></div>
                  <div>
                    <p className="font-medium">{apt.patient}</p>
                    <p className="text-xs text-gray-500">
                      {apt.time} - {apt.reason}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-2 py-1 rounded-full text-xs ${apt.status === 'Confirmed'
                      ? 'bg-green-500 text-white'
                      : 'bg-yellow-500 text-white'
                    }`}
                >
                  {apt.status}
                </span>
              </div>
            ))}
          </div>

          <button
            className="w-full mt-3 text-blue-600 text-sm flex items-center justify-center hover:text-blue-800 transition-colors"
            onClick={handleViewAllAppointments}
          >
            <i className="fas fa-arrow-right mr-1"></i> View All Appointments
          </button>
        </div>


        {/* Recent Lab Results */}
        <div className="bg-white p-4 rounded border card-shadow flex flex-col">
          <h3 className="text-lg font-semibold mb-3">Recent Lab Results</h3>

          <div className="flex-1 overflow-y-auto pr-1 divide-y divide-gray-200">
            {dashboardData.labs.slice(0, 4).map((lab) => (
              <div
                key={lab.id}
                className="flex items-center justify-between py-3 px-2 hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium">{lab.patient}</p>
                  <p className="text-xs text-gray-500">
                    {lab.test} - {lab.date}
                  </p>
                </div>

                <span
                  className={`px-2 py-1 rounded-full text-xs ${lab.status === 'Reviewed'
                      ? 'bg-green-500 text-white'
                      : 'bg-yellow-500 text-white'
                    }`}
                >
                  {lab.status}
                </span>
              </div>
            ))}
          </div>

          <button
            className="w-full mt-3 text-blue-600 text-sm flex items-center justify-center hover:text-blue-800 transition-colors"
            onClick={handleViewAllLabResults}
          >
            <i className="fas fa-arrow-right mr-1"></i> View All Results
          </button>
        </div>


        {/* Emergency Cases */}
        <div className="bg-white p-4 rounded border card-shadow flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-red-50 mr-3">
                <i className="fas fa-exclamation-triangle text-red-600"></i>
              </div>
              <h3 className="text-lg font-semibold">Emergency Cases</h3>
            </div>
            <div className="relative">
              <span className="inline-flex items-center justify-center text-xs font-semibold bg-red-600 text-white rounded-full w-6 h-6">
                {dashboardData.emergencies.length}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-100 border-t border-b border-gray-100 pr-1">
            {dashboardData.emergencies.map((emg) => (
              <div key={emg.id} className="flex items-center justify-between px-2 py-3">
                <div className="flex items-start">
                  <div className="mr-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-semibold">
                      {emg.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{emg.name}</p>
                    <p className="text-xs text-gray-500">{emg.timeAgo}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${emg.tagColor}`}>
                    {emg.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            className="mt-3 w-full text-sm text-red-600 flex items-center justify-center hover:text-red-800 transition-colors"
            onClick={() => onPageChange && onPageChange('emergencies')}
          >
            <i className="fas fa-ambulance mr-2"></i> Manage Emergencies
          </button>
        </div>
      </div>

      {/* SECOND ROW: Todo List | Doctor Status | Number Of Patients */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 items-stretch">
        {/* Todo List */}
        <div className="bg-white p-4 rounded border card-shadow flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Todo List</h3>
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() => onPageChange && onPageChange('todos')}
            >
              View All
            </button>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-100 pr-1">
            {dashboardData.todos.map((todo) => (
              <div key={todo.id} className="flex items-center justify-between px-2 py-3">
                <div className="flex items-center gap-3">
                  <div className="drag-handle text-gray-300">⋮⋮</div>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => {
                      setDashboardData((prev) => ({
                        ...prev,
                        todos: prev.todos.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t)),
                      }))
                    }}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <div>
                    <p className={`text-sm ${todo.done ? 'line-through text-gray-400' : 'text-gray-900'} font-medium`}>
                      {todo.title}
                    </p>
                    <p className="text-xs text-gray-400">...</p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${todo.priority === 'High' ? 'text-red-600' : todo.priority === 'Low' ? 'text-green-600' : 'text-gray-600'
                      }`}
                  >
                    {todo.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Status */}
        <div className="bg-white p-4 rounded border card-shadow flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Doctor Status</h3>
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() => onPageChange && onPageChange('doctors')}
            >
              View All
            </button>
          </div>

          <div className="flex-1 overflow-y-auto border-t border-b border-gray-100 pr-1">
            <table className="min-w-full text-sm">
              <thead className="hidden"></thead>
              <tbody className="divide-y divide-gray-100">
                {dashboardData.doctors.map((doc) => (
                  <tr key={doc.id}>
                    <td className="px-3 py-2 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium">
                          {doc.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{doc.name}</div>
                          <div className="text-xs text-gray-400">{doc.degree}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right align-middle">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${doc.status === 'Available' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                          }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Number Of Patients (Bar chart) */}
        <div className="bg-white p-4 rounded border card-shadow flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Number Of Patients</h3>
            <div className="text-xs text-gray-400"> </div>
          </div>

          <div className="flex-1 min-h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData.patientsByGender} margin={{ top: 6, right: 6, left: -8, bottom: 6 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} domain={[0, 120]} tickCount={7} />
                <ReTooltip formatter={(value, name) => [value, name]} wrapperStyle={{ borderRadius: 8 }} />
                <Legend verticalAlign="bottom" height={24} />
                <Bar dataKey="Male" name="Male" fill="#7C3AED" radius={[6, 6, 0, 0]} barSize={12} />
                <Bar dataKey="Female" name="Female" fill="#9CA3AF" radius={[6, 6, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#7C3AED] block"></span>
              Male
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#9CA3AF] block"></span>
              Female
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Trends Chart + Patient Feedback Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 items-stretch">
        <div className="lg:col-span-2 bg-white p-3 rounded border card-shadow flex flex-col">
          <h3 className="text-lg font-semibold mb-3">Appointment Trends</h3>

          {/* UPDATED: chart container now fills remaining card height to remove bottom space.
              min-h can be adjusted (e.g. 420px) if you want an even taller chart. */}
          <div className="flex-1 w-full min-h-[380px]">
            <AppointmentChart data={dashboardData.chartData} />
          </div>
        </div>

        {/* Patient Feedback card */}
        <div className="bg-white p-6 rounded border card-shadow flex flex-col items-center">
          <h3 className="w-full text-left text-lg font-semibold mb-4">Patient Feedback</h3>

          <div className="text-3xl font-bold text-green-600 leading-none">{dashboardData.feedback.rating.toFixed(1)}</div>

          <div className="flex items-center mt-2 mb-2">
            <div className="text-yellow-400 mr-2 text-xl">{'★'.repeat(5)}</div>
          </div>

          <div className="text-xs text-gray-400 mb-4">Overall Rating</div>

          <div style={{ width: 200, height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboardData.feedback.breakdown}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={90}
                  label={pieLabel}
                  labelLine={false}
                >
                  {dashboardData.feedback.breakdown.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <ReTooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 w-full">
            {dashboardData.feedback.breakdown.map((b, i) => (
              <div key={i} className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full" style={{ background: b.color }}></span>
                  <span className="text-gray-700">{b.name}</span>
                </div>
                <div className="text-gray-600">{b.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorOverview
