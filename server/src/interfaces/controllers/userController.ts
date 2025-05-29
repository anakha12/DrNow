import { Request, Response } from "express";
import { registerUser } from "../../application/use_cases/user/registerUser";
import { sendUserOtp } from "../../application/use_cases/user/sendUserOtp";
import { UserRepositoryImpl } from "../../infrastructure/database/repositories/userRepositoryImpl";
import { sendMail } from "../../services/mailService";

const userRepository = new UserRepositoryImpl();

export const userRegister = async (req: Request, res: Response) => {
  console.log("Register request body:", req.body)
  try {
    const user = await registerUser(req.body, userRepository);
    res.status(201).json({ message: "User registered", user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};


export const userSendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const otp = await sendUserOtp(email);
    await sendMail(email, "Your OTP Code", `Your OTP is: ${otp}`);
    res.status(200).json({ message: `OTP sent to ${email}`, otp });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
};