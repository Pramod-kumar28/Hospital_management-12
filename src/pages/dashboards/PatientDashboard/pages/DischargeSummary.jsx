// src/pages/dashboards/PatientDashboard/pages/DischargeSummary.jsx
import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner';
import { apiFetch } from '../../../../services/apiClient';

const DischargeSummary = () => {
  const [loading, setLoading] = useState(true);
  const [summaries, setSummaries] = useState([]);
  const [selectedSummary, setSelectedSummary] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ totalAdmissions: 0, lastDischarge: 'N/A' });
  const [isReadyForDischarge, setIsReadyForDischarge] = useState(false);
  useEffect(() => {
    loadSummaries();
    loadStatistics();
    checkDischargeStatus();
  }, []);
  const loadSummaries = async () => {
    setLoading(true);
    try {
      const response = await apiFetch('/api/v1/patient-discharge-summary/my/discharge-summaries');
      if (response.ok) {
        const data = await response.json();
        setSummaries(data.summaries || []);
      } else {
        loadMockSummaries();
      }
    } catch (error) {
      console.error('Error fetching discharge summaries:', error);
      loadMockSummaries();
    } finally {
      setLoading(false);
    }
  };

  const loadStatistics = async () => {
    try {
      const response = await apiFetch('/api/v1/patient-discharge-summary/discharge-summaries/statistics');
      if (response.ok) {
        const data = await response.json();
        setStats({
          totalAdmissions: data.totalAdmissions || 0,
          lastDischarge: data.lastDischarge || 'N/A'
        });
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const handleViewDetails = async (summary) => {
    setSelectedSummary(summary);
    setModalLoading(true);
    try {
      const response = await apiFetch(`/api/v1/patient-discharge-summary/discharge-summaries/${summary.id}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedSummary(data);
      }
    } catch (error) {
      console.error('Error fetching summary details:', error);
      // Keep existing data on error
    } finally {
      setModalLoading(false);
    }
  };

  const checkDischargeStatus = async () => {
    try {
      const response = await apiFetch('/api/v1/patient-discharge-summary/admissions/ready-for-discharge');
      if (response.ok) {
        const data = await response.json();
        // In a real app, we'd check if any of these admissions belong to the current patient
        // For demo purposes, we'll simulate a positive match if the API returns data
        if (data && data.length > 0) {
          setIsReadyForDischarge(true);
        }
      }
    } catch (error) {
      console.error('Error checking discharge status:', error);
    }
  };

  const loadMockSummaries = () => {
    setSummaries([
      {
        id: 'DS-2023-001',
        admissionDate: '2023-08-15',
        dischargeDate: '2023-08-20',
        department: 'Cardiology',
        doctor: 'Dr. Meena Rao',
        reasonForAdmission: 'Chest pain and shortness of breath.',
        diagnosis: 'Acute Coronary Syndrome',
        treatmentGiven: 'Angiography performed, followed by PTCA (Percutaneous Transluminal Coronary Angioplasty) with stent placement. Kept under observation in ICU for 48 hours.',
        conditionAtDischarge: 'Stable. Vitals within normal limits. Ambulating without difficulty.',
        medications: [
          { name: 'Aspirin', dosage: '75mg', frequency: 'Once daily after meals', duration: 'Lifelong' },
          { name: 'Atorvastatin', dosage: '40mg', frequency: 'Once daily at bedtime', duration: '6 months' },
          { name: 'Clopidogrel', dosage: '75mg', frequency: 'Once daily after meals', duration: '1 year' },
        ],
        followUp: {
          date: '2023-08-30',
          instructions: 'Review with ECG and Lipid profile in 15 days. Strict cardiac diet. Avoid strenuous activities for 4 weeks.'
        }
      },
      {
        id: 'DS-2022-105',
        admissionDate: '2022-05-10',
        dischargeDate: '2022-05-14',
        department: 'Orthopedics',
        doctor: 'Dr. R.K. Sharma',
        reasonForAdmission: 'Pain and swelling in the right knee after a fall.',
        diagnosis: 'Right Knee Meniscal Tear',
        treatmentGiven: 'Arthroscopic meniscal repair. Pain management and physiotherapy initiated.',
        conditionAtDischarge: 'Pain controlled with oral medications. Mobilizing with crutches (non-weight bearing on right leg).',
        medications: [
          { name: 'Ibuprofen', dosage: '400mg', frequency: 'Twice daily after meals', duration: '5 days' },
          { name: 'Pantoprazole', dosage: '40mg', frequency: 'Once daily before breakfast', duration: '5 days' },
        ],
        followUp: {
          date: '2022-05-24',
          instructions: 'Suture removal in 10 days. Continue physiotherapy exercises as taught. Strict non-weight bearing for 3 weeks.'
        }
      }
    ]);
  };
  const handleDownload = (summaryId) => {
    const summary = summaries.find(s => s.id === summaryId) || selectedSummary;
    if (!summary) return;
    const content = `
      LEVITICA HOSPITAL
      DISCHARGE SUMMARY
      -----------------
      Summary ID: ${summary.id}
      Admission Date: ${summary.admissionDate}
      Discharge Date: ${summary.dischargeDate}
      Department: ${summary.department}
      Attending Doctor: ${summary.doctor}
      DIAGNOSIS: ${summary.diagnosis}
      REASON FOR ADMISSION: ${summary.reasonForAdmission}
      TREATMENT GIVEN: ${summary.treatmentGiven}
      CONDITION AT DISCHARGE: ${summary.conditionAtDischarge}
      MEDICATIONS ON DISCHARGE: ${summary.medications.map(m => `- ${m.name} (${m.dosage}): ${m.frequency} for ${m.duration}`).join('\n      ')}
      FOLLOW-UP INSTRUCTIONS: Date: ${summary.followUp.date}
      Instructions: ${summary.followUp.instructions}
      -----------------
      This is a computer-generated document and does not require a signature.
    `;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Discharge_Summary_${summary.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const filteredSummaries = summaries.filter(s => 
    s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (loading) return <LoadingSpinner />;
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Discharge Summaries</h2>
          <p className="text-gray-500 text-sm mt-1">View and download your past hospital admission records</p>
        </div>
      </div>

      {/* Discharge Alert */}
      {isReadyForDischarge && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl animate-pulse">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <i className="fas fa-check-circle text-green-500 text-xl"></i>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-bold text-green-800">Ready for Discharge!</h3>
              <p className="text-xs text-green-700 mt-1">
                Your discharge process has been initiated. Please contact the nursing station to complete the final formalities.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats/Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm flex items-center gap-4 hover:shadow-md transition">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-file-contract text-blue-600 text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Admissions</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalAdmissions || summaries.length}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm flex items-center gap-4 hover:shadow-md transition">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-calendar-check text-green-600 text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Discharge</p>
            <p className="text-xl font-bold text-gray-900">{stats.lastDischarge !== 'N/A' ? stats.lastDischarge : (summaries[0]?.dischargeDate || 'N/A')}</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center">
        <div className="relative flex-1 max-w-md">
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input type="text" placeholder="Search by ID, Doctor, or Department..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-gray-800">Hospitalization History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Summary ID</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Admitted - Discharged</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Department</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Doctor</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Diagnosis</th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSummaries.map((summary) => (
                <tr key={summary.id} className="hover:bg-gray-50 transition">
                  <td className="py-4 px-4 font-mono text-sm text-blue-600 font-medium">{summary.id}</td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-900">{summary.admissionDate}</div>
                    <div className="text-xs text-gray-500">to {summary.dischargeDate}</div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">{summary.department}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <i className="fas fa-user-md text-gray-400 mr-2"></i>
                      <span className="text-sm text-gray-900">{summary.doctor}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700 truncate max-w-xs">{summary.diagnosis}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition"
                        onClick={() => handleViewDetails(summary)} title="View Details">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button onClick={() => handleDownload(summary.id)} title="Download Summary"
                        className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition">
                        <i className="fas fa-download"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredSummaries.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500">
                    No discharge summaries found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Discharge Summary</h3>
                <p className="text-sm text-gray-500 font-mono mt-1">{selectedSummary.id}</p>
              </div>
              <button onClick={() => setSelectedSummary(null)} className="text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition">
                <i className="fas fa-times"></i>
              </button>
            </div>
            {modalLoading ? (
              <div className="p-20 flex justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                <div className="p-6 space-y-8">
              {/* Header Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Admitted</p>
                  <p className="font-medium text-gray-900">{selectedSummary.admissionDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Discharged</p>
                  <p className="font-medium text-gray-900">{selectedSummary.dischargeDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Department</p>
                  <p className="font-medium text-gray-900">{selectedSummary.department}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Attending Doctor</p>
                  <p className="font-medium text-gray-900">{selectedSummary.doctor}</p>
                </div>
              </div>
              
              {/* Clinical Details */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-gray-800 border-b pb-2 mb-3 flex items-center">
                    <i className="fas fa-stethoscope text-blue-500 mr-2"></i> Diagnosis
                  </h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">{selectedSummary.diagnosis}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 border-b pb-2 mb-3 flex items-center">
                    <i className="fas fa-clipboard-list text-blue-500 mr-2"></i> Reason for Admission
                  </h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">{selectedSummary.reasonForAdmission}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 border-b pb-2 mb-3 flex items-center">
                    <i className="fas fa-procedures text-blue-500 mr-2"></i> Treatment Given
                  </h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100 leading-relaxed">{selectedSummary.treatmentGiven}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 border-b pb-2 mb-3 flex items-center">
                    <i className="fas fa-heartbeat text-blue-500 mr-2"></i> Condition at Discharge
                  </h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">{selectedSummary.conditionAtDischarge}</p>
                </div>
              </div>
              
              {/* Discharge Medications */}
              <div>
                <h4 className="text-sm font-bold text-gray-800 border-b pb-2 mb-4 flex items-center">
                  <i className="fas fa-pills text-blue-500 mr-2"></i> Discharge Medications
                </h4>
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-4 text-left font-medium text-gray-600 border-b">Medicine</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-600 border-b">Dosage</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-600 border-b">Frequency</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-600 border-b">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {selectedSummary.medications.map((med, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{med.name}</td>
                          <td className="py-3 px-4 text-gray-600">{med.dosage}</td>
                          <td className="py-3 px-4 text-gray-600">{med.frequency}</td>
                          <td className="py-3 px-4 text-gray-600">{med.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Follow up */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                <h4 className="text-sm font-bold text-yellow-800 mb-3 flex items-center">
                  <i className="fas fa-calendar-plus mr-2"></i> Follow-up Instructions
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <p className="text-xs text-yellow-600 uppercase tracking-wider mb-1">Next Visit</p>
                    <p className="font-semibold text-gray-900 bg-white inline-block px-3 py-1 rounded border border-yellow-100">{selectedSummary.followUp.date}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs text-yellow-600 uppercase tracking-wider mb-1">Instructions</p>
                    <p className="text-sm text-gray-800">{selectedSummary.followUp.instructions}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Actions */}
            <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end gap-3 rounded-b-xl">
              <button onClick={() => handleDownload(selectedSummary.id)}
                className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm transition flex items-center" >
                <i className="fas fa-download mr-2"></i> Download PDF
              </button>
            </div>
          </>
        )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DischargeSummary;