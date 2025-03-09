import React from "react";
import { Job } from "../../type/jobs";
import { useNavigate } from "react-router-dom";
import { BadgeEuro, MapPin } from "lucide-react";
import { formatSalary } from "../../utils/utils";

interface JobCardProps {
  job: Job;
}
const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/jobs/${job.id}`);
  };
  return (
    <div
      className="job-card mb-4 p-2 border-0 bg-white rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer relative"
      onClick={handleClick}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 "></div>
      <div className="p-1 pl-3">
        <h2 className="text-xl font-bold">{job.title}</h2>
        <div className="text-lg text-gray-600 mb-3">
          {job.company} • {job.isRemote ? "Remote" : "On-site"}
        </div>
      </div>

      <div className="flex items-center pl-4 text-sm text-gray-500 mt-1 pt-2 border-t border-gray-100">
        <div className="flex items-center mr-4">
          <MapPin size={16} className="mr-1" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center mr-4">
          <BadgeEuro size={16} className="mr-1" />
          <span>{formatSalary(job.salary)}</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;


