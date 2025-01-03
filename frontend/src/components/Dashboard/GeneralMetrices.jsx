import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

const ExamResults = ({ username }) => {
  const [examResults, setExamResults] = useState(null);
  const [activeExamId, setActiveExamId] = useState(null);

  useEffect(() => {
    // Fetching data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://edutest-frontend.onrender.com/api/exam/mhtcet/results/${username}`
        );
        setExamResults(response.data);
      } catch (error) {
        console.error("Error fetching exam results:", error);
      }
    };

    fetchData();
  }, [username]);

  const toggleExamDetails = (examId) => {
    if (activeExamId === examId) {
      setActiveExamId(null); // Collapse the section
    } else {
      setActiveExamId(examId); // Expand the section
    }
  };

  if (!examResults) {
    return (
      <div className="text-center text-lg text-gray-600 py-6">
        Loading exam results...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-semibold text-blue-600 mb-4">
          Your Exam Performance
        </h2>
        <p className="text-lg text-gray-600">
          Here’s a detailed breakdown of your MHTCET exam results.
        </p>
      </div>

      {/* Exam Details with Collapsible Sections */}
      {examResults.map((exam) => (
        <div key={exam.examId} className="mb-6">
          {/* Collapsible Exam Section (Full-width) */}
          <div
            className="bg-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition duration-300"
            onClick={() => toggleExamDetails(exam.examId)}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-2xl font-bold text-blue-600">
                Exam ID: {exam.examId}
              </h4>
              <div className="flex items-center">
                <FaStar className="text-yellow-500 text-xl mr-2" />
                <p className="text-lg font-semibold text-green-600">
                  {exam.bestScore}
                </p>
                <span className="ml-4">
                  {activeExamId === exam.examId ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Collapsible Content for Exam Attempts (Tabular Data) */}
          {activeExamId === exam.examId && (
            <div className="bg-gray-100 p-6 mt-4 rounded-lg shadow-md">
              {/* Table for Attempt Details */}
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="py-3 px-6 text-left">Attempt #</th>
                    <th className="py-3 px-6 text-left">Score</th>
                    <th className="py-3 px-6 text-left">Time Taken</th>
                    <th className="py-3 px-6 text-left">Correct Answers</th>
                    <th className="py-3 px-6 text-left">Incorrect Answers</th>
                    <th className="py-3 px-6 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {exam.attempts.map((attempt, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-6">{index + 1}</td>
                      <td className="py-3 px-6 text-green-600 font-semibold">
                        {attempt.score}
                      </td>
                      <td className="py-3 px-6">
                        {attempt.timeTaken.reduce((sum, time) => sum + time, 0)}{" "}
                        seconds
                      </td>
                      <td className="py-3 px-6">
                        {attempt.correctAnswers.length}
                      </td>
                      <td className="py-3 px-6">
                        {attempt.incorrectAnswers.length}
                      </td>
                      <td className="py-3 px-6 flex space-x-2">
                        <FaCheckCircle className="text-green-500 cursor-pointer" />
                        <FaTimesCircle className="text-red-500 cursor-pointer" />
                        <FaClock className="text-gray-500 cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExamResults;
