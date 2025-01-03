import React from "react";

const CircularProgressBar = ({ value, maxValue, color, size }) => {
  const strokeDashoffset = ((maxValue - value) / maxValue) * 440; // Calculate offset to create circular progress
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="mx-auto mb-2"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#e6e6e6"
        strokeWidth="8"
        fill="none"
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke={color}
        strokeWidth="8"
        fill="none"
        strokeDasharray="283"
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="0.3em"
        fontSize="18"
        fontWeight="bold"
        fill={color}
      >
        {Math.round(value)}
      </text>
    </svg>
  );
};

export default CircularProgressBar;
