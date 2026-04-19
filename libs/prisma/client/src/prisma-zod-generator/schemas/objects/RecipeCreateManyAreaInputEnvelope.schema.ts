import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateManyAreaInputObjectSchema as RecipeCreateManyAreaInputObjectSchema } from './RecipeCreateManyAreaInput.schema';

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => RecipeCreateManyAreaInputObjectSchema),
        z.lazy(() => RecipeCreateManyAreaInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const RecipeCreateManyAreaInputEnvelopeObjectSchema: z.ZodType<Prisma.RecipeCreateManyAreaInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateManyAreaInputEnvelope>;
export const RecipeCreateManyAreaInputEnvelopeObjectZodSchema = makeSchema();
