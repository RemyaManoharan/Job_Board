import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SignUpFormValues } from "../type/User";
// import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { signUpUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

const SignUpSchema = Yup.object().shape({
  f_name: Yup.string().required("First name is required"),
  l_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  // const signIn = useSignIn();
  const initialValues: SignUpFormValues = {
    f_name: "",
    l_name: "",
    email: "",
    password: "",
  };
  const mutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      // Store user token using React Auth Kit
      // signIn({
      //   auth: {
      //     token: data.token,
      //     type: "Bearer",
      //   },
      //   userState: { id: data.user.id, name: data.user.name, email: data.user.email, role: data.user.role }, // Save user details
      // });
      console.log("User registered", data);
      navigate("/");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error(
        "Sign-up error:",
        error.response?.data?.message || error.message
      );
      alert("Sign-up failed. Please try again.");
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: SignUpFormValues, { setSubmitting }: any) => {
    mutation.mutate(values);
    setSubmitting(false);
  };
  return (
    <div className="flex h-full justify-center items-start  min-h-screen bg-gray-50 py-12">
      <div className="w-full  max-w-md p-10 bg-white shadow-md rounded">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Sign up with email
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={SignUpSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Field
                    name="f_name"
                    type="text"
                    placeholder="First Name"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="f_name"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <Field
                    name="l_name"
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="l_name"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              <div className="mb-4">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mb-6">
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-40 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                >
                  Sign Up
                </button>
              </div>

              <div className="mt-4 text-center text-sm">
                Already have an account?
                <Link
                  to="/signup"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Log in
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpPage;
