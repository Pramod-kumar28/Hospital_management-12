// import React from 'react'
// import { Link } from 'react-router-dom'
// import { Activity, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'

// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-gray-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid md:grid-cols-4 gap-8">
//           <div className="md:col-span-2">
//             <Link to="/" className="flex items-center gap-2 font-semibold text-white mb-4">
//               <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center">
//                 <Activity size={16} />
//               </div>
//               <span className="text-lg">DCM Hospital</span>
//             </Link>
//             <p className="text-gray-400 mb-4 max-w-md">
//               Modern, secure, and scalable hospital management system trusted by healthcare professionals worldwide.
//             </p>
//             <div className="space-y-2 text-sm">
//               <div className="flex items-center gap-2">
//                 <Mail size={16} />
//                 <span>info@dcmhospital.com</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Phone size={16} />
//                 <span>+91 1800-123-4567</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <MapPin size={16} />
//                 <span>Mumbai, India</span>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-white font-semibold mb-4">Product</h3>
//             <ul className="space-y-2 text-sm">
//               <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
//               <li><Link to="/solutions" className="text-gray-400 hover:text-white transition-colors">Solutions</Link></li>
//               <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-white font-semibold mb-4">Company</h3>
//             <ul className="space-y-2 text-sm">
//               <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
//               <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
//               <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-sm text-gray-400">© 2024 DCM Hospital Management. All rights reserved.</p>
//           <div className="flex gap-3 mt-4 md:mt-0">
//             <a href="#" className="w-8 h-8 rounded bg-gray-800 hover:bg-blue-600 transition-colors flex items-center justify-center">
//               <Facebook size={16} />
//             </a>
//             <a href="#" className="w-8 h-8 rounded bg-gray-800 hover:bg-blue-600 transition-colors flex items-center justify-center">
//               <Twitter size={16} />
//             </a>
//             <a href="#" className="w-8 h-8 rounded bg-gray-800 hover:bg-blue-600 transition-colors flex items-center justify-center">
//               <Linkedin size={16} />
//             </a>
//             <a href="#" className="w-8 h-8 rounded bg-gray-800 hover:bg-blue-600 transition-colors flex items-center justify-center">
//               <Instagram size={16} />
//             </a>
//             <a href="#" className="w-8 h-8 rounded bg-gray-800 hover:bg-blue-600 transition-colors flex items-center justify-center">
//               <Youtube size={16} />
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }





















// import React from 'react'
// import { Link } from 'react-router-dom'
// import { Activity, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'

// export default function Footer() {
//   return (
//     <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-gray-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid md:grid-cols-4 gap-8">
//           <div className="md:col-span-2">
//             <Link to="/" className="inline-flex items-center gap-1 font-bold text-gray-900 group">
//               {/* LOGO IMAGE - LARGER SIZE */}
//               <div className="w-14 h-14 md:w-15 md:h-15">
//                 <img
//                   src="./assets/images/DCM-Logo.png"
//                   alt="DCM Hospital Logo"
//                   className="h-15 md:h-15 w-auto object-contain"
//                 />
//               </div>
//               <div className="hidden md:flex flex-col">
//                 <span className="text-lg text-gray-200 transition-colors duration-200">Hospital Management</span>
//               </div>
//             </Link>
//             <p className="text-blue-100 mb-6 max-w-md">
//               Modern, secure, and scalable hospital management system trusted by healthcare professionals worldwide.
//             </p>
//             <div className="space-y-2 text-sm">
//               <div className="flex items-center gap-2 text-blue-100">
//                 <Mail size={16} />
//                 <span>info@dcmhospital.com</span>
//               </div>
//               <div className="flex items-center gap-2 text-blue-100">
//                 <Phone size={16} />
//                 <span>+91 1800-123-4567</span>
//               </div>
//               <div className="flex items-center gap-2 text-blue-100">
//                 <MapPin size={16} />
//                 <span>Mumbai, India</span>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-white font-semibold mb-4">Solutions</h3>
//             <ul className="space-y-2 text-sm">
//               <li><Link to="/features" className="text-blue-200 hover:text-white transition-colors">Patient Management</Link></li>
//               <li><Link to="/features" className="text-blue-200 hover:text-white transition-colors">Doctor Portal</Link></li>
//               <li><Link to="/features" className="text-blue-200 hover:text-white transition-colors">Billing & Accounts</Link></li>
//               <li><Link to="/features" className="text-blue-200 hover:text-white transition-colors">Pharmacy Management</Link></li>
//               <li><Link to="/features" className="text-blue-200 hover:text-white transition-colors">Laboratory (LIMS)</Link></li>
//               <li><Link to="/features" className="text-blue-200 hover:text-white transition-colors">Telemedicine</Link></li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-white font-semibold mb-4">Company</h3>
//             <ul className="space-y-2 text-sm">
//               <li><Link to="/contact" className="text-blue-200 hover:text-white transition-colors">Contact</Link></li>
//               <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Careers</a></li>
//               <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Blog</a></li>
//               <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</a></li>
//               <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Terms of Service</a></li>
//               <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Support</a></li>
//               <li><Link to="/contact" className="text-blue-200 hover:text-white transition-colors">Download App</Link></li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-blue-500 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-sm text-blue-200">© 2024 DCM Hospital Management. All rights reserved.</p>
//           <div className="flex gap-3 mt-4 md:mt-0">
//             {/* Facebook - Blue */}
//             <a 
//               href="#" 
//               className="w-10 h-10 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 shadow-lg flex items-center justify-center"
//             >
//               <Facebook size={18} />
//             </a>
            
//             {/* Twitter - Sky Blue */}
//             <a 
//               href="#" 
//               className="w-10 h-10 rounded-lg bg-blue-400 text-white hover:bg-blue-500 transition-all duration-300 transform hover:scale-110 shadow-lg flex items-center justify-center"
//             >
//               <Twitter size={18} />
//             </a>
            
//             {/* LinkedIn - Professional Blue */}
//             <a 
//               href="#" 
//               className="w-10 h-10 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-all duration-300 transform hover:scale-110 shadow-lg flex items-center justify-center"
//             >
//               <Linkedin size={18} />
//             </a>
            
//             {/* Instagram - Gradient Purple to Pink */}
//             <a 
//               href="#" 
//               className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-110 shadow-lg flex items-center justify-center"
//             >
//               <Instagram size={18} />
//             </a>
            
//             {/* YouTube - Red */}
//             <a 
//               href="#" 
//               className="w-10 h-10 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-300 transform hover:scale-110 shadow-lg flex items-center justify-center"
//             >
//               <Youtube size={18} />
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }


































import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            {/* LOGO AND BRAND NAME SECTION */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
                <img
                  src="./assets/images/DCM-Logo.png"
                  alt="DCM Hospital Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">Hospital Management</span>
                {/* <span className="text-base text-blue-100 font-medium">Management System</span> */}
              </div>
            </div>
            
            <p className="text-blue-100 mb-6 max-w-md text-sm leading-relaxed">
              Modern, secure, and scalable hospital management system trusted by healthcare professionals worldwide.
            </p>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-blue-100">
                <Mail size={16} className="flex-shrink-0" />
                <span>info@dcmhospital.com</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <Phone size={16} className="flex-shrink-0" />
                <span>+91 1800-123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <MapPin size={16} className="flex-shrink-0" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/features" className="text-blue-200 hover:text-white transition-colors">Patient Management</Link></li>
              <li><Link to="/features" className="text-blue-200 hover:text-white transition-colors">Doctor Portal</Link></li>
              <li><Link to="/features" className="text-blue-200 hover:text-white transition-colors">Billing & Accounts</Link></li>
              <li><Link to="/features" className="text-blue-200 hover:text-white transition-colors">Pharmacy Management</Link></li>
              <li><Link to="/features" className="text-blue-200 hover:text-white transition-colors">Laboratory (LIMS)</Link></li>
              <li><Link to="/features" className="text-blue-200 hover:text-white transition-colors">Telemedicine</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-blue-200 hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Support</a></li>
              <li><Link to="/contact" className="text-blue-200 hover:text-white transition-colors">Download App</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-500 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-blue-200">© 2024 DCM Hospital Management. All rights reserved.</p>
          <div className="flex gap-3 mt-4 md:mt-0">
            {/* Facebook - Blue */}
            <a 
              href="#" 
              className="w-10 h-10 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 shadow-lg flex items-center justify-center"
            >
              <Facebook size={18} />
            </a>
            
            {/* Twitter - Sky Blue */}
            <a 
              href="#" 
              className="w-10 h-10 rounded-lg bg-blue-400 text-white hover:bg-blue-500 transition-all duration-300 transform hover:scale-110 shadow-lg flex items-center justify-center"
            >
              <Twitter size={18} />
            </a>
            
            {/* LinkedIn - Professional Blue */}
            <a 
              href="#" 
              className="w-10 h-10 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-all duration-300 transform hover:scale-110 shadow-lg flex items-center justify-center"
            >
              <Linkedin size={18} />
            </a>
            
            {/* Instagram - Gradient Purple to Pink */}
            <a 
              href="#" 
              className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-110 shadow-lg flex items-center justify-center"
            >
              <Instagram size={18} />
            </a>
            
            {/* YouTube - Red */}
            <a 
              href="#" 
              className="w-10 h-10 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-300 transform hover:scale-110 shadow-lg flex items-center justify-center"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}