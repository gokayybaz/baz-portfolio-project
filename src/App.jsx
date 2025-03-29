import React from 'react'

// Routing
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

// Context Providers
import { AuthProvider } from './context/AuthContext'


// Page Components
import AdminPanel from './components/AdminPanel'
import LoginPage from './Components/LoginPage'
import AdminProtectedRoute from './Components/AdminProtectedRoute'
import Portfolio from './pages/portfolio/portfolio'



function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route index element={<AdminPanel />} />
        </Route>
        <Route path="/" element={<Portfolio />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
