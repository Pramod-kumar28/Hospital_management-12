import React, { useState, useEffect } from 'react'
import DataTable from '../../../../components/ui/Tables/DataTable'
import SearchBar from '../../../../components/common/SearchBar/SearchBar'
import Button from '../../../../components/common/Button/Button'
import Modal from '../../../../components/common/Modal/Modal'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const ReportGeneration = () => {
  const [loading, setLoading] = useState(true)
  const [reports, setReports] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [currentReport, setCurrentReport] = useState(null)
  const [template, setTemplate] = useState('standard')
  const [selectedReports, setSelectedReports] = useState([])

  useEffect(() => {
    loadReportData()
  }, [])

  const loadReportData = async () => {
    setLoading(true)
    setTimeout(() => {
      const reportData = [
        {
          id: 'REP-2024-001',
          testId: 'TEST-2024-001',
          patientName: 'Rajesh Kumar',
          patientId: 'PAT-001',
          testType: 'CBC',
          completionDate: '2024-01-15',
          status: 'Ready',
          verifiedBy: 'Dr. Sharma',
          format: 'PDF',
          accessCode: 'ACCESS001'
        },
        {
          id: 'REP-2024-002',
          testId: 'TEST-2024-002',
          patientName: 'Priya Sharma',
          patientId: 'PAT-002',
          testType: 'Lipid Profile',
          completionDate: '2024-01-15',
          status: 'Pending Review',
          verifiedBy: '',
          format: 'Draft',
          accessCode: 'ACCESS002'
        },
        {
          id: 'REP-2024-003',
          testId: 'TEST-2024-003',
          patientName: 'Suresh Patel',
          patientId: 'PAT-003',
          testType: 'Urine Culture',
          completionDate: '2024-01-14',
          status: 'Ready',
          verifiedBy: 'Dr. Mehta',
          format: 'PDF',
          accessCode: 'ACCESS003'
        },
        {
          id: 'REP-2024-004',
          testId: 'TEST-2024-004',
          patientName: 'Anita Mehta',
          patientId: 'PAT-004',
          testType: 'Liver Function',
          completionDate: '2024-01-14',
          status: 'Ready',
          verifiedBy: 'Dr. Rao',
          format: 'PDF',
          accessCode: 'ACCESS004'
        }
      ]
      setReports(reportData)
      setLoading(false)
    }, 1000)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleGenerateReport = (testId) => {
    const test = reports.find(r => r.testId === testId)
    if (test) {
      // Simulate report generation
      const newReport = {
        id: `REP-${new Date().getFullYear()}-${reports.length + 1}`,
        testId: testId,
        patientName: test.patientName,
        patientId: test.patientId,
        testType: test.testType,
        completionDate: new Date().toISOString().split('T')[0],
        status: 'Ready',
        verifiedBy: 'Dr. System',
        format: 'PDF',
        accessCode: `ACCESS${Math.floor(Math.random() * 10000)}`
      }
      
      setReports([newReport, ...reports])
      alert(`Report generated: ${newReport.id}\nAccess Code: ${newReport.accessCode}`)
    }
  }

  const handlePreviewReport = (report) => {
    setCurrentReport(report)
    setShowPreviewModal(true)
  }

  const handlePrintReport = (reportId) => {
    const report = reports.find(r => r.id === reportId)
    if (report) {
      alert(`Printing report: ${report.id}\nPatient: ${report.patientName}`)
      // In real app, this would open print dialog
    }
  }

  const handleDownloadReport = (reportId, format) => {
    const report = reports.find(r => r.id === reportId)
    if (report) {
      alert(`Downloading ${format} report: ${report.id}`)
      // In real app, this would trigger download
    }
  }

  const handleShareReport = (reportId) => {
    const report = reports.find(r => r.id === reportId)
    if (report) {
      const shareLink = `https://lab.example.com/reports/${report.accessCode}`
      alert(`Share link: ${shareLink}\nAccess Code: ${report.accessCode}`)
      // In real app, copy to clipboard
      navigator.clipboard.writeText(shareLink)
    }
  }

  const handleVerifyReport = (reportId) => {
    const report = reports.find(r => r.id === reportId)
    if (report && report.status !== 'Ready') {
      setReports(reports.map(r => 
        r.id === reportId 
          ? { ...r, status: 'Ready', verifiedBy: 'Dr. Current User' }
          : r
      ))
      alert(`Report ${reportId} verified and ready for release`)
    }
  }

  const handleSelectReport = (reportId) => {
    if (selectedReports.includes(reportId)) {
      setSelectedReports(selectedReports.filter(id => id !== reportId))
    } else {
      setSelectedReports([...selectedReports, reportId])
    }
  }

  const handleBulkPrint = () => {
    if (selectedReports.length > 0) {
      alert(`Printing ${selectedReports.length} selected reports`)
      selectedReports.forEach(reportId => {
        handlePrintReport(reportId)
      })
      setSelectedReports([])
    } else {
      alert('Please select reports to print')
    }
  }

  const handleBulkDownload = () => {
    if (selectedReports.length > 0) {
      alert(`Downloading ${selectedReports.length} selected reports as ZIP`)
      setSelectedReports([])
    } else {
      alert('Please select reports to download')
    }
  }

  const filteredReports = reports.filter(report =>
    report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.testType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <LoadingSpinner />

  return (
    <>
          <div className="space-y-6 animate-fade-in">
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                      <h2 className="text-2xl font-semibold text-gray-700">Report Generation</h2>
                      <p className="text-gray-500">Generate, preview, and manage lab test reports</p>
                  </div>
                  <div className="flex gap-3">
                      {selectedReports.length > 0 && (
                          <>
                              <Button
                                  variant="outline"
                                  icon="fas fa-print"
                                  onClick={handleBulkPrint}
                              >
                                  Bulk Print ({selectedReports.length})
                              </Button>
                              <Button
                                  variant="outline"
                                  icon="fas fa-download"
                                  onClick={handleBulkDownload}
                              >
                                  Bulk Download
                              </Button>
                          </>
                      )}
                      <Button
                          variant="primary"
                          icon="fas fa-file-medical"
                          onClick={() => handleGenerateReport('TEST-2024-002')}
                      >
                          Generate Report
                      </Button>
                  </div>
              </div>

              {/* Report Templates */}
              <div className="bg-white p-4 rounded border card-shadow">
                  <h3 className="text-lg font-semibold mb-3">Report Templates</h3>
                  <div className="flex flex-wrap gap-3">
                      {['Standard', 'Comprehensive', 'Doctor Summary', 'Patient Friendly', 'Custom'].map((temp) => (
                          <button
                              key={temp}
                              className={`px-4 py-2 rounded-lg border ${template === temp.toLowerCase()
                                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                                      : 'bg-white border-gray-300 hover:bg-gray-50'
                                  }`}
                              onClick={() => setTemplate(temp.toLowerCase())}
                          >
                              {temp}
                          </button>
                      ))}
                  </div>
              </div>

              {/* Search and Filters */}
              <div className="bg-white p-4 rounded border card-shadow">
                  <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                          <SearchBar
                              placeholder="Search by patient name, report ID, or test type..."
                              onSearch={handleSearch}
                              className="w-full"
                          />
                      </div>
                      <div className="flex gap-2">
                          <select className="px-4 py-2 border rounded-lg">
                              <option value="">All Status</option>
                              <option value="ready">Ready</option>
                              <option value="pending">Pending Review</option>
                              <option value="draft">Draft</option>
                          </select>
                          <select className="px-4 py-2 border rounded-lg">
                              <option value="">All Formats</option>
                              <option value="pdf">PDF</option>
                              <option value="html">HTML</option>
                              <option value="doc">Word</option>
                          </select>
                      </div>
                  </div>
              </div>

              {/* Reports Table */}
              <div className="bg-white rounded border card-shadow overflow-hidden">
                  <DataTable
                      columns={[
                          {
                              key: 'select',
                              title: '',
                              render: (_, row) => (
                                  <input
                                      type="checkbox"
                                      checked={selectedReports.includes(row.id)}
                                      onChange={() => handleSelectReport(row.id)}
                                      className="rounded"
                                      onClick={(e) => e.stopPropagation()}
                                  />
                              )
                          },
                          { key: 'id', title: 'Report ID', sortable: true },
                          { key: 'patientName', title: 'Patient', sortable: true },
                          { key: 'testType', title: 'Test Type', sortable: true },
                          { key: 'completionDate', title: 'Completion Date', sortable: true },
                          {
                              key: 'status',
                              title: 'Status',
                              sortable: true,
                              render: (value) => (
                                  <span className={`px-2 py-1 rounded-full text-xs ${value === 'Ready' ? 'bg-green-100 text-green-800' :
                                          value === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                                              'bg-gray-100 text-gray-800'
                                      }`}>
                                      {value}
                                  </span>
                              )
                          },
                          { key: 'verifiedBy', title: 'Verified By', sortable: true },
                          {
                              key: 'actions',
                              title: 'Actions',
                              render: (_, row) => (
                                  <div className="flex gap-2">
                                      <button
                                          onClick={(e) => {
                                              e.stopPropagation()
                                              handlePreviewReport(row)
                                          }}
                                          className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                                          title="Preview Report"
                                      >
                                          <i className="fas fa-eye"></i>
                                      </button>
                                      <button
                                          onClick={(e) => {
                                              e.stopPropagation()
                                              handlePrintReport(row.id)
                                          }}
                                          className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                                          title="Print Report"
                                      >
                                          <i className="fas fa-print"></i>
                                      </button>
                                      <button
                                          onClick={(e) => {
                                              e.stopPropagation()
                                              handleDownloadReport(row.id, 'PDF')
                                          }}
                                          className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200"
                                          title="Download PDF"
                                      >
                                          <i className="fas fa-download"></i>
                                      </button>
                                      {row.status !== 'Ready' && (
                                          <button
                                              onClick={(e) => {
                                                  e.stopPropagation()
                                                  handleVerifyReport(row.id)
                                              }}
                                              className="px-3 py-1 text-xs bg-purple-100 text-purple-800 rounded hover:bg-purple-200"
                                              title="Verify Report"
                                          >
                                              <i className="fas fa-check"></i>
                                          </button>
                                      )}
                                  </div>
                              )
                          }
                      ]}
                      data={filteredReports}
                      onRowClick={(report) => handlePreviewReport(report)}
                      emptyMessage="No reports available. Generate reports from completed tests."
                  />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded border card-shadow">
                      <div className="flex items-center">
                          <div className="p-3 bg-blue-100 rounded-lg mr-4">
                              <i className="fas fa-file-pdf text-blue-600 text-xl"></i>
                          </div>
                          <div>
                              <p className="text-gray-500 text-sm">Total Reports</p>
                              <p className="text-2xl font-bold text-blue-600 mt-1">{reports.length}</p>
                          </div>
                      </div>
                  </div>

                  <div className="bg-white p-4 rounded border card-shadow">
                      <div className="flex items-center">
                          <div className="p-3 bg-green-100 rounded-lg mr-4">
                              <i className="fas fa-check-circle text-green-600 text-xl"></i>
                          </div>
                          <div>
                              <p className="text-gray-500 text-sm">Ready Reports</p>
                              <p className="text-2xl font-bold text-green-600 mt-1">{reports.filter(r => r.status === 'Ready').length}</p>
                          </div>
                      </div>
                  </div>

                  <div className="bg-white p-4 rounded border card-shadow">
                      <div className="flex items-center">
                          <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                              <i className="fas fa-clock text-yellow-600 text-xl"></i>
                          </div>
                          <div>
                              <p className="text-gray-500 text-sm">Pending Review</p>
                              <p className="text-2xl font-bold text-yellow-600 mt-1">{reports.filter(r => r.status === 'Pending Review').length}</p>
                          </div>
                      </div>
                  </div>

                  <div className="bg-white p-4 rounded border card-shadow">
                      <div className="flex items-center">
                          <div className="p-3 bg-purple-100 rounded-lg mr-4">
                              <i className="fas fa-share-alt text-purple-600 text-xl"></i>
                          </div>
                          <div>
                              <p className="text-gray-500 text-sm">Shared Today</p>
                              <p className="text-2xl font-bold text-purple-600 mt-1">8</p>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-4 rounded border card-shadow">
                  <h3 className="text-lg font-semibold mb-3">Quick Report Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <button
                          className="p-4 border rounded-lg hover:bg-blue-50 transition-colors text-center group"
                          onClick={() => handleGenerateReport('TEST-2024-002')}
                      >
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200">
                              <i className="fas fa-file-medical text-blue-600 text-xl"></i>
                          </div>
                          <p className="font-medium">Generate Report</p>
                      </button>

                      <button
                          className="p-4 border rounded-lg hover:bg-green-50 transition-colors text-center group"
                          onClick={handleBulkPrint}
                      >
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200">
                              <i className="fas fa-print text-green-600 text-xl"></i>
                          </div>
                          <p className="font-medium">Bulk Print</p>
                      </button>

                      <button
                          className="p-4 border rounded-lg hover:bg-purple-50 transition-colors text-center group"
                          onClick={() => alert('Export all reports feature')}
                      >
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200">
                              <i className="fas fa-file-export text-purple-600 text-xl"></i>
                          </div>
                          <p className="font-medium">Export Reports</p>
                      </button>

                      <button
                          className="p-4 border rounded-lg hover:bg-teal-50 transition-colors text-center group"
                          onClick={() => alert('Report templates management')}
                      >
                          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-200">
                              <i className="fas fa-palette text-teal-600 text-xl"></i>
                          </div>
                          <p className="font-medium">Manage Templates</p>
                      </button>
                  </div>
              </div>
          </div>

          {/* Report Preview Modal */}
              <Modal
                  isOpen={showPreviewModal}
                  onClose={() => setShowPreviewModal(false)}
                  title="Report Preview"
                  size="xl"
              >
                  {currentReport && (
                      <div className="space-y-4">
                          {/* Report Header */}
                          <div className="bg-blue-50 p-4 rounded-lg">
                              <div className="flex justify-between items-start">
                                  <div>
                                      <h3 className="text-xl font-bold text-gray-800">DIAGNOSTIC LAB REPORT</h3>
                                      <p className="text-gray-600">Advanced Diagnostic Center</p>
                                  </div>
                                  <div className="text-right">
                                      <p className="font-medium">Report ID: {currentReport.id}</p>
                                      <p className="text-sm text-gray-500">Generated: {currentReport.completionDate}</p>
                                  </div>
                              </div>
                          </div>

                          {/* Patient Info */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded">
                              <div>
                                  <h4 className="font-semibold text-gray-700 mb-2">Patient Information</h4>
                                  <div className="space-y-1">
                                      <p><span className="text-gray-500">Name:</span> {currentReport.patientName}</p>
                                      <p><span className="text-gray-500">Patient ID:</span> {currentReport.patientId}</p>
                                      <p><span className="text-gray-500">Age/Sex:</span> 35/Male</p>
                                  </div>
                              </div>
                              <div>
                                  <h4 className="font-semibold text-gray-700 mb-2">Test Information</h4>
                                  <div className="space-y-1">
                                      <p><span className="text-gray-500">Test Type:</span> {currentReport.testType}</p>
                                      <p><span className="text-gray-500">Sample Date:</span> 2024-01-15</p>
                                      <p><span className="text-gray-500">Report Date:</span> {currentReport.completionDate}</p>
                                  </div>
                              </div>
                          </div>

                          {/* Test Results */}
                          <div className="border rounded overflow-hidden">
                              <table className="min-w-full">
                                  <thead className="bg-gray-50">
                                      <tr>
                                          <th className="px-4 py-3 text-left">Parameter</th>
                                          <th className="px-4 py-3 text-left">Result</th>
                                          <th className="px-4 py-3 text-left">Unit</th>
                                          <th className="px-4 py-3 text-left">Reference Range</th>
                                          <th className="px-4 py-3 text-left">Status</th>
                                      </tr>
                                  </thead>
                                  <tbody className="divide-y">
                                      <tr>
                                          <td className="px-4 py-3">Hemoglobin</td>
                                          <td className="px-4 py-3 font-medium">14.2</td>
                                          <td className="px-4 py-3">g/dL</td>
                                          <td className="px-4 py-3">13.5-17.5</td>
                                          <td className="px-4 py-3"><span className="text-green-600">Normal</span></td>
                                      </tr>
                                      <tr className="bg-gray-50">
                                          <td className="px-4 py-3">WBC Count</td>
                                          <td className="px-4 py-3 font-medium">7,800</td>
                                          <td className="px-4 py-3">cells/µL</td>
                                          <td className="px-4 py-3">4,000-11,000</td>
                                          <td className="px-4 py-3"><span className="text-green-600">Normal</span></td>
                                      </tr>
                                      <tr>
                                          <td className="px-4 py-3">Platelets</td>
                                          <td className="px-4 py-3 font-medium">250,000</td>
                                          <td className="px-4 py-3">platelets/µL</td>
                                          <td className="px-4 py-3">150,000-450,000</td>
                                          <td className="px-4 py-3"><span className="text-green-600">Normal</span></td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>

                          {/* Interpretation and Footer */}
                          <div className="space-y-4">
                              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                                  <h4 className="font-semibold text-gray-700 mb-2">Interpretation</h4>
                                  <p className="text-gray-600">All parameters are within normal limits. No abnormalities detected.</p>
                              </div>

                              <div className="flex justify-between items-center pt-4 border-t">
                                  <div>
                                      <p className="font-semibold">Verified By:</p>
                                      <p className="text-gray-600">{currentReport.verifiedBy || 'Pending Verification'}</p>
                                  </div>
                                  <div className="text-right">
                                      <p className="font-semibold">Access Code:</p>
                                      <p className="text-gray-600 font-mono">{currentReport.accessCode}</p>
                                  </div>
                              </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex justify-end gap-3 pt-4 border-t">
                              <Button
                                  variant="outline"
                                  onClick={() => setShowPreviewModal(false)}
                              >
                                  Close
                              </Button>
                              <Button
                                  variant="outline"
                                  icon="fas fa-print"
                                  onClick={() => handlePrintReport(currentReport.id)}
                              >
                                  Print
                              </Button>
                              <Button
                                  variant="outline"
                                  icon="fas fa-download"
                                  onClick={() => handleDownloadReport(currentReport.id, 'PDF')}
                              >
                                  Download PDF
                              </Button>
                              <Button
                                  variant="primary"
                                  icon="fas fa-share-alt"
                                  onClick={() => handleShareReport(currentReport.id)}
                              >
                                  Share Report
                              </Button>
                          </div>
                      </div>
                  )}
              </Modal>
    </>
  )
}

export default ReportGeneration