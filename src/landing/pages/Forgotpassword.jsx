import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const PasswordResetPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [userContact, setUserContact] = useState('');
  const [countdownTime, setCountdownTime] = useState(600);
  const [resendTime, setResendTime] = useState(60);
  const [email, setEmail] = useState('doctor.john@hospital.org');
  const [phone, setPhone] = useState('98765 43210');
  const [countryCode, setCountryCode] = useState('+91');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [passwordStrength, setPasswordStrength] = useState(20);
  const [strengthText, setStrengthText] = useState('Weak');
  const [strengthColor, setStrengthColor] = useState('bg-red-500');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [showOtpSuccess, setShowOtpSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const otpInputRefs = useRef([]);

  // Step Navigation
  const goToStep = (step) => {
    if (step < 1 || step > 4) return;
    setCurrentStep(step);
  };

  // Method Selection
  const selectMethod = (method) => {
    setSelectedMethod(method);
    goToStep(2);
  };

  // Handle Contact Form Submission
  const submitContactForm = () => {
    if (selectedMethod === 'email') {
      if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
      }
      setUserContact(email);
    } else if (selectedMethod === 'sms') {
      if (!phone) {
        alert('Please enter a phone number');
        return;
      }
      setUserContact(phone);
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      goToStep(3);
    }, 1000);
  };

  // OTP Functions
  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus next input
      if (value && index < 5) {
        otpInputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Start Countdown
  useEffect(() => {
    let countdownInterval;
    let resendInterval;

    if (currentStep === 3) {
      setCountdownTime(600);
      setResendTime(60);

      // Start countdown timer
      countdownInterval = setInterval(() => {
        setCountdownTime((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Start resend timer
      resendInterval = setInterval(() => {
        setResendTime((prev) => {
          if (prev <= 1) {
            clearInterval(resendInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (countdownInterval) clearInterval(countdownInterval);
      if (resendInterval) clearInterval(resendInterval);
    };
  }, [currentStep]);

  // Auto-focus first OTP input
  useEffect(() => {
    if (currentStep === 3 && otpInputRefs.current[0]) {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
    }
  }, [currentStep]);

  const verifyOTP = () => {
    // Auto-enter dummy OTP for testing
    const dummyOTP = ['1', '2', '3', '4', '5', '6'];
    setOtp(dummyOTP);
    setShowOtpSuccess(true);

    setTimeout(() => {
      goToStep(4);
    }, 1500);
  };

  const resendCode = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResendTime(60);
      alert('New code sent!');
    }, 1000);
  };

  // Password Strength Check
  const checkPasswordStrength = (password) => {
    setNewPassword(password);
    
    let strength = 0;
    const hasLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    if (hasLength) strength += 25;
    if (hasUpper) strength += 25;
    if (hasNumber) strength += 25;
    if (hasSpecial) strength += 25;

    setPasswordStrength(strength);

    if (strength <= 25) {
      setStrengthText('Weak');
      setStrengthColor('bg-red-500');
    } else if (strength <= 50) {
      setStrengthText('Fair');
      setStrengthColor('bg-yellow-500');
    } else if (strength <= 75) {
      setStrengthText('Good');
      setStrengthColor('bg-blue-500');
    } else {
      setStrengthText('Strong');
      setStrengthColor('bg-green-500');
    }

    // Check password match
    checkPasswordMatch(password, confirmPassword);
  };

  const checkPasswordMatch = (newPass = newPassword, confirmPass = confirmPassword) => {
    setConfirmPassword(confirmPass);
    
    if (!confirmPass) {
      setPasswordMatch(false);
      setPasswordMismatch(false);
      return;
    }

    if (newPass === confirmPass && newPass.length > 0) {
      setPasswordMatch(true);
      setPasswordMismatch(false);
    } else {
      setPasswordMatch(false);
      setPasswordMismatch(true);
    }
  };

  const togglePassword = (fieldId) => {
    const field = document.getElementById(fieldId);
    const icon = field.nextElementSibling?.querySelector('i');
    if (field && icon) {
      const type = field.getAttribute('type') === 'password' ? 'text' : 'password';
      field.setAttribute('type', type);
      icon.className = type === 'password' ? 'fas fa-eye text-gray-400' : 'fas fa-eye-slash text-gray-400';
    }
  };

  // Handle Password Form Submission
  const submitPasswordForm = () => {
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentStep(5); // Success screen
    }, 2000);
  };

  // Format time display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Loading Overlay
  const LoadingOverlay = ({ message }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center mx-4 max-w-xs">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-700 font-medium text-sm md:text-base">{message}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-6">
      {loading && <LoadingOverlay message={currentStep === 2 ? "Sending code..." : currentStep === 4 ? "Updating password..." : "Processing..."} />}
      
      <div className="max-w-lg w-full">
        
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-blue-600 text-white p-2 md:p-3 rounded-xl">
              <i className="fas fa-hospital text-xl md:text-2xl"></i>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">DCMS Hospital</h1>
              <p className="text-gray-600 text-sm md:text-base">Secure Password Recovery</p>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
          {/* Progress Steps */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-700">
                Step <span>{currentStep}</span> of 4
              </div>
              <div className="text-xs md:text-sm text-gray-500 text-right">
                {currentStep === 1 && 'Identify Method'}
                {currentStep === 2 && 'Contact Information'}
                {currentStep === 3 && 'Verify Code'}
                {currentStep === 4 && 'New Password'}
                {currentStep === 5 && 'Complete'}
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-1 flex items-center">
                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-semibold text-xs md:text-sm ${
                  currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <div className={`flex-1 h-1 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              </div>
              <div className="flex-1 flex items-center">
                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-semibold text-xs md:text-sm ${
                  currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <div className={`flex-1 h-1 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              </div>
              <div className="flex-1 flex items-center">
                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-semibold text-xs md:text-sm ${
                  currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  3
                </div>
                <div className={`flex-1 h-1 ${currentStep >= 4 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              </div>
              <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-semibold text-xs md:text-sm ${
                currentStep >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                4
              </div>
            </div>
          </div>

          {/* Step 1: Choose Method */}
          {currentStep === 1 && (
            <div className="animate-fadeIn">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Reset Your Password</h2>
              <p className="text-gray-600 mb-6 text-sm md:text-base">Choose verification method</p>
              
              <div className="space-y-4 mb-6">
                {/* Email Option */}
                <div 
                  className="p-3 md:p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 cursor-pointer transition-all active:scale-[0.99]"
                  onClick={() => selectMethod('email')}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-2 md:p-3 rounded-lg bg-blue-100">
                      <i className="fas fa-envelope text-blue-600 text-lg md:text-xl"></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">Email Verification</h3>
                      <p className="text-gray-600 text-xs md:text-sm">Send code to your hospital email</p>
                    </div>
                    <i className="fas fa-chevron-right text-gray-400"></i>
                  </div>
                </div>

                {/* SMS Option */}
                <div 
                  className="p-3 md:p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 cursor-pointer transition-all active:scale-[0.99]"
                  onClick={() => selectMethod('sms')}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-2 md:p-3 rounded-lg bg-green-100">
                      <i className="fas fa-mobile-alt text-green-600 text-lg md:text-xl"></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">SMS Verification</h3>
                      <p className="text-gray-600 text-xs md:text-sm">Receive a text message with code</p>
                    </div>
                    <i className="fas fa-chevron-right text-gray-400"></i>
                  </div>
                </div>
              </div>

              <div className="p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start">
                  <i className="fas fa-info-circle text-blue-500 mr-3 mt-0.5"></i>
                  <div>
                    <p className="text-xs md:text-sm text-blue-700">
                      Choose the method linked to your hospital account for fastest recovery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Enter Contact Information */}
          {currentStep === 2 && (
            <div className="animate-fadeIn">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                {selectedMethod === 'email' ? 'Enter Your Email' : 'Enter Your Mobile Number'}
              </h2>
              <p className="text-gray-600 mb-6 text-sm md:text-base">
                {selectedMethod === 'email' ? "We'll send a verification code to your hospital email" : "We'll send an SMS to your registered mobile"}
              </p>
              
              <div className="space-y-6">
                {/* Email Form */}
                {selectedMethod === 'email' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="fas fa-envelope mr-2 text-blue-500"></i>
                      Hospital Email Address
                    </label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                      placeholder="doctor.name@hospital.org"
                    />
                    <p className="text-xs text-gray-500 mt-2">Use your official hospital email address</p>
                  </div>
                )}

                {/* SMS Form */}
                {selectedMethod === 'sms' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="fas fa-mobile-alt mr-2 text-green-500"></i>
                      Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <select 
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-20 md:w-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base"
                      >
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                      </select>
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required 
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base"
                        placeholder="9876543210"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">The number registered with your hospital account</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Link to="/login">
                  <button 
                    type="button" 
                    onClick={() => goToStep(1)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-base"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>Back
                  </button></Link>
                  <button 
                    type="button" 
                    onClick={submitContactForm}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all text-base"
                  >
                    Send Verification Code
                    <i className="fas fa-paper-plane ml-2"></i>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: OTP Verification */}
          {currentStep === 3 && (
            <div className="animate-fadeIn">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Enter Verification Code</h2>
              <p className="text-gray-600 mb-6 text-sm md:text-base">
                We sent a 6-digit code to <span className="font-semibold">{userContact}</span>
              </p>
              
              <div className="space-y-6">
                {/* OTP Input */}
                <div className="flex justify-center gap-1 md:gap-2 mb-4">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      ref={(el) => otpInputRefs.current[index] = el}
                      type="text"
                      maxLength="1"
                      value={otp[index]}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-10 h-10 md:w-12 md:h-12 text-center text-lg md:text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      id={`otp${index + 1}`}
                    />
                  ))}
                </div>

                {/* Countdown Timer */}
                <div className="text-center">
                  <div className="mb-4">
                    <div className={`font-mono text-base md:text-lg font-bold mb-1 ${
                      countdownTime <= 60 ? 'text-red-600' : 'text-gray-700'
                    }`}>
                      {formatTime(countdownTime)}
                    </div>
                    <p className="text-sm text-gray-500">Code expires in</p>
                  </div>

                  <button 
                    onClick={resendCode}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm md:text-base"
                    disabled={resendTime > 0}
                  >
                    Resend Code (<span>{resendTime}</span>s)
                  </button>
                </div>

                {/* Verification Status */}
                {showOtpSuccess && (
                  <div className="p-3 md:p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <i className="fas fa-check-circle text-green-500 text-lg md:text-xl mr-3"></i>
                      <div>
                        <h3 className="font-semibold text-green-800 text-sm md:text-base">Verified Successfully!</h3>
                        <p className="text-green-700 text-xs md:text-sm">Redirecting to password reset...</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button 
                    onClick={() => goToStep(2)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-base"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>Back
                  </button>
                  <button 
                    onClick={verifyOTP}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all text-base"
                  >
                    Verify Code
                    <i className="fas fa-check ml-2"></i>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: New Password */}
          {currentStep === 4 && (
            <div className="animate-fadeIn">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Create New Password</h2>
              <p className="text-gray-600 mb-6 text-sm md:text-base">Your password must meet hospital security requirements</p>
              
              <div className="space-y-6">
                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-lock mr-2 text-green-500"></i>
                    New Password
                  </label>
                  <div className="relative">
                    <input 
                      type="password" 
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => checkPasswordStrength(e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-10 text-base"
                      placeholder="Create a strong password"
                    />
                    <button 
                      type="button" 
                      onClick={() => togglePassword('newPassword')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <i className="fas fa-eye text-gray-400"></i>
                    </button>
                  </div>
                  
                  {/* Password Strength Meter */}
                  <div className="mt-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">Password strength:</span>
                      <span className={`text-xs font-medium ${
                        strengthText === 'Weak' ? 'text-red-600' :
                        strengthText === 'Fair' ? 'text-yellow-600' :
                        strengthText === 'Good' ? 'text-blue-600' : 'text-green-600'
                      }`}>
                        {strengthText}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${strengthColor}`} 
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center">
                      <i className={`fas ${
                        newPassword.length >= 8 ? 'fa-check text-green-500' : 'fa-times text-red-500'
                      } text-xs mr-2`}></i>
                      <span className={`text-xs ${
                        newPassword.length >= 8 ? 'text-green-600' : 'text-gray-600'
                      }`}>At least 8 characters</span>
                    </div>
                    <div className="flex items-center">
                      <i className={`fas ${
                        /[A-Z]/.test(newPassword) ? 'fa-check text-green-500' : 'fa-times text-red-500'
                      } text-xs mr-2`}></i>
                      <span className={`text-xs ${
                        /[A-Z]/.test(newPassword) ? 'text-green-600' : 'text-gray-600'
                      }`}>One uppercase letter</span>
                    </div>
                    <div className="flex items-center">
                      <i className={`fas ${
                        /[0-9]/.test(newPassword) ? 'fa-check text-green-500' : 'fa-times text-red-500'
                      } text-xs mr-2`}></i>
                      <span className={`text-xs ${
                        /[0-9]/.test(newPassword) ? 'text-green-600' : 'text-gray-600'
                      }`}>One number</span>
                    </div>
                    <div className="flex items-center">
                      <i className={`fas ${
                        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword) ? 'fa-check text-green-500' : 'fa-times text-red-500'
                      } text-xs mr-2`}></i>
                      <span className={`text-xs ${
                        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword) ? 'text-green-600' : 'text-gray-600'
                      }`}>One special character</span>
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-lock mr-2 text-blue-500"></i>
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input 
                      type="password" 
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => checkPasswordMatch(newPassword, e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10 text-base"
                      placeholder="Re-enter your new password"
                    />
                    <button 
                      type="button" 
                      onClick={() => togglePassword('confirmPassword')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <i className="fas fa-eye text-gray-400"></i>
                    </button>
                  </div>
                  {passwordMatch && (
                    <div className="mt-2">
                      <i className="fas fa-check-circle text-green-500 mr-1"></i>
                      <span className="text-xs text-green-600">Passwords match</span>
                    </div>
                  )}
                  {passwordMismatch && (
                    <div className="mt-2">
                      <i className="fas fa-times-circle text-red-500 mr-1"></i>
                      <span className="text-xs text-red-600">Passwords do not match</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button 
                    type="button" 
                    onClick={() => goToStep(3)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-base"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>Back
                  </button>
                  <button 
                    type="button" 
                    onClick={submitPasswordForm}
                    disabled={!passwordMatch || newPassword.length < 8}
                    className={`flex-1 p-3 rounded-lg font-semibold transition-all text-base ${
                      passwordMatch && newPassword.length >= 8
                        ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Reset Password
                    <i className="fas fa-check-double ml-2"></i>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Success Screen */}
          {currentStep === 5 && (
            <div className="text-center py-6 md:py-8">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check text-green-500 text-xl md:text-2xl"></i>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Password Reset Successful!</h2>
              <p className="text-gray-600 mb-6 text-sm md:text-base">Your password has been updated successfully.</p>
              
              <div className="bg-green-50 p-3 md:p-4 rounded-lg border border-green-200 mb-6">
                <div className="flex items-start">
                  <i className="fas fa-info-circle text-green-500 mr-3 mt-0.5"></i>
                  <div className="text-left">
                    <p className="text-xs md:text-sm text-green-800">
                      <span className="font-semibold">Next steps:</span> You'll be automatically logged out of all other devices. Please log in again with your new password.
                    </p>
                  </div>
                </div>
              </div>
                 
                 <Link to="/login">
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all text-base">
                Go to Login
                <i className="fas fa-sign-in-alt ml-2"></i>
              </button></Link>
            </div>
          )}

          {/* Back to Login Link */}
          <Link to="/login">
          {currentStep < 5 && (
            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t text-center">
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-2 text-sm md:text-base">
                <i className="fas fa-arrow-left"></i>
                Back to Login
              </a>
            </div>
          )}</Link>
        </div>

        {/* Footer */}
        <div className="mt-6 md:mt-8 text-center">
          <p className="text-gray-500 text-xs md:text-sm">
            <i className="fas fa-shield-alt mr-1"></i>
            DCMS Hospital System • HIPAA Compliant • Secure Recovery
          </p>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PasswordResetPage;