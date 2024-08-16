import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  clearAllApplicationErrors,
  deleteApplication,
  fetchEmployerApplications,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const Applications = () => {
  const { applications, loading, error, message } = useSelector(
    (state) => state.applications,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchEmployerApplications());
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {loading ? (
        <Spinner />
      ) : applications && applications.length <= 0 ? (
        <h1 className="text-xl font-semibold text-center text-gray-700">
          You have no applications from job seekers.
        </h1>
      ) : (
        <div>
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Applications For Your Posted Jobs
          </h3>
          <div className="space-y-6">
            {applications.map((element) => (
              <div
                key={element._id}
                className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
              >
                <div className="mb-4">
                  <p className="text-lg font-semibold">
                    <span className="font-normal">Job Title: </span>
                    {element.jobInfo.jobTitle}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-semibold">
                    <span className="font-normal">
                      Applicant`&apos;`s Name:
                    </span>
                    {element.jobSeekerInfo.name}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-semibold">
                    <span className="font-normal">Applicant's Email: </span>
                    {element.jobSeekerInfo.email}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-semibold">
                    <span className="font-normal">Applicant's Phone: </span>
                    {element.jobSeekerInfo.phone}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-semibold">
                    <span className="font-normal">Applicant's Address: </span>
                    {element.jobSeekerInfo.address}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-semibold">
                    <span className="font-normal">
                      Applicant's Cover Letter:{" "}
                    </span>
                  </p>
                  <textarea
                    value={element.jobSeekerInfo.coverLetter}
                    rows={5}
                    disabled
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                    onClick={() => handleDeleteApplication(element._id)}
                  >
                    Delete Application
                  </button>
                  <Link
                    to={element.jobSeekerInfo?.resume?.url || "#"}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    target="_blank"
                  >
                    View Resume
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
