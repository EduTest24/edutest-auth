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
import UserDataGraph from "./Dashboard/UserInfoTracker";
import UserExamOverview from "./Dashboard/UserExamOverview";

const UserInfoTracker = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(5); // Number of results per page
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" }); // Sorting state

  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://edutest-frontend.onrender.com/api/user/${username}`
        );
        setUserData(response.data.data);
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

  // Sorting function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedExams = userData ? userData.exams.slice() : [];

  if (sortConfig.key) {
    sortedExams.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  // Pagination logic
  const totalPages = userData
    ? Math.ceil(userData.exams.length / resultsPerPage)
    : 1;

  const currentExams = userData
    ? sortedExams.slice(
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
    <>
      <div className="max-w-full my-5">
        <h1 className="text-3xl font-semibold text-center mb-6 text-blue-800">
          Jee Mains Results
        </h1>
        <UserExamOverview userData={userData} />
        <div className="bg-white shadow rounded p-4 mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
            <FontAwesomeIcon icon={faTable} className="mr-2" />
            Attempts Analysis
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-blue-200">
              <thead>
                <tr className="bg-blue-100">
                  <th
                    className="p-2 border border-blue-300 cursor-pointer"
                    onClick={() => handleSort("examId")}
                  >
                    Exam
                  </th>
                  <th
                    className="p-2 border border-blue-300 cursor-pointer"
                    onClick={() => handleSort("attempt")}
                  >
                    Attempt
                  </th>
                  <th
                    className="p-2 border border-blue-300 cursor-pointer"
                    onClick={() => handleSort("score")}
                  >
                    Score
                  </th>
                  <th
                    className="p-2 border border-blue-300 cursor-pointer"
                    onClick={() => handleSort("correctAnswers")}
                  >
                    Correct
                  </th>
                  <th
                    className="p-2 border border-blue-300 cursor-pointer"
                    onClick={() => handleSort("incorrectAnswers")}
                  >
                    Incorrect
                  </th>
                  <th
                    className="p-2 border border-blue-300 cursor-pointer"
                    onClick={() => handleSort("markedQuestions")}
                  >
                    Marked
                  </th>
                  <th
                    className="p-2 border border-blue-300 cursor-pointer"
                    onClick={() => handleSort("skippedQuestions")}
                  >
                    Skipped
                  </th>
                  <th
                    className="p-2 border border-blue-300 cursor-pointer"
                    onClick={() => handleSort("timeTaken")}
                  >
                    Time(m)
                  </th>
                  <th
                    className="p-2 border border-blue-300 cursor-pointer"
                    onClick={() => handleSort("timestamp")}
                  >
                    Date
                  </th>
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
          </div>
          {/* Pagination Controls */}
          <div className="mt-4 flex justify-center items-center">
            <button
              className="px-4 py-2 border border-blue-300 rounded-l-lg bg-blue-100 hover:bg-blue-200"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <span className="mx-4 text-lg font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 border border-blue-300 rounded-r-lg bg-blue-100 hover:bg-blue-200"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfoTracker;
