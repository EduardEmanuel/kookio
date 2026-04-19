import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      dietaryRestrictions: z.boolean().optional(),
      utensils: z.boolean().optional(),
    })
    .strict();
export const UserProfileCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UserProfileCountOutputTypeSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileCountOutputTypeSelect>;
export const UserProfileCountOutputTypeSelectObjectZodSchema = makeSchema();
