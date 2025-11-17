import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity, Menu, Zap, ArrowRight, CheckCircle2, Building2, Users, Heart, Calendar,
  Stethoscope, CreditCard, Pill, FlaskConical, Video, Shield, Globe, Lock,
  Quote, Star, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube,
} from "lucide-react";
// If you use React Router, you can swap <a href="..."> for <Link to="...">

export default function Home() {
  // ----- Animated Stats -----
  const statDefs = useMemo(
    () => ([
      { id: "hospitals", label: "Hospitals Powered", target: 50 },
      { id: "professionals", label: "Healthcare Professionals", target: 2000 },
      { id: "patients", label: "Patients Served", target: 100000 },
      { id: "appointments", label: "Appointments Daily", target: 5000 },
    ]),
    []
  );
  const [stats, setStats] = useState({
    hospitals: 0,
    professionals: 0,
    patients: 0,
    appointments: 0,
  });

  useEffect(() => {
    // animate numbers ~2s
    const duration = 2000;
    const start = performance.now();
    let rafId;

    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setStats({
        hospitals: Math.floor(t * statDefs[0].target),
        professionals: Math.floor(t * statDefs[1].target),
        patients: Math.floor(t * statDefs[2].target),
        appointments: Math.floor(t * statDefs[3].target),
      });
      if (t < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [statDefs]);

  // ----- Testimonials Slider -----
  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Chief Medical Officer",
      hospital: "Apollo Multispecialty Hospital",
      avatar:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
      text:
        "DCM Hospital Management has transformed our operations. Patient management is now seamless, and our doctors love the digital prescription feature. The telemedicine module helped us reach more patients during the pandemic.",
    },
    {
      name: "Ms. Priya Sharma",
      role: "Hospital Administrator",
      hospital: "Fortis Healthcare Center",
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      text:
        "The billing and accounts module has reduced our revenue leakage by 40%. The automated reconciliation and insurance claim processing saves us hours of manual work every day. Highly recommended!",
    },
    {
      name: "Dr. Amit Patel",
      role: "Director",
      hospital: "Medanta Superspecialty Clinic",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
      text:
        "As a multi-location hospital chain, managing operations was a nightmare. DCM's multi-tenant architecture and centralized reporting gave us complete visibility. The ROI was evident within 3 months.",
    },
    {
      name: "Dr. Anjali Mehta",
      role: "Head of Pediatrics",
      hospital: "Max Healthcare",
      avatar:
        "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=100&h=100&fit=crop&crop=face",
      text:
        "The patient portal has significantly improved our communication with patients. Parents can now access their children's medical records and vaccination schedules anytime, reducing phone calls by 60%.",
    },
    {
      name: "Mr. Rohan Verma",
      role: "IT Director",
      hospital: "Artemis Hospitals",
      avatar:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
      text:
        "Implementation was smooth, and the support team was exceptional. The API integration with our existing systems was seamless. We've seen a 30% improvement in operational efficiency since switching to DCM.",
    },
  ];

  const [slide, setSlide] = useState(0);
  const totalSlides = testimonials.length;
  const sliderRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(id);
  }, [totalSlides]);

  // ----- Partners -----
  const partners = [
    {
      name: "Apollo Hospitals",
      location: "Chennai, India",
      img:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      quote:
        '"DCM\'s patient management system has reduced our administrative workload by 40%, allowing our staff to focus more on patient care."',
      author: "- Dr. Rajesh Kumar, Chief Medical Officer",
    },
    {
      name: "Fortis Healthcare",
      location: "Delhi, India",
      img:
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      quote:
        '"The pharmacy management module has optimized our inventory, reducing medication waste by 25% and ensuring availability of critical drugs."',
      author: "- Ms. Priya Sharma, Hospital Administrator",
    },
    {
      name: "Manipal Hospitals",
      location: "Bangalore, India",
      img:
        "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      quote:
        '"As a multi-location hospital chain, DCM\'s centralized reporting gives us complete visibility across all our facilities in real-time."',
      author: "- Dr. Amit Patel, Medical Director",
    },
  ];

  // Small helper
  const prettyNum = (n) =>
    n >= 1000 ? `${n.toLocaleString()}+` : n.toLocaleString();

  return (
    <>
      

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500 text-white rounded-full px-4 py-2 mb-6">
                <Zap size={16} />
                <span>Multi-Tenant SaaS Platform</span>
              </div>

              <h1 className="text-2xl md:text-4xl font-extrabold leading-tight text-gray-900 mb-4">
                Modern Hospital Management{" "}
                <span className="text-blue-600">Made Simple</span>
              </h1>

              <p className="text-lg text-gray-600 mb-6">
                Streamline operations, improve patient care, and boost efficiency with our comprehensive
                hospital management system trusted by 50+ healthcare facilities.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <a href="/contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 shadow">
                  Request Demo
                  <ArrowRight size={20} />
                </a>
                <a href="/features" className="inline-flex items-center px-5 py-3 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50">
                  View Features
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-500" size={20} />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-500" size={20} />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                className="w-full rounded-xl shadow-2xl"
                alt="Modern Hospital Management"
                src="https://images.unsplash.com/photo-1758691461888-b74515208d7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGhlYWx0aGNhcmUlMjB0ZWNobm9sb2d5fGVufDB8fHx8MTc2MjMzMzEzMXww&ixlib=rb-4.1.0&q=85"
              />
              <div className="absolute left-4 bottom-4 bg-white rounded-lg shadow-lg p-3 flex items-center gap-3">
                <span className="w-10 h-10 rounded-md bg-green-500 text-white flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </span>
                <div>
                  <p className="font-semibold text-sm text-gray-900">99.9% Uptime</p>
                  <p className="text-xs text-gray-500">Guaranteed Reliability</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mx-auto w-14 h-14 rounded-xl bg-blue-500 text-white flex items-center justify-center mb-3">
                <Building2 size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {prettyNum(stats.hospitals)}
              </p>
              <p className="text-gray-600">Hospitals Powered</p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-14 h-14 rounded-xl bg-blue-500 text-white flex items-center justify-center mb-3">
                <Users size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {prettyNum(stats.professionals)}
              </p>
              <p className="text-gray-600">Healthcare Professionals</p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-14 h-14 rounded-xl bg-blue-500 text-white flex items-center justify-center mb-3">
                <Heart size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {prettyNum(stats.patients)}
              </p>
              <p className="text-gray-600">Patients Served</p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-14 h-14 rounded-xl bg-blue-500 text-white flex items-center justify-center mb-3">
                <Calendar size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {prettyNum(stats.appointments)}
              </p>
              <p className="text-gray-600">Appointments Daily</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-gray-50" id="features-preview">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Complete Hospital Management Suite</h2>
            <p className="text-gray-600 text-lg">Everything you need to run a modern healthcare facility efficiently</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "Patient Management System", desc: "Comprehensive patient registration, medical history, appointment scheduling with intelligent conflict resolution, and document management." },
              { icon: Stethoscope, title: "Doctor Portal", desc: "Secure doctor dashboard with appointment tracking, digital prescription creation, patient records access, and treatment plan documentation." },
              { icon: CreditCard, title: "Billing & Accounts", desc: "Complete financial management with OPD/IPD billing, payment tracking, insurance claims, and automated revenue reconciliation." },
              { icon: Pill, title: "Pharmacy Management", desc: "End-to-end inventory control with automated purchase orders, sales tracking, expiry alerts, and billing integration." },
              { icon: FlaskConical, title: "Laboratory (LIMS)", desc: "Streamlined laboratory operations with test registration, sample tracking, report generation, and secure online result access." },
              { icon: Video, title: "Telemedicine", desc: "Enable remote healthcare with secure HD video consultations, digital prescriptions, and remote vital signs monitoring." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500 text-white mb-3">
                  <Icon size={24} />
                </span>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a href="/features" className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">
              View All Features
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Healthcare Facilities Choose DCM
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Built with modern technology and healthcare expertise to deliver the best experience for hospitals,
                doctors, and patients.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Shield, title: "Enterprise-Grade Security", sub: "HIPAA & GDPR compliant with end-to-end encryption" },
                  { icon: Zap, title: "Lightning Fast Performance", sub: "Cloud-based infrastructure ensures 99.9% uptime" },
                  { icon: Globe, title: "Multi-Platform Access", sub: "Web, iOS, and Android apps for seamless access" },
                  { icon: Lock, title: "Data Privacy", sub: "Your data stays secure with role-based access control" },
                ].map(({ icon: Icon, title, sub }) => (
                  <li key={title} className="flex gap-3">
                    <Icon className="text-blue-600 mt-1" size={20} />
                    <div>
                      <strong className="text-gray-900">{title}</strong>
                      <br />
                      <span className="text-gray-600 text-sm">{sub}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img
                alt="Healthcare Technology"
                className="w-full rounded-xl shadow-xl"
                src="https://images.unsplash.com/photo-1589279003513-467d320f47eb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxkb2N0b3IlMjBjb25zdWx0YXRpb258ZW58MHx8fHwxNzYyMzAyOTU1fDA&ixlib=rb-4.1.0&q=85"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Trusted by Healthcare Professionals</h2>
            <p className="text-gray-600 text-lg">
              See what doctors, administrators, and healthcare facilities say about DCM Hospital Management
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto overflow-hidden">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${slide * 100}%)` }}
            >
              {testimonials.map((t, idx) => (
                <div key={idx} className="min-w-full p-6 bg-white rounded-xl shadow-md">
                  <Quote className="text-blue-400 mb-4" />
                  <div className="flex items-center gap-4 mb-4">
                    <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover" />
                    <div>
                      <h4 className="font-semibold">{t.name}</h4>
                      <p className="text-sm text-gray-600">{t.role}</p>
                      <p className="text-sm font-medium text-gray-700">{t.hospital}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-lg italic text-gray-700">{t.text}</p>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`w-3 h-3 rounded-full transition ${
                    i === slide ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Healthcare Partners</h2>
            <p className="text-gray-600 text-lg">
              Discover how leading hospitals are using DCM to transform patient care and streamline operations
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:-translate-y-2 hover:shadow-xl transition">
                <div className="h-52 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{p.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin size={14} />
                        <span>{p.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 bg-gray-50 p-3 rounded-lg border-l-4 border-blue-600">
                    <p className="text-sm italic text-gray-700">{p.quote}</p>
                    <p className="text-xs text-gray-600 mt-1">{p.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Hospital Operations?</h2>
          <p className="text-lg text-white/90 mb-8">
            Join 50+ healthcare facilities already using DCM Hospital Management
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/contact" className="inline-flex items-center gap-2 bg-white text-blue-700 px-5 py-3 rounded-md font-medium hover:bg-gray-50">
              Request Demo
              <ArrowRight size={20} />
            </a>
            <a href="/pricing" className="inline-flex items-center gap-2 border border-white px-5 py-3 rounded-md font-medium hover:bg-white hover:text-blue-700">
              View Pricing
            </a>
          </div>
        </div>
      </section>
      {/* Toast (static placeholder; show via state if needed) */}
      <div id="toast" className="fixed bottom-8 right-8 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg opacity-0 translate-y-6 pointer-events-none">
        <div className="font-semibold">Message Sent!</div>
        <div className="text-sm text-gray-300">Thank you for contacting us. We will get back to you within 24 hours.</div>
      </div>
    </>
  );
}

/* ---------- Small footer helpers ---------- */
function FooterCol({ title, links }) {
  return (
    <div>
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <ul className="space-y-2 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            <a className="text-gray-400 hover:text-white" href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
function Social({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="w-9 h-9 rounded-md bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-center"
    >
      {children}
    </a>
  );
}
function MailIcon(props){ return <svg {...props} viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor"><path d="M4 4h16v16H4z"/><path d="m22 6-10 7L2 6"/></svg> }
function PhoneIcon(props){ return <svg {...props} viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor"><path d="M22 16.92V21a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2 4.18 2 2 0 0 1 4 2h4.09a2 2 0 0 1 2 1.72l.57 3.42a2 2 0 0 1-.5 1.74L8.09 10.91a16 16 0 0 0 6 6l2-2.06a2 2 0 0 1 1.74-.5l3.42.57A2 2 0 0 1 22 16.92z"/></svg> }
