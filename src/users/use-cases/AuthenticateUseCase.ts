import { compare } from 'bcryptjs';

import { User } from '@prisma/client';

import { IUsersRepository } from '../repositories/IUsersRepository';
import { InvalidCredentialsError } from './errors/InvalidCredentialsError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
}

class AuthenticateUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await compare(password, user.password_hash);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}

export { AuthenticateUseCase };
