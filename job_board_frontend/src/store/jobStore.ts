import { create } from "zustand";
import { Job, JobDetail } from "../type/jobs";

interface JobFilters {
  title: string;
  location: string;
  isRemote: boolean | null;
  category: string[];
  minSalary: number | null;
  maxSalary: number | null;
  page: number;
  limit: number;
}
export interface PaginationData {
  total: number;
  pages: number;
  currentPage: number;
  limit: number;
}

interface JobStore {
  jobs: Job[];
  jobDetail: JobDetail | null;
  filters: JobFilters;
  pagination: PaginationData;
  setJobs: (jobs: Job[], paginationData: PaginationData) => void;
  setJobDetail: (job: JobDetail) => void;
  setFilters: (filters: Partial<JobFilters>) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}
const defaultFilters: JobFilters = {
  title: "",
  location: "",
  isRemote: null,
  category: [],
  minSalary: null,
  maxSalary: null,
  page: 1,
  limit: 5,
};
const defaultPagination: PaginationData = {
  total: 0,
  pages: 0,
  currentPage: 1,
  limit: 5,
};

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  jobDetail: null,
  filters: defaultFilters,
  pagination: defaultPagination,
  setJobs: (jobs, paginationData) => set({ jobs, pagination: paginationData }),
  setJobDetail: (job) => set({ jobDetail: job }),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
      // Reset to page 1 when applying new filters (except when changing page)
      ...(filters.page === undefined && {
        filters: { ...state.filters, ...filters, page: 1 },
      }),
    })),
  setPage: (page) =>
    set((state) => ({
      filters: { ...state.filters, page },
    })),
  resetFilters: () => set({ filters: defaultFilters }),
}));
