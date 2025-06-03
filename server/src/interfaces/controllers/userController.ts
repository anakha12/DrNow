import { Request, Response } from "express";
import { RegisterUser } from "../../application/use_cases/user/registerUser";
import { SendUserOtp } from "../../application/use_cases/user/sendUserOtp";
import { LoginUser } from "../../application/use_cases/user/loginUser";
import { UserRepositoryImpl } from "../../infrastructure/database/repositories/userRepositoryImpl";
import { UserRegisterDTO } from "../../application/dto/userRegister.dto";
import { VerifyUserOtp } from "../../application/use_cases/user/verifyUserOtp";
import { AuthRequest } from "../../interfaces/middleware/authMiddleware";

export class UserController {
  private userRepository: UserRepositoryImpl;
  private registerUser: RegisterUser;
  private sendUserOtp: SendUserOtp;
  private verifyUserOtp: VerifyUserOtp;
  private loginUser: LoginUser;

  constructor() {
    this.userRepository = new UserRepositoryImpl();
    this.registerUser = new RegisterUser(this.userRepository);
    this.sendUserOtp = new SendUserOtp(this.userRepository);
    this.verifyUserOtp = new VerifyUserOtp(this.userRepository);
    this.loginUser = new LoginUser(this.userRepository);
  }

  async protectedRoute(req: AuthRequest, res: Response): Promise<void> {
    res.status(200).json({ message: "You are authenticated!", user: req.user });
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
    await this.sendUserOtp.execute(dto); 
    res.status(200).json({ message: `OTP sent to ${dto.email}` });
  } catch (err: any) {
    console.error("Send OTP error:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
}

async login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const { token, user } = await this.loginUser.execute(email, password);
    res.status(200).json({ token, user });
  } catch (err: any) {
    console.error("Login error:", err.message); 
    res.status(400).json({ error: err.message });
  }
}


}