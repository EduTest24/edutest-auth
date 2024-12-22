import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TestPage.css";

const TestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!token) {
      alert("You need to sign in to take the test.");
      navigate("/auth"); // Redirect to auth page if not authenticated
    } else {
      fetchQuestions();
    }
  }, [token, navigate]);

  // Fetch questions from the backend API
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "https://edutest-frontend.onrender.com/api/questions",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleOptionSelect = (questionId, option) => {
    setSelectedOptions({ ...selectedOptions, [questionId]: option });
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmitTest = async () => {
    let calculatedScore = 0;
    questions.forEach((question) => {
      if (selectedOptions[question._id] === question.correctOption) {
        calculatedScore += 1;
      }
    });

    setScore(calculatedScore);
    setIsTestCompleted(true);

    try {
      await axios.post(
        "https://edutest-frontend.onrender.com/api/test-result",
        {
          username,
          score: calculatedScore,
          totalQuestions: questions.length,
          selectedOptions,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Test results saved successfully!");
    } catch (error) {
      console.error("Error saving test results:", error);
    }
  };

  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return <p>Error: Question not found</p>;
  }

  return (
    <div className="test-page">
      <h2 className="test-header">
        Question {currentQuestionIndex + 1} of {questions.length}
      </h2>

      <p className="question-text">{currentQuestion.questionText}</p>

      <div className="options-container">
        {currentQuestion.options.map((option, index) => (
          <label key={index} className="option-label">
            <input
              type="radio"
              name={currentQuestion._id}
              value={option}
              checked={selectedOptions[currentQuestion._id] === option}
              onChange={() => handleOptionSelect(currentQuestion._id, option)}
              className="option-input"
            />
            {option}
          </label>
        ))}
      </div>

      <div className="controls">
        <button
          className="next-button"
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next Question
        </button>

        {currentQuestionIndex === questions.length - 1 && (
          <button className="submit-button" onClick={handleSubmitTest}>
            Submit Test
          </button>
        )}
      </div>

      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      {isTestCompleted && (
        <div className="result-summary">
          <h3>
            Your score: {score} / {questions.length}
          </h3>
          <p>
            You answered {score} out of {questions.length} questions correctly.
          </p>
        </div>
      )}
    </div>
  );
};

export default TestPage;
