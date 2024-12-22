import {
  FaClipboardList,
  FaBookOpen,
  FaChartLine,
  FaGraduationCap,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const ExploreCategories = () => {
  return (
    <section className="py-16 bg-gray-50 mt-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Explore Our Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Exam Category */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition duration-300 ease-in-out">
            <FaClipboardList className="text-4xl text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Exams</h3>
            <p className="text-gray-600 mb-4">
              Access mock exams, practice papers, and more.
            </p>
            <Link
              to="/exams"
              className="inline-block px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              Go to Exams
            </Link>
          </div>

          {/* Study Material Category */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition duration-300 ease-in-out">
            <FaBookOpen className="text-4xl text-green-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Study Material
            </h3>
            <p className="text-gray-600 mb-4">
              Find all the resources you need for effective learning.
            </p>
            <Link
              to="/study-material"
              className="inline-block px-6 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              Go to Study Material
            </Link>
          </div>

          {/* User Performance Monitor Category */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition duration-300 ease-in-out">
            <FaChartLine className="text-4xl text-yellow-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              User Performance Monitor
            </h3>
            <p className="text-gray-600 mb-4">
              Track your progress and get insights into your performance.
            </p>
            <Link
              to="/performance-monitor"
              className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              Go to Performance Monitor
            </Link>
          </div>

          {/* Forums/Community Category */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition duration-300 ease-in-out">
            <FaGraduationCap className="text-4xl text-purple-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Forums/Community
            </h3>
            <p className="text-gray-600 mb-4">
              Join discussions, share tips, and connect with fellow learners.
            </p>
            <Link
              to="/forums"
              className="inline-block px-6 py-2 bg-gradient-to-r from-purple-400 to-purple-500 text-white rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              Go to Forums
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreCategories;
