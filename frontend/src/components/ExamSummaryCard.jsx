import React from "react";
import { FaTrophy, FaChartLine, FaUserCheck } from "react-icons/fa";

const ExamSummaryCard = ({ examData }) => {
  if (!examData) {
    return (
      <div className="p-6 border rounded-lg shadow-lg bg-white w-80">
        <p className="text-gray-500 text-center">No data available</p>
      </div>
    );
  }

  const { highestScore, lowestScore, examName, attempts, percentageChange } =
    examData;

  return (
    <div className="p-6 border rounded-xl shadow-sm bg-white w-80 hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{examName}</h2>
        <FaTrophy className="text-yellow-500 text-xl" />
      </div>

      {/* Stats */}
      <div className="space-y-4">
        {/* Highest Score */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Highest Score</p>
          <div className="flex items-center space-x-2">
            <FaChartLine className="text-green-500 text-sm" />
            <p className="font-medium text-gray-800">{highestScore}</p>
          </div>
        </div>

        {/* Lowest Score */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Lowest Score</p>
          <div className="flex items-center space-x-2">
            <FaChartLine className="text-red-500 text-sm" />
            <p className="font-medium text-gray-800">{lowestScore}</p>
          </div>
        </div>

        {/* Attempts */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Attempts</p>
          <div className="flex items-center space-x-2">
            <FaUserCheck className="text-blue-500 text-sm" />
            <p className="font-medium text-gray-800">{attempts}</p>
          </div>
        </div>

        {/* Percentage Change */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Score Change</p>
          <p
            className={`font-medium ${
              percentageChange > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {percentageChange !== "N/A" ? `${percentageChange}%` : "N/A"}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <p className="text-xs text-gray-500 mb-1">Performance Progress</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`${
              percentageChange > 0 ? "bg-green-500" : "bg-red-500"
            } h-2 rounded-full`}
            style={{ width: `${Math.max(percentageChange, 0)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ExamSummaryCard;
