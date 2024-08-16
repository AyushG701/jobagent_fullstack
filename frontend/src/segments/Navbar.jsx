import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <header className="bg-white  ">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link className="block text-teal-600" to="/">
                <span className="sr-only">Home</span>
                <img src="/logo.png" alt="logo" className="h-8" />
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      to="/"
                      onClick={() => setShow(false)}
                    >
                      HOME
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      to="/jobs"
                      onClick={() => setShow(false)}
                    >
                      JOBS
                    </Link>
                  </li>
                  {/* {isAuthenticated ? (
                    <li>
                      <Link
                        className="text-gray-500 transition hover:text-gray-500/75"
                        to="/dashboard"
                        onClick={() => setShow(false)}
                      >
                        DASHBOARD
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link
                        className="text-gray-500 transition hover:text-gray-500/75"
                        to="/login"
                        onClick={() => setShow(false)}
                      >
                        LOGIN
                      </Link>
                    </li>
                  )} */}
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className=" sm:flex">
                  <Link
                    className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white"
                    to="/dashboard"
                    onClick={() => setShow(false)}
                  >
                    Dashboard
                  </Link>
                </div>
              ) : (
                <div className="sm:flex sm:gap-4">
                  <Link
                    className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                    to="/login"
                    onClick={() => setShow(false)}
                  >
                    Login
                  </Link>

                  <div className="hidden sm:flex">
                    <Link
                      className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                      to="/register"
                      onClick={() => setShow(false)}
                    >
                      Register
                    </Link>
                  </div>
                </div>
              )}

              <div className="block md:hidden">
                <button
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                  onClick={() => setShow(!show)}
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {show && (
            <div className="block md:hidden">
              <nav aria-label="Global">
                <ul className="flex flex-col items-start gap-4 text-sm">
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      to="/"
                      onClick={() => setShow(false)}
                    >
                      HOME
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      to="/jobs"
                      onClick={() => setShow(false)}
                    >
                      JOBS
                    </Link>
                  </li>
                  {isAuthenticated ? (
                    <li>
                      <Link
                        className="text-gray-500 transition hover:text-gray-500/75"
                        to="/dashboard"
                        onClick={() => setShow(false)}
                      >
                        DASHBOARD
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link
                        className="text-gray-500 transition hover:text-gray-500/75"
                        to="/login"
                        onClick={() => setShow(false)}
                      >
                        LOGIN
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
