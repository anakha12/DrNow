import mongoose, { Schema, Document } from 'mongoose';

export interface IDoctor extends Document {
  name: string;
  email: string;
  phone: string;
  yearsOfExperience: number;
  specialization: string;
  password: string;
  isVerified: boolean;
  isActive: boolean;
  profileImage: string;
  medicalLicense: string;
  idProof: string;
  gender: string;
  consultFee: string;
  isBlocked: boolean;
  otp?: string;
  otpExpiresAt?: Date;
  availability: string | null;
  isRejected?: boolean;

}

const DoctorSchema: Schema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    // specialization: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    specialization: { type: String, required: true }, 
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    profileImage: { type: String, required: true },
    medicalLicense: { type: String, required: true },
    idProof: { type: String, required: true },
    gender: { type: String, required: true },
    consultFee: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiresAt: { type: Date },
    availability: { type: String, required: false },
    isRejected: { type: Boolean, default: false },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IDoctor>('Doctor', DoctorSchema);
