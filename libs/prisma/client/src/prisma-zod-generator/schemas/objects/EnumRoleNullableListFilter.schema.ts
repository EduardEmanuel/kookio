import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleSchema } from '../enums/Role.schema';

const makeSchema = () =>
  z
    .object({
      equals: RoleSchema.array().optional().nullable(),
      has: RoleSchema.optional().nullable(),
      hasEvery: RoleSchema.array().optional(),
      hasSome: RoleSchema.array().optional(),
      isEmpty: z.boolean().optional(),
    })
    .strict();
export const EnumRoleNullableListFilterObjectSchema: z.ZodType<Prisma.EnumRoleNullableListFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.EnumRoleNullableListFilter>;
export const EnumRoleNullableListFilterObjectZodSchema = makeSchema();
