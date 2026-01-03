import React, { useState, useEffect } from 'react'
import DataTable from '../../../../components/ui/Tables/DataTable'
import SearchBar from '../../../../components/common/SearchBar/SearchBar'
import Button from '../../../../components/common/Button/Button'
import Modal from '../../../../components/common/Modal/Modal'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const QualityControl = () => {
  const [loading, setLoading] = useState(true)
  const [qcRuns, setQcRuns] = useState([])
  const [qcMaterials, setQcMaterials] = useState([])
  const [qcRules, setQcRules] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showNewRunModal, setShowNewRunModal] = useState(false)
  const [showMaterialModal, setShowMaterialModal] = useState(false)
  const [showRuleModal, setShowRuleModal] = useState(false)
  const [selectedQCRun, setSelectedQCRun] = useState(null)
  const [newQCRun, setNewQCRun] = useState({
    test: '',
    material: '',
    lotNumber: '',
    value: '',
    operator: '',
    date: ''
  })

  useEffect(() => {
    loadQCData()
  }, [])

  const loadQCData = async () => {
    setLoading(true)
    setTimeout(() => {
      const qcRunsData = [
        {
          id: 'QC-2024-001',
          test: 'CBC',
          material: 'Hematology Control',
          lotNumber: 'LOT-123',
          date: '2024-01-15',
          operator: 'Lab Tech Ravi',
          status: 'passed',
          value: '12.5',
          target: '12.0',
          sd: '0.5',
          ruleViolations: 0,
          chartData: []
        },
        {
          id: 'QC-2024-002',
          test: 'Glucose',
          material: 'Chemistry Control Level 1',
          lotNumber: 'LOT-456',
          date: '2024-01-15',
          operator: 'Lab Tech Priya',
          status: 'warning',
          value: '105',
          target: '100',
          sd: '5',
          ruleViolations: 1,
          chartData: []
        },
        {
          id: 'QC-2024-003',
          test: 'Creatinine',
          material: 'Chemistry Control Level 2',
          lotNumber: 'LOT-789',
          date: '2024-01-14',
          operator: 'Lab Tech Sanjay',
          status: 'failed',
          value: '2.5',
          target: '1.8',
          sd: '0.2',
          ruleViolations: 2,
          chartData: []
        },
        {
          id: 'QC-2024-004',
          test: 'ALT',
          material: 'Liver Enzyme Control',
          lotNumber: 'LOT-234',
          date: '2024-01-14',
          operator: 'Lab Tech Meena',
          status: 'passed',
          value: '35',
          target: '30',
          sd: '5',
          ruleViolations: 0,
          chartData: []
        }
      ]

      const qcMaterialsData = [
        {
          id: 'QCM-001',
          name: 'Hematology Control',
          type: 'Hematology',
          manufacturer: 'Sysmex',
          lotNumber: 'LOT-123',
          expiryDate: '2024-06-30',
          storage: '2-8°C',
          quantity: 25,
          status: 'active'
        },
        {
          id: 'QCM-002',
          name: 'Chemistry Control Level 1',
          type: 'Chemistry',
          manufacturer: 'Bio-Rad',
          lotNumber: 'LOT-456',
          expiryDate: '2024-05-15',
          storage: '2-8°C',
          quantity: 30,
          status: 'active'
        },
        {
          id: 'QCM-003',
          name: 'Chemistry Control Level 2',
          type: 'Chemistry',
          manufacturer: 'Bio-Rad',
          lotNumber: 'LOT-789',
          expiryDate: '2024-05-15',
          storage: '2-8°C',
          quantity: 28,
          status: 'active'
        }
      ]

      const qcRulesData = [
        {
          id: 'RULE-001',
          name: '1-3s Rule',
          description: 'One point beyond 3 SD from mean',
          type: 'Westgard',
          action: 'Reject run, investigate',
          priority: 'high'
        },
        {
          id: 'RULE-002',
          name: '2-2s Rule',
          description: 'Two consecutive points beyond 2 SD on same side',
          type: 'Westgard',
          action: 'Reject run, investigate',
          priority: 'high'
        },
        {
          id: 'RULE-003',
          name: 'R-4s Rule',
          description: 'Range of 4 SD between two points',
          type: 'Westgard',
          action: 'Reject run',
          priority: 'high'
        },
        {
          id: 'RULE-004',
          name: '4-1s Rule',
          description: 'Four consecutive points beyond 1 SD on same side',
          type: 'Westgard',
          action: 'Warning, check trend',
          priority: 'medium'
        }
      ]

      setQcRuns(qcRunsData)
      setQcMaterials(qcMaterialsData)
      setQcRules(qcRulesData)
      setLoading(false)
    }, 1000)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleNewQCRun = () => {
    const qcId = `QC-${new Date().getFullYear()}-${(qcRuns.length + 1).toString().padStart(3, '0')}`
    
    // Calculate status based on value vs target
    const value = parseFloat(newQCRun.value)
    const target = 12.0 // In real app, this would come from material data
    const sd = 0.5
    
    let status = 'passed'
    let ruleViolations = 0
    
    if (Math.abs(value - target) > 3 * sd) {
      status = 'failed'
      ruleViolations = 1
    } else if (Math.abs(value - target) > 2 * sd) {
      status = 'warning'
      ruleViolations = 1
    }
    
    const newRun = {
      id: qcId,
      test: newQCRun.test,
      material: newQCRun.material,
      lotNumber: newQCRun.lotNumber,
      date: newQCRun.date || new Date().toISOString().split('T')[0],
      operator: newQCRun.operator || 'Current User',
      status: status,
      value: newQCRun.value,
      target: target.toString(),
      sd: sd.toString(),
      ruleViolations: ruleViolations,
      chartData: []
    }
    
    setQcRuns([newRun, ...qcRuns])
    setShowNewRunModal(false)
    setNewQCRun({
      test: '',
      material: '',
      lotNumber: '',
      value: '',
      operator: '',
      date: ''
    })
    
    alert(`QC Run ${qcId} recorded!\nStatus: ${status}`)
  }

  const handleApproveQCRun = (runId) => {
    setQcRuns(qcRuns.map(run => 
      run.id === runId ? { ...run, status: 'approved' } : run
    ))
    alert(`QC Run ${runId} approved for use`)
  }

  const handleRejectQCRun = (runId) => {
    setQcRuns(qcRuns.map(run => 
      run.id === runId ? { ...run, status: 'rejected' } : run
    ))
    alert(`QC Run ${runId} rejected. Investigation required.`)
  }

  const handleViewChart = (runId) => {
    const run = qcRuns.find(r => r.id === runId)
    if (run) {
      alert(`QC Chart for ${run.test}\nValue: ${run.value} | Target: ${run.target} ± ${run.sd}`)
      // In real app, show QC chart modal
    }
  }

  const handleAddMaterial = () => {
    alert('Add QC Material functionality')
    setShowMaterialModal(false)
  }

  const handleAddRule = () => {
    alert('Add QC Rule functionality')
    setShowRuleModal(false)
  }

  const filteredQCRuns = qcRuns.filter(run =>
    run.test.toLowerCase().includes(searchTerm.toLowerCase()) ||
    run.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
    run.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const testOptions = ['CBC', 'Glucose', 'Creatinine', 'ALT', 'AST', 'Bilirubin', 'Cholesterol', 'Triglycerides', 'Urea', 'Sodium', 'Potassium']
  const materialOptions = qcMaterials.map(m => m.name)

  if (loading) return <LoadingSpinner />

  return (
    <>
        <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Quality Control Workflows</h2>
          <p className="text-gray-500">Manage QC runs, materials, rules, and compliance tracking</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            icon="fas fa-vial"
            onClick={() => setShowNewRunModal(true)}
          >
            New QC Run
          </Button>
          <Button
            variant="primary"
            icon="fas fa-chart-line"
            onClick={loadQCData}
          >
            Refresh Data
          </Button>
        </div>
      </div>

      {/* QC Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded border card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <i className="fas fa-vial text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Today's QC Runs</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {qcRuns.filter(r => r.date === new Date().toISOString().split('T')[0]).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded border card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <i className="fas fa-check-circle text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Passed Runs</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {qcRuns.filter(r => r.status === 'passed' || r.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded border card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg mr-4">
              <i className="fas fa-exclamation-triangle text-yellow-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Warning Runs</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {qcRuns.filter(r => r.status === 'warning').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded border card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg mr-4">
              <i className="fas fa-times-circle text-red-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Failed Runs</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {qcRuns.filter(r => r.status === 'failed' || r.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* QC Runs Table */}
      <div className="bg-white rounded border card-shadow overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">QC Runs</h3>
            <p className="text-sm text-gray-500">Recent quality control runs and their status</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMaterialModal(true)}
            >
              Manage Materials
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRuleModal(true)}
            >
              Manage Rules
            </Button>
          </div>
        </div>
        <DataTable
          columns={[
            { key: 'id', title: 'QC ID', sortable: true },
            { key: 'test', title: 'Test', sortable: true },
            { key: 'material', title: 'QC Material', sortable: true },
            { key: 'lotNumber', title: 'Lot Number', sortable: true },
            { key: 'date', title: 'Date', sortable: true },
            { key: 'operator', title: 'Operator', sortable: true },
            { 
              key: 'status', 
              title: 'Status', 
              sortable: true,
              render: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  value === 'passed' || value === 'approved' ? 'bg-green-100 text-green-800' :
                  value === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  value === 'failed' || value === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              )
            },
            { key: 'value', title: 'Value', sortable: true },
            { key: 'target', title: 'Target', sortable: true },
            { key: 'sd', title: 'SD', sortable: true },
            { key: 'ruleViolations', title: 'Rule Violations', sortable: true },
            {
              key: 'actions',
              title: 'Actions',
              render: (_, row) => (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewChart(row.id)
                    }}
                    className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                    title="View QC Chart"
                  >
                    <i className="fas fa-chart-line"></i>
                  </button>
                  {row.status === 'passed' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleApproveQCRun(row.id)
                      }}
                      className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200"
                      title="Approve Run"
                    >
                      <i className="fas fa-check"></i>
                    </button>
                  )}
                  {(row.status === 'warning' || row.status === 'failed') && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRejectQCRun(row.id)
                      }}
                      className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200"
                      title="Reject Run"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </div>
              )
            }
          ]}
          data={filteredQCRuns}
          onRowClick={(run) => setSelectedQCRun(run)}
          emptyMessage="No QC runs found. Start by recording a new QC run."
        />
      </div>

      {/* Selected QC Run Details */}
      {selectedQCRun && (
        <div className="bg-white p-6 rounded border card-shadow">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold">QC Run Details: {selectedQCRun.id}</h3>
              <p className="text-gray-600">{selectedQCRun.test} • {selectedQCRun.material} • Lot: {selectedQCRun.lotNumber}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                onClick={() => handleViewChart(selectedQCRun.id)}
              >
                View Chart
              </button>
              <button
                className="px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200"
                onClick={() => alert('Generate QC report')}
              >
                Generate Report
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-500">Observed Value</p>
              <p className="text-2xl font-bold">{selectedQCRun.value}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-500">Target Value</p>
              <p className="text-2xl font-bold">{selectedQCRun.target}</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-500">Standard Deviation</p>
              <p className="text-2xl font-bold">±{selectedQCRun.sd}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-500">Deviation from Mean</p>
              <p className="text-2xl font-bold">
                {((parseFloat(selectedQCRun.value) - parseFloat(selectedQCRun.target)) / parseFloat(selectedQCRun.sd)).toFixed(1)} SD
              </p>
            </div>
          </div>

          {/* QC Rules Violations */}
          {selectedQCRun.ruleViolations > 0 ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                QC Rule Violations Detected ({selectedQCRun.ruleViolations})
              </h4>
              <ul className="list-disc list-inside text-sm text-red-700">
                <li>1-3s Rule: Point beyond 3 SD from mean</li>
                <li>Investigation required before releasing patient results</li>
              </ul>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">
                <i className="fas fa-check-circle mr-2"></i>
                No QC Rule Violations Detected
              </h4>
              <p className="text-sm text-green-700">All QC results are within acceptable limits</p>
            </div>
          )}
        </div>
      )}

      {/* QC Materials */}
      <div className="bg-white rounded border card-shadow overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">QC Materials Inventory</h3>
          <p className="text-sm text-gray-500">Available quality control materials and their status</p>
        </div>
        <DataTable
          columns={[
            { key: 'name', title: 'Material Name', sortable: true },
            { key: 'type', title: 'Type', sortable: true },
            { key: 'manufacturer', title: 'Manufacturer', sortable: true },
            { key: 'lotNumber', title: 'Lot Number', sortable: true },
            { key: 'expiryDate', title: 'Expiry Date', sortable: true },
            { key: 'storage', title: 'Storage', sortable: true },
            { key: 'quantity', title: 'Quantity', sortable: true },
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
            }
          ]}
          data={qcMaterials}
          emptyMessage="No QC materials found."
        />
      </div>

      {/* QC Rules */}
      <div className="bg-white rounded border card-shadow overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">QC Rules Configuration</h3>
          <p className="text-sm text-gray-500">Westgard rules and their configurations</p>
        </div>
        <DataTable
          columns={[
            { key: 'name', title: 'Rule Name', sortable: true },
            { key: 'description', title: 'Description', sortable: true },
            { key: 'type', title: 'Type', sortable: true },
            { key: 'action', title: 'Action Required', sortable: true },
            { 
              key: 'priority', 
              title: 'Priority', 
              sortable: true,
              render: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  value === 'high' ? 'bg-red-100 text-red-800' :
                  value === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              )
            }
          ]}
          data={qcRules}
          emptyMessage="No QC rules configured."
        />
      </div>

      {/* QC Workflow Actions */}
      <div className="bg-white p-6 rounded border card-shadow">
        <h3 className="text-lg font-semibold mb-4">QC Workflow Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg hover:bg-blue-50 transition-colors">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <i className="fas fa-chart-bar text-blue-600"></i>
              </div>
              <h4 className="font-semibold">Levey-Jennings Chart</h4>
            </div>
            <p className="text-sm text-gray-600">Generate QC charts for trend analysis</p>
            <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm">
              View Charts →
            </button>
          </div>
          
          <div className="p-4 border rounded-lg hover:bg-green-50 transition-colors">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <i className="fas fa-clipboard-check text-green-600"></i>
              </div>
              <h4 className="font-semibold">QC Compliance Report</h4>
            </div>
            <p className="text-sm text-gray-600">Generate compliance reports for audits</p>
            <button className="mt-3 text-green-600 hover:text-green-800 text-sm">
              Generate Report →
            </button>
          </div>
          
          <div className="p-4 border rounded-lg hover:bg-purple-50 transition-colors">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <i className="fas fa-bell text-purple-600"></i>
              </div>
              <h4 className="font-semibold">QC Alerts</h4>
            </div>
            <p className="text-sm text-gray-600">Configure alerts for QC violations</p>
            <button className="mt-3 text-purple-600 hover:text-purple-800 text-sm">
              Configure Alerts →
            </button>
          </div>
        </div>
      </div>
    </div>
          
          
      {/* New QC Run Modal */}
      <Modal
        isOpen={showNewRunModal}
        onClose={() => setShowNewRunModal(false)}
        title="Record New QC Run"
        size="lg"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 p-3 rounded">
            <p className="text-sm text-blue-800">
              <i className="fas fa-info-circle mr-2"></i>
              Record quality control run for a specific test and material
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Test *
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={newQCRun.test}
                onChange={(e) => setNewQCRun({...newQCRun, test: e.target.value})}
                required
              >
                <option value="">Select test</option>
                {testOptions.map(test => (
                  <option key={test} value={test}>{test}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                QC Material *
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={newQCRun.material}
                onChange={(e) => setNewQCRun({...newQCRun, material: e.target.value})}
                required
              >
                <option value="">Select material</option>
                {materialOptions.map(material => (
                  <option key={material} value={material}>{material}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lot Number *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter lot number"
                value={newQCRun.lotNumber}
                onChange={(e) => setNewQCRun({...newQCRun, lotNumber: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observed Value *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter numeric value"
                value={newQCRun.value}
                onChange={(e) => setNewQCRun({...newQCRun, value: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Operator
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter operator name"
                value={newQCRun.operator}
                onChange={(e) => setNewQCRun({...newQCRun, operator: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-lg"
                value={newQCRun.date}
                onChange={(e) => setNewQCRun({...newQCRun, date: e.target.value})}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowNewRunModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleNewQCRun}
              disabled={!newQCRun.test || !newQCRun.material || !newQCRun.lotNumber || !newQCRun.value}
            >
              Record QC Run
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default QualityControl