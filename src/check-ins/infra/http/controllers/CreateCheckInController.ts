import { FastifyReply, FastifyRequest } from 'fastify';

import { makeCheckInUseCase } from '@/users/use-cases/factories/MakeCheckInUseCase';

import { z as zod } from 'zod';

async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = zod.object({
    gymId: zod.string().uuid(),
  });

  const createCheckInBodySchema = zod.object({
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

  const userId = request.user.sub;
  const { gymId } = createCheckInParamsSchema.parse(request.params);
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body);

  const createCheckInUseCase = makeCheckInUseCase();

  const checkIn = await createCheckInUseCase.execute({
    gymId,
    userId,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send(checkIn);
}

export { create };
