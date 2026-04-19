import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanUpdateManyMutationInputObjectSchema as MealPlanUpdateManyMutationInputObjectSchema } from './objects/MealPlanUpdateManyMutationInput.schema';
import { MealPlanWhereInputObjectSchema as MealPlanWhereInputObjectSchema } from './objects/MealPlanWhereInput.schema';

export const MealPlanUpdateManySchema: z.ZodType<Prisma.MealPlanUpdateManyArgs> =
  z
    .object({
      data: MealPlanUpdateManyMutationInputObjectSchema,
      where: MealPlanWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealPlanUpdateManyArgs>;

export const MealPlanUpdateManyZodSchema = z
  .object({
    data: MealPlanUpdateManyMutationInputObjectSchema,
    where: MealPlanWhereInputObjectSchema.optional(),
  })
  .strict();
