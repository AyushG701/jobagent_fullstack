import { LayoutList, ThumbsUp, UserPlus } from "lucide-react";
import React from "react";

const HowItWorks = () => {
  return (
    <section className="howItWorks">
      <h3>How does it work?</h3>
      <div className="container">
        <div className="card">
          <div className="icon">
            <UserPlus />
          </div>
          <h4>Create an Account</h4>
          <p>
            Sign up for a free account as a job seeker or employer. Set up your
            profile in minutes to start posting jobs or applying for jobs.
            Customize your profile to highlight your skills or requirements.
          </p>
        </div>
        <div className="card">
          <div className="icon">
            <LayoutList />
          </div>
          <h4>Post or Browse Jobs</h4>
          <p>
            Employers can post detailed job descriptions, and job seekers can
            browse a comprehensive list of available positions. Utilize filters
            to find jobs that match your skills and preferences.
          </p>
        </div>
        <div className="card">
          <div className="icon">
            <ThumbsUp />
          </div>
          <h4>Hire or Get Hired</h4>
          <p>
            Employers can shortlist candidates and extend job offers. Job
            seekers can review job offers and accept positions that align with
            their career goals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
