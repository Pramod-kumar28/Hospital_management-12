import React, { useState, useEffect } from 'react'
import DataTable from '../../../../components/ui/Tables/DataTable'
import SearchBar from '../../../../components/common/SearchBar/SearchBar'
import Button from '../../../../components/common/Button/Button'
import Modal from '../../../../components/common/Modal/Modal'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const TestCatalogue = () => {
  const [loading, setLoading] = useState(true)
  const [tests, setTests] = useState([])
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [currentTest, setCurrentTest] = useState(null)
  const [newTest, setNewTest] = useState({
    code: '',
    name: '',
    category: '',
    sampleType: '',
    turnaroundTime: '',
    price: '',
    instructions: '',
    parameters: []
  })
  const [newCategory, setNewCategory] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    loadTestData()
  }, [])

  const loadTestData = async () => {
    setLoading(true)
    setTimeout(() => {
      const testCategories = [
        { id: 'hem', name: 'Hematology', count: 15 },
        { id: 'bio', name: 'Biochemistry', count: 25 },
        { id: 'mic', name: 'Microbiology', count: 18 },
        { id: 'ser', name: 'Serology', count: 12 },
        { id: 'hor', name: 'Hormones', count: 20 },
        { id: 'imm', name: 'Immunology', count: 10 }
      ]

      const testData = [
        {
          id: 'CBC',
          name: 'Complete Blood Count',
          category: 'Hematology',
          sampleType: 'Blood',
          turnaroundTime: '4 hours',
          price: 500,
          status: 'active',
          parameters: 18
        },
        {
          id: 'LFT',
          name: 'Liver Function Test',
          category: 'Biochemistry',
          sampleType: 'Blood',
          turnaroundTime: '24 hours',
          price: 1200,
          status: 'active',
          parameters: 8
        },
        {
          id: 'KFT',
          name: 'Kidney Function Test',
          category: 'Biochemistry',
          sampleType: 'Blood',
          turnaroundTime: '24 hours',
          price: 1000,
          status: 'active',
          parameters: 6
        },
        {
          id: 'LIP',
          name: 'Lipid Profile',
          category: 'Biochemistry',
          sampleType: 'Blood',
          turnaroundTime: '24 hours',
          price: 800,
          status: 'active',
          parameters: 4
        },
        {
          id: 'THY',
          name: 'Thyroid Profile',
          category: 'Hormones',
          sampleType: 'Blood',
          turnaroundTime: '48 hours',
          price: 1500,
          status: 'active',
          parameters: 3
        },
        {
          id: 'URC',
          name: 'Urine Culture',
          category: 'Microbiology',
          sampleType: 'Urine',
          turnaroundTime: '72 hours',
          price: 600,
          status: 'active',
          parameters: 1
        }
      ]

      setCategories(testCategories)
      setTests(testData)
      setLoading(false)
    }, 1000)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleAddTest = () => {
    // Generate test code
    const testCode = newTest.name.split(' ').map(w => w[0]).join('').toUpperCase()
    
    const newTestEntry = {
      id: testCode,
      name: newTest.name,
      category: newTest.category,
      sampleType: newTest.sampleType,
      turnaroundTime: newTest.turnaroundTime,
      price: parseFloat(newTest.price),
      status: 'active',
      parameters: newTest.parameters.length
    }
    
    setTests([...tests, newTestEntry])
    setShowAddModal(false)
    setNewTest({
      code: '',
      name: '',
      category: '',
      sampleType: '',
      turnaroundTime: '',
      price: '',
      instructions: '',
      parameters: []
    })
    
    alert(`Test "${newTest.name}" added successfully!`)
  }

  const handleEditTest = (test) => {
    setCurrentTest(test)
    setNewTest({
      code: test.id,
      name: test.name,
      category: test.category,
      sampleType: test.sampleType,
      turnaroundTime: test.turnaroundTime,
      price: test.price.toString(),
      instructions: '',
      parameters: []
    })
    setShowEditModal(true)
  }

  const handleUpdateTest = () => {
    setTests(tests.map(test => 
      test.id === currentTest.id 
        ? { 
            ...test, 
            name: newTest.name,
            category: newTest.category,
            sampleType: newTest.sampleType,
            turnaroundTime: newTest.turnaroundTime,
            price: parseFloat(newTest.price)
          }
        : test
    ))
    setShowEditModal(false)
    alert(`Test "${newTest.name}" updated successfully!`)
  }

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const categoryId = newCategory.toLowerCase().substring(0, 3)
      const newCategoryEntry = {
        id: categoryId,
        name: newCategory,
        count: 0
      }
      setCategories([...categories, newCategoryEntry])
      setNewCategory('')
      setShowCategoryModal(false)
      alert(`Category "${newCategory}" added successfully!`)
    }
  }

  const handleToggleTestStatus = (testId) => {
    setTests(tests.map(test => 
      test.id === testId 
        ? { ...test, status: test.status === 'active' ? 'inactive' : 'active' }
        : test
    ))
  }

  const handleAddParameter = () => {
    setNewTest({
      ...newTest,
      parameters: [...newTest.parameters, { name: '', unit: '', range: '' }]
    })
  }

  const handleParameterChange = (index, field, value) => {
    const updatedParameters = [...newTest.parameters]
    updatedParameters[index][field] = value
    setNewTest({ ...newTest, parameters: updatedParameters })
  }

  const handleRemoveParameter = (index) => {
    const updatedParameters = newTest.parameters.filter((_, i) => i !== index)
    setNewTest({ ...newTest, parameters: updatedParameters })
  }

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'all' || test.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const sampleTypes = ['Blood', 'Urine', 'Stool', 'Sputum', 'CSF', 'Swab', 'Tissue', 'Saliva', 'Other']
  const turnaroundOptions = ['2 hours', '4 hours', '24 hours', '48 hours', '72 hours', '5 days', '7 days', '14 days']

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">📋 Test Catalogue Management</h2>
          <p className="text-gray-500">Manage laboratory test catalogue and configurations</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            icon="fas fa-folder-plus"
            onClick={() => setShowCategoryModal(true)}
          >
            Add Category
          </Button>
          <Button
            variant="primary"
            icon="fas fa-plus"
            onClick={() => setShowAddModal(true)}
          >
            Add Test
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white p-4 rounded border card-shadow">
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeCategory === 'all' 
                ? 'bg-blue-100 text-blue-700 border-blue-300' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } border`}
            onClick={() => setActiveCategory('all')}
          >
            All Tests ({tests.length})
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-lg ${
                activeCategory === category.name 
                  ? 'bg-blue-100 text-blue-700 border-blue-300' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } border`}
              onClick={() => setActiveCategory(category.name)}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Search and Stats */}
      <div className="bg-white p-4 rounded border card-shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search tests by name or code..."
              onSearch={handleSearch}
              className="w-full"
            />
          </div>
          <div className="flex gap-4 text-sm">
            <div className="text-center">
              <p className="text-gray-500">Active Tests</p>
              <p className="text-xl font-bold text-green-600">{tests.filter(t => t.status === 'active').length}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Categories</p>
              <p className="text-xl font-bold text-blue-600">{categories.length}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Total Parameters</p>
              <p className="text-xl font-bold text-purple-600">{tests.reduce((sum, test) => sum + test.parameters, 0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tests Table */}
      <div className="bg-white rounded border card-shadow overflow-hidden">
        <DataTable
          columns={[
            { key: 'id', title: 'Test Code', sortable: true },
            { key: 'name', title: 'Test Name', sortable: true },
            { key: 'category', title: 'Category', sortable: true },
            { key: 'sampleType', title: 'Sample Type', sortable: true },
            { key: 'turnaroundTime', title: 'Turnaround Time', sortable: true },
            { key: 'price', title: 'Price (₹)', sortable: true },
            { key: 'parameters', title: 'Parameters', sortable: true },
            { 
              key: 'status', 
              title: 'Status', 
              sortable: true,
              render: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              )
            },
            {
              key: 'actions',
              title: 'Actions',
              render: (_, row) => (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditTest(row)
                    }}
                    className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                    title="Edit Test"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleToggleTestStatus(row.id)
                    }}
                    className={`px-3 py-1 text-xs rounded hover:opacity-90 ${
                      row.status === 'active' 
                        ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                    title={row.status === 'active' ? 'Deactivate' : 'Activate'}
                  >
                    <i className={`fas ${row.status === 'active' ? 'fa-times' : 'fa-check'}`}></i>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      alert(`Viewing details for ${row.name}`)
                    }}
                    className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                    title="View Details"
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              )
            }
          ]}
          data={filteredTests}
          emptyMessage="No tests found. Add tests to build your catalogue."
        />
      </div>

      {/* Add Test Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Test"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Test Name *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="e.g., Complete Blood Count"
                value={newTest.name}
                onChange={(e) => setNewTest({...newTest, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Test Code
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Auto-generated"
                value={newTest.code}
                onChange={(e) => setNewTest({...newTest, code: e.target.value})}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={newTest.category}
                onChange={(e) => setNewTest({...newTest, category: e.target.value})}
                required
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sample Type *
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={newTest.sampleType}
                onChange={(e) => setNewTest({...newTest, sampleType: e.target.value})}
                required
              >
                <option value="">Select sample type</option>
                {sampleTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Turnaround Time *
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={newTest.turnaroundTime}
                onChange={(e) => setNewTest({...newTest, turnaroundTime: e.target.value})}
                required
              >
                <option value="">Select turnaround time</option>
                {turnaroundOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹) *
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="0.00"
                value={newTest.price}
                onChange={(e) => setNewTest({...newTest, price: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Test Instructions
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg"
              rows="3"
              placeholder="Special instructions for sample collection or preparation..."
              value={newTest.instructions}
              onChange={(e) => setNewTest({...newTest, instructions: e.target.value})}
            />
          </div>

          {/* Parameters Section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Test Parameters
              </label>
              <button
                type="button"
                onClick={handleAddParameter}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                <i className="fas fa-plus mr-1"></i> Add Parameter
              </button>
            </div>
            
            {newTest.parameters.length > 0 ? (
              <div className="space-y-3">
                {newTest.parameters.map((param, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border rounded-lg"
                      placeholder="Parameter name"
                      value={param.name}
                      onChange={(e) => handleParameterChange(index, 'name', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-24 px-3 py-2 border rounded-lg"
                      placeholder="Unit"
                      value={param.unit}
                      onChange={(e) => handleParameterChange(index, 'unit', e.target.value)}
                    />
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border rounded-lg"
                      placeholder="Reference range"
                      value={param.range}
                      onChange={(e) => handleParameterChange(index, 'range', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveParameter(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">No parameters added yet</p>
                <p className="text-sm text-gray-400 mt-1">Add parameters to define what this test measures</p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAddTest}
              disabled={!newTest.name || !newTest.category || !newTest.sampleType || !newTest.turnaroundTime || !newTest.price}
            >
              Add Test
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Test Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Test"
        size="lg"
      >
        {currentTest && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Test Code
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg bg-gray-50"
                  value={newTest.code}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Test Name *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={newTest.name}
                  onChange={(e) => setNewTest({...newTest, name: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg"
                  value={newTest.category}
                  onChange={(e) => setNewTest({...newTest, category: e.target.value})}
                  required
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sample Type *
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg"
                  value={newTest.sampleType}
                  onChange={(e) => setNewTest({...newTest, sampleType: e.target.value})}
                  required
                >
                  {sampleTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Turnaround Time *
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg"
                  value={newTest.turnaroundTime}
                  onChange={(e) => setNewTest({...newTest, turnaroundTime: e.target.value})}
                  required
                >
                  {turnaroundOptions.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={newTest.price}
                  onChange={(e) => setNewTest({...newTest, price: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleUpdateTest}
                disabled={!newTest.name || !newTest.category || !newTest.sampleType || !newTest.turnaroundTime || !newTest.price}
              >
                Update Test
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Category Modal */}
      <Modal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        title="Add New Category"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 p-3 rounded">
            <p className="text-sm text-blue-800">
              <i className="fas fa-info-circle mr-2"></i>
              Create new test categories to organize your test catalogue
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name *
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="e.g., Molecular Diagnostics"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowCategoryModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAddCategory}
              disabled={!newCategory.trim()}
            >
              Add Category
            </Button>
          </div>
        </div>
      </Modal>

      {/* Bulk Actions */}
      <div className="bg-white p-4 rounded border card-shadow">
        <h3 className="text-lg font-semibold mb-3">Bulk Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" icon="fas fa-file-import">
            Import Tests
          </Button>
          <Button variant="outline" icon="fas fa-file-export">
            Export Catalogue
          </Button>
          <Button variant="outline" icon="fas fa-sync-alt">
            Sync with LIS
          </Button>
          <Button variant="outline" icon="fas fa-print">
            Print Catalogue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TestCatalogue