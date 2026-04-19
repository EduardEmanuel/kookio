import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealCategorySelectObjectSchema as MealCategorySelectObjectSchema } from './objects/MealCategorySelect.schema';
import { MealCategoryIncludeObjectSchema as MealCategoryIncludeObjectSchema } from './objects/MealCategoryInclude.schema';
import { MealCategoryWhereUniqueInputObjectSchema as MealCategoryWhereUniqueInputObjectSchema } from './objects/MealCategoryWhereUniqueInput.schema';
import { MealCategoryCreateInputObjectSchema as MealCategoryCreateInputObjectSchema } from './objects/MealCategoryCreateInput.schema';
import { MealCategoryUncheckedCreateInputObjectSchema as MealCategoryUncheckedCreateInputObjectSchema } from './objects/MealCategoryUncheckedCreateInput.schema';
import { MealCategoryUpdateInputObjectSchema as MealCategoryUpdateInputObjectSchema } from './objects/MealCategoryUpdateInput.schema';
import { MealCategoryUncheckedUpdateInputObjectSchema as MealCategoryUncheckedUpdateInputObjectSchema } from './objects/MealCategoryUncheckedUpdateInput.schema';

export const MealCategoryUpsertOneSchema: z.ZodType<Prisma.MealCategoryUpsertArgs> =
  z
    .object({
      select: MealCategorySelectObjectSchema.optional(),
      include: MealCategoryIncludeObjectSchema.optional(),
      where: MealCategoryWhereUniqueInputObjectSchema,
      create: z.union([
        MealCategoryCreateInputObjectSchema,
        MealCategoryUncheckedCreateInputObjectSchema,
      ]),
      update: z.union([
        MealCategoryUpdateInputObjectSchema,
        MealCategoryUncheckedUpdateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.MealCategoryUpsertArgs>;

export const MealCategoryUpsertOneZodSchema = z
  .object({
    select: MealCategorySelectObjectSchema.optional(),
    include: MealCategoryIncludeObjectSchema.optional(),
    where: MealCategoryWhereUniqueInputObjectSchema,
    create: z.union([
      MealCategoryCreateInputObjectSchema,
      MealCategoryUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      MealCategoryUpdateInputObjectSchema,
      MealCategoryUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();
