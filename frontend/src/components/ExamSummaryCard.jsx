import React, { useState } from "react";
import {
  FaTrophy,
  FaChartLine,
  FaUserCheck,
  FaInfoCircle,
} from "react-icons/fa";
import Modal from "react-modal"; // import modal component

// Make sure to set up the modal root in the index.html
Modal.setAppElement("#root");

const ExamSummaryCard = ({ examData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  if (!examData) {
    return (
      <div className="p-6 border rounded-lg shadow-lg bg-white w-80">
        <p className="text-gray-500 text-center">No data available</p>
      </div>
    );
  }

  const { highestScore, lowestScore, examName, attempts, percentageChange } =
    examData;

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

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

        {/* Percentage Change with Info Icon */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Score Change</p>
          <div className="flex items-center space-x-2">
            <p
              className={`font-medium ${
                percentageChange > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {percentageChange !== "N/A" ? `${percentageChange}%` : "N/A"}
            </p>
            <FaInfoCircle
              className="text-gray-500 cursor-pointer"
              onClick={openModal}
            />
          </div>
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

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Score Change Explanation
          </h2>
          <p className="mt-4 text-gray-600">
            Score change is calculated based on the difference between the most
            recent two exam scores.
          </p>
          <div className="mt-6">
            <button
              onClick={closeModal}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ExamSummaryCard;
