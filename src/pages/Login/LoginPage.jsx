// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import { loginSuccess } from '../../redux/slices/authSlice';

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Demo users data
//   const demoUsers = [
//     { email: 'admin@dcm.demo', password: 'admin123', role: 'ADMIN', name: 'Admin User' },
//     { email: 'doctor@dcm.demo', password: 'doc123', role: 'DOCTOR', name: 'Dr. Aparna' },
//     { email: 'nurse@dcm.demo', password: 'nurse123', role: 'NURSE', name: 'Nurse Staff' },
//     { email: 'reception@dcm.demo', password: 'reception123', role: 'RECEPTIONIST', name: 'Receptionist' },
//     { email: 'super@dcm.demo', password: 'sup123', role: 'SUPER_ADMIN', name: 'Super Admin' },
//     { email: 'lab@dcm.demo', password: 'lab123', role: 'LAB', name: 'Lab Technician' } // SINGLE LAB ROLE
//   ];

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Auto-fill form when demo user is clicked
//   const fillDemoCredentials = (user) => {
//     setFormData({
//       email: user.email,
//       password: user.password
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       console.log('Login attempt:', formData);
      
//       // Find the user from demo users
//       const user = demoUsers.find(u => 
//         u.email === formData.email && u.password === formData.password
//       );
      
//       if (user) {
//         // Simulate API delay
//         await new Promise(resolve => setTimeout(resolve, 1000));
        
//         // ✅ FIX: Dispatch login success to Redux
//         dispatch(loginSuccess({
//           user: {
//             id: 1,
//             name: user.name,
//             email: user.email,
//             role: user.role
//           },
//           token: 'demo-token-' + Date.now()
//         }));
        
//         // Redirect to role-specific dashboard
//         switch(user.role) {
//           case 'ADMIN':
//             navigate('/admin');
//             break;
//           case 'DOCTOR':
//             navigate('/doctor');
//             break;
//           case 'NURSE':
//             navigate('/nurse');
//             break;
//           case 'RECEPTIONIST':
//             navigate('/receptionist');
//             break;
//           case 'SUPER_ADMIN':
//             navigate('/super-admin');
//             break;
//           case 'LAB':  // NEW
//             navigate('/lab');
//             break;
//           default:
//             navigate('/login');
//         }
//       } else {
//         alert('Invalid credentials! Use demo accounts below.');
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       alert('Login failed!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-slate-50 text-slate-900 min-h-screen">
//       {/* Header */}
      

//       <main className="max-w-7xl mx-auto px-6 md:px-8 py-10 grid lg:grid-cols-2 gap-8 items-center">
//         {/* Left Side - Welcome & Demo Accounts */}
//         <div className="hidden lg:block">
//           <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">Welcome back</h1>
//           <p className="mt-3 text-slate-600 max-w-prose">
//             Sign in to access your dashboard. Your role decides which page opens.
//           </p>
//           <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
//             {demoUsers.map((user, index) => (
//               <div 
//                 key={index}
//                 className="border border-gray-200 rounded-[18px] bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
//                 onClick={() => fillDemoCredentials(user)}
//               >
//                 <div className="font-semibold">{user.name}</div>
//                 <div className="text-slate-600 mt-1">{user.email} / {user.password}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Side - Login Form */}
//         <form onSubmit={handleSubmit} className="border border-gray-200 rounded-[18px] bg-white p-6 md:p-8 shadow-sm">
//           <h2 className="text-xl font-bold">Sign in</h2>
//           <div className="mt-5 space-y-4">
//             {/* Email Field */}
//             <label className="block">
//               <span className="text-sm text-slate-700">Email</span>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Email address"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </label>

//             {/* Password Field */}
//             <label className="block">
//               <span className="text-sm text-slate-700">Password</span>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </label>

//             <div className="flex items-center justify-between">
//               <label className="inline-flex items-center gap-2 text-sm text-slate-600">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="rounded border-slate-300 text-blue-500 focus:ring-blue-500"
//                 />
//                 Remember me
//               </label>

//               <div className="text-sm">
//                 <a href="#" className="text-slate-600 hover:text-slate-900">
//                   Forgot your password?
//                 </a>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-500 text-white rounded-lg py-2.5 font-semibold hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Signing in...
//                 </span>
//               ) : (
//                 'Sign in'
//               )}
//             </button>
//           </div>
//         </form>

//         {/* Mobile Demo Accounts */}
//         <div className="lg:hidden mt-8">
//           <h3 className="text-lg font-semibold mb-4">Demo Accounts - Click to auto-fill</h3>
//           <div className="grid grid-cols-1 gap-3 text-sm">
//             {demoUsers.map((user, index) => (
//               <button
//                 key={index}
//                 type="button"
//                 onClick={() => fillDemoCredentials(user)}
//                 className="w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors"
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <div className="font-medium text-gray-900">{user.name}</div>
//                     <div className="text-sm text-gray-500">{user.email}</div>
//                   </div>
//                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                     {user.role}
//                   </span>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default LoginPage;














import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess } from '../../redux/slices/authSlice';
import { 
  Eye, EyeOff, Mail, Lock, Zap, 
  Building2, Users, Stethoscope, Shield, CheckCircle 
} from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Demo users data
  const demoUsers = [
    { email: 'admin@dcm.demo', password: 'admin123', role: 'ADMIN', name: 'Admin User' },
    { email: 'doctor@dcm.demo', password: 'doc123', role: 'DOCTOR', name: 'Dr. Aparna' },
    { email: 'nurse@dcm.demo', password: 'nurse123', role: 'NURSE', name: 'Nurse Staff' },
    { email: 'reception@dcm.demo', password: 'reception123', role: 'RECEPTIONIST', name: 'Receptionist' },
    { email: 'super@dcm.demo', password: 'sup123', role: 'SUPER_ADMIN', name: 'Super Admin' },
    { email: 'lab@dcm.demo', password: 'lab123', role: 'LAB', name: 'Lab Technician' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
  };

  // Auto-fill form when demo user is clicked
  const fillDemoCredentials = (user) => {
    setFormData({
      email: user.email,
      password: user.password,
      rememberMe: true
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      console.log('Login attempt:', formData);
      
      // Find the user from demo users
      const user = demoUsers.find(u => 
        u.email === formData.email && u.password === formData.password
      );
      
      if (user) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // ✅ FIX: Dispatch login success to Redux
        dispatch(loginSuccess({
          user: {
            id: 1,
            name: user.name,
            email: user.email,
            role: user.role
          },
          token: 'demo-token-' + Date.now()
        }));
        
        // Redirect to role-specific dashboard
        switch(user.role) {
          case 'ADMIN':
            navigate('/admin');
            break;
          case 'DOCTOR':
            navigate('/doctor');
            break;
          case 'NURSE':
            navigate('/nurse');
            break;
          case 'RECEPTIONIST':
            navigate('/receptionist');
            break;
          case 'SUPER_ADMIN':
            navigate('/super-admin');
            break;
          case 'LAB':
            navigate('/lab');
            break;
          default:
            navigate('/login');
        }
      } else {
        setError('Invalid email or password. Please try again or use demo accounts below.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed! Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* Header Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-cyan-50 border-b border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 text-center">Sign In to Your Account</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Access your hospital management dashboard and streamline healthcare operations
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              
              {/* Login Form */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                  <p className="text-gray-600">Sign in to access your dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input 
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="your.email@hospital.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input 
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Shield className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In to Dashboard
                        <Zap className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Divider */}
                  <div className="my-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or</span>
                      </div>
                    </div>
                  </div>

                  <button className='w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-600 font-semibold hover:bg-gray-100 flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 transition-all duration-200'
                    onClick={() => navigate('/signup')}
                  >
                    don't have an account? Sign up
                  </button>

                  {/* Demo Accounts Section */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-600 mb-4 text-center">
                      Try our demo accounts:
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {demoUsers.map((user, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => fillDemoCredentials(user)}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-left group"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 text-sm truncate">{user.name}</div>
                            <div className="text-xs text-gray-500 truncate">{user.email}</div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                            user.role === 'DOCTOR' ? 'bg-blue-100 text-blue-800' :
                            user.role === 'NURSE' ? 'bg-green-100 text-green-800' :
                            user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-800' :
                            user.role === 'LAB' ? 'bg-indigo-100 text-indigo-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {user.role}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </form>
              </div>

              {/* Feature Showcase */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">Complete Hospital Management Suite</h3>
                  <p className="text-blue-100 text-lg">
                    Everything you need to streamline operations, enhance patient care, and grow your healthcare practice
                  </p>
                </div>

                {/* Feature Highlights */}
                <div className="space-y-6">
                  {[
                    { icon: Users, title: "Patient Management", desc: "Complete patient journey management" },
                    { icon: Stethoscope, title: "Doctor Portal", desc: "Streamlined clinical workflows" },
                    { icon: Building2, title: "Hospital Admin", desc: "Centralized management dashboard" },
                    { icon: Shield, title: "Secure & Compliant", desc: "HIPAA compliant security" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{feature.title}</h4>
                        <p className="text-blue-200 text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-blue-200 text-sm">Hospitals</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">2000+</div>
                    <div className="text-blue-200 text-sm">Professionals</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">99.9%</div>
                    <div className="text-blue-200 text-sm">Uptime</div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 pt-6 border-t border-blue-500">
                  <div className="flex items-center justify-center gap-2 text-blue-200 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>HIPAA Compliant • GDPR Ready • 24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;






















// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import { loginSuccess } from '../../redux/slices/authSlice';

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Demo users data - UPDATED: Added PATIENT user
//   const demoUsers = [
//     { email: 'admin@dcm.demo', password: 'admin123', role: 'ADMIN', name: 'Admin User' },
//     { email: 'doctor@dcm.demo', password: 'doc123', role: 'DOCTOR', name: 'Dr. Aparna' },
//     { email: 'nurse@dcm.demo', password: 'nurse123', role: 'NURSE', name: 'Nurse Staff' },
//     { email: 'reception@dcm.demo', password: 'reception123', role: 'RECEPTIONIST', name: 'Receptionist' },
//     { email: 'super@dcm.demo', password: 'sup123', role: 'SUPER_ADMIN', name: 'Super Admin' },
//     { email: 'patient@dcm.demo', password: 'patient123', role: 'PATIENT', name: 'Ravi Kumar' } // NEW: Patient user
//   ];

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Auto-fill form when demo user is clicked
//   const fillDemoCredentials = (user) => {
//     setFormData({
//       email: user.email,
//       password: user.password
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       console.log('Login attempt:', formData);
      
//       // Find the user from demo users
//       const user = demoUsers.find(u => 
//         u.email === formData.email && u.password === formData.password
//       );
      
//       if (user) {
//         // Simulate API delay
//         await new Promise(resolve => setTimeout(resolve, 1000));
        
//         // Dispatch login success to Redux
//         dispatch(loginSuccess({
//           user: {
//             id: 1,
//             name: user.name,
//             email: user.email,
//             role: user.role
//           },
//           token: 'demo-token-' + Date.now()
//         }));
        
//         // Redirect to role-specific dashboard - UPDATED: Added PATIENT case
//         switch(user.role) {
//           case 'ADMIN':
//             navigate('/admin');
//             break;
//           case 'DOCTOR':
//             navigate('/doctor');
//             break;
//           case 'NURSE':
//             navigate('/nurse');
//             break;
//           case 'RECEPTIONIST':
//             navigate('/receptionist');
//             break;
//           case 'SUPER_ADMIN':
//             navigate('/super-admin');
//             break;
//           case 'PATIENT': // NEW: Patient case
//             navigate('/patient');
//             break;
//           default:
//             navigate('/dashboard');
//         }
//       } else {
//         alert('Invalid credentials! Use demo accounts below.');
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       alert('Login failed!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-slate-50 text-slate-900 min-h-screen">
//       <main className="max-w-7xl mx-auto px-6 md:px-8 py-10 grid lg:grid-cols-2 gap-8 items-center">
//         {/* Left Side - Welcome & Demo Accounts */}
//         <div className="hidden lg:block">
//           <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">Welcome back</h1>
//           <p className="mt-3 text-slate-600 max-w-prose">
//             Sign in to access your dashboard. Your role decides which page opens.
//           </p>
//           <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
//             {demoUsers.map((user, index) => (
//               <div 
//                 key={index}
//                 className={`border border-gray-200 rounded-[18px] bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
//                   user.role === 'PATIENT' ? 'border-blue-300 bg-blue-50' : ''
//                 }`}
//                 onClick={() => fillDemoCredentials(user)}
//               >
//                 <div className="font-semibold">{user.name}</div>
//                 <div className="text-slate-600 mt-1">{user.email} / {user.password}</div>
//                 <div className="mt-2">
//                   <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
//                     user.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
//                     user.role === 'DOCTOR' ? 'bg-blue-100 text-blue-800' :
//                     user.role === 'NURSE' ? 'bg-green-100 text-green-800' :
//                     user.role === 'RECEPTIONIST' ? 'bg-yellow-100 text-yellow-800' :
//                     user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-800' :
//                     'bg-teal-100 text-teal-800' // Patient color
//                   }`}>
//                     {user.role}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {/* Patient Feature Highlight */}
//           <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//             <h3 className="font-semibold text-blue-800 mb-2">👋 Welcome Patients!</h3>
//             <p className="text-sm text-blue-700">
//               Patient users can now access their complete medical history, book appointments, 
//               view test results, and communicate with doctors directly.
//             </p>
//           </div>
//         </div>

//         {/* Right Side - Login Form */}
//         <form onSubmit={handleSubmit} className="border border-gray-200 rounded-[18px] bg-white p-6 md:p-8 shadow-sm">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//             </div>
//             <div>
//               <h2 className="text-xl font-bold">Sign in to SmartMedi Hub</h2>
//               <p className="text-sm text-gray-600">Hospital Management System</p>
//             </div>
//           </div>
          
//           <div className="mt-5 space-y-4">
//             {/* Email Field */}
//             <label className="block">
//               <span className="text-sm text-slate-700">Email</span>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Email address"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </label>

//             {/* Password Field */}
//             <label className="block">
//               <span className="text-sm text-slate-700">Password</span>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </label>

//             <div className="flex items-center justify-between">
//               <label className="inline-flex items-center gap-2 text-sm text-slate-600">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="rounded border-slate-300 text-blue-500 focus:ring-blue-500"
//                 />
//                 Remember me
//               </label>

//               <div className="text-sm">
//                 <a href="#" className="text-slate-600 hover:text-slate-900">
//                   Forgot your password?
//                 </a>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg py-2.5 font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Signing in...
//                 </span>
//               ) : (
//                 'Sign in'
//               )}
//             </button>
            
//             <div className="text-center text-sm text-gray-600">
//               <p>Don't have an account?{' '}
//                 <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
//                   Sign up here
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </form>

//         {/* Mobile Demo Accounts */}
//         <div className="lg:hidden mt-8">
//           <h3 className="text-lg font-semibold mb-4">Demo Accounts - Click to auto-fill</h3>
//           <div className="grid grid-cols-1 gap-3 text-sm">
//             {demoUsers.map((user, index) => (
//               <button
//                 key={index}
//                 type="button"
//                 onClick={() => fillDemoCredentials(user)}
//                 className={`w-full text-left p-4 bg-white border rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors ${
//                   user.role === 'PATIENT' ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
//                 }`}
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <div className="font-medium text-gray-900">{user.name}</div>
//                     <div className="text-sm text-gray-500">{user.email}</div>
//                   </div>
//                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                     user.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
//                     user.role === 'DOCTOR' ? 'bg-blue-100 text-blue-800' :
//                     user.role === 'NURSE' ? 'bg-green-100 text-green-800' :
//                     user.role === 'RECEPTIONIST' ? 'bg-yellow-100 text-yellow-800' :
//                     user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-800' :
//                     'bg-teal-100 text-teal-800' // Patient color
//                   }`}>
//                     {user.role}
//                   </span>
//                 </div>
//                 <div className="mt-2 text-xs text-gray-600">
//                   Password: <span className="font-mono">{user.password}</span>
//                 </div>
//               </button>
//             ))}
//           </div>
          
//           {/* Mobile Patient Highlight */}
//           <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//             <div className="flex items-start gap-2">
//               <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
//                 <i className="fas fa-user text-sm"></i>
//               </div>
//               <div>
//                 <h4 className="font-medium text-blue-800 mb-1">Patient Portal Features</h4>
//                 <p className="text-sm text-blue-700">
//                   View medical records, book appointments, check test results, and message doctors.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default LoginPage;