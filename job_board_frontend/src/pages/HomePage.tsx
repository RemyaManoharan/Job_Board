import React from "react";
import JobList from "../components/Jobs/JobList";
import { fetchJobs } from "../api/getJobsApi";
import { useJobStore } from "../store/jobStore";
import { useQuery } from "react-query";
const HomePage = () => {
  const setJobs = useJobStore((state) => state.setJobs);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: jobs, isLoading } = useQuery("jobs", fetchJobs, {
    onSuccess: (data) => {
      setJobs(data);
    },
  });

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Left sidebar - Filter section */}

      <div className="w-full md:w-1/4 bg-blue-200 p-4 rounded">
        {/* <div className="mb-4">
          <input 
            type="text" 
            placeholder="Filter by title" 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Filter by location" 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="mb-4 flex items-center">
          <input type="checkbox" id="remote" className="mr-2" />
          <label htmlFor="remote">Remote Work</label>
        </div>
        
        <div className="mb-4">
          <h3 className="font-medium mb-2">Types of Job</h3>
          <div className="pl-2">
            <div className="mb-1 flex items-center">
              <input type="checkbox" id="internship" className="mr-2" />
              <label htmlFor="internship">Internship</label>
            </div>
            <div className="mb-1 flex items-center">
              <input type="checkbox" id="part-time" className="mr-2" />
              <label htmlFor="part-time">Part-time</label>
            </div>
            <div className="mb-1 flex items-center">
              <input type="checkbox" id="full-time" className="mr-2" />
              <label htmlFor="full-time">Full time</label>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="font-medium mb-2">Salary Range</h3>
        
          <div className="h-6 bg-gray-300 rounded"></div>
        </div> */}
      </div>

      {/* Right content - Job listings */}
      <div className="w-full md:w-3/4p-4 rounded">
        {isLoading && <p>Loading jobs...</p>}
        <JobList />
      </div>
    </div>
  );
};

export default HomePage;
