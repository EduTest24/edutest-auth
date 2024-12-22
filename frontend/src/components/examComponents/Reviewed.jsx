import React from "react";

const ReviewedButton = ({ handleReviewQuestion }) => {
  return (
    <button className="review-btn" onClick={handleReviewQuestion}>
      Review
    </button>
  );
};

export default ReviewedButton;
