

import { UserEntity } from "../entities/userEntity";

export interface UserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  createUser(user: UserEntity): Promise<UserEntity>;
  updateUser(id: string, user: Partial<UserEntity>): Promise<UserEntity>;
  updateUserByEmail(email: string, user: Partial<UserEntity>): Promise<UserEntity>; // <-- Add this line
}
