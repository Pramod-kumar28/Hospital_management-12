import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  {
    title: "Comprehensive Patient Overview",
    image: "/assets/images/Patient.jpg",
    points: [
      " Provides an easy-to-view list of all checked-in patients in one place.",
      "Provide a unified view of a patient’s history across departments.",
      "Displays key details such as appointment status, billing information, and patient demographics",
      " Helps front office staff stay organized, informed, and prepared for patient interactions.",
    
    ],
  },
  {
    title: "Flexible Appointment Management",
    image: "/assets/images/Appointment.jpeg",
    points: [
      "Handle scheduling, rescheduling and consultation flow with fewer manual coordination steps.",
      "Support doctors, front desk teams and patients with a more adaptive appointment workflow.",
      "Keep calendars organized while improving availability visibility across the hospital.",
      "Improve patient experience by making appointments easier to find and book.",
    ],
  },
  {
    title: "Automated Notifications",
    image: "/assets/images/Notifications.jpeg",
    points: [
      "Send real-time alerts for confirmations, reminders, reschedules and cancellations.",
      "Improve communication consistency without depending on manual follow-up by staff.",
      "Keep patients and care teams informed at every stage of the appointment journey.",
      "Reduce no-shows and last-minute cancellations with more proactive communication.",
    ],
  },
  {
    title: "Patient Portal",
    image: "/assets/images/Portal.jpeg",
    points: [
      "Give patients direct access to appointments, records, updates and communication tools.",
      "Strengthen trust by making information easier to access outside the hospital visit itself.",
      "Create a more connected digital care experience with fewer administrative bottlenecks.",
      "Support better patient engagement and continuity of care across the entire hospital journey.",
    ],
  },
  {
    title: "Enhanced Patient Care",
    image: "/assets/images/Care.jpeg",
    points: [
      "Support better outcomes with stronger coordination between administration and clinical teams.",
      "Enable faster workflows so staff can spend more time on care and less on repetitive tasks.",
      "Build a smoother, more responsive patient experience from admission to follow-up.",
      "Create a more connected hospital ecosystem that supports better care and stronger patient relationships.",
    ],
  },
];

export default function WhyWeStandOutSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white pb-14 pt-8 md:pb-16 md:pt-10">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-700 shadow-[0_10px_24px_rgba(0,94,184,0.08)]">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            Why We Stand Out
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Why We Are{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Unique
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            Designed to improve every patient interaction, our HMS combines operational efficiency
            with a more connected and responsive care experience across the entire hospital journey.
          </p>
        </div>

        <div className="mt-9 rounded-[1.75rem] border border-sky-100 bg-[#eef6fd] p-2.5 shadow-[0_20px_40px_rgba(0,94,184,0.06)] md:mt-10 md:p-3">
          <div className="grid gap-2 md:grid-cols-5">
            {items.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`rounded-[1.1rem] px-3 py-3 text-center text-base font-semibold leading-tight transition md:min-h-[82px] md:px-4 md:py-4 md:text-[1rem] ${
                  activeIndex === index
                    ? "bg-white text-[#005EB8] shadow-[0_12px_28px_rgba(0,94,184,0.12)]"
                    : "bg-transparent text-slate-800 hover:bg-white/65"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-8 md:mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-center gap-6 rounded-[2rem] bg-white p-4 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:gap-8 md:p-8 lg:grid-cols-[0.92fr_1fr]"
            >
              <div className="relative mx-auto w-full max-w-[540px] overflow-hidden rounded-[1.75rem] bg-[#f5f9ff] p-4 md:p-6">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="h-[220px] w-full rounded-[1.25rem] object-cover sm:h-[260px] md:h-[340px]"
                />
              </div>

              <div>
                <h3 className="text-3xl font-bold leading-tight text-blue-900 md:text-4xl">
                  {activeItem.title}
                </h3>

                <div className="mt-6 space-y-3.5 md:space-y-4">
                  {activeItem.points.map((point) => (
                    <div key={point} className="flex items-start gap-4">
                      <span className="mt-2 h-3 w-3 shrink-0 rounded-full bg-slate-500" />
                      <p className="text-base leading-6 text-slate-600 md:text-lg md:leading-7">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
