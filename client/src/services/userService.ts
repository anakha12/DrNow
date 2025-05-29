import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api/users";

// Send OTP
export const sendOtp = async (email: string) => {
  const response = await axios.post(`${API}/send-otp`, { email });
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
