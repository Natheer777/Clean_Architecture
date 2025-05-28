import { PrismaClient } from '@prisma/client';
import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/interfaces/user-repository.interface';

export class UserRepositoryImpl implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  private toEntity(user: any): User {
    return new User(user.email, user.password, user.name, user.id);
  }

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        name: user.name,
      },
    });
    return this.toEntity(createdUser);
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.toEntity(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? this.toEntity(user) : null;
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...(user.email && { email: user.email }),
        ...(user.password && { password: user.password }),
        ...(user.name && { name: user.name }),
      },
    });
    return this.toEntity(updatedUser);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(this.toEntity);
  }
}
