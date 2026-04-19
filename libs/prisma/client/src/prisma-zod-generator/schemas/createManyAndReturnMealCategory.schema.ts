import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealCategorySelectObjectSchema as MealCategorySelectObjectSchema } from './objects/MealCategorySelect.schema';
import { MealCategoryCreateManyInputObjectSchema as MealCategoryCreateManyInputObjectSchema } from './objects/MealCategoryCreateManyInput.schema';

export const MealCategoryCreateManyAndReturnSchema: z.ZodType<Prisma.MealCategoryCreateManyAndReturnArgs> =
  z
    .object({
      select: MealCategorySelectObjectSchema.optional(),
      data: z.union([
        MealCategoryCreateManyInputObjectSchema,
        z.array(MealCategoryCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealCategoryCreateManyAndReturnArgs>;

export const MealCategoryCreateManyAndReturnZodSchema = z
  .object({
    select: MealCategorySelectObjectSchema.optional(),
    data: z.union([
      MealCategoryCreateManyInputObjectSchema,
      z.array(MealCategoryCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
