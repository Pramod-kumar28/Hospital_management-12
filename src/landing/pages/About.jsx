import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { 
  Users, Stethoscope, CreditCard, Pill, FlaskConical, Video, 
  BarChart3, Shield, ChevronRight,
  Zap, Database, Cloud,
  Award, Clock, TrendingUp,
  Smartphone as Mobile
} from "lucide-react";
import { featureDetails } from '../../utils/featureDetails';

export default function Features() {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Convert featureDetails to featuresData for cards
  const featuresData = Object.values(featureDetails).map(feature => ({
    id: feature.id,
    icon: feature.icon,
    title: feature.title,
    description: feature.description,
    color: feature.color,
    stats: Object.values(feature.stats)[0],
    additionalPoints: feature.additionalPoints
  }));

  // Benefits data remains the same
  const benefitsData = [
    {
      icon: TrendingUp,
      title: "45% Operational Efficiency",
      description: "Streamline workflows and reduce administrative overhead",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Award,
      title: "99.9% Uptime",
      description: "Reliable cloud infrastructure with zero downtime guarantee",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Clock,
      title: "60% Time Savings",
      description: "Automate routine tasks and focus on patient care",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security with end-to-end encryption",
      color: "from-gray-600 to-gray-800"
    }
  ];

  // Tech stack data remains the same
  const techStackData = [
    {
      icon: Cloud,
      title: "Cloud Native",
      description: "AWS & Azure powered infrastructure",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Bank-level Security",
      description: "HIPAA & GDPR compliant",
      color: "green"
    },
    {
      icon: Mobile,
      title: "Mobile First",
      description: "iOS & Android apps",
      color: "purple"
    },
    {
      icon: Database,
      title: "Real-time Analytics",
      description: "Live dashboards & AI insights",
      color: "orange"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Page Hero */}
      <section className="relative mt-12 overflow-hidden bg-white px-4 py-10 md:py-12">
        <div className="absolute inset-x-0 top-6 h-64 bg-[radial-gradient(circle_at_left_top,rgba(0,94,184,0.12),transparent_40%),radial-gradient(circle_at_right_top,rgba(110,231,255,0.18),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl rounded-[2rem] border border-sky-100/80 bg-white/90 px-6 py-8 shadow-[0_24px_70px_rgba(2,34,78,0.08)] backdrop-blur-sm md:px-10 md:py-10 lg:px-12 lg:py-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-[#005EB8] shadow-[0_10px_30px_rgba(0,94,184,0.08)]">
                <Zap className="h-4 w-4 text-red-500" />
                <span>About Levitica HMS</span>
              </div>

              <h1 className="mt-6 max-w-4xl text-3xl font-bold leading-[1.05] tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
                Built To Make{" "}
                <span className="bg-gradient-to-r from-[#005EB8] via-[#1597E5] to-[#67D6FF] bg-clip-text text-transparent">
                  Hospital Operations Simpler, Faster, and Connected
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                Levitica Hospital Management System brings patients, doctors, labs, pharmacy, billing,
                reporting and telemedicine into one modern digital ecosystem designed for real
                healthcare teams and everyday hospital workflows.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
                {[
                  "One integrated system for administration and clinical coordination",
                  "Built for multi-speciality hospitals, clinics and growing healthcare teams",
                  "Secure cloud-based workflows with real-time visibility across departments",
                  "Focused on reducing delays, duplication and manual operational effort",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-center text-sm text-slate-600 shadow-[0_12px_35px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_18px_45px_rgba(0,94,184,0.12)]"
                  >
                    <span className="block leading-6">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 top-10 h-24 w-24 rounded-full bg-sky-100 blur-2xl md:h-32 md:w-32" />
              <div className="absolute -right-6 bottom-6 h-28 w-28 rounded-full bg-cyan-100 blur-3xl md:h-36 md:w-36" />

              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#eef7ff_100%)] p-5 shadow-[0_20px_55px_rgba(2,34,78,0.12)]">
                <img
                  src="/assets/images/About.jpeg"
                  alt="About Levitica hospital management system"
                  className="h-[260px] w-full rounded-[1.5rem] object-cover object-center md:h-[320px]"
                />

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "Departments Connected", value: "8+" },
                    { label: "Core Platform", value: "One Unified HMS" },
                    { label: "Focus", value: "Care + Operations" },
                    { label: "Access", value: "Web + Mobile" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/70 bg-white/90 px-4 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-800 md:text-base">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Clickable Cards */}
      <section className="py-10 bg-white px-4 sm:px-2">
        <div className="max-w-7xl mx-auto md:px-8 sm:px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Start Your Digital <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Feature Suite</span>
            </h2>
            <p className="text-gray-600">
              Everything you need to streamline operations, enhance patient care, and grow your healthcare practice.
              Click on any feature card to learn more about its capabilities and benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {featuresData.map((feature, index) => (
              <Link 
                key={feature.id}
                to={`/features/${feature.id}`}
                className="block no-underline hover:no-underline"
              >
                <AnimatedFeatureCard
                  feature={feature}
                  index={index}
                  isHovered={hoveredCard === index}
                  onHover={() => setHoveredCard(index)}
                  onLeave={() => setHoveredCard(null)}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-10 bg-white md:px-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Built with Modern <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Healthcare Technology</span>
            </h2>
            <p className="text-gray-600">
              Leveraging cutting-edge technology to deliver superior healthcare management solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {techStackData.map((tech, index) => (
              <TechCard key={tech.title} tech={tech} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Animated Feature Card Component - Now clickable
function AnimatedFeatureCard({ feature, index, isHovered, onHover, onLeave }) {
  const IconComponent = feature.icon;

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden h-full"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Elegant Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700`}></div>
      
      {/* Floating Particle Animation */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className={`absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 blur-xl transition-all duration-700 group-hover:translate-x-8 group-hover:translate-y-8`}></div>
      </div>

      <div className="relative p-6 h-full flex flex-col">
        {/* Icon with Floating Effect */}
        <div className="relative mb-5">
          <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center shadow-lg transition-all duration-500 group-hover:translate-y-[-5px] group-hover:shadow-xl`}>
            <IconComponent size={24} />
          </div>
        </div>

        {/* Content with Elegant Typography */}
        <div className="space-y-4 flex-grow">
          <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-700 transition-colors duration-400">
            {feature.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed text-sm">
            {feature.description}
          </p>
          
          {/* Features List with Staggered Animation */}
          <div className="space-y-2.5 mt-4">
            {feature.additionalPoints && feature.additionalPoints.slice(0, 4).map((point, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                style={{transitionDelay: `${idx * 100}ms`}}
              >
                <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                <span className="text-sm text-gray-700">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Elegant Divider */}
        <div className="my-3 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:via-blue-200 transition-all duration-500"></div>

        {/* Stats with Click Indicator */}
        <div className="flex items-center justify-between mt-auto">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full group-hover:from-blue-100 group-hover:to-cyan-100 transition-all duration-400">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${feature.color} text-white flex items-center justify-center`}>
              <TrendingUp size={14} />
            </div>
            <span className="font-semibold text-blue-700 text-sm">{feature.stats}</span>
          </div> */}
          
          {/* Click indicator */}
          <div className="flex items-center gap-1 text-sm text-blue-600 opacity-200 group-hover:opacity-100 transition-opacity duration-300 mt-3">
            <span className="text-sm">Details</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
    </div>
  );
}

// Enhanced Feature Detail Section
function EnhancedFeatureDetailSection({ 
  badgeIcon, 
  badgeText, 
  title, 
  description, 
  image, 
  capabilities, 
  benefits, 
  stats,
  reverse = false 
}) {
  return (
    <div className={`grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-10 last:mb-0 ${reverse ? 'lg:grid-flow-dense' : ''}`}>
      {/* Content */}
      <div className={`space-y-6 ${reverse ? 'lg:col-start-2' : ''}`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
          {badgeIcon}
          {badgeText}
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h3>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-600 leading-relaxed">{description}</p>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-4 py-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Capabilities */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Key Capabilities:</h4>
          <ul className="space-y-3">
            {capabilities.map((capability, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                {capability}
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-xl p-6 border-l-4 border-blue-600 shadow-sm">
          <div className="flex items-center gap-2 text-gray-900 font-semibold mb-4">
            <Zap className="w-5 h-5 text-blue-600" />
            Key Benefits
          </div>
          <div className="flex flex-wrap gap-2">
            {benefits.map((benefit, index) => (
              <span key={index} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {benefit}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm md:text-base">
            Request Demo
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link 
            to={`/features/${badgeText.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors text-sm md:text-base"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Image */}
      <div className={`relative ${reverse ? 'lg:col-start-1' : ''}`}>
        <div className="rounded-2xl overflow-hidden shadow-2xl group">
          <img 
            src={image} 
            alt={title}
            className="w-full h-64 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Static Image Overlay */}
          <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>
      </div>
    </div>
  );
}

// Benefit Card Component
function BenefitCard({ benefit, index }) {
  const IconComponent = benefit.icon;
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <IconComponent size={24} />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
      <p className="text-gray-600 text-sm">{benefit.description}</p>
    </div>
  );
}

// Tech Card Component
function TechCard({ tech, index }) {
  const IconComponent = tech.icon;
  const colorStyles = {
    blue: {
      icon: "text-blue-600",
      badge: "bg-blue-100",
      glow: "from-blue-500/20 to-cyan-400/10",
      border: "hover:border-blue-200",
    },
    green: {
      icon: "text-emerald-600",
      badge: "bg-emerald-100",
      glow: "from-emerald-500/20 to-green-400/10",
      border: "hover:border-emerald-200",
    },
    purple: {
      icon: "text-violet-600",
      badge: "bg-violet-100",
      glow: "from-violet-500/20 to-fuchsia-400/10",
      border: "hover:border-violet-200",
    },
    orange: {
      icon: "text-amber-600",
      badge: "bg-amber-100",
      glow: "from-amber-500/20 to-orange-400/10",
      border: "hover:border-amber-200",
    },
  };
  const palette = colorStyles[tech.color] || colorStyles.blue;
  
  return (
    <div className={`group relative overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white p-5 text-center shadow-[0_14px_34px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_55px_rgba(0,94,184,0.14)] ${palette.border}`}>
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${palette.glow}`} />
      <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${palette.badge} shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-transform duration-300 group-hover:scale-110`}>
        <IconComponent className={`h-7 w-7 ${palette.icon}`} />
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-2">{tech.title}</h3>
      <p className="mx-auto max-w-[16rem] text-sm leading-6 text-slate-600">{tech.description}</p>
    </div>
  );
}
