import { Gym } from '@prisma/client';

import { IGymsRepository } from '@/gym/repositories/IGymsRepository';

interface ICreateGymRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface ICreateGymResponse {
  gym: Gym;
}

class CreateGymUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  public async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: ICreateGymRequest): Promise<ICreateGymResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}

export { CreateGymUseCase };
