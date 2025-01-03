import React from "react";
import { FaTrophy, FaClock, FaCheckCircle } from "react-icons/fa"; // For SVG icons
import CircularProgressBar from "./CircularProgressBar"; // Assuming you have a CircularProgressBar component

const ExamOverview = ({ results }) => {
  // Calculate highest score across all attempts
  const highestScore = results.reduce((max, exam) => {
    const examMax = Math.max(...exam.attempts.map((attempt) => attempt.score));
    return Math.max(max, examMax);
  }, 0);

  // Calculate average time taken across all attempts
  const totalAttempts = results.reduce(
    (sum, exam) => sum + exam.attempts.length,
    0
  );
  const totalTimeTaken = results.reduce((total, exam) => {
    return (
      total +
      exam.attempts.reduce(
        (sum, attempt) => sum + attempt.timeTaken.reduce((a, b) => a + b, 0),
        0
      )
    );
  }, 0);
  const averageTimeTaken = (totalTimeTaken / totalAttempts / 60).toFixed(2); // Convert to minutes

  // Calculate average accuracy across all attempts
  const totalCorrectAnswers = results.reduce((total, exam) => {
    return (
      total +
      exam.attempts.reduce(
        (sum, attempt) => sum + attempt.correctAnswers.length,
        0
      )
    );
  }, 0);
  const totalQuestionsAttempted = results.reduce((total, exam) => {
    return (
      total +
      exam.attempts.reduce(
        (sum, attempt) =>
          sum +
          (attempt.correctAnswers.length + attempt.incorrectAnswers.length),
        0
      )
    );
  }, 0);
  const averageAccuracy = (
    (totalCorrectAnswers / totalQuestionsAttempted) *
    100
  ).toFixed(2);

  return (
    <div className="bg-white shadow rounded p-4 mb-6">
      <h2 className="text-xl font-semibold text-blue-700 mb-6">
        Exam Overview
      </h2>

      {/* First Row for Highest Score */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Highest Score Card */}
        <div className="p-6 bg-blue-100 rounded-lg shadow-lg flex items-center justify-between space-x-4">
          <div className="flex flex-col items-start space-y-2">
            <h3 className="text-sm font-medium text-blue-800">Highest Score</h3>
            <p className="text-xl font-semibold text-blue-900">
              {highestScore}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <CircularProgressBar
              value={highestScore}
              maxValue={100}
              color="blue"
              size={60}
            />
          </div>
        </div>

        {/* Average Time Card */}
        <div className="p-6 bg-green-100 rounded-lg shadow-lg flex items-center justify-between space-x-4">
          <div className="flex flex-col items-start space-y-2">
            <h3 className="text-sm font-medium text-green-800">
              Average Time (mins)
            </h3>
            <p className="text-xl font-semibold text-green-900">
              {averageTimeTaken}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <CircularProgressBar
              value={averageTimeTaken}
              maxValue={120}
              color="green"
              size={60}
            />
          </div>
        </div>

        {/* Average Accuracy Card */}
        <div className="p-6 bg-orange-100 rounded-lg shadow-lg flex items-center justify-between space-x-4">
          <div className="flex flex-col items-start space-y-2">
            <h3 className="text-sm font-medium text-orange-800">
              Average Accuracy (%)
            </h3>
            <p className="text-xl font-semibold text-orange-900">
              {averageAccuracy}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <CircularProgressBar
              value={averageAccuracy}
              maxValue={100}
              color="orange"
              size={60}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamOverview;
