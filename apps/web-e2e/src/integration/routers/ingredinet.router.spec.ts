import { test, expect } from '@playwright/test';
import { Prisma } from '@prisma/client';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { randomUUID } from 'node:crypto';

import { prisma } from '@kookio/prisma-client';
import {
  CreateIngredientResultDTO,
  CreateManyIngredientResultDTO,
} from '@kookio/prisma-client/dtos';
import { logger } from '@kookio/server-logger';
import { TRPC_TRANSFORMER, TRPC_PATH } from '@kookio/server-trpc/configs';
import type { AppRouter } from '@kookio/server-trpc/types';

import { waitForDbReady } from '../../helpers/wait-for-db';

test.describe('tRPC Ingredient (HTTP)', () => {
  const baseUrl = process.env['BASE_URL'] ?? 'http://localhost:4200';
  const RUN = randomUUID().slice(0, 8);
  const SUITE_USER = `integration-test-user-${RUN}`;
  const url = new URL(TRPC_PATH, baseUrl).toString();
  const trpc = createTRPCProxyClient<AppRouter>({
    transformer: TRPC_TRANSFORMER,
    links: [httpBatchLink({ url })],
  });

  type nameType = { name: string };

  test.beforeAll(async () => {
    await waitForDbReady();
    await fetch(`${baseUrl}/api/health`).catch((error) => {
      logger.error(error, `❌ Error fetching API health`);
    });
  });

  test.describe('call with one object', () => {
    let created: CreateIngredientResultDTO;
    let where: Prisma.IngredientWhereUniqueInput;

    test.beforeAll(async () => {
      await prisma.ingredient.deleteMany({ where: { userId: SUITE_USER } });
      created = await trpc.ingredient.create.mutate({
        data: {
          userId: SUITE_USER,
          name: `Apple-single-${RUN}`,
          quantity: 1,
          unit: 'pcs',
          optional: false,
        },
      });
      where = { userId_name: { name: created.name, userId: created.userId } };
    });

    test.afterAll(async () => {
      await prisma.ingredient.deleteMany({ where: { userId: SUITE_USER } });
    });

    test('create -> findUnique', async () => {
      const found = await trpc.ingredient.findUnique.query({ where });

      expect(found).toMatchObject(created);
    });

    test('create -> delete', async () => {
      const deleted = await trpc.ingredient.delete.mutate({ where });
      const found = await trpc.ingredient.findUnique.query({ where });

      expect(deleted).toMatchObject(created);
      expect(found).toBeNull();
    });
  });

  test.describe('many objects', () => {
    const data = [
      {
        userId: SUITE_USER,
        name: `Apple-many-${RUN}`,
        quantity: 1,
        unit: 'pcs',
        optional: false,
      },
      {
        userId: SUITE_USER,
        name: `Banana-many-${RUN}`,
        quantity: 2,
        unit: 'pcs',
        optional: true,
      },
    ];
    const names = data.map((d) => d.name);

    let createdMany: CreateManyIngredientResultDTO;

    test.beforeAll(async () => {
      await prisma.ingredient.deleteMany({ where: { userId: SUITE_USER } });
      createdMany = await trpc.ingredient.createMany.mutate({ data });
    });

    test.afterAll(async () => {
      await prisma.ingredient.deleteMany({ where: { userId: SUITE_USER } });
    });

    test('createMany -> findMany(by user)', async () => {
      const foundMany = await trpc.ingredient.findMany.query({
        where: {
          userId: SUITE_USER,
          name: { in: names },
        },
      });
      const foundData = foundMany.data
        .filter((r) => r.userId === SUITE_USER && names.includes(r.name))
        .map((r) => ({
          name: r.name,
          optional: r.optional,
          quantity: r.quantity,
          unit: r.unit,
          userId: r.userId,
        }));
      const sortByName = (a: nameType, b: nameType) =>
        a.name.localeCompare(b.name);

      expect(foundMany.data.length).toBe(createdMany.count);
      expect(foundData.sort(sortByName)).toMatchObject(data.sort(sortByName));
    });

    test('deleteMany -> empty list', async () => {
      const deleteMany = await trpc.ingredient.deleteMany.mutate({
        where: {
          userId: SUITE_USER,
          name: { in: names },
        },
      });
      const foundMany = await trpc.ingredient.findMany.query({
        where: {
          userId: SUITE_USER,
          name: { in: names },
        },
      });
      const foundData = foundMany.data.filter(
        (r) => r.userId === SUITE_USER && names.includes(r.name),
      );

      expect(deleteMany.count).toBe(createdMany.count);
      expect(foundData.length).toBe(0);
    });
  });
});
