import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeTagSelectObjectSchema as RecipeTagSelectObjectSchema } from './objects/RecipeTagSelect.schema';
import { RecipeTagIncludeObjectSchema as RecipeTagIncludeObjectSchema } from './objects/RecipeTagInclude.schema';
import { RecipeTagWhereUniqueInputObjectSchema as RecipeTagWhereUniqueInputObjectSchema } from './objects/RecipeTagWhereUniqueInput.schema';

export const RecipeTagFindUniqueSchema: z.ZodType<Prisma.RecipeTagFindUniqueArgs> =
  z
    .object({
      select: RecipeTagSelectObjectSchema.optional(),
      include: RecipeTagIncludeObjectSchema.optional(),
      where: RecipeTagWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeTagFindUniqueArgs>;

export const RecipeTagFindUniqueZodSchema = z
  .object({
    select: RecipeTagSelectObjectSchema.optional(),
    include: RecipeTagIncludeObjectSchema.optional(),
    where: RecipeTagWhereUniqueInputObjectSchema,
  })
  .strict();
