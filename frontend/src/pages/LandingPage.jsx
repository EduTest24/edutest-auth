import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainSection from "../components/MainSection";
import GoToTopButton from "../components/ScrollToTop";
import "./landing.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <MainSection />
      <Footer />
      <GoToTopButton />
    </div>
  );
};

export default LandingPage;
