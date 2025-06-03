import { Request, Response } from "express";
import { LoginAdmin } from "../../application/use_cases/admin/loginAdmin";
import { UserRepositoryImpl } from "../../infrastructure/database/repositories/userRepositoryImpl";
import { GetUnverifiedDoctors } from "../../application/use_cases/admin/getUnverifiedDoctors";
import { DoctorRepositoryImpl } from "../../infrastructure/database/repositories/doctorRepositoryImpl";
import { VerifyDoctor } from "../../application/use_cases/admin/verifyDoctor";
import { RejectDoctor } from "../../application/use_cases/admin/rejectDoctor";

export class AdminController {
  private loginAdmin: LoginAdmin;
  private getUnverifiedDoctorsUseCase: GetUnverifiedDoctors; 
  private verifyDoctorUseCase: VerifyDoctor;
  private rejectDoctorUseCase: RejectDoctor;


  constructor(userRepository?: UserRepositoryImpl) {
    this.loginAdmin = new LoginAdmin(userRepository || new UserRepositoryImpl());
    this.getUnverifiedDoctorsUseCase = new GetUnverifiedDoctors(new DoctorRepositoryImpl());
    this.verifyDoctorUseCase = new VerifyDoctor(new DoctorRepositoryImpl())
    this.rejectDoctorUseCase = new RejectDoctor(new DoctorRepositoryImpl());
  }

  async adminLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      console.log("Admin login attempt with email:", email);
      const { token, user } = await this.loginAdmin.execute(email, password);
      if (user.role !== "admin") {
        res.status(403).json({ message: "Not an admin" });
        return;
      }
      res.status(200).json({ token, user });
    } catch (err: any) {
      res.status(401).json({ message: err.message });
    }
  }

  async getUnverifiedDoctors(req: Request, res: Response): Promise<void> {
    try {
      const doctors = await this.getUnverifiedDoctorsUseCase.execute(); 
      res.status(200).json(doctors);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

   async verifyDoctor(req: Request, res: Response): Promise<void> {
    try {
      const doctorId = req.params.id;
      await this.verifyDoctorUseCase.execute(doctorId);
      res.status(200).json({ message: "Doctor verified successfully" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  async rejectDoctor(req: Request, res: Response): Promise<void> {
    try {
      const doctorId = req.params.id;
      
      await this.rejectDoctorUseCase.execute(doctorId);
      res.status(200).json({ message: "Doctor rejected successfully" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }


}
