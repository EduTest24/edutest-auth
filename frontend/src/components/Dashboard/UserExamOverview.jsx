import React, { useState } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaClock,
  FaPercent,
  FaTrophy,
  FaBook,
  FaInfoCircle, // Add Info Circle Icon
} from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Helper function to calculate the percentage change
const calculatePercentageChange = (previous, current) => {
  if (previous === 0) return current > 0 ? 100 : 0; // Handle division by zero
  return ((current - previous) / previous) * 100;
};

// Helper function to format the exam ID
const formatExamId = (examId) => {
  if (!examId) return "Invalid Exam ID"; // Handle undefined or null examId

  const examIdStr = examId.toString();
  if (examIdStr.length < 9) return "Invalid Exam ID"; // Handle incorrectly formatted examId

  const year = examIdStr.slice(0, 4);
  const month = parseInt(examIdStr.slice(4, 6), 10);
  const day = examIdStr.slice(6, 8);
  const shift = examIdStr.slice(8);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const shiftText = shift === "1" ? "Morning" : "Evening";
  return `${day} ${monthNames[month - 1]}, ${year} (${shiftText})`;
};

// MetricCard Component
const MetricCard = ({
  title,
  value,
  icon,
  progressValue,
  progressColor,
  changePercentage,
  explanation,
  gradient,
}) => {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div
      className="relative p-4 rounded-lg shadow-md flex items-center justify-between"
      style={{ background: gradient }}
    >
      {/* Info Icon at Top Right */}
      <div
        className="absolute top-2 right-2 text-gray-100 cursor-pointer"
        onClick={() => setShowExplanation(!showExplanation)}
      >
        <FaInfoCircle className="text-lg" />
      </div>

      {/* Left Section: Icon and Text */}
      <div className="flex items-center gap-4">
        <div
          className="p-3 rounded-full text-white"
          style={{ backgroundColor: progressColor }}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-medium text-white">{title}</h3>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>

      {/* Right Section: Circular Progress Bar */}
      <div className="w-20 h-20">
        <CircularProgressbar
          value={Math.abs(progressValue)}
          text={`${progressValue > 0 ? "+" : ""}${progressValue.toFixed(2)}%`}
          styles={buildStyles({
            pathColor: `url(#progressGradient-${title})`, // Gradient path
            trailColor: "rgba(255, 255, 255, 0.3)", // Subtle trail
            textColor: "#FFFFFF", // Text color
            textSize: "1rem", // Adjust text size
            pathTransitionDuration: 0.5, // Smooth animation
            pathShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Subtle shadow
          })}
        />
        {/* Add gradient definitions */}
        <svg style={{ height: 0 }}>
          <defs>
            <linearGradient
              id={`progressGradient-${title}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#4CAF50" />
              <stop offset="100%" stopColor={progressColor} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Explanation Modal */}
      {showExplanation && (
        <div className="absolute bg-white p-4 rounded-lg shadow-lg mt-4 ml-4 w-64 z-10">
          <p className="text-sm text-gray-600">{explanation}</p>
        </div>
      )}
    </div>
  );
};

const UserExamOverview = ({ userData }) => {
  if (!userData || !userData.exams || userData.exams.length === 0) {
    return <div className="text-center text-gray-600">No data available.</div>;
  }

  // Calculating Metrics
  const allAttempts = userData.exams.flatMap((exam) => exam.attempts);

  const highestScore = Math.max(...allAttempts.map((attempt) => attempt.score));
  const lowestScore = Math.min(...allAttempts.map((attempt) => attempt.score));

  const averageTime = (
    allAttempts.reduce(
      (totalTime, attempt) =>
        totalTime + attempt.timeTaken.reduce((acc, time) => acc + time, 0),
      0
    ) /
    allAttempts.length /
    60
  ).toFixed(2);

  const averageAccuracy = (
    allAttempts.reduce((totalAccuracy, attempt) => {
      const totalQuestions =
        attempt.correctAnswers.length +
        attempt.incorrectAnswers.length +
        attempt.skippedQuestions.length;
      const accuracy =
        totalQuestions === 0
          ? 100
          : (attempt.correctAnswers.length / totalQuestions) * 100;
      return totalAccuracy + accuracy;
    }, 0) / allAttempts.length
  ).toFixed(2);

  // Calculate percentage changes dynamically
  const firstAttempt = allAttempts[0]; // Get the first attempt to calculate 'previous' metrics
  const previousHighestScore = firstAttempt ? firstAttempt.score : 0;
  const previousLowestScore = firstAttempt ? firstAttempt.score : 0;
  const previousAverageAccuracy = 50; // You could calculate this similarly if necessary
  const previousAverageTime = 1.2;

  const highestScoreChange = calculatePercentageChange(
    previousHighestScore,
    highestScore
  );
  const lowestScoreChange = calculatePercentageChange(
    previousLowestScore,
    lowestScore
  );
  const averageAccuracyChange = calculatePercentageChange(
    previousAverageAccuracy,
    averageAccuracy
  );
  const averageTimeChange = calculatePercentageChange(
    previousAverageTime,
    averageTime
  );

  const examAttempts = userData.exams.map((exam) => {
    const examDateShift = formatExamId(exam.examId || ""); // Provide fallback
    const attemptsCount = exam.attempts ? exam.attempts.length : 0; // Handle missing attempts
    return { examDateShift, attemptsCount };
  });

  return (
    <div className="py-4 my-3">
      <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center lg:text-left">
        Exam Overview
      </h2>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:w-3/5">
          <MetricCard
            title="Highest Score"
            value={highestScore}
            icon={<FaTrophy className="text-lg" />}
            progressValue={highestScoreChange}
            progressColor="#81C784"
            explanation="This metric shows the highest score obtained in any attempt. It is calculated by comparing all exam attempts."
            gradient="linear-gradient(135deg, #4CAF50, #81C784)"
          />
          <MetricCard
            title="Lowest Score"
            value={lowestScore}
            icon={<FaPercent className="text-lg" />}
            progressValue={lowestScoreChange}
            progressColor="#FF7961"
            explanation="This metric shows the lowest score obtained in any attempt. It is calculated by comparing all exam attempts."
            gradient="linear-gradient(135deg, #F44336, #FF7961)"
          />
          <MetricCard
            title="Average Accuracy"
            value={`${averageAccuracy}%`}
            icon={<FaPercent className="text-lg" />}
            progressValue={averageAccuracyChange}
            progressColor="#64B5F6"
            explanation="This metric represents the average accuracy across all attempts. It is calculated by dividing the number of correct answers by the total number of questions."
            gradient="linear-gradient(135deg, #2196F3, #64B5F6)"
          />
          <MetricCard
            title="Average Time"
            value={`${averageTime} min`}
            icon={<FaClock className="text-lg" />}
            progressValue={averageTimeChange}
            progressColor="#FFD54F"
            explanation="This metric shows the average time spent per attempt, calculated by averaging the total time spent across all attempts."
            gradient="linear-gradient(135deg, #FFC107, #FFD54F)"
          />
        </div>

        {/* Attempts Section */}
        <div className="bg-white p-6 rounded-lg shadow-md lg:w-2/5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Attempts Per Exam
          </h3>
          <ul className="space-y-4">
            {examAttempts.map((exam, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <FaBook className="text-blue-600 text-xl" />
                  <span className="text-gray-800 font-medium">
                    {exam.examDateShift}
                  </span>
                </div>
                <div className="text-gray-600">
                  {exam.attemptsCount} Attempts
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserExamOverview;
