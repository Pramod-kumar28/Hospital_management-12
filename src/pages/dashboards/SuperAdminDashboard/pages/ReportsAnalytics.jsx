import React, { useState, useEffect } from 'react'
import Modal from '../../../../components/common/Modal/Modal'

const ReportsAnalytics = () => {
  const [reports, setReports] = useState([])
  const [state, setState] = useState({
    hospitals: [],
    users: []
  })

  // Modal states
  const [isGenerateReportModalOpen, setIsGenerateReportModalOpen] = useState(false)
  const [isViewReportModalOpen, setIsViewReportModalOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState(null)
  const [newReport, setNewReport] = useState({
    title: '',
    type: 'Revenue',
    format: 'PDF',
    dateRange: 'last_30_days'
  })

  const fetchData = async () => {
    const hospitalsRes = await fetch("https://jsonplaceholder.typicode.com/users")
    const postsRes = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
    
    const hospitalsData = await hospitalsRes.json()
    const posts = await postsRes.json()

    const hospitals = hospitalsData.slice(0, 8).map((h, i) => ({
      id: `HSP-${1000 + i}`,
      name: h.company.name,
      address: `${h.address.street}, ${h.address.city}`,
      email: h.email,
      contact: h.phone,
      subscriptionPlan: ['Basic', 'Professional', 'Enterprise'][i % 3],
      status: i % 5 === 0 ? 'Suspended' : 'Active',
      createdDate: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
      logo: `https://picsum.photos/seed/hospital${i}/80/80`
    }))

    const users = hospitalsData.slice(0, 12).map((u, i) => ({
      id: `USR-${4000 + i}`,
      name: u.name,
      role: ['Admin', 'Doctor', 'Staff', 'Patient'][i % 4],
      email: u.email,
      status: i % 8 === 0 ? 'Inactive' : 'Active',
      lastLogin: new Date(Date.now() - i * 3600000).toLocaleString(),
      avatar: `https://i.pravatar.cc/60?img=${i + 1}`
    }))

    const reportsData = posts.map((p, i) => ({
      id: `REP-${6000 + i}`,
      title: p.title,
      type: ['Revenue', 'Usage', 'Growth', 'Performance'][i % 4],
      format: ['PDF', 'Excel', 'CSV'][i % 3],
      generatedDate: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
      status: ['Completed', 'Processing', 'Failed'][i % 3],
      content: p.body,
      size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
      records: Math.floor(Math.random() * 1000) + 100
    }))

    setState({ hospitals, users })
    setReports(reportsData)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Generate Report Functions
  const openGenerateReportModal = () => {
    setIsGenerateReportModalOpen(true)
  }

  const closeGenerateReportModal = () => {
    setIsGenerateReportModalOpen(false)
    setNewReport({
      title: '',
      type: 'Revenue',
      format: 'PDF',
      dateRange: 'last_30_days'
    })
  }

  const handleGenerateReport = (e) => {
    e.preventDefault()
    
    if (!newReport.title) {
      alert('Please enter a report title')
      return
    }

    // Simulate report generation
    const report = {
      id: `REP-${6000 + reports.length}`,
      title: newReport.title,
      type: newReport.type,
      format: newReport.format,
      generatedDate: new Date().toISOString().split('T')[0],
      status: 'Processing',
      content: `This is a generated ${newReport.type.toLowerCase()} report in ${newReport.format} format.`,
      size: '0 MB',
      records: 0
    }

    // Add to reports array
    setReports(prev => [report, ...prev])
    
    // Simulate processing completion
    setTimeout(() => {
      setReports(prev => prev.map(r => 
        r.id === report.id 
          ? { 
              ...r, 
              status: 'Completed', 
              size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
              records: Math.floor(Math.random() * 1000) + 100
            } 
          : r
      ))
    }, 2000)

    alert(`📊 Report "${report.title}" is being generated...`)
    closeGenerateReportModal()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewReport(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // View Report Functions
  const viewReport = (reportId) => {
    const report = reports.find(r => r.id === reportId)
    setSelectedReport(report)
    setIsViewReportModalOpen(true)
  }

  const closeViewReportModal = () => {
    setIsViewReportModalOpen(false)
    setSelectedReport(null)
  }

  // Download Report Function
  const downloadReport = (reportId) => {
    const report = reports.find(r => r.id === reportId)
    
    if (report.status !== 'Completed') {
      alert('⏳ Report is still processing. Please wait until it completes.')
      return
    }

    // Simulate download
    alert(`📥 Downloading "${report.title}" (${report.format})...`)
    
    // In a real app, this would trigger an actual download
    console.log(`Downloading report: ${report.title}`)
  }

  // Delete Report Function
  const deleteReport = (reportId) => {
    if (confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
      const updatedReports = reports.filter(r => r.id !== reportId)
      setReports(updatedReports)
      alert('🗑️ Report deleted successfully')
    }
  }

  // Report Statistics
  const reportStats = {
    total: reports.length,
    completed: reports.filter(r => r.status === 'Completed').length,
    processing: reports.filter(r => r.status === 'Processing').length,
    failed: reports.filter(r => r.status === 'Failed').length
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-700">
        <i className="fas fa-chart-bar text-blue-500 mr-2"></i>Reports & Analytics
      </h2>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl card-shadow border text-center">
          <i className="fas fa-hospital text-3xl text-blue-500 mb-3"></i>
          <div className="text-2xl font-bold text-blue-600">{state.hospitals.length}</div>
          <div className="text-sm text-gray-500">Active Hospitals</div>
        </div>
        <div className="bg-white p-6 rounded-xl card-shadow border text-center">
          <i className="fas fa-user-plus text-3xl text-green-500 mb-3"></i>
          <div className="text-2xl font-bold text-green-600">28</div>
          <div className="text-sm text-gray-500">New Signups (Month)</div>
        </div>
        <div className="bg-white p-6 rounded-xl card-shadow border text-center">
          <i className="fas fa-chart-line text-3xl text-purple-500 mb-3"></i>
          <div className="text-2xl font-bold text-purple-600">+12%</div>
          <div className="text-sm text-gray-500">Revenue Growth</div>
        </div>
        <div className="bg-white p-6 rounded-xl card-shadow border text-center">
          <i className="fas fa-file-alt text-3xl text-orange-500 mb-3"></i>
          <div className="text-2xl font-bold text-orange-600">{reportStats.total}</div>
          <div className="text-sm text-gray-500">Total Reports</div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl card-shadow border p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-semibold text-lg">Generated Reports</h3>
            <p className="text-sm text-gray-500 mt-1">
              {reportStats.completed} completed, {reportStats.processing} processing, {reportStats.failed} failed
            </p>
          </div>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={openGenerateReportModal}
          >
            <i className="fas fa-plus mr-2"></i>Generate Report
          </button>
        </div>
        
        <div className="space-y-3">
          {reports.map(report => (
            <div key={report.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium text-gray-900">{report.title}</h4>
                  <span className={`status-${report.status.toLowerCase()} px-2 py-1 rounded text-xs`}>
                    {report.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500 flex flex-wrap items-center gap-4">
                  <span><i className="fas fa-tag mr-1"></i>{report.type}</span>
                  <span><i className="fas fa-calendar mr-1"></i>{report.generatedDate}</span>
                  <span><i className="fas fa-file mr-1"></i>{report.format}</span>
                  {report.status === 'Completed' && (
                    <>
                      <span><i className="fas fa-database mr-1"></i>{report.records} records</span>
                      <span><i className="fas fa-weight mr-1"></i>{report.size}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <button 
                    className="text-blue-600 hover:text-blue-800 transition-colors p-2"
                    onClick={() => viewReport(report.id)}
                    title="View Report"
                    disabled={report.status !== 'Completed'}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button 
                    className="text-green-600 hover:text-green-800 transition-colors p-2 disabled:text-gray-400 disabled:cursor-not-allowed"
                    onClick={() => downloadReport(report.id)}
                    title="Download Report"
                    disabled={report.status !== 'Completed'}
                  >
                    <i className="fas fa-download"></i>
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-800 transition-colors p-2"
                    onClick={() => deleteReport(report.id)}
                    title="Delete Report"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {reports.length === 0 && (
          <div className="text-center py-8">
            <i className="fas fa-chart-bar text-4xl text-gray-300 mb-3"></i>
            <h3 className="text-lg font-medium text-gray-700 mb-1">No reports generated yet</h3>
            <p className="text-gray-500 text-sm">Generate your first report to get started with analytics.</p>
          </div>
        )}
      </div>

      {/* Generate Report Modal */}
      <Modal
        isOpen={isGenerateReportModalOpen}
        onClose={closeGenerateReportModal}
        title="Generate New Report"
        size="md"
      >
        <form onSubmit={handleGenerateReport} className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Title *
              </label>
              <input
                type="text"
                name="title"
                value={newReport.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter report title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Type *
              </label>
              <select
                name="type"
                value={newReport.type}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Revenue">Revenue Report</option>
                <option value="Usage">Usage Analytics</option>
                <option value="Growth">Growth Metrics</option>
                <option value="Performance">Performance Report</option>
                <option value="User">User Activity</option>
                <option value="System">System Health</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Format *
                </label>
                <select
                  name="format"
                  value={newReport.format}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="PDF">PDF</option>
                  <option value="Excel">Excel</option>
                  <option value="CSV">CSV</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range *
                </label>
                <select
                  name="dateRange"
                  value={newReport.dateRange}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="last_7_days">Last 7 Days</option>
                  <option value="last_30_days">Last 30 Days</option>
                  <option value="last_90_days">Last 90 Days</option>
                  <option value="this_month">This Month</option>
                  <option value="last_month">Last Month</option>
                  <option value="this_quarter">This Quarter</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={closeGenerateReportModal}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <i className="fas fa-play mr-2"></i>
              Generate Report
            </button>
          </div>
        </form>
      </Modal>

      {/* View Report Modal */}
      <Modal
        isOpen={isViewReportModalOpen}
        onClose={closeViewReportModal}
        title={selectedReport?.title || 'Report Details'}
        size="xl"
      >
        {selectedReport && (
          <div className="space-y-4">
            {/* Report Header */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-500">Type</div>
                <div className="font-medium">{selectedReport.type}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Format</div>
                <div className="font-medium">{selectedReport.format}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Generated</div>
                <div className="font-medium">{selectedReport.generatedDate}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Status</div>
                <div className={`status-${selectedReport.status.toLowerCase()} px-2 py-1 rounded text-xs inline-block`}>
                  {selectedReport.status}
                </div>
              </div>
            </div>

            {/* Report Content */}
            <div className="bg-white border rounded-lg p-4">
              <h4 className="font-medium mb-3">Report Preview</h4>
              <div className="text-sm text-gray-600 leading-relaxed">
                {selectedReport.content}
              </div>
              
              {selectedReport.status === 'Completed' && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                  <div className="flex items-center gap-2 text-green-700 text-sm">
                    <i className="fas fa-check-circle"></i>
                    <span>Report generated successfully with {selectedReport.records} records</span>
                  </div>
                </div>
              )}

              {selectedReport.status === 'Processing' && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                  <div className="flex items-center gap-2 text-blue-700 text-sm">
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Report is being generated...</span>
                  </div>
                </div>
              )}

              {selectedReport.status === 'Failed' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                  <div className="flex items-center gap-2 text-red-700 text-sm">
                    <i className="fas fa-exclamation-circle"></i>
                    <span>Report generation failed. Please try again.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={closeViewReportModal}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => downloadReport(selectedReport.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={selectedReport.status !== 'Completed'}
              >
                <i className="fas fa-download mr-2"></i>
                Download Report
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ReportsAnalytics