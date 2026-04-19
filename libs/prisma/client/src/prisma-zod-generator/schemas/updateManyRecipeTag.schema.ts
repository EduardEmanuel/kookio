import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeTagUpdateManyMutationInputObjectSchema as RecipeTagUpdateManyMutationInputObjectSchema } from './objects/RecipeTagUpdateManyMutationInput.schema';
import { RecipeTagWhereInputObjectSchema as RecipeTagWhereInputObjectSchema } from './objects/RecipeTagWhereInput.schema';

export const RecipeTagUpdateManySchema: z.ZodType<Prisma.RecipeTagUpdateManyArgs> =
  z
    .object({
      data: RecipeTagUpdateManyMutationInputObjectSchema,
      where: RecipeTagWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeTagUpdateManyArgs>;

export const RecipeTagUpdateManyZodSchema = z
  .object({
    data: RecipeTagUpdateManyMutationInputObjectSchema,
    where: RecipeTagWhereInputObjectSchema.optional(),
  })
  .strict();
