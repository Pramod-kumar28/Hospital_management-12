import React, { useState, useEffect } from 'react'
import DataTable from '../../../../components/ui/Tables/DataTable'
import SearchBar from '../../../../components/common/SearchBar/SearchBar'
import Button from '../../../../components/common/Button/Button'
import Modal from '../../../../components/common/Modal/Modal'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const SampleTracking = () => {
  const [loading, setLoading] = useState(true)
  const [samples, setSamples] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showScannerModal, setShowScannerModal] = useState(false)
  const [scannedCode, setScannedCode] = useState('')
  const [currentSample, setCurrentSample] = useState(null)

  useEffect(() => {
    loadSampleData()
  }, [])

  const loadSampleData = async () => {
    setLoading(true)
    setTimeout(() => {
      const sampleData = [
        {
          id: 'SAMP-001',
          testId: 'TEST-2024-001',
          barcode: 'BC001',
          patientName: 'Rajesh Kumar',
          testType: 'CBC',
          sampleType: 'Blood',
          collectionTime: '2024-01-15 09:30',
          collectedBy: 'Nurse Rani',
          status: 'Collected',
          location: 'Collection Room',
          nextAction: 'Transfer to Lab',
          temperature: '24°C',
          qrCode: 'qr-code-001'
        },
        {
          id: 'SAMP-002',
          testId: 'TEST-2024-002',
          barcode: 'BC002',
          patientName: 'Priya Sharma',
          testType: 'Lipid Profile',
          sampleType: 'Blood',
          collectionTime: '2024-01-15 10:15',
          collectedBy: 'Dr. Verma',
          status: 'In Transit',
          location: 'Corridor A',
          nextAction: 'Receive at Lab',
          temperature: '22°C',
          qrCode: 'qr-code-002'
        },
        {
          id: 'SAMP-003',
          testId: 'TEST-2024-003',
          barcode: 'BC003',
          patientName: 'Suresh Patel',
          testType: 'Urine Culture',
          sampleType: 'Urine',
          collectionTime: '2024-01-14 14:45',
          collectedBy: 'Lab Tech Ravi',
          status: 'In Lab',
          location: 'Microbiology Lab',
          nextAction: 'Processing',
          temperature: '25°C',
          qrCode: 'qr-code-003'
        },
        {
          id: 'SAMP-004',
          testId: 'TEST-2024-004',
          barcode: 'BC004',
          patientName: 'Anita Mehta',
          testType: 'Liver Function',
          sampleType: 'Blood',
          collectionTime: '2024-01-14 11:20',
          collectedBy: 'Nurse Sonia',
          status: 'Processed',
          location: 'Chemistry Lab',
          nextAction: 'Storage',
          temperature: '4°C',
          qrCode: 'qr-code-004'
        }
      ]
      setSamples(sampleData)
      setLoading(false)
    }, 1000)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleScanBarcode = () => {
    setShowScannerModal(true)
  }

  const simulateBarcodeScan = () => {
    const randomBarcode = `BC${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
    setScannedCode(randomBarcode)
    
    // Find sample by barcode
    const foundSample = samples.find(s => s.barcode === randomBarcode)
    if (foundSample) {
      setCurrentSample(foundSample)
      alert(`Sample found: ${foundSample.id}\nPatient: ${foundSample.patientName}`)
    } else {
      alert(`Sample with barcode ${randomBarcode} not found`)
    }
    
    setTimeout(() => setShowScannerModal(false), 2000)
  }

  const updateSampleStatus = (sampleId, newStatus, location) => {
    setSamples(samples.map(sample => 
      sample.id === sampleId 
        ? { ...sample, status: newStatus, location: location || sample.location }
        : sample
    ))
    alert(`Sample ${sampleId} status updated to: ${newStatus}`)
  }

  const handleRowClick = (sample) => {
    console.log('Sample clicked:', sample)
    setCurrentSample(sample)
  }

  const handlePrintLabel = (sampleId) => {
    const sample = samples.find(s => s.id === sampleId)
    if (sample) {
      alert(`Printing label for sample: ${sample.id}\nBarcode: ${sample.barcode}`)
    }
  }

  const handleViewQR = (sampleId) => {
    const sample = samples.find(s => s.id === sampleId)
    if (sample) {
      alert(`QR Code for ${sample.id}:\nPatient: ${sample.patientName}\nTest: ${sample.testType}`)
      // In real app, show QR code modal
    }
  }

  const filteredSamples = samples.filter(sample =>
    sample.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sample.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sample.testId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const statusOptions = {
    'Pending': { color: 'bg-gray-100 text-gray-800' },
    'Collected': { color: 'bg-blue-100 text-blue-800' },
    'In Transit': { color: 'bg-yellow-100 text-yellow-800' },
    'In Lab': { color: 'bg-purple-100 text-purple-800' },
    'Processing': { color: 'bg-indigo-100 text-indigo-800' },
    'Processed': { color: 'bg-green-100 text-green-800' },
    'Storage': { color: 'bg-teal-100 text-teal-800' },
    'Disposed': { color: 'bg-red-100 text-red-800' }
  }

  if (loading) return <LoadingSpinner />

  return (
    <>
        <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Sample Tracking</h2>
          <p className="text-gray-500">Track samples with barcode/QR  code support throughout the testing process</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            icon="fas fa-qrcode"
            onClick={handleScanBarcode}
          >
            Scan Barcode/QR
          </Button>
          <Button
            variant="primary"
            icon="fas fa-sync-alt"
            onClick={loadSampleData}
          >
            Refresh Tracking
          </Button>
        </div>
      </div>

      {/* Search and Scanner */}
      <div className="bg-white p-4 rounded border card-shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search by barcode, patient name, or test ID..."
              onSearch={handleSearch}
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <i className="fas fa-info-circle"></i>
            <span>Scan or enter barcode to track sample</span>
          </div>
        </div>
      </div>

      {/* Current Sample Info (if scanned) */}
      {currentSample && (
        <div className="bg-white p-4 rounded border card-shadow border-blue-300">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Currently Tracked Sample</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                <div>
                  <p className="text-sm text-gray-500">Sample ID</p>
                  <p className="font-medium">{currentSample.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Patient</p>
                  <p className="font-medium">{currentSample.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${statusOptions[currentSample.status]?.color || 'bg-gray-100'}`}>
                    {currentSample.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{currentSample.location}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setCurrentSample(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      {/* Samples Table */}
      <div className="bg-white rounded border card-shadow overflow-hidden">
        <DataTable
          columns={[
            { key: 'barcode', title: 'Barcode', sortable: true },
            { key: 'testId', title: 'Test ID', sortable: true },
            { key: 'patientName', title: 'Patient', sortable: true },
            { key: 'testType', title: 'Test Type', sortable: true },
            { key: 'sampleType', title: 'Sample Type', sortable: true },
            { key: 'collectionTime', title: 'Collection Time', sortable: true },
            { 
              key: 'status', 
              title: 'Status', 
              sortable: true,
              render: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  statusOptions[value]?.color || 'bg-gray-100'
                }`}>
                  {value}
                </span>
              )
            },
            { key: 'location', title: 'Current Location', sortable: true },
            {
              key: 'actions',
              title: 'Actions',
              render: (_, row) => (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewQR(row.id)
                    }}
                    className="px-3 py-1 text-xs bg-purple-100 text-purple-800 rounded hover:bg-purple-200"
                    title="View QR Code"
                  >
                    <i className="fas fa-qrcode"></i>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePrintLabel(row.id)
                    }}
                    className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                    title="Print Label"
                  >
                    <i className="fas fa-print"></i>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      updateSampleStatus(row.id, 'Processed', 'Storage')
                    }}
                    className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200"
                    title="Mark as Processed"
                  >
                    <i className="fas fa-check"></i>
                  </button>
                </div>
              )
            }
          ]}
          data={filteredSamples}
          onRowClick={handleRowClick}
          emptyMessage="No samples found. Start by registering tests."
        />
      </div>

      {/* Sample Tracking Timeline */}
      <div className="bg-white p-6 rounded border card-shadow">
        <h3 className="text-lg font-semibold mb-4">Sample Journey - {currentSample?.patientName || 'Select a sample'}</h3>
        {currentSample ? (
          <div className="relative">
            {/* Timeline */}
            <div className="flex justify-between items-center mb-8">
              {['Collection', 'Transit', 'Lab Receipt', 'Processing', 'Storage'].map((stage, index) => (
                <div key={stage} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    index <= 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium">{stage}</span>
                  <span className="text-xs text-gray-500 mt-1">
                    {index === 0 ? currentSample.collectionTime.split(' ')[1] : ''}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Sample Details Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Temperature</p>
                <p className="text-xl font-bold">{currentSample.temperature}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Collected By</p>
                <p className="font-medium">{currentSample.collectedBy}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Action</p>
                <p className="font-medium">{currentSample.nextAction}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">Select a sample from the table to view its tracking journey</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          className="p-4 bg-white border rounded-lg hover:bg-blue-50 transition-colors text-center group"
          onClick={() => updateSampleStatus(samples[0]?.id, 'Collected', 'Collection Room')}
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200">
            <i className="fas fa-syringe text-blue-600 text-xl"></i>
          </div>
          <p className="font-medium">Mark Collected</p>
        </button>
        
        <button 
          className="p-4 bg-white border rounded-lg hover:bg-green-50 transition-colors text-center group"
          onClick={() => updateSampleStatus(samples[0]?.id, 'In Transit', 'In Transit')}
        >
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200">
            <i className="fas fa-truck text-green-600 text-xl"></i>
          </div>
          <p className="font-medium">Mark In Transit</p>
        </button>
        
        <button 
          className="p-4 bg-white border rounded-lg hover:bg-purple-50 transition-colors text-center group"
          onClick={() => updateSampleStatus(samples[0]?.id, 'Processing', 'Chemistry Lab')}
        >
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200">
            <i className="fas fa-flask text-purple-600 text-xl"></i>
          </div>
          <p className="font-medium">Start Processing</p>
        </button>
        
        <button 
          className="p-4 bg-white border rounded-lg hover:bg-teal-50 transition-colors text-center group"
          onClick={() => updateSampleStatus(samples[0]?.id, 'Processed', 'Storage')}
        >
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-200">
            <i className="fas fa-check-circle text-teal-600 text-xl"></i>
          </div>
          <p className="font-medium">Complete Test</p>
        </button>
      </div>

     
    </div>

         {/* Barcode Scanner Modal */}
      <Modal
        isOpen={showScannerModal}
        onClose={() => setShowScannerModal(false)}
        title="Scan Barcode/QR Code"
      >
        <div className="space-y-4">
          <div className="bg-gray-100 p-8 rounded-lg text-center">
            <div className="w-48 h-48 mx-auto border-4 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-qrcode text-4xl text-gray-400"></i>
            </div>
            <p className="text-gray-600 mb-4">Position barcode/QR code within the frame</p>
            
            {scannedCode && (
              <div className="bg-green-50 border border-green-200 rounded p-3 mb-4">
                <p className="text-green-800 font-medium">Scanned: {scannedCode}</p>
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Or Enter Barcode Manually
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter barcode"
                value={scannedCode}
                onChange={(e) => setScannedCode(e.target.value)}
              />
            </div>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 self-end"
              onClick={simulateBarcodeScan}
            >
              Scan
            </button>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowScannerModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={simulateBarcodeScan}
            >
              Simulate Scan
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default SampleTracking