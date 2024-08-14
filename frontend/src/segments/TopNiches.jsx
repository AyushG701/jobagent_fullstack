import React from "react";

const TopNiches = () => {
  const services = [
    {
      id: 1,
      service: "Software Development",
      description:
        "Innovative software development services to build, maintain, and upgrade applications, ensuring they meet the highest quality standards.",
    },
    {
      id: 2,
      service: "Web Development",
      description:
        "Comprehensive web development solutions from front-end design to back-end integration, delivering responsive and user-friendly websites.",
    },
    {
      id: 3,
      service: "Data Science",
      description:
        "Advanced data science services to analyze and interpret complex data, providing actionable insights and data-driven solutions.",
    },
    {
      id: 4,
      service: "Cloud Computing",
      description:
        "Reliable cloud computing services to manage, store, and process data efficiently, offering scalable and flexible cloud solutions.",
    },
    {
      id: 5,
      service: "DevOps",
      description:
        "DevOps services to streamline software development and operations, enhancing deployment efficiency and reducing time to market.",
    },
    {
      id: 6,
      service: "Mobile App Development",
      description:
        "Expert mobile app development for iOS and Android platforms, creating intuitive and engaging mobile experiences for your users.",
    },
  ];
  return (
    <section className="px-4 sm:px-8 lg:px-16">
      <h3 className="text-2xl font-bold mb-6">Top Niches</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((element) => (
          <div
            key={element.id}
            className="group relative block h-60 sm:h-80 lg:h-64"
          >
            <span className="absolute inset-0 border-2 border-dashed border-black"></span>

            <div className="relative flex h-full  transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
              <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 ">
                <h4 className="mt-4 text-xl font-medium sm:text-2xl">
                  {element.service}
                </h4>
              </div>

              <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 ">
                <h4 className="mt-4 text-xl font-medium sm:text-2xl">
                  {element.service}
                </h4>
                <p className="mt-4 text-sm sm:text-base">
                  {element.description}
                </p>
                <p className="mt-8 font-bold">Read more</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopNiches;
