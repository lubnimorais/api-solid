import request from 'supertest';

import { app } from '@/shared/infra/http/app';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser';
import { prismaClient } from '@/shared/infra/prisma';

describe('Metric Check-in Controller (e2e)', () => {
  beforeAll(async () => {
    // para o app estar pronto
    await app.ready();
  });

  afterAll(async () => {
    // aguarda a aplicação fechar
    await app.close();
  });

  it('should be able to get the total count of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prismaClient.user.findFirstOrThrow();

    const gym = await prismaClient.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      }
    })

    await prismaClient.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id
        },
        {
          gym_id: gym.id,
          user_id: user.id
        }
      ]
    })

    const response = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkInsCount).toEqual(2)
  });
});
