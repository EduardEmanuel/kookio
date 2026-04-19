import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanSelectObjectSchema as MealPlanSelectObjectSchema } from './objects/MealPlanSelect.schema';
import { MealPlanIncludeObjectSchema as MealPlanIncludeObjectSchema } from './objects/MealPlanInclude.schema';
import { MealPlanWhereUniqueInputObjectSchema as MealPlanWhereUniqueInputObjectSchema } from './objects/MealPlanWhereUniqueInput.schema';
import { MealPlanCreateInputObjectSchema as MealPlanCreateInputObjectSchema } from './objects/MealPlanCreateInput.schema';
import { MealPlanUncheckedCreateInputObjectSchema as MealPlanUncheckedCreateInputObjectSchema } from './objects/MealPlanUncheckedCreateInput.schema';
import { MealPlanUpdateInputObjectSchema as MealPlanUpdateInputObjectSchema } from './objects/MealPlanUpdateInput.schema';
import { MealPlanUncheckedUpdateInputObjectSchema as MealPlanUncheckedUpdateInputObjectSchema } from './objects/MealPlanUncheckedUpdateInput.schema';

export const MealPlanUpsertOneSchema: z.ZodType<Prisma.MealPlanUpsertArgs> = z
  .object({
    select: MealPlanSelectObjectSchema.optional(),
    include: MealPlanIncludeObjectSchema.optional(),
    where: MealPlanWhereUniqueInputObjectSchema,
    create: z.union([
      MealPlanCreateInputObjectSchema,
      MealPlanUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      MealPlanUpdateInputObjectSchema,
      MealPlanUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.MealPlanUpsertArgs>;

export const MealPlanUpsertOneZodSchema = z
  .object({
    select: MealPlanSelectObjectSchema.optional(),
    include: MealPlanIncludeObjectSchema.optional(),
    where: MealPlanWhereUniqueInputObjectSchema,
    create: z.union([
      MealPlanCreateInputObjectSchema,
      MealPlanUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      MealPlanUpdateInputObjectSchema,
      MealPlanUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();
