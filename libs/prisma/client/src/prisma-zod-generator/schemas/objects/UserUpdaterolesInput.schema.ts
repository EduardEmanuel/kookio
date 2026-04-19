import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleSchema } from '../enums/Role.schema';

const makeSchema = () =>
  z
    .object({
      set: RoleSchema.array().optional(),
    })
    .strict();
export const UserUpdaterolesInputObjectSchema: z.ZodType<Prisma.UserUpdaterolesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpdaterolesInput>;
export const UserUpdaterolesInputObjectZodSchema = makeSchema();
