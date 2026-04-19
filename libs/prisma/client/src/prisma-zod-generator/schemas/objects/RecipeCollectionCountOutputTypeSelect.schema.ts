import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      recipes: z.boolean().optional(),
    })
    .strict();
export const RecipeCollectionCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.RecipeCollectionCountOutputTypeSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionCountOutputTypeSelect>;
export const RecipeCollectionCountOutputTypeSelectObjectZodSchema =
  makeSchema();
