import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Activity, Menu } from 'lucide-react'

export default function Header(){
  const [open, setOpen] = useState(false)
  const linkCls = ({isActive}) =>
    'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ' + 
    (isActive ? 'text-blue-600 bg-blue-50 border border-blue-200' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50')

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      {/* Main Navigation Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="inline-flex items-center gap-3 font-bold text-gray-900 group">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white grid place-items-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Activity size={20} />
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-lg tracking-tight">DCM Hospital</span>
                <span className="text-xs text-gray-500 font-normal hidden sm:block">Management System</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-8">
            <div className="flex items-center gap-1">
              <NavLink to="/" className={linkCls} end>Home</NavLink>
              <NavLink to="/features" className={linkCls}>Features</NavLink>
              <NavLink to="/solutions" className={linkCls}>Solutions</NavLink>
              <NavLink to="/pricing" className={linkCls}>Pricing</NavLink>
              <NavLink to="/contact" className={linkCls}>Contact</NavLink>
            </div>
          </nav>

          {/* Desktop CTA Buttons - Right Aligned */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Link to="/login" className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-gray-100 transition-all duration-200 border border-transparent hover:border-gray-200">
              Sign In
            </Link>
            <Link to="/contact" className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-blue-600">
              Request Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link to="/contact" className="lg:hidden px-3 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              Demo
            </Link>
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
              onClick={() => setOpen(!open)} 
              aria-label="Toggle menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {open && (
        <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            {/* Mobile Navigation Links */}
            <nav className="space-y-2 mb-4">
              <NavLink 
                to="/" 
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg border-l-4 border-transparent transition-colors"
                onClick={() => setOpen(false)}
                end
              >
                Home
              </NavLink>
              <NavLink 
                to="/features" 
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg border-l-4 border-transparent transition-colors"
                onClick={() => setOpen(false)}
              >
                Features
              </NavLink>
              <NavLink 
                to="/solutions" 
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg border-l-4 border-transparent transition-colors"
                onClick={() => setOpen(false)}
              >
                Solutions
              </NavLink>
              <NavLink 
                to="/pricing" 
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg border-l-4 border-transparent transition-colors"
                onClick={() => setOpen(false)}
              >
                Pricing
              </NavLink>
              <NavLink 
                to="/contact" 
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg border-l-4 border-transparent transition-colors"
                onClick={() => setOpen(false)}
              >
                Contact
              </NavLink>
            </nav>
            
            {/* Mobile CTA Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Link 
                to="/login" 
                className="flex-1 px-4 py-3 text-center text-base font-medium text-gray-700 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200 border border-gray-200"
                onClick={() => setOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/contact" 
                className="flex-1 px-4 py-3 text-center text-base font-medium text-white rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-lg"
                onClick={() => setOpen(false)}
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}