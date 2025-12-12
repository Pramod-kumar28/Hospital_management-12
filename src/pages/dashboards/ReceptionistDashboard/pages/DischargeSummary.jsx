import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner';
import Modal from '../../../../components/common/Modal/Modal';

const DischargeSummary = () => {
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    admissionId: '',
    admissionDate: '',
    dischargeDate: new Date().toISOString().split('T')[0],
    diagnosis: '',
    procedures: '',
    treatmentGiven: '',
    medications: '',
    followUpDate: '',
    followUpInstructions: '',
    doctorRemarks: '',
    consultantName: ''
  });
  const [generatedSummary, setGeneratedSummary] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    // Load IPD patients
    setTimeout(() => {
      setPatients([
        { 
          id: 'PAT-005', 
          name: 'Rajesh Verma', 
          admissionId: 'ADM-2023-001',
          admissionDate: '2023-10-10',
          ward: 'General Ward A',
          bed: 'A-12',
          diagnosis: 'Pneumonia',
          doctor: 'Dr. Meena Rao'
        },
        { 
          id: 'PAT-006', 
          name: 'Meera Desai', 
          admissionId: 'ADM-2023-002',
          admissionDate: '2023-10-12',
          ward: 'ICU',
          bed: 'ICU-03',
          diagnosis: 'Cardiac Arrest',
          doctor: 'Dr. Sharma'
        },
        { 
          id: 'PAT-007', 
          name: 'Vikram Joshi', 
          admissionId: 'ADM-2023-003',
          admissionDate: '2023-10-08',
          ward: 'Orthopedic Ward',
          bed: 'OW-07',
          diagnosis: 'Fractured Femur',
          doctor: 'Dr. Menon'
        }
      ]);
    }, 500);
  }, []);

  const handlePatientSelect = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      setFormData({
        ...formData,
        patientId: patient.id,
        patientName: patient.name,
        admissionId: patient.admissionId,
        admissionDate: patient.admissionDate,
        diagnosis: patient.diagnosis,
        consultantName: patient.doctor
      });
    }
  };

  const generatePreview = () => {
    if (!formData.patientId) {
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
      ...formData
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
            body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
            .hospital-name { font-size: 24px; font-weight: bold; color: #1e40af; }
            .title { font-size: 20px; font-weight: bold; text-align: center; margin: 30px 0; }
            .section { margin-bottom: 25px; }
            .section-title { font-weight: bold; background: #f3f4f6; padding: 8px; border-left: 4px solid #1e40af; margin-bottom: 10px; }
            .patient-info { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
            .info-item { margin-bottom: 8px; }
            .label { font-weight: bold; color: #374151; }
            .signature { margin-top: 60px; display: flex; justify-content: space-between; }
            .signature-box { width: 200px; border-top: 1px solid #000; padding-top: 10px; text-align: center; }
            .footer { margin-top: 40px; font-size: 12px; color: #6b7280; text-align: center; }
            @media print {
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="hospital-name">${generatedSummary.hospitalName}</div>
            <div>${generatedSummary.hospitalAddress}</div>
            <div>Contact: ${generatedSummary.contact}</div>
          </div>
          
          <div class="title">DISCHARGE SUMMARY</div>
          
          <div class="section">
            <div class="section-title">Patient Information</div>
            <div class="patient-info">
              <div class="info-item">
                <span class="label">Patient Name:</span> ${generatedSummary.patientName}
              </div>
              <div class="info-item">
                <span class="label">Patient ID:</span> ${generatedSummary.patientId}
              </div>
              <div class="info-item">
                <span class="label">Admission ID:</span> ${generatedSummary.admissionId}
              </div>
              <div class="info-item">
                <span class="label">Admission Date:</span> ${generatedSummary.admissionDate}
              </div>
              <div class="info-item">
                <span class="label">Discharge Date:</span> ${generatedSummary.dischargeDate}
              </div>
              <div class="info-item">
                <span class="label">Consultant:</span> ${generatedSummary.consultantName}
              </div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Clinical Information</div>
            <div class="info-item">
              <span class="label">Diagnosis:</span> ${generatedSummary.diagnosis}
            </div>
            <div class="info-item">
              <span class="label">Procedures Performed:</span><br>
              ${generatedSummary.procedures || 'None'}
            </div>
            <div class="info-item">
              <span class="label">Treatment Given:</span><br>
              ${generatedSummary.treatmentGiven}
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Medication on Discharge</div>
            <div class="info-item">
              ${generatedSummary.medications || 'No medications prescribed'}
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Follow-up Instructions</div>
            <div class="info-item">
              <span class="label">Follow-up Date:</span> ${generatedSummary.followUpDate || 'To be scheduled'}
            </div>
            <div class="info-item">
              <span class="label">Instructions:</span><br>
              ${generatedSummary.followUpInstructions}
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Doctor's Remarks</div>
            <div class="info-item">
              ${generatedSummary.doctorRemarks}
            </div>
          </div>
          
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
            Discharge Summary ID: ${generatedSummary.summaryId} | Generated on: ${generatedSummary.generatedDate} at ${generatedSummary.generatedTime}
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <button onclick="window.print()" style="padding: 10px 20px; background: #1e40af; color: white; border: none; border-radius: 5px; cursor: pointer;">
              Print Summary
            </button>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const downloadPDF = () => {
    alert('PDF generation would be implemented with a library like jsPDF');
    // In production, use jsPDF or similar library
    // const doc = new jsPDF();
    // doc.text('Discharge Summary', 20, 20);
    // doc.save(`discharge-summary-${formData.patientId}.pdf`);
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
      patientId: '',
      patientName: '',
      admissionId: '',
      admissionDate: '',
      dischargeDate: new Date().toISOString().split('T')[0],
      diagnosis: '',
      procedures: '',
      treatmentGiven: '',
      medications: '',
      followUpDate: '',
      followUpInstructions: '',
      doctorRemarks: '',
      consultantName: ''
    });
    setGeneratedSummary(null);
    setShowPreview(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700">🏥 Discharge Summary</h2>
        <div className="flex gap-2">
          <button 
            onClick={resetForm}
            className="btn btn-secondary flex items-center"
          >
            <i className="fas fa-redo mr-2"></i> New Summary
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg card-shadow border p-6">
            <h3 className="text-lg font-semibold mb-4">Patient Details</h3>
            
            <div className="space-y-6">
              {/* Patient Selection */}
              <div className="form-group">
                <label className="form-label">Select IPD Patient *</label>
                <select
                  value={formData.patientId}
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
              {formData.patientId && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Patient Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Patient Name</p>
                      <p className="font-medium">{formData.patientName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Admission ID</p>
                      <p className="font-medium">{formData.admissionId}</p>
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

              {/* Discharge Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Discharge Date *</label>
                  <input
                    type="date"
                    value={formData.dischargeDate}
                    onChange={(e) => setFormData({...formData, dischargeDate: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Follow-up Date</label>
                  <input
                    type="date"
                    value={formData.followUpDate}
                    onChange={(e) => setFormData({...formData, followUpDate: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Clinical Information */}
              <div className="form-group">
                <label className="form-label">Diagnosis *</label>
                <textarea
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
                  className="form-input"
                  rows="2"
                  placeholder="Primary and secondary diagnoses..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Procedures Performed</label>
                <textarea
                  value={formData.procedures}
                  onChange={(e) => setFormData({...formData, procedures: e.target.value})}
                  className="form-input"
                  rows="2"
                  placeholder="List any surgical or diagnostic procedures..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Treatment Given *</label>
                <textarea
                  value={formData.treatmentGiven}
                  onChange={(e) => setFormData({...formData, treatmentGiven: e.target.value})}
                  className="form-input"
                  rows="3"
                  placeholder="Details of treatment provided during hospitalization..."
                  required
                />
              </div>

              {/* Medications */}
              <div className="form-group">
                <label className="form-label">Medications on Discharge</label>
                <textarea
                  value={formData.medications}
                  onChange={(e) => setFormData({...formData, medications: e.target.value})}
                  className="form-input"
                  rows="3"
                  placeholder="List medications with dosage and frequency..."
                />
              </div>

              {/* Follow-up */}
              <div className="form-group">
                <label className="form-label">Follow-up Instructions</label>
                <textarea
                  value={formData.followUpInstructions}
                  onChange={(e) => setFormData({...formData, followUpInstructions: e.target.value})}
                  className="form-input"
                  rows="3"
                  placeholder="Instructions for home care, restrictions, warning signs..."
                />
              </div>

              {/* Doctor's Remarks */}
              <div className="form-group">
                <label className="form-label">Doctor's Final Remarks</label>
                <textarea
                  value={formData.doctorRemarks}
                  onChange={(e) => setFormData({...formData, doctorRemarks: e.target.value})}
                  className="form-input"
                  rows="3"
                  placeholder="Final assessment and recommendations..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={generatePreview}
                  className="btn btn-primary flex-1"
                  disabled={!formData.patientId}
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
      <Modal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title="Discharge Summary Preview"
        size="xl"
      >
        {generatedSummary && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              {/* Preview content similar to print version */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-blue-600">MediCloud Hospital</h3>
                <p className="text-gray-600">123 Health Street, Medical City, PIN: 560001</p>
                <p className="text-gray-600">Contact: +91 80 2345 6789</p>
              </div>
              
              <h4 className="text-lg font-bold text-center mb-6">DISCHARGE SUMMARY</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold border-b pb-1 mb-2">Patient Information</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div><span className="font-medium">Name:</span> {generatedSummary.patientName}</div>
                    <div><span className="font-medium">Patient ID:</span> {generatedSummary.patientId}</div>
                    <div><span className="font-medium">Admission Date:</span> {generatedSummary.admissionDate}</div>
                    <div><span className="font-medium">Discharge Date:</span> {generatedSummary.dischargeDate}</div>
                    <div><span className="font-medium">Consultant:</span> {generatedSummary.consultantName}</div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-bold border-b pb-1 mb-2">Clinical Summary</h5>
                  <p><span className="font-medium">Diagnosis:</span> {generatedSummary.diagnosis}</p>
                  <p><span className="font-medium">Treatment Given:</span> {generatedSummary.treatmentGiven}</p>
                </div>
                
                {generatedSummary.medications && (
                  <div>
                    <h5 className="font-bold border-b pb-1 mb-2">Medications</h5>
                    <p>{generatedSummary.medications}</p>
                  </div>
                )}
                
                <div>
                  <h5 className="font-bold border-b pb-1 mb-2">Follow-up Instructions</h5>
                  <p>{generatedSummary.followUpInstructions}</p>
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t">
                <p className="text-sm text-gray-500">
                  Summary ID: {generatedSummary.summaryId} | Generated on: {generatedSummary.generatedDate}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={printSummary}
                className="btn btn-primary flex items-center"
              >
                <i className="fas fa-print mr-2"></i> Print Summary
              </button>
              <button
                onClick={downloadPDF}
                className="btn btn-success flex items-center"
              >
                <i className="fas fa-file-pdf mr-2"></i> Download PDF
              </button>
              <button
                onClick={emailSummary}
                className="btn btn-info flex items-center"
              >
                <i className="fas fa-envelope mr-2"></i> Email to Patient
              </button>
              <button
                onClick={() => setShowPreview(false)}
                className="btn btn-secondary"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-blue-600">{patients.length}</div>
          <div className="text-sm text-gray-500">IPD Patients</div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-green-600">12</div>
          <div className="text-sm text-gray-500">Discharged Today</div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-purple-600">24</div>
          <div className="text-sm text-gray-500">This Month</div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-orange-600">98%</div>
          <div className="text-sm text-gray-500">Completion Rate</div>
        </div>
      </div>
    </div>
  );
};

export default DischargeSummary;