// src/services/axiosInstance.ts
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api/users";

const axiosInstance = axios.create({
  baseURL: API,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
