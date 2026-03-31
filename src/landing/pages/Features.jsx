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
  Heart,
  ChevronRight,
  Calendar,
  FileText,
  BarChart3
} from 'lucide-react';

const Solutions = () => {
  const solutions = [
    {
      featureId: "patient-management",
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
      image: "/assets/images/Patient.jpg",
      benefits: [
        "Reduce administrative workload by 40%",
        "Improve patient satisfaction scores by 35%",
        "Streamline communication processes",
        "Reduce no-show rates significantly"
      ]
    },
    {
      featureId: "doctor-portal",
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
      image: "/assets/images/Doctors.jpg",
      benefits: [
        "Increase doctor productivity by 30%",
        "Reduce medical errors by 45%",
        "Enable seamless remote consultations",
        "Improve clinical documentation accuracy"
      ]
    },
    {
      featureId: "billing-accounts",
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
      image: "/assets/images/Billing.jpeg",
      benefits: [
        "Reduce revenue leakage by 35%",
        "Accelerate insurance claims processing",
        "Improve cash flow management",
        "Automate payment collections"
      ]
    },
    {
      featureId: "pharmacy-management",
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
      image: "/assets/images/Pharmacy.jpg",
      benefits: [
        "Reduce medication waste by 25%",
        "Improve inventory turnover rate",
        "Enhance patient safety measures",
        "Streamline prescription fulfillment"
      ]
    },
    {
      featureId: "laboratory-lims",
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
      image: "/assets/images/Lab.jpeg",
      benefits: [
        "Reduce turnaround time by 50%",
        "Improve result accuracy & reliability",
        "Streamline laboratory workflow processes",
        "Enhance quality control measures"
      ]
    },
    {
      featureId: "telemedicine",
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
      image: "/assets/images/Tele.jpg",
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
      description: ""
    },
    {
      icon: Cloud,
      title: "Cloud-Based Platform",
      description: ""
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: ""
    },
    {
      icon: Database,
      title: "Advanced Analytics",
      description: ""
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: ""
    },
    {
      icon: BarChart3,
      title: "Performance Insights",
      description: ""
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {/* <section className="bg-gradient-to-br from-blue-50 to-blue-50 py-12 sm:py-12 lg:py-14 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Comprehensive Healthcare Solutions
            </h1>
            <p className="text-lg sm:text-xl lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
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
      </section> */}
 <section className="relative mt-12 overflow-hidden px-4 py-12">
        <div className="relative mx-auto min-h-[480px] max-w-7xl overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgba(0,41,91,0.18)] md:min-h-[560px]">
          <img
            src="/assets/images/Features.jpg"
            alt="Hospital management features"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,27,53,0.84)_0%,rgba(1,27,53,0.68)_42%,rgba(1,27,53,0.3)_100%)] sm:bg-[linear-gradient(90deg,rgba(1,27,53,0.86)_0%,rgba(1,27,53,0.72)_34%,rgba(1,27,53,0.38)_58%,rgba(1,27,53,0.12)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,94,184,0.35),transparent_28%)]" />

          <div className="relative z-10 flex min-h-[480px] items-center px-6 py-16 md:min-h-[560px] md:px-10 lg:px-14">
            <div className="max-w-3xl text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                <Zap className="h-4 w-4 text-red-300" />
                <span>Complete Healthcare Solution</span>
              </div>

              <h1 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Complete Hospital{" "}
                <span className="text-[#8ED8FF]">Management Suite</span>
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/88 md:text-lg">
                Transform your healthcare facility with our comprehensive, AI-powered management
                platform designed for modern medical practices and connected hospital operations.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
                {[
                  "Patient, doctor, lab and billing workflows in one connected platform",
                  "Real-time hospital visibility with secure, cloud-based access",
                  "Mobile-ready operations for staff, administrators and patients",
                  "Built to reduce delays, duplication and manual coordination",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90 backdrop-blur-md"
                  >
                    <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_0_6px_rgba(125,211,252,0.12)]" />
                    <span className="leading-6">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Solutions Grid */}
      <section className="py-12 sm:py-16 lg:py-10 bg-gray-50 md:px-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Complete Suite of <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Solutions </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Every module is designed to work seamlessly together, creating a unified healthcare management ecosystem
            </p>
          </div>

          <div className="space-y-16 sm:space-y-10 lg:space-y-14">
            {solutions.map((solution, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 sm:gap-10 lg:gap-12 items-center`}
              >
                {/* Content */}
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-2 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <solution.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-900">{solution.title}</h3>
                  </div>
                  
                  <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                    {solution.description}
                  </p>

                  <div className="mb-6 grid grid-cols-1 gap-4 sm:mb-8 sm:grid-cols-2 sm:gap-6">
                    <div className="group relative overflow-hidden rounded-[1.25rem] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,250,255,0.96))] p-4 shadow-[0_14px_36px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_20px_48px_rgba(0,94,184,0.12)] sm:p-5">
                      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-300" />
                      <div className="absolute right-3 top-3 h-16 w-16 rounded-full bg-sky-100/70 blur-2xl transition duration-300 group-hover:bg-cyan-100/80" />

                      <h4 className="relative mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 sm:text-base">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.12)]">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                        </div>
                        Key Features
                      </h4>
                      <ul className="relative space-y-2.5 sm:space-y-3">
                        {solution.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2.5 text-sm text-slate-600 sm:text-[0.96rem]">
                            <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="group relative overflow-hidden rounded-[1.25rem] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,250,255,0.96))] p-4 shadow-[0_14px_36px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_20px_48px_rgba(0,94,184,0.12)] sm:p-5">
                      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300" />
                      <div className="absolute right-3 top-3 h-16 w-16 rounded-full bg-amber-100/70 blur-2xl transition duration-300 group-hover:bg-orange-100/80" />

                      <h4 className="relative mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 sm:text-base">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shadow-[inset_0_0_0_1px_rgba(245,158,11,0.14)]">
                          <Zap className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                        </div>
                        Key Benefits
                      </h4>
                      <ul className="relative space-y-2.5 sm:space-y-3">
                        {solution.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start gap-2.5 text-sm text-slate-600 sm:text-[0.96rem]">
                            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    to={`/features/${solution.featureId}`}
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
      <section className="py-12 sm:py-16 lg:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Seamless Integration <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Ecosystem</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              All modules work together in perfect harmony, sharing data and streamlining workflows across your entire healthcare organization
            </p>
          </div>

          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl text-white shadow-[0_26px_70px_rgba(0,41,91,0.18)]">
            <img
              src="/assets/images/Features2.jpeg"
              alt="Seamless healthcare integration"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,27,53,0.84)_0%,rgba(1,27,53,0.74)_42%,rgba(1,27,53,0.45)_100%)] sm:bg-[linear-gradient(90deg,rgba(1,27,53,0.88)_0%,rgba(1,27,53,0.76)_35%,rgba(1,27,53,0.45)_60%,rgba(1,27,53,0.28)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,94,184,0.35),transparent_28%)]" />

            <div className="relative flex flex-col items-center gap-8 p-6 sm:p-8 lg:flex-row lg:gap-12 lg:p-12">
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
                  Ready to Transform Your Healthcare Facility?
                </h3>
                <p className="text-white/85 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                  Join 50+ healthcare facilities that have streamlined their operations and improved patient care with Levitica Hospital Management System.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    to="/request-demo"
                    className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-blue-500/55 px-5 py-3 text-sm font-semibold text-white backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-blue-600/40 sm:px-6 sm:text-base"
                  >
                    Get Started Today
                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                      <div className="relative h-full w-10 bg-white/30" />
                    </div>
                  </Link>
                  <Link
                    to="/pricing"
                    className="group relative z-10 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-sky-100 bg-white px-3.5 py-1.5 text-sm text-gray-900 shadow-[0_14px_32px_rgba(15,23,42,0.12)] isolation-auto before:absolute before:-left-full before:-z-10 before:aspect-square before:w-full before:rounded-full before:bg-[#005EB8] before:transition-all before:duration-700 hover:text-white before:hover:left-0 before:hover:w-full before:hover:scale-150 before:hover:duration-700 sm:px-4 sm:py-2 sm:text-base lg:font-semibold"
                  >
                    View Plans & Pricing
                    <svg
                      className="h-7 w-7 rotate-45 justify-end rounded-full border border-gray-300 bg-slate-50 p-1.5 duration-300 ease-linear group-hover:rotate-90 group-hover:border-white/20 group-hover:bg-white group-hover:shadow-sm sm:h-8 sm:w-8 sm:p-2"
                      viewBox="0 0 16 19"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                        className="fill-gray-800 group-hover:fill-[#005EB8]"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="flex-1 w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { icon: Users, label: "Patient Portal" },
                    { icon: Stethoscope, label: "Doctor Portal" },
                    { icon: CreditCard, label: "Billing" },
                    { icon: Pill, label: "Pharmacy" },
                    { icon: FlaskConical, label: "Laboratory" },
                    { icon: Video, label: "Telemedicine" }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-white/20 bg-white/18 p-3 text-center shadow-[0_12px_28px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/28 hover:shadow-[0_18px_36px_rgba(255,255,255,0.14)] sm:p-4"
                    >
                      <item.icon className="mx-auto mb-1 h-6 w-6 sm:mb-2 sm:h-7 sm:w-7" />
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
      <section className="py-12 sm:py-16 lg:py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Start Your Digital <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Transformation Journey</span> 
          </h2>
          {/* <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Schedule a personalized demo to see how Levitica Hospital Management can transform your healthcare facility operations and patient care delivery.
          </p> */}
          <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:mb-8 sm:flex-row sm:gap-4">
            <Link to="/download" className="transition-transform duration-300 hover:-translate-y-1">
              <img
                src="/assets/images/appstore.png"
                alt="Download on the App Store"
                className="h-14 w-auto sm:h-16"
              />
            </Link>
            <Link to="/download" className="transition-transform duration-300 hover:-translate-y-1">
              <img
                src="/assets/images/playstore.png"
                alt="Get it on Google Play"
                className="h-14 w-auto sm:h-16"
              />
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/request-demo"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:px-6 sm:py-3"
            >
              Request Personalized Demo
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 sm:px-6 sm:py-3"
            >
              Explore Pricing Options
            </Link>
          </div>
        </div>
      </section>

      {/* Custom CSS to hide scrollbar but maintain functionality */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Safari and Chrome */
        }
      `}</style>
    </div>
  );
};

export default Solutions;
