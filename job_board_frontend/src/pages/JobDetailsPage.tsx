import React, { useState } from "react";
import { useParams } from "react-router-dom";
import JobApplicationModal from "../components/Jobs/JobApplicationModal";
import { useQuery } from "react-query";
import { fetchJobDetail } from "../api/getJobsApi";
import { useJobStore } from "../store/jobStore";

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
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="border-b pb-4 mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{jobDetail.title}</h1>
        <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
          <span>{jobDetail.company.name}</span>
          <span>•</span>
          <span>{jobDetail.location}</span>
          <span>•</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
            {jobDetail.category}
          </span>
        </div>
      </div>

      <div className="mb-6 flex gap-3">
        <h4 className="text-lg font-semibold mb-2">Salary:</h4>
        <p className="text-gray-700">{jobDetail.salary}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Description:</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {jobDetail.description}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Skills:</h2>
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

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Responsibilities:</h2>
        <p>{jobDetail.responsibilities}</p>
      </div>
      <div className="mb-6 flex gap-2">
        <h2 className="text-lg font-semibold mb-2">Posted Date :</h2>
        <p className="text-gray-700">{jobDetail.createdAt}</p>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleApplyClick}
          className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors"
        >
          Apply
        </button>
      </div>
      {isModalOpen && (
        <JobApplicationModal job={jobDetail} onClose={() => setIsModalOpen(false)}  />
      )}
    </div>
  );
};

export default JobDetailsPage;
