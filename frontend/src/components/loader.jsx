import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#F9F9F9]">
      <div className="text-center">
        <div className="loader-circle mb-4 mx-auto">
          <div className="loader-icon">📘</div>
        </div>
        <p className="text-[#333333] font-semibold text-lg">
          Loading educational resources...
        </p>
      </div>

      {/* Styles */}
      <style jsx>{`
        .loader-circle {
          width: 80px;
          height: 80px;
          border: 5px solid #e0e0e0;
          border-top: 5px solid #2196f3;
          border-radius: 50%;
          animation: spin 1.2s linear infinite;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .loader-icon {
          font-size: 30px;
          animation: bounce 1s infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
