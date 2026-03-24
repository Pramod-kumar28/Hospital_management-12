import React, { useState, useEffect } from 'react';

const NotifyHospitalAdminsForm = () => {
  const [formData, setFormData] = useState({
    hospitalId: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });
  const [showManualInput, setShowManualInput] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const [uuidError, setUuidError] = useState('');

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('access_token') || localStorage.getItem('token');
      if (!token) {
        setTokenValid(false);
        showNotification('Please login to send notifications', 'error');
      }
    };
    checkToken();
  }, []);

  // Helper function to validate UUID format
  const isValidUUID = (uuid) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  };

  const hospitalOptions = [
    { id: '', name: 'All Hospitals', icon: 'fas fa-globe', iconColor: '#10B981', description: 'Send to all hospital administrators' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (hospitalId) => {
    setFormData(prev => ({
      ...prev,
      hospitalId
    }));
    if (hospitalId !== '') {
      setShowManualInput(false);
    }
    setUuidError('');
  };

  const handleManualIdChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      hospitalId: value
    }));
    
    // Validate UUID format
    if (value && !isValidUUID(value)) {
      setUuidError('Invalid UUID format. Use format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
    } else {
      setUuidError('');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({
      show: true,
      message,
      type
    });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  const validateForm = () => {
    if (!formData.subject.trim()) {
      showNotification('Please enter a subject', 'error');
      return false;
    }
    if (!formData.message.trim()) {
      showNotification('Please enter a message', 'error');
      return false;
    }
    
    // Validate UUID if a specific hospital is selected
    if (formData.hospitalId && !isValidUUID(formData.hospitalId)) {
      showNotification('Please enter a valid Hospital UUID (format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)', 'error');
      return false;
    }
    
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const token = localStorage.getItem('access_token') || localStorage.getItem('token');
    if (!token) {
      showNotification('Please login to send notifications', 'error');
      handleLogout();
      return;
    }

    setLoading(true);
    try {
      const requestBody = {
        hospital_id: formData.hospitalId || null,
        subject: formData.subject,
        message: formData.message,
      };

      console.log('Sending notification:', requestBody);

      const response = await fetch('/api/v1/super-admin/notifications/send-to-hospital-admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);
      
      const responseData = await response.json();
      console.log('Full response data:', responseData);

      if (response.status === 401) {
        showNotification('Your session has expired. Please login again.', 'error');
        setTimeout(() => handleLogout(), 2000);
        setLoading(false);
        return;
      }

      if (response.ok) {
        showNotification(
          responseData.message || `✅ Notification sent successfully!`,
          'success'
        );
        
        setFormData({
          hospitalId: '',
          subject: '',
          message: '',
        });
        setShowManualInput(false);
        setUuidError('');
      } else {
        // Extract detailed error message
        let errorMsg = 'Failed to send notification';
        
        if (responseData.errors && responseData.errors.length > 0) {
          errorMsg = responseData.errors[0];
          if (errorMsg.includes('UUID')) {
            errorMsg = 'Invalid Hospital ID format. Please use a valid UUID format.';
          }
        } else if (responseData.message) {
          errorMsg = responseData.message;
        }
        
        showNotification(errorMsg, 'error');
      }
      
    } catch (error) {
      console.error('Error sending notification:', error);
      showNotification(
        `Network Error: ${error.message || 'Please check your connection'}`,
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper to show example UUIDs
  const showExampleUUIDs = () => {
    showNotification('Example UUID format: 123e4567-e89b-12d3-a456-426614174000', 'info');
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-700 flex items-center gap-2">
          Send Notifications
        </h2>
        {!tokenValid && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 text-sm"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Login Again
          </button>
        )}
      </div>

      {/* Info Card for UUID Format */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
        <div className="flex items-start gap-3">
          <i className="fas fa-info-circle text-blue-500 text-xl mt-0.5"></i>
          <div>
            <h3 className="font-semibold text-blue-800 text-sm">How to send to specific hospitals:</h3>
            <p className="text-xs text-blue-700 mt-1">
              To send to a specific hospital, you need the hospital's UUID from your database. 
              Format: <code className="bg-white px-1 py-0.5 rounded text-blue-600">xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</code>
            </p>
            <button
              onClick={showExampleUUIDs}
              className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
            >
              Show example UUID format
            </button>
          </div>
        </div>
      </div>

      {/* HOSPITAL SELECTION CARD */}
      <div className="relative bg-gradient-to-br from-white to-indigo-50 p-5 rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-indigo-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                Select Recipients
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Choose hospital to send notification
              </p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <i className="fas fa-building text-white text-sm"></i>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {hospitalOptions.map((hospital) => (
              <div
                key={hospital.id}
                className={`cursor-pointer transition-all duration-300 rounded-xl border-2 p-4 ${
                  formData.hospitalId === hospital.id
                    ? 'border-indigo-500 bg-indigo-50 shadow-md'
                    : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
                }`}
                onClick={() => handleSelectChange(hospital.id)}
              >
                <div className="flex flex-col items-center text-center">
                  <i 
                    className={`${hospital.icon} text-3xl mb-2`}
                    style={{ color: hospital.iconColor }}
                  ></i>
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">{hospital.name}</h4>
                  <p className="text-xs text-gray-500">{hospital.description}</p>
                  {formData.hospitalId === hospital.id && (
                    <div className="mt-2">
                      <i className="fas fa-check-circle text-green-500 text-sm"></i>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Manual UUID Input Option */}
            <div
              className={`cursor-pointer transition-all duration-300 rounded-xl border-2 p-4 ${
                showManualInput || (formData.hospitalId && !hospitalOptions.find(h => h.id === formData.hospitalId))
                  ? 'border-indigo-500 bg-indigo-50 shadow-md'
                  : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
              }`}
              onClick={() => {
                if (tokenValid) {
                  setShowManualInput(true);
                  setFormData(prev => ({ ...prev, hospitalId: '' }));
                  setUuidError('');
                }
              }}
            >
              <div className="flex flex-col items-center text-center">
                <i className="fas fa-keyboard text-3xl mb-2 text-purple-500"></i>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">Enter Hospital UUID</h4>
                <p className="text-xs text-gray-500">Manual ID input</p>
                {(showManualInput || (formData.hospitalId && !hospitalOptions.find(h => h.id === formData.hospitalId))) && (
                  <div className="mt-2">
                    <i className="fas fa-check-circle text-green-500 text-sm"></i>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Manual Input Field */}
          {(showManualInput || (formData.hospitalId && !hospitalOptions.find(h => h.id === formData.hospitalId))) && (
            <div className="mt-4 p-4 bg-white rounded-xl border border-indigo-200">
              <label className="block text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
                Hospital UUID
              </label>
              <input
                type="text"
                value={formData.hospitalId}
                onChange={handleManualIdChange}
                placeholder="e.g., 123e4567-e89b-12d3-a456-426614174000"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  uuidError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                disabled={loading || !tokenValid}
              />
              {uuidError && (
                <p className="text-xs text-red-500 mt-2">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {uuidError}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                <i className="fas fa-info-circle mr-1"></i>
                Enter the exact hospital UUID from your database. Check your database for hospital IDs.
              </p>
            </div>
          )}

          <div className="relative mt-4 pt-3 border-t border-indigo-100">
            <p className="text-xs text-indigo-700 font-medium">
              {formData.hospitalId 
                ? `Notification will be sent to hospital ID: ${formData.hospitalId}`
                : `✅ Notification will be sent to ALL hospital administrators`}
            </p>
          </div>
        </div>
      </div>

      {/* SUBJECT CARD */}
      <div className="relative bg-gradient-to-br from-white to-pink-50 p-5 rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-pink-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-pink-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-pink-600 uppercase tracking-wider">
                Subject
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Enter notification subject
              </p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
              <i className="fas fa-tag text-white text-sm"></i>
            </div>
          </div>

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Enter notification subject"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all bg-white/50"
            disabled={loading || !tokenValid}
            required
          />

          <div className="relative mt-4 pt-3 border-t border-pink-100">
            <p className="text-xs text-pink-700 font-medium">
              Clear and concise subject line
            </p>
          </div>
        </div>
      </div>

      {/* MESSAGE CARD */}
      <div className="relative bg-gradient-to-br from-white to-purple-50 p-5 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
                Message
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Write your notification content
              </p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <i className="fas fa-comment-dots text-white text-sm"></i>
            </div>
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Write your message here..."
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-y bg-white/50"
            disabled={loading || !tokenValid}
            required
          />
          
          <div className="text-right text-xs text-gray-500 mt-2">
            {formData.message.length} characters
          </div>

          <div className="relative mt-4 pt-3 border-t border-purple-100">
            <p className="text-xs text-purple-700 font-medium">
              Provide detailed information
            </p>
          </div>
        </div>
      </div>

      {/* LIVE PREVIEW CARD */}
      {(formData.subject || formData.message) && (
        <div className="relative bg-gradient-to-br from-white to-blue-50 p-5 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  Live Preview
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  How your notification will look
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <i className="fas fa-eye text-white text-sm"></i>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {formData.subject || 'Your subject will appear here'}
              </h4>
              <p className="text-gray-600 whitespace-pre-wrap leading-relaxed text-sm">
                {formData.message || 'Your message will appear here...'}
              </p>
            </div>

            <div className="relative mt-4 pt-3 border-t border-blue-100">
              <p className="text-xs text-blue-700 font-medium">
                Preview updates in real-time
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ACTION BUTTONS CARD */}
      <div className="relative bg-gradient-to-br from-white to-gray-50 p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gray-200 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gray-300 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Review and send notification
              </p>
            </div>
           
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => {
                setFormData({ hospitalId: '', subject: '', message: '' });
                setShowManualInput(false);
                setUuidError('');
              }}
              className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 text-sm"
              disabled={loading || !tokenValid}
            >
              <i className="fas fa-times text-red-500"></i>
              Clear
            </button>
            <button
              type="submit"
              disabled={loading || !tokenValid}
              className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Sending...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  Send Notification
                </>
              )}
            </button>
          </div>

          <div className="relative mt-4 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600 font-medium">
              Notification will be sent immediately via email
            </p>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {notification.show && (
        <div className={`fixed top-5 right-5 z-50 animate-slide-in ${
          notification.type === 'success' 
            ? 'bg-gradient-to-r from-green-500 to-green-600' 
            : 'bg-gradient-to-r from-red-500 to-red-600'
        } text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3`}>
          <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} text-xl`}></i>
          <span>{notification.message}</span>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slide-in {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-slide-in {
            animation: slide-in 0.3s ease-out;
          }
        `
      }} />
    </div>
  );
};

export default NotifyHospitalAdminsForm;