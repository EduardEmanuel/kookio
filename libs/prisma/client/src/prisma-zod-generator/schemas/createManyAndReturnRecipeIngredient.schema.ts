import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeIngredientSelectObjectSchema as RecipeIngredientSelectObjectSchema } from './objects/RecipeIngredientSelect.schema';
import { RecipeIngredientCreateManyInputObjectSchema as RecipeIngredientCreateManyInputObjectSchema } from './objects/RecipeIngredientCreateManyInput.schema';

export const RecipeIngredientCreateManyAndReturnSchema: z.ZodType<Prisma.RecipeIngredientCreateManyAndReturnArgs> =
  z
    .object({
      select: RecipeIngredientSelectObjectSchema.optional(),
      data: z.union([
        RecipeIngredientCreateManyInputObjectSchema,
        z.array(RecipeIngredientCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeIngredientCreateManyAndReturnArgs>;

export const RecipeIngredientCreateManyAndReturnZodSchema = z
  .object({
    select: RecipeIngredientSelectObjectSchema.optional(),
    data: z.union([
      RecipeIngredientCreateManyInputObjectSchema,
      z.array(RecipeIngredientCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
