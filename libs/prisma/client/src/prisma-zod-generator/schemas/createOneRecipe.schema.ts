import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeSelectObjectSchema as RecipeSelectObjectSchema } from './objects/RecipeSelect.schema';
import { RecipeIncludeObjectSchema as RecipeIncludeObjectSchema } from './objects/RecipeInclude.schema';
import { RecipeCreateInputObjectSchema as RecipeCreateInputObjectSchema } from './objects/RecipeCreateInput.schema';
import { RecipeUncheckedCreateInputObjectSchema as RecipeUncheckedCreateInputObjectSchema } from './objects/RecipeUncheckedCreateInput.schema';

export const RecipeCreateOneSchema: z.ZodType<Prisma.RecipeCreateArgs> = z
  .object({
    select: RecipeSelectObjectSchema.optional(),
    include: RecipeIncludeObjectSchema.optional(),
    data: z.union([
      RecipeCreateInputObjectSchema,
      RecipeUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.RecipeCreateArgs>;

export const RecipeCreateOneZodSchema = z
  .object({
    select: RecipeSelectObjectSchema.optional(),
    include: RecipeIncludeObjectSchema.optional(),
    data: z.union([
      RecipeCreateInputObjectSchema,
      RecipeUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict();
