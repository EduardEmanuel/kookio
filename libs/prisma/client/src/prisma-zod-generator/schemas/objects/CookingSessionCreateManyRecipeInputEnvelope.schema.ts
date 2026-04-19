import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CookingSessionCreateManyRecipeInputObjectSchema as CookingSessionCreateManyRecipeInputObjectSchema } from './CookingSessionCreateManyRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => CookingSessionCreateManyRecipeInputObjectSchema),
        z.lazy(() => CookingSessionCreateManyRecipeInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const CookingSessionCreateManyRecipeInputEnvelopeObjectSchema: z.ZodType<Prisma.CookingSessionCreateManyRecipeInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionCreateManyRecipeInputEnvelope>;
export const CookingSessionCreateManyRecipeInputEnvelopeObjectZodSchema =
  makeSchema();
