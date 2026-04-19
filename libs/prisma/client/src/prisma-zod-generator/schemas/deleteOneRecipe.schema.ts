import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeSelectObjectSchema as RecipeSelectObjectSchema } from './objects/RecipeSelect.schema';
import { RecipeIncludeObjectSchema as RecipeIncludeObjectSchema } from './objects/RecipeInclude.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './objects/RecipeWhereUniqueInput.schema';

export const RecipeDeleteOneSchema: z.ZodType<Prisma.RecipeDeleteArgs> = z
  .object({
    select: RecipeSelectObjectSchema.optional(),
    include: RecipeIncludeObjectSchema.optional(),
    where: RecipeWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.RecipeDeleteArgs>;

export const RecipeDeleteOneZodSchema = z
  .object({
    select: RecipeSelectObjectSchema.optional(),
    include: RecipeIncludeObjectSchema.optional(),
    where: RecipeWhereUniqueInputObjectSchema,
  })
  .strict();
