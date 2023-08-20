import { CheckIn } from '@prisma/client';

import { ICheckInsRepository } from '../repositories/ICheckInsRepository';
import { IGymsRepository } from '../../gym/repositories/IGymsRepository';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';
import { getDistanceBetweenCoordinates } from '../../utils/getDistanceBetweenCoordinates';
import { MaxNumbersOfCheckInsError } from './errors/MaxNumbersOfCheckInsError';
import { MaxDistanceError } from './errors/MaxDistanceError';

interface IRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface IResponse {
  checkIn: CheckIn;
}

class CheckInUseCase {
  constructor(
    private checkInsRepository: ICheckInsRepository,
    private gymsRepository: IGymsRepository,
  ) {}

  public async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: IRequest): Promise<IResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    // calculate distance between user and gym
    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    );

    // 0.1 => 100m
    const MAX_DISTANCE_IN_KILOMETERS = 0.1;

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError();
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkInOnSameDay) {
      throw new MaxNumbersOfCheckInsError();
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}

export { CheckInUseCase };
