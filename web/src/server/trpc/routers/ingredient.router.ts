import { TRPCError } from '@trpc/server';

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
  IngredientUpdateResultSchema
} from '@kookio/prisma-validator';
import { logger } from '@kookio/utils';

import { publicProcedure, router } from '../trpc';

const DEFAULT_NAME = 'undefined ingredient';

export const ingredient = router({
  create: publicProcedure
    .input(IngredientCreateOneSchema)
    .output(IngredientResultSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.repository.ingredient.create(input)
      } catch (error) {
        const { name } = input.data;
        
        logger.error(error, `❌ Error creating ingredient via tRPC: ${name}`);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: `Failed to create ingredient: ${name}`, cause: error });
      }
    }),
   
  createMany: publicProcedure
    .input(IngredientCreateManySchema)
    .output(IngredientCreateManyResultSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.repository.ingredient.createMany(input);
      } catch (error) {
        const dataArray = Array.isArray(input.data) ? input.data : [input.data];
        const names = dataArray.map((i, index) => `${index}. ${i.name}`).join('; ');

        logger.error(error, `❌ Error creating many ingredients via tRPC: ${names}`);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: `Failed to create many ingredients: ${names}`, cause: error });
      }
    }),  

  delete: publicProcedure
    .input(IngredientDeleteOneSchema)
    .output(IngredientDeleteResultSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.repository.ingredient.delete(input)
      } catch (error) {
        const { name } = input.where;
        const safeName = name ?? DEFAULT_NAME;
        
        logger.error(error, `❌ Error deleting ingredient via tRPC: ${safeName}`);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: `Failed to delete ingredient: ${safeName}`, cause: error });
      }
    }),

  deleteMany: publicProcedure
    .input(IngredientDeleteManySchema)
    .output(IngredientDeleteManyResultSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.repository.ingredient.deleteMany(input);
      } catch (error) {
        const { name } = input.where ?? { name: DEFAULT_NAME };
        const safeName = name ?? DEFAULT_NAME;

        logger.error(error, `❌ Error deleting many ingredients via tRPC: ${safeName}`);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: `Failed to delete many ingredients: ${safeName}`, cause: error });
      }
    }),  

  findUnique: publicProcedure
    .input(IngredientFindUniqueSchema)
    .output(IngredientFindUniqueResultSchema)
    .query(async ({ input, ctx }) => {
      try {
        return await ctx.repository.ingredient.findUnique(input)
      } catch (error) {
        const { name } = input.where;
        const safeName = name ?? DEFAULT_NAME;

        logger.error(error, `❌ Error fetching ingredient by ID via tRPC: ${safeName}`);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: `Could not fetch ingredient: ${safeName}`, cause: error });
      }
    }),  

  findMany: publicProcedure
    .input(IngredientFindManySchema)
    .output(IngredientFindManyResultSchema)
    .query(async ({ input, ctx }) => {
      try {
        return await ctx.repository.ingredient.findMany(input);
      } catch (error) {
        const { name } = input.where ?? { name: DEFAULT_NAME };
        const safeName = name ?? DEFAULT_NAME;

        logger.error(error, `❌ Error listing ingredients via tRPC: ${safeName}`);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: `Could not list ingredients: ${safeName}`, cause: error });
      }
    }),

  update: publicProcedure
    .input(IngredientUpdateOneSchema)
    .output(IngredientUpdateResultSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.repository.ingredient.update(input);
      } catch (error) {
        const { name } = input.where ?? { name: DEFAULT_NAME };
        const safeName = name ?? DEFAULT_NAME;

        logger.error(error, `❌ Error updating ingredient via tRPC: ${safeName}`);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: `Failed to update ingredient: ${safeName}`, cause: error });
      }
    }),

  updateMany: publicProcedure
    .input(IngredientUpdateManySchema)
    .output(IngredientUpdateManyResultSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.repository.ingredient.updateMany(input);
      } catch (error) {
        const { name } = input.where ?? { name: DEFAULT_NAME };
        const safeName = name ?? DEFAULT_NAME;

        logger.error(error, `❌ Error updating many ingredients via tRPC: ${safeName}`);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: `Failed to update many ingredients: ${safeName}`, cause: error });
      }
    })  
});
