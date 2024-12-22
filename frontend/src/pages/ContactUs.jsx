import React from "react";
import image from "../images/get-in-touch.gif";
import Header from "../components/Header";
import Footer from "../components/Footer";

const GetInTouch = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        {/* Slanted Divider */}

        <div className="relative max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 shadow-lg rounded-lg overflow-hidden">
          {/* Left Section: GIF */}
          <div className="flex items-center justify-center bg-white">
            <img
              src={image}
              alt="Contact Us"
              className="max-w-full h-auto rounded-lg"
            />
          </div>

          {/* Right Section: Form with Glassmorphism */}
          <div className="relative  p-8 z-10">
            <div
              className="absolute inset-0 bg-blue-600"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              }}
            ></div>
            {/* Form Content */}
            <div className="relative p-8 z-10">
              <div
                className="bg-white bg-opacity-20 backdrop-blur-lg border border-white/20 rounded-xl p-8"
                style={{ boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)" }}
              >
                <h2 className="text-3xl font-bold text-white text-center">
                  Get in Touch
                </h2>
                <p className="text-white text-center mb-6">
                  Fill out the form below, and we'll get back to you as soon as
                  possible!
                </p>
                <form className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="border border-white bg-transparent rounded-lg p-3 focus:ring-2 focus:ring-blue-300 focus:outline-none text-white w-full placeholder-white"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="border border-white bg-transparent rounded-lg p-3 focus:ring-2 focus:ring-blue-300 focus:outline-none text-white w-full placeholder-white"
                      required
                    />
                  </div>
                  {/* Subject */}
                  <div>
                    <select
                      className="border border-white bg-transparent rounded-lg p-3 focus:ring-2 focus:ring-blue-300 focus:outline-none text-white w-full placeholder-white"
                      required
                    >
                      <option value="" className="text-gray-400">
                        Select Subject
                      </option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="technical">Technical Issue</option>
                    </select>
                  </div>
                  {/* Message */}
                  <div>
                    <textarea
                      placeholder="Your Message"
                      rows="5"
                      className="border border-white bg-transparent rounded-lg p-3 focus:ring-2 focus:ring-blue-300 focus:outline-none text-white w-full placeholder-white"
                      required
                    ></textarea>
                  </div>
                  {/* File Upload */}
                  <div>
                    <input
                      type="file"
                      className="border border-white bg-transparent rounded-lg p-3 focus:ring-2 focus:ring-blue-300 focus:outline-none text-white w-full"
                    />
                  </div>
                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-white bg-opacity-80 text-blue-600 py-3 px-6 rounded-lg hover:bg-white hover:bg-opacity-100 focus:ring-2 focus:ring-white focus:outline-none transition duration-300"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GetInTouch;
