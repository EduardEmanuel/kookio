import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealPlanSlotSelectObjectSchema as MealPlanSlotSelectObjectSchema } from './objects/MealPlanSlotSelect.schema';
import { MealPlanSlotIncludeObjectSchema as MealPlanSlotIncludeObjectSchema } from './objects/MealPlanSlotInclude.schema';
import { MealPlanSlotWhereUniqueInputObjectSchema as MealPlanSlotWhereUniqueInputObjectSchema } from './objects/MealPlanSlotWhereUniqueInput.schema';
import { MealPlanSlotCreateInputObjectSchema as MealPlanSlotCreateInputObjectSchema } from './objects/MealPlanSlotCreateInput.schema';
import { MealPlanSlotUncheckedCreateInputObjectSchema as MealPlanSlotUncheckedCreateInputObjectSchema } from './objects/MealPlanSlotUncheckedCreateInput.schema';
import { MealPlanSlotUpdateInputObjectSchema as MealPlanSlotUpdateInputObjectSchema } from './objects/MealPlanSlotUpdateInput.schema';
import { MealPlanSlotUncheckedUpdateInputObjectSchema as MealPlanSlotUncheckedUpdateInputObjectSchema } from './objects/MealPlanSlotUncheckedUpdateInput.schema';

export const MealPlanSlotUpsertOneSchema: z.ZodType<Prisma.MealPlanSlotUpsertArgs> =
  z
    .object({
      select: MealPlanSlotSelectObjectSchema.optional(),
      include: MealPlanSlotIncludeObjectSchema.optional(),
      where: MealPlanSlotWhereUniqueInputObjectSchema,
      create: z.union([
        MealPlanSlotCreateInputObjectSchema,
        MealPlanSlotUncheckedCreateInputObjectSchema,
      ]),
      update: z.union([
        MealPlanSlotUpdateInputObjectSchema,
        MealPlanSlotUncheckedUpdateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.MealPlanSlotUpsertArgs>;

export const MealPlanSlotUpsertOneZodSchema = z
  .object({
    select: MealPlanSlotSelectObjectSchema.optional(),
    include: MealPlanSlotIncludeObjectSchema.optional(),
    where: MealPlanSlotWhereUniqueInputObjectSchema,
    create: z.union([
      MealPlanSlotCreateInputObjectSchema,
      MealPlanSlotUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      MealPlanSlotUpdateInputObjectSchema,
      MealPlanSlotUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();
