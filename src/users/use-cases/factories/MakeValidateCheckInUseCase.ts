import { CheckInsRepository } from '@/users/infra/repositories/prisma/CheckInsRepository';
import { ValidateCheckInUseCase } from '../ValidateCheckInUseCase';

function makeValidateCheckInUseCase() {
  const checkInsRepository = new CheckInsRepository();

  const useCase = new ValidateCheckInUseCase(checkInsRepository);

  return useCase;
}

export { makeValidateCheckInUseCase };
