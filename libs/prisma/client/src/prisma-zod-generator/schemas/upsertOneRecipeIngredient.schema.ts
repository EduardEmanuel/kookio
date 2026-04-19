import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeIngredientSelectObjectSchema as RecipeIngredientSelectObjectSchema } from './objects/RecipeIngredientSelect.schema';
import { RecipeIngredientIncludeObjectSchema as RecipeIngredientIncludeObjectSchema } from './objects/RecipeIngredientInclude.schema';
import { RecipeIngredientWhereUniqueInputObjectSchema as RecipeIngredientWhereUniqueInputObjectSchema } from './objects/RecipeIngredientWhereUniqueInput.schema';
import { RecipeIngredientCreateInputObjectSchema as RecipeIngredientCreateInputObjectSchema } from './objects/RecipeIngredientCreateInput.schema';
import { RecipeIngredientUncheckedCreateInputObjectSchema as RecipeIngredientUncheckedCreateInputObjectSchema } from './objects/RecipeIngredientUncheckedCreateInput.schema';
import { RecipeIngredientUpdateInputObjectSchema as RecipeIngredientUpdateInputObjectSchema } from './objects/RecipeIngredientUpdateInput.schema';
import { RecipeIngredientUncheckedUpdateInputObjectSchema as RecipeIngredientUncheckedUpdateInputObjectSchema } from './objects/RecipeIngredientUncheckedUpdateInput.schema';

export const RecipeIngredientUpsertOneSchema: z.ZodType<Prisma.RecipeIngredientUpsertArgs> =
  z
    .object({
      select: RecipeIngredientSelectObjectSchema.optional(),
      include: RecipeIngredientIncludeObjectSchema.optional(),
      where: RecipeIngredientWhereUniqueInputObjectSchema,
      create: z.union([
        RecipeIngredientCreateInputObjectSchema,
        RecipeIngredientUncheckedCreateInputObjectSchema,
      ]),
      update: z.union([
        RecipeIngredientUpdateInputObjectSchema,
        RecipeIngredientUncheckedUpdateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeIngredientUpsertArgs>;

export const RecipeIngredientUpsertOneZodSchema = z
  .object({
    select: RecipeIngredientSelectObjectSchema.optional(),
    include: RecipeIngredientIncludeObjectSchema.optional(),
    where: RecipeIngredientWhereUniqueInputObjectSchema,
    create: z.union([
      RecipeIngredientCreateInputObjectSchema,
      RecipeIngredientUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      RecipeIngredientUpdateInputObjectSchema,
      RecipeIngredientUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();
