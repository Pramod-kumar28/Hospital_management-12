import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const TestResults = () => {
  const [loading, setLoading] = useState(true)
  const [testResults, setTestResults] = useState([])
  const [selectedTest, setSelectedTest] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadTestResults()
  }, [])

  const loadTestResults = async () => {
    setLoading(true)
    setTimeout(() => {
      setTestResults([
        {
          id: 'LAB-1001',
          testName: 'Complete Blood Count (CBC)',
          date: '2023-10-10',
          lab: 'Central Pathology Lab',
          status: 'Completed',
          result: 'Normal',
          doctor: 'Dr. Meena Rao',
          parameters: [
            { name: 'Hemoglobin', value: '14.2 g/dL', normalRange: '13.5-17.5', status: 'normal' },
            { name: 'White Blood Cells', value: '7.8 ×10³/µL', normalRange: '4.5-11.0', status: 'normal' },
            { name: 'Platelets', value: '250 ×10³/µL', normalRange: '150-450', status: 'normal' }
          ],
          notes: 'All parameters within normal range.'
        },
        {
          id: 'LAB-1002',
          testName: 'Blood Sugar Fasting',
          date: '2023-10-10',
          lab: 'Central Pathology Lab',
          status: 'Completed',
          result: 'Normal',
          doctor: 'Dr. Meena Rao',
          parameters: [
            { name: 'Fasting Glucose', value: '98 mg/dL', normalRange: '70-100', status: 'normal' }
          ],
          notes: 'Fasting blood sugar is normal.'
        },
        {
          id: 'LAB-1003',
          testName: 'Lipid Profile',
          date: '2023-10-10',
          lab: 'Central Pathology Lab',
          status: 'Completed',
          result: 'Borderline',
          doctor: 'Dr. Meena Rao',
          parameters: [
            { name: 'Total Cholesterol', value: '201 mg/dL', normalRange: '<200', status: 'high' },
            { name: 'HDL (Good)', value: '42 mg/dL', normalRange: '>40', status: 'normal' },
            { name: 'LDL (Bad)', value: '135 mg/dL', normalRange: '<100', status: 'high' },
            { name: 'Triglycerides', value: '150 mg/dL', normalRange: '<150', status: 'borderline' }
          ],
          notes: 'Cholesterol levels slightly elevated. Consider dietary changes.'
        },
        {
          id: 'LAB-1004',
          testName: 'Thyroid Profile (TSH)',
          date: '2023-09-20',
          lab: 'Endocrine Lab',
          status: 'Completed',
          result: 'Normal',
          doctor: 'Dr. Gupta',
          parameters: [
            { name: 'TSH', value: '2.1 µIU/mL', normalRange: '0.4-4.0', status: 'normal' }
          ],
          notes: 'Thyroid function is normal.'
        }
      ])
      setLoading(false)
    }, 1000)
  }

  const handleViewDetails = (test) => {
    setSelectedTest(test)
  }

  const handleDownload = (testId) => {
    alert(`Downloading test report ${testId}...`)
  }

  const handleShare = (testId) => {
    alert(`Sharing test report ${testId}`)
  }

  const getResultColor = (result) => {
    switch(result.toLowerCase()) {
      case 'normal': return 'bg-green-100 text-green-800'
      case 'borderline': return 'bg-yellow-100 text-yellow-800'
      case 'abnormal': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredTests = filter === 'all' 
    ? testResults 
    : testResults.filter(test => test.result.toLowerCase() === filter)

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700"> Test Results</h2>
          <p className="text-gray-500 text-sm mt-1">View and download your lab test reports</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
            <i className="fas fa-download mr-2"></i>Download All
          </button>
          <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium">
            <i className="fas fa-print mr-2"></i>Print Reports
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

  {/* Total Tests */}
  <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
    <div className="w-1.5 bg-blue-600"></div>

    <div className="flex items-center gap-4 p-4 w-full">
      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
        <i className="fas fa-vials text-blue-600"></i>
      </div>

      <div>
        <p className="text-sm text-gray-500">Total Tests</p>
        <p className="text-2xl font-bold text-gray-900">
          {testResults.length}
        </p>
      </div>
    </div>
  </div>

  {/* Normal */}
  <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
    <div className="w-1.5 bg-green-600"></div>

    <div className="flex items-center gap-4 p-4 w-full">
      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
        <i className="fas fa-check-circle text-green-600"></i>
      </div>

      <div>
        <p className="text-sm text-gray-500">Normal Results</p>
        <p className="text-2xl font-bold text-gray-900">
          {testResults.filter(t => t.result === 'Normal').length}
        </p>
      </div>
    </div>
  </div>

  {/* Borderline */}
  <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
    <div className="w-1.5 bg-yellow-500"></div>

    <div className="flex items-center gap-4 p-4 w-full">
      <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
        <i className="fas fa-exclamation-circle text-yellow-600"></i>
      </div>

      <div>
        <p className="text-sm text-gray-500">Borderline</p>
        <p className="text-2xl font-bold text-gray-900">
          {testResults.filter(t => t.result === 'Borderline').length}
        </p>
      </div>
    </div>
  </div>

  {/* Abnormal */}
  <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
    <div className="w-1.5 bg-red-600"></div>

    <div className="flex items-center gap-4 p-4 w-full">
      <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
        <i className="fas fa-times-circle text-red-600"></i>
      </div>

      <div>
        <p className="text-sm text-gray-500">Abnormal</p>
        <p className="text-2xl font-bold text-gray-900">
          {testResults.filter(t => t.result === 'Abnormal').length}
        </p>
      </div>
    </div>
  </div>

</div>


      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${
            filter === 'all' 
              ? 'bg-blue-100 text-blue-700 border border-blue-200' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Tests
        </button>
        <button
          onClick={() => setFilter('normal')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${
            filter === 'normal' 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Normal
        </button>
        <button
          onClick={() => setFilter('borderline')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${
            filter === 'borderline' 
              ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Borderline
        </button>
        <button
          onClick={() => setFilter('abnormal')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${
            filter === 'abnormal' 
              ? 'bg-red-100 text-red-700 border border-red-200' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Abnormal
        </button>
      </div>

      {/* Test Results List */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h3 className="font-semibold text-gray-800">All Test Reports</h3>
            <div className="flex items-center gap-2">
              <select className="border rounded-lg px-3 py-2 text-sm">
                <option>Sort by Date (Newest)</option>
                <option>Sort by Date (Oldest)</option>
                <option>Sort by Test Name</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase">Test Name</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase">Lab</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase">Result</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase">Doctor</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTests.map(test => (
                <tr key={test.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{test.testName}</p>
                      <p className="text-xs text-gray-500">ID: {test.id}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-700">{test.date}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-700">{test.lab}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getResultColor(test.result)}`}>
                      {test.result}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-700">{test.doctor}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewDetails(test)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button 
                        onClick={() => handleDownload(test.id)}
                        className="p-1 text-green-600 hover:text-green-800"
                        title="Download"
                      >
                        <i className="fas fa-download"></i>
                      </button>
                      <button 
                        onClick={() => handleShare(test.id)}
                        className="p-1 text-purple-600 hover:text-purple-800"
                        title="Share"
                      >
                        <i className="fas fa-share-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Test Details Modal */}
      {selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Test Report Details</h3>
                <button
                  onClick={() => setSelectedTest(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Header Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Report ID</p>
                    <p className="font-medium">{selectedTest.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Test Date</p>
                    <p className="font-medium">{selectedTest.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Result</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getResultColor(selectedTest.result)}`}>
                      {selectedTest.result}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTest.status)}`}>
                      {selectedTest.status}
                    </span>
                  </div>
                </div>
                
                {/* Test Info */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">Test Information</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">{selectedTest.testName}</p>
                      <p className="text-sm text-gray-600">Performed at: {selectedTest.lab}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Reviewed by</p>
                      <p className="font-medium">{selectedTest.doctor}</p>
                    </div>
                  </div>
                </div>
                
                {/* Test Parameters */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-4">Test Parameters</p>
                  <div className="space-y-3">
                    {selectedTest.parameters.map((param, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{param.name}</p>
                          <p className="text-xs text-gray-500">Normal range: {param.normalRange}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`font-medium ${
                            param.status === 'normal' ? 'text-green-600' :
                            param.status === 'borderline' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {param.value}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            param.status === 'normal' ? 'bg-green-100 text-green-800' :
                            param.status === 'borderline' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {param.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Doctor Notes */}
                {selectedTest.notes && (
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-500 mb-2">Doctor's Notes</p>
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                      <p className="text-gray-700">{selectedTest.notes}</p>
                    </div>
                  </div>
                )}
                
                {/* Recommendations */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">Recommendations</p>
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                    {selectedTest.result === 'Normal' ? (
                      <p className="text-green-700">All test results are within normal range. Continue with your current health regimen.</p>
                    ) : selectedTest.result === 'Borderline' ? (
                      <div className="space-y-2">
                        <p className="text-yellow-700">Some parameters are borderline. Recommended actions:</p>
                        <ul className="list-disc pl-5 text-sm text-yellow-700">
                          <li>Schedule follow-up with your doctor</li>
                          <li>Consider dietary modifications</li>
                          <li>Increase physical activity</li>
                          <li>Retest in 3 months</li>
                        </ul>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-red-700">Abnormal test results detected. Immediate action required:</p>
                        <ul className="list-disc pl-5 text-sm text-red-700">
                          <li>Contact your doctor immediately</li>
                          <li>Schedule urgent follow-up appointment</li>
                          <li>Follow prescribed medication regimen</li>
                          <li>Monitor symptoms closely</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t">
                  <button
                    onClick={() => handleDownload(selectedTest.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <i className="fas fa-download mr-2"></i>Download Report
                  </button>
                  <button
                    onClick={() => handleShare(selectedTest.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <i className="fas fa-share-alt mr-2"></i>Share Report
                  </button>
                  <button
                    onClick={() => setSelectedTest(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Close
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

export default TestResults