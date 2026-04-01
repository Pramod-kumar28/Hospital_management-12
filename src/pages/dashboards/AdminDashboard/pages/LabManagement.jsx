import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'
import Modal from '../../../../components/common/Modal/Modal' // Your existing modal component

const LabManagement = () => {
  const [loading, setLoading] = useState(true)
  const [labTests, setLabTests] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedTest, setSelectedTest] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [newTest, setNewTest] = useState({
    patient: '',
    testType: '',
    doctor: '',
    priority: 'Normal',
    sampleType: '',
    collectionDate: '',
    instructions: '',
    notes: ''
  })

  useEffect(() => {
    loadLabTests()
  }, [])

  const loadLabTests = async () => {
    setLoading(true)
    setTimeout(() => {
      setLabTests([
        { id: 'LAB-6001', patient: 'Ravi Kumar', testType: 'Blood Test', result: 'Normal', date: '2023-10-10', reportFile: 'report_1.pdf', status: 'Completed', doctor: 'Dr. Meena Rao',  sampleType: 'Blood' },
        { id: 'LAB-6002', patient: 'Anita Sharma', testType: 'MRI Scan', result: 'Normal', date: '2023-10-08', reportFile: 'report_2.pdf', status: 'Completed', doctor: 'Dr. Sharma',  sampleType: 'NA' },
        { id: 'LAB-6003', patient: 'Suresh Patel', testType: 'X-Ray', result: 'Fracture Detected', date: '2023-10-12', reportFile: 'report_3.pdf', status: 'Processing', doctor: 'Dr. Menon',  sampleType: 'NA' },
        { id: 'LAB-6004', patient: 'Priya Singh', testType: 'CT Scan', result: 'Pending', date: '2023-10-13', reportFile: '', status: 'Pending', doctor: 'Dr. Desai',  sampleType: 'NA' }
      ])
      setLoading(false)
    }, 1000)
  }

  const handleAddTest = () => {
    const test = {
      id: `LAB-${Math.floor(6000 + Math.random() * 9000)}`,
      patient: newTest.patient,
      testType: newTest.testType,
      doctor: newTest.doctor,
      priority: newTest.priority,
      sampleType: newTest.sampleType,
      result: 'Pending',
      date: newTest.collectionDate,
      reportFile: '',
      status: 'Pending',
      instructions: newTest.instructions,
      notes: newTest.notes
    }
    
    setLabTests(prev => [test, ...prev])
    setIsAddModalOpen(false)
    resetForm()
  }

  const handleViewReport = (testId) => {
    const test = labTests.find(t => t.id === testId)
    if (test) {
      setSelectedTest(test)
      setIsViewModalOpen(true)
    }
  }

  const handleDownloadReport = (testId) => {
    const test = labTests.find(t => t.id === testId)
    if (test && test.reportFile) {
      alert(`Downloading report: ${test.reportFile}`)
      // In real app, this would download the file
    } else {
      alert('Report not available for download')
    }
  }

  const handleDeleteTest = (testId) => {
    if (window.confirm('Are you sure you want to delete this lab test?')) {
      setLabTests(prev => prev.filter(test => test.id !== testId))
    }
  }

  const handleUpdateStatus = (testId, newStatus) => {
    setLabTests(prev => prev.map(test => 
      test.id === testId ? { ...test, status: newStatus } : test
    ))
  }

  const handleUpdateResult = (testId, newResult) => {
    setLabTests(prev => prev.map(test => 
      test.id === testId ? { ...test, result: newResult } : test
    ))
  }

  const resetForm = () => {
    setNewTest({
      patient: '',
      testType: '',
      doctor: '',
      priority: 'Normal',
      sampleType: '',
      collectionDate: '',
      instructions: '',
      notes: ''
    })
  }

  const getFilteredTests = () => {
    let filtered = labTests

    // Apply status filter
    if (selectedFilter !== 'All') {
      filtered = filtered.filter(test => test.status === selectedFilter)
    }

    // Apply search filter (name, test ID, test name)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(test =>
        test.patient.toLowerCase().includes(query) ||
        test.id.toLowerCase().includes(query) ||
        test.testType.toLowerCase().includes(query)
      )
    }

    return filtered
  }

  const filteredTests = getFilteredTests()

  const handleInputChange = (field, value) => {
    setNewTest(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Sample data for dropdowns
  const patients = [
    'Ravi Kumar',
    'Anita Sharma',
    'Suresh Patel',
    'Priya Singh',
    'Rajesh Kumar',
    'Meena Gupta',
    'Arun Verma',
    'Kavita Joshi'
  ]

  const doctors = [
    'Dr. Meena Rao - Cardiology',
    'Dr. Vivek Sharma - Orthopedics',
    'Dr. Rajesh Menon - Neurology',
    'Dr. Anjali Desai - Pediatrics',
    'Dr. Kavita Iyer - ENT',
    'Dr. Sanjay Kumar - Dermatology'
  ]

  const testTypes = [
    'Blood Test',
    'MRI Scan',
    'X-Ray',
    'CT Scan',
    'Ultrasound',
    'ECG',
    'EEG',
    'Urine Test',
    'Stool Test',
    'Biopsy',
    'Endoscopy',
    'Colonoscopy'
  ]

  

  const sampleTypes = [
    'Blood',
    'Urine',
    'Stool',
    'Tissue',
    'Saliva',
    'CSF',
    'NA'
  ]

  const statusOptions = [
    'Pending',
    'Processing',
    'Completed',
    'Cancelled'
  ]

  const resultOptions = [
    'Pending',
    'Normal',
    'Abnormal',
    'Critical',
    'Inconclusive'
  ]

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">
          Lab Management
        </h2>
       
      </div>

      {/* Lab Statistics - Compact Cards */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
  {[
    { 
      value: labTests.length, 
      label: 'Total Tests', 
      color: 'blue', 
      icon: 'fas fa-flask',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      iconBg: 'bg-blue-100'
    },
    { 
      value: labTests.filter(t => t.status === 'Completed').length, 
      label: 'Completed', 
      color: 'green', 
      icon: 'fas fa-check-circle',
      bg: 'bg-green-50',
      text: 'text-green-600',
      iconBg: 'bg-green-100'
    },
    { 
      value: labTests.filter(t => t.status === 'Processing').length, 
      label: 'Processing', 
      color: 'yellow', 
      icon: 'fas fa-spinner',
      bg: 'bg-yellow-50',
      text: 'text-yellow-600',
      iconBg: 'bg-yellow-100'
    },
    { 
      value: labTests.filter(t => t.status === 'Pending').length, 
      label: 'Pending', 
      color: 'red', 
      icon: 'fas fa-clock',
      bg: 'bg-red-50',
      text: 'text-red-600',
      iconBg: 'bg-red-100'
    }
  ].map((stat, index) => {
    const percentage = (stat.value / labTests.length * 100) || 0
    
    return (
      <div 
        key={index} 
        className={`${stat.bg} border border-gray-200 p-5 rounded-xl hover:shadow-md transition-all duration-300`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className={`${stat.iconBg} p-3 rounded-lg`}>
            <i className={`${stat.icon} ${stat.text} text-lg`}></i>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${stat.text}`}>{stat.value}</div>
            <div className="text-gray-800 font-medium text-sm">{stat.label}</div>
          </div>
        </div>
        
        <div className="text-xs text-gray-500">
          <div className="flex justify-between mb-1">
            <span>Progress</span>
            <span>{percentage.toFixed(0)}%</span>
          </div>
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${stat.iconBg} rounded-full`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    )
  })}
</div>

      {/* Lab Tests List */}
      <div className="space-y-4">
        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 items-center mb-6">
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="Search by Test Name, Lab ID, or Patient Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => setSelectedFilter('All')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedFilter === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedFilter('Completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedFilter === 'Completed'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setSelectedFilter('Processing')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedFilter === 'Processing'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Processing
          </button>
          <button
            onClick={() => setSelectedFilter('Pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedFilter === 'Pending'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Pending
          </button>

          
          
          
        </div>

        {/* Labs List */}
        {filteredTests.map(test => (
          <div 
            key={test.id} 
            className="bg-white rounded-3xl border border-gray-200  p-5 hover:shadow-lg transition-all duration-300 hover:border-blue-300"
          >
            <div className="flex items-center justify-between">
              {/* Left Side - Test Info */}
              <div className="flex-1 flex items-center gap-4">
                <div className={`flex items-center justify-center w-14 h-14 rounded-full ${
                  test.status === 'Completed' ? 'bg-green-100' :
                  test.status === 'Processing' ? 'bg-blue-100' :
                  test.status === 'Pending' ? 'bg-yellow-100' : 'bg-purple-100'
                }`}>
                  <i className={`fas fa-${
                    test.testType === 'Blood Test' ? 'droplet' :
                    test.testType === 'X-Ray' ? 'x' :
                    test.testType === 'MRI Scan' ? 'brain' :
                    test.testType === 'CT Scan' ? 'cube' : 'flask'
                  } ${
                    test.status === 'Completed' ? 'text-green-600' :
                    test.status === 'Processing' ? 'text-blue-600' :
                    test.status === 'Pending' ? 'text-yellow-600' : 'text-purple-600'
                  } text-xl`}></i>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-900">{test.patient}</h3>
                  <p className="text-sm text-gray-500 font-medium">{test.testType}</p>
                  <p className="text-xs text-gray-400 mt-1">{test.id}</p>
                  <div className="flex gap-6 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">👨‍⚕️</span>
                      <span>{test.doctor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">📅</span>
                      <span>{test.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status & Result Section */}
              <div className="text-right mr-4">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  test.status === 'Completed' ? 'bg-green-100 text-green-700' :
                  test.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                  test.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {test.status.toUpperCase()}
                </div>
              
               
                
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 items-center">
                <button 
                  onClick={() => handleViewReport(test.id)}
                  className="text-gray-500 hover:text-blue-600 p-2 rounded hover:bg-blue-50 transition-colors"
                  title="View Report"
                >
                  <i className="fas fa-eye text-lg"></i>
                </button>
                <button 
                  onClick={() => handleDownloadReport(test.id)}
                  className="text-gray-500 hover:text-green-600 p-2 rounded hover:bg-green-50 transition-colors"
                  title="Download Report"
                >
                  <i className="fas fa-download text-lg"></i>
                </button>
                <button 
                  onClick={() => handleDeleteTest(test.id)}
                  className="text-gray-500 hover:text-red-600 p-2 rounded hover:bg-red-50 transition-colors"
                  title="Delete Test"
                >
                  <i className="fas fa-trash text-lg"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Report Modal */}
      <Modal 
        isOpen={isViewModalOpen} 
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedTest(null)
        }} 
        title="Patient Report Information"
        size="lg"
      >
        {selectedTest && (
          <div className="space-y-6">
            {/* Patient Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-3">Patient Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-600">Patient Name</label>
                  <p className="text-sm font-medium text-gray-900">{selectedTest.patient}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-600">Test ID</label>
                  <p className="text-sm font-medium text-gray-900">{selectedTest.id}</p>
                </div>
              </div>
            </div>

            {/* Test Details */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-3">Test Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-600">Test Type</label>
                  <p className="text-sm font-medium text-gray-900">{selectedTest.testType}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-600">Referring Doctor</label>
                  <p className="text-sm font-medium text-gray-900">{selectedTest.doctor}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-600">Collection Date</label>
                  <p className="text-sm font-medium text-gray-900">{selectedTest.date}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-600">Sample Type</label>
                  <p className="text-sm font-medium text-gray-900">{selectedTest.sampleType || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Test Results */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-3">Test Results</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-600">Status</label>
                  <p className={`text-sm font-medium ${
                    selectedTest.status === 'Completed' ? 'text-green-600' :
                    selectedTest.status === 'Processing' ? 'text-blue-600' :
                    selectedTest.status === 'Pending' ? 'text-yellow-600' : 'text-gray-600'
                  }`}>
                    {selectedTest.status}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-600">Result</label>
                  <p className={`text-sm font-medium ${
                    selectedTest.result === 'Normal' ? 'text-green-600' :
                    selectedTest.result === 'Pending' ? 'text-yellow-600' :
                    selectedTest.result === 'Abnormal' ? 'text-orange-600' :
                    selectedTest.result === 'Critical' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {selectedTest.result}
                  </p>
                </div>
                
                <div>
                  <label className="text-xs text-gray-600">Report File</label>
                  <p className="text-sm font-medium text-gray-900">{selectedTest.reportFile || 'Not uploaded'}</p>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            {(selectedTest.instructions || selectedTest.notes) && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Additional Information</h3>
                {selectedTest.instructions && (
                  <div className="mb-3">
                    <label className="text-xs text-gray-600">Special Instructions</label>
                    <p className="text-sm text-gray-700">{selectedTest.instructions}</p>
                  </div>
                )}
                {selectedTest.notes && (
                  <div>
                    <label className="text-xs text-gray-600">Notes</label>
                    <p className="text-sm text-gray-700">{selectedTest.notes}</p>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              {selectedTest.reportFile && (
                <button
                  onClick={() => handleDownloadReport(selectedTest.id)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-download"></i>
                  Download Report
                </button>
              )}
              <button
                onClick={() => {
                  setIsViewModalOpen(false)
                  setSelectedTest(null)
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Test Modal - Defined in the same file */}
     
    </div>
  )
}

export default LabManagement