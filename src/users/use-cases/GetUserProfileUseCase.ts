import { User } from '@prisma/client';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';

interface IRequest {
  id: string;
}

interface IResponse {
  user: User;
}

class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}

export { GetUserProfileUseCase };
