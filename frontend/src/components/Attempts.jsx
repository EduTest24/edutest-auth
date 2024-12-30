import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
} from "react-icons/fa"; // Icons for UI
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const UserInfoTracker = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(5); // Number of results per page

  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://edutest-frontend.onrender.com/api/user/${username}`
        );
        setUserData(response.data.data); // Assuming the data is returned in `data.data`
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const formatExamId = (examId) => {
    // Ensure the examId is treated as a string
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

  const convertTimeToMinutes = (timeInSeconds) => {
    return (timeInSeconds / 60).toFixed(2); // Convert seconds to minutes with 2 decimal places
  };

  // Pagination logic
  const totalPages = userData
    ? Math.ceil(userData.exams.length / resultsPerPage)
    : 1;

  const currentExams = userData
    ? userData.exams.slice(
        (currentPage - 1) * resultsPerPage,
        currentPage * resultsPerPage
      )
    : [];

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent out-of-bound navigation
    setCurrentPage(page);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  if (!userData || !userData.exams || userData.exams.length === 0) {
    return <div className="text-center mt-10">No exam data available.</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-6 text-blue-800">
        Year Wise Mock Tests Results
      </h1>
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
          <FontAwesomeIcon icon={faTable} className="mr-2" />
          Attempts Analysis
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-blue-200">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-2 border border-blue-300">Exam</th>
                <th className="p-2 border border-blue-300">Attempt</th>
                <th className="p-2 border border-blue-300">Score</th>
                <th className="p-2 border border-blue-300">Correct</th>
                <th className="p-2 border border-blue-300">Incorrect</th>
                <th className="p-2 border border-blue-300">Marked</th>
                <th className="p-2 border border-blue-300">Skipped</th>
                <th className="p-2 border border-blue-300">Time(m)</th>
                <th className="p-2 border border-blue-300">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentExams.map((exam) =>
                exam.attempts.map((attempt, attemptIndex) => {
                  const totalTime = attempt.timeTaken.reduce(
                    (acc, time) => acc + time,
                    0
                  );
                  const totalTimeInMinutes = convertTimeToMinutes(totalTime);
                  return (
                    <tr
                      key={`${exam.examId}-${attempt.attemptId}`}
                      className="even:bg-gray-50 hover:bg-gray-100"
                    >
                      <td className="border px-6 py-3 text-sm font-medium text-gray-700">
                        {formatExamId(exam.examId)}
                      </td>
                      <td className="border px-6 py-3 text-sm font-medium text-gray-700">
                        Attempt {attemptIndex + 1}
                      </td>
                      <td className="border px-6 py-3 text-sm font-medium text-gray-700">
                        {attempt.score}
                      </td>
                      <td className="border px-6 py-3 text-sm font-medium text-gray-600">
                        {attempt.correctAnswers.length}
                      </td>
                      <td className="border px-6 py-3 text-sm font-medium text-gray-600">
                        {attempt.incorrectAnswers.length}
                      </td>
                      <td className="border px-6 py-3 text-sm font-medium text-gray-600">
                        {attempt.markedQuestions.length}
                      </td>
                      <td className="border px-6 py-3 text-sm font-medium text-gray-600">
                        {attempt.skippedQuestions.length}
                      </td>
                      <td className="border px-6 py-3 text-sm font-medium text-gray-700">
                        {totalTimeInMinutes} minutes
                      </td>
                      <td className="border px-6 py-3 text-sm font-medium text-gray-700">
                        {new Date(attempt.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>{" "}
        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-200 rounded hover:bg-blue-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-200 rounded hover:bg-blue-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoTracker;
