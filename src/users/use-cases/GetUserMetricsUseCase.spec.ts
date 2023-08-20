import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryCheckInsRepository } from '../infra/repositories/in-memory/InMemoryCheckInsRepository';
import { GetUseMetricsUseCase } from './GetUserMetricsUseCase';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUseMetricsUseCase; // sut -> System under test

describe('Get User Metric Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUseMetricsUseCase(checkInsRepository);
  });

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    });

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    });

    // expect.any valida que ele é qualquer coisa do tipo que for passado no .any
    expect(checkInsCount).toEqual(2);
  });
});
