import React, { useState, useEffect } from 'react'
import Modal from '../../../../components/common/Modal/Modal';

const HospitalManagement = () => {
  const [hospitals, setHospitals] = useState([])
  const [filters, setFilters] = useState({
    status: '',
    plan: '',
    search: ''
  })
  const [isAddHospitalModalOpen, setIsAddHospitalModalOpen] = useState(false)
  const [newHospital, setNewHospital] = useState({
    name: '',
    address: '',
    email: '',
    contact: '',
    subscriptionPlan: 'Basic',
    status: 'Active'
  })

  const fetchHospitals = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await res.json()
    
    const hospitalsData = data.slice(0, 8).map((h, i) => ({
      id: `HSP-${1000 + i}`,
      name: h.company.name,
      address: `${h.address.street}, ${h.address.city}`,
      email: h.email,
      contact: h.phone,
      subscriptionPlan: ['Basic', 'Professional', 'Enterprise'][i % 3],
      status: i % 5 === 0 ? 'Suspended' : 'Active',
      createdDate: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
      logo: `https://picsum.photos/seed/hospital${i}/80/80`
    }))

    setHospitals(hospitalsData)
  }

  useEffect(() => {
    fetchHospitals()
  }, [])

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesStatus = !filters.status || hospital.status === filters.status
    const matchesPlan = !filters.plan || hospital.subscriptionPlan === filters.plan
    const matchesSearch = !filters.search || hospital.name.toLowerCase().includes(filters.search.toLowerCase())
    return matchesStatus && matchesPlan && matchesSearch
  })

  const showAddHospitalModal = () => {
    setIsAddHospitalModalOpen(true)
  }

  const closeAddHospitalModal = () => {
    setIsAddHospitalModalOpen(false)
    setNewHospital({
      name: '',
      address: '',
      email: '',
      contact: '',
      subscriptionPlan: 'Basic',
      status: 'Active'
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewHospital(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddHospital = (e) => {
    e.preventDefault()
    
    // Generate new hospital data
    const hospital = {
      id: `HSP-${1000 + hospitals.length}`,
      name: newHospital.name,
      address: newHospital.address,
      email: newHospital.email,
      contact: newHospital.contact,
      subscriptionPlan: newHospital.subscriptionPlan,
      status: newHospital.status,
      createdDate: new Date().toISOString().split('T')[0],
      logo: `https://picsum.photos/seed/hospital${hospitals.length}/80/80`
    }

    // Add to hospitals array
    setHospitals(prev => [hospital, ...prev])
    
    // Show success message
    alert(`🏥 Hospital "${hospital.name}" added successfully!`)
    
    // Close modal and reset form
    closeAddHospitalModal()
  }

  const editHospital = (hospitalId) => {
    const hospital = hospitals.find(h => h.id === hospitalId)
    alert(`✏️ Editing hospital: ${hospital.name}`)
  }

  const toggleHospitalStatus = (hospitalId) => {
    const updatedHospitals = hospitals.map(h => 
      h.id === hospitalId ? { ...h, status: h.status === 'Active' ? 'Suspended' : 'Active' } : h
    )
    setHospitals(updatedHospitals)
    const hospital = hospitals.find(h => h.id === hospitalId)
    alert(`🔄 ${hospital.name} status changed to: ${hospital.status === 'Active' ? 'Suspended' : 'Active'}`)
  }

  const deleteHospital = (hospitalId) => {
    if (confirm('Are you sure you want to delete this hospital?')) {
      const updatedHospitals = hospitals.filter(h => h.id !== hospitalId)
      setHospitals(updatedHospitals)
      alert('🗑️ Hospital deleted successfully')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          <i className="fas fa-hospital text-blue-500 mr-2"></i>Hospital Management
        </h2>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={showAddHospitalModal}
        >
          <i className="fas fa-plus mr-2"></i>Add Hospital
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg card-shadow border">
        <div className="flex flex-wrap gap-4">
          <select 
            className="p-2 border rounded" 
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
          <select 
            className="p-2 border rounded"
            value={filters.plan}
            onChange={(e) => setFilters(prev => ({ ...prev, plan: e.target.value }))}
          >
            <option value="">All Plans</option>
            <option value="Basic">Basic</option>
            <option value="Professional">Professional</option>
            <option value="Enterprise">Enterprise</option>
          </select>
          <input 
            type="text" 
            placeholder="Search hospitals..." 
            className="p-2 border rounded flex-1" 
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          />
        </div>
      </div>

      {/* Hospitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.map(hospital => (
          <div key={hospital.id} className="bg-white rounded-xl card-shadow border p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={hospital.logo} className="w-12 h-12 rounded-lg" alt="hospital" />
                <div>
                  <h3 className="font-semibold text-blue-700">{hospital.name}</h3>
                  <p className="text-xs text-gray-500">{hospital.id}</p>
                </div>
              </div>
              <span className={`status-${hospital.status.toLowerCase()} px-2 py-1 rounded text-xs`}>
                {hospital.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-gray-400"></i>
                <span>{hospital.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-phone text-gray-400"></i>
                <span>{hospital.contact}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-envelope text-gray-400"></i>
                <span>{hospital.email}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <span className={`plan-${hospital.subscriptionPlan.toLowerCase()} px-2 py-1 rounded text-xs`}>
                {hospital.subscriptionPlan}
              </span>
              <div className="flex gap-2">
                <button 
                  className="text-blue-600 hover:text-blue-800" 
                  onClick={() => editHospital(hospital.id)}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  className="text-green-600 hover:text-green-800" 
                  onClick={() => toggleHospitalStatus(hospital.id)}
                >
                  <i className="fas fa-power-off"></i>
                </button>
                <button 
                  className="text-red-600 hover:text-red-800" 
                  onClick={() => deleteHospital(hospital.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Hospital Modal */}
      <Modal
        isOpen={isAddHospitalModalOpen}
        onClose={closeAddHospitalModal}
        title="Add New Hospital"
        size="lg"
      >
        <form onSubmit={handleAddHospital} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hospital Name *
              </label>
              <input
                type="text"
                name="name"
                value={newHospital.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter hospital name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={newHospital.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email address"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number *
              </label>
              <input
                type="tel"
                name="contact"
                value={newHospital.contact}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter contact number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subscription Plan *
              </label>
              <select
                name="subscriptionPlan"
                value={newHospital.subscriptionPlan}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Basic">Basic</option>
                <option value="Professional">Professional</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <textarea
                name="address"
                value={newHospital.address}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full address"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                name="status"
                value={newHospital.status}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={closeAddHospitalModal}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>
              Add Hospital
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default HospitalManagement