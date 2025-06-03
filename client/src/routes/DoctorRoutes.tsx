import { Routes, Route } from "react-router-dom";
import DoctorRegister from "../features/doctor/DoctorRegister";
import DoctorLogin from "../features/doctor/DoctorLogin";
import DoctorWaitingVerification from "../features/doctor/waiting-verification";
import DoctorRejected from "../features/doctor/DoctorRejected";
import DoctorLayout from "../features/doctor/DoctorLayout";
import Dashboard from "../features/doctor/DoctorDashboard";

const DoctorRoutes = () => (
  <Routes>
    <Route path="register" element={<DoctorRegister />} />
    <Route path="login" element={<DoctorLogin />} />
    <Route path="waiting-verification" element={<DoctorWaitingVerification />} />
    <Route path="rejected" element={<DoctorRejected />} />
    <Route path="/" element={<DoctorLayout />}>
      <Route path="dashboard" element={<Dashboard />} />
      {/* Add other nested routes here */}
    </Route>
  </Routes>
);

export default DoctorRoutes;
