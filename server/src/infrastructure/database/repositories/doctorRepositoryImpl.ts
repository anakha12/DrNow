import DoctorModel, { IDoctor } from "../../database/models/doctorModel";
import { DoctorRepository } from "../../../domain/repositories/doctorRepository";
import { DoctorEntity } from "../../../domain/entities/doctorEntity";

export class DoctorRepositoryImpl implements DoctorRepository {
  
  async findById(id: string): Promise<DoctorEntity | null> {
    return await DoctorModel.findById(id);
  }

  async findUnverifiedDoctors(): Promise<DoctorEntity[]> {
    const unverifiedDoctors = await DoctorModel.find({ isVerified: false,isRejected: false });
    return unverifiedDoctors.map(doc => this.toDomain(doc));
  }

  async findByEmail(email: string): Promise<DoctorEntity | null> {
    const doctor = await DoctorModel.findOne({ email });
    return doctor ? this.toDomain(doctor) : null;
  }

  async createDoctor(doctor: DoctorEntity): Promise<DoctorEntity> {
    const persistenceDoctor = this.toPersistence(doctor);
    const created = await DoctorModel.create(persistenceDoctor);
    return this.toDomain(created);
  }

  async updateDoctor(id: string, updates: Partial<DoctorEntity>): Promise<DoctorEntity> {
    const updated = await DoctorModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) throw new Error("Doctor not found");
    return this.toDomain(updated);
  }

  private toPersistence(entity: DoctorEntity): Partial<IDoctor> {
    return {
      name: entity.name,
      email: entity.email,
      phone: entity.phone,
      yearsOfExperience: entity.yearsOfExperience,
      specialization: entity.specialization,
      password: entity.password,
      isVerified: entity.isVerified,
      isActive: entity.isActive,
      profileImage: entity.profileImage,
      medicalLicense: entity.medicalLicense,
      idProof: entity.idProof,
      gender: entity.gender,
      consultFee: entity.consultFee,
      isBlocked: entity.isBlocked,
      otp: entity.otp,
      otpExpiresAt: entity.otpExpiresAt,
      availability: entity.availability,
    };
  }

  private toDomain(doc: any): DoctorEntity {
    return {
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      yearsOfExperience: doc.yearsOfExperience,
      specialization: doc.specialization,
      password: doc.password,
      isVerified: doc.isVerified,
      isActive: doc.isActive,
      profileImage: doc.profileImage,
      medicalLicense: doc.medicalLicense,
      idProof: doc.idProof,
      gender: doc.gender,
      consultFee: doc.consultFee,
      isBlocked: doc.isBlocked,
      otp: doc.otp,
      otpExpiresAt: doc.otpExpiresAt,
      availability: doc.availability,
      isRejected: doc.isRejected,
    };
  }
}
