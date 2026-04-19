import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      userId: z.string(),
    })
    .strict();
export const UserDietaryRestrictionUncheckedCreateWithoutRestrictionInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionUncheckedCreateWithoutRestrictionInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUncheckedCreateWithoutRestrictionInput>;
export const UserDietaryRestrictionUncheckedCreateWithoutRestrictionInputObjectZodSchema =
  makeSchema();
