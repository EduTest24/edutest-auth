import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaDownload, FaPlayCircle } from "react-icons/fa";

const PopularExamsSection = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
  }, []);

  const exams = [
    {
      name: "JEE Mains",
      logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhBSvShw6glJP-7LwIuRYAGa4pb7bwLY8w8y67I_CVWSnqcp3VQdFunZq3LDwuR0yXSPIBP5r8ROtXGX6w_JjA8WjpX6EwxH-dak2AqlLC-05OHfjk6EUyZ8wjnTMaGtXpPbjkqWeLcmxSyJycSYcWOp83UsLxOmyqaAeVwBEiyyE-51egtSr5rEENzGg0/s400-rw/ic_content_exam_jee_main.png", // Replace with actual path or URL
      details: "JEE 2024 will be conducted in two phases: January & April.",
      examDates: "January 2024 (Phase 1), April 2024 (Phase 2)",
      syllabusLink: "path-to-jee-syllabus.pdf", // Replace with the actual syllabus PDF link
      link: "/exams/jeemain",
    },
    {
      name: "NEET",
      logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhNo7FUFG6dM3jBj15NgsyYp2FLH-5ZiddJx7WtQEaSMpXR4548o-LXsUkJuV86MnFU5XNjBAsp61WPWDRIfcT19UU8ipKCnI_4u9W6lu4TCGz2kKbym8oN6AaPuiB4qNwTKIOPPRczsUr-U8N_K4kxIjoR0CmqkGeS1F7O7ZC-QzrFGo38NDBXcz0JzWs/s920/output-onlinepngtools.png", // Replace with actual path or URL
      details: "NEET 2024 is scheduled for May 5th. Start your prep now!",
      examDates: "May 5th, 2024",
      syllabusLink: "path-to-neet-syllabus.pdf", // Replace with the actual syllabus PDF link
      link: "/exams/neet",
    },
    {
      name: "MHT-CET",
      logo: "https://cetcell.mahacet.org/wp-content/uploads/2023/06/cet_cell-removebg-preview.png", // Replace with actual path or URL
      details: "MHT-CET 2024 application opens in March. Get ready!",
      examDates: "2024 (Dates not confirmed yet)",
      syllabusLink: "path-to-mhtcet-syllabus.pdf", // Replace with the actual syllabus PDF link
      link: "/exams/mht-cet",
    },
    {
      name: "GATE",
      logo: "https://gate2025.iitr.ac.in/img/logos/green-logo.png", // Replace with actual path or URL
      details: "GATE 2024 is scheduled for February. Brush up your skills!",
      examDates: "February 2024 (Exact Dates TBA)",
      syllabusLink: "path-to-gate-syllabus.pdf", // Replace with the actual syllabus PDF link
      link: "/exams/gate",
    },
  ];
  const handleDownload = (syllabusLink) => {
    window.open(syllabusLink, "_blank");
  };

  return (
    <section className="popular-exams-section bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Popular <span className="text-blue-500">Exams</span>
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Get ready for your exams with detailed information and practice
          materials!
        </p>

        {/* Exam Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {exams.map((exam, index) => (
            <div
              key={index}
              className="exam-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <img
                src={exam.logo}
                alt={`${exam.name} logo`}
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 text-center">
                {exam.name}
              </h3>
              {/* <p className="text-gray-600 text-center mt-2 font-medium">
                <FaCalendarAlt className="inline-block mr-2 text-blue-500" />
                Exam Dates: {exam.examDates}
              </p> */}
              <p className="text-gray-600 text-center mt-2 font-medium">
                Practice with PYQ to Boost your preparation.
              </p>
              {/* Syllabus Download Button with Icon */}
              <div className="text-center mt-4">
                <button
                  onClick={() => handleDownload(exam.syllabusLink)}
                  className="inline-block bg-blue-500 text-white text-sm font-medium py-2 px-6 rounded-lg hover:bg-blue-600 transition mb-4 flex items-center justify-center"
                >
                  <FaDownload className="mr-2" />
                  Download Syllabus
                </button>
              </div>

              {/* Practice Now Button with Icon */}
              <div className="text-center">
                <a
                  href={exam.link}
                  className="inline-block bg-green-500 text-white text-sm font-medium py-2 px-6 rounded-lg hover:bg-green-600 transition flex items-center justify-center"
                >
                  <FaPlayCircle className="mr-2" />
                  Practice Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularExamsSection;
