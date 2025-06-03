import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doctorLogin } from "../../services/doctorService";
import toast,{ Toaster } from "react-hot-toast";

const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await doctorLogin({ email, password });

      if (res.isRejected) {
        navigate("/doctor/rejected");
        return;
      }
      if (res.notVerified) {
        navigate("/doctor/waiting-verification");
        return;
      }

      toast.success("Login successful! Redirecting...");
      localStorage.setItem("doctorToken", res.token);
      setTimeout(() => navigate("/doctor/dashboard"), 1500);
    } catch (err: any) {
      toast.error(err?.message || "Login failed. Check credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-600 px-2 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 sm:p-10 bg-white/90 rounded-[2.5rem] shadow-2xl border border-gray-200 backdrop-blur-lg"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Doctor Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-4 mb-4 border border-gray-300 focus:border-blue-500 outline-none rounded-xl bg-blue-50 transition shadow"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-4 mb-6 border border-gray-300 focus:border-blue-500 outline-none rounded-xl bg-blue-50 transition shadow"
          required
        />
        <button
          type="submit"
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg text-lg transition"
        >
          Login
        </button>
        
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
    
  );
};

export default DoctorLogin;
