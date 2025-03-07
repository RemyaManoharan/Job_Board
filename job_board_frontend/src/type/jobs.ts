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
