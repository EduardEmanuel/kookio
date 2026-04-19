import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanSelectObjectSchema as MealPlanSelectObjectSchema } from './objects/MealPlanSelect.schema';
import { MealPlanUpdateManyMutationInputObjectSchema as MealPlanUpdateManyMutationInputObjectSchema } from './objects/MealPlanUpdateManyMutationInput.schema';
import { MealPlanWhereInputObjectSchema as MealPlanWhereInputObjectSchema } from './objects/MealPlanWhereInput.schema';

export const MealPlanUpdateManyAndReturnSchema: z.ZodType<Prisma.MealPlanUpdateManyAndReturnArgs> =
  z
    .object({
      select: MealPlanSelectObjectSchema.optional(),
      data: MealPlanUpdateManyMutationInputObjectSchema,
      where: MealPlanWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealPlanUpdateManyAndReturnArgs>;

export const MealPlanUpdateManyAndReturnZodSchema = z
  .object({
    select: MealPlanSelectObjectSchema.optional(),
    data: MealPlanUpdateManyMutationInputObjectSchema,
    where: MealPlanWhereInputObjectSchema.optional(),
  })
  .strict();
