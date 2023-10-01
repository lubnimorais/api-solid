import request from 'supertest';

import { app } from '@/shared/infra/http/app';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser';
import { prismaClient } from '@/shared/infra/prisma';

describe('Validate Check-in Controller (e2e)', () => {
  beforeAll(async () => {
    // para o app estar pronto
    await app.ready();
  });

  afterAll(async () => {
    // aguarda a aplicação fechar
    await app.close();
  });

  it('should be able to validate a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prismaClient.user.findFirstOrThrow();

    const gym = await prismaClient.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      }
    })

    let checkIn = await prismaClient.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      }
    });

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(204);

    checkIn = await prismaClient.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      }
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
});
