import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  clearAllJobErrors,
  deleteJob,
  getMyJobs,
  resetJobSlice,
} from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";

const MyJobs = () => {
  const { loading, error, myJobs, message } = useSelector(
    (state) => state.jobs,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
    dispatch(getMyJobs());
  }, [dispatch, error, message]);

  const handleDeleteJob = (id) => {
    dispatch(deleteJob(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : myJobs && myJobs.length <= 0 ? (
        <h1 className="text-2xl font-semibold text-center">
          You have not posted any job!
        </h1>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
          <h3 className="text-2xl font-semibold mb-6 text-center">My Jobs</h3>
          <div className="space-y-6">
            {myJobs.map((element) => (
              <div
                key={element._id}
                className="bg-gray-100 border border-gray-300 rounded-md p-4"
              >
                <div className="mb-4">
                  <p className="text-lg font-bold mb-1">Job Title:</p>
                  <p className="text-gray-700">{element.title}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold mb-1">Job Niche:</p>
                  <p className="text-gray-700">{element.jobNiche}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold mb-1">Salary:</p>
                  <p className="text-gray-700">{element.salary}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold mb-1">Location:</p>
                  <p className="text-gray-700">{element.location}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold mb-1">Job Type:</p>
                  <p className="text-gray-700">{element.jobType}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold mb-1">Company Name:</p>
                  <p className="text-gray-700">{element.companyName}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold mb-1">Introduction:</p>
                  <p className="text-gray-700">{element.introduction}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold mb-1">Qualifications:</p>
                  <p className="text-gray-700">{element.qualifications}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold mb-1">Responsibilities:</p>
                  <p className="text-gray-700">{element.responsibilities}</p>
                </div>
                {element.offers && (
                  <div className="mb-4">
                    <p className="text-lg font-bold mb-1">
                      What Are We Offering:
                    </p>
                    <p className="text-gray-700">{element.offers}</p>
                  </div>
                )}
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 mt-4"
                  onClick={() => handleDeleteJob(element._id)}
                >
                  Delete Job
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyJobs;
