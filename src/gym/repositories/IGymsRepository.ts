import { Gym, Prisma } from '@prisma/client';

interface IFindManyNearbyParams {
  longitude: number;
  latitude: number;
}

interface IGymsRepository {
  create({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: Prisma.GymCreateInput): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  findManyNearby({
    latitude,
    longitude,
  }: IFindManyNearbyParams): Promise<Gym[]>;
}

export { IGymsRepository, IFindManyNearbyParams };
