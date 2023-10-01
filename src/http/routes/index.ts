import { FastifyInstance } from 'fastify';

import { usersRoutes } from '@/users/infra/http/routes';
import { gymsRoutes } from '@/gym/infra/http/routes';
import { checkInsRoutes } from '@/check-ins/infra/http/routes';

async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes, {
    prefix: '/users',
  });

  app.register(gymsRoutes, {
    prefix: '/gyms',
  });

  app.register(checkInsRoutes, {
    prefix: '/check-ins',
  });
}

export { appRoutes };
