import { useState } from "react";
import { useParams } from "react-router-dom";
import JobApplicationModal from "../components/Jobs/JobApplicationModal";
import { useQuery } from "react-query";
import { fetchJobDetail } from "../api/getJobsApi";
import { useJobStore } from "../store/jobStore";
import { BadgeEuro } from "lucide-react";
import { formatSalary, formatDate } from "../utils/utils";
const JobDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const setJobDetail = useJobStore((state) => state.setJobDetail);
  const jobDetail = useJobStore((state) => state.jobDetail);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoading, error } = useQuery(
    ["jobDetail", id],
    () => fetchJobDetail(Number(id)),
    {
      onSuccess: (data) => setJobDetail(data),
    }
  );

  if (isLoading) return <p>Loading job details...</p>;
  if (error || !jobDetail) return <p>Failed to load job details</p>;
  const handleApplyClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div
      className="min-h-screen pt-10 pb-16"
      style={{ backgroundColor: "#F7F9FC" }}
    >
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <div className="pb-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {jobDetail.title}
          </h1>
          <div className="flex flex-wrap gap-2 mt-2 text-gray-600">
            <span>{jobDetail.company.name}</span>
            <span>•</span>
            <span>{jobDetail.location}</span>
            {jobDetail.category && (
              <>
                <span>•</span>
                <span>{jobDetail.category.toUpperCase()}</span>
              </>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 my-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center">
            <h4 className="text-lg font-semibold mr-2">Salary:</h4>
            <div className="flex items-center text-gray-700">
              <BadgeEuro size={16} className="mr-1" />
              <span>{formatSalary(jobDetail.salary)}</span>
            </div>
          </div>

          <div className="flex items-center">
            <h4 className="text-lg font-semibold mr-2">Posted:</h4>
            <p className="text-gray-700">{formatDate(jobDetail.createdAt)}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Description</h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {jobDetail.description}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {jobDetail.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Responsibilities</h2>
          <p className="text-gray-700 leading-relaxed">
            {jobDetail.responsibilities}
          </p>
        </div>

        <div className="mt-10 flex justify-end">
          <button
            onClick={handleApplyClick}
            className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors"
          >
            Apply Now
          </button>
        </div>
      </div>

      {isModalOpen && (
        <JobApplicationModal
          job={jobDetail}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default JobDetailsPage;
