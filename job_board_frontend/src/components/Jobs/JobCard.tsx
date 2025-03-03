import React from "react";
import { Job } from "../../type/jobs";
import { useNavigate } from "react-router-dom";

interface JobCardProps {
  job: Job;
}
const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/jobs/${job.job_id}`);
  };
  return (
    <div
      className="mb-4 p-4 border border-gray-200 bg-white rounded hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <h2 className="text-xl font-bold">{job.job_title}</h2>
      <div className="text-sm text-gray-600">
        {job.company} • {job.location} • {job.isRemote ? "Remote" : "On-site"}
      </div>
    </div>
  );
};

export default JobCard;
