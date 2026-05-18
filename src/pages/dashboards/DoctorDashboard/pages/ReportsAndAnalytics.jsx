import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import Modal from '../../../../components/common/Modal/Modal'
import { apiFetch } from '../../../../services/apiClient'
import {
  DOCTOR_REPORTS_PRACTICE_OVERVIEW,
  DOCTOR_REPORTS_PATIENT_ANALYTICS,
  DOCTOR_REPORTS_APPOINTMENT_ANALYTICS,
  DOCTOR_REPORTS_CLINICAL_OUTCOMES,
  DOCTOR_REPORTS_FINANCIAL_SUMMARY,
  DOCTOR_REPORTS_PERFORMANCE_METRICS,
  DOCTOR_REPORTS_COMPARATIVE_ANALYSIS,
  DOCTOR_REPORTS_GENERATE_CUSTOM_REPORT
} from '../../../../config/api'

const REPORT_TABS = [
  { id: 'practice-overview', label: 'Practice Overview', icon: 'fa-chart-line' },
  { id: 'patient-analytics', label: 'Patient Analytics', icon: 'fa-users' },
  { id: 'appointment-analytics', label: 'Appointment Analytics', icon: 'fa-calendar-alt' },
  { id: 'clinical-outcomes', label: 'Clinical Outcomes', icon: 'fa-heartbeat' },
  { id: 'financial-summary', label: 'Financial Summary', icon: 'fa-dollar-sign' },
  { id: 'performance-metrics', label: 'Performance Metrics', icon: 'fa-tachometer-alt' },
  { id: 'comparative-analysis', label: 'Comparative Analysis', icon: 'fa-balance-scale' },
  { id: 'custom-report', label: 'Custom Report', icon: 'fa-file-alt' }
]

const REPORT_PERIODS = [
  { value: 'THIS_WEEK', label: 'This Week' },
  { value: 'THIS_MONTH', label: 'This Month' },
  { value: 'THIS_QUARTER', label: 'This Quarter' },
  { value: 'THIS_YEAR', label: 'This Year' },
  { value: 'CUSTOM', label: 'Custom Range' }
]

const ReportsAndAnalytics = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('practice-overview')
  const [selectedPeriod, setSelectedPeriod] = useState('THIS_MONTH')
  const [customDateFrom, setCustomDateFrom] = useState('')
  const [customDateTo, setCustomDateTo] = useState('')
  const [reportData, setReportData] = useState(null)
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportFormat, setExportFormat] = useState('JSON')
  const [exportLoading, setExportLoading] = useState(false)

  const getEndpointForTab = (tab) => {
    switch (tab) {
      case 'practice-overview':
        return DOCTOR_REPORTS_PRACTICE_OVERVIEW
      case 'patient-analytics':
        return DOCTOR_REPORTS_PATIENT_ANALYTICS
      case 'appointment-analytics':
        return DOCTOR_REPORTS_APPOINTMENT_ANALYTICS
      case 'clinical-outcomes':
        return DOCTOR_REPORTS_CLINICAL_OUTCOMES
      case 'financial-summary':
        return DOCTOR_REPORTS_FINANCIAL_SUMMARY
      case 'performance-metrics':
        return DOCTOR_REPORTS_PERFORMANCE_METRICS
      case 'comparative-analysis':
        return DOCTOR_REPORTS_COMPARATIVE_ANALYSIS
      default:
        return DOCTOR_REPORTS_PRACTICE_OVERVIEW
    }
  }

  const loadReportData = async () => {
    setLoading(true)
    setError('')

    try {
      const params = new URLSearchParams()
      params.append('report_period', selectedPeriod)
      if (customDateFrom) params.append('custom_date_from', customDateFrom)
      if (customDateTo) params.append('custom_date_to', customDateTo)

      const endpoint = `${getEndpointForTab(activeTab)}?${params.toString()}`
      const res = await apiFetch(endpoint, { method: 'GET' })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        // If endpoint not found (404), use mock data for development
        if (res.status === 404) {
          console.warn(`Endpoint ${endpoint} not found, using mock data`)
          setReportData(getMockDataForTab(activeTab))
          setError('Using demo data - Backend endpoint not yet implemented')
        } else {
          throw new Error(data?.message || data?.detail || `Failed to load ${activeTab} data`)
        }
      } else {
        setReportData(data)
      }
    } catch (loadError) {
      // Use mock data on any error for development
      console.warn(`Error loading ${activeTab} data:`, loadError)
      setReportData(getMockDataForTab(activeTab))
      setError('Using demo data - Unable to connect to backend')
    } finally {
      setLoading(false)
    }
  }

  const getMockDataForTab = (tab) => {
    switch (tab) {
      case 'practice-overview':
        return {
          total_patients_seen: 156,
          total_appointments: 234,
          total_prescriptions: 189,
          total_admissions: 12,
          appointment_completion_rate: 87.5,
          report_period: 'This Month',
          most_common_diagnoses: [
            { diagnosis: 'Hypertension', count: 45, percentage: 28.8 },
            { diagnosis: 'Diabetes Type 2', count: 32, percentage: 20.5 },
            { diagnosis: 'Upper Respiratory Infection', count: 28, percentage: 17.9 },
            { diagnosis: 'Arthritis', count: 22, percentage: 14.1 },
            { diagnosis: 'Gastroenteritis', count: 18, percentage: 11.5 }
          ],
          most_prescribed_medications: [
            { medication: 'Amlodipine', count: 38, percentage: 20.1 },
            { medication: 'Metformin', count: 32, percentage: 16.9 },
            { medication: 'Lisinopril', count: 28, percentage: 14.8 },
            { medication: 'Omeprazole', count: 25, percentage: 13.2 },
            { medication: 'Atorvastatin', count: 22, percentage: 11.6 }
          ]
        }
      case 'patient-analytics':
        return {
          total_unique_patients: 156,
          new_patients: 42,
          returning_patients: 114,
          age_distribution: { '0-18': 18, '19-30': 35, '31-45': 42, '46-60': 38, '61-75': 15, '75+': 8 },
          gender_distribution: { 'MALE': 78, 'FEMALE': 76, 'OTHER': 2 },
          chronic_conditions_breakdown: [
            { condition: 'Hypertension', patient_count: 45, percentage: 28.8 },
            { condition: 'Diabetes', patient_count: 32, percentage: 20.5 },
            { condition: 'Arthritis', patient_count: 22, percentage: 14.1 }
          ],
          average_visits_per_patient: 1.5,
          patient_retention_rate: 73.1,
          high_risk_patients: 18,
          patients_requiring_follow_up: 35
        }
      case 'appointment-analytics':
        return {
          total_appointments: 234,
          completed_appointments: 205,
          cancelled_appointments: 18,
          no_show_appointments: 11,
          completion_rate: 87.6,
          cancellation_rate: 7.7,
          no_show_rate: 4.7,
          peak_appointment_hours: [
            { hour: '09:00', appointment_count: 45, percentage: 19.2 },
            { hour: '10:00', appointment_count: 52, percentage: 22.2 },
            { hour: '11:00', appointment_count: 38, percentage: 16.2 },
            { hour: '14:00', appointment_count: 48, percentage: 20.5 },
            { hour: '15:00', appointment_count: 35, percentage: 15.0 }
          ],
          peak_appointment_days: [
            { day: 'Monday', appointment_count: 52, percentage: 22.2 },
            { day: 'Tuesday', appointment_count: 48, percentage: 20.5 },
            { day: 'Wednesday', appointment_count: 45, percentage: 19.2 },
            { day: 'Thursday', appointment_count: 42, percentage: 17.9 },
            { day: 'Friday', appointment_count: 47, percentage: 20.1 }
          ],
          schedule_utilization_rate: 78.5,
          average_wait_time: 12.5
        }
      case 'clinical-outcomes':
        return {
          total_cases_treated: 205,
          successful_treatment_rate: 89.5,
          follow_up_compliance_rate: 76.0,
          readmission_rate: 6.5,
          clinical_guidelines_adherence: 92.0,
          patient_safety_incidents: 2,
          diagnosis_accuracy_indicators: [
            { diagnosis_category: 'Respiratory Infections', accuracy_score: 94.5, confidence_level: 'High', cases_analyzed: 48 },
            { diagnosis_category: 'Cardiovascular Conditions', accuracy_score: 91.0, confidence_level: 'High', cases_analyzed: 35 },
            { diagnosis_category: 'Diabetes Management', accuracy_score: 96.0, confidence_level: 'Very High', cases_analyzed: 32 }
          ],
          areas_for_improvement: ['Improve patient follow-up compliance', 'Enhance documentation accuracy']
        }
      case 'financial-summary':
        return {
          total_revenue: 45678.50,
          consultation_revenue: 34567.00,
          procedure_revenue: 11111.50,
          average_revenue_per_patient: 292.81,
          collection_rate: 94.5,
          outstanding_payments: 2512.25,
          revenue_by_service_type: {
            'Consultations': 34567.00,
            'Procedures': 11111.50,
            'Follow-ups': 6913.40,
            'Emergency': 3456.70
          },
          revenue_vs_previous_period: 8.5,
          revenue_growth_rate: 12.0
        }
      case 'performance-metrics':
        return {
          overall_performance_score: 87.5,
          patients_per_day: 12.8,
          patient_satisfaction_score: 4.3,
          clinical_quality_score: 91.5,
          safety_score: 96.0,
          department_ranking: 3,
          hospital_ranking: 15,
          achievement_rate: 92.5,
          monthly_targets: {
            patient_consultations: 150,
            patient_satisfaction: 4.0,
            revenue_target: 50000.0,
            follow_up_compliance: 80.0
          }
        }
      case 'comparative-analysis':
        return {
          comparison_period: 'This Month',
          department_average_metrics: {
            patients_per_day: 11.5,
            appointment_completion_rate: 84.0,
            patient_satisfaction: 4.1,
            revenue_per_day: 3200.0,
            prescription_accuracy: 93.0
          },
          hospital_average_metrics: {
            patients_per_day: 11.2,
            appointment_completion_rate: 82.5,
            patient_satisfaction: 4.0,
            revenue_per_day: 3100.0,
            prescription_accuracy: 91.5
          },
          department_rank: 3,
          total_doctors_in_department: 8,
          strengths: ['Above average patient volume', 'Excellent patient satisfaction scores', 'High appointment completion rate'],
          improvement_areas: ['Reduce appointment cancellations'],
          industry_benchmarks: {
            patient_satisfaction: 4.1,
            appointment_completion_rate: 85.0,
            prescription_accuracy: 95.0,
            follow_up_compliance: 78.0,
            revenue_per_patient: 280.0
          },
          performance_vs_benchmark: {
            patient_satisfaction: 'Above Benchmark',
            appointment_completion_rate: 'At Benchmark',
            prescription_accuracy: 'Below Benchmark',
            follow_up_compliance: 'Below Benchmark',
            revenue_per_patient: 'Above Benchmark'
          }
        }
      default:
        return {}
    }
  }

  useEffect(() => {
    loadReportData()
  }, [activeTab, selectedPeriod, customDateFrom, customDateTo])

  const handleExport = async () => {
    setExportLoading(true)
    try {
      const params = new URLSearchParams()
      params.append('report_period', selectedPeriod)
      if (customDateFrom) params.append('custom_date_from', customDateFrom)
      if (customDateTo) params.append('custom_date_to', customDateTo)

      const endpoint = `${getEndpointForTab(activeTab)}/export?${params.toString()}&format=${exportFormat}`
      const res = await apiFetch(endpoint, { method: 'GET' })

      if (!res.ok) {
        throw new Error('Failed to export report')
      }

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${activeTab}-report.${exportFormat.toLowerCase()}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      setShowExportModal(false)
    } catch (exportError) {
      alert(exportError?.message || 'Unable to export report')
    } finally {
      setExportLoading(false)
    }
  }

  if (loading && !reportData) return <LoadingSpinner />

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Reports & Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">Comprehensive analytics for your medical practice</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
          >
            {REPORT_PERIODS.map(period => (
              <option key={period.value} value={period.value}>{period.label}</option>
            ))}
          </select>
          {selectedPeriod === 'CUSTOM' && (
            <>
              <input
                type="date"
                value={customDateFrom}
                onChange={(e) => setCustomDateFrom(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <input
                type="date"
                value={customDateTo}
                onChange={(e) => setCustomDateTo(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </>
          )}
          <button
            onClick={loadReportData}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            <i className="fas fa-sync-alt mr-2"></i>
            Refresh
          </button>
          <button
            onClick={() => setShowExportModal(true)}
            className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
          >
            <i className="fas fa-download mr-2"></i>
            Export
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center justify-between">
          <span><i className="fas fa-exclamation-circle mr-2"></i>{error}</span>
          <button onClick={loadReportData} className="px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-sm">
            Retry
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex overflow-x-auto border-b">
          {REPORT_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <i className={`fas ${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <ReportContent activeTab={activeTab} data={reportData} />
          )}
        </div>
      </div>

      {/* Export Modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Report"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="JSON">JSON</option>
              <option value="CSV">CSV</option>
              <option value="PDF">PDF</option>
              <option value="EXCEL">Excel</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setShowExportModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={exportLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {exportLoading ? 'Exporting...' : 'Export'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

const ReportContent = ({ activeTab, data }) => {
  switch (activeTab) {
    case 'practice-overview':
      return <PracticeOverview data={data} />
    case 'patient-analytics':
      return <PatientAnalytics data={data} />
    case 'appointment-analytics':
      return <AppointmentAnalytics data={data} />
    case 'clinical-outcomes':
      return <ClinicalOutcomes data={data} />
    case 'financial-summary':
      return <FinancialSummary data={data} />
    case 'performance-metrics':
      return <PerformanceMetrics data={data} />
    case 'comparative-analysis':
      return <ComparativeAnalysis data={data} />
    case 'custom-report':
      return <CustomReportGenerator />
    default:
      return <div className="text-center text-gray-500 py-10">Select a report type</div>
  }
}

// Practice Overview Component
const PracticeOverview = ({ data }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Patients Seen" value={data?.total_patients_seen || 0} color="blue" icon="fa-users" />
      <StatCard title="Appointments" value={data?.total_appointments || 0} color="green" icon="fa-calendar-check" />
      <StatCard title="Prescriptions" value={data?.total_prescriptions || 0} color="yellow" icon="fa-prescription-bottle-medical" />
      <StatCard title="Admissions" value={data?.total_admissions || 0} color="purple" icon="fa-hospital" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-3">Completion Rate</h4>
        <div className="text-3xl font-bold text-blue-600">{data?.appointment_completion_rate || 0}%</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-3">Report Period</h4>
        <div className="text-lg text-gray-700">{data?.report_period || 'N/A'}</div>
      </div>
    </div>

    {data?.most_common_diagnoses && data.most_common_diagnoses.length > 0 && (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b bg-gray-50">
          <h4 className="font-semibold text-gray-800">Most Common Diagnoses</h4>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Diagnosis</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Count</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.most_common_diagnoses.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">{item.diagnosis}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.count}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {data?.most_prescribed_medications && data.most_prescribed_medications.length > 0 && (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b bg-gray-50">
          <h4 className="font-semibold text-gray-800">Most Prescribed Medications</h4>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Medication</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Count</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.most_prescribed_medications.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">{item.medication}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.count}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)

// Patient Analytics Component
const PatientAnalytics = ({ data }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Patients" value={data?.total_unique_patients || 0} color="blue" icon="fa-users" />
      <StatCard title="New Patients" value={data?.new_patients || 0} color="green" icon="fa-user-plus" />
      <StatCard title="Returning Patients" value={data?.returning_patients || 0} color="yellow" icon="fa-user-check" />
      <StatCard title="High Risk Patients" value={data?.high_risk_patients || 0} color="red" icon="fa-exclamation-triangle" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {data?.age_distribution && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b bg-gray-50">
            <h4 className="font-semibold text-gray-800">Age Distribution</h4>
          </div>
          <div className="p-4 space-y-3">
            {Object.entries(data.age_distribution).map(([ageGroup, count]) => (
              <div key={ageGroup} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{ageGroup}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${(count / data.total_unique_patients) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data?.gender_distribution && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b bg-gray-50">
            <h4 className="font-semibold text-gray-800">Gender Distribution</h4>
          </div>
          <div className="p-4 space-y-3">
            {Object.entries(data.gender_distribution).map(([gender, count]) => (
              <div key={gender} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{gender}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${(count / data.total_unique_patients) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Retention Rate</h4>
        <div className="text-2xl font-bold text-blue-600">{data?.patient_retention_rate || 0}%</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Avg Visits per Patient</h4>
        <div className="text-2xl font-bold text-green-600">{data?.average_visits_per_patient || 0}</div>
      </div>
    </div>

    {data?.chronic_conditions_breakdown && data.chronic_conditions_breakdown.length > 0 && (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b bg-gray-50">
          <h4 className="font-semibold text-gray-800">Chronic Conditions Breakdown</h4>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Condition</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Patient Count</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.chronic_conditions_breakdown.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">{item.condition}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.patient_count}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)

// Appointment Analytics Component
const AppointmentAnalytics = ({ data }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Appointments" value={data?.total_appointments || 0} color="blue" icon="fa-calendar" />
      <StatCard title="Completed" value={data?.completed_appointments || 0} color="green" icon="fa-check-circle" />
      <StatCard title="Cancelled" value={data?.cancelled_appointments || 0} color="red" icon="fa-times-circle" />
      <StatCard title="No Show" value={data?.no_show_appointments || 0} color="yellow" icon="fa-user-clock" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Completion Rate</h4>
        <div className="text-2xl font-bold text-green-600">{data?.completion_rate || 0}%</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Cancellation Rate</h4>
        <div className="text-2xl font-bold text-red-600">{data?.cancellation_rate || 0}%</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">No Show Rate</h4>
        <div className="text-2xl font-bold text-yellow-600">{data?.no_show_rate || 0}%</div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {data?.peak_appointment_hours && data.peak_appointment_hours.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b bg-gray-50">
            <h4 className="font-semibold text-gray-800">Peak Appointment Hours</h4>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hour</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Count</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.peak_appointment_hours.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">{item.hour}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.appointment_count}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data?.peak_appointment_days && data.peak_appointment_days.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b bg-gray-50">
            <h4 className="font-semibold text-gray-800">Peak Appointment Days</h4>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Day</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Count</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.peak_appointment_days.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">{item.day}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.appointment_count}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Schedule Utilization Rate</h4>
        <div className="text-2xl font-bold text-blue-600">{data?.schedule_utilization_rate || 0}%</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Average Wait Time</h4>
        <div className="text-2xl font-bold text-purple-600">{data?.average_wait_time || 0} min</div>
      </div>
    </div>
  </div>
)

// Clinical Outcomes Component
const ClinicalOutcomes = ({ data }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Cases Treated" value={data?.total_cases_treated || 0} color="blue" icon="fa-procedures" />
      <StatCard title="Success Rate" value={`${data?.successful_treatment_rate || 0}%`} color="green" icon="fa-check-double" />
      <StatCard title="Follow-up Compliance" value={`${data?.follow_up_compliance_rate || 0}%`} color="yellow" icon="fa-clipboard-check" />
      <StatCard title="Safety Incidents" value={data?.patient_safety_incidents || 0} color="red" icon="fa-exclamation-triangle" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Readmission Rate</h4>
        <div className="text-2xl font-bold text-red-600">{data?.readmission_rate || 0}%</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Guidelines Adherence</h4>
        <div className="text-2xl font-bold text-green-600">{data?.clinical_guidelines_adherence || 0}%</div>
      </div>
    </div>

    {data?.diagnosis_accuracy_indicators && data.diagnosis_accuracy_indicators.length > 0 && (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b bg-gray-50">
          <h4 className="font-semibold text-gray-800">Diagnosis Accuracy Indicators</h4>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Accuracy Score</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Confidence</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cases</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.diagnosis_accuracy_indicators.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">{item.diagnosis_category}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.accuracy_score}%</td>
                <td className="px-4 py-2 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.confidence_level === 'Very High' ? 'bg-green-100 text-green-700' :
                    item.confidence_level === 'High' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>{item.confidence_level}</span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.cases_analyzed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {data?.areas_for_improvement && data.areas_for_improvement.length > 0 && (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-3">Areas for Improvement</h4>
        <ul className="space-y-2">
          {data.areas_for_improvement.map((area, idx) => (
            <li key={idx} className="text-sm text-yellow-700 flex items-start">
              <i className="fas fa-lightbulb mr-2 mt-1"></i>
              {area}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
)

// Financial Summary Component
const FinancialSummary = ({ data }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Revenue" value={`$${data?.total_revenue?.toFixed(2) || '0.00'}`} color="green" icon="fa-dollar-sign" />
      <StatCard title="Consultation Revenue" value={`$${data?.consultation_revenue?.toFixed(2) || '0.00'}`} color="blue" icon="fa-stethoscope" />
      <StatCard title="Procedure Revenue" value={`$${data?.procedure_revenue?.toFixed(2) || '0.00'}`} color="purple" icon="fa-procedures" />
      <StatCard title="Avg Revenue/Patient" value={`$${data?.average_revenue_per_patient?.toFixed(2) || '0.00'}`} color="yellow" icon="fa-user-dollar" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Collection Rate</h4>
        <div className="text-2xl font-bold text-green-600">{data?.collection_rate || 0}%</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Outstanding Payments</h4>
        <div className="text-2xl font-bold text-red-600">${data?.outstanding_payments?.toFixed(2) || '0.00'}</div>
      </div>
    </div>

    {data?.revenue_by_service_type && (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b bg-gray-50">
          <h4 className="font-semibold text-gray-800">Revenue by Service Type</h4>
        </div>
        <div className="p-4 space-y-3">
          {Object.entries(data.revenue_by_service_type).map(([service, revenue]) => (
            <div key={service} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{service}</span>
              <span className="text-sm font-medium text-gray-900">${revenue.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Revenue vs Previous Period</h4>
        <div className="text-2xl font-bold text-blue-600">{data?.revenue_vs_previous_period > 0 ? '+' : ''}{data?.revenue_vs_previous_period || 0}%</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Revenue Growth Rate</h4>
        <div className="text-2xl font-bold text-green-600">{data?.revenue_growth_rate || 0}%</div>
      </div>
    </div>
  </div>
)

// Performance Metrics Component
const PerformanceMetrics = ({ data }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Overall Score" value={`${data?.overall_performance_score || 0}/100`} color="blue" icon="fa-trophy" />
      <StatCard title="Patients/Day" value={data?.patients_per_day || 0} color="green" icon="fa-users" />
      <StatCard title="Satisfaction Score" value={`${data?.patient_satisfaction_score || 0}/5`} color="yellow" icon="fa-smile" />
      <StatCard title="Clinical Quality" value={`${data?.clinical_quality_score || 0}%`} color="purple" icon="fa-star" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Department Ranking</h4>
        <div className="text-2xl font-bold text-blue-600">#{data?.department_rank || 0}</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Hospital Ranking</h4>
        <div className="text-2xl font-bold text-green-600">#{data?.hospital_ranking || 0}</div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Safety Score</h4>
        <div className="text-2xl font-bold text-green-600">{data?.safety_score || 0}%</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Achievement Rate</h4>
        <div className="text-2xl font-bold text-purple-600">{data?.achievement_rate || 0}%</div>
      </div>
    </div>

    {data?.monthly_targets && (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b bg-gray-50">
          <h4 className="font-semibold text-gray-800">Monthly Targets</h4>
        </div>
        <div className="p-4 space-y-3">
          {Object.entries(data.monthly_targets).map(([target, value]) => (
            <div key={target} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 capitalize">{target.replace(/_/g, ' ')}</span>
              <span className="text-sm font-medium text-gray-900">{typeof value === 'number' && value > 100 ? `$${value.toFixed(2)}` : value}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
)

// Comparative Analysis Component
const ComparativeAnalysis = ({ data }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data?.department_average_metrics && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b bg-gray-50">
            <h4 className="font-semibold text-gray-800">Department Average Metrics</h4>
          </div>
          <div className="p-4 space-y-3">
            {Object.entries(data.department_average_metrics).map(([metric, value]) => (
              <div key={metric} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 capitalize">{metric.replace(/_/g, ' ')}</span>
                <span className="text-sm font-medium text-gray-900">{typeof value === 'number' && value > 100 ? `$${value.toFixed(2)}` : value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {data?.hospital_average_metrics && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b bg-gray-50">
            <h4 className="font-semibold text-gray-800">Hospital Average Metrics</h4>
          </div>
          <div className="p-4 space-y-3">
            {Object.entries(data.hospital_average_metrics).map(([metric, value]) => (
              <div key={metric} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 capitalize">{metric.replace(/_/g, ' ')}</span>
                <span className="text-sm font-medium text-gray-900">{typeof value === 'number' && value > 100 ? `$${value.toFixed(2)}` : value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Department Rank</h4>
        <div className="text-2xl font-bold text-blue-600">#{data?.department_rank || 0} / {data?.total_doctors_in_department || 0}</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Comparison Period</h4>
        <div className="text-lg text-gray-700">{data?.comparison_period || 'N/A'}</div>
      </div>
    </div>

    {data?.strengths && data.strengths.length > 0 && (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-semibold text-green-800 mb-3">Strengths</h4>
        <ul className="space-y-2">
          {data.strengths.map((strength, idx) => (
            <li key={idx} className="text-sm text-green-700 flex items-start">
              <i className="fas fa-check-circle mr-2 mt-1"></i>
              {strength}
            </li>
          ))}
        </ul>
      </div>
    )}

    {data?.improvement_areas && data.improvement_areas.length > 0 && (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-3">Areas for Improvement</h4>
        <ul className="space-y-2">
          {data.improvement_areas.map((area, idx) => (
            <li key={idx} className="text-sm text-yellow-700 flex items-start">
              <i className="fas fa-exclamation-circle mr-2 mt-1"></i>
              {area}
            </li>
          ))}
        </ul>
      </div>
    )}

    {data?.industry_benchmarks && (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b bg-gray-50">
          <h4 className="font-semibold text-gray-800">Industry Benchmarks</h4>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Metric</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Benchmark</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Object.entries(data.industry_benchmarks).map(([metric, benchmark]) => (
              <tr key={metric} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700 capitalize">{metric.replace(/_/g, ' ')}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{typeof benchmark === 'number' && benchmark > 10 ? benchmark.toFixed(1) : benchmark}</td>
                <td className="px-4 py-2 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    data?.performance_vs_benchmark?.[metric] === 'Above Benchmark' ? 'bg-green-100 text-green-700' :
                    data?.performance_vs_benchmark?.[metric] === 'At Benchmark' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>{data?.performance_vs_benchmark?.[metric] || 'N/A'}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)

// Custom Report Generator Component
const CustomReportGenerator = () => {
  const [reportType, setReportType] = useState('PRACTICE_SUMMARY')
  const [reportPeriod, setReportPeriod] = useState('THIS_MONTH')
  const [customDateFrom, setCustomDateFrom] = useState('')
  const [customDateTo, setCustomDateTo] = useState('')
  const [exportFormat, setExportFormat] = useState('PDF')
  const [loading, setLoading] = useState(false)

  const handleGenerateReport = async () => {
    setLoading(true)
    try {
      const payload = {
        report_type: reportType,
        report_period: reportPeriod,
        custom_date_from: customDateFrom || null,
        custom_date_to: customDateTo || null,
        export_format: exportFormat
      }

      const res = await apiFetch(DOCTOR_REPORTS_GENERATE_CUSTOM_REPORT, {
        method: 'POST',
        body: payload
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data?.message || data?.detail || 'Failed to generate custom report')
      }

      alert(`Custom report generated successfully! Report ID: ${data.report_metadata?.report_type}`)
    } catch (error) {
      alert(error?.message || 'Unable to generate custom report')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="PRACTICE_SUMMARY">Practice Summary</option>
            <option value="PATIENT_ANALYTICS">Patient Analytics</option>
            <option value="APPOINTMENT_ANALYTICS">Appointment Analytics</option>
            <option value="PRESCRIPTION_ANALYTICS">Prescription Analytics</option>
            <option value="CLINICAL_OUTCOMES">Clinical Outcomes</option>
            <option value="FINANCIAL_SUMMARY">Financial Summary</option>
            <option value="PERFORMANCE_METRICS">Performance Metrics</option>
            <option value="COMPARATIVE_ANALYSIS">Comparative Analysis</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Report Period</label>
          <select
            value={reportPeriod}
            onChange={(e) => setReportPeriod(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            {REPORT_PERIODS.map(period => (
              <option key={period.value} value={period.value}>{period.label}</option>
            ))}
          </select>
        </div>

        {reportPeriod === 'CUSTOM' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
              <input
                type="date"
                value={customDateFrom}
                onChange={(e) => setCustomDateFrom(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
              <input
                type="date"
                value={customDateTo}
                onChange={(e) => setCustomDateTo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="JSON">JSON</option>
            <option value="CSV">CSV</option>
            <option value="PDF">PDF</option>
            <option value="EXCEL">Excel</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleGenerateReport}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-all"
        >
          {loading ? 'Generating...' : 'Generate Custom Report'}
        </button>
      </div>
    </div>
  )
}

const StatCard = ({ title, value, color, icon }) => (
  <div className={`rounded-xl p-5 text-white ${
    color === 'green'
      ? 'bg-gradient-to-br from-green-500 to-emerald-600'
      : color === 'yellow'
        ? 'bg-gradient-to-br from-yellow-500 to-amber-600'
        : color === 'red'
          ? 'bg-gradient-to-br from-red-500 to-red-700'
          : color === 'purple'
            ? 'bg-gradient-to-br from-purple-500 to-purple-700'
            : 'bg-gradient-to-br from-blue-500 to-blue-700'
  }`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-90">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
      <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
        <i className={`fas ${icon} text-xl`}></i>
      </div>
    </div>
  </div>
)

export default ReportsAndAnalytics
