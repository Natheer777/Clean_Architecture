import { PrismaClient } from '@prisma/client';
import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/interfaces/user-repository.interface';

export class UserRepositoryImpl implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        name: user.name,
      },
    });
    return new User(createdUser.email, createdUser.password, createdUser.name, createdUser.id);
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return new User(user.email, user.password, user.name, user.id);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return new User(user.email, user.password, user.name, user.id);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: user,
    });
    return new User(updatedUser.email, updatedUser.password, updatedUser.name, updatedUser.id);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(user => new User(user.email, user.password, user.name, user.id));
  }
}