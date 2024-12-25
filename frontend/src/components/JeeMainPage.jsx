import React from "react";

const JeeMainExam = () => {
  const examCards = [
    {
      title: "Mock Test 2023 - Paper 1",
      description:
        "A full-length mock test based on the 2023 JEE Mains Paper 1.",
      buttonText: "Start Test",
    },
    {
      title: "Mock Test 2022 - Paper 2",
      description:
        "A comprehensive test covering all sections from 2022 Paper 2.",
      buttonText: "Start Test",
    },
    {
      title: "Physics - Mechanics",
      description: "Test your understanding of mechanics concepts in Physics.",
      buttonText: "Attempt Now",
    },
    {
      title: "Mathematics - Calculus",
      description:
        "Evaluate your skills in calculus with topic-specific questions.",
      buttonText: "Attempt Now",
    },
  ];

  const renderExamCards = (category) =>
    examCards.map((card, index) => (
      <div
        key={`${category}-${index}`}
        className="p-6 bg-white rounded-lg shadow-lg"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {card.title}
        </h3>
        <p className="text-gray-600 mb-4">{card.description}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          {card.buttonText}
        </button>
      </div>
    ));

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      {/* Top Section */}
      <div className="bg-blue-500 text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">JEE Mains</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Prepare for JEE Mains with our comprehensive resources. Practice mock
          tests, solve previous year papers, and analyze your performance to ace
          the exam. Choose from a wide variety of tests categorized by year,
          subject, chapter, or topic.
        </p>
      </div>

      {/* Sections */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-10 space-y-12">
        {/* Year-wise Papers */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Year-wise Papers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderExamCards("year")}
          </div>
        </div>

        {/* Subject-wise Papers */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Subject-wise Papers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderExamCards("subject")}
          </div>
        </div>

        {/* Chapter-wise Papers */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Chapter-wise Papers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderExamCards("chapter")}
          </div>
        </div>

        {/* Topic-wise Papers */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Topic-wise Papers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderExamCards("topic")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JeeMainExam;
