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
  // Simple mock auth state for local testing
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/case-studies" element={<CaseStudiesPublic />} />
      
      <Route path="/admin/login" element={<AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />} />
      
      <Route path="/admin" element={isAdminLoggedIn ? <AdminLayout onLogout={() => setIsAdminLoggedIn(false)} /> : <Navigate to="/admin/login" />}>
        <Route index element={<DashboardOverview />} />
        <Route path="case-studies" element={<ManageCaseStudies />} />
        <Route path="website" element={<ManageWebsite />} />
      </Route>
    </Routes>
  )
}

export default App
