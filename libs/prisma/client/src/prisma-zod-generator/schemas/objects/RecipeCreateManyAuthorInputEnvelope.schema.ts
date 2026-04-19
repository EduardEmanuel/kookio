import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateManyAuthorInputObjectSchema as RecipeCreateManyAuthorInputObjectSchema } from './RecipeCreateManyAuthorInput.schema';

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => RecipeCreateManyAuthorInputObjectSchema),
        z.lazy(() => RecipeCreateManyAuthorInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const RecipeCreateManyAuthorInputEnvelopeObjectSchema: z.ZodType<Prisma.RecipeCreateManyAuthorInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateManyAuthorInputEnvelope>;
export const RecipeCreateManyAuthorInputEnvelopeObjectZodSchema = makeSchema();
