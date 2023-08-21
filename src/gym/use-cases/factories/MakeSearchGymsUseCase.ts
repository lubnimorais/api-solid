import { GymRepository } from '@/gym/infra/repositories/prisma/GymRepository';
import { SearchGymsUseCase } from '../SearchGymsUseCase';

function makeSearchGymsUseCase() {
  const checkInsRepository = new GymRepository();

  const useCase = new SearchGymsUseCase(checkInsRepository);

  return useCase;
}

export { makeSearchGymsUseCase };
