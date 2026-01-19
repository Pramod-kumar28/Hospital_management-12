import React, { useState } from "react";
import { toast } from "react-toastify";

import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  Search,
  Pill,
} from "lucide-react";

export default function MedicineDatabase() {
  const [search, setSearch] = useState("");

  const handleAddMedicine = () =>
  toast.success("Opening add medicine form");

const handleSearch = () =>
  toast.info("Search applied");

const handleView = (name) =>
  toast.info(`Viewing ${name}`);

const handleEdit = (name) =>
  toast.warning(`Editing ${name}`);

const handleDelete = (name) =>
  toast.error(`${name} removed from database`);

  const medicines = [
    {
      name: "Amoxicillin 500mg",
      code: "AMX-500",
      generic: "Amoxicillin",
      manufacturer: "Cipla Ltd.",
      category: "Antibiotic",
      therapeutic: "Antibacterial",
    },
    {
      name: "Paracetamol 650mg",
      code: "PAR-650",
      generic: "Paracetamol",
      manufacturer: "GSK Pharmaceuticals",
      category: "Analgesic",
      therapeutic: "Antipyretic",
    },
    {
      name: "Losartan 50mg",
      code: "LOS-50",
      generic: "Losartan Potassium",
      manufacturer: "Sun Pharma",
      category: "Hypertension",
      therapeutic: "Angiotensin II Receptor Blocker",
    },
    {
      name: "Cetirizine 10mg",
      code: "CET-10",
      generic: "Cetirizine Hydrochloride",
      manufacturer: "Dr. Reddy's",
      category: "Antihistamine",
      therapeutic: "H1 Antagonist",
    },
  ];

  return (
    <div className="bg-slate-100 min-h-screen space-y-6 px-3 sm:px-6 py-4">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Medicine Database</h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Comprehensive database of all medicines with search functionality
          </p>
        </div>

        <button
  onClick={handleAddMedicine}
  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
>
  <Plus size={16} />
  Add to Database
</button>

      </div>

      {/* SEARCH & FILTERS */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, generic, manufacturer, or code"
              className="border rounded-lg pl-9 pr-3 py-2 w-full"
            />
          </div>

          <select className="border rounded-lg px-3 py-2">
            <option>All Categories</option>
            <option>Antibiotic</option>
            <option>Analgesic</option>
            <option>Hypertension</option>
          </select>

         <button
  onClick={handleSearch}
  className="bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition"
>
  Search
</button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Generic Name"
            className="border rounded-lg px-3 py-2"
          />
          <input
            placeholder="Manufacturer"
            className="border rounded-lg px-3 py-2"
          />
          <input
            placeholder="Therapeutic Class"
            className="border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow">
        {/* 🔑 RESPONSIVE FIX */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-6 py-4 text-left">Medicine</th>
                <th className="px-6 py-4 text-left">Generic</th>
                <th className="px-6 py-4 text-left">Manufacturer</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Therapeutic</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {medicines
                .filter((m) =>
                  m.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((m, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                        <Pill size={16} />
                      </div>
                      <div>
                        <p className="font-medium">{m.name}</p>
                        <p className="text-xs text-slate-500">{m.code}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">{m.generic}</td>
                    <td className="px-6 py-4">{m.manufacturer}</td>
                    <td className="px-6 py-4">{m.category}</td>
                    <td className="px-6 py-4">{m.therapeutic}</td>
                    <td className="px-6 py-4 text-center">
                 <td className="px-6 py-4 text-center">
  <div className="flex justify-center gap-3">
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
  </div>
</td>

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
