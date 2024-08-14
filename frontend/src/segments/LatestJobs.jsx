import React, { useEffect } from "react";
import LatestJobCards from "./LatestJobCards";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { clearAllJobErrors, fetchJobs } from "@/store/slices/jobSlice";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <section className="px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto my-20">
        <h1 className="text-4xl font-bold">
          <span className="text-red-700">Latest & Top </span> Job Openings
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-5">
          {jobs.length <= 0 ? (
            <span>No Job Available</span>
          ) : (
            jobs
              ?.slice(0, 6)
              .map((job) => <LatestJobCards key={job._id} job={job} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestJobs;
