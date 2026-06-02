import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner';
import Modal from '../../../../components/common/Modal/Modal';
import html2pdf from 'html2pdf.js';

const DischargeSummary = () => {
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({ 
    patient_ref: '', 
    patientName: '', 
    admission_number: '', 
    admissionDate: '', 
    dischargeDate: new Date().toISOString().split('T')[0], 
    final_diagnosis: '', 
    secondary_diagnoses: '',
    procedures_performed: '', 
    hospital_course: '', 
    medications_on_discharge: '', 
    follow_up_date: '', 
    follow_up_doctor: '',
    follow_up_instructions: '', 
    diet_instructions: '',
    activity_restrictions: '',
    condition_on_discharge: '',
    discharge_notes: '', 
    consultantName: '' 
  });
  const [generatedSummary, setGeneratedSummary] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    // Load IPD patients
    setTimeout(() => {
      setPatients([
        { id: 'PAT-005',  name: 'Rajesh Verma', admissionId: 'ADM-2023-001', admissionDate: '2023-10-10', ward: 'General Ward A', bed: 'A-12', diagnosis: 'Pneumonia', doctor: 'Dr. Meena Rao' },
        { id: 'PAT-006', name: 'Meera Desai', admissionId: 'ADM-2023-002', admissionDate: '2023-10-12', ward: 'ICU', bed: 'ICU-03', diagnosis: 'Cardiac Arrest', doctor: 'Dr. Sharma' },
        { id: 'PAT-007', name: 'Vikram Joshi', admissionId: 'ADM-2023-003', admissionDate: '2023-10-08', ward: 'Orthopedic Ward', bed: 'OW-07', diagnosis: 'Fractured Femur', doctor: 'Dr. Menon' }
      ]);
    }, 500);
  }, []);

  const handlePatientSelect = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      setFormData({ 
        ...formData, 
        patient_ref: patient.id, 
        patientName: patient.name, 
        admission_number: patient.admissionId, 
        admissionDate: patient.admissionDate, 
        final_diagnosis: patient.diagnosis, 
        consultantName: patient.doctor 
      });
    }
  };

const generatePreview = () => {
  if (!formData.patient_ref) {
    alert('Please select a patient first');
    return;
  }

  const summary = {
    summaryId: `DIS-${Date.now().toString().slice(-6)}`,
    generatedDate: new Date().toLocaleDateString(),
    generatedTime: new Date().toLocaleTimeString(),
    hospitalName: 'MediCloud Hospital',
    hospitalAddress: '123 Health Street, Medical City, PIN: 560001',
    contact: '+91 80 2345 6789',
    
    // Basic Info
    patientName: formData.patientName,
    patient_ref: formData.patient_ref,
    patientAge: formData.patientAge || 'Not specified',
    patientAddress: formData.patientAddress || 'Not provided',
    admissionDate: formData.admissionDate,
    dischargeDate: formData.dischargeDate,
    consultantName: formData.consultantName,
    final_diagnosis: formData.final_diagnosis,
    
    // Clinical
    chief_complaints: formData.chief_complaints,
    hospital_course: formData.hospital_course,
    
    // Vitals
    vitals: {
      bp: formData.bp,
      pr: formData.pr,
      spo2: formData.spo2
    },
    
    // Investigations
    cbc: formData.cbc,
    lft: formData.lft,
    urine: formData.urine,
    diabetic: formData.diabetic,
    lipid: formData.lipid,
    
    // Medications
    medications: formData.medications || [],
    medications_on_discharge: formData.medications_on_discharge,
    
    // Follow-up
    follow_up_date: formData.follow_up_date,
    follow_up_doctor: formData.follow_up_doctor,
    follow_up_instructions: formData.follow_up_instructions,
    diet_instructions: formData.diet_instructions,
    activity_restrictions: formData.activity_restrictions,
    
    // Notes
    discharge_notes: formData.discharge_notes
  };

  setGeneratedSummary(summary);
  setShowPreview(true);
};

const printSummary = () => {
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Discharge Summary - ${generatedSummary.patientName}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; margin: 0; }
          .container { max-width: 1200px; margin: 0 auto; }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px; }
          .hospital-name { font-size: 24px; font-weight: bold; color: #1e40af; }
          .title { font-size: 20px; font-weight: bold; text-align: center; margin: 15px 0; }
          .section { margin-bottom: 15px; page-break-inside: avoid; }
          .section-title { font-weight: bold; background: #f3f4f6; padding: 8px; border-left: 4px solid #1e40af; margin-bottom: 10px; }
          .patient-info { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; background: #f9fafb; padding: 15px; border-radius: 5px; }
          .info-item { margin-bottom: 4px; }
          .label { font-weight: bold; color: #374151; }
          .investigations-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 8px; }
          .medications-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px; }
          .signature { margin-top: 30px; display: flex; justify-content: space-between; }
          .signature-box { width: 200px; border-top: 1px solid #000; padding-top: 10px; text-align: center; }
          .footer { margin-top: 20px; font-size: 12px; color: #6b7280; text-align: center; }
          @media print {
            body { padding: 0; }
            button { display: none; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header same as modal -->
          <div class="header">
            <div class="hospital-name">MediCloud Hospital</div>
            <div>123 Health Street, Medical City, PIN: 560001</div>
            <div>Contact: +91 80 2345 6789</div>
          </div>
          
          <div class="title">DISCHARGE SUMMARY</div>
          
          <!-- Patient Information -->
          <div class="section">
            <div class="section-title">Patient Information</div>
            <div class="patient-info">
              <div><span class="label">Name:</span> ${generatedSummary.patientName}</div>
              <div><span class="label">Age/Sex:</span> ${generatedSummary.patientAge || 'N/A'}</div>
              <div><span class="label">Address:</span> ${generatedSummary.patientAddress || 'N/A'}</div>
              <div><span class="label">Admission Date:</span> ${generatedSummary.admissionDate}</div>
              <div><span class="label">Discharge Date:</span> ${generatedSummary.dischargeDate}</div>
              <div><span class="label">Consultant:</span> ${generatedSummary.consultantName}</div>
            </div>
          </div>
          
          <!-- Diagnosis -->
          <div class="section">
            <div class="section-title">Diagnosis</div>
            <div><strong>${generatedSummary.final_diagnosis}</strong></div>
          </div>
          
          <!-- Clinical Summary -->
          <div class="section">
            <div class="section-title">Clinical Summary</div>
            <div>${generatedSummary.hospital_course}</div>
          </div>
          
          <!-- Medications -->
          <div class="section">
            <div class="section-title">Medications on Discharge</div>
            <div>${generatedSummary.medications_on_discharge || 'No medications prescribed'}</div>
          </div>
          
          <!-- Follow-up -->
          <div class="section">
            <div class="section-title">Follow-up Instructions</div>
            <div><span class="label">Follow-up Date:</span> ${generatedSummary.follow_up_date || 'To be scheduled'}</div>
            <div><span class="label">Follow-up Doctor:</span> ${generatedSummary.follow_up_doctor || generatedSummary.consultantName}</div>
            <div><span class="label">Instructions:</span> ${generatedSummary.follow_up_instructions || 'Report in case of pain, bleeding and or other emergencies.'}</div>
          </div>
          
          <!-- Signatures -->
          <div class="signature">
            <div class="signature-box">
              <strong>Dr. ${generatedSummary.consultantName}</strong><br>
              Consultant Physician
            </div>
            <div class="signature-box">
              <strong>Patient/Attendant</strong><br>
              Signature
            </div>
          </div>
          
          <div class="footer">
            Summary ID: ${generatedSummary.summaryId} | Generated on: ${generatedSummary.generatedDate}
          </div>
          
          <div class="no-print" style="margin-top: 30px; text-align: center;">
            <button onclick="window.print()" style="padding: 10px 20px; background: #1e40af; color: white; border: none; border-radius: 5px; cursor: pointer;">
              Print Summary
            </button>
          </div>
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
};

  const downloadPDF = () => {
    const element = document.getElementById('pdf-content');
    if (!element) {
      alert('Could not find content to generate PDF.');
      return;
    }
    
    const opt = {
      margin:       10,
      filename:     `Discharge_Summary_${generatedSummary?.patientName || 'Patient'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  const emailSummary = () => {
    const subject = `Discharge Summary - ${formData.patientName}`;
    const body = `
Dear Patient,

Your discharge summary from MediCloud Hospital is ready.

Patient: ${formData.patientName}
Discharge Date: ${formData.dischargeDate}
Consultant: ${formData.consultantName}

Please find the attached discharge summary.

Thank you for choosing MediCloud Hospital.

Best regards,
Hospital Administration
    `;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const resetForm = () => {
    setFormData({
      patient_ref: '', 
      patientName: '', 
      admission_number: '', 
      admissionDate: '', 
      dischargeDate: new Date().toISOString().split('T')[0], 
      final_diagnosis: '', 
      secondary_diagnoses: '',
      procedures_performed: '', 
      hospital_course: '', 
      medications_on_discharge: '', 
      follow_up_date: '', 
      follow_up_doctor: '',
      follow_up_instructions: '', 
      diet_instructions: '',
      activity_restrictions: '',
      condition_on_discharge: '',
      discharge_notes: '', 
      consultantName: ''
    });
    setGeneratedSummary(null);
    setShowPreview(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700"> Discharge Summary</h2>
        <div className="flex gap-2">
          <button 
            onClick={resetForm}
            className="btn btn-secondary flex items-center"
          >
            <i className="fas fa-redo mr-2"></i> New Summary
          </button>
        </div>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">

  {/* IPD Patients */}
  <div className="group bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-5 
                  hover:shadow-lg transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">IPD Patients</p>
        <p className="text-2xl font-bold text-blue-700 mt-1">
          {patients.length}
        </p>
      </div>
      <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center
                      group-hover:scale-110 transition-transform">
        <i className="fas fa-procedures"></i>
      </div>
    </div>
    <div className="mt-3 h-1 w-full bg-blue-100 rounded-full">
      <div className="h-1 w-2/3 bg-blue-500 rounded-full"></div>
    </div>
  </div>

  {/* Discharged Today */}
  <div className="group bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-5 
                  hover:shadow-lg transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">Discharged Today</p>
        <p className="text-2xl font-bold text-green-700 mt-1">
          12
        </p>
      </div>
      <div className="w-11 h-11 rounded-full bg-green-600 text-white flex items-center justify-center
                      group-hover:scale-110 transition-transform">
        <i className="fas fa-check-circle"></i>
      </div>
    </div>
    <div className="mt-3 h-1 w-full bg-green-100 rounded-full">
      <div className="h-1 w-1/2 bg-green-500 rounded-full"></div>
    </div>
  </div>

  {/* This Month */}
  <div className="group bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-xl p-5 
                  hover:shadow-lg transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">This Month</p>
        <p className="text-2xl font-bold text-purple-700 mt-1">
          24
        </p>
      </div>
      <div className="w-11 h-11 rounded-full bg-purple-600 text-white flex items-center justify-center
                      group-hover:scale-110 transition-transform">
        <i className="fas fa-calendar-alt"></i>
      </div>
    </div>
    <div className="mt-3 h-1 w-full bg-purple-100 rounded-full">
      <div className="h-1 w-3/4 bg-purple-500 rounded-full"></div>
    </div>
  </div>

  {/* Completion Rate */}
  <div className="group bg-gradient-to-br from-orange-50 to-white border border-orange-200 rounded-xl p-5 
                  hover:shadow-lg transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">Completion Rate</p>
        <p className="text-2xl font-bold text-orange-700 mt-1">
          98%
        </p>
      </div>
      <div className="w-11 h-11 rounded-full bg-orange-600 text-white flex items-center justify-center
                      group-hover:scale-110 transition-transform">
        <i className="fas fa-chart-line"></i>
      </div>
    </div>
    <div className="mt-3 h-1 w-full bg-orange-100 rounded-full">
      <div className="h-1 w-[98%] bg-orange-500 rounded-full"></div>
    </div>
  </div>

</div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left Column - Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg card-shadow border p-6">
            <h3 className="text-lg font-semibold mb-4">Patient Details</h3>
            
            <div className="space-y-6">
              {/* Patient Selection */}
              <div className="form-group">
                <label className="form-label">Select IPD Patient *</label>
                <select
                  value={formData.patient_ref}
                  onChange={(e) => handlePatientSelect(e.target.value)}
                  className="form-input"
                  required
                >
                  <option value="">Choose an admitted patient</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} (ID: {patient.id}) - {patient.diagnosis} - Admitted: {patient.admissionDate}
                    </option>
                  ))}
                </select>
              </div>

              {/* Patient Information */}
              {formData.patient_ref && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Patient Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Patient Name</p>
                      <p className="font-medium">{formData.patientName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Admission ID</p>
                      <p className="font-medium">{formData.admission_number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Admission Date</p>
                      <p className="font-medium">{formData.admissionDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Consultant</p>
                      <p className="font-medium">{formData.consultantName}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Clinical Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Final Diagnosis *</label>
                  <input
                    type="text"
                    value={formData.final_diagnosis}
                    onChange={(e) => setFormData({...formData, final_diagnosis: e.target.value})}
                    className="form-input"
                    placeholder="Final diagnosis"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Secondary Diagnoses</label>
                  <input
                    type="text"
                    value={formData.secondary_diagnoses}
                    onChange={(e) => setFormData({...formData, secondary_diagnoses: e.target.value})}
                    className="form-input"
                    placeholder="Comma separated secondary diagnoses"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Procedures Performed</label>
                <textarea
                  value={formData.procedures_performed}
                  onChange={(e) => setFormData({...formData, procedures_performed: e.target.value})}
                  className="form-input"
                  rows="2"
                  placeholder="List any surgical or diagnostic procedures (comma separated)..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Hospital Course *</label>
                <textarea
                  value={formData.hospital_course}
                  onChange={(e) => setFormData({...formData, hospital_course: e.target.value})}
                  className="form-input"
                  rows="3"
                  placeholder="Details of hospital course..."
                  required
                />
              </div>

              {/* Medications */}
              <div className="form-group">
                <label className="form-label">Medications on Discharge</label>
                <textarea
                  value={formData.medications_on_discharge}
                  onChange={(e) => setFormData({...formData, medications_on_discharge: e.target.value})}
                  className="form-input"
                  rows="3"
                  placeholder="List medications (e.g. Paracetamol 500mg twice daily)..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Condition on Discharge</label>
                  <input
                    type="text"
                    value={formData.condition_on_discharge}
                    onChange={(e) => setFormData({...formData, condition_on_discharge: e.target.value})}
                    className="form-input"
                    placeholder="Stable, Improved, etc."
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Follow-up Date</label>
                  <input
                    type="date"
                    value={formData.follow_up_date}
                    onChange={(e) => setFormData({...formData, follow_up_date: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Follow-up Doctor</label>
                  <input
                    type="text"
                    value={formData.follow_up_doctor}
                    onChange={(e) => setFormData({...formData, follow_up_doctor: e.target.value})}
                    className="form-input"
                    placeholder="Doctor's name for follow-up"
                  />
                </div>
              </div>

              {/* Instructions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-group">
                  <label className="form-label">Follow-up Instructions</label>
                  <textarea
                    value={formData.follow_up_instructions}
                    onChange={(e) => setFormData({...formData, follow_up_instructions: e.target.value})}
                    className="form-input"
                    rows="3"
                    placeholder="General instructions..."
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Diet Instructions</label>
                  <textarea
                    value={formData.diet_instructions}
                    onChange={(e) => setFormData({...formData, diet_instructions: e.target.value})}
                    className="form-input"
                    rows="3"
                    placeholder="Dietary restrictions or recommendations..."
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Activity Restrictions</label>
                  <textarea
                    value={formData.activity_restrictions}
                    onChange={(e) => setFormData({...formData, activity_restrictions: e.target.value})}
                    className="form-input"
                    rows="3"
                    placeholder="Physical activity restrictions..."
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="form-group">
                <label className="form-label">Discharge Notes</label>
                <textarea
                  value={formData.discharge_notes}
                  onChange={(e) => setFormData({...formData, discharge_notes: e.target.value})}
                  className="form-input"
                  rows="3"
                  placeholder="Any additional remarks..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={generatePreview}
                  className="btn btn-primary flex-1"
                  disabled={!formData.patient_ref}
                >
                  <i className="fas fa-eye mr-2"></i> Preview Summary
                </button>
                <button
                  onClick={resetForm}
                  className="btn btn-secondary"
                >
                  <i className="fas fa-times mr-2"></i> Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Recent Summaries */}
        <div>
          <div className="bg-white rounded-lg card-shadow border p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Discharges</h3>
            <div className="space-y-3">
              {patients.map(patient => (
                <div key={patient.id} className="border rounded p-3 hover:bg-gray-50">
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-sm text-gray-600">ID: {patient.id}</p>
                  <p className="text-sm text-gray-600">Admitted: {patient.admissionDate}</p>
                  <p className="text-sm text-gray-600">Ward: {patient.ward} ({patient.bed})</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">💡 Quick Tips</h4>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• Verify all patient details before generating summary</li>
                <li>• Include specific follow-up instructions</li>
                <li>• List all prescribed medications clearly</li>
                <li>• Get consultant's signature before finalizing</li>
                <li>• Provide copy to patient and maintain hospital copy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
{/* Preview Modal */}
<Modal
  isOpen={showPreview}
  onClose={() => setShowPreview(false)}
  title="Discharge Summary Preview"
  size="xl"
>
  {generatedSummary && (
    <div className="space-y-6">
      <div id="pdf-content" className="bg-white p-6 rounded-lg border" style={{ fontFamily: 'Arial, sans-serif' }}>
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-6 border-b-2 border-gray-200 pb-4">
          <div className="flex items-center gap-4">
            {/* Logo placeholder mimicking Sangeetha Hospital */}
            <div className="w-16 h-16 rounded-full border-[3px] border-blue-900 flex items-center justify-center bg-white shadow-sm">
              <span className="text-blue-900 font-bold text-4xl" style={{ fontFamily: 'serif' }}>&amp;</span>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-900 tracking-wide" style={{ fontFamily: 'Arial, sans-serif' }}>
                SANGEETHA HOSPITAL
              </h2>
              <p className="text-gray-600 font-semibold tracking-[0.3em] text-sm mt-1 uppercase">
                Trusted Care
              </p>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h4 className="font-bold text-sm underline underline-offset-4 tracking-wide">
            DISCHARGE SUMMARY
          </h4>
        </div>

        {/* Patient Information Row */}
        <div className="mb-6 px-4">
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="w-56 font-bold py-1">NAME OF THE PATIENT:</td>
                <td className="py-1">{generatedSummary.patientName || 'Mr. SONAIMUTHU'}</td>
              </tr>
              <tr>
                <td className="font-bold py-1">AGE / SEX:</td>
                <td className="py-1">{generatedSummary.patientAge || '71 Yrs'} / {generatedSummary.patientGender || 'Male'}</td>
              </tr>
              <tr>
                <td className="font-bold py-1">ADDRESS:</td>
                <td className="py-1">{generatedSummary.patientAddress || 'Manamadurai'}</td>
              </tr>
              <tr>
                <td className="font-bold py-1">DATE OF ADMISSION :</td>
                <td className="py-1">{generatedSummary.admissionDate || '21/01/2019'}</td>
              </tr>
              <tr>
                <td className="font-bold py-1">DATE OF DISCHARGE:</td>
                <td className="py-1">{generatedSummary.dischargeDate || '25/01/2019'}</td>
              </tr>
              <tr>
                <td className="font-bold py-1">CONSULTANT:</td>
                <td className="py-1 uppercase">DR. {generatedSummary.consultantName || 'Anand MBBS, MD.'}</td>
              </tr>
              <tr>
                <td className="font-bold py-1">DIAGNOSIS:</td>
                <td className="py-1 uppercase">{generatedSummary.final_diagnosis || 'LOWER OESOPHAGEAL HIATUS HERNIA'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Clinical Summary Section */}
        <div className="mb-4 px-4">
          <h5 className="font-bold underline underline-offset-2 text-sm mb-2">CLINICAL SUMMARY</h5>
          <p className="text-sm text-gray-800 mb-4 leading-relaxed">
            {generatedSummary.chief_complaints || 'Patient came to the hospital with complaints of inability to swallow food and vomiting of undigested food particles for past 3 months.'}
          </p>
          <div className="ml-6 space-y-1 text-sm font-medium">
            <div className="flex"><span className="w-24 font-bold">B.P.</span><span>{generatedSummary.vitals?.bp || '80/50'} mm/hg</span></div>
            <div className="flex"><span className="w-24 font-bold">P.R</span><span>{generatedSummary.vitals?.pr || '56'}mints</span></div>
            <div className="flex"><span className="w-24 font-bold">SPO2</span><span>{generatedSummary.vitals?.spo2 || '97'}%</span></div>
          </div>
        </div>

        {/* Course in Hospital Section */}
        <div className="mb-6 px-4">
          <h5 className="font-bold underline underline-offset-2 text-sm mb-2">COURSE IN HOSPITAL :</h5>
          <p className="text-sm text-gray-800 leading-relaxed text-justify">
            {generatedSummary.hospital_course || 'CT scan of chest and abdomen done revealed, dialation of oesophagus with thin regular wall and air fluid level within, subcarinal oesophageal narrowing present small hiatus hernia. Patient was treated conservatively with antibiotics, antiematics and ppi. Patient improved symptomatically with ability to swallow solid foods with no episodes of vomiting. Patient was advised endoscopy and dilatation of oesophagus with biopsy at a later stage.'}
          </p>
        </div>

        {/* Investigations Table */}
        <div className="mb-8 px-4">
          <h5 className="font-bold text-center text-sm mb-3">COMPLETE BLOOD CELL COUNT:</h5>
          <table className="w-full text-xs border-collapse border border-gray-800 text-left">
            <tbody>
              <tr>
                <td className="border border-gray-800 p-2 font-bold w-1/3">HAEMATOLOGY</td>
                <td className="border border-gray-800 p-2 w-1/3">SCOT-29 full</td>
                <td className="border border-gray-800 p-2 w-1/3">Urobllinogen-Normal</td>
              </tr>
              <tr>
                <td className="border border-gray-800 p-2">Haemoglobin-10.8g/dl</td>
                <td className="border border-gray-800 p-2">SGPT-27 Iu/l</td>
                <td className="border border-gray-800 p-2">Billrubin-Negative</td>
              </tr>
              <tr>
                <td className="border border-gray-800 p-2">Total wbc count-8900 Cells/cum</td>
                <td className="border border-gray-800 p-2 font-bold uppercase">TOTAL PROTEIN-7.6</td>
                <td className="border border-gray-800 p-2 font-bold uppercase">DIABETIC PROFILE</td>
              </tr>
              <tr>
                <td className="border border-gray-800 p-2">Neu trophils-69%</td>
                <td className="border border-gray-800 p-2">Serum Albumin-4.1</td>
                <td className="border border-gray-800 p-2">FBS-95</td>
              </tr>
              <tr>
                <td className="border border-gray-800 p-2">Lymphocyte-26%</td>
                <td className="border border-gray-800 p-2">Globulin-2.6</td>
                <td className="border border-gray-800 p-2">PPBS-159</td>
              </tr>
              <tr>
                <td className="border border-gray-800 p-2">Eosinophils-5%</td>
                <td className="border border-gray-800 p-2">Alk phosphatise-79</td>
                <td className="border border-gray-800 p-2 font-bold uppercase">LIPID PROFILE</td>
              </tr>
              <tr>
                <td className="border border-gray-800 p-2">RBC count- 3.9 million / cumm</td>
                <td className="border border-gray-800 p-2 font-bold uppercase">URINE ANALYSIS</td>
                <td className="border border-gray-800 p-2">Cholestrol- 179</td>
              </tr>
              <tr>
                <td className="border border-gray-800 p-2">Pcv - 42%</td>
                <td className="border border-gray-800 p-2">Specific gravity:1.010</td>
                <td className="border border-gray-800 p-2">Hdl cholesterol-32</td>
              </tr>
              <tr>
                <td className="border border-gray-800 p-2">MCV-74 cumm</td>
                <td className="border border-gray-800 p-2">Ph-5</td>
                <td className="border border-gray-800 p-2">Ldl cholesterol-128</td>
              </tr>
              <tr>
                <td className="border border-gray-800 p-2">MCH -28pg</td>
                <td className="border border-gray-800 p-2">Leukocytes-negative</td>
                <td className="border border-gray-800 p-2">Vldl cholesterol-33</td>
              </tr>
              <tr>
                <td className="border border-gray-800 p-2">MCHC - 32gm / dl</td>
                <td className="border border-gray-800 p-2">Nitrite-negative</td>
                <td className="border border-gray-800 p-2">T.c/hdl ratio-5</td>
              </tr>
              <tr>
                <td className="border border-gray-800 p-2">Platelet count- 2,00,000 1akhsl / cumm</td>
                <td className="border border-gray-800 p-2">Protein-negative</td>
                <td className="border border-gray-800 p-2"></td>
              </tr>
              <tr>
                <td className="border border-gray-800 p-2 font-bold uppercase">LIVER FUNCTION TEST</td>
                <td className="border border-gray-800 p-2 row-span-2">Glucose-Normal</td>
                <td className="border border-gray-800 p-2"></td>
              </tr>
              <tr>
                <td className="border border-gray-800 p-2">Total billiruhin0.2mg.dl</td>
                <td className="border border-gray-800 p-2"></td>
                <td className="border border-gray-800 p-2"></td>
              </tr>
              <tr>
                <td className="border border-gray-800 p-2">Direct billirubin- 0.1mg/dl</td>
                <td className="border border-gray-800 p-2">Keytones-Negative</td>
                <td className="border border-gray-800 p-2"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Advice section */}
        <div className="mb-6 px-4">
          <h5 className="font-bold text-sm uppercase">ADVICE: FOLLOW UP AFTER 5 DAYS</h5>
        </div>

        {/* Page Break for printing if needed */}
        <div className="break-before-page"></div>

        {/* Medications on Discharge */}
        <div className="mb-8 px-12 mt-8">
          {generatedSummary.medications && generatedSummary.medications.length > 0 ? (
            generatedSummary.medications.map((med, idx) => (
              <p key={idx} className="text-sm mb-4">
                T.{med.name.toUpperCase()}: ({med.dosage})
              </p>
            ))
          ) : generatedSummary.medications_on_discharge ? (
            generatedSummary.medications_on_discharge.split('\n').map((line, idx) => (
              <p key={idx} className="text-sm mb-4">{line}</p>
            ))
          ) : (
            <>
              <p className="text-sm mb-4">T.EM ESET: (1-0-1)</p>
              <p className="text-sm mb-4">T.YEES D: (1-0-1)</p>
              <p className="text-sm mb-4">T.DIGIPEN: (1-0-1)</p>
              <p className="text-sm mb-4">T.ACILOC: (1-0-1)</p>
              <p className="text-sm mb-4">T.MUCYST: (0-0-1)</p>
              <p className="text-sm mb-4">T.NEFTRON: (1-0-1)</p>
              <p className="text-sm mb-4">T.AZ1TH RAL: (0-0-1)</p>
              <p className="text-sm mb-4">SYP.LUPIZ1ME PLUS: 10ml</p>
              <p className="text-sm mb-4">SYP.SUCRAFIL PLUS: 5ml</p>
            </>
          )}
        </div>

        {/* Follow-up Instructions */}
        <div className="px-4 space-y-6">
          <div>
            <h5 className="font-bold underline underline-offset-2 text-sm mb-3">
              When and how to obtain urgent care :
            </h5>
            <p className="text-sm">
              {generatedSummary.follow_up_instructions || 'Report in case of pain, bleeding and or other emergencies.'}
            </p>
          </div>
          
          <div>
            <p className="font-bold text-sm">
              Summary Prepared By: Dr. {generatedSummary.consultantName || 'Anand'}
            </p>
          </div>
          
          <div className="text-sm text-gray-800 space-y-4 pt-2">
            <p className="leading-relaxed">
              (This is not a legal document. This report is given to enable the patient to understand their disease nature, treatment and follow up. Any clarification, if necessary should be discussed with the consultant)
            </p>
            <p className="font-bold leading-relaxed">
              The content of discharge summary and follow up instructions including drugs has been explained to me in my understandable language.
            </p>
          </div>

          <div className="pt-6 space-y-6">
            <p className="font-bold text-sm">Attenders Sign:</p>
            <p className="font-bold text-sm">Name &amp; Relationship:</p>
            <p className="font-bold text-sm">Phone No:</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={printSummary}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <i className="fas fa-print"></i> Print Summary
        </button>
        <button
          onClick={downloadPDF}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <i className="fas fa-file-pdf"></i> Download PDF
        </button>
        <button
          onClick={emailSummary}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <i className="fas fa-envelope"></i> Email to Patient
        </button>
        <button
          onClick={() => setShowPreview(false)}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <i className="fas fa-times"></i> Close Preview
        </button>
      </div>
    </div>
  )}
</Modal>
    </div>
  );
};

export default DischargeSummary;