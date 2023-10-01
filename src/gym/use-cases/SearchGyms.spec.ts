import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryGymsRepository } from '../infra/repositories/in-memory/InMemoryGymsRepository';
import { SearchGymsUseCase } from './SearchGymsUseCase';
import { faker } from '@faker-js/faker';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase; // sut -> System under test

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it('should be able to search gyms by title', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    });

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    });

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    });

    // expect.any valida que ele é qualquer coisa do tipo que for passado no .any
    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym' }),
    ]);
  });

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      });
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    });

    // expect.any valida que ele é qualquer coisa do tipo que for passado no .any
    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ]);
  });
});
