import React, { useState } from "react";
import Chart from "react-apexcharts";
import {
  FaChartLine,
  FaClock,
  FaPercent,
  FaListAlt,
  FaArrowUp,
  FaArrowDown,
  FaChevronDown,
  FaChevronUp,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const ExamOverview = ({ userData }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State for Total Exams expansion
  const [currentPage, setCurrentPage] = useState(1); // State for graph pagination

  if (!userData || !userData.exams || userData.exams.length === 0) {
    return <div className="text-center text-gray-600">No data available.</div>;
  }

  // Calculate required metrics
  const totalExams = userData.exams.length;
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
  ).toFixed(2); // Convert to minutes

  const averageAccuracy = (
    allAttempts.reduce((totalAccuracy, attempt) => {
      const totalQuestions =
        attempt.correctAnswers.length +
        attempt.incorrectAnswers.length +
        attempt.skippedQuestions.length;
      const accuracy = (attempt.correctAnswers.length / totalQuestions) * 100;
      return totalAccuracy + accuracy;
    }, 0) / allAttempts.length
  ).toFixed(2);

  const examsWithAttempts = userData.exams.map((exam) => ({
    examId: exam.examId,
    attempts: exam.attempts,
  }));

  // Pagination Logic
  const itemsPerPage = 5;
  const totalPages = Math.ceil(allAttempts.length / itemsPerPage);
  const paginatedAttempts = allAttempts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ApexCharts Data
  const chartData = {
    series: [
      {
        name: "Correct Answers",
        data: paginatedAttempts.map((attempt) => attempt.correctAnswers.length),
      },
      {
        name: "Incorrect Answers",
        data: paginatedAttempts.map(
          (attempt) => attempt.incorrectAnswers.length
        ),
      },
    ],
    options: {
      chart: {
        type: "line",
        animations: { enabled: true, easing: "smooth" },
        background: "#f9f9f9",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: paginatedAttempts.map((_, index) => `Attempt ${index + 1}`),
        title: { text: "Attempts", style: { fontWeight: "bold" } },
        labels: { style: { colors: "#757575", fontSize: "12px" } },
      },
      yaxis: [
        {
          title: {
            text: "Correct Answers",
            style: { color: "#12e91b", fontWeight: "bold" },
          },
          labels: { style: { colors: "#12e91b", fontSize: "12px" } },
          min: 0,
        },
        {
          opposite: true,
          title: {
            text: "Incorrect Answers",
            style: { color: "#f32c1e", fontWeight: "bold" },
          },
          labels: { style: { colors: "#f32c1e", fontSize: "12px" } },
          min: 0,
        },
      ],
      stroke: {
        curve: "smooth",
        width: 2,
      },
      markers: {
        size: 5,
        colors: ["#12e91b", "#f32c1e"],
      },
      colors: ["#12e91b", "#f32c1e"], // Green for Correct, Red for Incorrect
      tooltip: {
        shared: true,
        intersect: false,
        theme: "light",
        x: { format: "dd/MM/yy HH:mm" },
      },
    },
  };

  // Toggle the expandable section
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="max-w-full bg-white shadow rounded-lg p-6 my-4">
      <h2 className="text-2xl font-semibold text-blue-800 mb-4">
        Exam Overview
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overview Section */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Highest Score */}
            <div className="flex items-center bg-blue-100 p-4 rounded-lg shadow">
              <FaArrowUp className="text-blue-600 text-3xl mr-4" />
              <div>
                <p className="text-gray-600">Highest Score</p>
                <p className="text-xl font-bold text-blue-800">
                  {highestScore}
                </p>
              </div>
            </div>

            {/* Lowest Score */}
            <div className="flex items-center bg-red-100 p-4 rounded-lg shadow">
              <FaArrowDown className="text-red-600 text-3xl mr-4" />
              <div>
                <p className="text-gray-600">Lowest Score</p>
                <p className="text-xl font-bold text-red-800">{lowestScore}</p>
              </div>
            </div>

            {/* Average Time */}
            <div className="flex items-center bg-green-100 p-4 rounded-lg shadow">
              <FaClock className="text-green-600 text-3xl mr-4" />
              <div>
                <p className="text-gray-600">Average Time Per Exam</p>
                <p className="text-xl font-bold text-green-800">
                  {averageTime} minutes
                </p>
              </div>
            </div>

            {/* Average Accuracy */}
            <div className="flex items-center bg-yellow-100 p-4 rounded-lg shadow">
              <FaPercent className="text-yellow-600 text-3xl mr-4" />
              <div>
                <p className="text-gray-600">Average Accuracy</p>
                <p className="text-xl font-bold text-yellow-800">
                  {averageAccuracy}%
                </p>
              </div>
            </div>

            {/* Total Exams - Expandable */}
            <div
              className="flex flex-col bg-indigo-100 p-4 rounded-lg shadow cursor-pointer"
              onClick={toggleExpand}
            >
              <div className="flex items-center">
                <FaListAlt className="text-indigo-600 text-3xl mr-4" />
                <div>
                  <p className="text-gray-600">Total Exams</p>
                  <p className="text-xl font-bold text-indigo-800">
                    {totalExams}
                  </p>
                </div>
                <div className="ml-auto">
                  {isExpanded ? (
                    <FaChevronUp className="text-indigo-600 text-xl" />
                  ) : (
                    <FaChevronDown className="text-indigo-600 text-xl" />
                  )}
                </div>
              </div>

              {/* Expandable Content */}
              {isExpanded && (
                <div className="mt-4 bg-white rounded-lg shadow p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Attempts Per Exam
                  </h3>
                  <ul className="list-disc ml-6 text-gray-600">
                    {examsWithAttempts.map((exam) => (
                      <li key={exam.examId}>
                        Exam ID:{" "}
                        <span className="font-medium">{exam.examId}</span> -{" "}
                        <span className="text-blue-800 font-semibold">
                          {exam.attempts.length}
                        </span>{" "}
                        attempts
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Graph Section */}
        <div className="lg:col-span-1 mt-8 lg:mt-0">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">
            Attempts Graph
          </h3>
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="line"
            height={350}
            width="100%"
          />

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FaArrowLeft />
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamOverview;
