import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Menu, 
  ChevronRight, 
  UserPlus, 
  ShieldCheck, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  X, 
  Github, 
  Mail, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  Phone,
  MapPin
} from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    hospital: '',
    role: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [errors, setErrors] = useState({});
  const [isTermsExpanded, setIsTermsExpanded] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Hospital validation
    if (!formData.hospital.trim()) {
      newErrors.hospital = 'Please enter your hospital or clinic name';
    } else if (formData.hospital.trim().length < 2) {
      newErrors.hospital = 'Hospital name must be at least 2 characters';
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = 'Please select your role';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Please enter a password';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms validation
    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAcceptTerms = () => {
    setFormData(prev => ({ ...prev, terms: true }));
    setTermsAccepted(true);
    setIsTermsExpanded(false);
    showToastMessage('Terms & Conditions accepted successfully!', 'success');
  };

  const handleDeclineTerms = () => {
    setFormData(prev => ({ ...prev, terms: false }));
    showToastMessage('You must accept the terms and conditions to create an account.', 'error');
  };

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate API call
      console.log('Form submitted:', formData);
      showToastMessage('Your account has been created successfully!', 'success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        hospital: '',
        role: '',
        password: '',
        confirmPassword: '',
        terms: false
      });
      setTermsAccepted(false);
      setIsTermsExpanded(true);
      
      // In a real app, you would redirect to login or dashboard
      // setTimeout(() => navigate('/signin'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white mt-16">
      {/* Page Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Create Your Account
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join 50+ healthcare facilities using DCM Hospital Management
          </p>
        </div>
      </section>

      {/* Signup Form */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Started</h2>
              <p className="text-gray-600">Create your DCM Hospital Management account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Dr. John Smith"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your.email@hospital.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Hospital Name */}
              <div>
                <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital/Clinic Name
                </label>
                <input
                  type="text"
                  id="hospital"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.hospital ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="City Hospital"
                />
                {errors.hospital && (
                  <p className="mt-1 text-sm text-red-600">{errors.hospital}</p>
                )}
              </div>

              {/* Role */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.role ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select your role</option>
                  <option value="administrator">Hospital Administrator</option>
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse</option>
                  <option value="staff">Hospital Staff</option>
                  <option value="other">Other</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Create a strong password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms Accepted Confirmation */}
              {termsAccepted && (
                <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">You have accepted our Terms & Conditions</span>
                </div>
              )}

              {/* Enhanced Terms & Conditions */}
              <div className={`bg-gray-50 border border-gray-200 rounded-lg transition-all duration-300 ${
                !isTermsExpanded ? 'max-h-20 overflow-hidden' : ''
              }`}>
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">Terms & Conditions</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsTermsExpanded(!isTermsExpanded)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {isTermsExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {isTermsExpanded && (
                  <div className="p-4 space-y-4">
                    <div className="max-h-48 overflow-y-auto text-sm text-gray-600 space-y-3 p-3 bg-white border border-gray-200 rounded-lg">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-1">1. Acceptance of Terms</h5>
                        <p>By creating an account with DCM Hospital Management, you agree to be bound by these Terms of Service and our Privacy Policy.</p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-1">2. Account Registration</h5>
                        <p>You must provide accurate and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials.</p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-1">3. Data Privacy & HIPAA Compliance</h5>
                        <p>We are committed to protecting patient data in compliance with HIPAA regulations. You agree to:</p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>Maintain confidentiality of patient information</li>
                          <li>Use secure authentication methods</li>
                          <li>Report any security breaches immediately</li>
                          <li>Follow data retention and disposal policies</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-1">4. Service Usage</h5>
                        <p>You agree to use our services only for lawful purposes and in accordance with healthcare regulations applicable to your jurisdiction.</p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-1">5. Termination</h5>
                        <p>We reserve the right to suspend or terminate accounts that violate these terms or pose security risks to our platform.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleInputChange}
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-700">
                        I have read and agree to the{' '}
                        <Link to="/terms-of-service" className="text-blue-600 hover:text-blue-700 font-medium">
                          Terms of Service
                        </Link>
                        ,{' '}
                        <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-700 font-medium">
                          Privacy Policy
                        </Link>
                        , and{' '}
                        <Link to="/hipaa-compliance" className="text-blue-600 hover:text-blue-700 font-medium">
                          HIPAA Compliance
                        </Link>{' '}
                        requirements
                      </label>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={handleAcceptTerms}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium"
                      >
                        <Check className="w-4 h-4" />
                        Accept All
                      </button>
                      <button
                        type="button"
                        onClick={handleDeclineTerms}
                        className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 font-medium"
                      >
                        <X className="w-4 h-4" />
                        Decline
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!formData.terms}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">Or sign up with</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 font-medium">
                <Github className="w-5 h-5" />
                GitHub
              </button>
              <button className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 font-medium">
                <Mail className="w-5 h-5" />
                Google
              </button>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/signin" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      
      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed bottom-8 right-8 bg-gray-900 text-white p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
          showToast ? 'animate-in slide-in-from-bottom-full' : 'animate-out slide-out-to-bottom-full'
        }`}>
          <div className="font-semibold mb-1">
            {toastType === 'success' ? 'Success!' : 'Action Required'}
          </div>
          <div className="text-sm text-gray-300">{toastMessage}</div>
        </div>
      )}
    </div>
  );
};

export default Signup;