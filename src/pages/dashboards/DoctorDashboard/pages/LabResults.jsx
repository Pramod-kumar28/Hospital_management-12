import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'

const LabResults = () => {
  const [loading, setLoading] = useState(true)
  const [labResults, setLabResults] = useState([])

  useEffect(() => {
    loadLabResults()
  }, [])

  const loadLabResults = async () => {
    setLoading(true)
    setTimeout(() => {
      setLabResults([
        { id: 1, patient: "Ravi Kumar", test: "Blood Test", result: "Normal", date: "2023-10-10", status: "Reviewed" },
        { id: 2, patient: "Ravi Kumar", test: "X-Ray", result: "Mild Infection", date: "2023-10-05", status: "Pending Review" },
        { id: 3, patient: "Anita Sharma", test: "CT Scan", result: "Normal", date: "2023-10-08", status: "Reviewed" },
        { id: 4, patient: "Suresh Patel", test: "Blood Sugar", result: "Elevated", date: "2023-10-12", status: "Pending Review" }
      ])
      setLoading(false)
    }, 1000)
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Lab Results</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {labResults.map(lab => (
          <div key={lab.id} className="bg-white p-4 border rounded card-shadow hover:shadow-md transition fade-in">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-blue-700">{lab.test}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${
                lab.status === 'Reviewed' ? 'status-completed' : 'status-pending'
              }`}>
                {lab.status}
              </span>
            </div>
            <p className="text-sm text-gray-600"><strong>Patient:</strong> {lab.patient}</p>
            <p className="text-sm text-gray-600"><strong>Date:</strong> {lab.date}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Result:</strong> {lab.result}</p>
            <div className="flex gap-2">
              <button className="bg-green-500 text-white px-3 py-1 text-xs rounded hover:bg-green-600 flex items-center">
                <i className="fas fa-download mr-1"></i> Download
              </button>
              <button className="bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-600 flex items-center">
                <i className="fas fa-eye mr-1"></i> Review
              </button>
              {lab.status !== 'Reviewed' && (
                <button className="bg-purple-500 text-white px-3 py-1 text-xs rounded hover:bg-purple-600 flex items-center">
                  <i className="fas fa-check mr-1"></i> Mark Reviewed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pending Reviews Table */}
      <div className="bg-white p-4 border rounded card-shadow">
        <h3 className="text-lg font-semibold mb-3">Pending Reviews</h3>
        <DataTable
          columns={[
            { key: 'test', title: 'Test', sortable: true },
            { key: 'patient', title: 'Patient', sortable: true },
            { key: 'date', title: 'Date', sortable: true },
            { key: 'result', title: 'Result', sortable: true },
            { 
              key: 'status', 
              title: 'Status', 
              sortable: true,
              render: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs status-pending`}>
                  {value}
                </span>
              )
            },
            {
              key: 'actions',
              title: 'Actions',
              render: (_, row) => (
                <div className="flex gap-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="text-green-500 hover:text-green-700">
                    <i className="fas fa-check"></i>
                  </button>
                </div>
              )
            }
          ]}
          data={labResults.filter(lab => lab.status !== 'Reviewed')}
        />
      </div>
    </div>
  )
}

export default LabResults