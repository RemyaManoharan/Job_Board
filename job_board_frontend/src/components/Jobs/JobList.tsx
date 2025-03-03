import React from "react";
import JobCard from "./JobCard";
import { Job } from "../../type/jobs";

const JobList = () => {
  const jobs: Job[] = [
    {
      job_id: "1",
      job_title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "New York, NY",
      job_category: "Engineering",
      isRemote: true,
      salary: "$120,000 - $150,000",
      job_description:
        "We are looking for an experienced Frontend Developer to join our team to build innovative user interfaces for our flagship product.",
      skills: ["React", "TypeScript", "GraphQL", "CSS3", "Webpack"],
      responsibilities: [
        "Develop responsive and accessible web applications",
        "Collaborate with UX designers to implement modern UI features",
        "Optimize application for maximum performance",
        "Ensure code quality and best practices",
      ],
      posted_date: "2025-02-15",
    },
    {
      job_id: "2",
      job_title: "Backend Developer",
      company: "DataSystems Inc.",
      location: "San Francisco, CA",
      job_category: "Engineering",
      isRemote: false,
      salary: "$110,000 - $140,000",
      job_description:
        "Join our backend team to build scalable APIs and microservices for our cloud-based platform.",
      skills: ["Node.js", "Express", "PostgreSQL", "Docker", "AWS"],
      responsibilities: [
        "Design and implement RESTful APIs",
        "Develop microservices architecture",
        "Optimize database performance",
        "Implement security best practices",
      ],
      posted_date: "2025-02-20",
    },
    {
      job_id: "3",
      job_title: "Product Manager",
      company: "InnovateTech",
      location: "Austin, TX",
      job_category: "Product",
      isRemote: true,
      salary: "$130,000 - $160,000",
      job_description:
        "We are seeking a product manager to lead our customer-facing applications team and drive product vision.",
      skills: [
        "Product Strategy",
        "Agile",
        "User Research",
        "Data Analysis",
        "Product Roadmapping",
      ],
      responsibilities: [
        "Define product vision and strategy",
        "Create and prioritize product backlog",
        "Work with engineering and design teams",
        "Analyze market trends and user feedback",
      ],
      posted_date: "2025-02-25",
    },
    {
      job_id: "4",
      job_title: "DevOps Engineer",
      company: "CloudSolutions",
      location: "Seattle, WA",
      job_category: "Operations",
      isRemote: true,
      salary: "$125,000 - $155,000",
      job_description:
        "Looking for a DevOps engineer to improve our CI/CD pipelines and infrastructure automation.",
      skills: ["Kubernetes", "Terraform", "AWS", "CI/CD", "Linux"],
      responsibilities: [
        "Manage cloud infrastructure using IaC",
        "Design and implement CI/CD pipelines",
        "Automate deployment processes",
        "Monitor system performance",
      ],
      posted_date: "2025-02-18",
    },
    {
      job_id: "5",
      job_title: "UX/UI Designer",
      company: "CreativeUI",
      location: "Chicago, IL",
      job_category: "Design",
      isRemote: false,
      salary: "$90,000 - $120,000",
      job_description:
        "Join our design team to create engaging and intuitive user experiences for our web and mobile applications.",
      skills: [
        "Figma",
        "Sketch",
        "User Research",
        "Prototyping",
        "Design Systems",
      ],
      responsibilities: [
        "Create wireframes and prototypes",
        "Conduct user research and usability testing",
        "Collaborate with developers on implementation",
        "Maintain and evolve design systems",
      ],
      posted_date: "2025-02-10",
    },
  ];
  return (
    <div className="w-full md:w-3/4  p-4 rounded">
      {jobs.map((job) => (
        <JobCard key={job.job_id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
