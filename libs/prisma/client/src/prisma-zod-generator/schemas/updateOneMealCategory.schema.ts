import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealCategorySelectObjectSchema as MealCategorySelectObjectSchema } from './objects/MealCategorySelect.schema';
import { MealCategoryIncludeObjectSchema as MealCategoryIncludeObjectSchema } from './objects/MealCategoryInclude.schema';
import { MealCategoryUpdateInputObjectSchema as MealCategoryUpdateInputObjectSchema } from './objects/MealCategoryUpdateInput.schema';
import { MealCategoryUncheckedUpdateInputObjectSchema as MealCategoryUncheckedUpdateInputObjectSchema } from './objects/MealCategoryUncheckedUpdateInput.schema';
import { MealCategoryWhereUniqueInputObjectSchema as MealCategoryWhereUniqueInputObjectSchema } from './objects/MealCategoryWhereUniqueInput.schema';

export const MealCategoryUpdateOneSchema: z.ZodType<Prisma.MealCategoryUpdateArgs> =
  z
    .object({
      select: MealCategorySelectObjectSchema.optional(),
      include: MealCategoryIncludeObjectSchema.optional(),
      data: z.union([
        MealCategoryUpdateInputObjectSchema,
        MealCategoryUncheckedUpdateInputObjectSchema,
      ]),
      where: MealCategoryWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.MealCategoryUpdateArgs>;

export const MealCategoryUpdateOneZodSchema = z
  .object({
    select: MealCategorySelectObjectSchema.optional(),
    include: MealCategoryIncludeObjectSchema.optional(),
    data: z.union([
      MealCategoryUpdateInputObjectSchema,
      MealCategoryUncheckedUpdateInputObjectSchema,
    ]),
    where: MealCategoryWhereUniqueInputObjectSchema,
  })
  .strict();
