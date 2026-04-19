import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanSelectObjectSchema as MealPlanSelectObjectSchema } from './objects/MealPlanSelect.schema';
import { MealPlanIncludeObjectSchema as MealPlanIncludeObjectSchema } from './objects/MealPlanInclude.schema';
import { MealPlanWhereUniqueInputObjectSchema as MealPlanWhereUniqueInputObjectSchema } from './objects/MealPlanWhereUniqueInput.schema';

export const MealPlanDeleteOneSchema: z.ZodType<Prisma.MealPlanDeleteArgs> = z
  .object({
    select: MealPlanSelectObjectSchema.optional(),
    include: MealPlanIncludeObjectSchema.optional(),
    where: MealPlanWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.MealPlanDeleteArgs>;

export const MealPlanDeleteOneZodSchema = z
  .object({
    select: MealPlanSelectObjectSchema.optional(),
    include: MealPlanIncludeObjectSchema.optional(),
    where: MealPlanWhereUniqueInputObjectSchema,
  })
  .strict();
