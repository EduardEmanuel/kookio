import { TRPCError } from '@trpc/server';

import { 
  IngredientCreateInputObjectSchema,
  IngredientDeleteOneSchema,
  IngredientFindUniqueResultSchema,
  IngredientFindUniqueSchema,
  IngredientResultSchema,
  IngredientUpdateOneSchema
} from '@kookio/prisma';
import { logger } from '@kookio/utils';

import { publicProcedure, router } from '../trpc';

export const ingredientRouter = router({
  findUnique: publicProcedure
    .input(IngredientFindUniqueSchema)
    .output(IngredientFindUniqueResultSchema)
    .query(async ({ input, ctx }) => {
      try {
        return await ctx.ingredientRepository.findUnique(input)
      } catch (error) {
        logger.error(error, '❌ Error fetching ingredient by ID via tRPC:');
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: `Could not fetch ingredient ${input}` });
      }
    }),

  create: publicProcedure
    .input(IngredientCreateInputObjectSchema)
    .output(IngredientResultSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.ingredientRepository.create(input)
      } catch (error) {
        logger.error(error, '❌ Error creating ingredient via tRPC:');
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: `Failed to create ingredient ${input}` });
      }
    }),

  delete: publicProcedure
    .input(IngredientDeleteOneSchema)
    .output(IngredientResultSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.ingredientRepository.delete(input)
      } catch (error) {
        logger.error(error, '❌ Error deleting ingredient via tRPC:');
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: `Failed to delete ingredient ${input}` });
      }
    }),

  list: publicProcedure
    .output(IngredientResultSchema.array())
    .query(async ({ ctx }) => {
      try {
        return await ctx.ingredientRepository.list();
      } catch (error) {
        logger.error(error, '❌ Error listing ingredients via tRPC:');
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Could not list ingredients' });
      }
    }),

  update: publicProcedure
    .input(IngredientUpdateOneSchema)
    .output(IngredientResultSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.ingredientRepository.update(input);
      } catch (error) {
        logger.error(error, '❌ Error updating ingredient via tRPC:');
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: `Failed to update ingredient ${input}` });
      }
    }),
});
