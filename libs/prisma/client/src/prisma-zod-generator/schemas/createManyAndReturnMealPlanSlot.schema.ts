import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanSlotSelectObjectSchema as MealPlanSlotSelectObjectSchema } from './objects/MealPlanSlotSelect.schema';
import { MealPlanSlotCreateManyInputObjectSchema as MealPlanSlotCreateManyInputObjectSchema } from './objects/MealPlanSlotCreateManyInput.schema';

export const MealPlanSlotCreateManyAndReturnSchema: z.ZodType<Prisma.MealPlanSlotCreateManyAndReturnArgs> =
  z
    .object({
      select: MealPlanSlotSelectObjectSchema.optional(),
      data: z.union([
        MealPlanSlotCreateManyInputObjectSchema,
        z.array(MealPlanSlotCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealPlanSlotCreateManyAndReturnArgs>;

export const MealPlanSlotCreateManyAndReturnZodSchema = z
  .object({
    select: MealPlanSlotSelectObjectSchema.optional(),
    data: z.union([
      MealPlanSlotCreateManyInputObjectSchema,
      z.array(MealPlanSlotCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
