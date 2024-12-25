import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({
  questions,
  currentQuestionIndex,
  handleQuestionJump,
  handleSubmitExam,
  toggleSidebar,
  markedQuestions,
  reviewedQuestions,
  selectedOptions,
  numericalAnswers,
  unvisitedQuestions,
  skippedQuestions,
}) => {
  const [activeSubject, setActiveSubject] = useState("");
  const [startingIndices, setStartingIndices] = useState({});

  // Helper function to calculate the starting index for each subject dynamically
  const getStartingIndices = (questions) => {
    const indices = {};
    let currentIndex = 1; // Start question numbering from 1

    // Group questions by subject and assign starting indices
    questions.forEach((question) => {
      if (!indices[question.subject]) {
        indices[question.subject] = currentIndex;
        currentIndex += questions.filter(
          (q) => q.subject === question.subject
        ).length;
      }
    });

    return indices;
  };

  // Automatically set the active subject and calculate starting indices
  useEffect(() => {
    if (questions.length > 0) {
      const currentSubject = questions[currentQuestionIndex]?.subject;
      setActiveSubject(currentSubject);

      const indices = getStartingIndices(questions);
      setStartingIndices(indices);
    }
  }, [currentQuestionIndex, questions]);

  // Count for each state
  const answeredCount = questions.filter(
    (q) =>
      (q.type === "SCQ" && selectedOptions[q._id]) ||
      (q.type === "Numerical" && numericalAnswers[q._id])
  ).length;

  const skippedCount = skippedQuestions.size;
  const markedCount = markedQuestions.length;
  const reviewedCount = reviewedQuestions.length;
  const unvisitedCount = unvisitedQuestions.size;

  return (
    <div className="sidebar">
      <div className="side_btn">
        {/* Close Button */}
        <button className="close-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faTimes} className="mx-2" />
        </button>

        {/* Submit Button */}
        <button className="submit-btn" onClick={handleSubmitExam}>
          Submit Test
        </button>
      </div>

      {/* Summary Section */}
      <div className="summary">
        <p className="summary-title">Exam Overview</p>
        <div className="summary-items">
          <p className="summary-item">
            <span className="summary-label">Answered:</span>
            <span className="summary-count answered">{answeredCount}</span>
          </p>
          <p className="summary-item">
            <span className="summary-label">Marked:</span>
            <span className="summary-count marked">{markedCount}</span>
          </p>
          <p className="summary-item">
            <span className="summary-label">Reviewed:</span>
            <span className="summary-count reviewed">{reviewedCount}</span>
          </p>
          <p className="summary-item">
            <span className="summary-label">Skipped:</span>
            <span className="summary-count skipped">{skippedCount}</span>
          </p>
          <p className="summary-item">
            <span className="summary-label">Unvisited:</span>
            <span className="summary-count unvisited">{unvisitedCount}</span>
          </p>
        </div>
      </div>

      {/* Subject Tabs */}
      <div className="tabs">
        <div className="tab-buttons">
          {["Physics", "Chemistry", "Maths"].map((subject) => (
            <button
              key={subject}
              className={`tab-btn ${activeSubject === subject ? "active" : ""}`}
              onClick={() => setActiveSubject(subject)}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Question Numbers */}
        <div className="question-numbers">
          {questions
            .filter((q) => q.subject === activeSubject)
            .map((question, index) => {
              const questionNumber = startingIndices[activeSubject] + index;

              // Determine the question's state using question IDs for uniqueness
              const isMarked = markedQuestions.includes(question._id);
              const isReviewed = reviewedQuestions.includes(question._id);
              const isAnswered =
                (question.type === "SCQ" &&
                  selectedOptions[question._id] &&
                  !isMarked) ||
                (question.type === "Numerical" &&
                  numericalAnswers[question._id] &&
                  !isMarked);
              const isUnvisited = unvisitedQuestions.has(question._id);
              const isSkipped = skippedQuestions.has(question._id);

              // Determine the className for each question box
              let className = "question-box";
              if (questions.indexOf(question) === currentQuestionIndex) {
                className += " active";
              }
              if (isMarked) {
                className += " marked";
              }
              if (isReviewed) {
                className += " reviewed";
              }
              if (isAnswered) {
                className += " answered";
              }
              if (isUnvisited) {
                className += " unvisited";
              }
              if (isSkipped) {
                className += " skipped";
              }

              return (
                <div
                  key={question._id}
                  className={className}
                  onClick={() =>
                    handleQuestionJump(questions.indexOf(question))
                  }
                  title={
                    isMarked
                      ? "Marked for Review"
                      : isReviewed
                      ? "Reviewed"
                      : isAnswered
                      ? "Answered"
                      : isUnvisited
                      ? "Unvisited"
                      : isSkipped
                      ? "Skipped"
                      : "Not Attempted"
                  }
                >
                  {questionNumber}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
