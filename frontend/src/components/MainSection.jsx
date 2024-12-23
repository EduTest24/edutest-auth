import React from "react";
import "./mainsection.css";
import image from "../images/hero.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop, faFileAlt, faBook } from "@fortawesome/free-solid-svg-icons";
import PopularExamsSection from "./PopularExam";
import FAQs from "./FAQ";
import Section from "./section";

const MainSection = () => {
  return (
    <>
      {" "}
      <section className="hero-section bg-blue-50 py-16 h-svh">
        <div className="container mx-auto px-6 flex flex-row md:flex-row items-center">
          {/* Text Content */}
          <div className="text-content md:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800 leading-snug">
              Practice for Success:{" "}
              <span className="text-blue-500">Master Entrance Exams</span> with
              Mock Tests & Study Materials.
            </h1>
            <p className="mt-4 text-gray-600">
              Prepare smarter with EduTEST. Access mock tests and previous year
              question papers for exams like JEE, MHTCET, and more!
            </p>
          </div>
          {/* Hero Image */}
          <img
            src={image}
            alt="Students practicing on a laptop"
            className="max-w-md w-full rounded-lg"
          />
        </div>
      </section>
      <Section />
      <PopularExamsSection />
      <section className="features-section bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          {/* Section Heading */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Why Choose <span className="text-blue-500">EduTEST </span>?
          </h2>
          <p className="text-gray-600 mb-12">
            Explore our key highlights that make your exam preparation smarter
            and more effective.
          </p>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="feature-item bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="icon mb-4">
                <FontAwesomeIcon
                  icon={faLaptop}
                  className="text-green-500 text-4xl"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Real Exam-Like Mock Tests
              </h3>
              <p className="text-gray-600 mt-2">
                Get familiar with the exam pattern and improve time management
                with realistic mock tests.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-item bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="icon mb-4">
                <FontAwesomeIcon
                  icon={faFileAlt}
                  className="text-blue-500 text-4xl"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Previous Year Question Papers
              </h3>
              <p className="text-gray-600 mt-2">
                Practice with actual past exam questions to gain confidence and
                accuracy.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-item bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="icon mb-4">
                <FontAwesomeIcon
                  icon={faBook}
                  className="text-yellow-500 text-4xl"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Comprehensive Study Materials
              </h3>
              <p className="text-gray-600 mt-2">
                Access curated study resources to strengthen your concepts and
                boost your preparation.
              </p>
            </div>
          </div>
        </div>
      </section>
      <FAQs />
    </>
  );
};

export default MainSection;
