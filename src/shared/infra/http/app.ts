import fastify from 'fastify';

import { appRoutes } from '../../../http/routes';
import { ZodError } from 'zod';
import { env } from '../../../env';

const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    // 400 - normalmente utilizado para erro de validação
    // error.format() é o método que o Zod tem para formatar melhor os erros
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // TODO - Here we should log to on external tool like Datadog/NewRelic/Sentry
    // ferramenta de observabilidade
  }

  return reply.status(500).send({
    message: 'Internal server error',
  });
});

export { app };