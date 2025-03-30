import React from 'react'

// Routing
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

// Context Providers
import { AuthProvider } from './context/AuthContext'


// Page Components
import AdminPage from './pages/admin/admin'
import AdminProtectedRoute from './components/Admin/AdminProtectedRoute'
import Portfolio from './pages/portfolio/portfolio'
import AdminLogin from './components/Admin/AdminLogin'



function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route index element={<AdminPage />} />
        </Route>
        <Route path="/" element={<Portfolio />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
