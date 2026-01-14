import React from "react";
import Hero from "../../Components/Hero";
import Features from "../../Components/Features";
import HowItWorks from "../../Components/HowItWorks";
import Modes from "../../Components/Modes";
import StandsOut from "../../Components/StandsOut";
import RealProblems from "../../Components/RealProblems";
import MadeForMovers from "../../Components/MadeForMovers";
import Contact from "../../Components/Contact";

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <Hero />
      {/* Features Section */}
      <Features />
      {/* How It Works Section */}
      <HowItWorks />
      {/* Modes Section */}
      <Modes />
      {/* Stands Out Section */}
      <StandsOut />
      {/* Real Problems Section */}
      <RealProblems />
      {/* Made For Movers Section */}
      <MadeForMovers />
      {/* Contact Section */}
      <Contact />
    </>
  );
};

export default HomePage;
