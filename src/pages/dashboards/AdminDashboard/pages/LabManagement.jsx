import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'
import Modal from '../../../../components/common/Modal/Modal' // Your existing modal component

const LabManagement = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('tests')
  const [labTests, setLabTests] = useState([])
  const [labEquipment, setLabEquipment] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false)
  const [selectedTest, setSelectedTest] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('')
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
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    type: '',
    model: '',
    serialNumber: '',
    manufacturer: '',
    purchaseDate: '',
    warrantyExpiry: '',
    location: '',
    status: 'Active',
    lastMaintenance: '',
    nextMaintenance: '',
    notes: ''
  })

  useEffect(() => {
    loadLabTests()
  }, [])

  const loadLabTests = async () => {
    setLoading(true)
    setTimeout(() => {
      setLabTests([
        { id: 'LAB-6001', patient: 'Ravi Kumar', patientId: 'P001', testType: 'Blood Test', result: 'Normal', date: '2023-10-10', reportFile: 'report_1.pdf', status: 'Completed', doctor: 'Dr. Meena Rao',  sampleType: 'Blood' },
        { id: 'LAB-6002', patient: 'Anita Sharma', patientId: 'P002', testType: 'MRI Scan', result: 'Normal', date: '2023-10-08', reportFile: 'report_2.pdf', status: 'Completed', doctor: 'Dr. Sharma',  sampleType: 'NA' },
        { id: 'LAB-6003', patient: 'Suresh Patel', patientId: 'P003', testType: 'X-Ray', result: 'Fracture Detected', date: '2023-10-12', reportFile: 'report_3.pdf', status: 'Processing', doctor: 'Dr. Menon',  sampleType: 'NA' },
        { id: 'LAB-6004', patient: 'Priya Singh', patientId: 'P004', testType: 'CT Scan', result: 'Pending', date: '2023-10-13', reportFile: '', status: 'Pending', doctor: 'Dr. Desai',  sampleType: 'NA' }
      ])
      setLabEquipment([
        { id: 'EQ-001', name: 'MRI Machine', type: 'Imaging', model: 'Siemens MAGNETOM', serialNumber: 'SN123456', manufacturer: 'Siemens', purchaseDate: '2022-01-15', warrantyExpiry: '2025-01-15', location: 'Room 101', status: 'Active', lastMaintenance: '2023-09-10', nextMaintenance: '2024-03-10', notes: 'Regular maintenance required' },
        { id: 'EQ-002', name: 'X-Ray Machine', type: 'Imaging', model: 'GE Healthcare', serialNumber: 'SN789012', manufacturer: 'GE', purchaseDate: '2021-06-20', warrantyExpiry: '2024-06-20', location: 'Room 102', status: 'Maintenance', lastMaintenance: '2023-10-05', nextMaintenance: '2023-11-05', notes: 'Under maintenance' },
        { id: 'EQ-003', name: 'Blood Analyzer', type: 'Laboratory', model: 'Sysmex XN-1000', serialNumber: 'SN345678', manufacturer: 'Sysmex', purchaseDate: '2022-03-10', warrantyExpiry: '2025-03-10', location: 'Lab 1', status: 'Active', lastMaintenance: '2023-08-15', nextMaintenance: '2024-02-15', notes: 'High precision equipment' },
        { id: 'EQ-004', name: 'Ultrasound Machine', type: 'Imaging', model: 'Philips EPIQ', serialNumber: 'SN901234', manufacturer: 'Philips', purchaseDate: '2020-11-30', warrantyExpiry: '2023-11-30', location: 'Room 103', status: 'Out of Service', lastMaintenance: '2023-07-20', nextMaintenance: '2023-10-20', notes: 'Needs repair' }
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

  const handleAddEquipment = () => {
    const equipment = {
      id: `EQ-${String(labEquipment.length + 1).padStart(3, '0')}`,
      name: newEquipment.name,
      type: newEquipment.type,
      model: newEquipment.model,
      serialNumber: newEquipment.serialNumber,
      manufacturer: newEquipment.manufacturer,
      purchaseDate: newEquipment.purchaseDate,
      warrantyExpiry: newEquipment.warrantyExpiry,
      location: newEquipment.location,
      status: newEquipment.status,
      lastMaintenance: newEquipment.lastMaintenance,
      nextMaintenance: newEquipment.nextMaintenance,
      notes: newEquipment.notes
    }
    
    setLabEquipment(prev => [equipment, ...prev])
    setIsEquipmentModalOpen(false)
    resetEquipmentForm()
  }

  const handleUpdateEquipmentStatus = (equipmentId, newStatus) => {
    setLabEquipment(prev => prev.map(equipment => 
      equipment.id === equipmentId ? { ...equipment, status: newStatus } : equipment
    ))
  }

  const resetEquipmentForm = () => {
    setNewEquipment({
      name: '',
      type: '',
      model: '',
      serialNumber: '',
      manufacturer: '',
      purchaseDate: '',
      warrantyExpiry: '',
      location: '',
      status: 'Active',
      lastMaintenance: '',
      nextMaintenance: '',
      notes: ''
    })
  }

  const handleEquipmentInputChange = (field, value) => {
    setNewEquipment(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getFilteredTests = () => {
    let filtered = labTests

    // Apply status filter
    if (selectedFilter !== 'All') {
      filtered = filtered.filter(test => test.status === selectedFilter)
    }

    // Apply date filter
    if (dateFilter) {
      filtered = filtered.filter(test => test.date === dateFilter)
    }

    // Apply search filter (name, test ID, test name)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(test =>
        test.patient.toLowerCase().includes(query) ||
        test.patientId.toLowerCase().includes(query) ||
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

  // Equipment constants
  const equipmentTypes = [
    'Imaging',
    'Laboratory',
    'Surgical',
    'Monitoring',
    'Therapeutic',
    'Diagnostic'
  ]

  const manufacturers = [
    'Siemens',
    'GE Healthcare',
    'Philips',
    'Sysmex',
    'Roche',
    'Abbott',
    'Thermo Fisher',
    'Beckman Coulter'
  ]

  const equipmentStatuses = [
    'Active',
    'Maintenance',
    'Out of Service',
    'Decommissioned'
  ]

return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">
          Lab Management
        </h2>
        <button 
          onClick={() => activeTab === 'tests' ? setIsAddModalOpen(true) : setIsEquipmentModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <i className="fas fa-plus mr-2"></i>
          {activeTab === 'tests' ? 'Add Lab Test' : 'Add Equipment'}
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('tests')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === 'tests'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <i className="fas fa-flask mr-2"></i>
          Lab Test Reports
        </button>
        <button
          onClick={() => setActiveTab('equipment')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === 'equipment'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <i className="fas fa-cogs mr-2"></i>
          Lab Equipment
        </button>
      </div>

      {activeTab === 'tests' ? (
        <>
          {/* Lab Test Reports Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Search & Filter Lab Tests</h3>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="Search by patient name, ID, or test type..." 
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all pl-11"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="fas fa-search absolute left-3 top-3.5 text-gray-400"></i>
              </div>
              <div className="w-full lg:w-48 relative">
                <input
                  type="date"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
              <div className="w-full lg:w-48 relative">
                <select 
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all appearance-none pr-10"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <i className="fas fa-chevron-down absolute right-3 top-3.5 text-gray-400 pointer-events-none"></i>
              </div>
            </div>
          </div>

          {/* Lab Tests Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Lab Test Reports</h3>
                <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                  {filteredTests.length} Tests
                </span>
              </div>
            </div>
            <DataTable
              columns={[
                { key: 'patientId', title: 'Patient ID', sortable: true },
                { key: 'patient', title: 'Patient Name', sortable: true },
                { 
                  key: 'status', 
                  title: 'Status', 
                  sortable: true,
                  render: (value) => (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      value === 'Completed' ? 'bg-green-100 text-green-800' :
                      value === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      value === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {value}
                    </span>
                  )
                },
                {
                  key: 'actions',
                  title: 'View Details',
                  render: (_, row) => (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewReport(row.id)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-all duration-200"
                        title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </div>
                  )
                },
                {
                  key: 'quickActions',
                  title: 'Quick Actions',
                  render: (_, row) => (
                    <div className="flex gap-1">
                      {row.status !== 'Completed' && (
                        <button 
                          onClick={() => handleUpdateStatus(row.id, 'Completed')}
                          className="text-green-600 hover:text-green-700 hover:bg-green-50 px-2 py-1 rounded text-xs transition-all duration-200"
                          title="Mark as Completed"
                        >
                          ✓
                        </button>
                      )}
                      {row.status === 'Pending' && (
                        <button 
                          onClick={() => handleUpdateStatus(row.id, 'Processing')}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded text-xs transition-all duration-200"
                          title="Mark as Processing"
                        >
                          ⟳
                        </button>
                      )}
                      <button 
                        onClick={() => handleDownloadReport(row.id)}
                        className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 px-2 py-1 rounded text-xs transition-all duration-200"
                        title="Download Report"
                      >
                        ↓
                      </button>
                    </div>
                  )
                }
              ]}
              data={filteredTests}
            />
          </div>
        </>
      ) : (
        <>
          {/* Lab Equipment Management Section */}
          
          {/* Equipment KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { 
                value: labEquipment.length, 
                label: 'Total Equipment', 
                color: 'blue', 
                icon: 'fas fa-cogs',
                bg: 'bg-blue-50',
                text: 'text-blue-600',
                iconBg: 'bg-blue-100'
              },
              { 
                value: labEquipment.filter(e => e.status === 'Active').length, 
                label: 'Active', 
                color: 'green', 
                icon: 'fas fa-check-circle',
                bg: 'bg-green-50',
                text: 'text-green-600',
                iconBg: 'bg-green-100'
              },
              { 
                value: labEquipment.filter(e => e.status === 'Maintenance').length, 
                label: 'Maintenance', 
                color: 'yellow', 
                icon: 'fas fa-tools',
                bg: 'bg-yellow-50',
                text: 'text-yellow-600',
                iconBg: 'bg-yellow-100'
              },
              { 
                value: labEquipment.filter(e => e.status === 'Out of Service').length, 
                label: 'Out of Service', 
                color: 'red', 
                icon: 'fas fa-exclamation-triangle',
                bg: 'bg-red-50',
                text: 'text-red-600',
                iconBg: 'bg-red-100'
              }
            ].map((stat, index) => (
              <div 
                key={index} 
                className={`${stat.bg} border border-gray-200 p-5 rounded-xl hover:shadow-md transition-all duration-300`}
              >
                <div className="flex items-center gap-3">
                  <div className={`${stat.iconBg} p-3 rounded-lg`}>
                    <i className={`${stat.icon} ${stat.text} text-lg`}></i>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${stat.text}`}>{stat.value}</div>
                    <div className="text-gray-800 font-medium text-sm">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Equipment Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Lab Equipment</h3>
                <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                  {labEquipment.length} Equipment
                </span>
              </div>
            </div>
            <DataTable
              columns={[
                { key: 'id', title: 'Equipment ID', sortable: true },
                { key: 'name', title: 'Equipment Name', sortable: true },
                { key: 'type', title: 'Type', sortable: true },
                { key: 'manufacturer', title: 'Manufacturer', sortable: true },
                { key: 'location', title: 'Location', sortable: true },
                { 
                  key: 'status', 
                  title: 'Status', 
                  sortable: true,
                  render: (value) => (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      value === 'Active' ? 'bg-green-100 text-green-800' :
                      value === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      value === 'Out of Service' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {value}
                    </span>
                  )
                },
                {
                  key: 'actions',
                  title: 'Actions',
                  render: (_, row) => (
                    <div className="flex gap-2">
                      {row.status !== 'Active' && (
                        <button 
                          onClick={() => handleUpdateEquipmentStatus(row.id, 'Active')}
                          className="text-green-600 hover:text-green-700 hover:bg-green-50 p-2 rounded-lg transition-all duration-200"
                          title="Mark as Active"
                        >
                          <i className="fas fa-check"></i>
                        </button>
                      )}
                      {row.status !== 'Maintenance' && (
                        <button 
                          onClick={() => handleUpdateEquipmentStatus(row.id, 'Maintenance')}
                          className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 p-2 rounded-lg transition-all duration-200"
                          title="Mark as Maintenance"
                        >
                          <i className="fas fa-tools"></i>
                        </button>
                      )}
                      {row.status !== 'Out of Service' && (
                        <button 
                          onClick={() => handleUpdateEquipmentStatus(row.id, 'Out of Service')}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                          title="Mark as Out of Service"
                        >
                          <i className="fas fa-exclamation-triangle"></i>
                        </button>
                      )}
                    </div>
                  )
                }
              ]}
              data={labEquipment}
            />
          </div>
        </>
      )}

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

      {/* Add Test Modal */}
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
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name <span className="text-red-500">*</span>
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
                Test Type <span className="text-red-500">*</span>
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
                Referring Doctor <span className="text-red-500">*</span>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Collection Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={newTest.collectionDate}
                onChange={(e) => handleInputChange('collectionDate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={newTest.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

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
          </div>

          {/* Instructions and Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Instructions
              </label>
              <textarea
                rows="3"
                value={newTest.instructions}
                onChange={(e) => handleInputChange('instructions', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter special instructions..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                rows="3"
                value={newTest.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Additional notes..."
              />
            </div>
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
              disabled={!newTest.patient || !newTest.testType || !newTest.doctor || !newTest.collectionDate}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>
              Add Lab Test
            </button>
          </div>
        </div>
      </Modal>

      {/* Add Equipment Modal */}
      <Modal 
        isOpen={isEquipmentModalOpen} 
        onClose={() => {
          setIsEquipmentModalOpen(false)
          resetEquipmentForm()
        }} 
        title="Add New Equipment"
        size="lg"
      >
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Equipment Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={newEquipment.name}
                onChange={(e) => handleEquipmentInputChange('name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter equipment name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={newEquipment.type}
                onChange={(e) => handleEquipmentInputChange('type', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Type</option>
                {equipmentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={newEquipment.model}
                onChange={(e) => handleEquipmentInputChange('model', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter model name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Serial Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={newEquipment.serialNumber}
                onChange={(e) => handleEquipmentInputChange('serialNumber', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter serial number"
              />
            </div>
          </div>

          {/* Manufacturer and Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Manufacturer <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={newEquipment.manufacturer}
                onChange={(e) => handleEquipmentInputChange('manufacturer', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Manufacturer</option>
                {manufacturers.map(manufacturer => (
                  <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={newEquipment.location}
                onChange={(e) => handleEquipmentInputChange('location', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter location"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purchase Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={newEquipment.purchaseDate}
                onChange={(e) => handleEquipmentInputChange('purchaseDate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Warranty Expiry
              </label>
              <input
                type="date"
                value={newEquipment.warrantyExpiry}
                onChange={(e) => handleEquipmentInputChange('warrantyExpiry', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Maintenance and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={newEquipment.status}
                onChange={(e) => handleEquipmentInputChange('status', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                {equipmentStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Maintenance
              </label>
              <input
                type="date"
                value={newEquipment.lastMaintenance}
                onChange={(e) => handleEquipmentInputChange('lastMaintenance', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Next Maintenance
              </label>
              <input
                type="date"
                value={newEquipment.nextMaintenance}
                onChange={(e) => handleEquipmentInputChange('nextMaintenance', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              rows="3"
              value={newEquipment.notes}
              onChange={(e) => handleEquipmentInputChange('notes', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Additional notes about the equipment..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => {
                setIsEquipmentModalOpen(false)
                resetEquipmentForm()
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddEquipment}
              disabled={!newEquipment.name || !newEquipment.type || !newEquipment.model || !newEquipment.serialNumber || !newEquipment.manufacturer || !newEquipment.location || !newEquipment.purchaseDate}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>
              Add Equipment
            </button>
          </div>
        </div>
      </Modal>
     
    </div>
  )
}

export default LabManagement