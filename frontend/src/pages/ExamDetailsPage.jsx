import React from "react";
import { useParams } from "react-router-dom";
import JeeMainPage from "../components/JeeMainPage.jsx";

const ExamDetailsPage = () => {
  const { examName } = useParams();

  const renderExamComponent = () => {
    switch (examName) {
      case "jeemain":
        return <JeeMainPage />;
      default:
        return (
          <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-800">Exam Not Found</h1>
            <p className="text-lg text-gray-600 mt-4">
              The exam you are looking for does not exist.
            </p>
          </div>
        );
    }
  };

  return <div>{renderExamComponent()}</div>;
};

export default ExamDetailsPage;
