import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PantryItemCreateManyIngredientInputObjectSchema as PantryItemCreateManyIngredientInputObjectSchema } from './PantryItemCreateManyIngredientInput.schema';

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => PantryItemCreateManyIngredientInputObjectSchema),
        z.lazy(() => PantryItemCreateManyIngredientInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const PantryItemCreateManyIngredientInputEnvelopeObjectSchema: z.ZodType<Prisma.PantryItemCreateManyIngredientInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemCreateManyIngredientInputEnvelope>;
export const PantryItemCreateManyIngredientInputEnvelopeObjectZodSchema =
  makeSchema();
