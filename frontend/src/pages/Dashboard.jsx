import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { logout, clearAllUserErrors } from "../store/slices/userSlice";

import {
  Briefcase,
  File,
  FileText,
  Inbox,
  LayoutDashboard,
  Lock,
  LogOut,
  PanelsTopLeft,
  User,
  UserPen,
} from "lucide-react";
import MyProfile from "@/segments/MyProfile";
import UpdateProfile from "@/segments/UpdateProfile";
import UpdatePassword from "@/segments/UpdatePassword";
import JobPost from "@/segments/JobPost";
import Myjobs from "@/segments/Myjobs";
import Applications from "@/segments/Applications";
import MyApplications from "@/segments/MyApplications";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [componentName, setComponentName] = useState("My Profile");

  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user,
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
      .then(() => {
        toast.success("Logged out successfully.");
      })
      .catch((error) => {
        toast.error(error || "Failed to log out. Please try again.");
      });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated]);

  return (
    <section className="flex h-screen overflow-hidden bg-gray-50 mt-10">
      <div
        className={`flex-shrink-0 ${
          show ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300`}
      >
        <div className="p-4 mt-10">
          <div className="absolute top-[4.5rem] left-[1.1rem] cursor-pointer">
            <PanelsTopLeft
              onClick={() => setShow(!show)}
              className={`text-2xl text-gray-500 transition-transform duration-300 ${
                show ? "rotate-180" : ""
              }`}
            />
          </div>
          <p className="text-lg font-semibold">
            {!show ? <LayoutDashboard /> : "Dashboard"}
          </p>
          <div className="mt-2 text-sm text-gray-600">
            {show && (
              <p className="mt-2 text-sm text-gray-600">
                Welcome!
                <span className="font-medium">{user && user.name}</span>
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <ul className="mt-4 space-y-2">
            <li>
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => {
                  setComponentName("My Profile");
                  setShow(!show);
                }}
              >
                {!show ? <User /> : "My Profile"}
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => {
                  setComponentName("Update Profile");
                  setShow(!show);
                }}
              >
                {!show ? <UserPen /> : "Update Profile"}
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => {
                  setComponentName("Update Password");
                  setShow(!show);
                }}
              >
                {!show ? <Lock /> : "Update Password"}
              </button>
            </li>

            {user && user.role === "Employer" && (
              <>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                    onClick={() => {
                      setComponentName("Job Post");
                      setShow(!show);
                    }}
                  >
                    {!show ? <Briefcase /> : "Post New Job"}
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                    onClick={() => {
                      setComponentName("My Jobs");
                      setShow(!show);
                    }}
                  >
                    {!show ? <FileText /> : "My Jobs"}
                  </button>
                </li>

                <li>
                  <button
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                    onClick={() => {
                      setComponentName("Applications");
                      setShow(!show);
                    }}
                  >
                    {!show ? <File /> : "Applications"}
                  </button>
                </li>
              </>
            )}

            {user && user.role === "Job Seeker" && (
              <li>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                  onClick={() => {
                    setComponentName("My Applications");
                    setShow(!show);
                  }}
                >
                  {!show ? <Inbox /> : "My Applications"}
                </button>
              </li>
            )}
            <li>
              <button
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                onClick={handleLogout}
              >
                {!show ? <LogOut /> : "Logout"}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`flex-1 p-4 ${
          show ? "ml-8" : "ml-20"
        } transition-all duration-300`}
      >
        {(() => {
          switch (componentName) {
            case "My Profile":
              return <MyProfile />;
            case "Update Profile":
              return <UpdateProfile />;
            case "Update Password":
              return <UpdatePassword />;
            case "Job Post":
              return <JobPost />;
            case "My Jobs":
              return <Myjobs />;
            case "Applications":
              return <Applications />;
            case "My Applications":
              return <MyApplications />;
            default:
              return <MyProfile />;
          }
        })()}
      </div>
    </section>
  );
};

export default Dashboard;
