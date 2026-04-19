import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      dietaryRestrictionId: z.string(),
    })
    .strict();
export const UserDietaryRestrictionUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionUncheckedCreateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUncheckedCreateWithoutUserInput>;
export const UserDietaryRestrictionUncheckedCreateWithoutUserInputObjectZodSchema =
  makeSchema();
