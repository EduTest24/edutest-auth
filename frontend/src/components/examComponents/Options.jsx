import React from "react";
import "./QuestionDetails.css";

const Options = ({
  options,
  questionId,
  type, // SCQ or Numerical
  handleOptionSelect,
  selectedOption,
  isReviewed, // New prop to check if the question is reviewed
}) => {
  return (
    <div className="options">
      {type === "SCQ" ? (
        options.map((option, index) => (
          <div
            key={index}
            className={`option ${selectedOption === index ? "selected" : ""} ${
              isReviewed ? "disabled" : ""
            }`} // Add a disabled class for styling
            onClick={() => !isReviewed && handleOptionSelect(questionId, index)} // Disable click when isReviewed is true
          >
            {option.text}
            {option.image && <img src={option.image} alt="Option" />}
          </div>
        ))
      ) : (
        <div className="numerical-input">
          <label htmlFor={`numerical-${questionId}`}>Enter your answer:</label>
          <input
            type="number"
            id={`numerical-${questionId}`}
            placeholder="Enter a number"
            disabled={isReviewed} // Disable input if question is reviewed
          />
        </div>
      )}
    </div>
  );
};

export default Options;
