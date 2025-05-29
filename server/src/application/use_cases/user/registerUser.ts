
import { UserRepository } from "../../../domain/repositories/userRepository";
import { UserEntity } from "../../../domain/entities/userEntity";
import bcrypt from "bcrypt";

export const registerUser = async (
  userData: UserEntity,
  userRepository: UserRepository
): Promise<UserEntity> => {
  const { email, password } = userData;

  const existing = await userRepository.findByEmail(email);
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: UserEntity = {
    ...userData,
    password: hashedPassword,
    isBlocked: false,
    isDonner: false,
  };

  return await userRepository.createUser(newUser);
};
