// SupportManagement.jsx - Complete Frontend for Hospital Admin Tickets with Completed Tickets Integration
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
  const [completedTickets, setCompletedTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCompleted, setLoadingCompleted] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [showClosedOnly, setShowClosedOnly] = useState(false);
  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'completed'
  
  // Form Data States
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'NORMAL',
    send_email: true,
    additional_emails: ''
  });
  
  const [statusUpdateData, setStatusUpdateData] = useState({
    status: '',
    resolution_notes: '',
    assigned_to_user_id: '',
    send_email: true,
    additional_message: ''
  });
  
  // Error States
  const [formErrors, setFormErrors] = useState({});
  const [statusErrors, setStatusErrors] = useState({});
  
  // Filter and Pagination States
  const [filters, setFilters] = useState({
    status: '',
    skip: 0,
    limit: 50
  });
  
  const [completedFilters, setCompletedFilters] = useState({
    skip: 0,
    limit: 50
  });
  
  const [pagination, setPagination] = useState({
    total: 0,
    skip: 0,
    limit: 50
  });
  
  const [completedPagination, setCompletedPagination] = useState({
    total: 0,
    skip: 0,
    limit: 50
  });

  // Stats for cards
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0,
    urgent: 0,
    high: 0,
    completed: 0
  });

  // Helper function to extract ONLY numeric ID
  const getPureNumericTicketId = (ticketId) => {
    if (!ticketId) return '000000000000';
    const numbersOnly = ticketId.toString().replace(/\D/g, '');
    if (!numbersOnly) return '000000000000';
    const cleanedNumber = numbersOnly.replace(/^0+/, '') || '0';
    return cleanedNumber;
  };

  // Format ticket ID to 12 digits
  const formatEqualNumericId = (ticketId) => {
    const numericId = getPureNumericTicketId(ticketId);
    return numericId.padStart(12, '0').slice(0, 12);
  };

  // Function to get description from ticket
  const getTicketDescription = (ticket) => {
    if (!ticket) return '';
    
    if (ticket.description && ticket.description.trim()) {
      return ticket.description;
    }
    if (ticket.desc && ticket.desc.trim()) {
      return ticket.desc;
    }
    if (ticket.ticket_description && ticket.ticket_description.trim()) {
      return ticket.ticket_description;
    }
    if (ticket.content && ticket.content.trim()) {
      return ticket.content;
    }
    if (ticket.details && ticket.details.trim()) {
      return ticket.details;
    }
    
    return '';
  };

  // Priority order mapping
  const getPriorityOrder = (priority) => {
    const order = {
      'URGENT': 1,
      'HIGH': 2,
      'NORMAL': 3,
      'LOW': 4
    };
    return order[priority] || 5;
  };

  // CORRECTED: Update stats based on tickets
  const updateStats = (ticketsList, completedList = []) => {
    // Calculate stats from active tickets
    const open = ticketsList.filter(t => t.status === 'OPEN').length;
    const inProgress = ticketsList.filter(t => t.status === 'IN_PROGRESS').length;
    const resolved = ticketsList.filter(t => t.status === 'RESOLVED').length;
    const closed = ticketsList.filter(t => t.status === 'CLOSED').length;
    const urgent = ticketsList.filter(t => t.priority === 'URGENT').length;
    const high = ticketsList.filter(t => t.priority === 'HIGH').length;
    
    // Completed tickets are those that are RESOLVED or CLOSED from active tickets PLUS the separate completed tickets
    const activeCompleted = ticketsList.filter(t => t.status === 'RESOLVED' || t.status === 'CLOSED').length;
    const totalCompleted = activeCompleted + completedList.length;
    
    setStats({
      total: ticketsList.length + completedList.length,  // Total active + completed
      open: open,
      inProgress: inProgress,
      resolved: resolved,
      closed: closed,
      urgent: urgent,
      high: high,
      completed: totalCompleted  // Active resolved/closed + separate completed tickets
    });
  };

  // Update stats whenever tickets or completedTickets change
  useEffect(() => {
    updateStats(tickets, completedTickets);
  }, [tickets, completedTickets]);

  // Check if user is SUPER_ADMIN
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  // Fetch tickets
  useEffect(() => {
    if (!connectionError && token) {
      fetchTickets();
      fetchCompletedTickets();
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
      
      // Build query parameters
      const queryParams = new URLSearchParams({
        skip: filters.skip,
        limit: filters.limit
      });
      
      if (filters.status) {
        queryParams.append('status', filters.status);
      }
      
      const endpoint = `/api/v1/support/hospital-admin/tickets?${queryParams.toString()}`;
      console.log('Fetching tickets from:', endpoint);
      
      const response = await apiFetch(endpoint, {
        method: "GET",
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error('Authentication failed. Please login again.');
          setLoading(false);
          return;
        }
        if (response.status === 403) {
          toast.error('You do not have permission to view tickets');
          setTickets([]);
          setLoading(false);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Tickets API Response:', data);
      
      // Handle the response structure: { tickets: [], skip: 0, limit: 50 }
      let ticketsData = data?.tickets || data?.data || [];
      
      // Sort tickets by priority
      ticketsData = [...ticketsData].sort((a, b) => {
        const priorityOrderA = getPriorityOrder(a.priority);
        const priorityOrderB = getPriorityOrder(b.priority);
        if (priorityOrderA !== priorityOrderB) {
          return priorityOrderA - priorityOrderB;
        }
        return new Date(b.created_at) - new Date(a.created_at);
      });
      
      setTickets(ticketsData);
      // Stats will be updated by the useEffect that watches tickets and completedTickets
      
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
    } finally {
      setLoading(false);
    }
  };

  const fetchCompletedTickets = async () => {
    setLoadingCompleted(true);
    
    try {
      if (!token) {
        setLoadingCompleted(false);
        return;
      }
      
      const queryParams = new URLSearchParams({
        skip: completedFilters.skip,
        limit: completedFilters.limit
      });
      
      const endpoint = `/api/v1/support/hospital-admin/tickets/completed?${queryParams.toString()}`;
      console.log('Fetching completed tickets from:', endpoint);
      
      const response = await apiFetch(endpoint, {
        method: "GET",
      });

      if (!response.ok) {
        if (response.status === 404 || response.status === 403) {
          // Endpoint might not exist, just set empty array
          setCompletedTickets([]);
          setCompletedPagination({ total: 0, skip: 0, limit: 50 });
          setLoadingCompleted(false);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Completed Tickets API Response:', data);
      
      // Handle the response structure: { tickets: [], skip: 0, limit: 50 }
      let completedData = data?.tickets || data?.data || [];
      
      setCompletedTickets(completedData);
      // Stats will be updated by the useEffect that watches tickets and completedTickets
      
      setCompletedPagination({
        total: data?.total || completedData.length,
        skip: data?.skip || completedFilters.skip,
        limit: data?.limit || completedFilters.limit
      });

    } catch (error) {
      console.error("Fetch completed tickets error:", error);
      setCompletedTickets([]);
      setCompletedPagination({ total: 0, skip: 0, limit: 50 });
    } finally {
      setLoadingCompleted(false);
    }
  };

  // NEW FUNCTION: Update ticket status using the hospital-admin endpoint
  const updateTicketStatus = async (ticketId, statusData) => {
    try {
      const endpoint = `/api/v1/support/hospital-admin/tickets/${ticketId}/status`;
      console.log('Updating ticket status at:', endpoint);
      console.log('Request payload:', statusData);
      
      const response = await apiFetch(endpoint, {
        method: "PATCH",
        body: statusData,
      });
      
      const responseData = await response.json();
      console.log('Status update response:', responseData);
      
      if (!response.ok) {
        throw new Error(responseData.message || responseData.detail || 'Failed to update status');
      }
      
      return responseData;
      
    } catch (error) {
      console.error('Status update error:', error);
      throw error;
    }
  };

  // Send email via API
  const sendEmailViaAPI = async (toEmail, subject, htmlContent) => {
    try {
      const response = await apiFetch('/api/v1/email/send', {
        method: 'POST',
        body: {
          to: toEmail,
          subject: subject,
          html: htmlContent,
          text: htmlContent.replace(/<[^>]*>/g, '')
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      
      return await response.json();
      
    } catch (error) {
      console.error('Email send error:', error);
      throw error;
    }
  };

  // Create email HTML for ticket creation
  const createTicketEmailHTML = (ticket, hospitalName, createdBy) => {
    const formattedId = formatEqualNumericId(ticket.id || ticket.ticket_id);
    const createdDate = new Date().toLocaleDateString('en-US', {
      dateStyle: 'full',
      timeStyle: 'medium'
    });
    
    const priorityConfig = {
      'URGENT': { color: '#dc2626', bg: '#fee2e2', level: '🔴 CRITICAL - Immediate Action Required', icon: '🚨' },
      'HIGH': { color: '#ea580c', bg: '#ffedd5', level: '🟠 HIGH - Urgent Attention Needed', icon: '⚠️' },
      'NORMAL': { color: '#2563eb', bg: '#dbeafe', level: '🔵 NORMAL - Standard Priority', icon: '📋' },
      'LOW': { color: '#6b7280', bg: '#f3f4f6', level: '⚪ LOW - Can be addressed later', icon: '📝' }
    };
    
    const priorityInfo = priorityConfig[ticket.priority] || priorityConfig['NORMAL'];
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Support Ticket #${formattedId}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f3f4f6; }
          .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .email-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; }
          .email-header h1 { margin: 0; font-size: 28px; }
          .email-content { padding: 30px 25px; background: #f9fafb; }
          .ticket-card { background: white; border-radius: 12px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 4px solid #667eea; }
          .ticket-id { font-size: 20px; font-weight: bold; color: #667eea; font-family: monospace; margin-bottom: 15px; }
          .info-row { margin: 12px 0; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .info-label { font-weight: 600; color: #4b5563; display: inline-block; width: 100px; }
          .info-value { color: #1f2937; display: inline-block; }
          .priority-badge { display: inline-block; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; background-color: ${priorityInfo.bg}; color: ${priorityInfo.color}; }
          .description-box { background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 15px; border: 1px solid #e5e7eb; }
          .email-footer { background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
          .button { display: inline-block; padding: 12px 24px; background-color: #667eea; color: white; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1>${priorityInfo.icon} New Support Ticket Created</h1>
            <p style="margin-top: 8px; font-size: 14px;">⭐ Super Admin Notification</p>
          </div>
          <div class="email-content">
            <p>Dear Super Admin,</p>
            <p>A new support ticket has been created by <strong>${createdBy}</strong> and requires your attention.</p>
            
            <div class="ticket-card">
              <div class="ticket-id">Ticket #${formattedId}</div>
              
              <div class="info-row">
                <span class="info-label">Subject:</span>
                <span class="info-value">${ticket.subject}</span>
              </div>
              
              <div class="info-row">
                <span class="info-label">Priority:</span>
                <span class="info-value">
                  <span class="priority-badge">${ticket.priority}</span>
                </span>
              </div>
              
              <div class="info-row">
                <span class="info-label">Status:</span>
                <span class="info-value">${ticket.status || 'OPEN'}</span>
              </div>
              
              <div class="info-row">
                <span class="info-label">Hospital:</span>
                <span class="info-value">${hospitalName || user?.hospital_name || 'N/A'}</span>
              </div>
              
              <div class="info-row">
                <span class="info-label">Created By:</span>
                <span class="info-value">${createdBy}</span>
              </div>
              
              <div class="info-row">
                <span class="info-label">Created Date:</span>
                <span class="info-value">${createdDate}</span>
              </div>
              
              <div class="description-box">
                <strong>Description:</strong><br>
                ${(ticket.description || 'No description provided').replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <p style="text-align: center;">
              <a href="${window.location.origin}/super-admin/support/tickets/${ticket.id || ticket.ticket_id}" class="button">
                View Ticket Details
              </a>
            </p>
            
            <p>Please log in to the support system to manage this ticket.</p>
          </div>
          <div class="email-footer">
            <p>This is an automated message from the Support Management System.</p>
            <p>© ${new Date().getFullYear()} Hospital Management System</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  // Create status update email HTML
  const createStatusUpdateEmailHTML = (ticket, newStatus, resolutionNotes, updatedBy) => {
    const formattedId = formatEqualNumericId(ticket.id || ticket.ticket_id);
    const updateDate = new Date().toLocaleDateString('en-US', {
      dateStyle: 'full',
      timeStyle: 'medium'
    });
    
    const statusConfig = {
      'OPEN': { color: '#eab308', bg: '#fef9e3', icon: '🟡', message: 'Ticket has been opened and is awaiting review' },
      'IN_PROGRESS': { color: '#3b82f6', bg: '#dbeafe', icon: '🔵', message: 'Ticket is currently being worked on' },
      'RESOLVED': { color: '#22c55e', bg: '#dcfce7', icon: '✅', message: 'Ticket has been resolved' },
      'CLOSED': { color: '#6b7280', bg: '#f3f4f6', icon: '🔒', message: 'Ticket has been closed' }
    };
    
    const statusInfo = statusConfig[newStatus] || statusConfig['OPEN'];
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ticket #${formattedId} Status Update</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f3f4f6; }
          .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .email-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; }
          .email-header h1 { margin: 0; font-size: 28px; }
          .email-content { padding: 30px 25px; background: #f9fafb; }
          .status-card { background: white; border-radius: 12px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 4px solid ${statusInfo.color}; }
          .ticket-id { font-size: 20px; font-weight: bold; color: #667eea; font-family: monospace; margin-bottom: 15px; }
          .status-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; background-color: ${statusInfo.bg}; color: ${statusInfo.color}; margin: 10px 0; }
          .info-row { margin: 12px 0; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .info-label { font-weight: 600; color: #4b5563; display: inline-block; width: 120px; }
          .info-value { color: #1f2937; display: inline-block; }
          .notes-box { background-color: #fef9e3; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 3px solid #eab308; }
          .email-footer { background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
          .button { display: inline-block; padding: 12px 24px; background-color: #667eea; color: white; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1>${statusInfo.icon} Ticket Status Updated</h1>
            <p style="margin-top: 8px; font-size: 14px;">Support Ticket Update Notification</p>
          </div>
          <div class="email-content">
            <p>Dear User,</p>
            <p>The status of your support ticket has been updated by <strong>${updatedBy}</strong>.</p>
            
            <div class="status-card">
              <div class="ticket-id">Ticket #${formattedId}</div>
              <div class="status-badge">New Status: ${newStatus}</div>
              
              <div class="info-row">
                <span class="info-label">Subject:</span>
                <span class="info-value">${ticket.subject}</span>
              </div>
              
              <div class="info-row">
                <span class="info-label">Previous Status:</span>
                <span class="info-value">${ticket.status || 'N/A'}</span>
              </div>
              
              <div class="info-row">
                <span class="info-label">Updated Date:</span>
                <span class="info-value">${updateDate}</span>
              </div>
              
              <div class="info-row">
                <span class="info-label">Status Message:</span>
                <span class="info-value">${statusInfo.message}</span>
              </div>
              
              ${resolutionNotes ? `
                <div class="notes-box">
                  <strong>📝 Resolution Notes:</strong><br>
                  ${resolutionNotes.replace(/\n/g, '<br>')}
                </div>
              ` : ''}
            </div>
            
            <p style="text-align: center;">
              <a href="${window.location.origin}/support/tickets/${ticket.id || ticket.ticket_id}" class="button">
                View Ticket Details
              </a>
            </p>
            
            <p>Thank you for using our support system.</p>
          </div>
          <div class="email-footer">
            <p>This is an automated message from the Support Management System.</p>
            <p>© ${new Date().getFullYear()} Hospital Management System</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      errors.subject = "Subject must be at least 5 characters";
    } else if (formData.subject.trim().length > 200) {
      errors.subject = "Subject must not exceed 200 characters";
    }
    
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      errors.description = "Description must be at least 10 characters";
    } else if (formData.description.trim().length > 1000) {
      errors.description = "Description must not exceed 1000 characters";
    }
    
    if (!formData.priority) {
      errors.priority = "Priority is required";
    }
    
    if (formData.additional_emails) {
      const emails = formData.additional_emails.split(',').map(e => e.trim());
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const invalidEmails = emails.filter(email => email && !emailRegex.test(email));
      if (invalidEmails.length > 0) {
        errors.additional_emails = `Invalid email(s): ${invalidEmails.join(', ')}`;
      }
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
    setSendingEmail(true);
    
    try {
      if (!token) {
        toast.error('Please login to create a ticket');
        setSubmitting(false);
        setSendingEmail(false);
        return;
      }
      
      // Prepare the payload according to the API specification
      const payload = {
        subject: formData.subject.trim(),
        description: formData.description.trim(),
        priority: formData.priority
      };
      
      console.log('Creating ticket with payload:', payload);
      
      // Create ticket using the hospital-admin endpoint
      const response = await apiFetch('/api/v1/support/hospital-admin/tickets', {
        method: "POST",
        body: payload,
      });
      
      const responseData = await response.json();
      console.log('API Response:', responseData);
      
      if (!response.ok) {
        // Handle validation errors
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
      
      const newTicket = responseData.data || responseData;
      
      // Send email notifications if enabled
      if (formData.send_email) {
        try {
          const recipients = [];
          
          // Add admin email
          if (user?.email) {
            recipients.push(user.email);
          }
          
          // Add additional emails
          if (formData.additional_emails) {
            const additionalEmails = formData.additional_emails.split(',').map(e => e.trim());
            recipients.push(...additionalEmails);
          }
          
          const uniqueRecipients = [...new Set(recipients)];
          
          const emailHTML = createTicketEmailHTML(
            newTicket, 
            user?.hospital_name || 'Hospital',
            user?.email || 'System User'
          );
          
          // Send emails to all recipients
          const emailPromises = uniqueRecipients.map(recipient => 
            sendEmailViaAPI(
              recipient,
              `[Ticket #${formatEqualNumericId(newTicket.id || newTicket.ticket_id)}] New Support Ticket: ${newTicket.subject}`,
              emailHTML
            )
          );
          
          await Promise.allSettled(emailPromises);
          toast.success(`✅ Ticket created successfully! Confirmation email sent to ${uniqueRecipients.length} recipient(s)`);
          
        } catch (emailError) {
          console.error('Email sending failed:', emailError);
          toast.warning('✅ Ticket created! Email notification failed but ticket has been recorded.');
        }
      } else {
        toast.success("✅ Ticket created successfully!");
      }
      
      // Reset form
      setFormData({
        subject: '',
        description: '',
        priority: 'NORMAL',
        send_email: true,
        additional_emails: ''
      });
      setFormErrors({});
      setShowCreateModal(false);
      
      // Refresh ticket list
      await fetchTickets();
      await fetchCompletedTickets();
      
    } catch (error) {
      console.error("Create ticket error:", error);
      toast.error(error.message || "Failed to create ticket. Please try again.");
    } finally {
      setSubmitting(false);
      setSendingEmail(false);
    }
  };
  
  const handleUpdateStatus = async (ticketId, e) => {
    e.preventDefault();
    
    const errors = {};
    if (!statusUpdateData.status) {
      errors.status = "Status is required";
    }
    
    if (statusUpdateData.status === "RESOLVED" && !statusUpdateData.resolution_notes?.trim()) {
      errors.resolution_notes = "Resolution notes are required when status is RESOLVED";
    }
    
    if (Object.keys(errors).length > 0) {
      setStatusErrors(errors);
      return;
    }
    
    setSubmitting(true);
    
    try {
      if (!token) {
        toast.error('Please login to update status');
        setSubmitting(false);
        return;
      }
      
      // Prepare payload for status update
      const payload = {
        status: statusUpdateData.status,
        resolution_notes: statusUpdateData.resolution_notes,
        assigned_to_user_id: statusUpdateData.assigned_to_user_id
      };
      
      // Remove undefined fields
      Object.keys(payload).forEach(key => {
        if (payload[key] === undefined || payload[key] === '') {
          delete payload[key];
        }
      });
      
      // Call the hospital-admin endpoint for status update
      const result = await updateTicketStatus(ticketId, payload);
      
      // Send email notification if enabled
      if (statusUpdateData.send_email) {
        try {
          const recipients = [];
          
          // Add ticket creator's email
          if (selectedTicket?.user_email || selectedTicket?.created_by_email) {
            recipients.push(selectedTicket.user_email || selectedTicket.created_by_email);
          }
          
          // Add additional message recipients
          if (statusUpdateData.additional_message && statusUpdateData.additional_message.trim()) {
            const additionalEmails = statusUpdateData.additional_message.split(',').map(e => e.trim());
            recipients.push(...additionalEmails);
          }
          
          const uniqueRecipients = [...new Set(recipients)];
          
          if (uniqueRecipients.length > 0) {
            const emailHTML = createStatusUpdateEmailHTML(
              selectedTicket,
              statusUpdateData.status,
              statusUpdateData.resolution_notes,
              user?.email || 'Super Admin'
            );
            
            const emailPromises = uniqueRecipients.map(recipient => 
              sendEmailViaAPI(
                recipient,
                `[Ticket #${formatEqualNumericId(ticketId)}] Status Updated to ${statusUpdateData.status}`,
                emailHTML
              )
            );
            
            await Promise.allSettled(emailPromises);
            toast.success(`Status updated and email notification sent to ${uniqueRecipients.length} recipient(s)`);
          } else {
            toast.success("Status updated successfully!");
          }
        } catch (emailError) {
          console.error('Email sending failed:', emailError);
          toast.warning('Status updated! Email notification failed.');
        }
      } else {
        toast.success("Status updated successfully!");
      }
      
      setShowEditModal(false);
      setSelectedTicket(null);
      setStatusErrors({});
      setStatusUpdateData({
        status: '',
        resolution_notes: '',
        assigned_to_user_id: '',
        send_email: true,
        additional_message: ''
      });
      
      // Refresh both ticket lists
      await fetchTickets();
      await fetchCompletedTickets();
      
    } catch (error) {
      console.error("Status update error:", error);
      toast.error(error.message || "Failed to update status");
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
    if (activeTab === 'active') {
      if (filters.skip + filters.limit < pagination.total) {
        setFilters(prev => ({
          ...prev,
          skip: prev.skip + prev.limit
        }));
      }
    } else {
      if (completedFilters.skip + completedFilters.limit < completedPagination.total) {
        setCompletedFilters(prev => ({
          ...prev,
          skip: prev.skip + prev.limit
        }));
      }
    }
  };

  const handlePrevPage = () => {
    if (activeTab === 'active') {
      if (filters.skip > 0) {
        setFilters(prev => ({
          ...prev,
          skip: Math.max(0, prev.skip - prev.limit)
        }));
      }
    } else {
      if (completedFilters.skip > 0) {
        setCompletedFilters(prev => ({
          ...prev,
          skip: Math.max(0, prev.skip - prev.limit)
        }));
      }
    }
  };

  const handleShowClosedTickets = () => {
    setShowClosedOnly(true);
    setSearchTerm('');
    setFilters(prev => ({ ...prev, status: 'CLOSED' }));
  };

  const handleShowAllTickets = () => {
    setShowClosedOnly(false);
    setSearchTerm('');
    setFilters(prev => ({ ...prev, status: '' }));
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

  const getCurrentDisplayTickets = () => {
    if (activeTab === 'active') {
      return tickets.filter(ticket => {
        if (showClosedOnly && ticket.status !== 'CLOSED') return false;
        if (!searchTerm) return true;
        
        const searchLower = searchTerm.toLowerCase();
        const pureNumericId = getPureNumericTicketId(ticket.id || ticket.ticket_id);
        const equalFormattedId = formatEqualNumericId(ticket.id || ticket.ticket_id);
        return (
          pureNumericId.toLowerCase().includes(searchLower) ||
          equalFormattedId.toLowerCase().includes(searchLower) ||
          (ticket.id || ticket.ticket_id)?.toLowerCase().includes(searchLower) ||
          ticket.subject?.toLowerCase().includes(searchLower) ||
          ticket.status?.toLowerCase().includes(searchLower) ||
          ticket.hospital_name?.toLowerCase().includes(searchLower)
        );
      });
    } else {
      return completedTickets.filter(ticket => {
        if (!searchTerm) return true;
        
        const searchLower = searchTerm.toLowerCase();
        const pureNumericId = getPureNumericTicketId(ticket.id || ticket.ticket_id);
        const equalFormattedId = formatEqualNumericId(ticket.id || ticket.ticket_id);
        return (
          pureNumericId.toLowerCase().includes(searchLower) ||
          equalFormattedId.toLowerCase().includes(searchLower) ||
          (ticket.id || ticket.ticket_id)?.toLowerCase().includes(searchLower) ||
          ticket.subject?.toLowerCase().includes(searchLower) ||
          ticket.status?.toLowerCase().includes(searchLower) ||
          ticket.hospital_name?.toLowerCase().includes(searchLower)
        );
      });
    }
  };

  const getCurrentPagination = () => {
    if (activeTab === 'active') {
      return pagination;
    } else {
      return completedPagination;
    }
  };

  const isLoading = () => {
    if (activeTab === 'active') {
      return loading;
    } else {
      return loadingCompleted;
    }
  };

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
            onClick={() => {
              fetchTickets();
              fetchCompletedTickets();
            }}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const displayedTickets = getCurrentDisplayTickets();
  const currentPagination = getCurrentPagination();
  const currentLoading = isLoading();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ToastContainer position="top-right" autoClose={5000} />
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
            Support Management
          </h1>
        </div>
        <p className="text-gray-600">
          Create and track your support tickets. Super Admin will review and respond to your requests.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* TOTAL TICKETS */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent pointer-events-none" />
          <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            Total
          </span>
          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-400 mt-1">All tickets</p>
            </div>
            <div className="flex items-end gap-1 h-14">
              <div className="w-1.5 h-4 bg-blue-300 rounded"></div>
              <div className="w-1.5 h-7 bg-blue-400 rounded"></div>
              <div className="w-1.5 h-10 bg-blue-500 rounded"></div>
              <div className="w-1.5 h-6 bg-blue-400 rounded"></div>
              <div className="w-1.5 h-12 bg-blue-600 rounded"></div>
            </div>
          </div>
        </div>

        {/* OPEN TICKETS */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent pointer-events-none" />
          <span className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            Active
          </span>
          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">Open Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{stats.open}</p>
              <p className="text-xs text-gray-400 mt-1">Need attention</p>
            </div>
            <svg width="70" height="40" viewBox="0 0 70 40">
              <polyline points="0,30 12,28 24,32 36,25 48,22 60,18" fill="none" stroke="#eab308" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* IN PROGRESS */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent pointer-events-none" />
          <span className="absolute top-4 right-4 bg-purple-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            Working
          </span>
          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
              <p className="text-xs text-gray-400 mt-1">Being worked on</p>
            </div>
            <div className="flex items-end gap-1 h-14">
              <div className="w-1.5 h-10 bg-purple-400 rounded"></div>
              <div className="w-1.5 h-6 bg-purple-300 rounded"></div>
              <div className="w-1.5 h-12 bg-purple-500 rounded"></div>
              <div className="w-1.5 h-8 bg-purple-400 rounded"></div>
              <div className="w-1.5 h-9 bg-purple-300 rounded"></div>
            </div>
          </div>
        </div>

        {/* COMPLETED TICKETS */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent pointer-events-none" />
          <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            Completed
          </span>
          <div className="relative flex justify-between items-end">
            <div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">Completed Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              <p className="text-xs text-gray-400 mt-1">Resolved/Closed tickets</p>
            </div>
            <svg width="70" height="40" viewBox="0 0 70 40">
              <polyline points="0,28 12,24 24,18 36,14 48,10 60,6" fill="none" stroke="#22c55e" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Priority Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Urgent Priority</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-red-600">{stats.urgent}</span>
            <span className="text-sm text-gray-500">tickets need immediate attention</span>
          </div>
          <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 rounded-full" style={{ width: `${stats.total ? (stats.urgent / stats.total) * 100 : 0}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">High Priority</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-orange-600">{stats.high}</span>
            <span className="text-sm text-gray-500">tickets require quick action</span>
          </div>
          <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full" style={{ width: `${stats.total ? (stats.high / stats.total) * 100 : 0}%` }}></div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-4 text-sm font-medium transition-all duration-200 ${
              activeTab === 'active'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('active')}
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Active Tickets ({stats.open + stats.inProgress})
            </div>
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium transition-all duration-200 ${
              activeTab === 'completed'
                ? 'text-green-600 border-b-2 border-green-600 bg-green-50/30'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Completed Tickets ({stats.completed})
            </div>
          </button>
        </div>
      </div>

      {/* Search and Actions Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder={activeTab === 'active' ? "Search tickets by ID, subject, status, or hospital..." : "Search completed tickets by ID, subject, or hospital..."}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {activeTab === 'active' && (
              <select
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="OPEN">● Open</option>
                <option value="IN_PROGRESS">● In Progress</option>
                <option value="RESOLVED">● Resolved</option>
                <option value="CLOSED">● Closed</option>
              </select>
            )}

            <button
              onClick={() => setShowCreateModal(true)}
              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 font-medium flex items-center gap-2"
              type="button"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Ticket
            </button>

            {activeTab === 'active' && showClosedOnly ? (
              <button
                onClick={handleShowAllTickets}
                className="px-5 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-all duration-200 font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Show All
              </button>
            ) : (
              activeTab === 'active' && (
                <button
                  onClick={handleShowClosedTickets}
                  className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 font-medium flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Closed Tickets
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {currentLoading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600">Loading tickets...</p>
          </div>
        ) : displayedTickets.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No tickets found</h3>
            <p className="text-gray-500 mb-6">
              {activeTab === 'active' ? 'Create your first support ticket' : 'No completed tickets yet'}
            </p>
            {activeTab === 'active' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all"
              >
                Create First Ticket
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Ticket ID</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Hospital</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Subject</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Priority</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Created</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedTickets.map((ticket) => (
                    <tr key={ticket.id || ticket.ticket_id} className="border-b border-gray-100 hover:bg-blue-50/30 transition-all duration-300">
                      <td className="py-4 px-6">
                        <p className="font-mono font-semibold text-blue-600">{formatEqualNumericId(ticket.id || ticket.ticket_id)}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-medium text-gray-900">{ticket.hospital_name || user?.hospital_name || 'N/A'}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-gray-700 max-w-md truncate" title={ticket.subject}>{ticket.subject}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(ticket.status)}`}>
                          {ticket.status?.replace('_', ' ') || 'Unknown'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityBadgeClass(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500">
                        {formatDate(ticket.created_at)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setShowViewModal(true);
                            }}
                            className="w-8 h-8 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors"
                            title="View"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          {isSuperAdmin && ticket.status !== 'CLOSED' && activeTab === 'active' && (
                            <button
                              onClick={() => {
                                setSelectedTicket(ticket);
                                setStatusUpdateData({
                                  status: ticket.status || '',
                                  resolution_notes: ticket.resolution_notes || '',
                                  assigned_to_user_id: ticket.assigned_to_user_id || '',
                                  send_email: true,
                                  additional_message: ''
                                });
                                setShowEditModal(true);
                              }}
                              className="w-8 h-8 bg-green-100 text-green-600 hover:bg-green-200 rounded-lg flex items-center justify-center transition-colors"
                              title="Update Status"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{currentPagination.skip + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPagination.skip + currentPagination.limit, currentPagination.total)}
                </span>{' '}
                of <span className="font-medium">{currentPagination.total}</span> results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPagination.skip === 0}
                  className={`px-3 py-1 rounded border ${
                    currentPagination.skip === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPagination.skip + currentPagination.limit >= currentPagination.total}
                  className={`px-3 py-1 rounded border ${
                    currentPagination.skip + currentPagination.limit >= currentPagination.total
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
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setFormErrors({});
        }}
        title={
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">Create Support Ticket</span>
          </div>
        }
        size="lg"
      >
        <form onSubmit={handleCreateTicket} className="space-y-6">
          <div className="space-y-4">
            {/* Subject Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Subject * (Min 5, Max 200 characters)
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 200) {
                      setFormData({...formData, subject: value});
                      setFormErrors({...formErrors, subject: ''});
                    }
                  }}
                  maxLength="200"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${formErrors.subject ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="Enter ticket subject (5-200 characters)"
                />
              </div>
              <div className="flex justify-between mt-1">
                {formErrors.subject && <p className="text-sm text-red-600">{formErrors.subject}</p>}
                <p className={`text-xs ${formData.subject.length >= 5 && formData.subject.length <= 200 ? 'text-green-600' : 'text-gray-500'} ml-auto`}>
                  {formData.subject.length}/200 characters (min 5)
                </p>
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description * (Min 10, Max 1000 characters)
              </label>
              <div className="relative group">
                <div className="absolute top-3 left-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <textarea
                  value={formData.description}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 1000) {
                      setFormData({...formData, description: value});
                      setFormErrors({...formErrors, description: ''});
                    }
                  }}
                  rows="4"
                  maxLength="1000"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all ${formErrors.description ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="Enter detailed description (10-1000 characters)"
                />
              </div>
              <div className="flex justify-between mt-1">
                {formErrors.description && <p className="text-sm text-red-600">{formErrors.description}</p>}
                <p className={`text-xs ${formData.description.length >= 10 && formData.description.length <= 1000 ? 'text-green-600' : 'text-gray-500'} ml-auto`}>
                  {formData.description.length}/1000 characters (min 10)
                </p>
              </div>
            </div>

            {/* Priority Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Priority
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all"
                >
                  <option value="URGENT">🔴 URGENT</option>
                  <option value="HIGH">🟠 HIGH</option>
                  <option value="NORMAL">🔵 NORMAL</option>
                  <option value="LOW">⚪ LOW</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Email Notification Section */}
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <label className="flex items-center space-x-2 mb-3">
                <input
                  type="checkbox"
                  checked={formData.send_email}
                  onChange={(e) => setFormData({...formData, send_email: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Send email notifications</span>
              </label>
              
              {formData.send_email && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Email Recipients (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.additional_emails}
                    onChange={(e) => setFormData({...formData, additional_emails: e.target.value})}
                    className={`w-full border ${formErrors.additional_emails ? 'border-red-400' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter email addresses separated by commas"
                  />
                  {formErrors.additional_emails && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.additional_emails}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Email will be sent to: Super Admin and additional recipients
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setShowCreateModal(false);
                setFormErrors({});
              }}
              className="px-5 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 font-medium flex items-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
            >
              {submitting ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  {sendingEmail ? 'Creating & Sending...' : 'Creating...'}
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Ticket
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* View Ticket Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title={
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">Ticket Details</span>
          </div>
        }
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500">Ticket ID</label>
              <p className="font-semibold text-lg text-blue-600 font-mono">
                {formatEqualNumericId(selectedTicket?.id || selectedTicket?.ticket_id)}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Hospital</label>
              <p className="font-semibold text-gray-900">{selectedTicket?.hospital_name || user?.hospital_name || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Status</label>
              <div>
                <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getStatusBadgeClass(selectedTicket?.status)}`}>
                  {selectedTicket?.status}
                </span>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Priority</label>
              <div>
                <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getPriorityBadgeClass(selectedTicket?.priority)}`}>
                  {selectedTicket?.priority}
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-sm text-gray-500 font-semibold">Subject</label>
            <p className="font-medium text-gray-900 bg-gray-50 p-4 rounded-xl mt-1 border border-gray-200">
              {selectedTicket?.subject}
            </p>
          </div>
          
          <div>
            <label className="text-sm text-gray-500 font-semibold block mb-2">Description</label>
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 min-h-[150px] whitespace-pre-wrap break-words">
              {getTicketDescription(selectedTicket) || 'No description provided'}
            </div>
          </div>
          
          {selectedTicket?.resolution_notes && selectedTicket.resolution_notes.trim() && (
            <div>
              <label className="text-sm text-gray-500 font-semibold">Resolution Notes</label>
              <div className="bg-green-50 p-4 rounded-xl mt-1 border border-green-200">
                <p className="whitespace-pre-wrap text-gray-800 break-words">{selectedTicket.resolution_notes}</p>
              </div>
            </div>
          )}
          
          {selectedTicket?.resolved_at && (
            <div>
              <label className="text-sm text-gray-500 font-semibold">Resolved At</label>
              <p className="font-medium text-gray-900">{formatDate(selectedTicket.resolved_at)}</p>
            </div>
          )}
          
          <div className="pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label className="text-gray-500">Created Date</label>
                <p className="font-medium text-gray-900">{formatDate(selectedTicket?.created_at)}</p>
              </div>
              {selectedTicket?.updated_at && selectedTicket.updated_at !== selectedTicket.created_at && (
                <div>
                  <label className="text-gray-500">Last Updated</label>
                  <p className="font-medium text-gray-900">{formatDate(selectedTicket.updated_at)}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={() => setShowViewModal(false)}
              className="px-5 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-200 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* Update Status Modal - Only for SUPER_ADMIN */}
      {isSuperAdmin && (
        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setStatusErrors({});
          }}
          title={
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">Update Ticket Status</span>
            </div>
          }
          size="lg"
        >
          <form onSubmit={(e) => handleUpdateStatus(selectedTicket?.id || selectedTicket?.ticket_id, e)} className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600">
                Ticket ID: <span className="font-mono font-bold text-blue-600">{formatEqualNumericId(selectedTicket?.id || selectedTicket?.ticket_id)}</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Subject: <span className="font-medium">{selectedTicket?.subject}</span>
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status *</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <select
                  value={statusUpdateData.status}
                  onChange={(e) => setStatusUpdateData({...statusUpdateData, status: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all"
                >
                  <option value="">Select Status</option>
                  <option value="OPEN">🟡 Open</option>
                  <option value="IN_PROGRESS">🔵 In Progress</option>
                  <option value="RESOLVED">🟢 Resolved</option>
                  <option value="CLOSED">⚪ Closed</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {statusErrors.status && <p className="mt-1 text-sm text-red-600">{statusErrors.status}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Assigned To (User ID)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={statusUpdateData.assigned_to_user_id}
                  onChange={(e) => setStatusUpdateData({...statusUpdateData, assigned_to_user_id: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter user ID"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Resolution Notes</label>
              <textarea
                value={statusUpdateData.resolution_notes}
                onChange={(e) => setStatusUpdateData({...statusUpdateData, resolution_notes: e.target.value})}
                rows="4"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all"
                placeholder="Add resolution notes (required when status is RESOLVED)..."
              />
              {statusErrors.resolution_notes && <p className="mt-1 text-sm text-red-600">{statusErrors.resolution_notes}</p>}
            </div>

            {/* Email Notification Section for Status Update */}
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <label className="flex items-center space-x-2 mb-3">
                <input
                  type="checkbox"
                  checked={statusUpdateData.send_email}
                  onChange={(e) => setStatusUpdateData({...statusUpdateData, send_email: e.target.checked})}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm font-medium text-gray-700">Send email notifications about this update</span>
              </label>
              
              {statusUpdateData.send_email && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Email Recipients (Optional)
                  </label>
                  <input
                    type="text"
                    value={statusUpdateData.additional_message}
                    onChange={(e) => setStatusUpdateData({...statusUpdateData, additional_message: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter email addresses separated by commas"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Email will be sent to: Ticket creator and additional recipients
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setShowEditModal(false);
                  setStatusErrors({});
                }}
                className="px-5 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 font-medium flex items-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
              >
                {submitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Updating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Update Status
                  </>
                )}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default SupportManagement;