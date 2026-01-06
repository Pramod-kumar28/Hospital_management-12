// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { 
//   ArrowLeft, CheckCircle, BarChart3, Shield, Zap, Clock,
//   Users, Stethoscope, CreditCard, Pill, FlaskConical, Video,
//   BarChart3 as Chart, Building2, Smartphone, Globe, Lock,
//   TrendingUp, Award, Calendar, FileText, Database, Cloud, Server
// } from 'lucide-react';
// import { featureDetails } from '../../utils/featureDetails';
// import ChatBot from './ChatBot';

// export default function FeatureDetailPage() {
//   const { featureId } = useParams();
//   const feature = featureDetails[featureId];

//   if (!feature) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">Feature Not Found</h1>
//           <p className="text-gray-600 mb-6">The requested feature page doesn't exist.</p>
//           <Link 
//             to="/features" 
//             className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back to All Features
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const IconComponent = feature.icon;
  
//   // Get related features (excluding current one)
//   const relatedFeatures = Object.values(featureDetails)
//     .filter(f => f.id !== featureId)
//     .slice(0, 3);

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50">

//         {/* Back Navigation */}
//         <div className="sticky top-16 px-8  ">
//           <div className="max-w-7xl mx-auto px-4 py-5">
//             <Link
//               to="/features"
//               className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium hover:underline"
//             >
//               <ArrowLeft className="w-5 h-5" />
              
//             </Link>
//           </div>
//         </div>

//         {/* Hero Section */}
//         <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-12 mt-1 px-8">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
//               {/* Icon and Title */}
//               <div className="flex-1">
//                 <div className="inline-flex items-center gap-3 mb-6">
//                   <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center shadow-lg`}>
//                     <IconComponent size={28} />
//                   </div>
//                   <div>
//                     <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
//                       {feature.title}
//                     </h1>
//                   </div>
//                 </div>

//                 <p className="text-lg text-gray-600 mb-8 max-w-3xl">
//                   {feature.longDescription}
//                 </p>

//                 {/* Quick Stats */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
//                   {Object.entries(feature.stats).map(([key, value], index) => (
//                     <div key={key} className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
//                       <div className="text-xl font-bold text-blue-600 text-center mb-1 leading-tight">{value}</div>
//                       <div className="text-[15px] text-gray-600 text-center font-medium leading-tight min-h-[2.5rem] flex items-center justify-center px-1">
//                         <span>{key}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Feature Image */}
//               <div className="flex-1">
//                 <div className="rounded-2xl overflow-hidden shadow-2xl">
//                   <img
//                     src={feature.image}
//                     alt={feature.title}
//                     className="w-full h-64 md:h-96 object-cover"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Main Content */}
//         <section className="py-12 bg-white px-4">
//           <div className="max-w-7xl mx-auto">
//             <div className="grid lg:grid-cols-3 gap-8">
//               {/* Features List */}
//               <div className="lg:col-span-2">
//                 <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 border border-gray-200">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
//                     <CheckCircle className="w-6 h-6 text-green-500" />
//                     Key Features & Capabilities
//                   </h2>

//                   <div className="grid md:grid-cols-2 gap-6">
//                     {feature.features.map((item, index) => (
//                       <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-300">
//                         <div className="w-2 h-2 bg-blue-600 rounded-full mt-2.5 flex-shrink-0" />
//                         <span className="text-gray-700">{item}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Benefits Section */}
//                 <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-4 md:p-8 mt-8 text-white">
//                   <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
//                     <Zap className="w-6 h-6" />
//                     Benefits & Outcomes
//                   </h2>

//                   <div className="grid sm:grid-cols-2 gap-4">
//                     {feature.benefits.map((benefit, index) => (
//                       <div key={index} className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
//                         <div className="w-3 h-3 bg-white rounded-full flex-shrink-0 mt-0.5" />
//                         <span className="text-white">{benefit}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Implementation Details */}
//                 <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-8 border border-gray-200">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
//                     <Calendar className="w-6 h-6 text-blue-600" />
//                     Implementation & Integration
//                   </h2>
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div className="space-y-4">
//                       <h3 className="font-semibold text-gray-900">Deployment Options</h3>
//                       <ul className="space-y-2">
//                         <li className="flex items-center gap-2 text-gray-600">
//                           <Cloud className="w-4 h-4 text-blue-500" />
//                           Cloud-based SaaS
//                         </li>
//                         <li className="flex items-center gap-2 text-gray-600">
//                           <Server className="w-4 h-4 text-gray-500" />
//                           On-premise installation
//                         </li>
//                         <li className="flex items-center gap-2 text-gray-600">
//                           <Database className="w-4 h-4 text-green-500" />
//                           Hybrid deployment
//                         </li>
//                       </ul>
//                     </div>
//                     <div className="space-y-4">
//                       <h3 className="font-semibold text-gray-900">Integration</h3>
//                       <ul className="space-y-2">
//                         <li className="flex items-center gap-2 text-gray-600">
//                           <FileText className="w-4 h-4 text-purple-500" />
//                           HL7 & FHIR compatible
//                         </li>
//                         <li className="flex items-center gap-2 text-gray-600">
//                           <Shield className="w-4 h-4 text-green-500" />
//                           HIPAA compliant APIs
//                         </li>
//                         <li className="flex items-center gap-2 text-gray-600">
//                           <Globe className="w-4 h-4 text-blue-500" />
//                           RESTful web services
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Sidebar - Quick Info */}
//               <div className="space-y-6">
//                 {/* Demo CTA */}
//                 <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
//                   <h3 className="text-xl font-bold text-gray-900 mb-4">
//                     See it in Action
//                   </h3>
//                   <p className="text-gray-600 mb-6">
//                     Schedule a personalized demo to see how {feature.title} can transform your healthcare operations.
//                   </p>
//                   <Link
//                     to="/contact"
//                     className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3"
//                   >
//                     Request Demo
//                   </Link>
//                   <Link
//                     to="/pricing"
//                     className="block w-full border border-blue-600 text-blue-600 text-center py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
//                   >
//                     View Pricing
//                   </Link>
//                 </div>

//                 {/* Related Features */}
//                 <div className="bg-white rounded-2xl shadow-lg p-3 border border-gray-200">
//                   <h3 className="text-xl font-bold text-gray-900 mb-4">
//                     Related Modules
//                   </h3>
//                   <div className="space-y-3">
//                     {relatedFeatures.map(related => (
//                       <Link
//                         key={related.id}
//                         to={`/features/${related.id}`}
//                         className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 transition-colors duration-300 group"
//                       >
//                         <div className={`w-12 h-9 rounded-lg bg-gradient-to-br ${related.color} text-white flex items-center justify-center mt-2`}>
//                           {React.createElement(related.icon, { size: 16 })}
//                         </div>
//                         <div>
//                           <div className="font-medium text-gray-900 group-hover:text-blue-600">
//                             {related.title}
//                           </div>
//                           <div className="text-sm text-gray-500 line-clamp-1">
//                             {related.description.substring(0, 50)}...
//                           </div>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Quick Stats */}
//                 <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 text-white">
//                   <h3 className="text-xl font-bold mb-4">
//                     Performance Metrics
//                   </h3>
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
//                       <span className="text-gray-300">Efficiency Gain</span>
//                       <span className="font-bold">30-40%</span>
//                     </div>
//                     <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
//                       <span className="text-gray-300">Implementation Time</span>
//                       <span className="font-bold">2-4 Weeks</span>
//                     </div>
//                     <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
//                       <span className="text-gray-300">Training Required</span>
//                       <span className="font-bold">Minimal</span>
//                     </div>
//                     <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
//                       <span className="text-gray-300">ROI Period</span>
//                       <span className="font-bold">3-6 Months</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Security Badge */}
//                 <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
//                   <div className="flex items-center gap-3 mb-4">
//                     <Shield className="w-8 h-8" />
//                     <div>
//                       <h3 className="text-xl font-bold">HIPAA Compliant</h3>
//                       <p className="text-green-100 text-sm">Enterprise-grade security</p>
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-2">
//                       <Lock className="w-4 h-4" />
//                       <span className="text-sm">End-to-end encryption</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Database className="w-4 h-4" />
//                       <span className="text-sm">Secure data backup</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Award className="w-4 h-4" />
//                       <span className="text-sm">GDPR compliant</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Bottom CTA */}
//         <section className="py-12 bg-gradient-to-br from-blue-50 to-cyan-50">
//           <div className="max-w-4xl mx-auto px-4 text-center">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Ready to Transform Your Healthcare Operations?
//             </h2>
//             <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
//               Join hundreds of healthcare facilities that have optimized their operations with our comprehensive hospital management system.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link
//                 to="/contact"
//                 className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
//               >
//                 Get Started Today
//                 <ArrowLeft className="w-5 h-5 rotate-180" />
//               </Link>
//               <Link
//                 to="/features"
//                 className="inline-flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
//               >
//                 Explore All Features
//               </Link>
//             </div>
//           </div>
//         </section>

//         <ChatBot />
//       </div>
//     </>
//   );
// }






























import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle, BarChart3, Shield, Zap, Clock,
  Users, Stethoscope, CreditCard, Pill, FlaskConical, Video,
  BarChart3 as Chart, Building2, Smartphone, Globe, Lock,
  TrendingUp, Award, Calendar, FileText, Database, Cloud, Server
} from 'lucide-react';
import { featureDetails } from '../../utils/featureDetails';
import ChatBot from './ChatBot';

export default function FeatureDetailPage() {
  const { featureId } = useParams();
  const feature = featureDetails[featureId];

  if (!feature) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Feature Not Found</h1>
          <p className="text-gray-600 mb-6">The requested feature page doesn't exist.</p>
          <Link 
            to="/features" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Features
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = feature.icon;
  
  // Get related features (excluding current one)
  const relatedFeatures = Object.values(featureDetails)
    .filter(f => f.id !== featureId)
    .slice(0, 3);

  return (
    <>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">

        {/* Back Navigation */}
        <div className="sticky top-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <Link
              to="/features"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-12 mt-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              {/* Icon and Title */}
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <IconComponent size={28} />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                      {feature.title}
                    </h1>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-3xl">
                  {feature.longDescription}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  {Object.entries(feature.stats).map(([key, value], index) => (
                    <div key={key} className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 w-full">
                      <div className="text-lg sm:text-xl font-bold text-blue-600 text-center mb-1 leading-tight">{value}</div>
                      <div className="text-xs sm:text-sm text-gray-600 text-center font-medium leading-tight min-h-[2.5rem] flex items-center justify-center px-1">
                        <span className="break-words">{key}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Image */}
              <div className="flex-1 w-full">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Features List */}
              <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                {/* Key Features Section */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                    Key Features & Capabilities
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    {feature.features.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits Section - New Design */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-4 sm:p-6 border-l-4 border-blue-500">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-3">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    Benefits & Outcomes
                  </h2>

                  <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                    {feature.benefits.map((benefit, index) => (
                      <div key={index} className="bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{benefit}</h3>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {index === 0 && "Significantly faster processing and reduced waiting times"}
                              {index === 1 && "Optimized resource utilization and cost-effective operations"}
                              {index === 2 && "Enhanced patient experience and satisfaction rates"}
                              {index === 3 && "Full compliance with healthcare regulations and standards"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Matrix - New Design */}
                <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl shadow-lg p-4 sm:p-6 text-white">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                    <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                      Performance Matrix
                    </h2>
                    <div className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium self-start sm:self-center">
                      Measured Results
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="bg-white/10 rounded-xl p-3 sm:p-4 text-center hover:bg-white/15 transition-colors duration-300">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">30-40%</div>
                      <div className="text-blue-200 text-xs sm:text-sm font-medium">Efficiency Gain</div>
                      <div className="text-gray-400 text-xs mt-1 sm:mt-2">Reduced operational time</div>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-3 sm:p-4 text-center hover:bg-white/15 transition-colors duration-300">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">2-4</div>
                      <div className="text-blue-200 text-xs sm:text-sm font-medium">Weeks</div>
                      <div className="text-gray-400 text-xs mt-1 sm:mt-2">Implementation Time</div>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-3 sm:p-4 text-center hover:bg-white/15 transition-colors duration-300">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Minimal</div>
                      <div className="text-blue-200 text-xs sm:text-sm font-medium">Training</div>
                      <div className="text-gray-400 text-xs mt-1 sm:mt-2">Required for adoption</div>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-3 sm:p-4 text-center hover:bg-white/15 transition-colors duration-300">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">3-6</div>
                      <div className="text-blue-200 text-xs sm:text-sm font-medium">Months ROI</div>
                      <div className="text-gray-400 text-xs mt-1 sm:mt-2">Return on investment</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar - Quick Info */}
              <div className="space-y-6 lg:space-y-8">
                {/* Demo CTA */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                    See it in Action
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                    Schedule a personalized demo to see how {feature.title} can transform your healthcare operations.
                  </p>
                  <Link
                    to="/contact"
                    className="block w-full bg-blue-600 text-white text-center py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3 text-sm sm:text-base"
                  >
                    Request Demo
                  </Link>
                  <Link
                    to="/pricing"
                    className="block w-full border border-blue-600 text-blue-600 text-center py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm sm:text-base"
                  >
                    View Pricing
                  </Link>
                </div>

                {/* Related Features */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Related Modules
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {relatedFeatures.map(related => (
                      <Link
                        key={related.id}
                        to={`/features/${related.id}`}
                        className="flex items-center gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300 group"
                      >
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${related.color} text-white flex items-center justify-center flex-shrink-0`}>
                          {React.createElement(related.icon, { size: 16 })}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 group-hover:text-blue-600 text-sm sm:text-base truncate">
                            {related.title}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500 line-clamp-1 sm:line-clamp-2">
                            {related.description.substring(0, 40)}...
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Security Badge */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-4 sm:p-6 text-white">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold">HIPAA Compliant</h3>
                      <p className="text-green-100 text-xs sm:text-sm">Enterprise-grade security</p>
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2">
                      <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">End-to-end encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Database className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">Secure data backup</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">GDPR compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Cloud className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">99.9% uptime SLA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Healthcare Operations?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join hundreds of healthcare facilities that have optimized their operations with our comprehensive hospital management system.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Get Started Today
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
              </Link>
              <Link
                to="/features"
                className="inline-flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-4 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm sm:text-base"
              >
                Explore All Features
              </Link>
            </div>
          </div>
        </section>

        <ChatBot />
      </div>
    </>
  );
}