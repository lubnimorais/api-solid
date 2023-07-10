import { FastifyInstance } from 'fastify';

import { register } from '../../users/infra/http/controllers/RegisterController';

async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
}

export { appRoutes };
