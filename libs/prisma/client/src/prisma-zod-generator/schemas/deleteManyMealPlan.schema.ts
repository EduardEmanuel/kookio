import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanWhereInputObjectSchema as MealPlanWhereInputObjectSchema } from './objects/MealPlanWhereInput.schema';

export const MealPlanDeleteManySchema: z.ZodType<Prisma.MealPlanDeleteManyArgs> =
  z
    .object({ where: MealPlanWhereInputObjectSchema.optional() })
    .strict() as unknown as z.ZodType<Prisma.MealPlanDeleteManyArgs>;

export const MealPlanDeleteManyZodSchema = z
  .object({ where: MealPlanWhereInputObjectSchema.optional() })
  .strict();
