import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const JeeMainExam = () => {
  const [filters, setFilters] = useState({ subject: "" });
  const [examData, setExamData] = useState([]); // Holds filtered questions
  const [loading, setLoading] = useState(false); // Loading state for fetching questions
  const navigate = useNavigate();

  const fetchFilteredData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://edutest-frontend.onrender.com/api/filter",
        { subject: filters.subject }
      );
      setExamData(response.data || []);
    } catch (error) {
      console.error("Error fetching filtered data", error);
      setExamData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectChange = (e) => {
    setFilters({ subject: e.target.value });
  };

  const handleStartTest = () => {
    navigate("/jeemain", { state: { questions: examData } }); // Navigate to /jeemain with data
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Filter Questions
          </h2>
          <p className="text-gray-600 mb-6">
            Select a subject to filter the questions and start your mock test.
          </p>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="subject"
            >
              Select Subject
            </label>
            <select
              id="subject"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              onChange={handleSubjectChange}
              value={filters.subject}
            >
              <option value="">All Subjects</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
            </select>
          </div>
          <button
            className={`w-full bg-blue-500 text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={fetchFilteredData}
            disabled={loading}
          >
            {loading ? "Loading Questions..." : "Get Questions"}
          </button>
        </div>

        {examData.length > 0 && (
          <div className="flex justify-center">
            <button
              onClick={handleStartTest}
              className="bg-green-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-600 transition"
            >
              Start Test
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default JeeMainExam;
