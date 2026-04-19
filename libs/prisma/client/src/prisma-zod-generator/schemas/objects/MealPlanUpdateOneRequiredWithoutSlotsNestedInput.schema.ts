import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanCreateWithoutSlotsInputObjectSchema as MealPlanCreateWithoutSlotsInputObjectSchema } from './MealPlanCreateWithoutSlotsInput.schema';
import { MealPlanUncheckedCreateWithoutSlotsInputObjectSchema as MealPlanUncheckedCreateWithoutSlotsInputObjectSchema } from './MealPlanUncheckedCreateWithoutSlotsInput.schema';
import { MealPlanCreateOrConnectWithoutSlotsInputObjectSchema as MealPlanCreateOrConnectWithoutSlotsInputObjectSchema } from './MealPlanCreateOrConnectWithoutSlotsInput.schema';
import { MealPlanUpsertWithoutSlotsInputObjectSchema as MealPlanUpsertWithoutSlotsInputObjectSchema } from './MealPlanUpsertWithoutSlotsInput.schema';
import { MealPlanWhereUniqueInputObjectSchema as MealPlanWhereUniqueInputObjectSchema } from './MealPlanWhereUniqueInput.schema';
import { MealPlanUpdateToOneWithWhereWithoutSlotsInputObjectSchema as MealPlanUpdateToOneWithWhereWithoutSlotsInputObjectSchema } from './MealPlanUpdateToOneWithWhereWithoutSlotsInput.schema';
import { MealPlanUpdateWithoutSlotsInputObjectSchema as MealPlanUpdateWithoutSlotsInputObjectSchema } from './MealPlanUpdateWithoutSlotsInput.schema';
import { MealPlanUncheckedUpdateWithoutSlotsInputObjectSchema as MealPlanUncheckedUpdateWithoutSlotsInputObjectSchema } from './MealPlanUncheckedUpdateWithoutSlotsInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => MealPlanCreateWithoutSlotsInputObjectSchema),
          z.lazy(() => MealPlanUncheckedCreateWithoutSlotsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MealPlanCreateOrConnectWithoutSlotsInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => MealPlanUpsertWithoutSlotsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => MealPlanWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => MealPlanUpdateToOneWithWhereWithoutSlotsInputObjectSchema,
          ),
          z.lazy(() => MealPlanUpdateWithoutSlotsInputObjectSchema),
          z.lazy(() => MealPlanUncheckedUpdateWithoutSlotsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const MealPlanUpdateOneRequiredWithoutSlotsNestedInputObjectSchema: z.ZodType<Prisma.MealPlanUpdateOneRequiredWithoutSlotsNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanUpdateOneRequiredWithoutSlotsNestedInput>;
export const MealPlanUpdateOneRequiredWithoutSlotsNestedInputObjectZodSchema =
  makeSchema();
