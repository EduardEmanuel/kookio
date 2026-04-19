import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionEntryWhereInputObjectSchema as RecipeCollectionEntryWhereInputObjectSchema } from './objects/RecipeCollectionEntryWhereInput.schema';

export const RecipeCollectionEntryDeleteManySchema: z.ZodType<Prisma.RecipeCollectionEntryDeleteManyArgs> =
  z
    .object({ where: RecipeCollectionEntryWhereInputObjectSchema.optional() })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionEntryDeleteManyArgs>;

export const RecipeCollectionEntryDeleteManyZodSchema = z
  .object({ where: RecipeCollectionEntryWhereInputObjectSchema.optional() })
  .strict();
