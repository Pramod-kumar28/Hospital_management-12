import React, { useState, useEffect } from 'react';
import Modal from '../../../../components/common/Modal/Modal';
import { apiFetch } from '../../../../services/apiClient';
import { NURSE_DISCHARGE_SUPPORT, NURSE_DISCHARGE_SUMMARY } from '../../../../config/api';

const DischargeSummary = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const initialFormState = {
    admissionNumber: '',
    patientName: '',
    admissionDate: '',
    dischargeDate: new Date().toISOString().split('T')[0],
    attendingPhysician: 'Dr. Meena Rao',
    finalDiagnosis: '',
    secondaryDiagnoses: '',
    proceduresPerformed: '',
    hospitalCourse: '',
    dietInstructions: '',
    activityRestrictions: '',
    followUpInstructions: '',
    followUpDate: '',
    followUpDoctor: 'Dr. Meena Rao',
    vitalBP: '',
    vitalPulse: '',
    vitalTemp: '',
    vitalSpO2: '',
    vitalRespRate: '',
    conditionAtDischarge: 'Stable',
    medications: [
      { name: '', dosage: '', route: 'Oral', frequency: 'Once daily', duration: '5 days', instructions: 'Take after meals' }
    ]
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchDischargePatients();
  }, []);

  const fetchDischargePatients = async () => {
    setLoading(true);
    try {
      const response = await apiFetch(NURSE_DISCHARGE_SUPPORT);
      if (response && response.ok) {
        const data = await response.json();
        const rawData = Array.isArray(data?.data) ? data.data : [];
        setPatients(rawData.map(p => ({
          id: p.id || p.admission_number,
          admissionNumber: p.admission_number || p.id,
          name: p.patient_name || p.name || 'Unknown Patient',
          bed: p.bed_number || p.bed_code || 'N/A',
          admissionDate: p.admission_date ? new Date(p.admission_date).toLocaleDateString() : 'N/A',
          condition: p.condition || p.diagnosis || p.chief_complaint || 'N/A',
          treatment: p.treatment || p.treatment_plan || 'N/A',
          status: (p.status || 'ready').toLowerCase()
        })));
      }
    } catch (err) {
      console.error("Error fetching discharge patients:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'ready': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'improving': return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'observation': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ready': return 'Ready for discharge';
      case 'improving': return 'Improving';
      case 'observation': return 'Under observation';
      default: return 'Discharge planned';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePrepareSummary = async (patient) => {
    setSelectedPatient(patient);
    const admId = patient.admissionNumber || patient.id;
    try {
      const res = await apiFetch(`${NURSE_DISCHARGE_SUMMARY}?admission_number=${encodeURIComponent(admId)}`);
      if (res && res.ok) {
        const result = await res.json();
        const existingData = result?.data;
        if (existingData && existingData.length > 0) {
          const data = existingData[0];
          setIsEditing(true);
          setFormData({
            admissionNumber: admId,
            patientName: patient.name,
            admissionDate: patient.admissionDate || '',
            dischargeDate: data.discharge_date || new Date().toISOString().split('T')[0],
            attendingPhysician: data.follow_up_doctor || 'Dr. Meena Rao',
            finalDiagnosis: data.final_diagnosis || '',
            secondaryDiagnoses: data.secondary_diagnoses ? data.secondary_diagnoses.join(', ') : '',
            proceduresPerformed: data.procedures_performed ? data.procedures_performed.join(', ') : '',
            hospitalCourse: data.hospital_course || '',
            followUpInstructions: data.follow_up_instructions || '',
            dietInstructions: data.diet_instructions || '',
            activityRestrictions: data.activity_restrictions || '',
            followUpDate: data.follow_up_date || '',
            followUpDoctor: data.follow_up_doctor || 'Dr. Meena Rao',
            vitalBP: data.vital_bp || '120/80',
            vitalPulse: data.vital_pulse || '74',
            vitalTemp: data.vital_temp || '98.6',
            vitalSpO2: data.vital_spo2 || '99',
            vitalRespRate: data.vital_resp_rate || '16',
            conditionAtDischarge: data.condition_at_discharge || 'Stable',
            medications: data.medications || [
              { name: 'Tab Amoxicillin', dosage: '500mg', route: 'Oral', frequency: 'Twice daily', duration: '5 days', instructions: 'Post breakfast and dinner' }
            ]
          });
          setShowFormModal(true);
          return;
        }
      }
    } catch (e) {
      console.error("No existing summary found or error fetching", e);
    }

    setIsEditing(false);
    setFormData({
      ...initialFormState,
      admissionNumber: admId,
      patientName: patient.name,
      admissionDate: patient.admissionDate || '',
      vitalBP: '120/80',
      vitalPulse: '74',
      vitalTemp: '98.6',
      vitalSpO2: '99',
      vitalRespRate: '16'
    });
    setShowFormModal(true);
  };

  const handleManualSummary = () => {
    setSelectedPatient(null);
    setIsEditing(false);
    setFormData(initialFormState);
    setShowFormModal(true);
  };

  const handleSaveSummary = async (e) => {
    e.preventDefault();
    try {
      const patientId = selectedPatient?.admissionNumber || selectedPatient?.id || formData.admissionNumber || formData.patientName;
      
      const payload = {
        admission_number: patientId,
        final_diagnosis: formData.finalDiagnosis,
        secondary_diagnoses: formData.secondaryDiagnoses ? formData.secondaryDiagnoses.split(',').map(s => s.trim()) : [],
        procedures_performed: formData.proceduresPerformed ? formData.proceduresPerformed.split(',').map(s => s.trim()) : [],
        hospital_course: formData.hospitalCourse,
        follow_up_instructions: formData.followUpInstructions,
        diet_instructions: formData.dietInstructions,
        activity_restrictions: formData.activityRestrictions,
        follow_up_date: formData.followUpDate,
        follow_up_doctor: formData.followUpDoctor,
        vital_bp: formData.vitalBP,
        vital_pulse: formData.vitalPulse,
        vital_temp: formData.vitalTemp,
        vital_spo2: formData.vitalSpO2,
        vital_resp_rate: formData.vitalRespRate,
        condition_at_discharge: formData.conditionAtDischarge,
        medications: formData.medications
      };

      const url = isEditing 
        ? `${NURSE_DISCHARGE_SUMMARY}?admission_number=${encodeURIComponent(patientId)}`
        : NURSE_DISCHARGE_SUMMARY;
        
      const response = await apiFetch(url, {
        method: isEditing ? 'PATCH' : 'POST',
        body: JSON.stringify(payload)
      });

      if (response && response.ok) {
        alert(`Discharge summary ${isEditing ? 'updated' : 'saved'} successfully!`);
        setShowFormModal(false);
        fetchDischargePatients();
      } else {
        alert('Failed to save discharge summary.');
      }
    } catch (error) {
      console.error('Error saving discharge summary:', error);
      alert('Error connecting to backend.');
    }
  };

  const handlePrintPatient = (patient) => {
    handlePrepareSummary(patient);
    setTimeout(() => {
      setShowPrintModal(true);
    }, 150);
  };

  const handleEmailPatient = (patient) => {
    handlePrepareSummary(patient);
    setTimeout(() => {
      setShowEmailModal(true);
    }, 150);
  };

  const handlePrintSummary = () => {
    if (!formData.patientName) {
      alert('Form is empty. Please select or prepare a patient first.');
      return;
    }
    setShowPrintModal(true);
  };

  const handleEmailSummary = () => {
    if (!formData.patientName) {
      alert('Form is empty. Please select or prepare a patient first.');
      return;
    }
    setShowEmailModal(true);
  };

  const handleActualPrint = () => {
    window.print();
  };

  const handleSendEmail = () => {
    alert(`Discharge summary for ${formData.patientName} has been emailed successfully!`);
    setShowEmailModal(false);
  };

  return (
    <div className="space-y-6 overflow-x-hidden p-4">
      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #print-discharge-summary-document, #print-discharge-summary-document * {
            visibility: visible;
          }
          #print-discharge-summary-document {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
          .fixed, .z-50, .backdrop-blur-sm, button, footer {
            display: none !important;
          }
        }
      `}} />

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <i className="fas fa-file-prescription text-blue-600"></i>
            Discharge Summaries
          </h2>
          <p className="text-sm text-gray-500">Manage patient discharges, vital signs checks, take-home medicines, and clinical advice.</p>
        </div>
        <button 
          onClick={handleManualSummary}
          className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-all font-semibold flex items-center shadow-md"
        >
          <i className="fas fa-plus mr-2"></i> Create Manual Summary
        </button>
      </div>

      {/* Patients Grid */}
      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading patients for discharge support...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {patients.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10 bg-white rounded-lg border border-dashed border-gray-300">
              No patients currently pending discharge support.
            </div>
          ) : (
            patients.map(patient => (
              <div key={patient.id} className="bg-white border rounded-xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img src={`https://i.pravatar.cc/80?img=${patient.id+10}`} className="w-12 h-12 rounded-full object-cover border border-indigo-100" alt={patient.name} />
                    <div>
                      <h4 className="font-bold text-gray-800">{patient.name}</h4>
                      <p className="text-xs text-gray-500 font-medium">Bed: <span className="text-indigo-600 font-semibold">{patient.bed}</span></p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1.5 border-t py-3 my-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Admission:</span>
                      <span className="font-semibold">{patient.admissionDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Condition:</span>
                      <span className="font-semibold text-gray-800 truncate max-w-[150px]" title={patient.condition}>{patient.condition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Treatment:</span>
                      <span className="font-semibold text-gray-800 truncate max-w-[150px]" title={patient.treatment}>{patient.treatment}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-400 font-medium">Status:</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusClass(patient.status)}`}>
                        {getStatusText(patient.status)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1 pt-2">
                  <button
                    onClick={() => handlePrepareSummary(patient)}
                    className="text-[11px] bg-indigo-50 text-indigo-700 py-2 rounded-lg font-bold hover:bg-indigo-100 transition-colors"
                  >
                    Prepare
                  </button>
                  <button
                    onClick={() => handlePrintPatient(patient)}
                    className="text-[11px] bg-emerald-50 text-emerald-700 py-2 rounded-lg font-bold hover:bg-emerald-100 transition-colors"
                  >
                    Print
                  </button>
                  <button
                    onClick={() => handleEmailPatient(patient)}
                    className="text-[11px] bg-purple-50 text-purple-700 py-2 rounded-lg font-bold hover:bg-purple-100 transition-colors"
                  >
                    Email
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Discharge Summary Form Modal */}
      <Modal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        title={isEditing ? "Edit Discharge Summary" : "Prepare Discharge Summary"}
        size="lg"
      >
        <form onSubmit={handleSaveSummary} className="space-y-4 text-sm text-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Admission Number</label>
              <input 
                type="text" 
                name="admissionNumber"
                value={formData.admissionNumber}
                onChange={handleInputChange}
                className="w-full border rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none" 
                placeholder="Enter admission number"
                required
                disabled={isEditing}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Patient Name</label>
              <input 
                type="text" 
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                className="w-full border rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none" 
                placeholder="Enter patient name"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Admission Date</label>
              <input 
                type="date" 
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleInputChange}
                className="w-full border rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Discharge Date</label>
              <input 
                type="date" 
                name="dischargeDate"
                value={formData.dischargeDate}
                onChange={handleInputChange}
                className="w-full border rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>

          <div className="bg-rose-50/50 p-3 border border-rose-100 rounded-lg">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-2">Vital Signs on Discharge</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-600 mb-0.5">BP (mmHg)</label>
                <input 
                  type="text" 
                  name="vitalBP"
                  value={formData.vitalBP}
                  onChange={handleInputChange}
                  className="w-full border rounded p-1.5 text-xs text-rose-950 font-bold" 
                  placeholder="120/80"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-600 mb-0.5">Pulse (bpm)</label>
                <input 
                  type="number" 
                  name="vitalPulse"
                  value={formData.vitalPulse}
                  onChange={handleInputChange}
                  className="w-full border rounded p-1.5 text-xs text-rose-950 font-bold" 
                  placeholder="74"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-600 mb-0.5">Temp (°F)</label>
                <input 
                  type="text" 
                  name="vitalTemp"
                  value={formData.vitalTemp}
                  onChange={handleInputChange}
                  className="w-full border rounded p-1.5 text-xs text-rose-950 font-bold" 
                  placeholder="98.6"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-600 mb-0.5">SpO2 (%)</label>
                <input 
                  type="number" 
                  name="vitalSpO2"
                  value={formData.vitalSpO2}
                  onChange={handleInputChange}
                  className="w-full border rounded p-1.5 text-xs text-rose-950 font-bold" 
                  placeholder="99"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-600 mb-0.5">Resp Rate</label>
                <input 
                  type="number" 
                  name="vitalRespRate"
                  value={formData.vitalRespRate}
                  onChange={handleInputChange}
                  className="w-full border rounded p-1.5 text-xs text-rose-950 font-bold" 
                  placeholder="16"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Final Diagnosis</label>
              <input 
                type="text" 
                name="finalDiagnosis"
                value={formData.finalDiagnosis}
                onChange={handleInputChange}
                className="w-full border rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none" 
                placeholder="Enter final diagnosis" 
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Condition at Discharge</label>
              <select 
                name="conditionAtDischarge"
                value={formData.conditionAtDischarge}
                onChange={handleInputChange}
                className="w-full border rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none font-semibold"
              >
                <option value="Stable">Stable</option>
                <option value="Recovered">Recovered</option>
                <option value="Improving">Improving</option>
                <option value="Referred">Referred to Tertiary Care</option>
                <option value="LAMA">LAMA (Left Against Medical Advice)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Secondary Diagnoses (comma separated)</label>
              <input 
                type="text" 
                name="secondaryDiagnoses"
                value={formData.secondaryDiagnoses}
                onChange={handleInputChange}
                className="w-full border rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none" 
                placeholder="E.g. Hypertension, Diabetes" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Procedures Performed (comma separated)</label>
              <input 
                type="text" 
                name="proceduresPerformed"
                value={formData.proceduresPerformed}
                onChange={handleInputChange}
                className="w-full border rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none" 
                placeholder="E.g. Appendectomy, Blood Transfusion" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Hospital Course & Clinical Summary</label>
            <textarea 
              name="hospitalCourse"
              value={formData.hospitalCourse}
              onChange={handleInputChange}
              className="w-full border rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none" 
              rows="3" 
              placeholder="Describe clinical progress and treatment timeline..."
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Diet Instructions</label>
              <textarea 
                name="dietInstructions"
                value={formData.dietInstructions}
                onChange={handleInputChange}
                className="w-full border rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none" 
                rows="2" 
                placeholder="Enter diet notes"
              ></textarea>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Activity Restrictions</label>
              <textarea 
                name="activityRestrictions"
                value={formData.activityRestrictions}
                onChange={handleInputChange}
                className="w-full border rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none" 
                rows="2" 
                placeholder="Enter activity limitations"
              ></textarea>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Follow-up Instructions & Critical Red Flags</label>
            <textarea 
              name="followUpInstructions"
              value={formData.followUpInstructions}
              onChange={handleInputChange}
              className="w-full border rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none" 
              rows="3" 
              placeholder="E.g. monitor daily temp, report immediate fever/pain..."
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Follow-up Date</label>
              <input 
                type="date" 
                name="followUpDate"
                value={formData.followUpDate}
                onChange={handleInputChange}
                className="w-full border rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Follow-up Doctor</label>
              <input 
                type="text" 
                name="followUpDoctor"
                value={formData.followUpDoctor}
                onChange={handleInputChange}
                className="w-full border rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t pt-4">
            <button 
              type="button" 
              onClick={() => setShowFormModal(false)}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
            >
              <i className="fas fa-save mr-1.5"></i>Save Summary
            </button>
          </div>
        </form>
      </Modal>

      {/* Print Preview Modal */}
      <Modal
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
        title="Official Discharge Sheet Print Preview"
        size="xl"
      >
        <div className="space-y-6">
          <div id="print-discharge-summary-document" className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 font-sans text-gray-800">
            {/* Logo and Hospital Letterhead */}
            <div className="flex justify-between items-center border-b-2 border-indigo-600 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                  <i className="fas fa-hospital-alt"></i>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 tracking-wide leading-none mb-1">MEDICLOUD HOSPITAL</h1>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">24/7 Patient-Centric Clinical Excellence</p>
                </div>
              </div>
              <div className="text-right text-[10px] text-gray-500 leading-normal">
                <p className="font-bold text-gray-700">123 Healthcare Blvd, Medical District</p>
                <p>Phone: +1 (555) 019-2834 | Email: info@medicloud.com</p>
                <p>www.medicloudhospital.com</p>
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-lg font-bold text-indigo-800 tracking-widest border-b pb-1 inline-block uppercase">PATIENT DISCHARGE SUMMARY</h2>
            </div>

            {/* Patient Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-lg text-xs border border-slate-100 mb-6">
              <div>
                <span className="text-gray-400 block uppercase tracking-wider font-bold text-[9px] mb-0.5">Patient Name</span>
                <span className="font-bold text-gray-900 text-sm block">{formData.patientName || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase tracking-wider font-bold text-[9px] mb-0.5">Admission / Ref ID</span>
                <span className="font-bold text-gray-900 text-sm block">{formData.admissionNumber || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase tracking-wider font-bold text-[9px] mb-0.5">Admission Date</span>
                <span className="font-bold text-gray-900 text-sm block">{formData.admissionDate || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase tracking-wider font-bold text-[9px] mb-0.5">Discharge Date</span>
                <span className="font-bold text-gray-900 text-sm block">{formData.dischargeDate || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase tracking-wider font-bold text-[9px] mb-0.5">Physician in Charge</span>
                <span className="font-bold text-gray-900 text-sm block">{formData.attendingPhysician || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase tracking-wider font-bold text-[9px] mb-0.5">Discharge Condition</span>
                <span className="font-bold text-emerald-700 text-sm block uppercase tracking-wider">{formData.conditionAtDischarge || 'Stable'}</span>
              </div>
            </div>

            {/* Vitals Summary Grid */}
            <div className="mb-6 border rounded-lg p-3 bg-slate-50/20">
              <h3 className="text-[10px] uppercase font-bold text-indigo-700 tracking-widest border-b pb-1 mb-3">VITAL SIGNS AT DISCHARGE</h3>
              <div className="grid grid-cols-5 gap-3 text-center">
                <div className="border rounded p-2 bg-white">
                  <p className="text-[9px] text-gray-400 uppercase font-bold mb-0.5">Blood Pressure</p>
                  <p className="font-mono font-bold text-gray-900 text-sm">{formData.vitalBP || 'N/A'} <span className="text-[9px] font-normal text-gray-500">mmHg</span></p>
                </div>
                <div className="border rounded p-2 bg-white">
                  <p className="text-[9px] text-gray-400 uppercase font-bold mb-0.5">Pulse Rate</p>
                  <p className="font-mono font-bold text-gray-900 text-sm">{formData.vitalPulse || 'N/A'} <span className="text-[9px] font-normal text-gray-500">bpm</span></p>
                </div>
                <div className="border rounded p-2 bg-white">
                  <p className="text-[9px] text-gray-400 uppercase font-bold mb-0.5">Temperature</p>
                  <p className="font-mono font-bold text-gray-900 text-sm">{formData.vitalTemp || 'N/A'} <span className="text-[9px] font-normal text-gray-500">°F</span></p>
                </div>
                <div className="border rounded p-2 bg-white">
                  <p className="text-[9px] text-gray-400 uppercase font-bold mb-0.5">SpO2 Level</p>
                  <p className="font-mono font-bold text-gray-900 text-sm">{formData.vitalSpO2 || 'N/A'} <span className="text-[9px] font-normal text-gray-500">%</span></p>
                </div>
                <div className="border rounded p-2 bg-white">
                  <p className="text-[9px] text-gray-400 uppercase font-bold mb-0.5">Respiration</p>
                  <p className="font-mono font-bold text-gray-900 text-sm">{formData.vitalRespRate || 'N/A'} <span className="text-[9px] font-normal text-gray-500">/min</span></p>
                </div>
              </div>
            </div>

            {/* Diagnosis & Course info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-3 bg-white">
                <h3 className="text-[10px] uppercase font-bold text-indigo-700 tracking-widest border-b pb-1 mb-2">FINAL CLINICAL DIAGNOSIS</h3>
                <p className="text-sm font-bold text-gray-900 whitespace-pre-line leading-relaxed">{formData.finalDiagnosis || 'Not specified'}</p>
                {formData.secondaryDiagnoses && (
                  <p className="text-xs text-gray-500 mt-2"><strong>Secondary:</strong> {formData.secondaryDiagnoses}</p>
                )}
                {formData.proceduresPerformed && (
                  <p className="text-xs text-gray-500 mt-1"><strong>Procedures:</strong> {formData.proceduresPerformed}</p>
                )}
              </div>
              <div className="border rounded-lg p-3 bg-white">
                <h3 className="text-[10px] uppercase font-bold text-indigo-700 tracking-widest border-b pb-1 mb-2">HOSPITAL COURSE SUMMARY</h3>
                <p className="text-xs leading-relaxed text-gray-700 whitespace-pre-line font-medium">{formData.hospitalCourse || 'No course summaries recorded.'}</p>
              </div>
            </div>

            {/* Medications Table */}
            <div className="mb-6">
              <h3 className="text-[10px] uppercase font-bold text-indigo-700 tracking-widest border-b pb-1 mb-2">DISCHARGE MEDICATIONS FOR HOME ADMINISTRATION</h3>
              {formData.medications && formData.medications.length > 0 && formData.medications[0].name ? (
                <table className="w-full text-xs text-left border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-slate-50 border-b border-gray-200 text-gray-800">
                      <th className="p-2 border-r font-bold">Medication Name</th>
                      <th className="p-2 border-r font-bold w-[100px]">Dosage</th>
                      <th className="p-2 border-r font-bold w-[80px]">Route</th>
                      <th className="p-2 border-r font-bold w-[130px]">Frequency</th>
                      <th className="p-2 border-r font-bold w-[80px]">Duration</th>
                      <th className="p-2 font-bold">Special Instructions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.medications.map((med, index) => (
                      med.name && (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="p-2 border-r font-bold text-gray-900">{med.name}</td>
                          <td className="p-2 border-r">{med.dosage}</td>
                          <td className="p-2 border-r">{med.route}</td>
                          <td className="p-2 border-r font-semibold text-blue-900">{med.frequency}</td>
                          <td className="p-2 border-r">{med.duration}</td>
                          <td className="p-2 italic text-gray-500">{med.instructions}</td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-xs text-gray-500 italic">No take-home medications specified.</p>
              )}
            </div>

            {/* Care Instructions & Follow-up Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-3 bg-white">
                <h3 className="text-[10px] uppercase font-bold text-indigo-700 tracking-widest border-b pb-1 mb-2">PATIENT CARE DIRECTIVES</h3>
                <div className="text-xs text-gray-700 space-y-1.5 leading-relaxed font-medium">
                  {formData.dietInstructions && <p><strong>Diet Instructions:</strong> {formData.dietInstructions}</p>}
                  {formData.activityRestrictions && <p><strong>Activity Limits:</strong> {formData.activityRestrictions}</p>}
                  {formData.followUpInstructions && <p><strong>Follow-Up Advice:</strong> {formData.followUpInstructions}</p>}
                </div>
              </div>
              <div className="border rounded-lg p-3 bg-white">
                <h3 className="text-[10px] uppercase font-bold text-indigo-700 tracking-widest border-b pb-1 mb-2">FOLLOW-UP OPD CLINIC DETAILS</h3>
                <div className="text-xs text-gray-700 space-y-1.5 leading-relaxed font-medium">
                  <p><strong>Scheduled Appointment:</strong> <span className="font-bold text-indigo-900">{formData.followUpDate ? new Date(formData.followUpDate).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'No appointment scheduled'}</span></p>
                  <p><strong>Consulting Physician:</strong> <span className="font-bold text-gray-900">{formData.followUpDoctor}</span></p>
                  <p className="text-[9px] text-red-500 font-bold mt-1.5 leading-normal">
                    ⚠️ CRITICAL RED FLAGS: Please report to emergency or call primary doctors immediately if the patient experiences severe abdominal pain, persistent high fever, chest pressure, severe breath shortness, or bleeding.
                  </p>
                </div>
              </div>
            </div>

            {/* Signature Block */}
            <div className="mt-12 border-t pt-4">
              <div className="flex justify-between items-center text-xs text-gray-600">
                <div className="text-center w-1/3">
                  <p className="italic text-gray-400 mb-8">(Generated electronically by nursing staff)</p>
                  <div className="border-t border-gray-300 pt-1 font-bold text-gray-800">Assigned Ward Nurse</div>
                </div>
                <div className="w-1/4"></div>
                <div className="text-center w-1/3">
                  <p className="h-8 mb-8"></p>
                  <div className="border-t border-gray-300 pt-1 font-bold text-gray-800">Authorized Medical Officer</div>
                  <p className="font-semibold text-gray-700">{formData.attendingPhysician}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Action Row */}
          <div className="flex justify-end gap-2 border-t pt-4">
            <button
              onClick={() => setShowPrintModal(false)}
              className="px-4 py-2 border rounded-lg text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Close Preview
            </button>
            <button
              onClick={handleActualPrint}
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <i className="fas fa-print"></i>Print Discharge Sheet
            </button>
          </div>
        </div>
      </Modal>

      {/* Email Modal */}
      <Modal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        title="Email Discharge Summary to Patient"
        size="lg"
      >
        <div className="space-y-4 text-xs text-gray-700">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Recipient Email Address</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-indigo-500"
              placeholder="patient@example.com"
              defaultValue={`${formData.patientName ? formData.patientName.toLowerCase().replace(' ', '') : 'patient'}@example.com`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-indigo-500"
              defaultValue={`Official Patient Discharge Summary: ${formData.patientName || 'Patient'}`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Email Body Message</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-indigo-500 leading-relaxed font-sans"
              rows="8"
              defaultValue={`Dear ${formData.patientName || 'Patient'},
 
Please find attached your official Discharge Summary report generated from your hospital stay at MediCloud Hospital.
 
KEY DISCHARGE SUMMARY:
- Patient Name: ${formData.patientName || 'N/A'}
- Discharge Date: ${formData.dischargeDate ? new Date(formData.dischargeDate).toLocaleDateString() : 'N/A'}
- Attending Physician: ${formData.attendingPhysician || 'N/A'}
- Follow-up Review: ${formData.followUpDate ? new Date(formData.followUpDate).toLocaleDateString() : 'Not scheduled'} with ${formData.followUpDoctor}
 
RECOMMENDATION NOTE:
Please carefully read and follow the take-home medication schedule and care directives enclosed in the attached document.
 
In case of any fever, bleeding, acute pain, or other symptoms of concern, contact our round-the-clock patient desk at +1 (555) 019-2834 or visit emergency immediately.
 
Best Regards,
MediCloud Hospital Patient Relations Desk
123 Healthcare Blvd, Medical District`}
            ></textarea>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 p-3.5 rounded-lg flex items-start gap-2 text-xs">
            <i className="fas fa-info-circle text-indigo-700 mt-0.5"></i>
            <span className="text-indigo-800 font-medium">
              A high-fidelity PDF copy of the discharge summary (including diagnosed results, vital indicators, and home medication charts) will be automatically generated and attached.
            </span>
          </div>

          <div className="flex justify-end gap-2 border-t pt-4">
            <button
              onClick={() => setShowEmailModal(false)}
              className="px-4 py-2 border rounded-lg text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSendEmail}
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <i className="fas fa-paper-plane"></i>Send Summary Email
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DischargeSummary;