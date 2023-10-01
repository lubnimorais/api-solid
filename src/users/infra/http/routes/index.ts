import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/verify-jwt';

import { register } from '@/users/infra/http/controllers/RegisterController';
import { authenticate } from '@/users/infra/http/controllers/AuthenticateController';
import { profile } from '@/users/infra/http/controllers/ProfileController';

async function usersRoutes(app: FastifyInstance) {
  app.post('/', register);
  app.post('/sessions', authenticate);

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}

export { usersRoutes };
