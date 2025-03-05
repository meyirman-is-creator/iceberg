import { IUserService } from "../../domain/user/user.service";
import { IUserRepository } from "../../domain/user/user.repository";
import { UserEntity } from "../../domain/user/user.entity";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class UserServiceImpl implements IUserService {
  constructor(private userRepo: IUserRepository) {}

  public async registerUser(
    name: string,
    email: string,
    password: string
  ): Promise<UserEntity> {
    const existed = await this.userRepo.findByEmail(email);
    if (existed) {
      throw new Error("Пользователь с таким email уже существует");
    }
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new UserEntity(null, name, email, hashed);
    return this.userRepo.createUser(newUser);
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error("Неверный email или пароль");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Неверный email или пароль");
    }
    const token = jwt.sign({ userId: user.id }, "SECRET_KEY", {
      expiresIn: "1h",
    });
    return token;
  }

  public async getCurrentUser(userId: number): Promise<UserEntity | null> {
    return this.userRepo.findById(userId);
  }
}
