import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanSlotCreateManyRecipeInputObjectSchema as MealPlanSlotCreateManyRecipeInputObjectSchema } from './MealPlanSlotCreateManyRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => MealPlanSlotCreateManyRecipeInputObjectSchema),
        z.lazy(() => MealPlanSlotCreateManyRecipeInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const MealPlanSlotCreateManyRecipeInputEnvelopeObjectSchema: z.ZodType<Prisma.MealPlanSlotCreateManyRecipeInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotCreateManyRecipeInputEnvelope>;
export const MealPlanSlotCreateManyRecipeInputEnvelopeObjectZodSchema =
  makeSchema();
