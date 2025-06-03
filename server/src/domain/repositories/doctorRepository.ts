import { DoctorEntity } from "../entities/doctorEntity";

export interface DoctorRepository {
  findByEmail(email: string): Promise<DoctorEntity | null>;
  createDoctor(doctor: DoctorEntity): Promise<DoctorEntity>;
  updateDoctor(id: string, updates: Partial<DoctorEntity>): Promise<DoctorEntity>;
  findUnverifiedDoctors(): Promise<DoctorEntity[]>;
  findById(id: string): Promise<DoctorEntity | null>;
}
