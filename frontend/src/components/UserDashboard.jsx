import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApexCharts from "react-apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import Loader from "./loader";
import Attempts from "./Attempts";
import CetResults from "./CetComponents/cetResults";

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
    navigate("/exams");
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
    <div className="p-2 bg-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800 flex items-center">
          <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
          Welcome, {username}
        </h1>
        <button
          className="flex items-center px-4 py-2 border-2 border-purple-500 text-purple-500 rounded-lg shadow-md hover:bg-purple-500 hover:text-white transition transform active:scale-95"
          onClick={home}
        >
          Exams
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

      <Attempts />
      <CetResults />
    </div>
  );
};

export default UserDashboard;
