import { Prisma } from '@prisma/client';

import { prisma } from '@kookio/prisma-client';
import {
  CreateIngredientResultDTO,
  CreateManyIngredientResultDTO,
} from '@kookio/prisma-validator';

import { callerE2E } from '../../../test-setup';

const SUITE_USER = `it-user-${Date.now()}`;

describe('tRPC Ingredient caller (integration)', () => {
  afterAll(async () => {
    await prisma.ingredient.deleteMany({ where: { userId: SUITE_USER } });
    await prisma.$disconnect();
  });

  describe('call with one object', () => {
    let created: CreateIngredientResultDTO;
    let where: Prisma.IngredientWhereUniqueInput;

    beforeAll(async () => {
      created = await callerE2E.ingredient.create({
        data: {
          userId: SUITE_USER,
          name: 'Apple-single',
          quantity: 1,
          unit: 'pcs',
          optional: false,
        },
      });
      where = { id: created.id };
    });

    it('create -> findUnique', async () => {
      const found = await callerE2E.ingredient.findUnique({ where });

      expect(found).toMatchObject(created);
    });

    it('create -> delete', async () => {
      const deleted = await callerE2E.ingredient.delete({ where });
      const found = await callerE2E.ingredient.findUnique({ where });

      expect(deleted).toMatchObject(created);
      expect(found).toBeNull();
    });
  });

  describe('many objects', () => {
    const data = [
      { userId: SUITE_USER, name: 'Apple-many', quantity: 1, unit: 'pcs', optional: false },
      { userId: SUITE_USER, name: 'Banana-many', quantity: 2, unit: 'pcs', optional: true },
    ];

    let createdMany: CreateManyIngredientResultDTO;

    beforeAll(async () => {
      createdMany = await callerE2E.ingredient.createMany({ data });
    });

    it('createMany -> findMany(by user)', async () => {
      const foundMany = await callerE2E.ingredient.findMany({
        where: { userId: SUITE_USER },
      });
      const foundData = foundMany.data
        .filter(result => {
            const { name, userId } = result;
            
            return userId === SUITE_USER && ['Apple-many', 'Banana-many'].includes(name);
        })
        .map(result => {
            const { name, optional, quantity, unit, userId } = result;
            
            return { name, optional, quantity, unit, userId };
        });
      const sortByName = (a: any, b: any) => a.name.localeCompare(b.name);

      expect(foundMany.data.length).toBe(createdMany.count);
      expect(foundData.sort(sortByName)).toMatchObject(data.sort(sortByName));
    });

    it('deleteMany -> empty list', async () => {
      const deleteMany = await callerE2E.ingredient.deleteMany({
        where: {
          userId: SUITE_USER,
          name: { in: ['Apple-many', 'Banana-many'] },
        },
      });
      const foundMany = await callerE2E.ingredient.findMany({ where: { userId: SUITE_USER } });
      const foundData = foundMany.data
        .filter(result => {
            const { name, userId } = result;

            return userId === SUITE_USER && name.endsWith('-many')
        });

      expect(deleteMany.count).toBe(createdMany.count);
      expect(foundData.length).toBe(0);
    });
  });
});