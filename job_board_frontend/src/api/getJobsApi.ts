import axios from "axios";
import { JobDetail, Job } from "../type/jobs";
import { useJobStore } from "../store/jobStore";

export interface ApiResponse {
  jobs: Job[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    limit: number;
  };
}
export const fetchJobs = async (): Promise<ApiResponse> => {
  const filters = useJobStore.getState().filters;
  const params = new URLSearchParams();

  if (filters.title) {
    params.append("search", filters.title);
  }

  if (filters.location) {
    params.append("location", filters.location);
  }

  if (filters.isRemote !== null) {
    params.append("isRemote", String(filters.isRemote));
  }

  if (filters.category && filters.category.length > 0) {
    params.append("category", filters.category[0]);
  }

  if (filters.minSalary !== null) {
    params.append("minSalary", String(filters.minSalary));
  }

  if (filters.maxSalary !== null) {
    params.append("maxSalary", String(filters.maxSalary));
  }

  // Default pagination values
  params.append("page", String(filters.page));
  params.append("limit", String(filters.limit));

  const response = await axios.get(
    `http://localhost:8000/api/jobs?${params.toString()}`
  );
  return response.data;
};

export const fetchJobDetail = async (jobId: number): Promise<JobDetail> => {
  const response = await axios.get(`http://localhost:8000/api/jobs/${jobId}`);
  return response.data;
};
