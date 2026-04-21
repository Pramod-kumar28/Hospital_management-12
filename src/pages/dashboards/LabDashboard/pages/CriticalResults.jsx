import React, { useState, useEffect } from 'react'
import DataTable from '../../../../components/ui/Tables/DataTable'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import {
  Warning as WarningIcon,
  NotificationsActive as AlertIcon,
  CheckCircle as SuccessIcon,
  History as HistoryIcon,
  LocalHospital as HospitalIcon,
  Person as PatientIcon
} from '@mui/icons-material'

const CriticalResults = () => {
  const [loading, setLoading] = useState(true)
  const [criticalResults, setCriticalResults] = useState([])

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setCriticalResults([
        { id: 'TEST-2024-012', patient: 'Ravi Kumar', test: 'Creatinine', value: '4.2 mg/dL', alert: 'Critical High', time: '09:45 AM', notified: 'Yes', physician: 'Dr. Sharma' },
        { id: 'TEST-2024-013', patient: 'Sunita Rao', test: 'Potassium', value: '6.5 mEq/L', alert: 'Critical High', time: '10:15 AM', notified: 'Pending', physician: 'Dr. Patel' },
        { id: 'TEST-2024-014', patient: 'Mohan Singh', test: 'Glucose', value: '40 mg/dL', alert: 'Critical Low', time: '10:30 AM', notified: 'Yes', physician: 'Dr. Mehta' },
        { id: 'TEST-2024-115', patient: 'Anjali Gupta', test: 'Hemoglobin', value: '6.2 g/dL', alert: 'Critical Low', time: '11:15 AM', notified: 'Pending', physician: 'Dr. Verma' },
        { id: 'TEST-2024-118', patient: 'Karan Mehra', test: 'Platelets', value: '15,000 /µL', alert: 'Critical Low', time: '11:45 AM', notified: 'Pending', physician: 'Dr. Kapoor' }
      ])
      setLoading(false)
    }, 800)
  }, [])

  const handleNotify = (id) => {
    const updated = criticalResults.map(res => 
      res.id === id ? { ...res, notified: 'Yes' } : res
    )
    setCriticalResults(updated)
    // In a real app, this would trigger an API call and SMS/Email to physician
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <WarningIcon className="text-red-500 mr-2" /> Critical Results Management
          </h2>
          <p className="text-sm text-gray-500">Monitor and track critical patient alerts requiring immediate physician notification</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-center shadow-sm">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
            <AlertIcon className="text-white" />
          </div>
          <div>
            <p className="text-sm text-red-600 font-semibold uppercase">Pending Notifications</p>
            <h3 className="text-2xl font-bold text-red-800">{criticalResults.filter(r => r.notified === 'Pending').length}</h3>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-center shadow-sm">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
            <SuccessIcon className="text-white" />
          </div>
          <div>
            <p className="text-sm text-green-600 font-semibold uppercase">Notified Today</p>
            <h3 className="text-2xl font-bold text-green-800">{criticalResults.filter(r => r.notified === 'Yes').length}</h3>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center shadow-sm">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
            <HistoryIcon className="text-white" />
          </div>
          <div>
            <p className="text-sm text-blue-600 font-semibold uppercase">Average Response Time</p>
            <h3 className="text-2xl font-bold text-blue-800">12 mins</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
        <DataTable
          columns={[
            { key: 'id', title: 'Test ID', sortable: true },
            { 
                key: 'patient', 
                title: 'Patient', 
                render: (val) => (
                    <div className="flex items-center">
                        <PatientIcon sx={{ fontSize: 16, mr: 1, color: 'gray' }} />
                        <span className="font-semibold">{val}</span>
                    </div>
                )
            },
            { key: 'test', title: 'Test Type' },
            { 
              key: 'value', 
              title: 'Critical Value',
              render: (val) => <span className="text-red-600 font-bold">{val}</span>
            },
            { 
              key: 'alert', 
              title: 'Alert Status',
              render: (val) => (
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  val.includes('High') ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {val}
                </span>
              )
            },
            { key: 'physician', title: 'Physician' },
            { 
              key: 'notified', 
              title: 'Notification',
              render: (val, row) => (
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${val === 'Yes' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="text-xs font-medium">{val}</span>
                  {val === 'Pending' && (
                    <button 
                      onClick={() => handleNotify(row.id)}
                      className="ml-2 px-2 py-1 bg-red-600 text-white text-[10px] rounded hover:bg-red-700 font-bold"
                    >
                      NOTIFY NOW
                    </button>
                  )}
                </div>
              )
            }
          ]}
          data={criticalResults}
          onRowClick={(row) => console.log('Details:', row)}
        />
      </div>
    </div>
  )
}

export default CriticalResults
