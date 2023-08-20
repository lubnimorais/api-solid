import { Gym } from '@prisma/client';

import { IGymsRepository } from '@/gym/repositories/IGymsRepository';

interface IRequest {
  userLatitude: number;
  userLongitude: number;
}

interface IResponse {
  gyms: Gym[];
}

class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  public async execute({
    userLatitude,
    userLongitude,
  }: IRequest): Promise<IResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}

export { FetchNearbyGymsUseCase };
