import { Routes, Route, Navigate } from "react-router-dom";
import UserRegister from "../features/user/UserRegister";
import UserLogin from "../features/user/UserLogin";
import Dashboard from "../features/user/Dashboard";
import VerifyOtp from "../features/user/VerifyOtp";

const token = localStorage.getItem("token");

const UserRoutes = () => (
  <Routes>
    <Route path="/user/register" element={<UserRegister />} />
    <Route path="/user/login" element={<UserLogin />} />
    <Route
      path="/user/dashboard"
      element={token ? <Dashboard /> : <Navigate to="/user/login" />}
    />
    <Route path="/user/verify-otp" element={<VerifyOtp />} />
  </Routes>
);

export default UserRoutes;