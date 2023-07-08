import { FastifyReply, FastifyRequest } from 'fastify';

import { hash } from 'bcryptjs';

import { z } from 'zod';

import { prismaClient } from '@/shared/infra/prisma';

async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  // O parse dá um throw automático
  const { name, email, password } = registerBodySchema.parse(request.body);

  const passwordHash = await hash(password, 6);

  const userWithSameEmail = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    // Status 409 é de conflito. Geralmente quando tem dados duplicados
    return reply.status(409).send();
  }

  const user = await prismaClient.user.create({
    data: {
      name,
      email,
      password_hash: passwordHash,
    },
  });

  return reply.status(201).send({ user });
}

export { register };
