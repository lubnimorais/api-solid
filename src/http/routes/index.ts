import { FastifyInstance } from 'fastify';

import { register } from '@/users/infra/http/controllers/RegisterController';
import { authenticate } from '@/users/infra/http/controllers/AuthenticateController';
import { profile } from '@/users/infra/http/controllers/ProfileController';

async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  /** Authenticated */
  app.get('/me', profile);
}

export { appRoutes };
