import { create } from "zustand";
import { Job, JobDetail } from "../type/jobs";

interface JobStore {
  jobs: Job[];
  jobDetail: JobDetail | null;
  setJobs: (jobs: Job[]) => void;
  setJobDetail: (job: JobDetail) => void;
}
export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  jobDetail: null,
  setJobs: (jobs) => set({ jobs }),
  setJobDetail: (job) => set({ jobDetail: job }),
}));
