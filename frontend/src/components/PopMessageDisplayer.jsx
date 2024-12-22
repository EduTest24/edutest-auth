import React, { useState, useEffect } from "react";
import "./PopMessageDisplayer.css";

const PopMessageDisplayer = ({ message, type, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      // Automatically hide the popup after the duration
      const hideTimeout = setTimeout(() => {
        setIsVisible(false); // Hide the popup
        onClose(); // Reset the message state after it closes
      }, duration);

      return () => clearTimeout(hideTimeout);
    }
  }, [message, duration, onClose]);

  if (!message) {
    return null; // Do not render if there's no message
  }

  const popupClass = `popup-message ${type || "info"} ${
    isVisible ? "show" : ""
  }`;

  return (
    <div className={popupClass}>
      <p>{message}</p>
      <div className="progress-bar">
        <span style={{ animationDuration: `${duration}ms` }}></span>
      </div>
    </div>
  );
};

export default PopMessageDisplayer;
