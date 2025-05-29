import { useEffect, useState } from "react";
import { sendOtp, registerUser } from "../../services/userService";

const UserRegister = () => {
  const [email, setEmail] = useState("");
  const [name , setName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"form" | "otp">("form");
  const [message, setMessage] = useState("");
  const [isDonner, setIsDonner] = useState(false); 
  const [timer, setTimer] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);


  const handleSendOtp = async () => {
  try {
    console.log("Sending OTP to:", email);
    const res = await sendOtp({
      name,
      email,
      password,
      isDonner: isDonner ? "true" : "false",
    });
    console.log("OTP sent successfully:", res);
    setMessage(res.message);
    setStep("otp");
    setTimer(60);
    setIsCountingDown(true);
  } catch (err: any) {
    setMessage(err.response?.data?.message || "Failed to send OTP");
  }
};

  const handleRegister = async () => {
    try {
      const res = await registerUser({ email, password, name, otp,isDonner: isDonner ? "true" : "false" });
      setMessage("Registered successfully! You can now login.");
      setStep("form");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-600">
      {/* Left side with image */}
      <div className="hidden md:flex w-1/2 h-full items-center justify-center">
        <img
          src="/img/photo-1622253692010-333f2da6031d.avif"
          alt="Signup Illustration"
          className="max-w-[60%] h-auto rounded-2xl shadow-2xl border-4 border-white"
        />
      </div>

      {/* Right side signup form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white/90 rounded-[2.5rem] shadow-2xl border border-gray-200 backdrop-blur-lg min-h-[500px]">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-tight drop-shadow-lg">
            Create Your Account
          </h2>

          {step === "form" ? (
            <>
              <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 mb-5 border border-gray-300 focus:border-blue-500 outline-none rounded-2xl bg-blue-50 transition shadow"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 mb-5 border border-gray-300 focus:border-blue-500 outline-none rounded-2xl bg-blue-50 transition shadow"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 mb-8 border border-gray-300 focus:border-blue-500 outline-none rounded-2xl bg-blue-50 transition shadow"
              />

              {/* Donor checkbox */}
              <div className="flex items-center mb-8">
                <input
                  id="donner"
                  type="checkbox"
                  checked={isDonner}
                  onChange={() => setIsDonner(!isDonner)}
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="donner" className="ml-3 text-gray-700 text-base select-none">
                  Are you ready to be a donor?
                </label>
              </div>

              <button
                onClick={handleSendOtp}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg text-lg transition"
              >
                Send OTP
              </button>
            </>
          ) : (
            <>
              {isCountingDown ? (
                  <p className="mb-4 text-sm text-gray-600 text-center">
                    Resend OTP in <span className="font-semibold">{timer}</span> seconds
                  </p>
                ) : (
                  <button
                    onClick={handleSendOtp}
                    className="mb-4 text-blue-600 hover:underline text-sm block mx-auto"
                  >
                    Resend OTP
                  </button>
              )}

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-4 mb-8 border border-gray-300 focus:border-green-500 outline-none rounded-2xl bg-blue-50 transition shadow"
              />
              <button
                onClick={handleRegister}
                className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl shadow-lg text-lg transition"
              >
                Register
              </button>
            </>
          )}

          {message && (
            <p className="mt-7 text-center text-red-600 font-semibold">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRegister;