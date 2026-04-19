import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      userId: z.string(),
      name: z.string(),
    })
    .strict();
export const RecipeCollectionUserIdNameCompoundUniqueInputObjectSchema: z.ZodType<Prisma.RecipeCollectionUserIdNameCompoundUniqueInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionUserIdNameCompoundUniqueInput>;
export const RecipeCollectionUserIdNameCompoundUniqueInputObjectZodSchema =
  makeSchema();
