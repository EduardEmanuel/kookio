import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      slug: z.string(),
      label: z.string(),
      emoji: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
    })
    .strict();
export const DietaryRestrictionUncheckedCreateWithoutUsersInputObjectSchema: z.ZodType<Prisma.DietaryRestrictionUncheckedCreateWithoutUsersInput> =
  makeSchema() as unknown as z.ZodType<Prisma.DietaryRestrictionUncheckedCreateWithoutUsersInput>;
export const DietaryRestrictionUncheckedCreateWithoutUsersInputObjectZodSchema =
  makeSchema();
