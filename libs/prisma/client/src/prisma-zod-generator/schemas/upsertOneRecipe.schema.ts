import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeSelectObjectSchema as RecipeSelectObjectSchema } from './objects/RecipeSelect.schema';
import { RecipeIncludeObjectSchema as RecipeIncludeObjectSchema } from './objects/RecipeInclude.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './objects/RecipeWhereUniqueInput.schema';
import { RecipeCreateInputObjectSchema as RecipeCreateInputObjectSchema } from './objects/RecipeCreateInput.schema';
import { RecipeUncheckedCreateInputObjectSchema as RecipeUncheckedCreateInputObjectSchema } from './objects/RecipeUncheckedCreateInput.schema';
import { RecipeUpdateInputObjectSchema as RecipeUpdateInputObjectSchema } from './objects/RecipeUpdateInput.schema';
import { RecipeUncheckedUpdateInputObjectSchema as RecipeUncheckedUpdateInputObjectSchema } from './objects/RecipeUncheckedUpdateInput.schema';

export const RecipeUpsertOneSchema: z.ZodType<Prisma.RecipeUpsertArgs> = z
  .object({
    select: RecipeSelectObjectSchema.optional(),
    include: RecipeIncludeObjectSchema.optional(),
    where: RecipeWhereUniqueInputObjectSchema,
    create: z.union([
      RecipeCreateInputObjectSchema,
      RecipeUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      RecipeUpdateInputObjectSchema,
      RecipeUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.RecipeUpsertArgs>;

export const RecipeUpsertOneZodSchema = z
  .object({
    select: RecipeSelectObjectSchema.optional(),
    include: RecipeIncludeObjectSchema.optional(),
    where: RecipeWhereUniqueInputObjectSchema,
    create: z.union([
      RecipeCreateInputObjectSchema,
      RecipeUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      RecipeUpdateInputObjectSchema,
      RecipeUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();
