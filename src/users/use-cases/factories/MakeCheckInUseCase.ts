import { GymRepository } from '@/gym/infra/repositories/prisma/GymRepository';
import { CheckInsRepository } from '@/users/infra/repositories/prisma/CheckInsRepository';
import { CheckInUseCase } from '../CheckInUseCase';

function makeCheckInUseCase() {
  const checkInsRepository = new CheckInsRepository();
  const gymsRepository = new GymRepository();

  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository);

  return useCase;
}

export { makeCheckInUseCase };
