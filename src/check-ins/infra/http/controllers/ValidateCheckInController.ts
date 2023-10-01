import { FastifyRequest, FastifyReply } from 'fastify';

import { makeValidateCheckInUseCase } from '@/users/use-cases/factories/MakeValidateCheckInUseCase';

import { z as zod } from 'zod';

async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = zod.object({
    checkInId: zod.string(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const validateCheckInUseCase = makeValidateCheckInUseCase();

  await validateCheckInUseCase.execute({ checkInId });

  return reply.status(204).send();
}

export { validate };
