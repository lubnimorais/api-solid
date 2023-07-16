import { describe, expect, it } from 'vitest';

import { faker } from '@faker-js/faker';

import { compare } from 'bcryptjs';

import { RegisterUserCase } from './RegisterUseCase';
import { InMemoryUserRepository } from '../infra/repositories/in-memory/InMemoryUserRepository';
import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError';

describe('Register use case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUserRepository();

    const registerUseCase = new RegisterUserCase(usersRepository);

    const password = faker.internet.password();

    const { user } = await registerUseCase.execute({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password,
    });

    // expect.any valida que ele é qualquer coisa do tipo que for passado no .any
    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUserRepository();

    const registerUseCase = new RegisterUserCase(usersRepository);

    const password = faker.internet.password();

    const { user } = await registerUseCase.execute({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password,
    });

    const isPasswordCorrectlyHashed = await compare(
      password,
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUserCase(usersRepository);

    const email = faker.internet.email();

    const password = faker.internet.password();

    await registerUseCase.execute({
      name: faker.internet.userName(),
      email,
      password,
    });

    await expect(() =>
      registerUseCase.execute({
        name: faker.internet.userName(),
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
