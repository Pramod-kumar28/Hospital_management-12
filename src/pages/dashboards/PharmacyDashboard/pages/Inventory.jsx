import React, { useState } from "react";
import { toast } from "react-toastify";
import { Pill, Search, Filter, Plus, Eye, Pencil, Trash2 } from "lucide-react";

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const handleAddMedicine = () => toast.success("Opening add medicine form");

  const handleApplyFilters = () => toast.info("Filters applied");

  const handleView = (name) => toast.info(`Viewing details of ${name}`);

  const handleEdit = (name) => toast.warning(`Editing ${name}`);

  const handleDelete = (name) => toast.error(`${name} removed from inventory`);

  const handlePageChange = (direction) => toast(`Page ${direction}`);

  const medicines = [
    {
      name: "Amoxicillin 500mg",
      code: "AMX-500",
      category: "Antibiotic",
      stock: 12,
      price: 85.5,
      expiry: "15 Nov 2023",
      status: "Low Stock",
    },
    {
      name: "Paracetamol 650mg",
      code: "PAR-650",
      category: "Analgesic",
      stock: 8,
      price: 15,
      expiry: "10 Dec 2024",
      status: "Low Stock",
    },
    {
      name: "Losartan 50mg",
      code: "LOS-50",
      category: "Hypertension",
      stock: 15,
      price: 120,
      expiry: "20 Mar 2024",
      status: "Low Stock",
    },
    {
      name: "Cetirizine 10mg",
      code: "CET-10",
      category: "Antihistamine",
      stock: 45,
      price: 25.5,
      expiry: "23 Nov 2023",
      status: "In Stock",
    },
    {
      name: "Metformin 500mg",
      code: "MET-500",
      category: "Diabetes",
      stock: 0,
      price: 65,
      expiry: "8 Dec 2023",
      status: "Out of Stock",
    },
  ];

  const filteredMedicines = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || m.category === category) &&
      (status === "All" || m.status === status)
  );

  return (
    <div className="bg-slate-100 min-h-screen space-y-6 px-3 sm:px-6 py-4">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">
            Inventory Management
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Manage all medicines in your pharmacy stock
          </p>
        </div>

        <button
          onClick={handleAddMedicine}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
        >
          <Plus size={16} />
          Add New Medicine
        </button>
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-xl shadow p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medicine"
            className="border rounded-lg pl-9 pr-3 py-2 w-full"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option>All</option>
          <option>Antibiotic</option>
          <option>Analgesic</option>
          <option>Hypertension</option>
          <option>Antihistamine</option>
          <option>Diabetes</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option>All</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>

        <button
          onClick={handleApplyFilters}
          className="flex items-center justify-center gap-2 bg-slate-800 text-white rounded-lg"
        >
          <Filter size={16} />
          Apply Filters
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow">
        {/* 🔑 RESPONSIVE FIX */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-4 text-left">Medicine</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Expiry</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredMedicines.map((m, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                        <Pill size={16} />
                      </div>
                      <div>
                        <p className="font-medium">{m.name}</p>
                        <p className="text-xs text-slate-500">{m.code}</p>
                      </div>
                    </div>
                  </td>
                  <td>{m.category}</td>
                  <td>{m.stock} units</td>
                  <td>₹{m.price}</td>
                  <td>{m.expiry}</td>
                  <td>
                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                      {m.status}
                    </span>
                  </td>
                  <td className="flex justify-center gap-3 py-4">
                    <Eye
                      size={16}
                      className="text-blue-600 cursor-pointer"
                      onClick={() => handleView(m.name)}
                    />
                    <Pencil
                      size={16}
                      className="text-green-600 cursor-pointer"
                      onClick={() => handleEdit(m.name)}
                    />
                    <Trash2
                      size={16}
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleDelete(m.name)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 text-sm text-slate-500">
          <p>Page {page}</p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border rounded"
              onClick={() => handlePageChange("previous")}
            >
              Previous
            </button>

            <button className="px-3 py-1 bg-blue-600 text-white rounded">
              {page}
            </button>

            <button
              className="px-3 py-1 border rounded"
              onClick={() => handlePageChange("next")}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
