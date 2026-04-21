import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'
import Modal from '../../../../components/common/Modal/Modal'
import { apiFetch } from '../../../../services/apiClient'
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
      stats: 'Live connection',
      trend: '+12%'
    },
    { 
      id: 'department-performance', 
      name: 'Department Performance', 
      icon: 'building', 
      color: 'teal', 
      description: 'Department-wise performance metrics',
      stats: 'Live connection',
      trend: '+12%'
    },
    { 
      id: 'bed-occupancy', 
      name: 'Bed Occupancy', 
      icon: 'bed', 
      color: 'purple', 
      description: 'Daily occupancy and utilization',
      stats: 'Live connection',
      trend: '+5%'
    }
  ]

  useEffect(() => { loadReports() }, [])

  const loadReports = async () => {
    setLoading(true)
    // Empties all default mockup dummy data. Now it waits exclusively for securely built live data.
    setReports([])
    setLoading(false)
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
  const handleGenerateReport = async () => {
    if (!selectedReportType || !dateRange.start || !dateRange.end) {
      alert('Please select report type and date range')
      return
    }

    setLoading(true)
    try {
      const reportType = REPORT_TYPES.find(r => r.id === selectedReportType)
      let newReport = {
        id: `REP-${String(reports.length + 1).padStart(3, '0')}`,
        type: reportType.name,
        report_code: reportType.id,
        period: `${dateRange.start} to ${dateRange.end}`,
        generated: new Date().toISOString().split('T')[0],
        size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
        format: Math.random() > 0.5 ? 'PDF' : 'Excel',
        status: 'Completed',
        data: null
      }

      if (selectedReportType === 'revenue' || selectedReportType === 'department-performance' || selectedReportType === 'bed-occupancy') {
        let apiData = null;
        try {
          const queryParams = new URLSearchParams({ date_from: dateRange.start, date_to: dateRange.end });
          const endpoint = selectedReportType === 'bed-occupancy' ? 'bed-occupancy' : selectedReportType === 'revenue' ? 'revenue-summary' : 'department-performance';
          
          let response = await apiFetch(`/api/v1/hospital-admin/reports/${endpoint}?${queryParams.toString()}`);
          if (response.ok) {
             apiData = await response.json();
          } else if (selectedReportType === 'bed-occupancy' && response.status === 405) {
             let postRes = await apiFetch('/api/v1/hospital-admin/reports/bed-occupancy', {
                method: 'POST',
                body: { date_from: dateRange.start, date_to: dateRange.end }
             });
             if(postRes.ok) apiData = await postRes.json();
          }
        } catch (err) {
          console.error("Network or API Fetch error:", err);
        }

        if (apiData) {
          newReport.data = apiData;
          newReport.format = 'Interactive';
          newReport.size = 'API Data';
        }
      }

      setReports(prev => [newReport, ...prev])
      closeModal('generate')
      // Auto-open visualization
      setTimeout(() => openModal('view', newReport), 100)
    } catch (err) {
      console.error("Error generating report:", err)
      alert("Error generating report.")
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadReport = (report) => {
    alert(`Downloading ${report.type} report...`)
    // Simulate download
    console.log(`Downloading report: ${report.id}`)
  }

  const handleViewReport = (report) => {
    openModal('view', report)
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
          <h2 className="text-2xl font-semibold text-gray-800">Reports</h2>
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

      <ViewReportModal
        isOpen={modalState.view}
        onClose={() => closeModal('view')}
        report={currentReport}
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
            className={`px-6 py-2 rounded-lg transition-colors flex items-center ${
              !selectedReportType || !dateRange.start || !dateRange.end 
                ? 'bg-gray-400 text-white cursor-pointer hover:bg-gray-500' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
            }`}
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

const ViewReportModal = ({ isOpen, onClose, report }) => {
  if (!report) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Report: ${report.type}`} size="4xl">
      <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
        <div className="flex justify-between items-center text-sm text-gray-500 border-b pb-4">
          <div><span className="font-semibold text-gray-700">Period:</span> {report.period}</div>
          <div><span className="font-semibold text-gray-700">Generated:</span> {report.generated}</div>
          <div><span className="font-semibold text-gray-700">Format:</span> {report.format}</div>
        </div>
        
        {report.report_code === 'bed-occupancy' && report.data ? (
          <BedOccupancyView data={report.data} />
        ) : report.report_code === 'department-performance' && report.data ? (
          <DepartmentPerformanceView data={report.data} />
        ) : report.report_code === 'revenue' && report.data ? (
          <RevenueSummaryView data={report.data} />
        ) : (
          <div className="py-20 text-center text-gray-500">
             <i className="fas fa-file-alt text-4xl mb-4 text-gray-300"></i>
             <p>Document preview is not available for this format ({report.format}).</p>
             <button onClick={() => alert("Downloading feature coming soon...")} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
               Download File
             </button>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t">
           <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">Close</button>
        </div>
      </div>
    </Modal>
  )
}

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white border rounded-xl p-4 flex flex-col justify-center shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-2">
      <div className={`w-10 h-10 rounded-lg bg-${color}-50 flex items-center justify-center`}>
        <i className={`fas fa-${icon} text-${color}-600 text-lg`}></i>
      </div>
    </div>
    <span className="text-2xl font-bold text-gray-800">{value}</span>
    <span className="text-xs text-gray-500 font-medium">{title}</span>
  </div>
)

const BedOccupancyView = ({ data }) => {
  if(!data) return null;
  const { summary, ward_breakdown, daily_trends } = data;
  return (
    <div className="space-y-8">
      {/* Summary KPI Cards */}
      <div>
        <h4 className="text-lg font-bold text-gray-800 mb-4">Summary Overview</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <StatCard title="Total Beds" value={summary?.total_beds || 0} icon="bed" color="blue" />
          <StatCard title="Occupied" value={summary?.occupied_beds || 0} icon="procedures" color="red" />
          <StatCard title="Available" value={summary?.available_beds || 0} icon="check-circle" color="green" />
          <StatCard title="Occupancy Rate" value={`${summary?.occupancy_rate || 0}%`} icon="chart-pie" color="purple" />
          <StatCard title="ALOS" value={`${summary?.average_length_of_stay || 0} days`} icon="clock" color="orange" />
        </div>
      </div>
      
      {/* Adm & Discharges summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
           <div>
              <p className="text-emerald-700 font-medium">Total Admissions</p>
              <h3 className="text-2xl font-bold text-emerald-800">{data.total_admissions || 0}</h3>
           </div>
           <i className="fas fa-user-plus text-emerald-300 text-3xl"></i>
        </div>
        <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
           <div>
              <p className="text-orange-700 font-medium">Total Discharges</p>
              <h3 className="text-2xl font-bold text-orange-800">{data.total_discharges || 0}</h3>
           </div>
           <i className="fas fa-user-minus text-orange-300 text-3xl"></i>
        </div>
      </div>

      {/* Ward Breakdown Table */}
      <div>
        <h4 className="text-lg font-bold text-gray-800 mb-4">Ward Breakdown</h4>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ward Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupied</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maintenance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(ward_breakdown || []).map((w, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{w.ward_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-semibold">{w.total_beds}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">{w.occupied}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{w.available}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600 font-semibold">{w.maintenance}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-semibold">{w.occupancy_rate}%</td>
                </tr>
              ))}
              {(!ward_breakdown || ward_breakdown.length === 0) && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">No ward data available for this range.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Daily Trends Table */}
      <div>
        <h4 className="text-lg font-bold text-gray-800 mb-4">Daily Trends</h4>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admissions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discharges</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Change</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(daily_trends || []).map((t, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600 font-semibold">{t.admissions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600 font-semibold">{t.discharges}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                     <span className={t.net_change > 0 ? "text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md" : t.net_change < 0 ? "text-red-600 bg-red-50 px-2 py-1 rounded-md" : "text-gray-500"}>
                       {t.net_change > 0 ? `+${t.net_change}` : t.net_change}
                     </span>
                  </td>
                </tr>
              ))}
              {(!daily_trends || daily_trends.length === 0) && (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">No trend data available for this range.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

const DepartmentPerformanceView = ({ data }) => {
  if(!data) return null;
  const { hospital_summary, department_performance } = data;
  return (
    <div className="space-y-8">
      {/* Hospital Summary KPI Cards */}
      <div>
        <h4 className="text-lg font-bold text-gray-800 mb-4">Hospital Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard title="Total Departments" value={hospital_summary?.total_departments || 0} icon="building" color="blue" />
          <StatCard title="Total Doctors" value={hospital_summary?.total_doctors || 0} icon="user-md" color="green" />
          <StatCard title="Total Appointments" value={hospital_summary?.total_appointments || 0} icon="calendar-check" color="purple" />
          <StatCard title="Total Revenue" value={`₹${hospital_summary?.total_revenue || 0}`} icon="rupee-sign" color="emerald" />
          <StatCard title="Avg Appts/Dept" value={hospital_summary?.avg_appointments_per_department || 0} icon="chart-line" color="orange" />
        </div>
      </div>

      {/* Department Performance Table */}
      <div>
        <h4 className="text-lg font-bold text-gray-800 mb-4">Department Performance</h4>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Head Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctors</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Appts</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cancelled</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(department_performance || []).map((dept, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{dept.department_name}</div>
                      <div className="text-xs text-gray-500">{dept.department_code}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.head_doctor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-semibold">{dept.doctor_count}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">{dept.metrics?.total_appointments || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{dept.metrics?.completed_appointments || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">{dept.metrics?.cancelled_appointments || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      (dept.metrics?.completion_rate || 0) >= 80 ? 'bg-green-100 text-green-800' :
                      (dept.metrics?.completion_rate || 0) >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {dept.metrics?.completion_rate || 0}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600 font-semibold">₹{dept.revenue?.total_revenue || 0}</td>
                </tr>
              ))}
              {(!department_performance || department_performance.length === 0) && (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">No department performance data available for this range.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Metrics Cards */}
      {(department_performance || []).length > 0 && (
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-4">Detailed Metrics</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {department_performance.map((dept, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-semibold text-gray-800">{dept.department_name}</h5>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{dept.department_code}</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Completion Rate</span>
                    <span className="font-semibold text-green-600">{dept.metrics?.completion_rate || 0}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Cancellation Rate</span>
                    <span className="font-semibold text-red-600">{dept.metrics?.cancellation_rate || 0}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">No Show Rate</span>
                    <span className="font-semibold text-orange-600">{dept.metrics?.no_show_rate || 0}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg Revenue/Appointment</span>
                    <span className="font-semibold text-emerald-600">₹{dept.revenue?.avg_revenue_per_appointment || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg Appts/Doctor</span>
                    <span className="font-semibold text-purple-600">{dept.metrics?.avg_appointments_per_doctor || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

const RevenueSummaryView = ({ data }) => {
  if(!data) return null;
  const { total_revenue, revenue_this_month, revenue_by_department, revenue_trend } = data;
  return (
    <div className="space-y-8">
      {/* Revenue KPI Cards */}
      <div>
        <h4 className="text-lg font-bold text-gray-800 mb-4">Revenue Overview</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard title="Total Revenue" value={`₹${total_revenue || 0}`} icon="wallet" color="emerald" />
          <StatCard title="Revenue This Month" value={`₹${revenue_this_month || 0}`} icon="calendar-check" color="blue" />
        </div>
      </div>
      
      {/* Revenue by Department Table */}
      <div>
        <h4 className="text-lg font-bold text-gray-800 mb-4">Revenue by Department</h4>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated Revenue</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(revenue_by_department || {}).map(([dept, rev], i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600 font-bold">₹{rev}</td>
                </tr>
              ))}
              {Object.keys(revenue_by_department || {}).length === 0 && (
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500">No departmental revenue data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Revenue Trend Table */}
      <div>
        <h4 className="text-lg font-bold text-gray-800 mb-4">Daily Revenue Trend</h4>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Revenue</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(revenue_trend || []).map((t, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">{t.appointment_count}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600 font-bold">₹{t.revenue}</td>
                </tr>
              ))}
              {(!revenue_trend || revenue_trend.length === 0) && (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">No trend data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Reports