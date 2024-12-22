import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ExamSection.css"; // Import the custom CSS for styling

const ExamSection = ({ examName, description, examId }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
  }, []);

  const handleStartTest = () => {
    if (isAuthenticated) {
      if (examName == "JEE Mains") {
        navigate(`/exam/jeemain`);
      } else {
        navigate(`/test`);
      }
      // Redirect to test page and pass the examId or test details
    } else {
      // Redirect to sign-in page
      navigate("/auth");
    }
  };

  return (
    <div className="exam-section">
      <h3 className="exam-title">{examName}</h3>
      <p className="exam-description">{description}</p>
      <button className="start-test-button" onClick={handleStartTest}>
        {isAuthenticated ? "Start Test" : "Sign In to Start"}
      </button>
    </div>
  );
};

export default ExamSection;
