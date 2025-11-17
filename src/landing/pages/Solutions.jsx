import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  ArrowRight, 
  Users, 
  Stethoscope, 
  CreditCard, 
  Pill, 
  FlaskConical, 
  Video, 
  Shield,
  Cloud,
  Smartphone,
  Database,
  Zap,
  Calendar,
  FileText,
  BarChart3
} from 'lucide-react';

const Solutions = () => {
  const solutions = [
    {
      icon: Users,
      title: "Patient Management Portal",
      description: "Comprehensive patient management with digital records, appointment scheduling, and communication tools for enhanced patient experience.",
      features: [
        "Digital Patient Registration & Profiles",
        "Online Appointment Scheduling",
        "Medical History & Records Access",
        "Secure Patient Communication Portal",
        "Document & Prescription Management"
      ],
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      benefits: [
        "Reduce administrative workload by 40%",
        "Improve patient satisfaction scores by 35%",
        "Streamline communication processes",
        "Reduce no-show rates significantly"
      ]
    },
    {
      icon: Stethoscope,
      title: "Doctor Portal & EHR",
      description: "Comprehensive Electronic Health Records system with clinical decision support, telemedicine integration, and streamlined workflow management.",
      features: [
        "Complete Electronic Health Records",
        "Digital Prescriptions & E-Signatures",
        "Clinical Decision Support System",
        "Telemedicine Integration",
        "Progress Notes & Treatment Plans"
      ],
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      benefits: [
        "Increase doctor productivity by 30%",
        "Reduce medical errors by 45%",
        "Enable seamless remote consultations",
        "Improve clinical documentation accuracy"
      ]
    },
    {
      icon: CreditCard,
      title: "Billing & Revenue Cycle",
      description: "Complete financial management system with automated billing, insurance claims processing, and comprehensive revenue cycle management.",
      features: [
        "Automated Billing & Invoicing System",
        "Insurance Claims Processing & Tracking",
        "Revenue Cycle Management",
        "Payment Processing & Tracking",
        "Financial Reporting & Analytics"
      ],
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      benefits: [
        "Reduce revenue leakage by 35%",
        "Accelerate insurance claims processing",
        "Improve cash flow management",
        "Automate payment collections"
      ]
    },
    {
      icon: Pill,
      title: "Pharmacy Management",
      description: "End-to-end pharmacy operations management with inventory control, prescription management, and automated dispensing systems.",
      features: [
        "Smart Inventory Management",
        "Prescription Tracking & Management",
        "Automated Dispensing System",
        "Drug Interaction Alerts",
        "Supplier & Purchase Order Management"
      ],
      image: "https://images.unsplash.com/photo-1585435557343-3b092031d5ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      benefits: [
        "Reduce medication waste by 25%",
        "Improve inventory turnover rate",
        "Enhance patient safety measures",
        "Streamline prescription fulfillment"
      ]
    },
    {
      icon: FlaskConical,
      title: "Laboratory Information System",
      description: "Advanced laboratory management with test management, sample tracking, result reporting, and quality control systems.",
      features: [
        "Test Order & Workflow Management",
        "Sample Collection & Tracking",
        "Automated Result Reporting",
        "Quality Control & Assurance",
        "Equipment Integration & Monitoring"
      ],
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      benefits: [
        "Reduce turnaround time by 50%",
        "Improve result accuracy & reliability",
        "Streamline laboratory workflow processes",
        "Enhance quality control measures"
      ]
    },
    {
      icon: Video,
      title: "Telemedicine Platform",
      description: "Secure virtual care platform with HD video consultations, remote monitoring, and digital prescription capabilities.",
      features: [
        "HD Video Consultations",
        "Remote Patient Monitoring",
        "Digital Prescriptions & E-Signatures",
        "Virtual Waiting Room Management",
        "Secure Messaging & File Sharing"
      ],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      benefits: [
        "Expand patient reach by 60%",
        "Reduce no-show rates dramatically",
        "Enable continuous patient care",
        "Increase practice revenue streams"
      ]
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Full compliance with healthcare regulations and data protection standards ensuring patient data security"
    },
    {
      icon: Cloud,
      title: "Cloud-Based Platform",
      description: "Access your hospital management system securely from anywhere, anytime with 99.9% uptime"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Native mobile apps for doctors, staff, and patients with seamless cross-platform experience"
    },
    {
      icon: Database,
      title: "Advanced Analytics",
      description: "Comprehensive reporting and analytics dashboard for data-driven healthcare decisions"
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Instant synchronization across all devices and locations with live data updates"
    },
    {
      icon: BarChart3,
      title: "Performance Insights",
      description: "Track key performance indicators and hospital metrics with customizable dashboards"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-12 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Comprehensive Healthcare Solutions
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              Transform your healthcare facility with our integrated hospital management platform. 
              Streamline operations, enhance patient care, and drive sustainable growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-700 font-semibold text-base sm:text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Request Demo
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-50 font-semibold text-base sm:text-lg transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Built for Modern Healthcare
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Our platform is specifically designed to meet the unique challenges and requirements of today's healthcare environment
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Complete Suite of Solutions
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Every module is designed to work seamlessly together, creating a unified healthcare management ecosystem
            </p>
          </div>

          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            {solutions.map((solution, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 sm:gap-10 lg:gap-12 items-center`}
              >
                {/* Content */}
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <solution.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{solution.title}</h3>
                  </div>
                  
                  <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                    {solution.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                        Key Features
                      </h4>
                      <ul className="space-y-2 sm:space-y-3">
                        {solution.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2 text-sm sm:text-base text-gray-600">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
                        Key Benefits
                      </h4>
                      <ul className="space-y-2 sm:space-y-3">
                        {solution.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start gap-2 text-sm sm:text-base text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-base"
                  >
                    Learn More About {solution.title}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Image */}
                <div className="flex-1 w-full">
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-48 sm:h-64 lg:h-80 xl:h-96 object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Seamless Integration Ecosystem
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              All modules work together in perfect harmony, sharing data and streamlining workflows across your entire healthcare organization
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-white">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
                  Ready to Transform Your Healthcare Facility?
                </h3>
                <p className="text-blue-100 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                  Join 50+ healthcare facilities that have streamlined their operations and improved patient care with DCM Hospital Management System.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-5 sm:px-6 py-3 rounded-lg hover:bg-gray-100 font-semibold transition-colors text-sm sm:text-base"
                  >
                    Get Started Today
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/pricing"
                    className="inline-flex items-center justify-center gap-2 border border-white text-white px-5 sm:px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 font-semibold transition-colors text-sm sm:text-base"
                  >
                    View Plans & Pricing
                  </Link>
                </div>
              </div>
              
              <div className="flex-1 w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { icon: Users, label: "Patient Portal" },
                    { icon: Stethoscope, label: "EHR System" },
                    { icon: CreditCard, label: "Billing" },
                    { icon: Pill, label: "Pharmacy" },
                    { icon: FlaskConical, label: "Laboratory" },
                    { icon: Video, label: "Telemedicine" }
                  ].map((item, index) => (
                    <div key={index} className="text-center p-3 sm:p-4 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors">
                      <item.icon className="w-6 h-6 sm:w-7 sm:h-7 mx-auto mb-1 sm:mb-2" />
                      <p className="text-xs sm:text-sm font-medium">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Start Your Digital Transformation Journey
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Schedule a personalized demo to see how DCM Hospital Management can transform your healthcare facility operations and patient care delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-700 font-semibold text-sm sm:text-base transition-colors shadow-lg hover:shadow-xl"
            >
              Request Personalized Demo
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-gray-100 font-semibold text-sm sm:text-base transition-colors"
            >
              Explore Pricing Options
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;