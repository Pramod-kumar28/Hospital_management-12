import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, CalendarCheck2, ClipboardList, FileHeart, Hospital, Stethoscope, UserRound, Video } from "lucide-react";

const doctorFeatures = [
  {
    icon: Hospital,
    title: "OPD & IPD Management",
    text: "Track consultations, admissions, discharges and ward coordination from one connected workflow.",
    tags: ["Admissions", "Discharges" ],
  },
  {
    icon: CalendarCheck2,
    title: "Appointment Management",
    text: "Handle doctor schedules, walk-ins, follow-ups and department availability with less manual effort.",
    tags: ["Scheduling", "Follow-ups"],
  },
  {
    icon: FileHeart,
    title: "Health Record Access",
    text: "View patient history, treatment notes, vitals and test updates in real time during care delivery.",
    tags: ["Patient History", "Vitals"],
  },
  {
    icon: ClipboardList,
    title: "Clinical Workflow",
    text: "Manage prescriptions, orders, progress notes and treatment coordination without switching systems.",
    tags: ["Orders", "Care Notes"],
  },
];

const patientFeatures = [
  {
    icon: CalendarCheck2,
    title: "Book Appointments",
    text: "Patients can check doctor availability and book consultations with a simpler digital journey.",
    tags: ["Doctor Slots", "Easy Booking"],
  },
  {
    icon: Video,
    title: "Tele Consultation",
    text: "Enable remote care with scheduled virtual consultations and better continuity beyond the hospital.",
    tags: ["Video Visits", "Remote Care"],
  },
  {
    icon: UserRound,
    title: "Records Access",
    text: "Give patients visibility into visits, prescriptions, reports and treatment summaries when needed.",
    tags: ["Reports", "Prescriptions"],
  },
  {
    icon: Activity,
    title: "Updates & Follow-ups",
    text: "Support reminders, follow-up communication and a smoother patient experience after every visit.",
    tags: ["Reminders", "Recovery"],
  },
];

function DeviceMock({ accent, accentSoft, feature, slideKey }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex h-[310px] w-[164px] justify-center rounded-[2rem] border-4 border-slate-900 bg-slate-50 shadow-[10px_10px_12px_2px_rgba(209,218,218,0.9)] sm:h-[340px] sm:w-[180px]"
      >
        <span className="absolute top-0 h-3 w-24 rounded-b-2xl bg-slate-900" />
        <span className="absolute -right-[10px] top-20 h-8 rounded-md border-4 border-slate-900" />
        <span className="absolute -right-[10px] bottom-28 h-10 rounded-md border-4 border-slate-900" />

        <div className="mt-4 flex h-[276px] w-[140px] flex-col overflow-hidden rounded-[1.5rem] bg-white sm:mt-5 sm:h-[300px] sm:w-[156px]">
          <div className="relative flex-1 overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f3f9ff_55%,#edf7ff_100%)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slideKey}
                initial={{ x: 64, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -64, opacity: 0 }}
                transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex h-full flex-col px-3.5 pb-3 pt-4 sm:px-4 sm:pb-4 sm:pt-5"
              >
                <div className="mt-2">
                  <h3 className="mt-2 text-[15px] font-bold leading-5 text-blue-900 sm:text-[17px] sm:leading-5">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[11px] leading-3 text-slate-600 sm:mt-4 sm:text-[12px] sm:leading-5">
                    {feature.text}
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-1 sm:mt-4">
                  {feature.tags?.map((tag) => (
                    <div
                      key={tag}
                      className="rounded-2xl bg-white/95 px-2 py-1.5 text-center text-[10px] font-semibold text-slate-700 shadow-[0_8px_18px_rgba(15,23,42,0.05)]"
                    >
                      {tag}
                    </div>
                  ))}
                </div>

                <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
                  <div className="rounded-2xl bg-white/95 px-3 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                    <div className={`h-2 rounded-full ${accentSoft}`} />
                    <div className="mt-2 h-2 w-4/5 rounded-full bg-slate-100" />
                  </div>
                  <div className="rounded-2xl bg-white/95 px-3 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                    <div className="h-2 rounded-full bg-slate-100" />
                    <div className="mt-2 h-2 w-3/5 rounded-full bg-sky-100" />
                  </div>
                </div>

                <div className="mt-auto pt-2 sm:pt-3">
                  <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    <span>Connected</span>
                    <span>Care Flow</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DualAppPreviewSection() {
  const [doctorIndex, setDoctorIndex] = useState(0);
  const [patientIndex, setPatientIndex] = useState(0);

  useEffect(() => {
    const doctorTimer = setInterval(() => {
      setDoctorIndex((prev) => (prev + 1) % doctorFeatures.length);
    }, 6400);

    const patientTimer = setInterval(() => {
      setPatientIndex((prev) => (prev + 1) % patientFeatures.length);
    }, 6800);

    return () => {
      clearInterval(doctorTimer);
      clearInterval(patientTimer);
    };
  }, []);

  return (
    <section className="bg-white px-4 py-8 md:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-[#005EB8]">
            <Stethoscope className="h-4 w-4" />
            <span>Connected Care Experience</span>
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl lg:text-5xl">
            Two Experiences,{" "}
            <span className="bg-gradient-to-r from-[#005EB8] via-[#1597E5] to-[#67D6FF] bg-clip-text text-transparent">
              One Hospital System
            </span>
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">
            Designed for both doctors and patients, Levitica HMS creates a smoother digital experience
            from appointments and records to consultations and follow-ups.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
          <div className="order-2 lg:order-1">
            <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] sm:min-h-[620px]">
              <p className="text-center text-sm font-semibold uppercase tracking-[0.24em] text-sky-500">
                Doctor Side
              </p>
              <h3 className="mt-3 text-center text-2xl font-bold text-slate-950">Built for daily clinical workflows</h3>
              <p className="mt-3 text-center text-sm leading-7 text-slate-600">
                From OPD and IPD coordination to patient records and appointments, the doctor view
                keeps high-priority actions easier to manage.
              </p>
              <div className="mt-8 flex justify-center">
                <DeviceMock accent="bg-[#005EB8]" accentSoft="bg-sky-100" feature={doctorFeatures[doctorIndex]} slideKey={`doctor-${doctorIndex}`} />
              </div>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <div className="hidden h-56 w-px bg-gradient-to-b from-transparent via-sky-300 to-transparent lg:block" />
            <div className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#005EB8] lg:hidden">
              Doctor + Patient
            </div>
          </div>

          <div className="order-3">
            <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] sm:min-h-[620px]">
              <p className="text-center text-sm font-semibold uppercase tracking-[0.24em] text-cyan-500">
                Patient Side
              </p>
              <h3 className="mt-3 text-center text-2xl font-bold text-slate-950">A simpler digital care journey</h3>
              <p className="mt-3 text-center text-sm leading-7 text-slate-600">
                Help patients book appointments, access records, join tele-consultations and stay
                better connected to their treatment journey.
              </p>
              <div className="mt-8 flex justify-center">
                <DeviceMock accent="bg-[#1597E5]" accentSoft="bg-cyan-100" feature={patientFeatures[patientIndex]} slideKey={`patient-${patientIndex}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
