import { UserEntity } from "./user.entity";

export interface IUserService {
  registerUser(
    name: string,
    email: string,
    password: string
  ): Promise<UserEntity>;
  login(email: string, password: string): Promise<string>;
  getCurrentUser(userId: number): Promise<UserEntity | null>;
}
