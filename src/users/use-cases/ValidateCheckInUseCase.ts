import dayjs from 'dayjs';

import { CheckIn } from '@prisma/client';

import { LateCheckInValidationError } from './errors/LateCheckInValidationError';

import { ICheckInsRepository } from '@/users/repositories/ICheckInsRepository';
import { ResourceNotFoundError } from '@/users/use-cases/errors/ResourceNotFoundError';

interface IRequest {
  checkInId: string;
}

interface IResponse {
  checkIn: CheckIn;
}

class ValidateCheckInUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  public async execute({ checkInId }: IRequest): Promise<IResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    );

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}

export { ValidateCheckInUseCase };
