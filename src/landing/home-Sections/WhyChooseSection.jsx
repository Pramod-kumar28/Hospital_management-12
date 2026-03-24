import React from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Building2,
  CloudCog,
  HeartHandshake,
  ShieldCheck,
  Wallet,
} from "lucide-react";

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

const leftCards = [
  {
    icon: Building2,
    title: "Complete Healthcare Solution",
    body: "Bring patients, doctors, labs, pharmacy and billing together in one connected hospital workflow.",
  },
  {
    icon: CloudCog,
    title: "Stable Cloud Solution",
    body: "Keep teams connected with dependable uptime, fast performance and centralized access across departments.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    body: "Protect patient data and operational records with controlled access, secure storage and trusted workflows.",
  },
];

const rightCards = [
  {
    icon: HeartHandshake,
    title: "Patient-Centric Design",
    body: "Deliver smoother appointment journeys, clearer communication and better continuity of care.",
  },
  {
    icon: Wallet,
    title: "Affordable & Scalable",
    body: "Adopt the modules you need now and scale confidently as your hospital grows.",
  },
  {
    icon: BadgeCheck,
    title: "Established Trust",
    body: "Built for hospitals and clinics that need long-term reliability, clarity and day-to-day operational control.",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="relative overflow-hidden bg-white pb-8 pt-14 md:pb-10 md:pt-16">
      <div className="absolute inset-0">
        <div className="absolute left-[-5rem] top-16 h-64 w-64 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute right-[-5rem] top-20 h-72 w-72 rounded-full bg-cyan-100/60 blur-3xl" />
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
            Why Choose Us
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={0.08}
            className="mt-6 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl"
          >
            Why Healthcare Teams{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Choose Our HMS
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={0.16}
            className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg"
          >
            Built to simplify hospital operations, improve patient coordination and give every
            department one reliable digital system to work from.
          </motion.p>
        </motion.div>

        <div className="mt-12 hidden lg:grid lg:grid-cols-[1fr_540px_1fr] lg:items-center lg:gap-6">
          <div className="space-y-5">
            {leftCards.map((card, index) => (
              <SideCard key={card.title} card={card} delay={0.05 + index * 0.08} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <img
              src="/assets/images/image.png"
              alt="Why choose our hospital management system"
              className="w-full max-w-[520px] object-contain"
            />
          </motion.div>

          <div className="space-y-5">
            {rightCards.map((card, index) => (
              <SideCard key={card.title} card={card} delay={0.16 + index * 0.08} />
            ))}
          </div>
        </div>

        <div className="mt-10 lg:hidden">
          <div className="mb-8 flex justify-center">
            <img
              src="/assets/images/image.png"
              alt="Why choose our hospital management system"
              className="w-full max-w-[380px] object-contain"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {[...leftCards, ...rightCards].map((card, index) => (
              <SideCard key={card.title} card={card} delay={index * 0.06} compact />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SideCard({ card, delay, compact = false }) {
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative overflow-hidden rounded-[1.45rem] border border-sky-100/80 bg-white shadow-[0_16px_38px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-sky-200 hover:shadow-[0_22px_54px_rgba(0,94,184,0.14)] ${
        compact ? "px-4 py-4" : "px-5 py-5"
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-300" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.12),transparent_34%)] opacity-80 transition duration-300 group-hover:opacity-100" />
      <div className="absolute right-4 top-4 h-24 w-24 rounded-full bg-sky-100/70 blur-3xl transition duration-300 group-hover:scale-125 group-hover:bg-cyan-100/90" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0)_0%,rgba(14,165,233,0.06)_100%)] opacity-0 transition duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start gap-3.5">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 text-white shadow-[0_14px_26px_rgba(0,94,184,0.18)] transition duration-300 group-hover:rotate-3 group-hover:scale-105 group-hover:shadow-[0_18px_32px_rgba(0,94,184,0.24)]">
          <div className="absolute inset-[1px] rounded-[1.15rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04))]" />
          <Icon className="relative z-10 h-5 w-5" />
        </div>

        <div className="min-w-0">
          <h3 className={`font-semibold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-[#005EB8] ${compact ? "text-base" : "text-[1.18rem]"}`}>
            {card.title}
          </h3>

          <p className={`mt-2.5 text-slate-600 ${compact ? "text-sm leading-6" : "text-[0.92rem] leading-6"}`}>
            {card.body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
