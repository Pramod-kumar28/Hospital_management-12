// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   Activity, Menu, Zap, ArrowRight, CheckCircle2, Building2, Users, Heart, Calendar,
//   Stethoscope, CreditCard, Pill, FlaskConical, Video, Shield, Globe, Lock,
//   Quote, Star, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube,
// } from "lucide-react";
// // If you use React Router, you can swap <a href="..."> for <Link to="...">

// export default function Home() {
//   // ----- Animated Stats -----
//   const statDefs = useMemo(
//     () => ([
//       { id: "hospitals", label: "Hospitals Powered", target: 50 },
//       { id: "professionals", label: "Healthcare Professionals", target: 2000 },
//       { id: "patients", label: "Patients Served", target: 100000 },
//       { id: "appointments", label: "Appointments Daily", target: 5000 },
//     ]),
//     []
//   );
//   const [stats, setStats] = useState({
//     hospitals: 0,
//     professionals: 0,
//     patients: 0,
//     appointments: 0,
//   });

//   useEffect(() => {
//     // animate numbers ~2s
//     const duration = 2000;
//     const start = performance.now();
//     let rafId;

//     const step = (now) => {
//       const t = Math.min(1, (now - start) / duration);
//       setStats({
//         hospitals: Math.floor(t * statDefs[0].target),
//         professionals: Math.floor(t * statDefs[1].target),
//         patients: Math.floor(t * statDefs[2].target),
//         appointments: Math.floor(t * statDefs[3].target),
//       });
//       if (t < 1) rafId = requestAnimationFrame(step);
//     };
//     rafId = requestAnimationFrame(step);
//     return () => cancelAnimationFrame(rafId);
//   }, [statDefs]);

//   // ----- Testimonials Slider -----
//   const testimonials = [
//     {
//       name: "Dr. Rajesh Kumar",
//       role: "Chief Medical Officer",
//       hospital: "Apollo Multispecialty Hospital",
//       avatar:
//         "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
//       text:
//         "DCM Hospital Management has transformed our operations. Patient management is now seamless, and our doctors love the digital prescription feature. The telemedicine module helped us reach more patients during the pandemic.",
//     },
//     {
//       name: "Ms. Priya Sharma",
//       role: "Hospital Administrator",
//       hospital: "Fortis Healthcare Center",
//       avatar:
//         "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
//       text:
//         "The billing and accounts module has reduced our revenue leakage by 40%. The automated reconciliation and insurance claim processing saves us hours of manual work every day. Highly recommended!",
//     },
//     {
//       name: "Dr. Amit Patel",
//       role: "Director",
//       hospital: "Medanta Superspecialty Clinic",
//       avatar:
//         "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
//       text:
//         "As a multi-location hospital chain, managing operations was a nightmare. DCM's multi-tenant architecture and centralized reporting gave us complete visibility. The ROI was evident within 3 months.",
//     },
//     {
//       name: "Dr. Anjali Mehta",
//       role: "Head of Pediatrics",
//       hospital: "Max Healthcare",
//       avatar:
//         "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=100&h=100&fit=crop&crop=face",
//       text:
//         "The patient portal has significantly improved our communication with patients. Parents can now access their children's medical records and vaccination schedules anytime, reducing phone calls by 60%.",
//     },
//     {
//       name: "Mr. Rohan Verma",
//       role: "IT Director",
//       hospital: "Artemis Hospitals",
//       avatar:
//         "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
//       text:
//         "Implementation was smooth, and the support team was exceptional. The API integration with our existing systems was seamless. We've seen a 30% improvement in operational efficiency since switching to DCM.",
//     },
//   ];

//   const [slide, setSlide] = useState(0);
//   const totalSlides = testimonials.length;
//   const sliderRef = useRef(null);

//   useEffect(() => {
//     const id = setInterval(() => {
//       setSlide((s) => (s + 1) % totalSlides);
//     }, 5000);
//     return () => clearInterval(id);
//   }, [totalSlides]);

//   // ----- Partners -----
//   const partners = [
//     {
//       name: "Apollo Hospitals",
//       location: "Chennai, India",
//       img:
//         "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//       quote:
//         '"DCM\'s patient management system has reduced our administrative workload by 40%, allowing our staff to focus more on patient care."',
//       author: "- Dr. Rajesh Kumar, Chief Medical Officer",
//     },
//     {
//       name: "Fortis Healthcare",
//       location: "Delhi, India",
//       img:
//         "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//       quote:
//         '"The pharmacy management module has optimized our inventory, reducing medication waste by 25% and ensuring availability of critical drugs."',
//       author: "- Ms. Priya Sharma, Hospital Administrator",
//     },
//     {
//       name: "Manipal Hospitals",
//       location: "Bangalore, India",
//       img:
//         "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//       quote:
//         '"As a multi-location hospital chain, DCM\'s centralized reporting gives us complete visibility across all our facilities in real-time."',
//       author: "- Dr. Amit Patel, Medical Director",
//     },
//   ];

//   // Small helper
//   const prettyNum = (n) =>
//     n >= 1000 ? `${n.toLocaleString()}+` : n.toLocaleString();

//   return (
//     <>
      

//       {/* Hero */}
//       <section className="bg-gradient-to-br from-gray-50 to-white">
//         <div className="max-w-6xl mx-auto px-4 py-24">
//           <div className="grid md:grid-cols-2 gap-16 items-center">
//             <div>
//               <div className="inline-flex items-center gap-2 bg-blue-500 text-white rounded-full px-4 py-2 mb-6">
//                 <Zap size={16} />
//                 <span>Multi-Tenant SaaS Platform</span>
//               </div>

//               <h1 className="text-2xl md:text-4xl font-extrabold leading-tight text-gray-900 mb-4">
//                 Modern Hospital Management{" "}
//                 <span className="text-blue-600">Made Simple</span>
//               </h1>

//               <p className="text-lg text-gray-600 mb-6">
//                 Streamline operations, improve patient care, and boost efficiency with our comprehensive
//                 hospital management system trusted by 50+ healthcare facilities.
//               </p>

//               <div className="flex flex-wrap gap-3 mb-6">
//                 <a href="/contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 shadow">
//                   Request Demo
//                   <ArrowRight size={20} />
//                 </a>
//                 <a href="/features" className="inline-flex items-center px-5 py-3 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50">
//                   View Features
//                 </a>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 text-gray-600">
//                 <div className="flex items-center gap-2">
//                   <CheckCircle2 className="text-green-500" size={20} />
//                   <span>14-day free trial</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <CheckCircle2 className="text-green-500" size={20} />
//                   <span>No credit card required</span>
//                 </div>
//               </div>
//             </div>

//             <div className="relative">
//               <img
//                 className="w-full rounded-xl shadow-2xl"
//                 alt="Modern Hospital Management"
//                 src="https://images.unsplash.com/photo-1758691461888-b74515208d7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGhlYWx0aGNhcmUlMjB0ZWNobm9sb2d5fGVufDB8fHx8MTc2MjMzMzEzMXww&ixlib=rb-4.1.0&q=85"
//               />
//               <div className="absolute left-4 bottom-4 bg-white rounded-lg shadow-lg p-3 flex items-center gap-3">
//                 <span className="w-10 h-10 rounded-md bg-green-500 text-white flex items-center justify-center">
//                   <CheckCircle2 size={24} />
//                 </span>
//                 <div>
//                   <p className="font-semibold text-sm text-gray-900">99.9% Uptime</p>
//                   <p className="text-xs text-gray-500">Guaranteed Reliability</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats */}
//       <section className="py-16 bg-white">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             <div className="text-center">
//               <div className="mx-auto w-14 h-14 rounded-xl bg-blue-500 text-white flex items-center justify-center mb-3">
//                 <Building2 size={24} />
//               </div>
//               <p className="text-3xl font-bold text-gray-900 mb-1">
//                 {prettyNum(stats.hospitals)}
//               </p>
//               <p className="text-gray-600">Hospitals Powered</p>
//             </div>

//             <div className="text-center">
//               <div className="mx-auto w-14 h-14 rounded-xl bg-blue-500 text-white flex items-center justify-center mb-3">
//                 <Users size={24} />
//               </div>
//               <p className="text-3xl font-bold text-gray-900 mb-1">
//                 {prettyNum(stats.professionals)}
//               </p>
//               <p className="text-gray-600">Healthcare Professionals</p>
//             </div>

//             <div className="text-center">
//               <div className="mx-auto w-14 h-14 rounded-xl bg-blue-500 text-white flex items-center justify-center mb-3">
//                 <Heart size={24} />
//               </div>
//               <p className="text-3xl font-bold text-gray-900 mb-1">
//                 {prettyNum(stats.patients)}
//               </p>
//               <p className="text-gray-600">Patients Served</p>
//             </div>

//             <div className="text-center">
//               <div className="mx-auto w-14 h-14 rounded-xl bg-blue-500 text-white flex items-center justify-center mb-3">
//                 <Calendar size={24} />
//               </div>
//               <p className="text-3xl font-bold text-gray-900 mb-1">
//                 {prettyNum(stats.appointments)}
//               </p>
//               <p className="text-gray-600">Appointments Daily</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Preview */}
//       <section className="py-20 bg-gray-50" id="features-preview">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Complete Hospital Management Suite</h2>
//             <p className="text-gray-600 text-lg">Everything you need to run a modern healthcare facility efficiently</p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-6">
//             {[
//               { icon: Users, title: "Patient Management System", desc: "Comprehensive patient registration, medical history, appointment scheduling with intelligent conflict resolution, and document management." },
//               { icon: Stethoscope, title: "Doctor Portal", desc: "Secure doctor dashboard with appointment tracking, digital prescription creation, patient records access, and treatment plan documentation." },
//               { icon: CreditCard, title: "Billing & Accounts", desc: "Complete financial management with OPD/IPD billing, payment tracking, insurance claims, and automated revenue reconciliation." },
//               { icon: Pill, title: "Pharmacy Management", desc: "End-to-end inventory control with automated purchase orders, sales tracking, expiry alerts, and billing integration." },
//               { icon: FlaskConical, title: "Laboratory (LIMS)", desc: "Streamlined laboratory operations with test registration, sample tracking, report generation, and secure online result access." },
//               { icon: Video, title: "Telemedicine", desc: "Enable remote healthcare with secure HD video consultations, digital prescriptions, and remote vital signs monitoring." },
//             ].map(({ icon: Icon, title, desc }) => (
//               <div key={title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition">
//                 <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500 text-white mb-3">
//                   <Icon size={24} />
//                 </span>
//                 <h3 className="text-lg font-semibold mb-2">{title}</h3>
//                 <p className="text-gray-600">{desc}</p>
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-8">
//             <a href="/features" className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">
//               View All Features
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Why Choose */}
//       <section className="py-20 bg-white">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid md:grid-cols-2 gap-16 items-center">
//             <div>
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//                 Why Healthcare Facilities Choose DCM
//               </h2>
//               <p className="text-lg text-gray-600 mb-8">
//                 Built with modern technology and healthcare expertise to deliver the best experience for hospitals,
//                 doctors, and patients.
//               </p>
//               <ul className="space-y-4">
//                 {[
//                   { icon: Shield, title: "Enterprise-Grade Security", sub: "HIPAA & GDPR compliant with end-to-end encryption" },
//                   { icon: Zap, title: "Lightning Fast Performance", sub: "Cloud-based infrastructure ensures 99.9% uptime" },
//                   { icon: Globe, title: "Multi-Platform Access", sub: "Web, iOS, and Android apps for seamless access" },
//                   { icon: Lock, title: "Data Privacy", sub: "Your data stays secure with role-based access control" },
//                 ].map(({ icon: Icon, title, sub }) => (
//                   <li key={title} className="flex gap-3">
//                     <Icon className="text-blue-600 mt-1" size={20} />
//                     <div>
//                       <strong className="text-gray-900">{title}</strong>
//                       <br />
//                       <span className="text-gray-600 text-sm">{sub}</span>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <img
//                 alt="Healthcare Technology"
//                 className="w-full rounded-xl shadow-xl"
//                 src="https://images.unsplash.com/photo-1589279003513-467d320f47eb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxkb2N0b3IlMjBjb25zdWx0YXRpb258ZW58MHx8fHwxNzYyMzAyOTU1fDA&ixlib=rb-4.1.0&q=85"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Trusted by Healthcare Professionals</h2>
//             <p className="text-gray-600 text-lg">
//               See what doctors, administrators, and healthcare facilities say about DCM Hospital Management
//             </p>
//           </div>

//           <div className="relative max-w-3xl mx-auto overflow-hidden">
//             <div
//               ref={sliderRef}
//               className="flex transition-transform duration-500"
//               style={{ transform: `translateX(-${slide * 100}%)` }}
//             >
//               {testimonials.map((t, idx) => (
//                 <div key={idx} className="min-w-full p-6 bg-white rounded-xl shadow-md">
//                   <Quote className="text-blue-400 mb-4" />
//                   <div className="flex items-center gap-4 mb-4">
//                     <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover" />
//                     <div>
//                       <h4 className="font-semibold">{t.name}</h4>
//                       <p className="text-sm text-gray-600">{t.role}</p>
//                       <p className="text-sm font-medium text-gray-700">{t.hospital}</p>
//                     </div>
//                   </div>
//                   <div className="flex gap-1 mb-4">
//                     {Array.from({ length: 5 }).map((_, i) => (
//                       <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
//                     ))}
//                   </div>
//                   <p className="text-lg italic text-gray-700">{t.text}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Dots */}
//             <div className="flex justify-center gap-2 mt-6">
//               {Array.from({ length: totalSlides }).map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setSlide(i)}
//                   className={`w-3 h-3 rounded-full transition ${
//                     i === slide ? "bg-blue-600" : "bg-gray-300"
//                   }`}
//                   aria-label={`Go to testimonial ${i + 1}`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Partners */}
//       <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Healthcare Partners</h2>
//             <p className="text-gray-600 text-lg">
//               Discover how leading hospitals are using DCM to transform patient care and streamline operations
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {partners.map((p) => (
//               <div key={p.name} className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:-translate-y-2 hover:shadow-xl transition">
//                 <div className="h-52 overflow-hidden">
//                   <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
//                 </div>
//                 <div className="p-6">
//                   <div className="flex items-start justify-between mb-2">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">{p.name}</h3>
//                       <div className="flex items-center gap-1 text-sm text-gray-500">
//                         <MapPin size={14} />
//                         <span>{p.location}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="mt-3 bg-gray-50 p-3 rounded-lg border-l-4 border-blue-600">
//                     <p className="text-sm italic text-gray-700">{p.quote}</p>
//                     <p className="text-xs text-gray-600 mt-1">{p.author}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
//         <div className="max-w-6xl mx-auto px-4 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Hospital Operations?</h2>
//           <p className="text-lg text-white/90 mb-8">
//             Join 50+ healthcare facilities already using DCM Hospital Management
//           </p>
//           <div className="flex flex-wrap gap-3 justify-center">
//             <a href="/contact" className="inline-flex items-center gap-2 bg-white text-blue-700 px-5 py-3 rounded-md font-medium hover:bg-gray-50">
//               Request Demo
//               <ArrowRight size={20} />
//             </a>
//             <a href="/pricing" className="inline-flex items-center gap-2 border border-white px-5 py-3 rounded-md font-medium hover:bg-white hover:text-blue-700">
//               View Pricing
//             </a>
//           </div>
//         </div>
//       </section>
//       {/* Toast (static placeholder; show via state if needed) */}
//       <div id="toast" className="fixed bottom-8 right-8 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg opacity-0 translate-y-6 pointer-events-none">
//         <div className="font-semibold">Message Sent!</div>
//         <div className="text-sm text-gray-300">Thank you for contacting us. We will get back to you within 24 hours.</div>
//       </div>
//     </>
//   );
// }

// /* ---------- Small footer helpers ---------- */
// function FooterCol({ title, links }) {
//   return (
//     <div>
//       <h3 className="text-white font-semibold mb-4">{title}</h3>
//       <ul className="space-y-2 text-sm">
//         {links.map(([label, href]) => (
//           <li key={label}>
//             <a className="text-gray-400 hover:text-white" href={href}>{label}</a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// function Social({ href, children }) {
//   return (
//     <a
//       href={href}
//       target="_blank"
//       rel="noopener"
//       className="w-9 h-9 rounded-md bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white flex items-center justify-center"
//     >
//       {children}
//     </a>
//   );
// }
// function MailIcon(props){ return <svg {...props} viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor"><path d="M4 4h16v16H4z"/><path d="m22 6-10 7L2 6"/></svg> }
// function PhoneIcon(props){ return <svg {...props} viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor"><path d="M22 16.92V21a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2 4.18 2 2 0 0 1 4 2h4.09a2 2 0 0 1 2 1.72l.57 3.42a2 2 0 0 1-.5 1.74L8.09 10.91a16 16 0 0 0 6 6l2-2.06a2 2 0 0 1 1.74-.5l3.42.57A2 2 0 0 1 22 16.92z"/></svg> }



























import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity, Menu, Zap, ArrowRight, CheckCircle2, Building2, Users, Heart, Calendar,
  Stethoscope, CreditCard, Pill, FlaskConical, Video, Shield, Globe, Lock,
  Quote, Star, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube, X,
  Award, TrendingUp, Clock, Smartphone, Database, Cloud, Server, ChevronLeft, ChevronRight
} from "lucide-react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  // ----- Enhanced Testimonials with More Reviews -----
  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Chief Medical Officer",
      hospital: "Apollo Hospitals, Hyderabad",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
      text: "DCM Hospital Management has transformed our operations in Hyderabad. Patient management is now seamless, and our doctors love the digital prescription feature.",
    },
    {
      name: "Ms. Priya Sharma",
      role: "Hospital Administrator",
      hospital: "Yashoda Hospitals, Hyderabad",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      text: "The billing and accounts module has reduced our revenue leakage by 40% across our Hyderabad branches. Highly recommended for healthcare facilities in Telangana!",
    },
    {
      name: "Dr. Amit Patel",
      role: "Medical Director",
      hospital: "Continental Hospitals, Hyderabad",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
      text: "As a multi-specialty hospital in Hyderabad, DCM's centralized reporting gave us complete visibility. The ROI was evident within 3 months of implementation.",
    },
    {
      name: "Dr. Anjali Mehta",
      role: "Head of Pediatrics",
      hospital: "KIMS Hospitals, Hyderabad",
      avatar: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=100&h=100&fit=crop&crop=face",
      text: "The patient portal has significantly improved our communication with Hyderabad patients. Parents can now access medical records and vaccination schedules anytime.",
    },
    {
      name: "Mr. Rohan Verma",
      role: "IT Director",
      hospital: "Care Hospitals, Hyderabad",
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
      text: "Implementation across our Hyderabad facilities was smooth. We've seen a 30% improvement in operational efficiency since switching to DCM.",
    },
    {
      name: "Dr. Sanjay Gupta",
      role: "Medical Superintendent",
      hospital: "Global Hospitals, Hyderabad",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
      text: "The real-time analytics and reporting features have revolutionized our decision-making process at our Hyderabad campus.",
    },
    {
      name: "Ms. Neha Singh",
      role: "Nursing Director",
      hospital: "Omega Hospitals, Hyderabad",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      text: "Nursing workflow optimization has improved patient care delivery by 45% in our Hyderabad facility. The mobile app is perfect for our busy staff.",
    },
    {
      name: "Dr. Vikram Reddy",
      role: "Cardiology Head",
      hospital: "Medicover Hospitals, Hyderabad",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
      text: "Excellent cardiology module integration at our Hyderabad center. Patient monitoring and follow-up have never been easier.",
    },
    {
      name: "Dr. Arjun Malhotra",
      role: "Orthopedics Head",
      hospital: "Sunrise Hospitals, Hyderabad",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
      text: "The surgery scheduling module has reduced OT conflicts by 60%. Perfect for busy orthopedic departments in Hyderabad.",
    },
    {
      name: "Dr. Sneha Reddy",
      role: "Emergency Medicine",
      hospital: "AIG Hospitals, Hyderabad",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      text: "Emergency department efficiency improved by 50% with real-time bed management and patient tracking features.",
    },
    {
      name: "Mr. Karthik Rao",
      role: "Finance Manager",
      hospital: "SLG Hospitals, Hyderabad",
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
      text: "Automated billing reduced our accounting errors by 80% and improved cash flow management significantly.",
    },
    {
      name: "Dr. Priya Nair",
      role: "Radiology Head",
      hospital: "Basavatarakam Hospitals, Hyderabad",
      avatar: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=100&h=100&fit=crop&crop=face",
      text: "Integrated PACS system with DCM has streamlined our radiology workflow and reduced report turnaround time by 40%.",
    },
  ];

  // ----- Carousel State -----
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3); // Default for desktop
  
  // Update slidesToShow based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1); // 1 card on mobile
      } else {
        setSlidesToShow(3); // 3 cards on desktop
      }
    };
    
    // Set initial value
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / slidesToShow);
  const carouselRef = useRef(null);

  // Auto-slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [totalSlides]);

  // Manual navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // ----- Partners -----
  const partners = [
    {
      name: "Apollo Hospitals",
      location: "Hyderabad, Telangana",
      img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      quote: '"DCM\'s patient management system has reduced our administrative workload by 40% across Hyderabad branches."',
      author: "- Dr. Rajesh Kumar, Chief Medical Officer",
    },
    {
      name: "Yashoda Hospitals",
      location: "Hyderabad, Telangana",
      img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      quote: '"The pharmacy management module has optimized our inventory, reducing medication waste by 25% in Hyderabad."',
      author: "- Ms. Priya Sharma, Hospital Administrator",
    },
    {
      name: "KIMS Hospitals",
      location: "Hyderabad, Telangana",
      img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      quote: '"As a multi-location hospital in Hyderabad, DCM\'s centralized reporting gives us complete real-time visibility."',
      author: "- Dr. Amit Patel, Medical Director",
    },
  ];

  // ----- Comparison Data -----
  const comparisonData = [
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
  ];

  // ----- Why Choose DCM Carousel -----
  const whyChooseScrollRef = useRef(null);
  const [currentWhyChoose, setCurrentWhyChoose] = useState(0);

  const whyChooseItems = [
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      sub: "HIPAA & GDPR compliant with end-to-end encryption and multi-layer security protocols"
    },
    {
      icon: Zap,
      title: "Lightning Fast Performance",
      sub: "Cloud-based infrastructure ensures 99.9% uptime with real-time data processing"
    },
    {
      icon: Globe,
      title: "Multi-Platform Access",
      sub: "Web, iOS, and Android apps for seamless access from any device, anywhere"
    },
    {
      icon: Lock,
      title: "Data Privacy First",
      sub: "Your data stays secure with role-based access control and comprehensive audit trails"
    },
    {
      icon: Building2,
      title: "Scalable Infrastructure",
      sub: "Grow from single clinic to multi-hospital chain without system changes"
    },
    {
      icon: Users,
      title: "Dedicated Support",
      sub: "24/7 customer support with dedicated account managers for each facility"
    }
  ];

  const handleWhyChooseDotClick = (index) => {
    setCurrentWhyChoose(index);
    if (whyChooseScrollRef.current) {
      const scrollAmount = whyChooseScrollRef.current.clientWidth * index;
      whyChooseScrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const nextWhyChoose = () => {
    const nextIndex = (currentWhyChoose + 1) % whyChooseItems.length;
    handleWhyChooseDotClick(nextIndex);
  };

  const prevWhyChoose = () => {
    const prevIndex = (currentWhyChoose - 1 + whyChooseItems.length) % whyChooseItems.length;
    handleWhyChooseDotClick(prevIndex);
  };

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextWhyChoose();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentWhyChoose]);

  // Small helper
  const prettyNum = (n) =>
    n >= 1000 ? `${n.toLocaleString()}+` : n.toLocaleString();

  return (
    <>
      {/* Hero Section with Health-themed Animations */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
        {/* Enhanced Health-themed Animated Background Elements */}
        <div className="absolute top-20 left-4 md:left-10 opacity-10 animate-pulse">
          <Heart className="w-12 h-12 md:w-16 md:h-16 text-red-400" />
        </div>
        <div className="absolute bottom-20 right-4 md:right-10 opacity-10 animate-bounce">
          <Stethoscope className="w-12 h-12 md:w-16 md:h-16 text-blue-400" />
        </div>
        <div className="absolute top-1/3 left-1/4 opacity-5 animate-pulse delay-1000">
          <Pill className="w-8 h-8 md:w-12 md:h-12 text-green-400" />
        </div>
        <div className="absolute top-1/2 right-1/4 opacity-5 animate-bounce delay-500">
          <Heart className="w-10 h-10 md:w-14 md:h-14 text-pink-400" />
        </div>
        {/* Additional Medical Icons */}
        <div className="absolute top-10 right-1/3 opacity-5 animate-pulse delay-700">
          <Activity className="w-8 h-8 md:w-12 md:h-12 text-purple-400" />
        </div>
        <div className="absolute bottom-40 left-1/4 opacity-5 animate-bounce delay-1200">
          <FlaskConical className="w-10 h-10 md:w-14 md:h-14 text-orange-400" />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-20 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full px-4 py-2 mb-6 animate-pulse shadow-lg">
                <Zap size={16} className="animate-bounce" />
                <span className="font-semibold text-sm">Multi-Tenant SaaS Platform</span>
              </div>

              {/* Reduced Heading Size */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-4">
                Modern Hospital{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Management Made Simple
                </span>
              </h1>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Streamline operations, improve patient care, and boost efficiency with our comprehensive
                hospital management system trusted by 50+ healthcare facilities.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <a 
                  href="/contact" 
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Request Demo
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="/features" 
                  className="group inline-flex items-center px-6 py-3 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  View Features
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-500 animate-pulse" size={20} />
                  <span className="font-medium">14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-500 animate-pulse" size={20} />
                  <span className="font-medium">No credit card required</span>
                </div>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <img
                className="w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                alt="Modern Hospital Management"
                src="https://images.unsplash.com/photo-1758691461888-b74515208d7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGhlYWx0aGNhcmUlMjB0ZWNobm9sb2d5fGVufDB8fHx8MTc2MjMzMzEzMXww&ixlib=rb-4.1.0&q=85"
              />
              <div className="absolute left-4 bottom-4 bg-white rounded-xl shadow-2xl p-4 flex items-center gap-3 transform hover:scale-105 transition-transform duration-300">
                <span className="w-12 h-12 rounded-lg bg-green-500 text-white flex items-center justify-center animate-pulse">
                  <Heart className="w-6 h-6" />
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="mx-auto w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center mb-3 shadow-lg">
                <Building2 size={20} className="md:w-6 md:h-6" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {prettyNum(stats.hospitals)}
              </p>
              <p className="text-gray-600 text-sm md:text-base">Hospitals Powered</p>
            </div>

            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="mx-auto w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center mb-3 shadow-lg">
                <Users size={20} className="md:w-6 md:h-6" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {prettyNum(stats.professionals)}
              </p>
              <p className="text-gray-600 text-sm md:text-base">Healthcare Professionals</p>
            </div>

            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="mx-auto w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center mb-3 shadow-lg">
                <Heart size={20} className="md:w-6 md:h-6" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {prettyNum(stats.patients)}
              </p>
              <p className="text-gray-600 text-sm md:text-base">Patients Served</p>
            </div>

            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="mx-auto w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center mb-3 shadow-lg">
                <Calendar size={20} className="md:w-6 md:h-6" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {prettyNum(stats.appointments)}
              </p>
              <p className="text-gray-600 text-sm md:text-base">Appointments Daily</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview with Health Animations - Only 3 Cards */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-cyan-50 relative overflow-hidden" id="features-preview">
        {/* Enhanced Medical Background Animations */}
        <div className="absolute top-10 left-5% opacity-5 animate-pulse">
          <Heart className="w-8 h-8 md:w-12 md:h-12 text-red-400" />
        </div>
        <div className="absolute bottom-10 right-5% opacity-5 animate-bounce delay-500">
          <Stethoscope className="w-10 h-10 md:w-14 md:h-14 text-blue-400" />
        </div>
        <div className="absolute top-1/2 left-10% opacity-5 animate-pulse delay-1000">
          <Activity className="w-6 h-6 md:w-10 md:h-10 text-green-400" />
        </div>
        <div className="absolute bottom-1/3 right-15% opacity-5 animate-bounce delay-700">
          <Pill className="w-8 h-8 md:w-12 md:h-12 text-purple-400" />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Complete Hospital Management Suite
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Everything you need to run a modern healthcare facility efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                icon: Users, 
                title: "Patient Management", 
                desc: "Comprehensive patient registration, medical history, and appointment scheduling.",
                delay: "0"
              },
              { 
                icon: Stethoscope, 
                title: "Doctor Portal", 
                desc: "Secure doctor dashboard with digital prescriptions and patient records access.",
                delay: "100"
              },
              { 
                icon: CreditCard, 
                title: "Billing & Accounts", 
                desc: "Complete financial management with insurance claims and revenue reconciliation.",
                delay: "200"
              },
            ].map(({ icon: Icon, title, desc, delay }) => (
              <div 
                key={title} 
                className="group bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-blue-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 transform hover:scale-105 relative overflow-hidden"
              >
                {/* Animated Health Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                
                {/* Pulse Animation Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 group-hover:animate-pulse transition-all duration-300"></div>
                
                <span className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10 shadow-lg">
                  <Icon size={24} className="md:w-7 md:h-7" />
                </span>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 relative z-10">{title}</h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed relative z-10">{desc}</p>
                
                {/* Hover Animation Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a 
              href="/features" 
              className="group inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              View All Features
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Healthcare Facilities Choose DCM - Updated with Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image on Left */}
            <div className="relative">
              <img
                alt="Healthcare Technology"
                className="w-full rounded-2xl shadow-2xl border-4 border-white/20 transform hover:scale-105 transition-transform duration-500"
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              />
              
            </div>

            {/* Content on Right */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Healthcare Facilities <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Choose DCM</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Built with modern technology and healthcare expertise to deliver the best experience for hospitals,
                doctors, and patients across India.
              </p>

              {/* Why Choose Carousel */}
              <div className="relative">
               
                {/* Scrollable Container */}
                <div 
                  ref={whyChooseScrollRef}
                  className="flex overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide space-x-6"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {whyChooseItems.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex-shrink-0 w-full snap-center p-8 rounded-2xl cursor-pointer hover:border-blue-300 transition-all duration-300 group"
                    >
                      <div className="relative z-10 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center mb-6 shadow-lg mx-auto group-hover:scale-110 transition-transform duration-300">
                          <item.icon size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">{item.title}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-3 mt-6">
                  {whyChooseItems.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleWhyChooseDotClick(idx)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        idx === currentWhyChoose 
                          ? 'bg-blue-600 w-8' 
                          : 'bg-blue-300 hover:bg-blue-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

             
            </div>
          </div>
        </div>

        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>

      {/* Comparison Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why DCM Outperforms Traditional Systems
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              See how DCM Hospital Management System compares to legacy solutions
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 md:p-6">
              <div className="text-left">
                <h3 className="font-bold text-lg md:text-xl">Features</h3>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg md:text-xl">DCM Hospital Management</h3>
                <p className="text-blue-100 text-sm">Modern Cloud Solution</p>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg md:text-xl">Traditional Systems</h3>
                <p className="text-blue-100 text-sm">Legacy On-premise</p>
              </div>
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-gray-100">
              {comparisonData.map((item, index) => (
                <div key={index} className="grid grid-cols-3 p-4 md:p-6 hover:bg-blue-50 transition-colors duration-200">
                  <div className="text-left">
                    <span className="font-semibold text-gray-900 text-sm md:text-base">{item.feature}</span>
                  </div>
                  
                  {/* DCM Column */}
                  <div className="text-center">
                    {item.dcm.status === "yes" && (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium text-sm md:text-base">{item.dcm.text}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Others Column */}
                  <div className="text-center">
                    {item.others.status === "no" && (
                      <div className="flex items-center justify-center gap-2 text-red-600">
                        <X className="w-5 h-5" />
                        <span className="font-medium text-sm md:text-base">{item.others.text}</span>
                      </div>
                    )}
                    {item.others.status === "partial" && (
                      <div className="flex items-center justify-center gap-2 text-yellow-600">
                        <Clock className="w-5 h-5" />
                        <span className="font-medium text-sm md:text-base">{item.others.text}</span>
                      </div>
                    )}
                    {item.others.status === "limited" && (
                      <div className="flex items-center justify-center gap-2 text-orange-600">
                        <TrendingUp className="w-5 h-5" />
                        <span className="font-medium text-sm md:text-base">{item.others.text}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="bg-gray-50 p-6 text-center border-t border-gray-200">
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                Ready to upgrade to modern hospital management?
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Free Trial
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Working Testimonials Carousel - 1 Card on Mobile, 3 Cards on Desktop with Auto Slide */}
      <section className="py-16 md:py-20 bg-gray-50 relative overflow-hidden">
        {/* Medical Icons in Background */}
        <div className="absolute top-10 left-5% opacity-5 animate-pulse">
          <Heart className="w-10 h-10 md:w-16 md:h-16 text-red-400" />
        </div>
        <div className="absolute bottom-10 right-5% opacity-5 animate-bounce delay-300">
          <Stethoscope className="w-12 h-12 md:w-18 md:h-18 text-blue-400" />
        </div>
        <div className="absolute top-1/3 right-10% opacity-5 animate-pulse delay-700">
          <Activity className="w-8 h-8 md:w-12 md:h-12 text-green-400" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              See what doctors and administrators from leading Hyderabad hospitals say about DCM
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>

            {/* Carousel Track */}
            <div className="overflow-hidden">
              <div 
                ref={carouselRef}
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 px-3"
                    style={{ width: `${100 / slidesToShow}%` }}
                  >
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-all duration-300 h-full">
                      <Quote className="text-blue-400 mb-4 w-6 h-6" />
                      <div className="flex items-center gap-3 mb-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-12 h-12 rounded-full object-cover shadow-md" 
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900 text-base">{testimonial.name}</h4>
                          <p className="text-gray-600 text-sm">{testimonial.role}</p>
                          <p className="text-blue-600 text-sm font-medium">{testimonial.hospital}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className="text-yellow-400" 
                            fill="currentColor" 
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 italic text-sm md:text-base">{testimonial.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === i ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial group ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Testimonial Stats */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
              <Star className="w-4 h-4" fill="currentColor" />
              <span className="font-semibold text-sm">
                {testimonials.length}+ Verified Reviews from Healthcare Professionals
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Healthcare Partners</h2>
            <p className="text-gray-600 text-base md:text-lg">
              Discover how leading Hyderabad hospitals are using DCM to transform patient care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {partners.map((p) => (
              <div key={p.name} className="group bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-500 transform hover:scale-105">
                <div className="h-40 md:h-52 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-4 md:p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{p.name}</h3>
                      <div className="flex items-center gap-1 text-gray-500 text-xs md:text-sm">
                        <MapPin size={12} className="md:w-4 md:h-4" />
                        <span>{p.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 bg-gradient-to-r from-blue-50 to-cyan-50 p-3 md:p-4 rounded-lg border-l-4 border-blue-600">
                    <p className="text-gray-700 text-sm md:text-base italic">{p.quote}</p>
                    <p className="text-gray-600 text-xs md:text-sm mt-2 font-medium">{p.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white relative overflow-hidden">
        {/* Enhanced Health-themed Animated Background Elements */}
        <div className="absolute top-4 md:top-10 left-4 md:left-10 opacity-20 animate-pulse">
          <Heart className="w-8 h-8 md:w-12 md:h-12 text-white" />
        </div>
        <div className="absolute bottom-4 md:bottom-10 right-4 md:right-10 opacity-20 animate-bounce">
          <Stethoscope className="w-8 h-8 md:w-12 md:h-12 text-white" />
        </div>
        <div className="absolute top-1/3 right-20 opacity-15 animate-pulse delay-500">
          <Activity className="w-10 h-10 md:w-14 md:h-14 text-white" />
        </div>
        <div className="absolute bottom-1/3 left-20 opacity-15 animate-bounce delay-700">
          <Pill className="w-8 h-8 md:w-12 md:h-12 text-white" />
        </div>

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Ready to Transform Your Hospital Operations?
          </h2>
          <p className="text-white/90 text-base md:text-lg mb-6 md:mb-8">
            Join 50+ healthcare facilities already using DCM Hospital Management
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="/contact" 
              className="group inline-flex items-center gap-2 bg-white text-blue-700 px-5 md:px-6 py-3 rounded-xl font-medium hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Request Demo
              <ArrowRight size={16} className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="/pricing" 
              className="group inline-flex items-center gap-2 border-2 border-white px-5 md:px-6 py-3 rounded-xl font-medium hover:bg-white hover:text-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section with White Background and Blue Cards */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Transform Your Hospital Operations
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Experience measurable improvements across all departments
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                icon: TrendingUp, 
                title: "45% Faster Operations", 
                desc: "Reduce administrative time and focus on patient care",
                gradient: "from-blue-500 to-blue-600"
              },
              { 
                icon: Award, 
                title: "99.9% System Uptime", 
                desc: "Reliable cloud infrastructure with zero downtime",
                gradient: "from-blue-600 to-cyan-500"
              },
              { 
                icon: Clock, 
                title: "60% Time Savings", 
                desc: "Automate routine tasks and streamline workflows",
                gradient: "from-cyan-500 to-blue-500"
              },
            ].map(({ icon: Icon, title, desc, gradient }) => (
              <div 
                key={title} 
                className="group bg-gradient-to-r p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
              >
                {/* Animated Background Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-100 group-hover:opacity-90 transition-opacity duration-300`}></div>
                
                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
                  <p className="text-blue-100">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
            {[
              { number: "40%", label: "Revenue Increase" },
              { number: "75%", label: "Patient Satisfaction" },
              { number: "50%", label: "Staff Efficiency" },
              { number: "30%", label: "Cost Reduction" },
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl text-center border border-blue-100 transform hover:scale-105 transition-all duration-300"
              >
                <p className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">{stat.number}</p>
                <p className="text-gray-600 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Toast */}
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
            <a className="text-blue-200 hover:text-white transition-colors" href={href}>{label}</a>
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
      className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-blue-500 text-white hover:bg-white hover:text-blue-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
    >
      {children}
    </a>
  );
}

function MailIcon(props) { 
  return (
    <svg {...props} viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor">
      <path d="M4 4h16v16H4z"/>
      <path d="m22 6-10 7L2 6"/>
    </svg>
  ); 
}

function PhoneIcon(props) { 
  return (
    <svg {...props} viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor">
      <path d="M22 16.92V21a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2 4.18 2 2 0 0 1 4 2h4.09a2 2 0 0 1 2 1.72l.57 3.42a2 2 0 0 1-.5 1.74L8.09 10.91a16 16 0 0 0 6 6l2-2.06a2 2 0 0 1 1.74-.5l3.42.57A2 2 0 0 1 22 16.92z"/>
    </svg>
  ); 
}