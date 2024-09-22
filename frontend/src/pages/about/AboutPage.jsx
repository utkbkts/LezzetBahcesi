import React, { useEffect } from "react";
import AboutSection from "../../components/aboutSection/AboutSection";
import Hero from "../../components/hero/Hero";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-col">
      <Hero title={"Hakkımızda"} />
      <AboutSection />
    </div>
  );
};

export default AboutPage;
