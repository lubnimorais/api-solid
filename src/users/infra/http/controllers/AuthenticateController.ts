import { FastifyRequest, FastifyReply } from 'fastify';

import { z } from 'zod';

import { InvalidCredentialsError } from '@/users/use-cases/errors/InvalidCredentialsError';

import { makeAuthenticateUseCase } from '@/users/use-cases/factories/MakeAuthenticateUseCase';

async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    await authenticateUseCase.execute({ email, password });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: err.message,
      });
    }

    throw err;
  }

  reply.status(200).send();
}

export { authenticate };
