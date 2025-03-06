import { create } from "zustand";
import { Job, JobDetail } from "../type/jobs";

interface JobFilters {
  title: string;
  location: string;
  isRemote: boolean | null;
  category: string[];
  minSalary: number | null;
  maxSalary: number | null;
}

interface JobStore {
  jobs: Job[];
  jobDetail: JobDetail | null;
  filters: JobFilters;
  setJobs: (jobs: Job[]) => void;
  setJobDetail: (job: JobDetail) => void;
  setFilters: (filters: JobFilters) => void;
  resetFilters: () => void;
}
const defaultFilters: JobFilters = {
  title: "",
  location: "",
  isRemote: null,
  category: [],
  minSalary: null,
  maxSalary: null,
};

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  jobDetail: null,
  filters: defaultFilters,
  setJobs: (jobs) => set({ jobs }),
  setJobDetail: (job) => set({ jobDetail: job }),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  resetFilters: () => set({ filters: defaultFilters }),
}));
