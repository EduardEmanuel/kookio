import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeTagSelectObjectSchema as RecipeTagSelectObjectSchema } from './objects/RecipeTagSelect.schema';
import { RecipeTagUpdateManyMutationInputObjectSchema as RecipeTagUpdateManyMutationInputObjectSchema } from './objects/RecipeTagUpdateManyMutationInput.schema';
import { RecipeTagWhereInputObjectSchema as RecipeTagWhereInputObjectSchema } from './objects/RecipeTagWhereInput.schema';

export const RecipeTagUpdateManyAndReturnSchema: z.ZodType<Prisma.RecipeTagUpdateManyAndReturnArgs> =
  z
    .object({
      select: RecipeTagSelectObjectSchema.optional(),
      data: RecipeTagUpdateManyMutationInputObjectSchema,
      where: RecipeTagWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeTagUpdateManyAndReturnArgs>;

export const RecipeTagUpdateManyAndReturnZodSchema = z
  .object({
    select: RecipeTagSelectObjectSchema.optional(),
    data: RecipeTagUpdateManyMutationInputObjectSchema,
    where: RecipeTagWhereInputObjectSchema.optional(),
  })
  .strict();
