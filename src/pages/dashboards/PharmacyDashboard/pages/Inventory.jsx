import React, { useState } from "react";
import { toast } from "react-toastify";
import { Pill, Search, Filter, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import Modal from "../../../../components/common/Modal/Modal";

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("add"); // add | view | edit
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    category: "",
    stock: "",
    price: "",
    expiry: "",
  });

  const [medicines, setMedicines] = useState([
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
  ]);

  // ---------------- HELPERS ----------------

  const getStatus = (stock) => {
    const value = Number(stock);
    if (value === 0) return "Out of Stock";
    if (value <= 10) return "Low Stock";
    return "In Stock";
  };

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      category: "",
      stock: "",
      price: "",
      expiry: "",
    });
    setMode("add");
    setSelectedIndex(null);
  };

  // ---------------- HANDLERS ----------------

  const handleAddMedicine = () => {
    resetForm();
    setMode("add");
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveMedicine = () => {
    if (
      !formData.name ||
      !formData.code ||
      !formData.category ||
      formData.stock === "" ||
      formData.price === "" ||
      !formData.expiry
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const medicineData = {
      name: formData.name,
      code: formData.code,
      category: formData.category,
      stock: Number(formData.stock),
      price: Number(formData.price),
      expiry: new Date(formData.expiry).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: getStatus(formData.stock),
    };

    if (mode === "edit") {
      setMedicines((prev) =>
        prev.map((m, i) =>
          i === selectedIndex ? medicineData : m
        )
      );
      toast.success("Medicine updated");
    } else {
      setMedicines((prev) => [...prev, medicineData]);
      toast.success("Medicine added");
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleView = (medicine, index) => {
    setFormData({
      name: medicine.name,
      code: medicine.code,
      category: medicine.category,
      stock: medicine.stock,
      price: medicine.price,
      expiry: "",
    });
    setSelectedIndex(index);
    setMode("view");
    setIsModalOpen(true);
  };

  const handleEdit = (medicine, index) => {
    setFormData({
      name: medicine.name,
      code: medicine.code,
      category: medicine.category,
      stock: medicine.stock,
      price: medicine.price,
      expiry: "",
    });
    setSelectedIndex(index);
    setMode("edit");
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?"
    );
    if (!confirmDelete) return;

    setMedicines((prev) => prev.filter((_, i) => i !== index));
    toast.success("Medicine deleted");
  };

  const handleApplyFilters = () => toast.info("Filters applied");
  const handlePageChange = (direction) =>
    toast(`Page ${direction}`);

  // ---------------- FILTER ----------------

  const filteredMedicines = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || m.category === category) &&
      (status === "All" || m.status === status)
  );

  // ---------------- UI ----------------

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
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-4 text-left">Medicine Details</th>
                <th className="text-left px-2">Category</th>
                <th className="text-left px-2">Stock</th>
                <th className="text-left px-2">Price</th>
                <th className="text-left px-2">Expiry</th>
                <th className="text-left px-3">Status</th>
                <th className="text-center px-2">Actions</th>
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
                      onClick={() => handleView(m, i)}
                    />
                    <Pencil
                      size={16}
                      className="text-green-600 cursor-pointer"
                      onClick={() => handleEdit(m, i)}
                    />
                    <Trash2
                      size={16}
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleDelete(i)}
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

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          mode === "view"
            ? "View Medicine"
            : mode === "edit"
            ? "Edit Medicine"
            : "Add New Medicine"
        }
        size="md"
      >
        <div className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            disabled={mode === "view"}
            placeholder="Medicine Name"
            className="w-full border px-3 py-2 rounded disabled:bg-slate-100"
          />

          <input
            name="code"
            value={formData.code}
            onChange={handleFormChange}
            disabled={mode === "view"}
            placeholder="Medicine Code"
            className="w-full border px-3 py-2 rounded disabled:bg-slate-100"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleFormChange}
            disabled={mode === "view"}
            className="w-full border px-3 py-2 rounded disabled:bg-slate-100"
          >
            <option value="">Select Category</option>
            <option>Antibiotic</option>
            <option>Analgesic</option>
            <option>Hypertension</option>
            <option>Antihistamine</option>
            <option>Diabetes</option>
          </select>

          <div className="grid grid-cols-2 gap-3">
            <input
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleFormChange}
              disabled={mode === "view"}
              placeholder="Stock"
              className="w-full border px-3 py-2 rounded disabled:bg-slate-100"
            />
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleFormChange}
              disabled={mode === "view"}
              placeholder="Price"
              className="w-full border px-3 py-2 rounded disabled:bg-slate-100"
            />
          </div>

          <input
            name="expiry"
            type="date"
            value={formData.expiry}
            onChange={handleFormChange}
            disabled={mode === "view"}
            className="w-full border px-3 py-2 rounded disabled:bg-slate-100"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Close
            </button>

            {mode !== "view" && (
              <button
                onClick={handleSaveMedicine}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {mode === "edit" ? "Update Medicine" : "Save Medicine"}
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
