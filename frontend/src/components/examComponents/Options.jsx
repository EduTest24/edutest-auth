import React from "react";
import "./QuestionDetails.css";

const Options = ({
  options,
  questionId,
  type, // SCQ or Numerical
  handleOptionSelect,
  selectedOption,
  handleNumericalInput,
}) => {
  return (
    <div className="options">
      {type === "SCQ" ? (
        options.map((option, index) => (
          <div
            key={index}
            className={`option ${selectedOption === index ? "selected" : ""}`}
            onClick={() => handleOptionSelect(questionId, index)}
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
            onChange={(e) => handleNumericalInput(questionId, e.target.value)}
            placeholder="Enter a number"
          />
        </div>
      )}
    </div>
  );
};

export default Options;
