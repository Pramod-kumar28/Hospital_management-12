import React from "react";
import { 
  Building2, Users, Stethoscope, CreditCard, Pill, FlaskConical, 
  Video, BarChart3, ArrowRight, Heart, Stethoscope as StethoscopeIcon 
} from "lucide-react";
import { Link } from "react-router-dom";

const FeaturesModulesSection = () => {
  const features = [
    { icon: Building2, title: "Hospital Admin", desc: "Department, staff & performance management", color: "from-gray-600 to-gray-800" },
    { icon: Users, title: "Patient Management", desc: "Registration, scheduling & medical history", color: "from-blue-500 to-cyan-500" },
    { icon: Stethoscope, title: "Doctor Portal", desc: "Secure access & digital prescriptions", color: "from-green-500 to-emerald-500" },
    { icon: CreditCard, title: "Billing & Accounts", desc: "Financial management & insurance claims", color: "from-purple-500 to-pink-500" },
    { icon: Pill, title: "Pharmacy Management", desc: "Inventory control & sales tracking", color: "from-orange-500 to-red-500" },
    { icon: FlaskConical, title: "Lab Management", desc: "Lab workflows & test result processing", color: "from-indigo-500 to-blue-500" },
    { icon: Video, title: "Telemedicine", desc: "Secure video consultations & remote care", color: "from-teal-500 to-green-500" },
    { icon: BarChart3, title: "Analytics & Reporting", desc: "Real-time insights & performance tracking", color: "from-cyan-500 to-blue-500" },
  ];

  return (
    <section className="py-12 md:py-10 relative overflow-hidden" id="features-modules">
      <div className="absolute top-10 left-5% opacity-5 animate-pulse">
        <Heart className="w-8 h-8 md:w-12 md:h-12 text-red-400" />
      </div>
      <div className="absolute bottom-10 right-5% opacity-5 animate-bounce delay-500">
        <StethoscopeIcon className="w-10 h-10 md:w-14 md:h-14 text-blue-400" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Complete Hospital Management Suite
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Everything you need to run a modern healthcare facility efficiently.
            Our comprehensive platform integrates all hospital operations for seamless workflow.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-blue-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-cyan-50 to-transparent z-10 pointer-events-none"></div>

          <div className="overflow-x-auto md:overflow-hidden">
            <div className="flex min-w-max desktop-scroll">
              {[...features, ...features].map(({ icon: Icon, title, desc, color }, index) => (
                <div key={`${title}-${index}`} className="flex-shrink-0 w-64 md:w-72 mx-2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl hover:border-blue-300 transition-all duration-300 p-6 h-full">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900">{title}</h3>
                    </div>
                    <div className="pt-1">
                      <p className="text-gray-600 text-sm md:text-base">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:hidden text-center mt-6">
          <div className="inline-flex items-center gap-2 text-blue-600 bg-blue-100 px-4 py-2 rounded-full">
            <span className="text-sm font-medium">← Swipe to explore modules →</span>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/features" 
            className="group inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Explore All features
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @media (min-width: 768px) {
          .desktop-scroll {
            animation: scroll 40s linear infinite;
            width: max-content;
          }
          .desktop-scroll:hover { animation-play-state: paused; }
        }
        
        .overflow-x-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .overflow-x-auto::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default FeaturesModulesSection;