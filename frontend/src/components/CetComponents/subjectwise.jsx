import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAtom,
  faFlask,
  faSquareRootAlt,
} from "@fortawesome/free-solid-svg-icons";

const SubjectSelectionSection = () => {
  const [selectedSubject, setSelectedSubject] = useState(null); // Selected subject
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [testData, setTestData] = useState(null); // Fetched test data

  const navigate = useNavigate();

  // Subject options with Font Awesome icons
  const subjects = [
    {
      name: "Physics",
      id: "Physics",
      icon: faAtom, // Font Awesome icon
      color: "bg-indigo-100",
      hoverColor: "hover:bg-indigo-200",
    },
    {
      name: "Chemistry",
      id: "Chemistry",
      icon: faFlask, // Font Awesome icon
      color: "bg-yellow-100",
      hoverColor: "hover:bg-yellow-200",
    },
    {
      name: "Mathematics",
      id: "Maths",
      icon: faSquareRootAlt, // Font Awesome icon
      color: "bg-green-100",
      hoverColor: "hover:bg-green-200",
    },
  ];

  const handleSubjectSelect = async (subject) => {
    setSelectedSubject(subject);
    setLoading(true);
    setError(null);

    try {
      // Fetch data from the backend
      const response = await axios.get(
        `https://edutest-frontend.onrender.com/api/exam/mhtcet/subject/${subject.id}`
      );
      setTestData(response.data); // Set the fetched data
    } catch (err) {
      console.error("Error fetching test data:", err);
      setError(
        "Failed to fetch data for the selected subject. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStartTest = () => {
    if (testData) {
      // Pass test data to the next route
      navigate("/mhtcet", { state: { questions: testData } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Select a <span className="text-blue-500">Subject</span> to Start the
        Test
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className={`p-6 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg cursor-pointer ${
              subject.color
            } ${subject.hoverColor} ${
              selectedSubject?.id === subject.id ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => handleSubjectSelect(subject)}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-full text-white text-3xl bg-gradient-to-r from-blue-400 to-purple-500 shadow-md`}
              >
                <FontAwesomeIcon icon={subject.icon} />
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                {subject.name}
              </h2>
              <p className="mt-2 text-gray-600">
                Prepare for {subject.name} with topic-wise questions.
              </p>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="text-center text-blue-500 font-medium mt-6">
          Loading questions for {selectedSubject?.name}...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 font-medium mt-6">{error}</div>
      )}

      {testData && (
        <div className="text-center mt-10">
          <h2 className="text-lg font-medium text-gray-700">
            Questions for {selectedSubject?.name} are ready!
          </h2>
          <button
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-full font-medium shadow-md hover:bg-blue-600 transition"
            onClick={handleStartTest}
          >
            Start Test
          </button>
        </div>
      )}

      {!loading && !error && !testData && selectedSubject && (
        <div className="text-center text-gray-600 mt-4">
          Fetching questions for {selectedSubject.name}...
        </div>
      )}
    </div>
  );
};

export default SubjectSelectionSection;
