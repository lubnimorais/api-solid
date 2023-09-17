import { FastifyRequest, FastifyReply } from 'fastify';

async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  console.log(request.user);
  // try {
  //   const authenticateUseCase = makeAuthenticateUseCase();

  //   await authenticateUseCase.execute({ email, password });
  // } catch (err) {
  //   if (err instanceof InvalidCredentialsError) {
  //     return reply.status(400).send({
  //       message: err.message,
  //     });
  //   }

  //   throw err;
  // }

  reply.status(200).send();
}

export { profile };
