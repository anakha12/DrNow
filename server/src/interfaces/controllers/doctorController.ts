import { Request, Response } from "express";
import { DoctorRepositoryImpl } from "../../infrastructure/database/repositories/doctorRepositoryImpl";
import { DoctorRegisterDTO } from "../../application/dto/doctorRegister.dto";
import { SendDoctorOtp } from "../../application/use_cases/doctor/sendDoctorOtp";
import { Multer } from "multer";
import { VerifyDoctorOtp } from "../../application/use_cases/doctor/verifyOtp";
import { DoctorLogin } from "../../application/use_cases/doctor/doctorLogin";

interface MulterFiles {
  profileImage?: Express.Multer.File[];
  medicalLicense?: Express.Multer.File[];
  idProof?: Express.Multer.File[];
}

 export interface MulterRequest extends Request {
  files?: {
    [fieldname: string]: Express.Multer.File[]; 
  };
}

export class DoctorController {
  private sendDoctorOtp: SendDoctorOtp;
  private doctorRepository: DoctorRepositoryImpl;
  private verifyDoctorOtp: VerifyDoctorOtp; 
  private loginUseCase: DoctorLogin;

  constructor() {
    this.doctorRepository = new DoctorRepositoryImpl();
    this.sendDoctorOtp = new SendDoctorOtp(this.doctorRepository);
    this.verifyDoctorOtp = new VerifyDoctorOtp(this.doctorRepository);
    this.loginUseCase = new DoctorLogin(this.doctorRepository);
  }

  // Registration endpoint
  async sendOtp(req: MulterRequest, res: Response): Promise<void> {
    try {

      console.log("BODY:", req.body);
      console.log("FILES:", req.files);

      const dto = new DoctorRegisterDTO({
        ...req.body,
        profileImage: req.files?.profileImage?.[0]?.path || "",
        medicalLicense: req.files?.medicalLicense?.[0]?.path || "",
        idProof: req.files?.idProof?.[0]?.path || "",
        availability: req.body.availability || "", 
      });

      await this.sendDoctorOtp.execute(dto);
      res.status(200).json({ message: `OTP sent to ${dto.email}` });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

   async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        res.status(400).json({ message: "Email and OTP are required" });
        return;
      }

      await this.verifyDoctorOtp.execute(email, otp);
      res.status(200).json({ message: "OTP verified successfully" });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }

      const result = await this.loginUseCase.execute(email, password);

      if ('isRejected' in result && result.isRejected) {
        res.status(200).json({ isRejected: true, name: result.name, email: result.email });
        return;
      }

      if( 'notVerified' in result && result.notVerified) {
        res.status(200).json({notVerified: true, name: result.name, email: result.email});
        return;
      }
      const verifiedResult = result as { token: string; name: string };

      res.status(200).json({
        message: "Login successful",
        token: verifiedResult.token,
        name: verifiedResult.name
      });
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }

}