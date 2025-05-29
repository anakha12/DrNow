import { Request, Response } from "express";
import { RegisterUser } from "../../application/use_cases/user/registerUser";
import { SendUserOtp } from "../../application/use_cases/user/sendUserOtp";
import { UserRepositoryImpl } from "../../infrastructure/database/repositories/userRepositoryImpl";
import { sendMail } from "../../services/mailService";
import { UserRegisterDTO } from "../../application/dto/userRegister.dto";
import { VerifyUserOtp } from "../../application/use_cases/user/verifyUserOtp";

export class UserController {
  private userRepository: UserRepositoryImpl;
  private registerUser: RegisterUser;
  private sendUserOtp: SendUserOtp;
   private verifyUserOtp: VerifyUserOtp;

  constructor() {
    this.userRepository = new UserRepositoryImpl();
    this.registerUser = new RegisterUser(this.userRepository);
    this.sendUserOtp = new SendUserOtp(this.userRepository);
    this.verifyUserOtp = new VerifyUserOtp(this.userRepository);
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, otp } = req.body;
      console.log("Register request body:", req.body);
      await this.verifyUserOtp.execute(email, otp);
      const userData = { email, password } as any; 
      await this.registerUser.execute(userData);

      res.status(201).json({ message: "User registered successfully" });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async sendOtp(req: Request, res: Response): Promise<void> {
  try {
    const dto = new UserRegisterDTO(req.body);
    await this.sendUserOtp.execute(dto); // Pass DTO directly
    res.status(200).json({ message: `OTP sent to ${dto.email}` });
  } catch (err: any) {
    console.error("Send OTP error:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
}


}