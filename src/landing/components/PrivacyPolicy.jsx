import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Building2,
  Users,
  Database,
  Mail,
  Phone,
  Calendar,
  Heart,
  Stethoscope,
  Pill,
  Microscope,
  FileCheck,
  UserCheck,
  Globe,
  Key,
  Server,
  Clock,
  Download,
  Printer,
  MapPin,
  ArrowRight
} from 'lucide-react'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mt-10">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        {/* Medical Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50 L85 15 L50 50 L15 15 Z' fill='%23ffffff'/%3E%3Cpath d='M50 50 L85 85 L50 50 L15 85 Z' fill='%23ffffff'/%3E%3Cpath d='M50 50 L15 15 L50 50 L85 85 Z' fill='%23ffffff'/%3E%3Cpath d='M50 50 L15 85 L50 50 L85 15 Z' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundSize: '150px'
          }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl">
                <Shield size={36} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3">
                  Privacy Policy
                </h1>
                <p className="text-blue-200 text-xl">
                  DCM Hospital Management System
                </p>
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 mb-6">
                <Calendar className="text-blue-200" />
                <span className="text-blue-200 font-medium">Effective Date: December 15, 2024</span>
              </div>
              <p className="text-blue-100 text-lg leading-relaxed">
                This Privacy Policy outlines our commitment to protecting your personal health information 
                in accordance with global healthcare regulations including HIPAA, GDPR, and applicable 
                Indian data protection laws.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction Section */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-12 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Introduction</h2>
              <p className="text-gray-600 mt-2">Our commitment to your privacy and data security</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              At DCM Hospital Management System, we understand the sensitivity of healthcare information 
              and are committed to maintaining the highest standards of data protection. This Privacy Policy 
              describes how we collect, use, disclose, and safeguard your personal health information 
              when you use our hospital management platform and related services.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-3">
                  <Building2 className="text-blue-600" />
                  Scope of Application
                </h3>
                <p className="text-gray-700">
                  This policy applies to all personal health information collected, processed, or stored 
                  by our system across all healthcare facilities using our platform, including hospitals, 
                  clinics, diagnostic centers, and telemedicine services.
                </p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-3">
                  <Heart className="text-green-600" />
                  Our Pledge to You
                </h3>
                <p className="text-gray-700">
                  We pledge to handle your health information with utmost care, implement robust security 
                  measures, and maintain transparency in our data practices while complying with all 
                  applicable healthcare regulations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Information Collection Section */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-12 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Information We Collect</h2>
              <p className="text-gray-600 mt-2">Types of data collected for healthcare services</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              To provide comprehensive healthcare services, we collect various types of information. 
              We follow the principle of data minimization, collecting only what is necessary for 
              your care and treatment. Below are the categories of information we collect:
            </p>

            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users size={24} className="text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Patient Personal Information</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  We collect basic personal details necessary for patient identification and communication:
                </p>
                <ul className="grid md:grid-cols-2 gap-3">
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-blue-600" />
                    <span>Full name, date of birth, and gender</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-blue-600" />
                    <span>Contact information (phone, email, address)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-blue-600" />
                    <span>Government identification numbers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-blue-600" />
                    <span>Emergency contact details</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-blue-600" />
                    <span>Insurance and payment information</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Stethoscope size={24} className="text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Medical & Health Information</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Comprehensive health records essential for diagnosis, treatment, and care continuity:
                </p>
                <ul className="grid md:grid-cols-2 gap-3">
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-red-600" />
                    <span>Medical history and current health status</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-red-600" />
                    <span>Diagnosis and treatment records</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-red-600" />
                    <span>Prescription and medication history</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-red-600" />
                    <span>Laboratory test results</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-red-600" />
                    <span>Imaging and diagnostic reports</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 mb-2">Sensitive Health Information</h4>
                    <p className="text-gray-700">
                      We handle sensitive health information with enhanced protection measures, including 
                      genetic data, biometric data, mental health information, sexual health records, 
                      and substance abuse treatment information. These categories receive additional 
                      security safeguards under our protocols.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How We Use Information Section */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-12 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">How We Use Your Information</h2>
              <p className="text-gray-600 mt-2">Purposes for processing your health data</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Your health information is used exclusively for legitimate healthcare purposes and system 
              operations. We process your data based on legal bases including consent, contractual necessity, 
              legal obligations, and vital interests in emergency situations.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="font-bold text-xl text-gray-800 mb-4">Primary Healthcare Purposes</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-purple-600 mt-1 flex-shrink-0" />
                    <span>Providing medical diagnosis and treatment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-purple-600 mt-1 flex-shrink-0" />
                    <span>Managing patient care and treatment plans</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-purple-600 mt-1 flex-shrink-0" />
                    <span>Coordinating with healthcare providers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-purple-600 mt-1 flex-shrink-0" />
                    <span>Processing insurance claims and billing</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="font-bold text-xl text-gray-800 mb-4">Operational & Legal Purposes</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                    <span>Maintaining medical records as required by law</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                    <span>Quality improvement and research (anonymized)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                    <span>System security and fraud prevention</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                    <span>Compliance with legal and regulatory requirements</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-gray-800 mb-4">Consent Management</h4>
              <p className="text-gray-700">
                For non-essential processing purposes, we obtain explicit consent through our patient 
                consent management system. You have the right to withdraw consent at any time, and we 
                provide easy mechanisms for doing so through our patient portal or by contacting our 
                Data Protection Officer.
              </p>
            </div>
          </div>
        </section>

        {/* Data Security Section */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-12 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Data Security Measures</h2>
              <p className="text-gray-600 mt-2">Our multi-layered approach to protecting your data</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="inline-flex p-4 bg-blue-100 rounded-xl mb-4">
                  <Lock size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Encryption & Security</h3>
                <p className="text-gray-700">
                  All health data is encrypted using AES-256 encryption at rest and TLS 1.3 for data 
                  in transit. We implement end-to-end encryption for sensitive communications.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex p-4 bg-green-100 rounded-xl mb-4">
                  <Server size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Secure Infrastructure</h3>
                <p className="text-gray-700">
                  Our systems are hosted on SOC 2 Type II certified infrastructure with regular 
                  security audits, penetration testing, and 24/7 monitoring.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex p-4 bg-purple-100 rounded-xl mb-4">
                  <Users size={32} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Access Controls</h3>
                <p className="text-gray-700">
                  Strict role-based access controls, multi-factor authentication, and comprehensive 
                  audit trails ensure only authorized personnel access patient information.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl p-8">
              <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                <div className="p-4 bg-white/10 rounded-xl">
                  <Shield size={32} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Security Incident Response</h3>
                  <p className="text-gray-300">
                    Our 24/7 security operations center monitors for potential threats and implements 
                    immediate response protocols in case of any security incident.
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg text-blue-300 mb-3">Prevention & Detection</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      Real-time threat monitoring and detection
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      Regular vulnerability assessments
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      Automated security alert system
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-blue-300 mb-3">Response Protocol</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      Immediate incident containment
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      Regulatory notification procedures
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      Patient notification and support
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Your Rights Section */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-12 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Your Rights & Choices</h2>
              <p className="text-gray-600 mt-2">Control over your personal health information</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              As a patient, you have specific rights regarding your personal health information. 
              We provide mechanisms to exercise these rights easily and promptly.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Eye size={20} className="text-blue-600" />
                  <h4 className="font-bold text-lg text-gray-800">Right to Access</h4>
                </div>
                <p className="text-gray-700">
                  You have the right to access and obtain copies of your health information, 
                  including medical records, test results, and treatment history.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText size={20} className="text-green-600" />
                  <h4 className="font-bold text-lg text-gray-800">Right to Correction</h4>
                </div>
                <p className="text-gray-700">
                  You may request corrections to inaccurate or incomplete information in your 
                  health records through our patient portal or formal request process.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lock size={20} className="text-purple-600" />
                  <h4 className="font-bold text-lg text-gray-800">Right to Restrict</h4>
                </div>
                <p className="text-gray-700">
                  You can request restrictions on how we use or disclose your information, 
                  particularly for purposes unrelated to treatment or healthcare operations.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <h4 className="font-bold text-xl text-gray-800 mb-4">Exercising Your Rights</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-bold text-lg mb-3 text-gray-800">Submit Requests</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Mail size={16} className="text-blue-600 mt-1" />
                      <span>Email: privacy@dcmhospital.com</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Phone size={16} className="text-blue-600 mt-1" />
                      <span>Phone: 1-800-PRIVACY (1-800-774-8229)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText size={16} className="text-blue-600 mt-1" />
                      <span>Patient portal request form</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-lg mb-3 text-gray-800">Response Timeline</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Clock size={16} className="text-blue-600 mt-1" />
                      <span>Initial response within 48 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-blue-600 mt-1" />
                      <span>Complete request within 30 days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle size={16} className="text-blue-600 mt-1" />
                      <span>No fees for standard requests</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-12 bg-gradient-to-b from-red-500 to-pink-500 rounded-full"></div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Contact Information</h2>
              <p className="text-gray-600 mt-2">How to reach our Data Protection Team</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Data Protection Office</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Building2 className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 mb-2">Corporate Headquarters</h4>
                      <p className="text-gray-700">
                        DCM Hospital Management Systems<br />
                        Data Protection Office<br />
                        123 Medical Tower, Bandra Kurla Complex<br />
                        Mumbai, Maharashtra 400051<br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Mail className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 mb-2">Email Contacts</h4>
                      <p className="text-gray-700">
                        <strong>General Privacy Inquiries:</strong><br />
                        privacy@dcmhospital.com<br /><br />
                        <strong>Data Protection Officer:</strong><br />
                        dpo@dcmhospital.com<br /><br />
                        <strong>Security Incidents:</strong><br />
                        security@dcmhospital.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Phone className="text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 mb-2">Phone Support</h4>
                      <p className="text-gray-700">
                        <strong>Privacy Concerns:</strong> +91-22-6123-4567<br />
                        <strong>Toll-Free (India):</strong> 1-800-PRIVACY<br />
                        <strong>24/7 Emergency:</strong> +91-98-7654-3210
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Regional Support Centers</h3>
                
                <div className="space-y-4">
                  {[
                    { city: 'Delhi NCR', phone: '+91-11-4123-4567', address: 'Connaught Place, New Delhi' },
                    { city: 'Bangalore', phone: '+91-80-6123-4567', address: 'MG Road, Bengaluru' },
                    { city: 'Chennai', phone: '+91-44-6123-4567', address: 'T Nagar, Chennai' },
                    { city: 'Hyderabad', phone: '+91-40-6123-4567', address: 'Banjara Hills, Hyderabad' },
                    { city: 'Kolkata', phone: '+91-33-6123-4567', address: 'Park Street, Kolkata' },
                    { city: 'Ahmedabad', phone: '+91-79-6123-4567', address: 'CG Road, Ahmedabad' },
                  ].map((office, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-800">{office.city}</h4>
                        <span className="text-blue-600 font-medium">{office.phone}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{office.address}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Actions */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Additional Resources</h3>
              <p className="text-blue-100">
                Download complete documentation or request printed copies
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                <Download size={20} />
                Download PDF Version
              </button>
              <button className="flex items-center gap-2 bg-blue-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-900 transition-colors">
                <Printer size={20} />
                Request Printed Copy
              </button>
              <Link 
                to="/contact" 
                className="flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Contact Data Protection Officer
              </Link>
            </div>
          </div>
        </div>

        {/* Policy Information */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 bg-gray-100 px-8 py-4 rounded-full mb-4">
            <Calendar className="text-gray-600" />
            <div className="text-left">
              <p className="text-gray-700">
                <strong>Effective Date:</strong> December 15, 2024 | 
                <strong> Last Updated:</strong> December 15, 2024
              </p>
              <p className="text-gray-600 text-sm">
                Policy Version: 3.2.1 | Document ID: PP-2024-HMS-032
              </p>
            </div>
          </div>
          <p className="text-gray-600">
            This Privacy Policy is reviewed annually and updated as needed to reflect changes in 
            regulations or our practices. Significant changes will be communicated to all users.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy