import { FastifyInstance } from 'fastify';

import { register } from '@/users/infra/http/controllers/RegisterController';
import { authenticate } from '@/users/infra/http/controllers/AuthenticateController';

async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);
}

export { appRoutes };
