// import React, { useState, useEffect } from 'react'
// import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
// import DataTable from '../../../../components/ui/Tables/DataTable'

// const PatientRecords = () => {
//   const [loading, setLoading] = useState(true)
//   const [patients, setPatients] = useState([])
//   const [searchTerm, setSearchTerm] = useState('')

//   useEffect(() => {
//     loadPatients()
//   }, [])

//   const loadPatients = async () => {
//     setLoading(true)
//     setTimeout(() => {
//       setPatients([
//         { 
//           id: 'PAT-001', 
//           name: 'Ravi Kumar', 
//           age: 32, 
//           gender: 'Male', 
//           phone: '+91 98765 43210', 
//           lastVisit: '2023-10-15',
//           status: 'Active'
//         },
//         { 
//           id: 'PAT-002', 
//           name: 'Anita Sharma', 
//           age: 28, 
//           gender: 'Female', 
//           phone: '+91 98765 43211', 
//           lastVisit: '2023-10-10',
//           status: 'Active'
//         },
//         { 
//           id: 'PAT-003', 
//           name: 'Suresh Patel', 
//           age: 45, 
//           gender: 'Male', 
//           phone: '+91 98765 43212', 
//           lastVisit: '2023-10-05',
//           status: 'Active'
//         },
//         { 
//           id: 'PAT-004', 
//           name: 'Priya Singh', 
//           age: 35, 
//           gender: 'Female', 
//           phone: '+91 98765 43213', 
//           lastVisit: '2023-09-28',
//           status: 'Inactive'
//         }
//       ])
//       setLoading(false)
//     }, 1000)
//   }

//   const filteredPatients = patients.filter(patient =>
//     patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     patient.phone.includes(searchTerm)
//   )

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="animate-fade-in">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold text-gray-700">📋 Patient Records</h2>
//         <div className="flex gap-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search patients..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 border rounded-lg w-64"
//             />
//             <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
//           </div>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
//             <i className="fas fa-download mr-2"></i> Export
//           </button>
//         </div>
//       </div>

//       <DataTable
//         columns={[
//           { key: 'id', title: 'Patient ID', sortable: true },
//           { key: 'name', title: 'Name', sortable: true },
//           { key: 'age', title: 'Age', sortable: true },
//           { key: 'gender', title: 'Gender', sortable: true },
//           { key: 'phone', title: 'Phone', sortable: true },
//           { key: 'lastVisit', title: 'Last Visit', sortable: true },
//           { 
//             key: 'status', 
//             title: 'Status', 
//             sortable: true,
//             render: (value) => (
//               <span className={`px-2 py-1 rounded-full text-xs ${
//                 value === 'Active' ? 'status-confirmed' : 'status-pending'
//               }`}>
//                 {value}
//               </span>
//             )
//           },
//           {
//             key: 'actions',
//             title: 'Actions',
//             render: (_, row) => (
//               <div className="flex gap-2">
//                 <button className="text-blue-600 hover:text-blue-800" title="View">
//                   <i className="fas fa-eye"></i>
//                 </button>
//                 <button className="text-green-600 hover:text-green-800" title="Edit">
//                   <i className="fas fa-edit"></i>
//                 </button>
//                 <button className="text-purple-600 hover:text-purple-800" title="History">
//                   <i className="fas fa-history"></i>
//                 </button>
//               </div>
//             )
//           }
//         ]}
//         data={filteredPatients}
//       />

//       {/* Patient Statistics */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
//         <div className="bg-white p-4 rounded-lg card-shadow border text-center">
//           <div className="text-2xl font-bold text-blue-600">{patients.length}</div>
//           <div className="text-sm text-gray-500">Total Patients</div>
//         </div>
//         <div className="bg-white p-4 rounded-lg card-shadow border text-center">
//           <div className="text-2xl font-bold text-green-600">{patients.filter(p => p.status === 'Active').length}</div>
//           <div className="text-sm text-gray-500">Active Patients</div>
//         </div>
//         <div className="bg-white p-4 rounded-lg card-shadow border text-center">
//           <div className="text-2xl font-bold text-purple-600">{patients.filter(p => new Date(p.lastVisit) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}</div>
//           <div className="text-sm text-gray-500">Visited Last 30 Days</div>
//         </div>
//         <div className="bg-white p-4 rounded-lg card-shadow border text-center">
//           <div className="text-2xl font-bold text-orange-600">{patients.filter(p => p.gender === 'Female').length}</div>
//           <div className="text-sm text-gray-500">Female Patients</div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PatientRecords



























// import React, { useState, useEffect } from 'react'
// import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
// import DataTable from '../../../../components/ui/Tables/DataTable'
// import MedicalHistoryModal from '../../../../components/MedicalHistoryModal'
// import DocumentUploader from '../../../../components/DocumentUploader'
// import ScannerIntegration from '../../../../components/ScannerIntegration'

// const PatientRecords = () => {
//   const [loading, setLoading] = useState(true)
//   const [patients, setPatients] = useState([])
//   const [searchTerm, setSearchTerm] = useState('')
//   const [selectedPatient, setSelectedPatient] = useState(null)
//   const [modalOpen, setModalOpen] = useState(false)
//   const [uploadModalOpen, setUploadModalOpen] = useState(false)
//   const [scannerModalOpen, setScannerModalOpen] = useState(false)
//   const [medicalHistory, setMedicalHistory] = useState({})

//   useEffect(() => {
//     loadPatients()
//     loadMedicalHistory()
//   }, [])

//   const loadPatients = async () => {
//     setLoading(true)
//     setTimeout(() => {
//       const patientsData = [
//         { 
//           id: 'PAT-001', 
//           name: 'Ravi Kumar', 
//           age: 32, 
//           gender: 'Male', 
//           phone: '+91 98765 43210', 
//           lastVisit: '2023-10-15',
//           status: 'Active',
//           isNewPatient: false,
//           medicalHistoryCount: 5
//         },
//         { 
//           id: 'PAT-002', 
//           name: 'Anita Sharma', 
//           age: 28, 
//           gender: 'Female', 
//           phone: '+91 98765 43211', 
//           lastVisit: '2023-10-10',
//           status: 'Active',
//           isNewPatient: true,
//           medicalHistoryCount: 0
//         },
//         { 
//           id: 'PAT-003', 
//           name: 'Suresh Patel', 
//           age: 45, 
//           gender: 'Male', 
//           phone: '+91 98765 43212', 
//           lastVisit: '2023-10-05',
//           status: 'Active',
//           isNewPatient: false,
//           medicalHistoryCount: 8
//         },
//         { 
//           id: 'PAT-004', 
//           name: 'Priya Singh', 
//           age: 35, 
//           gender: 'Female', 
//           phone: '+91 98765 43213', 
//           lastVisit: '2023-09-28',
//           status: 'Inactive',
//           isNewPatient: false,
//           medicalHistoryCount: 3
//         }
//       ]
//       setPatients(patientsData)
//       setLoading(false)
//     }, 1000)
//   }

//   const loadMedicalHistory = async () => {
//     // Simulating API call to load medical history
//     setTimeout(() => {
//       const historyData = {
//         'PAT-001': [
//           { id: 1, date: '2023-10-15', type: 'Consultation', doctor: 'Dr. Sharma', notes: 'Follow-up for hypertension', documents: ['prescription.pdf'] },
//           { id: 2, date: '2023-09-20', type: 'Lab Test', doctor: 'Lab Technician', notes: 'Blood work results normal', documents: ['blood_report.pdf'] },
//           { id: 3, date: '2023-08-10', type: 'X-Ray', doctor: 'Dr. Verma', notes: 'Chest X-ray clear', documents: ['xray_report.pdf'] }
//         ],
//         'PAT-003': [
//           { id: 1, date: '2023-10-05', type: 'Consultation', doctor: 'Dr. Gupta', notes: 'Diabetes management', documents: [] },
//           { id: 2, date: '2023-09-15', type: 'Surgery', doctor: 'Dr. Kapoor', notes: 'Appendectomy', documents: ['surgery_report.pdf'] }
//         ],
//         'PAT-004': [
//           { id: 1, date: '2023-09-28', type: 'Consultation', doctor: 'Dr. Singh', notes: 'General checkup', documents: [] }
//         ]
//       }
//       setMedicalHistory(historyData)
//     }, 500)
//   }

//   const handleManageHistory = (patient) => {
//     setSelectedPatient(patient)

//     if (patient.isNewPatient) {
//       // For new patients, show options to add history
//       setUploadModalOpen(true)
//     } else {
//       // For existing patients, show their complete history
//       setModalOpen(true)
//     }
//   }

//   const handleAddMedicalRecord = (recordData) => {
//     if (!selectedPatient) return

//     const updatedHistory = { ...medicalHistory }
//     if (!updatedHistory[selectedPatient.id]) {
//       updatedHistory[selectedPatient.id] = []
//     }

//     updatedHistory[selectedPatient.id].unshift({
//       id: Date.now(),
//       ...recordData,
//       date: new Date().toISOString().split('T')[0]
//     })

//     setMedicalHistory(updatedHistory)

//     // Update patient's history count
//     setPatients(prev => prev.map(p => 
//       p.id === selectedPatient.id 
//         ? { ...p, medicalHistoryCount: (p.medicalHistoryCount || 0) + 1, isNewPatient: false }
//         : p
//     ))

//     setModalOpen(false)
//     setUploadModalOpen(false)
//   }

//   const handleUploadDocuments = (files) => {
//     if (!selectedPatient) return

//     const uploadedRecords = files.map(file => ({
//       id: Date.now() + Math.random(),
//       date: new Date().toISOString().split('T')[0],
//       type: 'Document Upload',
//       doctor: 'System',
//       notes: `Uploaded document: ${file.name}`,
//       documents: [file.name],
//       fileType: file.type
//     }))

//     handleAddMedicalRecord(uploadedRecords[0])
//   }

//   const handleScanDocument = (scannedData) => {
//     if (!selectedPatient) return

//     const scannedRecord = {
//       id: Date.now(),
//       date: new Date().toISOString().split('T')[0],
//       type: 'Scanned Document',
//       doctor: 'System',
//       notes: `Scanned document: ${scannedData.documentType}`,
//       documents: [`scanned_${Date.now()}.pdf`],
//       scannedData: scannedData
//     }

//     handleAddMedicalRecord(scannedRecord)
//     setScannerModalOpen(false)
//   }

//   const filteredPatients = patients.filter(patient =>
//     patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     patient.phone.includes(searchTerm)
//   )

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="animate-fade-in">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold text-gray-700">📋 Patient Records</h2>
//         <div className="flex gap-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search patients..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 border rounded-lg w-64"
//             />
//             <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
//           </div>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
//             <i className="fas fa-download mr-2"></i> Export
//           </button>
//         </div>
//       </div>

//       <DataTable
//         columns={[
//           { key: 'id', title: 'Patient ID', sortable: true },
//           { key: 'name', title: 'Name', sortable: true },
//           { key: 'age', title: 'Age', sortable: true },
//           { key: 'gender', title: 'Gender', sortable: true },
//           { key: 'phone', title: 'Phone', sortable: true },
//           { key: 'lastVisit', title: 'Last Visit', sortable: true },
//           { 
//             key: 'medicalHistoryCount', 
//             title: 'Medical Records', 
//             sortable: true,
//             render: (value) => (
//               <span className={`px-2 py-1 rounded-full text-xs ${
//                 value > 0 ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
//               }`}>
//                 {value} records
//               </span>
//             )
//           },
//           { 
//             key: 'status', 
//             title: 'Status', 
//             sortable: true,
//             render: (value) => (
//               <span className={`px-2 py-1 rounded-full text-xs ${
//                 value === 'Active' ? 'status-confirmed' : 'status-pending'
//               }`}>
//                 {value}
//               </span>
//             )
//           },
//           {
//             key: 'actions',
//             title: 'Actions',
//             render: (_, row) => (
//               <div className="flex gap-2">
//                 <button 
//                   className="text-blue-600 hover:text-blue-800" 
//                   title="View"
//                   onClick={() => handleManageHistory(row)}
//                 >
//                   <i className="fas fa-eye"></i>
//                 </button>
//                 <button 
//                   className="text-green-600 hover:text-green-800" 
//                   title="Medical History"
//                   onClick={() => handleManageHistory(row)}
//                 >
//                   <i className="fas fa-file-medical"></i>
//                 </button>
//                 <button className="text-purple-600 hover:text-purple-800" title="Edit">
//                   <i className="fas fa-edit"></i>
//                 </button>
//               </div>
//             )
//           }
//         ]}
//         data={filteredPatients}
//       />

//       {/* Patient Statistics */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
//         <div className="bg-white p-4 rounded-lg card-shadow border text-center">
//           <div className="text-2xl font-bold text-blue-600">{patients.length}</div>
//           <div className="text-sm text-gray-500">Total Patients</div>
//         </div>
//         <div className="bg-white p-4 rounded-lg card-shadow border text-center">
//           <div className="text-2xl font-bold text-green-600">
//             {patients.filter(p => p.isNewPatient === false && p.medicalHistoryCount > 0).length}
//           </div>
//           <div className="text-sm text-gray-500">Patients with History</div>
//         </div>
//         <div className="bg-white p-4 rounded-lg card-shadow border text-center">
//           <div className="text-2xl font-bold text-yellow-600">
//             {patients.filter(p => p.isNewPatient === true || p.medicalHistoryCount === 0).length}
//           </div>
//           <div className="text-sm text-gray-500">New/No History</div>
//         </div>
//         <div className="bg-white p-4 rounded-lg card-shadow border text-center">
//           <div className="text-2xl font-bold text-purple-600">
//             {patients.reduce((acc, p) => acc + (p.medicalHistoryCount || 0), 0)}
//           </div>
//           <div className="text-sm text-gray-500">Total Records</div>
//         </div>
//       </div>

//       {/* Medical History Modal for Existing Patients */}
//       {modalOpen && selectedPatient && (
//         <MedicalHistoryModal
//           patient={selectedPatient}
//           medicalHistory={medicalHistory[selectedPatient.id] || []}
//           onClose={() => {
//             setModalOpen(false)
//             setSelectedPatient(null)
//           }}
//           onAddNew={() => {
//             setModalOpen(false)
//             setUploadModalOpen(true)
//           }}
//           isOpen={modalOpen}
//         />
//       )}

//       {/* Document Upload Modal for New Patients */}
//       {uploadModalOpen && selectedPatient && (
//         <DocumentUploader
//           patient={selectedPatient}
//           onClose={() => {
//             setUploadModalOpen(false)
//             setSelectedPatient(null)
//           }}
//           onUpload={handleUploadDocuments}
//           onOpenScanner={() => {
//             setUploadModalOpen(false)
//             setScannerModalOpen(true)
//           }}
//           isOpen={uploadModalOpen}
//         />
//       )}

//       {/* Scanner Integration Modal */}
//       {scannerModalOpen && selectedPatient && (
//         <ScannerIntegration
//           patient={selectedPatient}
//           onClose={() => {
//             setScannerModalOpen(false)
//             setSelectedPatient(null)
//           }}
//           onScanComplete={handleScanDocument}
//           isOpen={scannerModalOpen}
//         />
//       )}
//     </div>
//   )
// }

// export default PatientRecords


















import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'
import MedicalHistoryModal from '../../../../components/MedicalHistoryModal'
import DocumentUploader from '../../../../components/DocumentUploader'
import ScannerIntegration from '../../../../components/ScannerIntegration'

const PatientRecords = () => {
  const [loading, setLoading] = useState(true)
  const [patients, setPatients] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [scannerModalOpen, setScannerModalOpen] = useState(false)
  const [medicalHistory, setMedicalHistory] = useState({})
  const [editingPatient, setEditingPatient] = useState(null)
  const [isExporting, setIsExporting] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  useEffect(() => {
    loadPatients()
    loadMedicalHistory()
  }, [])

  const loadPatients = async () => {
    setLoading(true)
    setTimeout(() => {
      const patientsData = [
        {
          id: 'PAT-001',
          name: 'Ravi Kumar',
          age: 32,
          gender: 'Male',
          phone: '+91 98765 43210',
          lastVisit: '2023-10-15',
          status: 'Active',
          isNewPatient: false,
          medicalHistoryCount: 5,
          email: 'ravi.kumar@example.com',
          address: '123 MG Road, Bangalore',
          bloodGroup: 'O+',
          allergies: 'Penicillin, Peanuts',
          chronicConditions: 'Hypertension'
        },
        {
          id: 'PAT-002',
          name: 'Anita Sharma',
          age: 28,
          gender: 'Female',
          phone: '+91 98765 43211',
          lastVisit: '2023-10-10',
          status: 'Active',
          isNewPatient: true,
          medicalHistoryCount: 0,
          email: 'anita.sharma@example.com',
          address: '456 Park Street, Delhi',
          bloodGroup: 'A+',
          allergies: 'None',
          chronicConditions: 'None'
        },
        {
          id: 'PAT-003',
          name: 'Suresh Patel',
          age: 45,
          gender: 'Male',
          phone: '+91 98765 43212',
          lastVisit: '2023-10-05',
          status: 'Active',
          isNewPatient: false,
          medicalHistoryCount: 8,
          email: 'suresh.patel@example.com',
          address: '789 Marine Drive, Mumbai',
          bloodGroup: 'B+',
          allergies: 'Sulfa drugs',
          chronicConditions: 'Diabetes Type 2'
        },
        {
          id: 'PAT-004',
          name: 'Priya Singh',
          age: 35,
          gender: 'Female',
          phone: '+91 98765 43213',
          lastVisit: '2023-09-28',
          status: 'Inactive',
          isNewPatient: false,
          medicalHistoryCount: 3,
          email: 'priya.singh@example.com',
          address: '101 Gandhi Nagar, Chennai',
          bloodGroup: 'AB+',
          allergies: 'Latex',
          chronicConditions: 'Asthma'
        }
      ]
      setPatients(patientsData)
      setLoading(false)
    }, 1000)
  }

  const loadMedicalHistory = async () => {
    setTimeout(() => {
      const historyData = {
        'PAT-001': [
          { id: 1, date: '2023-10-15', type: 'Consultation', doctor: 'Dr. Sharma', notes: 'Follow-up for hypertension. BP: 130/85 mmHg. Prescribed medication.', documents: ['prescription.pdf'], status: 'Completed', attachments: 2 },
          { id: 2, date: '2023-09-20', type: 'Lab Test', doctor: 'Dr. Verma', notes: 'Blood work results normal. Cholesterol levels within range.', documents: ['blood_report.pdf', 'lipid_profile.pdf'], status: 'Completed', attachments: 2 },
          { id: 3, date: '2023-08-10', type: 'X-Ray', doctor: 'Dr. Gupta', notes: 'Chest X-ray clear. No abnormalities detected.', documents: ['xray_report.pdf'], status: 'Completed', attachments: 1 }
        ],
        'PAT-002': [],
        'PAT-003': [
          { id: 1, date: '2023-10-05', type: 'Consultation', doctor: 'Dr. Kapoor', notes: 'Diabetes management review. Blood sugar: 110 mg/dL.', documents: [], status: 'Completed', attachments: 0 },
          { id: 2, date: '2023-09-15', type: 'Surgery', doctor: 'Dr. Reddy', notes: 'Appendectomy performed successfully. Recovery good.', documents: ['surgery_report.pdf', 'consent_form.pdf'], status: 'Completed', attachments: 2 }
        ],
        'PAT-004': [
          { id: 1, date: '2023-09-28', type: 'Consultation', doctor: 'Dr. Singh', notes: 'General checkup. Asthma under control. Advised regular exercise.', documents: [], status: 'Completed', attachments: 0 }
        ]
      }
      setMedicalHistory(historyData)
    }, 500)
  }

  const handleManageHistory = (patient) => {
    setSelectedPatient(patient)

    if (patient.isNewPatient || patient.medicalHistoryCount === 0) {
      setUploadModalOpen(true)
    } else {
      setModalOpen(true)
    }
  }

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient)
    alert(`👤 Patient Details:\n\nName: ${patient.name}\nID: ${patient.id}\nAge: ${patient.age}\nGender: ${patient.gender}\nPhone: ${patient.phone}\nEmail: ${patient.email}\nAddress: ${patient.address}\nBlood Group: ${patient.bloodGroup}\nAllergies: ${patient.allergies}\nChronic Conditions: ${patient.chronicConditions}`)
  }

  const handleEditPatient = (patient) => {
    setEditingPatient(patient)
    setEditModalOpen(true)
  }

  const handleSavePatientEdit = (updatedPatient) => {
    setPatients(prev => prev.map(p =>
      p.id === updatedPatient.id ? { ...p, ...updatedPatient } : p
    ))
    setEditModalOpen(false)
    setEditingPatient(null)
    alert(`Patient ${updatedPatient.name} updated successfully!`)
  }

  const handleExportData = () => {
    setIsExporting(true)

    setTimeout(() => {
      const csvContent = [
        ['Patient ID', 'Name', 'Age', 'Gender', 'Phone', 'Last Visit', 'Status', 'Medical Records Count'],
        ...patients.map(p => [p.id, p.name, p.age, p.gender, p.phone, p.lastVisit, p.status, p.medicalHistoryCount])
      ].map(row => row.join(',')).join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `patient_records_${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setIsExporting(false)
      alert('✅ Patient data exported successfully! Check your downloads folder.')
    }, 1500)
  }

  const handleAddMedicalRecord = (recordData) => {
    if (!selectedPatient) return

    const updatedHistory = { ...medicalHistory }
    if (!updatedHistory[selectedPatient.id]) {
      updatedHistory[selectedPatient.id] = []
    }

    const recordsToAdd = Array.isArray(recordData) ? recordData : [recordData]

    recordsToAdd.forEach(record => {
      const newRecord = {
        id: Date.now() + Math.random(),
        ...record,
        date: new Date().toISOString().split('T')[0],
        status: 'Completed',
        attachments: record.documents?.length || 0
      }
      updatedHistory[selectedPatient.id].unshift(newRecord)
    })

    setMedicalHistory(updatedHistory)

    setPatients(prev => prev.map(p =>
      p.id === selectedPatient.id
        ? {
          ...p,
          medicalHistoryCount: (p.medicalHistoryCount || 0) + recordsToAdd.length,
          isNewPatient: false,
          lastVisit: new Date().toISOString().split('T')[0]
        }
        : p
    ))

    setModalOpen(false)
    setUploadModalOpen(false)
    setScannerModalOpen(false)

    alert(`✅ Successfully added ${recordsToAdd.length} record(s) to ${selectedPatient.name}'s medical history`)
  }

  const handleUploadDocuments = (files, documentType, notes) => {
    if (!selectedPatient) return

    const uploadedRecords = files.map(file => ({
      id: Date.now() + Math.random(),
      date: new Date().toISOString().split('T')[0],
      type: documentType || 'Document Upload',
      doctor: 'Dr. System',
      notes: notes || `Uploaded document: ${file.name}`,
      documents: [file.name],
      fileType: file.type,
      status: 'Completed',
      attachments: 1
    }))

    handleAddMedicalRecord(uploadedRecords)
  }

  const handleScanDocument = (scannedData) => {
    if (!selectedPatient) return

    const scannedRecord = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      type: scannedData.documentType || 'Scanned Document',
      doctor: 'Dr. System',
      notes: scannedData.notes || `Scanned ${scannedData.documentType || 'document'}`,
      documents: [`scanned_${Date.now()}.pdf`],
      scannedData: scannedData,
      status: 'Completed',
      attachments: 1
    }

    handleAddMedicalRecord(scannedRecord)
    setScannerModalOpen(false)
  }

  const handleUpdateMedicalRecord = (patientId, recordId, updatedData) => {
    const updatedHistory = { ...medicalHistory }
    if (updatedHistory[patientId]) {
      updatedHistory[patientId] = updatedHistory[patientId].map(record =>
        record.id === recordId ? { ...record, ...updatedData } : record
      )
      setMedicalHistory(updatedHistory)
      alert('Medical record updated successfully!')
    }
  }

  const handleDeleteMedicalRecord = (patientId, recordId) => {
    if (window.confirm('Are you sure you want to delete this medical record? This action cannot be undone.')) {
      const updatedHistory = { ...medicalHistory }
      if (updatedHistory[patientId]) {
        updatedHistory[patientId] = updatedHistory[patientId].filter(record => record.id !== recordId)
        setMedicalHistory(updatedHistory)

        setPatients(prev => prev.map(p =>
          p.id === patientId
            ? { ...p, medicalHistoryCount: Math.max(0, (p.medicalHistoryCount || 0) - 1) }
            : p
        ))

        alert('Medical record deleted successfully')
      }
    }
  }

  const handleDownloadDocument = (documentName) => {
    alert(`📥 Downloading document: ${documentName}\n\nIn a real application, this would download the file from storage.`)
  }

  const handleViewDocument = (documentName) => {
    alert(`👁️ Viewing document: ${documentName}\n\nIn a real application, this would open a PDF/document viewer.`)
  }

  const handlePrintSummary = (patient) => {
    const history = medicalHistory[patient.id] || []
    const summary = `=== PATIENT MEDICAL SUMMARY ===\n
    Patient: ${patient.name} (${patient.id})
    Age: ${patient.age} | Gender: ${patient.gender}
    Last Visit: ${patient.lastVisit}\n
    TOTAL RECORDS: ${history.length}\n
    RECORD HISTORY:
    ${history.map(r => `• ${r.date} - ${r.type} by Dr. ${r.doctor}: ${r.notes}`).join('\n')}\n
    Generated: ${new Date().toLocaleString()}`

    alert(`🖨️ Printing medical summary for: ${patient.name}\n\n${summary}\n\nIn a real application, this would open print dialog with formatted PDF.`)
  }

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800"> Patient Records</h2>
          <p className="text-gray-600 mt-1">Manage patient information and medical history</p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, ID, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg w-full md:w-80 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <i className="fas fa-search absolute left-3.5 top-3.5 text-gray-400"></i>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            onClick={handleExportData}
            disabled={isExporting}
          >
            <i className={`fas ${isExporting ? 'fa-spinner fa-spin' : 'fa-download'}`}></i>
            <span>{isExporting ? 'Exporting...' : 'Export Data'}</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <DataTable
          columns={[
            { key: 'id', title: 'Patient ID', sortable: true, width: '120px' },
            { key: 'name', title: 'Name', sortable: true },
            { key: 'age', title: 'Age', sortable: true, width: '80px' },
            { key: 'gender', title: 'Gender', sortable: true, width: '100px' },
            { key: 'phone', title: 'Phone', sortable: true },
            { key: 'lastVisit', title: 'Last Visit', sortable: true, width: '120px' },
            {
              key: 'medicalHistoryCount',
              title: 'Medical Records',
              sortable: true,
              width: '140px',
              render: (value, row) => (
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${value > 0 ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                    }`}>
                    {value} records
                  </span>
                  {row.isNewPatient && value === 0 && (
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </div>
              )
            },
            {
              key: 'status',
              title: 'Status',
              sortable: true,
              width: '100px',
              render: (value) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${value === 'Active' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-gray-100 text-gray-800 border border-gray-200'
                  }`}>
                  {value}
                </span>
              )
            },
            {
              key: 'actions',
              title: 'Actions',
              width: '180px',
              render: (_, row) => (
                <div className="flex gap-1">
                  <button
                    className="text-green-600 hover:text-green-800 pl-1 pr-2 hover:bg-green-50 rounded-lg transition-colors"
                    title="Medical History"
                    onClick={() => handleManageHistory(row)}
                  >
                    <i className="fas fa-file-medical"></i>
                  </button>
                  <button
                    className="text-purple-600 hover:text-purple-800 p-2 hover:bg-purple-50 rounded-lg transition-colors"
                    title="Edit Patient"
                    onClick={() => handleEditPatient(row)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </div>
              )
            }
          ]}
          data={filteredPatients}
          emptyMessage="No patients found matching your search criteria"
        />
      </div>

      {/* Patient Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

        {/* Total Patients */}
        <div className="relative bg-gradient-to-br from-white to-blue-50 p-5 rounded-2xl 
                  border border-blue-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>

          <div className="text-3xl font-bold text-blue-600">
            {patients.length}
          </div>
          <div className="text-sm font-medium text-gray-700 mt-1">
            Total Patients
          </div>
          <div className="text-xs text-blue-500 mt-1">
            Active: {patients.filter(p => p.status === 'Active').length}
          </div>
        </div>

        {/* With History */}
        <div className="relative bg-gradient-to-br from-white to-green-50 p-5 rounded-2xl 
                  border border-green-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>

          <div className="text-3xl font-bold text-green-600">
            {patients.filter(p => p.isNewPatient === false && p.medicalHistoryCount > 0).length}
          </div>
          <div className="text-sm font-medium text-gray-700 mt-1">
            With History
          </div>
          <div className="text-xs text-green-500 mt-1">
            Established records
          </div>
        </div>

        {/* New / No History */}
        <div className="relative bg-gradient-to-br from-white to-yellow-50 p-5 rounded-2xl 
                  border border-yellow-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500"></div>

          <div className="text-3xl font-bold text-yellow-600">
            {patients.filter(p => p.isNewPatient === true || p.medicalHistoryCount === 0).length}
          </div>
          <div className="text-sm font-medium text-gray-700 mt-1">
            New / No History
          </div>
          <div className="text-xs text-yellow-600 mt-1">
            Requires initial assessment
          </div>
        </div>

        {/* Total Records */}
        <div className="relative bg-gradient-to-br from-white to-purple-50 p-5 rounded-2xl 
                  border border-purple-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>

          <div className="text-3xl font-bold text-purple-600">
            {patients.reduce((acc, p) => acc + (p.medicalHistoryCount || 0), 0)}
          </div>
          <div className="text-sm font-medium text-gray-700 mt-1">
            Total Records
          </div>
          <div className="text-xs text-purple-500 mt-1">
            All medical documents
          </div>
        </div>

      </div>


      {/* Medical History Modal for Existing Patients */}
      {modalOpen && selectedPatient && (
        <MedicalHistoryModal
          patient={selectedPatient}
          medicalHistory={medicalHistory[selectedPatient.id] || []}
          onClose={() => {
            setModalOpen(false)
            setSelectedPatient(null)
          }}
          onAddNew={() => {
            setModalOpen(false)
            setUploadModalOpen(true)
          }}
          onUpdateRecord={(recordId, updatedData) =>
            handleUpdateMedicalRecord(selectedPatient.id, recordId, updatedData)
          }
          onDeleteRecord={(recordId) =>
            handleDeleteMedicalRecord(selectedPatient.id, recordId)
          }
          onViewDocument={handleViewDocument}
          onDownloadDocument={handleDownloadDocument}
          onPrintSummary={() => handlePrintSummary(selectedPatient)}
          isOpen={modalOpen}
        />
      )}

      {/* Document Upload Modal */}
      {uploadModalOpen && selectedPatient && (
        <DocumentUploader
          patient={selectedPatient}
          onClose={() => {
            setUploadModalOpen(false)
            setSelectedPatient(null)
          }}
          onUpload={handleUploadDocuments}
          onOpenScanner={() => {
            setUploadModalOpen(false)
            setScannerModalOpen(true)
          }}
          isOpen={uploadModalOpen}
        />
      )}

      {/* Scanner Integration Modal */}
      {scannerModalOpen && selectedPatient && (
        <ScannerIntegration
          patient={selectedPatient}
          onClose={() => {
            setScannerModalOpen(false)
            setSelectedPatient(null)
          }}
          onScanComplete={handleScanDocument}
          isOpen={scannerModalOpen}
        />
      )}

      {/* Edit Patient Modal */}
      {editModalOpen && editingPatient && (
        <EditPatientModal
          patient={editingPatient}
          onClose={() => {
            setEditModalOpen(false)
            setEditingPatient(null)
          }}
          onSave={handleSavePatientEdit}
          isOpen={editModalOpen}
        />
      )}
    </div>
  )
}

// Edit Patient Modal Component
const EditPatientModal = ({ patient, onClose, onSave, isOpen }) => {
  const [formData, setFormData] = useState({ ...patient })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Edit Patient Information</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient ID</label>
                <input
                  type="text"
                  value={formData.id}
                  disabled
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="0"
                  max="120"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="Separate by commas"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chronic Conditions</label>
                <input
                  type="text"
                  name="chronicConditions"
                  value={formData.chronicConditions}
                  onChange={handleChange}
                  placeholder="Separate by commas"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PatientRecords