import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      userId: z.literal(true).optional(),
      utensilId: z.literal(true).optional(),
    })
    .strict();
export const UserUtensilMinAggregateInputObjectSchema: z.ZodType<Prisma.UserUtensilMinAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilMinAggregateInputType>;
export const UserUtensilMinAggregateInputObjectZodSchema = makeSchema();
