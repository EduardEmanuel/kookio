import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeTagSelectObjectSchema as RecipeTagSelectObjectSchema } from './objects/RecipeTagSelect.schema';
import { RecipeTagIncludeObjectSchema as RecipeTagIncludeObjectSchema } from './objects/RecipeTagInclude.schema';
import { RecipeTagWhereUniqueInputObjectSchema as RecipeTagWhereUniqueInputObjectSchema } from './objects/RecipeTagWhereUniqueInput.schema';
import { RecipeTagCreateInputObjectSchema as RecipeTagCreateInputObjectSchema } from './objects/RecipeTagCreateInput.schema';
import { RecipeTagUncheckedCreateInputObjectSchema as RecipeTagUncheckedCreateInputObjectSchema } from './objects/RecipeTagUncheckedCreateInput.schema';
import { RecipeTagUpdateInputObjectSchema as RecipeTagUpdateInputObjectSchema } from './objects/RecipeTagUpdateInput.schema';
import { RecipeTagUncheckedUpdateInputObjectSchema as RecipeTagUncheckedUpdateInputObjectSchema } from './objects/RecipeTagUncheckedUpdateInput.schema';

export const RecipeTagUpsertOneSchema: z.ZodType<Prisma.RecipeTagUpsertArgs> = z
  .object({
    select: RecipeTagSelectObjectSchema.optional(),
    include: RecipeTagIncludeObjectSchema.optional(),
    where: RecipeTagWhereUniqueInputObjectSchema,
    create: z.union([
      RecipeTagCreateInputObjectSchema,
      RecipeTagUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      RecipeTagUpdateInputObjectSchema,
      RecipeTagUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.RecipeTagUpsertArgs>;

export const RecipeTagUpsertOneZodSchema = z
  .object({
    select: RecipeTagSelectObjectSchema.optional(),
    include: RecipeTagIncludeObjectSchema.optional(),
    where: RecipeTagWhereUniqueInputObjectSchema,
    create: z.union([
      RecipeTagCreateInputObjectSchema,
      RecipeTagUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      RecipeTagUpdateInputObjectSchema,
      RecipeTagUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();
