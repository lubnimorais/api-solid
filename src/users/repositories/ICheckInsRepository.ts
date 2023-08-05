import { CheckIn, Prisma } from '@prisma/client';

interface ICheckInsRepository {
  create({
    gym_id,
    user_id,
  }: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
}

export { ICheckInsRepository };
