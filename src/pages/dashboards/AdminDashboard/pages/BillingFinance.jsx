import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'
import Modal from '../../../../components/common/Modal/Modal'

const BillingFinance = () => {
  const [loading, setLoading] = useState(true)
  const [bills, setBills] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modalState, setModalState] = useState({ view: false, generate: false, payment: false })
  const [currentBill, setCurrentBill] = useState(null)
  const [newBill, setNewBill] = useState({
    patient: '',
    services: [],
    amount: '',
    discount: '',
    paymentMethod: 'Cash',
    notes: ''
  })

  // Data constants
  const PATIENTS = ['Ravi Kumar', 'Anita Sharma', 'Suresh Patel', 'Priya Singh', 'Rajesh Kumar', 'Meena Gupta']
  const SERVICES = ['Consultation', 'X-Ray', 'Blood Test', 'MRI Scan', 'CT Scan', 'Medication', 'Surgery', 'Lab Test']
  const PAYMENT_METHODS = ['Cash', 'Card', 'UPI', 'Insurance', 'Bank Transfer']

  useEffect(() => { loadBills() }, [])

  const loadBills = async () => {
    setLoading(true)
    setTimeout(() => {
      setBills([
        { id: 'INV-4001', patient: 'Ravi Kumar', services: ['Consultation', 'X-Ray'], amount: 1200, discount: 0, paymentMethod: 'Cash', status: 'Paid', date: '2023-10-15', notes: 'Routine checkup' },
        { id: 'INV-4002', patient: 'Anita Sharma', services: ['Blood Test'], amount: 300, discount: 50, paymentMethod: 'Card', status: 'Paid', date: '2023-10-15', notes: 'Diabetes screening' },
        { id: 'INV-4003', patient: 'Suresh Patel', services: ['MRI Scan'], amount: 2500, discount: 0, paymentMethod: 'Insurance', status: 'Pending', date: '2023-10-16', notes: 'Neurology referral' },
        { id: 'INV-4004', patient: 'Priya Singh', services: ['Consultation', 'Medication'], amount: 650, discount: 0, paymentMethod: 'UPI', status: 'Paid', date: '2023-10-16', notes: 'Migraine treatment' },
        { id: 'INV-4005', patient: 'Rajesh Kumar', services: ['CT Scan'], amount: 1800, discount: 100, paymentMethod: 'Card', status: 'Overdue', date: '2023-10-14', notes: 'Accident follow-up' }
      ])
      setLoading(false)
    }, 1000)
  }

  // Modal handlers
  const openModal = (type, bill = null) => {
    setModalState(prev => ({ ...prev, [type]: true }))
    if (type === 'view' && bill) {
      setCurrentBill(bill)
    } else if (type === 'payment' && bill) {
      setCurrentBill(bill)
    }
  }

  const closeModal = (type) => {
    setModalState(prev => ({ ...prev, [type]: false }))
    setCurrentBill(null)
    if (type === 'generate') resetForm()
  }

  // Core functions
  const handleGenerateBill = () => {
    if (!validateForm()) return
    const bill = {
      id: `INV-${Math.floor(4000 + Math.random() * 9000)}`,
      ...newBill,
      amount: parseInt(newBill.amount),
      discount: parseInt(newBill.discount || 0),
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    }
    setBills(prev => [bill, ...prev])
    closeModal('generate')
  }

  const handleMarkAsPaid = (billId) => {
    setBills(prev => prev.map(bill => 
      bill.id === billId ? { ...bill, status: 'Paid' } : bill
    ))
  }

  const handleProcessPayment = () => {
    if (currentBill) {
      handleMarkAsPaid(currentBill.id)
      closeModal('payment')
    }
  }

  const handleServiceToggle = (service) => {
    setNewBill(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const resetForm = () => {
    setNewBill({
      patient: '',
      services: [],
      amount: '',
      discount: '',
      paymentMethod: 'Cash',
      notes: ''
    })
  }

  const handleInputChange = (field, value) => {
    setNewBill(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    if (!newBill.patient || newBill.services.length === 0 || !newBill.amount) {
      alert('Please fill in all required fields')
      return false
    }
    return true
  }

  // Filter bills
  const filteredBills = bills.filter(bill => {
    const matchesSearch = !searchTerm || 
      [bill.patient, bill.id].some(field => 
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    const matchesStatus = !statusFilter || bill.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Statistics
  const totalRevenue = bills.filter(b => b.status === 'Paid').reduce((sum, bill) => sum + bill.amount, 0)
  const pendingPayments = bills.filter(b => b.status === 'Pending').reduce((sum, bill) => sum + bill.amount, 0)
  const overduePayments = bills.filter(b => b.status === 'Overdue').reduce((sum, bill) => sum + bill.amount, 0)

  const stats = [
    { label: 'Total Revenue', value: `₹${totalRevenue}`, color: 'green', description: 'This month' },
    { label: 'Pending Payments', value: `₹${pendingPayments}`, color: 'yellow', description: 'Awaiting collection' },
    { label: 'Overdue Payments', value: `₹${overduePayments}`, color: 'red', description: 'Past due date' },
    { label: 'Total Invoices', value: bills.length, color: 'blue', description: 'Generated this month' }
  ]

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">
          <i className="fas fa-file-invoice-dollar text-blue-500 mr-2"></i>Billing & Finance
        </h2>
        <button 
          onClick={() => openModal('generate')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i className="fas fa-plus mr-2"></i>Generate Bill
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg card-shadow border mb-6">
        <div className="flex flex-wrap gap-4">
          <input 
            type="text" 
            placeholder="Search bills..." 
            className="p-2 border rounded flex-1 focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="p-2 border rounded focus:outline-none focus:border-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {stats.map(({ label, value, color, description }) => (
          <div key={label} className="bg-white p-6 rounded-xl card-shadow border">
            <div className="text-sm text-gray-500">{label}</div>
            <div className={`text-2xl font-bold text-${color}-600 mt-1`}>{value}</div>
            <div className={`text-xs text-${color}-500 mt-1`}>{description}</div>
          </div>
        ))}
      </div>

      {/* Bills Table */}
      <div className="bg-white rounded-xl card-shadow border overflow-hidden">
        <DataTable
          columns={[
            { key: 'id', title: 'Invoice ID', sortable: true },
            { key: 'patient', title: 'Patient', sortable: true },
            { 
              key: 'services', 
              title: 'Services',
              render: (value) => (
                <div className="flex flex-wrap gap-1">
                  {value.map(service => (
                    <span key={service} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {service}
                    </span>
                  ))}
                </div>
              )
            },
            { 
              key: 'amount', 
              title: 'Amount', 
              sortable: true,
              render: (value) => `₹${value}`
            },
            { 
              key: 'discount', 
              title: 'Discount', 
              sortable: true,
              render: (value) => `₹${value}`
            },
            { key: 'paymentMethod', title: 'Payment Method', sortable: true },
            { 
              key: 'status', 
              title: 'Status', 
              sortable: true,
              render: (value) => (
                <span className={`px-2 py-1 rounded text-xs ${
                  value === 'Paid' ? 'bg-green-100 text-green-800' :
                  value === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {value}
                </span>
              )
            },
            {
              key: 'actions',
              title: 'Actions',
              render: (_, row) => (
                <div className="flex gap-1">
                  <ActionButton icon="eye" color="blue" onClick={() => openModal('view', row)} title="View Bill" />
                  {row.status !== 'Paid' && (
                    <ActionButton icon="check" color="green" onClick={() => openModal('payment', row)} title="Mark as Paid" />
                  )}
                  <ActionButton icon="receipt" color="purple" onClick={() => window.print()} title="Print Receipt" />
                </div>
              )
            }
          ]}
          data={filteredBills}
        />
      </div>

      {filteredBills.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <i className="fas fa-file-invoice text-blue-500 text-3xl mb-2"></i>
          <p>No bills found matching your criteria</p>
        </div>
      )}

      {/* Modals */}
      <ViewBillModal
        isOpen={modalState.view}
        onClose={() => closeModal('view')}
        bill={currentBill}
        onMarkAsPaid={handleMarkAsPaid}
      />

      <GenerateBillModal
        isOpen={modalState.generate}
        onClose={() => closeModal('generate')}
        onSubmit={handleGenerateBill}
        formData={newBill}
        onInputChange={handleInputChange}
        onServiceToggle={handleServiceToggle}
      />

      <PaymentModal
        isOpen={modalState.payment}
        onClose={() => closeModal('payment')}
        onConfirm={handleProcessPayment}
        bill={currentBill}
      />
    </div>
  )
}

// Sub-components
const ActionButton = ({ icon, color, onClick, title }) => (
  <button 
    onClick={onClick}
    className={`text-${color}-600 hover:text-${color}-800 p-1 rounded hover:bg-${color}-50 transition-colors`}
    title={title}
  >
    <i className={`fas fa-${icon}`}></i>
  </button>
)

const ViewBillModal = ({ isOpen, onClose, bill, onMarkAsPaid }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Bill Details" size="lg">
    {bill && (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <DetailItem label="Invoice ID" value={bill.id} />
          <DetailItem label="Date" value={bill.date} />
          <DetailItem label="Patient" value={bill.patient} />
          <DetailItem label="Status" value={bill.status} />
          <DetailItem label="Amount" value={`₹${bill.amount}`} />
          <DetailItem label="Discount" value={`₹${bill.discount}`} />
          <DetailItem label="Payment Method" value={bill.paymentMethod} />
          <DetailItem label="Net Amount" value={`₹${bill.amount - bill.discount}`} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
          <div className="flex flex-wrap gap-2">
            {bill.services.map(service => (
              <span key={service} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">
                {service}
              </span>
            ))}
          </div>
        </div>

        {bill.notes && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{bill.notes}</p>
          </div>
        )}

        <div className="flex justify-between gap-3 pt-4 border-t">
          {bill.status !== 'Paid' && (
            <button
              onClick={() => { onMarkAsPaid(bill.id); onClose(); }}
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
            >
              <i className="fas fa-check mr-2"></i>Mark as Paid
            </button>
          )}
          <button
            onClick={onClose}
            className={`${bill.status !== 'Paid' ? 'flex-1' : 'w-full'} bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors`}
          >
            Close
          </button>
        </div>
      </div>
    )}
  </Modal>
)

const GenerateBillModal = ({ isOpen, onClose, onSubmit, formData, onInputChange, onServiceToggle }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Generate New Bill" size="lg">
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Patient *</label>
          <select
            required
            value={formData.patient}
            onChange={(e) => onInputChange('patient', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Patient</option>
            {['Ravi Kumar', 'Anita Sharma', 'Suresh Patel', 'Priya Singh', 'Rajesh Kumar', 'Meena Gupta'].map(patient => (
              <option key={patient} value={patient}>{patient}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
          <select
            value={formData.paymentMethod}
            onChange={(e) => onInputChange('paymentMethod', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            {['Cash', 'Card', 'UPI', 'Insurance', 'Bank Transfer'].map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Services *</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {['Consultation', 'X-Ray', 'Blood Test', 'MRI Scan', 'CT Scan', 'Medication', 'Surgery', 'Lab Test'].map(service => (
            <button
              key={service}
              type="button"
              onClick={() => onServiceToggle(service)}
              className={`p-2 border rounded text-sm transition-all ${
                formData.services.includes(service)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:border-blue-300'
              }`}
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹) *</label>
          <input
            type="number"
            required
            min="0"
            value={formData.amount}
            onChange={(e) => onInputChange('amount', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Discount (₹)</label>
          <input
            type="number"
            min="0"
            value={formData.discount}
            onChange={(e) => onInputChange('discount', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea
          rows="3"
          value={formData.notes}
          onChange={(e) => onInputChange('notes', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Additional notes..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          onClick={onClose}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          disabled={!formData.patient || formData.services.length === 0 || !formData.amount}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <i className="fas fa-file-invoice mr-2"></i>Generate Bill
        </button>
      </div>
    </div>
  </Modal>
)

const PaymentModal = ({ isOpen, onClose, onConfirm, bill }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Process Payment" size="md">
    {bill && (
      <div className="text-center p-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <i className="fas fa-check text-green-600 text-xl"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirm Payment</h3>
        <p className="text-gray-600 mb-4">
          Mark invoice <span className="font-semibold">{bill.id}</span> as paid?
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="text-2xl font-bold text-green-600">₹{bill.amount - bill.discount}</div>
          <div className="text-sm text-gray-500">Net Amount</div>
        </div>
        <div className="flex justify-center gap-3">
          <button onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <i className="fas fa-check mr-2"></i>Confirm Payment
          </button>
        </div>
      </div>
    )}
  </Modal>
)

const DetailItem = ({ label, value }) => (
  <div>
    <span className="font-medium text-gray-700">{label}:</span>
    <p className="text-gray-900">{value}</p>
  </div>
)

export default BillingFinance