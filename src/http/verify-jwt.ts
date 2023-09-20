import { FastifyReply, FastifyRequest } from 'fastify';

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    // RETORNAR O TOKEN JWT
    await request.jwtVerify();
  } catch {
    return reply.status(401).send({ error: 'Unauthorized.' });
  }
}
