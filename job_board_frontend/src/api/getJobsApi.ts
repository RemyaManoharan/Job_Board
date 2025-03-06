import  axios from 'axios';
import { JobDetail, Job} from '../type/jobs';


export const fetchJobs = async (): Promise<Job[]> => {
    const response = await axios.get("http://localhost:8000/api/jobs");
    return response.data.jobs;
  };

  export const fetchJobDetail = async (jobId: number): Promise<JobDetail> => {
    const response = await axios.get(`http://localhost:8000/api/jobs/${jobId}`);
    return response.data;
  };