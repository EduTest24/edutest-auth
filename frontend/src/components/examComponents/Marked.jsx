import React from "react";

const MarkedButton = ({ handleMarkQuestion }) => {
  return (
    <button className="mark-btn" onClick={handleMarkQuestion}>
      Mark
    </button>
  );
};

export default MarkedButton;
