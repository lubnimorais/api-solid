import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/shared/infra/http/middleware/verify-jwt';
import { verifyUserRole } from '@/shared/infra/http/middleware/verify-user-role';

import { search } from '../controllers/SearchGymController';
import { nearby } from '../controllers/NearbyGymsController';
import { create } from '../controllers/CreateGymController';

export async function gymsRoutes(app: FastifyInstance) {
  // adicionando o middleware de autenticação em todas as rotas
  app.addHook('onRequest', verifyJWT);

  app.get('/search', search);
  app.get('/nearby', nearby);

  app.post('/', { onRequest: verifyUserRole('ADMIN')}, create);
}
