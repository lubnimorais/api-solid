import { GymRepository } from '@/gym/infra/repositories/prisma/GymRepository';
import { FetchNearbyGymsUseCase } from '../FetchNearbyGymsUseCase';

function makeFetchNearbyGymsUseCase() {
  const checkInsRepository = new GymRepository();

  const useCase = new FetchNearbyGymsUseCase(checkInsRepository);

  return useCase;
}

export { makeFetchNearbyGymsUseCase };
