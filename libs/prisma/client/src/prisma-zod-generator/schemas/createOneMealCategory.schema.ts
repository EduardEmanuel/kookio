import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealCategorySelectObjectSchema as MealCategorySelectObjectSchema } from './objects/MealCategorySelect.schema';
import { MealCategoryIncludeObjectSchema as MealCategoryIncludeObjectSchema } from './objects/MealCategoryInclude.schema';
import { MealCategoryCreateInputObjectSchema as MealCategoryCreateInputObjectSchema } from './objects/MealCategoryCreateInput.schema';
import { MealCategoryUncheckedCreateInputObjectSchema as MealCategoryUncheckedCreateInputObjectSchema } from './objects/MealCategoryUncheckedCreateInput.schema';

export const MealCategoryCreateOneSchema: z.ZodType<Prisma.MealCategoryCreateArgs> =
  z
    .object({
      select: MealCategorySelectObjectSchema.optional(),
      include: MealCategoryIncludeObjectSchema.optional(),
      data: z.union([
        MealCategoryCreateInputObjectSchema,
        MealCategoryUncheckedCreateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.MealCategoryCreateArgs>;

export const MealCategoryCreateOneZodSchema = z
  .object({
    select: MealCategorySelectObjectSchema.optional(),
    include: MealCategoryIncludeObjectSchema.optional(),
    data: z.union([
      MealCategoryCreateInputObjectSchema,
      MealCategoryUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict();
