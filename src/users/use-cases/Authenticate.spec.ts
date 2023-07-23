import { beforeEach, describe, expect, it } from 'vitest';

import { faker } from '@faker-js/faker';

import { hash } from 'bcryptjs';

import { AuthenticateUseCase } from './AuthenticateUseCase';
import { InMemoryUserRepository } from '../infra/repositories/in-memory/InMemoryUserRepository';
import { InvalidCredentialsError } from './errors/InvalidCredentialsError';

let usersRepository: InMemoryUserRepository;
let sut: AuthenticateUseCase; // sut -> System under test

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it('should be able to authenticate', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    await usersRepository.create({
      name: faker.internet.userName(),
      email,
      password_hash: await hash(password, 6),
    });

    const { user } = await sut.execute({
      email,
      password,
    });

    // expect.any valida que ele é qualquer coisa do tipo que for passado no .any
    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    expect(
      async () =>
        await sut.execute({
          email: faker.internet.email(),
          password: faker.internet.password(),
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    await usersRepository.create({
      name: faker.internet.userName(),
      email,
      password_hash: await hash(password, 6),
    });

    expect(
      async () =>
        await sut.execute({
          email,
          password: faker.internet.password(),
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
