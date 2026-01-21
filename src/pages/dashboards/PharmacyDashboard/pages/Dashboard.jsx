import React, { useState } from "react";
import { toast } from "react-toastify";

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
  Pill,
  IndianRupee,
  AlertTriangle,
  Truck,
  ShoppingCart,
  CheckCircle,
  AlertCircle,
  RefreshCcw,
  Plus,
  Calendar,
  Package,
  Filter,
  Download,
  Printer,
  X,
} from "lucide-react";

import Modal from "../../../../components/common/Modal/Modal"; // Import your existing Modal component

/* ================= DATA ================= */

const salesData = [
  { day: "Mon", sales: 32000 },
  { day: "Tue", sales: 38000 },
  { day: "Wed", sales: 42000 },
  { day: "Thu", sales: 39000 },
  { day: "Fri", sales: 43000 },
  { day: "Sat", sales: 51000 },
  { day: "Sun", sales: 48000 },
];

// Original low stock items data (expanded with more items)
const lowStockItems = [
  { name: "Amoxicillin 500mg", category: "Antibiotic", stock: "12 units", status: "Critical" },
  { name: "Paracetamol 650mg", category: "Analgesic", stock: "8 units", status: "Critical" },
  { name: "Ibuprofen 400mg", category: "Pain Relief", stock: "15 units", status: "Low Stock" },
  { name: "Cetirizine 10mg", category: "Antihistamine", stock: "22 units", status: "Low Stock" },
  { name: "Metformin 500mg", category: "Diabetes", stock: "18 units", status: "Low Stock" },
  { name: "Atorvastatin 20mg", category: "Cholesterol", stock: "9 units", status: "Critical" },
  { name: "Levothyroxine 50mcg", category: "Thyroid", stock: "14 units", status: "Low Stock" },
  { name: "Losartan 50mg", category: "Hypertension", stock: "11 units", status: "Critical" },
];

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [orderItems, setOrderItems] = useState([
    { id: 1, name: "Amoxicillin 500mg", quantity: 0, price: 85 },
    { id: 2, name: "Paracetamol 650mg", quantity: 0, price: 25 },
    { id: 3, name: "Ibuprofen 400mg", quantity: 0, price: 45 },
  ]);

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
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} to-transparent pointer-events-none`}
      />

      <span
        className={`absolute top-4 right-4 text-white text-xs font-semibold px-2 py-0.5 rounded
          ${danger ? "bg-red-500" : "bg-green-500"}`}
      >
        {percent}
      </span>

      <div className="relative flex justify-between items-end">
        <div>
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${iconBg} mb-3`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>

          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-400 mt-1">in last 7 Days</p>
        </div>

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

  const handleLowStock = () =>
    toast.info("Opening low stock items");

  const handleSuppliers = () =>
    toast.info("Opening supplier management");

  const handleSales = () =>
    toast.info("Opening today's sales");

  const handleMedicines = () =>
    toast.info("Opening total medicines");

  const handleViewAllStock = () =>
    toast.info("Viewing all low stock medicines");

  const handleViewAllExpiry = () =>
    toast.warning("Viewing expiry alerts");

  const handleNewOrder = () => {
    setIsModalOpen(true);
    toast.success("Creating new purchase order");
  };

  const handleFilterChange = (e) =>
    toast(`Filter applied: ${e.target.value}`);

  const updateQuantity = (id, delta) => {
    setOrderItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const handleSubmitOrder = () => {
    toast.success(`Order submitted successfully! Total: ₹${calculateTotal()}`);
    setIsModalOpen(false);
    setOrderItems(items => items.map(item => ({ ...item, quantity: 0 })));
    setSelectedSupplier("");
  };

  // Original StockRow component remains the same
  const StockRow = ({ name, category, stock, status }) => (
    <tr className="hover:bg-slate-50 cursor-pointer">
      <td className="py-3">{name}</td>
      <td>{category}</td>
      <td>{stock}</td>
      <td>
        <span className={`px-3 py-1 text-xs rounded-full ${
          status === "Critical" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
        }`}>
          {status}
        </span>
      </td>
    </tr>
  );

  return (
    <>
      {/* Modal needs to be at root level, not nested inside relative/overflow containers */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New Purchase Order"
        size="lg"
      >
        <div className="space-y-6">
          {/* Supplier Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Supplier
            </label>
            <select
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Choose a supplier</option>
              <option value="MedLife Corp">MedLife Corp</option>
              <option value="PharmaDirect">PharmaDirect</option>
              <option value="HealthPlus">HealthPlus</option>
              <option value="MediCare">MediCare</option>
            </select>
          </div>

          {/* Order Items */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Order Items</h3>
              <div className="text-lg font-semibold text-blue-600">
                Total: ₹{calculateTotal()}
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-medium text-gray-700">Medicine</th>
                    <th className="text-left p-3 font-medium text-gray-700">Price (₹)</th>
                    <th className="text-left p-3 font-medium text-gray-700">Quantity</th>
                    <th className="text-left p-3 font-medium text-gray-700">Total (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orderItems.map((item) => (
                    <tr key={item.id}>
                      <td className="p-3">
                        <div className="font-medium">{item.name}</div>
                      </td>
                      <td className="p-3">₹{item.price}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                          >
                            -
                          </button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-3 font-medium">₹{item.quantity * item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              rows="3"
              placeholder="Add any special instructions or notes for this order..."
            />
          </div>

          {/* Delivery Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Delivery Date
            </label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <Calendar size={18} className="text-gray-400" />
              <input
                type="date"
                className="flex-1 outline-none"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitOrder}
              disabled={!selectedSupplier || calculateTotal() === 0}
              className={`px-4 py-2 rounded-lg ${
                !selectedSupplier || calculateTotal() === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              Submit Order
            </button>
          </div>
        </div>
      </Modal>

      {/* Dashboard Content */}
      <div className="bg-slate-100 min-h-screen w-full text-left space-y-6 px-3 sm:px-6 py-4 relative">
        {/* HEADER */}
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Overview of your pharmacy management system
          </p>
        </div>

        {/* TOP STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnalyticsCard
            title="Total Medicines"
            value="1,247"
            percent="+12%"
            icon={Pill}
            iconBg="bg-indigo-600"
            gradient="from-indigo-50"
            bars={[4, 7, 10, 6, 12]}
            onClick={handleMedicines}
          />

          <AnalyticsCard
            title="Today's Sales"
            value="₹42,580"
            percent="+8%"
            icon={IndianRupee}
            iconBg="bg-green-600"
            gradient="from-green-50"
            lineColor="#22c55e"
            linePoints="0,28 12,24 24,26 36,18 48,20 60,12"
            onClick={handleSales}
          />

          <AnalyticsCard
            title="Low Stock Items"
            value="18"
            percent="-5%"
            danger
            icon={AlertTriangle}
            iconBg="bg-yellow-500"
            gradient="from-yellow-50"
            bars={[10, 6, 12, 8, 9]}
            onClick={handleLowStock}
          />

          <AnalyticsCard
            title="Active Suppliers"
            value="24"
            percent="+25%"
            icon={Truck}
            iconBg="bg-purple-600"
            gradient="from-purple-50"
            lineColor="#a855f7"
            linePoints="0,30 12,26 24,20 36,22 48,16 60,10"
            onClick={handleSuppliers}
          />
        </div>

        {/* CHART + ACTIVITY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SALES CHART */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h2 className="font-semibold text-lg">Sales Overview</h2>
              <select className="border rounded px-2 py-1 text-sm" onChange={handleFilterChange}>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>

            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-white rounded-xl shadow p-4 sm:p-6">
            <h2 className="font-semibold text-lg mb-4">Recent Activity</h2>
            <ul className="space-y-3">
              <ActivityItem title="New purchase order created" desc="Order #PO-7842 for 50 units" icon={ShoppingCart} bg="bg-blue-100 text-blue-600" />
              <ActivityItem title="Stock updated" desc="Paracetamol stock increased to 120" icon={CheckCircle} bg="bg-green-100 text-green-600" />
              <ActivityItem title="Expiry alert" desc="Amoxicillin expires in 7 days" icon={AlertCircle} bg="bg-red-100 text-red-600" />
              <ActivityItem title="Supplier updated" desc="MedLife Corp contact info updated" icon={RefreshCcw} bg="bg-purple-100 text-purple-600" />
            </ul>
          </div>
        </div>

        {/* TABLE + ALERTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LOW STOCK - EXPANDED WITH ORIGINAL STYLING */}
          <div className="bg-white rounded-xl shadow p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h2 className="font-semibold text-lg">Low Stock Items</h2>
              <button onClick={handleViewAllStock} className="text-blue-600 text-sm">
                View all →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[500px]">
                <thead className="text-left text-slate-500">
                  <tr>
                    <th>Medicine</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {lowStockItems.map((item, index) => (
                    <StockRow 
                      key={index}
                      name={item.name}
                      category={item.category}
                      stock={item.stock}
                      status={item.status}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* EXPIRY ALERTS */}
          <div className="bg-white rounded-xl shadow p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h2 className="font-semibold text-lg">Expiry Alerts</h2>
              <button onClick={handleViewAllExpiry} className="text-blue-600 text-sm">
                View all →
              </button>
            </div>

            <div className="space-y-3">
              <AlertCard name="Amoxicillin 500mg" batch="AMX-7842" days="7 days" danger />
              <AlertCard name="Cetirizine 10mg" batch="CET-4521" days="15 days" />
              <AlertCard name="Ibuprofen 400mg" batch="IBU-8923" days="21 days" />
              <AlertCard name="Paracetamol 650mg" batch="PAR-3456" days="30 days" />
            </div>

            <button onClick={handleNewOrder} className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
              <Plus size={20} />
              New Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ================= COMPONENTS ================= */

const ActivityItem = ({ title, desc, icon: Icon, bg }) => (
  <li onClick={() => toast.info(title)} className="flex gap-3 items-start hover:bg-slate-50 p-2 sm:p-3 rounded cursor-pointer">
    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${bg}`}>
      <Icon size={16} />
    </div>
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-slate-500 text-sm">{desc}</p>
    </div>
  </li>
);

const AlertCard = ({ name, batch, days, danger }) => (
  <div
    onClick={() =>
      danger
        ? toast.error(`${name} expires in ${days}`)
        : toast.warn(`${name} expires in ${days}`)
    }
    className={`p-4 rounded-lg cursor-pointer ${
      danger ? "bg-red-50" : "bg-yellow-50"
    }`}
  >
    <div className="flex justify-between">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-slate-500">Batch #{batch}</p>
      </div>
      <p className={`font-semibold ${danger ? "text-red-600" : "text-yellow-700"}`}>
        Expires in {days}
      </p>
    </div>
  </div>
);