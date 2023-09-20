import { makeGetUserProfileUseCase } from '@/users/use-cases/factories/MakeGetUserProfileUseCase';
import { FastifyRequest, FastifyReply } from 'fastify';

async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({ id: request.user.sub });

  reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}

export { profile };
