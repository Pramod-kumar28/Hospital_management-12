import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'

const Billing = () => {
  const [loading, setLoading] = useState(true)
  const [bills, setBills] = useState([])
  const [showBillForm, setShowBillForm] = useState(false)

  useEffect(() => {
    loadBills()
  }, [])

  const loadBills = async () => {
    setLoading(true)
    try {
      // Integration point for fetching actual bills
      setBills([])
    } catch (error) {
      console.error('Error loading bills:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateBill = () => {
    // In real app, this would generate a new bill
    console.log('Generating new bill')
    setShowBillForm(true)
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Billing & Invoices</h2>
        <button 
          onClick={generateBill}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
        >
          <i className="fas fa-plus mr-2"></i> Generate Bill
        </button>
      </div>

      {/* Bill Form Modal */}
      {showBillForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Generate New Bill</h3>
              <button 
                onClick={() => setShowBillForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient *</label>
                  <select className="w-full border rounded p-2" required>
                    <option value="">Select Patient</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input type="date" className="w-full border rounded p-2" required />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Services *</label>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">No services available</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                  <input type="number" className="w-full border rounded p-2" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount (₹)</label>
                  <input type="number" className="w-full border rounded p-2" placeholder="0" />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBillForm(false)}
                  className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Generate Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

            {/* Billing Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

  {/* TOTAL REVENUE */}
  <div className="bg-green-50 border border-green-200 rounded-2xl p-5 hover:shadow-lg transition">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">
          Total Revenue
        </p>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          ₹{bills.filter(b => b.status === 'Paid').reduce((sum, bill) => sum + bill.total, 0)}
        </p>
      </div>

      <div className="w-11 h-11 rounded-xl bg-green-600 flex items-center justify-center">
        <i className="fas fa-indian-rupee-sign text-white"></i>
      </div>
    </div>

    <div className="h-px w-full bg-green-200 my-3"></div>

    <p className="text-xs text-green-600">This month</p>
  </div>

  {/* PENDING PAYMENTS */}
  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 hover:shadow-lg transition">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-yellow-700 uppercase tracking-wide">
          Pending Payments
        </p>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          ₹{bills.filter(b => b.status === 'Pending').reduce((sum, bill) => sum + bill.total, 0)}
        </p>
      </div>

      <div className="w-11 h-11 rounded-xl bg-yellow-500 flex items-center justify-center">
        <i className="fas fa-hourglass-half text-white"></i>
      </div>
    </div>

    <div className="h-px w-full bg-yellow-200 my-3"></div>

    <p className="text-xs text-yellow-600">Awaiting collection</p>
  </div>

  {/* TOTAL INVOICES */}
  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 hover:shadow-lg transition">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
          Total Invoices
        </p>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          {bills.length}
        </p>
      </div>

      <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
        <i className="fas fa-file-invoice text-white"></i>
      </div>
    </div>

    <div className="h-px w-full bg-blue-200 my-3"></div>

    <p className="text-xs text-blue-600">Generated this month</p>
  </div>

</div>

      <DataTable
        columns={[
          { key: 'id', title: 'Invoice ID', sortable: true },
          { key: 'patient', title: 'Patient', sortable: true },
          { key: 'date', title: 'Date', sortable: true },
          { key: 'services', title: 'Services', sortable: true },
          { key: 'amount', title: 'Amount', sortable: true },
          { key: 'discount', title: 'Discount', sortable: true },
          { key: 'total', title: 'Total', sortable: true },
          { 
            key: 'status', 
            title: 'Status', 
            sortable: true,
            render: (value) => (
              <span className={`px-2 py-1 rounded-full text-xs ${
                value === 'Paid' ? 'status-confirmed' : 'status-pending'
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
                <button className="text-blue-600 hover:text-blue-800" title="View">
                  <i className="fas fa-eye"></i>
                </button>
                <button className="text-green-600 hover:text-green-800" title="Print">
                  <i className="fas fa-print"></i>
                </button>
                <button className="text-purple-600 hover:text-purple-800" title="Receipt">
                  <i className="fas fa-receipt"></i>
                </button>
              </div>
            )
          }
        ]}
        data={bills}
      />



    </div>
  )
}

export default Billing