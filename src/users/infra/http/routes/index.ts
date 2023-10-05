import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/shared/infra/http/middleware/verify-jwt';

import { register } from '@/users/infra/http/controllers/RegisterController';
import { authenticate } from '@/users/infra/http/controllers/AuthenticateController';
import { profile } from '@/users/infra/http/controllers/ProfileController';
import { refreshToken } from '../controllers/RefreshTokenController';

async function usersRoutes(app: FastifyInstance) {
  app.post('/', register);
  app.post('/sessions', authenticate);

  app.patch('/token/refresh', refreshToken)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}

export { usersRoutes };
