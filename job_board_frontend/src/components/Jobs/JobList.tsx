import React from "react";
import JobCard from "./JobCard";
import { useJobStore } from "../../store/jobStore";

const JobList = () => {
  const jobs = useJobStore((state) => state.jobs);
  return (
    <div className="w-full md:w-3/4 rounded">
      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        jobs.map((job) => <JobCard key={job.id} job={job} />)
      )}
    </div>
  );
};

export default JobList;
