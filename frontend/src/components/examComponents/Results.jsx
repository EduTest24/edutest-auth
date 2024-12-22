import React from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaBullseye,
  FaTag,
  FaRedoAlt,
  FaHome,
  FaBookOpen,
} from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import RankCalculator from "./Rank";

const Dashboard = ({
  results,
  markedQuestions,
  reviewedQuestions,
  unvisitedQuestions,
  skippedQuestions,
  timeTaken,
}) => {
  const totalTime = 3 * 60; // Total time in minutes (3 hours)
  const totalTimeTaken = timeTaken.reduce((a, b) => a + b, 0);
  const accuracy =
    (results.correctCount / (results.correctCount + results.incorrectCount)) *
    100;

  const calculateTotalTime = (timeArray) => {
    const totalTimeInSeconds = timeArray
      .filter((time) => time !== null)
      .reduce((acc, curr) => acc + parseFloat(curr), 0);

    const totalTimeInMinutes = (totalTimeInSeconds / 60).toFixed(2);
    return totalTimeInMinutes;
  };

  const pieData = [
    { name: "Correct", value: results.correctCount },
    { name: "Incorrect", value: results.incorrectCount },
    { name: "Unanswered", value: results.unansweredCount },
  ];

  const renderCircularProgress = (value, total, color) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const progress = (value / total) * circumference;

    return (
      <svg className="progress-circle" width="120" height="120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#e0e0e0"
          strokeWidth="10"
          fill="transparent"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
        />
        <text
          x="60"
          y="65"
          textAnchor="middle"
          fill="#333333"
          fontSize="18"
          fontWeight="bold"
        >
          {Math.round((value / total) * 100)}%
        </text>
      </svg>
    );
  };

  return (
    <div className="dashboard-container bg-gray-100 p-8">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold text-gray-800">JEE Mains</h1>
        <h2 className="text-2xl font-medium text-green-600">
          Score: {results.totalScore}
        </h2>
      </header>

      <RankCalculator marks={results.totalScore} />

      {/* Time Taken & Accuracy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Total Time Taken */}
        <div className="card bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaClock className="text-blue-500 text-3xl" />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800">
              Total Time Taken
            </h3>
            <p className="text-gray-600">
              {" "}
              {(totalTimeTaken / 60).toFixed(2)}m / 3h
            </p>
          </div>
          {renderCircularProgress(totalTimeTaken / 60, totalTime, "#2196F3")}
        </div>

        {/* Accuracy */}
        <div className="card bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaBullseye className="text-green-500 text-3xl" />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800">Accuracy</h3>
            <p className="text-gray-600">{accuracy.toFixed(2)}%</p>
          </div>
          {renderCircularProgress(accuracy, 100, "#4CAF50")}
        </div>
      </div>

      {/* Detailed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Correct Answers */}
        <div className="card bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium text-green-600 flex items-center space-x-2">
            <FaCheckCircle />{" "}
            <span>Correct Answers ({results.correctCount})</span>
          </h3>
          <div className="mt-4 text-gray-600 space-y-2">
            {results.correctQuestions.map((q, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {q}
              </span>
            ))}
          </div>
        </div>

        {/* Incorrect Answers */}
        <div className="card bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium text-red-600 flex items-center space-x-2">
            <FaTimesCircle />{" "}
            <span>Incorrect Answers ({results.incorrectCount})</span>
          </h3>
          <div className="mt-4 text-gray-600 space-y-2">
            {results.incorrectQuestions.map((q, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
              >
                {q}
              </span>
            ))}
          </div>
        </div>

        {/* Unanswered Questions */}
        <div className="card bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium text-yellow-600 flex items-center space-x-2">
            <FaClock />{" "}
            <span>Unanswered Questions ({results.unansweredCount})</span>
          </h3>
          <div className="mt-4 text-gray-600 space-y-2">
            {results.unansweredQuestions.map((q, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
              >
                {q}
              </span>
            ))}
          </div>
        </div>

        {/* Skipped Questions */}
        <div className="card bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium text-orange-600 flex items-center space-x-2">
            <MdQuestionAnswer />{" "}
            <span>Skipped Questions ({skippedQuestions.length})</span>
          </h3>
          <div className="mt-4 text-gray-600 space-y-2">
            {skippedQuestions.map((q, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
              >
                {q}
              </span>
            ))}
          </div>
        </div>

        {/* Reviewed Questions */}
        <div className="card bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium text-blue-600 flex items-center space-x-2">
            <FaBullseye />{" "}
            <span>Reviewed Questions ({reviewedQuestions.length})</span>
          </h3>
          <div className="mt-4 text-gray-600 space-y-2">
            {reviewedQuestions.map((q, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {q}
              </span>
            ))}
          </div>
        </div>

        <div className="card bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium text-purple-600 flex items-center space-x-2">
            <FaTag /> <span>Marked Questions ({markedQuestions.length})</span>
          </h3>
          <div className="mt-4 text-gray-600 space-y-2">
            {markedQuestions.length > 0 ? (
              markedQuestions.map((q, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                >
                  {q}
                </span>
              ))
            ) : (
              <p className="text-gray-500">No marked questions.</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-around space-x-4 mt-6">
          <button
            className="flex items-center px-6 py-3 border-2 border-blue-500 text-blue-500 rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition transform active:scale-95"
            onClick={() => console.log("Retake Test")}
          >
            <FaRedoAlt className="mr-2" /> Test
          </button>

          <button
            className="flex items-center px-6 py-3 border-2 border-green-500 text-green-500 rounded-lg shadow-md hover:bg-green-500 hover:text-white transition transform active:scale-95"
            onClick={() => console.log("Go to Dashboard")}
          >
            <FaHome className="mr-2" /> Dashboard
          </button>

          <button
            className="flex items-center px-6 py-3 border-2 border-indigo-500 text-indigo-500 rounded-lg shadow-md hover:bg-indigo-500 hover:text-white transition transform active:scale-95"
            onClick={() => console.log("View Solutions")}
          >
            <FaBookOpen className="mr-2" /> Solutions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
