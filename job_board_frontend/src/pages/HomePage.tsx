import React from "react";
import JobList from "../components/Jobs/JobList";
import { fetchJobs } from "../api/getJobsApi";
import { useJobStore } from "../store/jobStore";
import { useQuery } from "react-query";
import FilterForm from "../components/Jobs/JobFilterForm";
import Pagination from "../components/Jobs/Pagination";
const HomePage = () => {
  const setJobs = useJobStore((state) => state.setJobs);
  const filters = useJobStore((state) => state.filters);
  const { isLoading } = useQuery(
    ["jobs", filters],
    async () => {
      const response = await fetchJobs();
      return response;
    },
    {
      onSuccess: (data) => {
        setJobs(data.jobs, data.pagination);
      },
      // Delay refetching to avoid too many API calls while typing
      staleTime: 500,
    }
  );
  return (
    <div className="flex flex-col h-screen">
      {/* Header row that spans the full width */}
      <div className="w-full bg-white-50 p-6 mb-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Find Your Next Opportunities
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 h-screen">
        {/* Left sidebar - Filter section */}
        <div className="w-full h-[90vh] md:w-1/4">
          <FilterForm />
        </div>

        {/* Right content - Job listings */}
        <div className="w-full md:w-3/4p-4 h-[90vh] rounded">
          {isLoading && <p>Loading jobs...</p>}
          <JobList />
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
