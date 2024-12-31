import React from "react";
import { useParams } from "react-router-dom";
import JeeMainPage from "../components/JeeMainPage.jsx";
import CetYear from "../components/cetYear.jsx";

const ExamDetailsPage = () => {
  const { examName } = useParams();

  const renderExamComponent = () => {
    switch (examName) {
      case "jeemain":
        return <JeeMainPage />;
      case "mhtcet":
        return <CetYear />;
      default:
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-800">Exam Not Found</h1>
            <p className="text-lg text-gray-600 mt-4">
              The exam you are looking for does not exist. Please check the URL
              or go back to the{" "}
              <a href="/exams" className="text-blue-500 underline">
                Exams page
              </a>
              .
            </p>
          </div>
        );
    }
  };

  return <div className="min-h-screen bg-gray-50">{renderExamComponent()}</div>;
};

export default ExamDetailsPage;
