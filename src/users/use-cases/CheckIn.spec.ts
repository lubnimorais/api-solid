import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { faker } from '@faker-js/faker';

import { CheckInUseCase } from './CheckInUseCase';
import { InMemoryCheckInsRepository } from '../infra/repositories/in-memory/InMemoryCheckInsRepository';
import { InMemoryGymsRepository } from '../infra/repositories/in-memory/InMemoryGymsRepository';
import { Decimal } from '@prisma/client/runtime/library';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase; // sut -> System under test

describe('Check-in use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-8.2807696),
      longitude: new Decimal(-35.9368968),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: faker.string.uuid(),
      userLatitude: -8.2807696,
      userLongitude: -35.9368968,
    });

    // expect.any valida que ele é qualquer coisa do tipo que for passado no .any
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    const gymId = 'gym-01';
    const userId = faker.string.uuid();

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId,
      userId,
      userLatitude: -8.2807696,
      userLongitude: -35.9368968,
    });

    await expect(async () => {
      await sut.execute({
        gymId,
        userId,
        userLatitude: -8.2807696,
        userLongitude: -35.9368968,
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice but in different days', async () => {
    const gymId = 'gym-01';
    const userId = faker.string.uuid();

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId,
      userId,
      userLatitude: -8.2807696,
      userLongitude: -35.9368968,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: faker.string.uuid(),
      userLatitude: -8.2807696,
      userLongitude: -35.9368968,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in on distante gym', async () => {
    // -8.2806456,-35.9357304
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-8.2808288),
      longitude: new Decimal(-35.9357304),
    });

    await expect(async () =>
      sut.execute({
        gymId: 'gym-02',
        userId: faker.string.uuid(),
        userLatitude: -8.2807696,
        userLongitude: -35.9368968,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
