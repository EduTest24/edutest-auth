import React from "react";
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
import ExamsPage from "./pages/ExamsPage";
import ExamDetailsPage from "./pages/ExamDetailsPage";
import ExamJeeMain from "./components/ExamJeeMain";
import NotFound from "./pages/NotFound";
import SubjectDashboard from "./components/SubjectDashboard";

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
        <Route path="/exams" element={<ExamsPage />} />
        <Route path="/exams/:examName" element={<ExamDetailsPage />} />
        <Route path="/jeemain" element={<ExamJeeMain />} />
        <Route path="/subject" element={<SubjectDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
