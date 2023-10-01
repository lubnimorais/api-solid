import { FastifyRequest, FastifyReply } from 'fastify';

import { makeGetUserMetricsUseCase } from '@/users/use-cases/factories/MakeGetUserMetricsUseCase';

async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub;

  const getUserMetricsUseCase = makeGetUserMetricsUseCase();

  const checkInsCount = await getUserMetricsUseCase.execute({
    userId,
  });

  return reply.status(200).send(checkInsCount);
}

export { metrics };
