import { useEffect, useState } from "react";
import { sendOtp, registerUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const UserRegister = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"form" | "otp">("form");
  const [isDonner, setIsDonner] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const res = await sendOtp({
        name,
        email,
        password,
        isDonner: isDonner ? "true" : "false",
      });
      toast.success(res.message);
      setStep("otp");
      setTimer(60);
      setIsCountingDown(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleRegister = async () => {
    try {
      await registerUser({ email, password, name, otp, isDonner: isDonner ? "true" : "false" });
      toast.success("Registered successfully! You can now login.");
      setTimeout(() => {
        navigate("/user/login");
      }, 1500);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  const isFormValid = () => {
  return (
    name.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && 
    true
  );
};

  const handleGoogleSignUp = () => {
    toast.success("Google Sign-Up clicked! Implement OAuth flow here.");
  };

  useEffect(() => {
    setFadeIn(true); 
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isCountingDown && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsCountingDown(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCountingDown, timer]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-600 px-4">
      {/* Left side with image */}
      <div className="hidden md:flex w-1/2 h-full items-center justify-center">
        <img
          src="/img/photo-1622253692010-333f2da6031d.avif"
          alt="Signup Illustration"
          className="max-w-[60%] h-auto rounded-2xl shadow-2xl border-4 border-white transform transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* Right side signup form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div
          className={`w-full max-w-md p-6 bg-white/90 rounded-2xl shadow-2xl border border-gray-200 backdrop-blur-lg min-h-[460px]
            transform  duration-700
            ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <h2 className="text-2xl font-extrabold mb-6 text-center text-blue-700 tracking-tight drop-shadow-lg">
            Create Your Account
          </h2>

          {step === "form" ? (
            <>
              <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 focus:border-blue-500 outline-none rounded-xl bg-blue-50  shadow-sm focus:shadow-md text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 focus:border-blue-500 outline-none rounded-xl bg-blue-50  shadow-sm focus:shadow-md text-sm"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mb-6 border border-gray-300 focus:border-blue-500 outline-none rounded-xl bg-blue-50  shadow-sm focus:shadow-md text-sm"
              />

              <div className="flex items-center mb-6">
                <input
                  id="donner"
                  type="checkbox"
                  checked={isDonner}
                  onChange={() => setIsDonner(!isDonner)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="donner" className="ml-2 text-gray-700 text-sm select-none">
                  Are you ready to be a donor?
                </label>
              </div>

              <button
                onClick={handleSendOtp}
                disabled={!isFormValid()}
                className={`w-full py-3 font-semibold rounded-xl shadow-lg text-sm transition transform hover:scale-105 active:scale-95
                  ${isFormValid() ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-300 cursor-not-allowed text-gray-200"}`}
              >
                Send OTP
              </button>

            </>
          ) : (
            <>
              {isCountingDown ? (
                <p
                  key={timer} // animate on timer change
                  className="mb-3 text-xs text-gray-600 text-center transition-opacity duration-500"
                >
                  Resend OTP in <span className="font-semibold">{timer}</span> seconds
                </p>
              ) : (
                <button
                  onClick={handleSendOtp}
                  className="mb-3 text-blue-600 hover:underline text-xs block mx-auto transition-transform hover:scale-110 active:scale-95"
                >
                  Resend OTP
                </button>
              )}

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 mb-6 border border-gray-300 focus:border-green-500 outline-none rounded-xl bg-blue-50 shadow-sm focus:shadow-md text-sm"
              />
              <button
                onClick={handleRegister}
                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg text-sm transition transform hover:scale-105 active:scale-95"
              >
                Register
              </button>
            </>
          )}

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500 text-xs select-none">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          

          {/* Google Sign Up Button */}
          <button
            onClick={handleGoogleSignUp}
            className="w-full py-3 text-blue-600 font-semibold rounded-xl flex items-center justify-center gap-2 text-sm transition transform hover:scale-105 active:scale-95"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8c0-17.4-1.5-34.2-4.3-50.5H249v95.5h135.6c-5.8 31.3-23.5 57.8-50 75.6v62h80.9c47.3-43.7 74.5-107.8 74.5-182.6zM249 492c67.5 0 124.3-22.3 165.7-60.5l-79.7-62c-22.2 15-50.7 23.8-85.9 23.8-65.9 0-121.8-44.5-141.7-104.2h-82.6v65.6C76.9 440.7 157 492 249 492zM107.3 296.1c-4.7-14.1-7.4-29.1-7.4-44.1s2.7-30 7.4-44.1V142H24.7C9.4 178.1 0 217.4 0 258.2c0 40.8 9.4 80.1 24.7 116.2l82.6-64.3zM249 97.8c35.6 0 67.4 12.3 92.5 36.4l69.3-69.3C374.2 24.8 317.5 0 249 0 157 0 76.9 51.3 49.9 130.4l82.6 65.6c19.9-59.7 75.8-104.2 116.5-104.2z"
              ></path>
            </svg>
            Sign up with Google
          </button>

          <div className="text-center mt-5">
            <p className="text-xs text-gray-700">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/user/login")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Login here
              </span>
            </p>
            <p className="text-xs text-gray-700 mt-2">
              Want to be a doctor?{" "}
              <span
                onClick={() => navigate("/doctor/register")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Register as Doctor
              </span>
            </p>
          </div>
          
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default UserRegister;
