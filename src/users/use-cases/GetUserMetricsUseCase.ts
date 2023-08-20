import { ICheckInsRepository } from '../repositories/ICheckInsRepository';

interface IRequest {
  userId: string;
}

interface IResponse {
  checkInsCount: number;
}

class GetUseMetricsUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  public async execute({ userId }: IRequest): Promise<IResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return { checkInsCount };
  }
}

export { GetUseMetricsUseCase };
