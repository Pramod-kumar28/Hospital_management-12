import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'
import Modal from '../../../../components/common/Modal/Modal' // Your existing modal component

const LabManagement = () => {
  const [loading, setLoading] = useState(true)
  const [labTests, setLabTests] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
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
        { id: 'LAB-6001', patient: 'Ravi Kumar', testType: 'Blood Test', result: 'Normal', date: '2023-10-10', reportFile: 'report_1.pdf', status: 'Completed', doctor: 'Dr. Meena Rao', priority: 'Normal', sampleType: 'Blood' },
        { id: 'LAB-6002', patient: 'Anita Sharma', testType: 'MRI Scan', result: 'Normal', date: '2023-10-08', reportFile: 'report_2.pdf', status: 'Completed', doctor: 'Dr. Sharma', priority: 'Normal', sampleType: 'NA' },
        { id: 'LAB-6003', patient: 'Suresh Patel', testType: 'X-Ray', result: 'Fracture Detected', date: '2023-10-12', reportFile: 'report_3.pdf', status: 'Processing', doctor: 'Dr. Menon', priority: 'Urgent', sampleType: 'NA' },
        { id: 'LAB-6004', patient: 'Priya Singh', testType: 'CT Scan', result: 'Pending', date: '2023-10-13', reportFile: '', status: 'Pending', doctor: 'Dr. Desai', priority: 'Normal', sampleType: 'NA' }
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
    if (test && test.reportFile) {
      alert(`Opening report: ${test.reportFile}`)
      // In real app, this would open the PDF file
    } else {
      alert('Report not available yet')
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

  const priorities = [
    'Normal',
    'Urgent',
    'Emergency'
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
          🧬 Lab Management
        </h2>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <i className="fas fa-plus mr-2"></i>Add Test
        </button>
      </div>

      {/* Lab Statistics */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-blue-600">{labTests.length}</div>
          <div className="text-sm text-gray-500">Total Tests</div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-green-600">{labTests.filter(t => t.status === 'Completed').length}</div>
          <div className="text-sm text-gray-500">Completed</div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-yellow-600">{labTests.filter(t => t.status === 'Processing').length}</div>
          <div className="text-sm text-gray-500">Processing</div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-red-600">{labTests.filter(t => t.status === 'Pending').length}</div>
          <div className="text-sm text-gray-500">Pending</div>
        </div>
      </div> */}

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

      {/* Lab Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labTests.map(test => (
          <div key={test.id} className="bg-white rounded-xl card-shadow border p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-blue-700">{test.testType}</h3>
                <p className="text-xs text-gray-500">{test.id}</p>
              </div>
              <span className={`status-${test.status.toLowerCase()} px-2 py-1 rounded text-xs`}>
                {test.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex justify-between">
                <span>Patient:</span>
                <span className="font-medium">{test.patient}</span>
              </div>
              <div className="flex justify-between">
                <span>Doctor:</span>
                <span className="text-gray-500">{test.doctor}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="text-gray-500">{test.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Priority:</span>
                <span className={`font-medium ${
                  test.priority === 'Emergency' ? 'text-red-600' : 
                  test.priority === 'Urgent' ? 'text-orange-600' : 'text-green-600'
                }`}>
                  {test.priority}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Result:</span>
                <span className={`font-medium ${
                  test.result === 'Normal' ? 'text-green-600' : 
                  test.result === 'Pending' ? 'text-yellow-600' : 
                  test.result === 'Abnormal' ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {test.result}
                </span>
              </div>
              {test.sampleType && test.sampleType !== 'NA' && (
                <div className="flex justify-between">
                  <span>Sample:</span>
                  <span className="text-gray-500">{test.sampleType}</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                {test.testType}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleViewReport(test.id)}
                  className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                  title="View Report"
                >
                  <i className="fas fa-eye"></i>
                </button>
                <button 
                  onClick={() => handleDownloadReport(test.id)}
                  className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                  title="Download Report"
                >
                  <i className="fas fa-download"></i>
                </button>
                <div className="relative group">
                  <button className="text-purple-600 hover:text-purple-800 p-1 rounded hover:bg-purple-50">
                    <i className="fas fa-edit"></i>
                  </button>
                  <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-white border rounded-lg shadow-lg z-10 p-2 min-w-32">
                    <div className="space-y-1">
                      <select 
                        value={test.status}
                        onChange={(e) => handleUpdateStatus(test.id, e.target.value)}
                        className="w-full p-1 text-xs border rounded"
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                      <select 
                        value={test.result}
                        onChange={(e) => handleUpdateResult(test.id, e.target.value)}
                        className="w-full p-1 text-xs border rounded"
                      >
                        {resultOptions.map(result => (
                          <option key={result} value={result}>{result}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteTest(test.id)}
                  className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                  title="Delete Test"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Test Modal - Defined in the same file */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => {
          setIsAddModalOpen(false)
          resetForm()
        }} 
        title="Add New Lab Test"
        size="lg"
      >
        <div className="space-y-6">
          {/* Patient and Doctor Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Patient *
              </label>
              <select
                required
                value={newTest.patient}
                onChange={(e) => handleInputChange('patient', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Patient</option>
                {patients.map(patient => (
                  <option key={patient} value={patient}>{patient}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Referring Doctor *
              </label>
              <select
                required
                value={newTest.doctor}
                onChange={(e) => handleInputChange('doctor', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Doctor</option>
                {doctors.map(doctor => (
                  <option key={doctor} value={doctor}>{doctor}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Test Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Test Type *
              </label>
              <select
                required
                value={newTest.testType}
                onChange={(e) => handleInputChange('testType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Test Type</option>
                {testTypes.map(testType => (
                  <option key={testType} value={testType}>{testType}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority *
              </label>
              <select
                required
                value={newTest.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sample and Collection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sample Type
              </label>
              <select
                value={newTest.sampleType}
                onChange={(e) => handleInputChange('sampleType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Sample Type</option>
                {sampleTypes.map(sampleType => (
                  <option key={sampleType} value={sampleType}>{sampleType}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Collection Date *
              </label>
              <input
                type="date"
                required
                value={newTest.collectionDate}
                onChange={(e) => handleInputChange('collectionDate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Instructions and Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Instructions
            </label>
            <textarea
              rows="2"
              value={newTest.instructions}
              onChange={(e) => handleInputChange('instructions', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Any special instructions for sample collection or testing..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              rows="2"
              value={newTest.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Any additional notes or observations..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false)
                resetForm()
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddTest}
              disabled={!newTest.patient || !newTest.doctor || !newTest.testType || !newTest.collectionDate}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <i className="fas fa-flask mr-2"></i>
              Add Test
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default LabManagement