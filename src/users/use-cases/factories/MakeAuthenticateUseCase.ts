import { UsersRepository } from '@/users/infra/repositories/prisma/UsersRepository';
import { AuthenticateUseCase } from '../AuthenticateUseCase';

function makeAuthenticateUseCase() {
  const usersRepository = new UsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}

export { makeAuthenticateUseCase };
