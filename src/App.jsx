import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AppRoutes from './routes/AppRoutes'
import ScrollToTop from './landing/pages/ScrollToTop'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <ScrollToTop />
        <ToastContainer position="top-right" autoClose={4000} newestOnTop />
        <AppRoutes />
      </div>
    </Router>
  )
}

export default App