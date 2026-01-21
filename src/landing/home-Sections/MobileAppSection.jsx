import React from "react";
import { Smartphone, Activity, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const MobileAppSection = () => {
  return (
    <section className="py-12 md:py-10 relative overflow-hidden">
      <div className="absolute top-10 left-5% opacity-5 animate-pulse">
        <Smartphone className="w-12 h-12 md:w-16 md:h-16 text-blue-400" />
      </div>
      <div className="absolute bottom-10 right-10% opacity-5 animate-bounce delay-300">
        <Activity className="w-10 h-10 md:w-14 md:h-14 text-green-400" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Complete Hospital Management <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">On Your Mobile</span>
            </h2>

            <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
              Access all hospital management features on iOS and Android devices. 
              <span className="font-semibold text-blue-600"> Free for all subscribers</span> with no additional cost.
              All platform features are available on mobile, including telemedicine, lab results, and real-time analytics.
              Push notifications keep you updated about appointments, lab results, and important alerts instantly.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-green-500 mt-2 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900">Real-time Patient Management</h4>
                  <p className="text-gray-600 text-sm">Access patient records, schedule appointments, and update medical history on the go.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-green-500 mt-2 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900">Doctor Portal Access</h4>
                  <p className="text-gray-600 text-sm">Doctors can view schedules, write prescriptions, and consult patients from anywhere.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-green-500 mt-2 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900">Billing & Payments</h4>
                  <p className="text-gray-600 text-sm">Process bills, accept payments, and manage accounts directly from mobile.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-green-500 mt-2 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900">White Label & Customization</h4>
                  <p className="text-gray-600 text-sm">Customize the platform with your hospital's branding, logo, and colors.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                to="/features" 
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View All Features
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/download" 
                className="group inline-flex items-center px-6 py-3 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Download App Now
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto max-w-sm md:max-w-lg">
              <img
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Hospital Management Mobile App"
                className="rounded-3xl shadow-2xl border-8 border-white"
              />
              <div className="absolute -bottom-1 -right-1 bg-white rounded-2xl p-2 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Smartphone className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Free for Subscribers</p>
                    <p className="text-sm text-gray-600">Available on App Store & Play Store</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;