import { beforeEach, describe, expect, it } from 'vitest';

import { faker } from '@faker-js/faker';

import { compare } from 'bcryptjs';

import { RegisterUserCase } from './RegisterUseCase';
import { InMemoryUserRepository } from '../infra/repositories/in-memory/InMemoryUserRepository';
import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError';

let usersRepository: InMemoryUserRepository;
let sut: RegisterUserCase; // sut -> System under test

describe('Register use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new RegisterUserCase(usersRepository);
  });

  it('should be able to register', async () => {
    const password = faker.internet.password();

    const { user } = await sut.execute({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password,
    });

    // expect.any valida que ele é qualquer coisa do tipo que for passado no .any
    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const password = faker.internet.password();

    const { user } = await sut.execute({
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
    const email = faker.internet.email();

    const password = faker.internet.password();

    await sut.execute({
      name: faker.internet.userName(),
      email,
      password,
    });

    await expect(() =>
      sut.execute({
        name: faker.internet.userName(),
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
