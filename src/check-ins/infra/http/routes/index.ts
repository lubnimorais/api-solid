import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/shared/infra/http/middleware/verify-jwt';

import { create } from '../controllers/CreateCheckInController';
import { validate } from '../controllers/ValidateCheckInController';
import { history } from '../controllers/HistoryCkeckInController';
import { metrics } from '../controllers/MetricsCheckInController';
import { verifyUserRole } from '@/shared/infra/http/middleware/verify-user-role';

export async function checkInsRoutes(app: FastifyInstance) {
  // adicionando o middleware de autenticação em todas as rotas
  app.addHook('onRequest', verifyJWT);

  app.get('/history', history);
  app.get('/metrics', metrics);

  app.post('/gyms/:gymId/check-ins', create);
  app.patch('/:checkInId/validate', { onRequest: [verifyUserRole('ADMIN')]}, validate);
}
