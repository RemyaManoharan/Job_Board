import axios from "axios";
import { SignUpFormValues, LoginFormValues } from "../type/User";
import { API_BASE_URL } from "../config";

export const signUpUser = async (userData: SignUpFormValues) => {
const response = await axios.post(`${API_BASE_URL}/api/users/register`, userData);
return response.data;
};

export const loginUser = async (userData: LoginFormValues) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/users/login`,
      userData
    );
    return response.data;
  };
  export const fetchCurrentUser = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/users/me`);
    return response.data;
  };