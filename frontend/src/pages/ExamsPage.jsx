import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ExamsPage = () => {
  const navigate = useNavigate();
  const exams = [
    {
      name: "JEE Mains",
      path: "jeemain",
      description:
        "90 questions per paper. Practice and excel in one of the most competitive exams.",
      imageUrl:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhBSvShw6glJP-7LwIuRYAGa4pb7bwLY8w8y67I_CVWSnqcp3VQdFunZq3LDwuR0yXSPIBP5r8ROtXGX6w_JjA8WjpX6EwxH-dak2AqlLC-05OHfjk6EUyZ8wjnTMaGtXpPbjkqWeLcmxSyJycSYcWOp83UsLxOmyqaAeVwBEiyyE-51egtSr5rEENzGg0/s400-rw/ic_content_exam_jee_main.png",
      hoverColor: "hover:bg-blue-100",
    },
    {
      name: "JEE Advanced",
      path: "jeeadvanced",
      description:
        "56 questions per paper. Push your limits for this elite-level exam.",
      imageUrl:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj7yRXLuUcLhDtmRdqTmP78DsvZ67myq3IkW5lnb8oWdYoEEeqvVjpG1T2LuE521oqJZNRdKuKNzepzxS3o7ktjFiaHgv-gnDKQlmDrSeRKHcx-JjAwCskUiSfarNZ2HTrgKVsM9atqmpljjkXDJmohHALKv3daMTJ8b0pqscnzX0wOCsIw-m6YbIU7J9U/s320/ic_content_exam_jee_advanced.png",
      hoverColor: "hover:bg-green-100",
    },
    {
      name: "MHTCET",
      path: "mhtcet",
      description:
        "150 questions per paper. Ace this state-level exam with detailed mock tests.",
      imageUrl:
        "https://cetcell.mahacet.org/wp-content/uploads/2023/06/cet_cell-removebg-preview.png",
      hoverColor: "hover:bg-yellow-100",
    },
    {
      name: "NEET",
      path: "neet",
      description:
        "200 questions per paper. Prepare for the national-level medical entrance exam with precision.",
      imageUrl:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhNo7FUFG6dM3jBj15NgsyYp2FLH-5ZiddJx7WtQEaSMpXR4548o-LXsUkJuV86MnFU5XNjBAsp61WPWDRIfcT19UU8ipKCnI_4u9W6lu4TCGz2kKbym8oN6AaPuiB4qNwTKIOPPRczsUr-U8N_K4kxIjoR0CmqkGeS1F7O7ZC-QzrFGo38NDBXcz0JzWs/s920/output-onlinepngtools.png",
      hoverColor: "hover:bg-red-100",
    },
    {
      name: "GATE",
      path: "gate",
      description:
        "65 questions per paper. Get ready for the postgraduate engineering entrance exam with tailored practice.",
      imageUrl: "https://gate2025.iitr.ac.in/img/logos/green-logo.png",
      hoverColor: "hover:bg-purple-100",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
              Explore <span className="text-blue-500">Exams</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Prepare for your exams with structured mock tests and detailed
              summaries tailored to your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exams.map((exam, index) => (
              <div
                key={index}
                className={`relative flex flex-col justify-between rounded-xl shadow-md bg-white text-gray-800 p-6 transition transform hover:scale-105 hover:shadow-lg ${exam.hoverColor}`}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={exam.imageUrl}
                    alt={`${exam.name} Logo`}
                    className="w-16 h-16 mr-4 rounded-full"
                  />
                  <h2 className="text-3xl font-bold">{exam.name}</h2>
                </div>
                <p className="text-base leading-relaxed mb-6">
                  {exam.description}
                </p>
                <button
                  className="mt-4 self-start bg-blue-500 text-white px-4 py-2 rounded-full font-medium shadow-md hover:bg-blue-600 transition"
                  onClick={() => navigate(`/exams/${exam.path}`)}
                >
                  View More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ExamsPage;
