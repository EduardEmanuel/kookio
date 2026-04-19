import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanCreateManyUserInputObjectSchema as MealPlanCreateManyUserInputObjectSchema } from './MealPlanCreateManyUserInput.schema';

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => MealPlanCreateManyUserInputObjectSchema),
        z.lazy(() => MealPlanCreateManyUserInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const MealPlanCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.MealPlanCreateManyUserInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanCreateManyUserInputEnvelope>;
export const MealPlanCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
