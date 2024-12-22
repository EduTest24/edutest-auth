import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import AdminQuestionForm from "./pages/AdminQuestionForm";
import TestPage from "./pages/TestPage";
import JeeMainExam from "./components/JeeMainExam";
import UserDashboard from "./components/UserDashboard";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import StudyMaterial from "./pages/StudyMaterial";
import EntranceExamDashboard from "./pages/EntranceExam";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin/question" element={<AdminQuestionForm />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/exam/jeemain" element={<JeeMainExam />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/studymaterial" element={<StudyMaterial />} />
        <Route path="/entranceexam" element={<EntranceExamDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
