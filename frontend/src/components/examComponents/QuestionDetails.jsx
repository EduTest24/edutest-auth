import React from "react";
import Options from "./Options";
import "./QuestionDetails.css";

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
  const isMarked = markedQuestions.includes(question._id);
  const isReviewed = reviewedQuestions.includes(question._id);
  return (
    <div className="question-details">
      {/* Row 1: Question Info */}
      <div className="question-info">
        <div className="question-number">
          Question {currentQuestionIndex + 1} {/* Display Marked or Reviewed */}
          {isMarked && <span className="marked-indicator">(Marked)</span>}
          {isReviewed && <span className="reviewed-indicator">(Reviewed)</span>}
        </div>
        <div className="question-content">
          {question.text && <h2>{question.text}</h2>}
          {question.image && (
            <img
              src={question.image}
              alt="Question"
              className="question-image"
            />
          )}
        </div>
      </div>

      {/* Row 2: Options or Numerical Input */}
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
            />
          </div>
        ) : (
          <Options
            options={question.options}
            questionId={question._id}
            type={question.type} // SCQ
            handleOptionSelect={handleOptionSelect}
            selectedOption={selectedOption}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionDetails;
