// SupportManagement.jsx - Final Working Version
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SupportManagement = () => {
  // State Management
  const [tickets, setTickets] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  
  // Form Data States
  const [formData, setFormData] = useState({
    hospital_id: '',
    subject: '',
    description: '',
    priority: 'NORMAL'
  });
  
  const [statusUpdateData, setStatusUpdateData] = useState({
    status: '',
    resolution_notes: '',
    assigned_to_user_id: ''
  });
  
  // Error States
  const [formErrors, setFormErrors] = useState({});
  const [statusErrors, setStatusErrors] = useState({});
  
  // Filter and Pagination States
  const [filters, setFilters] = useState({
    hospital_id: '',
    status: '',
    skip: 0,
    limit: 50
  });
  
  const [pagination, setPagination] = useState({
    total: 0,
    skip: 0,
    limit: 50
  });

  const getAuthToken = () => {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    return token || '';
  };

  // Fetch hospitals on component mount
  useEffect(() => {
    fetchHospitals();
  }, []);

  // Fetch tickets when filters change
  useEffect(() => {
    if (!connectionError) {
      fetchTickets();
    }
  }, [filters.skip, filters.limit, filters.status, filters.hospital_id]);

  const fetchHospitals = async () => {
    setLoadingHospitals(true);
    try {
      const token = getAuthToken();
      
      if (!token) {
        console.warn('No auth token found');
        toast.warning('Please login to load hospitals');
        setLoadingHospitals(false);
        return;
      }
      
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      const res = await fetch('/api/v1/super-admin/hospitals', {
        method: "GET",
        headers: headers
      });
      
      if (res.ok) {
        const data = await res.json();
        console.log("Successfully fetched hospitals:", data);
        
        // Handle different response structures
        let hospitalsList = [];
        if (Array.isArray(data)) {
          hospitalsList = data;
        } else if (data.data && Array.isArray(data.data)) {
          hospitalsList = data.data;
        } else if (data.hospitals && Array.isArray(data.hospitals)) {
          hospitalsList = data.hospitals;
        } else if (data.items && Array.isArray(data.items)) {
          hospitalsList = data.items;
        }
        
        setHospitals(hospitalsList);
        
        if (hospitalsList.length === 0) {
          toast.info('No hospitals found. Please add hospitals first.');
        } else {
          console.log(`Loaded ${hospitalsList.length} hospitals`);
        }
      } else {
        console.error('Failed to fetch hospitals:', res.status);
        toast.error('Failed to load hospitals. Please check API endpoints.');
      }
      
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      toast.error("Failed to load hospitals list: " + error.message);
    } finally {
      setLoadingHospitals(false);
    }
  };

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      
      const query = new URLSearchParams({
        skip: filters.skip,
        limit: filters.limit,
        status: filters.status || '',
        hospital_id: filters.hospital_id || ''
      });

      const headers = {
        "Content-Type": "application/json",
      };
      
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(
        `/api/v1/super-admin/support/tickets?${query}`,
        {
          method: "GET",
          headers: headers
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Authentication failed. Please login again.');
        }
        if (res.status === 404) {
          throw new Error('API endpoint not found. Please check the URL.');
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Fetched tickets:", data);

      setTickets(data?.tickets || data?.data || []);
      setPagination({
        total: data?.total || 0,
        skip: data?.skip || 0,
        limit: data?.limit || 50
      });
      setConnectionError(false);

    } catch (error) {
      console.error("Fetch error:", error);
      
      if (error.message.includes('Failed to fetch')) {
        setConnectionError(true);
        toast.error('Cannot connect to server. Please ensure backend is running');
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.hospital_id) {
      errors.hospital_id = "Please select a hospital";
    }
    
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      errors.subject = "Subject must be at least 3 characters";
    }
    
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      errors.description = "Description must be at least 10 characters";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      const token = getAuthToken();
      
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      
      // Find the selected hospital name
      const selectedHospital = hospitals.find(h => h.id === formData.hospital_id);
      
      // Based on your backend structure, it likely expects hospital_name
      const payload = {
        hospital_name: selectedHospital?.name || formData.hospital_id,
        subject: formData.subject,
        description: formData.description,
        priority: formData.priority
      };
      
      console.log("Creating ticket with payload:", payload);
      
      const res = await fetch(
        `/api/v1/super-admin/support/tickets`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(payload),
        }
      );
      
      const data = await res.json();
      console.log("Response status:", res.status);
      console.log("Response data:", data);
      
      if (!res.ok) {
        // Extract detailed error message
        let errorMessage = "Failed to create ticket";
        
        if (data.detail) {
          if (typeof data.detail === 'string') {
            errorMessage = data.detail;
          } else if (Array.isArray(data.detail)) {
            errorMessage = data.detail.map(err => err.msg || err.message || JSON.stringify(err)).join(', ');
          } else if (data.detail.message) {
            errorMessage = data.detail.message;
          } else {
            errorMessage = JSON.stringify(data.detail);
          }
        } else if (data.message) {
          errorMessage = data.message;
        }
        
        throw new Error(errorMessage);
      }
      
      toast.success("Ticket created successfully");
      
      // Reset form
      setFormData({
        hospital_id: '',
        subject: '',
        description: '',
        priority: 'NORMAL'
      });
      setFormErrors({});
      setShowCreateModal(false);
      
      // Refresh ticket list
      fetchTickets();
      
    } catch (error) {
      console.error("Create ticket error:", error);
      toast.error(error.message || "Failed to create ticket. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleUpdateStatus = async (ticketId, e) => {
    e.preventDefault();
    
    const errors = {};
    if (!statusUpdateData.status) {
      errors.status = "Status is required";
    }
    
    if (
      statusUpdateData.status === "RESOLVED" &&
      !statusUpdateData.resolution_notes?.trim()
    ) {
      errors.resolution_notes = "Resolution notes are required when status is RESOLVED";
    }
    
    if (Object.keys(errors).length > 0) {
      setStatusErrors(errors);
      return;
    }
    
    setSubmitting(true);
    
    try {
      const token = getAuthToken();
      
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      
      const payload = {
        status: statusUpdateData.status,
        resolution_notes: statusUpdateData.resolution_notes,
        assigned_to_user_id: statusUpdateData.assigned_to_user_id
      };
      
      const res = await fetch(
        `/api/v1/super-admin/support/tickets/${ticketId}/status`,
        {
          method: "PATCH",
          headers: headers,
          body: JSON.stringify(payload),
        }
      );
      
      const data = await res.json();
      
      if (!res.ok) {
        let errorMessage = "Failed to update status";
        if (data.detail) {
          if (typeof data.detail === 'string') {
            errorMessage = data.detail;
          } else if (data.detail.message) {
            errorMessage = data.detail.message;
          }
        } else if (data.message) {
          errorMessage = data.message;
        }
        throw new Error(errorMessage);
      }
      
      toast.success("Status updated successfully");
      
      setShowEditModal(false);
      setSelectedTicket(null);
      setStatusErrors({});
      setStatusUpdateData({
        status: '',
        resolution_notes: '',
        assigned_to_user_id: ''
      });
      
      fetchTickets();
      
    } catch (error) {
      toast.error(error.message || "Update failed");
      console.error(error);
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
      'LOW': 'bg-gray-100 text-gray-800',
      'NORMAL': 'bg-blue-100 text-blue-800',
      'HIGH': 'bg-orange-100 text-orange-800',
      'URGENT': 'bg-red-100 text-red-800'
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

  const getHospitalName = (hospitalId) => {
    const hospital = hospitals.find(h => h.id === hospitalId);
    return hospital ? hospital.name : hospitalId;
  };

  if (connectionError) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <ToastContainer position="top-right" autoClose={5000} />
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-red-800">Cannot Connect to Server</h3>
          <p className="mt-1 text-sm text-red-600">
            Please ensure the backend server is running on port 8060
          </p>
          <button
            onClick={() => {
              fetchTickets();
              fetchHospitals();
            }}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={5000} />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Support Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Ticket
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hospital</label>
            <select
              value={filters.hospital_id}
              onChange={(e) => handleFilterChange('hospital_id', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Hospitals</option>
              {hospitals.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Per Page</label>
            <select
              value={filters.limit}
              onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No support tickets found</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Create your first ticket
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ticket ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hospital
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {ticket.id?.substring(0, 8)}...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getHospitalName(ticket.hospital_id)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {ticket.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(ticket.status)}`}>
                          {ticket.status?.replace('_', ' ') || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadgeClass(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(ticket.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setShowViewModal(true);
                            setShowEditModal(false);
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          View
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setStatusUpdateData({
                              status: ticket.status || '',
                              resolution_notes: ticket.resolution_notes || '',
                              assigned_to_user_id: ticket.assigned_to_user_id || ''
                            });
                            setShowEditModal(true);
                            setShowViewModal(false);
                          }}
                          className="text-green-600 hover:text-green-900"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{pagination.skip + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(pagination.skip + pagination.limit, pagination.total)}
                </span>{' '}
                of <span className="font-medium">{pagination.total}</span> results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevPage}
                  disabled={filters.skip === 0}
                  className={`px-3 py-1 rounded border ${
                    filters.skip === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={filters.skip + filters.limit >= pagination.total}
                  className={`px-3 py-1 rounded border ${
                    filters.skip + filters.limit >= pagination.total
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowCreateModal(false)}></div>
            <div className="relative bg-white rounded-lg w-full max-w-md p-6">
              <h2 className="text-xl font-bold mb-4">Create Support Ticket</h2>
              
              <form onSubmit={handleCreateTicket}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hospital *
                  </label>
                  <select
                    value={formData.hospital_id}
                    onChange={(e) => {
                      setFormData({...formData, hospital_id: e.target.value});
                      setFormErrors({...formErrors, hospital_id: ''});
                    }}
                    className={`w-full border ${formErrors.hospital_id ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Select a hospital</option>
                    {loadingHospitals ? (
                      <option disabled>Loading hospitals...</option>
                    ) : (
                      hospitals.map((hospital) => (
                        <option key={hospital.id} value={hospital.id}>
                          {hospital.name}
                        </option>
                      ))
                    )}
                  </select>
                  {formErrors.hospital_id && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.hospital_id}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({...formData, subject: e.target.value});
                      setFormErrors({...formErrors, subject: ''});
                    }}
                    className={`w-full border ${formErrors.subject ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter ticket subject"
                  />
                  {formErrors.subject && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.subject}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => {
                      setFormData({...formData, description: e.target.value});
                      setFormErrors({...formErrors, description: ''});
                    }}
                    rows="4"
                    className={`w-full border ${formErrors.description ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Describe the issue in detail (min. 10 characters)"
                  />
                  {formErrors.description && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.description}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="LOW">Low</option>
                    <option value="NORMAL">Normal</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setFormErrors({});
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                  >
                    {submitting ? 'Creating...' : 'Create Ticket'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Ticket Modal */}
      {showViewModal && selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Ticket Details</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-gray-500">Ticket ID</label>
                <p className="font-semibold">{selectedTicket.id}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Hospital</label>
                <p className="font-semibold">{getHospitalName(selectedTicket.hospital_id)}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Status</label>
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(selectedTicket.status)}`}>
                  {selectedTicket.status}
                </span>
              </div>
              <div>
                <label className="text-sm text-gray-500">Priority</label>
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadgeClass(selectedTicket.priority)}`}>
                  {selectedTicket.priority}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="text-sm text-gray-500">Subject</label>
              <p className="font-medium">{selectedTicket.subject}</p>
            </div>
            
            <div className="mb-4">
              <label className="text-sm text-gray-500">Description</label>
              <div className="bg-gray-50 p-3 rounded-lg mt-1">
                <p className="whitespace-pre-wrap">{selectedTicket.description}</p>
              </div>
            </div>
            
            {selectedTicket.resolution_notes && (
              <div className="mb-4">
                <label className="text-sm text-gray-500">Resolution Notes</label>
                <div className="bg-green-50 p-3 rounded-lg mt-1">
                  <p className="whitespace-pre-wrap">{selectedTicket.resolution_notes}</p>
                </div>
              </div>
            )}
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Ticket Modal */}
      {showEditModal && selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl w-full max-w-3xl p-6">
            <h2 className="text-2xl font-bold mb-4">Update Ticket Status</h2>
            <form onSubmit={(e) => handleUpdateStatus(selectedTicket.id, e)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                <select
                  value={statusUpdateData.status}
                  onChange={(e) => setStatusUpdateData({...statusUpdateData, status: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Status</option>
                  <option value="OPEN">Open</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                </select>
                {statusErrors.status && (
                  <p className="mt-1 text-xs text-red-500">{statusErrors.status}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To (User ID)</label>
                <input
                  type="text"
                  value={statusUpdateData.assigned_to_user_id}
                  onChange={(e) => setStatusUpdateData({...statusUpdateData, assigned_to_user_id: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter user ID"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Resolution Notes</label>
                <textarea
                  value={statusUpdateData.resolution_notes}
                  onChange={(e) => setStatusUpdateData({...statusUpdateData, resolution_notes: e.target.value})}
                  rows="4"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add resolution notes (required when status is RESOLVED)..."
                />
                {statusErrors.resolution_notes && (
                  <p className="mt-1 text-xs text-red-500">{statusErrors.resolution_notes}</p>
                )}
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setStatusErrors({});
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-300"
                >
                  {submitting ? 'Updating...' : 'Update Status'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportManagement;