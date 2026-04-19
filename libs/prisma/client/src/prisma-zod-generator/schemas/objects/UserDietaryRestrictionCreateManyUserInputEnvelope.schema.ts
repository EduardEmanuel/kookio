import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionCreateManyUserInputObjectSchema as UserDietaryRestrictionCreateManyUserInputObjectSchema } from './UserDietaryRestrictionCreateManyUserInput.schema';

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => UserDietaryRestrictionCreateManyUserInputObjectSchema),
        z
          .lazy(() => UserDietaryRestrictionCreateManyUserInputObjectSchema)
          .array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const UserDietaryRestrictionCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionCreateManyUserInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionCreateManyUserInputEnvelope>;
export const UserDietaryRestrictionCreateManyUserInputEnvelopeObjectZodSchema =
  makeSchema();
