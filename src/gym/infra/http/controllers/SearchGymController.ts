import { FastifyRequest, FastifyReply } from 'fastify';

import { z as zod } from 'zod';

import { makeSearchGymsUseCase } from '@/gym/use-cases/factories/MakeSearchGymsUseCase';

async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = zod.object({
    query: zod.string(),
    page: zod.coerce.number().min(1).default(1),
  });

  const { query, page } = searchGymsQuerySchema.parse(request.query);

  const searchGymsUseCase = makeSearchGymsUseCase();

  const gyms = await searchGymsUseCase.execute({
    query,
    page,
  });

  return reply.status(200).send(gyms);
}

export { search };
