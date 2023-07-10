import { prismaClient } from '@/shared/infra/prisma';

import { IUsersRepository } from '@/users/repositories/IUsersRepository';

import { Prisma, User } from '@prisma/client';

class UsersRepository implements IUsersRepository {
  public async create({
    name,
    email,
    password_hash,
  }: Prisma.UserCreateInput): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    return prismaClient.user.findFirst({
      where: {
        email,
      },
    });
  }
}

export { UsersRepository };
