import React, { useState } from "react";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I reset my password?",
      answer:
        "To reset your password, go to the 'Forgot Password' section on the login page, enter your registered email address, and follow the instructions sent to your email.",
    },
    {
      question: "I need assistance with the mock tests.",
      answer:
        "If you are facing issues with the mock tests, ensure you have a stable internet connection. You can also reach out to our support team by filling out the contact form with your query.",
    },
    {
      question: "How do I view my test results?",
      answer:
        "Once you complete a mock test, you can view your results on your dashboard under 'Test History'. Click on any completed test to see detailed results and performance analysis.",
    },
    {
      question: "How do I upload a question in the admin panel?",
      answer:
        "To upload a question, log into the admin panel, click on 'Upload Questions', and upload a .js file containing the question array or paste the array directly into the provided code editor.",
    },
    {
      question: "How do I change my account details?",
      answer:
        "To change your account details, go to 'Account Settings' under your profile section, where you can update your name, email, password, and other information.",
    },
    {
      question: "What should I do if I encounter a technical issue?",
      answer:
        "If you encounter a technical issue, first try refreshing the page or clearing your browser cache. If the issue persists, please fill out the contact form, and our support team will assist you.",
    },
  ];

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center space-x-8">
        {/* Left Section (Image or Graphic) */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjA3pVbPnB7v4IsPqV53x9_8DbNqA1c9OJ60IQbjepYKD-w9CQWQ_MVIyVxnbwO22jFonI7Tw_cLA5vMZ_9knhnlHU5A4WbykN6l_xgVvgSMJdqcrVINJkNsHK9St6qcyryu77H9kVIOaPZQ62N1zw01tWeXaYbdkYvFezRVQehS7oPyhlhfLCTUHzB52w/s500/faqs.png" // Replace with your image URL
            alt="Support Illustration"
            className="w-full rounded-lg"
          />
        </div>

        {/* Right Section (FAQs) */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left text-lg font-semibold text-gray-800 hover:text-blue-600 focus:outline-none flex justify-between items-center"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`transform transition-transform ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    &#9660; {/* Down Arrow */}
                  </span>
                </button>
                {activeIndex === index && (
                  <p className="text-gray-600 text-sm mt-2 pl-6">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
