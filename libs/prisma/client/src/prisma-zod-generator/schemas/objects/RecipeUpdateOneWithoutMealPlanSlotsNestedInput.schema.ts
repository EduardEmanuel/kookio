import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateWithoutMealPlanSlotsInputObjectSchema as RecipeCreateWithoutMealPlanSlotsInputObjectSchema } from './RecipeCreateWithoutMealPlanSlotsInput.schema';
import { RecipeUncheckedCreateWithoutMealPlanSlotsInputObjectSchema as RecipeUncheckedCreateWithoutMealPlanSlotsInputObjectSchema } from './RecipeUncheckedCreateWithoutMealPlanSlotsInput.schema';
import { RecipeCreateOrConnectWithoutMealPlanSlotsInputObjectSchema as RecipeCreateOrConnectWithoutMealPlanSlotsInputObjectSchema } from './RecipeCreateOrConnectWithoutMealPlanSlotsInput.schema';
import { RecipeUpsertWithoutMealPlanSlotsInputObjectSchema as RecipeUpsertWithoutMealPlanSlotsInputObjectSchema } from './RecipeUpsertWithoutMealPlanSlotsInput.schema';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './RecipeWhereInput.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeUpdateToOneWithWhereWithoutMealPlanSlotsInputObjectSchema as RecipeUpdateToOneWithWhereWithoutMealPlanSlotsInputObjectSchema } from './RecipeUpdateToOneWithWhereWithoutMealPlanSlotsInput.schema';
import { RecipeUpdateWithoutMealPlanSlotsInputObjectSchema as RecipeUpdateWithoutMealPlanSlotsInputObjectSchema } from './RecipeUpdateWithoutMealPlanSlotsInput.schema';
import { RecipeUncheckedUpdateWithoutMealPlanSlotsInputObjectSchema as RecipeUncheckedUpdateWithoutMealPlanSlotsInputObjectSchema } from './RecipeUncheckedUpdateWithoutMealPlanSlotsInput.schema';

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
      upsert: z
        .lazy(() => RecipeUpsertWithoutMealPlanSlotsInputObjectSchema)
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => RecipeWhereInputObjectSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => RecipeWhereInputObjectSchema)])
        .optional(),
      connect: z.lazy(() => RecipeWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(
            () =>
              RecipeUpdateToOneWithWhereWithoutMealPlanSlotsInputObjectSchema,
          ),
          z.lazy(() => RecipeUpdateWithoutMealPlanSlotsInputObjectSchema),
          z.lazy(
            () => RecipeUncheckedUpdateWithoutMealPlanSlotsInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();
export const RecipeUpdateOneWithoutMealPlanSlotsNestedInputObjectSchema: z.ZodType<Prisma.RecipeUpdateOneWithoutMealPlanSlotsNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateOneWithoutMealPlanSlotsNestedInput>;
export const RecipeUpdateOneWithoutMealPlanSlotsNestedInputObjectZodSchema =
  makeSchema();
