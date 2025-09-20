import { z } from 'zod';

import { Ingredient, IngredientSchema } from '@kookio/schema';

import { publicProcedure, router } from '../trpc';

let ingredientId = 0;
const ingredients: Ingredient[] = [];

export const ingredientRouter = router({
  list: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ input }) => {
      return ingredients.filter(i => i.userId === input.userId);
    }),
  create: publicProcedure
    .input(IngredientSchema)
    .mutation(({ input }) => {
      const newIngredient = {
        // id: ingredientId++,
        name: input.name,
        userId: input.userId,
        quantity: input.quantity,
        unit: input.unit,
        optional: input.optional,
      };
      ingredients.push(newIngredient);
      return newIngredient;
    }),
});