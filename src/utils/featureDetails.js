// featureDetails.js
import { 
  Users, Stethoscope, CreditCard, Pill, FlaskConical, Video, 
  BarChart3, Building2, Smartphone, Shield, Database 
} from "lucide-react";

export const featureDetails = {
  "patient-management": {
    id: "patient-management",
    title: "Patient Management",
    description: "Complete patient registration, medical history, and intelligent appointment scheduling with comprehensive OPD/IPD management and digital discharge processes.",
    longDescription: "Our comprehensive patient management system transforms the entire patient journey from initial registration through treatment and follow-up care, ensuring seamless coordination across all departments with AI-powered automation and real-time tracking.",
    image: "https://images.unsplash.com/photo-1758691461932-d0aa0ebf6b31?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGF0aWVudCUyMG1hbmFnZW1lbnR8ZW58MHx8MHx8fDA%3D",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    features: [
      "Complete patient registration with demographic and insurance information",
      "Digital medical history and comprehensive health records management",
      "Intelligent appointment scheduling with automatic conflict resolution",
      "OPD/IPD management with discharge and therapy tracking",
      "Centralized document management for lab reports and prescriptions",
      "Secure patient portal for medical records access and appointment booking",
      "Automated reminders for appointments, medications, and follow-ups",
      "Multi-language support and accessibility features for diverse patient needs"
    ],
    stats: {
      "Faster Registration": "40%",
      "Reduced No-Shows": "60%",
      "Patient Satisfaction": "95%",
      "HIPAA Compliant": "Yes"
    },
    benefits: [
      "40% Faster Registration",
      "60% Reduced No-Shows",
      "95% Patient Satisfaction",
      "HIPAA Compliant"
    ],
    additionalPoints: [
      "OPD/IPD management system",
      "Digital discharge and therapy",
      "Medical history tracking"
    ]
  },
  "doctor-portal": {
    id: "doctor-portal",
    title: "Doctor Portal",
    description: "Secure dashboard with digital prescriptions and comprehensive patient records, enabling efficient patient management and clinical decision-making.",
    longDescription: "Our doctor portal provides healthcare professionals with an intuitive dashboard to manage their practice efficiently while maintaining focus on patient care and clinical excellence. Streamline workflows and enhance collaboration.",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9jdG9yc3xlbnwwfHwwfHx8MA%3D%3D",
    icon: Stethoscope,
    color: "from-green-500 to-emerald-500",
    features: [
      "Secure login with individual doctor credentials and authentication",
      "Smart appointment calendar with real-time updates and notifications",
      "Digital prescription creation with intelligent drug interaction alerts",
      "Comprehensive access to complete patient medical history",
      "Advanced treatment plan documentation and progress tracking",
      "Integrated lab test ordering and instant result viewing",
      "Queue management and appointment dashboard for efficient workflow",
      "Mobile app access for on-the-go patient management"
    ],
    stats: {
      "Time Savings": "30%",
      "Error Reduction": "98%",
      "Mobile Access": "24/7",
      "Collaboration": "Enhanced"
    },
    benefits: [
      "30% Time Savings",
      "Enhanced Collaboration",
      "98% Reduced Errors",
      "Mobile Access"
    ],
    additionalPoints: [
      "Secure doctor credentials",
      "Appointment dashboard",
      "Digital prescription system"
    ]
  },
  "billing-accounts": {
    id: "billing-accounts",
    title: "Billing & Accounts",
    description: "Automated billing, insurance claims, and financial reporting system with integrated payment gateways and revenue tracking capabilities.",
    longDescription: "Our comprehensive billing and accounts module streamlines financial management for healthcare facilities of all sizes, ensuring accuracy, compliance, and revenue optimization with automated processes.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJpbGxpbmclMjBkYXNoYm9hcmR8ZW58MHx8fHwxNzYyNTI3MDQ4fDA&ixlib=rb-4.1.0&q=85",
    icon: CreditCard,
    color: "from-purple-500 to-pink-500",
    features: [
      "Flexible OPD and IPD billing with customizable templates",
      "Comprehensive payment tracking with multiple payment method support",
      "Automated insurance claim processing with intelligent validation",
      "Payment gateway integration for secure online transactions",
      "Real-time revenue reconciliation and financial reporting",
      "Automated tax calculation and regulatory compliance management",
      "Advanced financial analytics and revenue cycle optimization",
      "Financial transparency reports for stakeholders"
    ],
    stats: {
      "Faster Claims": "40%",
      "Accuracy": "99.9%",
      "Reporting": "Real-time",
      "Compliance": "Automated"
    },
    benefits: [
      "40% Faster Claims",
      "Reduced Revenue Leakage",
      "Automated Compliance",
      "Real-time Insights"
    ],
    additionalPoints: [
      "OPD/IPD billing",
      "Insurance claim processing",
      "Payment gateway integration",
      "Financial transparency"
    ]
  },
  "pharmacy-management": {
    id: "pharmacy-management",
    title: "Pharmacy Management",
    description: "Inventory control, prescription tracking, and automated purchase orders with real-time stock alerts and expiry management.",
    longDescription: "Streamline pharmacy operations with intelligent inventory management, prescription tracking, and automated procurement to ensure medication availability and patient safety.",
    image: "https://images.unsplash.com/photo-1642055514517-7b52288890ec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGhhcm1hY3l8ZW58MHx8MHx8fDA%3D",
    icon: Pill,
    color: "from-orange-500 to-red-500",
    features: [
      "Real-time inventory tracking and stock management",
      "Automated purchase orders and supplier management",
      "Prescription tracking and medication dispensing",
      "Expiry date management and alert system",
      "Integration with billing and patient records",
      "Mobile inventory access for pharmacy staff",
      "Compliance with pharmaceutical regulations",
      "Reporting and analytics for inventory optimization"
    ],
    stats: {
      "Accuracy": "99%",
      "Stock Optimization": "30%",
      "Order Automation": "80%",
      "Compliance": "100%"
    },
    benefits: [
      "99% Accuracy",
      "Stock Management Alerts",
      "Automated Purchase Orders",
      "Mobile Inventory Access"
    ],
    additionalPoints: [
      "Stock management alerts",
      "Automated purchase orders",
      "Billing system integration",
      "Mobile inventory access"
    ]
  },
  "laboratory-lims": {
    id: "laboratory-lims",
    title: "Laboratory (LIMS)",
    description: "Streamlined lab operations with test registration and secure result access, including quality control workflows and sample tracking.",
    longDescription: "Our Laboratory Information Management System (LIMS) automates lab workflows, ensures quality control, and provides secure access to test results for better patient care coordination.",
    image: "https://images.unsplash.com/photo-1614308456595-a59d48697ea8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhYm9yYXRvcnl8ZW58MHx8MHx8fDA%3D",
    icon: FlaskConical,
    color: "from-indigo-500 to-blue-500",
    features: [
      "Test registration and tracking system",
      "Quality control workflows and compliance",
      "Secure result access for doctors",
      "Sample management and tracking",
      "Integration with electronic health records",
      "Automated notifications for critical results",
      "Inventory management for lab supplies",
      "Comprehensive reporting and analytics"
    ],
    stats: {
      "Faster Results": "50%",
      "Accuracy": "99.5%",
      "Turnaround Time": "Reduced",
      "Quality Control": "Enhanced"
    },
    benefits: [
      "50% Faster Results",
      "Quality Control Workflows",
      "Doctor Notification System",
      "Sample Management"
    ],
    additionalPoints: [
      "Test registration tracking",
      "Quality control workflows",
      "Doctor notification system",
      "Sample management"
    ]
  },
  "telemedicine": {
    id: "telemedicine",
    title: "Telemedicine",
    description: "Secure video consultations and remote patient monitoring with appointment scheduling integration and secure communication channels.",
    longDescription: "Our telemedicine platform enables secure virtual consultations, remote patient monitoring, and seamless integration with existing healthcare workflows for comprehensive remote care delivery.",
    image: "https://images.unsplash.com/photo-1758691461932-d0aa0ebf6b31?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRlbGVtZWRpY2luZXxlbnwwfHwwfHx8MA%3D%3D",
    icon: Video,
    color: "from-teal-500 to-green-500",
    features: [
      "Secure video consultations with end-to-end encryption",
      "Remote patient monitoring and vital sign tracking",
      "Appointment scheduling and virtual waiting rooms",
      "Secure messaging and file sharing",
      "Prescription management and e-prescriptions",
      "Integration with electronic health records",
      "Multi-participant consultations",
      "Mobile app access for patients and doctors"
    ],
    stats: {
      "24/7 Access": "Yes",
      "Patient Reach": "Extended",
      "No-Show Rate": "Reduced",
      "Satisfaction": "Increased"
    },
    benefits: [
      "24/7 Access",
      "Extended Patient Reach",
      "Reduced No-Shows",
      "Increased Satisfaction"
    ],
    additionalPoints: [
      "Secure video consultations",
      "Appointment scheduling",
      "Remote monitoring",
      "Secure communication"
    ]
  },
  "analytics-reports": {
    id: "analytics-reports",
    title: "Analytics & Reports",
    description: "Real-time dashboards, performance metrics, and comprehensive reporting with AI-powered insights for data-driven decision making.",
    longDescription: "Our advanced analytics platform provides real-time insights, predictive analytics, and comprehensive reporting to help healthcare organizations make data-driven decisions and optimize operations.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDB8fHx8MTc2MjUyNzM2NHww&ixlib=rb-4.1.0&q=85",
    icon: BarChart3,
    color: "from-cyan-500 to-blue-500",
    features: [
      "Real-time dashboards with customizable widgets",
      "Predictive analytics and trend analysis",
      "Performance metrics and KPI tracking",
      "Compliance and regulatory reporting",
      "Financial analytics and revenue cycle insights",
      "Patient flow and operational efficiency analytics",
      "AI-powered insights and recommendations",
      "Export and sharing capabilities"
    ],
    stats: {
      "Data-Driven": "Decisions",
      "Real-time": "Insights",
      "AI-Powered": "Analytics",
      "Comprehensive": "Reports"
    },
    benefits: [
      "AI-Powered Insights",
      "Real-time Analytics",
      "Predictive Modeling",
      "Comprehensive Reporting"
    ],
    additionalPoints: [
      "Revenue analytics",
      "Patient flow analytics",
      "Performance tracking",
      "Compliance reports"
    ]
  },
  "hospital-admin": {
    id: "hospital-admin",
    title: "Hospital Admin",
    description: "Centralized dashboard for departments, staff, and performance metrics with equipment tracking and audit trail management.",
    longDescription: "The hospital administration module provides comprehensive tools for managing all aspects of hospital operations, from staff scheduling to equipment maintenance and performance monitoring.",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGFkbWluaXN0cmF0aW9ufGVufDB8fHx8MTc2MjUyNzM4Nnww&ixlib=rb-4.1.0&q=85",
    icon: Building2,
    color: "from-gray-600 to-gray-800",
    features: [
      "Centralized dashboard for all departments",
      "Staff scheduling and roster management",
      "Equipment tracking and maintenance scheduling",
      "Inventory and supply chain management",
      "Performance metrics and KPI monitoring",
      "Audit trail and compliance management",
      "Resource allocation and optimization",
      "Budget and expense tracking"
    ],
    stats: {
      "Complete Control": "Yes",
      "Operational Efficiency": "Improved",
      "Resource Optimization": "Enhanced",
      "Compliance": "Assured"
    },
    benefits: [
      "Complete Control",
      "Enhanced Efficiency",
      "Resource Optimization",
      "Compliance Assurance"
    ],
    additionalPoints: [
      "Department management",
      "Staff scheduling",
      "Equipment tracking",
      "Hospital reports"
    ]
  },
  "mobile-access": {
    id: "mobile-access",
    title: "Mobile Access",
    description: "Full platform access on iOS & Android mobile applications with offline functionality and push notifications.",
    longDescription: "Our mobile applications provide full access to the hospital management system on iOS and Android devices, enabling healthcare professionals to work efficiently from anywhere.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBoZWFsdGhjYXJlJTIwYXBwfGVufDB8fHx8MTc2MjUyNzQwOHww&ixlib=rb-4.1.0&q=85",
    icon: Smartphone,
    color: "from-purple-600 to-pink-600",
    features: [
      "iOS and Android native applications",
      "Offline functionality for remote areas",
      "Push notifications for critical alerts",
      "Secure biometric authentication",
      "Mobile-optimized user interfaces",
      "Camera integration for document capture",
      "Real-time synchronization",
      "Patient portal mobile access"
    ],
    stats: {
      "Mobile First": "Yes",
      "Offline Access": "Available",
      "Push Notifications": "Real-time",
      "Biometric Security": "Enabled"
    },
    benefits: [
      "Mobile First",
      "Offline Functionality",
      "Push Notifications",
      "Mobile Optimization"
    ],
    additionalPoints: [
      "iOS & Android apps",
      "Offline functionality",
      "Push notifications",
      "Mobile optimization"
    ]
  }
};

export const allFeatures = Object.values(featureDetails);