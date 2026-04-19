import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanSlotCreateManyInputObjectSchema as MealPlanSlotCreateManyInputObjectSchema } from './objects/MealPlanSlotCreateManyInput.schema';

export const MealPlanSlotCreateManySchema: z.ZodType<Prisma.MealPlanSlotCreateManyArgs> =
  z
    .object({
      data: z.union([
        MealPlanSlotCreateManyInputObjectSchema,
        z.array(MealPlanSlotCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealPlanSlotCreateManyArgs>;

export const MealPlanSlotCreateManyZodSchema = z
  .object({
    data: z.union([
      MealPlanSlotCreateManyInputObjectSchema,
      z.array(MealPlanSlotCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
