import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProtectedRoute from '../components/auth/ProtectedRoute/ProtectedRoute'
// import Dashboard from '../pages/Dashboard/Dashboard'
import LoginPage from '../pages/Login/LoginPage'
import PatientLoginPage from '../pages/Login/PatientLoginPage'
import HospitalAdminChangePassword from '../pages/Login/HospitalAdminChangePassword'

// Import dashboard components
import DoctorDashboard from '../pages/dashboards/DoctorDashboard/DoctorDashboard'
import AdminDashboard from '../pages/dashboards/AdminDashboard/AdminDashboard'
import NurseDashboard from '../pages/dashboards/NurseDashboard/NurseDashboard'
import ReceptionistDashboard from '../pages/dashboards/ReceptionistDashboard/ReceptionistDashboard'
import SuperAdminDashboard from '../pages/dashboards/SuperAdminDashboard/SuperAdminDashboard'
import PatientDashboard from '../pages/dashboards/PatientDashboard/PatientDashboard' // NEW: Import PatientDashboard
import PharmacyDashboard from '../pages/dashboards/PharmacyDashboard/PharmacyDashboard'
import TelemedicineDashboard from '../pages/dashboards/TelemedicineDashboard/TelemedicineDashboard'

// Import landing page components
import Layout from '../landing/components/Layout.jsx'
import Home from '../landing/pages/Home.jsx'
import Features from '../landing/pages/Features.jsx'

import About from '../landing/pages/About.jsx'
import Pricing from '../landing/pages/Pricing.jsx'
import Contact from '../landing/pages/Contact.jsx'
import RequestDemo from '../landing/pages/RequestDemo.jsx'
// import Signin from '../landing/pages/Signin.jsx'
import Signup from '../landing/pages/Signup.jsx'
import LabDashboard from '../pages/dashboards/LabDashboard/LabDashboard.jsx'
import ForgotPassword from '../landing/pages/Forgotpassword.jsx'
import FeatureDetailPage from '../landing/pages/FeatureDetailPage.jsx'
import Download from '../landing/pages/Download.jsx'
import PrivacyPolicy from '../landing/components/PrivacyPolicy.jsx'
import TermsOfService from '../landing/components/TermsOfService.jsx'
import { shouldRedirectFromLoginPage, resolveDefaultRoute } from '../utils/authRouting'

const AppRoutes = () => {
  const { isAuthenticated, user, requiresPasswordChange } = useSelector((state) => state.auth)

  const getDefaultRoute = () =>
    resolveDefaultRoute({ isAuthenticated, user, requiresPasswordChange })

  return (
    <Routes>
      {/* Landing Page Routes */}
      <Route element={<Layout />}>
        <Route
          path="/login"
          element={
            shouldRedirectFromLoginPage(isAuthenticated, user, requiresPasswordChange) ? (
              <Navigate to={getDefaultRoute()} replace />
            ) : (
              <PatientLoginPage />
            )
          }
        />
        <Route
          path="/staff-login"
          element={
            shouldRedirectFromLoginPage(isAuthenticated, user, requiresPasswordChange) ? (
              <Navigate to={getDefaultRoute()} replace />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/"
          element={(() => {
            if (!isAuthenticated) return <Home />
            const dest = getDefaultRoute()
            // Never Navigate to "/" while already on "/" — causes infinite redirects (browser throttling).
            if (dest === '/') return <Home />
            return <Navigate to={dest} replace />
          })()}
        />
        <Route path="/features" element={<Features />} />
        <Route path="/features/:featureId" element={<FeatureDetailPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request-demo" element={<RequestDemo />} />
        <Route path="/privacy" element={<PrivacyPolicy/>}/>
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/download' element={<Download/>} />
      </Route>
      
      {/* App Authentication Routes */}
      {/* <Route 
        path="/login" 
        element={!isAuthenticated ? <LoginPage /> : <Navigate to={getDefaultRoute()} replace />} 
      /> */}
      
      {/* Protected Routes */}
      {/* <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } /> */}
      
      {/* Role-based Dashboards */}
      <Route path="/doctor/*" element={
        <ProtectedRoute requiredRole="DOCTOR">
          <DoctorDashboard />
        </ProtectedRoute>
      } />

      <Route
        path="/admin/change-password"
        element={
          <ProtectedRoute requiredRole="ADMIN">
            <HospitalAdminChangePassword />
          </ProtectedRoute>
        }
      />

      <Route path="/admin/*" element={
        <ProtectedRoute requiredRole="ADMIN">
          <AdminDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/nurse/*" element={
        <ProtectedRoute requiredRole="NURSE">
          <NurseDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/receptionist/*" element={
        <ProtectedRoute requiredRole="RECEPTIONIST">
          <ReceptionistDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/super-admin/*" element={
        <ProtectedRoute requiredRole="SUPER_ADMIN">
          <SuperAdminDashboard />
        </ProtectedRoute>
      } />
      
      {/* NEW: Patient Dashboard Route */}
      <Route path="/patient/*" element={
        <ProtectedRoute requiredRole="PATIENT">
          <PatientDashboard />
        </ProtectedRoute>
      } />

      <Route path="/lab/*" element={
        <ProtectedRoute requiredRole="LAB">
          <LabDashboard />
        </ProtectedRoute>
      } />

      <Route path="/pharmacy/*" element={
        <ProtectedRoute requiredRole="PHARMACY">
          <PharmacyDashboard />
        </ProtectedRoute>
      } />

             <Route path="/telemedicine/*" element={
        <ProtectedRoute requiredRole="TELEMEDICINE">
          <TelemedicineDashboard />
        </ProtectedRoute>
      } />
      
      {/* Catch-all: unknown paths → home (guests) or dashboard (signed-in) */}
      <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
    </Routes>
  )
}

export default AppRoutes
