import { UsersRepository } from '@/users/infra/repositories/prisma/UsersRepository';
import { GetUserProfileUseCase } from '../GetUserProfileUseCase';

function makeGetUserProfileUseCase() {
  const usersRepository = new UsersRepository();
  const useCase = new GetUserProfileUseCase(usersRepository);

  return useCase;
}

export { makeGetUserProfileUseCase };
