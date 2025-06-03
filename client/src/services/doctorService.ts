import axios from "axios";

const API = import.meta.env.VITE_DOCTOR_API_URL || "http://localhost:5000/api/doctors";

// Register Doctor (step 1: save with isActive: false and send OTP)
export const sendOtp = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API}/send-otp`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // should include doctorId
  } catch (error: any) {
    throw error.response?.data || { message: "Doctor registration failed" };
  }
};

// Verify OTP (step 2: activate doctor)
export const registerDoctor = async (email: string, otp: string) => {
  try {
    const response = await axios.post(`${API}/verify-otp`, { email, otp });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "OTP verification failed" };
  }
};


export const doctorLogin = async ({ email, password }: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API}/login`, { email, password });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Login failed" };
  }
};

