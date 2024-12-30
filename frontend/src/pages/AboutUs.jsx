import React from "react";
import aboutImage from "../images/about-us.png";
import member1 from "../images/owner.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faEye,
  faHeart,
  faBookOpen,
  faClock,
  faUsers,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center">
            {/* Left Content */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
              <p className="text-lg leading-relaxed mb-6">
                Welcome to <span className="font-bold">EduTEST</span>, your
                trusted partner in exam preparation. We are committed to
                providing students with world-class study tools, resources, and
                mock tests to help them achieve their academic goals.
              </p>
              <a
                href="#our-story"
                className="inline-block bg-white text-blue-600 py-3 px-6 rounded-lg font-medium hover:bg-opacity-90 transition"
              >
                Learn More
              </a>
            </div>
            {/* Right Image */}
            <div className="w-full md:w-1/2">
              <img src={aboutImage} alt="About Us" className="rounded-lg" />
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <section
          id="our-story"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
            <p className="text-gray-600 mt-4">
              EduTEST was born out of a passion for empowering students to excel
              in their studies. Our mission is to provide accessible, reliable,
              and innovative learning solutions to students across the globe.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <FontAwesomeIcon
                icon={faBullseye}
                className="text-blue-600 text-4xl mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Our Mission
              </h3>
              <p className="text-gray-600">
                To make learning efficient and enjoyable by offering
                cutting-edge resources and tools for exam preparation.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <FontAwesomeIcon
                icon={faEye}
                className="text-blue-600 text-4xl mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To become the go-to platform for students preparing for
                competitive exams worldwide.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <FontAwesomeIcon
                icon={faHeart}
                className="text-blue-600 text-4xl mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Our Values
              </h3>
              <p className="text-gray-600">
                Integrity, innovation, and excellence in everything we do to
                support our students' journey.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-blue-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">
                Why Choose Us?
              </h2>
              <p className="text-gray-600 mt-4">
                Here’s what makes EduTEST the right choice for your learning
                needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <FontAwesomeIcon
                  icon={faBookOpen}
                  className="text-blue-600 text-4xl mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Expertly Curated Content
                </h3>
                <p className="text-gray-600">
                  Access high-quality study material and mock tests crafted by
                  subject matter experts.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-blue-600 text-4xl mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Time-Saving Tools
                </h3>
                <p className="text-gray-600">
                  Optimize your preparation with our user-friendly interface and
                  smart analytics.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="text-blue-600 text-4xl mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Student-Centric Approach
                </h3>
                <p className="text-gray-600">
                  We prioritize your success and provide unparalleled support
                  throughout your journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Meet Our Team</h2>
            <p className="text-gray-600 mt-4">
              Our team of dedicated professionals is here to support your
              learning every step of the way.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src={member1}
                alt="Team Member"
                className="mx-auto rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">Hariom</h3>
              <p className="text-gray-600">Founder & CEO</p>
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-gray-500 text-lg mt-2"
              />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
