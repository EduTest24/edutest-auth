import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { FaArrowLeft, FaArrowRight, FaChartBar } from "react-icons/fa";

const UserDataGraph = ({ userData }) => {
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const attemptsPerPage = 5; // Number of attempts per page

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "line", // Line chart for smooth representation
        height: 350,
        zoom: {
          enabled: true,
          type: "x", // Horizontal zoom
        },
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          color: "#263238",
        },
      },
      xaxis: {
        categories: [],
        title: {
          text: "Attempts",
        },
      },
      yaxis: [
        {
          title: {
            text: "Scores",
          },
        },
        {
          opposite: true,
          title: {
            text: "Total Time (minutes)",
          },
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
      },
      markers: {
        size: 4,
        colors: ["#2196F3", "#F44336"],
      },
      legend: {
        position: "top",
        horizontalAlign: "center",
      },
    },
  });

  useEffect(() => {
    if (userData) {
      const scores = [];
      const totalTime = [];
      const attempts = [];

      userData.exams.forEach((exam) => {
        exam.attempts.forEach((attempt, attemptIndex) => {
          const totalAttemptTime = attempt.timeTaken.reduce(
            (acc, time) => acc + time,
            0
          );
          const totalAttemptTimeInMinutes = (totalAttemptTime / 60).toFixed(2);

          scores.push(attempt.score);
          totalTime.push(totalAttemptTimeInMinutes);
          attempts.push(
            `Attempt ${attemptIndex + 1} - ${formatExamId(exam.examId)}`
          );
        });
      });

      // Paginate the data
      const paginatedScores = scores.slice(
        currentPage * attemptsPerPage,
        (currentPage + 1) * attemptsPerPage
      );
      const paginatedTime = totalTime.slice(
        currentPage * attemptsPerPage,
        (currentPage + 1) * attemptsPerPage
      );
      const paginatedAttempts = attempts.slice(
        currentPage * attemptsPerPage,
        (currentPage + 1) * attemptsPerPage
      );

      setChartData({
        ...chartData,
        series: [
          {
            name: "Scores",
            data: paginatedScores,
          },
          {
            name: "Total Time (minutes)",
            data: paginatedTime,
          },
        ],
        options: {
          ...chartData.options,
          xaxis: {
            categories: paginatedAttempts,
          },
        },
      });
    }
  }, [userData, currentPage]);

  // Helper function to format the exam date
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

  return (
    <div className="bg-white shadow rounded py-6">
      <div className="flex justify-center">
        <div className="w-full">
          <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center">
            Scores vs Time per Attempt
          </h3>
          <ApexCharts
            options={chartData.options}
            series={chartData.series}
            type="line"
            height={350}
          />
        </div>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              (prev + 1) * attemptsPerPage <
              userData.exams.reduce(
                (acc, exam) => acc + exam.attempts.length,
                0
              )
                ? prev + 1
                : prev
            )
          }
          disabled={
            (currentPage + 1) * attemptsPerPage >=
            userData.exams.reduce((acc, exam) => acc + exam.attempts.length, 0)
          }
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default UserDataGraph;
