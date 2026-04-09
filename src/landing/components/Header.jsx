

import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu } from 'lucide-react'

export default function Header(){
  const [open, setOpen] = useState(false)
  const linkCls = ({isActive}) =>
    'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ' + 
    (isActive ? 'text-blue-600 bg-blue-50 border border-blue-200' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50')

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      {/* Main Navigation Container */}
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[82px] items-center justify-between">
          {/* Logo Section - LEFT ALIGNED */}
          <div className="flex-shrink-0 flex items-center md:pl-6">
            <Link to="/" className="inline-flex items-center gap-3 font-bold text-gray-900 group">
              {/* LOGO IMAGE - LARGER SIZE */}
              <div className="h-14 w-14 md:h-16 md:w-16">
                <img 
                  src="./assets/images/Levitica.png" 
                  alt="Levitica Hospital Logo" 
                  className="h-14 w-auto object-contain md:h-16"
                /> 
              </div>
              <div className="hidden sm:flex items-center leading-none">
                <span className="whitespace-nowrap text-[15px] font-semibold md:text-[16px]">
                  <span className="text-slate-400 transition-colors duration-200 group-hover:text-slate-500">
                    Hospital
                  </span>{" "}
                  <span className="text-slate-700 transition-colors duration-200 group-hover:text-blue-600">
                    Management
                  </span>
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation + CTA Buttons - RIGHT ALIGNED */}
          <div className="ml-auto hidden items-center gap-2 lg:flex lg:pl-8">
            {/* Navigation Links */}
            <nav className="flex items-center gap-1">
              <NavLink to="/" className={linkCls} end>Home</NavLink>
              <NavLink to="/features" className={linkCls}>Features</NavLink>
              <NavLink to="/about" className={linkCls}>About</NavLink>
              <NavLink to="/pricing" className={linkCls}>Pricing</NavLink>
              <NavLink to="/contact" className={linkCls}>Contact</NavLink>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50 hover:text-[#005EB8] hover:shadow-[0_14px_28px_rgba(0,94,184,0.12)]"
                >
                  Patient Login
                </Link>
                <Link
                  to="/staff-login"
                  className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50/80 px-4 py-2.5 text-sm font-medium text-[#005EB8] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-100 hover:shadow-[0_10px_24px_rgba(0,94,184,0.12)]"
                >
                  Staff Login
                </Link>
              </div>
              <Link
                to="/request-demo"
                className="px-5 py-2.5 text-sm font-medium text-[#005EB8] bg-white rounded-lg hover:bg-blue-50 transition-all duration-200 border border-blue-200 hover:border-blue-300"
              >
                Request Demo
              </Link>
              <Link
                to="/download"
                className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-blue-600"
              >
                Download App
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button - RIGHT ALIGNED */}
          <div className="ml-auto flex items-center gap-2 lg:hidden">
            
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
          <div className="mx-auto max-w-[88rem] px-4 py-4 sm:px-6">
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
                to="/about" 
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg border-l-4 border-transparent transition-colors"
                onClick={() => setOpen(false)}
              >
                About
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
            <div className="flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:flex-wrap">
              <Link 
                to="/login" 
                className="flex-1 min-w-[140px] rounded-xl border border-slate-200 bg-white px-2 py-3 text-center text-base font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-sky-200 hover:bg-sky-50 hover:text-[#005EB8]"
                onClick={() => setOpen(false)}
              >
                Patient Login
              </Link>
              <Link
                to="/staff-login"
                className="flex-1 min-w-[140px] rounded-xl border border-blue-200 bg-blue-50 px-2 py-3 text-center text-base font-medium text-[#005EB8] transition-all duration-200 hover:border-blue-300 hover:bg-blue-100"
                onClick={() => setOpen(false)}
              >
                Staff Login
              </Link>
              <Link
                to="/request-demo"
                className="flex-1 px-4 py-3 text-center text-base font-medium text-[#005EB8] rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-200 border border-blue-200"
                onClick={() => setOpen(false)}
              >
                Request Demo
              </Link>
              <Link
                to="/download"
                className="flex-1 px-4 py-3 text-center text-base font-medium text-white rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-lg"
                onClick={() => setOpen(false)}
              >
                Download App
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
