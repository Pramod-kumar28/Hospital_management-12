import React, { useState, useEffect } from 'react';
import {
  SUPER_ADMIN_HOSPITALS,
  SUPER_ADMIN_NOTIFY_HOSPITAL_ADMINS
} from '../../../../config/api';
import { apiFetch } from '../../../../services/apiClient';


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
  const [hospitals, setHospitals] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [showHospitalDropdown, setShowHospitalDropdown] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  const notificationApiKey =
    (typeof window !== 'undefined' && (
      localStorage.getItem('notification_api_key') ||
      localStorage.getItem('NOTIFICATION_API_KEY')
    )) ||
    (typeof process !== 'undefined' && process?.env?.REACT_APP_NOTIFICATION_API_KEY) ||
    (typeof import.meta !== 'undefined' && import.meta?.env?.VITE_NOTIFICATION_API_KEY) ||
    '';


  const getHospitalItems = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.hospitals)) return data.hospitals;
    if (Array.isArray(data?.items)) return data.items;
    return [];
  };

  const getHospitalName = (hospital) =>
    hospital?.name || hospital?.hospital_name || hospital?.hospitalName || 'Unknown Hospital';

  const fetchHospitals = async () => {
    setLoadingHospitals(true);
    try {
      const response = await apiFetch(SUPER_ADMIN_HOSPITALS);
      const responseData = await response.json().catch(() => ({}));
      if (!response.ok) {
        showNotification(responseData?.message || 'Failed to fetch hospitals', 'error');
        return;
      }
      setHospitals(getHospitalItems(responseData));
    } catch (error) {
      showNotification(`Failed to fetch hospitals: ${error.message || 'Unknown error'}`, 'error');
    } finally {
      setLoadingHospitals(false);
    }
  };



  useEffect(() => {
    const token = localStorage.getItem('access_token') || localStorage.getItem('token');
    if (!token) {
      setTokenValid(false);
    }
    fetchHospitals();
  }, []);

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

    setLoading(true);
    try {
      // Determine target hospitals
      const targetHospitals = formData.hospitalId
        ? hospitals.filter(h => String(h?.id) === String(formData.hospitalId))
        : hospitals.filter(h => h?.id);

      if (targetHospitals.length === 0) {
        showNotification('No hospitals selected or found.', 'error');
        setLoading(false);
        return;
      }

      console.log(`Sending notifications to ${targetHospitals.length} target(s)`);

      const results = await Promise.all(
        targetHospitals.map(async (hospital) => {
          const requestBody = {
            hospital_id: hospital.id,
            hospital_name: getHospitalName(hospital),
            subject: formData.subject,
            message: formData.message,
          };

          const requestHeaders = {};
          if (notificationApiKey) {
            requestHeaders['x-api-key'] = notificationApiKey;
            requestBody.notification_api_key = notificationApiKey;
          }

          try {
            const response = await apiFetch(SUPER_ADMIN_NOTIFY_HOSPITAL_ADMINS, {
              method: 'POST',
              headers: requestHeaders,
              body: requestBody,
            });
            const data = await response.json().catch(() => ({}));
            return { ok: response.ok, hospitalName: getHospitalName(hospital), message: data.message || data.errors?.[0] };
          } catch (err) {
            return { ok: false, hospitalName: getHospitalName(hospital), message: err.message };
          }
        })
      );

      const successful = results.filter(r => r.ok);
      const failed = results.filter(r => !r.ok);

      if (failed.length === 0) {
        showNotification(
          targetHospitals.length === 1
            ? `Notification sent to ${getHospitalName(targetHospitals[0])} successfully!`
            : `Notifications sent to all ${targetHospitals.length} hospitals successfully!`,
          'success'
        );

        setFormData({
          hospitalId: '',
          subject: '',
          message: '',
        });
        setShowHospitalDropdown(false);
      } else if (successful.length > 0) {
        showNotification(
          `Sent to ${successful.length} hospitals, but failed for ${failed.length} hospitals.`,
          'warning'
        );
      } else {
        const firstError = failed[0]?.message || 'Failed to send notification';
        showNotification(firstError, 'error');
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

      {/* Info Card for Hospital Selection */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
        <div className="flex items-start gap-3">
          <i className="fas fa-info-circle text-blue-500 text-xl mt-0.5"></i>
          <div>
            <h3 className="font-semibold text-blue-800 text-sm">Notification target:</h3>
            <p className="text-xs text-blue-700 mt-1">
              Select hospital names to send the mail notification.
            </p>
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
                To: selected hospital names
              </p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <i className="fas fa-building text-white text-sm"></i>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <div className={`cursor-pointer transition-all duration-300 rounded-xl border-2 p-4 ${formData.hospitalId === '' && !showHospitalDropdown
                ? 'border-indigo-500 bg-indigo-50 shadow-md'
                : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
              }`}
              onClick={() => {
                setShowHospitalDropdown(false);
                setFormData((prev) => ({ ...prev, hospitalId: '' }));
              }} >
              <div className="flex flex-col items-center text-center">
                <i className="fas fa-globe text-3xl mb-2 text-green-500"></i>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">All Hospitals</h4>
                <p className="text-xs text-gray-500">Send to all hospital administrators</p>
                {formData.hospitalId === '' && !showHospitalDropdown && (
                  <div className="mt-2">
                    <i className="fas fa-check-circle text-green-500 text-sm"></i>
                  </div>
                )}
              </div>
            </div>

            <div className={`cursor-pointer transition-all duration-300 rounded-xl border-2 p-4 ${showHospitalDropdown || formData.hospitalId
                ? 'border-indigo-500 bg-indigo-50 shadow-md'
                : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
              }`}
              onClick={() => setShowHospitalDropdown(true)} >
              <div className="flex flex-col items-center text-center">
                <i className="fas fa-list text-3xl mb-2 text-purple-500"></i>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">Enter Hospital Names</h4>
                <p className="text-xs text-gray-500">Click to open hospital dropdown</p>
                {(showHospitalDropdown || formData.hospitalId) && (
                  <div className="mt-2">
                    <i className="fas fa-check-circle text-green-500 text-sm"></i>
                  </div>
                )}
              </div>
            </div>
          </div>

          {showHospitalDropdown && (
            <div className="mt-4 p-4 bg-white rounded-xl border border-indigo-200 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
                  Hospital Name
                </label>
                <select
                  value={formData.hospitalId}
                  onChange={(e) => handleSelectChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  disabled={loading || !tokenValid || loadingHospitals}
                >
                  <option value="">Select hospital name</option>
                  {hospitals
                    .filter((hospital) => hospital?.id)
                    .map((hospital) => (
                      <option key={String(hospital.id)} value={String(hospital.id)}>
                        {getHospitalName(hospital)}
                      </option>
                    ))}
                </select>
                {loadingHospitals && (
                  <p className="text-xs text-gray-500 mt-2">
                    <i className="fas fa-spinner fa-spin mr-1"></i>
                    Loading hospital names...
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="relative mt-4 pt-3 border-t border-indigo-100">
            <p className="text-xs text-indigo-700 font-medium">
              {formData.hospitalId
                ? `Mail will be sent to: ${getHospitalName(hospitals.find((hospital) => String(hospital?.id) === String(formData.hospitalId)))}`
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
                setShowHospitalDropdown(false);
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
        <div className={`fixed top-5 right-5 z-50 animate-slide-in ${notification.type === 'success'
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