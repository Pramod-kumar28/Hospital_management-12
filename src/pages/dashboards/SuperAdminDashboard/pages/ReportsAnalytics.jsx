import React, { useState, useEffect, useRef } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import Modal from '../../../../components/common/Modal/Modal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from 'xlsx';

const ReportsAnalytics = () => {
  // State Management for Super Admin
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);

  // Super Admin Dashboard Metrics
  const [platformMetrics, setPlatformMetrics] = useState({
    subscription: {
      totalHospitals: 150,
      activeSubscriptions: 150,
      churnRate: 3.2,
      newSubscriptions: 28,
      revenueGrowth: 24.5
    },
    financial: {
      totalRevenue: 2450000,
      monthlyRecurringRevenue: 204167,
      annualRecurringRevenue: 2450000,
      averageRevenuePerUser: 16333,
      collectionRate: 92.5
    },
    performance: {
      platformUptime: 99.9,
      apiResponseTime: 185,
      customerSatisfaction: 4.7,
      supportResolutionRate: 96.2,
      featureAdoption: 78.5
    },
    usage: {
      activeUsers: 2450,
      dailyLogins: 1850,
      apiCalls: 125000,
      dataStorage: 285,
      bandwidthUsage: 450
    }
  });

  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    endDate: new Date()
  });

  const [filters, setFilters] = useState({
    reportType: 'all',
    subscriptionPlan: 'all',
    status: 'all',
    searchQuery: ''
  });

  // Modal states
  const [isGenerateReportModalOpen, setIsGenerateReportModalOpen] = useState(false);
  const [isCustomReportModalOpen, setIsCustomReportModalOpen] = useState(false);
  const [isViewReportModalOpen, setIsViewReportModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const [newReport, setNewReport] = useState({
    title: '',
    type: 'subscription',
    planType: 'all',
    format: 'PDF',
    timeframe: 'last_30_days',
    includeCharts: true,
    includeData: true,
    emailNotification: false,
    schedule: false,
    recipients: []
  });

  // Super Admin Analytics Data
  const [analyticsData, setAnalyticsData] = useState({
    revenueTrends: [],
    subscriptionGrowth: [],
    planDistribution: [],
    hospitalPerformance: [],
    platformUsage: []
  });

  // Initialize with super admin data
  useEffect(() => {
    generateSuperAdminData();
    fetchReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [filters, reports]);

  // Generate super admin focused data
  const generateSuperAdminData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Revenue Trends (Platform Revenue)
    const revenueTrends = months.map((month, index) => ({
      month,
      mrr: Math.floor(Math.random() * 40000) + 180000,
      arr: Math.floor(Math.random() * 480000) + 2160000,
      newRevenue: Math.floor(Math.random() * 25000) + 75000,
      churnRevenue: Math.floor(Math.random() * 15000) + 25000,
      netRevenue: 0
    })).map(item => ({
      ...item,
      netRevenue: item.mrr - item.churnRevenue + item.newRevenue
    }));

    // Subscription Growth
    const subscriptionGrowth = months.map((month, index) => ({
      month,
      newHospitals: Math.floor(Math.random() * 15) + 5,
      churnedHospitals: Math.floor(Math.random() * 5) + 1,
      upgradedPlans: Math.floor(Math.random() * 8) + 2,
      downgradedPlans: Math.floor(Math.random() * 4) + 1,
      netGrowth: 0
    })).map(item => ({
      ...item,
      netGrowth: item.newHospitals - item.churnedHospitals
    }));

    // Plan Distribution
    const planDistribution = [
      { plan: 'Basic', hospitals: 45, revenue: 450000, growth: 12, color: '#3B82F6' },
      { plan: 'Professional', hospitals: 30, revenue: 900000, growth: 18, color: '#10B981' },
      { plan: 'Enterprise', hospitals: 20, revenue: 1400000, growth: 25, color: '#8B5CF6' },
      { plan: 'Custom', hospitals: 5, revenue: 750000, growth: 8, color: '#F59E0B' }
    ];

    // Top Performing Hospitals
    const hospitalPerformance = [
      { name: 'City General Hospital', revenue: 125000, plan: 'Enterprise', growth: 15, usage: 98 },
      { name: 'Unity Medical Center', revenue: 98000, plan: 'Professional', growth: 22, usage: 92 },
      { name: 'Metro Health Hospital', revenue: 87000, plan: 'Enterprise', growth: 8, usage: 95 },
      { name: 'Central Clinic', revenue: 65000, plan: 'Professional', growth: 14, usage: 88 },
      { name: 'Community Hospital', revenue: 52000, plan: 'Basic', growth: 5, usage: 85 }
    ];

    // Platform Usage Metrics
    const platformUsage = [
      { metric: 'Daily Active Users', value: 1850, change: 8.5 },
      { metric: 'API Requests', value: 125000, change: 12.3 },
      { metric: 'Data Storage (GB)', value: 285, change: 5.2 },
      { metric: 'Bandwidth Usage', value: 450, change: 15.7 },
      { metric: 'Support Tickets', value: 45, change: -3.2 }
    ];

    setAnalyticsData({
      revenueTrends,
      subscriptionGrowth,
      planDistribution,
      hospitalPerformance,
      platformUsage
    });
  };

  const fetchReports = () => {
    const sampleReports = [
      {
        id: 'REP-SA-001',
        title: 'Monthly Subscription Analytics Report',
        type: 'subscription',
        planType: 'all',
        format: 'PDF',
        generatedDate: new Date().toISOString().split('T')[0],
        status: 'completed',
        size: '2.8 MB',
        records: 1850,
        chartsIncluded: ['Subscription Growth', 'Plan Distribution', 'Churn Analysis'],
        scheduled: false,
        tags: ['monthly', 'subscription', 'analytics'],
        description: 'Comprehensive analysis of subscription metrics and hospital growth',
        lastAccessed: new Date().toISOString().split('T')[0],
        downloadCount: 12
      },
      {
        id: 'REP-SA-002',
        title: 'Financial Performance Dashboard',
        type: 'financial',
        planType: 'all',
        format: 'Excel',
        generatedDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        status: 'completed',
        size: '1.5 MB',
        records: 2450,
        chartsIncluded: ['Revenue Trends', 'MRR/ARR Analysis', 'Collection Rates'],
        scheduled: true,
        frequency: 'weekly',
        tags: ['financial', 'performance', 'dashboard'],
        description: 'Detailed financial metrics and revenue analysis',
        lastAccessed: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        downloadCount: 8
      },
      {
        id: 'REP-SA-003',
        title: 'Platform Usage & Performance',
        type: 'performance',
        planType: 'all',
        format: 'PDF',
        generatedDate: new Date(Date.now() - 172800000).toISOString().split('T')[0],
        status: 'processing',
        size: '0 MB',
        records: 0,
        chartsIncluded: ['Platform Uptime', 'API Performance', 'User Activity'],
        scheduled: false,
        tags: ['platform', 'performance', 'usage'],
        description: 'Platform performance metrics and usage analytics',
        lastAccessed: null,
        downloadCount: 0
      },
      {
        id: 'REP-SA-004',
        title: 'Enterprise Plan Analysis',
        type: 'custom',
        planType: 'enterprise',
        format: 'CSV',
        generatedDate: new Date(Date.now() - 259200000).toISOString().split('T')[0],
        status: 'completed',
        size: '3.2 MB',
        records: 3200,
        chartsIncluded: ['Enterprise Usage', 'Feature Adoption', 'ROI Analysis'],
        scheduled: false,
        tags: ['enterprise', 'analysis', 'custom'],
        description: 'Deep dive analysis of enterprise plan performance',
        lastAccessed: new Date(Date.now() - 259200000).toISOString().split('T')[0],
        downloadCount: 5
      }
    ];
    setReports(sampleReports);
    setFilteredReports(sampleReports);
  };

  const filterReports = () => {
    let filtered = [...reports];

    if (filters.reportType !== 'all') {
      filtered = filtered.filter(report => report.type === filters.reportType);
    }

    if (filters.subscriptionPlan !== 'all') {
      filtered = filtered.filter(report => report.planType === filters.subscriptionPlan);
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(report => report.status === filters.status);
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(report =>
        report.title.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query) ||
        report.tags.some(tag => tag.toLowerCase().includes(query)) ||
        report.id.toLowerCase().includes(query)
      );
    }

    setFilteredReports(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Report Generation Functions
  const openGenerateReportModal = () => {
    setIsGenerateReportModalOpen(true);
  };

  const openCustomReportModal = () => {
    setIsCustomReportModalOpen(true);
  };

  const closeGenerateReportModal = () => {
    setIsGenerateReportModalOpen(false);
    setNewReport({
      title: '',
      type: 'subscription',
      planType: 'all',
      format: 'PDF',
      timeframe: 'last_30_days',
      includeCharts: true,
      includeData: true,
      emailNotification: false,
      schedule: false,
      recipients: []
    });
  };

  const closeCustomReportModal = () => {
    setIsCustomReportModalOpen(false);
  };

  const handleGenerateReport = async (e) => {
    e.preventDefault();

    if (!newReport.title.trim()) {
      alert('Please enter a report title');
      return;
    }

    // Create super admin report object
    const report = {
      id: `REP-SA-${Date.now()}`,
      title: newReport.title,
      type: newReport.type,
      planType: newReport.planType,
      format: newReport.format,
      generatedDate: new Date().toISOString().split('T')[0],
      status: 'processing',
      size: '0 MB',
      records: 0,
      chartsIncluded: newReport.includeCharts ? getDefaultChartsForType(newReport.type) : [],
      scheduled: newReport.schedule,
      tags: [newReport.type, newReport.planType, 'generated'],
      description: `Generated ${newReport.type} report for ${newReport.timeframe} timeframe`,
      lastAccessed: null,
      downloadCount: 0
    };

    // Add to reports
    setReports(prev => [report, ...prev]);

    // Simulate processing
    const processingSteps = [
      'Collecting subscription data...',
      'Analyzing platform metrics...',
      'Generating revenue insights...',
      'Compiling performance data...',
      'Finalizing report...'
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < processingSteps.length) {
        console.log(processingSteps[step]);
        step++;
      } else {
        clearInterval(interval);

        setReports(prev => prev.map(r =>
          r.id === report.id
            ? {
              ...r,
              status: 'completed',
              size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
              records: Math.floor(Math.random() * 2000) + 1000
            }
            : r
        ));

        const notificationMessage = newReport.emailNotification
          ? `📧 Super Admin Report "${report.title}" has been generated and sent to your email.`
          : `✅ Super Admin Report "${report.title}" has been generated successfully.`;

        alert(notificationMessage);
      }
    }, 600);

    closeGenerateReportModal();
  };

  const getDefaultChartsForType = (type) => {
    const chartMap = {
      subscription: ['Subscription Growth', 'Plan Distribution', 'Churn Analysis'],
      financial: ['Revenue Trends', 'MRR/ARR Analysis', 'Collection Rates'],
      performance: ['Platform Uptime', 'API Performance', 'User Activity'],
      usage: ['Active Users', 'API Requests', 'Storage Usage'],
      custom: ['Custom Analytics', 'Performance Metrics']
    };
    return chartMap[type] || ['Platform Overview'];
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewReport(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setDateRange({ startDate: start, endDate: end });
  };

  // View Report Functions
  const viewReport = (report) => {
    setSelectedReport(report);
    setIsViewReportModalOpen(true);
  };

  const closeViewReportModal = () => {
    setIsViewReportModalOpen(false);
    setSelectedReport(null);
  };

  // Download Functions
  const downloadReport = (report) => {
    if (report.status !== 'completed') {
      alert('⏳ Report is still processing. Please wait until it completes.');
      return;
    }

    // Update download count
    setReports(prev => prev.map(r =>
      r.id === report.id
        ? {
          ...r,
          downloadCount: r.downloadCount + 1,
          lastAccessed: new Date().toISOString().split('T')[0]
        }
        : r
    ));

    // Create downloadable content based on format
    if (report.format === 'Excel') {
      exportToExcel(report);
    } else {
      alert(`📥 Downloading "${report.title}" (${report.format})...`);
      // Simulate download
      setTimeout(() => {
        alert(`✅ Super Admin Report "${report.title}" has been downloaded successfully.`);
      }, 1000);
    }
  };

  const exportToExcel = (report) => {
    const data = analyticsData.revenueTrends.map(item => ({
      Month: item.month,
      'Monthly Recurring Revenue': `$${item.mrr.toLocaleString()}`,
      'Annual Recurring Revenue': `$${item.arr.toLocaleString()}`,
      'New Revenue': `$${item.newRevenue.toLocaleString()}`,
      'Churn Revenue': `$${item.churnRevenue.toLocaleString()}`,
      'Net Revenue Growth': `$${item.netRevenue.toLocaleString()}`
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Platform Revenue");
    XLSX.writeFile(workbook, `${report.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const deleteReport = (reportId) => {
    if (window.confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
      setReports(prev => prev.filter(r => r.id !== reportId));
      alert('🗑️ Report deleted successfully');
    }
  };

  // Schedule Report Function
  const scheduleReport = (report) => {
    const frequency = prompt('Enter schedule frequency (daily, weekly, monthly, quarterly):', 'weekly');
    if (frequency) {
      setReports(prev => prev.map(r =>
        r.id === report.id
          ? { ...r, scheduled: true, frequency }
          : r
      ));
      alert(`✅ Report "${report.title}" scheduled for ${frequency} generation.`);
    }
  };

  // Enhanced Quick Actions for Super Admin
  const quickActions = [
    {
      title: 'Subscription Analytics',
      icon: 'fa-chart-line',
      description: 'Monitor hospital subscriptions and growth',
      action: () => {
        setNewReport(prev => ({
          ...prev,
          title: 'Subscription Analytics Report',
          type: 'subscription',
          planType: 'all'
        }));
        openGenerateReportModal();
      },
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Financial Overview',
      icon: 'fa-chart-pie',
      description: 'Track revenue, MRR, and financial metrics',
      action: () => {
        setNewReport(prev => ({
          ...prev,
          title: 'Financial Performance Report',
          type: 'financial',
          planType: 'all'
        }));
        openGenerateReportModal();
      },
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Platform Performance',
      icon: 'fa-tachometer-alt',
      description: 'Monitor platform uptime and usage',
      action: () => {
        setNewReport(prev => ({
          ...prev,
          title: 'Platform Performance Report',
          type: 'performance',
          planType: 'all'
        }));
        openGenerateReportModal();
      },
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Custom Analytics',
      icon: 'fa-chart-bar',
      description: 'Create custom super admin reports',
      action: openCustomReportModal,
      color: 'from-amber-500 to-amber-600'
    }
  ];

  // Enhanced Status Badge Component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      completed: {
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: <i className="fas fa-check mr-1.5"></i>,
        text: 'Completed'
      },
      processing: {
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: <i className="fas fa-sync-alt mr-1.5 animate-spin"></i>,
        text: 'Processing'
      },
      failed: {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: <i className="fas fa-times mr-1.5"></i>,
        text: 'Failed'
      }
    };

    const config = statusConfig[status] || {
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      icon: <i className="fas fa-question-circle mr-1.5"></i>,
      text: 'Unknown'
    };

    return (
      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${config.color}`}>
        {config.icon}
        {config.text}
      </span>
    );
  };

  // Enhanced Format Badge Component
  const FormatBadge = ({ format }) => {
    const formatConfig = {
      PDF: { color: 'bg-red-100 text-red-800 border-red-200', icon: 'fas fa-file-pdf' },
      Excel: { color: 'bg-green-100 text-green-800 border-green-200', icon: 'fas fa-file-excel' },
      CSV: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: 'fas fa-file-csv' }
    };

    const config = formatConfig[format] || {
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      icon: 'fas fa-file'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${config.color}`}>
        <i className={`${config.icon} mr-1.5`}></i>
        {format}
      </span>
    );
  };

  // Enhanced Metric Card Component for Super Admin
  const MetricCard = ({ title, value, change, icon, color, subtitle }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className={`p-2 md:p-3 rounded-lg ${color} bg-opacity-10`}>
          <i className={`${icon} ${color.replace('bg-', 'text-')} text-lg md:text-xl`}></i>
        </div>
        <span className={`text-xs font-semibold px-2 md:px-3 py-1 rounded-full ${change >= 0 ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </span>
      </div>
      <div className="space-y-1">
        <div className="text-xl md:text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm font-medium text-gray-700">{title}</div>
        {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
      </div>
    </div>
  );

  // Plan Type Badge Component
  const PlanTypeBadge = ({ planType }) => {
    const planColors = {
      all: 'bg-gray-100 text-gray-800 border-gray-200',
      basic: 'bg-blue-100 text-blue-800 border-blue-200',
      professional: 'bg-green-100 text-green-800 border-green-200',
      enterprise: 'bg-purple-100 text-purple-800 border-purple-200',
      custom: 'bg-amber-100 text-amber-800 border-amber-200'
    };

    return (
      <span className={`inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-medium border ${planColors[planType] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
        {planType.charAt(0).toUpperCase() + planType.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Reports & Analytics </h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">Monitor platform performance, subscription metrics, and financial analytics</p>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3 w-full md:w-auto">
            <button
              onClick={openCustomReportModal}
              className="flex-1 md:flex-none px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium text-gray-700 text-sm md:text-base"
            >
              <i className="fas fa-sliders-h mr-2"></i>Custom
            </button>
            <button
              onClick={openGenerateReportModal}
              className="flex-1 md:flex-none px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-sm hover:shadow text-sm md:text-base"
            >
              <i className="fas fa-plus mr-2"></i>Generate
            </button>
          </div>
        </div>
      </div>

      {/* Date Range Filter - MOBILE OPTIMIZED */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="w-full md:w-auto">
            <h3 className="font-semibold text-gray-900 text-lg">Date Range Filter</h3>
            <p className="text-sm text-gray-500 mt-1">Select date range for platform analytics</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-auto">
              <DatePicker
                selected={dateRange.startDate}
                onChange={handleDateChange}
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                selectsRange
                className="border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full text-sm md:text-base"
                placeholderText="Select date range"
              />
            </div>
            <button
              onClick={() => setDateRange({
                startDate: new Date(new Date().setMonth(new Date().getMonth() - 3)),
                endDate: new Date()
              })}
              className="px-4 py-2.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-xl transition-colors font-medium text-sm md:text-base whitespace-nowrap"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions - MOBILE OPTIMIZED */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="bg-gradient-to-br from-white to-gray-50 p-4 md:p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 text-left group"
          >
            <div className={`inline-flex p-2 md:p-3 rounded-xl bg-gradient-to-br ${action.color} mb-3 md:mb-4`}>
              <i className={`fas ${action.icon} text-white text-lg md:text-xl`}></i>
            </div>
            <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-1 md:mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">{action.title}</h3>
            <p className="text-xs md:text-sm text-gray-600 line-clamp-2">{action.description}</p>
          </button>
        ))}
      </div>

      {/* Super Admin Dashboard Stats - MOBILE OPTIMIZED */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <MetricCard
          title="Active Subscriptions"
          value={platformMetrics.subscription.activeSubscriptions.toLocaleString()}
          change={platformMetrics.subscription.revenueGrowth}
          icon='fas fa-hospital'
          color="bg-green-500"
          subtitle="Total hospitals"
        />
        <MetricCard
          title="Monthly Revenue"
          value={`$${(platformMetrics.financial.monthlyRecurringRevenue / 1000).toFixed(0)}K`}
          change={12.4}
          icon="fas fa-money-bill-wave"
          color="bg-green-500"
          subtitle="Current MRR"
        />
        <MetricCard
          title="Platform Uptime"
          value={`${platformMetrics.performance.platformUptime}%`}
          change={0.2}
          icon="fas fa-tachometer-alt"
          color="bg-purple-500"
          subtitle="Last 30 days"
        />
        <MetricCard
          title="Customer Satisfaction"
          value={`${platformMetrics.performance.customerSatisfaction}/5`}
          change={2.1}
          icon="fas fa-star"
          color="bg-yellow-500"
          subtitle="Avg rating"
        />
      </div>

      {/* Charts Section - MOBILE OPTIMIZED */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Revenue Trends Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3">
            <h3 className="font-semibold text-lg text-gray-900">Platform Revenue Trends</h3>
            <div className="flex gap-1 md:gap-2">
              <button className="px-2 md:px-3 py-1.5 text-xs md:text-sm bg-blue-50 text-blue-700 rounded-lg font-medium whitespace-nowrap">Monthly</button>
              <button className="px-2 md:px-3 py-1.5 text-xs md:text-sm text-gray-600 hover:bg-gray-50 rounded-lg whitespace-nowrap">Quarterly</button>
              <button className="px-2 md:px-3 py-1.5 text-xs md:text-sm text-gray-600 hover:bg-gray-50 rounded-lg whitespace-nowrap">Yearly</button>
            </div>
          </div>
          <div className="h-48 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.revenueTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  fontSize={12}
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis
                  fontSize={12}
                  tick={{ fill: '#6b7280' }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="mrr" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} name="MRR" />
                <Area type="monotone" dataKey="newRevenue" stroke="#10B981" fill="#10B981" fillOpacity={0.2} name="New Revenue" />
                <Area type="monotone" dataKey="churnRevenue" stroke="#EF4444" fill="#EF4444" fillOpacity={0.2} name="Churn Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subscription Growth Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4 md:mb-6">Subscription Growth</h3>
          <div className="h-48 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.subscriptionGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  fontSize={12}
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis
                  fontSize={12}
                  tick={{ fill: '#6b7280' }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="newHospitals" fill="#10B981" radius={[4, 4, 0, 0]} name="New Hospitals" />
                <Bar dataKey="churnedHospitals" fill="#EF4444" radius={[4, 4, 0, 0]} name="Churned Hospitals" />
                <Bar dataKey="netGrowth" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Net Growth" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Plan Distribution Section - MOBILE OPTIMIZED */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4 md:mb-6">Subscription Plan Distribution</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="h-60 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.planDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="hospitals"
                >
                  {analyticsData.planDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [
                    value,
                    props.payload.plan
                  ]}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    fontSize: '12px'
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  wrapperStyle={{ fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 md:space-y-4">
            {analyticsData.planDistribution.map((plan, index) => (
              <div key={index} className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center min-w-0">
                  <div className="w-3 h-3 md:w-4 md:h-4 rounded-full mr-2 md:mr-3 flex-shrink-0" style={{ backgroundColor: plan.color }}></div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm md:text-base truncate">{plan.plan} Plan</h4>
                    <p className="text-xs md:text-sm text-gray-500">{plan.hospitals} hospitals</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <div className="text-base md:text-lg font-bold text-gray-900 whitespace-nowrap">${(plan.revenue / 1000).toFixed(0)}K</div>
                  <div className="text-xs md:text-sm text-green-600 whitespace-nowrap">↑ {plan.growth}% growth</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report List Table (Add your table component here) */}
      {/* ... table component code ... */}

      {/* Generate Report Modal - MOBILE OPTIMIZED */}
      <Modal
        isOpen={isGenerateReportModalOpen}
        onClose={closeGenerateReportModal}
        title="Generate Super Admin Report"
        size="lg"
      >
        <form onSubmit={handleGenerateReport} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Title *
              </label>
              <input
                type="text"
                name="title"
                value={newReport.title}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                placeholder="e.g., Monthly Subscription Analytics Report"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type *
              </label>
              <select
                name="type"
                value={newReport.type}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                required
              >
                <option value="subscription">Subscription Analytics</option>
                <option value="financial">Financial Performance</option>
                <option value="performance">Platform Performance</option>
                <option value="usage">Usage Analytics</option>
                <option value="custom">Custom Analysis</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plan Type Filter
              </label>
              <select
                name="planType"
                value={newReport.planType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
              >
                <option value="all">All Plans</option>
                <option value="basic">Basic Plan Only</option>
                <option value="professional">Professional Plan Only</option>
                <option value="enterprise">Enterprise Plan Only</option>
                <option value="custom">Custom Plan Only</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Output Format *
              </label>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {['PDF', 'Excel', 'CSV'].map((format) => (
                  <label key={format} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value={format}
                      checked={newReport.format === format}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`px-3 md:px-4 py-2 border rounded-xl cursor-pointer transition-all duration-200 text-sm md:text-base ${newReport.format === format
                        ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-sm'
                        : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'
                      }`}>
                      {format}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeframe
              </label>
              <select
                name="timeframe"
                value={newReport.timeframe}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
              >
                <option value="last_7_days">Last 7 Days</option>
                <option value="last_30_days">Last 30 Days</option>
                <option value="this_month">This Month</option>
                <option value="last_month">Last Month</option>
                <option value="this_quarter">This Quarter</option>
                <option value="last_quarter">Last Quarter</option>
              </select>
            </div>
          </div>

          {/* Report Options */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 text-base md:text-lg">Report Options</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <label className="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="includeCharts"
                  checked={newReport.includeCharts}
                  onChange={handleInputChange}
                  className="h-4 w-4 md:h-5 md:w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700 font-medium text-sm md:text-base">Include Charts & Graphs</span>
              </label>
              <label className="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="includeData"
                  checked={newReport.includeData}
                  onChange={handleInputChange}
                  className="h-4 w-4 md:h-5 md:w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700 font-medium text-sm md:text-base">Include Raw Data</span>
              </label>
              <label className="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="emailNotification"
                  checked={newReport.emailNotification}
                  onChange={handleInputChange}
                  className="h-4 w-4 md:h-5 md:w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700 font-medium text-sm md:text-base">Email Notification</span>
              </label>
              <label className="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="schedule"
                  checked={newReport.schedule}
                  onChange={handleInputChange}
                  className="h-4 w-4 md:h-5 md:w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700 font-medium text-sm md:text-base">Schedule Report</span>
              </label>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={closeGenerateReportModal}
              className="px-4 md:px-6 py-2.5 md:py-3 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium text-sm md:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-sm hover:shadow text-sm md:text-base"
            >
              <i className="fas fa-play mr-2"></i>
              Generate Report
            </button>
          </div>
        </form>
      </Modal>

      {/* Custom Report Modal - MOBILE OPTIMIZED */}
      <Modal
        isOpen={isCustomReportModalOpen}
        onClose={closeCustomReportModal}
        title="Create Custom Super Admin Report"
        size="2xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Left Column - Super Admin Metrics Selection */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 text-base md:text-lg">Select Super Admin Metrics</h4>
              <div className="space-y-2 md:space-y-3">
                {[
                  'Subscription Analytics (Growth, Churn, Retention)',
                  'Financial Metrics (MRR, ARR, Revenue Growth)',
                  'Platform Performance (Uptime, API Response, Load)',
                  'User Activity (Logins, Feature Usage, Adoption)',
                  'Support Metrics (Tickets, Resolution Time, Satisfaction)'
                ].map((metric) => (
                  <label key={metric} className="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 md:h-5 md:w-5 text-blue-600 rounded focus:ring-blue-500" />
                    <span className="ml-3 text-gray-700 text-sm md:text-base">{metric}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Right Column - Visualization Options */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 text-base md:text-lg">Visualization Type</h4>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[
                  { icon: <i className="fas fa-chart-line text-xl md:text-2xl"></i>, label: 'Trend Analysis', value: 'line', color: 'bg-blue-100 border-blue-200 text-blue-600' },
                  { icon: <i className="fas fa-chart-bar text-xl md:text-2xl"></i>, label: 'Comparison', value: 'bar', color: 'bg-green-100 border-green-200 text-green-600' },
                  { icon: <i className="fas fa-chart-pie text-xl md:text-2xl"></i>, label: 'Distribution', value: 'pie', color: 'bg-purple-100 border-purple-200 text-purple-600' },
                  { icon: <i className="fas fa-chart-area text-xl md:text-2xl"></i>, label: 'Performance', value: 'area', color: 'bg-amber-100 border-amber-200 text-amber-600' }
                ].map((chart) => (
                  <label key={chart.value} className={`flex flex-col items-center p-3 md:p-4 border rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 ${chart.color}`}>
                    <input type="radio" name="chartType" value={chart.value} className="sr-only" />
                    <div className="mb-2 md:mb-3">{chart.icon}</div>
                    <span className="text-xs md:text-sm font-medium text-gray-900 text-center">{chart.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="border-t pt-4 md:pt-6">
            <h4 className="font-medium text-gray-900 text-base md:text-lg mb-3 md:mb-4">Advanced Options</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  Date Granularity
                </label>
                <select className="w-full p-2 md:p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                  <option>Yearly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  Compare With
                </label>
                <select className="w-full p-2 md:p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base">
                  <option>Previous Period</option>
                  <option>Same Period Last Year</option>
                  <option>Target Goals</option>
                  <option>Industry Benchmarks</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  Export Format
                </label>
                <select className="w-full p-2 md:p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base">
                  <option>PDF with Executive Summary</option>
                  <option>Excel with Detailed Data</option>
                  <option>CSV for Data Analysis</option>
                  <option>Interactive Dashboard</option>
                </select>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="border-t pt-4 md:pt-6">
            <h4 className="font-medium text-gray-900 text-base md:text-lg mb-3 md:mb-4">Report Preview</h4>
            <div className="bg-gradient-to-br from-blue-50 to-gray-50 border border-blue-200 rounded-xl p-4 md:p-6 h-40 md:h-48 flex items-center justify-center">
              <div className="text-center">
                <i className="fas fa-crown text-3xl md:text-4xl text-blue-300 mb-2 md:mb-3"></i>
                <p className="text-xs md:text-sm text-gray-600 font-medium">Super Admin Custom Report Preview</p>
                <p className="text-xs text-gray-400 mt-1">Select metrics to see custom analytics preview</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 md:pt-6 border-t">
            <button
              onClick={closeCustomReportModal}
              className="px-4 md:px-6 py-2.5 md:py-3 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium text-sm md:text-base"
            >
              Cancel
            </button>
            <button
              className="px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-medium shadow-sm hover:shadow text-sm md:text-base"
            >
              <i className="fas fa-crown mr-2"></i>
              Create Report
            </button>
          </div>
        </div>
      </Modal>

      {/* View Report Modal - MOBILE OPTIMIZED */}
      <Modal
        isOpen={isViewReportModalOpen}
        onClose={closeViewReportModal}
        title={selectedReport?.title || 'Super Admin Report Details'}
        size="xl"
      >
        {selectedReport && (
          <div className="space-y-4 md:space-y-6">
            {/* Report Header */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 md:p-6 border border-blue-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="col-span-2 md:col-span-1">
                  <div className="text-xs md:text-sm font-medium text-blue-600 mb-1">Report ID</div>
                  <div className="font-mono font-bold text-gray-900 text-sm md:text-lg truncate">{selectedReport.id}</div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <div className="text-xs md:text-sm font-medium text-blue-600 mb-1">Report Type</div>
                  <div className="font-semibold text-gray-900 capitalize text-sm md:text-base">{selectedReport.type}</div>
                </div>
                <div className="col-span-1">
                  <div className="text-xs md:text-sm font-medium text-blue-600 mb-1">Plan Type</div>
                  <div className="flex items-center">
                    <PlanTypeBadge planType={selectedReport.planType} />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="text-xs md:text-sm font-medium text-blue-600 mb-1">Status</div>
                  <div className="flex items-center">
                    <StatusBadge status={selectedReport.status} />
                  </div>
                </div>
              </div>
            </div>

            {/* Report Content */}
            <div className="space-y-4 md:space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h4 className="font-semibold text-gray-900 text-base md:text-lg">Super Admin Report Preview</h4>
                <div className="text-xs md:text-sm text-gray-500">
                  Generated: {selectedReport.generatedDate}
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-4 md:p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 gap-3">
                  <div className="flex-1">
                    <h5 className="text-lg md:text-xl font-bold text-gray-900">{selectedReport.title}</h5>
                    <p className="text-gray-600 mt-1 text-sm md:text-base">{selectedReport.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs md:text-sm text-gray-500">Timeframe:</div>
                    <div className="font-semibold text-sm md:text-base">Last 30 days</div>
                  </div>
                </div>

                {/* Report Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
                  <div className="bg-blue-50 p-3 md:p-4 rounded-xl border border-blue-200">
                    <div className="text-xs md:text-sm font-medium text-blue-600 mb-1 md:mb-2">Report Size</div>
                    <div className="text-xl md:text-2xl font-bold text-gray-900">{selectedReport.size}</div>
                  </div>
                  <div className="bg-green-50 p-3 md:p-4 rounded-xl border border-green-200">
                    <div className="text-xs md:text-sm font-medium text-green-600 mb-1 md:mb-2">Records</div>
                    <div className="text-xl md:text-2xl font-bold text-gray-900">{selectedReport.records.toLocaleString()}</div>
                  </div>
                  <div className="bg-purple-50 p-3 md:p-4 rounded-xl border border-purple-200">
                    <div className="text-xs md:text-sm font-medium text-purple-600 mb-1 md:mb-2">Downloads</div>
                    <div className="text-xl md:text-2xl font-bold text-gray-900">{selectedReport.downloadCount}</div>
                  </div>
                </div>

                {/* Charts Preview */}
                {selectedReport.chartsIncluded && selectedReport.chartsIncluded.length > 0 && (
                  <div className="mb-6 md:mb-8">
                    <h6 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Included Charts:</h6>
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {selectedReport.chartsIncluded.map((chart, idx) => (
                        <span key={idx} className="px-2 md:px-3 py-1 bg-blue-50 text-blue-700 text-xs md:text-sm font-medium rounded-lg border border-blue-200">
                          {chart}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sample Super Admin Data Table */}
                <div className="mb-6 md:mb-8">
                  <h6 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Sample Platform Metrics</h6>
                  <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full text-xs md:text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 md:px-4 md:py-3 text-left font-medium text-gray-700 whitespace-nowrap">Metric</th>
                          <th className="px-3 py-2 md:px-4 md:py-3 text-left font-medium text-gray-700 whitespace-nowrap">Current</th>
                          <th className="px-3 py-2 md:px-4 md:py-3 text-left font-medium text-gray-700 whitespace-nowrap">Previous</th>
                          <th className="px-3 py-2 md:px-4 md:py-3 text-left font-medium text-gray-700 whitespace-nowrap">Change</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-3 py-2 md:px-4 md:py-3 font-medium text-gray-900 whitespace-nowrap">Active Subscriptions</td>
                          <td className="px-3 py-2 md:px-4 md:py-3">150</td>
                          <td className="px-3 py-2 md:px-4 md:py-3">142</td>
                          <td className="px-3 py-2 md:px-4 md:py-3">
                            <span className="text-green-600 font-medium">+5.6%</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 md:px-4 md:py-3 font-medium text-gray-900 whitespace-nowrap">Monthly Recurring Revenue</td>
                          <td className="px-3 py-2 md:px-4 md:py-3">$204,167</td>
                          <td className="px-3 py-2 md:px-4 md:py-3">$185,000</td>
                          <td className="px-3 py-2 md:px-4 md:py-3">
                            <span className="text-green-600 font-medium">+10.4%</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 md:px-4 md:py-3 font-medium text-gray-900 whitespace-nowrap">Platform Uptime</td>
                          <td className="px-3 py-2 md:px-4 md:py-3">99.9%</td>
                          <td className="px-3 py-2 md:px-4 md:py-3">99.7%</td>
                          <td className="px-3 py-2 md:px-4 md:py-3">
                            <span className="text-green-600 font-medium">+0.2%</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Status Message */}
                {selectedReport.status === 'processing' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-6">
                    <div className="flex items-center">
                      <i className="fas fa-spinner fa-spin text-blue-500 text-lg md:text-xl mr-3 md:mr-4"></i>
                      <div>
                        <p className="font-semibold text-blue-700 text-sm md:text-base">Super Admin Report is being generated</p>
                        <p className="text-blue-600 text-xs md:text-sm mt-1">Collecting platform data and generating insights...</p>
                      </div>
                    </div>
                    <div className="mt-3 md:mt-4">
                      <div className="h-1.5 md:h-2 bg-blue-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full animate-pulse"
                          style={{ width: '75%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedReport.status === 'completed' && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 md:p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                      <div className="flex items-center">
                        <i className="fas fa-check-circle text-green-500 text-lg md:text-xl mr-3 md:mr-4"></i>
                        <div>
                          <p className="font-semibold text-green-700 text-sm md:text-base">Super Admin Report generated successfully</p>
                          <p className="text-green-600 text-xs md:text-sm mt-1">Ready for strategic analysis and decision making</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          downloadReport(selectedReport);
                          closeViewReportModal();
                        }}
                        className="px-4 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-medium shadow-sm hover:shadow text-sm md:text-base mt-3 md:mt-0"
                      >
                        <i className="fas fa-download mr-2"></i>
                        Download
                      </button>
                    </div>
                  </div>
                )}

                {selectedReport.status === 'failed' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 md:p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                      <div className="flex items-center">
                        <i className="fas fa-exclamation-circle text-red-500 text-lg md:text-xl mr-3 md:mr-4"></i>
                        <div>
                          <p className="font-semibold text-red-700 text-sm md:text-base">Report generation failed</p>
                          <p className="text-red-600 text-xs md:text-sm mt-1">Please try again or contact platform support</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setReports(prev => prev.map(r =>
                            r.id === selectedReport.id
                              ? { ...r, status: 'processing' }
                              : r
                          ));
                          setTimeout(() => {
                            setReports(prev => prev.map(r =>
                              r.id === selectedReport.id
                                ? { ...r, status: 'completed', size: '2.8 MB', records: 1850 }
                                : r
                            ));
                          }, 2000);
                        }}
                        className="px-4 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium shadow-sm hover:shadow text-sm md:text-base mt-3 md:mt-0"
                      >
                        <i className="fas fa-redo mr-2"></i>
                        Retry
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 md:pt-6 border-t">
              <button
                onClick={closeViewReportModal}
                className="px-4 md:px-6 py-2.5 md:py-3 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium text-sm md:text-base"
              >
                Close
              </button>
              <button
                onClick={() => {
                  downloadReport(selectedReport);
                  closeViewReportModal();
                }}
                className="px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                disabled={selectedReport.status !== 'completed'}
              >
                <i className="fas fa-download mr-2"></i>
                Download Report
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ReportsAnalytics;