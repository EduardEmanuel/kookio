import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeCreateWithoutMealPlanSlotsInputObjectSchema as RecipeCreateWithoutMealPlanSlotsInputObjectSchema } from './RecipeCreateWithoutMealPlanSlotsInput.schema';
import { RecipeUncheckedCreateWithoutMealPlanSlotsInputObjectSchema as RecipeUncheckedCreateWithoutMealPlanSlotsInputObjectSchema } from './RecipeUncheckedCreateWithoutMealPlanSlotsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => RecipeCreateWithoutMealPlanSlotsInputObjectSchema),
        z.lazy(
          () => RecipeUncheckedCreateWithoutMealPlanSlotsInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeCreateOrConnectWithoutMealPlanSlotsInputObjectSchema: z.ZodType<Prisma.RecipeCreateOrConnectWithoutMealPlanSlotsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateOrConnectWithoutMealPlanSlotsInput>;
export const RecipeCreateOrConnectWithoutMealPlanSlotsInputObjectZodSchema =
  makeSchema();
