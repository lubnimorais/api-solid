import { GetUseMetricsUseCase } from '../GetUserMetricsUseCase';
import { CheckInsRepository } from '@/users/infra/repositories/prisma/CheckInsRepository';

function makeGetUserMetricsUseCase() {
  const checkInsRepository = new CheckInsRepository();
  const useCase = new GetUseMetricsUseCase(checkInsRepository);

  return useCase;
}

export { makeGetUserMetricsUseCase };
