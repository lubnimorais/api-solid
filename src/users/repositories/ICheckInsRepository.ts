import { CheckIn, Prisma } from '@prisma/client';

interface ICheckInsRepository {
  create({
    gym_id,
    user_id,
  }: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
}

export { ICheckInsRepository };
