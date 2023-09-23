import request from 'supertest';

import { app } from '@/shared/infra/http/app';

import { afterAll, beforeAll, describe, expect } from 'vitest';

import { it } from 'vitest';


describe('Profile Controller (e2e)', () => {
  beforeAll(async () => {
    // para o app estar pronto
    await app.ready()
  })

  afterAll(async () => {
    // aguarda a aplicação fechar
    await app.close()
  })

  it('Should be able to get user profile', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      });

    const authResponse = await request(app.server)
      .post('/sessions')
      .send({
        email: 'johndoe@example.com',
        password: '123456',
      });

    const { token } = authResponse.body;

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

      expect(profileResponse.statusCode).toEqual(200)
      expect(profileResponse.body.user).toEqual(expect.objectContaining({
        email: 'johndoe@example.com',
      }))
  })
})

