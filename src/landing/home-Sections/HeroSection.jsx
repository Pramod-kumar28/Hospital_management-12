import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Activity, CheckCircle2, Pill, Stethoscope, Zap } from "lucide-react";
import { Link } from "react-router-dom";

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

const floatingIcons = [
  {
    Icon: Stethoscope,
    className: "hidden md:flex top-24 right-[14%] lg:right-[18%]",
    delay: 0,
  },
  {
    Icon: Activity,
    className: "hidden md:flex top-[42%] right-[8%] lg:right-[11%]",
    delay: 0.8,
  },
  {
    Icon: Pill,
    className: "hidden md:flex bottom-28 right-[20%] lg:right-[24%]",
    delay: 1.4,
  },
];

const HeroSection = ({ isVisible }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 18,
    mass: 0.4,
  });

  const contentY = useTransform(smoothProgress, [0, 1], [20, -24]);
  const lineY = useTransform(smoothProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white pt-20 md:pt-[82px]">
      <div className="relative min-h-[640px] overflow-hidden shadow-[0_30px_80px_rgba(0,41,91,0.18)] sm:min-h-[700px] md:min-h-[760px]">
          <img
            src="/assets/images/Hero2.jpg"
            alt="Hospital care team"
            className="absolute inset-0 h-full w-full object-cover object-[62%_center] sm:object-center"
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,27,53,0.84)_0%,rgba(1,27,53,0.68)_42%,rgba(1,27,53,0.3)_100%)] sm:bg-[linear-gradient(90deg,rgba(1,27,53,0.86)_0%,rgba(1,27,53,0.72)_34%,rgba(1,27,53,0.38)_58%,rgba(1,27,53,0.12)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,94,184,0.35),transparent_28%)]" />

          {floatingIcons.map(({ Icon, className, delay }, index) => (
            <motion.div
              key={index}
              className={`absolute z-10 h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white/85 shadow-[0_18px_45px_rgba(2,34,78,0.16)] backdrop-blur-md ${className}`}
              animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
              transition={{
                duration: 4.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              }}
            >
              <Icon className="h-6 w-6" />
            </motion.div>
          ))}

          <motion.div
            style={{ y: lineY }}
            className="absolute bottom-14 right-4 left-[42%] z-10 hidden md:block lg:right-12"
          >
            <svg
              viewBox="0 0 520 120"
              className="h-28 w-full"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="pulseLine" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7dd3fc" />
                  <stop offset="50%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
              <path
                d="M0 70 H85 L120 70 L145 40 L170 95 L205 20 L240 70 H300 L330 70 L355 58 L382 82 L405 70 H520"
                fill="none"
                stroke="url(#pulseLine)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-25 drop-shadow-[0_0_10px_rgba(239,68,68,0.35)]"
              />
              <motion.path
                d="M0 70 H85 L120 70 L145 40 L170 95 L205 20 L240 70 H300 L330 70 L355 58 L382 82 L405 70 H520"
                fill="none"
                stroke="url(#pulseLine)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_0_16px_rgba(14,165,233,0.4)]"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>

            <div className="mt-3 flex items-center gap-3 text-white">
              {/* <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/16 backdrop-blur-md">
                <Heart className="h-4 w-4 text-red-300" />
              </div> */}
              {/* <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Heart Line</p>
                <p className="text-sm font-semibold text-white/95">Continuous care visibility</p>
              </div> */}
            </div>
          </motion.div>

          <motion.div
            style={{ y: lineY }}
            className="absolute bottom-6 left-4 right-4 z-10 sm:bottom-8 sm:left-6 sm:right-6 md:hidden"
          >
            <svg
              viewBox="0 0 520 120"
              className="h-16 w-full sm:h-20"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="pulseLineMobile" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7dd3fc" />
                  <stop offset="50%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
              <path
                d="M0 70 H85 L120 70 L145 40 L170 95 L205 20 L240 70 H300 L330 70 L355 58 L382 82 L405 70 H520"
                fill="none"
                stroke="url(#pulseLineMobile)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-25 drop-shadow-[0_0_10px_rgba(239,68,68,0.35)]"
              />
              <motion.path
                d="M0 70 H85 L120 70 L145 40 L170 95 L205 20 L240 70 H300 L330 70 L355 58 L382 82 L405 70 H520"
                fill="none"
                stroke="url(#pulseLineMobile)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_0_16px_rgba(14,165,233,0.4)]"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            style={{ y: contentY }}
            className="relative z-10 flex min-h-[640px] items-start px-4 pb-28 pt-16 sm:min-h-[700px] sm:px-6 sm:pb-32 sm:pt-20 md:min-h-[760px] md:items-center md:px-10 md:py-14 lg:px-14"
          >
            <div className="max-w-2xl text-white">
              <motion.div
                variants={fadeUp}
                custom={0}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md sm:mb-6 sm:px-4 sm:py-2 sm:text-sm"
              >
                <Zap size={16} className="text-red-300" />
                <span>Multi-Tenant SaaS Platform</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={0.12}
                className="max-w-[18rem] text-3xl font-bold leading-[1.05] tracking-tight sm:max-w-[25rem] sm:text-4xl md:max-w-xl md:text-5xl lg:text-6xl"
              >
                Modern Hospital{" "}
                <span className="text-[#8ED8FF]">
                  Management Made Simple
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={0.24}
                className="mt-5 max-w-[21rem] text-sm leading-7 text-white/88 sm:max-w-[28rem] sm:text-base sm:leading-8 md:mt-6 md:max-w-xl md:text-lg"
              >
                Streamline every aspect of hospital operations with a unified, secure, end-to-end digital ecosystem. From patient registration to discharge, 
                our system ensures efficiency, accuracy, and seamless coordination across departments
              </motion.p>

              <motion.div
                variants={fadeUp}
                custom={0.36}
                className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4"
              >
                <Link
                  to="/request-demo"
                  className="group/button relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border border-white/20 bg-blue-500/40 px-5 py-3 text-sm font-semibold text-white backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-blue-600/40 sm:w-auto sm:px-6 sm:py-3.5 sm:text-base"
                >
                  Request Demo
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-10 bg-white/30" />
                  </div>
                </Link>
                <Link
                  to="/features"
                  className="group relative z-10 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-sky-100 bg-white px-3.5 py-1.5 text-sm text-gray-900 shadow-[0_14px_32px_rgba(15,23,42,0.12)] isolation-auto before:absolute before:-left-full before:-z-10 before:aspect-square before:w-full before:rounded-full before:bg-[#005EB8] before:transition-all before:duration-700 hover:text-white before:hover:left-0 before:hover:w-full before:hover:scale-150 before:hover:duration-700 sm:mx-0 sm:w-auto sm:px-4 sm:py-2 sm:text-base lg:font-semibold"
                >
                  View Features
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
              </motion.div>

              <motion.div
                variants={fadeUp}
                custom={0.48}
                className="mt-7 flex flex-col gap-3 text-white/90 sm:mt-8 sm:gap-4 sm:flex-row sm:flex-wrap"
              >
                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
                  <CheckCircle2 className="text-emerald-300" size={20} />
                  <span className="text-sm font-medium sm:text-base">14-day free trial</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
                  <CheckCircle2 className="text-emerald-300" size={20} />
                  <span className="text-sm font-medium sm:text-base">No credit card required</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
    </section>
  );
};

export default HeroSection;
