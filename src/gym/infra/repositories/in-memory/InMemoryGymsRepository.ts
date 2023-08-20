import {
  IFindManyNearbyParams,
  IGymsRepository,
} from '@/gym/repositories/IGymsRepository';

import { Gym, Prisma } from '@prisma/client';

import { faker } from '@faker-js/faker';
import { getDistanceBetweenCoordinates } from '@/utils/getDistanceBetweenCoordinates';

class InMemoryGymsRepository implements IGymsRepository {
  public items: Gym[] = [];

  public async create({
    id,
    title,
    description,
    phone,
    latitude,
    longitude,
  }: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: id ?? faker.string.uuid(),
      title,
      description: description ?? null,
      phone: phone ?? null,
      latitude: new Prisma.Decimal(latitude.toString()),
      longitude: new Prisma.Decimal(longitude.toString()),
      created_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }

  public async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  public async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  public async findManyNearby({
    latitude,
    longitude,
  }: IFindManyNearbyParams): Promise<Gym[]> {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude,
          longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      );

      return distance < 10;
    });
  }
}

export { InMemoryGymsRepository };
