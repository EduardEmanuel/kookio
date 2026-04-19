import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      userId: z.string(),
      adultsCount: z.number().int().optional(),
      childrenCount: z.number().int().optional(),
      onboardingDone: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();
export const UserProfileCreateManyInputObjectSchema: z.ZodType<Prisma.UserProfileCreateManyInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileCreateManyInput>;
export const UserProfileCreateManyInputObjectZodSchema = makeSchema();
