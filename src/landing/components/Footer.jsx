import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition duration-300"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <div className="px-6 py-4 overflow-y-auto max-h-[calc(80vh-59px)]">
          {children}
        </div>
        <div className="border-t border-gray-200 px-6 py-2 bg-gray-50">
          <button
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null)

  const openModal = (modalName) => setActiveModal(modalName)
  const closeModal = () => setActiveModal(null)

  return (
    <>
      <footer className="navy-blue bg-navy-blue text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-6">
                <div className="h-12 w-22 shadow-lg overflow-hidden mr-3"> {/* Increased width from w-19 to w-22 */}
                  <img
                    src="./assets/images/DCM-Logo.png"
                    alt="Logo"
                    className="h-12 w-20" 
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold"><span className='text-white-500'>Hospital Management system</span></h2>
                </div>
              </div>
              <p className="text-gray-300 mb-6 text-sm">
                Transforming healthcare delivery through innovative technology solutions. Trusted by hospitals across Hyderabad and beyond.
              </p>
              <div className="flex space-x-4">
                <Link to="#" className="light-navy hover:bg-blue-700 h-10 w-10 rounded-full flex items-center justify-center transition duration-300">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to="#" className="light-navy hover:bg-blue-700 h-10 w-10 rounded-full flex items-center justify-center transition duration-300">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link to="#" className="light-navy hover:bg-blue-700 h-10 w-10 rounded-full flex items-center justify-center transition duration-300">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
                <Link to="#" className="light-navy hover:bg-blue-700 h-10 w-10 rounded-full flex items-center justify-center transition duration-300">
                  <i className="fab fa-instagram"></i>
                </Link>
              </div>
            </div>
           
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 lg:text-left sm:text-left">Quick Links</h3>
              <ul className="space-y-3 text-sm lg:text-left sm:text-left">
                <li><Link to="/" className="text-gray-300 hover:text-white-500 transition duration-300">Home</Link></li>
                <li><Link to="/features" className="text-gray-300 hover:text-white-500 transition duration-300">Features</Link></li>
                <li><Link to="/solutions" className="text-gray-300 hover:text-white-500 transition duration-300">Solutions</Link></li>
                <li><Link to="/pricing" className="text-gray-300 hover:text-white-500 transition duration-300">Pricing</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white-500 transition duration-300">Contact</Link></li>
              </ul>
            </div>
           
            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Our Services</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="#" className="text-gray-300 hover:text-white-500 transition duration-300">Pharmacy Management</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white-500 transition duration-300">Laboratory (LIMS)</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white-500 transition duration-300">Telemedicine</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white-500 transition duration-300">Doctor Portal</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white-500 transition duration-300">Billing & Accounts</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white-500 transition duration-300">Hyderabad, India</Link></li>
              </ul>
            </div>  
           
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Connect</h3>
              <div className="space-y-3 mb-4 text-sm">
                <div className="flex items-start space-x-3">
                  <i className="fas fa-map-marker-alt text-white-500 mt-1" />
                  <span className="text-gray-300">
                    Office #407 & 409 4th Floor, Jain Sadguru Image's Capital Park, Madhapur, Hyderabad
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-phone text-white-500" />
                  <span className="text-gray-300">+91 1800 123 4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-envelope text-white-500" />
                  <span className="text-gray-300">info@dcmhospital.com</span>
                </div>
              </div>
            </div>
          </div>
         
          {/* Footer Bottom */}
          <div className="border-t border-blue-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                &copy; 2025 DCM Hospital Management. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm">
                &copy; Developed by <a href="https://designcareermetrics.com/" className="hover:text-amber-500 transition duration-300">Designcareermetrics</a>
              </p>
              <div className="flex space-x-6 text-sm">
                <Link 
                  to="/privacy"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link 
                  to="/terms"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Terms of Service
                </Link>
                <Link 
                  to="/contact"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Sitemap Modal - Removed legal sections since you have separate pages */}
      <Modal isOpen={activeModal === 'sitemap'} onClose={closeModal} title="Website Sitemap">
        <div className="text-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800 border-b pb-2">Main Pages</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-amber-600 hover:text-amber-700 transition duration-300">Home</Link></li>
                <li><Link to="/features" className="text-amber-600 hover:text-amber-700 transition duration-300">Features</Link></li>
                <li><Link to="/solutions" className="text-amber-600 hover:text-amber-700 transition duration-300">Solutions</Link></li>
                <li><Link to="/pricing" className="text-amber-600 hover:text-amber-700 transition duration-300">Pricing</Link></li>
                <li><Link to="/contact" className="text-amber-600 hover:text-amber-700 transition duration-300">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800 border-b pb-2">Services</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-amber-600 hover:text-amber-700 transition duration-300">Pharmacy Management</Link></li>
                <li><Link to="#" className="text-amber-600 hover:text-amber-700 transition duration-300">Laboratory (LIMS)</Link></li>
                <li><Link to="#" className="text-amber-600 hover:text-amber-700 transition duration-300">Telemedicine</Link></li>
                <li><Link to="#" className="text-amber-600 hover:text-amber-700 transition duration-300">Doctor Portal</Link></li>
                <li><Link to="#" className="text-amber-600 hover:text-amber-700 transition duration-300">Billing & Accounts</Link></li>
              </ul>
            </div>
{/* 
            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800 border-b pb-2">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-amber-600 hover:text-amber-700 transition duration-300">About Us</Link></li>
                <li><Link to="/careers" className="text-amber-600 hover:text-amber-700 transition duration-300">Careers</Link></li>
                <li><Link to="/blog" className="text-amber-600 hover:text-amber-700 transition duration-300">Blog</Link></li>
                <li><Link to="/testimonials" className="text-amber-600 hover:text-amber-700 transition duration-300">Testimonials</Link></li>
              </ul>
            </div> */}
{/* 
            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800 border-b pb-2">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-amber-600 hover:text-amber-700 transition duration-300">FAQ</Link></li>
                <li><Link to="/support" className="text-amber-600 hover:text-amber-700 transition duration-300">Support Center</Link></li>
                <li><Link to="/documentation" className="text-amber-600 hover:text-amber-700 transition duration-300">Documentation</Link></li>
                <li><Link to="/api-docs" className="text-amber-600 hover:text-amber-700 transition duration-300">API Documentation</Link></li>
              </ul>
            </div> */}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Footer