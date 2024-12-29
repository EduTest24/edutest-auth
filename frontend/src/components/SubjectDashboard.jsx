import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBars, FaTimes } from "react-icons/fa";

const API_URL = "https://edutest-frontend.onrender.com/api/exam/jeemain";

const SubjectDashboard = () => {
  const [data, setData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [activeSubject, setActiveSubject] = useState("");
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [defaultTimePerQuestion, setDefaultTimePerQuestion] = useState(2); // Default timing in minutes
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();

        // Process unique subjects and chapters
        const groupedData = result.reduce((acc, question) => {
          const { subject, chapters } = question;
          if (!acc[subject]) acc[subject] = {};
          chapters.forEach((chapter) => {
            if (!acc[subject][chapter]) acc[subject][chapter] = [];
            acc[subject][chapter].push(question);
          });
          return acc;
        }, {});

        setData(groupedData);
        setSubjects(Object.keys(groupedData));
        setActiveSubject(Object.keys(groupedData)[0]); // Set the first subject as active
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle chapter selection
  const toggleChapterSelection = (chapter) => {
    setSelectedChapters(
      (prev) =>
        prev.includes(chapter)
          ? prev.filter((ch) => ch !== chapter) // Remove chapter if already selected
          : [...prev, chapter] // Add chapter if not selected
    );
  };

  // Handle "Select All" functionality
  const selectAllChapters = () => {
    const allChapters = Object.keys(data[activeSubject] || {});
    setSelectedChapters(allChapters);
  };

  // Start Test based on selected chapters
  const handleStartTest = () => {
    const questions = selectedChapters.flatMap(
      (chapter) => data[activeSubject][chapter] || []
    );
    navigate("/jeemain", {
      state: { questions, defaultTimePerQuestion },
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Main Header */}
      <div className="flex justify-between items-center bg-blue-500 text-white py-4 px-6 shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
        >
          <FaArrowLeft className="inline-block mr-2" /> Back
        </button>
        <button
          className="lg:hidden text-white text-xl"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sub-header: Subject Tabs */}
      <div className="bg-gray-200 py-2 shadow-sm">
        <div className="flex overflow-x-auto">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => {
                setActiveSubject(subject);
                setSelectedChapters([]); // Reset selected chapters
              }}
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
        {/* Sidebar */}
        <div
          className={`md:w-1/4 bg-white shadow-lg overflow-y-auto transition-all duration-300 ease-in-out transform ${
            isSidebarOpen ? "translate-x-0 w-full" : "-translate-x-full w-0"
          } md:translate-x-0`}
        >
          <h2 className="text-lg font-bold px-4 py-3 border-b bg-gray-100 flex justify-between">
            {activeSubject} Chapters
            <button
              onClick={selectAllChapters}
              className="text-sm font-semibold bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
            >
              Select All
            </button>
          </h2>
          <ul className="divide-y">
            {Object.entries(data[activeSubject] || {}).map(
              ([chapter, questions]) => (
                <li
                  key={chapter}
                  className="flex justify-between items-center px-4 py-2 hover:bg-gray-50"
                >
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedChapters.includes(chapter)}
                      onChange={() => toggleChapterSelection(chapter)}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium">{chapter}</span>
                  </label>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    {questions.length}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Main Section */}
        <div
          className={`flex-grow bg-gray-50 p-6 transition-all duration-300 ${
            isSidebarOpen ? "w-0" : "w-full"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Subject Overview</h1>
            <button
              onClick={handleStartTest}
              className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600"
              disabled={selectedChapters.length === 0}
            >
              Start Test
            </button>
          </div>

          <div className="flex items-center mb-4">
            <label
              htmlFor="timePerQuestion"
              className="mr-2 text-sm font-semibold"
            >
              Time per Question (mins):
            </label>
            <input
              id="timePerQuestion"
              type="number"
              value={defaultTimePerQuestion}
              onChange={(e) =>
                setDefaultTimePerQuestion(Number(e.target.value))
              }
              className="border border-gray-300 rounded px-2 py-1 w-20"
              min="1"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(data[activeSubject] || {}).map(
              ([chapter, questions]) => (
                <div
                  key={chapter}
                  className={`bg-white shadow-md p-4 rounded-lg border ${
                    selectedChapters.includes(chapter)
                      ? "border-blue-500"
                      : "hover:border-gray-300"
                  } transition`}
                >
                  <h3 className="text-lg font-semibold mb-2">{chapter}</h3>
                  <p className="text-sm text-gray-600">
                    Number of Questions: {questions.length}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDashboard;
