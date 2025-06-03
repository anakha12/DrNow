import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../services/adminService";
import toast, { Toaster } from "react-hot-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await adminLogin(email, password);
      if (res.token) {
        localStorage.setItem("adminToken", res.token);
        toast.success("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1200);
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (err: any) {
      if (err.message === "Not an admin") {
        toast.error("Access denied: You are not an admin.");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-600">
      <div className="w-full max-w-md p-8 bg-white/90 rounded-[2.5rem] shadow-2xl border border-gray-200 backdrop-blur-lg min-h-[400px]">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-tight drop-shadow-lg">
          Admin Login
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-4 mb-5 border border-gray-300 focus:border-blue-500 outline-none rounded-2xl bg-blue-50 transition shadow"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-4 mb-8 border border-gray-300 focus:border-blue-500 outline-none rounded-2xl bg-blue-50 transition shadow"
            required
          />
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg text-lg transition"
          >
            Login
          </button>
        </form>
      </div>
      {/* Add the Toaster once inside your app, you can add it here or at a higher level like AdminLayout */}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AdminLogin;
