import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const MedicalRecords = () => {
  const [loading, setLoading] = useState(true)
  const [records, setRecords] = useState([])
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadMedicalRecords()
  }, [])

  const loadMedicalRecords = async () => {
    setLoading(true)
    setTimeout(() => {
      setRecords([
        {
          id: 'REC-001',
          type: 'Consultation',
          date: '2023-10-10',
          doctor: 'Dr. Meena Rao',
          department: 'Cardiology',
          diagnosis: 'Hypertension Stage 1',
          symptoms: 'High blood pressure, headaches',
          treatment: 'Lifestyle changes, medication',
          attachments: 2,
          status: 'Completed'
        },
        {
          id: 'REC-002',
          type: 'Lab Test',
          date: '2023-10-10',
          doctor: 'Dr. Meena Rao',
          department: 'Cardiology',
          diagnosis: 'Normal lipid profile',
          symptoms: 'Routine checkup',
          treatment: 'No treatment required',
          attachments: 1,
          status: 'Completed'
        },
        {
          id: 'REC-003',
          type: 'X-Ray',
          date: '2023-09-25',
          doctor: 'Dr. Sharma',
          department: 'Orthopedics',
          diagnosis: 'Mild arthritis',
          symptoms: 'Knee pain',
          treatment: 'Physical therapy, pain management',
          attachments: 3,
          status: 'Completed'
        },
        {
          id: 'REC-004',
          type: 'Consultation',
          date: '2023-09-15',
          doctor: 'Dr. Gupta',
          department: 'General Medicine',
          diagnosis: 'Viral fever',
          symptoms: 'Fever, cold, body ache',
          treatment: 'Antipyretics, rest, hydration',
          attachments: 0,
          status: 'Completed'
        }
      ])
      setLoading(false)
    }, 1000)
  }

  const handleViewDetails = (record) => {
    setSelectedRecord(record)
  }

  const handleDownload = (recordId) => {
    alert(`Downloading record ${recordId}...`)
  }

  const handleShare = (recordId) => {
    alert(`Sharing options for record ${recordId}`)
  }

  const filteredRecords = filter === 'all' 
    ? records 
    : records.filter(record => record.type === filter)

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">📋 Medical Records</h2>
          <p className="text-gray-500 text-sm mt-1">Your complete medical history and health records</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
            <i className="fas fa-download mr-2"></i>Export All
          </button>
          <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium">
            <i className="fas fa-share-alt mr-2"></i>Share Records
          </button>
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
          All Records
        </button>
        <button
          onClick={() => setFilter('Consultation')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${
            filter === 'Consultation' 
              ? 'bg-blue-100 text-blue-700 border border-blue-200' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Consultations
        </button>
        <button
          onClick={() => setFilter('Lab Test')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${
            filter === 'Lab Test' 
              ? 'bg-blue-100 text-blue-700 border border-blue-200' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Lab Tests
        </button>
        <button
          onClick={() => setFilter('X-Ray')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${
            filter === 'X-Ray' 
              ? 'bg-blue-100 text-blue-700 border border-blue-200' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Imaging
        </button>
        <button
          onClick={() => setFilter('Procedure')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${
            filter === 'Procedure' 
              ? 'bg-blue-100 text-blue-700 border border-blue-200' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Procedures
        </button>
      </div>

      {/* Medical Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecords.map(record => (
          <div key={record.id} className="bg-white rounded-xl card-shadow border p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  record.type === 'Consultation' ? 'bg-blue-100 text-blue-700' :
                  record.type === 'Lab Test' ? 'bg-green-100 text-green-700' :
                  record.type === 'X-Ray' ? 'bg-purple-100 text-purple-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {record.type}
                </span>
                <h3 className="font-semibold text-gray-800 mt-2">{record.diagnosis}</h3>
              </div>
              <span className="text-xs text-gray-500">{record.date}</span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm">
                <i className="fas fa-user-md text-gray-400 mr-2 w-5"></i>
                <span className="text-gray-700">{record.doctor}</span>
              </div>
              <div className="flex items-center text-sm">
                <i className="fas fa-building text-gray-400 mr-2 w-5"></i>
                <span className="text-gray-700">{record.department}</span>
              </div>
              <div className="flex items-center text-sm">
                <i className="fas fa-stethoscope text-gray-400 mr-2 w-5"></i>
                <span className="text-gray-700 truncate">{record.symptoms}</span>
              </div>
            </div>
            
            {record.attachments > 0 && (
              <div className="mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-paperclip mr-2"></i>
                  <span>{record.attachments} attachment{record.attachments !== 1 ? 's' : ''}</span>
                </div>
              </div>
            )}
            
            <div className="flex justify-between pt-4 border-t">
              <button
                onClick={() => handleViewDetails(record)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                <i className="fas fa-eye mr-1"></i> View Details
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(record.id)}
                  className="text-gray-600 hover:text-gray-800"
                  title="Download"
                >
                  <i className="fas fa-download"></i>
                </button>
                <button
                  onClick={() => handleShare(record.id)}
                  className="text-gray-600 hover:text-gray-800"
                  title="Share"
                >
                  <i className="fas fa-share-alt"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Medical Record Details</h3>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Header Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Record ID</p>
                    <p className="font-medium">{selectedRecord.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedRecord.type === 'Consultation' ? 'bg-blue-100 text-blue-700' :
                      selectedRecord.type === 'Lab Test' ? 'bg-green-100 text-green-700' :
                      selectedRecord.type === 'X-Ray' ? 'bg-purple-100 text-purple-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {selectedRecord.type}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{selectedRecord.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {selectedRecord.status}
                    </span>
                  </div>
                </div>
                
                {/* Doctor Info */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">Doctor Information</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-user-md text-blue-600"></i>
                    </div>
                    <div>
                      <p className="font-medium">{selectedRecord.doctor}</p>
                      <p className="text-sm text-gray-600">{selectedRecord.department}</p>
                    </div>
                  </div>
                </div>
                
                {/* Diagnosis */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">Diagnosis</p>
                  <p className="font-medium text-gray-800">{selectedRecord.diagnosis}</p>
                </div>
                
                {/* Symptoms */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">Symptoms Reported</p>
                  <p className="text-gray-700">{selectedRecord.symptoms}</p>
                </div>
                
                {/* Treatment */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">Treatment & Recommendations</p>
                  <p className="text-gray-700">{selectedRecord.treatment}</p>
                </div>
                
                {/* Attachments */}
                {selectedRecord.attachments > 0 && (
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-500 mb-3">Attachments ({selectedRecord.attachments})</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="border rounded-lg p-3 flex items-center">
                        <i className="fas fa-file-pdf text-red-500 text-xl mr-3"></i>
                        <div>
                          <p className="font-medium text-sm">Diagnosis Report</p>
                          <p className="text-xs text-gray-500">PDF • 2.5 MB</p>
                        </div>
                        <button className="ml-auto text-blue-600 hover:text-blue-800">
                          <i className="fas fa-download"></i>
                        </button>
                      </div>
                      {selectedRecord.type === 'X-Ray' && (
                        <div className="border rounded-lg p-3 flex items-center">
                          <i className="fas fa-file-image text-blue-500 text-xl mr-3"></i>
                          <div>
                            <p className="font-medium text-sm">X-Ray Images</p>
                            <p className="text-xs text-gray-500">JPG • 5.2 MB</p>
                          </div>
                          <button className="ml-auto text-blue-600 hover:text-blue-800">
                            <i className="fas fa-download"></i>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t">
                  <button
                    onClick={() => handleDownload(selectedRecord.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <i className="fas fa-download mr-2"></i>Download Record
                  </button>
                  <button
                    onClick={() => handleShare(selectedRecord.id)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    <i className="fas fa-share-alt mr-2"></i>Share with Doctor
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

export default MedicalRecords