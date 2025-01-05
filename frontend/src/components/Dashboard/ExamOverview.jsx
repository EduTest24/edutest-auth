import React from "react";
import {
  FaTrophy,
  FaClock,
  FaBullseye,
  FaListUl,
  FaBook,
} from "react-icons/fa"; // For Icons
import CircularProgressBar from "./CircularProgressBar"; // Assuming you have a CircularProgressBar component

const formatExamId = (examId) => {
  const examIdStr = examId.toString();
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

const ExamOverview = ({ results }) => {
  // Calculate highest score across all attempts
  const highestScore = results.reduce((max, exam) => {
    const examMax = Math.max(...exam.attempts.map((attempt) => attempt.score));
    return Math.max(max, examMax);
  }, 0);

  // Calculate lowest score across all attempts
  const lowestScore = results.reduce((min, exam) => {
    const examMin = Math.min(...exam.attempts.map((attempt) => attempt.score));
    return Math.min(min, examMin);
  }, 100); // Start with a high value to ensure it is reduced

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

  // Get attempts count for each exam
  const examAttemptsCount = results.map((exam) => ({
    name: formatExamId(exam.examId),
    attempts: exam.attempts.length,
  }));

  return (
    <div className=" p-2 mb-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        Exam Overview
      </h2>

      {/* Stats and Attempts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Stats Section */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Highest Score Card */}
          <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-xl flex items-center justify-between text-white hover:shadow-2xl transition-transform transform hover:scale-105">
            <div className="flex items-center space-x-4">
              <FaTrophy className="text-4xl" />
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">Highest Score</h3>
                <p className="text-3xl font-bold mt-2">{highestScore}</p>
              </div>
            </div>
            <div className="w-24 h-24">
              <CircularProgressBar
                value={highestScore}
                maxValue={100}
                color="white"
                size={80}
              />
            </div>
          </div>

          {/* Average Time Card */}
          <div className="p-6 bg-gradient-to-r from-green-400 to-teal-500 rounded-xl shadow-xl flex items-center justify-between text-white hover:shadow-2xl transition-transform transform hover:scale-105">
            <div className="flex items-center space-x-4">
              <FaClock className="text-4xl" />
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">Average Time</h3>
                <p className="text-3xl font-bold mt-2">
                  {averageTimeTaken} mins
                </p>
              </div>
            </div>
            <div className="w-24 h-24">
              <CircularProgressBar
                value={averageTimeTaken}
                maxValue={120}
                color="white"
                size={80}
              />
            </div>
          </div>

          {/* Average Accuracy Card */}
          <div className="p-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-xl flex items-center justify-between text-white hover:shadow-2xl transition-transform transform hover:scale-105">
            <div className="flex items-center space-x-4">
              <FaBullseye className="text-4xl" />
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">Average Accuracy</h3>
                <p className="text-3xl font-bold mt-2">{averageAccuracy}%</p>
              </div>
            </div>
            <div className="w-24 h-24">
              <CircularProgressBar
                value={averageAccuracy}
                maxValue={100}
                color="white"
                size={80}
              />
            </div>
          </div>
        </div>

        {/* Attempts Section */}
        <div className="bg-white shadow-md p-6">
          <h3 className="text-2lg font-semibold text-gray-800 mb-6 flex items-center">
            <FaListUl className="text-blue-700 mr-3" /> Attempts Per Exam
          </h3>
          <div className="space-y-4">
            {examAttemptsCount.map((exam) => (
              <div
                key={exam.name}
                className="flex justify-between items-center text-lg text-gray-700 border-b pb-2"
              >
                <p className="font-medium flex items-center">
                  <FaBook className="text-blue-500 mr-2" /> {exam.name}
                </p>
                <p className="font-semibold text-blue-500">
                  {exam.attempts} Attempts
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamOverview;
