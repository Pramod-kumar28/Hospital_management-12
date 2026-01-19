import React from "react";
import { toast } from "react-toastify";

import {
  AlertTriangle,
  Clock,
  Ban,
  Download,
  Trash2,
  ArrowRightCircle,
} from "lucide-react";

export default function ExpiryAlerts() {
  const handleExport = () =>
    toast.success("Expiry report exported successfully");

  const handleSummaryClick = (title) =>
    toast.info(`Viewing ${title.toLowerCase()}`);

  const handleDiscard = (name) => toast.error(`${name} discarded (expired)`);

  const handleTakeAction = (name) =>
    toast.warning(`Action required for ${name}`);

  const alerts = [
    {
      name: "Amoxicillin 500mg",
      code: "AMX-500",
      batch: "#AMX-7842",
      qty: 25,
      expiry: "15 Nov 2023",
      days: "7 days",
      level: "Critical",
    },
    {
      name: "Cetirizine 10mg",
      code: "CET-10",
      batch: "#CET-4521",
      qty: 40,
      expiry: "23 Nov 2023",
      days: "15 days",
      level: "Warning",
    },
    {
      name: "Metformin 500mg",
      code: "MET-500",
      batch: "#MET-9854",
      qty: 32,
      expiry: "8 Dec 2023",
      days: "30 days",
      level: "Warning",
    },
    {
      name: "Atorvastatin 20mg",
      code: "ATO-20",
      batch: "#ATO-3214",
      qty: 18,
      expiry: "15 Dec 2023",
      days: "37 days",
      level: "Monitor",
    },
    {
      name: "Ibuprofen 400mg",
      code: "IBU-400",
      batch: "#IBU-1254",
      qty: 12,
      expiry: "5 Nov 2023",
      days: "Expired",
      level: "Expired",
    },
  ];

  const badgeStyle = (level) => {
    if (level === "Critical") return "bg-red-100 text-red-700";
    if (level === "Warning") return "bg-yellow-100 text-yellow-700";
    if (level === "Monitor") return "bg-green-100 text-green-700";
    return "bg-gray-200 text-gray-700";
  };

  const daysStyle = (days) => {
    if (days.includes("Expired")) return "text-gray-600 font-semibold";
    if (days.includes("7")) return "text-red-600 font-semibold";
    if (days.includes("15") || days.includes("30"))
      return "text-yellow-600 font-semibold";
    return "text-green-600 font-semibold";
  };

  return (
    <div className="bg-slate-100 min-h-screen space-y-6 px-3 sm:px-6 py-4">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Expiry Alerts</h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Monitor medicines nearing expiry date
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 w-full sm:w-auto"
        >
          <Download size={16} />
          Export Expiry Report
        </button>
      </div>

    {/* SUMMARY (Modern Analytics Style) */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

  <ExpiryStat
    title="Expiring in 30 days"
    value="8"
    percent="Critical"
    icon={AlertTriangle}
    iconBg="bg-red-600"
    gradient="from-red-50"
    bars={[12, 10, 14, 16, 18]}
  />

  <ExpiryStat
    title="Expiring in 60 days"
    value="15"
    percent="Warning"
    icon={Clock}
    iconBg="bg-yellow-500"
    gradient="from-yellow-50"
    lineColor="#f59e0b"
    linePoints="0,28 12,24 24,26 36,20 48,18 60,14"
  />

  <ExpiryStat
    title="Already Expired"
    value="3"
    percent="Expired"
    danger
    icon={Ban}
    iconBg="bg-gray-600"
    gradient="from-gray-100"
    bars={[6, 5, 4, 3, 2]}
  />

</div>


      {/* TABLE */}
      <div className="bg-white rounded-xl shadow">
        {/* 🔑 RESPONSIVE FIX */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-6 py-4 text-left">Medicine</th>
                <th className="px-6 py-4 text-left">Batch</th>
                <th className="px-6 py-4 text-center">Qty</th>
                <th className="px-6 py-4 text-center">Expiry</th>
                <th className="px-6 py-4 text-center">Days Left</th>
                <th className="px-6 py-4 text-center">Level</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {alerts.map((a, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <p className="font-medium">{a.name}</p>
                    <p className="text-xs text-slate-500">{a.code}</p>
                  </td>
                  <td className="px-6 py-4">{a.batch}</td>
                  <td className="px-6 py-4 text-center">{a.qty}</td>
                  <td className="px-6 py-4 text-center">{a.expiry}</td>
                  <td className={`px-6 py-4 text-center ${daysStyle(a.days)}`}>
                    {a.days}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${badgeStyle(
                        a.level
                      )}`}
                    >
                      {a.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {a.level === "Expired" ? (
                      <Trash2
                        size={16}
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleDiscard(a.name)}
                      />
                    ) : (
                      <ArrowRightCircle
                        size={16}
                        className="text-blue-600 cursor-pointer"
                        onClick={() => handleTakeAction(a.name)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* SUMMARY CARD */

const ExpiryStat = ({
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
}) => (
  <div
    onClick={() => toast.info(`Viewing ${title}`)}
    className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition"
  >
    {/* gradient bg */}
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} to-transparent pointer-events-none`}
    />

    {/* badge */}
    <span
      className={`absolute top-4 right-4 text-white text-xs font-semibold px-2 py-0.5 rounded
        ${danger ? "bg-gray-700" : "bg-red-500"}`}
    >
      {percent}
    </span>

    <div className="relative flex justify-between items-end">
      {/* left */}
      <div>
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full ${iconBg} mb-3`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>

        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-400 mt-1">requires attention</p>
      </div>

      {/* mini bars */}
      {bars && (
        <div className="flex items-end gap-1 h-14">
          {bars.map((h, i) => (
            <div
              key={i}
              style={{ height: `${h * 3}px` }}
              className="w-1.5 bg-red-500 rounded"
            />
          ))}
        </div>
      )}

      {/* mini line */}
      {linePoints && (
        <svg width="70" height="40" viewBox="0 0 70 40">
          <polyline
            points={linePoints}
            fill="none"
            stroke={lineColor}
            strokeWidth="2"
          />
        </svg>
      )}
    </div>
  </div>
);

