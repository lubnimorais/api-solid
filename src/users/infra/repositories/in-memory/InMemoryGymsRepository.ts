import { IGymsRepository } from '@/users/repositories/IGymsRepository';
import { Gym } from '@prisma/client';

class InMemoryGymsRepository implements IGymsRepository {
  public items: Gym[] = [];

  public async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
}

export { InMemoryGymsRepository };
