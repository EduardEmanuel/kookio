import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeSelectObjectSchema as RecipeSelectObjectSchema } from './objects/RecipeSelect.schema';
import { RecipeIncludeObjectSchema as RecipeIncludeObjectSchema } from './objects/RecipeInclude.schema';
import { RecipeUpdateInputObjectSchema as RecipeUpdateInputObjectSchema } from './objects/RecipeUpdateInput.schema';
import { RecipeUncheckedUpdateInputObjectSchema as RecipeUncheckedUpdateInputObjectSchema } from './objects/RecipeUncheckedUpdateInput.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './objects/RecipeWhereUniqueInput.schema';

export const RecipeUpdateOneSchema: z.ZodType<Prisma.RecipeUpdateArgs> = z
  .object({
    select: RecipeSelectObjectSchema.optional(),
    include: RecipeIncludeObjectSchema.optional(),
    data: z.union([
      RecipeUpdateInputObjectSchema,
      RecipeUncheckedUpdateInputObjectSchema,
    ]),
    where: RecipeWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.RecipeUpdateArgs>;

export const RecipeUpdateOneZodSchema = z
  .object({
    select: RecipeSelectObjectSchema.optional(),
    include: RecipeIncludeObjectSchema.optional(),
    data: z.union([
      RecipeUpdateInputObjectSchema,
      RecipeUncheckedUpdateInputObjectSchema,
    ]),
    where: RecipeWhereUniqueInputObjectSchema,
  })
  .strict();
