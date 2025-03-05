import axios from "axios";
import { SignUpFormValues, LoginFormValues } from "../type/User";

export const signUpUser = async (userData: SignUpFormValues) => {
const response = await axios.post('http://localhost:8000/api/users/register', userData);
return response.data;
};

export const loginUser = async (userData: LoginFormValues) => {
    const response = await axios.post(
      "http://localhost:8000/api/users/login",
      userData
    );
    return response.data;
  };