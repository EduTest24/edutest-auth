import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const StudyMaterial = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for study materials
  const materials = [
    {
      id: 1,
      title: "Introduction to Algorithms",
      type: "PDF",
      subject: "Computer Science",
      fileLink: "/files/intro-to-algorithms.pdf",
      viewLink: "/materials/intro-to-algorithms",
    },
    {
      id: 2,
      title: "Machine Learning Overview",
      type: "Video",
      subject: "AI & ML",
      fileLink: "/videos/ml-overview.mp4",
      viewLink: "/materials/ml-overview",
    },
    {
      id: 3,
      title: "Data Structures Notes",
      type: "Notes",
      subject: "Computer Science",
      fileLink: "/files/data-structures-notes.pdf",
      viewLink: "/materials/data-structures-notes",
    },
    {
      id: 4,
      title: "Mathematics for AI",
      type: "Article",
      subject: "Mathematics",
      fileLink: "/files/math-for-ai.pdf",
      viewLink: "/materials/math-for-ai",
    },
  ];

  // Featured topics
  const featuredTopics = [
    {
      id: 1,
      title: "Advanced Machine Learning",
      subject: "AI & ML",
      fileLink: "/files/advanced-ml.pdf",
    },
    {
      id: 2,
      title: "Graph Theory",
      subject: "Mathematics",
      fileLink: "/files/graph-theory.pdf",
    },
  ];

  // Filter materials based on search term
  const filteredMaterials = materials.filter((material) =>
    material.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="max-w-7xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search for study materials..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Featured Topics */}
        <div className="max-w-7xl mx-auto mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
            Featured Topics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTopics.map((topic) => (
              <div key={topic.id} className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {topic.title}
                </h3>
                <p className="text-sm text-gray-500">{topic.subject}</p>
                <a
                  href={topic.fileLink}
                  className="mt-4 text-blue-500 hover:underline"
                  download
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Study Materials */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
            Study Materials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <div
                key={material.id}
                className="bg-white shadow-lg rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {material.title}
                </h3>
                <p className="text-sm text-gray-500">{material.subject}</p>
                <p className="text-sm text-gray-500">{material.type}</p>

                <div className="mt-4">
                  <a
                    href={material.viewLink}
                    className="inline-block text-blue-500 hover:underline mr-4"
                  >
                    View Online
                  </a>
                  <a
                    href={material.fileLink}
                    className="inline-block text-blue-500 hover:underline"
                    download
                  >
                    Download
                  </a>
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

export default StudyMaterial;
