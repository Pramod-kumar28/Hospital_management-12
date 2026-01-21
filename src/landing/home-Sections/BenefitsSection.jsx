import React from "react";
import { TrendingUp, Award, Clock, ArrowRight, CheckCircle, X, AlertCircle, Heart, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BenefitsSection = () => {
  return (
    <>
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/30 relative overflow-hidden">
        {/* Animated Background Elements */}
        {/* <div className="absolute top-20 left-5% opacity-10 animate-pulse">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"></div>
        </div>
        <div className="absolute bottom-20 right-5% opacity-10 animate-bounce delay-1000">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"></div>
        </div> */}

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Animated Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200/50 rounded-full px-5 py-2 mb-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
                <span className="text-blue-700 font-medium text-sm tracking-wider">PROVEN EXCELLENCE</span>
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse delay-300"></div>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Transform Your <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Healthcare</span> Operations
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600"
            >
              Experience measurable improvements that elevate patient care and operational efficiency
            </motion.p>
          </div>

          {/* Animated Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: TrendingUp,
                title: "45% Faster Operations",
                description: "Automated workflows and intelligent scheduling reduce administrative burden",
                color: "blue",
                gradient: "from-blue-500 to-cyan-500",
                shine: "bg-gradient-to-r from-blue-400/30 to-cyan-400/30",
                features: ["Digital patient intake", "Smart appointment scheduling", "Automated documentation"],
                delay: 0
              },
              {
                icon: Award,
                title: "99.9% Uptime",
                description: "Enterprise-grade cloud infrastructure ensures continuous service availability",
                color: "emerald",
                gradient: "from-emerald-500 to-teal-500",
                shine: "bg-gradient-to-r from-emerald-400/30 to-teal-400/30",
                features: ["Redundant architecture", "Real-time monitoring", "Instant failover"],
                delay: 0.1
              },
              {
                icon: Clock,
                title: "60% Time Saved",
                description: "Staff reclaim valuable hours through automation and process optimization",
                color: "violet",
                gradient: "from-violet-500 to-purple-500",
                shine: "bg-gradient-to-r from-violet-400/30 to-purple-400/30",
                features: ["Automated reporting", "Quick data retrieval", "Streamlined workflows"],
                delay: 0.2
              },
            ].map(({ icon: Icon, title, description, gradient, shine, features, delay }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Glowing Background Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500`}></div>

                {/* Card Container */}
                <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Animated Gradient Top Bar */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${gradient} relative overflow-hidden`}>
                    <div className={`absolute inset-0 ${shine} translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`}></div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {/* Icon with Floating Animation */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                      {title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3">
                      {features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: delay + idx * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-3"
                        >
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${gradient}`}></div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Hover Line */}
                  <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Simple Stats Section */}
          {/* Compact Stats Section */}
          <div className="mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  number: "40%",
                  label: "Revenue Growth",
                  description: "Increased revenue through optimized operations",
                  gradient: "from-blue-500 to-cyan-500",
                  icon: TrendingUp
                },
                {
                  number: "75%",
                  label: "Patient Satisfaction",
                  description: "Enhanced patient experience scores",
                  gradient: "from-emerald-500 to-teal-500",
                  icon: Heart
                },
                {
                  number: "50%",
                  label: "Staff Efficiency",
                  description: "Reduced manual administrative work",
                  gradient: "from-violet-500 to-purple-500",
                  icon: Users
                },
                {
                  number: "30%",
                  label: "Cost Reduction",
                  description: "Operational expenditure savings",
                  gradient: "from-amber-500 to-orange-500",
                  icon: DollarSign
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="relative group"
                >
                  {/* Subtle glow effect on hover */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-xl blur opacity-0 group-hover:opacity-10 transition duration-500`}></div>

                  <div className="relative bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/80 p-4 md:p-5 hover:border-gray-300 hover:shadow-md transition-all duration-300">
                    {/* Small icon in top corner */}
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3`}>
                      <stat.icon className="w-4 h-4 text-white" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                        {stat.number}
                      </p>
                      <p className="text-sm md:text-base font-semibold text-gray-800">
                        {stat.label}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                        {stat.description}
                      </p>
                    </div>

                    {/* Subtle bottom accent */}
                    <div className={`mt-3 h-0.5 w-8 bg-gradient-to-r ${stat.gradient} opacity-80 rounded-full`}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Animated CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex flex-col items-center gap-8">
              <div className="text-gray-600 text-lg">
                Ready to transform your hospital operations?
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/demo"
                    className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
                  >
                    {/* Shine Effect */}
                    <div className="absolute inset-0 overflow-hidden rounded-xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>

                    <span className="relative z-10">Schedule a Demo</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/contact"
                    className="group inline-flex items-center justify-center gap-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                  >
                    <span>Contact Sales</span>
                  </Link>
                </motion.div>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>No setup fees</span>
                </div>
                <div className="text-gray-300">•</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                  <span>14-day free trial</span>
                </div>
                <div className="text-gray-300">•</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-600"></div>
                  <span>Personalized onboarding</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= Why DCM Outperforms Traditional Systems ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why DCM Outperforms Traditional Systems
            </h2>
            <p className="text-gray-600 text-lg">
              See how DCM Hospital Management System compares to legacy solutions
            </p>
          </div>

          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
                <div className="text-left">
                  <h3 className="font-bold text-xl">Features</h3>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-xl">DCM Hospital Management</h3>
                  <p className="text-blue-100 text-sm">Modern Cloud Solution</p>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-xl">Traditional Systems</h3>
                  <p className="text-blue-100 text-sm">Legacy On-premise</p>
                </div>
              </div>

              {/* Comparison Rows */}
              <div className="divide-y divide-gray-100">
                {[
                  {
                    feature: "Cloud-Based Architecture",
                    dcm: { status: "yes", text: "Multi-tenant SaaS" },
                    others: { status: "no", text: "On-premise only" }
                  },
                  {
                    feature: "Real-time Analytics",
                    dcm: { status: "yes", text: "Live dashboards" },
                    others: { status: "partial", text: "Basic reports only" }
                  },
                  {
                    feature: "Mobile App Access",
                    dcm: { status: "yes", text: "iOS & Android" },
                    others: { status: "partial", text: "Web only" }
                  },
                  {
                    feature: "Telemedicine Integration",
                    dcm: { status: "yes", text: "Built-in video calls" },
                    others: { status: "no", text: "Third-party needed" }
                  },
                  {
                    feature: "AI-Powered Insights",
                    dcm: { status: "yes", text: "Predictive analytics" },
                    others: { status: "no", text: "Not available" }
                  },
                  {
                    feature: "Multi-branch Support",
                    dcm: { status: "yes", text: "Unlimited branches" },
                    others: { status: "limited", text: "Extra cost" }
                  },
                  {
                    feature: "24/7 Support",
                    dcm: { status: "yes", text: "Dedicated team" },
                    others: { status: "limited", text: "Business hours" }
                  },
                  {
                    feature: "HIPAA Compliance",
                    dcm: { status: "yes", text: "Fully certified" },
                    others: { status: "partial", text: "Basic security" }
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 p-6 hover:bg-blue-50 transition-colors duration-200"
                  >
                    {/* Feature */}
                    <div className="text-left">
                      <span className="font-semibold text-gray-900 text-base">
                        {item.feature}
                      </span>
                    </div>

                    {/* DCM */}
                    <div className="text-center">
                      {item.dcm.status === "yes" && (
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-medium text-base">
                            {item.dcm.text}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Others */}
                    <div className="text-center">
                      {item.others.status === "no" && (
                        <div className="flex items-center justify-center gap-2 text-red-600">
                          <X className="w-5 h-5" />
                          <span className="font-medium text-base">
                            {item.others.text}
                          </span>
                        </div>
                      )}

                      {item.others.status === "partial" && (
                        <div className="flex items-center justify-center gap-2 text-yellow-600">
                          <AlertCircle className="w-5 h-5" />
                          <span className="font-medium text-base">
                            {item.others.text}
                          </span>
                        </div>
                      )}

                      {item.others.status === "limited" && (
                        <div className="flex items-center justify-center gap-2 text-orange-600">
                          <TrendingUp className="w-5 h-5" />
                          <span className="font-medium text-base">
                            {item.others.text}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="bg-gray-50 p-6 text-center border-t border-gray-200">
                <p className="text-gray-600 mb-4 text-base">
                  Ready to upgrade to modern hospital management?
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Start Free Trial
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            <div className="space-y-4">
              {[
                {
                  feature: "Cloud Architecture",
                  dcm: "Multi-tenant SaaS",
                  traditional: "On-premise only",
                  dcmIcon: <CheckCircle className="w-4 h-4 text-green-600" />,
                  traditionalIcon: <X className="w-4 h-4 text-red-600" />
                },
                {
                  feature: "Real-time Analytics",
                  dcm: "Live dashboards",
                  traditional: "Basic reports",
                  dcmIcon: <CheckCircle className="w-4 h-4 text-green-600" />,
                  traditionalIcon: <AlertCircle className="w-4 h-4 text-yellow-600" />
                },
                {
                  feature: "Mobile App Access",
                  dcm: "iOS & Android",
                  traditional: "Web only",
                  dcmIcon: <CheckCircle className="w-4 h-4 text-green-600" />,
                  traditionalIcon: <AlertCircle className="w-4 h-4 text-yellow-600" />
                },
                {
                  feature: "Telemedicine",
                  dcm: "Built-in",
                  traditional: "Third-party",
                  dcmIcon: <CheckCircle className="w-4 h-4 text-green-600" />,
                  traditionalIcon: <X className="w-4 h-4 text-red-600" />
                },
                {
                  feature: "24/7 Support",
                  dcm: "Dedicated team",
                  traditional: "Business hours",
                  dcmIcon: <CheckCircle className="w-4 h-4 text-green-600" />,
                  traditionalIcon: <AlertCircle className="w-4 h-4 text-yellow-600" />
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4">
                    <h3 className="font-bold text-base">{item.feature}</h3>
                  </div>

                  <div className="p-4">
                    {/* DCM Row */}
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        {item.dcmIcon}
                        <span className="font-medium text-sm text-gray-700">DCM</span>
                      </div>
                      <span className="font-semibold text-green-700 text-sm">{item.dcm}</span>
                    </div>

                    {/* Traditional Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.traditionalIcon}
                        <span className="font-medium text-sm text-gray-700">Traditional</span>
                      </div>
                      <span className={`font-semibold text-sm ${item.traditionalIcon.type === X ? "text-red-700" :
                          "text-yellow-700"
                        }`}>
                        {item.traditional}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Mobile CTA */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 text-center border border-blue-100 mt-4">
                <p className="text-gray-600 mb-4 text-sm">
                  Ready to upgrade to modern hospital management?
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
                >
                  Start Free Trial
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BenefitsSection;