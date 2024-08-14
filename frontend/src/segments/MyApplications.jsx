import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  clearAllApplicationErrors,
  resetApplicationSlice,
  deleteApplication,
  fetchJobSeekerApplications,
} from "../store/slices/applicationSlice";
import Spinner from "../components/Spinner";

const MyApplications = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, applications, message } = useSelector(
    (state) => state.applications,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobSeekerApplications());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(fetchJobSeekerApplications());
    }
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications.length <= 0 ? (
        <h1 className="text-2xl font-semibold text-center">
          You have not applied for any job.
        </h1>
      ) : (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-6">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            My Applications For Jobs
          </h3>
          <div className="space-y-6">
            {applications.map((element) => (
              <div
                key={element._id}
                className="bg-gray-100 border border-gray-300 rounded-md p-4"
              >
                <div className="mb-4">
                  <p className="text-lg font-bold mb-1">Job Title:</p>
                  <p className="text-gray-700">{element.jobInfo.jobTitle}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold mb-1">Name:</p>
                  <p className="text-gray-700">{element.jobSeekerInfo.name}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold mb-1">Email:</p>
                  <p className="text-gray-700">{element.jobSeekerInfo.email}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold mb-1">Phone:</p>
                  <p className="text-gray-700">{element.jobSeekerInfo.phone}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold mb-1">Address:</p>
                  <p className="text-gray-700">
                    {element.jobSeekerInfo.address}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold mb-1">Cover Letter:</p>
                  <textarea
                    value={element.jobSeekerInfo.coverLetter}
                    rows={5}
                    disabled
                    className="w-full bg-gray-200 border border-gray-300 rounded-md p-3"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                    onClick={() => handleDeleteApplication(element._id)}
                  >
                    Delete Application
                  </button>
                  <Link
                    to={
                      element.jobSeekerInfo && element.jobSeekerInfo.resume.url
                    }
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
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
    </>
  );
};

export default MyApplications;
