import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealCategoryCreateManyInputObjectSchema as MealCategoryCreateManyInputObjectSchema } from './objects/MealCategoryCreateManyInput.schema';

export const MealCategoryCreateManySchema: z.ZodType<Prisma.MealCategoryCreateManyArgs> =
  z
    .object({
      data: z.union([
        MealCategoryCreateManyInputObjectSchema,
        z.array(MealCategoryCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealCategoryCreateManyArgs>;

export const MealCategoryCreateManyZodSchema = z
  .object({
    data: z.union([
      MealCategoryCreateManyInputObjectSchema,
      z.array(MealCategoryCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
