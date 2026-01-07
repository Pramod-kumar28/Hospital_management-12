import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const Prescriptions = () => {
  const [loading, setLoading] = useState(true)
  const [prescriptions, setPrescriptions] = useState([])
  const [selectedPrescription, setSelectedPrescription] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadPrescriptions()
  }, [])

  const loadPrescriptions = async () => {
    setLoading(true)
    setTimeout(() => {
      setPrescriptions([
        {
          id: 'RX-5001',
          doctor: 'Dr. Meena Rao',
          date: '2023-10-10',
          status: 'Active',
          medicines: [
            { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '30 days', instructions: 'After meals' },
            { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily', duration: '30 days', instructions: 'Morning with water' }
          ],
          refills: 2,
          expiry: '2023-12-31',
          notes: 'Monitor blood sugar regularly.'
        },
        {
          id: 'RX-5002',
          doctor: 'Dr. Sharma',
          date: '2023-09-25',
          status: 'Active',
          medicines: [
            { name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed', duration: '7 days', instructions: 'For pain, max 3 times daily' }
          ],
          refills: 0,
          expiry: '2023-10-25',
          notes: 'Take with food to avoid stomach upset.'
        },
        {
          id: 'RX-5003',
          doctor: 'Dr. Gupta',
          date: '2023-09-15',
          status: 'Completed',
          medicines: [
            { name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily', duration: '7 days', instructions: 'Complete full course' },
            { name: 'Paracetamol', dosage: '650mg', frequency: 'As needed', duration: '7 days', instructions: 'For fever' }
          ],
          refills: 0,
          expiry: '2023-09-30',
          notes: 'Course completed successfully.'
        },
        {
          id: 'RX-5004',
          doctor: 'Dr. Meena Rao',
          date: '2023-08-20',
          status: 'Expired',
          medicines: [
            { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', duration: '30 days', instructions: 'At bedtime' }
          ],
          refills: 1,
          expiry: '2023-09-20',
          notes: 'Cholesterol medication.'
        }
      ])
      setLoading(false)
    }, 1000)
  }

  const handleViewDetails = (prescription) => {
    setSelectedPrescription(prescription)
  }

  const handleRefillRequest = (prescriptionId) => {
    if (window.confirm('Request refill for this prescription?')) {
      alert(`Refill requested for prescription ${prescriptionId}`)
    }
  }

  const handleDownload = (prescriptionId) => {
    alert(`Downloading prescription ${prescriptionId}...`)
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'expired': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredPrescriptions = filter === 'all'
    ? prescriptions
    : prescriptions.filter(p => p.status.toLowerCase() === filter.toLowerCase())

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700"> Prescriptions</h2>
          <p className="text-gray-500 text-sm mt-1">View and manage your prescribed medications</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
            <i className="fas fa-prescription mr-2"></i>New Prescription
          </button>
          <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium">
            <i className="fas fa-history mr-2"></i>History
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Total Prescriptions */}
        <div className="relative bg-gradient-to-br from-white to-blue-50 p-5 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Total Prescriptions
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {prescriptions.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <i className="fas fa-file-prescription text-white text-lg"></i>
            </div>
          </div>

          <div className="relative mt-4 pt-3 border-t border-blue-100">
            <p className="text-xs text-blue-700 font-medium">All issued medications</p>
          </div>
        </div>

        {/* Active */}
        <div className="relative bg-gradient-to-br from-white to-emerald-50 p-5 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-emerald-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                Active
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {prescriptions.filter(p => p.status === 'Active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <i className="fas fa-check-circle text-white text-lg"></i>
            </div>
          </div>

          <div className="relative mt-4 pt-3 border-t border-emerald-100">
            <p className="text-xs text-emerald-700 font-medium">Currently in use</p>
          </div>
        </div>

        {/* Pending Refills */}
        <div className="relative bg-gradient-to-br from-white to-amber-50 p-5 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                Pending Refills
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {prescriptions.filter(p => p.refills > 0).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
              <i className="fas fa-sync-alt text-white text-lg"></i>
            </div>
          </div>

          <div className="relative mt-4 pt-3 border-t border-amber-100">
            <p className="text-xs text-amber-700 font-medium">Requires renewal</p>
          </div>
        </div>

        {/* Expired */}
        <div className="relative bg-gradient-to-br from-white to-rose-50 p-5 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-rose-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-rose-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
                Expired
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {prescriptions.filter(p => p.status === 'Expired').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center shadow-md">
              <i className="fas fa-times-circle text-white text-lg"></i>
            </div>
          </div>

          <div className="relative mt-4 pt-3 border-t border-rose-100">
            <p className="text-xs text-rose-700 font-medium">No longer valid</p>
          </div>
        </div>

      </div>


      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${filter === 'all'
              ? 'bg-blue-100 text-blue-700 border border-blue-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${filter === 'active'
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${filter === 'completed'
              ? 'bg-blue-100 text-blue-700 border border-blue-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('expired')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${filter === 'expired'
              ? 'bg-red-100 text-red-700 border border-red-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          Expired
        </button>
      </div>

      {/* Prescriptions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrescriptions.map(prescription => (
          <div key={prescription.id} className="bg-white rounded-xl card-shadow border p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
                  {prescription.status}
                </span>
                <h3 className="font-semibold text-gray-800 mt-2">Prescription #{prescription.id}</h3>
              </div>
              <span className="text-xs text-gray-500">{prescription.date}</span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm">
                <i className="fas fa-user-md text-gray-400 mr-2 w-5"></i>
                <span className="text-gray-700">{prescription.doctor}</span>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Medications:</p>
                {prescription.medicines.slice(0, 2).map((medicine, index) => (
                  <div key={index} className="text-sm text-gray-600 pl-3 border-l-2 border-blue-200">
                    <span className="font-medium">{medicine.name}</span> • {medicine.dosage}
                  </div>
                ))}
                {prescription.medicines.length > 2 && (
                  <p className="text-xs text-gray-500">+{prescription.medicines.length - 2} more medications</p>
                )}
              </div>

              {prescription.refills > 0 && (
                <div className="flex items-center text-sm">
                  <i className="fas fa-redo text-blue-400 mr-2 w-5"></i>
                  <span className="text-blue-600 font-medium">{prescription.refills} refill{prescription.refills !== 1 ? 's' : ''} available</span>
                </div>
              )}

              <div className="flex items-center text-sm">
                <i className="far fa-calendar text-gray-400 mr-2 w-5"></i>
                <span className="text-gray-700">Expires: {prescription.expiry}</span>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <button
                onClick={() => handleViewDetails(prescription)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                <i className="fas fa-eye mr-1"></i> View Details
              </button>
              <div className="flex gap-2">
                {prescription.status === 'Active' && prescription.refills > 0 && (
                  <button
                    onClick={() => handleRefillRequest(prescription.id)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                    title="Request Refill"
                  >
                    <i className="fas fa-redo"></i>
                  </button>
                )}
                <button
                  onClick={() => handleDownload(prescription.id)}
                  className="text-gray-600 hover:text-gray-800"
                  title="Download"
                >
                  <i className="fas fa-download"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prescription Details Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Prescription Details</h3>
                <button
                  onClick={() => setSelectedPrescription(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>

              <div className="space-y-6">
                {/* Header Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Prescription ID</p>
                    <p className="font-medium">{selectedPrescription.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPrescription.status)}`}>
                      {selectedPrescription.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Prescribed Date</p>
                    <p className="font-medium">{selectedPrescription.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expiry Date</p>
                    <p className="font-medium">{selectedPrescription.expiry}</p>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">Prescribed by</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-user-md text-blue-600"></i>
                    </div>
                    <div>
                      <p className="font-medium">{selectedPrescription.doctor}</p>
                    </div>
                  </div>
                </div>

                {/* Medications List */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-4">Medications List</p>
                  <div className="space-y-3">
                    {selectedPrescription.medicines.map((medicine, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-gray-800">{medicine.name}</p>
                            <p className="text-sm text-gray-600">{medicine.dosage}</p>
                          </div>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                            {medicine.frequency}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Duration:</span> {medicine.duration}
                          </div>
                          <div>
                            <span className="font-medium">Instructions:</span> {medicine.instructions}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Refill Info */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">Refill Information</p>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-blue-700">Refills Available</p>
                        <p className="text-2xl font-bold text-blue-800">{selectedPrescription.refills}</p>
                      </div>
                      {selectedPrescription.refills > 0 && (
                        <button
                          onClick={() => handleRefillRequest(selectedPrescription.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <i className="fas fa-redo mr-2"></i>Request Refill
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Doctor Notes */}
                {selectedPrescription.notes && (
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-500 mb-2">Doctor's Notes</p>
                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                      <p className="text-gray-700">{selectedPrescription.notes}</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t">
                  <button
                    onClick={() => handleDownload(selectedPrescription.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <i className="fas fa-download mr-2"></i>Download Prescription
                  </button>
                  {selectedPrescription.refills > 0 && (
                    <button
                      onClick={() => handleRefillRequest(selectedPrescription.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <i className="fas fa-redo mr-2"></i>Request Refill
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedPrescription(null)}
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

export default Prescriptions