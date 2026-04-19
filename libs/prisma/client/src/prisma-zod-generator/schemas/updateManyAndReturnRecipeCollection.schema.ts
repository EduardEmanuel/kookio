import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionSelectObjectSchema as RecipeCollectionSelectObjectSchema } from './objects/RecipeCollectionSelect.schema';
import { RecipeCollectionUpdateManyMutationInputObjectSchema as RecipeCollectionUpdateManyMutationInputObjectSchema } from './objects/RecipeCollectionUpdateManyMutationInput.schema';
import { RecipeCollectionWhereInputObjectSchema as RecipeCollectionWhereInputObjectSchema } from './objects/RecipeCollectionWhereInput.schema';

export const RecipeCollectionUpdateManyAndReturnSchema: z.ZodType<Prisma.RecipeCollectionUpdateManyAndReturnArgs> =
  z
    .object({
      select: RecipeCollectionSelectObjectSchema.optional(),
      data: RecipeCollectionUpdateManyMutationInputObjectSchema,
      where: RecipeCollectionWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionUpdateManyAndReturnArgs>;

export const RecipeCollectionUpdateManyAndReturnZodSchema = z
  .object({
    select: RecipeCollectionSelectObjectSchema.optional(),
    data: RecipeCollectionUpdateManyMutationInputObjectSchema,
    where: RecipeCollectionWhereInputObjectSchema.optional(),
  })
  .strict();
