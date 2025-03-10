import axios from "axios";
import { JobApplicationData, JobApplicationResponse } from "../type/jobs";
import { API_BASE_URL } from "../config";

export const submitJobApplication = async (
  applicationData: JobApplicationData
): Promise<JobApplicationResponse> => {
  // Create FormData for file upload
  const formData = new FormData();
  formData.append("name", applicationData.name);
  formData.append("email", applicationData.email);
  formData.append("contactNumber", applicationData.contactNumber);
  formData.append("job_id", applicationData.job_id.toString());

  // Append resume file if it exists
  if (applicationData.resume) {
    formData.append("resume", applicationData.resume);
  }

  try {
    const response = await axios.post<JobApplicationResponse>(
      `${API_BASE_URL}/api/applications`,
      formData
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error("Failed to submit job application");
  }
};
