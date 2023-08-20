import { Gym } from '@prisma/client';

import { IGymsRepository } from '@/gym/repositories/IGymsRepository';

interface IRequest {
  query: string;
  page: number;
}

interface IResponse {
  gyms: Gym[];
}

class SearchGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  public async execute({ query, page }: IRequest): Promise<IResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return { gyms };
  }
}

export { SearchGymsUseCase };
