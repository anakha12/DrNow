import axios from "axios";
import axiosInstance from "./axiosInstance";

const API = import.meta.env.VITE_USER_API_URL || "http://localhost:5000/api/users";

export const getProtectedData = async () => {
  const response = await axiosInstance.get("/protected");
  return response.data;
};

// Send OTP
export const sendOtp = async (data: {
  name: string;
  email: string;
  password: string;
  isDonner: string;
}) => {
  const response = await axios.post(`${API}/send-otp`, data);
  return response.data;
};

// Register User
export const registerUser = async (data: {
  name : string;
  email: string;
  password: string;
  otp: string;
  isDonner: string;
}) => {
  const response = await axios.post(`${API}/register`, data);
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API}/login`, { email, password });
    return response.data;
  } catch (error: any) {
    const errData = error.response?.data || {};
    console.log("Login error:", errData);

    if (errData?.error?.includes("verify")) {
      throw { isVerificationRequired: true, email, password };
    }
    throw errData || { message: "Login failed" };
}


};