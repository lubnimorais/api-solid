import { FastifyRequest, FastifyReply } from 'fastify';


async function refreshToken(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const { role } = request.user;
  
  const token = await reply.jwtSign(
    {
      role
    },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  );

  const refreshToken = await reply.jwtSign(
    {
      role
    },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  );

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true, 
    })
    .status(200).send({ token });
  
}

export { refreshToken };
