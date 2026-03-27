import { useState } from "react";
import { CalendarDays, Building2, Users, Stethoscope, CheckCircle2, MonitorSmartphone } from "lucide-react";
import { API_HEADERS, DEMO_REQUEST, PUBLIC_API_BASE_URL } from "../../config/api";

const modules = [
  "Patient Management",
  "Appointments",
  "Billing & Finance",
  "Lab Management",
  "Pharmacy",
  "Telemedicine",
];

const roles = [
  "Hospital Administrator",
  "Doctor",
  "Operations Manager",
  "Reception / Front Desk",
  "IT / Digital Team",
  "Other",
];

export default function RequestDemo() {
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    phone: "",
    hospitalName: "",
    role: "",
    teamSize: "",
    preferredDate: "",
    preferredMode: "Online Demo",
    message: "",
    modules: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleModule = (module) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.includes(module)
        ? prev.modules.filter((item) => item !== module)
        : [...prev.modules, module],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const payload = {
      fullName: formData.fullName,
      full_name: formData.fullName,
      workEmail: formData.workEmail,
      work_email: formData.workEmail,
      email: formData.workEmail,
      phone: formData.phone,
      hospitalName: formData.hospitalName,
      hospital_name: formData.hospitalName,
      role: formData.role,
      teamSize: formData.teamSize,
      team_size: formData.teamSize,
      preferredDate: formData.preferredDate,
      preferred_date: formData.preferredDate,
      preferredMode: formData.preferredMode,
      preferred_mode: formData.preferredMode,
      message: formData.message,
      modules: formData.modules,
    };

    try {
      const res = await fetch(`${PUBLIC_API_BASE_URL}${DEMO_REQUEST}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...API_HEADERS,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data?.message || data?.detail || "Unable to submit your demo request right now."
        );
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white py-14 md:py-20">
      <div className="absolute left-[-4rem] top-20 h-64 w-64 rounded-full bg-sky-100/70 blur-3xl" />
      <div className="absolute right-[-4rem] bottom-20 h-72 w-72 rounded-full bg-cyan-100/60 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-700 shadow-[0_10px_24px_rgba(0,94,184,0.08)]">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            Request Demo
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            See How DCM{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Fits Your Hospital Workflow
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            Tell us a little about your hospital or clinic, and we will set up a tailored demo
            focused on the modules and workflows your team cares about most.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="space-y-5 lg:self-center">
            <InfoCard
              icon={MonitorSmartphone}
              title="Personalized Product Walkthrough"
              body="We tailor the demo around patient flow, appointments, billing, telemedicine and the modules your team wants to evaluate."
            />
            <InfoCard
              icon={CalendarDays}
              title="Book The Right Demo Format"
              body="Choose an online demo for speed or align with our team on the best way to walk through your use case."
            />
            <InfoCard
              icon={Users}
              title="Built For Real Hospital Teams"
              body="From administrators and doctors to front-desk teams, we show how DCM supports daily hospital operations end to end."
            />
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-sky-100 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.08)]">
            <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-cyan-50 px-6 py-6 md:px-8">
              <h2 className="text-2xl font-bold text-slate-900">Book Your Demo</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 md:text-base">
                Share your details and our team will reach out with the next available slot.
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6 p-6 md:p-8">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Full Name *">
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="John Smith"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                    />
                  </Field>

                  <Field label="Work Email *">
                    <input
                      type="email"
                      name="workEmail"
                      value={formData.workEmail}
                      onChange={handleChange}
                      required
                      placeholder="john@hospital.com"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                    />
                  </Field>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Phone Number *">
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                    />
                  </Field>

                  <Field label="Hospital / Clinic Name *">
                    <input
                      name="hospitalName"
                      value={formData.hospitalName}
                      onChange={handleChange}
                      required
                      placeholder="City Care Hospital"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                    />
                  </Field>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Your Role *">
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                    >
                      <option value="">Select role</option>
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Hospital Size">
                    <input
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      placeholder="e.g. 50 beds / 120 staff"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                    />
                  </Field>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Preferred Demo Date">
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                    />
                  </Field>

                  <Field label="Preferred Demo Mode">
                    <select
                      name="preferredMode"
                      value={formData.preferredMode}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                    >
                      <option>Online Demo</option>
                      <option>Phone Call First</option>
                      <option>Need Help Deciding</option>
                    </select>
                  </Field>
                </div>

                <Field label="Modules You Want To See">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {modules.map((module) => {
                      const active = formData.modules.includes(module);
                      return (
                        <button
                          key={module}
                          type="button"
                          onClick={() => toggleModule(module)}
                          className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                            active
                              ? "border-sky-300 bg-sky-50 text-[#005EB8]"
                              : "border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:bg-slate-50"
                          }`}
                        >
                          {module}
                        </button>
                      );
                    })}
                  </div>
                </Field>

                <Field label="Anything Specific You Want Covered?">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your workflows, current challenges, or modules you want us to focus on."
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                </Field>

                {submitError ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group/button relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border border-white/20 bg-blue-500/55 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-xl hover:shadow-blue-600/40 sm:text-base disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Request Demo"}
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-10 bg-white/30" />
                  </div>
                </button>
              </form>
            ) : (
              <div className="p-8 md:p-10">
                <div className="rounded-[1.6rem] border border-emerald-200 bg-emerald-50 p-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_16px_32px_rgba(16,185,129,0.24)]">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-slate-900">Demo Request Received</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    Our team will contact you shortly to confirm the best time and tailor the demo
                    to your hospital workflow.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function InfoCard({ icon: Icon, title, body }) {
  return (
    <div className="group relative overflow-hidden rounded-[1.6rem] border border-sky-100/80 bg-white px-5 py-5 shadow-[0_18px_44px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_24px_58px_rgba(0,94,184,0.14)]">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-300" />
      <div className="absolute right-4 top-4 h-24 w-24 rounded-full bg-sky-100/70 blur-3xl transition duration-300 group-hover:bg-cyan-100/90" />

      <div className="relative flex items-start gap-4">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 text-white shadow-[0_14px_26px_rgba(0,94,184,0.18)]">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-[1.1rem] font-semibold leading-tight text-slate-900">{title}</h3>
          <p className="mt-2.5 text-[0.94rem] leading-7 text-slate-600">{body}</p>
        </div>
      </div>
    </div>
  );
}
