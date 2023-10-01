import fastify from 'fastify';

import fastifyJwt from '@fastify/jwt';

import fastifyCookie from '@fastify/cookie';

import { ZodError } from 'zod';

import { env } from '../../../env';

// import { usersRoutes } from '@/users/infra/http/routes';
// import { gymsRoutes } from '@/gym/infra/http/routes';
import { appRoutes } from '@/http/routes';

const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m', // 10 minutos
  },
});

// COOKIES
app.register(fastifyCookie);

// ROUTES
app.register(appRoutes);
// app.register(usersRoutes);
// app.register(gymsRoutes);

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
