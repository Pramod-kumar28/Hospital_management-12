import React from "react";
import { Smartphone, Activity, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const mobileHighlights = [
  {
    title: "Real-time Patient Management",
    description: "Access patient records, schedule appointments, and update medical history on the go.",
  },
  {
    title: "Doctor Portal Access",
    description: "Doctors can view schedules, write prescriptions, and consult patients from anywhere.",
  },
  {
    title: "Billing & Payments",
    description: "Process bills, accept payments, and manage accounts directly from mobile.",
  },
  {
    title: "White Label & Customization",
    description: "Customize the platform with your hospital's branding, logo, and colors.",
  },
];

const MobileAppSection = () => {
  return (
    <section className="relative overflow-hidden bg-white pb-14 pt-8 md:pb-16 md:pt-10">
      <div className="absolute left-[-4rem] top-16 h-56 w-56 rounded-full bg-sky-100/70 blur-3xl" />
      <div className="absolute right-[-4rem] bottom-16 h-64 w-64 rounded-full bg-cyan-100/60 blur-3xl" />

      <div className="absolute top-10 left-5% opacity-5 animate-pulse">
        <Smartphone className="w-12 h-12 md:w-16 md:h-16 text-blue-400" />
      </div>
      <div className="absolute bottom-10 right-10% opacity-5 animate-bounce delay-300">
        <Activity className="w-10 h-10 md:w-14 md:h-14 text-green-400" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-5 py-2.5 text-sm font-semibold text-sky-700 shadow-[0_10px_24px_rgba(0,94,184,0.08)]">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            Mobile App
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            Complete Hospital Management{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              On Your Mobile
            </span>
          </h2>
          <p className="mb-8 text-base leading-8 text-slate-600 md:text-lg">
              Access all hospital management features on iOS and Android devices. 
              <span className="font-semibold text-blue-600"> Free for all subscribers</span> with no additional cost.
              All platform features are available on mobile, including telemedicine, lab results, and real-time analytics.
              Push notifications keep you updated about appointments, lab results, and important alerts instantly.
            </p>

          {/* <p className="mx-auto mb-12 mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            Built to give hospitals, doctors, and administrators one reliable mobile workflow for
            patient coordination, clinical access, billing visibility, and operational updates
            from anywhere.
          </p> */}
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            {/* <p className="mb-6 text-base leading-8 text-slate-600 md:text-lg">
              Access all hospital management features on iOS and Android devices. 
              <span className="font-semibold text-blue-600"> Free for all subscribers</span> with no additional cost.
              All platform features are available on mobile, including telemedicine, lab results, and real-time analytics.
              Push notifications keep you updated about appointments, lab results, and important alerts instantly.
            </p> */}

            <div className="mb-8 space-y-3">
              {mobileHighlights.map((item) => {
                return (
                  <div
                    key={item.title}
                    className="group rounded-[1.35rem] border border-sky-100 bg-white/95 px-5 py-4 shadow-[0_14px_36px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_20px_48px_rgba(0,94,184,0.12)]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_0_0_6px_rgba(0,94,184,0.08)] transition-transform duration-300 group-hover:scale-110" />

                      <div className="min-w-0">
                        <h4 className="text-base font-semibold text-slate-900 md:text-lg">{item.title}</h4>
                        <p className="mt-1.5 text-sm leading-6 text-slate-600 md:text-[0.96rem]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                to="/features" 
                className="group relative z-10 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-sky-100 bg-white px-3.5 py-1.5 text-sm text-gray-900 shadow-[0_14px_32px_rgba(15,23,42,0.12)] isolation-auto before:absolute before:-left-full before:-z-10 before:aspect-square before:w-full before:rounded-full before:bg-[#005EB8] before:transition-all before:duration-700 hover:text-white before:hover:left-0 before:hover:w-full before:hover:scale-150 before:hover:duration-700 sm:w-auto sm:px-4 sm:py-2 sm:text-base lg:font-semibold"
              >
                View All Features
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
              <Link 
                to="/download" 
                className="group inline-flex w-full items-center justify-center rounded-xl border-2 border-blue-600 px-6 py-3 text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white sm:w-auto"
              >
                Download App Now
              </Link>
            </div>
          </div>

          <div className="relative order-first md:order-none">
            <div className="relative mx-auto max-w-xs sm:max-w-sm md:max-w-lg">
              <img
                src="/assets/images/HMS App.png"
                alt="Hospital Management Mobile App"
                className="rounded-3xl border-8 border-white shadow-2xl"
              />
              <div className="absolute -bottom-1 -right-1 rounded-2xl bg-white p-2 shadow-2xl">
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
