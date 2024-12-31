import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const ExamResults = () => {
  const [results, setResults] = useState([]); // Store fetched exam results
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage] = useState(10); // Number of items per page

  const username = localStorage.getItem("username"); // Retrieve the username from local storage

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Fetch exam results from the backend using the username
        const response = await axios.get(
          `https://edutest-frontend.onrender.com/api/exam/mhtcet/results/${username}`
        );
        setResults(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching exam results:", err);
        setError("Failed to fetch results. Please try again.");
        setLoading(false);
      }
    };

    fetchResults();
  }, [username]);

  // Function to format exam ID into Date and Shift
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

  // Function to calculate the total time taken
  const calculateTotalTime = (timeTaken) => {
    const totalTimeInSeconds = timeTaken.reduce((acc, time) => acc + time, 0);
    return (totalTimeInSeconds / 60).toFixed(2); // Convert seconds to minutes with 2 decimal places
  };

  // Calculate paginated results
  const paginatedResults = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page navigation
  const nextPage = () => {
    if (currentPage < Math.ceil(results.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading exam results...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-center text-blue-800 mb-6">
        MHTCET Results
      </h1>

      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
          <FontAwesomeIcon icon={faTable} className="mr-2" />
          Attempts Analysis
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-blue-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-2 border border-blue-300">Exam ID (Date)</th>
                <th className="p-2 border border-blue-300">Score</th>
                <th className="p-2 border border-blue-300">Correct</th>
                <th className="p-2 border border-blue-300">Incorrect</th>
                <th className="p-2 border border-blue-300">Marked</th>
                <th className="p-2 border border-blue-300">Reviewed</th>
                <th className="p-2 border border-blue-300">Skipped</th>
                <th className="p-2 border border-blue-300">Time(m)</th>
                <th className="p-2 border border-blue-300">Date</th>
              </tr>
            </thead>
            <tbody>
              {paginatedResults.map((exam) => (
                <React.Fragment key={exam.examId}>
                  {exam.attempts.map((attempt, index) => {
                    const totalTime = calculateTotalTime(attempt.timeTaken);
                    return (
                      <tr
                        key={index}
                        className="even:bg-gray-50 hover:bg-gray-100"
                      >
                        <td className="border px-6 py-3 text-sm font-medium text-gray-700">
                          {formatExamId(exam.examId)}
                        </td>
                        <td className="border px-6 py-3 text-sm font-medium text-gray-700">
                          {attempt.score}
                        </td>
                        <td className="border px-6 py-3 text-sm font-medium text-gray-700">
                          {attempt.correctAnswers.length}
                        </td>
                        <td className="border px-6 py-3 text-sm font-medium text-gray-700">
                          {attempt.incorrectAnswers.length}
                        </td>
                        <td className="border px-6 py-3 text-sm font-medium text-gray-700">
                          {attempt.markedQuestions.length}
                        </td>
                        <td className="border px-6 py-3 text-sm font-medium text-gray-700">
                          {attempt.reviewedQuestions.length}
                        </td>
                        <td className="border px-6 py-3 text-sm font-medium text-gray-700">
                          {attempt.skippedQuestions.length}
                        </td>
                        <td className="border px-6 py-3 text-sm font-medium text-gray-700">
                          {totalTime}
                        </td>
                        <td className="border px-6 py-3 text-sm font-medium text-gray-700">
                          {new Date(attempt.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center items-center">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 flex items-center"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <span className="text-lg px-4 py-2">
            Page {currentPage} of {Math.ceil(results.length / itemsPerPage)}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === Math.ceil(results.length / itemsPerPage)}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 flex items-center"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamResults;
