import Hero from "@/segments/Hero";
import HowItWorks from "@/segments/HowItWorks";
import TopNiches from "@/segments/TopNiches";
import React from "react";

const Home = () => {
  return (
    <div>
      <Hero />
      <TopNiches />
      <HowItWorks />
    </div>
  );
};

export default Home;
