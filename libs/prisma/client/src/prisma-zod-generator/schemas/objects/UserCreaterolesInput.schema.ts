import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleSchema } from '../enums/Role.schema';

const makeSchema = () =>
  z
    .object({
      set: RoleSchema.array(),
    })
    .strict();
export const UserCreaterolesInputObjectSchema: z.ZodType<Prisma.UserCreaterolesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreaterolesInput>;
export const UserCreaterolesInputObjectZodSchema = makeSchema();
