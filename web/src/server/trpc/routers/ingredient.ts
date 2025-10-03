import { z } from 'zod';

import { Ingredient, IngredientSchema } from '@kookio/schema';

import { publicProcedure, router } from '../trpc';

const ingredients: Ingredient[] = [];

export const ingredientRouter = router({
  byId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input }) => ingredients.filter(i => i.userId === input.userId)),
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
  delete: publicProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(({ input }) => {
      const index = ingredients.findIndex(i => i.userId === input.userId);
      if (index > -1) {
        return ingredients.splice(index, 1);
      }
      return [];
    }),
  list: publicProcedure
    .query(() => ingredients),
  update: publicProcedure
    .input(IngredientSchema)
    .mutation(({ input }) => {
      const index = ingredients.findIndex(i => i.userId === input.userId);
      if (index > -1) {
        ingredients[index] = input;
        return ingredients[index];
      }
      return null;
    }),
});