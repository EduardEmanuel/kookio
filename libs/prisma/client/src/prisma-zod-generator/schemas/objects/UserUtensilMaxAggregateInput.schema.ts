import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      userId: z.literal(true).optional(),
      utensilId: z.literal(true).optional(),
    })
    .strict();
export const UserUtensilMaxAggregateInputObjectSchema: z.ZodType<Prisma.UserUtensilMaxAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilMaxAggregateInputType>;
export const UserUtensilMaxAggregateInputObjectZodSchema = makeSchema();
