import React, { useState, useEffect } from 'react'
import DataTable from '../../../../components/ui/Tables/DataTable'
import SearchBar from '../../../../components/common/SearchBar/SearchBar'
import Button from '../../../../components/common/Button/Button'
import Modal from '../../../../components/common/Modal/Modal'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const TestRegistration = () => {
  const [loading, setLoading] = useState(true)
  const [tests, setTests] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [newTest, setNewTest] = useState({
    patientId: '',
    patientName: '',
    testType: '',
    priority: 'routine',
    sampleType: '',
    referringDoctor: '',
    instructions: ''
  })

  useEffect(() => {
    loadTestData()
  }, [])

  const loadTestData = async () => {
    setLoading(true)
    setTimeout(() => {
      const sampleData = [
        {
          id: 'TEST-2024-001',
          patientName: 'Rajesh Kumar',
          patientId: 'PAT-001',
          testType: 'CBC',
          sampleType: 'Blood',
          registeredDate: '2024-01-15',
          status: 'Sample Pending',
          priority: 'urgent',
          barcode: 'BC001'
        },
        {
          id: 'TEST-2024-002',
          patientName: 'Priya Sharma',
          patientId: 'PAT-002',
          testType: 'Lipid Profile',
          sampleType: 'Blood',
          registeredDate: '2024-01-15',
          status: 'Sample Collected',
          priority: 'routine',
          barcode: 'BC002'
        },
        {
          id: 'TEST-2024-003',
          patientName: 'Suresh Patel',
          patientId: 'PAT-003',
          testType: 'Urine Culture',
          sampleType: 'Urine',
          registeredDate: '2024-01-14',
          status: 'In Progress',
          priority: 'routine',
          barcode: 'BC003'
        },
        {
          id: 'TEST-2024-004',
          patientName: 'Anita Mehta',
          patientId: 'PAT-004',
          testType: 'Liver Function',
          sampleType: 'Blood',
          registeredDate: '2024-01-14',
          status: 'Completed',
          priority: 'urgent',
          barcode: 'BC004'
        }
      ]
      setTests(sampleData)
      setLoading(false)
    }, 1000)
  }

  const handleRegisterTest = () => {
    console.log('Registering new test:', newTest)
    // Generate barcode/QR code here
    const barcode = `BC${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`
    
    const testId = `TEST-${new Date().getFullYear()}-${(tests.length + 1).toString().padStart(3, '0')}`
    
    const newTestEntry = {
      id: testId,
      patientName: newTest.patientName,
      patientId: newTest.patientId || `PAT-${Math.floor(Math.random() * 1000)}`,
      testType: newTest.testType,
      sampleType: newTest.sampleType,
      registeredDate: new Date().toISOString().split('T')[0],
      status: 'Sample Pending',
      priority: newTest.priority,
      barcode: barcode
    }
    
    setTests([newTestEntry, ...tests])
    setShowRegistrationModal(false)
    setNewTest({
      patientId: '',
      patientName: '',
      testType: '',
      priority: 'routine',
      sampleType: '',
      referringDoctor: '',
      instructions: ''
    })
    
    alert(`Test registered successfully! Barcode: ${barcode}`)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleRowClick = (test) => {
    console.log('Test clicked:', test)
    alert(`Test Details: ${test.id}\nStatus: ${test.status}\nBarcode: ${test.barcode}`)
  }

  const handleGenerateBarcode = (testId) => {
    const test = tests.find(t => t.id === testId)
    if (test) {
      alert(`Generating barcode/QR for: ${test.id}\nBarcode: ${test.barcode}`)
      // In real app, this would open barcode/QR generation modal
    }
  }

  const handlePrintLabels = (testId) => {
    alert(`Printing labels for test: ${testId}`)
  }

  const filteredTests = tests.filter(test =>
    test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.testType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const testTypes = ['CBC', 'Lipid Profile', 'Liver Function', 'Kidney Function', 'Thyroid', 'Diabetes', 'Urine Culture', 'Blood Culture', 'COVID-19 RT-PCR', 'Dengue NS1']
  const sampleTypes = ['Blood', 'Urine', 'Stool', 'Sputum', 'CSF', 'Swab', 'Tissue']

  if (loading) return <LoadingSpinner />

  return (
    <>
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">🧪 Test Registration</h2>
          <p className="text-gray-500">Register new lab tests and manage test requests</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            icon="fas fa-print"
            onClick={() => alert('Bulk print labels feature')}
          >
            Print Labels
          </Button>
          <Button
            variant="primary"
            icon="fas fa-plus"
            onClick={() => setShowRegistrationModal(true)}
          >
            Register New Test
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded border card-shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search by patient name, test ID, or test type..."
              onSearch={handleSearch}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Status</option>
              <option value="pending">Sample Pending</option>
              <option value="collected">Sample Collected</option>
              <option value="progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="routine">Routine</option>
              <option value="stat">STAT</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tests Table */}
      <div className="bg-white rounded border card-shadow overflow-hidden">
        <DataTable
          columns={[
            { key: 'id', title: 'Test ID', sortable: true },
            { key: 'patientName', title: 'Patient Name', sortable: true },
            { key: 'testType', title: 'Test Type', sortable: true },
            { key: 'sampleType', title: 'Sample Type', sortable: true },
            { key: 'registeredDate', title: 'Registered Date', sortable: true },
            { 
              key: 'status', 
              title: 'Status', 
              sortable: true,
              render: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  value === 'Completed' ? 'bg-green-100 text-green-800' :
                  value === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  value === 'Sample Collected' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {value}
                </span>
              )
            },
            { 
              key: 'priority', 
              title: 'Priority', 
              sortable: true,
              render: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  value === 'urgent' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              )
            },
            {
              key: 'actions',
              title: 'Actions',
              render: (_, row) => (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleGenerateBarcode(row.id)
                    }}
                    className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                    title="Generate Barcode/QR"
                  >
                    <i className="fas fa-barcode mr-1"></i> Barcode
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePrintLabels(row.id)
                    }}
                    className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                  >
                    <i className="fas fa-print"></i>
                  </button>
                </div>
              )
            }
          ]}
          data={filteredTests}
          onRowClick={handleRowClick}
          emptyMessage="No tests found. Register a new test to get started."
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded border card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <i className="fas fa-vial text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Tests Today</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{tests.filter(t => t.registeredDate === new Date().toISOString().split('T')[0]).length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded border card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <i className="fas fa-check-circle text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Completed Tests</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{tests.filter(t => t.status === 'Completed').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded border card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg mr-4">
              <i className="fas fa-clock text-yellow-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{tests.filter(t => t.status === 'In Progress').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded border card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg mr-4">
              <i className="fas fa-exclamation-circle text-red-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Urgent Tests</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{tests.filter(t => t.priority === 'urgent').length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

        {/* Registration Modal */}
      <Modal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        title="Register New Test"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient ID
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter patient ID or search..."
                value={newTest.patientId}
                onChange={(e) => setNewTest({...newTest, patientId: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter patient name"
                value={newTest.patientName}
                onChange={(e) => setNewTest({...newTest, patientName: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Test Type
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTest.testType}
                onChange={(e) => setNewTest({...newTest, testType: e.target.value})}
                required
              >
                <option value="">Select test type</option>
                {testTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTest.priority}
                onChange={(e) => setNewTest({...newTest, priority: e.target.value})}
              >
                <option value="routine">Routine</option>
                <option value="urgent">Urgent</option>
                <option value="stat">STAT</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sample Type
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTest.sampleType}
                onChange={(e) => setNewTest({...newTest, sampleType: e.target.value})}
                required
              >
                <option value="">Select sample type</option>
                {sampleTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Referring Doctor
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Doctor's name"
                value={newTest.referringDoctor}
                onChange={(e) => setNewTest({...newTest, referringDoctor: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Instructions
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="Any special instructions for sample collection or testing..."
              value={newTest.instructions}
              onChange={(e) => setNewTest({...newTest, instructions: e.target.value})}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowRegistrationModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              icon="fas fa-vial"
              onClick={handleRegisterTest}
              disabled={!newTest.patientName || !newTest.testType || !newTest.sampleType}
            >
              Register Test
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default TestRegistration