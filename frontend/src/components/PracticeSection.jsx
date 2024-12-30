import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFlask, FaAtom, FaCalculator } from "react-icons/fa";

const PracticeSection = () => {
  const navigate = useNavigate();

  const subjects = [
    {
      name: "Physics",
      description: "Practice all chapter-wise PYQs for Physics.",
      icon: <FaAtom className="text-blue-500 text-4xl" />,
      route: "/subject",
    },
    {
      name: "Chemistry",
      description: "Practice all chapter-wise PYQs for Chemistry.",
      icon: <FaFlask className="text-green-500 text-4xl" />,
      route: "/subject",
    },
    {
      name: "Mathematics",
      description: "Practice all chapter-wise PYQs for Mathematics.",
      icon: <FaCalculator className="text-yellow-500 text-4xl" />,
      route: "/subject",
    },
  ];

  return (
    <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Chapter-Wise PYQs Practice
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Enhance your preparation by practicing previous year questions for all
          chapters in Physics, Chemistry, and Mathematics.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {subjects.map((subject) => (
          <div
            key={subject.name}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-4">{subject.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">
              {subject.name}
            </h3>
            <p className="mt-2 text-gray-600">{subject.description}</p>
            <button
              onClick={() => navigate(subject.route)}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Practice Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PracticeSection;
