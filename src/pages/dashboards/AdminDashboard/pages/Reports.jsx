// import React, { useState, useEffect } from 'react'
// import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
// import DataTable from '../../../../components/ui/Tables/DataTable'
// import Modal from '../../../../components/common/Modal/Modal'

// const Reports = () => {
//   const [loading, setLoading] = useState(true)
//   const [reports, setReports] = useState([])
//   const [modalState, setModalState] = useState({ generate: false, view: false, delete: false })
//   const [currentReport, setCurrentReport] = useState(null)
//   const [selectedReportType, setSelectedReportType] = useState('')
//   const [dateRange, setDateRange] = useState({ start: '', end: '' })

//   const REPORT_TYPES = [
//     { id: 'revenue', name: 'Department-wise Revenue', icon: 'money-bill-wave', color: 'green', description: 'Monthly revenue breakdown by department' },
//     { id: 'appointments', name: 'Doctor-wise Appointments', icon: 'user-md', color: 'blue', description: 'Appointment statistics by doctor' },
//     { id: 'bed-occupancy', name: 'Bed Occupancy Reports', icon: 'bed', color: 'purple', description: 'Daily bed occupancy and utilization' },
//     { id: 'pharmacy', name: 'Pharmacy Sales Report', icon: 'pills', color: 'gray', description: 'Medicine sales and inventory analysis' },
//     { id: 'lab-tests', name: 'Lab Test Reports', icon: 'flask', color: 'indigo', description: 'Laboratory test statistics and trends' },
//     { id: 'financial', name: 'Financial Summary', icon: 'file-invoice', color: 'red', description: 'Comprehensive financial overview' }
//   ]

//   useEffect(() => { loadReports() }, [])

//   const loadReports = async () => {
//     setLoading(true)
//     setTimeout(() => {
//       setReports([
//         { id: 'REP-001', type: 'Department Revenue', period: 'Monthly', generated: '2024-01-15', size: '2.4 MB', format: 'PDF', status: 'Completed' },
//         { id: 'REP-002', type: 'Doctor Appointments', period: 'Weekly', generated: '2024-01-14', size: '1.2 MB', format: 'Excel', status: 'Completed' },
//         { id: 'REP-003', type: 'Bed Occupancy', period: 'Daily', generated: '2024-01-15', size: '0.8 MB', format: 'PDF', status: 'Completed' },
//         { id: 'REP-004', type: 'Pharmacy Sales', period: 'Monthly', generated: '2024-01-10', size: '3.1 MB', format: 'Excel', status: 'Completed' },
//         { id: 'REP-005', type: 'Lab Test Statistics', period: 'Monthly', generated: '2024-01-12', size: '1.7 MB', format: 'PDF', status: 'Completed' }
//       ])
//       setLoading(false)
//     }, 1000)
//   }

//   // Modal handlers
//   const openModal = (type, report = null) => {
//     setModalState(prev => ({ ...prev, [type]: true }))
//     if (type === 'generate' && report) {
//       setSelectedReportType(report.id)
//     } else if ((type === 'view' || type === 'delete') && report) {
//       setCurrentReport(report)
//     }
//   }

//   const closeModal = (type) => {
//     setModalState(prev => ({ ...prev, [type]: false }))
//     if (type === 'generate') {
//       setSelectedReportType('')
//       setDateRange({ start: '', end: '' })
//     } else {
//       setCurrentReport(null)
//     }
//   }

//   // Core functions
//   const handleGenerateReport = () => {
//     if (!selectedReportType || !dateRange.start || !dateRange.end) {
//       alert('Please select report type and date range')
//       return
//     }

//     const reportType = REPORT_TYPES.find(r => r.id === selectedReportType)
//     const newReport = {
//       id: `REP-${String(reports.length + 1).padStart(3, '0')}`,
//       type: reportType.name,
//       period: `${dateRange.start} to ${dateRange.end}`,
//       generated: new Date().toISOString().split('T')[0],
//       size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
//       format: Math.random() > 0.5 ? 'PDF' : 'Excel',
//       status: 'Completed'
//     }

//     setReports(prev => [newReport, ...prev])
//     closeModal('generate')
//     alert(`Report generated successfully! Download will start shortly.`)
//   }

//   const handleDownloadReport = (report) => {
//     alert(`Downloading ${report.type} report...`)
//     // Simulate download
//     console.log(`Downloading report: ${report.id}`)
//   }

//   const handleViewReport = (report) => {
//     alert(`Opening ${report.type} report in preview mode...`)
//     // Simulate view action
//     console.log(`Viewing report: ${report.id}`)
//   }

//   const handleDeleteReport = () => {
//     setReports(prev => prev.filter(r => r.id !== currentReport.id))
//     closeModal('delete')
//   }

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="animate-fade-in">
//       <h2 className="text-2xl font-semibold text-gray-700 mb-6">
//         📈 Reports
//       </h2>

//       {/* Report Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//         {REPORT_TYPES.map(report => (
//           <ReportCard 
//             key={report.id}
//             report={report}
//             onGenerate={() => openModal('generate', report)}
//           />
//         ))}
//       </div>

//       {/* Generated Reports */}
//       <div className="bg-white rounded-xl card-shadow border p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="font-semibold text-lg">Recently Generated Reports</h3>
//           <span className="text-sm text-gray-500">{reports.length} reports</span>
//         </div>
//         <DataTable
//           columns={[
//             { key: 'id', title: 'Report ID', sortable: true },
//             { key: 'type', title: 'Report Type', sortable: true },
//             { key: 'period', title: 'Period', sortable: true },
//             { key: 'generated', title: 'Generated On', sortable: true },
//             { key: 'size', title: 'Size', sortable: true },
//             { 
//               key: 'format', 
//               title: 'Format', 
//               sortable: true,
//               render: (value) => (
//                 <span className={`px-2 py-1 rounded text-xs ${
//                   value === 'PDF' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
//                 }`}>
//                   {value}
//                 </span>
//               )
//             },
//             {
//               key: 'actions',
//               title: 'Actions',
//               render: (_, row) => (
//                 <div className="flex gap-1">
//                   <ActionButton icon="eye" color="blue" onClick={() => handleViewReport(row)} title="View Report" />
//                   <ActionButton icon="download" color="green" onClick={() => handleDownloadReport(row)} title="Download Report" />
//                   <ActionButton icon="trash" color="red" onClick={() => openModal('delete', row)} title="Delete Report" />
//                 </div>
//               )
//             }
//           ]}
//           data={reports}
//         />
//       </div>

//       {/* Modals */}
//       <GenerateReportModal
//         isOpen={modalState.generate}
//         onClose={() => closeModal('generate')}
//         onSubmit={handleGenerateReport}
//         selectedReportType={selectedReportType}
//         onReportTypeChange={setSelectedReportType}
//         dateRange={dateRange}
//         onDateRangeChange={setDateRange}
//         reportTypes={REPORT_TYPES}
//       />

//       <DeleteConfirmationModal
//         isOpen={modalState.delete}
//         onClose={() => closeModal('delete')}
//         onConfirm={handleDeleteReport}
//         name={currentReport?.type}
//         type="Report"
//       />
//     </div>
//   )
// }

// // Sub-components
// const ReportCard = ({ report, onGenerate }) => (
//   <div className="bg-white rounded-xl card-shadow border p-6 text-center hover:shadow-lg transition-shadow">
//     <i className={`fas fa-${report.icon} text-3xl text-${report.color}-500 mb-3`}></i>
//     <h3 className="font-semibold text-lg mb-2">{report.name}</h3>
//     <p className="text-gray-600 text-sm mb-4">{report.description}</p>
//     <button 
//       onClick={onGenerate}
//       className={`bg-${report.color}-600 text-white px-4 py-2 rounded-lg hover:bg-${report.color}-700 w-full transition-colors`}
//     >
//       Generate Report
//     </button>
//   </div>
// )

// const ActionButton = ({ icon, color, onClick, title }) => (
//   <button 
//     onClick={onClick}
//     className={`text-${color}-600 hover:text-${color}-800 p-1 rounded hover:bg-${color}-50 transition-colors`}
//     title={title}
//   >
//     <i className={`fas fa-${icon}`}></i>
//   </button>
// )

// const GenerateReportModal = ({ 
//   isOpen, 
//   onClose, 
//   onSubmit, 
//   selectedReportType, 
//   onReportTypeChange, 
//   dateRange, 
//   onDateRangeChange,
//   reportTypes 
// }) => {
//   const selectedReport = reportTypes.find(r => r.id === selectedReportType)

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title="Generate Report" size="md">
//       <div className="space-y-6">
//         {selectedReport && (
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//             <div className="flex items-center gap-3">
//               <i className={`fas fa-${selectedReport.icon} text-${selectedReport.color}-500 text-xl`}></i>
//               <div>
//                 <h4 className="font-semibold text-blue-800">{selectedReport.name}</h4>
//                 <p className="text-blue-600 text-sm">{selectedReport.description}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
//           <select
//             value={selectedReportType}
//             onChange={(e) => onReportTypeChange(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//           >
//             <option value="">Select Report Type</option>
//             {reportTypes.map(report => (
//               <option key={report.id} value={report.id}>{report.name}</option>
//             ))}
//           </select>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
//             <input
//               type="date"
//               required
//               value={dateRange.start}
//               onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
//             <input
//               type="date"
//               required
//               value={dateRange.end}
//               onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
//           <div className="flex gap-4">
//             <label className="flex items-center">
//               <input type="radio" name="format" value="PDF" defaultChecked className="mr-2" />
//               <span>PDF Document</span>
//             </label>
//             <label className="flex items-center">
//               <input type="radio" name="format" value="Excel" className="mr-2" />
//               <span>Excel Spreadsheet</span>
//             </label>
//           </div>
//         </div>

//         <div className="flex justify-end gap-3 pt-4 border-t">
//           <button
//             onClick={onClose}
//             className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onSubmit}
//             disabled={!selectedReportType || !dateRange.start || !dateRange.end}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             <i className="fas fa-chart-bar mr-2"></i>Generate Report
//           </button>
//         </div>
//       </div>
//     </Modal>
//   )
// }

// const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, name, type }) => (
//   <Modal isOpen={isOpen} onClose={onClose} title={`Delete ${type}`} size="md">
//     <div className="text-center p-6">
//       <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
//         <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
//       </div>
//       <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirm Deletion</h3>
//       <p className="text-gray-600 mb-6">
//         Are you sure you want to delete <span className="font-semibold">{name}</span>? 
//         This action cannot be undone.
//       </p>
//       <div className="flex justify-center gap-3">
//         <button onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
//           Cancel
//         </button>
//         <button onClick={onConfirm} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
//           <i className="fas fa-trash mr-2"></i>Delete {type}
//         </button>
//       </div>
//     </div>
//   </Modal>
// )

// export default Reports


























import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'
import Modal from '../../../../components/common/Modal/Modal'

const Reports = () => {
  const [loading, setLoading] = useState(true)
  const [reports, setReports] = useState([])
  const [modalState, setModalState] = useState({ generate: false, view: false, delete: false })
  const [currentReport, setCurrentReport] = useState(null)
  const [selectedReportType, setSelectedReportType] = useState('')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  const REPORT_TYPES = [
    { 
      id: 'revenue', 
      name: 'Revenue Analytics', 
      icon: 'chart-line', 
      color: 'emerald', 
      description: 'Monthly revenue breakdown by department',
      stats: '24 reports',
      trend: '+12%'
    },
    { 
      id: 'appointments', 
      name: 'Appointments', 
      icon: 'calendar-check', 
      color: 'blue', 
      description: 'Doctor-wise appointment statistics',
      stats: '156 reports',
      trend: '+8%'
    },
    { 
      id: 'bed-occupancy', 
      name: 'Bed Occupancy', 
      icon: 'bed', 
      color: 'purple', 
      description: 'Daily occupancy and utilization',
      stats: '89 reports',
      trend: '+5%'
    },
    { 
      id: 'pharmacy', 
      name: 'Pharmacy', 
      icon: 'pills', 
      color: 'orange', 
      description: 'Medicine sales & inventory',
      stats: '42 reports',
      trend: '+15%'
    },
    { 
      id: 'lab-tests', 
      name: 'Lab Tests', 
      icon: 'flask', 
      color: 'indigo', 
      description: 'Test statistics and trends',
      stats: '67 reports',
      trend: '+10%'
    },
    { 
      id: 'financial', 
      name: 'Financial', 
      icon: 'file-invoice-dollar', 
      color: 'rose', 
      description: 'Comprehensive financial overview',
      stats: '31 reports',
      trend: '+18%'
    }
  ]

  useEffect(() => { loadReports() }, [])

  const loadReports = async () => {
    setLoading(true)
    setTimeout(() => {
      setReports([
        { id: 'REP-001', type: 'Department Revenue', period: 'Monthly', generated: '2024-01-15', size: '2.4 MB', format: 'PDF', status: 'Completed' },
        { id: 'REP-002', type: 'Doctor Appointments', period: 'Weekly', generated: '2024-01-14', size: '1.2 MB', format: 'Excel', status: 'Completed' },
        { id: 'REP-003', type: 'Bed Occupancy', period: 'Daily', generated: '2024-01-15', size: '0.8 MB', format: 'PDF', status: 'Completed' },
        { id: 'REP-004', type: 'Pharmacy Sales', period: 'Monthly', generated: '2024-01-10', size: '3.1 MB', format: 'Excel', status: 'Completed' },
        { id: 'REP-005', type: 'Lab Test Statistics', period: 'Monthly', generated: '2024-01-12', size: '1.7 MB', format: 'PDF', status: 'Completed' }
      ])
      setLoading(false)
    }, 1000)
  }

  // Modal handlers
  const openModal = (type, report = null) => {
    setModalState(prev => ({ ...prev, [type]: true }))
    if (type === 'generate' && report) {
      setSelectedReportType(report.id)
    } else if ((type === 'view' || type === 'delete') && report) {
      setCurrentReport(report)
    }
  }

  const closeModal = (type) => {
    setModalState(prev => ({ ...prev, [type]: false }))
    if (type === 'generate') {
      setSelectedReportType('')
      setDateRange({ start: '', end: '' })
    } else {
      setCurrentReport(null)
    }
  }

  // Core functions
  const handleGenerateReport = () => {
    if (!selectedReportType || !dateRange.start || !dateRange.end) {
      alert('Please select report type and date range')
      return
    }

    const reportType = REPORT_TYPES.find(r => r.id === selectedReportType)
    const newReport = {
      id: `REP-${String(reports.length + 1).padStart(3, '0')}`,
      type: reportType.name,
      period: `${dateRange.start} to ${dateRange.end}`,
      generated: new Date().toISOString().split('T')[0],
      size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
      format: Math.random() > 0.5 ? 'PDF' : 'Excel',
      status: 'Completed'
    }

    setReports(prev => [newReport, ...prev])
    closeModal('generate')
    alert(`Report generated successfully! Download will start shortly.`)
  }

  const handleDownloadReport = (report) => {
    alert(`Downloading ${report.type} report...`)
    // Simulate download
    console.log(`Downloading report: ${report.id}`)
  }

  const handleViewReport = (report) => {
    alert(`Opening ${report.type} report in preview mode...`)
    // Simulate view action
    console.log(`Viewing report: ${report.id}`)
  }

  const handleDeleteReport = () => {
    setReports(prev => prev.filter(r => r.id !== currentReport.id))
    closeModal('delete')
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">📈 Reports</h2>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="flex items-center space-x-4">
            <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
              <span className="text-sm">Total Reports: <strong>{reports.length}</strong></span>
            </div>
            <button 
              onClick={() => openModal('generate')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <i className="fas fa-plus"></i>
              <span>New Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Categories Grid - Modern Cards */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Report Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REPORT_TYPES.map(report => (
            <div 
              key={report.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-200 group cursor-pointer"
              onClick={() => openModal('generate', report)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-${report.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <i className={`fas fa-${report.icon} text-${report.color}-600 text-xl`}></i>
                </div>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                  {report.trend}
                </span>
              </div>
              
              <h4 className="font-bold text-gray-800 text-lg mb-2">{report.name}</h4>
              <p className="text-gray-600 text-sm mb-4">{report.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-sm text-gray-500">{report.stats}</span>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Generate
                  <i className="fas fa-arrow-right text-xs"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Recent Reports</h3>
              <p className="text-gray-600 text-sm mt-1">Your recently generated reports</p>
            </div>
            <div className="mt-2 md:mt-0">
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500">
                <option>Sort by: Newest</option>
                <option>Sort by: Oldest</option>
                <option>Sort by: Size</option>
                <option>Sort by: Type</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {reports.length > 0 ? (
            <DataTable
              columns={[
                { key: 'id', title: 'Report ID', sortable: true, width: '120px' },
                { 
                  key: 'type', 
                  title: 'Report Type', 
                  sortable: true,
                  render: (value) => (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                        <i className="fas fa-file-alt text-blue-600 text-sm"></i>
                      </div>
                      <span className="font-medium">{value}</span>
                    </div>
                  )
                },
                { key: 'period', title: 'Period', sortable: true },
                { 
                  key: 'generated', 
                  title: 'Generated', 
                  sortable: true,
                  render: (value) => (
                    <div>
                      <div className="font-medium">{value}</div>
                      <div className="text-xs text-gray-500">Last week</div>
                    </div>
                  )
                },
                { key: 'size', title: 'Size', sortable: true },
                { 
                  key: 'format', 
                  title: 'Format', 
                  sortable: true,
                  render: (value) => (
                    <div className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${
                      value === 'PDF' 
                        ? 'bg-red-50 text-red-700 border border-red-200' 
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      <i className={`fas fa-${value === 'PDF' ? 'file-pdf' : 'file-excel'}`}></i>
                      {value}
                    </div>
                  )
                },
                {
                  key: 'actions',
                  title: 'Actions',
                  width: '140px',
                  render: (_, row) => (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewReport(row)}
                        className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
                        title="Preview"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button 
                        onClick={() => handleDownloadReport(row)}
                        className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition-colors"
                        title="Download"
                      >
                        <i className="fas fa-download"></i>
                      </button>
                      <button 
                        onClick={() => openModal('delete', row)}
                        className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors"
                        title="Delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  )
                }
              ]}
              data={reports}
            />
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="fas fa-chart-bar text-gray-400 text-2xl"></i>
              </div>
              <h4 className="text-lg font-medium text-gray-700 mb-2">No reports yet</h4>
              <p className="text-gray-500 mb-6">Generate your first report to get started</p>
              <button 
                onClick={() => openModal('generate')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Generate Report
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals (Keep same as before) */}
      <GenerateReportModal
        isOpen={modalState.generate}
        onClose={() => closeModal('generate')}
        onSubmit={handleGenerateReport}
        selectedReportType={selectedReportType}
        onReportTypeChange={setSelectedReportType}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        reportTypes={REPORT_TYPES}
      />

      <DeleteConfirmationModal
        isOpen={modalState.delete}
        onClose={() => closeModal('delete')}
        onConfirm={handleDeleteReport}
        name={currentReport?.type}
        type="Report"
      />
    </div>
  )
}

// Sub-components
const GenerateReportModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  selectedReportType, 
  onReportTypeChange, 
  dateRange, 
  onDateRangeChange,
  reportTypes 
}) => {
  const selectedReport = reportTypes.find(r => r.id === selectedReportType)

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Generate Report" size="md">
      <div className="space-y-6">
        {selectedReport && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <i className={`fas fa-${selectedReport.icon} text-${selectedReport.color}-500 text-xl`}></i>
              <div>
                <h4 className="font-semibold text-blue-800">{selectedReport.name}</h4>
                <p className="text-blue-600 text-sm">{selectedReport.description}</p>
              </div>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
          <select
            value={selectedReportType}
            onChange={(e) => onReportTypeChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Report Type</option>
            {reportTypes.map(report => (
              <option key={report.id} value={report.id}>{report.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
            <input
              type="date"
              required
              value={dateRange.start}
              onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
            <input
              type="date"
              required
              value={dateRange.end}
              onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" name="format" value="PDF" defaultChecked className="mr-2" />
              <span>PDF Document</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="format" value="Excel" className="mr-2" />
              <span>Excel Spreadsheet</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={!selectedReportType || !dateRange.start || !dateRange.end}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <i className="fas fa-chart-bar mr-2"></i>Generate Report
          </button>
        </div>
      </div>
    </Modal>
  )
}

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, name, type }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={`Delete ${type}`} size="md">
    <div className="text-center p-6">
      <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
        <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirm Deletion</h3>
      <p className="text-gray-600 mb-6">
        Are you sure you want to delete <span className="font-semibold">{name}</span>? 
        This action cannot be undone.
      </p>
      <div className="flex justify-center gap-3">
        <button onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          <i className="fas fa-trash mr-2"></i>Delete {type}
        </button>
      </div>
    </div>
  </Modal>
)

export default Reports