import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanSlotWhereInputObjectSchema as MealPlanSlotWhereInputObjectSchema } from './objects/MealPlanSlotWhereInput.schema';

export const MealPlanSlotDeleteManySchema: z.ZodType<Prisma.MealPlanSlotDeleteManyArgs> =
  z
    .object({ where: MealPlanSlotWhereInputObjectSchema.optional() })
    .strict() as unknown as z.ZodType<Prisma.MealPlanSlotDeleteManyArgs>;

export const MealPlanSlotDeleteManyZodSchema = z
  .object({ where: MealPlanSlotWhereInputObjectSchema.optional() })
  .strict();
