import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import { apiFetch } from '../../../../services/apiClient'

const MedicalRecords = ({ patientRef }) => {
  const [loading, setLoading] = useState(true)
  const [records, setRecords] = useState([])
  const [timeline, setTimeline] = useState([])
  const [summary, setSummary] = useState(null)
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadMedicalRecords()
  }, [patientRef])

  const loadMedicalRecords = async () => {
    setLoading(true)
    
    try {
      // Fetch Patient Summary using dynamically selected endpoint based on context
      const summaryUrl = patientRef 
        ? `/api/v1/patient-medical-history/patients/${patientRef}/summary`
        : '/api/v1/patient-medical-history/my/summary';
      const summaryRes = await apiFetch(summaryUrl);
      if (summaryRes.ok) {
         const summaryData = await summaryRes.json();
         setSummary(summaryData.data || summaryData);
      }
    } catch(err) {
       console.error("Failed to load patient summary", err);
    }
    
    // Fetch Medical Records depending on context
    try {
      const recordsUrl = patientRef
        ? `/api/v1/patient-medical-history/patients/${patientRef}/medical-records?page=1&limit=20`
        : '/api/v1/patient-medical-history/my/medical-records?page=1&limit=20';
      const recordsRes = await apiFetch(recordsUrl);
      if (recordsRes.ok) {
         const recordsJson = await recordsRes.json();
         const recordsList = recordsJson.data?.records || recordsJson.records || [];
         
         const mappedRecords = recordsList.map(r => ({
            id: r.id,
            patientRef: r.patient_ref || '',
            patientName: r.patient_name || '',
            appointmentRef: r.appointment_ref || null,
            type: r.type || (
              r.department_name && r.department_name.toLowerCase().includes('lab') ? 'Lab Test' :
              r.department_name && r.department_name.toLowerCase().includes('radiology') ? 'X-Ray' :
              'Consultation'
            ),
            date: r.visit_date ? r.visit_date.slice(0, 10) : r.created_at.slice(0, 10),
            doctor: r.doctor_name || '',
            department: r.department_name || '',
            diagnosis: r.diagnosis || '',
            symptoms: r.chief_complaint || '',
            treatment: r.treatment_plan || '',
            vitalSigns: r.vital_signs || null,
            attachments: Array.isArray(r.prescriptions) ? r.prescriptions.length : 0,
            prescriptions: Array.isArray(r.prescriptions) ? r.prescriptions : [],
            status: r.is_finalized ? 'Completed' : 'Draft',
            raw: r 
         }));
         
         setRecords(mappedRecords);
      } else {
         throw new Error("Failed to fetch medical records");
      }
    } catch(err) {
       console.error("Error loading medical records:", err);
       setRecords([]);
    }
    
    // Fetch Timeline depending on context
    try {
      const timelineUrl = patientRef
        ? `/api/v1/patient-medical-history/patients/${patientRef}/timeline`
        : '/api/v1/patient-medical-history/my/timeline';
      const timelineRes = await apiFetch(timelineUrl);
      if (timelineRes.ok) {
         const timelineJson = await timelineRes.json();
         setTimeline(timelineJson.data?.timeline || timelineJson.timeline || []);
      }
    } catch(err) {
       console.error("Error loading timeline:", err);
       setTimeline([]);
    } finally {
       setLoading(false);
    }
  }

  const handleViewDetails = async (record) => {
    setSelectedRecord({ ...record, fetchingDetails: true });
    
    try {
      const detailUrl = patientRef
        ? `/api/v1/patient-medical-history/patients/${patientRef}/medical-records/${record.id}`
        : `/api/v1/patient-medical-history/my/medical-records/${record.id}`;
      const res = await apiFetch(detailUrl);
      if (res.ok) {
        const detailJson = await res.json();
        const details = detailJson.data || detailJson;
        setSelectedRecord({ ...record, ...details, fetchingDetails: false });
      } else {
        setSelectedRecord({ ...record, fetchingDetails: false, error: 'Failed to load extended details' });
      }
    } catch(err) {
      console.error(err);
      setSelectedRecord({ ...record, fetchingDetails: false, error: 'Failed to load extended details' });
    }
  }

  const handleDownload = (recordId) => {
    const record = records.find(r => r.id === recordId) || selectedRecord;
    if (!record) return;
    
    // Create formatted text document for download
    const content = `MEDICAL RECORD\n--------------------\nRecord ID: ${record.id}\nDate: ${record.date}\nType: ${record.type}\nDiagnosis: ${record.diagnosis}\nDoctor: ${record.doctor}\nDepartment: ${record.department}\n\nSymptoms:\n${record.symptoms}\n\nTreatment & Notes:\n${record.treatment || record.treatment_plan || 'N/A'}\n--------------------\nHospital Management System`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Medical_Record_${record.date.replace(/-/g, '')}_${record.department.replace(/\s+/g, '')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = async (recordId) => {
    let shareTitle = 'My Medical Records';
    let shareText = `I am securely sharing my medical history summary from the Hospital Management patient portal.`;

    if (recordId !== 'all') {
      const record = records.find(r => r.id === recordId) || selectedRecord;
      if (record) {
         shareTitle = `Medical Record: ${record.diagnosis}`;
         shareText = `Medical record from ${record.date} regarding ${record.diagnosis} under Dr. ${record.doctor}.`;
      }
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
        });
      } catch (err) {
        console.error("User cancelled share or error:", err);
      }
    } else {
      // Fallback copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert("Details copied to clipboard successfully (Your browser does not support the native popup).");
    }
  };

  const handleExportAll = () => {
    if (!summary || records.length === 0) {
       alert("Data is still loading, please wait.");
       return;
    }
    
    const exportData = {
       generated_on: new Date().toISOString(),
       patient_profile: summary,
       medical_records: records,
       history_timeline: timeline
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Full_Medical_History_${summary?.patient_ref || 'Patient'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredRecords = filter === 'all' 
    ? records 
    : records.filter(record => record.type === filter)

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 animate-fade-in p-2 sm:p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800"> Medical Records</h2>
          <p className="text-gray-500 text-sm mt-1">Your complete medical history and health records</p>
        </div>
        <div className="flex gap-2">
           <button onClick={handleExportAll} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium shadow-sm">
             <i className="fas fa-download mr-2"></i>Export All
           </button>
           <button onClick={() => handleShare('all')} className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium shadow-sm">
             <i className="fas fa-share-alt mr-2"></i>Share Records
           </button>
        </div>
      </div>

      {/* Comprehensive Patient Profile Summary Card */}
      {summary && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8 mt-4 relative animate-fade-in group hover:shadow-md transition duration-300">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/60 rounded-full blur-3xl -mx-32 -my-32 opacity-70 pointer-events-none"></div>
          
          <div className="relative z-10 p-6 md:p-8">
             {/* Part 1: Core Identity & High-Level Vitals */}
             <div className="flex flex-col xl:flex-row gap-8 items-start xl:items-center">
                
                {/* Identity Left */}
                <div className="flex items-center gap-5 xl:w-1/4 xl:border-r border-gray-100 xl:pr-6 shrink-0">
                   <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-md shrink-0 border-2 border-white">
                      {summary.patient_name?.charAt(0) || 'P'}
                   </div>
                   <div>
                     <h3 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">{summary.patient_name}</h3>
                     <p className="text-sm font-semibold text-indigo-600 mt-1">{summary.patient_ref}</p>
                   </div>
                </div>

                {/* Vitals Right */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-grow w-full">
                   <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex items-start flex-col w-full shadow-sm">
                      <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1"><i className="fas fa-calendar mr-1.5 opacity-60"></i>Date of Birth</p>
                      <p className="font-bold text-gray-800 text-[15px]">{summary.date_of_birth || 'N/A'}</p>
                   </div>
                   <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex items-start flex-col w-full shadow-sm">
                      <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1"><i className="fas fa-venus-mars mr-1.5 opacity-60"></i>Gender</p>
                      <p className="font-bold text-gray-800 text-[15px]">{summary.gender || 'N/A'}</p>
                   </div>
                   <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start flex-col relative overflow-hidden w-full shadow-sm">
                      <i className="fas fa-tint absolute -bottom-2 -right-2 text-4xl text-red-500 opacity-10"></i>
                      <p className="text-[11px] text-red-600 font-bold uppercase tracking-wider mb-1">Blood Group</p>
                      <p className="font-extrabold text-red-600 text-xl leading-none mt-1">{summary.blood_group || 'N/A'}</p>
                   </div>
                   <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-start flex-col relative overflow-hidden w-full shadow-sm">
                      <i className="fas fa-stethoscope absolute -bottom-2 -right-2 text-4xl text-emerald-500 opacity-10"></i>
                      <p className="text-[11px] text-emerald-600 font-bold uppercase tracking-wider mb-1">Total Visits</p>
                      <p className="font-extrabold text-emerald-600 text-xl leading-none mt-1">{summary.total_visits || 0}</p>
                   </div>
                </div>
             </div>

             <hr className="my-6 border-slate-100" />

             {/* Part 2: Expansive Clinical Overview */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                
                {/* Active */}
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center"><i className="fas fa-thermometer-half mr-2 opacity-50"></i>Active Conditions</p>
                  <div className="flex flex-wrap gap-2">
                     {summary.active_conditions?.length > 0 ? summary.active_conditions.map((c, i) => (
                        <span key={i} className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-xs font-semibold shadow-sm">{c}</span>
                     )) : <span className="text-sm text-gray-400 font-medium italic">None recorded</span>}
                  </div>
                </div>

                {/* Chronic */}
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center"><i className="fas fa-heartbeat mr-2 opacity-50"></i>Chronic Issues</p>
                  <div className="flex flex-wrap gap-2">
                     {summary.chronic_conditions?.length > 0 ? summary.chronic_conditions.map((c, i) => (
                        <span key={i} className="px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-md text-xs font-semibold shadow-sm">{c}</span>
                     )) : <span className="text-sm text-gray-400 font-medium italic">None recorded</span>}
                  </div>
                </div>

                {/* Allergies */}
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center"><i className="fas fa-allergies mr-2 opacity-50"></i>Allergies</p>
                  <div className="flex flex-wrap gap-2">
                     {summary.allergies?.length > 0 ? summary.allergies.map((a, i) => (
                        <span key={i} className="px-2.5 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded-md text-xs font-semibold shadow-sm"><i className="fas fa-exclamation-triangle mr-1.5 opacity-60"></i>{a}</span>
                     )) : <span className="text-sm text-gray-400 font-medium italic">No Known Allergies</span>}
                  </div>
                </div>

                {/* Medications */}
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center"><i className="fas fa-pills mr-2 opacity-50"></i>Medications</p>
                  <div className="flex flex-wrap gap-2">
                     {summary.current_medications?.length > 0 ? summary.current_medications.map((m, i) => (
                        <span key={i} className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-semibold shadow-sm"><i className="fas fa-prescription-bottle-alt mr-1.5 opacity-60"></i>{m}</span>
                     )) : <span className="text-sm text-gray-400 font-medium italic">None prescribed</span>}
                  </div>
                </div>

             </div>

             {/* Part 3: Administrative Info */}
             {(summary.emergency_contact?.name || summary.last_visit_date) && (
               <div className="mt-7 pt-5 flex flex-wrap gap-4 border-t border-dashed border-gray-200">
                  {summary.emergency_contact?.name && (
                     <div className="flex items-center gap-3 bg-red-50/50 px-4 py-2.5 rounded-xl border border-red-100 flex-grow sm:flex-grow-0">
                       <i className="fas fa-phone-alt text-red-500 opacity-80"></i>
                       <div>
                         <p className="text-[10px] uppercase font-bold text-red-400 tracking-wider">Emergency ({summary.emergency_contact.relation})</p>
                         <p className="text-sm font-bold text-gray-800">{summary.emergency_contact.name} • <span className="text-gray-600">{summary.emergency_contact.phone}</span></p>
                       </div>
                     </div>
                  )}
                  
                  {summary.last_visit_date && (
                     <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100 lg:ml-auto flex-grow sm:flex-grow-0">
                       <i className="fas fa-history text-gray-400"></i>
                       <div>
                         <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Last Interaction</p>
                         <p className="text-sm font-bold text-gray-800">{summary.last_visit_date}</p>
                       </div>
                     </div>
                  )}
               </div>
             )}

          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 pt-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${
            filter === 'all' 
              ? 'bg-blue-100 text-blue-700 border border-blue-200' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Records
        </button>
   
       
       
       
      </div>

      {/* Medical Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecords.map(record => (
          <div key={record.id} className="bg-white rounded-xl card-shadow border p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  record.type === 'Consultation' ? 'bg-blue-100 text-blue-700' :
                  record.type === 'Lab Test' ? 'bg-green-100 text-green-700' :
                  record.type === 'X-Ray' ? 'bg-purple-100 text-purple-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {record.type}
                </span>
                <h3 className="font-semibold text-gray-800 mt-2">{record.diagnosis}</h3>
              </div>
              <span className="text-xs text-gray-500">{record.date}</span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm">
                <i className="fas fa-user-md text-gray-400 mr-2 w-5"></i>
                <span className="text-gray-700">{record.doctor}</span>
              </div>
              <div className="flex items-center text-sm">
                <i className="fas fa-building text-gray-400 mr-2 w-5"></i>
                <span className="text-gray-700">{record.department}</span>
              </div>
              <div className="flex items-center text-sm">
                <i className="fas fa-stethoscope text-gray-400 mr-2 w-5"></i>
                <span className="text-gray-700 truncate">{record.symptoms}</span>
              </div>
            </div>
            
            {record.attachments > 0 && (
              <div className="mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-paperclip mr-2"></i>
                  <span>{record.attachments} attachment{record.attachments !== 1 ? 's' : ''}</span>
                </div>
              </div>
            )}
            
            <div className="flex justify-between pt-4 border-t">
              <button
                onClick={() => handleViewDetails(record)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none"
              >
                <i className="fas fa-eye mr-1"></i> View Details
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(record.id)}
                  className="text-gray-600 hover:text-gray-800"
                  title="Download"
                >
                  <i className="fas fa-download"></i>
                </button>
                <button
                  onClick={() => handleShare(record.id)}
                  className="text-gray-600 hover:text-gray-800"
                  title="Share"
                >
                  <i className="fas fa-share-alt"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Patient Health Timeline */}
      {timeline && timeline.length > 0 && (
         <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">Health Timeline</h2>
              <p className="text-gray-500 text-sm mt-1">Chronological history of your appointments and health events</p>
            </div>
            
            <div className="relative border-l-2 border-blue-200 ml-4 pl-6 space-y-6 mb-8">
               {timeline.map((item, index) => (
                  <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                     <div className={`absolute -left-[35px] top-1.5 w-4 h-4 rounded-full border-4 border-white ${item.type === 'appointment' ? 'bg-blue-500' : 'bg-emerald-500'} shadow-sm`}></div>
                     
                     <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-200 group">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2 sm:gap-0">
                           <div className="flex items-center gap-2">
                             <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${item.type === 'appointment' ? 'bg-blue-50 text-blue-500' : 'bg-emerald-50 text-emerald-500'}`}>
                                <i className={`fas ${item.type === 'appointment' ? 'fa-calendar-check' : 'fa-notes-medical'}`}></i>
                             </div>
                             <h4 className="font-semibold text-gray-800 text-base">{item.title}</h4>
                           </div>
                           <span className="text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-md">{item.date}</span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 sm:ml-10">{item.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-xs sm:ml-10">
                           <div className="flex items-center text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded">
                             <i className="fas fa-user-md mr-1.5 text-gray-400"></i> {item.doctor_name}
                           </div>
                           <div className="flex items-center text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded">
                             <i className="fas fa-building mr-1.5 text-gray-400"></i> {item.department_name}
                           </div>
                           
                           <div className="ml-auto">
                              <span className={`px-2.5 py-1 rounded text-[10px] font-extrabold uppercase tracking-widest ${
                                item.status?.toUpperCase() === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                item.status?.toUpperCase() === 'CANCELLED' ? 'bg-red-50 text-red-700 border border-red-100' :
                                item.status?.toUpperCase() === 'REQUESTED' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                item.status?.toUpperCase() === 'DRAFT' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                                'bg-gray-100 text-gray-700 border border-gray-200'
                              }`}>
                                {item.status ? item.status.replace(/_/g, ' ') : 'N/A'}
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      )}

      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 transition-opacity">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Medical Record Details</h3>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-gray-400 hover:text-gray-600 transition focus:outline-none"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Header Info */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Record ID</p>
                    <p className="font-medium text-sm truncate" title={selectedRecord.id}>{selectedRecord.id}</p>
                  </div>
                  {selectedRecord.appointmentRef && (
                    <div>
                      <p className="text-sm text-gray-500">Appointment Ref</p>
                      <p className="font-medium text-sm truncate">{selectedRecord.appointmentRef}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block mt-1 ${
                      selectedRecord.type === 'Consultation' ? 'bg-blue-100 text-blue-700' :
                      selectedRecord.type === 'Lab Test' ? 'bg-green-100 text-green-700' :
                      selectedRecord.type === 'X-Ray' ? 'bg-purple-100 text-purple-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {selectedRecord.type}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{selectedRecord.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block mt-1 ${selectedRecord.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {selectedRecord.status}
                    </span>
                  </div>
                </div>
                
                {/* Doctor Info */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">Doctor Information</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-user-md text-blue-600"></i>
                    </div>
                    <div>
                      <p className="font-medium">{selectedRecord.doctor}</p>
                      <p className="text-sm text-gray-600">{selectedRecord.department}</p>
                    </div>
                  </div>
                </div>
                
                {/* Core Overview from List View (Initially populated) */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">Diagnosis</p>
                  <p className="font-medium text-gray-800">{selectedRecord.diagnosis}</p>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">Symptoms / Chief Complaint</p>
                  <p className="text-gray-700 text-sm mt-1">{selectedRecord.symptoms}</p>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">Treatment & Recommendations</p>
                  <p className="text-gray-700 text-sm mt-1">{selectedRecord.treatment || selectedRecord.treatment_plan || 'N/A'}</p>
                </div>

                {/* API Fetch Extension Container */}
                {selectedRecord.fetchingDetails ? (
                   <div className="border-t pt-8 pb-4 flex flex-col items-center justify-center text-blue-500 opacity-70">
                      <i className="fas fa-circle-notch fa-spin text-3xl mb-3"></i>
                      <p className="text-sm text-gray-500">Loading extended clinical details...</p>
                   </div>
                ) : selectedRecord.error ? (
                   <div className="border-t pt-4">
                      <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm flex items-center">
                         <i className="fas fa-exclamation-triangle mr-2"></i> {selectedRecord.error}
                      </div>
                   </div>
                ) : (
                   <>
                     {/* Extended Clinical Details from /my/medical-records/{id} */}
                     {selectedRecord.history_of_present_illness && (
                        <div className="border-t pt-4 animate-fade-in">
                           <p className="text-sm text-gray-500">History of Present Illness</p>
                           <p className="text-gray-700 text-sm mt-1">{selectedRecord.history_of_present_illness}</p>
                        </div>
                     )}
                     
                     {selectedRecord.past_medical_history && (
                        <div className="border-t pt-4 animate-fade-in">
                           <p className="text-sm text-gray-500">Past Medical History</p>
                           <p className="text-gray-700 text-sm mt-1">{selectedRecord.past_medical_history}</p>
                        </div>
                     )}

                     {selectedRecord.examination_findings && (
                        <div className="border-t pt-4 animate-fade-in">
                           <p className="text-sm text-gray-500">Examination Findings</p>
                           <p className="text-gray-700 text-sm mt-1 bg-gray-50 p-3 rounded-lg border border-gray-100">{selectedRecord.examination_findings}</p>
                        </div>
                     )}

                     {/* Vitals (from both list view and detail view) */}
                     {((selectedRecord.vitalSigns && Object.keys(selectedRecord.vitalSigns).length > 0) || 
                       (selectedRecord.vital_signs && Object.keys(selectedRecord.vital_signs).length > 0)) && (
                        <div className="border-t pt-4 animate-fade-in">
                           <p className="text-sm text-gray-500 mb-2">Vital Signs</p>
                           <div className="flex flex-wrap gap-3 mt-1">
                              {Object.entries(selectedRecord.vitalSigns || selectedRecord.vital_signs).map(([key, value], i) => (
                                 // Ignoring empty placeholder "additionalProp1" strictly for empty dictionaries
                                 key !== 'additionalProp1' && (
                                   <div key={i} className="bg-gray-50 border border-gray-100 rounded-md px-3 py-1.5 flex flex-col min-w-[80px]">
                                      <span className="text-[10px] uppercase text-gray-400 font-semibold">{key.replace(/_/g, ' ')}</span>
                                      <span className="text-sm font-medium text-gray-800">
                                         {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                      </span>
                                   </div>
                                 )
                              ))}
                           </div>
                        </div>
                     )}
                     
                     {selectedRecord.differential_diagnosis?.length > 0 && (
                        <div className="border-t pt-4 animate-fade-in">
                           <p className="text-sm text-gray-500">Differential Diagnosis</p>
                           <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 space-y-1">
                              {selectedRecord.differential_diagnosis.map((diag, i) => <li key={i}>{diag}</li>)}
                           </ul>
                        </div>
                     )}

                     {/* Lab Orders */}
                     {selectedRecord.lab_orders && selectedRecord.lab_orders.length > 0 && selectedRecord.lab_orders[0] && Object.keys(selectedRecord.lab_orders[0]).length > 0 && (
                        <div className="border-t pt-4 animate-fade-in">
                           <p className="text-sm text-gray-500 mb-2"><i className="fas fa-flask mr-1 opacity-70"></i> Lab Orders</p>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {selectedRecord.lab_orders.map((lab, i) => (
                                 lab.additionalProp1 === undefined && (
                                   <div key={i} className="bg-purple-50/60 p-2.5 rounded-lg border border-purple-100 flex items-center justify-between text-sm">
                                     <span className="font-semibold text-purple-900">{lab.test_name || lab.name || 'Lab Test'}</span>
                                     <i className="fas fa-microscope text-purple-300"></i>
                                   </div>
                                 )
                              ))}
                           </div>
                        </div>
                     )}

                     {/* Imaging Orders */}
                     {selectedRecord.imaging_orders && selectedRecord.imaging_orders.length > 0 && selectedRecord.imaging_orders[0] && Object.keys(selectedRecord.imaging_orders[0]).length > 0 && (
                        <div className="border-t pt-4 animate-fade-in">
                           <p className="text-sm text-gray-500 mb-2"><i className="fas fa-x-ray mr-1 opacity-70"></i> Imaging Orders</p>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {selectedRecord.imaging_orders.map((img, i) => (
                                 img.additionalProp1 === undefined && (
                                   <div key={i} className="bg-orange-50/60 p-2.5 rounded-lg border border-orange-100 flex items-center justify-between text-sm">
                                     <span className="font-semibold text-orange-900">{img.imaging_type || img.name || 'Imaging Test'}</span>
                                     <i className="fas fa-bone text-orange-300"></i>
                                   </div>
                                 )
                              ))}
                           </div>
                        </div>
                     )}
                     
                     {selectedRecord.follow_up_instructions && (
                        <div className="border-t mt-4 pt-4 bg-blue-50/50 -mx-6 px-6 pb-2 animate-fade-in">
                           <p className="text-sm text-blue-700 font-semibold mb-2 flex items-center">
                             <i className="fas fa-info-circle mr-2 opacity-80"></i> Follow-up Instructions
                           </p>
                           <p className="text-blue-900 text-sm bg-white p-3 rounded border border-blue-100 shadow-sm">
                             {selectedRecord.follow_up_instructions}
                           </p>
                        </div>
                     )}
                   </>
                )}
                
                {/* Attachments */}
                {Array.isArray(selectedRecord.prescriptions) && selectedRecord.prescriptions.length > 0 && (
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-500 mb-3">Prescriptions ({selectedRecord.prescriptions.length})</p>
                    <div className="space-y-3">
                      {selectedRecord.prescriptions.map((prescription, idx) => (
                        <div key={idx} className="border rounded-lg p-3">
                          <p className="font-medium text-sm">
                            {typeof prescription === 'string' ? prescription : prescription.name || `Prescription ${idx + 1}`}
                          </p>
                          {typeof prescription === 'object' && prescription.notes && (
                            <p className="text-xs text-gray-500 mt-1">{prescription.notes}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t">
                  <button
                    onClick={() => handleDownload(selectedRecord.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                  >
                    <i className="fas fa-download mr-2"></i>Download Record
                  </button>
                  <button
                    onClick={() => handleShare(selectedRecord.id)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none"
                  >
                    <i className="fas fa-share-alt mr-2"></i>Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MedicalRecords