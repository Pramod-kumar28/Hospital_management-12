// src/components/common/Toast/Toast.jsx
import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    info: 'fa-info-circle',
    warning: 'fa-exclamation-triangle'
  };

  const colors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
    warning: 'bg-orange-600'
  };

  return (
    <div className={`fixed top-5 right-5 z-[9999] flex items-center gap-3 px-4 py-3 text-white rounded-xl shadow-2xl animate-toast-slide-in ${colors[type]}`}>
      <i className={`fas ${icons[type]} text-lg`}></i>
      <div className="flex flex-col">
        <p className="text-sm font-bold tracking-tight">{message}</p>
        <div className="w-full bg-white/20 h-1 mt-1 rounded-full overflow-hidden">
          <div className="bg-white h-full animate-toast-progress" style={{ animationDuration: `${duration}ms` }}></div>
        </div>
      </div>
      <button onClick={onClose} className="ml-2 hover:opacity-75 transition">
        <i className="fas fa-times text-xs"></i>
      </button>
    </div>
  );
};

export default Toast;
