// DoctorOverview.jsx (Telemedicine)
import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

/* ================= TELECONSULTATION TREND CHART ================= */
const AppointmentChart = ({ data = [] }) => {
  const normalized = React.useMemo(() => {
    if (!data.length) return []
    return data.map((d, i) => ({
      label: d.label,
      video: d.value + (i % 3) * 8,
      chat: d.value - (i % 2) * 6,
    }))
  }, [data])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={normalized} margin={{ top: 36, right: 18, left: 10, bottom: 8 }}>
        <defs>
          <linearGradient id="videoGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="chatGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
        <XAxis dataKey="label" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip />
        <Legend />

        <Area type="monotone" dataKey="chat" name="Chat Consultations" stroke="#059669" fill="url(#chatGrad)" />
        <Area type="monotone" dataKey="video" name="Video Consultations" stroke="#1D4ED8" fill="url(#videoGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

/* ================= DOCTOR OVERVIEW ================= */
const DoctorOverview = ({ onPageChange }) => {
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setDashboardData({
        stats: {
          liveConsultations: 3,
          todaysTeleconsults: 14,
          pendingReports: 4,
          messages: 9,
        },
        consultations: [
          { id: 1, patient: 'Ravi Kumar', time: '10:30 AM', mode: 'Video', status: 'Live' },
          { id: 2, patient: 'Anita Sharma', time: '11:00 AM', mode: 'Chat', status: 'Upcoming' },
          { id: 3, patient: 'Priya Singh', time: '12:00 PM', mode: 'Video', status: 'Completed' },
        ],
        chartData: [
          { label: '09:00', value: 20 },
          { label: '10:00', value: 32 },
          { label: '11:00', value: 28 },
          { label: '12:00', value: 45 },
          { label: '13:00', value: 40 },
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
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 animate-fade-in">
      <ToastContainer
  position="bottom-right"
  autoClose={3000}
  pauseOnHover
  theme="colored"
/>

      <h2 className="text-2xl font-semibold text-gray-700">
        <i className="fas fa-user-md text-blue-500 mr-3"></i>
        Telemedicine Doctor Dashboard
      </h2>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

  {/* Live Consultations */}
  <div
    onClick={() => {
      toast.info("Opening live consultations");
      onPageChange?.("consultation");
    }}
    className="relative bg-white rounded-xl p-5 border shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent" />

    <span className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
      Live
    </span>

    <div className="relative flex justify-between items-end">
      <div>
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 mb-3">
          <i className="fas fa-video text-white"></i>
        </div>
        <p className="text-sm text-gray-500">Live Consultations</p>
        <p className="text-2xl font-bold">{dashboardData.stats.liveConsultations}</p>
        <p className="text-xs text-gray-400 mt-1">Currently Active</p>
      </div>

      <div className="flex items-end gap-1 h-14">
        {[6,10,14,9,16].map((h,i)=>(
          <div key={i} style={{height:`${h}px`}} className="w-1.5 bg-blue-500 rounded" />
        ))}
      </div>
    </div>
  </div>

  {/* Today's Consults */}
  <div
    onClick={() => {
      toast.success("Viewing today's consultations");
      onPageChange?.("appointments");
    }}
    className="relative bg-white rounded-xl p-5 border shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent" />

    <span className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
      +12%
    </span>

    <div className="relative flex justify-between items-end">
      <div>
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 mb-3">
          <i className="fas fa-calendar-check text-white"></i>
        </div>
        <p className="text-sm text-gray-500">Today's Consults</p>
        <p className="text-2xl font-bold">{dashboardData.stats.todaysTeleconsults}</p>
        <p className="text-xs text-gray-400 mt-1">Today</p>
      </div>

      <svg width="70" height="40">
        <polyline
          points="0,28 12,22 24,24 36,18 48,20 60,14"
          fill="none"
          stroke="#16a34a"
          strokeWidth="2"
        />
      </svg>
    </div>
  </div>

  {/* Pending Reports */}
  <div
    onClick={() => {
      toast.warning("Viewing pending reports");
      onPageChange?.("reports");
    }}
    className="relative bg-white rounded-xl p-5 border shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent" />

    <span className="absolute top-4 right-4 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded">
      Pending
    </span>

    <div className="relative flex justify-between items-end">
      <div>
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 mb-3">
          <i className="fas fa-file-medical text-white"></i>
        </div>
        <p className="text-sm text-gray-500">Pending Reports</p>
        <p className="text-2xl font-bold">{dashboardData.stats.pendingReports}</p>
        <p className="text-xs text-gray-400 mt-1">Needs Review</p>
      </div>

      <div className="flex items-end gap-1 h-14">
        {[12,9,6,8,5].map((h,i)=>(
          <div key={i} style={{height:`${h}px`}} className="w-1.5 bg-yellow-500 rounded" />
        ))}
      </div>
    </div>
  </div>

  {/* Messages */}
  <div
    onClick={() => {
      toast.info("Opening patient messages");
      onPageChange?.("messages");
    }}
    className="relative bg-white rounded-xl p-5 border shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent" />

    <span className="absolute top-4 right-4 bg-purple-500 text-white text-xs px-2 py-0.5 rounded">
      New
    </span>

    <div className="relative flex justify-between items-end">
      <div>
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 mb-3">
          <i className="fas fa-comments text-white"></i>
        </div>
        <p className="text-sm text-gray-500">Messages</p>
        <p className="text-2xl font-bold">{dashboardData.stats.messages}</p>
        <p className="text-xs text-gray-400 mt-1">Unread</p>
      </div>

      <svg width="70" height="40">
        <polyline
          points="0,30 10,20 20,24 30,14 40,18 50,10"
          fill="none"
          stroke="#7c3aed"
          strokeWidth="2"
        />
      </svg>
    </div>
  </div>

</div>

      {/* CONSULTATIONS */}
      <div className="bg-white p-4 rounded border card-shadow">
        <h3 className="text-lg font-semibold mb-3">Active Teleconsultations</h3>
        <div className="space-y-3">
       {dashboardData.consultations.map(c => (
  <div
    key={c.id}
    className="flex justify-between items-center p-3 border rounded hover:bg-gray-50"
  >
    <div>
      <p className="font-medium">{c.patient}</p>
      <p className="text-xs text-gray-500">{c.time} • {c.mode}</p>
    </div>

    <div className="flex items-center gap-3">
      <span
        className={`px-3 py-1 rounded-full text-xs ${
          c.status === 'Live'
            ? 'bg-green-100 text-green-700'
            : c.status === 'Upcoming'
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-gray-100 text-gray-600'
        }`}
      >
        {c.status}
      </span>

      {/* ACTION BUTTON */}
      {c.status === 'Live' && (
        <button
onClick={() => {
  toast.info("Opening live consultation");
  onPageChange?.("consultation");
}}
          className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Join
        </button>
      )}

      {c.status === 'Upcoming' && (
      <button
  onClick={() => {
    toast.info("Viewing upcoming appointment");
    onPageChange?.("appointments");
  }}
  className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
>
  View
</button>

      )}
    </div>
  </div>
))}

        </div>
      </div>

      {/* TRENDS + FEEDBACK */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-4 rounded border card-shadow">
          <h3 className="text-lg font-semibold mb-3">Teleconsultation Trends</h3>
          <div className="h-[380px]">
            <AppointmentChart data={dashboardData.chartData} />
          </div>
        </div>
        
<div className="bg-white p-5 rounded border card-shadow">
  <h3 className="text-lg font-semibold mb-4">Patient Feedback</h3>

  {/* RATING */}
  <div className="flex flex-col items-center mb-4">
    <div className="text-4xl font-bold text-green-600">
      {dashboardData.feedback.rating}
    </div>

    <div className="flex text-yellow-400 mt-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className="fas fa-star"></i>
      ))}
    </div>

    <p className="text-sm text-gray-500 mt-1">Overall Rating</p>
  </div>

  {/* DONUT – CENTERED */}
  <div className="flex justify-center mb-5">
    <div className="w-[140px] h-[140px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dashboardData.feedback.breakdown}
            dataKey="value"
            innerRadius={55}
            outerRadius={70}
            paddingAngle={2}
          >
            {dashboardData.feedback.breakdown.map((f, i) => (
              <Cell key={i} fill={f.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* LEGEND */}
  <div className="mt-4 space-y-3 text-sm">
    {dashboardData.feedback.breakdown.map((f, i) => (
      <div key={i} className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: f.color }}
          />
          <span className="text-[15px]">{f.name}</span>
        </div>
        <span className="font-medium">{f.value}%</span>
      </div>
    ))}
  </div>

  {/* BUTTON */}
  <button
    onClick={() => {
      toast.info("Opening patient feedback details")
      onPageChange?.("feedback")
    }}
    className="mt-5 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
  >
    View Detailed Feedback
  </button>
</div>





      </div>
    </div>
  )
}

/* ================= SMALL STAT CARD ================= */
const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-4 rounded border card-shadow flex items-center gap-4">
    <div className={`p-3 rounded-lg bg-${color}-100`}>
      <i className={`fas ${icon} text-${color}-600 text-xl`}></i>
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
)

export default DoctorOverview
