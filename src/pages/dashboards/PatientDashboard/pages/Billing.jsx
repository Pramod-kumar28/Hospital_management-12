import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const Billing = () => {
  const [loading, setLoading] = useState(true)
  const [bills, setBills] = useState([])
  const [selectedBill, setSelectedBill] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  useEffect(() => {
    loadBills()
  }, [])

  const loadBills = async () => {
    setLoading(true)
    setTimeout(() => {
      setBills([
        {
          id: 'INV-2023-1001',
          date: '2023-10-10',
          description: 'Cardiology Consultation & Tests',
          amount: 4500,
          status: 'Pending',
          dueDate: '2023-10-30',
          insuranceCoverage: 2500,
          patientShare: 2000,
          type: 'Consultation',
          items: [
            { name: 'Consultation Fee', amount: 800 },
            { name: 'Blood Tests', amount: 1200 },
            { name: 'ECG', amount: 500 },
            { name: 'Medications', amount: 2000 }
          ]
        },
        {
          id: 'INV-2023-0950',
          date: '2023-09-25',
          description: 'Orthopedics X-Ray & Consultation',
          amount: 3200,
          status: 'Paid',
          dueDate: '2023-10-10',
          insuranceCoverage: 2000,
          patientShare: 1200,
          type: 'Procedure',
          items: [
            { name: 'X-Ray', amount: 1500 },
            { name: 'Consultation', amount: 800 },
            { name: 'Pain Management', amount: 900 }
          ]
        },
        {
          id: 'INV-2023-0901',
          date: '2023-09-15',
          description: 'General Medicine & Lab Tests',
          amount: 2800,
          status: 'Paid',
          dueDate: '2023-09-30',
          insuranceCoverage: 1500,
          patientShare: 1300,
          type: 'Consultation',
          items: [
            { name: 'Consultation', amount: 500 },
            { name: 'Lab Tests', amount: 1500 },
            { name: 'Medications', amount: 800 }
          ]
        },
        {
          id: 'INV-2023-0850',
          date: '2023-08-20',
          description: 'Annual Health Checkup',
          amount: 6500,
          status: 'Overdue',
          dueDate: '2023-09-20',
          insuranceCoverage: 4000,
          patientShare: 2500,
          type: 'Checkup',
          items: [
            { name: 'Complete Health Package', amount: 5000 },
            { name: 'Specialist Consultation', amount: 1500 }
          ]
        }
      ])
      setLoading(false)
    }, 1000)
  }

  const handleViewBill = (bill) => {
    setSelectedBill(bill)
  }

  const handlePayNow = (bill) => {
    setSelectedBill(bill)
    setShowPaymentModal(true)
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    if (!paymentMethod) {
      alert('Please select a payment method')
      return
    }
    
    // Update bill status
    setBills(prev => prev.map(bill => 
      bill.id === selectedBill.id 
        ? { ...bill, status: 'Paid' }
        : bill
    ))
    
    alert(`Payment of ₹${selectedBill.patientShare} successful!`)
    setShowPaymentModal(false)
    setSelectedBill(null)
    setPaymentMethod('')
  }

  const handleDownload = (billId) => {
    alert(`Downloading bill ${billId}...`)
  }

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTotalPending = () => {
    return bills
      .filter(bill => bill.status === 'Pending' || bill.status === 'Overdue')
      .reduce((total, bill) => total + bill.patientShare, 0)
  }

  const getTotalPaid = () => {
    return bills
      .filter(bill => bill.status === 'Paid')
      .reduce((total, bill) => total + bill.patientShare, 0)
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700"> Bills & Payments</h2>
          <p className="text-gray-500 text-sm mt-1">View your medical bills and make payments online</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
            <i className="fas fa-download mr-2"></i>Export Statements
          </button>
          <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium">
            <i className="fas fa-credit-card mr-2"></i>Payment History
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Total Pending</div>
              <div className="text-3xl font-bold text-red-600 mt-1">₹{getTotalPending()}</div>
              <div className="text-xs text-gray-500 mt-1">
                {bills.filter(b => b.status === 'Pending' || b.status === 'Overdue').length} bills pending
              </div>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <i className="fas fa-exclamation-circle text-red-500 text-xl"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Total Paid</div>
              <div className="text-3xl font-bold text-green-600 mt-1">₹{getTotalPaid()}</div>
              <div className="text-xs text-gray-500 mt-1">
                {bills.filter(b => b.status === 'Paid').length} bills paid
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <i className="fas fa-check-circle text-green-500 text-xl"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl card-shadow border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Insurance Coverage</div>
              <div className="text-3xl font-bold text-blue-600 mt-1">70%</div>
              <div className="text-xs text-gray-500 mt-1">Avg. coverage on recent bills</div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <i className="fas fa-shield-alt text-blue-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Bills List */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h3 className="font-semibold text-gray-800">All Bills</h3>
            <div className="flex items-center gap-2">
              <select className="border rounded-lg px-3 py-2 text-sm">
                <option>All Status</option>
                <option>Pending</option>
                <option>Paid</option>
                <option>Overdue</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase">Bill ID</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase">Description</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase">Total Amount</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase">Your Share</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bills.map(bill => (
                <tr key={bill.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">{bill.id}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-700">{bill.date}</p>
                    <p className="text-xs text-gray-500">Due: {bill.dueDate}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">{bill.description}</p>
                    <p className="text-sm text-gray-600">{bill.type}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-bold text-gray-900">₹{bill.amount}</p>
                    <p className="text-xs text-gray-500">Insurance: ₹{bill.insuranceCoverage}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-bold text-blue-700">₹{bill.patientShare}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewBill(bill)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      {bill.status !== 'Paid' && (
                        <button 
                          onClick={() => handlePayNow(bill)}
                          className="p-1 text-green-600 hover:text-green-800"
                          title="Pay Now"
                        >
                          <i className="fas fa-credit-card"></i>
                        </button>
                      )}
                      <button 
                        onClick={() => handleDownload(bill.id)}
                        className="p-1 text-gray-600 hover:text-gray-800"
                        title="Download"
                      >
                        <i className="fas fa-download"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bill Details Modal */}
      {selectedBill && !showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Bill Details</h3>
                <button
                  onClick={() => setSelectedBill(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Header Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Bill ID</p>
                    <p className="font-medium">{selectedBill.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBill.status)}`}>
                      {selectedBill.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bill Date</p>
                    <p className="font-medium">{selectedBill.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Due Date</p>
                    <p className={`font-medium ${
                      selectedBill.status === 'Overdue' ? 'text-red-600' : 'text-gray-800'
                    }`}>
                      {selectedBill.dueDate}
                    </p>
                  </div>
                </div>
                
                {/* Description */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">Description</p>
                  <p className="font-medium text-gray-800">{selectedBill.description}</p>
                </div>
                
                {/* Bill Items */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-4">Bill Items</p>
                  <div className="space-y-2">
                    {selectedBill.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-700">{item.name}</span>
                        <span className="font-medium">₹{item.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Summary */}
                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₹{selectedBill.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Insurance Coverage</span>
                      <span className="text-green-600 font-medium">- ₹{selectedBill.insuranceCoverage}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-lg font-bold text-gray-800">Amount Due</span>
                      <span className="text-xl font-bold text-blue-700">₹{selectedBill.patientShare}</span>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t">
                  <button
                    onClick={() => handleDownload(selectedBill.id)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    <i className="fas fa-download mr-2"></i>Download Bill
                  </button>
                  {selectedBill.status !== 'Paid' && (
                    <button
                      onClick={() => setShowPaymentModal(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <i className="fas fa-credit-card mr-2"></i>Pay Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedBill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Make Payment</h3>
                <button
                  onClick={() => {
                    setShowPaymentModal(false)
                    setSelectedBill(null)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>
              
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                {/* Payment Summary */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600">Payment Amount</p>
                    <p className="text-3xl font-bold text-blue-700">₹{selectedBill.patientShare}</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Bill ID:</span>
                      <span className="font-medium">{selectedBill.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Description:</span>
                      <span className="font-medium">{selectedBill.description}</span>
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Payment Method *</label>
                  <div className="space-y-3">
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <i className="fas fa-credit-card text-blue-600"></i>
                        </div>
                        <div>
                          <p className="font-medium">Credit/Debit Card</p>
                          <p className="text-xs text-gray-500">Pay with Visa, MasterCard, Rupay</p>
                        </div>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                          <i className="fas fa-qrcode text-green-600"></i>
                        </div>
                        <div>
                          <p className="font-medium">UPI</p>
                          <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm</p>
                        </div>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="netbanking"
                        checked={paymentMethod === 'netbanking'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <i className="fas fa-university text-purple-600"></i>
                        </div>
                        <div>
                          <p className="font-medium">Net Banking</p>
                          <p className="text-xs text-gray-500">All major banks supported</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                
                {/* Terms */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 mr-3"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the terms and conditions of payment. I understand that this payment is non-refundable and will be processed securely.
                    </label>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPaymentModal(false)
                      setSelectedBill(null)
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Pay ₹{selectedBill.patientShare}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Billing