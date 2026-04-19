import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      userId: z.string(),
      dietaryRestrictionId: z.string(),
    })
    .strict();
export const UserDietaryRestrictionUserIdDietaryRestrictionIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionUserIdDietaryRestrictionIdCompoundUniqueInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUserIdDietaryRestrictionIdCompoundUniqueInput>;
export const UserDietaryRestrictionUserIdDietaryRestrictionIdCompoundUniqueInputObjectZodSchema =
  makeSchema();
