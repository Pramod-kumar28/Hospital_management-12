import React from "react";
import { motion } from "framer-motion";
import { Droplets, MessageCircleHeart, Pill } from "lucide-react";

const features = [
  {
    icon: Pill,
    title: "In-App Medicine Ordering",
    description:
      "Let patients request prescribed medicines directly from the app and get them delivered to their home without stepping back into the queue.",
    image: "/assets/images/Pharmacy.jpg",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    icon: Droplets,
    title: "At-Home Blood Sample Collection",
    description:
      "Schedule sample pickup from the patient’s location and keep diagnostic testing connected to the same hospital workflow.",
    image: "/assets/images/Lab.jpeg",
    accent: "from-rose-500 to-orange-400",
  },
  {
    icon: MessageCircleHeart,
    title: "Tele Doctor Communication",
    description:
      "Enable direct digital consultation, follow-up communication and guided care updates between doctors and patients in one place.",
    image: "/assets/images/Doctors.jpg",
    accent: "from-emerald-500 to-teal-500",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function TelemedicineSection() {
  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-16">
      <div className="absolute inset-0">
        <div className="absolute left-[-4rem] top-20 h-56 w-56 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute right-[-4rem] bottom-20 h-64 w-64 rounded-full bg-cyan-100/60 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-700 shadow-[0_10px_24px_rgba(0,94,184,0.08)]"
          >
            <span className="h-2 w-2 rounded-full bg-red-500" />
            Telemedicine
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={0.08}
            className="mt-6 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl"
          >
            Care Beyond The Hospital,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Built Into One App
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={0.16}
            className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg"
          >
            Extend your HMS into a connected telemedicine experience with home medicine delivery,
            sample collection and direct doctor communication designed for faster, more convenient care.
          </motion.p>
        </motion.div>

        <div className="mt-12 grid items-center gap-8 lg:mt-14 lg:grid-cols-[0.98fr_1.02fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative"
          >
            <motion.div
              variants={fadeUp}
              custom={0.1}
              className="relative overflow-hidden rounded-[2rem] border border-sky-100 bg-white p-4 shadow-[0_28px_80px_rgba(15,23,42,0.1)] md:p-6"
            >
              <div className="relative overflow-hidden rounded-[1.6rem] bg-[#eef6fd] p-4 md:p-6">
                <img
                  src="/assets/images/Telemed.jpeg"
                  alt="Telemedicine app experience"
                  className="h-[240px] w-full rounded-[1.3rem] object-cover sm:h-[300px] md:h-[420px]"
                />

                {/* <div className="absolute left-5 top-5 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-[0_14px_34px_rgba(15,23,42,0.12)] backdrop-blur md:left-8 md:top-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#005EB8]">
                    Connected Care
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-800 md:text-base">
                    Consult, collect and deliver from one patient journey.
                  </p>
                </div> */}

                {/* <div className="absolute bottom-5 right-5 w-[220px] rounded-[1.4rem] border border-white/70 bg-white/90 p-4 shadow-[0_18px_38px_rgba(15,23,42,0.14)] backdrop-blur md:bottom-8 md:right-8 md:w-[260px]">
                  <p className="text-sm font-semibold text-slate-900">Home Care Flow</p>
                  <div className="mt-3 space-y-2.5 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                      <span>Order medicines in-app</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
                      <span>Book sample collection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      <span>Talk to your doctor digitally</span>
                    </div>
                  </div>
                </div> */}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-5"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  custom={0.12 + index * 0.08}
                  className="group grid overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] md:grid-cols-[160px_1fr] lg:grid-cols-[190px_1fr]"
                >
                  <div className="relative h-48 overflow-hidden sm:h-52 md:h-full">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent" />
                    <div className={`absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.accent} shadow-[0_12px_28px_rgba(15,23,42,0.24)]`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <div className="p-6 md:p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#005EB8]">
                      Telemedicine Feature
                    </p>
                    <h3 className="mt-3 text-xl font-bold leading-tight text-blue-900 sm:text-2xl">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
