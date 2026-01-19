import React from "react";
import { toast, ToastContainer } from "react-toastify";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  Users,
  Video,
  Stethoscope,
  AlertTriangle,
  MessageCircle,
  FileText,
  HeartPulse,
} from "lucide-react";

/* ================= DATA ================= */

const consultationData = [
  { day: "Mon", consultations: 28 },
  { day: "Tue", consultations: 35 },
  { day: "Wed", consultations: 42 },
  { day: "Thu", consultations: 38 },
  { day: "Fri", consultations: 45 },
  { day: "Sat", consultations: 52 },
  { day: "Sun", consultations: 48 },
];

export default function Dashboard() {

  /* ================= CARDS ================= */

  const AnalyticsCard = ({
    title,
    value,
    percent,
    icon: Icon,
    iconBg,
    gradient,
    bars,
    linePoints,
    lineColor = "#2563eb",
    danger,
    onClick,
  }) => (
    <div
      onClick={onClick}
      className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} to-transparent`} />

      <span
        className={`absolute top-4 right-4 text-white text-xs font-semibold px-2 py-0.5 rounded ${
          danger ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {percent}
      </span>

      <div className="relative flex justify-between items-end">
        <div>
          <div className={`w-10 h-10 flex items-center justify-center rounded-full ${iconBg} mb-3`}>
            <Icon className="w-5 h-5 text-white" />
          </div>

          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
        </div>

        {bars && (
          <div className="flex items-end gap-1 h-14">
            {bars.map((h, i) => (
              <div key={i} style={{ height: `${h * 4}px` }} className="w-1.5 bg-indigo-500 rounded" />
            ))}
          </div>
        )}

        {linePoints && (
          <svg width="70" height="40">
            <polyline points={linePoints} fill="none" stroke={lineColor} strokeWidth="2" />
          </svg>
        )}
      </div>
    </div>
  );

  /* ================= HANDLERS ================= */

  const openPatients = () => toast.info("Opening patient records");
  const openConsults = () => toast.success("Opening live consultations");
  const openDoctors = () => toast.info("Opening doctor management");
  const openAlerts = () => toast.error("Viewing critical alerts");

  return (
    <div className="bg-slate-100 min-h-screen space-y-6 px-4 py-4">

      {/* TOAST */}
      <ToastContainer position="bottom-right" autoClose={3000} pauseOnHover theme="colored" />

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Telemedicine Dashboard</h1>
        <p className="text-slate-500">Remote healthcare system overview</p>
      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard
          title="Total Patients"
          value="3,482"
          percent="+14%"
          icon={Users}
          iconBg="bg-indigo-600"
          gradient="from-indigo-50"
          bars={[4, 6, 8, 7, 10]}
          onClick={openPatients}
        />

        <AnalyticsCard
          title="Today's Consultations"
          value="58"
          percent="+9%"
          icon={Video}
          iconBg="bg-green-600"
          gradient="from-green-50"
          lineColor="#22c55e"
          linePoints="0,28 12,22 24,26 36,20 48,18 60,12"
          onClick={openConsults}
        />

        <AnalyticsCard
          title="Active Doctors"
          value="24"
          percent="+5%"
          icon={Stethoscope}
          iconBg="bg-purple-600"
          gradient="from-purple-50"
          onClick={openDoctors}
        />

        <AnalyticsCard
          title="Critical Alerts"
          value="6"
          percent="High"
          danger
          icon={AlertTriangle}
          iconBg="bg-red-600"
          gradient="from-red-50"
          onClick={openAlerts}
        />
      </div>

      {/* CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-lg mb-4">Weekly Consultations</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={consultationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="consultations" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-lg mb-4">Recent Activity</h2>
          <ul className="space-y-3">
            <ActivityItem icon={Video} title="Video consultation completed" desc="Dr. Mehta with Patient #2031" />
            <ActivityItem icon={FileText} title="Prescription uploaded" desc="Hypertension treatment" />
            <ActivityItem icon={MessageCircle} title="Patient message received" desc="Follow-up query" />
            <ActivityItem icon={HeartPulse} title="Abnormal vitals detected" desc="Patient #1042" danger />
          </ul>
        </div>
      </div>

      {/* APPOINTMENTS & ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-lg mb-4">Upcoming Appointments</h2>
          <AppointmentRow name="Anil Kumar" time="10:30 AM" doctor="Dr. Sharma" />
          <AppointmentRow name="Sunita Rao" time="12:00 PM" doctor="Dr. Mehta" />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-lg mb-4">Critical Patient Alerts</h2>
          <AlertCard name="Patient #1042" issue="Low Oxygen Level" />
          <AlertCard name="Patient #2198" issue="High BP Detected" />
        </div>
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

const ActivityItem = ({ icon: Icon, title, desc, danger }) => (
  <li
    onClick={() => toast.info(title)}
    className={`flex gap-3 p-3 rounded cursor-pointer ${
      danger ? "bg-red-50" : "hover:bg-slate-50"
    }`}
  >
    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100">
      <Icon size={16} />
    </div>
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>
  </li>
);

const AppointmentRow = ({ name, time, doctor }) => (
  <div
    onClick={() => toast.info(`Opening appointment with ${name} at ${time}`)}
    className="flex justify-between items-center py-3 border-b last:border-none cursor-pointer hover:bg-slate-50"
  >
    <div>
      <p className="font-medium">{name}</p>
      <p className="text-sm text-slate-500">{doctor}</p>
    </div>
    <span className="text-blue-600 font-semibold">{time}</span>
  </div>
);

const AlertCard = ({ name, issue }) => (
  <div
    onClick={() => toast.error(issue)}
    className="p-4 mb-3 bg-red-50 rounded-lg cursor-pointer"
  >
    <p className="font-medium">{name}</p>
    <p className="text-sm text-red-600">{issue}</p>
  </div>
);
