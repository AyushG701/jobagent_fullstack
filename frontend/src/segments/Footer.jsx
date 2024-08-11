import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { ChevronUp, InstagramIcon, Linkedin, X, Youtube } from "lucide-react";

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-100">
      <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
          <span className="sr-only">Back to top</span>
          {isVisible && (
            <button
              onClick={scrollToTop}
              className="p-3 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-all"
              aria-label="Back to Top"
            >
              <ChevronUp />
            </button>
          )}
        </div>

        <div className="mb-8 lg:mb-0 lg:w-1/4">
          <div className="flex justify-center lg:justify-start">
            <img src="/logo.png" alt="logo" className="h-8" />
          </div>
        </div>
        <div className="lg:flex lg:items-end lg:justify-between">
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Support</h4>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>Street No.007, Baneshwor, Kathmandu</li>
                <li>ag701@gmail.com</li>
                <li>+977 984*******6</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Quick Links
              </h4>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                {isAuthenticated && (
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900">Follow Us</h4>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>
                  <Link to="/" className="flex items-center">
                    <X className="mr-2" />
                    Twitter (X)
                  </Link>
                </li>
                <li>
                  <Link to="/" className="flex items-center">
                    <InstagramIcon className="mr-2" />
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link to="/" className="flex items-center">
                    <Youtube className="mr-2" />
                    Youtube
                  </Link>
                </li>
                <li>
                  <Link to="/" className="flex items-center">
                    <Linkedin className="mr-2" />
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-gray-500">
            &copy; CopyRight 2024. All Rights Reserved By Aayush
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
