import React from "react";
import { toast } from "react-toastify";
import {
  Clock,
  CheckCircle,
  Truck,
  IndianRupee,
  Plus,
  Eye,
} from "lucide-react";

export default function PurchaseOrders() {

  const handleCreateOrder = () =>
  toast.success("Opening new purchase order form");

const handleViewOrder = (id) =>
  toast.info(`Viewing details for ${id}`);

const handleStatClick = (title) =>
  toast(`${title} clicked`);

  const orders = [
    {
      id: "#PO-7842",
      supplier: "MediLife Corp",
      items: 5,
      amount: 12450,
      date: "10 Nov 2023",
      status: "Pending",
    },
    {
      id: "#PO-7841",
      supplier: "Pharma Solutions",
      items: 3,
      amount: 8250,
      date: "8 Nov 2023",
      status: "Approved",
    },
    {
      id: "#PO-7840",
      supplier: "HealthCare Suppliers",
      items: 8,
      amount: 21800,
      date: "5 Nov 2023",
      status: "Delivered",
    },
  ];

  const statusStyle = (status) => {
    if (status === "Pending") return "bg-yellow-100 text-yellow-700";
    if (status === "Approved") return "bg-green-100 text-green-700";
    if (status === "Delivered") return "bg-blue-100 text-blue-700";
  };

  return (
    <div className="bg-slate-100 min-h-screen space-y-6 px-3 sm:px-6 py-4">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Purchase Orders</h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Create and manage purchase orders from suppliers
          </p>
        </div>

       <button
  onClick={handleCreateOrder}
  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
>
  <Plus size={16} />
  Create New Order
</button>

      </div>

    {/* STATS (Modern Analytics Style) */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

  <AnalyticsStat
    title="Pending Orders"
    value="7"
    percent="+10%"
    icon={Clock}
    iconBg="bg-yellow-500"
    gradient="from-yellow-50"
    bars={[6, 9, 7, 10, 8]}
  />

  <AnalyticsStat
    title="Approved Orders"
    value="12"
    percent="+18%"
    icon={CheckCircle}
    iconBg="bg-green-600"
    gradient="from-green-50"
    lineColor="#22c55e"
    linePoints="0,28 12,22 24,26 36,18 48,20 60,12"
  />

  <AnalyticsStat
    title="Delivered Orders"
    value="45"
    percent="+30%"
    icon={Truck}
    iconBg="bg-blue-600"
    gradient="from-blue-50"
    bars={[8, 12, 10, 14, 16]}
  />

  <AnalyticsStat
    title="Total Value"
    value="₹2.4L"
    percent="+25%"
    icon={IndianRupee}
    iconBg="bg-purple-600"
    gradient="from-purple-50"
    lineColor="#a855f7"
    linePoints="0,30 12,26 24,20 36,22 48,16 60,10"
  />

</div>


      {/* TABLE */}
      <div className="bg-white rounded-xl shadow">
        {/* 🔑 RESPONSIVE FIX */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-6 py-4 text-left">Order ID</th>
                <th className="px-6 py-4 text-left">Supplier</th>
                <th className="px-6 py-4 text-center">Items</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4 text-center">Date</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {orders.map((o, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">{o.id}</td>
                  <td className="px-6 py-4">{o.supplier}</td>
                  <td className="px-6 py-4 text-center">{o.items}</td>
                  <td className="px-6 py-4 text-right font-medium">
                    ₹{o.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">{o.date}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 text-xs rounded-full ${statusStyle(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
<Eye
  className="text-blue-600 cursor-pointer"
  size={16}
  onClick={() => handleViewOrder(o.id)}
/>
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

/* COMPONENT */

const StatCard = ({ title, value, icon: Icon, iconBg }) => (
  <div
    onClick={() => toast.info(title)}
    className="bg-white rounded-xl shadow p-4 sm:p-5 flex justify-between items-center hover:shadow-md transition cursor-pointer"
  >
    <div>
      <p className="text-slate-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
    </div>
    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center ${iconBg}`}>
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
    onClick={() => toast.info(`${title} clicked`)}
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
        <p className="text-xs text-gray-400 mt-1">in last 7 days</p>
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


