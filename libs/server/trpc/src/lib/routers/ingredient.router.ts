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
} from '@kookio/prisma-client/prisma-zod-generator';
import { ingredientLabelers } from '@kookio/shared-utility';

import { procedure, router } from '../trpc';

export const ingredient = router({
  create: procedure
    .input(IngredientCreateOneSchema)
    .output(IngredientResultSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.repository.ingredient.create(input);
      } catch (error) {
        const label = ingredientLabelers.fromCreateData(input?.data);

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
        const label = ingredientLabelers.fromCreateManyData(input?.data);

        logger.error(
          error,
          `❌ Error creating many ingredients via tRPC: ${label}`,
        );
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
        const label = ingredientLabelers.fromWhere(input?.where);

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
        const label = ingredientLabelers.fromWhere(input?.where);

        logger.error(
          error,
          `❌ Error deleting many ingredients via tRPC: ${label}`,
        );
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
        const label = ingredientLabelers.fromWhere(input?.where);

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
        const label = ingredientLabelers.fromWhere(input?.where);

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
        const label = ingredientLabelers.fromWhere(input?.where);

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
        const label = ingredientLabelers.fromWhere(input?.where);

        logger.error(
          error,
          `❌ Error updating many ingredients via tRPC: ${label}`,
        );
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to update many ingredients: ${label}`,
          cause: error,
        });
      }
    }),
});
