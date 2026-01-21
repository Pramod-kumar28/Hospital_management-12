import React from "react";
import { Zap, ArrowRight, CheckCircle2, Heart, Stethoscope, Pill, FlaskConical, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = ({ isVisible }) => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Enhanced Health-themed Animated Background Elements */}
      <div className="absolute top-20 left-4 md:left-10 opacity-10 animate-pulse">
        <Heart className="w-12 h-12 md:w-16 md:h-16 text-red-400" />
      </div>
      <div className="absolute bottom-20 right-4 md:right-10 opacity-10 animate-bounce">
        <Stethoscope className="w-12 h-12 md:w-16 md:h-16 text-blue-400" />
      </div>
      <div className="absolute top-1/3 left-1/4 opacity-5 animate-pulse delay-1000">
        <Pill className="w-8 h-8 md:w-12 md:h-12 text-green-400" />
      </div>
      <div className="absolute top-1/2 right-1/4 opacity-5 animate-bounce delay-500">
        <Heart className="w-10 h-10 md:w-14 md:h-14 text-pink-400" />
      </div>
      <div className="absolute top-10 right-1/3 opacity-5 animate-pulse delay-700">
        <Activity className="w-8 h-8 md:w-12 md:h-12 text-purple-400" />
      </div>
      <div className="absolute bottom-40 left-1/4 opacity-5 animate-bounce delay-1200">
        <FlaskConical className="w-10 h-10 md:w-14 md:h-14 text-orange-400" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full px-4 py-2 mb-6 animate-pulse shadow-lg">
              <Zap size={16} className="animate-bounce" />
              <span className="font-semibold text-sm">Multi-Tenant SaaS Platform</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-4">
              Modern Hospital{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Management Made Simple
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Streamline operations, improve patient care, and boost efficiency with our comprehensive
              hospital management system trusted by 50+ healthcare facilities. Our platform integrates all hospital departments into one seamless workflow for optimal coordination and patient outcomes.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <Link 
                to="/contact" 
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Request Demo
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/features" 
                className="group inline-flex items-center px-6 py-3 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                View Features
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-500 animate-pulse" size={20} />
                <span className="font-medium">14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-500 animate-pulse" size={20} />
                <span className="font-medium">No credit card required</span>
              </div>
            </div>
          </div>

          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <img
              className="w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              alt="Modern Hospital Management"
              src="https://images.unsplash.com/photo-1758691461888-b74515208d7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGhlYWx0aGNhcmUlMjB0ZWNobm9sb2d5fGVufDB8fHx8MTc2MjMzMzEzMXww&ixlib=rb-4.1.0&q=85"
            />
            <div className="absolute left-4 bottom-4 bg-white rounded-xl shadow-2xl p-4 flex items-center gap-3 transform hover:scale-105 transition-transform duration-300">
              <span className="w-12 h-12 rounded-lg bg-green-500 text-white flex items-center justify-center animate-pulse">
                <Heart className="w-6 h-6" />
              </span>
              <div>
                <p className="font-semibold text-sm text-gray-900">99.9% Uptime</p>
                <p className="text-xs text-gray-500">Guaranteed Reliability</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;