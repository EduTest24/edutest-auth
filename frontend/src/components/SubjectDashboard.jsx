import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { FaArrowLeft, FaBars, FaCross, FaTimes } from "react-icons/fa"; // Importing icons

// Sample Data
const sampleData = [
  {
    subject: "Mathematics",
    chapters: [
      {
        chapterName: "Calculus",
        questions: ["Q1", "Q2", "Q3", "Q4", "Q5"],
      },
      {
        chapterName: "Algebra",
        questions: ["Q1", "Q2", "Q3", "Q4"],
      },
    ],
  },
  {
    subject: "Physics",
    chapters: [
      {
        chapterName: "Mechanics",
        questions: ["Q1", "Q2", "Q3"],
      },
      {
        chapterName: "Thermodynamics",
        questions: ["Q1", "Q2"],
      },
    ],
  },
  {
    subject: "Chemistry",
    chapters: [
      {
        chapterName: "Organic Chemistry",
        questions: ["Q1", "Q2", "Q3", "Q4"],
      },
      {
        chapterName: "Inorganic Chemistry",
        questions: ["Q1", "Q2", "Q3"],
      },
    ],
  },
];

const SubjectDashboard = () => {
  // Extract unique subjects from the sample data
  const subjects = [...new Set(sampleData.map((item) => item.subject))];

  // State for active subject and sidebar visibility
  const [activeSubject, setActiveSubject] = useState(subjects[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Navigation hook
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Main Header: Back and Sidebar Buttons */}
      <div className="flex justify-between items-center bg-blue-500 text-white py-4 px-6 shadow-md">
        <button
          onClick={() => navigate(-1)} // Navigate back to previous route
          className="text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
        >
          <FaArrowLeft className="inline-block mr-2" /> Back
        </button>
        <button
          className="lg:hidden text-white text-xl"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle sidebar visibility on small screens
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sub-header: Subject Tabs (Chrome-like tabs design) */}
      <div className="bg-gray-200 py-2 shadow-sm">
        <div className="flex overflow-x-auto">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => setActiveSubject(subject)}
              className={`px-6 py-2 text-sm font-semibold transition-colors duration-300 focus:outline-none ${
                activeSubject === subject
                  ? "bg-blue-600 text-white rounded-t-lg"
                  : "bg-gray-300 text-blue-500 rounded-t-lg hover:bg-blue-100"
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-grow">
        {/* Sidebar: Chapter List */}
        <div
          className={`md:w-1/4 bg-white shadow-lg overflow-y-auto transition-all duration-300 ease-in-out transform ${
            isSidebarOpen ? "translate-x-0 w-full" : "-translate-x-full w-0"
          } md:translate-x-0`}
        >
          <h2 className="text-lg font-bold px-4 py-3 border-b bg-gray-100">
            {activeSubject} Chapters
          </h2>
          <ul className="divide-y">
            {sampleData
              .find((item) => item.subject === activeSubject)
              ?.chapters.map((chapter) => (
                <li
                  key={chapter.chapterName}
                  className="flex justify-between items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <span className="text-sm font-medium">
                    {chapter.chapterName}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    {chapter.questions.length} questions
                  </span>
                </li>
              ))}
          </ul>
        </div>

        {/* Main Section: Subject Details */}
        <div
          className={`flex-grow bg-gray-50 p-6 transition-all duration-300 ${
            isSidebarOpen ? "w-0" : "w-full"
          }`}
        >
          <h1 className="text-2xl font-bold mb-4">{activeSubject} Overview</h1>

          {/* Display chapter stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleData
              .find((item) => item.subject === activeSubject)
              ?.chapters.map((chapter) => (
                <div
                  key={chapter.chapterName}
                  className="bg-white shadow-md p-4 rounded-lg border hover:border-blue-500 transition"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {chapter.chapterName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Number of Questions: {chapter.questions.length}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDashboard;
