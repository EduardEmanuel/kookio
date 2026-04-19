import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanSelectObjectSchema as MealPlanSelectObjectSchema } from './objects/MealPlanSelect.schema';
import { MealPlanIncludeObjectSchema as MealPlanIncludeObjectSchema } from './objects/MealPlanInclude.schema';
import { MealPlanUpdateInputObjectSchema as MealPlanUpdateInputObjectSchema } from './objects/MealPlanUpdateInput.schema';
import { MealPlanUncheckedUpdateInputObjectSchema as MealPlanUncheckedUpdateInputObjectSchema } from './objects/MealPlanUncheckedUpdateInput.schema';
import { MealPlanWhereUniqueInputObjectSchema as MealPlanWhereUniqueInputObjectSchema } from './objects/MealPlanWhereUniqueInput.schema';

export const MealPlanUpdateOneSchema: z.ZodType<Prisma.MealPlanUpdateArgs> = z
  .object({
    select: MealPlanSelectObjectSchema.optional(),
    include: MealPlanIncludeObjectSchema.optional(),
    data: z.union([
      MealPlanUpdateInputObjectSchema,
      MealPlanUncheckedUpdateInputObjectSchema,
    ]),
    where: MealPlanWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.MealPlanUpdateArgs>;

export const MealPlanUpdateOneZodSchema = z
  .object({
    select: MealPlanSelectObjectSchema.optional(),
    include: MealPlanIncludeObjectSchema.optional(),
    data: z.union([
      MealPlanUpdateInputObjectSchema,
      MealPlanUncheckedUpdateInputObjectSchema,
    ]),
    where: MealPlanWhereUniqueInputObjectSchema,
  })
  .strict();
