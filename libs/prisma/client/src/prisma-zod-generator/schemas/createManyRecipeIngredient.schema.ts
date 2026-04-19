import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeIngredientCreateManyInputObjectSchema as RecipeIngredientCreateManyInputObjectSchema } from './objects/RecipeIngredientCreateManyInput.schema';

export const RecipeIngredientCreateManySchema: z.ZodType<Prisma.RecipeIngredientCreateManyArgs> =
  z
    .object({
      data: z.union([
        RecipeIngredientCreateManyInputObjectSchema,
        z.array(RecipeIngredientCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeIngredientCreateManyArgs>;

export const RecipeIngredientCreateManyZodSchema = z
  .object({
    data: z.union([
      RecipeIngredientCreateManyInputObjectSchema,
      z.array(RecipeIngredientCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
