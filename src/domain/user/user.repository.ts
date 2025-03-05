import { UserEntity } from "./user.entity";

export interface IUserRepository {
  createUser(user: UserEntity): Promise<UserEntity>;
  findById(id: number): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
