import { beforeEach, describe, expect, it } from 'vitest';

import { faker } from '@faker-js/faker';

import { CreateGymUseCase } from './CreateGymUseCase';
import { InMemoryGymsRepository } from '../infra/repositories/in-memory/InMemoryGymsRepository';

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase; // sut -> System under test

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: faker.person.jobTitle(),
      description: null,
      phone: null,
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    });

    // expect.any valida que ele é qualquer coisa do tipo que for passado no .any
    expect(gym.id).toEqual(expect.any(String));
  });
});
