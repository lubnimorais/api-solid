import { GymRepository } from '@/gym/infra/repositories/prisma/GymRepository';
import { CreateGymUseCase } from '../CreateGymUseCase';

function makeCreateGymsUseCase() {
  const checkInsRepository = new GymRepository();

  const useCase = new CreateGymUseCase(checkInsRepository);

  return useCase;
}

export { makeCreateGymsUseCase };
