import axios from "axios";

const API = import.meta.env.VITE_ADMIN_API_URL || "http://localhost:5000/api/admin";

// Admin Login
export const adminLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API}/login`, { email, password });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Admin login failed";
    throw new Error(message);
  }
};

export const getUnverifiedDoctors = async () => {
  try {
    const token = localStorage.getItem("adminToken"); 
    const response = await axios.get(`${API}/unverified-doctors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to fetch unverified doctors";
    throw new Error(message);
  }
};

export const verifyDoctorById = async (doctorId: string) => {
  try {
    const token = localStorage.getItem("adminToken"); 
    const response = await axios.post(
      `${API}/verify-doctor/${doctorId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to verify doctor";
    throw new Error(message);
  }
};

export const rejectDoctorById = async (doctorId: string) => {
  try {
    const token = localStorage.getItem("adminToken"); 
    const response = await axios.post(
      `${API}/reject-doctor/${doctorId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to reject doctor";
    throw new Error(message);
  }
};
