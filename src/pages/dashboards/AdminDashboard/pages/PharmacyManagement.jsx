import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'
import Modal from '../../../../components/common/Modal/Modal' // Your existing modal component

const PharmacyManagement = () => {
  const [loading, setLoading] = useState(true)
  const [medicines, setMedicines] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingMedicine, setEditingMedicine] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [supplierFilter, setSupplierFilter] = useState('')
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    category: '',
    stock: '',
    expiry: '',
    supplier: '',
    price: '',
    description: '',
    dosage: '',
    prescriptionRequired: false
  })

  useEffect(() => {
    loadMedicines()
  }, [])

  const loadMedicines = async () => {
    setLoading(true)
    setTimeout(() => {
      setMedicines([
        { id: 'DRG-001', name: 'Paracetamol', category: 'Pain Relief', stock: 45, expiry: '2024-12-31', supplier: 'MediCorp', price: 25, description: 'Pain reliever and fever reducer', dosage: '500mg', prescriptionRequired: false },
        { id: 'DRG-002', name: 'Azithromycin', category: 'Antibiotic', stock: 12, expiry: '2024-10-15', supplier: 'PharmaPlus', price: 120, description: 'Broad-spectrum antibiotic', dosage: '250mg', prescriptionRequired: true },
        { id: 'DRG-003', name: 'Insulin', category: 'Diabetes', stock: 8, expiry: '2024-11-20', supplier: 'BioMed', price: 450, description: 'Diabetes medication', dosage: '100IU/ml', prescriptionRequired: true },
        { id: 'DRG-004', name: 'Amoxicillin', category: 'Antibiotic', stock: 23, expiry: '2025-01-10', supplier: 'MediCorp', price: 85, description: 'Penicillin antibiotic', dosage: '500mg', prescriptionRequired: true },
        { id: 'DRG-005', name: 'Vitamin C', category: 'Supplements', stock: 3, expiry: '2024-09-30', supplier: 'HealthSupp', price: 35, description: 'Vitamin C supplement', dosage: '500mg', prescriptionRequired: false }
      ])
      setLoading(false)
    }, 1000)
  }

  const handleAddMedicine = () => {
    if (editingMedicine) {
      // Update existing medicine
      setMedicines(prev => prev.map(medicine => 
        medicine.id === editingMedicine.id 
          ? {
              ...medicine,
              name: newMedicine.name,
              category: newMedicine.category,
              stock: parseInt(newMedicine.stock),
              expiry: newMedicine.expiry,
              supplier: newMedicine.supplier,
              price: parseFloat(newMedicine.price),
              description: newMedicine.description,
              dosage: newMedicine.dosage,
              prescriptionRequired: newMedicine.prescriptionRequired
            }
          : medicine
      ))
    } else {
      // Add new medicine
      const medicine = {
        id: `DRG-${String(medicines.length + 1).padStart(3, '0')}`,
        name: newMedicine.name,
        category: newMedicine.category,
        stock: parseInt(newMedicine.stock),
        expiry: newMedicine.expiry,
        supplier: newMedicine.supplier,
        price: parseFloat(newMedicine.price),
        description: newMedicine.description,
        dosage: newMedicine.dosage,
        prescriptionRequired: newMedicine.prescriptionRequired
      }
      
      setMedicines(prev => [medicine, ...prev])
    }
    setIsAddModalOpen(false)
    setEditingMedicine(null)
    resetForm()
  }

  const handleEditMedicine = (medicineId) => {
    const medicine = medicines.find(m => m.id === medicineId)
    if (medicine) {
      setNewMedicine({
        name: medicine.name,
        category: medicine.category,
        stock: medicine.stock.toString(),
        expiry: medicine.expiry,
        supplier: medicine.supplier,
        price: medicine.price.toString(),
        description: medicine.description || '',
        dosage: medicine.dosage || '',
        prescriptionRequired: medicine.prescriptionRequired || false
      })
      setEditingMedicine(medicine)
      setIsAddModalOpen(true)
    }
  }

  const handleDeleteMedicine = (medicineId) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      setMedicines(prev => prev.filter(medicine => medicine.id !== medicineId))
    }
  }

  const resetForm = () => {
    setNewMedicine({
      name: '',
      category: '',
      stock: '',
      expiry: '',
      supplier: '',
      price: '',
      description: '',
      dosage: '',
      prescriptionRequired: false
    })
    setEditingMedicine(null)
  }

  const handleInputChange = (field, value) => {
    setNewMedicine(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Sample data for dropdowns
  const categories = [
    'Pain Relief',
    'Antibiotic',
    'Diabetes',
    'Supplements',
    'Cardiology',
    'Neurology',
    'Gastrointestinal',
    'Respiratory',
    'Dermatology',
    'Vitamins'
  ]

  const suppliers = [
    'MediCorp',
    'PharmaPlus',
    'BioMed',
    'HealthSupp',
    'Global Pharma',
    'MediLife',
    'Care Pharmaceuticals',
    'Wellness Corp'
  ]

  const dosages = [
    '100mg',
    '250mg',
    '500mg',
    '1000mg',
    '50mg/ml',
    '100IU/ml',
    '25mg/5ml',
    '10mg'
  ]

  const lowStockItems = medicines.filter(item => item.stock < 10).length
  const outOfStockItems = medicines.filter(item => item.stock === 0).length

  // Filtered medicines based on search and filters
  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !categoryFilter || medicine.category === categoryFilter
    const matchesSupplier = !supplierFilter || medicine.supplier === supplierFilter
    
    return matchesSearch && matchesCategory && matchesSupplier
  })

  const getStockStatus = (stock) => {
    if (stock === 0) return 'out-of-stock'
    if (stock < 10) return 'low-stock'
    if (stock < 20) return 'medium-stock'
    return 'good-stock'
  }

  const getStockColor = (stock) => {
    if (stock === 0) return 'text-red-600 bg-red-100'
    if (stock < 10) return 'text-yellow-600 bg-yellow-100'
    if (stock < 20) return 'text-orange-600 bg-orange-100'
    return 'text-green-600 bg-green-100'
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">
           Pharmacy Management
        </h2>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <i className="fas fa-plus mr-2"></i>Add Medicine
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Search & Filter Medicines</h3>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Search by medicine name or ID..." 
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all pl-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute left-3 top-3.5 text-gray-400"></i>
          </div>
          <div className="w-full lg:w-48 relative">
            <select 
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all appearance-none pr-10"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <i className="fas fa-chevron-down absolute right-3 top-3.5 text-gray-400 pointer-events-none"></i>
          </div>
          <div className="w-full lg:w-48 relative">
            <select 
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all appearance-none pr-10"
              value={supplierFilter}
              onChange={(e) => setSupplierFilter(e.target.value)}
            >
              <option value="">All Suppliers</option>
              {suppliers.map(supplier => (
                <option key={supplier} value={supplier}>{supplier}</option>
              ))}
            </select>
            <i className="fas fa-chevron-down absolute right-3 top-3.5 text-gray-400 pointer-events-none"></i>
          </div>
        </div>
      </div>

      {/* Medicines Table */}
      <div className="bg-white rounded-xl card-shadow border overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Medicines</h3>
            <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              {filteredMedicines.length} Medicines
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <DataTable
            columns={[
              { key: 'id', title: 'Drug ID', sortable: true },
              { key: 'name', title: 'Name', sortable: true },
              { 
                key: 'category', 
                title: 'Category',
                render: (value) => (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {value}
                  </span>
                )
              },
              { 
                key: 'stock', 
                title: 'Stock', 
                sortable: true,
                render: (value) => (
                  <span className={`${getStockColor(value)} px-2 py-1 rounded text-xs font-medium`}>
                    {value} units
                  </span>
                )
              },
              { 
                key: 'expiry', 
                title: 'Expiry Date', 
                sortable: true,
                render: (value) => (
                  <span className={new Date(value) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? 'text-red-600' : 'text-gray-600'}>
                    {value}
                  </span>
                )
              },
              { key: 'supplier', title: 'Supplier', sortable: true },
              { 
                key: 'price', 
                title: 'Price', 
                sortable: true,
                render: (value) => `₹${value}`
              },
              {
                key: 'actions',
                title: 'Actions',
                render: (_, row) => (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEditMedicine(row.id)}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                      title="Edit"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      onClick={() => handleDeleteMedicine(row.id)}
                      className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                      title="Delete"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                )
              }
            ]}
            data={filteredMedicines}
          />
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <div className="flex items-center">
            <i className="fas fa-exclamation-triangle text-yellow-600 text-xl mr-3"></i>
            <div>
              <h4 className="font-semibold text-yellow-800">Low Stock Alert</h4>
              <p className="text-yellow-700 text-sm">
                {lowStockItems} medicine(s) are running low on stock. Please reorder soon.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Expiry Alert */}
      {medicines.some(med => new Date(med.expiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
          <div className="flex items-center">
            <i className="fas fa-exclamation-circle text-red-600 text-xl mr-3"></i>
            <div>
              <h4 className="font-semibold text-red-800">Expiry Alert</h4>
              <p className="text-red-700 text-sm">
                Some medicines are expiring soon. Please check the expiry dates.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Medicine Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => {
          setIsAddModalOpen(false)
          resetForm()
        }} 
        title={editingMedicine ? "Edit Medicine" : "Add New Medicine"}
        size="lg"
      >
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medicine Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={newMedicine.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter medicine name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={newMedicine.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                value={newMedicine.stock}
                onChange={(e) => handleInputChange('stock', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter stock quantity"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={newMedicine.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter price"
              />
            </div>
          </div>

          {/* Supplier and Expiry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={newMedicine.supplier}
                onChange={(e) => handleInputChange('supplier', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Supplier</option>
                {suppliers.map(supplier => (
                  <option key={supplier} value={supplier}>{supplier}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={newMedicine.expiry}
                onChange={(e) => handleInputChange('expiry', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Medical Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dosage
              </label>
              <select
                value={newMedicine.dosage}
                onChange={(e) => handleInputChange('dosage', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Dosage</option>
                {dosages.map(dosage => (
                  <option key={dosage} value={dosage}>{dosage}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-center">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newMedicine.prescriptionRequired}
                  onChange={(e) => handleInputChange('prescriptionRequired', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Prescription Required</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows="3"
              value={newMedicine.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter medicine description and usage instructions..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false)
                resetForm()
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddMedicine}
              disabled={!newMedicine.name || !newMedicine.category || !newMedicine.stock || !newMedicine.price || !newMedicine.supplier || !newMedicine.expiry}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>
              {editingMedicine ? 'Update Medicine' : 'Add Medicine'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default PharmacyManagement