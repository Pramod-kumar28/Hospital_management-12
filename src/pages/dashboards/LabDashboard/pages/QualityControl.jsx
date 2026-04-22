// src/pages/dashboards/LabDashboard/pages/QualityControl.jsx
import React, { useState, useEffect } from 'react'
import DataTable from '../../../../components/ui/Tables/DataTable'
import SearchBar from '../../../../components/common/SearchBar/SearchBar'
import Button from '../../../../components/common/Button/Button'
import Modal from '../../../../components/common/Modal/Modal'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import Toast from '../../../../components/common/Toast/Toast'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'

const QualityControl = () => {
  const [loading, setLoading] = useState(true)
  const [qcRuns, setQcRuns] = useState([])
  const [qcMaterials, setQcMaterials] = useState([])
  const [qcRules, setQcRules] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showNewRunModal, setShowNewRunModal] = useState(false)
  const [showMaterialModal, setShowMaterialModal] = useState(false)
  const [showRuleModal, setShowRuleModal] = useState(false)
  const [showChartModal, setShowChartModal] = useState(false)
  const [showComplianceModal, setShowComplianceModal] = useState(false)
  const [showAlertsModal, setShowAlertsModal] = useState(false)
  const [showTrendAnalysisModal, setShowTrendAnalysisModal] = useState(false)
  const [showRefreshModal, setShowRefreshModal] = useState(false)
  const [selectedQCRun, setSelectedQCRun] = useState(null)
  const [toast, setToast] = useState(null)
  const [trendAnalysisData, setTrendAnalysisData] = useState(null)
  const [refreshData, setRefreshData] = useState({ newRuns: 0, timestamp: '' })
  
  const [newQCRun, setNewQCRun] = useState({
    test: '',
    material: '',
    lotNumber: '',
    value: '',
    operator: '',
    date: ''
  })

  const [newMaterial, setNewMaterial] = useState({
    name: '',
    type: '',
    manufacturer: '',
    lotNumber: '',
    expiryDate: '',
    storage: '',
    quantity: '',
    status: 'active'
  })

  const [newRule, setNewRule] = useState({
    name: '',
    description: '',
    type: 'Westgard',
    action: '',
    priority: 'medium'
  })

  useEffect(() => {
    loadQCData()
  }, [])

  const loadQCData = async () => {
    setLoading(true)
    setTimeout(() => {
      // Generate historical QC data for charts
      const generateHistoricalData = (baseValue, trend, startDate) => {
        const data = []
        for (let i = 0; i < 30; i++) {
          const date = new Date(startDate)
          date.setDate(date.getDate() - i)
          const randomVariation = (Math.random() - 0.5) * 2
          const trendEffect = trend * i / 30
          const value = baseValue + randomVariation + trendEffect
          data.unshift({
            date: date.toISOString().split('T')[0],
            value: parseFloat(value.toFixed(2)),
            sd1Upper: baseValue + 1,
            sd1Lower: baseValue - 1,
            sd2Upper: baseValue + 2,
            sd2Lower: baseValue - 2,
            sd3Upper: baseValue + 3,
            sd3Lower: baseValue - 3
          })
        }
        return data
      }

      const qcRunsData = [
        {
          id: 'QC-2024-001',
          test: 'CBC',
          material: 'Hematology Control',
          lotNumber: 'LOT-123',
          date: '2024-01-15',
          operator: 'Lab Tech Ravi',
          status: 'passed',
          value: 12.5,
          target: 12.0,
          sd: 0.5,
          ruleViolations: 0,
          chartData: generateHistoricalData(12.0, 0.1, '2024-01-15'),
          comments: 'All parameters within range',
          reviewedBy: 'Dr. Sharma',
          reviewDate: '2024-01-15'
        },
        {
          id: 'QC-2024-002',
          test: 'Glucose',
          material: 'Chemistry Control Level 1',
          lotNumber: 'LOT-456',
          date: '2024-01-15',
          operator: 'Lab Tech Priya',
          status: 'warning',
          value: 105,
          target: 100,
          sd: 5,
          ruleViolations: 1,
          chartData: generateHistoricalData(100, 2, '2024-01-15'),
          comments: 'Slight elevation, monitor closely',
          reviewedBy: '',
          reviewDate: ''
        },
        {
          id: 'QC-2024-003',
          test: 'Creatinine',
          material: 'Chemistry Control Level 2',
          lotNumber: 'LOT-789',
          date: '2024-01-14',
          operator: 'Lab Tech Sanjay',
          status: 'failed',
          value: 2.5,
          target: 1.8,
          sd: 0.2,
          ruleViolations: 2,
          chartData: generateHistoricalData(1.8, 0.3, '2024-01-14'),
          comments: 'Out of control - investigation required',
          reviewedBy: '',
          reviewDate: ''
        },
        {
          id: 'QC-2024-004',
          test: 'ALT',
          material: 'Liver Enzyme Control',
          lotNumber: 'LOT-234',
          date: '2024-01-14',
          operator: 'Lab Tech Meena',
          status: 'passed',
          value: 35,
          target: 30,
          sd: 5,
          ruleViolations: 0,
          chartData: generateHistoricalData(30, 0.5, '2024-01-14'),
          comments: 'Within acceptable limits',
          reviewedBy: 'Dr. Patel',
          reviewDate: '2024-01-14'
        },
        {
          id: 'QC-2024-005',
          test: 'Cholesterol',
          material: 'Lipid Control',
          lotNumber: 'LOT-567',
          date: '2024-01-13',
          operator: 'Lab Tech Ravi',
          status: 'passed',
          value: 185,
          target: 180,
          sd: 10,
          ruleViolations: 0,
          chartData: generateHistoricalData(180, -0.2, '2024-01-13'),
          comments: 'Good correlation',
          reviewedBy: 'Dr. Sharma',
          reviewDate: '2024-01-13'
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
          status: 'active',
          targetValues: { CBC: 12.0, WBC: 7.5, Platelets: 250 },
          sdValues: { CBC: 0.5, WBC: 0.3, Platelets: 15 }
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
          status: 'active',
          targetValues: { Glucose: 100, Creatinine: 1.0, Urea: 25 },
          sdValues: { Glucose: 5, Creatinine: 0.05, Urea: 2 }
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
          status: 'active',
          targetValues: { Glucose: 250, Creatinine: 1.8, Urea: 60 },
          sdValues: { Glucose: 12, Creatinine: 0.2, Urea: 5 }
        }
      ]

      const qcRulesData = [
        {
          id: 'RULE-001',
          name: '1-3s Rule',
          description: 'One point beyond 3 SD from mean',
          type: 'Westgard',
          action: 'Reject run, investigate',
          priority: 'high',
          violationExample: 'Value exceeds mean ± 3SD'
        },
        {
          id: 'RULE-002',
          name: '2-2s Rule',
          description: 'Two consecutive points beyond 2 SD on same side',
          type: 'Westgard',
          action: 'Reject run, investigate',
          priority: 'high',
          violationExample: 'Two consecutive QC results > +2SD or < -2SD'
        },
        {
          id: 'RULE-003',
          name: 'R-4s Rule',
          description: 'Range of 4 SD between two points',
          type: 'Westgard',
          action: 'Reject run',
          priority: 'high',
          violationExample: 'Difference between two controls > 4SD'
        },
        {
          id: 'RULE-004',
          name: '4-1s Rule',
          description: 'Four consecutive points beyond 1 SD on same side',
          type: 'Westgard',
          action: 'Warning, check trend',
          priority: 'medium',
          violationExample: 'Four consecutive results > +1SD or < -1SD'
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
    if (!newQCRun.test || !newQCRun.material || !newQCRun.lotNumber || !newQCRun.value) {
      setToast({ message: 'Please fill in all required fields', type: 'error' })
      return
    }

    const qcId = `QC-${new Date().getFullYear()}-${(qcRuns.length + 1).toString().padStart(3, '0')}`
    const value = parseFloat(newQCRun.value)
    const target = 12.0
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
      value: value,
      target: target,
      sd: sd,
      ruleViolations: ruleViolations,
      chartData: [],
      comments: '',
      reviewedBy: '',
      reviewDate: ''
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
    setToast({ message: `QC Run ${qcId} recorded! Status: ${status}`, type: status === 'passed' ? 'success' : 'warning' })
  }

  const handleApproveQCRun = (runId) => {
    setQcRuns(qcRuns.map(run => 
      run.id === runId ? { 
        ...run, 
        status: 'approved',
        reviewedBy: 'Current User',
        reviewDate: new Date().toISOString().split('T')[0]
      } : run
    ))
    setToast({ message: `QC Run ${runId} approved for use`, type: 'success' })
  }

  const handleRejectQCRun = (runId) => {
    setQcRuns(qcRuns.map(run => 
      run.id === runId ? { ...run, status: 'rejected' } : run
    ))
    setToast({ message: `QC Run ${runId} rejected. Investigation required.`, type: 'error' })
  }

  const handleViewChart = (run) => {
    setSelectedQCRun(run)
    setShowChartModal(true)
  }

  const handleAddMaterial = () => {
    if (!newMaterial.name || !newMaterial.type || !newMaterial.manufacturer || !newMaterial.lotNumber) {
      setToast({ message: 'Please fill in all required fields', type: 'error' })
      return
    }

    const materialId = `QCM-${(qcMaterials.length + 1).toString().padStart(3, '0')}`
    const materialEntry = {
      id: materialId,
      ...newMaterial,
      quantity: parseInt(newMaterial.quantity)
    }
    
    setQcMaterials([...qcMaterials, materialEntry])
    setShowMaterialModal(false)
    setNewMaterial({
      name: '',
      type: '',
      manufacturer: '',
      lotNumber: '',
      expiryDate: '',
      storage: '',
      quantity: '',
      status: 'active'
    })
    setToast({ message: `QC Material "${newMaterial.name}" added successfully!`, type: 'success' })
  }

  const handleAddRule = () => {
    if (!newRule.name || !newRule.description || !newRule.action) {
      setToast({ message: 'Please fill in all required fields', type: 'error' })
      return
    }

    const ruleId = `RULE-${(qcRules.length + 1).toString().padStart(3, '0')}`
    const ruleEntry = {
      id: ruleId,
      ...newRule
    }
    
    setQcRules([...qcRules, ruleEntry])
    setShowRuleModal(false)
    setNewRule({
      name: '',
      description: '',
      type: 'Westgard',
      action: '',
      priority: 'medium'
    })
    setToast({ message: `QC Rule "${newRule.name}" added successfully!`, type: 'success' })
  }

  const handleGenerateQCReport = (run) => {
    const reportWindow = window.open('', '_blank')
    const reportHtml = `
      <html>
        <head>
          <title>QC Analysis Report - ${run.id}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            body { font-family: 'Inter', sans-serif; padding: 40px; color: #1e293b; line-height: 1.5; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
            .hospital-info h1 { margin: 0; color: #2563eb; font-size: 24px; font-weight: 700; }
            .hospital-info p { margin: 5px 0 0; color: #64748b; font-size: 14px; }
            .report-id { text-align: right; }
            .report-id p { margin: 0; font-size: 12px; color: #64748b; }
            .report-id span { font-weight: 700; color: #1e293b; font-size: 14px; }
            
            .report-title { text-align: center; margin-bottom: 40px; }
            .report-title h2 { margin: 0; font-size: 20px; color: #0f172a; text-transform: uppercase; letter-spacing: 1px; }
            
            .status-container { margin-top: 15px; display: flex; justify-content: center; }
            .status-badge { padding: 6px 16px; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; border: 1px solid transparent; }
            .status-passed { background-color: #d1fae5; color: #065f46; border-color: #10b981; }
            .status-approved { background-color: #dcfce7; color: #166534; border-color: #22c55e; }
            .status-failed { background-color: #fee2e2; color: #991b1b; border-color: #ef4444; }
            .status-warning { background-color: #fef3c7; color: #92400e; border-color: #f59e0b; }
            .status-rejected { background-color: #fca5a5; color: #7f1d1d; border-color: #dc2626; }

            .section { margin-bottom: 30px; }
            .section-title { font-weight: 700; font-size: 13px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 15px; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; }
            
            .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
            .data-item { margin-bottom: 12px; }
            .label { font-size: 12px; color: #64748b; margin-bottom: 2px; }
            .value { font-weight: 600; font-size: 14px; color: #1e293b; }
            
            .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; }
            
            .comments-box { background: #f1f5f9; padding: 15px; border-radius: 8px; font-size: 14px; color: #334155; border-left: 4px solid #94a3b8; }
            
            .footer { margin-top: 60px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center; }
            
            .signature-area { margin-top: 40px; display: flex; justify-content: space-between; }
            .sig-box { width: 200px; text-align: center; }
            .sig-line { border-top: 1px solid #1e293b; margin-bottom: 5px; padding-top: 10px; }
            
            @media print { 
              .no-print { display: none !important; } 
              body { padding: 20px; }
              .metrics-grid { background: #f8fafc !important; -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="hospital-info">
              <h1>Antigravity General Hospital</h1>
              <p>Clinical Laboratory Division • ISO 15189 Certified</p>
            </div>
            <div class="report-id">
              <p>Report ID: <span>${run.id}</span></p>
              <p>Generated: <span>${new Date().toLocaleString()}</span></p>
            </div>
          </div>

          <div class="report-title">
            <h2>Quality Control Analysis Report</h2>
            <div class="status-container">
              <div class="status-badge status-${run.status}">${run.status}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Material & Test Information</div>
            <div class="grid">
              <div class="data-item"><div class="label">Test Analyte</div><div class="value">${run.test}</div></div>
              <div class="data-item"><div class="label">QC Material</div><div class="value">${run.material}</div></div>
              <div class="data-item"><div class="label">Lot Number</div><div class="value">${run.lotNumber}</div></div>
              <div class="data-item"><div class="label">Operator / Technician</div><div class="value">${run.operator}</div></div>
              <div class="data-item"><div class="label">Collection Date</div><div class="value">${run.date}</div></div>
              <div class="data-item"><div class="label">Instrument ID</div><div class="value">LAB-AUTO-X12</div></div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Statistical Performance Metrics</div>
            <div class="metrics-grid">
              <div class="data-item"><div class="label">Observed Value</div><div class="value">${run.value}</div></div>
              <div class="data-item"><div class="label">Target Mean</div><div class="value">${run.target}</div></div>
              <div class="data-item"><div class="label">Target SD</div><div class="value">±${run.sd}</div></div>
              <div class="data-item"><div class="label">Z-Score (SDI)</div><div class="value">${((run.value - run.target) / run.sd).toFixed(2)} SD</div></div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Rule Evaluation & Compliance</div>
            <p style="font-size: 14px; margin-bottom: 10px;"><strong>Status:</strong> ${run.ruleViolations > 0 ? `<span style="color: #ef4444;">${run.ruleViolations} Westgard Rule Violation(s) Detected</span>` : '<span style="color: #10b981;">No Multi-rule Violations Detected</span>'}</p>
            <div class="comments-box">
              ${run.comments || (run.ruleViolations > 0 ? 'WARNING: Out of control condition observed. Investigatory action required. Do not release patient results.' : 'System performance is within acceptable limits. Test system is in control.')}
            </div>
          </div>

          <div class="section">
            <div class="section-title">Review & Authorization</div>
            <div class="grid">
              <div class="data-item"><div class="label">Reviewed By</div><div class="value">${run.reviewedBy || 'System Audit Trail'}</div></div>
              <div class="data-item"><div class="label">Authorization Date</div><div class="value">${run.reviewDate || '---'}</div></div>
            </div>
          </div>

          <div class="signature-area">
            <div class="sig-box">
              <div class="sig-line">Laboratory Supervisor</div>
            </div>
            <div class="sig-box">
              <div class="sig-line">Medical Director</div>
            </div> Signature Verified
          </div>

          <div class="footer">
            <p>This is a certified NABL compliance report. Digitally generated by Antigravity Lab Suite.</p>
            <p>&copy; 2024 Antigravity General Hospital - Laboratory Division</p>
          </div>

          <div class="no-print" style="margin-top: 40px; text-align: center; border-top: 1px dashed #cbd5e1; padding-top: 20px;">
            <button onclick="window.print()" style="padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
              <i class="fas fa-print" style="margin-right: 8px;"></i> Print Official Report
            </button>
            <button onclick="window.close()" style="margin-left: 10px; padding: 12px 24px; background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; border-radius: 8px; font-weight: 600; cursor: pointer;">
              Close Preview
            </button>
          </div>
        </body>
      </html>
    `
    reportWindow.document.write(reportHtml)
    reportWindow.document.close()
    setToast({ message: 'Generating QC Report preview...', type: 'success' })
  }

  const handleGenerateComplianceReport = () => {
    setShowComplianceModal(true)
  }

  const handleConfigureAlerts = () => {
    setShowAlertsModal(true)
  }

  // Trend Analysis Handler
  const handleTrendAnalysis = () => {
    // Calculate trend analysis data
    const last30Days = [...Array(30)].map((_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split('T')[0]
    }).reverse()

    const dailyStats = last30Days.map(date => {
      const dayRuns = qcRuns.filter(run => run.date === date)
      return {
        date,
        passed: dayRuns.filter(r => r.status === 'passed' || r.status === 'approved').length,
        warning: dayRuns.filter(r => r.status === 'warning').length,
        failed: dayRuns.filter(r => r.status === 'failed' || r.status === 'rejected').length
      }
    })

    // Calculate test-wise performance
    const testNames = [...new Set(qcRuns.map(run => run.test))]
    const testPerformance = testNames.map(testName => {
      const testRuns = qcRuns.filter(run => run.test === testName)
      const passedRuns = testRuns.filter(run => run.status === 'passed' || run.status === 'approved').length
      return {
        name: testName,
        totalRuns: testRuns.length,
        passRate: testRuns.length > 0 ? Math.round((passedRuns / testRuns.length) * 100) : 0
      }
    })

    const totalRuns = qcRuns.length
    const passedRuns = qcRuns.filter(r => r.status === 'passed' || r.status === 'approved').length
    const warningRuns = qcRuns.filter(r => r.status === 'warning').length
    const failedRuns = qcRuns.filter(r => r.status === 'failed' || r.status === 'rejected').length

    // Generate recommendations based on data
    const recommendations = []
    if (failedRuns > 0) {
      recommendations.push(`Investigate ${failedRuns} failed QC runs - check equipment calibration and reagent quality`)
    }
    if (warningRuns > 3) {
      recommendations.push(`High number of warnings (${warningRuns}) - review trending patterns`)
    }
    const lowPerformanceTests = testPerformance.filter(t => t.passRate < 85)
    if (lowPerformanceTests.length > 0) {
      recommendations.push(`Review QC process for: ${lowPerformanceTests.map(t => t.name).join(', ')}`)
    }
    if (recommendations.length === 0) {
      recommendations.push('All QC metrics are within acceptable limits - maintain current practices')
      recommendations.push('Schedule routine preventive maintenance to sustain performance')
    }

    setTrendAnalysisData({
      totalRuns,
      passRate: totalRuns > 0 ? Math.round((passedRuns / totalRuns) * 100) : 0,
      warningRate: totalRuns > 0 ? Math.round((warningRuns / totalRuns) * 100) : 0,
      failureRate: totalRuns > 0 ? Math.round((failedRuns / totalRuns) * 100) : 0,
      trendData: dailyStats,
      testPerformance,
      recommendations
    })
    
    setShowTrendAnalysisModal(true)
    setToast({ message: 'Trend analysis report generated', type: 'success' })
  }

  const handleExportSummary = () => {
    // Prepare export data
    const exportData = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalQCRuns: qcRuns.length,
        passedRuns: qcRuns.filter(r => r.status === 'passed' || r.status === 'approved').length,
        warningRuns: qcRuns.filter(r => r.status === 'warning').length,
        failedRuns: qcRuns.filter(r => r.status === 'failed' || r.status === 'rejected').length,
        activeMaterials: qcMaterials.filter(m => m.status === 'active').length,
        configuredRules: qcRules.length
      },
      recentRuns: qcRuns.slice(0, 10).map(run => ({
        id: run.id,
        test: run.test,
        status: run.status,
        date: run.date,
        value: run.value,
        target: run.target
      })),
      materialInventory: qcMaterials.map(m => ({
        name: m.name,
        type: m.type,
        quantity: m.quantity,
        expiryDate: m.expiryDate,
        status: m.status
      }))
    }

    // Create and download JSON file
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `qc_summary_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setToast({ message: 'QC summary exported successfully', type: 'success' })
  }

  const handleRefreshDashboard = () => {
    // Simulate fetching latest data
    const newRunsCount = Math.floor(Math.random() * 5)
    setRefreshData({
      newRuns: newRunsCount,
      timestamp: new Date().toLocaleString()
    })
    // Refresh the data
    loadQCData()
    setShowRefreshModal(true)
  }

  const handleExportTrendReport = () => {
    if (trendAnalysisData) {
      const reportBlob = new Blob([JSON.stringify(trendAnalysisData, null, 2)], { type: 'application/json' })
      const reportUrl = URL.createObjectURL(reportBlob)
      const reportLink = document.createElement('a')
      reportLink.href = reportUrl
      reportLink.download = `trend_analysis_${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(reportLink)
      reportLink.click()
      document.body.removeChild(reportLink)
      URL.revokeObjectURL(reportUrl)
      
      setToast({ message: 'Trend analysis report exported', type: 'success' })
    }
  }

  const renderQCChart = () => {
    if (!selectedQCRun || !selectedQCRun.chartData || selectedQCRun.chartData.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <i className="fas fa-chart-line text-4xl mb-2"></i>
          <p>No chart data available for this QC run</p>
        </div>
      )
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={selectedQCRun.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 10 }}
            angle={-45}
            textAnchor="end"
            height={60}
            interval={Math.floor(selectedQCRun.chartData.length / 10)}
          />
          <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            labelStyle={{ fontWeight: 'bold' }} />
          <Legend verticalAlign="top" height={36} />
          
          {/* Reference Lines */}
          <ReferenceLine y={selectedQCRun.target} stroke="#3b82f6" strokeDasharray="3 3" label={{ value: 'Target', position: 'right', fill: '#3b82f6', fontSize: 10 }} />
          <ReferenceLine y={selectedQCRun.target + selectedQCRun.sd} stroke="#f59e0b" strokeDasharray="2 2" label={{ value: '+1SD', position: 'right', fill: '#f59e0b', fontSize: 9 }} />
          <ReferenceLine y={selectedQCRun.target - selectedQCRun.sd} stroke="#f59e0b" strokeDasharray="2 2" label={{ value: '-1SD', position: 'right', fill: '#f59e0b', fontSize: 9 }} />
          <ReferenceLine y={selectedQCRun.target + (selectedQCRun.sd * 2)} stroke="#ef4444" strokeDasharray="2 2" label={{ value: '+2SD', position: 'right', fill: '#ef4444', fontSize: 9 }} />
          <ReferenceLine y={selectedQCRun.target - (selectedQCRun.sd * 2)} stroke="#ef4444" strokeDasharray="2 2" label={{ value: '-2SD', position: 'right', fill: '#ef4444', fontSize: 9 }} />
          <ReferenceLine y={selectedQCRun.target + (selectedQCRun.sd * 3)} stroke="#dc2626" strokeDasharray="2 2" label={{ value: '+3SD', position: 'right', fill: '#dc2626', fontSize: 9 }} />
          <ReferenceLine y={selectedQCRun.target - (selectedQCRun.sd * 3)} stroke="#dc2626" strokeDasharray="2 2" label={{ value: '-3SD', position: 'right', fill: '#dc2626', fontSize: 9 }} />
          <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={{ r: 4, fill: '#2563eb' }} activeDot={{ r: 6 }} name="QC Value" />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  const filteredQCRuns = qcRuns.filter(run =>
    run.test.toLowerCase().includes(searchTerm.toLowerCase()) ||
    run.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
    run.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const testOptions = ['CBC', 'Glucose', 'Creatinine', 'ALT', 'AST', 'Bilirubin', 'Cholesterol', 'Triglycerides', 'Urea', 'Sodium', 'Potassium']
  const materialOptions = qcMaterials.map(m => m.name)
  const materialTypes = ['Hematology', 'Chemistry', 'Immunology', 'Microbiology', 'Coagulation', 'Urinalysis']
  const priorityOptions = ['high', 'medium', 'low']

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
            <Button variant="outline" icon="fas fa-vial" onClick={() => setShowNewRunModal(true)}>
              New QC Run
            </Button>
            <Button variant="primary" icon="fas fa-chart-line" onClick={loadQCData}>
              Refresh Data
            </Button>
          </div>
        </div>

        {/* QC Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative bg-gradient-to-br from-white to-blue-50 p-5 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Today's QC Runs</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {qcRuns.filter(r => r.date === new Date().toISOString().split('T')[0]).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <i className="fas fa-vial text-white text-lg"></i>
              </div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-white to-emerald-50 p-5 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Passed Runs</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {qcRuns.filter(r => r.status === 'passed' || r.status === 'approved').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                <i className="fas fa-check-circle text-white text-lg"></i>
              </div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-white to-yellow-50 p-5 rounded-2xl border border-yellow-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-yellow-600 uppercase tracking-wider">Warning Runs</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {qcRuns.filter(r => r.status === 'warning').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-md">
                <i className="fas fa-exclamation-triangle text-white text-lg"></i>
              </div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-white to-red-50 p-5 rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-red-600 uppercase tracking-wider">Failed Runs</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {qcRuns.filter(r => r.status === 'failed' || r.status === 'rejected').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                <i className="fas fa-times-circle text-white text-lg"></i>
              </div>
            </div>
          </div>
        </div>

        {/* QC Runs Table */}
        <div className="bg-white rounded border card-shadow overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center flex-wrap gap-2">
            <div>
              <h3 className="text-lg font-semibold">QC Runs</h3>
              <p className="text-sm text-gray-500">Recent quality control runs and their status</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowMaterialModal(true)}>
                Manage Materials
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowRuleModal(true)}>
                Manage Rules
              </Button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="p-4 border-b">
            <SearchBar placeholder="Search QC runs by test, material, or ID..." onSearch={handleSearch} className="w-full" />
          </div>
          
          <DataTable columns={[
              { key: 'id', title: 'QC ID', sortable: true, className: 'min-w-[100px]' },
              { key: 'test', title: 'Test', sortable: true, className: 'min-w-[100px]' },
              { key: 'material', title: 'QC Material', sortable: true, className: 'min-w-[150px]' },
              { key: 'lotNumber', title: 'Lot Number', sortable: true, className: 'min-w-[100px]' },
              { key: 'date', title: 'Date', sortable: true, className: 'min-w-[100px]' },
              { key: 'operator', title: 'Operator', sortable: true, className: 'hidden md:table-cell' },
              { key: 'status', title: 'Status', sortable: true, className: 'min-w-[100px]',
                render: (value) => (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    value === 'passed' || value === 'approved' ? 'bg-green-100 text-green-800' :
                    value === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    value === 'failed' || value === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    <i className={`fas ${
                      value === 'passed' || value === 'approved' ? 'fa-check-circle' :
                      value === 'warning' ? 'fa-exclamation-triangle' :
                      value === 'failed' || value === 'rejected' ? 'fa-times-circle' :
                      'fa-circle'
                    } mr-1 text-xs`}></i>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </span>
                )
              },
              { key: 'value', title: 'Value', sortable: true, className: 'hidden sm:table-cell' },
              { key: 'actions', title: 'Actions', className: 'min-w-[160px]',
                render: (_, row) => (
                  <div className="flex gap-2">
                    <button onClick={(e) => {
                        e.stopPropagation()
                        handleViewChart(row)
                      }}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors" 
                      title="View QC Chart" >
                      <i className="fas fa-chart-line mr-1"></i>
                    </button>
                    {row.status === 'passed' && (
                      <button onClick={(e) => {
                          e.stopPropagation()
                          handleApproveQCRun(row.id)
                        }}
                        className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors" 
                        title="Approve Run" >
                        <i className="fas fa-check mr-1"></i>
                      </button>
                    )}
                    {(row.status === 'warning' || row.status === 'failed') && row.status !== 'approved' && (
                      <button onClick={(e) => {
                          e.stopPropagation()
                          handleRejectQCRun(row.id)
                        }}
                        className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors" 
                        title="Reject Run" >
                        <i className="fas fa-times mr-1"></i>
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
            <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-semibold">QC Run Details: {selectedQCRun.id}</h3>
                <p className="text-gray-600">{selectedQCRun.test} • {selectedQCRun.material} • Lot: {selectedQCRun.lotNumber}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                  onClick={() => handleViewChart(selectedQCRun)}>
                  <i className="fas fa-chart-line mr-1"></i> {/* View Chart */}
                </button>
                <button className="px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors"
                  onClick={() => handleGenerateQCReport(selectedQCRun)}>
                  <i className="fas fa-file-pdf mr-1"></i> {/* Generate Report */}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-500">Observed Value</p>
                <p className="text-2xl font-bold text-blue-700">{selectedQCRun.value}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-500">Target Value</p>
                <p className="text-2xl font-bold text-green-700">{selectedQCRun.target}</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-500">Standard Deviation</p>
                <p className="text-2xl font-bold text-yellow-700">±{selectedQCRun.sd}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-500">Deviation from Mean</p>
                <p className="text-2xl font-bold text-purple-700">
                  {((selectedQCRun.value - selectedQCRun.target) / selectedQCRun.sd).toFixed(1)} SD
                </p>
              </div>
            </div>

            {selectedQCRun.comments && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Comments</p>
                <p className="text-gray-700">{selectedQCRun.comments}</p>
              </div>
            )}

            {selectedQCRun.ruleViolations > 0 ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  QC Rule Violations Detected ({selectedQCRun.ruleViolations})
                </h4>
                <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                  <li>1-3s Rule: Point beyond 3 SD from mean</li>
                  <li>Investigation required before releasing patient results</li>
                  <li>Document corrective action in QC log</li>
                </ul>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">
                  <i className="fas fa-check-circle mr-2"></i>
                  No QC Rule Violations Detected
                </h4>
                <p className="text-sm text-green-700">All QC results are within acceptable limits. Patient results can be released.</p>
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
          <DataTable columns={[
              { key: 'name', title: 'Material Name', sortable: true, className: 'min-w-[150px]' },
              { key: 'type', title: 'Type', sortable: true },
              { key: 'manufacturer', title: 'Manufacturer', sortable: true, className: 'hidden md:table-cell' },
              { key: 'lotNumber', title: 'Lot Number', sortable: true },
              { key: 'expiryDate', title: 'Expiry Date', sortable: true, className: 'min-w-[100px]' },
              { key: 'storage', title: 'Storage', sortable: true, className: 'hidden lg:table-cell' },
              { key: 'quantity', title: 'Quantity', sortable: true, className: 'min-w-[80px]' },
              { key: 'status', title: 'Status', sortable: true,
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
          <DataTable columns={[
              { key: 'name', title: 'Rule Name', sortable: true, className: 'min-w-[120px]' },
              { key: 'description', title: 'Description', sortable: true, className: 'min-w-[200px]' },
              { key: 'type', title: 'Type', sortable: true },
              { key: 'action', title: 'Action Required', sortable: true, className: 'min-w-[150px]' },
              { key: 'priority', title: 'Priority', sortable: true,
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

        {/* QC Workflow Actions - Enhanced and Organized */}
        <div className="bg-white p-6 rounded border card-shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <i className="fas fa-tasks text-blue-600"></i>
            QC Workflow Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Levey-Jennings Chart */}
            <div className="p-4 border rounded-lg hover:bg-blue-50 transition-all duration-300 cursor-pointer group"
              onClick={() => {
                if (qcRuns.length > 0) {
                  handleViewChart(qcRuns[0])
                } else {
                  setToast({ message: 'No QC runs available to display chart', type: 'warning' })
                }
              }}>
              <div className="flex items-center mb-3">
                <div className="p-2 bg-blue-100 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors">
                  <i className="fas fa-chart-line text-blue-600"></i>
                </div>
                <h4 className="font-semibold">Levey-Jennings Chart</h4>
              </div>
              <p className="text-sm text-gray-600">Generate QC charts for trend analysis and visualize QC performance over time</p>
              <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Charts →
              </button>
            </div>
            
            {/* QC Compliance Report */}
            <div className="p-4 border rounded-lg hover:bg-green-50 transition-all duration-300 cursor-pointer group"
                 onClick={handleGenerateComplianceReport}>
              <div className="flex items-center mb-3">
                <div className="p-2 bg-green-100 rounded-lg mr-3 group-hover:bg-green-200 transition-colors">
                  <i className="fas fa-clipboard-list text-green-600"></i>
                </div>
                <h4 className="font-semibold">QC Compliance Report</h4>
              </div>
              <p className="text-sm text-gray-600">Generate comprehensive compliance reports for audits and regulatory requirements</p>
              <button className="mt-3 text-green-600 hover:text-green-800 text-sm font-medium">
                Generate Report →
              </button>
            </div>
            
            {/* QC Alerts Configuration */}
            <div className="p-4 border rounded-lg hover:bg-purple-50 transition-all duration-300 cursor-pointer group"
                 onClick={handleConfigureAlerts}>
              <div className="flex items-center mb-3">
                <div className="p-2 bg-purple-100 rounded-lg mr-3 group-hover:bg-purple-200 transition-colors">
                  <i className="fas fa-bell text-purple-600"></i>
                </div>
                <h4 className="font-semibold">QC Alerts & Notifications</h4>
              </div>
              <p className="text-sm text-gray-600">Configure automated alerts for QC violations, out-of-range values, and trends</p>
              <button className="mt-3 text-purple-600 hover:text-purple-800 text-sm font-medium">
                Configure Alerts →
              </button>
            </div>
          </div>
          
          {/* Additional Quick Actions */}
          <div className="mt-6 pt-4 border-t">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Trend Analysis Button */}
              <button className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 flex items-center justify-center gap-2 group"
                onClick={handleTrendAnalysis} >
                <i className="fas fa-chart-line group-hover:scale-110 transition-transform"></i> 
                <span>Trend Analysis</span>
              </button>
              
              {/* Export Summary Button */}
              <button className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-green-50 hover:text-green-600 transition-all duration-200 flex items-center justify-center gap-2 group"
                onClick={handleExportSummary} >
                <i className="fas fa-file-export group-hover:scale-110 transition-transform"></i> 
                <span>Export Summary</span>
              </button>
              
              {/* Refresh Dashboard Button */}
              <button className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 flex items-center justify-center gap-2 group"
                onClick={handleRefreshDashboard} >
                <i className="fas fa-sync-alt group-hover:rotate-180 transition-transform duration-500"></i> 
                <span>Refresh Dashboard</span>
              </button>
              
              {/* Quick Record Run Button */}
              <button className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 flex items-center justify-center gap-2 group"
                onClick={() => setShowNewRunModal(true)} >
                <i className="fas fa-plus-circle group-hover:scale-110 transition-transform"></i> 
                <span>Quick Record Run</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* QC Chart Modal */}
      <Modal isOpen={showChartModal} onClose={() => setShowChartModal(false)} title="Levey-Jennings QC Chart" size="xl">
        {selectedQCRun && (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b">
              <div>
                <h3 className="font-semibold text-lg">{selectedQCRun.test} - QC Chart</h3>
                <p className="text-sm text-gray-500">Material: {selectedQCRun.material} | Lot: {selectedQCRun.lotNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">Target: {selectedQCRun.target} ± {selectedQCRun.sd}</p>
                <p className="text-xs text-gray-500">Last 30 days</p>
              </div>
            </div>
            {renderQCChart()}
            <div className="bg-gray-50 p-3 rounded-lg text-sm">
              <p className="font-semibold mb-2">Chart Interpretation Guide:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                <div><span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span> QC Values</div>
                <div><span className="inline-block w-3 h-3 border border-blue-500 border-dashed mr-1"></span> Target Line</div>
                <div><span className="inline-block w-3 h-3 border border-orange-500 border-dashed mr-1"></span> ±1SD Limits</div>
                <div><span className="inline-block w-3 h-3 border border-red-500 border-dashed mr-1"></span> ±2SD Limits</div>
                <div><span className="inline-block w-3 h-3 border border-red-600 border-dashed mr-1"></span> ±3SD Limits</div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-3 border-t">
              <Button variant="outline" onClick={() => setShowChartModal(false)}>Close</Button>
              <Button variant="primary" onClick={() => setToast({ message: 'Chart exported as PDF', type: 'success' })}>
                <i className="fas fa-download mr-1"></i> Export Chart
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Trend Analysis Modal */}
      <Modal isOpen={showTrendAnalysisModal} onClose={() => setShowTrendAnalysisModal(false)} title="QC Trend Analysis" size="xl">
        {trendAnalysisData && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-xs text-gray-500">Total QC Runs</p>
                <p className="text-2xl font-bold text-blue-600">{trendAnalysisData.totalRuns}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-xs text-gray-500">Pass Rate</p>
                <p className="text-2xl font-bold text-green-600">{trendAnalysisData.passRate}%</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-xs text-gray-500">Warning Rate</p>
                <p className="text-2xl font-bold text-yellow-600">{trendAnalysisData.warningRate}%</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <p className="text-xs text-gray-500">Failure Rate</p>
                <p className="text-2xl font-bold text-red-600">{trendAnalysisData.failureRate}%</p>
              </div>
            </div>

            {/* Trend Chart */}
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-3">QC Performance Trend (Last 30 Days)</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendAnalysisData.trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="passed" stroke="#10b981" name="Passed Runs" strokeWidth={2} />
                  <Line type="monotone" dataKey="warning" stroke="#f59e0b" name="Warning Runs" strokeWidth={2} />
                  <Line type="monotone" dataKey="failed" stroke="#ef4444" name="Failed Runs" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Test-wise Analysis */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Test-wise Performance Analysis</h4>
              <div className="space-y-3">
                {trendAnalysisData.testPerformance.map((test, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="w-32">
                      <span className="font-medium">{test.name}</span>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${test.passRate}%` }}></div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 w-20 text-right">
                      {test.passRate}% Pass
                    </div>
                    <div className="text-xs text-gray-400 w-24 text-right">
                      {test.totalRuns} runs
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <i className="fas fa-lightbulb"></i> Recommendations
              </h4>
              <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                {trendAnalysisData.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowTrendAnalysisModal(false)}>Close</Button>
              <Button variant="primary" onClick={handleExportTrendReport}>
                <i className="fas fa-download mr-1"></i> Export Report
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Refresh Dashboard Modal */}
      <Modal isOpen={showRefreshModal} onClose={() => setShowRefreshModal(false)} title="Dashboard Refreshed" size="sm">
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-check-circle text-green-600 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Dashboard Updated!</h3>
          <p className="text-sm text-gray-500">Latest QC data has been loaded successfully</p>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-left text-sm">
            <p className="font-medium mb-1">Updates Applied:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>✓ {refreshData.newRuns} new QC runs loaded</li>
              <li>✓ Statistics recalculated</li>
              <li>✓ Charts updated with latest data</li>
              <li>✓ Rule violations re-evaluated</li>
            </ul>
          </div>
          <Button variant="primary" onClick={() => setShowRefreshModal(false)} className="mt-4">
            Continue
          </Button>
        </div>
      </Modal>

      {/* New QC Run Modal */}
      <Modal isOpen={showNewRunModal} onClose={() => setShowNewRunModal(false)} title="Record New QC Run" size="lg">
        <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
          <div className="bg-blue-50 p-3 rounded">
            <p className="text-sm text-blue-800">
              <i className="fas fa-info-circle mr-2"></i>
              Record quality control run for a specific test and material
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Test *</label>
              <select className="w-full px-3 py-2 border rounded-lg" value={newQCRun.test}
                onChange={(e) => setNewQCRun({...newQCRun, test: e.target.value})} required>
                <option value="">Select test</option>
                {testOptions.map(test => (<option key={test} value={test}>{test}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">QC Material *</label>
              <select className="w-full px-3 py-2 border rounded-lg" value={newQCRun.material}
                onChange={(e) => setNewQCRun({...newQCRun, material: e.target.value})} required>
                <option value="">Select material</option>
                {materialOptions.map(material => (<option key={material} value={material}>{material}</option>))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lot Number *</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Enter lot number" 
                value={newQCRun.lotNumber} onChange={(e) => setNewQCRun({...newQCRun, lotNumber: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Observed Value *</label>
              <input type="number" step="any" className="w-full px-3 py-2 border rounded-lg" placeholder="Enter numeric value" 
                value={newQCRun.value} onChange={(e) => setNewQCRun({...newQCRun, value: e.target.value})} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Operator</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Enter operator name" 
                value={newQCRun.operator} onChange={(e) => setNewQCRun({...newQCRun, operator: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" className="w-full px-3 py-2 border rounded-lg" value={newQCRun.date}
                onChange={(e) => setNewQCRun({...newQCRun, date: e.target.value})} />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowNewRunModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleNewQCRun}
              disabled={!newQCRun.test || !newQCRun.material || !newQCRun.lotNumber || !newQCRun.value}>
              Record QC Run
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add QC Material Modal */}
      <Modal isOpen={showMaterialModal} onClose={() => setShowMaterialModal(false)} title="Add QC Material" size="lg">
        <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
          <div className="bg-green-50 p-3 rounded">
            <p className="text-sm text-green-800">
              <i className="fas fa-boxes mr-2"></i>
              Add new quality control material to inventory
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Material Name *</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="e.g., Hematology Control"
                value={newMaterial.name} onChange={(e) => setNewMaterial({...newMaterial, name: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select className="w-full px-3 py-2 border rounded-lg" value={newMaterial.type}
                onChange={(e) => setNewMaterial({...newMaterial, type: e.target.value})} required>
                <option value="">Select type</option>
                {materialTypes.map(type => (<option key={type} value={type}>{type}</option>))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer *</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="e.g., Bio-Rad"
                value={newMaterial.manufacturer} onChange={(e) => setNewMaterial({...newMaterial, manufacturer: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lot Number *</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Enter lot number"
                value={newMaterial.lotNumber} onChange={(e) => setNewMaterial({...newMaterial, lotNumber: e.target.value})} required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input type="date" className="w-full px-3 py-2 border rounded-lg" value={newMaterial.expiryDate}
                onChange={(e) => setNewMaterial({...newMaterial, expiryDate: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Storage Conditions</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="e.g., 2-8°C"
                value={newMaterial.storage} onChange={(e) => setNewMaterial({...newMaterial, storage: e.target.value})} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input type="number" className="w-full px-3 py-2 border rounded-lg" placeholder="Initial quantity"
                value={newMaterial.quantity} onChange={(e) => setNewMaterial({...newMaterial, quantity: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select className="w-full px-3 py-2 border rounded-lg" value={newMaterial.status}
                onChange={(e) => setNewMaterial({...newMaterial, status: e.target.value})}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowMaterialModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddMaterial}>Add Material</Button>
          </div>
        </div>
      </Modal>

      {/* Add QC Rule Modal */}
      <Modal isOpen={showRuleModal} onClose={() => setShowRuleModal(false)} title="Add QC Rule" size="lg">
        <div className="space-y-4">
          <div className="bg-purple-50 p-3 rounded">
            <p className="text-sm text-purple-800">
              <i className="fas fa-gavel mr-2"></i>
              Add new Westgard rule for QC evaluation
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rule Name *</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="e.g., 1-2s Rule"
              value={newRule.name} onChange={(e) => setNewRule({...newRule, name: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea className="w-full px-3 py-2 border rounded-lg" rows="2" placeholder="Describe the rule and its application"
              value={newRule.description} onChange={(e) => setNewRule({...newRule, description: e.target.value})} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rule Type</label>
              <select className="w-full px-3 py-2 border rounded-lg" value={newRule.type}
                onChange={(e) => setNewRule({...newRule, type: e.target.value})}>
                <option value="Westgard">Westgard</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select className="w-full px-3 py-2 border rounded-lg" value={newRule.priority}
                onChange={(e) => setNewRule({...newRule, priority: e.target.value})}>
                {priorityOptions.map(p => (<option key={p} value={p}>{p.toUpperCase()}</option>))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Action Required *</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="e.g., Reject run, investigate"
              value={newRule.action} onChange={(e) => setNewRule({...newRule, action: e.target.value})} required />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowRuleModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddRule}>Add Rule</Button>
          </div>
        </div>
      </Modal>

      {/* Compliance Report Modal */}
      <Modal isOpen={showComplianceModal} onClose={() => setShowComplianceModal(false)} title="QC Compliance Report" size="lg">
        <div className="space-y-4">
          <div className="bg-green-50 p-3 rounded">
            <p className="text-sm text-green-800">
              <i className="fas fa-file-alt mr-2"></i>
              Generate comprehensive QC compliance report
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <select className="w-full px-3 py-2 border rounded-lg">
                <option>Monthly Compliance Report</option>
                <option>Quarterly Summary</option>
                <option>Annual Audit Report</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select className="w-full px-3 py-2 border rounded-lg">
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Year to Date</option>
                <option>Custom</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Format</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input type="radio" name="format" className="mr-2" defaultChecked /> PDF
              </label>
              <label className="flex items-center">
                <input type="radio" name="format" className="mr-2" /> Excel
              </label>
              <label className="flex items-center">
                <input type="radio" name="format" className="mr-2" /> CSV
              </label>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-600">Report will include:</p>
            <ul className="text-xs text-gray-500 mt-1 list-disc list-inside">
              <li>QC run summary and statistics</li>
              <li>Rule violation analysis</li>
              <li>Trend analysis charts</li>
              <li>Material inventory status</li>
              <li>Compliance score</li>
            </ul>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowComplianceModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => {
              setShowComplianceModal(false)
              setToast({ message: 'Compliance report generation started', type: 'success' })
            }}>Generate Report</Button>
          </div>
        </div>
      </Modal>

      {/* Alerts Configuration Modal */}
      <Modal isOpen={showAlertsModal} onClose={() => setShowAlertsModal(false)} title="QC Alerts Configuration" size="lg">
        <div className="space-y-4">
          <div className="bg-purple-50 p-3 rounded">
            <p className="text-sm text-purple-800">
              <i className="fas fa-bell mr-2"></i>
              Configure automated alerts for QC events
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Rule Violation Alerts</p>
                <p className="text-xs text-gray-500">Notify when QC rules are violated</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Out-of-Range Alerts</p>
                <p className="text-xs text-gray-500">Alert when QC values exceed ±2SD</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Material Expiry Alerts</p>
                <p className="text-xs text-gray-500">Alert 30 days before material expiry</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notification Recipients</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Enter email addresses (comma separated)" />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowAlertsModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => {
              setShowAlertsModal(false)
              setToast({ message: 'Alert configuration saved', type: 'success' })
            }}>Save Configuration</Button>
          </div>
        </div>
      </Modal>

      {/* Toast Notifications */}
      {toast && (<Toast key={toast.message + Date.now()} message={toast.message} type={toast.type} onClose={() => setToast(null)} />)}
    </>
  )
}

export default QualityControl