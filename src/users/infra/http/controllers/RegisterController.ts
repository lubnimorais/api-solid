import { FastifyReply, FastifyRequest } from 'fastify';

import { z } from 'zod';

import { UserAlreadyExistsError } from '@/users/use-cases/errors/UserAlreadyExistsError';

import { makeRegisterUseCase } from '@/users/use-cases/factories/MakeRegisterUseCase';

async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  // O parse dá um throw automático
  const { name, email, password } = registerBodySchema.parse(request.body);

  let user;

  try {
    const registerUseCase = makeRegisterUseCase();

    user = await registerUseCase.execute({ name, email, password });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      // Status 409 é de conflito. Geralmente quando tem dados duplicados
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send(user);
}

export { register };
