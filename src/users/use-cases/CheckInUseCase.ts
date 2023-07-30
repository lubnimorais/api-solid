import { CheckIn } from '@prisma/client';

import { ICheckInsRepository } from '../repositories/ICheckInsRepository';

interface IRequest {
  userId: string;
  gymId: string;
}

interface IResponse {
  checkIn: CheckIn;
}

class CheckInUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  public async execute({ userId, gymId }: IRequest): Promise<IResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}

export { CheckInUseCase };
