import { IUserRepository } from "../../../domain/user/user.repository";
import { UserEntity } from "../../../domain/user/user.entity";
import { prisma } from "../prismaClient";

export class UserRepositoryPrisma implements IUserRepository {
  public async createUser(user: UserEntity): Promise<UserEntity> {
    const created = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    return new UserEntity(
      created.id,
      created.name,
      created.email,
      created.password
    );
  }

  public async findById(id: number): Promise<UserEntity | null> {
    const found = await prisma.user.findUnique({ where: { id } });
    if (!found) return null;
    return new UserEntity(found.id, found.name, found.email, found.password);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const found = await prisma.user.findUnique({ where: { email } });
    if (!found) return null;
    return new UserEntity(found.id, found.name, found.email, found.password);
  }
}
