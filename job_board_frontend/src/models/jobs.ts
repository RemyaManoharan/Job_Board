export interface Job {
  job_id: string;
  job_title: string;
  company: string;
  location: string;
  job_category: string;
  isRemote: boolean;
  salary: string;
  job_description: string;
  skills: string[];
  responsibilities: string[];
  posted_date: string;
}
