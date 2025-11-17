import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess } from '../../redux/slices/authSlice';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Demo users data
  const demoUsers = [
    { email: 'admin@dcm.demo', password: 'admin123', role: 'ADMIN', name: 'Admin User' },
    { email: 'doctor@dcm.demo', password: 'doc123', role: 'DOCTOR', name: 'Dr. Aparna' },
    { email: 'nurse@dcm.demo', password: 'nurse123', role: 'NURSE', name: 'Nurse Staff' },
    { email: 'reception@dcm.demo', password: 'reception123', role: 'RECEPTIONIST', name: 'Receptionist' },
    { email: 'super@dcm.demo', password: 'sup123', role: 'SUPER_ADMIN', name: 'Super Admin' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Auto-fill form when demo user is clicked
  const fillDemoCredentials = (user) => {
    setFormData({
      email: user.email,
      password: user.password
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
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
          default:
            navigate('/dashboard');
        }
      } else {
        alert('Invalid credentials! Use demo accounts below.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* Header */}
      

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-10 grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Welcome & Demo Accounts */}
        <div className="hidden lg:block">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">Welcome back</h1>
          <p className="mt-3 text-slate-600 max-w-prose">
            Sign in to access your dashboard. Your role decides which page opens.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
            {demoUsers.map((user, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-[18px] bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => fillDemoCredentials(user)}
              >
                <div className="font-semibold">{user.name}</div>
                <div className="text-slate-600 mt-1">{user.email} / {user.password}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <form onSubmit={handleSubmit} className="border border-gray-200 rounded-[18px] bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold">Sign in</h2>
          <div className="mt-5 space-y-4">
            {/* Email Field */}
            <label className="block">
              <span className="text-sm text-slate-700">Email</span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            {/* Password Field */}
            <label className="block">
              <span className="text-sm text-slate-700">Password</span>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="rounded border-slate-300 text-blue-500 focus:ring-blue-500"
                />
                Remember me
              </label>

              <div className="text-sm">
                <a href="#" className="text-slate-600 hover:text-slate-900">
                  Forgot your password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white rounded-lg py-2.5 font-semibold hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>

        {/* Mobile Demo Accounts */}
        <div className="lg:hidden mt-8">
          <h3 className="text-lg font-semibold mb-4">Demo Accounts - Click to auto-fill</h3>
          <div className="grid grid-cols-1 gap-3 text-sm">
            {demoUsers.map((user, index) => (
              <button
                key={index}
                type="button"
                onClick={() => fillDemoCredentials(user)}
                className="w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;