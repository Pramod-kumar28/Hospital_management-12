import React, { useState } from 'react';
import Modal from '../../../../components/common/Modal/Modal'; 

const DischargeSummary = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    admissionDate: '',
    dischargeDate: '',
    finalDiagnosis: '',
    hospitalCourse: '',
    dischargeInstructions: '',
    followUpCare: '',
    followUpAppointment: '',
    followUpDoctor: 'Dr. Meena Rao'
  });

  const patients = [
    {
      id: 1,
      name: "Leanne Graham",
      bed: "101",
      admissionDate: new Date(Date.now() - Math.random()*14*24*60*60*1000).toLocaleDateString(),
      condition: "Fever",
      treatment: "Antibiotics",
      status: "ready"
    },
    {
      id: 2,
      name: "Ervin Howell",
      bed: "102",
      admissionDate: new Date(Date.now() - Math.random()*14*24*60*60*1000).toLocaleDateString(),
      condition: "Infection",
      treatment: "IV Fluids",
      status: "improving"
    },
    {
      id: 3,
      name: "Clementine Bauch",
      bed: "103",
      admissionDate: new Date(Date.now() - Math.random()*14*24*60*60*1000).toLocaleDateString(),
      condition: "Fracture",
      treatment: "Rest",
      status: "observation"
    },
    {
      id: 4,
      name: "Patricia Lebsack",
      bed: "104",
      admissionDate: new Date(Date.now() - Math.random()*14*24*60*60*1000).toLocaleDateString(),
      condition: "Migraine",
      treatment: "Physiotherapy",
      status: "ready"
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'ready': return 'status-stable';
      case 'improving': return 'status-improving';
      case 'observation': return 'status-critical';
      default: return 'status-stable';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ready': return 'Ready for discharge';
      case 'improving': return 'Improving';
      case 'observation': return 'Under observation';
      default: return 'Ready for discharge';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveSummary = (e) => {
    e.preventDefault();
    alert('Discharge summary saved successfully!');
  };

  const handlePrintSummary = () => {
    setShowPrintModal(true);
  };

  const handleEmailSummary = () => {
    setShowEmailModal(true);
  };

  const handlePrepareSummary = (patient) => {
    setSelectedPatient(patient);
    setFormData(prev => ({
      ...prev,
      patientName: patient.name
    }));
    alert(`Preparing discharge summary for ${patient.name}`);
  };

  const handlePrintPatient = (patient) => {
    setSelectedPatient(patient);
    setFormData(prev => ({
      ...prev,
      patientName: patient.name
    }));
    setShowPrintModal(true);
  };

  const handleEmailPatient = (patient) => {
    setSelectedPatient(patient);
    setFormData(prev => ({
      ...prev,
      patientName: patient.name
    }));
    setShowEmailModal(true);
  };

  const handleActualPrint = () => {
    window.print();
    setShowPrintModal(false);
  };

  const handleSendEmail = () => {
    alert('Discharge summary emailed successfully!');
    setShowEmailModal(false);
  };

  return (
    <div className="space-y-6 overflow-x-hidden">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-3">Discharge Summary Support</h2>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {patients.map(patient => (
          <div key={patient.id} className="bg-white border rounded p-4 card-shadow fade-in">
            <div className="flex items-center gap-3 mb-2">
              <img src={`https://i.pravatar.cc/60?img=${patient.id+10}`} className="avatar" alt={patient.name} />
              <div>
                <h3 className="font-semibold text-blue-700">{patient.name}</h3>
                <p className="text-xs text-gray-500">Bed {patient.bed}</p>
              </div>
            </div>
            <div className="text-sm text-gray-600 space-y-1 mb-3">
              <p><strong>Admission Date:</strong> {patient.admissionDate}</p>
              <p><strong>Condition:</strong> {patient.condition}</p>
              <p><strong>Treatment:</strong> {patient.treatment}</p>
              <p><strong>Current Status:</strong> 
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(patient.status)} ml-1`}>
                  {getStatusText(patient.status)}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handlePrepareSummary(patient)}
                className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded flex items-center hover:bg-blue-200"
              >
                <i className="fas fa-file-medical mr-1"></i>Prepare Summary
              </button>
              <button 
                onClick={() => handlePrintPatient(patient)}
                className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded flex items-center hover:bg-green-200"
              >
                <i className="fas fa-print mr-1"></i>Print
              </button>
              <button 
                onClick={() => handleEmailPatient(patient)}
                className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded flex items-center hover:bg-purple-200"
              >
                <i className="fas fa-envelope mr-1"></i>Email
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Discharge Summary Template */}
      <div className="bg-white p-4 border rounded card-shadow">
        <h3 className="text-lg font-semibold mb-3">Discharge Summary Template</h3>
        <form onSubmit={handleSaveSummary} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
              <input 
                type="text" 
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                className="w-full border rounded p-2" 
                placeholder="Enter patient name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Admission Date</label>
              <input 
                type="date" 
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleInputChange}
                className="w-full border rounded p-2" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discharge Date</label>
              <input 
                type="date" 
                name="dischargeDate"
                value={formData.dischargeDate}
                onChange={handleInputChange}
                className="w-full border rounded p-2" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attending Physician</label>
              <input 
                type="text" 
                name="followUpDoctor"
                value={formData.followUpDoctor}
                onChange={handleInputChange}
                className="w-full border rounded p-2" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Final Diagnosis</label>
            <input 
              type="text" 
              name="finalDiagnosis"
              value={formData.finalDiagnosis}
              onChange={handleInputChange}
              className="w-full border rounded p-2" 
              placeholder="Enter final diagnosis" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Course</label>
            <textarea 
              name="hospitalCourse"
              value={formData.hospitalCourse}
              onChange={handleInputChange}
              className="w-full border rounded p-2" 
              rows="3" 
              placeholder="Describe hospital course"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discharge Instructions</label>
            <textarea 
              name="dischargeInstructions"
              value={formData.dischargeInstructions}
              onChange={handleInputChange}
              className="w-full border rounded p-2" 
              rows="3" 
              placeholder="Enter discharge instructions"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Care</label>
            <textarea 
              name="followUpCare"
              value={formData.followUpCare}
              onChange={handleInputChange}
              className="w-full border rounded p-2" 
              rows="2" 
              placeholder="Enter follow-up care instructions"
            ></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Appointment</label>
              <input 
                type="date" 
                name="followUpAppointment"
                value={formData.followUpAppointment}
                onChange={handleInputChange}
                className="w-full border rounded p-2" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Doctor</label>
              <input 
                type="text" 
                name="followUpDoctor"
                value={formData.followUpDoctor}
                onChange={handleInputChange}
                className="w-full border rounded p-2" 
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <i className="fas fa-save mr-1"></i>Save Summary
            </button>
            <button 
              type="button" 
              onClick={handlePrintSummary}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              <i className="fas fa-print mr-1"></i>Print Summary
            </button>
            <button 
              type="button" 
              onClick={handleEmailSummary}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              <i className="fas fa-envelope mr-1"></i>Email Summary
            </button>
          </div>
        </form>
      </div>

      {/* Print Preview Modal */}
      <Modal
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
        title="Print Preview - Discharge Summary"
        size="xl"
      >
        <div className="space-y-6">
          {/* Print Header */}
          <div className="text-center border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800">DISCHARGE SUMMARY</h2>
            <p className="text-gray-600">MediCloud Hospital</p>
          </div>

          {/* Patient Information */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Patient Name:</strong> {formData.patientName || 'Not specified'}</p>
              <p><strong>Admission Date:</strong> {formData.admissionDate || 'Not specified'}</p>
              <p><strong>Discharge Date:</strong> {formData.dischargeDate || 'Not specified'}</p>
            </div>
            <div>
              <p><strong>Attending Physician:</strong> {formData.followUpDoctor}</p>
              <p><strong>Follow-up Doctor:</strong> {formData.followUpDoctor}</p>
              <p><strong>Follow-up Appointment:</strong> {formData.followUpAppointment || 'Not scheduled'}</p>
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 border-b pb-1">Final Diagnosis</h3>
              <p className="mt-2">{formData.finalDiagnosis || 'No diagnosis specified'}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 border-b pb-1">Hospital Course</h3>
              <p className="mt-2 whitespace-pre-line">{formData.hospitalCourse || 'No hospital course details provided'}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 border-b pb-1">Discharge Instructions</h3>
              <p className="mt-2 whitespace-pre-line">{formData.dischargeInstructions || 'No discharge instructions provided'}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 border-b pb-1">Follow-up Care</h3>
              <p className="mt-2 whitespace-pre-line">{formData.followUpCare || 'No follow-up care instructions provided'}</p>
            </div>
          </div>

          {/* Signature Section */}
          <div className="border-t pt-4 mt-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="border-b pb-8">_________________________</p>
                <p><strong>Attending Physician</strong></p>
                <p>{formData.followUpDoctor}</p>
              </div>
              <div>
                <p className="border-b pb-8">_________________________</p>
                <p><strong>Date</strong></p>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Print Actions */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => setShowPrintModal(false)}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleActualPrint}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <i className="fas fa-print mr-1"></i>Print Now
            </button>
          </div>
        </div>
      </Modal>

      {/* Email Preview Modal */}
      <Modal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        title="Email Discharge Summary"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <input 
              type="email" 
              className="w-full border rounded p-2" 
              placeholder="recipient@example.com"
              defaultValue="patient@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input 
              type="text" 
              className="w-full border rounded p-2" 
              defaultValue={`Discharge Summary - ${formData.patientName || 'Patient'}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows="6"
              defaultValue={`Dear Patient,

Please find your discharge summary attached.

Patient: ${formData.patientName || 'Not specified'}
Discharge Date: ${formData.dischargeDate || 'Not specified'}

If you have any questions, please contact our office.

Best regards,
MediCloud Hospital`}
            ></textarea>
          </div>

          <div className="bg-blue-50 p-3 rounded">
            <p className="text-sm text-blue-700">
              <i className="fas fa-info-circle mr-1"></i>
              The discharge summary document will be attached automatically.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowEmailModal(false)}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSendEmail}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              <i className="fas fa-paper-plane mr-1"></i>Send Email
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DischargeSummary;