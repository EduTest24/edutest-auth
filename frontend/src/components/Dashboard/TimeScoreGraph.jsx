import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const TimeScoreGraph = ({ results }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const attemptsPerPage = 5;

  const graphData = results.flatMap((exam) =>
    exam.attempts.map((attempt) => ({
      score: attempt.score,
      time: attempt.timeTaken.reduce((acc, time) => acc + time, 0) / 60, // Convert seconds to minutes
      date: new Date(attempt.timestamp).toLocaleDateString(),
    }))
  );

  // Paginated data
  const paginatedData = graphData.slice(
    currentPage * attemptsPerPage,
    (currentPage + 1) * attemptsPerPage
  );

  const dates = paginatedData.map((entry) => entry.date);
  const scores = paginatedData.map((entry) => entry.score);
  const times = paginatedData.map((entry) => entry.time.toFixed(2));

  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
      zoom: {
        enabled: true,
        type: "x",
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    title: {
      text: "Time vs Score Analysis",
      align: "center",
    },
    xaxis: {
      categories: dates,
      title: {
        text: "Date",
      },
    },
    yaxis: [
      {
        title: {
          text: "Score",
        },
      },
      {
        opposite: true,
        title: {
          text: "Time (Minutes)",
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
    },
    markers: {
      size: 5,
      colors: ["#2196F3", "#F44336"],
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
  };

  const series = [
    {
      name: "Score",
      data: scores,
    },
    {
      name: "Time (Minutes)",
      data: times,
    },
  ];

  return (
    <div className="max-w-full my-6 bg-white shadow py-4 rounded">
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="line"
        height={350}
      />
      <div className="flex justify-center mt-4 space-x-2">
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
              (prev + 1) * attemptsPerPage < graphData.length ? prev + 1 : prev
            )
          }
          disabled={(currentPage + 1) * attemptsPerPage >= graphData.length}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default TimeScoreGraph;
