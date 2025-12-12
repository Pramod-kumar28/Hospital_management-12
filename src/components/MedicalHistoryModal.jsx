import React, { useState } from 'react'
import Modal from './common/Modal/Modal'

const MedicalHistoryModal = ({ patient, medicalHistory, onClose, onAddNew, isOpen }) => {
  const [viewMode, setViewMode] = useState('list') // 'list', 'timeline'
  const [selectedRecord, setSelectedRecord] = useState(null)

  const handleViewRecord = (record) => {
    setSelectedRecord(record)
  }

  return (
    <>
      {/* Main Medical History Modal */}
      <Modal
        isOpen={isOpen && !selectedRecord}
        onClose={onClose}
        title={`Medical History - ${patient?.name}`}
        size="xl"
      >
        <div className="space-y-6">
          {/* Patient Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Patient ID</p>
                <p className="font-medium">{patient?.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-medium">{patient?.age} years</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{patient?.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Records</p>
                <p className="font-medium">{medicalHistory?.length || 0}</p>
              </div>
            </div>
          </div>

          {/* View Toggle and Actions */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button 
                className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setViewMode('list')}
              >
                <i className="fas fa-list mr-2"></i> List View
              </button>
              <button 
                className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                  viewMode === 'timeline' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setViewMode('timeline')}
              >
                <i className="fas fa-stream mr-2"></i> Timeline View
              </button>
            </div>
            <button 
              onClick={onAddNew}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <i className="fas fa-plus mr-2"></i> Add New Record
            </button>
          </div>

          {/* Medical History Content */}
          {medicalHistory?.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
              <i className="fas fa-file-medical text-5xl text-gray-300 mb-4"></i>
              <h4 className="text-lg font-medium text-gray-600">No Medical History Found</h4>
              <p className="text-gray-500 mt-2 mb-6">Start by adding medical records for this patient</p>
              <button 
                onClick={onAddNew}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-plus mr-2"></i> Add First Record
              </button>
            </div>
          ) : viewMode === 'list' ? (
            <div className="space-y-3">
              <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-700">
                <div className="col-span-2">Date</div>
                <div className="col-span-3">Type</div>
                <div className="col-span-3">Doctor</div>
                <div className="col-span-2">Documents</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
              
              {medicalHistory.map(record => (
                <div key={record.id} className="grid grid-cols-12 gap-4 items-center p-4 border rounded-lg hover:bg-gray-50">
                  <div className="col-span-2">
                    <p className="font-medium">{record.date}</p>
                  </div>
                  <div className="col-span-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                      <i className="fas fa-stethoscope mr-2"></i>
                      {record.type}
                    </span>
                  </div>
                  <div className="col-span-3">
                    <p className="font-medium">Dr. {record.doctor}</p>
                    <p className="text-sm text-gray-500 truncate">{record.notes}</p>
                  </div>
                  <div className="col-span-2">
                    {record.documents?.length > 0 ? (
                      <span className="inline-flex items-center text-blue-600">
                        <i className="fas fa-paperclip mr-1"></i>
                        {record.documents.length} file(s)
                      </span>
                    ) : (
                      <span className="text-gray-400">No files</span>
                    )}
                  </div>
                  <div className="col-span-2 flex justify-end gap-2">
                    <button 
                      onClick={() => handleViewRecord(record)}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button 
                      className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Download"
                    >
                      <i className="fas fa-download"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative">
              <div className="border-l-2 border-blue-200 pl-8 ml-4 space-y-8">
                {medicalHistory.map(record => (
                  <div key={record.id} className="relative">
                    <div className="absolute -left-3 w-6 h-6 bg-blue-600 rounded-full border-4 border-white"></div>
                    <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-lg">{record.type}</h4>
                          <p className="text-blue-600">Dr. {record.doctor}</p>
                        </div>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {record.date}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{record.notes}</p>
                      {record.documents?.length > 0 && (
                        <div className="flex items-center text-sm text-gray-600">
                          <i className="fas fa-paperclip mr-2"></i>
                          <span>Attached: {record.documents.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-6 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <i className="fas fa-print mr-2"></i> Print Summary
          </button>
        </div>
      </Modal>

      {/* Record Detail Modal */}
      <Modal
        isOpen={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
        title="Medical Record Details"
        size="lg"
      >
        {selectedRecord && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium text-lg">{selectedRecord.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Record Type</p>
                <p className="font-medium text-lg">{selectedRecord.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="font-medium text-lg">Dr. {selectedRecord.doctor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  <i className="fas fa-check-circle mr-2"></i>
                  Completed
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Notes</p>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">{selectedRecord.notes}</p>
              </div>
            </div>

            {selectedRecord.documents?.length > 0 && (
              <div>
                <p className="text-sm text-gray-500 mb-3">Attached Documents</p>
                <div className="space-y-2">
                  {selectedRecord.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <i className="fas fa-file-pdf text-red-500 text-xl mr-3"></i>
                        <div>
                          <p className="font-medium">{doc}</p>
                          <p className="text-sm text-gray-500">PDF Document • {Math.floor(Math.random() * 500) + 100} KB</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg">
                          <i className="fas fa-download"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6 border-t flex justify-end gap-3">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <i className="fas fa-edit mr-2"></i> Edit Record
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

export default MedicalHistoryModal