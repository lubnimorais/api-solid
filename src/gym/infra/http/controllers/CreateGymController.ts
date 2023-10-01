import { FastifyReply, FastifyRequest } from 'fastify';

import { makeCreateGymsUseCase } from '@/gym/use-cases/factories/MakeCreateGymUseCase';

import { z as zod } from 'zod';

async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = zod.object({
    title: zod.string(),
    description: zod.string().nullable(),
    phone: zod.string().nullable(),
    latitude: zod.number().refine((value) => {
      /**
       * latitude sempre precisa ser um valor menor ou igual a 90,
       * podendo ser positivo ou negativo
       * Math.abs é de valor absoluto, sempre transforma em um valor positivo
       */
      return Math.abs(value) <= 90;
    }),
    longitude: zod.number().refine((value) => {
      /**
       * latitude sempre precisa ser um valor menor ou igual a 180,
       * podendo ser positivo ou negativo
       * Math.abs é de valor absoluto, sempre transforma em um valor positivo
       */
      return Math.abs(value) <= 180;
    }),
  });

  const { title, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body);

  const createGymUseCase = makeCreateGymsUseCase();

  const gym = await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  });

  return reply.status(201).send(gym);
}

export { create };
