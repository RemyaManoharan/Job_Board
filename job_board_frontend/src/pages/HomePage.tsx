import React from "react";
import JobList from "../components/Jobs/JobList";
import { fetchJobs } from "../api/getJobsApi";
import { useJobStore } from "../store/jobStore";
import { useQuery } from "react-query";
import FilterForm from "../components/Jobs/JobFilterForm";
const HomePage = () => {
  const setJobs = useJobStore((state) => state.setJobs);
  const filters = useJobStore((state) => state.filters);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { data: jobs, isLoading } = useQuery("jobs", fetchJobs, {
  //   onSuccess: (data) => {
  //     setJobs(data);
  //   },
  // });
  const { isLoading } = useQuery(
    ["jobs", filters],
    async () => {
      const response = await fetchJobs();
      return response;
    },
    {
      onSuccess: (data) => {
        setJobs(data);
      },
      // Delay refetching to avoid too many API calls while typing
      staleTime: 500,
    }
  );
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Left sidebar - Filter section */}
      <div className="w-full md:w-1/4">
        <FilterForm />
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
