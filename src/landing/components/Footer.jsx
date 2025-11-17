import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-semibold text-white mb-4">
              <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center">
                <Activity size={16} />
              </div>
              <span className="text-lg">DCM Hospital</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Modern, secure, and scalable hospital management system trusted by healthcare professionals worldwide.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@dcmhospital.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91 1800-123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/solutions" className="text-gray-400 hover:text-white transition-colors">Solutions</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© 2024 DCM Hospital Management. All rights reserved.</p>
          <div className="flex gap-3 mt-4 md:mt-0">
            <a href="#" className="w-8 h-8 rounded bg-gray-800 hover:bg-blue-600 transition-colors flex items-center justify-center">
              <Facebook size={16} />
            </a>
            <a href="#" className="w-8 h-8 rounded bg-gray-800 hover:bg-blue-600 transition-colors flex items-center justify-center">
              <Twitter size={16} />
            </a>
            <a href="#" className="w-8 h-8 rounded bg-gray-800 hover:bg-blue-600 transition-colors flex items-center justify-center">
              <Linkedin size={16} />
            </a>
            <a href="#" className="w-8 h-8 rounded bg-gray-800 hover:bg-blue-600 transition-colors flex items-center justify-center">
              <Instagram size={16} />
            </a>
            <a href="#" className="w-8 h-8 rounded bg-gray-800 hover:bg-blue-600 transition-colors flex items-center justify-center">
              <Youtube size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}