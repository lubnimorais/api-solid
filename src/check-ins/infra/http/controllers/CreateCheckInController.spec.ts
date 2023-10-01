import request from 'supertest';

import { app } from '@/shared/infra/http/app';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser';
import { prismaClient } from '@/shared/infra/prisma';

describe('Create Check-in Controller (e2e)', () => {
  beforeAll(async () => {
    // para o app estar pronto
    await app.ready();
  });

  afterAll(async () => {
    // aguarda a aplicação fechar
    await app.close();
  });

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prismaClient.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      }
    })

    const response = await request(app.server)
      .post(`/check-ins/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    expect(response.statusCode).toEqual(201);
  });
});
