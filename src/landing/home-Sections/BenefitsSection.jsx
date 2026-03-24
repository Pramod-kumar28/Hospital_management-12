import React from "react";
import { TrendingUp, CheckCircle, X, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const desktopComparison = [
  {
    feature: "Cloud-Based Architecture",
    dcm: { status: "yes", text: "Multi-tenant SaaS" },
    others: { status: "no", text: "On-premise only" },
  },
  {
    feature: "Real-time Analytics",
    dcm: { status: "yes", text: "Live dashboards" },
    others: { status: "partial", text: "Basic reports only" },
  },
  {
    feature: "Mobile App Access",
    dcm: { status: "yes", text: "iOS & Android" },
    others: { status: "partial", text: "Web only" },
  },
  {
    feature: "Telemedicine Integration",
    dcm: { status: "yes", text: "Built-in video calls" },
    others: { status: "no", text: "Third-party needed" },
  },
  {
    feature: "AI-Powered Insights",
    dcm: { status: "yes", text: "Predictive analytics" },
    others: { status: "no", text: "Not available" },
  },
  {
    feature: "Multi-branch Support",
    dcm: { status: "yes", text: "Unlimited branches" },
    others: { status: "limited", text: "Extra cost" },
  },
  {
    feature: "24/7 Support",
    dcm: { status: "yes", text: "Dedicated team" },
    others: { status: "limited", text: "Business hours" },
  },
  {
    feature: "HIPAA Compliance",
    dcm: { status: "yes", text: "Fully certified" },
    others: { status: "partial", text: "Basic security" },
  },
];

const mobileComparison = [
  {
    feature: "Cloud Architecture",
    dcm: "Multi-tenant SaaS",
    traditional: "On-premise only",
    dcmIcon: <CheckCircle className="h-4 w-4 text-green-600" />,
    traditionalIcon: <X className="h-4 w-4 text-red-600" />,
  },
  {
    feature: "Real-time Analytics",
    dcm: "Live dashboards",
    traditional: "Basic reports",
    dcmIcon: <CheckCircle className="h-4 w-4 text-green-600" />,
    traditionalIcon: <AlertCircle className="h-4 w-4 text-yellow-600" />,
  },
  {
    feature: "Mobile App Access",
    dcm: "iOS & Android",
    traditional: "Web only",
    dcmIcon: <CheckCircle className="h-4 w-4 text-green-600" />,
    traditionalIcon: <AlertCircle className="h-4 w-4 text-yellow-600" />,
  },
  {
    feature: "Telemedicine",
    dcm: "Built-in",
    traditional: "Third-party",
    dcmIcon: <CheckCircle className="h-4 w-4 text-green-600" />,
    traditionalIcon: <X className="h-4 w-4 text-red-600" />,
  },
  {
    feature: "24/7 Support",
    dcm: "Dedicated team",
    traditional: "Business hours",
    dcmIcon: <CheckCircle className="h-4 w-4 text-green-600" />,
    traditionalIcon: <AlertCircle className="h-4 w-4 text-yellow-600" />,
  },
];

const BenefitsSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-16">
      <div className="absolute left-[-4rem] top-20 h-56 w-56 rounded-full bg-sky-100/70 blur-3xl" />
      <div className="absolute right-[-4rem] bottom-20 h-64 w-64 rounded-full bg-cyan-100/60 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-10 max-w-4xl text-center md:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-700 shadow-[0_10px_24px_rgba(0,94,184,0.08)]">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            Comparison
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Why DCM{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Outperforms Traditional Systems
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            See how DCM Hospital Management System compares with legacy platforms across cloud
            architecture, mobility, analytics, telemedicine and long-term operational value.
          </p>
        </div>

        <div className="hidden md:block">
          <div className="overflow-hidden rounded-[2rem] border border-sky-100 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.08)]">
            <div className="grid grid-cols-3 border-b border-sky-100 bg-gradient-to-r from-[#005EB8] via-blue-600 to-cyan-500 px-6 py-6 text-white">
              <div className="text-left">
                <h3 className="text-xl font-bold">Capabilities</h3>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">DCM Hospital Management</h3>
                <p className="mt-1 text-sm text-blue-100">Modern cloud solution</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Traditional Systems</h3>
                <p className="mt-1 text-sm text-blue-100">Legacy on-premise setup</p>
              </div>
            </div>

            <div className="divide-y divide-sky-100/80">
              {desktopComparison.map((item, index) => (
                <div
                  key={item.feature}
                  className={`grid grid-cols-3 items-center px-6 py-5 transition-colors duration-200 hover:bg-sky-50/70 ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/55"
                  }`}
                >
                  <div className="text-left">
                    <span className="text-base font-semibold text-slate-900">{item.feature}</span>
                  </div>

                  <div className="text-center">
                    {item.dcm.status === "yes" && (
                      <div className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-emerald-700">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm font-semibold">{item.dcm.text}</span>
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    {item.others.status === "no" && (
                      <div className="inline-flex items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-red-700">
                        <X className="h-5 w-5" />
                        <span className="text-sm font-semibold">{item.others.text}</span>
                      </div>
                    )}

                    {item.others.status === "partial" && (
                      <div className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-amber-700">
                        <AlertCircle className="h-5 w-5" />
                        <span className="text-sm font-semibold">{item.others.text}</span>
                      </div>
                    )}

                    {item.others.status === "limited" && (
                      <div className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-orange-700">
                        <TrendingUp className="h-5 w-5" />
                        <span className="text-sm font-semibold">{item.others.text}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-sky-100 bg-gradient-to-r from-sky-50/80 to-cyan-50/80 p-6 text-center">
              <p className="mb-4 text-base text-slate-600">
                Ready to upgrade to modern hospital management?
              </p>
              <Link
                to="/contact"
                className="group/button relative inline-flex w-full max-w-[240px] items-center justify-center overflow-hidden rounded-full border border-white/20 bg-blue-500/55 px-6 py-3 text-sm font-semibold text-white backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-blue-600/40 sm:w-auto sm:max-w-none sm:text-base"
              >
                Start Free Trial
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/30" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="space-y-4">
            {mobileComparison.map((item) => (
              <div
                key={item.feature}
                className="overflow-hidden rounded-[1.35rem] border border-sky-100 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)]"
              >
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 text-white">
                  <h3 className="text-base font-bold">{item.feature}</h3>
                </div>

                <div className="p-4">
                  <div className="mb-3 flex items-center justify-between border-b border-sky-100 pb-3">
                    <div className="flex items-center gap-2">
                      {item.dcmIcon}
                      <span className="text-sm font-medium text-slate-700">DCM</span>
                    </div>
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-green-700">
                      {item.dcm}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.traditionalIcon}
                      <span className="text-sm font-medium text-slate-700">Traditional</span>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        item.traditionalIcon.type === X
                          ? "border border-red-200 bg-red-50 text-red-700"
                          : "border border-amber-200 bg-amber-50 text-yellow-700"
                      }`}
                    >
                      {item.traditional}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-4 rounded-[1.35rem] border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6 text-center">
              <p className="mb-4 text-sm text-slate-600">
                Ready to upgrade to modern hospital management?
              </p>
              <Link
                to="/contact"
                className="group/button relative inline-flex w-full justify-center overflow-hidden rounded-full border border-white/20 bg-blue-500/55 px-6 py-3 text-sm font-semibold text-white backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-blue-600/40 sm:w-auto"
              >
                Start Free Trial
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/30" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
