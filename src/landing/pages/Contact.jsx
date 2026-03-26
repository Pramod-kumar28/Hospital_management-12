import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ChevronDown,
} from "lucide-react";
import { API_HEADERS, CONTACT_SEND, PUBLIC_API_BASE_URL } from "../../config/api";

const contactCards = [
  {
    icon: Mail,
    title: "Email Us",
    primary: "hr@designcareermetrics.com",
    secondary: "support@careermetrics.com",
    actionLabel: "Send Email",
    onClick: () => {
      window.location.href = "mailto:hr@designcareermetrics.com";
    },
  },
  {
    icon: Phone,
    title: "Call Us",
    primary: "Sales: +91 7337572543",
    secondary: "Support: +91 1800-123-4568",
    actionLabel: "Call Now",
    onClick: () => {
      window.location.href = "tel:+917337572543";
    },
  },
  {
    icon: MapPin,
    title: "Visit Our Office",
    primary: "Design Career Metrics Pvt Ltd",
    secondary:
      "Office #407 & 409, 4th Floor, Jain Sadguru Image's Capital Park, Madhapur, Hyderabad",
    actionLabel: "Get Directions",
    onClick: () => {
      window.open(
        "https://maps.google.com/maps?q=Design+Career+Metrics+Pvt+Ltd+Hyderabad",
        "_blank"
      );
    },
  },
  {
    icon: Clock,
    title: "Working Hours",
    primary: "Mon - Fri: 9:00 AM - 6:00 PM",
    secondary: "Priority assistance available for enterprise clients",
    actionLabel: "Schedule Demo",
    onClick: () => {
      window.location.href = "/request-demo";
    },
  },
];

const faqItems = [
  {
    question: "How quickly will your team respond to my enquiry?",
    answer:
      "Our team typically responds within 24 hours for general enquiries, demos, pricing discussions and implementation questions.",
  },
  {
    question: "Can I request a product demo for specific hospital modules?",
    answer:
      "Yes. You can request module-specific walkthroughs for admin, patient management, doctors, lab, pharmacy, billing, telemedicine and related workflows.",
  },
  {
    question: "Do you support both hospitals and smaller clinics?",
    answer:
      "Yes. DCM HMS is designed for growing clinics, speciality centers and larger hospitals that need connected operational and clinical workflows.",
  },
  {
    question: "Can we discuss implementation, migration and onboarding before choosing a plan?",
    answer:
      "Absolutely. We can walk you through implementation planning, onboarding expectations, migration support and the modules best suited to your setup.",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const payload = {
      name: formData.name,
      fullName: formData.name,
      full_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      hospitalName: formData.company,
      hospital_name: formData.company,
      message: formData.message,
    };

    try {
      const res = await fetch(`${PUBLIC_API_BASE_URL}${CONTACT_SEND}`, {
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
          data?.message || data?.detail || "Unable to send your message right now."
        );
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative mt-12 overflow-hidden px-4 py-10 md:py-12">
        <div className="absolute inset-x-0 top-0 h-52 bg-[radial-gradient(circle_at_center,rgba(0,94,184,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-[#005EB8]">
            <Mail className="h-4 w-4" />
            <span>Contact DCM HMS</span>
          </div>

          <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-slate-950 md:text-5xl">
            Contact Our{" "}
            <span className="bg-gradient-to-r from-[#005EB8] via-[#1597E5] to-[#67D6FF] bg-clip-text text-transparent">
              Team
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            Reach out for product guidance, implementation discussions, hospital workflow support,
            pricing details, or a personalized DCM HMS walkthrough.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.title}
                  type="button"
                  onClick={card.onClick}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-[#005EB8]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900">{card.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-800">{card.primary}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{card.secondary}</p>
                  <div className="mt-4 inline-flex items-center rounded-full bg-gradient-to-r from-[#005EB8] to-[#1597E5] px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(0,94,184,0.2)]">
                    {card.actionLabel}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-6 md:py-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 md:p-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Tell Us What Your{" "}
              <span className="bg-gradient-to-r from-[#005EB8] via-[#1597E5] to-[#67D6FF] bg-clip-text text-transparent">
                Hospital Needs
              </span>
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Share your current challenges, the modules you want to explore, or the type of demo
              you need. We’ll help you take the next step clearly.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Product walkthroughs tailored to your department needs",
                "Pricing and implementation guidance for hospitals and clinics",
                "Support across admin, doctor, lab, pharmacy and telemedicine workflows",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-600"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div
            id="contactForm"
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:p-8"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-950 md:text-3xl">
                Send Us a{" "}
                <span className="bg-gradient-to-r from-[#005EB8] via-[#1597E5] to-[#67D6FF] bg-clip-text text-transparent">
                  Message
                </span>
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>

            {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Field
                  label="Full Name *"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Smith"
                  required
                />
                <Field
                  label="Email Address *"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john.smith@hospital.com"
                  required
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Field
                  label="Phone Number"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                />
                <Field
                  label="Hospital / Company Name"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your hospital or clinic"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-700">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  required
                  placeholder="Tell us about your hospital requirements, the modules you are interested in, or the type of demo you would like."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 transition-all duration-300 focus:border-sky-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100"
                />
              </div>

              {submitError ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {submitError}
                </div>
              ) : null}

              <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-blue-500/80 px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(0,94,184,0.24)] transition-all duration-300 ease-in-out hover:bg-blue-600 hover:shadow-[0_20px_45px_rgba(0,94,184,0.32)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/80 border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-10 bg-white/30" />
                  </div>
                </button>

                <p className="text-sm leading-6 text-slate-500">
                  We respect your privacy and protect your data.
                </p>
              </div>
            </form>
            ) : (
              <div className="rounded-[1.6rem] border border-emerald-200 bg-emerald-50 p-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_16px_32px_rgba(16,185,129,0.24)]">
                  <Send className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-slate-900">Message Sent Successfully</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  Thank you for contacting us. Our team will get back to you within 24 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-10 pt-2 md:pb-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
          <div className="h-80 bg-slate-100 md:h-[420px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.263734477665!2d78.39138831538457!3d17.447950588044688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f2b8c67f%3A0xce2b9c64b93e8b3e!2sDesign%20Career%20Metrics%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1633706543210!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Design Career Metrics Office Location"
              className="h-full w-full"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-12 pt-2 md:pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-[#005EB8]">
              <Mail className="h-4 w-4" />
              <span>Quick Answers</span>
            </div>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Questions You May{" "}
              <span className="bg-gradient-to-r from-[#005EB8] via-[#1597E5] to-[#67D6FF] bg-clip-text text-transparent">
                Ask Us
              </span>
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Before booking a call or submitting your enquiry, here are a few quick answers that
              can help you move faster.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={item.question}
                  className={index !== faqItems.length - 1 ? "border-b border-slate-200" : ""}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-300 hover:bg-slate-50 md:px-7"
                  >
                    <span className="text-base font-semibold leading-7 text-slate-900 md:text-lg">
                      {item.question}
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[#005EB8]">
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 text-sm leading-7 text-slate-600 md:px-7">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 transition-all duration-300 focus:border-sky-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100"
      />
    </div>
  );
}
