import { beforeEach, describe, expect, it } from 'vitest';

import { faker } from '@faker-js/faker';

import { CheckInUseCase } from './CheckInUseCase';
import { InMemoryCheckInsRepository } from '../infra/repositories/in-memory/InMemoryCheckInsRepository';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase; // sut -> System under test

describe('Check-in use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: faker.string.uuid(),
      userId: faker.string.uuid(),
    });

    // expect.any valida que ele é qualquer coisa do tipo que for passado no .any
    expect(checkIn.id).toEqual(expect.any(String));
  });
});
