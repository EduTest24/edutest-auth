import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import MarkedButton from "./Marked";
import ReviewedButton from "./Reviewed";
import "./Footer.css";

const Footer = ({
  clearSelection,
  handlePreviousQuestion,
  handleNextQuestion,
  currentQuestionIndex,
  totalQuestions,
  handleMarkQuestion,
  handleReviewQuestion,
}) => {
  return (
    <div className="foot">
      {/* Clear Selection Button */}
      <button className="clear-btn" onClick={clearSelection}>
        Clear
      </button>

      {/* Mark and Review Buttons */}
      <MarkedButton handleMarkQuestion={handleMarkQuestion} />
      <ReviewedButton handleReviewQuestion={handleReviewQuestion} />

      <div className="nav">
        {/* Previous Button with Icon */}
        <button
          className="nav-btn"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {/* Next Button with Icon */}
        <button
          className="nav-btn"
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === totalQuestions - 1}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default Footer;
