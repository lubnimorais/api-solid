import { prismaClient } from '@/shared/infra/prisma';
import { ICheckInsRepository } from '@/users/repositories/ICheckInsRepository';
import { CheckIn, Prisma } from '@prisma/client';
import dayjs from 'dayjs';

class CheckInsRepository implements ICheckInsRepository {
  public async create({
    gym_id,
    user_id,
  }: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prismaClient.checkIn.create({
      data: {
        gym_id,
        user_id,
      },
    });

    return checkIn;
  }

  public async findById(id: string): Promise<CheckIn | null> {
    const checkIn = await prismaClient.checkIn.findUnique({
      where: {
        id,
      },
    });

    return checkIn;
  }

  public async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const checkIn = await prismaClient.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          // maior que ou igual a
          gte: startOfTheDay.toDate(),
          // menor que ou igual
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return checkIn;
  }

  public async findManyByUserId(
    userId: string,
    page: number,
  ): Promise<CheckIn[]> {
    const checkIns = await prismaClient.checkIn.findMany({
      where: {
        user_id: userId,
      },
      // quanto items queremos que traga
      take: 20,
      // quantos itens queremos pular
      skip: (page - 1) * 20,
    });

    return checkIns;
  }

  public async countByUserId(userId: string): Promise<number> {
    const count = await prismaClient.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return count;
  }

  public async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInUpdate = prismaClient.checkIn.update({
      where: { id: checkIn.id },
      data: checkIn,
    });

    return checkInUpdate;
  }
}

export { CheckInsRepository };
