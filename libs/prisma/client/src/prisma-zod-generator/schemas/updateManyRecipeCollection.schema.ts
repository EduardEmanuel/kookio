import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionUpdateManyMutationInputObjectSchema as RecipeCollectionUpdateManyMutationInputObjectSchema } from './objects/RecipeCollectionUpdateManyMutationInput.schema';
import { RecipeCollectionWhereInputObjectSchema as RecipeCollectionWhereInputObjectSchema } from './objects/RecipeCollectionWhereInput.schema';

export const RecipeCollectionUpdateManySchema: z.ZodType<Prisma.RecipeCollectionUpdateManyArgs> =
  z
    .object({
      data: RecipeCollectionUpdateManyMutationInputObjectSchema,
      where: RecipeCollectionWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionUpdateManyArgs>;

export const RecipeCollectionUpdateManyZodSchema = z
  .object({
    data: RecipeCollectionUpdateManyMutationInputObjectSchema,
    where: RecipeCollectionWhereInputObjectSchema.optional(),
  })
  .strict();
