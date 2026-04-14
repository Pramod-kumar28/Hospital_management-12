import React, { useState, useEffect } from "react";
import { apiFetch } from "../../../../services/apiClient";

const PatientRecords = () => {
  const [patients, setPatients] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await apiFetch("/api/v1/ipd-management/debug/all-patients");
        const json = await response.json();
        if (json.success) {
          setPatients(json.data.patients || []);
          setTotalPatients(json.data.total_patients || 0);
        } else {
          setError(json.message || "Failed to fetch data");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredPatients = patients.filter((patient) => {
    const search = searchTerm.toLowerCase();
    return (
      (patient.name && patient.name.toLowerCase().includes(search)) ||
      (patient.email && patient.email.toLowerCase().includes(search)) ||
      (patient.patient_id && patient.patient_id.toLowerCase().includes(search))
    );
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* ================= HEADER SECTION ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patient Records</h1>
          <p className="text-sm text-gray-500 mt-1">View and manage all registered patients</p>
        </div>

        {/* Total Patients Stat */}
        <div className="bg-white px-6 py-3 rounded-xl border shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center shadow-inner">
            <i className="fas fa-users text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium tracking-wide">Total Patients</p>
            <p className="text-2xl font-bold text-gray-800">{loading ? '...' : totalPatients}</p>
          </div>
        </div>
      </div>

      {/* ================= PATIENTS TABLE ================= */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
          <h3 className="text-lg font-semibold text-gray-800">All Patients List</h3>
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search by name, email or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center text-gray-500">
            <i className="fas fa-circle-notch fa-spin text-4xl mb-4 text-indigo-500"></i>
            <p className="text-lg font-medium">Loading patient records...</p>
          </div>
        ) : error ? (
          <div className="p-16 text-center text-red-500">
            <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-exclamation-triangle text-3xl"></i>
            </div>
            <p className="text-lg font-medium">{error}</p>
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-search text-3xl text-gray-400"></i>
            </div>
            <p className="text-lg font-medium">No patient records found.</p>
            {searchTerm && <p className="text-sm mt-2">Try adjusting your search query.</p>}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Patient ID
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Email
                  </th>

                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.map((patient, index) => (
                  <tr key={index} className="hover:bg-indigo-50/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                        {patient.patient_id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-9 w-9 rounded-full bg-gradient-to-br from-indigo-100 to-blue-200 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold shadow-sm">
                          {patient.name ? patient.name.charAt(0).toUpperCase() : 'P'}
                        </div>
                        <div className="ml-3 text-sm font-semibold text-gray-900">{patient.name || "Unknown"}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <i className="far fa-envelope text-gray-400"></i>
                        {patient.email || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <i className="far fa-calendar-alt text-gray-400"></i>
                        {formatDate(patient.created_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 w-8 h-8 rounded-lg transition-colors flex items-center justify-center" title="View Details">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="text-emerald-600 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 w-8 h-8 rounded-lg transition-colors flex items-center justify-center" title="Edit Patient">
                          <i className="fas fa-edit"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientRecords;
