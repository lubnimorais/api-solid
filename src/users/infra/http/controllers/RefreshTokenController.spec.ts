import request from 'supertest';

import { app } from '@/shared/infra/http/app';

import { afterAll, beforeAll, describe, expect } from 'vitest';

import { it } from 'vitest';


describe('Refresh Token Controller (e2e)', () => {
  beforeAll(async () => {
    // para o app estar pronto
    await app.ready()
  })

  afterAll(async () => {
    // aguarda a aplicação fechar
    await app.close()
  })

  it('Should be able to refresh a token', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      });

    const authResponse = await request(app.server)
      .post('/users/sessions')
      .send({
        email: 'johndoe@example.com',
        password: '123456',
      });

    /**
     * Quando o back-end cria um cookie ele devolve
     * o header onde é criado o cookie ele devolve
     * esse header Set-Cookie na resposta
     */
    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/users/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    });
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken=')
    ])
  })
})

