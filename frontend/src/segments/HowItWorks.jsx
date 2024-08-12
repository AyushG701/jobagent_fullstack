import { LayoutList, ThumbsUp, UserPlus } from "lucide-react";
import React from "react";

const HowItWorks = () => {
  return (
    <section className="mt-8 min-h-[69vh] mb-8 py-12 px-4 lg:px-8">
      <h3 className="text-center text-2xl font-bold mb-8">How does it work?</h3>
      <div className="container mt-20 grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
        <article className="rounded-xl border-2 border-gray-100 bg-white transition-transform hover:-translate-y-2 p-4 sm:p-6 lg:p-8">
          <h4 className="font-medium sm:text-lg">Create an Account</h4>
          <p className="line-clamp-2 text-sm text-gray-700">
            Sign up for a free account as a job seeker or employer. Set up your
            profile in minutes to start posting jobs or applying for jobs.
            Customize your profile to highlight your skills or requirements.
          </p>
        </article>
        <article className="rounded-xl border-2 border-gray-100 bg-white transition-transform hover:-translate-y-2 p-4 sm:p-6 lg:p-8">
          <h4 className="font-medium sm:text-lg">Post or Browse Jobs</h4>
          <p className="line-clamp-2 text-sm text-gray-700">
            Employers can post detailed job descriptions, and job seekers can
            browse a comprehensive list of available positions. Utilize filters
            to find jobs that match your skills and preferences.
          </p>
        </article>
        <article className="rounded-xl border-2 border-gray-100 bg-white transition-transform hover:-translate-y-2 p-4 sm:p-6 lg:p-8">
          <h4 className="font-medium sm:text-lg">Hire or Get Hired</h4>
          <p className="line-clamp-2 text-sm text-gray-700">
            Employers can shortlist candidates and extend job offers. Job
            seekers can review job offers and accept positions that align with
            their career goals.
          </p>
        </article>
      </div>
    </section>
  );
};

export default HowItWorks;
