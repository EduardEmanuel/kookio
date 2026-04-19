import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionCreateManyRestrictionInputObjectSchema as UserDietaryRestrictionCreateManyRestrictionInputObjectSchema } from './UserDietaryRestrictionCreateManyRestrictionInput.schema';

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(
          () => UserDietaryRestrictionCreateManyRestrictionInputObjectSchema,
        ),
        z
          .lazy(
            () => UserDietaryRestrictionCreateManyRestrictionInputObjectSchema,
          )
          .array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const UserDietaryRestrictionCreateManyRestrictionInputEnvelopeObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionCreateManyRestrictionInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionCreateManyRestrictionInputEnvelope>;
export const UserDietaryRestrictionCreateManyRestrictionInputEnvelopeObjectZodSchema =
  makeSchema();
