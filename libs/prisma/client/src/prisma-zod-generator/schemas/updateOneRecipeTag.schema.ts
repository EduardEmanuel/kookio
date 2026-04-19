import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeTagSelectObjectSchema as RecipeTagSelectObjectSchema } from './objects/RecipeTagSelect.schema';
import { RecipeTagIncludeObjectSchema as RecipeTagIncludeObjectSchema } from './objects/RecipeTagInclude.schema';
import { RecipeTagUpdateInputObjectSchema as RecipeTagUpdateInputObjectSchema } from './objects/RecipeTagUpdateInput.schema';
import { RecipeTagUncheckedUpdateInputObjectSchema as RecipeTagUncheckedUpdateInputObjectSchema } from './objects/RecipeTagUncheckedUpdateInput.schema';
import { RecipeTagWhereUniqueInputObjectSchema as RecipeTagWhereUniqueInputObjectSchema } from './objects/RecipeTagWhereUniqueInput.schema';

export const RecipeTagUpdateOneSchema: z.ZodType<Prisma.RecipeTagUpdateArgs> = z
  .object({
    select: RecipeTagSelectObjectSchema.optional(),
    include: RecipeTagIncludeObjectSchema.optional(),
    data: z.union([
      RecipeTagUpdateInputObjectSchema,
      RecipeTagUncheckedUpdateInputObjectSchema,
    ]),
    where: RecipeTagWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.RecipeTagUpdateArgs>;

export const RecipeTagUpdateOneZodSchema = z
  .object({
    select: RecipeTagSelectObjectSchema.optional(),
    include: RecipeTagIncludeObjectSchema.optional(),
    data: z.union([
      RecipeTagUpdateInputObjectSchema,
      RecipeTagUncheckedUpdateInputObjectSchema,
    ]),
    where: RecipeTagWhereUniqueInputObjectSchema,
  })
  .strict();
