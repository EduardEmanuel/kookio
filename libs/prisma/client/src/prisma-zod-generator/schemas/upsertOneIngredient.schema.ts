import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientSelectObjectSchema as IngredientSelectObjectSchema } from './objects/IngredientSelect.schema';
import { IngredientWhereUniqueInputObjectSchema as IngredientWhereUniqueInputObjectSchema } from './objects/IngredientWhereUniqueInput.schema';
import { IngredientCreateInputObjectSchema as IngredientCreateInputObjectSchema } from './objects/IngredientCreateInput.schema';
import { IngredientUncheckedCreateInputObjectSchema as IngredientUncheckedCreateInputObjectSchema } from './objects/IngredientUncheckedCreateInput.schema';
import { IngredientUpdateInputObjectSchema as IngredientUpdateInputObjectSchema } from './objects/IngredientUpdateInput.schema';
import { IngredientUncheckedUpdateInputObjectSchema as IngredientUncheckedUpdateInputObjectSchema } from './objects/IngredientUncheckedUpdateInput.schema';

export const IngredientUpsertOneSchema: z.ZodType<Prisma.IngredientUpsertArgs> =
  z
    .object({
      select: IngredientSelectObjectSchema.optional(),
      where: IngredientWhereUniqueInputObjectSchema,
      create: z.union([
        IngredientCreateInputObjectSchema,
        IngredientUncheckedCreateInputObjectSchema,
      ]),
      update: z.union([
        IngredientUpdateInputObjectSchema,
        IngredientUncheckedUpdateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.IngredientUpsertArgs>;

export const IngredientUpsertOneZodSchema = z
  .object({
    select: IngredientSelectObjectSchema.optional(),
    where: IngredientWhereUniqueInputObjectSchema,
    create: z.union([
      IngredientCreateInputObjectSchema,
      IngredientUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      IngredientUpdateInputObjectSchema,
      IngredientUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();
