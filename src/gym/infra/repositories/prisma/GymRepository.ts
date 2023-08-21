import {
  IFindManyNearbyParams,
  IGymsRepository,
} from '@/gym/repositories/IGymsRepository';

import { prismaClient } from '@/shared/infra/prisma';

import { Gym, Prisma } from '@prisma/client';

class GymRepository implements IGymsRepository {
  public async create({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prismaClient.gym.create({
      data: {
        title,
        description,
        phone,
        latitude,
        longitude,
      },
    });

    return gym;
  }

  public async findById(id: string): Promise<Gym | null> {
    const gym = await prismaClient.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }

  public async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await prismaClient.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }

  public async findManyNearby({
    latitude,
    longitude,
  }: IFindManyNearbyParams): Promise<Gym[]> {
    const gyms = await prismaClient.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }
}

export { GymRepository };
