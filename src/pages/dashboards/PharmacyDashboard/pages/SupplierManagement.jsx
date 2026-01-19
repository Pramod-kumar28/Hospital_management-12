import React, { useState } from "react";
import { toast } from "react-toastify";

import {
  Users,
  Clock,
  IndianRupee,
  Truck,
  Plus,
  Pencil,
  Eye,
  Trash2,
} from "lucide-react";

export default function SupplierManagement() {

  const handleAddSupplier = () =>
  toast.success("Opening add supplier form");

const handleEditSupplier = (name) =>
  toast.warning(`Editing supplier: ${name}`);

const handleViewSupplier = (name) =>
  toast.info(`Viewing details of ${name}`);

const handleDeleteSupplier = (name) =>
  toast.error(`${name} removed from suppliers`);

const handleStatClick = (title) =>
  toast.info(title);

  const [suppliers, setSuppliers] = useState([
    {
      name: "MediLife Corp",
      contact: "Rajesh Kumar",
      phone: "+91 98765 43210",
      email: "rajesh@medilife.com",
      orders: 2,
      status: "Active",
    },
    {
      name: "Pharma Solutions",
      contact: "Anita Sharma",
      phone: "+91 87654 32109",
      email: "anita@pharmasol.com",
      orders: 1,
      status: "Active",
    },
    {
      name: "HealthCare Suppliers",
      contact: "Vikram Patel",
      phone: "+91 76543 21098",
      email: "vikram@healthcaresup.com",
      orders: 0,
      status: "Active",
    },
    {
      name: "Global Pharma",
      contact: "Sanjay Mehta",
      phone: "+91 65432 10987",
      email: "sanjay@globalpharma.com",
      orders: 3,
      status: "Active",
    },
    {
      name: "MediCare Distributors",
      contact: "Priya Singh",
      phone: "+91 54321 09876",
      email: "priya@medicaredist.com",
      orders: 1,
      status: "Inactive",
    },
  ]);

  const statusBadge = (status) =>
    status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="bg-slate-100 min-h-screen space-y-6 px-3 sm:px-6 py-4">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">
            Supplier Management
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Manage your pharmacy suppliers and vendors
          </p>
        </div>

       <button
  onClick={handleAddSupplier}
  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
>
  <Plus size={16} />
  Add New Supplier
</button>

      </div>

   {/* STATS (Modern Analytics Style) */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

  <SupplierStat
    title="Active Suppliers"
    value="24"
    percent="+6%"
    icon={Users}
    iconBg="bg-green-600"
    gradient="from-green-50"
    bars={[8, 10, 12, 14, 16]}
  />

  <SupplierStat
    title="Pending Orders"
    value="7"
    percent="+2%"
    icon={Clock}
    iconBg="bg-yellow-500"
    gradient="from-yellow-50"
    lineColor="#f59e0b"
    linePoints="0,28 12,26 24,22 36,20 48,18 60,14"
  />

  <SupplierStat
    title="Total Spend"
    value="₹4.2L"
    percent="+18%"
    icon={IndianRupee}
    iconBg="bg-blue-600"
    gradient="from-blue-50"
    bars={[10, 12, 14, 13, 16]}
  />

  <SupplierStat
    title="Avg. Delivery Time"
    value="3.2 days"
    percent="-8%"
    danger
    icon={Truck}
    iconBg="bg-purple-600"
    gradient="from-purple-50"
    lineColor="#8b5cf6"
    linePoints="0,30 12,28 24,24 36,22 48,20 60,18"
  />

</div>


      {/* TABLE */}
      <div className="bg-white rounded-xl shadow">
        {/* 🔑 RESPONSIVE FIX */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-6 py-4 text-left">Supplier</th>
                <th className="px-6 py-4 text-left">Contact</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-center">Orders</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {suppliers.map((s, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">{s.name}</td>
                  <td className="px-6 py-4">{s.contact}</td>
                  <td className="px-6 py-4">{s.phone}</td>
                  <td className="px-6 py-4 text-blue-600">{s.email}</td>
                  <td className="px-6 py-4 text-center">
                    {s.orders} {s.orders === 1 ? "order" : "orders"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 text-xs rounded-full ${statusBadge(s.status)}`}>
                      {s.status}
                    </span>
                  </td>
                 <td className="px-6 py-4 text-center">
  <div className="flex justify-center gap-3">
    <Pencil
      size={16}
      className="text-blue-600 cursor-pointer"
      onClick={() => handleEditSupplier(s.name)}
    />
    <Eye
      size={16}
      className="text-green-600 cursor-pointer"
      onClick={() => handleViewSupplier(s.name)}
    />
    <Trash2
      size={16}
      className="text-red-600 cursor-pointer"
      onClick={() => handleDeleteSupplier(s.name)}
    />
  </div>
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


const SupplierStat = ({
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
    onClick={() => toast.info(title)}
    className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition"
  >
    {/* gradient bg */}
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} to-transparent pointer-events-none`}
    />

    {/* badge */}
    <span
      className={`absolute top-4 right-4 text-white text-xs font-semibold px-2 py-0.5 rounded
        ${danger ? "bg-red-500" : "bg-green-500"}`}
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
        <p className="text-xs text-gray-400 mt-1">last 7 days</p>
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

