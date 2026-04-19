import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeUpdateWithoutMealPlanSlotsInputObjectSchema as RecipeUpdateWithoutMealPlanSlotsInputObjectSchema } from './RecipeUpdateWithoutMealPlanSlotsInput.schema';
import { RecipeUncheckedUpdateWithoutMealPlanSlotsInputObjectSchema as RecipeUncheckedUpdateWithoutMealPlanSlotsInputObjectSchema } from './RecipeUncheckedUpdateWithoutMealPlanSlotsInput.schema';
import { RecipeCreateWithoutMealPlanSlotsInputObjectSchema as RecipeCreateWithoutMealPlanSlotsInputObjectSchema } from './RecipeCreateWithoutMealPlanSlotsInput.schema';
import { RecipeUncheckedCreateWithoutMealPlanSlotsInputObjectSchema as RecipeUncheckedCreateWithoutMealPlanSlotsInputObjectSchema } from './RecipeUncheckedCreateWithoutMealPlanSlotsInput.schema';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './RecipeWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => RecipeUpdateWithoutMealPlanSlotsInputObjectSchema),
        z.lazy(
          () => RecipeUncheckedUpdateWithoutMealPlanSlotsInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => RecipeCreateWithoutMealPlanSlotsInputObjectSchema),
        z.lazy(
          () => RecipeUncheckedCreateWithoutMealPlanSlotsInputObjectSchema,
        ),
      ]),
      where: z.lazy(() => RecipeWhereInputObjectSchema).optional(),
    })
    .strict();
export const RecipeUpsertWithoutMealPlanSlotsInputObjectSchema: z.ZodType<Prisma.RecipeUpsertWithoutMealPlanSlotsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpsertWithoutMealPlanSlotsInput>;
export const RecipeUpsertWithoutMealPlanSlotsInputObjectZodSchema =
  makeSchema();
