import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faBars, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = ({
  timer,
  formatTime,
  toggleSidebar,
  showQuestionPaper,
  setShowQuestionPaper,
}) => {
  const enterFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  const handleQuestionPaperToggle = () => {
    setShowQuestionPaper((prevState) => !prevState);
  };

  return (
    <div className="head">
      {/* Fullscreen Button */}
      <button onClick={enterFullscreen} className="fullscreen-btn">
        <FontAwesomeIcon icon={faExpand} />
      </button>

      {/* Timer */}
      <div className="timer">{formatTime(timer)}</div>

      {/* View Complete Question Paper Button */}
      <button
        className="question-paper-toggle-btn"
        onClick={handleQuestionPaperToggle}
      >
        <FontAwesomeIcon icon={faFileAlt} />
      </button>
      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
  );
};

export default Header;
