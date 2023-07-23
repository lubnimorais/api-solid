import { User } from '@prisma/client';

import { hash } from 'bcryptjs';

import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError';

import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

interface IRegisterUserResponse {
  user: User;
}

class RegisterUserCase {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    name,
    email,
    password,
  }: IRegisterUserRequest): Promise<IRegisterUserResponse> {
    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });

    return { user };
  }
}

export { RegisterUserCase };
