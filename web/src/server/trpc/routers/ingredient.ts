import { z } from 'zod';

import { Ingredient, IngredientSchema } from '@kookio/schema';

import { publicProcedure, router } from '../trpc';

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
      ingredients
        .map(ingredient => JSON.stringify(ingredient))
        .includes(JSON.stringify(newIngredient)) 
        || ingredients.push(newIngredient);
      return newIngredient;
    }),
});