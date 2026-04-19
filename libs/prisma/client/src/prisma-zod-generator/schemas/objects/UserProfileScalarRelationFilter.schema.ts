import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileWhereInputObjectSchema as UserProfileWhereInputObjectSchema } from './UserProfileWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      is: z.lazy(() => UserProfileWhereInputObjectSchema).optional(),
      isNot: z.lazy(() => UserProfileWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserProfileScalarRelationFilterObjectSchema: z.ZodType<Prisma.UserProfileScalarRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileScalarRelationFilter>;
export const UserProfileScalarRelationFilterObjectZodSchema = makeSchema();
