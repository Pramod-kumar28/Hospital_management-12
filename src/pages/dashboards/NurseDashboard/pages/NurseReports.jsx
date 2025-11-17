import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'

const NurseReports = () => {
  const [loading, setLoading] = useState(true)
  const [reports, setReports] = useState([])

  useEffect(() => {
    loadReports()
  }, [])

  const loadReports = async () => {
    setLoading(true)
    setTimeout(() => {
      setReports([
        { id: 'NREP-001', type: 'Vital Signs Report', period: 'Daily', generated: '2024-01-15', patients: 24 },
        { id: 'NREP-002', type: 'Medication Administration', period: 'Shift-wise', generated: '2024-01-15', patients: 18 },
        { id: 'NREP-003', type: 'Patient Care Summary', period: 'Weekly', generated: '2024-01-14', patients: 45 },
        { id: 'NREP-004', type: 'Incident Report', period: 'Monthly', generated: '2024-01-10', patients: 3 }
      ])
      setLoading(false)
    }, 1000)
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Nurse Reports</h2>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl card-shadow border p-6 text-center hover:shadow-lg transition-shadow">
          <i className="fas fa-heartbeat text-3xl text-red-500 mb-3"></i>
          <h3 className="font-semibold text-lg mb-2">Vital Signs Report</h3>
          <p className="text-gray-600 text-sm mb-4">Daily patient vital signs summary</p>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 w-full">
            Generate Report
          </button>
        </div>
        
        <div className="bg-white rounded-xl card-shadow border p-6 text-center hover:shadow-lg transition-shadow">
          <i className="fas fa-pills text-3xl text-blue-500 mb-3"></i>
          <h3 className="font-semibold text-lg mb-2">Medication Report</h3>
          <p className="text-gray-600 text-sm mb-4">Medication administration records</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full">
            Generate Report
          </button>
        </div>
        
        <div className="bg-white rounded-xl card-shadow border p-6 text-center hover:shadow-lg transition-shadow">
          <i className="fas fa-file-medical text-3xl text-green-500 mb-3"></i>
          <h3 className="font-semibold text-lg mb-2">Patient Care Summary</h3>
          <p className="text-gray-600 text-sm mb-4">Comprehensive patient care overview</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full">
            Generate Report
          </button>
        </div>
        
        <div className="bg-white rounded-xl card-shadow border p-6 text-center hover:shadow-lg transition-shadow">
          <i className="fas fa-exclamation-triangle text-3xl text-yellow-500 mb-3"></i>
          <h3 className="font-semibold text-lg mb-2">Incident Reports</h3>
          <p className="text-gray-600 text-sm mb-4">Medical incidents and events</p>
          <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 w-full">
            Generate Report
          </button>
        </div>
        
        <div className="bg-white rounded-xl card-shadow border p-6 text-center hover:shadow-lg transition-shadow">
          <i className="fas fa-bed text-3xl text-purple-500 mb-3"></i>
          <h3 className="font-semibold text-lg mb-2">Ward Occupancy</h3>
          <p className="text-gray-600 text-sm mb-4">Bed utilization and availability</p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-full">
            Generate Report
          </button>
        </div>
        
        <div className="bg-white rounded-xl card-shadow border p-6 text-center hover:shadow-lg transition-shadow">
          <i className="fas fa-user-nurse text-3xl text-indigo-500 mb-3"></i>
          <h3 className="font-semibold text-lg mb-2">Nursing Handover</h3>
          <p className="text-gray-600 text-sm mb-4">Shift handover documentation</p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 w-full">
            Generate Report
          </button>
        </div>
      </div>

      {/* Generated Reports */}
      <div className="bg-white rounded-xl card-shadow border p-6">
        <h3 className="font-semibold text-lg mb-4">Recently Generated Reports</h3>
        <DataTable
          columns={[
            { key: 'id', title: 'Report ID', sortable: true },
            { key: 'type', title: 'Report Type', sortable: true },
            { key: 'period', title: 'Period', sortable: true },
            { key: 'generated', title: 'Generated On', sortable: true },
            { key: 'patients', title: 'Patients', sortable: true },
            {
              key: 'actions',
              title: 'Actions',
              render: (_, row) => (
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="text-green-600 hover:text-green-800">
                    <i className="fas fa-download"></i>
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              )
            }
          ]}
          data={reports}
        />
      </div>
    </div>
  )
}

export default NurseReports