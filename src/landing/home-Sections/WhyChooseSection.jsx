import React, { useRef, useState, useEffect } from "react";
import { Shield, Zap, Globe, Lock, Building2, Users, ArrowRight } from "lucide-react";

const WhyChooseSection = () => {
  const whyChooseItems = [
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      sub: "HIPAA & GDPR compliant with end-to-end encryption and multi-layer security protocols"
    },
    {
      icon: Zap,
      title: "Lightning Fast Performance",
      sub: "Cloud-based infrastructure ensures 99.9% uptime with real-time data processing"
    },
    {
      icon: Globe,
      title: "Multi-Platform Access",
      sub: "Web, iOS, and Android apps for seamless access from any device, anywhere"
    },
    {
      icon: Lock,
      title: "Data Privacy First",
      sub: "Your data stays secure with role-based access control and comprehensive audit trails"
    },
    {
      icon: Building2,
      title: "Scalable Infrastructure",
      sub: "Grow from single clinic to multi-hospital chain without system changes"
    },
    {
      icon: Users,
      title: "Dedicated Support",
      sub: "24/7 customer support with dedicated account managers for each facility"
    }
  ];

  const whyChooseScrollRef = useRef(null);
  const [currentWhyChoose, setCurrentWhyChoose] = useState(0);

  const handleWhyChooseDotClick = (index) => {
    setCurrentWhyChoose(index);
    if (whyChooseScrollRef.current) {
      const scrollAmount = whyChooseScrollRef.current.clientWidth * index;
      whyChooseScrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const nextWhyChoose = () => {
    const nextIndex = (currentWhyChoose + 1) % whyChooseItems.length;
    handleWhyChooseDotClick(nextIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextWhyChoose();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentWhyChoose]);

  return (
    <section className="py-8 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="hidden md:block relative">
            <img
              alt="Healthcare Technology"
              className="w-full rounded-2xl shadow-2xl border-4 border-white/20 transform hover:scale-105 transition-transform duration-500"
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            />
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              Why Healthcare Facilities <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Choose DCM</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
              Built with modern technology and healthcare expertise to deliver the best experience for hospitals,
              doctors, and patients across India.
            </p>

            <div className="md:hidden">
              <div className="space-y-4">
                {whyChooseItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100 hover:border-blue-300 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center flex-shrink-0">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.sub}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <img
                  alt="Healthcare Technology"
                  className="w-full rounded-xl shadow-lg border-4 border-white/20"
                  src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                />
              </div>
            </div>

            <div className="hidden md:block relative">
              <div 
                ref={whyChooseScrollRef}
                className="flex overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide space-x-6"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {whyChooseItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex-shrink-0 w-full snap-center p-6 md:p-8 rounded-2xl cursor-pointer hover:border-blue-300 transition-all duration-300 group"
                  >
                    <div className="relative z-10 text-center">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center mb-4 md:mb-6 shadow-lg mx-auto group-hover:scale-110 transition-transform duration-300">
                        <item.icon size={24} className="md:w-8 md:h-8" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-blue-600 transition-colors duration-300">{item.title}</h3>
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-3 mt-6">
                {whyChooseItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleWhyChooseDotClick(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === currentWhyChoose 
                        ? 'bg-blue-600 w-6 md:w-8' 
                        : 'bg-blue-300 hover:bg-blue-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseSection;