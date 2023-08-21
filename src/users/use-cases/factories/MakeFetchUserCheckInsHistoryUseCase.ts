import { FetchUserCheckInsHistoryUseCase } from '../FetchUserCheckInsHistoryUseCase';
import { CheckInsRepository } from '@/users/infra/repositories/prisma/CheckInsRepository';

function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new CheckInsRepository();

  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
}

export { makeFetchUserCheckInsHistoryUseCase };
