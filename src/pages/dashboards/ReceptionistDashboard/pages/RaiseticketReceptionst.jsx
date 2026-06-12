// SupportManagement.jsx - Staff Ticket Management (Only Priority Cards)
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../../../../components/common/Modal/Modal';
import { apiFetch } from '../../../../services/apiClient';

const SupportManagement = () => {
  // Get auth state from Redux
  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.auth?.user);
  
  // State Management
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form Data States for Create Ticket
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'NORMAL'
  });
  
  // Error States
  const [formErrors, setFormErrors] = useState({});
  
  // Filter and Pagination States
  const [filters, setFilters] = useState({
    status: '',
    skip: 0,
    limit: 50
  });
  
  const [pagination, setPagination] = useState({
    total: 0,
    skip: 0,
    limit: 50
  });

  // Stats for priority cards only
  const [stats, setStats] = useState({
    critical: 0,
    urgent: 0,
    high: 0,
    normal: 0,
    low: 0
  });

  // Helper function to format ticket ID (first 8 chars of UUID)
  const formatTicketId = (ticketId) => {
    if (!ticketId) return 'N/A';
    return ticketId.substring(0, 8);
  };

  // Update priority stats only
  const updateStats = (ticketsList) => {
    const critical = ticketsList.filter(t => t.priority === 'CRITICAL').length;
    const urgent = ticketsList.filter(t => t.priority === 'URGENT').length;
    const high = ticketsList.filter(t => t.priority === 'HIGH').length;
    const normal = ticketsList.filter(t => t.priority === 'NORMAL').length;
    const low = ticketsList.filter(t => t.priority === 'LOW').length;
    
    setStats({
      critical,
      urgent,
      high,
      normal,
      low
    });
  };

  // Fetch tickets
  useEffect(() => {
    if (!connectionError && token) {
      fetchTickets();
    }
  }, [filters.skip, filters.limit, filters.status, token]);

  const fetchTickets = async () => {
    setLoading(true);
    setConnectionError(false);
    
    try {
      if (!token) {
        toast.warning('Please login to view tickets');
        setLoading(false);
        return;
      }
      
      const queryParams = new URLSearchParams({
        skip: filters.skip,
        limit: filters.limit,
        completed_only: false
      });
      
      if (filters.status) {
        queryParams.append('status', filters.status);
      }
      
      const endpoint = `/api/v1/support/staff/tickets?${queryParams.toString()}`;
      console.log('Fetching tickets from:', endpoint);
      
      const response = await apiFetch(endpoint, { method: "GET" });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error('Authentication failed. Please login again.');
          setLoading(false);
          return;
        }
        if (response.status === 403) {
          toast.error('You do not have permission to view tickets');
          setTickets([]);
          updateStats([]);
          setLoading(false);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Tickets API Response:', data);
      
      let ticketsData = data?.tickets || [];
      
      // Sort by priority
      const priorityOrder = { 'CRITICAL': 1, 'URGENT': 2, 'HIGH': 3, 'NORMAL': 4, 'LOW': 5 };
      ticketsData = [...ticketsData].sort((a, b) => {
        const orderA = priorityOrder[a.priority] || 99;
        const orderB = priorityOrder[b.priority] || 99;
        if (orderA !== orderB) return orderA - orderB;
        return new Date(b.created_at) - new Date(a.created_at);
      });
      
      setTickets(ticketsData);
      updateStats(ticketsData);
      
      setPagination({
        total: data?.total || ticketsData.length,
        skip: data?.skip || filters.skip,
        limit: data?.limit || filters.limit
      });
      setConnectionError(false);

    } catch (error) {
      console.error("Fetch error:", error);
      if (error.message.includes('Failed to fetch')) {
        setConnectionError(true);
        toast.error('Cannot connect to server');
      } else {
        toast.error(error.message || 'Failed to fetch tickets');
      }
      setTickets([]);
      updateStats([]);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      errors.subject = "Subject must be at least 3 characters";
    } else if (formData.subject.trim().length > 200) {
      errors.subject = "Subject must not exceed 200 characters";
    }
    
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    } else if (formData.description.trim().length < 5) {
      errors.description = "Description must be at least 5 characters";
    } else if (formData.description.trim().length > 1000) {
      errors.description = "Description must not exceed 1000 characters";
    }
    
    if (!formData.priority) {
      errors.priority = "Priority is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    
    try {
      if (!token) {
        toast.error('Please login to create a ticket');
        setSubmitting(false);
        return;
      }
      
      const payload = {
        subject: formData.subject.trim(),
        description: formData.description.trim(),
        priority: formData.priority
      };
      
      console.log('Creating ticket with payload:', payload);
      
      const response = await apiFetch('/api/v1/support/staff/tickets', {
        method: "POST",
        body: payload,
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        if (response.status === 422 && responseData.detail) {
          const validationErrors = responseData.detail;
          const fieldErrors = {};
          validationErrors.forEach(err => {
            if (err.loc && err.loc.length > 1) {
              const fieldName = err.loc[err.loc.length - 1];
              fieldErrors[fieldName] = err.msg;
            }
          });
          if (Object.keys(fieldErrors).length > 0) {
            setFormErrors(fieldErrors);
            throw new Error('Please fix the validation errors');
          }
        }
        throw new Error(responseData.message || responseData.detail || `Failed to create ticket: ${response.statusText}`);
      }
      
      toast.success(` ${responseData.message || 'Ticket created successfully!'}`);
      
      setFormData({
        subject: '',
        description: '',
        priority: 'NORMAL'
      });
      setFormErrors({});
      setShowCreateModal(false);
      
      await fetchTickets();
      
    } catch (error) {
      console.error("Create ticket error:", error);
      toast.error(error.message || "Failed to create ticket. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      skip: 0
    }));
  };

  const handleNextPage = () => {
    if (filters.skip + filters.limit < pagination.total) {
      setFilters(prev => ({
        ...prev,
        skip: prev.skip + prev.limit
      }));
    }
  };

  const handlePrevPage = () => {
    if (filters.skip > 0) {
      setFilters(prev => ({
        ...prev,
        skip: Math.max(0, prev.skip - prev.limit)
      }));
    }
  };

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      'OPEN': 'bg-yellow-100 text-yellow-800',
      'IN_PROGRESS': 'bg-blue-100 text-blue-800',
      'RESOLVED': 'bg-green-100 text-green-800',
      'CLOSED': 'bg-gray-100 text-gray-800'
    };
    return statusMap[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityBadgeClass = (priority) => {
    const priorityMap = {
      'CRITICAL': 'bg-red-700 text-white',
      'URGENT': 'bg-red-100 text-red-800',
      'HIGH': 'bg-orange-100 text-orange-800',
      'NORMAL': 'bg-blue-100 text-blue-800',
      'LOW': 'bg-gray-100 text-gray-800'
    };
    return priorityMap[priority] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFilteredTickets = () => {
    if (!searchTerm) return tickets;
    
    const searchLower = searchTerm.toLowerCase();
    return tickets.filter(ticket => {
      return (
        ticket.id?.toLowerCase().includes(searchLower) ||
        ticket.subject?.toLowerCase().includes(searchLower) ||
        ticket.status?.toLowerCase().includes(searchLower) ||
        ticket.priority?.toLowerCase().includes(searchLower) ||
        ticket.description?.toLowerCase().includes(searchLower)
      );
    });
  };

  const filteredTickets = getFilteredTickets();

  if (connectionError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <ToastContainer position="top-right" autoClose={5000} />
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-red-800">Cannot Connect to Server</h3>
          <p className="mt-1 text-sm text-red-600">
            Please ensure the backend server is running
          </p>
          <button
            onClick={() => fetchTickets()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <ToastContainer position="top-right" autoClose={5000} />
      
      {/* Sleek Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Support Center
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Create, track, and manage your support tickets efficiently.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-500 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:scale-95"
        >
          <svg className="h-5 w-5 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Raise New Ticket
        </button>
      </div>

      {/* Glassmorphic Priority Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'CRITICAL', count: stats.critical, desc: 'Immediate attention', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', classes: { border: 'border-red-100/50', blurBg: 'bg-red-100/50 group-hover:bg-red-200/50', iconBg: 'bg-red-100', iconText: 'text-red-600', text: 'text-red-600' } },
          { label: 'URGENT', count: stats.urgent, desc: 'Address soon', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', classes: { border: 'border-orange-100/50', blurBg: 'bg-orange-100/50 group-hover:bg-orange-200/50', iconBg: 'bg-orange-100', iconText: 'text-orange-600', text: 'text-orange-600' } },
          { label: 'HIGH', count: stats.high, desc: 'Needs quick action', icon: 'M13 10V3L4 14h7v7l9-11h-7z', classes: { border: 'border-yellow-100/50', blurBg: 'bg-yellow-100/50 group-hover:bg-yellow-200/50', iconBg: 'bg-yellow-100', iconText: 'text-yellow-600', text: 'text-yellow-600' } },
          { label: 'NORMAL', count: stats.normal, desc: 'Standard priority', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', classes: { border: 'border-blue-100/50', blurBg: 'bg-blue-100/50 group-hover:bg-blue-200/50', iconBg: 'bg-blue-100', iconText: 'text-blue-600', text: 'text-blue-600' } },
          { label: 'LOW', count: stats.low, desc: 'Can wait', icon: 'M5 13l4 4L19 7', classes: { border: 'border-slate-100/50', blurBg: 'bg-slate-100/50 group-hover:bg-slate-200/50', iconBg: 'bg-slate-100', iconText: 'text-slate-600', text: 'text-slate-600' } },
        ].map((stat, idx) => (
          <div key={idx} className={`relative overflow-hidden rounded-2xl bg-white/60 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md border ${stat.classes.border} hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group`}>
            <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full ${stat.classes.blurBg} blur-2xl transition-colors duration-500`}></div>
            <div className="relative z-10">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${stat.classes.iconBg} ${stat.classes.iconText} mb-3 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
              </div>
              <p className={`text-xs font-bold uppercase tracking-wider ${stat.classes.text}`}>{stat.label}</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900">{stat.count}</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Search & Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between rounded-2xl bg-white p-4 shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-slate-100">
        <div className="relative w-full sm:max-w-md group">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full rounded-xl border-0 bg-slate-50/50 py-3 pl-11 pr-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-auto">
          <select
            className="block w-full sm:w-48 rounded-xl border-0 bg-slate-50/50 py-3 pl-4 pr-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 cursor-pointer transition-all appearance-none"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
          >
            <option value="">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {/* Premium Data Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-slate-100">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
            <p className="mt-4 text-sm font-medium text-slate-500">Loading your tickets...</p>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-500 mb-6">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">No tickets found</h3>
            <p className="mt-2 text-sm text-slate-500 max-w-sm">You haven't raised any tickets yet, or none match your search criteria.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th scope="col" className="py-4 pl-6 pr-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Ticket ID</th>
                    <th scope="col" className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Subject</th>
                    <th scope="col" className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                    <th scope="col" className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Priority</th>
                    <th scope="col" className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Last Updated</th>
                    <th scope="col" className="py-4 pl-3 pr-6 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="group hover:bg-slate-50/80 transition-colors duration-200">
                      <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-slate-900">
                        #{formatTicketId(ticket.id)}
                      </td>
                      <td className="py-4 px-3 text-sm text-slate-600">
                        <div className="max-w-[200px] truncate font-medium text-slate-700" title={ticket.subject}>
                          {ticket.subject}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${getStatusBadgeClass(ticket.status)}`}>
                          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current opacity-70"></span>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${getPriorityBadgeClass(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                        {formatDate(ticket.updated_at || ticket.created_at)}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setShowViewModal(true);
                          }}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm ring-1 ring-inset ring-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600"
                          title="View Details"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-slate-100 bg-white px-6 py-4">
              <p className="text-sm text-slate-500">
                Showing <span className="font-semibold text-slate-900">{pagination.skip + 1}</span> to <span className="font-semibold text-slate-900">{Math.min(pagination.skip + pagination.limit, pagination.total)}</span> of <span className="font-semibold text-slate-900">{pagination.total}</span> tickets
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={pagination.skip === 0}
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={pagination.skip + pagination.limit >= pagination.total}
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modern Create Ticket Modal */}
      <Modal isOpen={showCreateModal} onClose={() => { setShowCreateModal(false); setFormErrors({}); }} title="Raise New Ticket" size="lg">
        <form onSubmit={handleCreateTicket} className="p-1">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => { setFormData({...formData, subject: e.target.value}); setFormErrors({...formErrors, subject: ''}); }}
                className={`block w-full rounded-xl border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ${formErrors.subject ? 'ring-red-300 focus:ring-red-500' : 'ring-slate-200 focus:ring-blue-600'} placeholder:text-slate-400 sm:text-sm sm:leading-6 transition-all`}
                placeholder="What is the issue about?"
              />
              {formErrors.subject && <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>{formErrors.subject}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => { setFormData({...formData, description: e.target.value}); setFormErrors({...formErrors, description: ''}); }}
                rows="4"
                className={`block w-full rounded-xl border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ${formErrors.description ? 'ring-red-300 focus:ring-red-500' : 'ring-slate-200 focus:ring-blue-600'} placeholder:text-slate-400 sm:text-sm sm:leading-6 resize-none transition-all`}
                placeholder="Please provide detailed information to help us resolve the issue faster..."
              />
              {formErrors.description && <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>{formErrors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Priority Level</label>
              <div className="relative">
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="block w-full rounded-xl border-0 py-2.5 pl-3 pr-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 appearance-none bg-white transition-all cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                >
                  <option value="CRITICAL">Critical (System Down / Blocked)</option>
                  <option value="URGENT">Urgent (Major Feature Broken)</option>
                  <option value="HIGH">High (Important Issue)</option>
                  <option value="NORMAL">Normal (Standard Request)</option>
                  <option value="LOW">Low (Minor Issue / Cosmetic)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end gap-x-4 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={() => { setShowCreateModal(false); setFormErrors({}); }}
              className="text-sm font-semibold leading-6 text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-70 disabled:hover:translate-y-0 transition-all"
            >
              {submitting ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : 'Submit Ticket'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modern View Ticket Modal */}
      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Ticket Details" size="lg">
        {selectedTicket && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Ticket ID</p>
                <p className="mt-1 font-mono text-lg font-bold text-slate-900">#{formatTicketId(selectedTicket.id)}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${getStatusBadgeClass(selectedTicket.status)}`}>
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current opacity-70"></span>
                  {selectedTicket.status}
                </span>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${getPriorityBadgeClass(selectedTicket.priority)}`}>
                  {selectedTicket.priority}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-500">Subject</h3>
              <p className="mt-2 text-base font-semibold text-slate-900">{selectedTicket.subject}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-500">Description</h3>
              <div className="mt-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 ring-1 ring-inset ring-slate-100 whitespace-pre-wrap break-words">
                {selectedTicket.description || 'No description provided'}
              </div>
            </div>

            {selectedTicket.resolution_notes && selectedTicket.resolution_notes.trim() && (
              <div>
                <h3 className="text-sm font-medium text-slate-500">Resolution Notes</h3>
                <div className="mt-2 rounded-xl bg-green-50 p-4 text-sm text-green-800 ring-1 ring-inset ring-green-100 whitespace-pre-wrap break-words">
                  {selectedTicket.resolution_notes}
                </div>
              </div>
            )}

            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 rounded-xl bg-slate-50 p-4 ring-1 ring-inset ring-slate-100">
              <div>
                <dt className="text-xs font-medium text-slate-500">Created At</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">{formatDate(selectedTicket.created_at)}</dd>
              </div>
              {selectedTicket.updated_at && selectedTicket.updated_at !== selectedTicket.created_at && (
                <div>
                  <dt className="text-xs font-medium text-slate-500">Last Updated</dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">{formatDate(selectedTicket.updated_at)}</dd>
                </div>
              )}
              {selectedTicket.resolved_at && (
                <div>
                  <dt className="text-xs font-medium text-slate-500">Resolved At</dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">{formatDate(selectedTicket.resolved_at)}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs font-medium text-slate-500">Hospital ID</dt>
                <dd className="mt-1 text-sm font-medium text-slate-900 font-mono">{selectedTicket.hospital_id?.substring(0, 8)}...</dd>
              </div>
            </dl>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowViewModal(false)}
                className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SupportManagement;