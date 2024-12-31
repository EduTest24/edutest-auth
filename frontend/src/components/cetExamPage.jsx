import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./examComponents/Header";
import Sidebar from "./examComponents/Sidebar";
import Footer from "./examComponents/Footer";
import QuestionDetails from "./examComponents/QuestionDetails";
import Results from "./CetComponents/Results";
import PopMessageDisplayer from "./PopMessageDisplayer";
import QuestionPaper from "./examComponents/Paper";
import Modal from "./examComponents/Modal";
import SolutionPage from "./Solution";
import "./JeeMainExam.css";
import Loader from "./loader";

const ExamJeeMain = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isResultsVisible, setIsResultsVisible] = useState(true);
  const [questions, setQuestions] = useState(location.state?.questions || []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [numericalAnswers, setNumericalAnswers] = useState({});
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [timer, setTimer] = useState(3 * 60 * 60);
  const [results, setResults] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [markedQuestions, setMarkedQuestions] = useState([]); // Array for marked questions
  const [reviewedQuestions, setReviewedQuestions] = useState([]); // Array for reviewed questions
  const [popMessage, setPopMessage] = useState({ message: "", type: "" });

  const [unvisitedQuestions, setUnvisitedQuestions] = useState(new Set()); // Set to track unvisited questions
  const [skippedQuestions, setSkippedQuestions] = useState(new Set()); // Set to track skipped questions

  const [showQuestionPaper, setShowQuestionPaper] = useState(false);

  const [timeTaken, setTimeTaken] = useState([]); // Array to track time taken for each question
  const [currentStartTime, setCurrentStartTime] = useState(Date.now());

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  if (!token) {
    navigate("/auth");
  }

  const handleToggleResultsSolutions = () => {
    setIsResultsVisible(!isResultsVisible); // Toggle visibility of Results and Solutions
  };
  useEffect(() => {
    if (questions.length === 0) {
      // Redirect back if no questions are available
      navigate("/jeemain-exam");
    }
  }, [questions, navigate]);
  useEffect(() => {
    enterFullscreen();
    setCurrentStartTime(Date.now());

    const timerInterval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          handleAutoSubmit();
          clearInterval(timerInterval);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    calculateSkippedAndUnvisited();
  }, [timeTaken, markedQuestions, reviewedQuestions]);

  const updateTimeTaken = () => {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - currentStartTime) / 1000; // Time in seconds

    setTimeTaken((prev) => {
      const updated = [...prev];
      updated[currentQuestionIndex] =
        (updated[currentQuestionIndex] || 0) + elapsedTime; // Accumulate time
      return updated;
    });

    setCurrentStartTime(currentTime); // Reset start time for the new question
  };

  const calculateSkippedAndUnvisited = () => {
    const skipped = new Set();
    const unvisited = new Set(questions.map((q) => q._id)); // Start with all question IDs as unvisited

    questions.forEach((question, index) => {
      const questionId = question._id; // Use question ID

      const hasAnswer =
        selectedOptions[questionId] !== undefined ||
        numericalAnswers[questionId] !== undefined;

      if (
        !hasAnswer &&
        timeTaken[index] &&
        !reviewedQuestions.includes(questionId)
      ) {
        // Question was visited but not answered
        skipped.add(questionId);
      }

      if (hasAnswer || timeTaken[index]) {
        // Remove from unvisited if it was answered or time spent
        unvisited.delete(questionId);
      }
    });

    setSkippedQuestions(skipped);
    setUnvisitedQuestions(unvisited);
  };

  const enterFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  const handleOptionSelect = (questionId, optionIndex) => {
    setSelectedOptions({ ...selectedOptions, [questionId]: optionIndex });
    setUnvisitedQuestions((prevState) => {
      const updated = new Set(prevState);
      updated.delete(questionId); // Mark question as visited
      return updated;
    });
  };

  const handleNumericalInput = (questionId, value) => {
    setNumericalAnswers({ ...numericalAnswers, [questionId]: value });
    setUnvisitedQuestions((prevState) => {
      const updated = new Set(prevState);
      updated.delete(questionId); // Mark question as visited
      return updated;
    });
  };

  const handleQuestionJump = (index) => {
    setCurrentQuestionIndex(index);
    setIsSidebarVisible(false);
    updateTimeTaken();
    setUnvisitedQuestions((prevState) => {
      const updated = new Set(prevState);
      updated.delete(index + 1); // Mark question as visited
      return updated;
    });
  };

  const handleSkipQuestion = () => {
    updateTimeTaken();
    setSkippedQuestions((prevState) => {
      const updated = new Set(prevState);
      updated.add(currentQuestionIndex); // Add to skipped questions
      return updated;
    });
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    updateTimeTaken();
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
  };

  const handlePreviousQuestion = () => {
    updateTimeTaken();
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleMarkQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    // Check if the question has been answered
    const isAnswered =
      (currentQuestion.type === "SCQ" &&
        selectedOptions[currentQuestion._id] !== undefined) ||
      (currentQuestion.type === "Numerical" &&
        numericalAnswers[currentQuestion._id] !== undefined);

    if (isAnswered) {
      if (!markedQuestions.includes(currentQuestion._id)) {
        // Add the current question ID to markedQuestions
        setMarkedQuestions([...markedQuestions, currentQuestion._id]);
      }
    }
  };

  const handleReviewQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    // Check if the question is unanswered
    const isUnanswered =
      (currentQuestion.type === "SCQ" &&
        selectedOptions[currentQuestion._id] === undefined) ||
      (currentQuestion.type === "Numerical" &&
        numericalAnswers[currentQuestion._id] === undefined);

    if (isUnanswered) {
      if (!reviewedQuestions.includes(currentQuestion._id)) {
        // Add the current question ID to reviewedQuestions
        setReviewedQuestions([...reviewedQuestions, currentQuestion._id]);
      }
    }
  };

  const clearSelection = () => {
    const currentQuestion = questions[currentQuestionIndex];

    // Clear marked and reviewed states for the current question
    setMarkedQuestions(
      markedQuestions.filter((id) => id !== currentQuestion._id)
    );
    setReviewedQuestions(
      reviewedQuestions.filter((id) => id !== currentQuestion._id)
    );

    // Remove the selected option or numerical input based on the question type
    if (currentQuestion.type === "SCQ") {
      setSelectedOptions((prevSelectedOptions) => {
        const updatedOptions = { ...prevSelectedOptions };
        delete updatedOptions[currentQuestion._id]; // Remove selected option
        return updatedOptions;
      });
    } else if (currentQuestion.type === "Numerical") {
      setNumericalAnswers((prevNumericalAnswers) => {
        const updatedAnswers = { ...prevNumericalAnswers };
        delete updatedAnswers[currentQuestion._id]; // Remove numerical input
        return updatedAnswers;
      });
    }
  };

  const handleSubmitExam = async () => {
    updateTimeTaken();
    setPopMessage({
      message: "Submitting the exam. Please wait...",
      type: "info",
    });

    // Calculate the results
    const results = calculateResults();
    setResults(results);
    setIsExamCompleted(true);

    // Generate unique numeric examId
    const { date, shift } = questions[0]?.examInfo;
    const datePart = new Date(date)
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, ""); // YYYYMMDD
    const shiftPart = shift === "Morning" ? "1" : "2"; // Map shift to a numeric value
    const examId = Number(`${datePart}${shiftPart}`); // Combine parts into numeric examId

    // Generate unique attemptId
    const attemptId = `${username}_${new Date().toISOString()}`;

    // Payload for the attempt
    const payload = {
      attemptId, // Unique identifier for this attempt
      username,
      userId: username,
      examId, // Numeric ID for the exam
      score: results.totalScore,
      correctAnswers: results.correctQuestions,
      incorrectAnswers: results.incorrectQuestions,
      markedQuestions,
      reviewedQuestions,
      skippedQuestions: Array.from(skippedQuestions),
      timeTaken,
      timestamp: new Date().toISOString(), // Add timestamp for sorting
    };

    try {
      // Send the attempt to the backend
      await axios.post(
        "https://edutest-frontend.onrender.com/api/exam/mhtcet/attempts",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPopMessage({
        message: "Exam results saved successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error saving results:", error);
      setPopMessage({
        message: "Failed to save results. Please try again.",
        type: "error",
      });
    }
  };

  const handleAutoSubmit = () => {
    setPopMessage({
      message: "Time's up! Submitting the test automatically.",
      type: "error",
    });
    handleSubmitExam();
  };

  const calculateResults = () => {
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;
    let totalScore = 0;

    // Arrays to store indices of correct, incorrect, unanswered, marked, reviewed, and unattempted questions
    let correctQuestions = [];
    let incorrectQuestions = [];
    let unansweredQuestions = [];
    let markedQuestions = [];
    let reviewedQuestions = [];
    let unattemptedQuestions = []; // For questions that are unanswered and not marked/reviewed

    questions.forEach((question, index) => {
      let userAnswer;

      // Determine the user's answer based on the question type
      if (question.type === "Numerical") {
        userAnswer = numericalAnswers[question._id];
      } else {
        userAnswer = selectedOptions[question._id];
      }

      // Check if the question is answered
      const isAnswered =
        (question.type === "SCQ" &&
          selectedOptions[question._id] !== undefined) ||
        (question.type === "Numerical" && numericalAnswers[question._id]);

      // Check if the question is unanswered
      const isUnanswered =
        (question.type === "SCQ" &&
          selectedOptions[question._id] === undefined) ||
        (question.type === "Numerical" && !numericalAnswers[question._id]);

      // Handle marking logic
      if (question.isMarked && isAnswered) {
        if (!markedQuestions.includes(index + 1)) {
          markedQuestions.push(index + 1); // Store 1-based index
        }
      }

      // Handle reviewing logic
      if (question.isReviewed && isUnanswered) {
        if (!reviewedQuestions.includes(index + 1)) {
          reviewedQuestions.push(index + 1); // Store 1-based index
        }
      }

      // Evaluate the user's answer and categorize the question
      if (isUnanswered) {
        unansweredCount += 1;
        unansweredQuestions.push(index + 1); // Store 1-based index

        // Check if the question is also not marked and not reviewed
        if (!reviewedQuestions.includes(index + 1)) {
          unattemptedQuestions.push(index + 1); // Store 1-based index
        }
      }

      if (question.type === "SCQ") {
        // Handle SCQ type questions
        if (
          selectedOptions[question._id] !== undefined &&
          selectedOptions[question._id] === question.correctAnswer
        ) {
          correctCount += 1;
          totalScore += 4;
          correctQuestions.push(index + 1); // Store 1-based index
        } else if (
          selectedOptions[question._id] !== undefined &&
          selectedOptions[question._id] !== question.correctAnswer
        ) {
          incorrectCount += 1;
          totalScore -= 1;
          incorrectQuestions.push(index + 1); // Store 1-based index
        }
      } else if (question.type === "Numerical") {
        // Handle Numerical type questions
        const userAnswer = numericalAnswers[question._id]; // Get the user's numerical input
        if (
          userAnswer !== undefined &&
          Number(userAnswer) === question.correctAnswer
        ) {
          correctCount += 1;
          totalScore += 4;
          correctQuestions.push(index + 1); // Store 1-based index
        } else if (
          userAnswer !== undefined &&
          Number(userAnswer) !== question.correctAnswer
        ) {
          incorrectCount += 1;
          totalScore -= 1;
          incorrectQuestions.push(index + 1); // Store 1-based index
        }
      }
    });

    // Return the updated results, including the arrays of question indices
    return {
      correctCount,
      incorrectCount,
      unansweredCount,
      totalScore,
      correctQuestions, // Array of correct question indices
      incorrectQuestions, // Array of incorrect question indices
      unansweredQuestions, // Array of unanswered question indices
      markedQuestions, // Array of marked question indices
      reviewedQuestions, // Array of reviewed question indices
      unattemptedQuestions, // Array of unattempted question indices
    };
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (questions.length === 0) {
    return <Loader />;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="jee-main-exam">
      {!isExamCompleted ? (
        <>
          <Header
            timer={timer}
            formatTime={formatTime}
            toggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)}
            showQuestionPaper={showQuestionPaper}
            setShowQuestionPaper={setShowQuestionPaper}
            questions={questions}
          />
          <Modal
            isOpen={showQuestionPaper}
            onClose={() => setShowQuestionPaper(false)}
          >
            <QuestionPaper questions={questions} />
          </Modal>

          {isSidebarVisible && (
            <Sidebar
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              handleQuestionJump={handleQuestionJump}
              handleSubmitExam={handleSubmitExam}
              toggleSidebar={() => setIsSidebarVisible(false)}
              markedQuestions={markedQuestions}
              reviewedQuestions={reviewedQuestions}
              selectedOptions={selectedOptions}
              numericalAnswers={numericalAnswers}
              unvisitedQuestions={unvisitedQuestions}
              skippedQuestions={skippedQuestions}
            />
          )}

          <QuestionDetails
            currentQuestionIndex={currentQuestionIndex}
            question={currentQuestion}
            handleOptionSelect={handleOptionSelect}
            selectedOption={selectedOptions[currentQuestion._id]}
            handleNumericalInput={handleNumericalInput}
            numericalAnswer={numericalAnswers[currentQuestion._id]}
            markedQuestions={markedQuestions}
            reviewedQuestions={reviewedQuestions}
          />

          <Footer
            clearSelection={clearSelection}
            handlePreviousQuestion={handlePreviousQuestion}
            handleNextQuestion={handleNextQuestion}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            handleMarkQuestion={handleMarkQuestion}
            handleReviewQuestion={handleReviewQuestion}
          />
          <PopMessageDisplayer
            message={popMessage.message}
            type={popMessage.type}
            duration={3000}
            onClose={() => setPopMessage({ message: "", type: "" })}
          />
        </>
      ) : (
        <>
          {isResultsVisible ? (
            <Results
              questions={questions}
              results={results}
              markedQuestions={markedQuestions}
              reviewedQuestions={reviewedQuestions}
              unvisitedQuestions={Array.from(unvisitedQuestions)}
              skippedQuestions={Array.from(skippedQuestions)}
              timeTaken={timeTaken}
            />
          ) : (
            <SolutionPage
              questions={questions}
              numericalAnswer={numericalAnswers}
              selectedOptions={selectedOptions}
              timeTaken={timeTaken}
              markedQuestions={markedQuestions}
              reviewedQuestions={reviewedQuestions}
            />
          )}

          {/* Button to toggle between Results and Solutions */}
          <button onClick={handleToggleResultsSolutions} className="toggle-btn">
            {isResultsVisible ? "View Solutions" : "View Results"}
          </button>
        </>
      )}
    </div>
  );
};

export default ExamJeeMain;
