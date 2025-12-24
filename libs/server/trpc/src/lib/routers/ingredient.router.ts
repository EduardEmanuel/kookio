import { TRPCError } from '@trpc/server';

import { logger } from '@kookio/server-logger';
import {
  IngredientCreateManyResultSchema,
  IngredientCreateManySchema,
  IngredientCreateOneSchema,
  IngredientDeleteManyResultSchema,
  IngredientDeleteManySchema,
  IngredientDeleteOneSchema,
  IngredientDeleteResultSchema,
  IngredientFindManyResultSchema,
  IngredientFindManySchema,
  IngredientFindUniqueResultSchema,
  IngredientFindUniqueSchema,
  IngredientResultSchema,
  IngredientUpdateManyResultSchema,
  IngredientUpdateManySchema,
  IngredientUpdateOneSchema,
  IngredientUpdateResultSchema,
} from '@kookio/prisma-validator';

import { procedure, router } from '../trpc';

const labelFromWhere = (where: any): string => {
  if (!where) return 'ingredient(unknown)';
  if (where.userId_name?.userId && where.userId_name?.name) {
    return `ingredient(user=${where.userId_name.userId}, name=${where.userId_name.name})`;
  }
  if (where.id) return `ingredient(id=${where.id})`;
  if (where.name) return `ingredient(name=${where.name})`;

  return 'ingredient(unknown)';
}

const labelFromCreateData = (data: any): string => {
  if (!data) return 'ingredient(unknown)';
  if (data.userId && data.name) return `ingredient(user=${data.userId}, name=${data.name})`;
  if (data.name) return `ingredient(name=${data.name})`;
  return 'ingredient(unknown)';
}

const labelFromCreateManyData = (data: any): string => {
  const arr = Array.isArray(data) ? data : data ? [data] : [];

  if (arr.length === 0) return 'ingredients(0)';

  const names = arr.map((i, idx) => `${idx}. ${i?.name ?? '(missing name)'}`).join('; ');

  return `ingredients(${arr.length}): ${names}`;
}

export const ingredient = router({
  create: procedure
  .input(IngredientCreateOneSchema)
  .output(IngredientResultSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return await ctx.repository.ingredient.create(input);
    } catch (error) {
      const label = labelFromCreateData(input?.data);
      logger.error(error, `❌ Error creating ingredient via tRPC: ${label}`);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to create ingredient: ${label}`,
        cause: error,
      });
    }
  }),

createMany: procedure
  .input(IngredientCreateManySchema)
  .output(IngredientCreateManyResultSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return await ctx.repository.ingredient.createMany(input);
    } catch (error) {
      const label = labelFromCreateManyData(input?.data);
      logger.error(error, `❌ Error creating many ingredients via tRPC: ${label}`);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to create many ingredients: ${label}`,
        cause: error,
      });
    }
  }),

delete: procedure
  .input(IngredientDeleteOneSchema)
  .output(IngredientDeleteResultSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return await ctx.repository.ingredient.delete(input);
    } catch (error) {
      const label = labelFromWhere(input?.where);
      logger.error(error, `❌ Error deleting ingredient via tRPC: ${label}`);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to delete ingredient: ${label}`,
        cause: error,
      });
    }
  }),

deleteMany: procedure
  .input(IngredientDeleteManySchema)
  .output(IngredientDeleteManyResultSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return await ctx.repository.ingredient.deleteMany(input);
    } catch (error) {
      const label = labelFromWhere(input?.where);
      logger.error(error, `❌ Error deleting many ingredients via tRPC: ${label}`);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to delete many ingredients: ${label}`,
        cause: error,
      });
    }
  }),

findUnique: procedure
  .input(IngredientFindUniqueSchema)
  .output(IngredientFindUniqueResultSchema)
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.repository.ingredient.findUnique(input);
    } catch (error) {
      const label = labelFromWhere(input?.where);
      logger.error(error, `❌ Error fetching ingredient via tRPC: ${label}`);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Could not fetch ingredient: ${label}`,
        cause: error,
      });
    }
  }),

findMany: procedure
  .input(IngredientFindManySchema)
  .output(IngredientFindManyResultSchema)
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.repository.ingredient.findMany(input);
    } catch (error) {
      const label = labelFromWhere(input?.where);
      logger.error(error, `❌ Error listing ingredients via tRPC: ${label}`);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Could not list ingredients: ${label}`,
        cause: error,
      });
    }
  }),

update: procedure
  .input(IngredientUpdateOneSchema)
  .output(IngredientUpdateResultSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return await ctx.repository.ingredient.update(input);
    } catch (error) {
      const label = labelFromWhere(input?.where);
      logger.error(error, `❌ Error updating ingredient via tRPC: ${label}`);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to update ingredient: ${label}`,
        cause: error,
      });
    }
  }),

updateMany: procedure
  .input(IngredientUpdateManySchema)
  .output(IngredientUpdateManyResultSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return await ctx.repository.ingredient.updateMany(input);
    } catch (error) {
      const label = labelFromWhere(input?.where);
      logger.error(error, `❌ Error updating many ingredients via tRPC: ${label}`);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to update many ingredients: ${label}`,
        cause: error,
      });
    }
  }),
});