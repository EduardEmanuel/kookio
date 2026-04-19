import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      userId: z.string(),
      dietaryRestrictionId: z.string(),
    })
    .strict();
export const UserDietaryRestrictionUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionUncheckedCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUncheckedCreateInput>;
export const UserDietaryRestrictionUncheckedCreateInputObjectZodSchema =
  makeSchema();
