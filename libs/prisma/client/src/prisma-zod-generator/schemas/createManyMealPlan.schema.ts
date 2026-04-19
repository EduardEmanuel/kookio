import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanCreateManyInputObjectSchema as MealPlanCreateManyInputObjectSchema } from './objects/MealPlanCreateManyInput.schema';

export const MealPlanCreateManySchema: z.ZodType<Prisma.MealPlanCreateManyArgs> =
  z
    .object({
      data: z.union([
        MealPlanCreateManyInputObjectSchema,
        z.array(MealPlanCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealPlanCreateManyArgs>;

export const MealPlanCreateManyZodSchema = z
  .object({
    data: z.union([
      MealPlanCreateManyInputObjectSchema,
      z.array(MealPlanCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
