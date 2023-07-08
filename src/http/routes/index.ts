import { FastifyInstance } from 'fastify';

import { register } from '../controllers/RegisterController';

async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
}

export { appRoutes };
