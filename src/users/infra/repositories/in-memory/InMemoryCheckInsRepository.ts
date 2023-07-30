import { faker } from '@faker-js/faker';

import { ICheckInsRepository } from '@/users/repositories/ICheckInsRepository';

import { CheckIn, Prisma } from '@prisma/client';

class InMemoryCheckInsRepository implements ICheckInsRepository {
  public items: CheckIn[] = [];

  public async create({
    gym_id,
    user_id,
    validated_at,
  }: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: faker.string.uuid(),
      gym_id,
      user_id,
      validated_at: validated_at ? new Date(validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }
}

export { InMemoryCheckInsRepository };
