import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../../../components/common/LoadingSpinner/LoadingSpinner";
import DataTable from "../../../../components/ui/Tables/DataTable";
import Modal from "../../../../components/common/Modal/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyPrescriptions = () => {
  const [loading, setLoading] = useState(true);
  const [prescriptions, setPrescriptions] = useState([]);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const commonMedicines = [
    { name: "Paraceptamol", type: "Pain Relief", color: "text-blue-500", icon: "fa-pills" },
    { name: "Ibuprofen", type: "Anti-inflammatory", color: "text-green-500", icon: "fa-capsules" },
    { name: "Amoxicillin", type: "Antibiotic", color: "text-purple-500", icon: "fa-pills" },
    { name: "Cetirizine", type: "Antihistamine", color: "text-yellow-500", icon: "fa-capsules" },
  ];

  const dosageOptions = ["250mg", "400mg", "500mg", "650mg", "1 tablet", "2 tablets"];
  const frequencyOptions = ["Once daily", "Twice daily", "Three times daily", "After meals", "Before meals"];
  const patients = ["Ravi Kumar", "Anita Sharma", "Suresh Patel", "Priya Singh"];
  const medicines = ["Paraceptamol", "Ibuprofen", "Amoxicillin", "Cetirizine", "Metformin"];

  const [newPrescription, setNewPrescription] = useState({
    patient: "",
    doctor: "Dr. Meena Rao",
    mode: "Video",
    medicine: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const loadPrescriptions = () => {
    setLoading(true);
    setTimeout(() => {
      setPrescriptions([
        { id: 1, patient: "Ravi Kumar", doctor: "Dr. Meena Rao", mode: "Video", medicine: "Paracetamol", dosage: "500mg", frequency: "Twice daily", duration: "5 days", instructions: "After meals", date: "2024-12-01" },
        { id: 2, patient: "Anita Sharma", doctor: "Dr. Meena Rao", mode: "Chat", medicine: "Ibuprofen", dosage: "400mg", frequency: "Three times daily", duration: "3 days", instructions: "With water", date: "2024-11-28" },
      ]);
      setLoading(false);
    }, 900);
  };

  /* ================= ACTIONS ================= */
  const handleCreatePrescription = () => {
    if (!newPrescription.patient || !newPrescription.medicine || !newPrescription.dosage) {
      toast.error("Please fill all required fields");
      return;
    }
    setPrescriptions((prev) => [{ id: prev.length + 1, ...newPrescription }, ...prev]);
    setIsNewModalOpen(false);
    resetForm();
    toast.success("Digital Prescription created successfully");
  };

  const handleUpdatePrescription = () => {
    setPrescriptions((prev) => prev.map((p) => (p.id === selectedPrescription.id ? selectedPrescription : p)));
    setIsEditModalOpen(false);
    setSelectedPrescription(null);
    toast.success("Prescription updated successfully");
  };

  const handleDeletePrescription = (id) => {
    setPrescriptions((prev) => prev.filter((p) => p.id !== id));
    toast.error("Prescription deleted");
  };

  const handleDownloadPrescription = (prescription) => {
    toast.success(`Downloading e-Prescription for ${prescription.patient}`);
  };

  const handleQuickSelectMedicine = (medicineName) => {
  // 1. Pre-fill the new prescription state with the selected medicine
  setNewPrescription((prev) => ({
    ...prev,
    medicine: medicineName,
  }));
  
  // 2. Open the modal
  setIsNewModalOpen(true);
};

  const resetForm = () => {
    setNewPrescription({ patient: "", doctor: "Dr. Meena Rao", mode: "Video", medicine: "", dosage: "", frequency: "", duration: "", instructions: "", date: new Date().toISOString().split("T")[0] });
  };

  const handleInputChange = (field, value) => setNewPrescription((prev) => ({ ...prev, [field]: value }));
  const handleEditInputChange = (field, value) => setSelectedPrescription((prev) => ({ ...prev, [field]: value }));

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-10 animate-fade-in p-4">
      <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />

      {/* HEADER */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          <i className="fas fa-file-medical text-blue-500 mr-2"></i>
          Digital Prescriptions
        </h2>
        <button onClick={() => setIsNewModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm">
          + New Prescription
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <DataTable
          columns={[
            { key: "patient", title: "Patient" },
            { key: "medicine", title: "Medicine" },
            { key: "dosage", title: "Dosage" },
            { key: "mode", title: "Consultation Mode" },
            { key: "date", title: "Date" },
            {
              key: "actions",
              title: "Actions",
              render: (_, row) => (
                <div className="flex gap-2">
                  <button onClick={() => { setSelectedPrescription(row); setIsEditModalOpen(true); }} className="text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition"><i className="fas fa-edit"></i></button>
                  <button onClick={() => handleDownloadPrescription(row)} className="text-green-600 p-2 hover:bg-green-50 rounded-lg transition"><i className="fas fa-download"></i></button>
                  <button onClick={() => handleDeletePrescription(row.id)} className="text-red-600 p-2 hover:bg-red-50 rounded-lg transition"><i className="fas fa-trash"></i></button>
                </div>
              ),
            },
          ]}
          data={prescriptions}
        />
      </div>

   
      {/* COMMONLY PRESCRIBED MEDICINES SECTION */}
      <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
  <h3 className="text-lg font-bold text-gray-800 mb-6">Commonly Prescribed Medicines</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {commonMedicines.map((med, index) => (
      <div 
        key={index} 
        // 1. Add onClick handler
        onClick={() => handleQuickSelectMedicine(med.name)}
        // 2. Add 'cursor-pointer' and 'active:scale-95' for better UX
        className="border border-gray-100 rounded-xl p-6 text-center hover:shadow-md hover:border-blue-200 transition cursor-pointer active:scale-95 bg-white"
      >
        <i className={`fas ${med.icon} ${med.color} text-3xl mb-3`}></i>
        <h4 className="font-bold text-gray-800">{med.name}</h4>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-tight font-medium">{med.type}</p>
      </div>
    ))}
  </div>
</section>


      {/* MODALS REMAIN THE SAME AS PREVIOUSLY PROVIDED */}
      {/* (New/Edit Prescription Modal components code goes here...) */}
         {/* ================= NEW PRESCRIPTION MODAL ================= */}
<Modal
  isOpen={isNewModalOpen}
  onClose={() => {
    setIsNewModalOpen(false)
    resetForm()
  }}
  title="Create New Prescription"
  size="lg"
>
  <div className="modal-form">
    <div className="modal-grid mobile-form-grid">
      <div className="form-group">
        <label className="modal-label">Patient *</label>
        <select
          value={newPrescription.patient}
          onChange={(e) => handleInputChange("patient", e.target.value)}
          className="modal-select"
        >
          <option value="">Select Patient</option>
          {patients.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="modal-label">Date *</label>
        <input
          type="date"
          value={newPrescription.date}
          onChange={(e) => handleInputChange("date", e.target.value)}
          className="modal-input"
        />
      </div>
    </div>

    <div className="modal-grid mobile-form-grid">
      <div className="form-group">
        <label className="modal-label">Medicine *</label>
        <select
          value={newPrescription.medicine}
          onChange={(e) => handleInputChange("medicine", e.target.value)}
          className="modal-select"
        >
          <option value="">Select Medicine</option>
          {medicines.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="modal-label">Dosage *</label>
        <input
          value={newPrescription.dosage}
          onChange={(e) => handleInputChange("dosage", e.target.value)}
          className="modal-input"
        />
      </div>
    </div>

    <div className="modal-grid mobile-form-grid">
      <div className="form-group">
        <label className="modal-label">Frequency *</label>
        <input
          value={newPrescription.frequency}
          onChange={(e) => handleInputChange("frequency", e.target.value)}
          className="modal-input"
        />
      </div>

      <div className="form-group">
        <label className="modal-label">Duration *</label>
        <input
          value={newPrescription.duration}
          onChange={(e) => handleInputChange("duration", e.target.value)}
          className="modal-input"
        />
      </div>
    </div>

    <div className="form-group">
      <label className="modal-label">Instructions</label>
      <textarea
        rows="3"
        value={newPrescription.instructions}
        onChange={(e) => handleInputChange("instructions", e.target.value)}
        className="modal-textarea"
      />
    </div>

    <div className="modal-footer">
      <button
        onClick={() => {
          setIsNewModalOpen(false)
          resetForm()
        }}
        className="modal-btn modal-btn-secondary"
      >
        Cancel
      </button>
      <button
        onClick={handleCreatePrescription}
        className="modal-btn modal-btn-primary"
      >
        Create Prescription
      </button>
    </div>
  </div>
</Modal>

{/* EDIT MODAL */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedPrescription(null);
        }}
        title="Edit Prescription"
        size="lg"
      >
        {selectedPrescription && (
          <div className="space-y-6">
            {/* ROW 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Patient <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedPrescription.patient}
                  onChange={(e) => handleEditInputChange("patient", e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  {patients.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={selectedPrescription.date}
                  onChange={(e) => handleEditInputChange("date", e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* ROW 2 - FIXED MEDICINE MAPPING */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Medicine <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedPrescription.medicine}
                  onChange={(e) => handleEditInputChange("medicine", e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  {/* Changed from commonMedicines.map (objects) to medicines.map (strings) */}
                  {medicines.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Dosage <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedPrescription.dosage}
                  onChange={(e) => handleEditInputChange("dosage", e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  {dosageOptions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* ROW 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Frequency <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedPrescription.frequency}
                  onChange={(e) => handleEditInputChange("frequency", e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  {frequencyOptions.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={selectedPrescription.duration || ""}
                  onChange={(e) => handleEditInputChange("duration", e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 5 days"
                />
              </div>
            </div>

            {/* INSTRUCTIONS */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Instructions
              </label>
              <textarea
                rows="3"
                value={selectedPrescription.instructions || ""}
                onChange={(e) => handleEditInputChange("instructions", e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Additional instructions"
              />
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedPrescription(null);
                }}
                className="px-6 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePrescription}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Update Prescription
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default MyPrescriptions;