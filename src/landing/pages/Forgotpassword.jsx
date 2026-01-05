import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, ArrowLeft, Shield, CheckCircle, 
  Heart, Zap, Clock, Key
} from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Email input, 2: Code verification, 3: New password
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success
      setSuccess(true);
      setTimeout(() => {
        setStep(2);
        setSuccess(false);
      }, 2000);
      
    } catch (err) {
      setError('Failed to send reset instructions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    // Auto-focus previous input on backspace
    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    
    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === 'ArrowRight' && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 4);
    if (/^\d+$/.test(pasteData)) {
      const newCode = [...code];
      for (let i = 0; i < pasteData.length; i++) {
        if (i < 4) {
          newCode[i] = pasteData[i];
        }
      }
      setCode(newCode);
      
      // Focus the last filled input or the last one
      const lastFilledIndex = Math.min(pasteData.length - 1, 3);
      inputRefs.current[lastFilledIndex].focus();
    }
  };

  const handleCodeVerification = async (e) => {
    e.preventDefault();
    
    // Check if all code digits are filled
    if (code.some(digit => digit === '')) {
      setError('Please enter the complete verification code.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(3);
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => {
        // Redirect to login page after successful password reset
        window.location.href = '/signin';
      }, 2000);
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 mt-16">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
      </div>

      {/* Main Content */}
      <div className="container-x py-8 md:py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          {/* Progress Steps - Horizontal Flow */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center w-full max-w-xs">
              {/* Step 1 */}
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step >= 1 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
                </div>
                <span className={`text-xs mt-2 text-center ${step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                  Enter Email
                </span>
              </div>
              
              {/* Connector 1 */}
              <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              
              {/* Step 2 */}
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step >= 2 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {step > 2 ? <CheckCircle className="w-5 h-5" /> : '2'}
                </div>
                <span className={`text-xs mt-2 text-center ${step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                  Verify Code
                </span>
              </div>
              
              {/* Connector 2 */}
              <div className={`flex-1 h-0.5 mx-2 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              
              {/* Step 3 */}
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step >= 3 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  3
                </div>
                <span className={`text-xs mt-2 text-center ${step >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                  New Password
                </span>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Key className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {step === 1 && 'Reset Your Password'}
                {step === 2 && 'Verify Your Identity'}
                {step === 3 && 'Create New Password'}
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                {step === 1 && 'Enter your email address and we\'ll send you reset instructions'}
                {step === 2 && 'Enter the verification code sent to your email'}
                {step === 3 && 'Create a new secure password for your account'}
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <div>
                    <p className="text-sm text-green-700 font-medium">
                      {step === 1 && 'Reset instructions sent to your email!'}
                      {step === 3 && 'Password reset successfully! Redirecting...'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-red-400 mr-3" />
                  <div>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Email Input */}
            {step === 1 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      required
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="your.email@hospital.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending Instructions...
                    </>
                  ) : (
                    <>
                      Send Reset Instructions
                      <Zap className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Step 2: Code Verification */}
            {step === 2 && (
              <form onSubmit={handleCodeVerification} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verification Code
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength={1}
                        value={code[index]}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="w-full text-center py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-xl font-semibold"
                        required
                        inputMode="numeric"
                        pattern="[0-9]*"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Enter the 4-digit code sent to {email}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Code expires in 10:00</span>
                </div>

                <div className="flex gap-3 flex-col sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {loading ? 'Verifying...' : 'Verify Code'}
                  </button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-500 text-sm font-medium transition-colors"
                  >
                    Didn't receive code? Resend
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <form onSubmit={handlePasswordReset} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter new password"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Must be at least 8 characters with uppercase, lowercase, and numbers
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Confirm new password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Resetting Password...
                    </>
                  ) : (
                    <>
                      Reset Password
                      <CheckCircle className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Help Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Need help?{' '}
                  <a href="mailto:support@dcmhospital.com" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                    Contact Support
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span className="text-xs md:text-sm">Your security is our priority. All reset links expire in 1 hour.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}