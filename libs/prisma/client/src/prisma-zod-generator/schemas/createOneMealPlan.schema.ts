import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanSelectObjectSchema as MealPlanSelectObjectSchema } from './objects/MealPlanSelect.schema';
import { MealPlanIncludeObjectSchema as MealPlanIncludeObjectSchema } from './objects/MealPlanInclude.schema';
import { MealPlanCreateInputObjectSchema as MealPlanCreateInputObjectSchema } from './objects/MealPlanCreateInput.schema';
import { MealPlanUncheckedCreateInputObjectSchema as MealPlanUncheckedCreateInputObjectSchema } from './objects/MealPlanUncheckedCreateInput.schema';

export const MealPlanCreateOneSchema: z.ZodType<Prisma.MealPlanCreateArgs> = z
  .object({
    select: MealPlanSelectObjectSchema.optional(),
    include: MealPlanIncludeObjectSchema.optional(),
    data: z.union([
      MealPlanCreateInputObjectSchema,
      MealPlanUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.MealPlanCreateArgs>;

export const MealPlanCreateOneZodSchema = z
  .object({
    select: MealPlanSelectObjectSchema.optional(),
    include: MealPlanIncludeObjectSchema.optional(),
    data: z.union([
      MealPlanCreateInputObjectSchema,
      MealPlanUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict();
