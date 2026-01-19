import React, { useState } from "react";
import { toast } from "react-toastify";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  IndianRupee,
  TrendingUp,
  Calendar,
  ShoppingCart,
  Download,
  CreditCard,
  Banknote,
  Smartphone,
} from "lucide-react";

/* ================= DATA ================= */

const transactions = [
  { id: "#TX-7842", customer: "Rahul Sharma", items: 4, amount: 1250, time: "10:25 AM", payment: "Card" },
  { id: "#TX-7841", customer: "Priya Patel", items: 2, amount: 650, time: "09:45 AM", payment: "Cash" },
  { id: "#TX-7840", customer: "Amit Kumar", items: 5, amount: 2150, time: "09:10 AM", payment: "Card" },
  { id: "#TX-7839", customer: "Neha Gupta", items: 3, amount: 950, time: "Yesterday", payment: "UPI" },
  { id: "#TX-7838", customer: "Vikram Singh", items: 6, amount: 3250, time: "Yesterday", payment: "Cash" },
];

const dailySales = [
  { day: "1 Nov", sales: 38000 },
  { day: "2 Nov", sales: 41000 },
  { day: "3 Nov", sales: 39500 },
  { day: "4 Nov", sales: 42000 },
  { day: "5 Nov", sales: 45000 },
  { day: "6 Nov", sales: 43500 },
  { day: "7 Nov", sales: 47000 },
  { day: "8 Nov", sales: 48500 },
  { day: "9 Nov", sales: 49500 },
  { day: "10 Nov", sales: 51000 },
];

const categoryData = [
  { name: "Antibiotics", value: 25 },
  { name: "Analgesics", value: 20 },
  { name: "Cardiovascular", value: 15 },
  { name: "Diabetes", value: 12 },
  { name: "Antihistamines", value: 10 },
  { name: "Others", value: 18 },
];

const COLORS = ["#0ea5e9", "#22c55e", "#8b5cf6", "#f59e0b", "#ef4444", "#64748b"];

export default function SalesTracking() {
  const [range, setRange] = useState("Last 7 days");

  const handleRangeChange = (value) => {
  setRange(value);
  toast.info(`Showing data for ${value}`);
};

const handleExport = () =>
  toast.success("Sales report exported successfully");

const handleStatClick = (title) =>
  toast(title);

const handleTransactionClick = (id) =>
  toast.info(`Viewing transaction ${id}`);

  return (
    <div className="bg-slate-100 min-h-screen space-y-6 px-3 sm:px-6 py-4">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Sales Tracking</h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Monitor sales performance and revenue trends
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            value={range}
onChange={(e) => handleRangeChange(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full sm:w-auto"
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This Month</option>
          </select>

          <button
  onClick={handleExport}
  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
>
  <Download size={16} />
  Export Report
</button>

        </div>
      </div>

{/* STATS (Modern Analytics Style) */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

  <AnalyticsStat
    title="Today's Sales"
    value="₹42,580"
    percent="+8%"
    icon={IndianRupee}
    iconBg="bg-green-600"
    gradient="from-green-50"
    lineColor="#22c55e"
    linePoints="0,30 12,26 24,22 36,24 48,18 60,12"
  />

  <AnalyticsStat
    title="This Week"
    value="₹2.8L"
    percent="+12%"
    icon={TrendingUp}
    iconBg="bg-blue-600"
    gradient="from-blue-50"
    bars={[8, 10, 12, 9, 14]}
  />

  <AnalyticsStat
    title="This Month"
    value="₹9.5L"
    percent="+15%"
    icon={Calendar}
    iconBg="bg-purple-600"
    gradient="from-purple-50"
    lineColor="#8b5cf6"
    linePoints="0,28 12,24 24,20 36,22 48,16 60,10"
  />

  <AnalyticsStat
    title="Avg. Transaction"
    value="₹425"
    percent="+5%"
    icon={ShoppingCart}
    iconBg="bg-yellow-500"
    gradient="from-yellow-50"
    bars={[6, 7, 8, 7, 9]}
  />

</div>


      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* BAR CHART */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-4 sm:p-6">
          <h2 className="font-semibold mb-4">Daily Sales Trend</h2>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySales}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <h2 className="font-semibold mb-4">Top Selling Categories</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* TRANSACTIONS */}
      <div className="bg-white rounded-xl shadow">
        <h2 className="font-semibold p-4">Recent Transactions</h2>

        {/* 🔑 RESPONSIVE FIX */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Customer</th>
                <th className="px-6 py-4 text-center">Items</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4 text-center">Time</th>
                <th className="px-6 py-4 text-center">Payment</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {transactions.map((t, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">{t.id}</td>
                  <td className="px-6 py-4">{t.customer}</td>
                  <td className="px-6 py-4 text-center">{t.items}</td>
                  <td className="px-6 py-4 text-right font-medium">₹{t.amount}</td>
                  <td className="px-6 py-4 text-center">{t.time}</td>
                  <td className="px-6 py-4 text-center">{t.payment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

/* STAT CARD */

const StatCard = ({ title, value, note, icon: Icon, bg }) => (
  <div
    onClick={() => toast.info(title)}
    className="bg-white rounded-xl shadow p-4 sm:p-5 flex justify-between items-center hover:shadow-md transition cursor-pointer"
  >
    <div>
      <p className="text-slate-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
      <p className="text-green-600 text-sm mt-1">{note}</p>
    </div>
    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center ${bg}`}>
      <Icon size={18} />
    </div>
  </div>
);


const AnalyticsStat = ({
  title,
  value,
  percent,
  icon: Icon,
  iconBg,
  gradient,
  bars,
  linePoints,
  lineColor = "#2563eb",
}) => (
  <div
    onClick={() => toast.info(title)}
    className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition"
  >
    {/* gradient bg */}
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} to-transparent pointer-events-none`}
    />

    {/* badge */}
    <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
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
        <p className="text-xs text-gray-400 mt-1">in last period</p>
      </div>

      {/* mini bars */}
      {bars && (
        <div className="flex items-end gap-1 h-14">
          {bars.map((h, i) => (
            <div
              key={i}
              style={{ height: `${h * 4}px` }}
              className="w-1.5 bg-indigo-500 rounded"
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


