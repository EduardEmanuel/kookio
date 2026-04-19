import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      userId: z.string(),
      dietaryRestrictionId: z.string(),
    })
    .strict();
export const UserDietaryRestrictionCreateManyInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionCreateManyInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionCreateManyInput>;
export const UserDietaryRestrictionCreateManyInputObjectZodSchema =
  makeSchema();
