import { UsersRepository } from '@/users/infra/repositories/prisma/UsersRepository';
import { RegisterUserCase } from '../RegisterUseCase';

function makeRegisterUseCase() {
  const usersRepository = new UsersRepository();
  const registerUseCase = new RegisterUserCase(usersRepository);

  return registerUseCase;
}

export { makeRegisterUseCase };
