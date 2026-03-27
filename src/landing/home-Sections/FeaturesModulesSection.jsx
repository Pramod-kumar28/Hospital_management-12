import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  BarChart3,
  Building2,
  CreditCard,
  FlaskConical,
  Pill,
  Stethoscope,
  UserCog,
  Users,
  Video,
} from "lucide-react";
import { Link } from "react-router-dom";

const modules = [
  {
    icon: BarChart3,
    label: "Reports",
    sub: "Analytics",
    color: "from-cyan-500 to-blue-500",
    headline: "Lead every decision with real-time hospital intelligence",
    description:
      "Give administrators instant visibility into occupancy, revenue, department productivity and operational trends through one analytics layer designed for faster, better hospital decisions.",
    points: ["Live dashboards", "Department summaries", "Executive reporting"],
    image: "/assets/images/Reports.jpg",
  },
  {
    icon: FlaskConical,
    label: "Lab",
    sub: "Tests & Records & inventory",
    color: "from-indigo-500 to-blue-500",
    headline: "Accelerate lab workflows from request to approved result",
    description:
      "Coordinate sample intake, processing, approvals ,report delivery and inventory management in a single digital lab system that reduces delays and improves turnaround time.",
    points: ["Sample tracking", "Result validation", "Inventory management"],
    image: "/assets/images/Lab.jpeg",
  },
  {
    icon: Building2,
    label: "Admin",
    sub: "Operations",
    color: "from-slate-700 to-slate-900",
    headline: "Run hospital operations from one administrative command center",
    description:
      "Control departments, staff activity, schedules and day-to-day operational oversight through one central workspace built for hospital leadership teams.",
    points: ["Department oversight", "Staff coordination", "Operational control"],
    image: "/assets/images/Hero.jpg",
  },
  {
    icon: Pill,
    label: "Pharmacy",
    sub: " Inventory & dispensing",
    color: "from-orange-500 to-red-500",
    headline: "Keep pharmacy operations accurate, stocked and connected",
    description:
      "Manage medicine inventory, prescriptions, stock alerts and dispensing workflows with a pharmacy module that stays aligned with the rest of the hospital system.",
    points: ["Stock visibility", "Prescription mapping", "Dispensing records"],
    image: "/assets/images/Pharmacy.jpg",
  },
  {
    icon: Video,
    label: "Telemedicine",
    sub: "Remote care",
    color: "from-emerald-500 to-teal-500",
    headline: "Extend care beyond the hospital with connected virtual workflows",
    description:
      "Support remote consultations, follow-ups and virtual communication while keeping every interaction tied to the patient’s clinical history.",
    points: ["Remote consultations", "Follow-up continuity", "Unified patient context"],
    image: "/assets/images/Tele.jpg",
  },
  {
    icon: CreditCard,
    label: "Billing",
    sub: "Payments",
    color: "from-violet-500 to-fuchsia-500",
    headline: "Simplify hospital billing with stronger financial control",
    description:
      "Our comprehensive billing and accounts module streamlines financial management for healthcare facilities of all sizes, ensuring accuracy, compliance, and revenue optimization with automated processes.",
    points: ["Invoice generation", "Insurance support", "Payment tracking"],
    image: "/assets/images/Billing.jpeg",
  },
  {
    icon: Users,
    label: "Patients",
    sub: "Care",
    color: "from-sky-500 to-cyan-500",
    headline: "complete patient journey from registration to records",
    description:
      "Organize registrations, appointments, histories and records so every patient touchpoint stays connected and every department works from the same source of truth.",
    points: ["Registration flow", "Appointment handling", "Medical record access"],
    image: "/assets/images/Patient.jpg",
  },
  {
    icon: Stethoscope,
    label: "Doctors",
    sub: "Clinical",
    color: "from-green-500 to-emerald-500",
    headline: "Give doctors a faster, more focused clinical workspace",
    description:
      "Give doctors fast access to consultations, patient details, prescriptions and key clinical actions inside one streamlined workspace.",
    points: ["Consultation workflow", "Prescription support", "Patient context"],
    image: "/assets/images/Doctors.jpg",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const orbitRadiusPercent = (235 / 680) * 100;

function getOrbitPoint(index, total) {
  const angle = (index / total) * 2 * Math.PI;
  return {
    left: `${50 + orbitRadiusPercent * Math.cos(angle)}%`,
    top: `${50 + orbitRadiusPercent * Math.sin(angle)}%`,
  };
}

export default function PremiumHMSOrbit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeModule = modules[activeIndex];
  const ActiveModuleIcon = activeModule.icon;
  const size = 680;
  const center = size / 2;
  const radius = 235;
  const centerSize = 205;
  const centerSizePercent = (centerSize / size) * 100;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % modules.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white pb-8 pt-14 md:pb-12 md:pt-20">
      <div className="absolute inset-0">
        <div className="absolute left-[-5rem] top-16 h-64 w-64 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute right-[-5rem] top-20 h-72 w-72 rounded-full bg-cyan-100/60 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mx-auto max-w-3xl text-center">
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-700 shadow-[0_10px_24px_rgba(0,94,184,0.08)]"
          >
            <Activity className="h-4 w-4 text-red-500" />
            <span>Complete Module Suite</span>
          </motion.div>

          <motion.h2 variants={fadeUp} custom={0.08} className="mt-6 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            One Management, <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">All Actions</span>
          </motion.h2>

          <motion.p variants={fadeUp} custom={0.16} className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            A single platform to control every hospital operation from registration, appointments, billing, labs, pharmacy, and more bringing complete efficiency and clarity under one unified system.
          </motion.p>
        </motion.div>

        <div className="mt-12 grid items-center gap-8 lg:mt-14 lg:gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.1)] md:rounded-[2rem]"
              >
                <div className="relative h-56 overflow-hidden sm:h-64 md:h-72">
                  <img
                    src={activeModule.image}
                    alt={activeModule.label}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/20 to-transparent" />
                  <div className="absolute left-6 top-6">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${activeModule.color} shadow-[0_14px_30px_rgba(15,23,42,0.24)]`}>
                      <ActiveModuleIcon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/75">
                      {activeModule.label}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">
                      {activeModule.headline}
                    </h3>
                  </div>
                </div>

                <div className="p-5 sm:p-6 md:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#005EB8] md:text-lg">
                    {activeModule.label} Module
                  </p>

                  <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base md:mt-5 md:text-[1.05rem] md:leading-8">
                    {activeModule.description}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {activeModule.points.map((point) => (
                      <div
                        key={point}
                        className="flex min-h-[58px] items-center justify-center rounded-[1.15rem] border border-slate-200/80 bg-white px-4 py-3 text-center text-sm font-medium leading-6 text-slate-600 shadow-[0_8px_20px_rgba(15,23,42,0.04)]"
                      >
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hidden justify-center md:flex lg:justify-end">
            <div className="relative h-[420px] w-[420px] lg:h-[560px] lg:w-[560px] xl:h-[680px] xl:w-[680px]">
              <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 h-full w-full">
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                />
              </svg>

              <div
                className="absolute z-10 flex items-center justify-center"
                style={{
                  left: "50%",
                  top: "50%",
                  width: `${centerSizePercent}%`,
                  height: `${centerSizePercent}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-gray-100 bg-white px-2 text-center shadow-[0_30px_80px_rgba(0,0,0,0.12)] sm:px-3 md:px-4 lg:px-6">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 sm:mb-3 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:mb-4 lg:h-20 lg:w-20">
                    <UserCog className="h-5 w-5 text-blue-600 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-10 lg:w-10" />
                  </div>
                  <h3 className="max-w-[88px] text-center text-[10px] font-bold leading-tight text-blue-900 sm:max-w-[110px] sm:text-xs md:max-w-[125px] md:text-sm lg:max-w-none lg:text-xl">
                    HMS Control Hub
                  </h3>
                </div>
              </div>

              {modules.map((item, i) => {
                const point = getOrbitPoint(i, modules.length);
                const Icon = item.icon;
                const isActive = activeIndex === i;

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className="absolute flex flex-col items-center"
                    style={{
                      left: point.left,
                      top: point.top,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="relative">
                      <div
                        className={`absolute inset-0 rounded-full blur-2xl transition duration-300 ${
                          isActive ? "opacity-70 bg-sky-200" : "opacity-0"
                        }`}
                      />

                      <div
                        className={`relative flex items-center justify-center rounded-full bg-gradient-to-br ${item.color} shadow-lg transition-all duration-300 ${
                          isActive ? "h-16 w-16 scale-105 ring-4 ring-white sm:h-20 sm:w-20 lg:h-24 lg:w-24 lg:ring-8" : "h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
                        }`}
                      >
                        <Icon className={`${isActive ? "h-6 w-6 sm:h-7 sm:w-7 lg:h-9 lg:w-9" : "h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8"} text-white`} />
                      </div>
                    </div>

                    <div className="mt-2 hidden w-[120px] text-center sm:block lg:mt-3 lg:w-[150px]">
                      <p className={`text-xs font-semibold sm:text-sm lg:text-base ${isActive ? "text-[#005EB8]" : "text-gray-900"}`}>
                        {item.label}
                      </p>
                      <p className="text-[11px] text-gray-500 lg:text-sm">{item.sub}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center md:hidden">
            <div className="relative h-[300px] w-[300px]">
              <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 h-full w-full">
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                />
              </svg>

              <div
                className="absolute z-10 flex items-center justify-center"
                style={{
                  left: "50%",
                  top: "50%",
                  width: "34%",
                  height: "34%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-gray-100 bg-white px-2 text-center shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                    <UserCog className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-[10px] font-bold leading-tight text-blue-900">
                    HMS Control Hub
                  </h3>
                </div>
              </div>

              {modules.map((item, i) => {
                const point = getOrbitPoint(i, modules.length);
                const Icon = item.icon;
                const isActive = activeIndex === i;

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className="absolute flex flex-col items-center"
                    style={{
                      left: point.left,
                      top: point.top,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${item.color} shadow-lg transition-all duration-300 ${isActive ? "scale-110 ring-4 ring-white" : ""}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          
        </div>

        <div className="mt-10 flex justify-center md:mt-12">
          <Link
            to="/features"
            className="group relative z-10 inline-flex w-full max-w-[240px] items-center justify-center gap-2 overflow-hidden rounded-full border border-sky-100 bg-white px-3.5 py-1.5 text-sm text-gray-900 shadow-[0_14px_32px_rgba(15,23,42,0.12)] isolation-auto before:absolute before:-left-full before:-z-10 before:aspect-square before:w-full before:rounded-full before:bg-[#005EB8] before:transition-all before:duration-700 hover:text-white before:hover:left-0 before:hover:w-full before:hover:scale-150 before:hover:duration-700 sm:w-auto sm:max-w-none sm:px-4 sm:py-2 sm:text-base lg:font-semibold"
          >
            Explore All Features
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
    </section>
  );
}
