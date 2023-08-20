import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { InMemoryCheckInsRepository } from '../infra/repositories/in-memory/InMemoryCheckInsRepository';
import { ValidateCheckInUseCase } from './ValidateCheckInUseCase';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase; // sut -> System under test

describe('Validate Check-in use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to validate to check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    // expect.any valida que ele é qualquer coisa do tipo que for passado no .any
    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 7, 19, 19, 20));

    /**
     * Quando criamos o check-in, no created_at estamos utilizando o new Date()
     * Como estamos utilizando o Vitest para mockar data, o new Date() do
     * created_at vai pegar a data acima que definimos
     */
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    /**
     * uma forma de avançarmos no Vitest o tempo
     * passamos o número em milesegundos para avançar o tempo
     */
    const twentyOneMinutesInMs = 1000 * 60 * 21; // 21 minutes

    vi.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
