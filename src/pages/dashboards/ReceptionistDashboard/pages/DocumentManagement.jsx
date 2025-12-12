// import React, { useState, useEffect } from 'react';
// import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner';
// import DataTable from '../../../../components/ui/Tables/DataTable';
// import Modal from '../../../../components/common/Modal/Modal';

// const DocumentManagement = () => {
//   const [loading, setLoading] = useState(true);
//   const [documents, setDocuments] = useState([]);
//   const [showUploadModal, setShowUploadModal] = useState(false);
//   const [selectedPatient, setSelectedPatient] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [filterCategory, setFilterCategory] = useState('All');
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     loadDocuments();
//   }, []);

//   const loadDocuments = async () => {
//     setLoading(true);
//     setTimeout(() => {
//       setDocuments([
//         {
//           id: 'DOC-001',
//           patientId: 'PAT-001',
//           patientName: 'Ravi Kumar',
//           documentName: 'Blood Test Report.pdf',
//           category: 'Lab Report',
//           type: 'PDF',
//           size: '2.4 MB',
//           uploadedDate: '2023-10-15',
//           uploadedBy: 'Dr. Meena Rao',
//           status: 'Verified'
//         },
//         {
//           id: 'DOC-002',
//           patientId: 'PAT-001',
//           patientName: 'Ravi Kumar',
//           documentName: 'X-Ray_Right_Arm.jpg',
//           category: 'X-Ray',
//           type: 'Image',
//           size: '4.2 MB',
//           uploadedDate: '2023-10-14',
//           uploadedBy: 'Reception',
//           status: 'Pending'
//         },
//         {
//           id: 'DOC-003',
//           patientId: 'PAT-002',
//           patientName: 'Anita Sharma',
//           documentName: 'Prescription_Oct.pdf',
//           category: 'Prescription',
//           type: 'PDF',
//           size: '1.1 MB',
//           uploadedDate: '2023-10-12',
//           uploadedBy: 'Dr. Sharma',
//           status: 'Verified'
//         },
//         {
//           id: 'DOC-004',
//           patientId: 'PAT-003',
//           patientName: 'Suresh Patel',
//           documentName: 'Insurance_Card.jpg',
//           category: 'Insurance',
//           type: 'Image',
//           size: '3.8 MB',
//           uploadedDate: '2023-10-10',
//           uploadedBy: 'Reception',
//           status: 'Verified'
//         },
//         {
//           id: 'DOC-005',
//           patientId: 'PAT-004',
//           patientName: 'Priya Singh',
//           documentName: 'MRI_Scan_Report.pdf',
//           category: 'Scan Report',
//           type: 'PDF',
//           size: '8.5 MB',
//           uploadedDate: '2023-10-08',
//           uploadedBy: 'Dr. Menon',
//           status: 'Verified'
//         }
//       ]);
//       setLoading(false);
//     }, 800);
//   };

//   const handleFileSelect = (e) => {
//     const files = Array.from(e.target.files);
//     const newFiles = files.map(file => ({
//       id: Date.now() + Math.random(),
//       file: file,
//       name: file.name,
//       size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
//       type: file.type.split('/')[1]?.toUpperCase() || 'FILE',
//       status: 'Ready'
//     }));
//     setUploadedFiles([...uploadedFiles, ...newFiles]);
//   };

//   const handleRemoveFile = (id) => {
//     setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
//   };

//   const handleUpload = () => {
//     if (!selectedPatient || uploadedFiles.length === 0) {
//       alert('Please select a patient and add files to upload');
//       return;
//     }

//     setUploading(true);
    
//     // Simulate upload process
//     setTimeout(() => {
//       const patientName = documents.find(doc => doc.patientId === selectedPatient)?.patientName || 'Unknown Patient';
      
//       const newDocs = uploadedFiles.map(file => ({
//         id: `DOC-${Date.now()}`,
//         patientId: selectedPatient,
//         patientName: patientName,
//         documentName: file.name,
//         category: 'Medical',
//         type: file.type,
//         size: file.size,
//         uploadedDate: new Date().toISOString().split('T')[0],
//         uploadedBy: 'Reception',
//         status: 'Pending'
//       }));

//       setDocuments([...documents, ...newDocs]);
//       setUploading(false);
//       setShowUploadModal(false);
//       setUploadedFiles([]);
//       setSelectedPatient('');
      
//       alert('Documents uploaded successfully!');
//     }, 1500);
//   };

//   const documentCategories = [
//     'All', 'Prescription', 'Lab Report', 'X-Ray', 'Scan Report', 
//     'Insurance', 'ID Proof', 'Medical Certificate', 'Discharge Summary', 'Other'
//   ];

//   const filteredDocuments = documents.filter(doc => {
//     const matchesCategory = filterCategory === 'All' || doc.category === filterCategory;
//     const matchesSearch = doc.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          doc.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          doc.patientId.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   const getCategoryIcon = (category) => {
//     const icons = {
//       'Prescription': 'fa-prescription-bottle-medical',
//       'Lab Report': 'fa-vial',
//       'X-Ray': 'fa-x-ray',
//       'Scan Report': 'fa-procedures',
//       'Insurance': 'fa-shield-alt',
//       'ID Proof': 'fa-id-card',
//       'Medical Certificate': 'fa-file-certificate',
//       'Discharge Summary': 'fa-file-contract',
//       'Other': 'fa-file-alt'
//     };
//     return icons[category] || 'fa-file';
//   };

//   const getStatusColor = (status) => {
//     return status === 'Verified' ? 'status-confirmed' : 'status-pending';
//   };

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div className="animate-fade-in">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
//         <h2 className="text-xl md:text-2xl font-semibold text-gray-700">📁 Document Management</h2>
//         <button 
//           onClick={() => setShowUploadModal(true)}
//           className="btn btn-primary flex items-center justify-center"
//         >
//           <i className="fas fa-cloud-upload-alt mr-2"></i> Upload Documents
//         </button>
//       </div>

//       {/* Filters and Search */}
//       <div className="bg-white rounded-lg card-shadow border p-4 mb-6">
//         <div className="flex flex-col md:flex-row md:items-center gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search by patient name, ID, or document..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border rounded-lg"
//               />
//               <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
//             </div>
//           </div>
          
//           <div className="flex gap-4">
//             <select
//               value={filterCategory}
//               onChange={(e) => setFilterCategory(e.target.value)}
//               className="border rounded-lg px-4 py-2"
//             >
//               {documentCategories.map(category => (
//                 <option key={category} value={category}>{category} Documents</option>
//               ))}
//             </select>
            
//             <button 
//               onClick={loadDocuments}
//               className="btn btn-secondary flex items-center"
//             >
//               <i className="fas fa-sync-alt mr-2"></i> Refresh
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Upload Modal */}
//       <Modal
//         isOpen={showUploadModal}
//         onClose={() => {
//           setShowUploadModal(false);
//           setUploadedFiles([]);
//           setSelectedPatient('');
//         }}
//         title="Upload Documents"
//         size="lg"
//       >
//         <div className="space-y-6">
//           {/* Patient Selection */}
//           <div className="form-group">
//             <label className="form-label">Select Patient *</label>
//             <select
//               value={selectedPatient}
//               onChange={(e) => setSelectedPatient(e.target.value)}
//               className="form-input"
//               required
//             >
//               <option value="">Choose a patient</option>
//               <option value="PAT-001">Ravi Kumar (PAT-001)</option>
//               <option value="PAT-002">Anita Sharma (PAT-002)</option>
//               <option value="PAT-003">Suresh Patel (PAT-003)</option>
//               <option value="PAT-004">Priya Singh (PAT-004)</option>
//             </select>
//           </div>

//           {/* File Upload Area */}
//           <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//             <input
//               type="file"
//               multiple
//               onChange={handleFileSelect}
//               className="hidden"
//               id="document-upload-input"
//               accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
//             />
//             <label htmlFor="document-upload-input" className="cursor-pointer block">
//               <i className="fas fa-cloud-upload-alt text-4xl text-blue-500 mb-3"></i>
//               <p className="text-lg font-medium text-gray-700">Click to upload files</p>
//               <p className="text-gray-500 mt-1">or drag and drop here</p>
//               <p className="text-sm text-gray-400 mt-2">
//                 Supports: PDF, JPG, PNG, DOC (Max 10MB per file)
//               </p>
//             </label>
//           </div>

//           {/* Selected Files Preview */}
//           {uploadedFiles.length > 0 && (
//             <div className="border rounded-lg p-4">
//               <h4 className="font-medium mb-3">Selected Files ({uploadedFiles.length})</h4>
//               <div className="space-y-2 max-h-60 overflow-y-auto">
//                 {uploadedFiles.map(file => (
//                   <div key={file.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
//                     <div className="flex items-center">
//                       <i className="fas fa-file text-blue-500 mr-3"></i>
//                       <div>
//                         <p className="font-medium text-sm">{file.name}</p>
//                         <p className="text-xs text-gray-500">{file.size} • {file.type}</p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => handleRemoveFile(file.id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <i className="fas fa-times"></i>
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Upload Progress */}
//           {uploading && (
//             <div className="text-center py-4">
//               <i className="fas fa-spinner fa-spin text-blue-500 text-2xl mb-2"></i>
//               <p className="text-gray-600">Uploading documents...</p>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex justify-end gap-3 pt-4">
//             <button
//               type="button"
//               onClick={() => {
//                 setShowUploadModal(false);
//                 setUploadedFiles([]);
//                 setSelectedPatient('');
//               }}
//               className="btn btn-secondary"
//               disabled={uploading}
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={handleUpload}
//               className="btn btn-primary"
//               disabled={uploading || !selectedPatient || uploadedFiles.length === 0}
//             >
//               {uploading ? (
//                 <>
//                   <i className="fas fa-spinner fa-spin mr-2"></i>
//                   Uploading...
//                 </>
//               ) : (
//                 <>
//                   <i className="fas fa-upload mr-2"></i>
//                   Upload Documents
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* Documents Table */}
//       <div className="bg-white rounded-lg card-shadow border overflow-hidden">
//         <DataTable
//           columns={[
//             { 
//               key: 'documentName', 
//               title: 'Document', 
//               sortable: true,
//               render: (value, row) => (
//                 <div className="flex items-center">
//                   <i className={`fas ${getCategoryIcon(row.category)} text-blue-500 mr-3 text-lg`}></i>
//                   <div>
//                     <p className="font-medium">{value}</p>
//                     <p className="text-xs text-gray-500">{row.category} • {row.type}</p>
//                   </div>
//                 </div>
//               )
//             },
//             { 
//               key: 'patientName', 
//               title: 'Patient', 
//               sortable: true,
//               render: (value, row) => (
//                 <div>
//                   <p className="font-medium">{value}</p>
//                   <p className="text-xs text-gray-500">{row.patientId}</p>
//                 </div>
//               )
//             },
//             { key: 'size', title: 'Size', sortable: true },
//             { key: 'uploadedDate', title: 'Upload Date', sortable: true },
//             { key: 'uploadedBy', title: 'Uploaded By', sortable: true },
//             { 
//               key: 'status', 
//               title: 'Status', 
//               sortable: true,
//               render: (value) => (
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
//                   {value}
//                 </span>
//               )
//             },
//             {
//               key: 'actions',
//               title: 'Actions',
//               render: (_, row) => (
//                 <div className="flex gap-2">
//                   <button 
//                     className="text-blue-600 hover:text-blue-800 p-1 modal-touch-target" 
//                     title="View"
//                     onClick={() => alert(`Viewing ${row.documentName}`)}
//                   >
//                     <i className="fas fa-eye"></i>
//                   </button>
//                   <button 
//                     className="text-green-600 hover:text-green-800 p-1 modal-touch-target" 
//                     title="Download"
//                     onClick={() => alert(`Downloading ${row.documentName}`)}
//                   >
//                     <i className="fas fa-download"></i>
//                   </button>
//                   <button 
//                     className="text-purple-600 hover:text-purple-800 p-1 modal-touch-target" 
//                     title="Share"
//                     onClick={() => alert(`Sharing ${row.documentName}`)}
//                   >
//                     <i className="fas fa-share-alt"></i>
//                   </button>
//                   <button 
//                     className="text-red-600 hover:text-red-800 p-1 modal-touch-target" 
//                     title="Delete"
//                     onClick={() => {
//                       if (window.confirm(`Delete ${row.documentName}?`)) {
//                         setDocuments(documents.filter(d => d.id !== row.id));
//                       }
//                     }}
//                   >
//                     <i className="fas fa-trash"></i>
//                   </button>
//                 </div>
//               )
//             }
//           ]}
//           data={filteredDocuments}
//         />
//       </div>

//       {/* Storage Statistics */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <div className="bg-white p-6 rounded-lg card-shadow border">
//           <div className="flex items-center">
//             <div className="p-3 bg-blue-100 rounded-lg mr-4">
//               <i className="fas fa-file-alt text-blue-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500">Total Documents</p>
//               <p className="text-2xl font-bold text-blue-600 mt-1">{documents.length}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white p-6 rounded-lg card-shadow border">
//           <div className="flex items-center">
//             <div className="p-3 bg-green-100 rounded-lg mr-4">
//               <i className="fas fa-check-circle text-green-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500">Verified Documents</p>
//               <p className="text-2xl font-bold text-green-600 mt-1">
//                 {documents.filter(d => d.status === 'Verified').length}
//               </p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white p-6 rounded-lg card-shadow border">
//           <div className="flex items-center">
//             <div className="p-3 bg-purple-100 rounded-lg mr-4">
//               <i className="fas fa-database text-purple-600 text-xl"></i>
//             </div>
//             <div>
//               <p className="text-gray-500">Storage Used</p>
//               <p className="text-2xl font-bold text-purple-600 mt-1">1.2 GB</p>
//               <p className="text-xs text-gray-500 mt-1">of 10 GB used</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Tips */}
//       <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
//         <h4 className="font-semibold text-blue-800 mb-2">📌 Document Management Tips</h4>
//         <ul className="text-blue-700 text-sm space-y-1">
//           <li>• Always verify patient identity before uploading documents</li>
//           <li>• Use appropriate categories for easy retrieval</li>
//           <li>• Keep file sizes under 10MB for faster uploads</li>
//           <li>• Regularly archive old documents to free up space</li>
//           <li>• Ensure sensitive documents are properly encrypted</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default DocumentManagement;






















import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner';
import Modal from '../../../../components/common/Modal/Modal';

const DocumentManagement = () => {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [documentCategory, setDocumentCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  // Remove shared activeTab state

  useEffect(() => {
    loadPatientsData();
  }, []);

  const loadPatientsData = async () => {
    setLoading(true);
    setTimeout(() => {
      setPatients([
        {
          id: 'PAT-001',
          name: 'Ravi Kumar',
          age: 32,
          gender: 'Male',
          phone: '+91 98765 43210',
          lastVisit: '2023-10-15',
          documents: [
            {
              id: 'DOC-001',
              name: 'Aadhar Card',
              type: 'ID Proof',
              category: 'Registration',
              size: '2.1 MB',
              uploadedDate: '2023-10-01',
              uploadedBy: 'Reception',
              fileType: 'pdf'
            },
            {
              id: 'DOC-002',
              name: 'Previous Blood Report',
              type: 'Lab Report',
              category: 'Medical History',
              size: '1.8 MB',
              uploadedDate: '2023-09-15',
              uploadedBy: 'Patient',
              fileType: 'pdf'
            },
            {
              id: 'DOC-003',
              name: 'ECG Report',
              type: 'Test Report',
              category: 'Consultation',
              size: '3.2 MB',
              uploadedDate: '2023-10-15',
              uploadedBy: 'Lab',
              fileType: 'jpg'
            }
          ]
        },
        {
          id: 'PAT-002',
          name: 'Anita Sharma',
          age: 28,
          gender: 'Female',
          phone: '+91 98765 43211',
          lastVisit: '2023-10-10',
          documents: [
            {
              id: 'DOC-004',
              name: 'Insurance Card',
              type: 'Insurance',
              category: 'Registration',
              size: '1.5 MB',
              uploadedDate: '2023-10-10',
              uploadedBy: 'Reception',
              fileType: 'jpg'
            },
            {
              id: 'DOC-005',
              name: 'X-Ray Right Arm',
              type: 'X-Ray',
              category: 'Consultation',
              size: '4.5 MB',
              uploadedDate: '2023-10-10',
              uploadedBy: 'Lab',
              fileType: 'jpg'
            }
          ]
        },
        {
          id: 'PAT-003',
          name: 'Suresh Patel',
          age: 45,
          gender: 'Male',
          phone: '+91 98765 43212',
          lastVisit: '2023-10-05',
          documents: [
            {
              id: 'DOC-006',
              name: 'MRI Scan Report',
              type: 'Scan Report',
              category: 'Medical History',
              size: '8.2 MB',
              uploadedDate: '2023-09-28',
              uploadedBy: 'Patient',
              fileType: 'pdf'
            },
            {
              id: 'DOC-007',
              name: 'Blood Test Results',
              type: 'Lab Report',
              category: 'Consultation',
              size: '1.2 MB',
              uploadedDate: '2023-10-05',
              uploadedBy: 'Lab',
              fileType: 'pdf'
            },
            {
              id: 'DOC-008',
              name: 'Prescription Oct',
              type: 'Prescription',
              category: 'Consultation',
              size: '0.8 MB',
              uploadedDate: '2023-10-05',
              uploadedBy: 'Dr. Menon',
              fileType: 'pdf'
            }
          ]
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.type.split('/')[1]?.toUpperCase() || 'FILE',
      status: 'Ready'
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const handleRemoveFile = (id) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
  };

  const handleUpload = () => {
    if (!selectedPatient || uploadedFiles.length === 0 || !documentCategory) {
      alert('Please select patient, category, and add files to upload');
      return;
    }

    const patientIndex = patients.findIndex(p => p.id === selectedPatient.id);
    if (patientIndex === -1) return;

    const newDocuments = uploadedFiles.map(file => ({
      id: `DOC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      type: documentCategory,
      category: 'Uploaded',
      size: file.size,
      uploadedDate: new Date().toISOString().split('T')[0],
      uploadedBy: 'Reception',
      fileType: file.type.toLowerCase().includes('pdf') ? 'pdf' : 
                file.type.toLowerCase().includes('image') ? 'image' : 'file'
    }));

    const updatedPatients = [...patients];
    updatedPatients[patientIndex].documents = [
      ...updatedPatients[patientIndex].documents,
      ...newDocuments
    ];

    setPatients(updatedPatients);
    setShowUploadModal(false);
    setUploadedFiles([]);
    setDocumentCategory('');
    alert('Documents uploaded successfully!');
  };

  const documentCategories = [
    'ID Proof',
    'Insurance Documents',
    'Previous Medical Reports',
    'Lab Reports',
    'Prescription',
    'X-Ray',
    'Scan Reports',
    'Discharge Summary',
    'Other Medical Documents'
  ];

  const getFileIcon = (fileType) => {
    switch(fileType) {
      case 'pdf': return 'fa-file-pdf';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'image': return 'fa-file-image';
      case 'doc':
      case 'docx': return 'fa-file-word';
      default: return 'fa-file';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Registration': 'bg-blue-100 text-blue-800',
      'Medical History': 'bg-purple-100 text-purple-800',
      'Consultation': 'bg-green-100 text-green-800',
      'Uploaded': 'bg-yellow-100 text-yellow-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Patient Card Component - Each card manages its own state
  const PatientCard = ({ patient }) => {
    const [activeTab, setActiveTab] = useState('all'); // Local state for each card

    const getDocumentsByType = (documents, type) => {
      if (type === 'all') return documents;
      if (type === 'medical') return documents.filter(d => 
        ['Previous Medical Reports', 'Prescription', 'Discharge Summary'].includes(d.type)
      );
      if (type === 'reports') return documents.filter(d => 
        ['Lab Report', 'X-Ray', 'Scan Report', 'Test Report'].includes(d.type)
      );
      if (type === 'other') return documents.filter(d => 
        ['ID Proof', 'Insurance'].includes(d.type)
      );
      return documents;
    };

    const filteredDocs = getDocumentsByType(patient.documents, activeTab);

    return (
      <div className="bg-white rounded-lg shadow border hover:shadow-md transition-shadow h-full flex flex-col">
        {/* Patient Header */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg truncate">{patient.name}</h3>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {patient.documents.length} docs
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <div className="flex items-center">
                  <i className="fas fa-id-card text-gray-500 text-xs mr-1"></i>
                  <span className="text-gray-600 truncate">{patient.id}</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-user text-gray-500 text-xs mr-1"></i>
                  <span className="text-gray-600">{patient.age}y, {patient.gender}</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-phone text-gray-500 text-xs mr-1"></i>
                  <span className="text-gray-600 truncate">{patient.phone}</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-calendar text-gray-500 text-xs mr-1"></i>
                  <span className="text-gray-600">Last: {patient.lastVisit}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedPatient(patient);
                setShowUploadModal(true);
              }}
              className="ml-3 text-blue-600 hover:text-blue-800 flex-shrink-0"
              title="Upload documents"
            >
              <i className="fas fa-plus-circle text-xl"></i>
            </button>
          </div>
        </div>

        {/* Document Categories Tabs */}
        <div className="border-b">
          <div className="flex overflow-x-auto">
            {['all', 'medical', 'reports', 'other'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-3 py-2 text-xs font-medium whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'all' && 'All Documents'}
                {tab === 'medical' && 'Medical'}
                {tab === 'reports' && 'Reports'}
                {tab === 'other' && 'Other'}
              </button>
            ))}
          </div>
        </div>

        {/* Documents List */}
        <div className="p-4 flex-1 overflow-hidden">
          {filteredDocs.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center py-6">
              <i className="fas fa-file text-gray-300 text-3xl mb-2"></i>
              <p className="text-gray-500 text-sm">No documents found</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {filteredDocs.slice(0, 3).map(doc => ( // Show only 3 documents initially
                <div key={doc.id} className="flex items-center p-2 bg-gray-50 rounded hover:bg-gray-100">
                  <div className={`p-2 rounded-lg mr-3 ${
                    doc.fileType === 'pdf' ? 'bg-red-50 text-red-600' : 
                    doc.fileType === 'image' ? 'bg-green-50 text-green-600' : 
                    'bg-blue-50 text-blue-600'
                  }`}>
                    <i className={`fas ${getFileIcon(doc.fileType)} text-sm`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{doc.name}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(doc.category)}`}>
                        {doc.type}
                      </span>
                      <span className="text-xs text-gray-500">{doc.size}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 p-1"
                      title="View"
                      onClick={() => alert(`Viewing ${doc.name}`)}
                    >
                      <i className="fas fa-eye text-sm"></i>
                    </button>
                    <button
                      className="text-green-600 hover:text-green-800 p-1"
                      title="Download"
                      onClick={() => alert(`Downloading ${doc.name}`)}
                    >
                      <i className="fas fa-download text-sm"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View All Button */}
        {patient.documents.length > 3 && (
          <div className="px-4 py-2 border-t bg-gray-50">
            <button
              onClick={() => {
                setSelectedPatient(patient);
                setShowPatientModal(true);
              }}
              className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium py-1"
            >
              View all {patient.documents.length} documents →
            </button>
          </div>
        )}
      </div>
    );
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700">📁 Patient Document Management</h2>
          <p className="text-gray-600 text-sm mt-1">Manage patient documents, lab reports, and medical records</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowPatientModal(true)}
            className="btn btn-primary flex items-center"
          >
            <i className="fas fa-cloud-upload-alt mr-2"></i> Upload Documents
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search patients by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>

      {/* Patients Grid */}
      {filteredPatients.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <i className="fas fa-users text-gray-300 text-4xl mb-3"></i>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No patients found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map(patient => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <div className="bg-white rounded-lg shadow-sm border p-5">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg mr-4">
              <i className="fas fa-user-injured text-blue-600 text-lg"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Patients</p>
              <p className="text-xl font-bold text-blue-600 mt-1">{patients.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-5">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg mr-4">
              <i className="fas fa-file-medical text-green-600 text-lg"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Documents</p>
              <p className="text-xl font-bold text-green-600 mt-1">
                {patients.reduce((sum, patient) => sum + patient.documents.length, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-5">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 rounded-lg mr-4">
              <i className="fas fa-vial text-purple-600 text-lg"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Lab Reports</p>
              <p className="text-xl font-bold text-purple-600 mt-1">
                {patients.reduce((sum, patient) => 
                  sum + patient.documents.filter(d => d.type.includes('Report')).length, 0
                )}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-5">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-50 rounded-lg mr-4">
              <i className="fas fa-id-card text-yellow-600 text-lg"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">ID Proofs</p>
              <p className="text-xl font-bold text-yellow-600 mt-1">
                {patients.reduce((sum, patient) => 
                  sum + patient.documents.filter(d => d.type === 'ID Proof').length, 0
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {selectedPatient && (
        <Modal
          isOpen={showUploadModal}
          onClose={() => {
            setShowUploadModal(false);
            setUploadedFiles([]);
            setDocumentCategory('');
          }}
          title={`Upload Documents to ${selectedPatient.name}`}
          size="lg"
        >
          <div className="space-y-6">
            {/* Patient Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-user text-blue-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">{selectedPatient.name}</h4>
                  <div className="flex flex-wrap gap-3 mt-1">
                    <span className="text-sm text-gray-600">ID: {selectedPatient.id}</span>
                    <span className="text-sm text-gray-600">Age: {selectedPatient.age}</span>
                    <span className="text-sm text-gray-600">Gender: {selectedPatient.gender}</span>
                    <span className="text-sm text-gray-600">Documents: {selectedPatient.documents.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Category *
              </label>
              <select
                value={documentCategory}
                onChange={(e) => setDocumentCategory(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select document type</option>
                {documentCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Select the appropriate category for proper organization
              </p>
            </div>

            {/* File Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
              <label htmlFor="file-upload" className="cursor-pointer block">
                <i className="fas fa-cloud-upload-alt text-5xl text-blue-500 mb-4"></i>
                <p className="text-lg font-medium text-gray-700 mb-1">Click to upload files</p>
                <p className="text-gray-500">or drag and drop here</p>
                <p className="text-sm text-gray-400 mt-3">
                  Supports: PDF, JPG, PNG, DOC (Max 10MB per file)
                </p>
              </label>
            </div>

            {/* Selected Files */}
            {uploadedFiles.length > 0 && (
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Selected Files ({uploadedFiles.length})</h4>
                  <button
                    onClick={() => setUploadedFiles([])}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {uploadedFiles.map(file => (
                    <div key={file.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center">
                        <i className="fas fa-file text-blue-500 mr-3"></i>
                        <div>
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size} • {file.type}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFile(file.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadedFiles([]);
                  setDocumentCategory('');
                }}
                className="px-5 py-2.5 border rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!documentCategory || uploadedFiles.length === 0}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <i className="fas fa-upload mr-2"></i>
                Upload to Patient
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Patient Selection Modal */}
      <Modal
        isOpen={showPatientModal}
        onClose={() => setShowPatientModal(false)}
        title="Select Patient for Document Upload"
        size="lg"
      >
        <div className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients by name or ID..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
            {filteredPatients.map(patient => (
              <div
                key={patient.id}
                className="border rounded-lg p-4 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer"
                onClick={() => {
                  setSelectedPatient(patient);
                  setShowPatientModal(false);
                  setShowUploadModal(true);
                }}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-user text-blue-600"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{patient.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-600">ID: {patient.id}</span>
                      <span className="text-sm px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                        {patient.documents.length} docs
                      </span>
                    </div>
                  </div>
                  <i className="fas fa-chevron-right text-gray-400"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Workflow Info */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-info-circle text-blue-600 mr-2"></i>
          Document Management Workflow
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="font-bold text-blue-600">1</span>
              </div>
              <h5 className="font-semibold">Registration Documents</h5>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Upload ID proof during patient registration</li>
              <li>• Add insurance documents</li>
              <li>• Attach previous medical reports</li>
            </ul>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="font-bold text-green-600">2</span>
              </div>
              <h5 className="font-semibold">Consultation Documents</h5>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Prescriptions are automatically added</li>
              <li>• Lab test results are linked to patient</li>
              <li>• Doctor's notes and recommendations</li>
            </ul>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <span className="font-bold text-purple-600">3</span>
              </div>
              <h5 className="font-semibold">Ongoing Management</h5>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Add discharge summaries</li>
              <li>• Upload follow-up reports</li>
              <li>• Manage all documents in one place</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentManagement;