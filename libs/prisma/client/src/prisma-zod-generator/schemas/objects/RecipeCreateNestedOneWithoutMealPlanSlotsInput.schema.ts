import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateWithoutMealPlanSlotsInputObjectSchema as RecipeCreateWithoutMealPlanSlotsInputObjectSchema } from './RecipeCreateWithoutMealPlanSlotsInput.schema';
import { RecipeUncheckedCreateWithoutMealPlanSlotsInputObjectSchema as RecipeUncheckedCreateWithoutMealPlanSlotsInputObjectSchema } from './RecipeUncheckedCreateWithoutMealPlanSlotsInput.schema';
import { RecipeCreateOrConnectWithoutMealPlanSlotsInputObjectSchema as RecipeCreateOrConnectWithoutMealPlanSlotsInputObjectSchema } from './RecipeCreateOrConnectWithoutMealPlanSlotsInput.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => RecipeCreateWithoutMealPlanSlotsInputObjectSchema),
          z.lazy(
            () => RecipeUncheckedCreateWithoutMealPlanSlotsInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => RecipeCreateOrConnectWithoutMealPlanSlotsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => RecipeWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const RecipeCreateNestedOneWithoutMealPlanSlotsInputObjectSchema: z.ZodType<Prisma.RecipeCreateNestedOneWithoutMealPlanSlotsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateNestedOneWithoutMealPlanSlotsInput>;
export const RecipeCreateNestedOneWithoutMealPlanSlotsInputObjectZodSchema =
  makeSchema();
