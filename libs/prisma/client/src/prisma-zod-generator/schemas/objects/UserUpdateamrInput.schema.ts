import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      set: z.string().array().optional(),
      push: z.union([z.string(), z.string().array()]).optional(),
    })
    .strict();
export const UserUpdateamrInputObjectSchema: z.ZodType<Prisma.UserUpdateamrInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpdateamrInput>;
export const UserUpdateamrInputObjectZodSchema = makeSchema();
