import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
const MyProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-6 overflow-auto max-h-[666px]  bg-white scrollbar-thin scrollbar-thumb-gray-300">
      <h3 className="text-2xl font-semibold mb-6 text-center">My Profile</h3>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {/* Full Name */}
        <div>
          <label className="block  mb-2 font-bold   text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            disabled
            value={user && user.name}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block  mb-2 font-bold  text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            disabled
            value={user && user.email}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-2 font-bold text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            disabled
            value={user && user.phone}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block  mb-2 font-bold text-gray-700">Address</label>
          <input
            type="text"
            disabled
            value={user && user.address}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block  mb-2 font-bold text-gray-700">Role</label>
          <input
            type="text"
            disabled
            value={user && user.role}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Joined On */}
        <div>
          <label className="block  mb-2 font-bold text-gray-700">
            Joined On
          </label>
          <input
            type="text"
            disabled
            value={user && moment(user.createdAt).format("MMMM Do, YYYY")}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Preferred Job Niches (For Job Seekers) */}
        {user && user.role === "Job Seeker" && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              My Preferred Job Niches
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                disabled
                value={user && user.niches.firstNiche}
                className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                disabled
                value={user && user.niches.secondNiche}
                className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                disabled
                value={user && user.niches.thirdNiche}
                className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
