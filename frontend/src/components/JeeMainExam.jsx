import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./examComponents/Header";
import Sidebar from "./examComponents/Sidebar";
import Footer from "./examComponents/Footer";
import QuestionDetails from "./examComponents/QuestionDetails";
import Results from "./examComponents/Results";
import PopMessageDisplayer from "./PopMessageDisplayer";
import QuestionPaper from "./examComponents/Paper";
import Modal from "./examComponents/Modal";
import SolutionPage from "./Solution";
import "./JeeMainExam.css";
import Loader from "./loader";

const JeeMainExam = () => {
  const [questions, setQuestions] = useState(() => {
    const savedQuestions = localStorage.getItem("questions");
    return savedQuestions ? JSON.parse(savedQuestions) : [];
  });

  const [results, setResults] = useState(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const savedIndex = localStorage.getItem("currentQuestionIndex");
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });

  const [selectedOptions, setSelectedOptions] = useState(() => {
    const savedOptions = localStorage.getItem("selectedOptions");
    return savedOptions ? JSON.parse(savedOptions) : {};
  });

  const [numericalAnswers, setNumericalAnswers] = useState(() => {
    const savedNumerical = localStorage.getItem("numericalAnswers");
    return savedNumerical ? JSON.parse(savedNumerical) : {};
  });

  const [timer, setTimer] = useState(() => {
    const savedTimer = localStorage.getItem("timer");
    return savedTimer ? parseInt(savedTimer, 10) : 3 * 60 * 60;
  });

  const [markedQuestions, setMarkedQuestions] = useState(() => {
    const savedMarked = localStorage.getItem("markedQuestions");
    return savedMarked ? JSON.parse(savedMarked) : [];
  });

  const [reviewedQuestions, setReviewedQuestions] = useState(() => {
    const savedReviewed = localStorage.getItem("reviewedQuestions");
    return savedReviewed ? JSON.parse(savedReviewed) : [];
  });

  const [unvisitedQuestions, setUnvisitedQuestions] = useState(() => {
    const savedUnvisited = localStorage.getItem("unvisitedQuestions");
    return savedUnvisited ? new Set(JSON.parse(savedUnvisited)) : new Set();
  });

  const [skippedQuestions, setSkippedQuestions] = useState(() => {
    const savedSkipped = localStorage.getItem("skippedQuestions");
    return savedSkipped ? new Set(JSON.parse(savedSkipped)) : new Set();
  });

  const [timeTaken, setTimeTaken] = useState(() => {
    const savedTimeTaken = localStorage.getItem("timeTaken");
    return savedTimeTaken ? JSON.parse(savedTimeTaken) : [];
  });

  const [currentStartTime, setCurrentStartTime] = useState(Date.now());
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [showQuestionPaper, setShowQuestionPaper] = useState(false);
  const [isExamCompleted, setIsExamCompleted] = useState(false);

  const [popMessage, setPopMessage] = useState({ message: "", type: "" });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  if (!token) {
    navigate("/auth");
  }

  useEffect(() => {
    fetchQuestions();
    enterFullscreen();

    setCurrentStartTime(Date.now());

    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          handleAutoSubmit();
          clearInterval(timerInterval);
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    // Save all necessary data to localStorage whenever it changes
    localStorage.setItem("questions", JSON.stringify(questions));
    localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
    localStorage.setItem("numericalAnswers", JSON.stringify(numericalAnswers));
    localStorage.setItem("timer", timer);
    localStorage.setItem("markedQuestions", JSON.stringify(markedQuestions));
    localStorage.setItem(
      "reviewedQuestions",
      JSON.stringify(reviewedQuestions)
    );
    localStorage.setItem(
      "unvisitedQuestions",
      JSON.stringify([...unvisitedQuestions])
    );
    localStorage.setItem(
      "skippedQuestions",
      JSON.stringify([...skippedQuestions])
    );
    localStorage.setItem("timeTaken", JSON.stringify(timeTaken));
  }, [
    questions,
    currentQuestionIndex,
    selectedOptions,
    numericalAnswers,
    timer,
    markedQuestions,
    reviewedQuestions,
    unvisitedQuestions,
    skippedQuestions,
    timeTaken,
  ]);

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

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "https://edutest-frontend.onrender.com/api/exam/jeemain",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setQuestions(response.data);
      setUnvisitedQuestions(new Set(response.data.map((_, index) => index))); // Initially, all questions are unvisited
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
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

    const results = calculateResults();
    setResults(results);
    setIsExamCompleted(true);

    const payload = {
      username,
      score: results.totalScore,
      correctAnswers: results.correctQuestions, // Array of correctly answered question IDs
      incorrectAnswers: results.incorrectQuestions, // Array of incorrectly answered question IDs
      markedQuestions, // Array of marked question IDs
      reviewedQuestions, // Array of reviewed question IDs
      skippedQuestions: Array.from(skippedQuestions), // Convert Set to Array
      timeTaken: timeTaken, // Total time spent in the exam
    };

    try {
      await axios.post(
        "https://edutest-frontend.onrender.com/api/exam/jeemain/result",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
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
          <Results
            questions={questions}
            results={results}
            markedQuestions={markedQuestions}
            reviewedQuestions={reviewedQuestions}
            unvisitedQuestions={Array.from(unvisitedQuestions)}
            skippedQuestions={Array.from(skippedQuestions)} // Convert Set to Array
            timeTaken={timeTaken}
          />
          <SolutionPage
            questions={questions}
            numericalAnswer={numericalAnswers}
            selectedOptions={selectedOptions}
            timeTaken={timeTaken}
            markedQuestions={markedQuestions}
            reviewedQuestions={reviewedQuestions}
          />
        </>
      )}
    </div>
  );
};

export default JeeMainExam;
