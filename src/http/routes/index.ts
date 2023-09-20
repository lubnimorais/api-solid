import { FastifyInstance } from 'fastify';

import { register } from '@/users/infra/http/controllers/RegisterController';
import { authenticate } from '@/users/infra/http/controllers/AuthenticateController';
import { profile } from '@/users/infra/http/controllers/ProfileController';
import { verifyJWT } from '../verify-jwt';

async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}

export { appRoutes };
