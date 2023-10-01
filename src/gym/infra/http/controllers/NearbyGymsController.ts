import { FastifyRequest, FastifyReply } from 'fastify';

import { z as zod } from 'zod';

import { makeFetchNearbyGymsUseCase } from '@/gym/use-cases/factories/MakeFetchNearbyGymsUseCase';

async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = zod.object({
    latitude: zod.coerce.number().refine((value) => {
      /**
       * latitude sempre precisa ser um valor menor ou igual a 90,
       * podendo ser positivo ou negativo
       * Math.abs é de valor absoluto, sempre transforma em um valor positivo
       */
      return Math.abs(value) <= 90;
    }),
    longitude: zod.coerce.number().refine((value) => {
      /**
       * latitude sempre precisa ser um valor menor ou igual a 180,
       * podendo ser positivo ou negativo
       * Math.abs é de valor absoluto, sempre transforma em um valor positivo
       */
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query);

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase();

  const gyms = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send(gyms);
}

export { nearby };
