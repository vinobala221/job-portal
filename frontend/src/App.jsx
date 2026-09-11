import React from 'react'
// import Registerpage from './Registerpage'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Loginpage from './Loginpage'

import JobListpage from './JobListpage'
import ApplyJobPage from './ApplyJobPage'
import ProtectedRoute from './ProtectedRoute'
import RecruiterDashboard from "./RecruiterDashboard";
import MyApplicationsPage from "./MyApplicationsPage";
import CandidateDashboard from "./CandidateDashboard";
import Home from "./Home";
import CandidateRegister from "./CandidateRegister";
import CandidateLogin from "./CandidateLogin";
import RecruiterLogin from "./RecruiterLogin";
import RecruiterRegister from "./RecruiterRegister";
import ResumeUpload from "./ResumeUpload";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/register' element={<Registerpage />} /> */}
        <Route
          path="/candidate-register"
          element={<CandidateRegister />}
        />
        <Route
          path="/candidate-login"
          element={<CandidateLogin />}
        />
        {/* <Route path='/login' element={<Loginpage />} /> */}
        <Route path='/jobs' element={<ProtectedRoute>
          <JobListpage />
        </ProtectedRoute>} />

        <Route path='/apply/:jobId' element={
          <ProtectedRoute>
            <ApplyJobPage />
          </ProtectedRoute>} />

        <Route
          path="/recruiter-dashboard"
          element={<RecruiterDashboard />}
        />
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplicationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate-dashboard"
          element={<CandidateDashboard />}
        /><Route
          path="/"
          element={<Home />}
        />
        <Route path="/recruiter-register" element={<RecruiterRegister />} />
        <Route path="/recruiter-login" element={<RecruiterLogin />} />
        <Route
          path="/resume-upload"
          element={<ResumeUpload />}
        />
      </Routes>
    </BrowserRouter>







  )
}

export default App