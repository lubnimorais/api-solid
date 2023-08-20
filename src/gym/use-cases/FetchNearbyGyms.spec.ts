import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryGymsRepository } from '../infra/repositories/in-memory/InMemoryGymsRepository';
import { FetchNearbyGymsUseCase } from './FetchNearbyGymsUseCase';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase; // sut -> System under test

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -8.2823289,
      longitude: -35.9710538,
    });

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    // expect.any valida que ele é qualquer coisa do tipo que for passado no .any
    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })]);
  });
});
