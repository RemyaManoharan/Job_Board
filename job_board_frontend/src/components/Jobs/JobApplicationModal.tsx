import React, { useState } from "react";
import { JobDetail } from "../../type/jobs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { X, Upload } from "lucide-react";
import { useMutation } from "react-query";
import { submitJobApplication } from "../../api/postApplyJob";
import { JobApplicationData } from "../../type/jobs";
import { useParams } from "react-router-dom";

interface JobApplicationModalProps {
  job?: JobDetail;
  onClose: () => void;
}
interface ApplicationFormValues {
  name: string;
  email: string;
  contactNumber: string;
  resume: File | null;
}
const applicationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  contactNumber: Yup.string().required("Contact number is required"),
  resume: Yup.mixed().required("Resume is required"),
});
const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  job,
  onClose,
}) => {
  const { id: jobIdUrl } = useParams<{ id: string }>();
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mutation = useMutation<any, Error, JobApplicationData>(
    (data) => submitJobApplication(data),
    {
      onSuccess: () => {
        alert("Job application submitted successfully! ✅");
        onClose();
      },
      onError: () => {
        alert("❌ Failed to submit application. Please try again.");
      },
    }
  );

  const initialValues: ApplicationFormValues = {
    name: "",
    email: "",
    contactNumber: "",
    resume: null,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (
    values: ApplicationFormValues,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { setSubmitting }: any
  ) => {
    const jobId = job?.id || jobIdUrl;
    if (!jobId) {
      console.error("No job ID provided");
      return;
    }
    mutation.mutate({
      ...values,
      job_id: jobId,
    });
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/10 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-md">
        {/* Close button in top right corner using Lucide X icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold text-center mb-6">
          Apply for this Job
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={applicationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  className="w-full p-3 border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="Contact Number"
                  className="w-full p-3 border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="contactNumber"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex items-center">
                <label className="block min-w-[100px]">Resume/CV</label>
                <div className="flex-1">
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0] || null;
                      if (file) {
                        setSelectedFileName(file.name);
                        setFieldValue("resume", file);
                      }
                    }}
                    className="hidden"
                  />
                  <label
                    htmlFor="resume"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded bg-white cursor-pointer"
                  >
                    <Upload size={18} className="mr-2" />
                    {selectedFileName ? "Change File" : "Select File"}
                  </label>
                  {selectedFileName && (
                    <span className="ml-3 text-sm text-gray-600 truncate max-w-[200px]">
                      {selectedFileName}
                    </span>
                  )}
                </div>
                <ErrorMessage
                  name="resume"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || mutation.isLoading}
                  className="w-full bg-blue-500 text-white font-medium py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                >
                  {mutation.isLoading ? "Submitting..." : "Apply"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default JobApplicationModal;
