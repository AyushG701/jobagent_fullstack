import { ChevronDown, ChevronUp, Menu, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "sonner";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice.js";
import { Link } from "react-router-dom";
import Spinner from "@/segments/Spinner";
const Jobs = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city);
  };
  const handleNicheChange = (niche) => {
    setNiche(niche);
    setSelectedNiche(niche);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    dispatch(fetchJobs(city, niche, searchKeyword));
  }, [dispatch, city, niche]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchJobs(city, niche, searchKeyword));
  };

  const cities = [
    "Kathmandu",
    "Pokhara",
    "Lalitpur",
    "Biratnagar",
    "Bharatpur",
    "Birgunj",
    "Butwal",
    "Dharan",
    "Bhaktapur",
    "Janakpur",
    "Hetauda",
    "Nepalgunj",
    "Itahari",
    "Dhangadhi",
    "Tulsipur",
    "Bhairahawa",
    "Mahendranagar",
    "Ghorahi",
    "Kirtipur",
    "Lahan",
  ];

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  return (
    // <>
    //   <Toaster />
    //   {loading ? (
    //     <Spinner />
    //   ) : (
    //     <section className="jobs">
    //       <div className="search-tab-wrapper">
    //         <input
    //           type="text"
    //           value={searchKeyword}
    //           onChange={(e) => setSearchKeyword(e.target.value)}
    //         />
    //         <button onClick={handleSearch}>Find Job</button>
    //         <Search />
    //       </div>
    //       <div className="wrapper">
    //         <div className="filter-bar">
    //           <div className="cities">
    //             <h2>Filter Job By City</h2>
    //             {cities.map((city, index) => (
    //               <div key={index}>
    //                 <input
    //                   type="radio"
    //                   id={city}
    //                   name="city"
    //                   value={city}
    //                   checked={selectedCity === city}
    //                   onChange={() => handleCityChange(city)}
    //                 />
    //                 <label htmlFor={city}>{city}</label>
    //               </div>
    //             ))}
    //           </div>
    //           <div className="cities">
    //             <h2>Filter Job By Niche</h2>
    //             {nichesArray.map((niche, index) => (
    //               <div key={index}>
    //                 <input
    //                   type="radio"
    //                   id={niche}
    //                   name="niche"
    //                   value={niche}
    //                   checked={selectedNiche === niche}
    //                   onChange={() => handleNicheChange(niche)}
    //                 />
    //                 <label htmlFor={niche}>{niche}</label>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //         <div className="container">
    //           <div className="mobile-filter">
    //             <select value={city} onChange={(e) => setCity(e.target.value)}>
    //               <option value="">Filter By City</option>
    //               {cities.map((city, index) => (
    //                 <option value={city} key={index}>
    //                   {city}
    //                 </option>
    //               ))}
    //             </select>
    //             <select
    //               value={niche}
    //               onChange={(e) => setNiche(e.target.value)}
    //             >
    //               <option value="">Filter By Niche</option>
    //               {nichesArray.map((niche, index) => (
    //                 <option value={niche} key={index}>
    //                   {niche}
    //                 </option>
    //               ))}
    //             </select>
    //           </div>
    //           <div className="jobs_container">
    //             {jobs &&
    //               jobs.map((element) => {
    //                 return (
    //                   <div className="card" key={element._id}>
    //                     {element.hiringMultipleCandidates === "Yes" ? (
    //                       <p className="hiring-multiple">
    //                         Hiring Multiple Candidates
    //                       </p>
    //                     ) : (
    //                       <p className="hiring">Hiring</p>
    //                     )}
    //                     <p className="title">{element.title}</p>
    //                     <p className="company">{element.companyName}</p>
    //                     <p className="location">{element.location}</p>
    //                     <p className="salary">
    //                       <span>Salary:</span> Rs. {element.salary}
    //                     </p>
    //                     <p className="posted">
    //                       <span>Posted On:</span>{" "}
    //                       {element.jobPostedOn.substring(0, 10)}
    //                     </p>
    //                     <div className="btn-wrapper">
    //                       <Link
    //                         className="btn"
    //                         to={`/post/application/${element._id}`}
    //                       >
    //                         Apply Now
    //                       </Link>
    //                     </div>
    //                   </div>
    //                 );
    //               })}
    //           </div>
    //         </div>
    //       </div>
    //     </section>
    //   )}
    // </>

    <>
      <Toaster />
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex h-screen">
          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 bottom-0 w-64 transform bg-white border-r transition-transform duration-300 ease-in-out z-10 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 lg:relative`}
          >
            <div className="px-4 py-6 flex flex-col">
              {/* <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
              Logo
            </span> */}
              <div className="flex items-center flex-row-reverse justify-between mb-4">
                <button
                  className="lg:hidden"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <X />
                </button>
              </div>
              <div className="lg:hidden search-tab-wrapper flex items-center space-x-2 max-w-full">
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search for jobs..."
                />
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Search />
                </button>
              </div>
            </div>

            {/* Sidebar Content - scrollable */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <ul className="space-y-1">
                {/* Initially hidden, open only when logged in */}
                {/* <li>
                <a
                  href="#"
                  className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  Applied Jobs
                </a>
              </li> */}

                <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      <span className="text-sm font-medium">
                        Filter by City
                      </span>
                      <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                        <ChevronDown />
                      </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                      {cities.map((city, index) => (
                        <div
                          key={index}
                          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                          id="cities"
                          onClick={() => handleCityChange(city)}
                        >
                          <input
                            type="radio"
                            id={city}
                            name="city"
                            value={city}
                            checked={selectedCity === city}
                            onChange={() => handleCityChange(city)}
                            className="mr-2"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <label
                            htmlFor={city}
                            onClick={(e) => e.stopPropagation()} // Prevent event bubbling
                          >
                            {city}
                          </label>
                        </div>
                      ))}
                    </ul>
                  </details>
                </li>

                <li>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Billing
                  </a>
                </li>

                <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      <span className="text-sm font-medium">
                        Filter Job By Niche
                      </span>
                      <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                        <ChevronDown />
                      </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                      {nichesArray.map((niche, index) => (
                        <div
                          key={index}
                          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
                          id="cities"
                          onClick={() => handleNicheChange(niche)}
                        >
                          <input
                            type="radio"
                            id={niche}
                            name="niche"
                            value={niche}
                            checked={selectedNiche === niche}
                            onChange={() => handleNicheChange(niche)}
                            className="mr-2"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <label
                            htmlFor={niche}
                            onClick={(e) => e.stopPropagation()} // Prevent event bubbling
                            className="overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            {niche}
                          </label>
                        </div>
                      ))}
                    </ul>
                  </details>
                </li>

                <li>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Applied jobs
                  </a>
                </li>
              </ul>
            </div>

            {/* User Info at the bottom */}
            <div className="flex-none border-t border-gray-100">
              <a
                href="#"
                className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
              >
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs">
                    <strong className="block font-medium">
                      Eric Frusciante
                    </strong>
                    <span>eric@frusciante.com</span>
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className={`flex-1 p-6  transition-all duration-300`}>
            <button
              className="lg:hidden mb-4"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden lg:flex justify-center pb-10 items-center w-full">
              <div className="  flex items-center space-x-2 max-w-full">
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-[310px] px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search for jobs..."
                />
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Search />
                </button>
              </div>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4">
              {jobs &&
                jobs.map((element) => (
                  <a
                    key={element._id}
                    href={`/post/application/${element._id}`}
                    className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
                  >
                    {element.hiringMultipleCandidates === "Yes" ? (
                      <p className="absolute top-4 left-4 px-2  text-xs font-medium text-white bg-green-500 rounded">
                        Hiring Multiple Candidates
                      </p>
                    ) : (
                      <p className="absolute top-4 left-4 px-2  text-xs font-medium text-white bg-blue-500 rounded">
                        Hiring
                      </p>
                    )}
                    <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
                      <div className=" pt-4">
                        <h3 className="text-lg font-bold text-gray-900 sm:text-xl truncate">
                          {element.title}
                        </h3>
                        <p className="mt-1 text-xs font-medium text-gray-600 truncate">
                          {element.companyName}
                        </p>
                      </div>
                      <div className="lg:hidden hidden sm:block sm:shrink-0">
                        <img
                          alt=""
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                          className="h-16 w-16 rounded-lg object-cover shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-gray-500 truncate">
                        {element.introduction.length > 100
                          ? element.introduction.substring(0, 100) + "..."
                          : element.introduction}
                      </p>
                    </div>

                    <dl className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-6">
                      <div className="flex flex-col">
                        <dt className="text-sm font-medium text-gray-600">
                          Posted On
                        </dt>
                        <dd className="text-xs text-gray-500">
                          {element.jobPostedOn.substring(0, 10)}
                        </dd>
                      </div>

                      <div className="flex flex-col">
                        <dt className="text-sm font-medium text-gray-600">
                          Salary
                        </dt>
                        <dd className="text-xs text-gray-500">
                          Rs. {element.salary}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-4 flex justify-end">
                      <Link
                        className="btn px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        to={`/post/application/${element._id}`}
                      >
                        Apply Now
                      </Link>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Jobs;
