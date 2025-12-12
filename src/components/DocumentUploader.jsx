import React, { useState, useRef } from 'react'
import Modal from './common/Modal/Modal'

const DocumentUploader = ({ patient, onClose, onUpload, onOpenScanner, isOpen }) => {
  const [files, setFiles] = useState([])
  const [documentType, setDocumentType] = useState('')
  const [notes, setNotes] = useState('')
  const [uploadMethod, setUploadMethod] = useState('manual')
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles(prev => [...prev, ...selectedFiles])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(prev => [...prev, ...droppedFiles])
  }

  const handleUpload = () => {
    if (files.length === 0) {
      alert('Please select files to upload')
      return
    }
    
    onUpload(files)
    resetForm()
  }

  const resetForm = () => {
    setFiles([])
    setDocumentType('')
    setNotes('')
    setUploadMethod('manual')
  }

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetForm()
        onClose()
      }}
      title={`Add Medical Records - ${patient?.name}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Patient Status Banner */}
        <div className={`p-4 rounded-lg ${patient?.isNewPatient ? 'bg-yellow-50 border border-yellow-200' : 'bg-blue-50 border border-blue-200'}`}>
          <div className="flex items-center">
            <i className={`fas ${patient?.isNewPatient ? 'fa-user-plus text-yellow-600' : 'fa-user-check text-blue-600'} text-xl mr-3`}></i>
            <div>
              <p className="font-medium">
                {patient?.isNewPatient ? 'New Patient' : 'Existing Patient'}
              </p>
              <p className="text-sm opacity-75">
                {patient?.isNewPatient 
                  ? 'No existing medical history found. Add first records below.' 
                  : `Found ${patient?.medicalHistoryCount || 0} existing records. Adding new records.`}
              </p>
            </div>
          </div>
        </div>

        {/* Upload Method Selection */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Select Upload Method</h4>
          <div className="grid grid-cols-2 gap-4">
            <button
              className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center ${
                uploadMethod === 'manual' 
                  ? 'border-blue-500 bg-blue-50 shadow-sm' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setUploadMethod('manual')}
            >
              <i className="fas fa-upload text-3xl text-blue-500 mb-3"></i>
              <span className="font-medium text-gray-900">Manual Upload</span>
              <span className="text-sm text-gray-500 mt-1">Upload existing files</span>
            </button>
            <button
              className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center ${
                uploadMethod === 'scanner' 
                  ? 'border-blue-500 bg-blue-50 shadow-sm' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={onOpenScanner}
            >
              <i className="fas fa-print text-3xl text-green-500 mb-3"></i>
              <span className="font-medium text-gray-900">Scan Document</span>
              <span className="text-sm text-gray-500 mt-1">Use attached scanner</span>
            </button>
          </div>
        </div>

        {/* Manual Upload Form */}
        {uploadMethod === 'manual' && (
          <div className="space-y-6">
            {/* Document Type Selection */}
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
                <option value="X-Ray">X-Ray Report</option>
                <option value="CT Scan">CT Scan Report</option>
                <option value="MRI">MRI Report</option>
                <option value="Discharge Summary">Discharge Summary</option>
                <option value="Consultation Note">Consultation Note</option>
                <option value="Surgery Report">Surgery Report</option>
                <option value="Other">Other Medical Document</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clinical Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                rows="3"
                placeholder="Enter clinical observations, diagnosis, or treatment notes..."
              />
            </div>

            {/* File Upload Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Files *
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                  dragOver 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => fileInputRef.current.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                <p className="text-gray-700 font-medium">Click to select files or drag and drop</p>
                <p className="text-sm text-gray-500 mt-2">
                  Supports: PDF, JPG, PNG, DOC, DOCX (Max 25MB per file)
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
              </div>

              {/* Selected Files List */}
              {files.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Selected Files ({files.length})
                  </p>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 border rounded-lg">
                        <div className="flex items-center">
                          <i className={`fas fa-file-${file.type.includes('pdf') ? 'pdf text-red-500' : 'image text-blue-500'} text-lg mr-3`}></i>
                          <div>
                            <p className="font-medium text-sm truncate max-w-xs">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* File Requirements */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="text-sm font-medium text-gray-700 mb-2">File Requirements:</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i>
                  Maximum file size: 25MB per file
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i>
                  Accepted formats: PDF, JPG, PNG, DOC, DOCX
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i>
                  Ensure documents are clear and readable
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i>
                  Remove any sensitive personal information from documents
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <button
            onClick={() => {
              resetForm()
              onClose()
            }}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={uploadMethod === 'manual' && (files.length === 0 || !documentType)}
            className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
              uploadMethod === 'manual' && (files.length === 0 || !documentType)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <i className="fas fa-save mr-2"></i>
            {patient?.isNewPatient ? 'Create Medical Record' : 'Add to History'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DocumentUploader