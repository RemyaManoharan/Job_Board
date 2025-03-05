import axios from "axios";
import { SignUpFormValues } from "../type/User";


// console.log("API URL:", process.env.REACT_APP_API_URL);
export const signUpUser = async (userData: SignUpFormValues) => {
// const apiUrl = `${process.env.REACT_APP_API_URL}/users/register`;
//  const response = await axios.post(apiUrl, userData);
const response = await axios.post('http://localhost:8000/api/users/register', userData);
return response.data; // This includes the user object and the token
};
