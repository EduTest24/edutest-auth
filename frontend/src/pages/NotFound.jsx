import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "react-spring";

const NotFound = () => {
  // Animation settings for the page
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const bounce = useSpring({
    loop: { reverse: true },
    to: [{ transform: "translateY(-20px)" }, { transform: "translateY(0px)" }],
    from: { transform: "translateY(0px)" },
    config: { tension: 180, friction: 12 },
  });

  return (
    <animated.div
      style={fadeIn}
      className="h-screen flex items-center justify-center bg-blue-100"
    >
      <div className="text-center">
        <animated.div style={bounce}>
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            size="6x"
            className="text-yellow-500 mb-4"
          />
        </animated.div>
        <h1 className="text-4xl font-semibold text-blue-600 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          We couldn’t find the page you were looking for. It might have been
          moved or deleted.
        </p>
        <a
          href="/"
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
        >
          Go Back Home
        </a>
      </div>
    </animated.div>
  );
};

export default NotFound;
