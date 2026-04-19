import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      userId: z.string(),
    })
    .strict();
export const UserDietaryRestrictionCreateManyRestrictionInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionCreateManyRestrictionInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionCreateManyRestrictionInput>;
export const UserDietaryRestrictionCreateManyRestrictionInputObjectZodSchema =
  makeSchema();
