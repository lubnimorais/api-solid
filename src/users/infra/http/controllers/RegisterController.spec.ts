import request from 'supertest';

import { app } from '@/shared/infra/http/app';

import { afterAll, beforeAll, describe, expect } from 'vitest';

import { it } from 'vitest';


describe('Register Controller (e2e)', () => {
  beforeAll(async () => {
    // para o app estar pronto
    await app.ready()
  })

  afterAll(async () => {
    // aguarda a aplicação fechar
    await app.close()
  })

  it('Should be able to register', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      });

    expect(response.statusCode).toEqual(201)
  })
})

