
import UserModel from "../models/userModel";
import { UserRepository } from "../../../domain/repositories/userRepository";
import { UserEntity } from "../../../domain/entities/userEntity";

export class UserRepositoryImpl implements UserRepository {
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;
    return this.toDomain(user);
  }

  async createUser(userData: UserEntity): Promise<UserEntity> {
  const newUser = new UserModel(userData);
  const savedUser = await newUser.save();
  return this.toDomain(savedUser);
}

async updateUserByEmail(email: string, updates: Partial<UserEntity>): Promise<UserEntity> {
    const updatedUser = await UserModel.findOneAndUpdate({ email }, updates, { new: true });
    if (!updatedUser) throw new Error("User not found");
    return this.toDomain(updatedUser);
  }


  async updateUser(id: string, updates: Partial<UserEntity>): Promise<UserEntity> {
    const updatedUser = await UserModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedUser) throw new Error("User not found");
    return this.toDomain(updatedUser);
  }

  private toDomain(user: any): UserEntity {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      image: user.image,
      password: user.password,
      isBlocked: user.isBlocked,
      bloodGroup: user.bloodGroup,
      address: user.address,
      isDonner: user.isDonner,
      otp: user.otp,
      role: user.role,
      otpExpiresAt: user.otpExpiresAt,
      isVerified: user.isVerified,
    };
  }
}
