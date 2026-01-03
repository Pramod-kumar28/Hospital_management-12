// import React, { useState, useEffect } from 'react'
// import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
// import DataTable from '../../../../components/ui/Tables/DataTable'

// const PharmacyManagement = () => {
//   const [loading, setLoading] = useState(true)
//   const [medicines, setMedicines] = useState([])

//   useEffect(() => {
//     loadMedicines()
//   }, [])

//   const loadMedicines = async () => {
//     setLoading(true)
//     setTimeout(() => {
//       setMedicines([
//         { id: 'DRG-001', name: 'Paracetamol', category: 'Pain Relief', stock: 45, expiry: '2024-12-31', supplier: 'MediCorp', price: 25 },
//         { id: 'DRG-002', name: 'Azithromycin', category: 'Antibiotic', stock: 12, expiry: '2024-10-15', supplier: 'PharmaPlus', price: 120 },
//         { id: 'DRG-003', name: 'Insulin', category: 'Diabetes', stock: 8, expiry: '2024-11-20', supplier: 'BioMed', price: 450 },
//         { id: 'DRG-004', name: 'Amoxicillin', category: 'Antibiotic', stock: 23, expiry: '2025-01-10', supplier: 'MediCorp', price: 85 },
//         { id: 'DRG-005', name: 'Vitamin C', category: 'Supplements', stock: 3, expiry: '2024-09-30', supplier: 'HealthSupp', price: 35 }
//       ])
//       setLoading(false)
//     }, 1000)
//   }

//   const lowStockItems = medicines.filter(item => item.stock < 10).length
//   const outOfStockItems = medicines.filter(item => item.stock === 0).length

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="animate-fade-in">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold text-gray-700">
//           <i className="fas fa-pills mr-2"></i>Pharmacy Management
//         </h2>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
//           <i className="fas fa-plus mr-2"></i>Add Medicine
//         </button>
//       </div>

//       {/* Pharmacy Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white p-4 rounded-lg card-shadow border text-center">
//           <div className="text-2xl font-bold text-blue-600">{medicines.length}</div>
//           <div className="text-sm text-gray-500">Total Medicines</div>
//         </div>
//         <div className="bg-white p-4 rounded-lg card-shadow border text-center">
//           <div className="text-2xl font-bold text-green-600">{medicines.filter(item => item.stock > 20).length}</div>
//           <div className="text-sm text-gray-500">Good Stock</div>
//         </div>
//         <div className="bg-white p-4 rounded-lg card-shadow border text-center">
//           <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
//           <div className="text-sm text-gray-500">Low Stock</div>
//         </div>
//         <div className="bg-white p-4 rounded-lg card-shadow border text-center">
//           <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
//           <div className="text-sm text-gray-500">Out of Stock</div>
//         </div>
//       </div>

//       {/* Medicines Table */}
//       <div className="bg-white rounded-xl card-shadow border overflow-hidden">
//         <div className="overflow-x-auto">
//           <DataTable
//             columns={[
//               { key: 'id', title: 'Drug ID', sortable: true },
//               { key: 'name', title: 'Name', sortable: true },
//               { 
//                 key: 'category', 
//                 title: 'Category',
//                 render: (value) => (
//                   <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
//                     {value}
//                   </span>
//                 )
//               },
//               { 
//                 key: 'stock', 
//                 title: 'Stock', 
//                 sortable: true,
//                 render: (value) => (
//                   <span className={`${
//                     value < 10 ? 'low-stock' : value === 0 ? 'out-of-stock' : 'status-available'
//                   } px-2 py-1 rounded text-xs`}>
//                     {value}
//                   </span>
//                 )
//               },
//               { key: 'expiry', title: 'Expiry Date', sortable: true },
//               { key: 'supplier', title: 'Supplier', sortable: true },
//               { key: 'price', title: 'Price', sortable: true },
//               {
//                 key: 'actions',
//                 title: 'Actions',
//                 render: (_, row) => (
//                   <div className="flex gap-2">
//                     <button className="text-blue-600 hover:text-blue-800">
//                       <i className="fas fa-edit"></i>
//                     </button>
//                     <button className="text-green-600 hover:text-green-800">
//                       <i className="fas fa-boxes"></i>
//                     </button>
//                     <button className="text-red-600 hover:text-red-800">
//                       <i className="fas fa-trash"></i>
//                     </button>
//                   </div>
//                 )
//               }
//             ]}
//             data={medicines}
//           />
//         </div>
//       </div>

//       {/* Low Stock Alert */}
//       {lowStockItems > 0 && (
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
//           <div className="flex items-center">
//             <i className="fas fa-exclamation-triangle text-yellow-600 text-xl mr-3"></i>
//             <div>
//               <h4 className="font-semibold text-yellow-800">Low Stock Alert</h4>
//               <p className="text-yellow-700 text-sm">
//                 {lowStockItems} medicine(s) are running low on stock. Please reorder soon.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default PharmacyManagement


















import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import DataTable from '../../../../components/ui/Tables/DataTable'
import Modal from '../../../../components/common/Modal/Modal' // Your existing modal component

const PharmacyManagement = () => {
  const [loading, setLoading] = useState(true)
  const [medicines, setMedicines] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
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
    setIsAddModalOpen(false)
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
      setIsAddModalOpen(true)
      // You might want to track if we're editing and which medicine
    }
  }

  const handleRestock = (medicineId, quantity = 10) => {
    setMedicines(prev => prev.map(medicine => 
      medicine.id === medicineId 
        ? { ...medicine, stock: medicine.stock + quantity }
        : medicine
    ))
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
          💊 Pharmacy Management
        </h2>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <i className="fas fa-plus mr-2"></i>Add Medicine
        </button>
      </div>

      {/* Pharmacy Stats */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-blue-600">{medicines.length}</div>
          <div className="text-sm text-gray-500">Total Medicines</div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-green-600">{medicines.filter(item => item.stock > 20).length}</div>
          <div className="text-sm text-gray-500">Good Stock</div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
          <div className="text-sm text-gray-500">Low Stock</div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow border text-center">
          <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
          <div className="text-sm text-gray-500">Out of Stock</div>
        </div>
      </div> */}

      {/* Pharmacy Stats - Compact Cards */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
  {[
    { 
      value: medicines.length, 
      label: 'Total Medicines', 
      color: 'blue', 
      icon: 'fas fa-pills',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      iconBg: 'bg-blue-100'
    },
    { 
      value: medicines.filter(item => item.stock > 20).length, 
      label: 'Good Stock', 
      color: 'green', 
      icon: 'fas fa-check-circle',
      bg: 'bg-green-50',
      text: 'text-green-600',
      iconBg: 'bg-green-100'
    },
    { 
      value: lowStockItems, 
      label: 'Low Stock', 
      color: 'yellow', 
      icon: 'fas fa-exclamation-triangle',
      bg: 'bg-yellow-50',
      text: 'text-yellow-600',
      iconBg: 'bg-yellow-100'
    },
    { 
      value: outOfStockItems, 
      label: 'Out of Stock', 
      color: 'red', 
      icon: 'fas fa-times-circle',
      bg: 'bg-red-50',
      text: 'text-red-600',
      iconBg: 'bg-red-100'
    }
  ].map((stat, index) => (
    <div 
      key={index} 
      className={`${stat.bg} border border-gray-200 p-5 rounded-xl hover:shadow-md transition-all duration-300`}
    >
      <div className="flex items-center gap-3">
        <div className={`${stat.iconBg} p-3 rounded-lg`}>
          <i className={`${stat.icon} ${stat.text} text-lg`}></i>
        </div>
        <div>
          <div className={`text-2xl font-bold ${stat.text}`}>{stat.value}</div>
          <div className="text-gray-800 font-medium text-sm">{stat.label}</div>
        </div>
      </div>
    </div>
  ))}
</div>

      {/* Medicines Table */}
      <div className="bg-white rounded-xl card-shadow border overflow-hidden">
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
                      onClick={() => handleRestock(row.id)}
                      className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                      title="Restock"
                    >
                      <i className="fas fa-boxes"></i>
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
            data={medicines}
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

      {/* Add Medicine Modal - Defined in the same file */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => {
          setIsAddModalOpen(false)
          resetForm()
        }} 
        title="Add New Medicine"
        size="lg"
      >
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medicine Name *
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
                Category *
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
                Stock Quantity *
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
                Price (₹) *
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
                Supplier *
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
                Expiry Date *
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
              disabled={!newMedicine.name || !newMedicine.category || !newMedicine.stock || !newMedicine.price}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>
              Add Medicine
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default PharmacyManagement