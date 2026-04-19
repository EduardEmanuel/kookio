import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanSelectObjectSchema as MealPlanSelectObjectSchema } from './objects/MealPlanSelect.schema';
import { MealPlanCreateManyInputObjectSchema as MealPlanCreateManyInputObjectSchema } from './objects/MealPlanCreateManyInput.schema';

export const MealPlanCreateManyAndReturnSchema: z.ZodType<Prisma.MealPlanCreateManyAndReturnArgs> =
  z
    .object({
      select: MealPlanSelectObjectSchema.optional(),
      data: z.union([
        MealPlanCreateManyInputObjectSchema,
        z.array(MealPlanCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealPlanCreateManyAndReturnArgs>;

export const MealPlanCreateManyAndReturnZodSchema = z
  .object({
    select: MealPlanSelectObjectSchema.optional(),
    data: z.union([
      MealPlanCreateManyInputObjectSchema,
      z.array(MealPlanCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
