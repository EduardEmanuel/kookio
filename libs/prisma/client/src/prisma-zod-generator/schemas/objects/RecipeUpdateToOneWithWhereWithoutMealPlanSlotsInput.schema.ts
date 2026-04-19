import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './RecipeWhereInput.schema';
import { RecipeUpdateWithoutMealPlanSlotsInputObjectSchema as RecipeUpdateWithoutMealPlanSlotsInputObjectSchema } from './RecipeUpdateWithoutMealPlanSlotsInput.schema';
import { RecipeUncheckedUpdateWithoutMealPlanSlotsInputObjectSchema as RecipeUncheckedUpdateWithoutMealPlanSlotsInputObjectSchema } from './RecipeUncheckedUpdateWithoutMealPlanSlotsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => RecipeUpdateWithoutMealPlanSlotsInputObjectSchema),
        z.lazy(
          () => RecipeUncheckedUpdateWithoutMealPlanSlotsInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeUpdateToOneWithWhereWithoutMealPlanSlotsInputObjectSchema: z.ZodType<Prisma.RecipeUpdateToOneWithWhereWithoutMealPlanSlotsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateToOneWithWhereWithoutMealPlanSlotsInput>;
export const RecipeUpdateToOneWithWhereWithoutMealPlanSlotsInputObjectZodSchema =
  makeSchema();
