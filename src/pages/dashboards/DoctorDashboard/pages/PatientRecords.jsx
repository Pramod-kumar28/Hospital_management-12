import React from "react";

const PatientDashboard = () => {
  /* ================= HANDLERS ================= */
  const handleView = (name) => alert(`Viewing ${name}`);
  const handleDownload = (name) => alert(`Downloading ${name}`);
  const handleDoctorClick = (name) => alert(`Opening ${name} profile`);

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">

      {/* ================= TOP STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total Appointments */}
        <div className="group rounded-xl p-5 text-white
  bg-gradient-to-br from-indigo-500 to-indigo-700
  hover:-translate-y-1 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center
        group-hover:scale-110 transition">
                <i className="fas fa-calendar-check text-xl"></i>
              </div>
              <div>
                <p className="text-sm opacity-90">Total Appointments</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </div>
          <span className="inline-block mt-4 px-3 py-1 text-xs rounded-full bg-white/20">
            +95% in last 7 Days
          </span>
        </div>

        {/* Online Consultations */}
        <div className="group rounded-xl p-5 text-white
  bg-gradient-to-br from-green-500 to-green-700
  hover:-translate-y-1 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center
        group-hover:scale-110 transition">
                <i className="fas fa-user-md text-xl"></i>
              </div>
              <div>
                <p className="text-sm opacity-90">Online Consultations</p>
                <p className="text-2xl font-bold">36</p>
              </div>
            </div>
          </div>
          <span className="inline-block mt-4 px-3 py-1 text-xs rounded-full bg-white/20">
            -15% in last 7 Days
          </span>
        </div>

        {/* Blood Pressure */}
        <div className="group rounded-xl p-5 text-white
  bg-gradient-to-br from-purple-500 to-purple-700
  hover:-translate-y-1 hover:shadow-xl transition-all">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90">Blood Pressure</p>
              <p className="text-2xl font-bold">
                89 <span className="text-sm font-medium">g/dl</span>
              </p>
              <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-white/20">
                +95%
              </span>
            </div>
            <svg width="80" height="40">
              <polyline
                points="0,30 15,20 30,22 45,15 60,20 80,10"
                fill="none"
                stroke="white"
                strokeWidth="2"
                className="opacity-80"
              />
            </svg>
          </div>
        </div>

        {/* Heart Rate */}
        <div className="group rounded-xl p-5 text-white
  bg-gradient-to-br from-blue-500 to-blue-700
  hover:-translate-y-1 hover:shadow-xl transition-all">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90">Heart Rate</p>
              <p className="text-2xl font-bold">
                87 <span className="text-sm font-medium">bpm</span>
              </p>
              <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-white/20">
                +95%
              </span>
            </div>
            <svg width="80" height="40">
              <polyline
                points="0,25 15,18 30,22 45,14 60,16 80,8"
                fill="none"
                stroke="white"
                strokeWidth="2"
                className="opacity-80"
              />
            </svg>
          </div>
        </div>

      </div>


      {/* ================= SECOND ROW ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* My Doctors */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="text-lg font-semibold mb-4">My Doctors</h3>

          {[
            ["Dr. Mick Thompson", "Cardiologist", 20],
            ["Dr. Sarah Johnson", "Orthopedic Surgeon", 15],
            ["Dr. Emily Carter", "Pediatrician", 12],
            ["Dr. David Lee", "Gynecologist", 8],
            ["Dr. Anna Kim", "Psychiatrist", 6],
          ].map(([name, role, count], i, arr) => (
            <div key={i}>
              <div
                onClick={() => handleDoctorClick(name)}
                className="flex items-center justify-between py-3 px-2
        hover:bg-gray-50 cursor-pointer rounded-lg transition"
              >
                <div>
                  <p className="font-medium text-gray-800">{name}</p>
                  <p className="text-xs text-gray-500">{role}</p>
                </div>

                <span className="text-xs px-3 py-1 rounded-full
          bg-green-500 text-white font-medium">
                  {count} Bookings
                </span>
              </div>

              {/* Divider line */}
              {i !== arr.length - 1 && (
                <div className="border-b border-gray-200"></div>
              )}
            </div>
          ))}
        </div>


        {/* Prescriptions */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="text-lg font-semibold mb-4">Prescriptions</h3>

          {[
            ["Cardiology Prescription", "20 Apr 2025"],
            ["Dentist Prescription", "25 Mar 2025"],
            ["Dentist Prescription", "16 Mar 2025"],
            ["Dentist Prescription", "12 Feb 2025"],
          ].map(([title, date], i, arr) => (
            <div key={i}>
              <div
                className="flex items-center justify-between py-3 px-2
        hover:bg-gray-50 rounded-lg transition"
              >
                <div className="flex items-center gap-3">
                  {/* File Icon */}
                  <div className="w-10 h-10 rounded-full bg-blue-100
            flex items-center justify-center">
                    <i className="fas fa-file-medical text-blue-600"></i>
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">{title}</p>
                    <p className="text-xs text-gray-500">{date}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(title)}
                    className="p-2 rounded-lg
              text-indigo-600 hover:bg-indigo-100 transition"
                    title="View"
                  >
                    <i className="fas fa-eye"></i>
                  </button>

                  <button
                    onClick={() => handleDownload(title)}
                    className="p-2 rounded-lg
              text-green-600 hover:bg-green-100 transition"
                    title="Download"
                  >
                    <i className="fas fa-download"></i>
                  </button>
                </div>
              </div>

              {/* Divider line */}
              {i !== arr.length - 1 && (
                <div className="border-b border-gray-200"></div>
              )}
            </div>
          ))}
        </div>


        {/* Recent Activity */}
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>

          <div className="space-y-3">
            {[
              {
                title: "Appointment with Primary Care",
                time: "24 Mar 2025, 10:55 AM",
                color: "bg-green-500",
              },
              {
                title: "Blood Pressure Check",
                time: "24 Apr 2025, 11:00 AM",
                color: "bg-red-500",
              },
              {
                title: "Physical Therapy Session",
                time: "24 Apr 2025, 11:00 AM",
                color: "bg-yellow-400",
              },
              {
                title: "Dietary Consultation",
                time: "24 Apr 2025, 12:00 PM",
                color: "bg-blue-500",
              },
            ].map((item, i, arr) => (
              <div key={i}>
                <div className="flex gap-3 py-2">
                  <span
                    className={`w-3 h-3 rounded-full ${item.color} mt-2`}
                  ></span>

                  <div>
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>

                {/* Divider */}
                {i !== arr.length - 1 && (
                  <div className="border-b border-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>


        {/* ================= RECENT TRANSACTIONS ================= */}
        <div className="bg-white rounded-xl border shadow-sm p-5 w-full" >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <select className="border rounded px-3 py-1 text-sm w-fit">
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>

          <div className="space-y-3">
            {[
              ["Dr. John Smith", "Neurosurgeon", "$450", "Success"],
              ["Dr. Lisa White", "Oncologist", "$350", "Success"],
              ["Dr. Patricia Brown", "Pulmonologist", "$400", "Failed"],
              ["Dr. Rachel Green", "Urologist", "$550", "Success"],
            ].map(([name, role, amount, status], i, arr) => (
              <div key={i}>
                <div className="flex items-center justify-between gap-3 py-3">

                  {/* Doctor Info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <i className="fas fa-user-md text-blue-600"></i>
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-800 truncate">{name}</p>
                      <p className="text-xs text-gray-500 truncate">{role}</p>
                    </div>
                  </div>

                  {/* Amount & Status */}
                  <div className="text-right shrink-0">
                    <p className="font-medium text-gray-800">{amount}</p>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium inline-block mt-1
                ${status === "Success"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                        }`}
                    >
                      {status}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                {i !== arr.length - 1 && (
                  <div className="border-b border-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ================= CONSULTATION BY DEPARTMENT ================= */}
        <div className="bg-white rounded-xl border shadow-sm p-5 w-full" >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <h3 className="text-lg font-semibold">Consultation By Department</h3>
            <select className="border rounded px-3 py-1 text-sm w-fit">
              <option>Monthly</option>
              <option>Weekly</option>
            </select>
          </div>

          <div className="space-y-4">
            {[
              ["Cardiology", 70],
              ["Urology", 85],
              ["Pediatrics", 75],
              ["Gynecology", 80],
              ["Psychiatrist", 65],
            ].map(([dept, value], i) => (
              <div key={i}>
                {/* Row */}
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-800">{dept}</span>
                  <span className="text-gray-600">{value}%</span>
                </div>

                {/* Progress */}
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= PATIENT STATISTICS ================= */}
        <div className="bg-white rounded-xl border shadow-sm p-5 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <h3 className="text-lg font-semibold">Patient Statistics</h3>
            <select className="border rounded px-3 py-1 text-sm w-fit">
              <option>Monthly</option>
              <option>Weekly</option>
            </select>
          </div>

          <div className="space-y-4">
            {[
              ["New Patients", 120],
              ["Returning Patients", 340],
              ["Total Patients", 460],
            ].map(([label, value], i) => (
              <div key={i}>
                {/* Row */}
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-800">{label}</span>
                  <span className="text-gray-600">{value}</span>
                </div>

                {/* Progress */}
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-500"
                    style={{
                      width:
                        label === "New Patients"
                          ? "35%"
                          : label === "Returning Patients"
                            ? "75%"
                            : "100%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>



      </div>

      {/* ================= VITALS ================= */}
      <div className="bg-white rounded-xl border p-5 mb-6">
        <h3 className="text-lg font-semibold mb-4">Vitals</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">

          {[
            {
              label: "Weight",
              value: "100 kg",
              icon: "fa-weight-scale",
              bg: "from-blue-500 to-blue-700",
            },
            {
              label: "Height",
              value: "154 cm",
              icon: "fa-ruler-vertical",
              bg: "from-indigo-500 to-indigo-700",
            },
            {
              label: "BMI",
              value: "19.2",
              icon: "fa-user",
              bg: "from-violet-500 to-violet-700",
            },
            {
              label: "Pulse",
              value: "97%",
              icon: "fa-heart-pulse",
              bg: "from-rose-500 to-rose-700",
            },
            {
              label: "SPO2",
              value: "98%",
              icon: "fa-lungs",
              bg: "from-emerald-500 to-emerald-700",
            },
            {
              label: "Temperature",
              value: "101 °C",
              icon: "fa-temperature-high",
              bg: "from-orange-500 to-orange-700",
            },
          ].map((v, i) => (
            <div
              key={i}
              className={`group rounded-xl p-4 text-white
        bg-gradient-to-br ${v.bg}
        hover:-translate-y-1 hover:shadow-xl transition-all`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-white/20
            flex items-center justify-center
            group-hover:scale-110 transition"
                >
                  <i className={`fas ${v.icon}`}></i>
                </div>

                <div>
                  <p className="text-xs opacity-90">{v.label}</p>
                  <p className="font-bold text-lg">{v.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* ================= RECENT APPOINTMENTS ================= */}
      <div className="bg-white rounded-xl border shadow-sm p-5">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Appointments</h3>
          <select className="border rounded-lg px-3 py-1 text-sm focus:outline-none">
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="px-4 py-3">Name & Designation</th>
                <th className="px-4 py-3">Date & Time</th>
                <th className="px-4 py-3">Consultation Fees</th>
                <th className="px-4 py-3">Mode</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-sm">
              {[
                {
                  name: "Dr. Mick Thompson",
                  role: "Cardiologist",
                  date: "27 May 2025 - 09:30 AM",
                  fee: "$400",
                  mode: "Online",
                  status: "Checked Out",
                },
                {
                  name: "Dr. Sarah Johnson",
                  role: "Orthopedic Surgeon",
                  date: "26 May 2025 - 10:15 AM",
                  fee: "$370",
                  mode: "Online",
                  status: "Checked In",
                },
                {
                  name: "Dr. Emily Carter",
                  role: "Pediatrician",
                  date: "25 May 2025 - 02:40 PM",
                  fee: "$450",
                  mode: "In-Person",
                  status: "Cancelled",
                },
                {
                  name: "Dr. David Lee",
                  role: "Gynecologist",
                  date: "24 May 2025 - 11:30 AM",
                  fee: "$310",
                  mode: "In-Person",
                  status: "Schedule",
                },
                {
                  name: "Dr. Anna Kim",
                  role: "Psychiatrist",
                  date: "23 May 2025 - 04:10 PM",
                  fee: "$400",
                  mode: "Online",
                  status: "Schedule",
                },
              ].map((apt, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  {/* Name */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <i className="fas fa-user-md text-blue-600"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{apt.name}</p>
                        <p className="text-xs text-gray-500">{apt.role}</p>
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 text-gray-600">{apt.date}</td>

                  {/* Fees */}
                  <td className="px-4 py-3 font-semibold text-gray-900">{apt.fee}</td>

                  {/* Mode */}
                  <td className="px-4 py-3 text-gray-600">{apt.mode}</td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                ${apt.status === "Checked Out"
                          ? "bg-green-100 text-green-700"
                          : apt.status === "Checked In"
                            ? "bg-yellow-100 text-yellow-700"
                            : apt.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                    >
                      {apt.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => alert("Schedule clicked")}
                        className="p-2 border rounded-lg hover:bg-gray-100"
                        title="Schedule"
                      >
                        <i className="fas fa-calendar-plus"></i>
                      </button>
                      <button
                        onClick={() => alert("More options")}
                        className="p-2 border rounded-lg hover:bg-gray-100"
                        title="More"
                      >
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
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
};

export default PatientDashboard;
