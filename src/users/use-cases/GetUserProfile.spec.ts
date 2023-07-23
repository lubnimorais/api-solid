import { beforeEach, describe, expect, it } from 'vitest';

import { faker } from '@faker-js/faker';

import { hash } from 'bcryptjs';

import { InMemoryUserRepository } from '../infra/repositories/in-memory/InMemoryUserRepository';
import { GetUserProfileUseCase } from './GetUserProfileUseCase';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';

let usersRepository: InMemoryUserRepository;
let sut: GetUserProfileUseCase; // sut -> System under test

describe('Get User Pofile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    const name = faker.internet.userName();

    const createUser = await usersRepository.create({
      name,
      email,
      password_hash: await hash(password, 6),
    });

    const { user } = await sut.execute({
      id: createUser.id,
    });

    // expect.any valida que ele é qualquer coisa do tipo que for passado no .any
    expect(user.name).toEqual(name);
  });

  it('should not be able to get user profile with wrong id', async () => {
    expect(
      async () =>
        await sut.execute({
          id: 'non-existing-id',
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
