import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      dietaryRestrictionId: z.string(),
    })
    .strict();
export const UserDietaryRestrictionCreateManyUserInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionCreateManyUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionCreateManyUserInput>;
export const UserDietaryRestrictionCreateManyUserInputObjectZodSchema =
  makeSchema();
