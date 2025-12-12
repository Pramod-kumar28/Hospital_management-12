import React, { useState, useEffect } from 'react'
import Modal from './common/Modal/Modal'

const ScannerIntegration = ({ patient, onClose, onScanComplete, isOpen }) => {
  const [scanning, setScanning] = useState(false)
  const [scannedImage, setScannedImage] = useState(null)
  const [documentType, setDocumentType] = useState('')
  const [notes, setNotes] = useState('')
  const [quality, setQuality] = useState('color')
  const [scannerStatus, setScannerStatus] = useState('checking') // checking, connected, error
  const [scanProgress, setScanProgress] = useState(0)

  // Simulate scanner detection
  useEffect(() => {
    if (isOpen) {
      setScannerStatus('checking')
      setTimeout(() => {
        setScannerStatus('connected')
      }, 1500)
    }
  }, [isOpen])

  const simulateScan = () => {
    if (scannerStatus !== 'connected') return
    
    setScanning(true)
    setScanProgress(0)
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          
          setTimeout(() => {
            const simulatedImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...'
            setScannedImage(simulatedImage)
            setScanning(false)
          }, 500)
          
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleSaveScan = () => {
    if (!scannedImage || !documentType) {
      alert('Please complete scan and select document type')
      return
    }

    const scanData = {
      documentType,
      notes,
      quality,
      scannedImage,
      timestamp: new Date().toISOString(),
      fileSize: '2.4 MB',
      dimensions: '2480x3508 pixels'
    }

    onScanComplete(scanData)
    resetScanner()
  }

  const resetScanner = () => {
    setScannedImage(null)
    setDocumentType('')
    setNotes('')
    setScanProgress(0)
  }

  const scannerConfigurations = [
    { id: 'default', name: 'Default Scanner', status: 'Online' },
    { id: 'network', name: 'Network Scanner', status: 'Available' },
    { id: 'backup', name: 'Backup Scanner', status: 'Offline' }
  ]

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetScanner()
        onClose()
      }}
      title="Document Scanner"
      size="xl"
    >
      <div className="space-y-6">
        {/* Scanner Status */}
        <div className={`p-4 rounded-lg ${
          scannerStatus === 'connected' ? 'bg-green-50 border border-green-200' :
          scannerStatus === 'checking' ? 'bg-yellow-50 border border-yellow-200' :
          'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i className={`fas fa-print text-xl mr-3 ${
                scannerStatus === 'connected' ? 'text-green-600' :
                scannerStatus === 'checking' ? 'text-yellow-600' :
                'text-red-600'
              }`}></i>
              <div>
                <p className="font-medium">
                  {scannerStatus === 'connected' ? 'Scanner Connected' :
                   scannerStatus === 'checking' ? 'Checking Scanner...' :
                   'Scanner Error'}
                </p>
                <p className="text-sm opacity-75">
                  {scannerStatus === 'connected' ? 'Ready to scan documents' :
                   scannerStatus === 'checking' ? 'Detecting connected scanners...' :
                   'Unable to detect scanner. Please check connection.'}
                </p>
              </div>
            </div>
            {scannerStatus === 'checking' && (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-600"></div>
            )}
          </div>
        </div>

        {scannerStatus === 'connected' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Scanner Preview & Controls */}
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Scan Preview</h4>
                <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <div className="aspect-[3/4] flex items-center justify-center">
                    {scanning ? (
                      <div className="text-center p-8">
                        <div className="relative w-32 h-32 mx-auto mb-4">
                          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                          <div 
                            className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent"
                            style={{ transform: `rotate(${scanProgress * 3.6}deg)` }}
                          ></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-blue-600">{scanProgress}%</span>
                          </div>
                        </div>
                        <p className="text-gray-600 font-medium">Scanning in progress</p>
                        <p className="text-sm text-gray-500 mt-1">Please wait while document is being scanned</p>
                      </div>
                    ) : scannedImage ? (
                      <div className="p-6 w-full h-full flex flex-col items-center justify-center">
                        <div className="relative mb-4">
                          <div className="w-48 h-64 bg-white border-2 border-gray-300 rounded-lg shadow-inner flex items-center justify-center">
                            <i className="fas fa-file-pdf text-6xl text-red-500"></i>
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <i className="fas fa-check text-white text-sm"></i>
                          </div>
                        </div>
                        <p className="font-medium text-gray-700">Document scanned successfully</p>
                        <p className="text-sm text-gray-500">Quality: {quality === 'color' ? 'Color' : quality === 'grayscale' ? 'Grayscale' : 'Black & White'}</p>
                        <button
                          onClick={() => setScannedImage(null)}
                          className="mt-4 px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors text-sm"
                        >
                          <i className="fas fa-redo mr-2"></i> Rescan Document
                        </button>
                      </div>
                    ) : (
                      <div className="text-center p-12">
                        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <i className="fas fa-scanner text-5xl text-gray-300"></i>
                        </div>
                        <p className="text-gray-600 font-medium">No scanned document</p>
                        <p className="text-sm text-gray-500">Place document in scanner and click "Start Scan"</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Scan Controls */}
              <div className="space-y-4">
                <button
                  onClick={simulateScan}
                  disabled={scanning || scannerStatus !== 'connected'}
                  className={`w-full py-3.5 rounded-lg font-medium transition-all ${
                    scanning || scannerStatus !== 'connected'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow'
                  }`}
                >
                  {scanning ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Scanning... {scanProgress}%
                    </>
                  ) : (
                    <>
                      <i className="fas fa-camera mr-2"></i>
                      Start Scanning
                    </>
                  )}
                </button>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setQuality('color')}
                    className={`p-3 border rounded-lg flex flex-col items-center ${
                      quality === 'color' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <i className="fas fa-palette text-blue-500 text-xl mb-2"></i>
                    <span className="text-sm font-medium">Color</span>
                  </button>
                  <button
                    onClick={() => setQuality('grayscale')}
                    className={`p-3 border rounded-lg flex flex-col items-center ${
                      quality === 'grayscale' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <i className="fas fa-grip-lines text-gray-500 text-xl mb-2"></i>
                    <span className="text-sm font-medium">Grayscale</span>
                  </button>
                  <button
                    onClick={() => setQuality('bw')}
                    className={`p-3 border rounded-lg flex flex-col items-center ${
                      quality === 'bw' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <i className="fas fa-adjust text-gray-800 text-xl mb-2"></i>
                    <span className="text-sm font-medium">B&W</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Settings & Details */}
            <div className="space-y-6">
              {/* Document Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Type *
                </label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                >
                  <option value="">Select document type</option>
                  <option value="Prescription">Prescription</option>
                  <option value="Lab Report">Lab Report</option>
                  <option value="X-Ray">X-Ray Film</option>
                  <option value="ECG">ECG Report</option>
                  <option value="Insurance Card">Insurance Card</option>
                  <option value="ID Proof">ID Proof</option>
                  <option value="Referral Letter">Referral Letter</option>
                  <option value="Consent Form">Consent Form</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  rows="4"
                  placeholder="Add notes about this scanned document (e.g., date of test, doctor's name, observations)..."
                />
              </div>

              {/* Scanner Configuration */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Scanner Configuration</h4>
                <div className="space-y-2">
                  {scannerConfigurations.map(scanner => (
                    <div key={scanner.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center">
                        <i className={`fas fa-scanner text-gray-500 mr-3`}></i>
                        <div>
                          <p className="font-medium text-sm">{scanner.name}</p>
                          <p className={`text-xs ${
                            scanner.status === 'Online' ? 'text-green-600' :
                            scanner.status === 'Available' ? 'text-blue-600' :
                            'text-red-600'
                          }`}>
                            {scanner.status}
                          </p>
                        </div>
                      </div>
                      {scanner.status === 'Online' && (
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Scanner Settings */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="text-sm font-medium text-gray-700 mb-3">Scanner Settings</h5>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Resolution (DPI)</label>
                    <select className="w-full mt-1 p-2 border border-gray-300 rounded text-sm">
                      <option>300 DPI (Standard)</option>
                      <option>600 DPI (High Quality)</option>
                      <option>1200 DPI (Ultra High)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Page Size</label>
                    <select className="w-full mt-1 p-2 border border-gray-300 rounded text-sm">
                      <option>A4 (210 × 297 mm)</option>
                      <option>Letter (8.5 × 11 in)</option>
                      <option>Legal (8.5 × 14 in)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveScan}
                disabled={!scannedImage || !documentType}
                className={`w-full py-3.5 rounded-lg font-medium transition-all mt-6 ${
                  !scannedImage || !documentType
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow'
                }`}
              >
                <i className="fas fa-save mr-2"></i>
                Save Scanned Document
              </button>
            </div>
          </div>
        ) : scannerStatus === 'error' ? (
          <div className="text-center py-12">
            <i className="fas fa-exclamation-triangle text-5xl text-red-300 mb-6"></i>
            <h4 className="text-lg font-medium text-gray-700 mb-2">Scanner Connection Failed</h4>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Unable to detect any connected scanners. Please ensure your scanner is properly connected and powered on.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setScannerStatus('checking')}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-redo mr-2"></i> Retry Connection
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  )
}

export default ScannerIntegration