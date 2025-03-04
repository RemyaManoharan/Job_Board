import React, { useState } from "react";
import { useParams } from "react-router-dom";
import JobApplicationModal from "../components/Jobs/JobApplicationModal";

const JobDetailsPage = () => {
  const { jobId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const job = {
    job_id: "1",
    job_title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "New York, NY",
    job_category: "Full time",
    isRemote: true,
    salary: "$120,000 - $150,000",
    job_description:
      "We are looking for an experienced Frontend Developer to join our team to build innovative user interfaces for our flagship product.We are seeking a skilled Senior Frontend Developer with experience in Vuejs and TailwindCSS to join our team. As part of our tech force, you'll contribute to helping craft the next generation of systems for conference venues and hotels.",
    skills: ["React", "TypeScript", "GraphQL", "CSS3", "Webpack"],
    responsibilities: [
      "Develop responsive and accessible web applications",
      "Collaborate with UX designers to implement modern UI features",
      "Optimize application for maximum performance",
      "Ensure code quality and best practices",
      "Strategic Development: Play a key role in making strategic development decisions and frontend architecture that influence the direction of our SaaS offering, ensuring they are aligned with our business goals and user needs",
    ],
    posted_date: "2025-02-15",
  };
  const handleApplyClick = () => {
    setIsModalOpen(true);
  };
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="border-b pb-4 mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{job.job_title}</h1>
        <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
          <span>{job.company}</span>
          <span>•</span>
          <span>{job.location}</span>
          <span>•</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
            {job.job_category}
          </span>
        </div>
      </div>

      <div className="mb-6 flex gap-3">
        <h4 className="text-lg font-semibold mb-2">Salary:</h4>
        <p className="text-gray-700">{job.salary}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Description:</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {job.job_description}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Skills:</h2>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, index) => (
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
        <ul className="list-disc pl-5 text-gray-700">
          {job.responsibilities.map((responsibility, index) => (
            <li key={index}>{responsibility}</li>
          ))}
        </ul>
      </div>
      <div className="mb-6 flex gap-2">
        <h2 className="text-lg font-semibold mb-2">Posted Date :</h2>
        <p className="text-gray-700">{job.posted_date}</p>
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
        <JobApplicationModal onClose={() => setIsModalOpen(false)} job={job} />
      )}
    </div>
  );
};

export default JobDetailsPage;
