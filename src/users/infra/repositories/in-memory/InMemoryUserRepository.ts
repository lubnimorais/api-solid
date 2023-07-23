import { faker } from '@faker-js/faker';

import { IUsersRepository } from '@/users/repositories/IUsersRepository';
import { Prisma, User } from '@prisma/client';

class InMemoryUserRepository implements IUsersRepository {
  public items: User[] = [];

  public async create({
    name,
    email,
    password_hash,
  }: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: faker.string.uuid(),
      name,
      email,
      password_hash,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }
}

export { InMemoryUserRepository };
