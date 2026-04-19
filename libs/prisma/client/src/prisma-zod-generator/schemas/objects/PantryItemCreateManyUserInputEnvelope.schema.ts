import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PantryItemCreateManyUserInputObjectSchema as PantryItemCreateManyUserInputObjectSchema } from './PantryItemCreateManyUserInput.schema';

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => PantryItemCreateManyUserInputObjectSchema),
        z.lazy(() => PantryItemCreateManyUserInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const PantryItemCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.PantryItemCreateManyUserInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemCreateManyUserInputEnvelope>;
export const PantryItemCreateManyUserInputEnvelopeObjectZodSchema =
  makeSchema();
