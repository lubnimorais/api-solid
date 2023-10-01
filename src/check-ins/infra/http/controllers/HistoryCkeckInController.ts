import { FastifyRequest, FastifyReply } from 'fastify';

import { z as zod } from 'zod';

import { makeFetchUserCheckInsHistoryUseCase } from '@/users/use-cases/factories/MakeFetchUserCheckInsHistoryUseCase';

async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = zod.object({
    page: zod.coerce.number().min(1).default(1),
  });

  const userId = request.user.sub;
  const { page } = checkInHistoryQuerySchema.parse(request.query);

  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();

  const checkIns = await fetchUserCheckInsHistoryUseCase.execute({
    userId,
    page,
  });

  return reply.status(200).send(checkIns);
}

export { history };
