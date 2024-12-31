import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const Solution = ({
  questions,
  numericalAnswers,
  selectedOptions,
  timeTaken,
  markedQuestions,
  reviewedQuestions,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  useEffect(() => {
    setCurrentQuestion(questions[currentQuestionIndex]);
  }, [currentQuestionIndex, questions]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (!currentQuestion) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  const imageBoxStyle =
    "w-full h-64 max-w-2xl mx-auto object-contain bg-gray-200 rounded-lg";
  const userSelectedOption = selectedOptions?.[currentQuestion._id];
  const userNumericalAnswer = numericalAnswers?.[currentQuestion._id];

  // Check if the current question is SCQ (Single Choice Question) and if the user's selected option is correct
  const isSCQCorrect =
    currentQuestion.type === "SCQ" &&
    userSelectedOption === currentQuestion.correctAnswer;

  // Check if the current question is Numerical and if the user's numerical answer is correct
  const isNumericalCorrect =
    currentQuestion.type === "Numerical" &&
    Number(userNumericalAnswer) === currentQuestion.correctAnswer;

  // Determine the score based on the type of question and correctness of the answer
  let score;
  if (isSCQCorrect || isNumericalCorrect) {
    score = "+4"; // Correct answer, score is +4
  } else if (currentQuestion.type === "SCQ" && !userSelectedOption) {
    score = "0"; // No answer selected for SCQ, score is 0
  } else if (
    currentQuestion.type === "Numerical" &&
    (userNumericalAnswer === "" || userNumericalAnswer === undefined)
  ) {
    score = "0"; // No answer entered for Numerical, score is 0
  } else {
    score = "-1"; // Incorrect answer, score is -1
  }

  const isMarked = markedQuestions?.includes(currentQuestion._id)
    ? "Marked"
    : "Not Marked";
  const isReviewed = reviewedQuestions?.includes(currentQuestion._id)
    ? "Reviewed"
    : "Not Reviewed";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main Header */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 flex justify-between items-center shadow-lg">
        <div>
          <h3 className="text-2xl font-semibold">
            {currentQuestion.chapters?.[0] || currentQuestion.subject}
          </h3>
        </div>
      </header>

      {/* Sub Header */}
      <div className=" p-2 shadow-md flex justify-around items-center font-bold">
        <div className="flex items-center text-lg">
          <FaClock className="mr-2 text-gray-600" />
          <span>{timeTaken[currentQuestionIndex + 1]} s</span>
        </div>
        <div
          className={`font-medium ${
            score === "+4"
              ? "text-green-700"
              : score === "-1"
              ? "text-red-700"
              : "text-gray-600"
          }`}
        >
          {score}
        </div>
        <div className="text-sm font-medium text-gray-800">
          <span
            className={`${
              isMarked === "Marked" ? "text-green-600" : "text-gray-500"
            }`}
          >
            {isMarked}{" "}
          </span>
          |{" "}
          <span
            className={`${
              isReviewed === "Reviewed" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            {isReviewed}
          </span>
        </div>
      </div>

      {/* Main Section */}
      <main className=" w-full">
        <div className="bg-white shadow-lg  p-6 flex flex-col lg:flex-row lg:space-x-6">
          {/* Left Section: Question & Options */}
          <div className="flex-1 mb-6 lg:mb-0">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full mr-4">
                  {currentQuestionIndex + 1}
                </span>
                <span
                  className={`ml-2 flex items-center ${
                    currentQuestion.difficulty === "Easy"
                      ? "text-green-500"
                      : currentQuestion.difficulty === "Medium"
                      ? "text-orange-500"
                      : "text-red-500"
                  }`}
                >
                  {currentQuestion.difficulty}
                </span>
              </h2>
              {currentQuestion.image && (
                <img
                  src={currentQuestion.image}
                  alt="Question"
                  className={`${imageBoxStyle} mb-4`}
                />
              )}
              <p className="text-gray-800 text-lg">{currentQuestion.text}</p>
            </div>

            {/* Options for SCQ Type */}
            {currentQuestion.type === "SCQ" && (
              <div className="space-y-2">
                {currentQuestion.options.map((option, index) => {
                  const isUserCorrect = userSelectedOption === index;
                  const isCorrectOption =
                    currentQuestion.correctAnswer === index;

                  return (
                    <div
                      key={option._id}
                      className={`px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
                        isCorrectOption
                          ? "bg-green-100 border-green-500"
                          : isUserCorrect
                          ? "bg-red-100 border-red-500"
                          : "bg-gray-50 border-gray-300"
                      }`}
                    >
                      <span className="flex items-center">
                        {isCorrectOption && (
                          <FaCheckCircle className="text-green-500 mr-2" />
                        )}
                        {isUserCorrect && !isCorrectOption && (
                          <FaTimesCircle className="text-red-500 mr-2" />
                        )}
                        {option.text}
                        {option.image && (
                          <img src={option.image} alt="Option" />
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Numerical Input for Numerical Questions */}
            {currentQuestion.type === "Numerical" && (
              <div>
                <input
                  type="number"
                  value={userNumericalAnswer || ""}
                  readOnly
                  className={`border border-gray-300 rounded-lg p-3 w-full ${
                    isNumericalCorrect ? "bg-green-100" : "bg-red-100"
                  }`}
                />
                <p className="text-gray-600 mt-2">
                  {isNumericalCorrect
                    ? "Correct!"
                    : `Incorrect! The correct answer is: ${currentQuestion.correctAnswer}`}
                </p>
              </div>
            )}
          </div>

          {/* Right Section: Solution */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Solution</h2>
            {currentQuestion.solution?.image && (
              <img
                src={currentQuestion.solution.image}
                alt="Solution"
                className={`${imageBoxStyle} mb-4`}
              />
            )}
            {currentQuestion.solution?.text && (
              <p className="text-gray-800 text-lg">
                {currentQuestion.solution.text}
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="bg-white border-t-2 shadow-md py-4 px-6 flex justify-between items-center sticky bottom-0 z-10">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        >
          Previous
        </button>
        <p className="text-gray-600 text-lg">
          {currentQuestionIndex + 1} of {questions.length}
        </p>
        <button
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </footer>
    </div>
  );
};

export default Solution;
