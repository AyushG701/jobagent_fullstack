import React from "react";
import Hero from "@/segments/Hero";
import HowItWorks from "@/segments/HowItWorks";
import LatestJobs from "@/segments/LatestJobs";
import TopNiches from "@/segments/TopNiches";
import CategoryCarousel from "@/segments/CategoryCarousel";

const Home = () => {
  return (
    <div>
      <Hero />
      <TopNiches />
      <CategoryCarousel />
      <LatestJobs />
      <HowItWorks />
    </div>
  );
};

export default Home;
