import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaClock, FaCalendarAlt, FaQuestionCircle } from "react-icons/fa";

const GroupedQuestionsSection = () => {
  const [groupedQuestions, setGroupedQuestions] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://edutest-frontend.onrender.com/api/exam/jeemain"
        );
        const questions = response.data;

        const groupedByDate = questions.reduce((acc, question) => {
          if (question.examInfo && question.examInfo.date) {
            const date = new Date(question.examInfo.date)
              .toISOString()
              .split("T")[0];
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(question);
          }
          return acc;
        }, {});

        setGroupedQuestions(groupedByDate);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleStartTest = (questions) => {
    navigate("/jeemain", { state: { questions } });
  };

  return (
    <section className="bg-sky-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">
          Complete Mock Papers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedQuestions).map(([date, questions]) => {
            const formattedDate = new Date(date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            return (
              <div
                key={date}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    {formattedDate} {questions[0]?.examInfo?.shift || "N/A"}{" "}
                    Shift
                  </h3>
                  <p className="text-gray-600 mt-1 flex items-center">
                    <FaQuestionCircle className="mr-2 text-yellow-500" />
                    {questions.length} Questions
                  </p>
                </div>
                <button
                  onClick={() => handleStartTest(questions)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                  Start Test
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GroupedQuestionsSection;
