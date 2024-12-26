import React from "react";
import { useNavigate } from "react-router-dom";

const ExamsPage = () => {
  const navigate = useNavigate();
  const exams = [
    {
      name: "JEE Mains",
      path: "jeemain",
      description:
        "90 questions per paper. Practice and excel in one of the most competitive exams.",
      color: "bg-blue-500",
    },
    {
      name: "JEE Advanced",
      path: "jeeadvanced",
      description:
        "56 questions per paper. Push your limits for this elite-level exam.",
      color: "bg-green-500",
    },
    {
      name: "MHTCET",
      path: "mhtcet",
      description:
        "150 questions per paper. Ace this state-level exam with detailed mock tests.",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Explore Exams</h1>
        <p className="text-lg text-gray-600 mb-12">
          Prepare for your exams with structured mock tests and detailed
          summaries.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam, index) => (
            <div
              key={index}
              className={`relative rounded-lg shadow-lg p-6 ${exam.color} text-white transition transform hover:scale-105`}
            >
              <h2 className="text-2xl font-semibold mb-4">{exam.name}</h2>
              <p className="text-base">{exam.description}</p>
              <button
                className="absolute bottom-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
                onClick={() => navigate(`/exams/${exam.path}`)}
              >
                View More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamsPage;
