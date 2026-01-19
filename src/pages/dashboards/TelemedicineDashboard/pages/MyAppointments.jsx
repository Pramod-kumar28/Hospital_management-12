import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../../../components/common/LoadingSpinner/LoadingSpinner";
import DataTable from "../../../../components/ui/Tables/DataTable";
import Modal from "../../../../components/common/Modal/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAppointments = () => {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [newAppointment, setNewAppointment] = useState({
    patient: "",
    date: "",
    time: "",
    reason: "",
    type: "Regular",
    mode: "Video",
    notes: "",
  });

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    setLoading(true);
    setTimeout(() => {
      setAppointments([
        {
          id: 1,
          patient: "Ravi Kumar",
          time: "10:30 AM",
          reason: "Fever",
          status: "Confirmed",
          type: "Follow-up",
          mode: "Video",
        },
        {
          id: 2,
          patient: "Anita Sharma",
          time: "11:00 AM",
          reason: "Back Pain",
          status: "Pending",
          type: "New",
          mode: "Chat",
        },
        {
          id: 3,
          patient: "Priya Singh",
          time: "12:00 PM",
          reason: "Migraine",
          status: "Confirmed",
          type: "Urgent",
          mode: "Video",
        },
      ]);
      setLoading(false);
    }, 900);
  };

  /* ================= ACTIONS ================= */

  const handleScheduleAppointment = () => {
    if (
      !newAppointment.patient ||
      !newAppointment.time ||
      !newAppointment.reason
    ) {
      toast.error("Please fill all the Required fields");
      return;
    }

    setAppointments((prev) => [
      {
        id: prev.length + 1,
        patient: newAppointment.patient,
        time: newAppointment.time,
        reason: newAppointment.reason,
        type: newAppointment.type,
        mode: newAppointment.mode,
        status: "Pending",
      },
      ...prev,
    ]);
    setIsScheduleModalOpen(false);
    resetNewAppointmentForm();
    toast.success("Telemedicine consultation scheduled");
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditModalOpen(true);
    toast.info("Edit telemedicine appointment");
  };

  const handleUpdateAppointment = () => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === selectedAppointment.id ? selectedAppointment : apt
      )
    );
    setIsEditModalOpen(false);
    setSelectedAppointment(null);
    toast.success("Appointment updated successfully");
  };

  const handleJoinConsultation = (appointment) => {
    if (appointment.status !== "Confirmed") {
      toast.warning("Consultation not confirmed yet");
      return;
    }
    toast.info(
      `Joining ${appointment.mode} consultation with ${appointment.patient}`
    );
  };

  const handleCancelAppointment = (appointmentId) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: "Cancelled" } : apt
      )
    );
    toast.error("Consultation cancelled");
  };

  const resetNewAppointmentForm = () => {
    setNewAppointment({
      patient: "",
      date: "",
      time: "",
      reason: "",
      type: "Regular",
      mode: "Video",
      notes: "",
    });
  };

  const handleInputChange = (field, value) => {
    setNewAppointment((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditInputChange = (field, value) => {
    setSelectedAppointment((prev) => ({ ...prev, [field]: value }));
  };

  const patients = [
    "Ravi Kumar",
    "Anita Sharma",
    "Suresh Patel",
    "Priya Singh",
    "Rajesh Kumar",
  ];

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
  ];

  const appointmentTypes = ["Regular", "Follow-up", "New", "Urgent"];
  const consultationModes = ["Video", "Audio", "Chat"];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6 animate-fade-in">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />

      {/* HEADER */}
      <hr />
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
          <i className="fas fa-video text-blue-500 mr-2"></i>
          Telemedicine Appointments
        </h2>

        <button
          onClick={() => {
            toast.info("schedule consultation form")
            setIsScheduleModalOpen(true)}}
          className="btn btn-primary"
        >
          <i className="fas fa-plus mr-2"></i>
          Schedule Consultation
        </button>
      </div>

      {/* TABLE */}
      <DataTable
        columns={[
          { key: "patient", title: "Patient", sortable: true },
          { key: "time", title: "Time", sortable: true },
          { key: "reason", title: "Reason" },
          {
            key: "mode",
            title: "Mode",
            render: (v) => (
              <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                {v}
              </span>
            ),
          },
          {
            key: "status",
            title: "Status",
            render: (v) => (
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  v === "Confirmed"
                    ? "status-confirmed"
                    : v === "Cancelled"
                    ? "status-cancelled"
                    : "status-pending"
                }`}
              >
                {v}
              </span>
            ),
          },
          {
            key: "actions",
            title: "Actions",
            render: (_, row) => (
              <div className="flex gap-2">
                <button
                  onClick={() => handleJoinConsultation(row)}
                  disabled={row.status !== "Confirmed"}
                  className={`p-1 rounded ${
                    row.status === "Confirmed"
                      ? "text-green-600 hover:bg-green-50"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                  title="Join Consultation"
                >
                  <i className="fas fa-video"></i>
                </button>

                <button
                  onClick={() => handleEditAppointment(row)}
                  className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  onClick={() => handleCancelAppointment(row.id)}
                  className="text-red-600 hover:bg-red-50 p-1 rounded"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ),
          },
        ]}
        data={appointments}
      />


      {/* ================= NEW DASHBOARD SECTION BELOW TABLE ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        
        {/* APPOINTMENT STATISTICS */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800">Appointment Statistics</h3>
          <div className="space-y-3">
            {[
              { label: 'Confirmed', count: appointments.filter(a => a.status === 'Confirmed').length, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
              { label: 'Pending', count: appointments.filter(a => a.status === 'Pending').length, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-100' },
              { label: 'Cancelled', count: appointments.filter(a => a.status === 'Cancelled').length, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
              { label: 'Completed', count: appointments.filter(a => a.status === 'Completed').length, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
            ].map((stat, idx) => (
              <div key={idx} className={`${stat.bg} ${stat.border} border p-4 rounded-xl flex justify-between items-center shadow-sm`}>
                <span className="font-semibold text-gray-700">{stat.label}</span>
                <span className={`text-xl font-bold ${stat.color}`}>{stat.count}</span>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* UPCOMING SCHEDULE FEED */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Upcoming Schedule</h3>
            <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
          </div>
          
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {appointments.filter(a => a.status !== 'Cancelled').map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-4 border border-gray-50 rounded-xl hover:bg-gray-50 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{apt.patient}</h4>
                    <p className="text-xs text-gray-500 font-medium">
                      {apt.time} • <span className="text-blue-500">{apt.reason}</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    apt.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {apt.status}
                  </span>
                  <span className="hidden sm:inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold">
                    {apt.type}
                  </span>
                  <button 
                    onClick={() => handleJoinConsultation(apt)}
                    className="ml-2 p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <i className="fas fa-video text-xs"></i>
                  </button>
                </div>
              </div>
            ))}
            {appointments.length === 0 && (
              <p className="text-center text-gray-400 py-10">No appointments scheduled for today.</p>
            )}
          </div>
        </div>
      </div>





{/* ================= Schedule Appointment Modal ================= */}
<Modal
  isOpen={isScheduleModalOpen}
  onClose={() => {
    setIsScheduleModalOpen(false)
    resetNewAppointmentForm()
  }}
  title="Schedule New Appointment"
  size="lg"
>
  <div className="space-y-4">
    <div className="form-group">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Patient *
      </label>
      <select
        value={newAppointment.patient}
        onChange={(e) => handleInputChange("patient", e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Patient</option>
        {patients.map((patient) => (
          <option key={patient} value={patient}>
            {patient}
          </option>
        ))}
      </select>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-2">Date *</label>
        <input
          type="date"
          value={newAppointment.date}
          onChange={(e) => handleInputChange("date", e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Time *</label>
        <select
          value={newAppointment.time}
          onChange={(e) => handleInputChange("time", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Time</option>
          {timeSlots.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">
        Reason for Visit *
      </label>
      <input
        type="text"
        value={newAppointment.reason}
        onChange={(e) => handleInputChange("reason", e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        placeholder="e.g., Fever, Follow-up"
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">
        Appointment Type *
      </label>
      <select
        value={newAppointment.type}
        onChange={(e) => handleInputChange("type", e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        {appointmentTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">
        Additional Notes
      </label>
      <textarea
        rows="3"
        value={newAppointment.notes}
        onChange={(e) => handleInputChange("notes", e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="flex justify-end gap-3 pt-4">
      <button
        onClick={() => {
          setIsScheduleModalOpen(false)
          resetNewAppointmentForm()
        }}
        className="px-4 py-2 bg-gray-100 rounded-lg"
      >
        Cancel
      </button>
      <button
        onClick={handleScheduleAppointment}
        disabled={
          !newAppointment.patient ||
          !newAppointment.date ||
          !newAppointment.time ||
          !newAppointment.reason
        }
        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
      >
        Schedule Appointment
      </button>
    </div>
  </div>
</Modal>

{/* ================= Edit Appointment Modal ================= */}
<Modal
  isOpen={isEditModalOpen}
  onClose={() => {
    setIsEditModalOpen(false)
    setSelectedAppointment(null)
  }}
  title="Edit Appointment"
  size="md"
>
  {selectedAppointment && (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Patient</label>
        <input
          type="text"
          value={selectedAppointment.patient}
          onChange={(e) =>
            handleEditInputChange("patient", e.target.value)
          }
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Time</label>
          <select
            value={selectedAppointment.time}
            onChange={(e) =>
              handleEditInputChange("time", e.target.value)
            }
            className="w-full px-3 py-2 border rounded-lg"
          >
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            value={selectedAppointment.status}
            onChange={(e) =>
              handleEditInputChange("status", e.target.value)
            }
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Reason</label>
        <input
          type="text"
          value={selectedAppointment.reason}
          onChange={(e) =>
            handleEditInputChange("reason", e.target.value)
          }
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Type</label>
        <select
          value={selectedAppointment.type}
          onChange={(e) =>
            handleEditInputChange("type", e.target.value)
          }
          className="w-full px-3 py-2 border rounded-lg"
        >
          {appointmentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={() => {
            setIsEditModalOpen(false)
            setSelectedAppointment(null)
          }}
          className="px-4 py-2 bg-gray-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdateAppointment}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Update Appointment
        </button>
      </div>
    </div>
  )}
</Modal>



    </div>
  );
};

export default MyAppointments;
