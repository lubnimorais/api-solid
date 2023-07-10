import { hash } from 'bcryptjs';

import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError';

import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
}

class RegisterUserCase {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    name,
    email,
    password,
  }: IRegisterUserRequest): Promise<IUser> {
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

    return user;
  }
}

export { RegisterUserCase };
