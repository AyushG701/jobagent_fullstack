import Hero from "@/segments/Hero";
import HowItWorks from "@/segments/HowItWorks";
import LatestJobs from "@/segments/LatestJobs";
import TopNiches from "@/segments/TopNiches";
import React from "react";

const Home = () => {
  return (
    <div>
      <Hero />
      <TopNiches />
      <LatestJobs />
      <HowItWorks />
    </div>
  );
};

export default Home;
