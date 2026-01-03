// import { useState } from 'react';
// import { Link } from "react-router-dom";
// import { 
//   Activity, 
//   Menu, 
//   ChevronRight, 
//   Send, 
//   Calendar,
//   Mail,
//   Phone,
//   MapPin,
//   Clock,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Instagram,
//   Youtube
// } from "lucide-react";

// export default function Contact() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     hospital: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate form submission
//     setTimeout(() => {
//       setIsSubmitting(false);
//       // Show success message (you can replace this with a toast notification)
//       alert('Thank you for your message! We will get back to you within 24 hours.');
//       setFormData({
//         name: '',
//         email: '',
//         phone: '',
//         hospital: '',
//         message: ''
//       });
//     }, 1000);
//   };

//   const handleScheduleDemo = () => {
//     setFormData(prev => ({
//       ...prev,
//       message: 'I would like to schedule a demo for DCM Hospital Management system.'
//     }));
    
//     // Scroll to form
//     document.getElementById('contactForm').scrollIntoView({ 
//       behavior: 'smooth' 
//     });
//   };

//   return (
//     <div className="min-h-screen bg-white">


//       {/* Page Hero */}
//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Get in Touch with Us
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Have questions? We're here to help you transform your healthcare facility
//           </p>
//         </div>
//       </section>

//       {/* Contact Form Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-12">
//             {/* Contact Form */}
//             <div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
//               <form 
//                 id="contactForm"
//                 onSubmit={handleSubmit}
//                 className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm"
//               >
//                 <div className="space-y-6">
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       placeholder="Dr. John Smith"
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       placeholder="john.smith@hospital.com"
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       placeholder="+91 98765 43210"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-2">
//                       Hospital/Clinic Name
//                     </label>
//                     <input
//                       type="text"
//                       id="hospital"
//                       name="hospital"
//                       value={formData.hospital}
//                       onChange={handleInputChange}
//                       placeholder="City Hospital"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
//                       Message *
//                     </label>
//                     <textarea
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleInputChange}
//                       rows="5"
//                       placeholder="Tell us about your requirements..."
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? (
//                       'Sending...'
//                     ) : (
//                       <>
//                         Send Message
//                         <Send className="w-4 h-4" />
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>

//             {/* Contact Information */}
//             <div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
//               <div className="space-y-6">
//                 <ContactInfoCard
//                   icon={<Mail className="w-6 h-6" />}
//                   title="Email Us"
//                   content={
//                     <>
//                       <p>info@dcmhospital.com</p>
//                       <p>support@dcmhospital.com</p>
//                     </>
//                   }
//                 />

//                 <ContactInfoCard
//                   icon={<Phone className="w-6 h-6" />}
//                   title="Call Us"
//                   content={
//                     <>
//                       <p>Sales: +91 1800-123-4567</p>
//                       <p>Support: +91 1800-123-4568</p>
//                     </>
//                   }
//                 />

//                 <ContactInfoCard
//                   icon={<MapPin className="w-6 h-6" />}
//                   title="Visit Us"
//                   content={
//                     <>
//                       <p>DCM Hospital Management</p>
//                       <p>Bandra Kurla Complex</p>
//                       <p>Mumbai, Maharashtra 400051</p>
//                       <p>India</p>
//                     </>
//                   }
//                 />

//                 <ContactInfoCard
//                   icon={<Clock className="w-6 h-6" />}
//                   title="Business Hours"
//                   content={
//                     <>
//                       <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
//                       <p>Saturday: 10:00 AM - 4:00 PM</p>
//                       <p>Sunday: Closed</p>
//                       <p className="text-blue-600 text-sm mt-2">
//                         24/7 Support for Premium customers
//                       </p>
//                     </>
//                   }
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Demo Section */}
//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-3xl mx-auto mb-8">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Schedule a Demo
//             </h2>
//             <p className="text-xl text-gray-600">
//               See DCM Hospital Management in action with a personalized demo
//             </p>
//           </div>
//           <div className="text-center">
//             <button
//               onClick={handleScheduleDemo}
//               className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
//             >
//               Schedule a Demo
//               <Calendar className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// function ContactInfoCard({ icon, title, content }) {
//   return (
//     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//       <div className="flex items-start gap-4">
//         <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
//           {icon}
//         </div>
//         <div>
//           <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
//           <div className="text-gray-600 space-y-1">
//             {content}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Footer() {
//   return (
//     <footer className="bg-gray-900 text-gray-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
//           {/* Brand */}
//           <div className="lg:col-span-2">
//             <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl mb-4">
//               <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center">
//                 <Activity className="w-5 h-5" />
//               </div>
//               DCM Hospital
//             </Link>
//             <p className="text-gray-400 mb-6 max-w-md">
//               Modern, secure, and scalable hospital management system trusted by healthcare professionals worldwide.
//             </p>
//             <div className="space-y-2">
//               <div className="flex items-center gap-2 text-sm">
//                 <Mail className="w-4 h-4" />
//                 <span>info@dcmhospital.com</span>
//               </div>
//               <div className="flex items-center gap-2 text-sm">
//                 <Phone className="w-4 h-4" />
//                 <span>+91 1800-123-4567</span>
//               </div>
//               <div className="flex items-center gap-2 text-sm">
//                 <MapPin className="w-4 h-4" />
//                 <span>Mumbai, India</span>
//               </div>
//             </div>
//           </div>

//           {/* Product */}
//           <div>
//             <h3 className="text-white font-semibold text-lg mb-4">Product</h3>
//             <ul className="space-y-3">
//               <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
//               <li><Link to="/solutions" className="text-gray-400 hover:text-white transition-colors">Solutions</Link></li>
//               <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
//             </ul>
//           </div>

//           {/* Company */}
//           <div>
//             <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
//             <ul className="space-y-3">
//               <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
//               <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
//               <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
//               <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
//             </ul>
//           </div>

//           {/* Legal */}
//           <div>
//             <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
//             <ul className="space-y-3">
//               <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
//               <li><Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
//               <li><Link to="/hipaa-compliance" className="text-gray-400 hover:text-white transition-colors">HIPAA Compliance</Link></li>
//               <li><Link to="/security" className="text-gray-400 hover:text-white transition-colors">Security</Link></li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom */}
//         <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-700">
//           <p className="text-gray-400 text-sm mb-4 md:mb-0">
//             © 2025 DCM Hospital Management. All rights reserved.
//           </p>
//           <div className="flex gap-3">
//             <a 
//               href="https://facebook.com/dcmhospital" 
//               className="w-10 h-10 bg-gray-800 text-gray-400 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Facebook className="w-4 h-4" />
//             </a>
//             <a 
//               href="https://twitter.com/dcmhospital" 
//               className="w-10 h-10 bg-gray-800 text-gray-400 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Twitter className="w-4 h-4" />
//             </a>
//             <a 
//               href="https://linkedin.com/company/dcmhospital" 
//               className="w-10 h-10 bg-gray-800 text-gray-400 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition-colors"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Linkedin className="w-4 h-4" />
//             </a>
//             <a 
//               href="https://instagram.com/dcmhospital" 
//               className="w-10 h-10 bg-gray-800 text-gray-400 rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Instagram className="w-4 h-4" />
//             </a>
//             <a 
//               href="https://youtube.com/dcmhospital" 
//               className="w-10 h-10 bg-gray-800 text-gray-400 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Youtube className="w-4 h-4" />
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }


































import { useState } from 'react';
import { Link } from "react-router-dom";
import { 
  Activity, 
  Menu, 
  ChevronRight, 
  Send, 
  Calendar,
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube
} from "lucide-react";

export default function Contact() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Show success message (you can replace this with a toast notification)
      alert('Thank you for your message! We will get back to you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
    }, 1000);
  };

  const handleScheduleDemo = () => {
    setFormData(prev => ({
      ...prev,
      message: 'I would like to schedule a demo for Design Career Metrics products.'
    }));
    
    // Scroll to form
    document.getElementById('contactForm').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Hero */}
      <section className="relative py-20 bg-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #3b82f6 2%, transparent 0%), radial-gradient(circle at 75px 75px, #3b82f6 2%, transparent 0%)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Contact <span className="text-blue-600">With Us</span>
            </h1>
          </div>

          {/* Contact Information Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ContactInfoCard
              icon={<Mail className="w-5 h-5" />}
              title="Email Us"
              content="info@careermetrics.com"
              subContent="support@careermetrics.com"
              bgColor="bg-gradient-to-br from-blue-500 to-cyan-500"
              hoverBgColor="hover:from-blue-600 hover:to-cyan-600"
              buttonText="Send Email"
              onButtonClick={() => window.location.href = 'mailto:info@careermetrics.com'}
            />

            <ContactInfoCard
              icon={<Phone className="w-5 h-5" />}
              title="Call Us"
              content="Sales: +91 1800-123-4567"
              subContent="Support: +91 1800-123-4568"
              bgColor="bg-gradient-to-br from-green-500 to-emerald-500"
              hoverBgColor="hover:from-green-600 hover:to-emerald-600"
              buttonText="Call Now"
              onButtonClick={() => window.location.href = 'tel:+9118001234567'}
            />

            <ContactInfoCard
              icon={<MapPin className="w-5 h-5" />}
              title="Visit Us"
              content="Design Career Metrics Pvt Ltd"
              subContent="Hyderabad, Telangana 500081"
              bgColor="bg-gradient-to-br from-purple-500 to-pink-500"
              hoverBgColor="hover:from-purple-600 hover:to-pink-600"
              buttonText="Get Directions"
              onButtonClick={() => window.open('https://maps.google.com/maps?q=Design+Career+Metrics+Pvt+Ltd+Hyderabad', '_blank')}
            />

            <ContactInfoCard
              icon={<Clock className="w-5 h-5" />}
              title="Business Hours"
              content="Mon - Fri: 9:00 AM - 6:00 PM"
              subContent="24/7 Support for Premium"
              bgColor="bg-gradient-to-br from-orange-500 to-red-500"
              hoverBgColor="hover:from-orange-600 hover:to-red-600"
              buttonText="View Details"
              onButtonClick={handleScheduleDemo}
            />
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden">
            {/* Form Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 20px 20px, #3b82f6 1.5px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}></div>
            </div>
            
            <div className="relative p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                  Send Us a Message
                </h2>
                <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
                  Fill out the form below and our expert team will get back to you within 
                  <span className="font-semibold text-blue-600"> 24 hours</span>
                </p>
              </div>

              <form 
                id="contactForm"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Smith"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 hover:border-blue-300 hover:shadow-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john.smith@company.com"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 hover:border-blue-300 hover:shadow-md"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 hover:border-blue-300 hover:shadow-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your Company"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 hover:border-blue-300 hover:shadow-md"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    placeholder="Tell us about your requirements and what you're looking to achieve with our career metrics solutions..."
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 resize-vertical leading-relaxed hover:border-blue-300 hover:shadow-md"
                  />
                </div>

                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-10 rounded-xl font-bold text-base hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    
                    {/* Button shine effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  
                  <p className="text-gray-500 text-sm mt-4">
                    We respect your privacy and protect your data. Read our{' '}
                    <a href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium underline hover:no-underline">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Map Section */}
      <section className="relative py-0 bg-white">
        <div className="w-full">
          {/* Map Header */}
          {/* <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Visit Our Office
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Come visit us at our headquarters in Hyderabad. We'd love to meet you in person.
              </p>
            </div>
          </div> */}

          {/* Full Width Map */}
          <div className="w-full h-96 lg:h-[500px] bg-gray-100 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.263734477665!2d78.39138831538457!3d17.447950588044688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f2b8c67f%3A0xce2b9c64b93e8b3e!2sDesign%20Career%20Metrics%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1633706543210!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Design Career Metrics Office Location"
              className="absolute inset-0"
            ></iframe>
            
            {/* Map Overlay for better styling */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
            </div>
          </div>

          {/* Address Details */}
          {/* <div className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                        <MapPin className="w-8 h-8" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Headquarters</h3>
                      <div className="space-y-3 text-gray-700 text-lg">
                        <p className="font-semibold text-gray-900">Design Career Metrics Pvt Ltd</p>
                        <p>4th floor, Jain sadguru image's capital park</p>
                        <p>Office #407 & 409, Ayyappa Society Main Rd</p>
                        <p>VIP Hills, Jaihind Enclave, Madhapur</p>
                        <p>Hyderabad, Telangana 500081</p>
                        <p>India</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <button 
                    onClick={() => window.open('https://maps.google.com/maps?q=Design+Career+Metrics+Pvt+Ltd+Hyderabad', '_blank')}
                    className="w-full inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <MapPin className="w-5 h-5" />
                    Open in Google Maps
                  </button>
                  <button 
                    onClick={() => window.location.href = 'tel:+9118001234567'}
                    className="w-full inline-flex items-center justify-center gap-3 bg-green-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Phone className="w-5 h-5" />
                    Call for Directions
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
}

function ContactInfoCard({ 
  icon, 
  title, 
  content, 
  subContent, 
  bgColor = "bg-gradient-to-br from-blue-500 to-cyan-500",
  hoverBgColor = "hover:from-blue-100 hover:to-cyan-400",
  buttonText,
  onButtonClick 
}) {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-2xl p-3 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Card glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className={`relative w-10 h-10 ${bgColor} ${hoverBgColor} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110`}>
          {icon}
          {/* Icon shine effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
          {title}
        </h4>
        
        <div className="text-gray-600 space-y-2 mb-6">
          <p className="font-semibold text-gray-800 text-lg">{content}</p>
          {subContent && (
            <p className="text-gray-500 text-sm leading-relaxed">{subContent}</p>
          )}
        </div>

        {buttonText && (
          <button
            onClick={onButtonClick}
            className="w-full bg-blue-50 text-blue-700 py-3 px-6 rounded-xl font-semibold hover:bg-blue-100 transition-all duration-300 border border-blue-200 hover:border-blue-300 group-hover:bg-blue-100"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}