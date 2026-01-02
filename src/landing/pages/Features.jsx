// import React from 'react';
// import { Link } from "react-router-dom";
// import { Users, Stethoscope, CreditCard, Pill, FlaskConical, Video, BarChart3, Building2, Shield, ChevronRight, Activity, Menu, Zap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

// export default function Features() {
//   return (
//     <div className="min-h-screen bg-white">

//       {/* Page Hero */}
//       <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
//             Complete Hospital Management Suite
//           </h1>
//           <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
//             Everything you need to run a modern healthcare facility efficiently
//           </p>
//         </div>
//       </section>

//       {/* Features Grid */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             <FeatureCard 
//               icon={<Users className="w-6 h-6" />} 
//               title="Patient Management System"
//               desc="Comprehensive patient registration, medical history, appointment scheduling with intelligent conflict resolution, and document management."
//             />
//             <FeatureCard 
//               icon={<Stethoscope className="w-6 h-6" />} 
//               title="Doctor Portal"
//               desc="Secure doctor dashboard with appointment tracking, digital prescription creation, patient records access, and treatment plan documentation."
//             />
//             <FeatureCard 
//               icon={<CreditCard className="w-6 h-6" />} 
//               title="Billing & Accounts"
//               desc="Complete financial management with OPD/IPD billing, payment tracking, insurance claims, and automated revenue reconciliation."
//             />
//             <FeatureCard 
//               icon={<Pill className="w-6 h-6" />} 
//               title="Pharmacy Management"
//               desc="End-to-end inventory control with automated purchase orders, sales tracking, expiry alerts, and billing integration."
//             />
//             <FeatureCard 
//               icon={<FlaskConical className="w-6 h-6" />} 
//               title="Laboratory (LIMS)"
//               desc="Streamlined laboratory operations with test registration, sample tracking, report generation, and secure online result access."
//             />
//             <FeatureCard 
//               icon={<Video className="w-6 h-6" />} 
//               title="Telemedicine"
//               desc="Enable remote healthcare with secure HD video consultations, digital prescriptions, and remote vital signs monitoring."
//             />
//             <FeatureCard 
//               icon={<BarChart3 className="w-6 h-6" />} 
//               title="Analytics & Reporting"
//               desc="Transform data into actionable insights with real-time reporting, revenue analytics, patient flow tracking, and custom reports."
//             />
//             <FeatureCard 
//               icon={<Building2 className="w-6 h-6" />} 
//               title="Hospital Administration"
//               desc="Centralized dashboard for managing departments, staff roles, user permissions, and overall hospital performance metrics."
//             />
//             <FeatureCard 
//               icon={<Shield className="w-6 h-6" />} 
//               title="Super Admin Portal"
//               desc="Platform-wide monitoring with subscription management, revenue tracking, hospital oversight, and support management."
//             />
//           </div>
//         </div>
//       </section>

//       {/* Detailed Features Section */}
//       <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Detailed Feature Overview
//             </h2>
//             <p className="text-lg text-gray-600">
//               Learn how each feature transforms healthcare operations and improves patient care
//             </p>
//           </div>

//           {/* Patient Management */}
//           <FeatureDetailSection
//             badgeIcon={<Users className="w-4 h-4" />}
//             badgeText="Patient Management"
//             title="Streamline Patient Care Journey"
//             description="Our comprehensive patient management system transforms the entire patient journey from initial registration through treatment and follow-up care, ensuring seamless coordination across all departments."
//             image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxwYXRpZW50JTIwbWFuYWdlbWVudCUyMHN5c3RlbXxlbnwwfHx8fDE3NjIzMzM2MDB8MA&ixlib=rb-4.1.0&q=85"
//             capabilities={[
//               "Complete patient registration with demographic and insurance information",
//               "Digital medical history and comprehensive health records management",
//               "Intelligent appointment scheduling with automatic conflict resolution",
//               "Centralized document management for lab reports and prescriptions",
//               "Secure patient portal for medical records access and appointment booking",
//               "Automated reminders for appointments, medications, and follow-ups"
//             ]}
//             benefits={["40% Faster Registration", "Reduced No-Shows", "Improved Patient Satisfaction", "HIPAA Compliant"]}
//           />

//           {/* Doctor Portal */}
//           <FeatureDetailSection
//             badgeIcon={<Stethoscope className="w-4 h-4" />}
//             badgeText="Doctor Portal"
//             title="Empower Healthcare Professionals"
//             description="Our doctor portal provides healthcare professionals with an intuitive dashboard to manage their practice efficiently while maintaining focus on patient care and clinical excellence."
//             image="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwb3J0YWx8ZW58MHx8fHwxNzYyMzMzNjEwfDA&ixlib=rb-4.1.0&q=85"
//             capabilities={[
//               "Smart appointment calendar with real-time updates and notifications",
//               "Digital prescription creation with intelligent drug interaction alerts",
//               "Comprehensive access to complete patient medical history",
//               "Advanced treatment plan documentation and progress tracking",
//               "Integrated lab test ordering and instant result viewing",
//               "Secure messaging system for communication with patients and staff"
//             ]}
//             benefits={["30% Time Savings", "Enhanced Collaboration", "Reduced Errors", "Mobile Access"]}
//             reverse
//           />

//           {/* Billing & Accounts */}
//           <FeatureDetailSection
//             badgeIcon={<CreditCard className="w-4 h-4" />}
//             badgeText="Billing & Accounts"
//             title="Simplify Financial Operations"
//             description="Our comprehensive billing and accounts module streamlines financial management for healthcare facilities of all sizes, ensuring accuracy, compliance, and revenue optimization."
//             image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJpbGxpbmclMjBzeXN0ZW18ZW58MHx8fHwxNzYyMzMzNjIwfDA&ixlib=rb-4.1.0&q=85"
//             capabilities={[
//               "Flexible OPD and IPD billing with customizable templates",
//               "Comprehensive payment tracking with multiple payment method support",
//               "Automated insurance claim processing with intelligent validation",
//               "Real-time revenue reconciliation and financial reporting",
//               "Automated tax calculation and regulatory compliance management",
//               "Advanced financial analytics and revenue cycle optimization"
//             ]}
//             benefits={["40% Faster Claims", "Reduced Revenue Leakage", "Automated Compliance", "Real-time Insights"]}
//           />
//         </div>
//       </section>

     
//     </div>
//   );
// }

// function Header() {
//   return (
//     <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex items-center justify-between py-4">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2 text-gray-900 font-bold text-xl">
//             <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center">
//               <Activity className="w-5 h-5" />
//             </div>
//             DCM Hospital
//           </Link>

//           {/* Navigation */}
//           <nav className="hidden md:flex items-center gap-8">
//             <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
//               Home
//             </Link>
//             <Link to="/features" className="text-blue-600 font-medium">
//               Features
//             </Link>
//             <Link to="/solutions" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
//               Solutions
//             </Link>
//             <Link to="/pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
//               Pricing
//             </Link>
//             <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
//               Contact
//             </Link>
//           </nav>

//           {/* CTA Buttons */}
//           <div className="hidden md:flex items-center gap-4">
//             <Link to="/signin" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors">
//               Sign In
//             </Link>
//             <Link to="/contact" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
//               Request Demo
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button className="md:hidden text-gray-700">
//             <Menu className="w-6 h-6" />
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

// function FeatureCard({ icon, title, desc }) {
//   return (
//     <div className="group relative bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 text-center overflow-hidden">
//       {/* Blue Overlay Effect */}
//       <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl"></div>
      
//       {/* Content */}
//       <div className="relative z-10">
//         <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-700 transition-colors duration-300">
//           {icon}
//         </div>
//         <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">
//           {title}
//         </h3>
//         <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
//           {desc}
//         </p>
//       </div>
//     </div>
//   );
// }

// function FeatureDetailSection({ 
//   badgeIcon, 
//   badgeText, 
//   title, 
//   description, 
//   image, 
//   capabilities, 
//   benefits, 
//   reverse = false 
// }) {
//   return (
//     <div className={`grid lg:grid-cols-2 gap-12 items-center mb-20 last:mb-0 ${reverse ? 'lg:grid-flow-dense' : ''}`}>
//       {/* Content */}
//       <div className={`space-y-6 ${reverse ? 'lg:col-start-2' : ''}`}>
//         {/* Badge */}
//         <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
//           {badgeIcon}
//           {badgeText}
//         </div>

//         {/* Title */}
//         <h3 className="text-3xl font-bold text-gray-900">{title}</h3>

//         {/* Description */}
//         <p className="text-lg text-gray-600 leading-relaxed">{description}</p>

//         {/* Capabilities */}
//         <div className="space-y-4">
//           <h4 className="text-lg font-semibold text-gray-900">Key Capabilities:</h4>
//           <ul className="space-y-3">
//             {capabilities.map((capability, index) => (
//               <li key={index} className="flex items-start gap-3 text-gray-700">
//                 <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
//                 {capability}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Benefits */}
//         <div className="bg-white rounded-xl p-6 border-l-4 border-blue-600 shadow-sm">
//           <div className="flex items-center gap-2 text-gray-900 font-semibold mb-4">
//             <Zap className="w-5 h-5 text-blue-600" />
//             Key Benefits
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {benefits.map((benefit, index) => (
//               <span key={index} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
//                 {benefit}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* CTA Buttons */}
//         <div className="flex gap-4 pt-4">
//           <Link to="/contact" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
//             Request Demo
//           </Link>
//           <Link to="/solutions" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
//             Learn More
//           </Link>
//         </div>
//       </div>

//       {/* Image */}
//       <div className={`relative ${reverse ? 'lg:col-start-1' : ''}`}>
//         <div className="rounded-2xl overflow-hidden shadow-2xl">
//           <img 
//             src={image} 
//             alt={title}
//             className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }








































import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { 
  Users, Stethoscope, CreditCard, Pill, FlaskConical, Video, 
  BarChart3, Building2, Shield, ChevronRight, Activity, Menu, 
  Zap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, 
  Youtube, Heart, Calendar, FileText, Database, Cloud, Server,
  Smartphone, Globe, Lock, Award, Clock, TrendingUp
} from "lucide-react";

export default function Features() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-white">

      {/* Page Hero - FIXED SECTION */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50 relative overflow-hidden">
        {/* Static Background Elements */}
        <div className="absolute top-10 left-5% opacity-10">
          <Heart className="w-8 h-8 md:w-12 md:h-12 text-red-400" />
        </div>
        <div className="absolute bottom-10 right-5% opacity-10">
          <Stethoscope className="w-10 h-10 md:w-14 md:h-14 text-blue-400" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-blue-200">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">Complete Healthcare Solution</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Complete Hospital Management Suite
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform your healthcare facility with our comprehensive, AI-powered management platform designed for modern medical practices
          </p>
          
          {/* FIXED BUTTON CONTAINER */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              Request Demo
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/pricing" 
              className="inline-flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors w-full sm:w-auto"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid - Enhanced without Random Color Changes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Feature Suite
            </h2>
            <p className="text-gray-600">
              Everything you need to streamline operations, enhance patient care, and grow your healthcare practice
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {featuresData.map((feature, index) => (
              <AnimatedFeatureCard
                key={feature.title}
                feature={feature}
                index={index}
                isHovered={hoveredCard === index}
                onHover={() => setHoveredCard(index)}
                onLeave={() => setHoveredCard(null)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose DCM Hospital Management?
            </h2>
            <p className="text-gray-600">
              Experience measurable improvements across all departments with our proven platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitsData.map((benefit, index) => (
              <BenefitCard key={benefit.title} benefit={benefit} index={index} />
            ))}
          </div>
        </div>
      </section>
      
       
      {/* Detailed Features Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Detailed Feature Overview
            </h2>
            <p className="text-lg text-gray-600">
              Learn how each feature transforms healthcare operations and improves patient care
            </p>
          </div>

          {/* Patient Management */}
          <EnhancedFeatureDetailSection
            badgeIcon={<Users className="w-4 h-4" />}
            badgeText="Patient Management"
            title="Streamline Patient Care Journey"
            description="Our comprehensive patient management system transforms the entire patient journey from initial registration through treatment and follow-up care, ensuring seamless coordination across all departments with AI-powered automation and real-time tracking."
            image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxwYXRpZW50JTIwbWFuYWdlbWVudCUyMHN5c3RlbXxlbnwwfHx8fDE3NjIzMzM2MDB8MA&ixlib=rb-4.1.0&q=85"
            capabilities={[
              "Complete patient registration with demographic and insurance information",
              "Digital medical history and comprehensive health records management",
              "Intelligent appointment scheduling with automatic conflict resolution",
              "Centralized document management for lab reports and prescriptions",
              "Secure patient portal for medical records access and appointment booking",
              "Automated reminders for appointments, medications, and follow-ups",
              "AI-powered patient flow optimization and wait time reduction",
              "Multi-language support and accessibility features"
            ]}
            benefits={["40% Faster Registration", "60% Reduced No-Shows", "95% Patient Satisfaction", "HIPAA Compliant"]}
            stats={[
              { value: "40%", label: "Faster Registration" },
              { value: "60%", label: "Reduced No-Shows" },
              { value: "95%", label: "Patient Satisfaction" }
            ]}
          />

          {/* Doctor Portal */}
          <EnhancedFeatureDetailSection
            badgeIcon={<Stethoscope className="w-4 h-4" />}
            badgeText="Doctor Portal"
            title="Empower Healthcare Professionals"
            description="Our doctor portal provides healthcare professionals with an intuitive dashboard to manage their practice efficiently while maintaining focus on patient care and clinical excellence. Streamline workflows and enhance collaboration."
            image="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwb3J0YWx8ZW58MHx8fHwxNzYyMzMzNjEwfDA&ixlib=rb-4.1.0&q=85"
            capabilities={[
              "Smart appointment calendar with real-time updates and notifications",
              "Digital prescription creation with intelligent drug interaction alerts",
              "Comprehensive access to complete patient medical history",
              "Advanced treatment plan documentation and progress tracking",
              "Integrated lab test ordering and instant result viewing",
              "Secure messaging system for communication with patients and staff",
              "Telemedicine integration for remote consultations",
              "Mobile app access for on-the-go patient management"
            ]}
            benefits={["30% Time Savings", "Enhanced Collaboration", "98% Reduced Errors", "Mobile Access"]}
            stats={[
              { value: "30%", label: "Time Savings" },
              { value: "98%", label: "Error Reduction" },
              { value: "24/7", label: "Mobile Access" }
            ]}
            reverse
          />

          {/* Billing & Accounts */}
          <EnhancedFeatureDetailSection
            badgeIcon={<CreditCard className="w-4 h-4" />}
            badgeText="Billing & Accounts"
            title="Simplify Financial Operations"
            description="Our comprehensive billing and accounts module streamlines financial management for healthcare facilities of all sizes, ensuring accuracy, compliance, and revenue optimization with automated processes."
            image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJpbGxpbmclMjBzeXN0ZW18ZW58MHx8fHwxNzYyMzMzNjIwfDA&ixlib=rb-4.1.0&q=85"
            capabilities={[
              "Flexible OPD and IPD billing with customizable templates",
              "Comprehensive payment tracking with multiple payment method support",
              "Automated insurance claim processing with intelligent validation",
              "Real-time revenue reconciliation and financial reporting",
              "Automated tax calculation and regulatory compliance management",
              "Advanced financial analytics and revenue cycle optimization",
              "Multi-currency support for international patients",
              "Automated payment reminders and collection management"
            ]}
            benefits={["40% Faster Claims", "Reduced Revenue Leakage", "Automated Compliance", "Real-time Insights"]}
            stats={[
              { value: "40%", label: "Faster Claims" },
              { value: "99.9%", label: "Accuracy" },
              { value: "Real-time", label: "Reporting" }
            ]}
          />
        </div>
      </section>

      {/* Final CTA - ALSO FIXED */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Hospital?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join 50+ healthcare facilities already using DCM Hospital Management System
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg shadow-lg w-full sm:w-auto"
            >
              Request Demo
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/pricing" 
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-lg w-full sm:w-auto"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>
      {/* Technology Stack */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Built with Modern Healthcare Technology
            </h2>
            <p className="text-gray-600">
              Leveraging cutting-edge technology to deliver superior healthcare management solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {techStackData.map((tech, index) => (
              <TechCard key={tech.title} tech={tech} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Data Arrays
const featuresData = [
  {
    icon: Users,
    title: "Patient Management",
    description: "Complete patient registration, medical history, and intelligent appointment scheduling",
    color: "from-blue-500 to-cyan-500",
    stats: "40% Faster Registration"
  },
  {
    icon: Stethoscope,
    title: "Doctor Portal",
    description: "Secure dashboard with digital prescriptions and comprehensive patient records",
    color: "from-green-500 to-emerald-500",
    stats: "30% Time Savings"
  },
  {
    icon: CreditCard,
    title: "Billing & Accounts",
    description: "Automated billing, insurance claims, and financial reporting system",
    color: "from-purple-500 to-pink-500",
    stats: "40% Faster Claims"
  },
  {
    icon: Pill,
    title: "Pharmacy Management",
    description: "Inventory control, prescription tracking, and automated purchase orders",
    color: "from-orange-500 to-red-500",
    stats: "99% Accuracy"
  },
  {
    icon: FlaskConical,
    title: "Laboratory (LIMS)",
    description: "Streamlined lab operations with test registration and secure result access",
    color: "from-indigo-500 to-blue-500",
    stats: "50% Faster Results"
  },
  {
    icon: Video,
    title: "Telemedicine",
    description: "Secure video consultations and remote patient monitoring",
    color: "from-teal-500 to-green-500",
    stats: "24/7 Access"
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Real-time dashboards, performance metrics, and comprehensive reporting",
    color: "from-cyan-500 to-blue-500",
    stats: "AI-Powered Insights"
  },
  {
    icon: Building2,
    title: "Hospital Admin",
    description: "Centralized dashboard for departments, staff, and performance metrics",
    color: "from-gray-600 to-gray-800",
    stats: "Complete Control"
  },
  {
    icon: Shield,
    title: "Super Admin",
    description: "Platform-wide monitoring with subscription and revenue management",
    color: "from-red-500 to-pink-500",
    stats: "Enterprise Grade"
  },
  {
    icon: Calendar,
    title: "Appointment System",
    description: "Smart scheduling with conflict resolution and automated reminders",
    color: "from-yellow-500 to-orange-500",
    stats: "60% Less No-Shows"
  },
  {
    icon: FileText,
    title: "Medical Records",
    description: "Digital health records with secure access and backup",
    color: "from-blue-600 to-purple-600",
    stats: "100% Secure"
  },
  {
    icon: Database,
    title: "Data Management",
    description: "Centralized data storage with advanced security and compliance",
    color: "from-green-600 to-blue-600",
    stats: "HIPAA Compliant"
  }
];

const benefitsData = [
  {
    icon: TrendingUp,
    title: "45% Operational Efficiency",
    description: "Streamline workflows and reduce administrative overhead",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Award,
    title: "99.9% Uptime",
    description: "Reliable cloud infrastructure with zero downtime guarantee",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Clock,
    title: "60% Time Savings",
    description: "Automate routine tasks and focus on patient care",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Enterprise-grade security with end-to-end encryption",
    color: "from-gray-600 to-gray-800"
  }
];

const techStackData = [
  {
    icon: Cloud,
    title: "Cloud Native",
    description: "AWS & Azure powered infrastructure",
    color: "blue"
  },
  {
    icon: Shield,
    title: "Bank-level Security",
    description: "HIPAA & GDPR compliant",
    color: "green"
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "iOS & Android apps",
    color: "purple"
  },
  {
    icon: Database,
    title: "Real-time Analytics",
    description: "Live dashboards & AI insights",
    color: "orange"
  }
];

// Updated Animated Feature Card Component without blur effect
function AnimatedFeatureCard({ feature, index, isHovered, onHover, onLeave }) {
  const IconComponent = feature.icon;

  return (
    <div 
      className="group relative bg-white rounded-xl shadow-lg border border-blue-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Static Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

      <div className="relative h-64 z-10 p-4 md:p-5">
        {/* Icon with Static Gradient - REMOVED BLUR EFFECT */}
        <div className="relative mb-3 transform group-hover:scale-110 transition-transform duration-300">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} text-white flex items-center justify-center shadow-lg`}>
            <IconComponent size={20} />
          </div>
        </div>

        {/* Content */}
        <h3 className="font-bold text-gray-900 text-sm md:text-base mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {feature.title}
        </h3>
        <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-3 line-clamp-3">
          {feature.description}
        </p>

        {/* Stats Badge */}
        <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
          <TrendingUp className="w-3 h-3" />
          {feature.stats}
        </div>

        {/* Hover Line */}
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-500 rounded-b-xl"></div>
      </div>

      {/* Static Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
    </div>
  );
}

// Enhanced Feature Detail Section
function EnhancedFeatureDetailSection({ 
  badgeIcon, 
  badgeText, 
  title, 
  description, 
  image, 
  capabilities, 
  benefits, 
  stats,
  reverse = false 
}) {
  return (
    <div className={`grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-20 last:mb-0 ${reverse ? 'lg:grid-flow-dense' : ''}`}>
      {/* Content */}
      <div className={`space-y-6 ${reverse ? 'lg:col-start-2' : ''}`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
          {badgeIcon}
          {badgeText}
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h3>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-600 leading-relaxed">{description}</p>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-4 py-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Capabilities */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Key Capabilities:</h4>
          <ul className="space-y-3">
            {capabilities.map((capability, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                {capability}
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-xl p-6 border-l-4 border-blue-600 shadow-sm">
          <div className="flex items-center gap-2 text-gray-900 font-semibold mb-4">
            <Zap className="w-5 h-5 text-blue-600" />
            Key Benefits
          </div>
          <div className="flex flex-wrap gap-2">
            {benefits.map((benefit, index) => (
              <span key={index} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {benefit}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm md:text-base">
            Request Demo
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link to="/solutions" className="inline-flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors text-sm md:text-base">
            Learn More
          </Link>
        </div>
      </div>

      {/* Image */}
      <div className={`relative ${reverse ? 'lg:col-start-1' : ''}`}>
        <div className="rounded-2xl overflow-hidden shadow-2xl group">
          <img 
            src={image} 
            alt={title}
            className="w-full h-64 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Static Image Overlay */}
          <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>
      </div>
    </div>
  );
}

// Benefit Card Component
function BenefitCard({ benefit, index }) {
  const IconComponent = benefit.icon;
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <IconComponent size={24} />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
      <p className="text-gray-600 text-sm">{benefit.description}</p>
    </div>
  );
}

// Tech Card Component
function TechCard({ tech, index }) {
  const IconComponent = tech.icon;
  
  return (
    <div className="bg-white rounded-xl p-4 text-center border border-gray-200 group hover:shadow-lg transition-all duration-300">
      <IconComponent className={`w-8 h-8 mx-auto mb-3 text-${tech.color}-600`} />
      <h3 className="font-semibold text-gray-900 text-sm mb-1">{tech.title}</h3>
      <p className="text-gray-600 text-xs">{tech.description}</p>
    </div>
  );
}




 