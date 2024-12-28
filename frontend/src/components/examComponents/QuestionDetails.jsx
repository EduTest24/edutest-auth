import React, { useState } from "react";
import Options from "./Options";
import "./QuestionDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faFlag,
  faExclamationTriangle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const QuestionDetails = ({
  currentQuestionIndex,
  question,
  handleOptionSelect,
  selectedOption,
  handleNumericalInput,
  numericalAnswer,
  markedQuestions,
  reviewedQuestions,
}) => {
  const [showPopup, setShowPopup] = useState(false); // Popup for reviewed questions
  const [alertMessage, setAlertMessage] = useState(""); // Alert message content
  const [showAlert, setShowAlert] = useState(false); // Controls visibility of the alert
  const [alertType, setAlertType] = useState(""); // Controls type of alert (success, error, info)

  const isMarked = markedQuestions.includes(question._id);
  const isReviewed = reviewedQuestions.includes(question._id);

  const handleInfoClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleReportClick = async () => {
    const username = localStorage.getItem("username"); // Get username from localStorage
    if (!username) {
      displayAlert("Error: User is not logged in.", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          questionId: question._id,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        displayAlert("Report submitted successfully.", "success");
      } else {
        displayAlert(data.message || "Error submitting report.", "error");
      }
    } catch (error) {
      displayAlert("Error: Could not connect to the server.", "error");
    }
  };

  const displayAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type); // success, error, or info
    setShowAlert(true);

    // Hide the alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div className="question-details">
      {/* Row 1: Question Info */}

      {/* Row 2: Question Content */}
      <div className="question-content">
        <div className="question-info">
          {/* Report Icon */}

          {/* Question Number */}
          <div className="question-number">
            {" "}
            Question {currentQuestionIndex + 1}
          </div>

          {/* Question Status */}
          <div className="question-status">
            {isMarked && <span className="marked-indicator">(Marked)</span>}
            {isReviewed && (
              <span className="reviewed-indicator">
                (Reviewed){" "}
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="info-icon"
                  onClick={handleInfoClick}
                  title="Click for more info"
                />
              </span>
            )}
          </div>

          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="report-icon"
            onClick={handleReportClick}
            title="Report this question"
          />
        </div>
        {question.text && <h2>{question.text}</h2>}
        {question.image && (
          <img src={question.image} alt="Question" className="question-image" />
        )}
      </div>

      {/* Row 3: Options or Numerical Input */}
      <div className="options-container">
        {question.type === "Numerical" ? (
          <div className="numerical-input-container">
            <input
              type="number"
              className="numerical-input"
              placeholder="Enter your answer"
              value={numericalAnswer || ""}
              onChange={(e) =>
                handleNumericalInput(question._id, e.target.value)
              }
              disabled={isReviewed}
            />
          </div>
        ) : (
          <Options
            options={question.options}
            questionId={question._id}
            type={question.type}
            handleOptionSelect={handleOptionSelect}
            selectedOption={selectedOption}
            isReviewed={isReviewed}
          />
        )}
      </div>

      {/* Popup Alert for Report Status */}
      {showAlert && (
        <div className={`alert-popup alert-${alertType}`}>
          <FontAwesomeIcon
            icon={
              alertType === "success" ? faCheckCircle : faExclamationTriangle
            }
            className="alert-icon"
          />
          <span className="alert-message">{alertMessage}</span>
        </div>
      )}

      {/* Popup for Reviewed Message */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>This question is reviewed and cannot be answered.</p>
            <button className="close-popup" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDetails;
