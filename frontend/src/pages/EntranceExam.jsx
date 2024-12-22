import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
const EntranceExamDashboard = () => {
  // State for filtering
  const [examType, setExamType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [year, setYear] = useState("");

  // Sample exam data
  const exams = [
    {
      id: 1,
      name: "JEE Mains",
      examType: "Engineering",
      difficulty: "Moderate",
      year: 2023,
      totalQuestions: 90,
      duration: "3 hours",
    },
    {
      id: 2,
      name: "NEET",
      examType: "Medical",
      difficulty: "Hard",
      year: 2023,
      totalQuestions: 180,
      duration: "3 hours 20 minutes",
    },
    {
      id: 3,
      name: "CLAT",
      examType: "Law",
      difficulty: "Easy",
      year: 2022,
      totalQuestions: 150,
      duration: "2 hours",
    },
    {
      id: 4,
      name: "JEE Advanced",
      examType: "Engineering",
      difficulty: "Hard",
      year: 2022,
      totalQuestions: 56,
      duration: "3 hours",
    },
  ];

  // Filter exams based on selected filters
  const filteredExams = exams.filter((exam) => {
    return (
      (examType ? exam.examType === examType : true) &&
      (difficulty ? exam.difficulty === difficulty : true) &&
      (year ? exam.year.toString() === year : true)
    );
  });

  return (
    <>
      <Header />
      <div className="flex bg-gray-100 h-screen">
        {/* Sidebar for filters */}
        <div className="w-64 bg-white p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Filter Exams</h2>

          {/* Exam Type Filter */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Exam Type</label>
            <select
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
            >
              <option value="">All</option>
              <option value="Engineering">Engineering</option>
              <option value="Medical">Medical</option>
              <option value="Law">Law</option>
            </select>
          </div>

          {/* Difficulty Level Filter */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700">
              Difficulty Level
            </label>
            <select
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">All</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Year Filter */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Year</label>
            <select
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">All</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>
        </div>

        {/* Main Content - Exam Cards */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-6">Entrance Exams</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map((exam) => (
              <div key={exam.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">
                  {exam.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Exam Type: {exam.examType}
                </p>
                <p className="text-sm text-gray-500">
                  Difficulty: {exam.difficulty}
                </p>
                <p className="text-sm text-gray-500">Year: {exam.year}</p>
                <p className="text-sm text-gray-500">
                  Total Questions: {exam.totalQuestions}
                </p>
                <p className="text-sm text-gray-500">
                  Duration: {exam.duration}
                </p>

                <div className="mt-4 flex justify-between">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    Start Mock Test
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    View Study Material
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EntranceExamDashboard;
