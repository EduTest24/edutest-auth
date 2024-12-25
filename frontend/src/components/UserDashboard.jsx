import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApexCharts from "react-apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSearch,
  faChartLine,
  faTable,
  faArrowLeft,
  faArrowRight,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import ExamSummaryCard from "./ExamSummaryCard";
import Loader from "./loader";

const UserDashboard = () => {
  const [userResults, setUserResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(5);
  const [examData, setExamData] = useState([]);
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false,
        },
      },
      title: {
        text: "Your Exam Progress",
        align: "center",
        style: {
          fontSize: "20px",
          color: "#1D4ED8", // Blue
        },
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: "Score",
        },
        min: 0,
        max: 100,
      },
      markers: {
        size: 5,
        colors: "#2563EB", // Blue
        strokeColor: "#fff",
        strokeWidth: 2,
        hover: {
          size: 8,
        },
      },
      stroke: {
        curve: "smooth",
        width: 3,
        colors: ["#2563EB"], // Blue
      },
      fill: {
        type: "solid",
        opacity: 0.1,
        colors: ["#BFDBFE"], // Light Blue
      },
      tooltip: {
        enabled: true,
        shared: true,
        followCursor: true,
        theme: "dark",
      },
    },
  });

  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/auth");
  }

  useEffect(() => {
    if (username) {
      fetchUserResults();
    }
  }, [username]);

  const fetchUserResults = async () => {
    try {
      const response = await axios.get(
        `https://edutest-frontend.onrender.com/api/exam/results/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserResults(response.data);
      setLoading(false);
      formatChartData(response.data);
      const processedData = processExamData(response.data);
      setExamData(processedData);
    } catch (error) {
      console.error("Error fetching exam results:", error);
      setLoading(false);
    }
  };

  const formatChartData = (data) => {
    const categories = data.map((result) => result.examName);
    const series = [
      {
        name: "Score",
        data: data.map((result) => result.score),
      },
    ];

    setChartData({
      ...chartData,
      series,
      options: {
        ...chartData.options,
        xaxis: {
          categories,
        },
      },
    });
  };

  const calculateTotalTime = (timeArray) => {
    const totalTimeInSeconds = timeArray
      .filter((time) => time !== null)
      .reduce((acc, curr) => acc + parseFloat(curr), 0);

    const totalTimeInMinutes = (totalTimeInSeconds / 60).toFixed(2);
    return totalTimeInMinutes;
  };

  const home = () => {
    navigate("/");
  };

  const filteredResults = userResults.filter((result) =>
    result.examName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to process exam data (grouping data by exam name)
  const processExamData = (data) => {
    if (!data || data.length === 0) return null;

    // Function to calculate the score based on correct and incorrect answers
    const calculateScore = (correctAnswers, incorrectAnswers) => {
      const correctScore = correctAnswers.length * 4; // +4 for each correct answer
      const incorrectScore = incorrectAnswers.length * -1; // -1 for each incorrect answer
      return correctScore + incorrectScore;
    };

    // Map through data and add a computed score property to each exam
    const processedData = data.map((exam) => ({
      ...exam,
      computedScore: calculateScore(exam.correctAnswers, exam.incorrectAnswers),
    }));

    // Sort data by timestamp to identify the most recent tests
    const sortedData = [...processedData].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    // Calculate the highest and lowest scores
    const scores = sortedData.map((exam) => exam.computedScore);
    const highestScore = Math.max(...scores);
    const lowestScore = Math.min(...scores);

    // Get the exam name (assumes all exams are of the same type)
    const examName = sortedData[0].examName;

    // Calculate the number of attempts
    const attempts = sortedData.length;

    // Calculate percentage change between last two scores
    const lastScore = sortedData[sortedData.length - 1]?.computedScore || 0;
    const secondLastScore =
      sortedData[sortedData.length - 2]?.computedScore || 0;
    const percentageChange =
      secondLastScore !== 0
        ? (
            ((lastScore - secondLastScore) / Math.abs(secondLastScore)) *
            100
          ).toFixed(2)
        : "N/A"; // Avoid division by zero

    return { highestScore, lowestScore, examName, attempts, percentageChange };
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800 flex items-center">
          <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
          Welcome, {username}
        </h1>
        <button
          onClick={home}
          className="bg-blue-600 text-white py-2 px-2 rounded hover:bg-blue-700 flex items-center"
        >
          <FontAwesomeIcon icon={faHome} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute top-1/2 left-3 transform -translate-y-1/2 text-blue-500"
        />
        <input
          type="text"
          placeholder="Search exams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Render the ExamOverviewCard for each exam */}
      <div className="flex flex-wrap justify-center gap-6 mb-4">
        <ExamSummaryCard examData={examData} />
      </div>

      {/* Results Table */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
          <FontAwesomeIcon icon={faTable} className="mr-2" />
          Exam Results
        </h2>
        {userResults.length === 0 ? (
          <p className="text-gray-600">No exam results found.</p>
        ) : (
          <>
            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-blue-200">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="p-2 border border-blue-300">Exam Name</th>
                    <th className="p-2 border border-blue-300">Score</th>
                    <th className="p-2 border border-blue-300">Correct</th>
                    <th className="p-2 border border-blue-300">Incorrect</th>
                    <th className="p-2 border border-blue-300">Skipped</th>
                    <th className="p-2 border border-blue-300">Time (m)</th>
                    <th className="p-2 border border-blue-300">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentResults.map((result) => (
                    <tr key={result._id} className="hover:bg-blue-50">
                      <td className="p-2 border border-blue-300">
                        {result.examName}
                      </td>
                      <td className="p-2 border border-blue-300">
                        {result.score}
                      </td>
                      <td className="p-2 border border-blue-300">
                        {result.correctAnswers.length}
                      </td>
                      <td className="p-2 border border-blue-300">
                        {result.incorrectAnswers.length}
                      </td>
                      <td className="p-2 border border-blue-300">
                        {result.skippedQuestions.length}
                      </td>
                      <td className="p-2 border border-blue-300">
                        {calculateTotalTime(result.timeTaken)}
                      </td>
                      <td className="p-2 border border-blue-300">
                        {new Date(result.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-center items-center">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-200 rounded hover:bg-blue-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-200 rounded hover:bg-blue-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Chart */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
          <FontAwesomeIcon icon={faChartLine} className="mr-2" />
          Exam Progress
        </h2>
        <div>
          <ApexCharts
            options={chartData.options}
            series={chartData.series}
            type="line"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
