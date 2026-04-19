import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionWhereInputObjectSchema as RecipeCollectionWhereInputObjectSchema } from './objects/RecipeCollectionWhereInput.schema';

export const RecipeCollectionDeleteManySchema: z.ZodType<Prisma.RecipeCollectionDeleteManyArgs> =
  z
    .object({ where: RecipeCollectionWhereInputObjectSchema.optional() })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionDeleteManyArgs>;

export const RecipeCollectionDeleteManyZodSchema = z
  .object({ where: RecipeCollectionWhereInputObjectSchema.optional() })
  .strict();
