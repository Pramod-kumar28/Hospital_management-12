import React, { useState } from 'react';
import { Shield, FileText, Lock, AlertCircle, CheckCircle, Clock, Building2, Users, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  const [openSections, setOpenSections] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false
  });

  const toggleSection = (id) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white mt-4">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6 backdrop-blur-sm">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Last updated: December 15, 2024 • Effective for all DCM Hospital Management System users
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Quick Navigation
              </h3>
              <nav className="space-y-2">
                {[
                  { id: 1, title: "Acceptance of Terms" },
                  { id: 2, title: "Service Description" },
                  { id: 3, title: "User Responsibilities" },
                  { id: 4, title: "Data & Privacy" },
                  { id: 5, title: "Subscription & Payments" },
                  { id: 6, title: "HIPAA Compliance" },
                  { id: 7, title: "Intellectual Property" },
                  { id: 8, title: "Limitation of Liability" },
                  { id: 9, title: "Termination" },
                  { id: 10, title: "Governing Law" },
                  { id: 11, title: "Changes to Terms" },
                  { id: 12, title: "Contact Information" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      document.getElementById(`section-${item.id}`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="block w-full text-left text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                  >
                    {item.id}. {item.title}
                  </button>
                ))}
              </nav>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">Reading time: 8-10 min</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">12 sections, 3,500 words</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Terms Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Introduction */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to DCM Hospital Management System</h2>
                  <p className="text-gray-600">
                    These Terms of Service govern your use of our hospital management platform, services, 
                    and applications. By accessing or using our services, you agree to be bound by these terms.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Important Notice</h4>
                    <p className="text-blue-800 text-sm">
                      These terms include critical provisions about data handling, HIPAA compliance, 
                      liability limitations, and dispute resolution. Please read them carefully.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms Sections */}
            <div className="space-y-4">
              {/* Section 1 */}
              <div id="section-1" className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSection(1)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-blue-700">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Acceptance of Terms</h3>
                      <p className="text-gray-500 text-sm">Agreement to terms and conditions</p>
                    </div>
                  </div>
                  {openSections[1] ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                
                {openSections[1] && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                    <div className="prose prose-blue max-w-none">
                      <p className="text-gray-600 mb-4">
                        By accessing or using the DCM Hospital Management System ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
                      </p>
                      
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Key Points:</h4>
                        <ul className="text-gray-600 space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>Terms apply to all users including hospitals, clinics, and healthcare providers</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>Continuing to use the Service constitutes acceptance of any modifications</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>You must have authority to agree on behalf of your organization</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 2 - Data & Privacy */}
              <div id="section-4" className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSection(4)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Lock className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Data Security & Privacy</h3>
                      <p className="text-gray-500 text-sm">HIPAA compliance and data protection</p>
                    </div>
                  </div>
                  {openSections[4] ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                
                {openSections[4] && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                    <div className="prose prose-blue max-w-none">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-5 mb-4">
                        <div className="flex items-start gap-3">
                          <Shield className="w-6 h-6 text-green-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-green-900 mb-2">HIPAA & GDPR Compliant</h4>
                            <p className="text-green-800">
                              We maintain strict compliance with HIPAA, GDPR, and other applicable data protection regulations for healthcare data.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-blue-900 mb-2">Data We Process</h5>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Patient medical records and history</li>
                            <li>• Treatment plans and prescriptions</li>
                            <li>• Billing and insurance information</li>
                            <li>• Staff credentials and access logs</li>
                          </ul>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-green-900 mb-2">Security Measures</h5>
                          <ul className="text-sm text-green-800 space-y-1">
                            <li>• End-to-end encryption</li>
                            <li>• Role-based access control</li>
                            <li>• Regular security audits</li>
                            <li>• 99.9% data backup guarantee</li>
                          </ul>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        <p className="mb-3">
                          <strong>Data Ownership:</strong> Healthcare providers retain ownership of all patient data. We act as a data processor under applicable regulations.
                        </p>
                        <p className="mb-3">
                          <strong>Breach Notification:</strong> In the event of a data breach, we will notify affected parties within 72 hours as required by law.
                        </p>
                        <p>
                          <strong>Data Retention:</strong> We retain data as required by healthcare regulations and your subscription terms, with minimum 7-year retention for medical records.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 3 - Subscription */}
              <div id="section-5" className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSection(5)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-purple-700">$</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Subscription & Payments</h3>
                      <p className="text-gray-500 text-sm">Billing, plans, and cancellation</p>
                    </div>
                  </div>
                  {openSections[5] ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                
                {openSections[5] && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                    <div className="prose prose-blue max-w-none">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan Type</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billing Cycle</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Terms</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cancellation</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3 text-sm text-gray-900">Monthly</td>
                              <td className="px-4 py-3 text-sm text-gray-600">Billed monthly in advance</td>
                              <td className="px-4 py-3 text-sm text-gray-600">Credit card, net 30 terms</td>
                              <td className="px-4 py-3 text-sm text-gray-600">30-day notice</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm text-gray-900">Annual</td>
                              <td className="px-4 py-3 text-sm text-gray-600">Billed annually, save 20%</td>
                              <td className="px-4 py-3 text-sm text-gray-600">Invoice payment</td>
                              <td className="px-4 py-3 text-sm text-gray-600">60-day notice</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm text-gray-900">Enterprise</td>
                              <td className="px-4 py-3 text-sm text-gray-600">Custom billing</td>
                              <td className="px-4 py-3 text-sm text-gray-600">Negotiated terms</td>
                              <td className="px-4 py-3 text-sm text-gray-600">90-day notice</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-semibold text-yellow-900 mb-1">Important Payment Terms</h5>
                            <ul className="text-sm text-yellow-800 space-y-1">
                              <li>• All prices are exclusive of applicable taxes</li>
                              <li>• Late payments may incur 1.5% monthly interest</li>
                              <li>• Service may be suspended for non-payment after 60 days</li>
                              <li>• Refunds only available within first 30 days of subscription</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 4 - Liability */}
              <div id="section-8" className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSection(8)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-red-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Limitation of Liability</h3>
                      <p className="text-gray-500 text-sm">Important limitations and disclaimers</p>
                    </div>
                  </div>
                  {openSections[8] ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                
                {openSections[8] && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                    <div className="prose prose-blue max-w-none">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-5 mb-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-6 h-6 text-red-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-red-900 mb-2">Important Legal Notice</h4>
                            <p className="text-red-800">
                              To the maximum extent permitted by law, our liability is limited as described below.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 text-gray-600">
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Service Limitations</h5>
                          <p>
                            The DCM Hospital Management System is a software tool to assist healthcare operations. 
                            It does not replace professional medical judgment, diagnosis, or treatment.
                          </p>
                        </div>

                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Liability Cap</h5>
                          <p>
                            Our total liability for any claim shall not exceed the total amount paid by you for 
                            the Service during the 12 months preceding the claim.
                          </p>
                        </div>

                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Exclusions</h5>
                          <p>
                            We are not liable for indirect, incidental, special, consequential, or punitive damages, 
                            including but not limited to lost profits, data loss, or business interruption.
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Note:</strong> Some jurisdictions do not allow limitations on implied warranties or 
                          the exclusion or limitation of certain damages. If these laws apply to you, some or all 
                          of the above disclaimers, exclusions, or limitations may not apply.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Acceptance Footer */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Acknowledgement</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                By using the DCM Hospital Management System, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms of Service.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link 
                  to="/privacy" 
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Privacy Policy
                </Link>
                <span className="hidden sm:inline text-gray-400">•</span>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Contact Legal Department
                </Link>
                <span className="hidden sm:inline text-gray-400">•</span>
                <Link 
                  to="/faq" 
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Read FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p className="mb-2">
              DCM Hospital Management System • Terms of Service Version 3.2 • Effective December 15, 2024
            </p>
            <p>
              For questions about these terms, please contact our legal department at{' '}
              <a href="mailto:legal@dcmhealthcare.com" className="text-blue-600 hover:text-blue-700">
                legal@dcmhealthcare.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;