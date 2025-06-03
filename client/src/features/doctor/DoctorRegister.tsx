import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtp, registerDoctor } from "../../services/doctorService";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";


const DoctorRegister = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  // const [doctorId, setDoctorId] = useState("");

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [consultFee, setConsultFee] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [idProof, setIdProof] = useState<File | null>(null);
  const [medicalLicense, setMedicalLicense] = useState<File | null>(null);
  // const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

 const handleSendOtp = async (e: React.FormEvent) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("gender", gender);
  formData.append("age", age);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("language", language);
  formData.append("specialisation", specialization);
  formData.append("yearsOfExperience", yearsOfExperience);
  formData.append("consultFee", consultFee);
  formData.append("password", password);
  if (profileImage) formData.append("profileImage", profileImage);
  if (idProof) formData.append("idProof", idProof);
  if (medicalLicense) formData.append("medicalLicense", medicalLicense);

  try {
    await sendOtp(formData); 
    // setDoctorId(res.doctorId); 
    setOtpSent(true);
    toast.success("OTP sent to your email. Please enter it to complete registration.");
  } catch (err: any) {
    toast.error("Failed to send OTP. Please try again.");
  }
};


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerDoctor(email, otp);
      toast.success("Registration successful! You can now login.");
      setTimeout(() => navigate("/doctor/login"), 1500);
    } catch (err: any) {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-600 px-2 py-8">
      <div className="relative w-full max-w-2xl">
        {!otpSent ? (
          <form
            onSubmit={handleSendOtp}
            className="relative z-10 w-full p-6 sm:p-10 bg-white/90 rounded-[2.5rem] shadow-2xl border border-gray-200 backdrop-blur-lg"
            encType="multipart/form-data"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Doctor Registration</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="p-3 border border-gray-300 focus:border-blue-500 outline-none rounded-xl bg-blue-50 transition shadow"
                required
              />
              <select
                value={gender}
                onChange={e => setGender(e.target.value)}
                className="p-3 border border-gray-300 focus:border-blue-500 outline-none rounded-xl bg-blue-50 transition shadow"
                required
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={e => setAge(e.target.value)}
                className="p-3 border border-gray-300 focus:border-blue-500 outline-none rounded-xl bg-blue-50 transition shadow"
                min={18}
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="p-3 border border-gray-300 focus:border-blue-500 outline-none rounded-xl bg-blue-50 transition shadow"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="p-3 border border-gray-300 focus:border-blue-500 outline-none rounded-xl bg-blue-50 transition shadow sm:col-span-2"
                required
              />
              <input
                type="text"
                placeholder="Language(s)"
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="p-3 border border-gray-300 focus:border-blue-500 outline-none rounded-xl bg-blue-50 transition shadow sm:col-span-2"
                required
              />
              <input
                type="text"
                placeholder="Specialisation"
                value={specialization}
                onChange={e => setSpecialization(e.target.value)}
                className="p-3 border border-gray-300 focus:border-blue-500 outline-none rounded-xl bg-blue-50 transition shadow"
                required
              />
              <input
                type="number"
                placeholder="Years of Experience"
                value={yearsOfExperience}
                onChange={e => setYearsOfExperience(e.target.value)}
                className="p-3 border border-gray-300 focus:border-blue-500 outline-none rounded-xl bg-blue-50 transition shadow"
                min={0}
                required
              />
              <input
                type="number"
                placeholder="Consultation Fee"
                value={consultFee}
                onChange={e => setConsultFee(e.target.value)}
                className="p-3 border border-gray-300 focus:border-blue-500 outline-none rounded-xl bg-blue-50 transition shadow"
                min={0}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="p-3 border border-gray-300 focus:border-blue-500 outline-none rounded-xl bg-blue-50 transition shadow"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-gray-700">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileChange(e, setProfileImage)}
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700">ID Proof</label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={e => handleFileChange(e, setIdProof)}
                  className="w-full"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-1 text-gray-700">Medical License</label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={e => handleFileChange(e, setMedicalLicense)}
                  className="w-full"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg text-lg transition"
            >
              Send OTP
            </button>
            
          </form>
        ) : (
          <form
            onSubmit={handleRegister}
            className="relative z-10 w-full p-6 sm:p-10 bg-white/90 rounded-[2.5rem] shadow-2xl border border-gray-200 backdrop-blur-lg"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Enter OTP</h2>
            <input
              type="text"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full p-4 mb-6 border border-gray-300 focus:border-blue-500 outline-none rounded-2xl bg-blue-50 transition shadow"
              required
            />
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg text-lg transition"
            >
              Verify & Register
            </button>
            
          </form>
        )}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default DoctorRegister;