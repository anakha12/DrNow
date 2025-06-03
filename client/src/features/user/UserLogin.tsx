import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/userService";
  import toast,{ Toaster } from "react-hot-toast";


const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const navigate = useNavigate();


  const handleLogin = async () => {
  try {
    const res = await loginUser(email, password);

    localStorage.setItem("token", res.token);
    toast.success("Login successful! Redirecting...");
    setTimeout(() => {
      navigate("/user/dashboard");
    }, 1200);
  } catch (err: any) {
    if (err.isVerificationRequired) {
     
      navigate("/user/verify-otp", {
        state: {
          email: err.email,
          password: err.password,
          name: "", 
          isDonner: "", 
        },
      });
      return;
    }
    toast.error(err.message || "Login failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-600">
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white/90 rounded-[2.5rem] shadow-2xl border border-gray-200 backdrop-blur-lg min-h-[400px]">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-tight drop-shadow-lg">
            Login to Your Account
          </h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-4 mb-5 border border-gray-300 focus:border-blue-500 outline-none rounded-2xl bg-blue-50 transition shadow"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-4 mb-8 border border-gray-300 focus:border-blue-500 outline-none rounded-2xl bg-blue-50 transition shadow"
          />
          <button
            onClick={handleLogin}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg text-lg transition"
          >
            Login
          </button>
        
          <p className="mt-6 text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/user/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default UserLogin;