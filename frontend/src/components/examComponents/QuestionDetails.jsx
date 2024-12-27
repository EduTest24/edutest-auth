import React, { useState } from "react";
import Options from "./Options";
import "./QuestionDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

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
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const isMarked = markedQuestions.includes(question._id);
  const isReviewed = reviewedQuestions.includes(question._id); // Check if question is reviewed

  const handleInfoClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="question-details">
      {/* Row 1: Question Info */}

      {/* Row 2: Question Content */}
      <div className="question-content">
        <div className="question-info">
          <div className="question-number">
            Question {currentQuestionIndex + 1}
          </div>
          <div className="question-status">
            {isMarked && <span className="marked-indicator">(Marked)</span>}
            {isReviewed && (
              <span className="reviewed-indicator">
                (Reviewed){" "}
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="info-icon"
                  onClick={handleInfoClick} // Show popup on click
                  title="Click for more info"
                />
              </span>
            )}
          </div>
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
              value={numericalAnswer || ""} // Pre-fill with the answer if exists
              onChange={(e) =>
                handleNumericalInput(question._id, e.target.value)
              }
              disabled={isReviewed} // Disable input if question is reviewed
            />
          </div>
        ) : (
          <Options
            options={question.options}
            questionId={question._id}
            type={question.type} // SCQ
            handleOptionSelect={handleOptionSelect}
            selectedOption={selectedOption}
            isReviewed={isReviewed} // Pass the reviewed state
          />
        )}
      </div>

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
