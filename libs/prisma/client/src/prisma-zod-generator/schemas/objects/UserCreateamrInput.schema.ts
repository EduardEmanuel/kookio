import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      set: z.string().array(),
    })
    .strict();
export const UserCreateamrInputObjectSchema: z.ZodType<Prisma.UserCreateamrInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateamrInput>;
export const UserCreateamrInputObjectZodSchema = makeSchema();
