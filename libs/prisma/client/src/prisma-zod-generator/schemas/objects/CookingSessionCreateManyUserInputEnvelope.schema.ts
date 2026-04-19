import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CookingSessionCreateManyUserInputObjectSchema as CookingSessionCreateManyUserInputObjectSchema } from './CookingSessionCreateManyUserInput.schema';

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => CookingSessionCreateManyUserInputObjectSchema),
        z.lazy(() => CookingSessionCreateManyUserInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const CookingSessionCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.CookingSessionCreateManyUserInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionCreateManyUserInputEnvelope>;
export const CookingSessionCreateManyUserInputEnvelopeObjectZodSchema =
  makeSchema();
