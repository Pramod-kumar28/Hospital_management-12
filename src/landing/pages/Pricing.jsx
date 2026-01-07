

import { useState } from 'react';
import { Link } from "react-router-dom";
import { 
  Activity, 
  Menu, 
  ChevronRight, 
  CheckCircle2, 
  ChevronDown, 
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Star,
  Zap
} from "lucide-react";

export default function Pricing() {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const faqs = [
    {
      question: "Is DCM Hospital Management suitable for small clinics?",
      answer: "Absolutely! We offer a Free plan perfect for small clinics with up to 50 patients. You can upgrade as your practice grows."
    },
    {
      question: "How secure is patient data?",
      answer: "We implement end-to-end encryption, role-based access control with 2FA, comprehensive audit logging, and comply with HIPAA, GDPR, and Indian IT Act standards."
    },
    {
      question: "Can I access the system on mobile devices?",
      answer: "Yes! DCM is available on iOS, Android, and Web platforms. Standard and Premium plans include mobile app access."
    },
    {
      question: "Do you provide training and support?",
      answer: "Yes, we provide comprehensive onboarding, training materials, and support via email, phone (24/7 for Premium), and dedicated account managers."
    },
    {
      question: "Can I integrate DCM with existing systems?",
      answer: "Premium plans include custom integration support. We can integrate with payment gateways, lab equipment, and other healthcare systems."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! Standard and Premium plans come with a 14-day free trial. No credit card required."
    }
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Page Hero */}
      <section className="py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your healthcare facility's needs
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <PricingCard
              name="Free"
              description="Perfect for small clinics getting started"
              price="₹0"
              period="/forever"
              features={[
                "Up to 50 patients",
                "Basic appointment scheduling",
                "Patient registration",
                "Digital prescriptions",
                "Email support",
                "Web access only"
              ]}
              buttonText="Start Free Trial"
              buttonVariant="outline"
              buttonLink="/signup"
              icon={<Activity className="w-6 h-6" />}
              gradient="from-gray-400 to-gray-600"
            />

            {/* Standard Plan - Featured */}
            <PricingCard
              name="Standard"
              description="Ideal for growing healthcare facilities"
              price="₹2,000"
              period="/per month"
              features={[
                "Up to 500 patients",
                "All Free features",
                "Billing & accounts management",
                "Pharmacy management",
                "Laboratory (LIMS)",
                "Basic analytics & reports",
                "Mobile app access",
                "Priority email support"
              ]}
              buttonText="Get Started"
              buttonVariant="primary"
              buttonLink="/signup"
              featured={true}
              badgeText="Most Popular"
              icon={<Zap className="w-6 h-6" />}
              gradient="from-blue-500 to-purple-600"
            />

            {/* Premium Plan */}
            <PricingCard
              name="Premium"
              description="Complete solution for multi-specialty hospitals"
              price="₹5,000"
              period="/per month"
              features={[
                "Unlimited patients",
                "All Standard features",
                "Telemedicine module",
                "Advanced analytics & AI insights",
                "Multi-location support",
                "Custom integrations",
                "Dedicated account manager",
                "24/7 phone & chat support",
                "White-label options"
              ]}
              buttonText="Get Started"
              buttonVariant="outline"
              buttonLink="/contact"
              icon={<Star className="w-6 h-6" />}
              gradient="from-amber-500 to-orange-600"
            />
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              All plans include free updates, secure data storage, and HIPAA compliance
            </p>
            <p className="text-gray-500 text-sm">
              Need a custom enterprise solution? <Link to="/contact" className="text-blue-600 hover:underline">Contact our sales team</Link>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  className="w-full flex justify-between items-center py-6 text-left hover:bg-gray-100 rounded-lg px-4 transition-colors duration-200"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-lg font-medium text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      openAccordion === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openAccordion === index ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed px-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 bg-gradient-to-r from-white-600 to-white-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-black-100 mb-8 max-w-3xl mx-auto">
            Join 50+ healthcare facilities already using DCM Hospital Management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/signup" 
              className="group inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 text-lg hover:scale-105 hover:shadow-lg"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link 
              to="/contact" 
              className="group inline-flex items-center border-2 border-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 text-lg hover:scale-105"
            >
              Request Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function PricingCard({ 
  name, 
  description, 
  price, 
  period, 
  features, 
  buttonText, 
  buttonVariant, 
  buttonLink, 
  featured = false, 
  badgeText,
  icon,
  gradient
}) {
  return (
    <div className={`group relative bg-white rounded-2xl p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 ${
      featured ? 'border-2 border-blue-600 scale-105 z-10' : 'border border-gray-200'
    }`}>
      
      {/* Animated Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      
      {/* Shine Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shine"></div>
      
      {featured && badgeText && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
          {badgeText}
        </div>
      )}
      
      {/* Icon with hover animation */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${gradient} text-white mb-3 group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">{name}</h3>
        <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">{description}</p>
      </div>
      
      {/* Price with hover effect */}
      <div className="text-center mb-8 group-hover:scale-105 transition-transform duration-300">
        <span className="text-4xl font-bold text-gray-900">{price}</span>
        <span className="text-gray-600 text-lg">{period}</span>
      </div>
      
      {/* Features list with staggered animations */}
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li 
            key={index} 
            className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300"
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors duration-300">{feature}</span>
          </li>
        ))}
      </ul>
      
      {/* Button with enhanced hover effects */}
      <Link 
        to={buttonLink}
        className={`group/btn relative block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 overflow-hidden ${
          buttonVariant === 'primary' 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg' 
            : 'border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50'
        }`}
      >
        {/* Button shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/btn:opacity-30 group-hover/btn:animate-shine"></div>
        
        <span className="relative z-10 group-hover/btn:scale-105 transition-transform duration-200">
          {buttonText}
        </span>
      </Link>

      {/* Floating elements on hover */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500"></div>
      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500 delay-200"></div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              DCM Hospital
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Modern, secure, and scalable hospital management system trusted by healthcare professionals worldwide.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4" />
                <span>info@dcmhospital.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                <span>+91 1800-123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/solutions" className="text-gray-400 hover:text-white transition-colors">Solutions</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/hipaa-compliance" className="text-gray-400 hover:text-white transition-colors">HIPAA Compliance</Link></li>
              <li><Link to="/security" className="text-gray-400 hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 DCM Hospital Management. All rights reserved.
          </p>
          <div className="flex gap-3">
            <a 
              href="https://facebook.com/dcmhospital" 
              className="w-10 h-10 bg-gray-800 text-gray-400 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href="https://twitter.com/dcmhospital" 
              className="w-10 h-10 bg-gray-800 text-gray-400 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all duration-300 hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href="https://linkedin.com/company/dcmhospital" 
              className="w-10 h-10 bg-gray-800 text-gray-400 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all duration-300 hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="https://instagram.com/dcmhospital" 
              className="w-10 h-10 bg-gray-800 text-gray-400 rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all duration-300 hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://youtube.com/dcmhospital" 
              className="w-10 h-10 bg-gray-800 text-gray-400 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}