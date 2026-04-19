import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeTagSelectObjectSchema as RecipeTagSelectObjectSchema } from './objects/RecipeTagSelect.schema';
import { RecipeTagIncludeObjectSchema as RecipeTagIncludeObjectSchema } from './objects/RecipeTagInclude.schema';
import { RecipeTagCreateInputObjectSchema as RecipeTagCreateInputObjectSchema } from './objects/RecipeTagCreateInput.schema';
import { RecipeTagUncheckedCreateInputObjectSchema as RecipeTagUncheckedCreateInputObjectSchema } from './objects/RecipeTagUncheckedCreateInput.schema';

export const RecipeTagCreateOneSchema: z.ZodType<Prisma.RecipeTagCreateArgs> = z
  .object({
    select: RecipeTagSelectObjectSchema.optional(),
    include: RecipeTagIncludeObjectSchema.optional(),
    data: z.union([
      RecipeTagCreateInputObjectSchema,
      RecipeTagUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.RecipeTagCreateArgs>;

export const RecipeTagCreateOneZodSchema = z
  .object({
    select: RecipeTagSelectObjectSchema.optional(),
    include: RecipeTagIncludeObjectSchema.optional(),
    data: z.union([
      RecipeTagCreateInputObjectSchema,
      RecipeTagUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict();
