// src/components/ParticleBackground.jsx
import React, { useEffect } from "react";
import { tsParticles } from "tsparticles"; // Correct import

const ParticleBackground = () => {
  useEffect(() => {
    tsParticles.load("tsparticles", {
      background: {
        color: "#0f2027",
      },
      particles: {
        color: {
          value: "#00d1ff", // Neon blue
        },
        links: {
          color: "#00d1ff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
        },
        number: {
          value: 50,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: 3,
        },
      },
      detectRetina: true,
    });
  }, []);

  return (
    <div
      id="tsparticles"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default ParticleBackground;
