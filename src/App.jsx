import { Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"
import Home from "./pages/Home"
import CaseStudiesPublic from "./pages/CaseStudiesPublic"
import AdminLayout from "./admin/AdminLayout"
import DashboardOverview from "./admin/DashboardOverview"
import ManageCaseStudies from "./admin/ManageCaseStudies"
import ManageWebsite from "./admin/ManageWebsite"
import AdminLogin from "./admin/AdminLogin"

function App() {
  // Simple mock auth state for local testing, persisted in localStorage
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem("growaz_admin_auth") === "true"
  })

  const handleLogin = () => {
    localStorage.setItem("growaz_admin_auth", "true")
    setIsAdminLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("growaz_admin_auth")
    setIsAdminLoggedIn(false)
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/case-studies" element={<CaseStudiesPublic />} />
      
      <Route path="/admin/login" element={isAdminLoggedIn ? <Navigate to="/admin" /> : <AdminLogin onLogin={handleLogin} />} />
      
      <Route path="/admin" element={isAdminLoggedIn ? <AdminLayout onLogout={handleLogout} /> : <Navigate to="/admin/login" />}>
        <Route index element={<DashboardOverview />} />
        <Route path="case-studies" element={<ManageCaseStudies />} />
        <Route path="website" element={<ManageWebsite />} />
      </Route>
    </Routes>
  )
}

export default App
