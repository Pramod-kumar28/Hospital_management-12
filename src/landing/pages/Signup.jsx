import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UserPlus, Mail, Lock, Building2, User, ShieldCheck,
  Eye, EyeOff, CheckCircle, X, ChevronDown, ChevronUp,
  Phone, MapPin, Globe, Users, Award, Check, Zap, Activity,
  Shield, Clock, Star
} from 'lucide-react';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    hospitalName: '',
    hospitalType: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    password: '',
    confirmPassword: '',
    terms: false,
    newsletter: true
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTermsExpanded, setIsTermsExpanded] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const hospitalTypes = [
    'General Hospital',
    'Specialty Hospital',
    'Clinic',
    'Diagnostic Center',
    'Surgical Center',
    'Rehabilitation Center',
    'Mental Health Facility',
    'Research Hospital'
  ];

  const countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'India',
    'Germany',
    'France',
    'Japan',
    'Other'
  ];

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Hospital validation
    if (!formData.hospitalName.trim()) {
      newErrors.hospitalName = 'Hospital/Clinic name is required';
    }

    if (!formData.hospitalType) {
      newErrors.hospitalType = 'Please select hospital type';
    }

    // Contact validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State/Province is required';
    }

    if (!formData.country) {
      newErrors.country = 'Country is required';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
      newErrors.password = 'Include uppercase, lowercase, number & special character';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAcceptTerms = () => {
    setFormData(prev => ({ ...prev, terms: true }));
    setTermsAccepted(true);
    setIsTermsExpanded(false);
  };

  const handleDeclineTerms = () => {
    setFormData(prev => ({ ...prev, terms: false }));
    setTermsAccepted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Healthcare institution registration:', formData);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Auto redirect after success
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }, 2000);
  };

  return (
    <>
      {/* Header Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-cyan-50 border-b border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-6">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
              Healthcare Institution Registration
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Register your healthcare facility to access the complete DCM Hospital Management Suite
            </p>
          </div>
        </div>
      </section>

      {/* Main Form */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8 h-fit">
              {showSuccess ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Registration Successful!</h2>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Thank you for registering your healthcare institution with DCM HMS.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
                    <p className="text-sm text-blue-700">
                      Our team will review your registration and contact you within 24 hours to complete the setup process.
                    </p>
                  </div>
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Go to Login
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <User className="w-6 h-6 text-blue-600" />
                        <span>Primary Contact Information</span>
                      </div>
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="John"
                        />
                        {errors.firstName && (
                          <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Smith"
                        />
                        {errors.lastName && (
                          <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                              errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="contact@hospital.com"
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                              errors.phone ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="+91 9876543210"
                          />
                        </div>
                        {errors.phone && (
                          <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Institution Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-6 h-6 text-blue-600" />
                        <span>Healthcare Institution Details</span>
                      </div>
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Institution Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building2 className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="hospitalName"
                            value={formData.hospitalName}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                              errors.hospitalName ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="City General Hospital & Research Center"
                          />
                        </div>
                        {errors.hospitalName && (
                          <p className="mt-2 text-sm text-red-600">{errors.hospitalName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Institution Type *
                        </label>
                        <select
                          name="hospitalType"
                          value={formData.hospitalType}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.hospitalType ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select institution type</option>
                          {hospitalTypes.map((type, index) => (
                            <option key={index} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        {errors.hospitalType && (
                          <p className="mt-2 text-sm text-red-600">{errors.hospitalType}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                              errors.address ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="123 Medical Center Drive"
                          />
                        </div>
                        {errors.address && (
                          <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                        )}
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                              errors.city ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Hyderabad"
                          />
                          {errors.city && (
                            <p className="mt-2 text-sm text-red-600">{errors.city}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State/Province *
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                              errors.state ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Telangana"
                          />
                          {errors.state && (
                            <p className="mt-2 text-sm text-red-600">{errors.state}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country *
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Globe className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                errors.country ? 'border-red-500' : 'border-gray-300'
                              }`}
                            >
                              <option value="">Select country</option>
                              {countries.map((country, index) => (
                                <option key={index} value={country}>
                                  {country}
                                </option>
                              ))}
                            </select>
                          </div>
                          {errors.country && (
                            <p className="mt-2 text-sm text-red-600">{errors.country}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-6 h-6 text-blue-600" />
                        <span>Account Security</span>
                      </div>
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Password *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                              errors.password ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Create a secure password"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                        )}
                        <div className="mt-2 text-xs text-gray-500">
                          Minimum 8 characters with uppercase, lowercase, number, and special character
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm Password *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Re-enter your password"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            )}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="border border-gray-200 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setIsTermsExpanded(!isTermsExpanded)}
                      className="w-full flex items-center justify-between p-6 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-blue-600" />
                        <div className="text-left">
                          <p className="font-medium text-gray-900">Terms & Conditions</p>
                          <p className="text-sm text-gray-500">
                            Read and accept our terms to continue
                          </p>
                        </div>
                      </div>
                      {isTermsExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>

                    {isTermsExpanded && (
                      <div className="px-6 pb-6 border-t border-gray-200">
                        <div className="mt-6 space-y-4 text-sm text-gray-600">
                          <p>
                            By registering, you agree that all information provided is accurate and that you 
                            are authorized to represent the healthcare institution listed.
                          </p>
                          <p>
                            DCM HMS is HIPAA compliant and meets all healthcare data security standards.
                            You agree to maintain confidentiality and report any security incidents.
                          </p>
                          <p>
                            This registration is for healthcare institutions only. Personal patient 
                            registrations are handled separately through patient portals.
                          </p>
                        </div>

                        <div className="mt-6 flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            checked={formData.terms}
                            onChange={handleInputChange}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="terms" className="text-sm text-gray-700">
                            I agree to the Terms of Service, Privacy Policy, and HIPAA compliance requirements
                          </label>
                        </div>

                        {errors.terms && (
                          <p className="mt-2 text-sm text-red-600">{errors.terms}</p>
                        )}

                        <div className="mt-6 grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={handleAcceptTerms}
                            className="flex items-center justify-center gap-3 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium transition-colors"
                          >
                            <Check className="w-4 h-4" />
                            Accept All Terms
                          </button>
                          <button
                            type="button"
                            onClick={handleDeclineTerms}
                            className="flex items-center justify-center gap-3 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                          >
                            <X className="w-4 h-4" />
                            Decline
                          </button>
                        </div>

                        <div className="mt-6 flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="newsletter"
                            name="newsletter"
                            checked={formData.newsletter}
                            onChange={handleInputChange}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="newsletter" className="text-sm text-gray-700">
                            Subscribe to receive updates about new features, security updates, and healthcare best practices
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Terms Accepted Confirmation */}
                  {termsAccepted && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Terms Accepted</p>
                        <p className="text-sm text-green-700">You may proceed with registration</p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.terms}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Processing Registration...
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-5 h-5" />
                          Register Healthcare Institution
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Already have account */}
              {!showSuccess && (
                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                  <p className="text-gray-600">
                    Already have an institution account?{' '}
                    <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                      Sign in here
                    </Link>
                  </p>
                </div>
              )}
            </div>

            {/* Right Column - Benefits */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8 h-fit">
              <div className="space-y-8">
                {/* Welcome Card */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Trusted by Healthcare Leaders</h3>
                      <p className="text-blue-200 text-sm mt-1">Enterprise-grade solution for modern healthcare</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">500+</div>
                      <div className="text-blue-200 text-sm">Healthcare Facilities</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">99.9%</div>
                      <div className="text-blue-200 text-sm">Uptime SLA</div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Complete Hospital Management Suite</h3>
                  
                  <div className="space-y-4">
                    {[
                      { icon: Zap, title: "Streamlined Workflows", description: "Reduce administrative tasks by 60% with automated processes" },
                      { icon: Shield, title: "HIPAA Compliant", description: "End-to-end encryption and secure data management" },
                      { icon: Users, title: "Multi-Department Support", description: "Seamless coordination between departments" },
                      { icon: Activity, title: "Real-time Analytics", description: "Data-driven insights for better decision making" },
                      { icon: Clock, title: "24/7 Support", description: "Dedicated healthcare support specialists" },
                      { icon: Star, title: "Proven Results", description: "Improve patient satisfaction scores by 40%" },
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{feature.title}</h4>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                      DJ
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Dr. James Wilson</div>
                      <div className="text-sm text-gray-600">Chief Medical Officer, City Hospital</div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "DCM HMS transformed our hospital operations. Patient care coordination improved dramatically while reducing administrative workload."
                  </p>
                  <div className="mt-4 flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>

                {/* Security Badge */}
                <div className="border border-green-200 bg-green-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                    <div className="font-semibold text-green-800">Enterprise Security</div>
                  </div>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      HIPAA & GDPR Compliant
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      End-to-end Encryption
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Regular Security Audits
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Data Backup & Recovery
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupPage;