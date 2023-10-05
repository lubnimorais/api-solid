import '@fastify/jwt';

declare module '@fastify/jwt' {
  // o export é para parar de dar erro no FastifyJWT
  export interface FastifyJWT {
    user: {
      sub: string;
      role: 'ADMIN' | 'MEMBER';
    }; // user type is return type of `request.user` object
  }
}
