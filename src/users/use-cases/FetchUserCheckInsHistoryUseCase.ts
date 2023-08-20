import { CheckIn } from '@prisma/client';

import { ICheckInsRepository } from '../repositories/ICheckInsRepository';

interface IRequest {
  userId: string;
  page: number;
}

interface IResponse {
  checkIns: CheckIn[];
}

class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  public async execute({ userId, page }: IRequest): Promise<IResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return { checkIns };
  }
}

export { FetchUserCheckInsHistoryUseCase };
