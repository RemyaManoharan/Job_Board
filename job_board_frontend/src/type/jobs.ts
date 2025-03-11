export interface Job {
  id: number;
  title: string;
  location: string;
  company: string;
  category: string;
  isRemote: boolean;
  salary: string;
  createdAt: string;
}
export interface Company {
  id: number;
  name: string;
  description: string;
  websiteUrl: string;
  location: string;
}
export interface JobDetail {
  id: number;
  title: string;
  description: string;
  skills: string[];
  responsibilities: string;
  location: string;
  salary: string;
  category: string;
  isRemote: boolean;
  status: string;
  createdAt: string;
  company: Company;
}
export interface JobApplicationData {
  name: string;
  email: string;
  contactNumber: string;
  resume: File | null;
  job_id: number | string;
}

export interface JobApplicationResponse {
  success: boolean;
  message: string;
  data: {
    application_id: number;
    job_id: number | string;
    name: string;
    email: string;
    resume_url: string | null;
    applied_at: string;
  };
}
