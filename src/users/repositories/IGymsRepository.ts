import { Gym } from '@prisma/client';

interface IGymsRepository {
  findById(id: string): Promise<Gym | null>;
}

export { IGymsRepository };
