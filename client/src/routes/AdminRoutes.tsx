import { Routes, Route } from "react-router-dom";
import AdminLogin from "../features/admin/AdminLogin";
import AdminLayout from "../features/admin/AdminLayout";
import AdminDashboard from "../features/admin/AdminDashboard";
import DoctorVerification from "../features/admin/DoctorVerification";
// import Doctors from "../features/admin/Doctors";
// import Departments from "../features/admin/Departments";
// import Patients from "../features/admin/Patients";
// import DoctorPayment from "../features/admin/DoctorPayment";
// import CrowdfundingVerification from "../features/admin/CrowdfundingVerification";

const AdminRoutes = () => (
  <Routes>
    <Route path="/login" element={<AdminLogin />} />
    <Route path="/" element={<AdminLayout />}>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="doctor-verification" element={<DoctorVerification />} />
        {/*<Route path="doctors" element={<Doctors />} />
      <Route path="departments" element={<Departments />} />
      <Route path="patients" element={<Patients />} />
      <Route path="doctor-payment" element={<DoctorPayment />} />
      <Route path="crowdfunding-verification" element={<CrowdfundingVerification />} /> */}
    
    </Route>
  </Routes>
);

export default AdminRoutes;