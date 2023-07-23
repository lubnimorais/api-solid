import { Prisma, User } from '@prisma/client';

interface IUsersRepository {
  create({ name, email, password_hash }: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}

export { IUsersRepository };
